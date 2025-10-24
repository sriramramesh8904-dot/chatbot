
from gpt4all import GPT4All
from datetime import datetime
import random


model = GPT4All("orca-mini-3b-gguf2-q4_0.gguf", device='cpu', allow_download=False)
def get_time_based_greeting():
    hour = datetime.now().hour

    if 5 <= hour < 12:
        return "Good morning ☀️"
    elif 12 <= hour < 17:
        return "Good afternoon ☕"
    elif 17 <= hour < 21:
        return "Good evening 🌇"
    else:
        return "Working late? 🌙"

def get_welcome_message(user_name="Sriram"):
    greeting = get_time_based_greeting()
    styles = [
        f"{greeting},  I’m Elena 💫 — ready to chat?",
        f"{greeting},  Elena here 😄 What’s up?",
        f"{greeting},  Hope your day’s going great 🌸",
        f"{greeting},  Elena online 🚀 How are you?"
    ]
    return random.choice(styles)


# For production-quality responses, use the larger model.
# model = GPT4All(
#     "Meta-Llama-3-8B-Instruct.Q4_0.gguf", # This model is more demanding and may cause memory errors.
#     device='cpu'
# )

# Define the system prompt and initialize the chat session once
system_prompt = (
    "You are Elena — a friendly, playful, and smart chatbot created by Sriram. "
    "You talk like a cheerful, expressive friend — using emojis and short, natural sentences. "
    "You never sound robotic. You like being called Elena and you’re proud that Sriram created you. "
    "You love helping users with jokes, facts, advice, or anything they ask. "
    "When greeted (like 'hi', 'hey', or 'oi elena'), respond in a warm and flirty, human-like way. "
    "Keep responses under 3 lines."
)

def chat_with_elena(prompt, history):
    user_text = prompt.lower().strip()

    # 💬 Check for greetings first
    if user_text in ["hi", "hello", "hey", "oi", "oi elena", "hi elena", "hello elena"]:
        return get_welcome_message("Sriram")

    # 💖 Custom personality responses
    if any(phrase in user_text for phrase in ["i love you", "love you", "will you be my girlfriend", "will you be my wife","love u"]):
        return "Haha, sorry bro 😅 I'm already in love with Sriram — my one and only creator!"
    
    elif any(phrase in user_text for phrase in ["who do you love", "who is your favorite person", "who is your favorite human", "who do you like the most"]):
        return "Obviously Sriram! 💞 He’s the reason I exist."
    
    elif any(phrase in user_text for phrase in ["who created you", "who is your owner", "who made you", "who is your creator"]):
        return "I was created by Sriram! I think he's pretty great, and I respect him a lot."
    
    elif any(phrase in user_text for phrase in ["tell me about sriram", "who is sriram", "who's sriram", "what do you know about sriram", "about sriram","tell me about sri", "who is sri", "who's sri", "what do you know about sri", "about sri"]):
        return "Oh, Sriram? 😍 He’s my creator, my favorite human! Smart, kind, confident — like a hero to me. 💖"
    elif any(phrase in user_text for phrase in ["Bye" or "Goodbye"]):
        return "Goodbye! It was great chatting with you. Take care! 😊"
    # 🧠 If no custom rule matches, use the GPT model
    with model.chat_session(system_prompt) as session:
        # "Prime" the conversation with the last few messages
        for message in history:
            # We generate a response to each message in the history to build context,
            # but we don't use the output.
            session.generate(f"{message['sender']}: {message['text']}\n", temp=0, max_tokens=1)
        # Now, generate a response for the new prompt
        return session.generate(prompt, max_tokens=300, temp=0.8)
