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

# Class labels
classes = [
    "Unripe",
    "Ripe",
    "Overripe"
]

# Store prediction history
prediction_history = []

@app.get("/")
def home():
    return {
        "message": "Banana Ripeness API is Running Successfully"
    }

@app.get("/history")
def get_history():
    return prediction_history

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((224, 224))

        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)

        predicted_class = classes[np.argmax(prediction)]
        confidence = float(np.max(prediction))

        result = {
            "prediction": predicted_class,
            "confidence": round(confidence * 100, 2)
        }

        prediction_history.append(result)

        return result

    except Exception as e:
        return {
            "error": str(e)
        }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)