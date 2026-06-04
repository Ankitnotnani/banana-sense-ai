from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import shutil
import os
from datetime import datetime

from predict import predict_image

from database import engine, SessionLocal
from models import Base, PredictionHistory

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

# Home route
@app.get("/")
def home():

    return {
        "message": "BananaSense AI Backend Running"
    }

# Prediction route
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Save uploaded image
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    # AI prediction
    result = predict_image(file_path)

    # Database session
    db = SessionLocal()

    # Save history
    history = PredictionHistory(

        filename=file.filename,

        prediction=result["prediction"],

        confidence=result["confidence"],

        timestamp=str(datetime.now())
    )

    db.add(history)

    db.commit()

    db.close()

    return result

# Detection history route
@app.get("/history")
def get_history():

    db = SessionLocal()

    history = db.query(PredictionHistory).all()

    db.close()

    return history

# Dashboard analytics route
@app.get("/analytics")
def get_analytics():

    db = SessionLocal()

    history = db.query(PredictionHistory).all()

    total_scans = len(history)

    ripe_count = len(
        [h for h in history if h.prediction == "Class 1"]
    )

    unripe_count = len(
        [h for h in history if h.prediction == "Class 2"]
    )

    overripe_count = len(
        [h for h in history if h.prediction == "Class 0"]
    )

    average_confidence = 0

    if total_scans > 0:

        average_confidence = round(
            sum(h.confidence for h in history) / total_scans,
            2
        )

    db.close()

    return {

        "total_scans": total_scans,

        "ripe": ripe_count,

        "unripe": unripe_count,

        "overripe": overripe_count,

        "average_confidence": average_confidence
    }

from fastapi.responses import FileResponse
import csv

# CSV export route
@app.get("/export-csv")
def export_csv():

    db = SessionLocal()

    history = db.query(PredictionHistory).all()

    csv_file = "banana_report.csv"

    with open(csv_file, mode="w", newline="") as file:

        writer = csv.writer(file)

        # Header
        writer.writerow([
            "Filename",
            "Prediction",
            "Confidence",
            "Timestamp"
        ])

        # Data
        for item in history:

            writer.writerow([
                item.filename,
                item.prediction,
                item.confidence,
                item.timestamp
            ])

    db.close()

    return FileResponse(
        path=csv_file,
        filename=csv_file,
        media_type='text/csv'
    )