import os
import base64
import requests
import json

# =====================================================================
# 🔐 GOOGLE AI STUDIO AYARLARI
# =====================================================================
# Google AI Studio'dan aldığın AIzaSy... ile başlayan key'i buraya tırnak içinde yaz
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "kendi_google_ai_studio_keyini_buraya_yaz")

def encode_image(image_bytes):
    """Gelen resim byte verisini base64 string'e dönüştürür."""
    return base64.b64encode(image_bytes).decode("utf-8")

def vlm_analyze(image_bytes):
    """
    Google AI Studio üzerindeki Gemini 1.5 Flash modelini kullanarak 
    retina görüntüsünü (fundus fotoğrafını) glokom açısından analiz eder.
    """
    base64_image = encode_image(image_bytes)

    # Resmi kararlı sürüm olan v1 endpoint'i ve Gemini 1.5 Flash modeli
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    prompt_text = (
        "Sen uzman bir göz doktoru yapay zeka asistanısın. Bu retina fotoğrafını "
        "glokom (göz tansiyonu) riski, optik disk sınırları ve cup/disc oranı açısından inceleyip "
        "profesyonel ve detaylı bir Türkçe klinik ön yorum raporu yaz.\n\n"
        "⚠️ ÇOK KRİTİK TALİMATLAR:\n"
        "1. Rapora ASLA 'Hasta Bilgileri', 'Hasta Adı', 'Görüntü Tarihi', 'Modalite' gibi "
        "kimlik veya jenerik başlıklar ekleme. 'Bilinmiyor' şeklinde bile olsa bu alanları yazma!\n"
        "2. Metne DOĞRUDAN '**1. Görüntü Kalitesi Değerlendirmesi:**' başlığıyla başla.\n"
        "3. Giriş veya selamlama cümleleri kullanma."
    )

    # Gemini'nin resmi multimodal (Resim + Metin) istek yapısı
    data = {
        "contents": [{
            "parts": [
                {
                    "text": prompt_text
                },
                {
                    "inlineData": {
                        "mimeType": "image/jpeg",  # png yükleseniz bile jpeg base64 verisi olarak gönderebiliriz, uyumludur
                        "data": base64_image
                    }
                }
            ]
        }],
        "generationConfig": {
            "maxOutputTokens": 2000,  # Yarım kalmaması için sınırı burada da 2000 yaptık
            "temperature": 0.2        # Tutarlı, tıbbi analize uygun bir dil için düşük sıcaklık
        }
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # 400, 404, 500 gibi hatalarda doğrudan exception fırlatır
        result = response.json()
        
        # Gemini API'den gelen görsel analiz metnini ayıklama adımı
        if "candidates" in result and len(result["candidates"]) > 0:
            candidate = result["candidates"][0]
            if "content" in candidate and "parts" in candidate["content"]:
                analysis_text = candidate["content"]["parts"][0]["text"]
                return analysis_text
                
        print("Google VLM API Beklenmedik Yanıt Formatı:", json.dumps(result, indent=2))
        return "Görsel analizi formatı çözülemedi."

    except Exception as e:
        print(f"Gemini VLM API Hatası Detayı: {str(e)}")
        return f"Görsel analiz şu an gerçekleştirilemedi. (Hata: {str(e)})"