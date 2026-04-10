

# Load model + vectorizer
import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "../models/abusive_model.pkl"))
vectoriser = joblib.load(os.path.join(BASE_DIR, "../models/abuse_vectoriser.pkl"))

# Custom abusive words
custom_abusive_words = [
    "waste fellow",
    "useless",
    "idiot",
    "hurt",
    "stupid",
    "bloody",
    "nonsense",
    "shut up"
]

def predict(text):
    text_lower = text.lower()

    # Rule-based override
    for word in custom_abusive_words:
        if word in text_lower:
            return "Abusive"

    vec = vectoriser.transform([text])
    result = model.predict(vec)[0]

    return "Abusive" if result == 1 else "Normal"