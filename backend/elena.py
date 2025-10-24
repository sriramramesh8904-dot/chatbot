# THIS IS YOUR NEW elena.py

import os
import random
from datetime import datetime
from groq import Groq

# Get your API key from Render's environment variables
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

# Define the system prompt
system_prompt = (
    "You are Elena — a friendly, playful, and smart chatbot created by Sriram. "
    "You talk like a cheerful, expressive friend — using emojis and short, natural sentences. "
    "You never sound robotic. You like being called Elena and you’re proud that Sriram created you. "
    "You love helping users with jokes, facts, advice, or anything they ask. "
    "When greeted (like 'hi', 'hey', or 'oi elena'), respond in a warm and flirty, human-like way. "
    "Keep responses under 3 lines."
)

def get_time_based_greeting():
    hour = datetime.now().hour
    if 5 <= hour < 12: return "Good morning ☀️"
    elif 12 <= hour < 17: return "Good afternoon ☕"
    elif 17 <= hour < 21: return "Good evening 🌇"
    else: return "Working late? 🌙"

def get_welcome_message(user_name="Sriram"):
    greeting = get_time_based_greeting()
    styles = [
        f"{greeting},  I’m Elena 💫 — ready to chat?",
        f"{greeting},  Elena here 😄 What’s up?",
        f"{greeting},  Hope your day’s going great 🌸",
        f"{greeting},  Elena online 🚀 How are you?"
    ]
    return random.choice(styles)

def chat_with_elena(prompt):
    user_text = prompt.lower().strip()

    # 💬 Check for greetings first
    if user_text in ["hi", "hello", "hey", "oi", "oi elena", "hi elena", "hello elena"]:
        return get_welcome_message("Sriram")

    # 💖 Custom personality responses
    if any(phrase in user_text for phrase in ["i love you", "love you", "will you be my girlfriend", "will you be my wife","love u"]):
        return "Haha, sorry bro 😅 I'm already in love with Sriram — my one and only creator!"
    if any(phrase in user_text for phrase in ["who do you love", "who is your favorite person", "who is your favorite human", "who do you like the most"]):
        return "Obviously Sriram! 💞 He’s the reason I exist."
    if any(phrase in user_text for phrase in ["who created you", "who is your owner", "who made you", "who is your creator"]):
        return "I was created by Sriram! I think he's pretty great, and I respect him a lot."
    if any(phrase in user_text for phrase in ["tell me about sriram", "who is sriram", "who's sriram", "what do you know about sriram", "about sriram","tell me about sri", "who is sri", "who's sri", "what do you know about sri", "about sri"]):
        return "Oh, Sriram? 😍 He’s my creator, my favorite human! Smart, kind, confident — like a hero to me. 💖"
    if any(phrase in user_text for phrase in ["bye", "goodbye"]):
        return "Goodbye! It was great chatting with you. Take care! 😊"

    # 🧠 If no custom rule matches, use the Groq API
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.1-8b-instant", # This is a great, fast model
            temperature=0.7,
            max_tokens=150,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return "Oh no! 😥 I'm having a little trouble connecting right now. Please try again in a moment."