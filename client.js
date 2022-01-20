
import * as THREE from "three";
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three/examples/jsm/controls/OrbitControls.js";
import {Satalite} from '/Satalite.js';

/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish / http://paulirish.com/
 */

if (!window.requestAnimationFrame) {

  window.requestAnimationFrame = (function() {

    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

        window.setTimeout(callback, 1000 / 60);

      };

  })();

}
   var container, stats;

            var camera, scene, renderer, controls, raycaster
            var mouse = new THREE.Vector2(),
                INTERSECTED;
            var dictionary;
            var sphere, earth, salatites, plane;

            var targetRotationX = 0.5;
            var targetRotationOnMouseDownX = 0;

            var targetRotationY = 0.2;
            var targetRotationOnMouseDownY = 0;

            var mouseX = 0;
            var mouseXOnMouseDown = 0;

            var mouseY = 0;
            var mouseYOnMouseDown = 0;



            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            var slowingFactor = 0.25;
            document.addEventListener( 'mousewheel', (event) => {
              camera.position.z +=event.deltaY/50;
            });
            await init();

            animate();


            async function loadWorld() {


              const loader = new GLTFLoader();

              var earthData  = await loader.loadAsync('/assets/scene.gltf');
              //console.log(earthData);
              earthData = setupModel(earthData);
              //console.log(earthData);
              return earthData;
            }

            async function init() {

                container = document.createElement( 'div' );
                document.body.appendChild( container );

                raycaster = new THREE.Raycaster();
                renderer = new THREE.WebGLRenderer({
                    antialias: true
                });

                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.domElement.addEventListener("click", onclick, true);


                //renderer.setClearColor( 0x00cccc, 0);
                container.appendChild( renderer.domElement );
                document.addEventListener( 'mousedown', onDocumentMouseDown, false );

                scene = new THREE.Scene();
                scene.background = new THREE.Color( 0x00cccc );

                camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
                //console.log(camera);
                camera.position.y = 0;
                camera.position.z = 100;

                // camera.rotation.x = 0;
                // camera.rotation.y = 0;
                // camera.rotation.z = 0;
                //console.log(renderer);
                controls = new OrbitControls(camera, renderer.domElement);


                scene.add( camera );

                var geometry = new THREE.SphereGeometry( 50, 32, 16);
                //var material = new THREE.MeshBasicMaterial( { color: "#166294" } );
                const texture = new THREE.TextureLoader().load( '/assets/textures/Earth.002_diffuse.jpeg' );
                const material = new THREE.MeshBasicMaterial( { map: texture } );
                sphere = new THREE.Mesh( geometry, material );
                sphere.name = 'Earth'
                //log calcrow

                var city_list = await fetch("/assets/json/sample.json")
                  .then(response => {
                     return response.json();
                  })
                  dictionary =[];
                  for (var i=0; i<100; i++) {
                    var temp_satalite = new Satalite();
                    temp_satalite.SatByCart(city_list[i].x, -1*city_list[i].y, city_list[i].z);
                    temp_satalite.satalite.name = city_list[i].city;
                    scene.add( temp_satalite.satalite );

                    //temp_satalite.statlite.on('click',function(ev) {});
                    //console.log(temp_satalite.satalite);
                  }

                controls.addEventListener( 'change', render);
                scene.add( sphere );




                plane = new THREE.Mesh( new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
                //plane.rotation.x = - 90 * ( Math.PI / 180 );
                plane.overdraw = true;
            }

            function onDocumentMouseDown( event ) {

                event.preventDefault();

                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'mouseup', onDocumentMouseUp, false );
                document.addEventListener( 'mouseout', onDocumentMouseOut, false );

                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDownX = targetRotationX;

                mouseYOnMouseDown = event.clientY - windowHalfY;
                targetRotationOnMouseDownY = targetRotationY;
            }

            function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;

                targetRotationX = ( mouseX - mouseXOnMouseDown ) * 0.00025;

                mouseY = event.clientY - windowHalfY;

                targetRotationY = ( mouseY - mouseYOnMouseDown ) * 0.00025;
            }
            function onDocumentMouseUp( event ) {
                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
            }
            function onDocumentMouseOut( event ) {
                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
            }
            function animate() {
                requestAnimationFrame( animate );
                render();
            }

            function render() {

                targetRotationY = targetRotationY * (1 - slowingFactor);
                targetRotationX = targetRotationX * (1 - slowingFactor);
                //console.log(camera);
                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(scene.children);
                if (intersects.length > 0) {
                    if (INTERSECTED != intersects[0].object) {
                        // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
                        INTERSECTED = intersects[0].object;
                        // INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                        console.log(intersects);
                    }
                }
                renderer.render( scene, camera );

            }
