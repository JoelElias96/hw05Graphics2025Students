

![Basketball Arena Demo](media/NetaJoelBasketball.gif)

# HW05 – Interactive Basketball Court Infrastructure

## Group Members

* **Neta Nakdimon**
* **Joel Elias**

---

## Project Description

This project implements the **infrastructure layer** for an interactive 3‑D basketball court in WebGL / Three.js (HW05).
It will serve as the foundation for HW06, where ball physics, scoring logic and full game‑play will be added.

---

## How to Run

```bash
# 1. install Node (v18 LTS or newer)

# 2. clone / open the repo then:
cd hw05Graphics2025Students

# 3. install deps & start the local server
npm install       # first time only
npm run dev       # vite dev‑server on :5173

# 4. open  http://localhost:5173  in your browser
```

---

## Implemented Features

| Component                | Status | Notes                                                                               |
| ------------------------ | ------ | ----------------------------------------------------------------------------------- |
| Court surface & markings | v | All required lines (centre, circle, 3‑pt arcs, boundaries) – exact regulation scale |
| Two complete hoops       | v | Backboard, rim, 8‑segment net, pole & support arm; positioned at 3.05 m height      |
| Static basketball        | v | 0.6 m Ø sphere, realistic seams, floating at centre court                           |
| Camera & lighting        | v | Directional + ambient lights, shadows, OrbitControls (toggle **O**)                 |
| UI framework             | v | HTML containers for future score & controls, responsive CSS                         |

---

## Key Code Snippets

Below are the **three core builders** that satisfy HW05’s infrastructure rubric.

### 1 · Court & Lines

```js
function createBasketballCourt() {
  // floor 30 × 15 (2:1) – wooden brown
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.2, 15),
    new THREE.MeshPhongMaterial({ color: 0xc68642, shininess: 50 })
  );
  floor.receiveShadow = true;
  floor.position.y = -0.1;
  scene.add(floor);

  const white = new THREE.LineBasicMaterial({ color: 0xffffff });

  // centre line
  addLine([0, 0.11, -7.5], [0, 0.11, 7.5]);

  // centre circle
  addCircle(1.8);

  // 3‑point arcs (left / right)
  addThreePointArc(-14);   // left hoop
  addThreePointArc( 14);   // right hoop

  /* helpers */
  function addLine(a, b) {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...a),
      new THREE.Vector3(...b)
    ]);
    scene.add(new THREE.Line(g, white));
  }
  function addCircle(r) {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a)*r, 0.11, Math.sin(a)*r));
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    scene.add(new THREE.LineLoop(g, white));
  }
}
```

### 2 · Accurate Three‑Point Arc

```js
function addThreePointArc(hoopX) {
  const R        = 6.75;        // regulation radius
  const thetaMax = Math.PI / 2.5; // ≈66° side angle
  const dir      = Math.sign(hoopX); // -1 left / +1 right
  const pts      = [];
  for (let i = 0; i <= 100; i++) {
    const t  = -thetaMax + (i / 100) * (2*thetaMax);
    const x  = hoopX - dir * R * Math.cos(t); // bulge toward court interior
    const z  =            R * Math.sin(t);
    pts.push(new THREE.Vector3(x, 0.11, z));
  }
  const g = new THREE.BufferGeometry().setFromPoints(pts);
  scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0xffffff })));
}
```

### 3 · Complete Hoop Assembly

```js
function createBasketballHoop(dir /* -1 left, +1 right */) {
  const rimY = 3.05;
  const rimX = dir * 13.8;      // rim 1.2 m inside baseline
  const boardX = rimX + dir*0.6;// backboard 0.6 m behind rim

  // backboard
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.05, 0.05),
    new THREE.MeshPhongMaterial({ color: 0xffffff, transparent:true, opacity:0.55 })
  );
  board.position.set(boardX, rimY+0.525, 0);
  scene.add(board);

  // rim
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.45, 0.03, 16, 96),
    new THREE.MeshPhongMaterial({ color: 0xff6600 })
  );
  rim.rotation.x = Math.PI/2;
  rim.position.set(rimX, rimY, 0);
  scene.add(rim);

  // simple 8‑segment net
  const netMat = new THREE.LineBasicMaterial({ color: 0xffffff });
  for (let i=0;i<8;i++){
    const a=(i/8)*Math.PI*2;
    const p1=new THREE.Vector3(rimX+0.45*Math.cos(a),rimY,0.45*Math.sin(a));
    const p2=new THREE.Vector3(rimX+0.2*Math.cos(a), rimY-0.45, 0.2*Math.sin(a));
    const g=new THREE.BufferGeometry().setFromPoints([p1,p2]);
    scene.add(new THREE.Line(g, netMat));
  }

  // pole + arm
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12,0.12,4,12),
    new THREE.MeshStandardMaterial({ color:0x555555 })
  );
  const poleX = dir*16.5;
  pole.position.set(poleX,2,0);
  scene.add(pole);

  const arm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05,0.05,1.7,8),
    pole.material
  );
  arm.position.set((poleX+boardX)/2, rimY+0.2, 0);
  arm.rotation.z = dir * -Math.atan2(boardX-poleX, rimY+0.2);
  scene.add(arm);
}
```

---

## Controls

* **O** – toggle orbit controls (pan / zoom / rotate)
* Mouse (when enabled): rotate, right‑drag pan, wheel zoom

---

## Known Limitations

* Net segments are static; cloth physics planned for HW06.
* No collision detection or scoring logic yet.

---

## External Assets

* [Three.js r155 (module CDN)](https://threejs.org/)
* OrbitControls (three.js examples jsm)
* No external textures/models – all geometry is procedural.

