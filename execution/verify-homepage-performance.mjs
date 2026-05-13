import { mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";
import sharp from "sharp";

const PORT = 3101;
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const TMP_DIR = join(ROOT, ".tmp", "verification");

function runOrThrow(command, args) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} exited with code ${result.status}`);
  }
}

async function parseImageDisplayDimensions(input) {
  const { info } = await sharp(input)
    .rotate()
    .toBuffer({ resolveWithObject: true });

  return { width: info.width, height: info.height };
}

function parseAspect(width, height) {
  return width / height;
}

async function waitForServer(child) {
  const deadline = Date.now() + 30000;

  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";

    const onData = (chunk) => {
      const text = chunk.toString();
      stdout += text;
      if (stdout.includes("Ready")) {
        cleanup();
        resolve(undefined);
      }
    };

    const onError = (chunk) => {
      stderr += chunk.toString();
    };

    const onExit = (code) => {
      cleanup();
      reject(new Error(`Server exited early with code ${code}\n${stderr}`));
    };

    const timer = setInterval(() => {
      if (Date.now() < deadline) return;
      cleanup();
      reject(new Error(`Timed out waiting for server\n${stderr}`));
    }, 250);

    function cleanup() {
      clearInterval(timer);
      child.stdout?.off("data", onData);
      child.stderr?.off("data", onError);
      child.off("exit", onExit);
    }

    child.stdout?.on("data", onData);
    child.stderr?.on("data", onError);
    child.on("exit", onExit);
  });
}

function getUniqueMatches(input, pattern) {
  return [...new Set(input.match(pattern) ?? [])];
}

async function fetchBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

async function fetchHead(url) {
  const response = await fetch(url, { method: "HEAD" });
  if (!response.ok) {
    throw new Error(`Failed HEAD ${url}: ${response.status}`);
  }
  return response;
}

async function main() {
  mkdirSync(TMP_DIR, { recursive: true });

  console.log("Building production output...");
  runOrThrow("npm", ["run", "build"]);

  console.log("Starting local production server...");
  const server = spawn("npm", ["run", "start", "--", "--port", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  });

  try {
    await waitForServer(server);

    const baseUrl = `http://localhost:${PORT}`;
    const homeHtml = await fetchText(`${baseUrl}/`);
    writeFileSync(join(TMP_DIR, "home.html"), homeHtml);

    const jsChunks = getUniqueMatches(homeHtml, /\/_next\/static\/chunks\/[A-Za-z0-9._-]+\.js/g);
    const fontFiles = getUniqueMatches(homeHtml, /\/_next\/static\/media\/[A-Za-z0-9._-]+\.otf/g);
    const jsBytes = jsChunks.reduce((total, assetPath) => {
      const localPath = join(ROOT, assetPath.replace(/^\/_next/, ".next"));
      return total + statSync(localPath).size;
    }, 0);
    const fontBytes = fontFiles.reduce((total, assetPath) => {
      const localPath = join(ROOT, assetPath.replace(/^\/_next/, ".next"));
      return total + statSync(localPath).size;
    }, 0);

    const posterResponse = await fetchHead(`${baseUrl}/images/hero/hero-video-poster.jpg`);
    const optimizedVideoResponse = await fetchHead(`${baseUrl}/videos/hero-video-optimized.mp4`);
    const originalVideoBytes = statSync(join(ROOT, "public/videos/hero-video.mp4")).size;
    const optimizedVideoBytes = Number(optimizedVideoResponse.headers.get("content-length"));
    const posterBytes = Number(posterResponse.headers.get("content-length"));

    const samples = [
      { source: "/images/collection-1.jpg", width: 1920 },
      { source: "/images/parallax/parallax-3.jpg", width: 1920 },
      { source: "/images/logo/brand-logo-transparent.png", width: 1200 },
      { source: "/images/hero/hero-video-poster.jpg", width: 1920 },
    ];

    const aspectChecks = [];
    for (const sample of samples) {
      const localSourcePath = join(ROOT, "public", sample.source.replace(/^\//, ""));
      const sourceDimensions = await parseImageDisplayDimensions(localSourcePath);
      const optimizedUrl = `${baseUrl}/_next/image?url=${encodeURIComponent(sample.source)}&w=${sample.width}&q=75`;
      const optimizedBuffer = await fetchBuffer(optimizedUrl);
      const optimizedPath = join(
        TMP_DIR,
        sample.source.replace(/^\//, "").replace(/[\/]/g, "__")
      );

      writeFileSync(optimizedPath, optimizedBuffer);
      const optimizedDimensions = await parseImageDisplayDimensions(optimizedBuffer);
      const sourceAspect = parseAspect(sourceDimensions.width, sourceDimensions.height);
      const optimizedAspect = parseAspect(optimizedDimensions.width, optimizedDimensions.height);
      const delta = Math.abs(sourceAspect - optimizedAspect);

      aspectChecks.push({
        source: sample.source,
        sourceDimensions,
        optimizedDimensions,
        delta,
      });
    }

    const failures = [];
    if (optimizedVideoBytes >= originalVideoBytes) {
      failures.push("Optimized hero video is not smaller than the source asset.");
    }
    if (posterBytes <= 0) {
      failures.push("Hero poster did not serve a valid payload.");
    }
    for (const check of aspectChecks) {
      if (check.delta > 0.01) {
        failures.push(
          `Aspect ratio drifted for ${check.source}: source ${check.sourceDimensions.width}x${check.sourceDimensions.height}, optimized ${check.optimizedDimensions.width}x${check.optimizedDimensions.height}`
        );
      }
    }

    console.log("");
    console.log("Homepage verification summary");
    console.log(`- HTML bytes: ${Buffer.byteLength(homeHtml)}`);
    console.log(`- JS payload bytes referenced by home HTML: ${jsBytes}`);
    console.log(`- Preloaded font bytes: ${fontBytes}`);
    console.log(`- Hero video bytes: ${originalVideoBytes} -> ${optimizedVideoBytes}`);
    console.log(`- Hero poster bytes: ${posterBytes}`);
    console.log("- Aspect checks:");
    for (const check of aspectChecks) {
      console.log(
        `  - ${check.source}: ${check.sourceDimensions.width}x${check.sourceDimensions.height} -> ${check.optimizedDimensions.width}x${check.optimizedDimensions.height} (delta ${check.delta.toFixed(6)})`
      );
    }

    if (failures.length > 0) {
      console.error("");
      for (const failure of failures) {
        console.error(`FAIL: ${failure}`);
      }
      process.exitCode = 1;
      return;
    }
  } finally {
    server.kill("SIGINT");
    rmSync(TMP_DIR, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
