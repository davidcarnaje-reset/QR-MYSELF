# 📱 Offline QR Generator & Designer

A modern, high-quality desktop application that allows you to generate, customize, and design beautiful QR codes completely offline. Built as a native desktop experience for Windows using Electron, and fully optimized to deploy as a responsive web app.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Demo-blue?style=for-the-badge&logo=vercel&logoColor=white)](https://qr-myself.vercel.app/)

### 🚀 [Live Demo / View Website](https://qr-myself.vercel.app/)

---

## ⚡ Key Features

- 🔌 **Dual Deployment & Cross-Platform Optimization:** Runs as a standalone, zero-dependency offline Windows desktop application, or can be deployed instantly as a responsive web app accessible on mobile, tablet, and desktop web browsers.
- 🔌 **Full Offline Capabilities:** Core generation engine, base64 file processing, and custom vector templates run entirely locally. No external APIs or active internet connections are required.
- 🎨 **3-Column Premium UI:** Sleek visual panels inspired by professional design tools (Flowcode, Figma) featuring a dark blue/indigo sidebar and control drawers, contrasted against a clean, white input canvas.
- 📱 **Smart Responsive Grid Layout:** Elements automatically re-order dynamically on smaller screens (viewports < `lg` breakpoint) to present a polished vertical mobile layout hierarchy:
  1. **Top:** Live QR Preview Card (displays real-time updates immediately).
  2. **Second:** Category Tab Selection.
  3. **Third:** Dynamic Form Fields (URL, WiFi Network, Plain Text, Email, SMS).
  4. **Fourth:** Styling Drawer Accordions (Dots, Colors, Logos, Custom SVG Frames).
  5. **Bottom:** Export Formats Selection and Download triggers.
- 🔧 **Advanced Customization:** Fully customize the QR code dots and corner shapes:
  - *Pattern shapes:* Square, circular dots, rounded, extra-rounded, classy, or classy-inversed.
  - *Color profiles:* Solid fill values or linear/radial gradients (custom angles, start/end color stops).
  - *Branding:* Upload custom logo images to embed securely in the center.
- 🖼️ **Pre-made Custom Frame Badges:** Frame the QR code inside premium custom SVG shapes (Classic Card, Speech Bubble, Curved Arrow, Coffee Mug, Shopping Bag, Gift Box, Scooter Delivery, Chef Hat, and Pill Badge) with the layout baked and merged into the final image!
- 💾 **High-Quality Export Formats:** Save your designs in high resolution as **PNG**, **JPG**, or vector-based **SVG** files.
- 🏆 **Custom Success Modals:** Responsive and animated success modal popup overlays with backdrop blur elements (`backdrop-blur-sm`) to confirm successful file saves.

---

## 🛠️ Technology Stack

- **Framework:** [React](https://react.dev/) (Vite bundler)
- **Desktop Wrapper:** [Electron](https://www.electronjs.org/) (Secure Preload IPC context bridging)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Core Engine:** [`qr-code-styling`](https://www.npmjs.com/package/qr-code-styling) (Offline vector drawing engine)
- **DOM Capturing:** [`html-to-image`](https://www.npmjs.com/package/html-to-image) (Bakes custom frame layers and canvas together)

---

## 🚀 Getting Started / Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed locally.

### Local Development Setup
1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```
2. **Start the local development server (React + Electron concurrently):**
   ```bash
   npm run dev
   ```
   *This concurrently boots Vite on `http://localhost:5173` and launches the Electron window wrapper.*

### Build & Package Standalone Windows Executable
To package the app into a single standalone, portable Windows `.exe` application:
```bash
npm run electron:build
```
*The compiled binary will be placed inside the `dist_electron/` directory.*

> ⚠️ **Note on Build Errors:** If you encounter `EBUSY: resource busy or locked` errors during build compiling, make sure that any active developer builds or running instances of **Offline QR Generator.exe** are fully closed in your system tray or task manager before rebuilding.

---

## 📂 Project Architecture

The codebase has a clean, modular structure where responsibilities are separated cleanly into standalone functional components inside the `src/` directory:

```
src/
├── components/
│   ├── Sidebar.jsx            # Category choices menu (URL, WiFi, Text, Email, SMS)
│   ├── InputForm.jsx          # Center column dynamically switching form controls
│   ├── QRPreview.jsx          # Live canvas rendering and SVG frame templates
│   ├── DesignPanel.jsx        # Customize patterns, gradients, logo upload, and download actions
│   └── CustomAccordion.jsx    # Reusable accordion drawer utility wrapper
├── App.jsx                    # State coordinator managing responsive mobile grid ordering
├── index.css                  # Tailwinds core + custom keyframe success animations
└── main.jsx                   # Entry point mounting the React app
```

---

## 🌐 Web Deployment (Vercel Ready)

This repository is ready for zero-configuration deployments to **Vercel** or other static hosting providers:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Environment Adapting
The code automatically detects its run-time environment (`isElectron` check). When hosted on Vercel and loaded inside mobile browsers or standard web viewports, it seamlessly bypasses Electron-specific IPC systems and falls back to a secure DOM link simulation (`document.createElement('a')`) to download customized QR codes straight to your device’s downloads folder.

---

## 👨‍💻 Author

Developed by **David Josh Carnaje**
