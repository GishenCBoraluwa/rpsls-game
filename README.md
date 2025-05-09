# 🖐️ RPSLS Game Project – Startup Guide

## 🎮 Project Overview

This project is a web-based implementation of the classic **Rock Paper Scissors Lizard Spock (RPSLS)** game.  
It features a gesture-controlled backend using computer vision and a modern frontend for user interaction.

- **Frontend:** Built with [Next.js](https://nextjs.org/), Tailwind CSS, and TypeScript.
- **Backend:** Powered by Python using OpenCV, cvzone, and MediaPipe for real-time gesture recognition through webcam input.

---

## 📁 Project Structure

rpsls-game/
│
├── frontend/ # Next.js frontend
│
└── backend/ # Python backend with gesture detection
├── app.py
├── venv/ # Local virtual environment (excluded from version control)
└── ...

yaml
Copy
Edit

---

## ⚙️ Frontend Setup (Next.js + Tailwind CSS + TypeScript)

### Requirements
- [Node.js](https://nodejs.org/) and npm installed

### Setup Commands

```bash
cd frontend
npm install         # Install project dependencies
npm run dev         # Start development server
Access
Visit the frontend at: http://localhost:3000

🤖 Backend Setup (Python + OpenCV + MediaPipe)
Requirements
Python 3.x installed

Setup Commands
bash
Copy
Edit
cd backend
python -m venv venv             # Create virtual environment
# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install opencv-python numpy cvzone mediapipe

# Start the backend server
python app.py
Notes
The backend uses your webcam to detect hand gestures in real-time.

Runs by default at: http://localhost:5000

To Stop
Press Ctrl + C in the terminal

To Exit Virtual Environment
bash
Copy
Edit
deactivate
🔗 Integration Notes
The frontend interacts with the backend via HTTP API endpoints:

/video_feed – Live video stream from webcam

/gesture – Endpoint to process gesture input

/state – Endpoint to retrieve the current game state

Ensure both the frontend and backend are running simultaneously during development and testing.

The backend processes real-time hand gestures using OpenCV and updates the game state, which the frontend fetches and displays.

