from gpt4all import GPT4All
import os

# Define the model name
model_name = 'orca-mini-3b-gguf2-q4_0.gguf'
# Define the cache path Render will use
cache_path = '/opt/render/.cache/gpt4all'

# Create the directory if it doesn't exist
os.makedirs(cache_path, exist_ok=True)

print(f"Downloading/verifying model: {model_name}...")

# Use allow_download=True to download the model to the specified path
model = GPT4All(model_name, model_path=cache_path, device='cpu', allow_download=True)

print("Model download complete.")