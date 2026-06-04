from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import uvicorn

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
model = tf.keras.models.load_model("banana_model.h5")

# Classes
classes = [
    "Unripe",
    "Ripe",
    "Overripe"
]

# History Storage
prediction_history = []

@app.get("/")
def home():
    return {
        "message": "Banana