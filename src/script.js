import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

console.log(OrbitControls);

// Cursor
// create object to store cursor position
// add event listener and update cursor position based on client coords divided by (width and height - 0.5) to give equal pos and neg offset
// will work best when canvas is same size as screen (-0.5 to 0.5 within the canvas giving center position 0,0)
// Even with Orbit Controls enabled, keep this code active to help with debugging mouse position vs. camera/object positioning - remove for production
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = e.clientY / sizes.height -0.5
    console.log('X Position:' + cursor.x)
    console.log('Y Position:' + cursor.y);
})


/**
 * Base
 */

// Canvas to render the objects to in the DOM
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 500,
    height: 500
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x049ef4, wireframe: true }),
)
scene.add(mesh)

// Cameras (Perspective and Orthographic) and camera positioning
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// Orthographic camera requires aspect ratio to prevent distortion
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls (Orbit Controls) - scene controls from the library rather than building them
const controls = new OrbitControls(camera, canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animation clock
const clock = new THREE.Clock()

// Create animation loop with recursive call
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Build controls to control cameras on X and Y axes
    // Update camera position based on cursor position, invert y axis
    // Can increase amplitude by multiplying to create more movement

    // camera.position.x = cursor.x * 6
    // camera.position.y = - (cursor.y * 6)

    // Use Math.cos and Math.sin to calculate the radian and Math.PI * 2 to enable full circle rotation
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)

    // Render scene and camera
    renderer.render(scene, camera)

    // Call tick () recursively on the next animation frame
    window.requestAnimationFrame(tick)
}

tick()