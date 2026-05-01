from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image


model = load_model("densenet121_glaucoma_final.keras")

def preprocess_image(image):
    image = image.resize((224, 224))
    image = np.array(image).astype("float32") / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def predict(image):
    processed = preprocess_image(image)

    pred = model.predict(processed)[0][0]

    # yüzdeye çevir
    risk_score = float(pred * 100)

    # label üret
    label = "Glaucoma" if pred > 0.5 else "Normal"

    return risk_score, label