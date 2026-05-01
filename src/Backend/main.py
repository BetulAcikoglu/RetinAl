from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

from model import predict
from vlm import vlm_analyze
from llm import generate_report

app = FastAPI()

# React bağlantısı için
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    # 1. MODEL
    risk_score, label = predict(image)
    risk_score = float(100-risk_score)

    # 2. LLM (SADECE MODEL KULLANIYOR)
    report = generate_report(risk_score)

    return {
        "risk_score": risk_score,
        "label": label,
        "report": report
    }


@app.post("/vlm")
async def vlm_only(file: UploadFile = File(...)):
    contents = await file.read()

    vlm_text = vlm_analyze(contents)

    return {
        "vlm_comment": vlm_text
    }


    