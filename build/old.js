import * as THREE from 'three'
// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------
// Option 1: Import the entire three.js core library.
// Find the latest version by visiting https://cdn.skypack.dev/three.

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 200, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;
document.addEventListener( 'mousewheel', (event) => {
  camera.position.z +=event.deltaY/500;
});
// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material


var geometry = new THREE.SphereGeometry( 3, 32, 16);
var material = new THREE.MeshBasicMaterial( { color: "#166294" } );
var sphere = new THREE.Mesh( geometry, material );

scene.add( sphere );
// Add cube to Scene
//scene.add( cube );

// Render Loop
var render = function () {
  requestAnimationFrame( render );


  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;


  // Render the scene
  renderer.render(scene, camera);
};

render();
