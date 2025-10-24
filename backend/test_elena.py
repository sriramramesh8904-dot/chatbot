from elena import chat_with_elena

while True:
    text = input("You: ")
    if text.lower() in ["exit", "quit"]:
        break
    print("Elena:", chat_with_elena(text))
