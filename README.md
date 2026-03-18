# 🎸 Unofficial Fender FUSE Replacement (BroncoFuse)

This project is a modern, unofficial web-based replacement for the discontinued Fender FUSE™ software. It is specifically tailored to breathe new life into the **Fender Bronco 40** amplifier, allowing you to control every parameter directly from your computer via USB.

This tool is built upon the foundational work of [jtangelder](https://github.com/jtangelder/refuse).

---

## ✨ Key Features

* **⚡ Restore Lost Functionality**: Fender FUSE is [discontinued](https://support.fender.com/en-us/knowledgebase/article/KA-01924), but your amp isn't. Control everything via USB again.
* **🌐 Web-Based & Portable**: Runs in any browser with **WebHID** support (Chrome, Edge, Opera). No heavy drivers required.
* **🖥️ Windows Standalone**: Includes a dedicated `.exe` launcher that hosts its own local server for a "click-and-play" experience.
* **🎛️ Deep Editing**: Access "hidden" amp models and advanced parameters (Sag, Bias, Noise Gate) not available via physical knobs.
* **⛓️ Triple-Line Signal Chain**: A redesigned mobile-friendly interface showing your signal path in three clear rows: **Pre-FX / Amplifier / Post-FX**.
* **🖼️ Visual Feedback**: Real-time display of original Fender FUSE amp skins for intuitive navigation.
* **📡 Offline Ready**: All fonts, icons, and assets are hosted locally. It works perfectly in the studio without an internet connection.

---

## 🚀 Getting Started

### Method 1: The Simple Way (Windows .exe)

Ideal for users who just want to play.

1. Connect your **Fender Bronco 40** to your PC via USB.
2. Launch `BroncoFuse.exe`.
3. A local server starts, and your browser opens automatically to `localhost:8000`.
4. Click **"Connect"**, select your amplifier in the popup, and start tweaking!

### Method 2: The Web Server Way (Python)

1. Connect the amplifier via USB.
2. In the project folder, run the local server: `python bronco.py` or your own in the **/dist** directory .
3. Open Chrome or Edge and navigate to `http://localhost:8000` or the port you have chosen.

---

## 🛠️ Developer Guide (Compiling your own)

For the brave souls who want to customize the code:

### 1. Requirements

* **Node.js** (LTS version recommended).
* **Python 3.x**.
* **Nuitka** (for compiling the `.exe`).

### 2. Build Process

1.  **Install Dependencies**:
    `npm install`
2.  **Development**:
    `npm start` (Launch the Angular dev server).
3.  **Sanity Check**:
    `run-npm run lint -- --fix` (Fixes styling and potential code errors).
4.  **Production Build**:
    `npm run build`
    *The optimized web app will be generated in the `/dist` folder.*
5.  **Test the Server**:
    Run `python bronco.py` to test the production build locally.
6.  **Compile to Executable**:
    Run `python compile_BroncoFuse.py`.
    *Requires Nuitka v4.0.4+.*
    Your standalone `.exe` will be waiting in the `/Compile_BroncoFuse` directory.

---

## 🔬 Technical Details

* **Protocol**: Communicates via **USB HID** (Human Interface Device).
* **Stack**: Angular (Frontend), TypeScript (Logic), Python (Local Hosting).
* **Assets**: Original amp images and local Fontsource symbols for 100% autonomy.

For a deep dive into packet structures and command codes, check the [PROTOCOL.md](PROTOCOL.md).

---

## ⚖️ Disclaimer

This is a **hobby project**. It is not affiliated with, endorsed by, or connected to **Fender Musical Instruments Corporation**. Fender, FUSE, and Bronco are trademarks of FMIC. Use this tool at your own risk; while it only sends standard HID commands, the author is not responsible for any damage to your gear.

---
**Ready to rock?** Just plug it in and let the Bronco roar! 🤘