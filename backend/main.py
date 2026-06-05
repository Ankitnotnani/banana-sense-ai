from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import tensorflow as tf
import numpy as np

from PIL import Image

import io
import uvicorn

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

model = tf.keras.models.load_model("banana_model.h5")

# =========================
# CLASSES
# =========================

classes = [
    "Unripe",
    "Ripe",
    "Overripe"
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
# PREDICT ROUTE
# =========================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        image = image.resize((224, 224))

        img_array = np.array(image) / 255.0

        img_array = np.expand_dims(
            img_array,
            axis=0
        )

        prediction = model.predict(img_array)

        predicted_class = classes[
            np.argmax(prediction)
        ]

        confidence = float(
            np.max(prediction)
        )

        result = {
            "filename": file.filename,
            "prediction": predicted_class,
            "confidence": round(confidence * 100, 2),
            "timestamp": datetime.now().strftime(
                "%d-%m-%Y %H:%M:%S"
            )
        }

        prediction_history.insert(0, result)

        # Keep only latest 10 predictions
        if len(prediction_history) > 10:
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

    ripe_count = len(
        [
            p for p in prediction_history
            if p["prediction"] == "Ripe"
        ]
    )

    unripe_count = len(
        [
            p for p in prediction_history
            if p["prediction"] == "Unripe"
        ]
    )

    overripe_count = len(
        [
            p for p in prediction_history
            if p["prediction"] == "Overripe"
        ]
    )

    return {
        "total_predictions": total_predictions,
        "ripe": ripe_count,
        "unripe": unripe_count,
        "overripe": overripe_count
    }

# =========================
# RUN SERVER
# =========================

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )