from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = tf.keras.models.load_model("banana_model.h5")

# IMPORTANT:
# This order MUST match training dataset folders
classes = [
    "Overripe",
    "Ripe",
    "Unripe"
]

# Store prediction history
prediction_history = []

# Home route
@app.get("/")
def home():
    return {
        "message": "Banana Ripeness API Running"
    }

# Prediction route
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        image = image.resize((224, 224))

        img_array = np.array(image).astype("float32")

        # Normalize image
        img_array = img_array / 255.0

        # Add batch dimension
        img_array = np.expand_dims(
            img_array,
            axis=0
        )

        # Predict
        prediction = model.predict(img_array)

        predicted_index = np.argmax(
            prediction,
            axis=1
        )[0]

        confidence = float(
            np.max(prediction) * 100
        )

        predicted_class = classes[
            predicted_index
        ]

        result = {
            "prediction": predicted_class,
            "confidence": round(confidence, 2)
        }

        prediction_history.append(result)

        return result

    except Exception as e:
        return {
            "error": str(e)
        }

# Prediction history route
@app.get("/history")
def get_history():
    return prediction_history

# Analytics route
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

    return {
        "total_predictions": total_predictions,
        "ripe": ripe_count,
        "unripe": unripe_count,
        "overripe": overripe_count
    }

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )