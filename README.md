# HW05 - Interactive Basketball Court Infrastructure

![Basketball Arena Demo](../media/NetaJoelBasketball.gif)

## Group Members
-Neta Nakdimon & Joel Elias
## Project Description
This project implements the infrastructure for an interactive 3D basketball court using WebGL and Three.js, as specified in the HW05 requirements. This is the foundation for a complete basketball game that will be extended in HW06.

## How to Run
1. Make sure you have Node.js installed
2. Navigate to the project directory: `cd hw05Graphics2025Students`
3. Start the server: `node index.js`
4. Open your web browser and go to: `http://localhost:8000`

## Implemented Features

### ✅ Basketball Court (20 points)
- **Court Surface**: Brown wooden floor with proper 2:1 proportions (30x15 units)
- **Court Markings**: All required white lines including:
  - Center line dividing the court
  - Center circle at midcourt
  - Three-point arcs at both ends of the court
  - Court boundary lines

### ✅ Basketball Hoops (20 points)
- **Two Complete Hoops** positioned at regulation height (10+ units)
- **Backboards**: White, rectangular, partially transparent
- **Rims**: Orange colored, proper circular geometry
- **Nets**: Implemented with 12+ line segments creating realistic hanging net effect
- **Support Structures**: Gray poles positioned BEHIND backboards with connecting arms
- **Proper Orientation**: Hoops face toward center court

### ✅ Static Basketball (20 points)
- **Orange Basketball** with realistic proportions positioned at center court
- **Black Seam Lines**: Vertical and horizontal seams for authentic appearance
- **Proper Shadows**: Ball casts and receives shadows
- **Correct Size**: Appropriately scaled sphere geometry

### ✅ Camera Controls (10 points)
- **Orbit Controls**: Smooth camera movement around the scene
- **Toggle Function**: Press 'O' key to enable/disable orbit controls
- **Damping**: Smooth camera transitions
- **Constraints**: Appropriate zoom and angle limits

### ✅ UI Framework (15 points)
- **Score Display**: HTML container ready for future scoring system
- **Controls Display**: Clear instructions for user interaction
- **Game Info**: Title and project information display
- **Responsive Styling**: Professional CSS with semi-transparent backgrounds
- **Future-Ready**: Structure prepared for HW06 interactive elements

### ✅ Code Quality (5 points)
- **Well-Organized**: Modular functions for each component
- **Commented**: Clear documentation throughout the code
- **Efficient**: Optimized geometry creation and material usage

## 🔧 Technical Implementation Details

### 🏀 Key Code Snippets

#### 1. Basketball Court Creation with Markings
This is the heart of our court construction, creating the wooden floor and all required white lines:

```javascript
function createBasketballCourt() {
  // Court floor - brown wooden color with 2:1 proportions
  const courtLength = 30;
  const courtWidth = 15;
  const courtGeometry = new THREE.BoxGeometry(courtLength, 0.2, courtWidth);
  const courtMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xc68642,  // Brown wood color
    shininess: 50
  });
  const court = new THREE.Mesh(courtGeometry, courtMaterial);
  court.receiveShadow = true;
  court.position.y = -0.1;
  scene.add(court);
  
  // Create court lines (white)
  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const lineHeight = 0.05;
  
  // Center line
  const centerLineGeometry = new THREE.BoxGeometry(0.2, lineHeight, courtWidth);
  const centerLine = new THREE.Mesh(centerLineGeometry, lineMaterial);
  centerLine.position.set(0, lineHeight/2, 0);
  scene.add(centerLine);
  
  // Center circle
  const centerCircleGeometry = new THREE.RingGeometry(2.8, 3, 32);
  const centerCircleMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff, 
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const centerCircle = new THREE.Mesh(centerCircleGeometry, centerCircleMaterial);
  centerCircle.rotation.x = -Math.PI / 2;
  centerCircle.position.y = 0.02;
  scene.add(centerCircle);
}
```

#### 2. Complete Basketball Hoop Assembly
This function creates a regulation basketball hoop with all required components:

```javascript
function createBasketballHoop(xPosition, direction) {
  const hoopGroup = new THREE.Group();
  
  // Support pole (behind backboard)
  const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 12);
  const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.set(xPosition + (direction * 3), 6, 0);
  pole.castShadow = true;
  hoopGroup.add(pole);
  
  // Backboard (white, partially transparent)
  const backboardGeometry = new THREE.BoxGeometry(0.2, 3.5, 2.5);
  const backboardMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
  });
  const backboard = new THREE.Mesh(backboardGeometry, backboardMaterial);
  backboard.position.set(xPosition, 10, 0);
  backboard.castShadow = true;
  hoopGroup.add(backboard);
  
  // Rim (orange)
  const rimGeometry = new THREE.TorusGeometry(0.9, 0.05, 8, 32);
  const rimMaterial = new THREE.MeshPhongMaterial({ color: 0xff6600 });
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.set(xPosition - (direction * 0.6), 10, 0);
  rim.rotation.x = Math.PI / 2;
  rim.castShadow = true;
  hoopGroup.add(rim);
  
  // Net (created with line segments)
  createNet(xPosition - (direction * 0.6), 10, hoopGroup);
  
  scene.add(hoopGroup);
}
```

#### 3. Perfect Three-Point Arc Implementation
After multiple iterations, this creates the perfect curved three-point lines:

```javascript
function createThreePointLine(basketX, direction) {
  // Create the arc using ring geometry with proper positioning
  const arcGeometry = new THREE.RingGeometry(5.8, 6.2, 32, 1, -Math.PI/2, Math.PI);
  const arcMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff, 
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const arc = new THREE.Mesh(arcGeometry, arcMaterial);
  
  // Position and rotate correctly for basketball court
  arc.rotation.x = -Math.PI / 2; // Lay flat on court
  arc.rotation.z = direction > 0 ? Math.PI : 0; // Face correct direction
  
  // Position at basket location, shifted toward baseline
  const baselineOffset = direction * 1.5;
  arc.position.set(basketX + baselineOffset, 0.02, 0);
  
  scene.add(arc);
}
```

### 🎨 Architecture Highlights

- **Modular Design**: Each component (court, hoops, ball) is created by separate functions
- **Realistic Proportions**: All measurements follow basketball regulation standards
- **Enhanced Lighting**: Professional shadow mapping with 2048x2048 resolution
- **Material Realism**: Proper transparency, shininess, and color values
- **Performance Optimized**: Efficient geometry creation and grouped objects

## Controls
- **O Key**: Toggle orbit camera controls on/off
- **Mouse**: When orbit is enabled:
  - Left click + drag: Rotate camera
  - Right click + drag: Pan camera
  - Scroll wheel: Zoom in/out

## Additional Features Implemented
- Enhanced shadow quality with soft shadows
- Realistic court proportions and measurements
- Professional UI design with branded styling
- Responsive design for different screen sizes
- Comprehensive net geometry with multiple line segments
- Proper material properties for realistic appearance

## Known Issues/Limitations
- This is the infrastructure version (HW05) - interactive ball physics will be added in HW06
- Net segments are static (physics-based net movement will be implemented later)
- No collision detection yet (planned for HW06)

## External Assets Used
- Three.js r128 (CDN)
- OrbitControls.js (included in project)
- No external textures or models used - all geometry created programmatically

## Future Development (HW06)
The current infrastructure is designed to support the following features in the next assignment:
- Interactive basketball shooting mechanics
- Physics-based ball movement and collision detection
- Scoring system with basket detection
- Ball rotation animations
- Additional camera control modes
- Enhanced UI interactions

## 📸 Screenshots

### Overall Court View (Top-Down)
*Perfect basketball court layout with all required markings, three-point arcs, and floating basketball at center court*

![Top-Down View](screenshots/basketball-court-top-view.png)

### Side Perspective View  
*Complete basketball hoops with backboards, rims, nets, and support structures positioned correctly*

![Side View](screenshots/basketball-court-side-view.png)

### 3D Perspective View
*Full 3D scene showcasing proper lighting, shadows, and camera controls functionality*

![3D Perspective](screenshots/basketball-court-perspective-view.png)

### Key Features Demonstrated:
- ✅ **Court Markings**: Center line, center circle, three-point arcs, and boundary lines
- ✅ **Basketball Hoops**: Complete assemblies with transparent backboards and detailed nets
- ✅ **Floating Basketball**: Orange basketball with black seams positioned at center court
- ✅ **Lighting & Shadows**: Professional shadow mapping and realistic lighting
- ✅ **Camera Controls**: Orbit controls for 360° viewing (toggle with 'O' key)
- ✅ **Material Realism**: Proper wood textures, transparency, and color schemes

---

**Project completed for Computer Graphics Course - Spring Semester 2025**
