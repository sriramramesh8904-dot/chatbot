from flask import Flask, request, jsonify
from elena import chat_with_elena
from flask_cors import CORS

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "")
    reply = chat_with_elena(user_input)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    # This part is for local development only. Gunicorn will be used in production.
    app.run(host="0.0.0.0", port=5000, debug=True)