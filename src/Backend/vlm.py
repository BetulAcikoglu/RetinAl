import os
import base64
import requests

# OpenRouter API anahtarını buraya ekle veya .env'den çek
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "Kendi anahtarınızı buraya ekleyin")

def encode_image(image_bytes):
    return base64.b64encode(image_bytes).decode("utf-8")

def vlm_analyze(image_bytes):
    base64_image = encode_image(image_bytes)

    # OpenRouter endpoint'i
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "google/gemma-3-12b-it:free", # Ekran görüntüsündeki tam id
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text", 
                        "text": "Bu retina görüntüsünü glokom (göz tansiyonu) belirtileri açısından incele. Optik disk ve cup oranına bakarak klinik bir ön yorum yap."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        result = response.json()
        
        # OpenRouter'dan gelen yanıtı ayıkla
        if "choices" in result:
            return result["choices"][0]["message"]["content"]
        else:
            return f"Hata: {result.get('error', 'Bilinmeyen hata')}"
            
    except Exception as e:
        return f"Bağlantı hatası: {str(e)}"