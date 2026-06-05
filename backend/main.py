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

model = tf.keras.models.load_model(
    "banana_model.h5"
)

# =========================
# CLASSES
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
        "message":
        "BananaSense AI Backend Running Successfully"
    }

# =========================
# AI INSIGHTS
# =========================

def generate_ai_insights(
    prediction,
    confidence
):

    if prediction == "Unripe":

        return {

            "quality_score":
            82,

            "shelf_life":
            "4 - 6 days",

            "risk_level":
            "Low",

            "storage":
            "Store at room temperature away from direct sunlight.",

            "recommendation":
            "Suitable for transportation and warehouse storage.",

            "summary":
            "Banana is currently unripe and ideal for long-distance logistics."
        }

    elif prediction == "Ripe":

        return {

            "quality_score":
            94,

            "shelf_life":
            "1 - 2 days",

            "risk_level":
            "Medium",

            "storage":
            "Best stored at cool room temperature.",

            "recommendation":
            "Ideal for immediate retail sale or consumption.",

            "summary":
            "Banana has reached optimal ripeness for consumption."
        }

    else:

        return {

            "quality_score":
            68,

            "shelf_life":
            "Less than 1 day",

            "risk_level":
            "High",

            "storage":
            "Consume quickly or refrigerate immediately.",

            "recommendation":
            "Best suited for smoothies, baking, or processing.",

            "summary":
            "Banana is overripe and nearing spoilage."
        }

# =========================
# PREDICT ROUTE
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

        image = image.resize(
            (224, 224)
        )

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

        insights = generate_ai_insights(
            predicted_class,
            confidence
        )

        result = {

            "filename":
            file.filename,

            "prediction":
            predicted_class,

            "confidence":
            round(confidence * 100, 2),

            "timestamp":
            datetime.now().strftime(
                "%d-%m-%Y %H:%M:%S"
            ),

            "quality_score":
            insights["quality_score"],

            "shelf_life":
            insights["shelf_life"],

            "risk_level":
            insights["risk_level"],

            "storage":
            insights["storage"],

            "recommendation":
            insights["recommendation"],

            "summary":
            insights["summary"]
        }

        prediction_history.insert(
            0,
            result
        )

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

    avg_confidence = 0

    if total_predictions > 0:

        avg_confidence = round(
            sum([
                p["confidence"]
                for p in prediction_history
            ]) / total_predictions,
            2
        )

    return {

        "total_predictions":
        total_predictions,

        "ripe":
        ripe_count,

        "unripe":
        unripe_count,

        "overripe":
        overripe_count,

        "average_confidence":
        avg_confidence
    }

# =========================
# SERVER
# =========================

if __name__ == "__main__":

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )