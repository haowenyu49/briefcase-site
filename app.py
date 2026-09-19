from flask import Flask, render_template, abort
import webbrowser

from content import SITE_CONTENT

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html", content=SITE_CONTENT, active_page="index")


@app.route("/work/<slug>")
def project_detail(slug):
    project = next((p for p in SITE_CONTENT["projects"] if p["slug"] == slug), None)
    if project is None:
        abort(404)
    return render_template(
        "project.html", content=SITE_CONTENT, active_page="index", project=project
    )


@app.route("/play")
def play():
    return render_template("play.html", content=SITE_CONTENT, active_page="play")


@app.route("/contact")
def contact():
    return render_template("contact.html", content=SITE_CONTENT, active_page="contact")


if __name__ == "__main__":
    app.run(debug=True)