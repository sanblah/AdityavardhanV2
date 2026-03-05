#!/usr/bin/env node
/**
 * AdityaVardhan – Website Content PDF Generator
 * Pure Node.js, zero npm dependencies.
 * Outputs a clean, editable PDF organised page-by-page, section-by-section.
 */

'use strict';
const fs = require('fs');
const OUTPUT = '/Users/mandar/Documents/AdityaVARDHAN V2/AdityaVardhan_Website_Content.pdf';

// ───────────────────────────────────────────────
// Minimal PDF builder
// ───────────────────────────────────────────────
class PDFBuilder {
    constructor() {
        this.objects = [];
        this.offsets = [];
        this.pages = [];
        this.buf = [];
        this.linePos = 0; // current y on page (points from top)
        this.pageIndex = -1;
        this.pageWidth = 595;
        this.pageHeight = 842;
        this.margin = 50;
        this.contentWidth = this.pageWidth - this.margin * 2;
    }

    // --- low-level PDF primitives ---

    _addObj(content) {
        const id = this.objects.length + 1;
        this.objects.push({ id, content });
        return id;
    }

    _hex(str) {
        let h = '';
        for (let i = 0; i < str.length; i++) {
            h += str.charCodeAt(i).toString(16).padStart(2, '0');
        }
        return '<' + h + '>';
    }

    _pdfStr(str) {
        // Replace special chars
        return '(' + str
            .replace(/\\/g, '\\\\')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)')
            .replace(/\r/g, '\\r')
            + ')';
    }

    // --- build font and catalog ---

    build() {
        // Font objects
        const fontRegId = this._addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`);
        const fontBoldId = this._addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`);
        const fontItalicId = this._addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`);

        this.fontRegId = fontRegId;
        this.fontBoldId = fontBoldId;
        this.fontItalicId = fontItalicId;

        return { fontRegId, fontBoldId, fontItalicId };
    }

    addPage() {
        const pageStreamId = this.objects.length + 2; // placeholder
        const pageId = this.objects.length + 1;
        this.pages.push({ pageId, pageStreamId, content: [] });
        this.pageIndex = this.pages.length - 1;
        this.linePos = this.pageHeight - this.margin - 20; // start near top
        return pageId;
    }

    _currentPage() { return this.pages[this.pageIndex]; }

    _op(cmd) { this._currentPage().content.push(cmd); }

    setColor(r, g, b) {
        this._op(`${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)} rg`);
    }

    setStrokeColor(r, g, b) {
        this._op(`${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)} RG`);
    }

    // Draw a horizontal rule
    hRule(yPos, color = [161, 132, 108], thick = 0.5) {
        this.setStrokeColor(...color);
        this._op(`${thick} w`);
        this._op(`${this.margin} ${yPos} m ${this.pageWidth - this.margin} ${yPos} l S`);
    }

    // Estimate char width (Helvetica approximation)
    _charWidth(ch, size) {
        const code = ch.charCodeAt(0);
        // rough average glyph width: 0.55 * size for Helvetica
        return size * 0.55;
    }

    // Wrap text into lines using simple character-width heuristic
    _wrapText(text, size, maxWidth) {
        const avgW = size * 0.55;
        const charsPerLine = Math.floor(maxWidth / avgW);
        const words = text.split(' ');
        const lines = [];
        let line = '';
        for (const w of words) {
            const test = line ? line + ' ' + w : w;
            if (test.length * avgW > maxWidth && line) {
                lines.push(line);
                line = w;
            } else {
                line = test;
            }
        }
        if (line) lines.push(line);
        return lines;
    }

    // Write one line of text, return new y
    _writeLine(text, x, y, size, fontName) {
        const safe = text
            .replace(/\(/g, '\\(').replace(/\)/g, '\\)')
            .replace(/\\/g, '\\\\')
            .replace(/[^\x20-\x7E]/g, (c) => {
                // Map common unicode to ASCII equivalents
                const map = {
                    '\u2014': '-', '\u2013': '-', '\u2019': "'", '\u2018': "'",
                    '\u201c': '"', '\u201d': '"', '\u00a0': ' ', '\u2026': '...',
                    '\u00e9': 'e', '\u00e8': 'e', '\u00ea': 'e',
                    '\u00e0': 'a', '\u00e2': 'a', '\u00f6': 'o', '\u00fc': 'u',
                    '\u00e7': 'c', '\u25c7': '*', '\u25c8': '*', '\u25c6': '*',
                };
                return map[c] || '?';
            });

        this._op(`BT /${fontName} ${size} Tf ${x} ${y} Td (${safe}) Tj ET`);
        return y;
    }

    // High-level: draw text block with wrapping, advance linePos
    text(str, opts = {}) {
        const {
            size = 10, bold = false, italic = false,
            color = [40, 40, 40], x = this.margin,
            indent = 0, spaceBefore = 0, spaceAfter = 6,
            maxWidth = this.contentWidth,
        } = opts;
        const fontName = bold ? 'FBold' : italic ? 'FItalic' : 'FReg';

        this.linePos -= spaceBefore;
        if (this.linePos < this.margin + 30) this._pageBreakAuto();

        this.setColor(...color);
        const lines = this._wrapText(str, size, maxWidth - indent);
        for (const line of lines) {
            if (this.linePos < this.margin + 20) this._pageBreakAuto();
            this._writeLine(line, x + indent, this.linePos, size, fontName);
            this.linePos -= size * 1.5;
        }
        this.linePos -= spaceAfter;
    }

    _pageBreakAuto() {
        this.addPage();
    }

    space(pts) { this.linePos -= pts; }

    finalize(pageObjIds) {
        // Build page objects and streams
        const pageIds = [];
        const pageObjArr = [];

        for (const pg of this.pages) {
            const streamContent = pg.content.join('\n');
            const streamLen = streamContent.length;

            // Stream object
            const streamId = this._addObj(
                `<< /Length ${streamLen} >>\nstream\n${streamContent}\nendstream`
            );

            // Page object
            const pageId = this._addObj(
                `<< /Type /Page /Parent 2 /MediaBox [0 0 ${this.pageWidth} ${this.pageHeight}] ` +
                `/Contents ${streamId} 0 R ` +
                `/Resources << /Font << /FReg ${this.fontRegId} 0 R /FBold ${this.fontBoldId} 0 R /FItalic ${this.fontItalicId} 0 R >> >> >>`
            );
            pageIds.push(pageId);
        }
        return pageIds;
    }
}

// ───────────────────────────────────────────────
// Content helpers that write to the PDF
// ───────────────────────────────────────────────

const GOLD = [161, 132, 108];
const BLACK = [20, 20, 20];
const GREY = [100, 100, 100];
const LIGHT = [180, 170, 160];
const WHITE = [255, 255, 255];
const DARKGOLD = [120, 95, 70];

function header(pdf, text) {
    pdf.space(8);
    pdf.hRule(pdf.linePos + 6, GOLD, 0.8);
    pdf.space(4);
    pdf.text(text, { size: 13, bold: true, color: GOLD, spaceBefore: 2, spaceAfter: 4 });
}

function label(pdf, text) {
    pdf.text(text.toUpperCase(), { size: 8, bold: true, color: GOLD, spaceAfter: 2 });
}

function body(pdf, text) {
    pdf.text(text, { size: 10, color: GREY, spaceAfter: 8 });
}

function bold(pdf, text) {
    pdf.text(text, { size: 10, bold: true, color: BLACK, spaceAfter: 6 });
}

function sectionLabel(pdf, text) {
    pdf.text(text, { size: 11, bold: true, color: BLACK, spaceAfter: 3, spaceBefore: 6 });
}

function quote(pdf, text) {
    pdf.text('"' + text + '"', { size: 10, italic: true, color: GREY, indent: 20, spaceAfter: 4 });
}

function author(pdf, text) {
    pdf.text('- ' + text, { size: 9, bold: true, color: DARKGOLD, indent: 20, spaceAfter: 10 });
}

function pageTitle(pdf, num, title, url) {
    pdf.addPage();
    pdf.linePos = pdf.pageHeight - pdf.margin - 10;

    // Dark banner
    pdf._op(`${pdf.margin - 10} ${pdf.linePos - 10} ${pdf.contentWidth + 20} 36 re`);
    pdf._op('0.08 0.08 0.08 rg f');
    pdf.setColor(...GOLD);
    pdf._writeLine(`PAGE ${num}   |   ${title.toUpperCase()}`, pdf.margin, pdf.linePos + 8, 14, 'FBold');
    pdf.setColor(...LIGHT);
    pdf._writeLine(url, pdf.pageWidth - pdf.margin - url.length * 6, pdf.linePos + 8, 8, 'FReg');

    pdf.linePos -= 30;
    pdf.hRule(pdf.linePos, GOLD, 0.4);
    pdf.linePos -= 10;
}

// ───────────────────────────────────────────────
// Cover page
// ───────────────────────────────────────────────
function makeCover(pdf) {
    pdf.addPage();
    pdf.linePos = pdf.pageHeight - pdf.margin - 80;

    // Title
    pdf.text('ADITYAVARDHAN', { size: 30, bold: true, color: GOLD, spaceAfter: 6 });
    pdf.text('Website Content Document', { size: 14, color: GREY, spaceAfter: 4 });
    pdf.hRule(pdf.linePos, GOLD, 0.8);
    pdf.space(10);
    pdf.text(
        'This document contains the complete copy (all text, headings, labels, and ' +
        'microcopy) for every page and section of the AdityaVardhan website. ' +
        'It is organised page by page so that content can be reviewed, edited, ' +
        'and approved before being updated on the live site.',
        { size: 10, color: GREY, spaceAfter: 20 }
    );

    // Table of contents (manual)
    label(pdf, 'Table of Contents');
    const rows = [
        ['1', 'Home', '/'],
        ['2', 'About', '/about'],
        ['3', 'Bespoke Experience', '/bespoke'],
        ['4', 'Journal', '/journal'],
        ['5', 'Appointment', '/appointment'],
        ['-', 'Global — Navbar & Footer', 'All pages'],
    ];
    for (const [n, name, url] of rows) {
        pdf.text(`Page ${n}   ${name}   (${url})`, { size: 10, color: BLACK, spaceAfter: 4 });
    }
    pdf.space(20);
    pdf.hRule(pdf.linePos, LIGHT, 0.3);
    pdf.space(8);
    pdf.text('(c) 2025 AdityaVardhan. All rights reserved.', { size: 8, color: GREY });
}

// ───────────────────────────────────────────────
// Page 1 — HOME
// ───────────────────────────────────────────────
function makeHome(pdf) {
    pageTitle(pdf, 1, 'Home', 'adityavardhan.com/');

    // Navbar
    header(pdf, 'Navbar (Global)');
    label(pdf, 'Logo / Brand Name');
    bold(pdf, 'ADITYAVARDHAN');
    label(pdf, 'Navigation Links');
    body(pdf, 'Home  /  About  /  Bespoke  /  Journal  /  Appointment');

    // Hero
    header(pdf, 'Section 1 — Hero');
    label(pdf, 'Headline (H1)');
    bold(pdf, 'ADITYAVARDHAN');
    label(pdf, 'Tagline');
    body(pdf, 'Where timeless elegance meets contemporary design');
    label(pdf, 'Scroll indicator label');
    body(pdf, 'Scroll');

    // Collection
    header(pdf, 'Section 2 — Our Collection');
    label(pdf, 'Super-label');
    body(pdf, 'Our Collection');
    label(pdf, 'Headline');
    bold(pdf, 'Timeless Pieces');
    label(pdf, 'Collection Items (title — subtitle)');
    const colItems = [
        'The Atelier — Where vision takes form',
        'Crafted Details — Precision in every stitch',
        'Raw Materials — Only the finest textiles',
        'The Studio — A space for creation',
        'Signature Pieces — Defining modern elegance',
        'Behind The Seams — Art meets craftsmanship',
    ];
    for (const c of colItems) body(pdf, c);

    // Lookbook
    header(pdf, 'Section 3 — Lookbook');
    label(pdf, 'Super-label');
    body(pdf, 'Lookbook');
    label(pdf, 'Headline');
    bold(pdf, 'The Collection');
    label(pdf, 'Interaction hint (desktop)');
    body(pdf, 'Move your cursor to explore each piece in depth');
    label(pdf, 'Interaction hint (mobile)');
    body(pdf, 'Tap a card to explore each piece');

    // About
    header(pdf, 'Section 4 — About Us');
    label(pdf, 'Section Label');
    body(pdf, 'About Us');
    label(pdf, 'Headline');
    body(pdf, 'We believe in the power of exceptional design to transform everyday moments into extraordinary experiences.');
    label(pdf, 'Feature Cards');
    sectionLabel(pdf, 'Craftsmanship');
    body(pdf, 'Every piece is meticulously crafted with attention to the finest details, ensuring unparalleled quality.');
    sectionLabel(pdf, 'Heritage');
    body(pdf, 'Rooted in tradition, our designs celebrate timeless elegance while embracing modern sensibilities.');
    sectionLabel(pdf, 'Sustainability');
    body(pdf, 'We prioritize ethical sourcing and sustainable practices in every step of our creation process.');

    // Testimonials
    header(pdf, 'Section 5 — Testimonials');
    label(pdf, 'Section Label');
    body(pdf, 'Testimonials');
    label(pdf, 'Headline');
    body(pdf, "Words from those who've experienced the Adityavardhan difference");
    label(pdf, 'Testimonials');
    const testimonials = [
        ['Viraj Belgaonkar', 'Google Review', "One of the best places you'll find for all your bespoke fashion needs. The designer is extremely polite and personally caters to all his clients. The entire staff was very patient and attentive, making me feel extremely comfortable. Do check it out especially if there's a wedding or a party around the corner."],
        ['Rohan Kurup', 'Wedding Client', "I'm so glad I reached out to you this year for my outfits. I knew you would absolutely nail it but you ended up over delivering and how. Thanks for being a part of my big day this year."],
        ['Maitreya Kundalia', 'Google Review', 'Simply the best! Go here to see your dreams turn into reality.'],
        ['Aashika Patel', 'Bespoke Client', 'The trial pieces are excellent! Hat tip to the tailor, all three pieces are nicely done. First women\'s suit we did at the atelier.'],
        ['Satisfied Client', 'Event Client', "Celebrations were incredible! The ensembles created by you guys were just top!! Couldn't be happier! Going to be seeing each other more down the road for events and also general stuff!"],
    ];
    for (const [name, occasion, q] of testimonials) {
        quote(pdf, q);
        author(pdf, `${name}  (${occasion})`);
    }
    label(pdf, 'Google Reviews Badge');
    body(pdf, '5.0  |  See all reviews ->');
}

// ───────────────────────────────────────────────
// Page 2 — ABOUT
// ───────────────────────────────────────────────
function makeAbout(pdf) {
    pageTitle(pdf, 2, 'About', 'adityavardhan.com/about');

    header(pdf, 'Page Metadata (SEO)');
    label(pdf, 'Page Title');
    body(pdf, 'About | ADITYAVARDHAN');
    label(pdf, 'Meta Description');
    body(pdf, 'Discover the heritage and craftsmanship behind AdityaVardhan bespoke tailoring.');

    header(pdf, 'Section 1 — Page Hero');
    label(pdf, 'Establishment Label');
    body(pdf, 'Est. 2024');
    label(pdf, 'Headline (H1)');
    bold(pdf, 'Our Story');
    label(pdf, 'Sub-headline');
    body(pdf, 'A narrative of heritage, precision, and the relentless pursuit of sartorial excellence.');

    header(pdf, 'Section 2 — Brand Story');
    const brandBlocks = [
        ['01', 'A Legacy of Craft', "AdityaVardhan was born from a deep reverence for the art of bespoke tailoring. Every garment we create is a testament to generations of sartorial expertise, meticulously refined to meet the standards of the modern gentleman."],
        ['02', 'The Pursuit of Perfection', "We believe that true luxury lies in the details - the hand-finished buttonhole, the perfectly balanced lapel, the fabric that drapes just so. Our master tailors bring decades of experience to every piece, ensuring nothing less than perfection."],
        ['03', 'Modern Elegance', "While our techniques honour tradition, our designs speak to the contemporary world. We blend classic silhouettes with modern sensibilities, creating pieces that feel timeless yet undeniably of the moment."],
    ];
    for (const [num, title, text] of brandBlocks) {
        label(pdf, num);
        sectionLabel(pdf, title);
        body(pdf, text);
    }

    header(pdf, 'Section 3 — The Vision (Founder Quote)');
    label(pdf, 'Section Label');
    body(pdf, 'The Vision');
    label(pdf, 'Quote');
    quote(pdf, "We don't just make clothes. We craft an identity - a second skin that speaks of who you are, where you've been, and where you're going.");
    author(pdf, 'Aditya Vardhan, Founder & Creative Director');

    header(pdf, 'Section 4 — The Atelier (Philosophy Pillars)');
    const pillars = [
        ['Craftsmanship', 'Every piece is meticulously crafted with attention to the finest details, ensuring unparalleled quality.'],
        ['Heritage', 'Rooted in tradition, our designs celebrate timeless elegance while embracing modern sensibilities.'],
        ['Sustainability', 'We prioritize ethical sourcing and sustainable practices in every step of our creation process.'],
    ];
    for (const [title, text] of pillars) {
        sectionLabel(pdf, title);
        body(pdf, text);
    }
}

// ───────────────────────────────────────────────
// Page 3 — BESPOKE
// ───────────────────────────────────────────────
function makeBespoke(pdf) {
    pageTitle(pdf, 3, 'Bespoke Experience', 'adityavardhan.com/bespoke');

    header(pdf, 'Page Metadata (SEO)');
    label(pdf, 'Page Title');
    body(pdf, 'Bespoke Experience | ADITYAVARDHAN');
    label(pdf, 'Meta Description');
    body(pdf, 'Discover the five-step bespoke tailoring journey at AdityaVardhan.');

    header(pdf, 'Section 1 — Page Hero');
    label(pdf, 'Super-label');
    body(pdf, 'Five Steps to Perfection');
    label(pdf, 'Headline (H1)');
    bold(pdf, 'The Bespoke Experience');
    label(pdf, 'Sub-headline');
    body(pdf, 'From the first consultation to the final stitch, every step is a dialogue between your vision and our craft.');

    header(pdf, 'Section 2 — The Process (5-Step Timeline)');
    const steps = [
        ['01', 'Consultation', 'We begin with a personal consultation to understand your style, occasion, and vision. Together we define the garment that will become uniquely yours.'],
        ['02', 'Fabric Selection', "Explore our curated selection of the world's finest fabrics - from Italian superfine wools to rare silks. Each chosen for its drape, texture, and character."],
        ['03', 'Measurements', 'Our master tailors take over 30 precise measurements, capturing every nuance of your form. This blueprint ensures a fit that feels as natural as your own skin.'],
        ['04', 'Fitting Sessions', 'Through multiple fittings, we refine the garment on your body. Every adjustment is deliberate - the slope of a shoulder, the break of a trouser, the ease of movement.'],
        ['05', 'Final Delivery', 'Your finished garment is presented in our signature packaging. The result: a piece that tells your story, crafted with the precision and care it deserves.'],
    ];
    for (const [num, title, desc] of steps) {
        label(pdf, `Step ${num}`);
        sectionLabel(pdf, title);
        body(pdf, desc);
    }

    header(pdf, 'Section 3 — Client Stories (Testimonials on Bespoke Page)');
    label(pdf, 'Super-label');
    body(pdf, 'Client Stories');
    label(pdf, 'Headline');
    bold(pdf, 'Words of Trust');
    const bespokeTestimonials = [
        ['Rajesh Sharma', 'Wedding Ensemble', "The attention to detail is extraordinary. Every stitch tells a story of craftsmanship that I've never experienced anywhere else."],
        ['Vikram Patel', 'Business Collection', "AdityaVardhan doesn't just make suits - they create confidence. The moment I put on my bespoke piece, everything changed."],
        ['Arjun Mehta', 'Anniversary Celebration', 'From the first consultation to the final fitting, the experience was nothing short of exceptional. Truly bespoke in every sense.'],
    ];
    for (const [name, occasion, q] of bespokeTestimonials) {
        quote(pdf, q);
        author(pdf, `${name}  (${occasion})`);
    }
}

// ───────────────────────────────────────────────
// Page 4 — JOURNAL
// ───────────────────────────────────────────────
function makeJournal(pdf) {
    pageTitle(pdf, 4, 'Journal', 'adityavardhan.com/journal');

    header(pdf, 'Section 1 — Filter Categories');
    label(pdf, 'Filter Pills');
    body(pdf, 'All  /  Lookbook  /  Behind the Scenes  /  Fabric Stories  /  Campaign');

    header(pdf, 'Section 2 — Journal Entries (32 items)');
    const journalItems = [
        ['The Eternal Suit', 'Lookbook'],
        ['Fabric Heritage', 'Fabric Stories'],
        ['The Collective', 'Campaign'],
        ['Studio Session', 'Behind the Scenes'],
        ['The Process', 'Behind the Scenes'],
        ['Monsoon Edit', 'Lookbook'],
        ['Italian Wools', 'Fabric Stories'],
        ['Brotherhood', 'Campaign'],
        ['Modern Gentleman', 'Lookbook'],
        ['Hand Finishing', 'Behind the Scenes'],
        ['Silk & Satin', 'Fabric Stories'],
        ['Ceremonial Grace', 'Campaign'],
        ['Together We Rise', 'Campaign'],
        ['Portrait Study', 'Lookbook'],
        ['The Details', 'Behind the Scenes'],
        ['Raw Textiles', 'Fabric Stories'],
        ['Evening Wear', 'Lookbook'],
        ['Celebration', 'Campaign'],
        ['Finishing Touch', 'Behind the Scenes'],
        ['Heritage Collection', 'Lookbook'],
        ['The Cut', 'Behind the Scenes'],
        ['The Entourage', 'Campaign'],
        ['Bespoke Journey', 'Lookbook'],
        ['Linen Waves', 'Fabric Stories'],
        ['Bonds', 'Campaign'],
        ['Classic Tailoring', 'Lookbook'],
        ['Thread Work', 'Behind the Scenes'],
        ['Final Stitch', 'Behind the Scenes'],
        ['Grand Gathering', 'Campaign'],
        ['Studio Light', 'Lookbook'],
        ['Cashmere Touch', 'Fabric Stories'],
        ['Brothers in Style', 'Campaign'],
    ];
    journalItems.forEach(([title, cat], i) => {
        pdf.text(`${String(i + 1).padStart(2, ' ')}.  ${title}   [${cat}]`, { size: 10, color: GREY, spaceAfter: 5 });
    });
}

// ───────────────────────────────────────────────
// Page 5 — APPOINTMENT
// ───────────────────────────────────────────────
function makeAppointment(pdf) {
    pageTitle(pdf, 5, 'Appointment', 'adityavardhan.com/appointment');

    header(pdf, 'Section 1 — Service Selection');
    const services = [
        ['Initial Consultation', 'Discuss your style, occasion, and preferences with our expert tailors.'],
        ['Fabric Selection', 'Explore our curated library of premium fabrics from around the world.'],
        ['Trial Fitting', 'Experience the evolving garment on your body with guided adjustments.'],
        ['Alterations', 'Fine-tune an existing garment for a renewed, perfect fit.'],
        ['Final Fitting', 'The last review before your bespoke creation is complete.'],
    ];
    for (const [title, desc] of services) {
        sectionLabel(pdf, title);
        body(pdf, desc);
    }

    header(pdf, 'Section 2 — Booking Flow');
    label(pdf, 'Step Labels (Progress Bar)');
    body(pdf, 'Step 1: Date & Time     ->     Step 2: Your Details');

    label(pdf, 'Step 1: Date & Time Picker');
    body(pdf, 'Interactive calendar — user selects a date, then selects a time slot.');
    label(pdf, 'Navigation Button');
    bold(pdf, 'Next ->');

    label(pdf, 'Step 2: Your Details Form (Field Labels & Placeholders)');
    const formFields = [
        ['Full Name', 'Your full name'],
        ['Email Address', 'your@email.com'],
        ['Phone Number', '+91 XXXXX XXXXX'],
        ['Special Requests / Notes', 'Any specific requirements or preferences...'],
    ];
    for (const [field, placeholder] of formFields) {
        pdf.text(`Field: ${field}   |   Placeholder: ${placeholder}`, { size: 10, color: GREY, spaceAfter: 5 });
    }
    label(pdf, 'Submit / Confirm Button');
    bold(pdf, 'Request Appointment');
}

// ───────────────────────────────────────────────
// Global — Footer
// ───────────────────────────────────────────────
function makeFooter(pdf) {
    pageTitle(pdf, '-', 'Global — Navbar & Footer', 'All pages');

    header(pdf, 'Footer — CTA Section (hidden on Appointment page)');
    label(pdf, 'Super-label');
    body(pdf, 'Get in Touch');
    label(pdf, 'Headline');
    bold(pdf, "Let's Create Together");
    label(pdf, 'Body Copy');
    body(pdf, 'Ready to elevate your style? Reach out to discover our bespoke services and exclusive collections.');
    label(pdf, 'CTA Button Label');
    bold(pdf, 'Book Appointment ->');
    label(pdf, 'Button Links To');
    body(pdf, '/appointment');

    header(pdf, 'Footer — Bottom Bar');
    label(pdf, 'Logo / Brand');
    bold(pdf, 'ADITYAVARDHAN');
    label(pdf, 'Page Links');
    body(pdf, 'About  /  Bespoke  /  Journal  /  Appointment');
    label(pdf, 'Social Links');
    body(pdf, 'Instagram  /  Facebook  /  Pinterest');
    label(pdf, 'Copyright Notice');
    body(pdf, '(c) [Year] AdityaVardhan. All rights reserved.');
}

// ───────────────────────────────────────────────
// Assemble the PDF
// ───────────────────────────────────────────────
function main() {
    const pdf = new PDFBuilder();
    const { fontRegId, fontBoldId, fontItalicId } = pdf.build();

    makeCover(pdf);
    makeHome(pdf);
    makeAbout(pdf);
    makeBespoke(pdf);
    makeJournal(pdf);
    makeAppointment(pdf);
    makeFooter(pdf);

    // Finalize: build all objects into a PDF byte string
    const pageIds = pdf.finalize();

    // Build page streams into real PDF objects
    const allObjBodies = [];
    // obj 1 = font regular
    // obj 2 = font bold
    // obj 3 = font italic
    // Then dynamically built objects

    // Actually we need to emit objects in order.
    // Rebuild properly using a simple array approach.
    const rawObjs = [];
    let objCount = 0;

    function addRaw(content) {
        rawObjs.push({ id: ++objCount, content });
        return objCount;
    }

    // Reset and rebuild
    const frId = addRaw(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`);
    const fbId = addRaw(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`);
    const fiId = addRaw(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`);

    const pageTreeId = objCount + 1; // will add after pages

    const finalPageIds = [];

    for (const pg of pdf.pages) {
        // Fix font references in content
        const streamContent = pg.content.join('\n')
            .replace(/\/FReg /g, `/FReg `)  // already correct
            .replace(/\/FBold /g, `/FBold `)
            .replace(/\/FItalic /g, `/FItalic `);

        const sc = streamContent;
        const scLen = Buffer.byteLength(sc, 'latin1');
        const streamId = addRaw(`<< /Length ${scLen} >>\nstream\n${sc}\nendstream`);

        const pgId = addRaw(
            `<< /Type /Page /Parent ${pageTreeId} 0 R ` +
            `/MediaBox [0 0 595 842] ` +
            `/Contents ${streamId} 0 R ` +
            `/Resources << /Font << /FReg ${frId} 0 R /FBold ${fbId} 0 R /FItalic ${fiId} 0 R >> >> >>`
        );
        finalPageIds.push(pgId);
    }

    // Page tree
    const pageTreeObj = addRaw(
        `<< /Type /Pages /Count ${finalPageIds.length} /Kids [${finalPageIds.map(i => `${i} 0 R`).join(' ')}] >>`
    );
    // This won't match pageTreeId since we reserved the slot but didn't insert it. Fix ordering:
    // We need to insert this at the right ID. Let's do it differently — swap.

    // Actually the rawObjs array is already built. The pageTreeId slot needs to exist.
    // Let's insert a placeholder and fix it.
    // Simplest: just use the last object as page tree and re-reference correctly.

    // ─── Much simpler approach: emit output as-is with correct forward ref ───
    // Build the PDF output
    let out = '%PDF-1.4\n';
    const offsets = {};

    // We need pageTree before page objects to have correct IDs.
    // Re-plan with catalog at the end.
    // PDF allows forward refs, so we can emit pages first.

    // The issue is pageTreeId needs to be known in advance.
    // We already reserved pageTreeId = frId + fbId + fiId + 1 = 4.
    // But rawObjs only has frId(1), fbId(2), fiId(3), then streams and pages.
    // Let's just insert the pageTree in the right slot.

    // Insert at index 3 (0-indexed after the 3 font objs)
    const pageTreeEntry = {
        id: pageTreeId,
        content: `<< /Type /Pages /Count ${finalPageIds.length} /Kids [${finalPageIds.map(i => `${i} 0 R`).join(' ')}] >>`
    };
    rawObjs.splice(3, 0, pageTreeEntry);
    // Re-number all objects to fix IDs
    rawObjs.forEach((o, i) => { o.id = i + 1; });
    objCount = rawObjs.length;

    // Add catalog
    const catalogId = addRaw(`<< /Type /Catalog /Pages ${rawObjs[3].id} 0 R >>`);

    // Now emit
    out = '%PDF-1.4\n';
    const offArr = {};
    for (const obj of rawObjs) {
        offArr[obj.id] = out.length;
        out += `${obj.id} 0 obj\n${obj.content}\nendobj\n`;
    }

    const xrefOffset = out.length;
    out += 'xref\n';
    out += `0 ${rawObjs.length + 1}\n`;
    out += '0000000000 65535 f \n';
    for (let i = 1; i <= rawObjs.length; i++) {
        out += String(offArr[i]).padStart(10, '0') + ' 00000 n \n';
    }
    out += 'trailer\n';
    out += `<< /Size ${rawObjs.length + 1} /Root ${rawObjs[rawObjs.length - 1].id} 0 R >>\n`;
    out += 'startxref\n';
    out += `${xrefOffset}\n`;
    out += '%%EOF\n';

    fs.writeFileSync(OUTPUT, out, 'latin1');
    console.log(`PDF generated: ${OUTPUT}`);
    console.log(`Pages: ${pdf.pages.length}`);
}

main();
