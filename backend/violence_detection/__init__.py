import numpy as np
from tensorflow.keras.models import load_model
from .utils import extract_frames
import os

# Load model once
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) if "__file__" in globals() else os.getcwd()
MODEL_PATH = os.path.join(BASE_DIR, "../models/violence_model.h5")

model = load_model(MODEL_PATH)

def predict_violence(video_path):
    frames = extract_frames(video_path)

    if frames is None:
        return "Error"

    sample = np.expand_dims(frames, axis=0)

    prediction = model.predict(sample)[0][0]

    return "Violence" if prediction > 0.5 else "Non-Violence"