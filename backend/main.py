from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf
import numpy as np
import io
import traceback

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

# LOAD MODEL SAFELY

# =========================

try:

```
model = tf.keras.models.load_model("banana_model.h5")

print("MODEL LOADED SUCCESSFULLY")
```

except Exception as e:

```
print("MODEL LOADING FAILED")

print(str(e))

traceback.print_exc()

model = None
```

CLASS_NAMES = {
0: "Overripe",
1: "Ripe",
2: "Unripe",
}

# =========================

# HOME ROUTE

# =========================

@app.get("/")
def home():

```
return {
    "message": "Banana AI Backend Running Successfully"
}
```

# =========================

# PREDICTION ROUTE

# =========================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

```
if model is None:

    return {
        "error": "Model failed to load"
    }

contents = await file.read()

image = Image.open(io.BytesIO(contents)).convert("RGB")

image = image.resize((224, 224))

image_array = np.array(image) / 255.0

image_array = np.expand_dims(image_array, axis=0)

predictions = model.predict(image_array)

predicted_class = int(np.argmax(predictions))

confidence = float(np.max(predictions) * 100)

return {
    "prediction": CLASS_NAMES[predicted_class],
    "confidence": round(confidence, 2)
}