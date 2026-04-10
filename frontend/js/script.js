/* =========================================================
   CAMPUSGUARD MAIN SCRIPT (CLEAN + UPDATED)
   ========================================================= */

// ✅ ADD THIS (VERY IMPORTANT)
const BASE_URL = "https://55e72364-cab3-4738-baa7-5890a2f8cac3-00-tynd123jbysc.pike.replit.dev";

/* ---------------- LOST & FOUND ---------------- */
async function findLostItem(event, btn) {
  event.preventDefault();

  const card = btn.closest(".demo-card");
  const resultSpan = card.querySelector(".result span");

  const image = document.getElementById("lostImage").files[0];
  const video = document.getElementById("lostVideo").files[0];

  if (!image || !video) {
    resultSpan.innerText = "⚠️ Please upload both image and video";
    return;
  }

  const formData = new FormData();
  formData.append("lost_image", image);
  formData.append("video", video);

  resultSpan.innerText = "⏳ Processing request...";
  btn.disabled = true;

  try {
    const response = await fetch(`${BASE_URL}/lost-found/analyze`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.status === "MATCH_FOUND") {
      resultSpan.innerText =
`✅ MATCH FOUND
Camera ID : ${data.camera_id}
Room No   : ${data.room_no}
Confidence: ${data.confidence}
Timestamp : ${data.timestamp} seconds`;
    } else {
      resultSpan.innerHTML = `
❌ NO MATCH FOUND <br>
The object was not detected in the given CCTV footage.`;
    }

  } catch (err) {
    resultSpan.innerText = "❌ Backend not reachable";
  }

  btn.disabled = false;
}


/* ---------------- VIOLENCE ---------------- */
function detectViolence() {
  const fileInput = document.getElementById("violenceVideo");
  const result = document.getElementById("violenceResult");

  if (!fileInput.files.length) {
    result.innerHTML = "⚠️ Please upload a video";
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  result.innerHTML = "⏳ <b>Analyzing video...</b>";

  fetch(`${BASE_URL}/violence/predict`, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {

      if (data.error) {
        result.innerHTML = `❌ <b>Error:</b> ${data.error}`;
        return;
      }

      if (data.result === "Violence Detected") {
        result.innerHTML = `
🚨 <b style="color:red;">VIOLENCE DETECTED</b><br>
Camera ID : ${data.camera}<br>
Room No   : ${data.room}<br>
Confidence: ${data.confidence}`;
      } else {
        result.innerHTML = `
✅ <b style="color:green;">NO VIOLENCE</b><br>
Camera ID : ${data.camera}<br>
Room No   : ${data.room}<br>
Confidence: ${data.confidence}`;
      }

    })
    .catch(() => {
      result.innerHTML = "❌ Backend not reachable";
    });
}


/* =========================================================
   🚨 KEYWORD DETECTION
   ========================================================= */

let mediaRecorder;
let audioChunks = [];

function startRecording() {
  audioChunks = [];

  const status = document.getElementById("emergencyStatus");
  status.innerText = "Status: Recording...";

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = e => {
        audioChunks.push(e.data);
      };
    })
    .catch(() => {
      status.innerText = "Status: Mic permission denied";
    });
}

function stopRecording() {
  if (!mediaRecorder) return;

  const status = document.getElementById("emergencyStatus");
  status.innerText = "Status: Processing...";

  mediaRecorder.stop();

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    sendEmergencyAudio(audioBlob);
  };
}

function detectEmergency() {
  const fileInput = document.getElementById("emergencyAudio");

  if (!fileInput.files.length) {
    alert("Please select an audio file");
    return;
  }

  sendEmergencyAudio(fileInput.files[0]);
}

function sendEmergencyAudio(audioBlob) {
  const status = document.getElementById("emergencyStatus");
  const result = document.getElementById("emergencyResult");

  status.innerText = "Status: Processing...";
  result.innerText = "";

  const formData = new FormData();
  formData.append("file", audioBlob);

  fetch(`${BASE_URL}/keyword/predict-audio`, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      status.innerText = "Status: Done";

      const text = data.recognized_text || data.text || "N/A";
      const prediction = data.prediction || data.result || "N/A";

      result.innerHTML =
        `🗣 <b>Text:</b> ${text}<br>🚨 <b>Result:</b> ${prediction}`;
    })
    .catch(() => {
      status.innerText = "Status: Error";
      result.innerText = "❌ Backend not reachable";
    });
}


/* =========================================================
   🗣 ABUSIVE DETECTION
   ========================================================= */

let abuseRecorder;
let abuseChunks = [];

function startAbuseRecording() {
  abuseChunks = [];

  const status = document.getElementById("abuseStatus");
  status.innerText = "Status: Recording...";

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      abuseRecorder = new MediaRecorder(stream);
      abuseRecorder.start();

      abuseRecorder.ondataavailable = e => {
        abuseChunks.push(e.data);
      };
    })
    .catch(() => {
      status.innerText = "Status: Mic permission denied";
    });
}

function stopAbuseRecording() {
  if (!abuseRecorder) return;

  const status = document.getElementById("abuseStatus");
  status.innerText = "Status: Processing...";

  abuseRecorder.stop();

  abuseRecorder.onstop = () => {
    const audioBlob = new Blob(abuseChunks, { type: "audio/webm" });
    sendAbuseAudio(audioBlob);
  };
}

function detectAbuse() {
  const fileInput = document.getElementById("abuseAudio");

  if (!fileInput.files.length) {
    alert("Please select an audio file");
    return;
  }

  sendAbuseAudio(fileInput.files[0]);
}

function sendAbuseAudio(audioBlob) {
  const status = document.getElementById("abuseStatus");
  const result = document.getElementById("abuseResult");

  status.innerText = "Status: Processing...";
  result.innerText = "";

  const formData = new FormData();
  formData.append("file", audioBlob);

  fetch(`${BASE_URL}/abuse/predict-audio`, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      status.innerText = "Status: Done";

      const text = data.recognized_text || "N/A";
      const prediction = data.result || "N/A";

      result.innerHTML =
        `🗣 <b>Text:</b> ${text}<br>⚠️ <b>Result:</b> ${prediction}`;
    })
    .catch(() => {
      status.innerText = "Status: Error";
      result.innerText = "❌ Backend not reachable";
    });
}


/* =========================================================
   SCROLL ANIMATION
   ========================================================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);