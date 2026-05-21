import os
import requests
import json

# =====================================================================
# 🔐 GOOGLE AI STUDIO AYARLARI
# =====================================================================
# Google AI Studio'dan aldığın AIzaSy... ile başlayan key'i buraya tırnak içinde yaz
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "kendi_google_ai_studio_keyini_buraya_yaz")

def generate_report(risk_score):
    """
    Google AI Studio üzerindeki Gemma 4 modelini kullanarak 
    glokom risk skoruna göre Türkçe medikal rapor oluşturur.
    """
    # Google AI Studio Gemma 4-26b MoE Modeli Resmi Endpoint'i
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    
    headers = {
        "Content-Type": "application/json"
    }

    prompt = f"""
    Sen deneyimli bir oftalmoloji (göz hastalıkları) uzmanısın. Aşağıdaki verilere dayanarak, hastanın kimlik bilgilerine girmeden SADECE tıbbi bir analiz metni hazırla.

    VERİLER:
    - Yapay Zeka Tarafından Hesaplanan Glokom Riski: %{risk_score:.2f}

    TALİMATLAR:
    - ASLA 'Hasta Adı', 'TC No', 'Tarih' gibi kişisel bilgi alanları veya boşlukları oluşturma.
    - Metne doğrudan '1. Glokom Risk Değerlendirmesi' başlığıyla başla.
    - Giriş ve karşılama cümleleri (Örn: 'Merhaba', 'Raporunuz hazır') kullanma.

    RAPOR FORMATI:
    1. Glokom Risk Değerlendirmesi: (%{risk_score:.2f} risk skorunu tıbbi olarak yorumla)
    2. Klinik Yorum: (Skor ile glokom belirtileri arasındaki ilişkiyi profesyonel bir dille açıkla)
    3. Öneriler ve Takip: (Hastanın atması gereken klinik adımları belirt)

    Not: Raporun sonuna mutlaka 'Bu bir yapay zeka ön analizidir, kesin tanı için doktor muayenesi şarttır.' uyarısını ekle.
    
    Yanıtını tamamen Türkçe olarak ver.
    """

    # Google Gemini ve Gemma modellerinin beklediği resmi istek (payload) yapısı
    data = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
        "generationConfig": {
            "maxOutputTokens": 2000,
            "temperature": 0.2  # Tıbbi raporlarda modelin uydurmaması (tutarlı olması) için düşük sıcaklık
        }
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # Hata kodu (400, 403, 429 vb.) dönerse doğrudan exception fırlatır
        result = response.json()

        # Google API'den gelen yanıt metnini güvenli bir şekilde ayıklama adımı
        if "candidates" in result and len(result["candidates"]) > 0:
            candidate = result["candidates"][0]
            if "content" in candidate and "parts" in candidate["content"]:
                full_content = candidate["content"]["parts"][0]["text"]
                return full_content
            
        print("Google API Beklenmedik Yanıt Formatı:", json.dumps(result, indent=2))
        return "Rapor formatı çözülemedi. (API başarılı döndü fakat içerik boş)"
            
    except Exception as e:
        # Sunum anında hata kodunu terminalde net görebilmen için detaylı print bırakıyoruz
        print(f"Gemma 4 API Bağlantı Hatası: {str(e)}")
        return f"Rapor şu an oluşturulamadı. Lütfen tekrar deneyin. (Hata: {str(e)})"