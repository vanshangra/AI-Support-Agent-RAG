import requests
from config.settings import (
    LLM_PROVIDER,
    OLLAMA_URL,
    OLLAMA_MODEL,
    OPENAI_API_KEY,
    OPENAI_MODEL
)

# OpenAI import (only used if needed)
from openai import OpenAI

openai_client = None

if OPENAI_API_KEY:
    openai_client = OpenAI(api_key=OPENAI_API_KEY)


def generate_answer(context, question):

    prompt = f"""
You are a support assistant.

Answer ONLY from the provided context.
If the answer is not in the context, say:
"I don't have that information."

Context:
{context}

Question:
{question}
"""

    try:

        # 🔹 OLLAMA FLOW
        if LLM_PROVIDER == "ollama":

            response = requests.post(
                f"{OLLAMA_URL}/api/generate",
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": prompt,
                    "stream": False
                }
            )

            data = response.json()
            return data.get("response", "No response generated")

        # 🔹 OPENAI FLOW
        elif LLM_PROVIDER == "openai":

            if not openai_client:
                return "OpenAI API key not configured"

            response = openai_client.chat.completions.create(
                model=OPENAI_MODEL,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0
            )

            return response.choices[0].message.content

        # 🔹 FALLBACK
        else:
            return "Unsupported LLM provider"

    except Exception as e:
        return f"LLM Error: {str(e)}"