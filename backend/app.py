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
    history = data.get("history", [])
    reply = chat_with_elena(user_input, history)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)