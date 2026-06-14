from flask import Flask

print("Starting Flask...")

app = Flask(__name__)

@app.route("/")
def home():
    return "Welcome To CodeType"

if __name__ == "__main__":
    print("Running Server...")
    app.run(debug=True)