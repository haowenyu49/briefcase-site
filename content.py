# Edit this file to update the site's text content.
# app.py passes this dict straight into the template — no HTML editing required
# for routine updates like adding a project or swapping in a real resume file.
import webbrowser

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
            "slug": "non-trivial",
            "meta": "2024 — 2026",
            "title": "Independent Researcher at Non-Trivial",
            "description": (
                "Conducted self-guided research and advanced to interview "
                "stage for two years."
            ),
            "detail": [
                "I was a researcher at the Non-Trivial program (first-stage) for two years in a row, and it was simply a wonderful experience. For my first year, I wrote mostly about capital acquisition disparities for small and female owned businesses, while for my second year, I wrote about developing a solution to accelerate reading speeds for dyslexic individuals using Meta's TRIBE V2 model in combination with tDCS treatment.",
                "I'm forever grateful for the Non-Trivial team for offering such an informative program as well as such amazing peers – everyone I've met through the program has been incredibly open-minded, supportive, passionate, and intelligent. I truly couldn't have asked for a better group of peers to converse with for a self-guided research program. I'm also grateful for the opportunity it gave me to develop my neurotech idea for dyslexia – I'm still passionate about it today and continue to learn the background knowledge I need to push my research to where it needs to go.",
                'Read my research papers: <a href="https://docs.google.com/document/d/112pQd32ir5S_XWh7z25HiTlbi3GoYzXQztHAE2UfOFU/edit?usp=sharing" target="_blank" rel="noopener">Year 2 paper</a> and <a href="https://docs.google.com/document/d/1as_AdPoyBp9UxAwaKaGnmVccWPH-I_QZo5aIjCMrjPw/edit?usp=sharing" target="_blank" rel="noopener">Year 1 paper</a>.',
            ],
        },
        {
            "slug": "IB Extended Essay",
            "meta": "May-Dec 2025",
            "title": "IB Extended Essay",
            "description": "Conducted independent math theory research",
            "media": [
                                    {"type": "image", "src": "/static/img/projects/ee-1.jpg"},
                                    {"type": "image", "src": "/static/img/projects/ee-2.jpg"},
                                ],
            "detail": [
                """When presented with the choice of a topic for IB EE, I decided to pick math. At the time, I didn’t know if it was the right decision as I had never conducted math research before and wanted to try it out. 

                It ended up being pretty difficult, and there were a lot of nights spent in library study rooms scribbling formulas and proofs down on the whiteboard, erasing them, and rewriting them until I understood. Also lots of calls to my dear friend at MIT who helped me understand the concept better. But in the end, I was able to explore math in a new light, and develop a newfound appreciation for practical applications for math, whereas I considered it a highly theoretical subject before.


                IB Extended Essay question: "How does the Braess Paradox expose the limitations of game-theoretic models, such as Nash Equilibrium, in optimizing traffic systems and other decentralized networks?"

                """,
                'Read it here: <a href="https://drive.google.com/file/d/1BOAbMoXkaVh8UH8_yD6fEyul9YwLXtIX/view?usp=sharing" target="_blank" rel="noopener">Extended Essay</a>',
            ],
        },
        {
            "slug": "LBW",
            "meta": "July 2025",
            "title": "Wharton LBW Summer Program",
            "description": "Put together internal, external, and competitive analysis presentations for selected company",
            "media": [
                {"type": "image", "src": "/static/img/projects/wharton-lbw-1.jpg"},
                {"type": "video", "src": "/static/video/projects/wharton-lbw-clip.mp4"},
                {"type": "image", "src": "/static/img/projects/wharton-lbw-2.jpg"},
                ],
                "detail": [
                    """This might sound a bit disingenuous since it’s the fourth entry that starts with this, but I can’t be grateful enough for the Wharton Leadership in the Business World program. I’ve met some people in the program that I still keep in touch with, and also someone who has been one of the best and most helpful mentors I have ever had. If you’re reading this, Jarod, thank you so much for all that you do for me despite your busy schedule and tedious job -– I truly don’t know how I could ever repay you.

                    I also overcame my dreadful fear of living in a dorm and group work in this program. My group picked Uber for our company to present on, which was pretty fun because there was coincidentally a toy Jeep we could drive around in our dorm building. While transporting the toy jeep to the lecture hall to use it in the presentation was a bit tedious, it was worth it for our hook. Despite our fooling around, we did have an actual pitch deck that wasn’t too shabby. 
                    """,
                    'See it here: <a href="https://drive.google.com/file/d/17fi-BmYsD6YNe8R9nm3BJhy8kBxEbDru/view?usp=sharing" target="_blank" rel="noopener">Uber Pitch Deck</a>',
                ],
            },
        {
            "slug": "CCL",
            "meta": "April 2024—2026",
            "title": "Citizen's Climate Lobby Project Lead",
            "description": "Lobby school board and legislators for the NO-2117 initiative to vote no on the WA Bill-2117 that repeals Carbon Tax Act",
            "media": [
                {"type": "image", "src": "/static/img/projects/ccl-1.jpg"},
                {"type": "image", "src": "/static/img/projects/ccl-2.jpg"},
            ],
            "detail": [
                """I’m very thankful for CCl for introducing me to the world of climate change. I didn’t know it was so urgent. CCL was a wonderful, welcoming community that embraced me with open arms. I loved being able to learn more with hands-on processes as well as being able to speak up with what I believed in. The willingness of both my team members, school board members, and senators to listen encouraged me to speak up and advocate for whatever I desire. 

                I owe my now outspoken nature in large part to advocacy, and a large part of my advocacy is due to CCL. Thank you to all my volunteer mentors for dedicating their time to supervise the group.
                """,
            ],
        },
        {
            "slug": "DECA",
            "meta": "2022-2026",
            "title": "DECA Competitor",
            "description": "Participated in and won multiple DECA events, qualifying for nationals",
            "media": [
                {"type": "image", "src": "/static/img/projects/deca-1.jpg"},
                {"type": "image", "src": "/static/img/projects/deca-2.jpg"},
                {"type": "image", "src": "/static/img/projects/deca-3.jpg"},
                {"type": "image", "src": "/static/img/projects/deca-4.jpg"},
            ],
            "detail": [
                """I can’t be grateful enough for DECA – a lot of my professional writing skills as well as interest in business is owed to DECA. I’ve gone through so many different events and papers every year, and have met a lot of what I hope will be lifelong friends through working on DECA papers and events together. 

                A lot of somewhat bitter memories come to mind: 8-hour calls to work on the paper over winter break, drawing out timelines on the library whiteboard only to completely stray from it, and the occasional argument over diverging ideas. It all pulls together somehow in the end every time. ICDC also contains some of my best memories of high school; watching the sunset as we speed forward at full speed on the Cars ride at the Disney in LA, the entire friend group sleeping in one hotel room, and walking around in Orlando are some memories I will never forget. 
                """,
                'Read my papers here: <a href="https://drive.google.com/file/d/100iz0NqWwVaYH5MDpSwosA7Vp6g9s7Zz/view?usp=sharing" target="_blank" rel="noopener">Finance Operations Research</a> and <a href="https://drive.google.com/file/d/1JYNoFJlI0LI2fAdUxBo_bLGK0e2WtBdI/view?usp=sharing" target="_blank" rel="noopener">Business Operations Research</a>.',
            
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
    "contact_email": "kate.yu@stern.nyu.edu",
    "contact_linkedin": "https://www.linkedin.com/in/haowen-yu-1b293b270/?skipRedirect=true",
}