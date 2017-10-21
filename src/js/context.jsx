import React from 'react';
import ReactDOM from 'react-dom';

const THREE = require('three');
import { OrbitControls } from './utils/orbitControls.js';
import { OBJLoader } from './utils/OBJLoader.js';

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

    // // texture
    // var manager = new THREE.LoadingManager();
    // manager.onProgress = function ( item, loaded, total ) {

    //   console.log( item, loaded, total );

    // };

    // var texture = new THREE.Texture();

    // var onProgress = function ( xhr ) {
    //   if ( xhr.lengthComputable ) {
    //     var percentComplete = xhr.loaded / xhr.total * 100;
    //     console.log( Math.round(percentComplete, 2) + '% downloaded' );
    //   }
    // };

    // var onError = function ( xhr ) {
    // };

    // var loader = new THREE.ImageLoader( manager );
    // loader.load( '../../assets/3d/tv.png', function ( image ) {

    //   texture.image = image;
    //   texture.needsUpdate = true;

    // } );
    // // model
    // var loader = new THREE.OBJLoader( manager );
    // console.log(loader);
    // loader.load( '../../assets/3d/tv.obj', function ( object ) {

    //   object.traverse( function ( child ) {

    //     if ( child instanceof THREE.Mesh ) {

    //       child.material.map = texture;

    //     }

    //   } );

    //   object.position.y = - 95;
    //   this.scene.add( object );

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