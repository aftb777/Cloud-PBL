# 🎥 AI Video Analyzer

A simple web application that allows users to upload a video and analyze it using **Azure Video Indexer API**.
The app processes videos and displays analysis results along with a preview player.

---

## 🚀 Features

* 📹 Video preview before upload
* ☁️ Upload video to Azure Video Indexer
* ⚡ Real-time processing status
* ▶️ Video playback inside preview screen
* 📊 Video analysis results (labels, faces, timestamps)

---

## 🖥️ Tech Stack

* **HTML**
* **CSS**
* **JavaScript**
* **Axios**
* **Azure Video Indexer API**

---

## 📂 Project Structure

```
project-folder
│
├── app.html        # Main frontend page
├── style.css       # UI styling
├── app.js          # Application logic
└── README.md       # Project documentation
```

---

## ⚙️ Setup Instructions

1. Clone the repository

```
git clone https://github.com/yourusername/Cloud-PBL.git
```

2. Navigate to the project folder

```
cd Cloud-PBL
```

3. Add your Azure credentials in **app.js**

```
var accountID = ''
var accessToken = ''
var subscriptionKey = ''
```

4. Open the project

```
open app.html
```

or simply open **app.html** in your browser.

---

## 🧠 How It Works

1. User selects a video from their device.
2. The video preview appears in the player.
3. User clicks **Submit Video**.
4. The video is uploaded to **Azure Video Indexer**.
5. The system processes the video and returns analysis results.

---

## 📸 Application Flow

```
Select Video
      ↓
Preview Video
      ↓
Upload to Azure
      ↓
Processing Status
      ↓
AI Analysis Results
```

---

## 📌 Future Improvements

* Upload progress bar
* AI result dashboard
* Drag & drop video upload
* Improved UI/UX
* Video insights visualization

---

## 👨‍💻 Author

**Aftaab Mulla**
**Atharva Mote**
