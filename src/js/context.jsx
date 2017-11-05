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
    
    this.setupGLRenderer();
    this.setupCSSRenderer();
    this.setupGLScene();
    this.setupCSSScene();
    this.setUpObj();
    this.setupControls();
	}

	componentWillUnmount() {

	}

	setupGLRenderer() {
		this.glRenderer = new THREE.WebGLRenderer( { antialias: true } );
		this.glRenderer.setSize(window.innerWidth, window.innerHeight);
		this.glRenderer.domElement.style.position = 'absolute';
		document.getElementById('context').appendChild(this.glRenderer.domElement);
	}

	setupGLScene() {
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


    this.planeWidth = 30;
    this.planeHeight = 20;
    let testPlane = new THREE.PlaneGeometry( this.planeWidth, this.planeHeight );
    this.planeMesh = new THREE.Mesh(testPlane, material);
    this.scene.add(this.planeMesh);

    this.animateGLRenderer();
	}

  setupCSSRenderer() {
    this.cssRenderer = new THREE.CSS3DRenderer();
    this.cssRenderer.setSize( window.innerWidth, window.innerHeight );
    this.cssRenderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.top = 0;
    document.getElementById('context').appendChild(this.cssRenderer.domElement);
  }

  setupCSSScene() {
    this.cssScene = new THREE.Scene() 
    this.cssCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    this.cssCamera.position.set( 0, 0, 50 );
    this.cssScene.add(this.cssCamera);

    // create the dom Element
    let iFrameElement = document.createElement('iframe');
    iFrameElement.src = 'http://www.bryan-ma.com';
    var elementWidth = 1024;
    var aspectRatio = this.planeHeight / this.planeWidth;
    var elementHeight = elementWidth * aspectRatio;
    iFrameElement.style.top = '0px';
    iFrameElement.style.left = '0px';
    iFrameElement.style.width  = elementWidth + "px";
    iFrameElement.style.height = elementHeight + "px";
    // // create the object3d for this element
    this.cssObject = new THREE.CSS3DObject(iFrameElement);
    this.cssObject.position.x = this.planeMesh.position.x;
    this.cssObject.position.y = this.planeMesh.position.y;
    this.cssObject.position.z = this.planeMesh.position.z;
    this.cssObject.rotation.x = this.planeMesh.rotation.x;
    this.cssObject.rotation.y = this.planeMesh.rotation.y;
    this.cssObject.rotation.z = this.planeMesh.rotation.z;

    var percentBorder = 0.0;
    this.cssObject.scale.x /= (1 + percentBorder) * (elementWidth / this.planeWidth);
    this.cssObject.scale.y /= (1 + percentBorder) * (elementWidth / this.planeWidth);
    this.cssScene.add(this.cssObject);
    this.animateCSSRenderer();
    
  }

	setupControls() {
    this.controls = new THREE.OrbitControls( this.camera, this.glRenderer.domElement );
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

  animateGLRenderer() {
    this.glRenderer.animate(this.renderAnimation.bind(this));
  }

  animateCSSRenderer() {
    requestAnimationFrame( () => { this.animateCSSRenderer() } );
    this.cssRenderer.render( this.cssScene, this.cssCamera );
  }

  renderAnimation() {
    this.glRenderer.render(this.scene, this.camera);
    this.uniforms.time.value += this.clock.getDelta();

    if (this.props.animate) {
      this.cube.rotation.x += 0.003;
      this.cube.rotation.y += 0.005;
      this.planeMesh.rotation.y += 0.003;
      this.cssObject.rotation.y += 0.003;
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