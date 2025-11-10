const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let dpr = Math.max(1, window.devicePixelRatio || 1);
function size() {
  const cssW = canvas.clientWidth;
  const cssH = canvas.clientHeight;
  dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
size();
window.addEventListener("resize", size, { passive: true });

const vec = (x = 0, y = 0) => ({ x, y });
const P0 = vec(() => canvas.clientWidth * 0.1, () => canvas.clientHeight * 0.5);
const P3 = vec(() => canvas.clientWidth * 0.9, () => canvas.clientHeight * 0.5);

const P1 = { pos: vec(canvas.clientWidth * 0.25, canvas.clientHeight * 0.25), vel: vec(), tgt: vec(canvas.clientWidth * 0.25, canvas.clientHeight * 0.25) };
const P2 = { pos: vec(canvas.clientWidth * 0.75, canvas.clientHeight * 0.75), vel: vec(), tgt: vec(canvas.clientWidth * 0.75, canvas.clientHeight * 0.75) };

const mouse = vec();
const k = 6.0;
const damping = 8.0;

function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t;
  const c0 = u * u * u;
  const c1 = 3 * u * u * t;
  const c2 = 3 * u * t * t;
  const c3 = t * t * t;
  return vec(
    c0 * p0.x + c1 * p1.x + c2 * p2.x + c3 * p3.x,
    c0 * p0.y + c1 * p1.y + c2 * p2.y + c3 * p3.y
  );
}
function bezierDerivative(t, p0, p1, p2, p3) {
  const u = 1 - t;
  const c0 = 3 * u * u;
  const c1 = 6 * u * t;
  const c2 = 3 * t * t;
  return vec(
    c0 * (p1.x - p0.x) + c1 * (p2.x - p1.x) + c2 * (p3.x - p2.x),
    c0 * (p1.y - p0.y) + c1 * (p2.y - p1.y) + c2 * (p3.y - p2.y)
  );
}
function normalize(v) {
  const m = Math.hypot(v.x, v.y) || 1;
  return vec(v.x / m, v.y / m);
}

let last = performance.now();
function step() {
  const now = performance.now();
  let dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  const s = (pt) => {
    const ax = k * (pt.tgt.x - pt.pos.x) - damping * pt.vel.x;
    const ay = k * (pt.tgt.y - pt.pos.y) - damping * pt.vel.y;
    pt.vel.x += ax * dt;
    pt.vel.y += ay * dt;
    pt.pos.x += pt.vel.x * dt;
    pt.pos.y += pt.vel.y * dt;
  };
  s(P1);
  s(P2);

  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ctx.beginPath();
  ctx.moveTo(P0.x(), P0.y());
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  const n = 120;
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const p = cubicBezier(t, vec(P0.x(), P0.y()), P1.pos, P2.pos, vec(P3.x(), P3.y()));
    ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();

  ctx.strokeStyle = "#ff00ff";
  ctx.lineWidth = 2;
  const m = 6;
  for (let i = 0; i <= m; i++) {
    const t = i / m;
    const p = cubicBezier(t, vec(P0.x(), P0.y()), P1.pos, P2.pos, vec(P3.x(), P3.y()));
    const d = normalize(bezierDerivative(t, vec(P0.x(), P0.y()), P1.pos, P2.pos, vec(P3.x(), P3.y())));
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + d.x * 32, p.y + d.y * 32);
    ctx.stroke();
  }

  const dot = (p, c) => {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.fill();
  };
  dot(vec(P0.x(), P0.y()), "#00ffff");
  dot(P1.pos, "#ff00ff");
  dot(P2.pos, "#ff00ff");
  dot(vec(P3.x(), P3.y()), "#00ffff");

  requestAnimationFrame(step);
}
requestAnimationFrame(step);

function setTarget(x, y) {
  P1.tgt.x = x - 50;
  P1.tgt.y = y - 50;
  P2.tgt.x = x + 50;
  P2.tgt.y = y + 50;
}
canvas.addEventListener("pointermove", (e) => {
  const r = canvas.getBoundingClientRect();
  setTarget(e.clientX - r.left, e.clientY - r.top);
}, { passive: true });

const permBtn = document.getElementById("ios-permission");
function needsPermission() {
  return typeof DeviceOrientationEvent !== "undefined" &&
         typeof DeviceOrientationEvent.requestPermission === "function";
}
if (needsPermission()) permBtn.classList.add("show");
permBtn.addEventListener("click", async () => {
  try {
    const st = await DeviceOrientationEvent.requestPermission();
    if (st === "granted") {
      window.addEventListener("deviceorientation", (e) => {
        const x = canvas.clientWidth  * (0.5 + (e.gamma || 0) / 90 * 0.35);
        const y = canvas.clientHeight * (0.5 + (e.beta  || 0) / 90 * 0.25);
        setTarget(x, y);
      }, true);
      permBtn.classList.remove("show");
    }
  } catch {}
});
