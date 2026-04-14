# 🚀 CampusGuard – AI-Based Smart Surveillance System

CampusGuard is an AI-powered smart surveillance system designed to enhance campus safety by detecting threats, monitoring activities, and assisting in lost item recovery using advanced machine learning models.

## 📌 Features

### 🔍 Lost & Found AI

* Matches lost objects with CCTV footage
* Uses deep learning + similarity matching
* Outputs:

  * Camera ID
  * Room Number
  * Timestamp
  * Confidence Score

---

### 🎥 Violence Detection

* Detects violent or suspicious activities in videos
* Uses CNN + LSTM architecture
* Real-time behavior analysis from CCTV footage

---

### 🗣️ Abusive Language Detection

* Detects abusive or threatening speech
* Converts audio → text (ASR)
* Uses NLP-based classification models

---

### 🚨 Emergency Keyword Detection

* Detects emergency keywords like:

  * “Help”
  * “Save me”
  * “Danger”
* Uses TF-IDF + Naive Bayes model
* Supports live recording + file upload

---

## 🧠 Tech Stack

### 🔹 Frontend

* HTML
* CSS
* JavaScript

### 🔹 Backend

* FastAPI
* Python

### 🔹 Machine Learning

* CNN, LSTM
* TF-IDF + Naive Bayes
* NLP Models (Text Classification)
* ResNet (Feature Extraction)

---

## ⚙️ Project Structure

```
FINAL_YEAR_PROJECT/
│
├── backend/
│   ├── routers/
│   ├── models/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── modules.html
│   ├── about.html
│   └── demo.html
│
└── README.md
```

---

## 🚀 How to Run Locally

### 1️⃣ Clone Repository

```
git clone https://github.com/Thanusri-burra/FINAL_YEAR_PROJECT/
cd FINAL_YEAR_PROJECT
```

---

### 2️⃣ Run Backend

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

👉 Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Run Frontend

* Open `index.html` in browser
  OR
* Use Live Server in VS Code

---

## 🌐 Deployment

### 🔹 Frontend

* Hosted on Vercel

### 🔹 Backend

* Hosted on Replit

---

## 🔗 Live Demo

* Frontend: https://final-year-project-ten-ochre.vercel.app/
* Backend API Docs: https://55e72364-cab3-4738-baa7-5890a2f8cac3-00-tynd123jbysc.pike.replit.dev/docs

---

## 📸 Screenshots

* Modules Page
  <img width="1907" height="898" alt="Modules_Page" src="https://github.com/user-attachments/assets/25a744a0-e356-4869-89d6-20626a0fbe3f" />

* Detection Outputs
  <img width="1877" height="905" alt="Results_ScreenShot" src="https://github.com/user-attachments/assets/12bc6cd1-2631-4491-800d-904511df10e4" />

* API Interface (Swagger UI)
  <img width="1052" height="817" alt="image" src="https://github.com/user-attachments/assets/0ed8e312-d07a-48f4-aac8-b27818da3d70" />

---

## 💡 Future Enhancements

* Real-time CCTV integration
* Mobile app support
* Alert notifications (SMS / Email)
* Face recognition integration

---

## 👩‍💻 Author

**Thanusri Burra**
B.Tech CSE | AI & Full Stack Enthusiast

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it!

---
