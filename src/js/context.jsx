import React from 'react';
import ReactDOM from 'react-dom';

const THREE = require('three');
import { OrbitControls } from './utils/orbitControls.js';
import { OBJLoader } from './utils/OBJLoader.js';
import { CSS3DRenderer } from './utils/CSS3DRenderer.js';

require('../sass/style.scss');

export class Context extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.clock = new THREE.Clock();
    this.uniforms = {
      time: { value: 0.0 },
    };
    
    this.setupRenderer();
    this.setupScene();
    this.setUpObj();
    this.setupControls();
	}

	componentWillUnmount() {

	}


// // create the plane mesh
// var geometry = new THREE.PlaneGeometry();
// var planeMesh= new THREE.Mesh( geometry, material );
// // add it to the WebGL scene
// glScene.add(planeMesh);

// create the dom Element
// var element = document.createElement( 'img' );
// element.src = 'textures/sprites/ball.png';
// // create the object3d for this element
// var cssObject = new THREE.CSS3DObject( element );
// // we reference the same position and rotation 
// cssObject.position = planeMesh.position;
// cssObject.rotation = planeMesh.rotation;
// // add it to the css scene
// cssScene.add(cssObject);

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.domElement.style.position = 'absolute';
		document.getElementById('context').appendChild(this.renderer.domElement);
	}

	setupScene() {
		this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 50;
    this.scene.background = new THREE.Color( 0xBBBBBB );
    this.scene.add(this.camera);

    var ambient = new THREE.AmbientLight( 0x101030 );
    this.scene.add( ambient );
    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 );
    this.scene.add( directionalLight );

    let geometry = new THREE.BoxGeometry(3, 3, 3);
    let material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    let testPlane = new THREE.PlaneGeometry( 20, 20 );
    let planeMesh = new THREE.Mesh(testPlane, material);
    this.scene.add(planeMesh);
    
    var cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize( window.innerWidth, window.innerHeight );
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;

    this.animate();
	}

	setupControls() {
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableZoom = false;
  }

  setUpObj() {
    const manager = new THREE.LoadingManager();
    const imgLoader = new THREE.ImageLoader( manager );
    const objLoader = new THREE.OBJLoader( manager );
    let texture = new THREE.Texture();
    this.obj = null;

    manager.onProgress = (item, loaded, total) => {
      console.log(item, loaded, total);
    };

    const onProgress = (xhr) => {
      if (xhr.lengthComputable) {
        let percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };

    const onError = (xhr) => {
      console.log("OBJ load error");
    };
    
    imgLoader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/UV_Grid_Sm.jpg', (image) => {
      texture.image = image;
      texture.needsUpdate = true;
    });

    const loadObject = (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = texture;
        }
      });
      object.position.y = -20;
      this.obj = object;
      this.scene.add( this.obj );
    }
    
    objLoader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/obj/male02/male02.obj', loadObject.bind(this), onProgress, onError );
  }

  animate() {
    this.renderer.animate(this.renderAnimation.bind(this));
  }

  renderAnimation() {
    this.renderer.render(this.scene, this.camera);
    this.uniforms.time.value += this.clock.getDelta();

    if (this.props.animate) {
      this.cube.rotation.x += 0.003;
      this.cube.rotation.y += 0.005;
      if (this.obj !== null) {
        this.obj.rotation.y += 0.003;
      }
    } 
  }

	render() {
		return (
			<div>
				<div id='context'></div>
			</div>
		);
	}
}