import os
import requests
import json

# OpenRouter API anahtarını buraya ekle
# Güvenlik için ortam değişkeninden alamazsa buraya tırnak içinde anahtarını yazabilirsin
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "Kendi anahtarınızı buraya ekleyin")

def generate_report(risk_score):
    # Stabil çalışan ücretsiz model ID'si
    model_name = "google/gemma-3-12b-it:free"

    url = "https://openrouter.ai/api/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", # Bazı sağlayıcılar için gerekli olabilir
        "X-Title": "RetinAL Glaucoma Project"
    }

    # 'system' rolü desteklenmediği için talimatı 'user' promptuna yedirdik
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
    """

    # 'messages' listesinde artık 'system' rolü yok, sadece 'user' var.
    data = {
        "model": model_name,
        "messages": [
            {
                "role": "user", 
                "content": prompt
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        result = response.json()

        if "choices" in result:
            full_content = result["choices"][0]["message"]["content"]
            
            # Eğer model cevapta düşünme süreçlerini (think) belirtirse temizle
            if "</think>" in full_content:
                return full_content.split("</think>")[-1].strip()
            
            return full_content
        else:
            # Hata detayını terminalde görebilmek için
            print("LLM API Hatası Detayı:", json.dumps(result, indent=2))
            return "Rapor şu an oluşturulamadı. (Model yoğun olabilir veya API anahtarı hatası)"
            
    except Exception as e:
        return f"Bağlantı hatası oluştu: {str(e)}"