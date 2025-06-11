# HW05 - Interactive Basketball Court Infrastructure

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

## Technical Implementation Details

### Lighting System
- Enhanced shadow mapping with 2048x2048 resolution
- Ambient lighting for overall scene illumination
- Directional lighting with proper shadow casting
- Sky blue background for outdoor court atmosphere

### Court Construction
- Precise geometric measurements following basketball specifications
- White court lines using basic materials for clear visibility
- Three-point lines created using elliptical curves
- Center circle implemented as ring geometry

### Hoop Architecture
- Support poles positioned behind backboards (not on court)
- Multi-component design with grouped geometries
- Realistic net physics simulation using line segments
- Proper materials and transparency effects

### Interactive Elements
- Keyboard event handling for camera controls
- Window resize responsiveness
- Smooth animation loop with damping
- Console logging for debugging

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

## Screenshots
[Add your required screenshots here showing:
1. Overall view of the basketball court with hoops
2. Close-up view of basketball hoops with nets
3. View showing the basketball positioned at center court
4. View demonstrating camera controls functionality]

---

**Project completed for Computer Graphics Course - Spring Semester 2025**
