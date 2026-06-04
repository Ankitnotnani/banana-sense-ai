import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Load trained model
model = tf.keras.models.load_model("banana_model.h5")

# Temporary labels
class_names = ["Class 0", "Class 1", "Class 2"]

def predict_image(img_path):

    # Load image
    img = image.load_img(img_path, target_size=(224, 224))

    # Convert image to array
    img_array = image.img_to_array(img)

    # Expand dimensions
    img_array = np.expand_dims(img_array, axis=0)

    # Normalize
    img_array = img_array / 255.0

    # Predict
    prediction = model.predict(img_array)

    print("\nRAW PREDICTION:", prediction)

    predicted_index = np.argmax(prediction)

    predicted_class = class_names[predicted_index]

    confidence = float(np.max(prediction)) * 100

    return {
        "prediction": predicted_class,
        "confidence": round(confidence, 2)
    }