import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os

# Safe BASE_DIR (works in local + deployment)
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) if "__file__" in globals() else os.getcwd()

# Model path
MODEL_PATH = os.path.join(BASE_DIR, "../models/violence_model.h5")

# Load model (ONLY ONCE)
model = load_model(MODEL_PATH)

# Constants
IMG_SIZE = 224
FRAMES_PER_VIDEO = 20


# 🎥 Extract frames from video
def extract_frames(video_path):
    cap = cv2.VideoCapture(video_path)
    frames = []
    frame_count = 0

    while len(frames) < FRAMES_PER_VIDEO:
        ret, frame = cap.read()
        if not ret:
            break

        # Take every alternate frame
        if frame_count % 2 == 0:
            frame = cv2.resize(frame, (IMG_SIZE, IMG_SIZE))
            frame = frame.astype("float32") / 255.0
            frames.append(frame)

        frame_count += 1

    cap.release()

    if len(frames) == 0:
        return None

    # Pad frames if less than required
    while len(frames) < FRAMES_PER_VIDEO:
        frames.append(frames[-1])

    return np.array(frames, dtype="float32")


# 🔍 Predict violence
def predict_violence(video_path):
    frames = extract_frames(video_path)

    if frames is None:
        return "Error", 0.0

    predictions = []

    for frame in frames:
        frame = np.expand_dims(frame, axis=0)
        pred = model.predict(frame, verbose=0)[0][0]
        predictions.append(float(pred))

    avg_score = float(np.mean(predictions))

    if avg_score > 0.5:
        return "Violence Detected", avg_score
    else:
        return "No Violence", avg_score