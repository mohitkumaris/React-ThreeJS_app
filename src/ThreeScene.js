import React, {Component} from 'react';
import THREE from './three';
import SideMenu from './screens/SideMenu'
import List from './screens/List'
//import * as Orbit from 'three-orbit-controls';
import OrbitControls from 'orbit-controls-es6';
import './style.css';
var ColladaLoader = require('three-collada-loader');
var OrbitControl = require('three-orbit-controls')(THREE)
class ThreeScene extends Component {

    setupRenderer = (width, height) => {
      //add renderer
      this.renderer = new THREE.WebGLRenderer({antialias: true})
      this.renderer.setClearColor('#fff')
      this.renderer.setSize(width, height)
    }
    setupCamera = (width, height) => {
      // add camera
      this.camera = new THREE.PerspectiveCamera(90, width / height, .5, 1000)
      this.camera.position.z = 10
      this.camera.position.x = 5
      this.camera.position.y = 5

    }
    componentDidMount() {
      const width = this.mount.clientWidth
      const height = this.mount.clientHeight
      //add 3Scene
      this.scene = new THREE.Scene()
      this.setupCamera(width, height)
      //this.scene.add(this.camera)
      this.setupRenderer(width, height);
      this.mount.appendChild(this.renderer.domElement)
      const light = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(light);
      const light1 = new THREE.PointLight(0xffffff, 0.5);
      this.scene.add(light1);
      //add cube
      const geometry = new THREE.BoxGeometry(2,2,2)
      const material = new THREE.MeshNormalMaterial({color: '#cc0000'})
      this.cube = new THREE.Mesh(geometry, material)
      //this.cube.position.x = -10
      const geometry1 = new THREE.SphereGeometry(4,25,25)
      const material1 = new THREE.MeshNormalMaterial({color: '#ddee00', wireframe:true})
      //const material1 = new THREE.MeshLambertMaterial({color: '#ff0000', transparent: true, opacity: 0.5});
      this.cube1 = new THREE.Mesh(geometry1, material1)
      var loader = new ColladaLoader();
      console.log(loader);
      loader.load('plane.dae', function(collada) {
        console.log("collada loaded");
        console.log(collada)
        let girl = collada.scene;
        this.scene.add(girl);
      },(progress)=>{
        console.log(progress);
      },(error)=>{
        console.log(error)
      });
      //load models

      this.scene.add(this.cube1)
      //this.scene.add(this.cube)

      this.start()
      this.orbitControl()
      //console.log("THREE + ",Orbit(THREE));
    }
    addSquare = () => {
      this.scene.add(this.cube)
    }
    removeSquare = () => {
      this.scene.remove(this.cube)
    }
    orbitControl = () => {
      // const controls = new OrbitControls(this.camera, this.renderer.domElement);
      // controls.enabled = true;
      // controls.maxDistance = 1500;
      // controls.minDistance = 0;
      // console.log("Controls ", controls)
      const controls = new OrbitControls(this.camera)
    }
    componentWillUnmount() {
      this.stop()
      this.mount.removeChild(this.renderer.domElement)
    }

    start = () => {
      if(!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
      }
    }

    stop = () => {
      cancelAnimationFrame(this.frameId)
    }

    animate = () => {
      // this.cube.rotation.z += 0.02
      // this.cube.rotation.y += 0.01
      this.cube1.rotation.y += 0.01
      this.cube1.rotation.x += 0.01
      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
      this.renderer.render(this.scene, this.camera)
    }

    scaleBox = () => {
      console.log("clicked")
      this.cube1.scale.x += 0.1
      this.cube1.scale.y += 0.1
      this.cube1.scale.z += 0.1
      //this.cube.position.x += 1
      this.renderScene()
    }
    scaleDownBox = () => {
      console.log("clicked")
      this.cube1.scale.x -= 0.1
      this.cube1.scale.y -= 0.1
      this.cube1.scale.z -= 0.1
      //this.cube.position.x += 1
      this.renderScene()
    }
    scaleUp = () => {
      console.log("scale up called");
      this.scaleBox();
    }
    scaleDown = () => {
      this.scaleDownBox();
    }

    render() {
      return(
        <div>
          <div style={sideMenu}><SideMenu addSquare={this.addSquare} removeSquare={this.removeSquare} scaleUp={this.scaleUp} scaleDown={this.scaleDown}/></div>
          <div
            style={{width:'100%',minHeight: '100vh', alignItems:'center'}}
            ref = {(mount) => {this.mount = mount}}
            onClick={this.scaleBox}
          />
        </div>
      );
    }
}
const sideMenu = {
  display:'block',
  width:'10%',
  height:'100%',
  top:'0px',
  right:'0px',
  backgroundColor:'#ecf0f1',
  position: 'absolute',
  zIndex: '1'
}
export default ThreeScene;
