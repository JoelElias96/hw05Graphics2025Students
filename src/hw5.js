import {OrbitControls} from './OrbitControls.js'

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color to solid gray
scene.background = new THREE.Color(0x404040);

// Enhanced lighting setup with shadows
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(20, 30, 20);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
scene.add(directionalLight);

// Enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function degrees_to_radians(degrees) {
  return degrees * (Math.PI / 180);
}

// Create basketball court with all required markings
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
  
  // Court boundaries
  const boundaryThickness = 0.2;
  
  // Long sides
  const longBoundaryGeometry = new THREE.BoxGeometry(courtLength, lineHeight, boundaryThickness);
  const longBoundary1 = new THREE.Mesh(longBoundaryGeometry, lineMaterial);
  longBoundary1.position.set(0, lineHeight/2, courtWidth/2);
  scene.add(longBoundary1);
  
  const longBoundary2 = new THREE.Mesh(longBoundaryGeometry, lineMaterial);
  longBoundary2.position.set(0, lineHeight/2, -courtWidth/2);
  scene.add(longBoundary2);
  
  // Short sides
  const shortBoundaryGeometry = new THREE.BoxGeometry(boundaryThickness, lineHeight, courtWidth);
  const shortBoundary1 = new THREE.Mesh(shortBoundaryGeometry, lineMaterial);
  shortBoundary1.position.set(courtLength/2, lineHeight/2, 0);
  scene.add(shortBoundary1);
  
  const shortBoundary2 = new THREE.Mesh(shortBoundaryGeometry, lineMaterial);
  shortBoundary2.position.set(-courtLength/2, lineHeight/2, 0);
  scene.add(shortBoundary2);
  
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
  
  // Three-point lines (curved arcs at both ends)
  createThreePointLine(13, 1); // Right side
  createThreePointLine(-13, -1); // Left side
}

// Create perfect three-point line arc positioned correctly
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
  arc.rotation.z = direction > 0 ? Math.PI : 0; // Face correct direction (flipped)
  
  // Position at basket location, shifted toward baseline
  const baselineOffset = direction * 1.5; // Distance from basket to arc center
  arc.position.set(basketX + baselineOffset, 0.02, 0);
  
  scene.add(arc);
}

// Create basketball hoop with all components
function createBasketballHoop(xPosition, direction) {
  const hoopGroup = new THREE.Group();
  
  // Support pole (behind backboard)
  const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 12);
  const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.set(xPosition + (direction * 3), 6, 0);
  pole.castShadow = true;
  hoopGroup.add(pole);
  
  // Support arm connecting pole to backboard
  const armGeometry = new THREE.BoxGeometry(3, 0.3, 0.3);
  const armMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const arm = new THREE.Mesh(armGeometry, armMaterial);
  arm.position.set(xPosition + (direction * 1.5), 10, 0);
  arm.castShadow = true;
  hoopGroup.add(arm);
  
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

// Create net using line segments
function createNet(x, y, parentGroup) {
  const netMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const netRadius = 0.9;
  const netSegments = 12;
  const netHeight = 1.5;
  
  // Create vertical net segments
  for (let i = 0; i < netSegments; i++) {
    const angle = (i / netSegments) * Math.PI * 2;
    const x1 = Math.cos(angle) * netRadius;
    const z1 = Math.sin(angle) * netRadius;
    
    const points = [];
    for (let j = 0; j <= 8; j++) {
      const t = j / 8;
      const currentRadius = netRadius * (1 - t * 0.3);
      const currentX = Math.cos(angle) * currentRadius;
      const currentZ = Math.sin(angle) * currentRadius;
      const currentY = -t * netHeight;
      points.push(new THREE.Vector3(currentX, currentY, currentZ));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, netMaterial);
    line.position.set(x, y, 0);
    parentGroup.add(line);
  }
  
  // Create horizontal net segments for connection
  for (let j = 1; j <= 4; j++) {
    const t = j / 8;
    const currentRadius = netRadius * (1 - t * 0.3);
    const currentY = -t * netHeight;
    
    const points = [];
    for (let i = 0; i <= netSegments; i++) {
      const angle = (i / netSegments) * Math.PI * 2;
      const currentX = Math.cos(angle) * currentRadius;
      const currentZ = Math.sin(angle) * currentRadius;
      points.push(new THREE.Vector3(currentX, currentY, currentZ));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, netMaterial);
    line.position.set(x, y, 0);
    parentGroup.add(line);
  }
}

// Create realistic basketball at center court
function createBasketball() {
  // Create basketball with better material properties
  const ballGeometry = new THREE.SphereGeometry(0.6, 64, 64); // Higher resolution
  const ballMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xd2691e,  // More realistic basketball orange
    shininess: 20,    // Less shiny, more matte
    specular: 0x222222 // Darker specular highlights
  });
  const basketball = new THREE.Mesh(ballGeometry, ballMaterial);
  basketball.position.set(0, 4, 0);  // Float the ball 4 units above the court
  basketball.castShadow = true;
  basketball.receiveShadow = true;
  scene.add(basketball);
  
  // Create realistic basketball seam lines
  const seamMaterial = new THREE.LineBasicMaterial({ 
    color: 0x000000,
    linewidth: 2
  });
  
  // Function to create curved seam line
  function createSeamLine(points) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, seamMaterial);
    line.position.set(0, 4, 0);
    scene.add(line);
  }
  
  // Create main vertical seams (basketball's characteristic curved lines)
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const points = [];
    
    // Create curved seam from top to bottom
    for (let j = 0; j <= 50; j++) {
      const t = j / 50;
      const theta = t * Math.PI; // From 0 to PI (top to bottom)
      
      // Create the characteristic basketball curve
      const curveFactor = Math.sin(theta) * 0.3; // Creates the curved shape
      const adjustedAngle = angle + curveFactor;
      
      const radius = Math.sin(theta) * 0.61;
      const x = Math.cos(adjustedAngle) * radius;
      const z = Math.sin(adjustedAngle) * radius;
      const y = Math.cos(theta) * 0.61;
      
      points.push(new THREE.Vector3(x, y, z));
    }
    createSeamLine(points);
  }
  
  // Create horizontal seam lines for more detail
  for (let i = 1; i <= 3; i++) {
    const points = [];
    const heightRatio = i / 4;
    const theta = heightRatio * Math.PI;
    const radius = Math.sin(theta) * 0.61;
    const y = Math.cos(theta) * 0.61;
    
    for (let j = 0; j <= 32; j++) {
      const phi = (j / 32) * Math.PI * 2;
      const x = Math.cos(phi) * radius;
      const z = Math.sin(phi) * radius;
      points.push(new THREE.Vector3(x, y, z));
    }
    createSeamLine(points);
    
    // Mirror for bottom half
    const pointsBottom = [];
    for (let j = 0; j <= 32; j++) {
      const phi = (j / 32) * Math.PI * 2;
      const x = Math.cos(phi) * radius;
      const z = Math.sin(phi) * radius;
      pointsBottom.push(new THREE.Vector3(x, -y, z));
    }
    createSeamLine(pointsBottom);
  }
}

// Create all elements
createBasketballCourt();
createBasketballHoop(13, 1);  // Right hoop facing left
createBasketballHoop(-13, -1); // Left hoop facing right
createBasketball();

// Set camera position for better view
camera.position.set(0, 15, 25);
camera.lookAt(0, 0, 0);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2.2;
controls.minDistance = 5;
controls.maxDistance = 50;

let isOrbitEnabled = true;

// Handle key events
function handleKeyDown(e) {
  if (e.key.toLowerCase() === "o") {
    isOrbitEnabled = !isOrbitEnabled;
    console.log('Orbit controls:', isOrbitEnabled ? 'enabled' : 'disabled');
  }
}

document.addEventListener('keydown', handleKeyDown);

// Handle window resize
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleWindowResize);

// Animation function
function animate() {
  requestAnimationFrame(animate);
  
  // Update controls
  controls.enabled = isOrbitEnabled;
  controls.update();
  
  renderer.render(scene, camera);
}

animate(); 