# Case File — Briefcase Personal Site

A personal site whose landing page is a leather briefcase you click open to
reveal the actual content. 

## Things that are still to-do / under construction

-Animating the hinges on the suitcase to actually open when the user clicks on the suitcase
-deploying site

## Project structure

```
briefcase-site/
├── app.py                 # Flask app + routes
├── content.py              # All editable site text lives here
├── requirements.txt
├── templates/
│   └── index.html          # Jinja2 template, rendered by app.py
└── static/
    ├── css/style.css        # All styling, including the briefcase animation
    └── js/script.js         # Open/close interaction + contact form logic
```

## Running it locally

1. Open this folder in VS Code (`File → Open Folder…`).
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate      # on Windows: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the app:
   ```bash
   python app.py
   ```
5. Open **http://127.0.0.1:5000** in your browser.

VS Code's Python extension will pick up the `.venv` automatically and give you
linting, autocomplete, and a built-in "Run" button if you want it.

## Editing the content

You shouldn't need to touch the HTML for routine updates — edit `content.py`:
name, role, bio, the list of projects (add/remove dict entries freely), and
the contact note. The template loops over `content["projects"]` automatically.

For visual changes (colors, spacing, the size of the briefcase itself), edit
`static/css/style.css`. The whole briefcase is sized off one variable:

```css
--px: 0.27vmin;
```

Increase it to make the briefcase bigger, decrease it to make it smaller —
every part of the case scales together automatically.

```bash
pip install gunicorn
pip freeze > requirements.txt
```

If you'd rather keep this as a purely static site (no contact-form backend,
no Python needed to host it), that's also fine — you'd just replace the
`<form>` with a `mailto:` link again and could deploy the `templates/index.html`
+ `static/` folder directly to GitHub Pages, same as before.
