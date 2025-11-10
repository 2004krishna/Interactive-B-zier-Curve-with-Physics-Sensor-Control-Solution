<<<<<<< HEAD
# Interactive Bézier Curve

An interactive cubic Bézier curve implemented using plain HTML, CSS and JavaScript.  
The curve behaves like a springy rope: two middle control points respond to pointer movement (web) or device motion (iOS Safari).

## Files
- `index.html` — markup and UI.
- `style.css` — styling and responsive canvas container.
- `app.js` — Bézier math, physics (spring+damping), rendering, pointer & DeviceOrientation input.

## Features
- Manual cubic Bézier curve calculation:
  \[
  B(t)=(1-t)^3P_0+3(1-t)^2tP_1+3(1-t)t^2P_2+t^3P_3
  \]
- Tangent (derivative) computed analytically and drawn at several points:
  \[
  B'(t)=3(1-t)^2(P_1-P_0)+6(1-t)t(P_2-P_1)+3t^2(P_3-P_2)
  \]
- Spring-damping physics for control points:

- HiDPI canvas scaling, resize-safe.
- Pointer events and optional iOS DeviceOrientation permission prompt.

## How to run locally
1. Open the project folder in VS Code.
2. Open `index.html` in a modern browser (Chrome / Safari).
3. For iOS Safari: tap **Enable Motion (iOS)** and allow DeviceOrientation.

## Academic Integrity
All code in this repository is original and implemented without external bezier/physics libraries. Mathematical formulas are standard and cited inline in the README.

## Demo recording checklist (30s)
- Show page load and LCP (visually).
- Move the pointer across the canvas; show control points and tangents responding.
- (Optional) On iOS, enable motion and tilt device so control points move.
- End with a short view of file structure in VS Code.

=======
# Interactive Bézier Curve with Physics and Sensor Control

This project shows an interactive cubic Bézier curve using HTML, CSS and JavaScript.  
The curve moves like a spring rope and responds smoothly to mouse movement or device motion on iOS.

---

## Project Files

- `index.html` – structure and canvas setup  
- `style.css` – layout and design  
- `app.js` – Bézier curve, tangents, and physics logic  
- `demo.mp4` – 30 second video demo  
- `performance-timeline.png` – performance test result  
- `README.md` – explanation and results  
- `.gitignore` – ignored files for Git  
- `LICENSE` – MIT license

---

## Features

### Bézier Curve Formula

Cubic Bézier curve is calculated using:

\[
B(t)=(1-t)^3P_0+3(1-t)^2tP_1+3(1-t)t^2P_2+t^3P_3
\]

Derivative (tangent):

\[
B'(t)=3(1-t)^2(P_1-P_0)+6(1-t)t(P_2-P_1)+3t^2(P_3-P_2)
\]

Tangents are drawn on the curve to show direction.

---

### Physics and Motion

The control points move like springs using a damping model:

\[
a = k * (target - position) - c * velocity
\]

This gives a smooth and natural spring-like animation.

---

### Input and Control

- Works with mouse or pointer input.  
- On iOS Safari, supports gyroscope motion.  
- Runs smoothly around 60 FPS.

---

## Results and Performance

### Demo Video (30 seconds)

Watch the live demo here:  
https://github.com/2004krishna/Interactive-B-zier-Curve-with-Physics-Sensor-Control-Solution/blob/main/demo.mp4

---

### Performance Timeline

The following image shows the Chrome DevTools performance test.  
The animation runs smoothly with no frame drops and stable scripting, painting, and rendering times.

![Performance Timeline](performance-timeline.png)

---

## How to Run

1. Download or clone this repository.  
2. Open the folder in VS Code.  
3. Open `index.html` in any browser (Chrome or Safari).  
4. Move your mouse over the canvas to see the curve move.  
5. On iOS Safari, press “Enable Motion (iOS)” and allow motion access.

---

## Academic Integrity

This work is fully original and done without using any external libraries for Bézier or physics.  
All formulas used are standard mathematical equations written by hand.

---

## Demo Checklist

- Show the page and load the curve.  
- Move the mouse to show how the curve reacts.  
- Show tangents and control points.  
- Open DevTools → Performance tab and record a short test.  
- Show your project folder in VS Code.

---
>>>>>>> 6208af5 (Added demo video, performance image, and updated README)

