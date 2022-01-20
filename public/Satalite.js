import * as THREE from "three";
export class Satalite {


  constructor(){
    var geometry = new THREE.SphereGeometry( 1, 32, 16);
    colorRandom();
    var material = new THREE.MeshBasicMaterial( { color: colorRandom() } );
    // enable transparency
    material.transparent = true;
    // set opacity to 50%
    material.opacity = 0.5;
    //const texture = new THREE.TextureLoader().load( '/assets/textures/Earth.002_diffuse.jpeg' );
    //const material = new THREE.MeshBasicMaterial( { map: texture } );
    this.satalite = new THREE.Mesh( geometry, material );
    this.satalite.position.x = 50;
    this.satalite.position.y = 0;
    this.satalite.position.z = 0;

    return this;

  }

  SatByLatLong(lat, long){

    var cartesian_cordinates=calcCrow(lat,long, 50);
    this.satalite.position.x = cartesian_cordinates.x;
    this.satalite.position.y = cartesian_cordinates.y;
    this.satalite.position.z = cartesian_cordinates.z;

    return this;
  }
  SatByCart(x,y,z){
    this.satalite.position.x = x;
    this.satalite.position.y = z;
    this.satalite.position.z = y;
  }
  changeColorRandom(){

  }

}
function calcCrow(latitude, longitude, radius)
{

    const lat =  latitude;
    const lon =  longitude;
    console.log(Math.cos(lat),Math.cos(lon));
    const x = radius*Math.cos(lat) * Math.cos(lon)

    const y = radius*Math.cos(lat) * Math.sin(lon)

    const z = radius*Math.sin(lat)
    console.log((6371*x/250),(6371*y/250),(6371*z/250));
    return {x,y,z}

}
function calcCrowReverse(x,y,z)
{

  const lat = Math.asin(z,1);
  const long = Math.atan2(y,x);

}
function colorRandom(){

  const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

  return '#'+genRanHex(6);

}
