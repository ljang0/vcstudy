# Voice Cloning Study App

This is a React web app for an HCI user study on voice cloning personalities. It supports scenario writing, voice recording, pitch/speed customization, and survey collection, using Vite, Material UI, React Router, and browser localStorage.

## Features
- User info input (NetID, name)
- Scenario selection and script writing (with ChatGPT draft option)
- Voice recording and playback
- Pitch and speed customization (Web Audio API)
- Per-scenario and system evaluation surveys
- Data export as a zip file
- All data stored locally in the browser

## Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation
1. **Clone or download the repository:**
   ```bash
   git clone <repo-url>
   cd voice-cloning-study
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the App Locally
1. **Start the development server:**
   ```bash
   npm run dev
   ```
2. **Open your browser and go to:**
   [http://localhost:5173](http://localhost:5173)

## Usage
- Enter your NetID and name to start a new session (this will clear any previous data).
- Select scenarios, write scripts, record your voice, and complete the surveys.
- At the end, use the "Finish Study" button to export your data as a zip file.

## Notes
- **All data is stored in your browser's localStorage.**
- **No server or backend is required.**
- If you want to reset your session, just re-enter your NetID and name on the login page.
- For ChatGPT script generation, you must provide your own OpenAI API key in a `.env` file (see CARTESIA_SETUP.md if needed).

## Troubleshooting
- If you see errors about missing dependencies, run `npm install` again.
- If the app doesn't start, make sure you are in the `voice-cloning-study` directory and using Node.js 18+.
- If you get a port conflict, the app will start on the next available port (e.g., 5174).
- For microphone issues, check your browser permissions.

## Customization
- To change the scenarios, edit the `scenarios` array in `src/App.jsx`.
- To change survey questions, edit the relevant arrays in `src/App.jsx`.

## License
This project is for academic research use only.
