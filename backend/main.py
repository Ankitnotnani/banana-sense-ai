from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

import tensorflow as tf
import numpy as np

from PIL import Image

import io
import uvicorn
import csv

from datetime import datetime

app = FastAPI()

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# LOAD MODEL
# =========================

model = tf.keras.models.load_model(
    "banana_model.h5"
)

# =========================
# CLASS LABELS
# =========================

classes = [
    "Overripe",
    "Ripe",
    "Unripe"
]

# =========================
# HISTORY STORAGE
# =========================

prediction_history = []

# =========================
# HOME ROUTE
# =========================

@app.get("/")
def home():

    return {
        "message": "BananaSense AI Backend Running Successfully"
    }

# =========================
# PREDICTION ROUTE
# =========================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    try:

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        image = image.resize((224, 224))

        img_array = np.array(image)

        img_array = img_array / 255.0

        img_array = np.expand_dims(
            img_array,
            axis=0
        )

        prediction = model.predict(
            img_array
        )

        predicted_class = classes[
            np.argmax(prediction)
        ]

        confidence = float(
            np.max(prediction)
        )

        # =========================
        # EXTRA AI INSIGHTS
        # =========================

        shelf_life = ""
        storage_advice = ""
        quality_score = 0
        risk_level = ""

        if predicted_class == "Unripe":

            shelf_life = "4 - 6 days"

            storage_advice = (
                "Store at room temperature."
            )

            quality_score = 82

            risk_level = "Low"

        elif predicted_class == "Ripe":

            shelf_life = "1 - 2 days"

            storage_advice = (
                "Consume soon or refrigerate."
            )

            quality_score = 95

            risk_level = "Medium"

        else:

            shelf_life = "Consume immediately"

            storage_advice = (
                "High spoilage risk."
            )

            quality_score = 45

            risk_level = "High"

        # =========================
        # FINAL RESULT
        # =========================

        result = {

            "filename": file.filename,

            "prediction": predicted_class,

            "confidence": round(
                confidence * 100,
                2
            ),

            "timestamp": datetime.now().strftime(
                "%d-%m-%Y %H:%M:%S"
            ),

            "shelf_life": shelf_life,

            "storage_advice": storage_advice,

            "quality_score": quality_score,

            "risk_level": risk_level
        }

        # Save history
        prediction_history.insert(
            0,
            result
        )

        # Keep only latest 20
        if len(prediction_history) > 20:

            prediction_history.pop()

        return result

    except Exception as e:

        return {
            "error": str(e)
        }

# =========================
# HISTORY ROUTE
# =========================

@app.get("/history")
def get_history():

    return prediction_history

# =========================
# ANALYTICS ROUTE
# =========================

@app.get("/analytics")
def analytics():

    total_predictions = len(
        prediction_history
    )

    ripe_count = len([

        p for p in prediction_history

        if p["prediction"] == "Ripe"
    ])

    unripe_count = len([

        p for p in prediction_history

        if p["prediction"] == "Unripe"
    ])

    overripe_count = len([

        p for p in prediction_history

        if p["prediction"] == "Overripe"
    ])

    average_confidence = 0

    if total_predictions > 0:

        average_confidence = round(

            sum(
                p["confidence"]
                for p in prediction_history
            ) / total_predictions,

            2
        )

    return {

        "total_scans": total_predictions,

        "ripe": ripe_count,

        "unripe": unripe_count,

        "overripe": overripe_count,

        "average_confidence": average_confidence
    }

# =========================
# EXPORT CSV ROUTE
# =========================

@app.get("/export-csv")
def export_csv():

    filename = "prediction_history.csv"

    with open(
        filename,
        mode="w",
        newline=""
    ) as file:

        writer = csv.writer(file)

        writer.writerow([

            "Filename",

            "Prediction",

            "Confidence",

            "Timestamp",

            "Shelf Life",

            "Storage Advice",

            "Quality Score",

            "Risk Level"
        ])

        for item in prediction_history:

            writer.writerow([

                item["filename"],

                item["prediction"],

                item["confidence"],

                item["timestamp"],

                item["shelf_life"],

                item["storage_advice"],

                item["quality_score"],

                item["risk_level"]
            ])

    return FileResponse(

        path=filename,

        media_type="text/csv",

        filename=filename
    )

# =========================
# RUN SERVER
# =========================

if __name__ == "__main__":

    uvicorn.run(

        app,

        host="0.0.0.0",

        port=8000
    )