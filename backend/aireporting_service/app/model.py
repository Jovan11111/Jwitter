import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
if API_KEY is None:
    print("API Key not found in .env file")
    exit()

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def analyze_post(title: str, content: str) -> int:
    print("Entering analyze_post function")

    prompt = f"This post was published on a social media app, and was reported by some user. You need to rate how offensive this post is. 0 means not offensive at all, and 10 means very very offensive. YOUR REPLY NEEDS TO BE ONLY A NUMBER, NO EXPLANATION, NO NOTHING, JUST A NUMBER 0-10. post title: {title}, post content: {content}. rate this post on how offensive it is, and reply ONLY WITH A NUMBER."
        
    payload = {
        "model": "llama3-70b-8192",
        "messages": [{"role": "user", "content": prompt}],
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(GROQ_API_URL, json=payload, headers=headers)
        response.raise_for_status()

        ai_response = response.json()

        answer = ai_response["choices"][0]["message"]["content"].strip()
        return int(answer)
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return -1  

