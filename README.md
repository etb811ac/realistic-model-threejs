<h1 align="center">🪖 Realistic Model Rendering</h1>

<p align="center">Loading a Draco-compressed glTF model and lighting it for photorealism — environment maps, tone mapping, and physically based shading in Three.js.</p>

<p align="center">
  <!-- TODO: replace with your deployed demo URL -->
  🔗 <b>Live Demo:</b> <i>coming soon</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white">
  <img src="https://img.shields.io/badge/glTF-87B81E?logo=khronosgroup&logoColor=white">
  <img src="https://img.shields.io/badge/WebGL-990000?logo=webgl&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white">
</p>

## About

A study in making a loaded 3D model actually look real. The FlightHelmet glTF model is loaded with Draco decompression, then lit by an HDR-style environment map that both illuminates the model and provides realistic reflections.

- 📦 glTF loading with **Draco** geometry decompression
- 🌅 Environment map used for both lighting and reflections
- 🎚️ Tone mapping + correct color encoding for a realistic look
- 🌑 Tuned shadows and light direction
- 🎛️ lil-gui controls for light intensity, exposure, and tone mapping

> **Note:** the model files under `static/models/` are not committed (only a `.gitkeep`). Drop the FlightHelmet glTF (or your own model) in there before running.

## Tech

Three.js · glTF + Draco loaders · environment mapping · tone mapping · lil-gui · Vite

## Run locally

```bash
npm install   # first time only
npm run dev   # local server at localhost:8080
npm run build # production build in dist/
```

---

<p align="center"><i>Part of my Three.js journey · <a href="https://estebanacuna.dev">estebanacuna.dev</a></i></p>
