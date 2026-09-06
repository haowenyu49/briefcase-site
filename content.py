# Edit this file to update the site's text content.
# app.py passes this dict straight into the template — no HTML editing required
# for routine updates like adding a project or swapping in a real resume file.

SITE_CONTENT = {
    # ---- Landing page (closed briefcase) ----
    "landing_title": "What's in my briefcase?",
    "landing_hint": "Click to open",

    # ---- Shared across every page ----
    "name": "Kate Yu",
    "nav": [
        {"label": "Work", "endpoint": "index"},
        {"label": "Play", "endpoint": "play"},
        {"label": "Contact", "endpoint": "contact"},
    ],
    "photo_initials": "KY",  # shown in picture placeholders until you add a real photo

    # ---- Work page (also the homepage, right after the briefcase opens) ----
    "bio": (
        "Kate is currently an undergraduate Business, Technology, and Entrepreneurship student "
        "at the NYU Stern school of business with minor in Advanced Mathematical Methods. She is "
        "passionate about combining business, technology, and neuroscience."
    ),
    "resumes": [
        {"label": "High School Resume", "file": "high-school-resume.pdf"},
        {"label": "College Resume", "file": "college-resume.pdf"},
    ],

    # Each project needs a unique "slug" — that's what becomes its URL,
    # e.g. slug "ledger-app" -> /work/ledger-app
    # "description" shows on the Work list; "detail" is the longer write-up
    # shown on the project's own page (a list of paragraphs).
    "projects": [
        {
            "slug": "ledger-app",
            "meta": "2024 — 2025",
            "title": "Ledger, a budgeting app for freelancers",
            "description": (
                "Redesigned the onboarding flow and cut time-to-first-transaction "
                "by 40%. Led research, IA, and the visual system."
            ),
            "detail": [
                "Ledger is a budgeting app aimed at freelancers who don't have a "
                "predictable paycheck. The original onboarding flow assumed a "
                "steady salary, which meant new users hit a wall in the first "
                "five minutes trying to set up a budget that didn't fit their income.",
                "I led research with 14 freelance users, redesigned the onboarding "
                "around variable income instead of fixed paychecks, and rebuilt the "
                "visual system so the whole app felt calmer under a lot of numbers. "
                "Time-to-first-transaction dropped 40% after launch.",
            ],
        },
        {
            "slug": "northwind-design-system",
            "meta": "2023",
            "title": "Northwind Design System",
            "description": "Built a token-based component library adopted across four product teams.",
            "detail": [
                "Northwind started as an internal frustration: four product teams, "
                "four slightly different buttons, four different shades of the same "
                "blue. I built a token-based design system — colors, spacing, and "
                "type as shared variables instead of copy-pasted values.",
                "Rolling it out took more convincing than building it. The real work "
                "was pairing with each team to migrate one screen at a time instead "
                "of asking anyone to do a big-bang rewrite.",
            ],
        },
        {
            "slug": "small-batch-shop",
            "meta": "2022",
            "title": "Small-batch: a woodworking shop site",
            "description": "Sold out three product drops. Photography, copy, and front-end all mine.",
            "detail": [
                "Small-batch is a one-person woodworking shop's storefront — mine. "
                "Every drop is limited, so the site needed to handle a rush of "
                "traffic in a short window without falling over.",
                "I shot the product photography, wrote the copy, and built the "
                "front-end myself. All three drops sold out within a few hours "
                "of going live.",
            ],
        },
    ],

    # ---- Play page ----
    "art_heading": "art",
    "sketchbook": [
        "/static/img/sketchbook/page1.jpg",
        "/static/img/sketchbook/page2.jpg",
        "/static/img/sketchbook/page3.jpg",
        "/static/img/sketchbook/page4.jpg",
        "/static/img/sketchbook/page5.jpg",
        "/static/img/sketchbook/page6.jpg",
    ],
    # ---- Photography carousel (below the sketchbook, same Play page) ----
    "photography_heading": "Photography",
    "photography_photos": [
        "/static/img/photography/photo1.jpg",
        "/static/img/photography/photo2.jpg",
        "/static/img/photography/photo3.jpg",
        "/static/img/photography/photo4.jpg",
        "/static/img/photography/photo5.jpg",
        "/static/img/photography/photo6.jpg",
        "/static/img/photography/photo7.jpg",
        "/static/img/photography/photo8.jpg",
    ],

    # ---- Contact page ----
    "contact_note": "Feel free to reach out.",
    "contact_email": "haowenyu2016@gmail.com",
    "contact_linkedin": "https://www.linkedin.com/in/haowen-yu-1b293b270/?skipRedirect=true",
}