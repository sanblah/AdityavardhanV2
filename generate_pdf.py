#!/usr/bin/env python3
"""
AdityaVardhan Website Content — PDF Generator
Extracts all text content from the website and organises it page-by-page, section-by-section.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    PageBreak, Table, TableStyle, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

# ─────────────── Output path ───────────────
OUTPUT = "/Users/mandar/Documents/AdityaVARDHAN V2/AdityaVardhan_Website_Content.pdf"
W, H = A4

# ─────────────── Colour Palette ───────────────
GOLD      = colors.HexColor("#A1846C")
BLACK     = colors.HexColor("#0A0A0A")
WHITE     = colors.HexColor("#FAF8F5")
GREY      = colors.HexColor("#6B6B6B")
LIGHT     = colors.HexColor("#E8E0D8")

# ─────────────── Styles ───────────────
BASE = getSampleStyleSheet()

def style(name, **kw):
    defaults = dict(fontName="Helvetica", fontSize=10, leading=14,
                    textColor=BLACK, spaceAfter=6, spaceBefore=0)
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)

# Brand / page label
S_DOC_TITLE  = style("docTitle",    fontName="Helvetica-Bold", fontSize=28,
                     textColor=GOLD,  leading=34, spaceAfter=4,  alignment=TA_CENTER)
S_DOC_SUB    = style("docSub",      fontName="Helvetica",      fontSize=11,
                     textColor=GREY,  leading=16, spaceAfter=30, alignment=TA_CENTER)

# Page heading (PAGE 1 — HOME)
S_PAGE_TITLE = style("pageTitle",   fontName="Helvetica-Bold", fontSize=20,
                     textColor=WHITE, leading=26, spaceAfter=2,  alignment=TA_LEFT)
S_PAGE_SUB   = style("pageSub",     fontName="Helvetica",      fontSize=10,
                     textColor=GOLD,  leading=14, spaceAfter=18, alignment=TA_LEFT)

# Section heading (Hero, About Us…)
S_SECTION    = style("section",     fontName="Helvetica-Bold", fontSize=13,
                     textColor=GOLD,  leading=18, spaceAfter=4,  spaceBefore=14)
S_SUBSECTION = style("subsection",  fontName="Helvetica-Bold", fontSize=11,
                     textColor=BLACK, leading=16, spaceAfter=3,  spaceBefore=8)  
S_LABEL      = style("label",       fontName="Helvetica-Bold", fontSize=9,
                     textColor=GOLD,  leading=12, spaceAfter=2)
S_BODY       = style("body",        fontName="Helvetica",      fontSize=10,
                     textColor=GREY,  leading=16, spaceAfter=8)
S_QUOTE      = style("quote",       fontName="Helvetica-Oblique", fontSize=10,
                     textColor=GREY,  leading=16, spaceAfter=6,  leftIndent=20)
S_AUTHOR     = style("author",      fontName="Helvetica-Bold", fontSize=9,
                     textColor=GOLD,  leading=13, spaceAfter=4,  leftIndent=20)
S_NOTE       = style("note",        fontName="Helvetica",      fontSize=8,
                     textColor=GREY,  leading=12, spaceAfter=4)

def gold_rule():
    return HRFlowable(width="100%", thickness=0.6, color=GOLD, spaceAfter=10, spaceBefore=6)

def light_rule():
    return HRFlowable(width="100%", thickness=0.3, color=LIGHT, spaceAfter=8, spaceBefore=4)

def section_header(title, url_label=""):
    items = [gold_rule(), Paragraph(title, S_SECTION)]
    if url_label:
        items.append(Paragraph(url_label, S_NOTE))
    return items

def page_header(page_num, page_name, url=""):
    # coloured banner row
    data = [[Paragraph(f"PAGE {page_num}", S_PAGE_SUB),
             Paragraph(page_name.upper(), S_PAGE_TITLE),
             Paragraph(url, S_NOTE)]]
    t = Table(data, colWidths=[35*mm, 110*mm, 45*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0,0), (-1,-1), BLACK),
        ("TOPPADDING",  (0,0), (-1,-1), 8),
        ("BOTTOMPADDING",(0,0),(-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 8),
        ("VALIGN",      (0,0), (-1,-1), "MIDDLE"),
    ]))
    return [t, Spacer(1, 10)]

# ─────────────── Cover page ───────────────
def cover():
    story = []
    story.append(Spacer(1, 60))
    story.append(Paragraph("ADITYAVARDHAN", S_DOC_TITLE))
    story.append(Paragraph("Website Content Document", S_DOC_SUB))
    story.append(gold_rule())
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "This document contains the complete copy (all text, headings, labels, and microcopy) "
        "for every page and section of the AdityaVardhan website. "
        "It is organised page by page so that content can be reviewed, edited, and approved "
        "before being updated on the live site.",
        S_BODY))
    story.append(Spacer(1, 14))

    toc_data = [
        [Paragraph("Page #", S_LABEL), Paragraph("Section", S_LABEL), Paragraph("URL", S_LABEL)],
        [Paragraph("1", S_BODY), Paragraph("Home", S_BODY), Paragraph("/", S_BODY)],
        [Paragraph("2", S_BODY), Paragraph("About", S_BODY), Paragraph("/about", S_BODY)],
        [Paragraph("3", S_BODY), Paragraph("Bespoke Experience", S_BODY), Paragraph("/bespoke", S_BODY)],
        [Paragraph("4", S_BODY), Paragraph("Journal", S_BODY), Paragraph("/journal", S_BODY)],
        [Paragraph("5", S_BODY), Paragraph("Appointment", S_BODY), Paragraph("/appointment", S_BODY)],
        [Paragraph("—", S_BODY), Paragraph("Global (Navbar, Footer)", S_BODY), Paragraph("All pages", S_BODY)],
    ]
    toc = Table(toc_data, colWidths=[20*mm, 100*mm, 60*mm])
    toc.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,0), GOLD),
        ("TEXTCOLOR",    (0,0), (-1,0), WHITE),
        ("LINEBELOW",    (0,0), (-1,0), 0.5, GOLD),
        ("LINEBELOW",    (0,1), (-1,-1), 0.3, LIGHT),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE, colors.HexColor("#F8F4F0")]),
        ("TOPPADDING",   (0,0), (-1,-1), 6),
        ("BOTTOMPADDING",(0,0), (-1,-1), 6),
        ("LEFTPADDING",  (0,0), (-1,-1), 6),
    ]))
    story.append(toc)
    story.append(Spacer(1, 20))
    story.append(Paragraph("© 2025 AdityaVardhan. All rights reserved.", S_NOTE))
    story.append(PageBreak())
    return story


# ─────────────── PAGE 1 — HOME ───────────────
def page_home():
    s = []
    s += page_header(1, "Home", "adityavardhan.com/")

    # ── NAVBAR (global, listed here for reference) ──
    s += section_header("Navbar (Global)")
    s.append(Paragraph("Logo / Brand Name", S_LABEL))
    s.append(Paragraph("ADITYAVARDHAN", S_BODY))
    s.append(Paragraph("Navigation Links", S_LABEL))
    nav_data = [
        [Paragraph("Label", S_LABEL), Paragraph("URL", S_LABEL)],
        [Paragraph("Home", S_BODY), Paragraph("/", S_BODY)],
        [Paragraph("About", S_BODY), Paragraph("/about", S_BODY)],
        [Paragraph("Bespoke", S_BODY), Paragraph("/bespoke", S_BODY)],
        [Paragraph("Journal", S_BODY), Paragraph("/journal", S_BODY)],
        [Paragraph("Appointment", S_BODY), Paragraph("/appointment", S_BODY)],
    ]
    t = Table(nav_data, colWidths=[80*mm, 80*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0,0),(-1,0), GOLD),
        ("TEXTCOLOR",   (0,0),(-1,0), WHITE),
        ("LINEBELOW",   (0,0),(-1,-1), 0.3, LIGHT),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE, colors.HexColor("#F8F4F0")]),
        ("TOPPADDING",  (0,0),(-1,-1), 5),
        ("BOTTOMPADDING",(0,0),(-1,-1), 5),
        ("LEFTPADDING", (0,0),(-1,-1), 6),
    ]))
    s.append(t)
    s.append(Spacer(1, 12))

    # ── HERO ──
    s += section_header("Section 1 — Hero")
    s.append(Paragraph("Headline (H1)", S_LABEL))
    s.append(Paragraph("ADITYAVARDHAN", S_BODY))
    s.append(Paragraph("Tagline", S_LABEL))
    s.append(Paragraph("Where timeless elegance meets contemporary design", S_BODY))
    s.append(Paragraph("Scroll Indicator Label", S_LABEL))
    s.append(Paragraph("Scroll", S_BODY))

    # ── COLLECTION (ParallaxGallery) ──
    s += section_header("Section 2 — Our Collection")
    s.append(Paragraph("Super-label", S_LABEL))
    s.append(Paragraph("Our Collection", S_BODY))
    s.append(Paragraph("Headline", S_LABEL))
    s.append(Paragraph("Timeless Pieces", S_BODY))
    s.append(Paragraph("Collection Items", S_LABEL))
    items = [
        ("The Atelier", "Where vision takes form"),
        ("Crafted Details", "Precision in every stitch"),
        ("Raw Materials", "Only the finest textiles"),
        ("The Studio", "A space for creation"),
        ("Signature Pieces", "Defining modern elegance"),
        ("Behind The Seams", "Art meets craftsmanship"),
    ]
    for title, sub in items:
        s.append(Paragraph(f"<b>{title}</b> — {sub}", S_BODY))

    # ── LOOKBOOK (ParallaxCards) ──
    s += section_header("Section 3 — Lookbook")
    s.append(Paragraph("Super-label", S_LABEL))
    s.append(Paragraph("Lookbook", S_BODY))
    s.append(Paragraph("Headline", S_LABEL))
    s.append(Paragraph("The Collection", S_BODY))
    s.append(Paragraph("Interaction Hint (desktop)", S_LABEL))
    s.append(Paragraph("Move your cursor to explore each piece in depth", S_BODY))
    s.append(Paragraph("Interaction Hint (mobile)", S_LABEL))
    s.append(Paragraph("Tap a card to explore each piece", S_BODY))

    # ── ABOUT ──
    s += section_header("Section 4 — About Us")
    s.append(Paragraph("Section Label", S_LABEL))
    s.append(Paragraph("About Us", S_BODY))
    s.append(Paragraph("Headline", S_LABEL))
    s.append(Paragraph(
        "We believe in the power of exceptional design to transform "
        "everyday moments into extraordinary experiences.", S_BODY))

    about_cards = [
        ("Craftsmanship", "Every piece is meticulously crafted with attention to the finest details, ensuring unparalleled quality."),
        ("Heritage", "Rooted in tradition, our designs celebrate timeless elegance while embracing modern sensibilities."),
        ("Sustainability", "We prioritize ethical sourcing and sustainable practices in every step of our creation process."),
    ]
    for title, desc in about_cards:
        s.append(Paragraph(f"<b>{title}</b>", S_SUBSECTION))
        s.append(Paragraph(desc, S_BODY))

    # ── TESTIMONIALS ──
    s += section_header("Section 5 — Testimonials")
    s.append(Paragraph("Section Label", S_LABEL))
    s.append(Paragraph("Testimonials", S_BODY))
    s.append(Paragraph("Headline", S_LABEL))
    s.append(Paragraph(
        "Words from those who've experienced the Adityavardhan difference", S_BODY))

    testimonials = [
        ("Viraj Belgaonkar", "Google Review",
         "One of the best places you'll find for all your bespoke fashion needs. The designer is extremely polite and personally caters to all his clients. The entire staff was very patient and attentive, making me feel extremely comfortable. Do check it out especially if there's a wedding or a party around the corner."),
        ("Rohan Kurup", "Wedding Client",
         "I'm so glad I reached out to you this year for my outfits. I knew you would absolutely nail it but you ended up over delivering and how. Thanks for being a part of my big day this year."),
        ("Maitreya Kundalia", "Google Review",
         "Simply the best! Go here to see your dreams turn into reality."),
        ("Aashika Patel", "Bespoke Client",
         "The trial pieces are excellent! Hat tip to the tailor, all three pieces are nicely done. First women's suit we did at the atelier."),
        ("Satisfied Client", "Event Client",
         "Celebrations were incredible! The ensembles created by you guys were just top!! Couldn't be happier! Going to be seeing each other more down the road for events and also general stuff!"),
    ]
    for name, occasion, quote in testimonials:
        s.append(Paragraph(f'"{quote}"', S_QUOTE))
        s.append(Paragraph(f"— {name} · {occasion}", S_AUTHOR))
    s.append(Paragraph("Google Reviews Badge Text", S_LABEL))
    s.append(Paragraph("5.0 · See all reviews →", S_BODY))

    s.append(PageBreak())
    return s


# ─────────────── PAGE 2 — ABOUT ───────────────
def page_about():
    s = []
    s += page_header(2, "About", "adityavardhan.com/about")

    # SEO
    s += section_header("Page Metadata (SEO)")
    s.append(Paragraph("<b>Title:</b> About | ADITYAVARDHAN", S_BODY))
    s.append(Paragraph(
        "<b>Description:</b> Discover the heritage and craftsmanship behind AdityaVardhan bespoke tailoring.", S_BODY))

    # Hero
    s += section_header("Section 1 — Page Hero")
    s.append(Paragraph("Est. Label", S_LABEL))
    s.append(Paragraph("Est. 2024", S_BODY))
    s.append(Paragraph("Headline (H1)", S_LABEL))
    s.append(Paragraph("Our Story", S_BODY))
    s.append(Paragraph("Sub-headline", S_LABEL))
    s.append(Paragraph(
        "A narrative of heritage, precision, and the relentless pursuit of sartorial excellence.", S_BODY))

    # Brand Story
    s += section_header("Section 2 — Brand Story")
    brand_blocks = [
        ("01", "A Legacy of Craft",
         "AdityaVardhan was born from a deep reverence for the art of bespoke tailoring. Every garment we create is a testament to generations of sartorial expertise, meticulously refined to meet the standards of the modern gentleman."),
        ("02", "The Pursuit of Perfection",
         "We believe that true luxury lies in the details — the hand-finished buttonhole, the perfectly balanced lapel, the fabric that drapes just so. Our master tailors bring decades of experience to every piece, ensuring nothing less than perfection."),
        ("03", "Modern Elegance",
         "While our techniques honour tradition, our designs speak to the contemporary world. We blend classic silhouettes with modern sensibilities, creating pieces that feel timeless yet undeniably of the moment."),
    ]
    for num, title, text in brand_blocks:
        s.append(Paragraph(num, S_LABEL))
        s.append(Paragraph(title, S_SUBSECTION))
        s.append(Paragraph(text, S_BODY))

    # Founder Vision
    s += section_header("Section 3 — The Vision (Founder Quote)")
    s.append(Paragraph("Label", S_LABEL))
    s.append(Paragraph("The Vision", S_BODY))
    s.append(Paragraph("Quote", S_LABEL))
    s.append(Paragraph(
        u"\u201cWe don\u2019t just make clothes. We craft an identity \u2014 a second skin that speaks of "
        u"who you are, where you\u2019ve been, and where you\u2019re going.\u201d", S_QUOTE))
    s.append(Paragraph("— Aditya Vardhan", S_AUTHOR))
    s.append(Paragraph("Founder & Creative Director", S_AUTHOR))

    # Atelier / Pillars
    s += section_header("Section 4 — The Atelier (Philosophy Pillars)")
    pillars = [
        ("Craftsmanship",
         "Every piece is meticulously crafted with attention to the finest details, ensuring unparalleled quality."),
        ("Heritage",
         "Rooted in tradition, our designs celebrate timeless elegance while embracing modern sensibilities."),
        ("Sustainability",
         "We prioritize ethical sourcing and sustainable practices in every step of our creation process."),
    ]
    for title, text in pillars:
        s.append(Paragraph(f"<b>{title}</b>", S_SUBSECTION))
        s.append(Paragraph(text, S_BODY))

    s.append(PageBreak())
    return s


# ─────────────── PAGE 3 — BESPOKE ───────────────
def page_bespoke():
    s = []
    s += page_header(3, "Bespoke Experience", "adityavardhan.com/bespoke")

    # SEO
    s += section_header("Page Metadata (SEO)")
    s.append(Paragraph("<b>Title:</b> Bespoke Experience | ADITYAVARDHAN", S_BODY))
    s.append(Paragraph(
        "<b>Description:</b> Discover the five-step bespoke tailoring journey at AdityaVardhan.", S_BODY))

    # Hero
    s += section_header("Section 1 — Page Hero")
    s.append(Paragraph("Super-label", S_LABEL))
    s.append(Paragraph("Five Steps to Perfection", S_BODY))
    s.append(Paragraph("Headline (H1)", S_LABEL))
    s.append(Paragraph("The Bespoke Experience", S_BODY))
    s.append(Paragraph("Sub-headline", S_LABEL))
    s.append(Paragraph(
        "From the first consultation to the final stitch, every step is a dialogue "
        "between your vision and our craft.", S_BODY))

    # Process Timeline
    s += section_header("Section 2 — The Process (5-Step Timeline)")
    steps = [
        ("01", "Consultation",
         "We begin with a personal consultation to understand your style, occasion, and vision. "
         "Together we define the garment that will become uniquely yours."),
        ("02", "Fabric Selection",
         "Explore our curated selection of the world's finest fabrics — from Italian superfine wools "
         "to rare silks. Each chosen for its drape, texture, and character."),
        ("03", "Measurements",
         "Our master tailors take over 30 precise measurements, capturing every nuance of your form. "
         "This blueprint ensures a fit that feels as natural as your own skin."),
        ("04", "Fitting Sessions",
         "Through multiple fittings, we refine the garment on your body. Every adjustment is "
         "deliberate — the slope of a shoulder, the break of a trouser, the ease of movement."),
        ("05", "Final Delivery",
         "Your finished garment is presented in our signature packaging. The result: a piece that "
         "tells your story, crafted with the precision and care it deserves."),
    ]
    for num, title, desc in steps:
        s.append(Paragraph(num, S_LABEL))
        s.append(Paragraph(title, S_SUBSECTION))
        s.append(Paragraph(desc, S_BODY))

    # Testimonials (Bespoke page)
    s += section_header("Section 3 — Client Stories (Testimonials)")
    s.append(Paragraph("Super-label", S_LABEL))
    s.append(Paragraph("Client Stories", S_BODY))
    s.append(Paragraph("Headline", S_LABEL))
    s.append(Paragraph("Words of Trust", S_BODY))
    bespoke_testimonials = [
        ("Rajesh Sharma", "Wedding Ensemble",
         "The attention to detail is extraordinary. Every stitch tells a story of craftsmanship "
         "that I've never experienced anywhere else."),
        ("Vikram Patel", "Business Collection",
         "AdityaVardhan doesn't just make suits — they create confidence. The moment I put on my "
         "bespoke piece, everything changed."),
        ("Arjun Mehta", "Anniversary Celebration",
         "From the first consultation to the final fitting, the experience was nothing short of "
         "exceptional. Truly bespoke in every sense."),
    ]
    for name, occasion, quote in bespoke_testimonials:
        s.append(Paragraph(f'"{quote}"', S_QUOTE))
        s.append(Paragraph(f"— {name} · {occasion}", S_AUTHOR))

    s.append(PageBreak())
    return s


# ─────────────── PAGE 4 — JOURNAL ───────────────
def page_journal():
    s = []
    s += page_header(4, "Journal", "adityavardhan.com/journal")

    s += section_header("Section 1 — Journal Grid")
    s.append(Paragraph("Filter Categories", S_LABEL))
    filters = ["All", "Lookbook", "Behind the Scenes", "Fabric Stories", "Campaign"]
    s.append(Paragraph(" · ".join(filters), S_BODY))
    s.append(Spacer(1, 8))
    s.append(Paragraph("Journal Entries", S_LABEL))

    journal_items = [
        ("The Eternal Suit", "Lookbook"),
        ("Fabric Heritage", "Fabric Stories"),
        ("The Collective", "Campaign"),
        ("Studio Session", "Behind the Scenes"),
        ("The Process", "Behind the Scenes"),
        ("Monsoon Edit", "Lookbook"),
        ("Italian Wools", "Fabric Stories"),
        ("Brotherhood", "Campaign"),
        ("Modern Gentleman", "Lookbook"),
        ("Hand Finishing", "Behind the Scenes"),
        ("Silk & Satin", "Fabric Stories"),
        ("Ceremonial Grace", "Campaign"),
        ("Together We Rise", "Campaign"),
        ("Portrait Study", "Lookbook"),
        ("The Details", "Behind the Scenes"),
        ("Raw Textiles", "Fabric Stories"),
        ("Evening Wear", "Lookbook"),
        ("Celebration", "Campaign"),
        ("Finishing Touch", "Behind the Scenes"),
        ("Heritage Collection", "Lookbook"),
        ("The Cut", "Behind the Scenes"),
        ("The Entourage", "Campaign"),
        ("Bespoke Journey", "Lookbook"),
        ("Linen Waves", "Fabric Stories"),
        ("Bonds", "Campaign"),
        ("Classic Tailoring", "Lookbook"),
        ("Thread Work", "Behind the Scenes"),
        ("Final Stitch", "Behind the Scenes"),
        ("Grand Gathering", "Campaign"),
        ("Studio Light", "Lookbook"),
        ("Cashmere Touch", "Fabric Stories"),
        ("Brothers in Style", "Campaign"),
    ]
    data = [[Paragraph("#", S_LABEL), Paragraph("Title", S_LABEL), Paragraph("Category", S_LABEL)]]
    for i, (title, cat) in enumerate(journal_items, 1):
        data.append([
            Paragraph(str(i), S_BODY),
            Paragraph(title, S_BODY),
            Paragraph(cat, S_BODY),
        ])
    t = Table(data, colWidths=[15*mm, 110*mm, 65*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND",  (0,0),(-1,0), GOLD),
        ("TEXTCOLOR",   (0,0),(-1,0), WHITE),
        ("LINEBELOW",   (0,0),(-1,-1), 0.3, LIGHT),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE, colors.HexColor("#F8F4F0")]),
        ("TOPPADDING",  (0,0),(-1,-1), 5),
        ("BOTTOMPADDING",(0,0),(-1,-1), 5),
        ("LEFTPADDING", (0,0),(-1,-1), 6),
    ]))
    s.append(t)

    s.append(PageBreak())
    return s


# ─────────────── PAGE 5 — APPOINTMENT ───────────────
def page_appointment():
    s = []
    s += page_header(5, "Appointment", "adityavardhan.com/appointment")

    # Section 1 — Service Selection
    s += section_header("Section 1 — Service Selection")
    services = [
        ("Initial Consultation", "Discuss your style, occasion, and preferences with our expert tailors."),
        ("Fabric Selection", "Explore our curated library of premium fabrics from around the world."),
        ("Trial Fitting", "Experience the evolving garment on your body with guided adjustments."),
        ("Alterations", "Fine-tune an existing garment for a renewed, perfect fit."),
        ("Final Fitting", "The last review before your bespoke creation is complete."),
    ]
    for title, desc in services:
        s.append(Paragraph(f"<b>{title}</b>", S_SUBSECTION))
        s.append(Paragraph(desc, S_BODY))

    # Section 2 — Booking Flow
    s += section_header("Section 2 — Booking Flow")
    s.append(Paragraph("Step Labels (Progress Bar)", S_LABEL))
    s.append(Paragraph("1. Date & Time    →    2. Your Details", S_BODY))
    s.append(Paragraph("Step 1: Date & Time Picker", S_LABEL))
    s.append(Paragraph(
        "User selects a date from an interactive calendar, then selects a time slot.", S_BODY))
    s.append(Paragraph("Navigation Button", S_LABEL))
    s.append(Paragraph("Next →", S_BODY))
    s.append(Paragraph("Step 2: Your Details Form", S_LABEL))

    form_fields = [
        ("Full Name", "Your full name", "text"),
        ("Email Address", "your@email.com", "email"),
        ("Phone Number", "+91 XXXXX XXXXX", "tel"),
        ("Special Requests / Notes", "Any specific requirements or preferences…", "textarea"),
    ]
    fd = [[Paragraph("Field", S_LABEL), Paragraph("Placeholder", S_LABEL), Paragraph("Type", S_LABEL)]]
    for field, placeholder, ftype in form_fields:
        fd.append([
            Paragraph(field, S_BODY),
            Paragraph(placeholder, S_BODY),
            Paragraph(ftype, S_BODY),
        ])
    ft = Table(fd, colWidths=[60*mm, 90*mm, 30*mm])
    ft.setStyle(TableStyle([
        ("BACKGROUND",  (0,0),(-1,0), GOLD),
        ("TEXTCOLOR",   (0,0),(-1,0), WHITE),
        ("LINEBELOW",   (0,0),(-1,-1), 0.3, LIGHT),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE, colors.HexColor("#F8F4F0")]),
        ("TOPPADDING",  (0,0),(-1,-1), 5),
        ("BOTTOMPADDING",(0,0),(-1,-1), 5),
        ("LEFTPADDING", (0,0),(-1,-1), 6),
    ]))
    s.append(ft)
    s.append(Spacer(1, 8))
    s.append(Paragraph("Submit Button", S_LABEL))
    s.append(Paragraph("Request Appointment", S_BODY))

    s.append(PageBreak())
    return s


# ─────────────── GLOBAL — FOOTER ───────────────
def page_footer_global():
    s = []
    s += page_header("—", "Global Components", "All Pages")

    s += section_header("Footer — CTA Section (hidden on Appointment page)")
    s.append(Paragraph("Super-label", S_LABEL))
    s.append(Paragraph("Get in Touch", S_BODY))
    s.append(Paragraph("Headline", S_LABEL))
    s.append(Paragraph("Let's Create Together", S_BODY))
    s.append(Paragraph("Body Copy", S_LABEL))
    s.append(Paragraph(
        "Ready to elevate your style? Reach out to discover our bespoke services and exclusive collections.",
        S_BODY))
    s.append(Paragraph("CTA Button", S_LABEL))
    s.append(Paragraph("Book Appointment →", S_BODY))
    s.append(Paragraph("Button Links to", S_LABEL))
    s.append(Paragraph("/appointment", S_BODY))

    s += section_header("Footer — Bottom Bar")
    s.append(Paragraph("Logo / Brand", S_LABEL))
    s.append(Paragraph("ADITYAVARDHAN", S_BODY))
    s.append(Paragraph("Page Links", S_LABEL))
    s.append(Paragraph("About · Bespoke · Journal · Appointment", S_BODY))
    s.append(Paragraph("Social Links", S_LABEL))
    s.append(Paragraph("Instagram · Facebook · Pinterest", S_BODY))
    s.append(Paragraph("Copyright Notice", S_LABEL))
    s.append(Paragraph("© [Year] AdityaVardhan. All rights reserved.", S_BODY))

    return s


# ─────────────── Main ───────────────
def build():
    doc = SimpleDocTemplate(
        OUTPUT, pagesize=A4,
        leftMargin=20*mm, rightMargin=20*mm,
        topMargin=20*mm, bottomMargin=20*mm,
        title="AdityaVardhan Website Content",
        author="AdityaVardhan",
    )

    story = []
    story += cover()
    story += page_home()
    story += page_about()
    story += page_bespoke()
    story += page_journal()
    story += page_appointment()
    story += page_footer_global()

    doc.build(story)
    print(f"✅ PDF generated: {OUTPUT}")

if __name__ == "__main__":
    build()
