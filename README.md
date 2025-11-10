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


