import * as THREE from './three.module.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';


let nameMesh = new THREE.Mesh()
let name = "KENT"

let stars, starGeo


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 10, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

lighting()
text()
particles()

function particles() { 
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0x03fcd3,
    size: 1.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

function animateParticles() {
  starGeo.verticesNeedUpdate = true;
  stars.position.y -= 0.5;

  if(stars.position.y < -200) {stars.position.y = 100;}
  }

function text() {
  const texture = new THREE.TextureLoader().load("../assets/textures/wooden.jpg");

  const floader = new FontLoader();
  floader.load('../assets/fonts/Isometra_Regular.json', function(font) {
    const textGeometry = new TextGeometry(name, {
      font: font,
      size:5,
      height:2,
    })
    textGeometry.center();
    const textMaterial = new THREE.MeshPhongMaterial({ map: texture });
    nameMesh = new THREE.Mesh(textGeometry,textMaterial);
    scene.add(nameMesh);
  });
  camera.position.z = 25;
}

function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

function rainColorChange() { 
  stars.material.color.setRGB(Math.random(256), Math.random(256), Math.random(256))
}

function animate() {
  requestAnimationFrame(animate)

  animateParticles()

  nameMesh.rotation.y -= 0.01

  renderer.render(scene, camera)
}

animate();
setInterval(rainColorChange, 3000)
