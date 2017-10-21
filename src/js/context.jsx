import React from 'react';
import ReactDOM from 'react-dom';

const THREE = require('three');
import { OrbitControls } from './utils/orbitControls.js';

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
    this.setupControls();
	}

	componentWillUnmount() {

	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.domElement.style.position = 'absolute';
		this.renderer.domElement.style.zIndex = '-11';
		document.getElementById('context').appendChild(this.renderer.domElement);

	}

	setupScene() {
		this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10);
    this.camera.position.z = 5;
    this.scene.background = new THREE.Color( 0xBBBBBB );
    this.scene.add(this.camera);

    let geometry = new THREE.BoxGeometry(3, 3, 3);
    let material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );


    var tvTexture = new THREE.Texture();

    var loader = new THREE.ImageLoader( manager );
    loader.load( 'assets/tv.png', function ( image ) {

      tvTexture.image = image;
      tvTexture.needsUpdate = true;

    } );
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'assets/3d/tv.obj', function ( object ) {

      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
          child.material.map = tvTexture;
        }
      } );

    // object.position.y = - 95;
    // scene.add( object );

    // }, onProgress, onError );

    // let material = new THREE.ShaderMaterial(
    //   { 
    //     vertexShader: vertShader,
    //     fragmentShader: fragShader,
    //     uniforms: this.uniforms,
    //   }
    // );
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  
    this.animate();
	}

	setupControls() {
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableZoom = false;
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