/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;

import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import PhongMaterial = THREE.MeshPhongMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var plane: Mesh;
    var cube1: Mesh;
    var cube2: Mesh;
    var cube3: Mesh;
    var cube4: Mesh;
    var cube5: Mesh;
    var cubeGeometry1: CubeGeometry;
    var cubeGeometry2: CubeGeometry;
    var cubeGeometry3: CubeGeometry;
    var cubeGeometry4: CubeGeometry;
    var cubeGeometry5: CubeGeometry;
    var axes: AxisHelper;
    var ambientLight: AmbientLight;
    var spotLight: SpotLight;
    var cubeMaterial1: PhongMaterial;
    var cubeMaterial2: PhongMaterial;
    var cubeMaterial3: PhongMaterial;
    var cubeMaterial4: PhongMaterial;
    var cubeMaterial5: PhongMaterial;


    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        
        setupRenderer(); // setup the default renderer
	
        setupCamera(); // setup the camera

        var sandTexture = THREE.ImageUtils.loadTexture('Scripts/texture/sand.jpg')
        
        /* ENTER CODE HERE */
        //Add a Plane to the Scene
        plane = new gameObject(
            new PlaneGeometry(16, 16, 1, 1),
            new PhongMaterial({ map: sandTexture, bumpMap: sandTexture, bumpScale: 0.05 }),
            0, 0, 0);
        plane.rotation.x = -0.5 * Math.PI;
        plane.name = "ground";
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");

        var texture = THREE.ImageUtils.loadTexture('Scripts/texture/bricks.jpg');

        //Cube Materials for all the cube
        cubeMaterial1 = new PhongMaterial({ map: texture, bumpMap: texture, bumpScale: 0.05 });
        cubeMaterial2 = new PhongMaterial({ map: texture, bumpMap: texture, bumpScale: 0.05 });
        cubeMaterial3 = new PhongMaterial({ map: texture, bumpMap: texture, bumpScale: 0.05 });
        cubeMaterial4 = new PhongMaterial({ map: texture, bumpMap: texture, bumpScale: 0.05 });
        cubeMaterial5 = new PhongMaterial({ map: texture, bumpMap: texture, bumpScale: 0.05 });

        //Added the bottom cube
        cubeGeometry1 = new CubeGeometry(6, 2, 6);
        cube1 = new Mesh(cubeGeometry1, cubeMaterial1);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        cube1.position.set(0, 1, 0);
        scene.add(cube1);

        //Added the 2nd last cube
        cubeGeometry2 = new CubeGeometry(4.6, 2, 4.6);
        cube2 = new Mesh(cubeGeometry2, cubeMaterial2);
        cube2.castShadow = true;
        cube2.receiveShadow = true;
        cube2.position.set(0, 3, 0);
        scene.add(cube2);

        //Added the third cube
        cubeGeometry3 = new CubeGeometry(3.4, 2, 3.4);
        cube3 = new Mesh(cubeGeometry3, cubeMaterial3);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        cube3.position.set(0, 5, 0);
        scene.add(cube3);

        //Added the second cube
        cubeGeometry4 = new CubeGeometry(2.2, 1.2, 2.2);
        cube4 = new Mesh(cubeGeometry4, cubeMaterial4);
        cube4.castShadow = true;
        cube4.receiveShadow = true;
        cube4.position.set(0, 6.6, 0);
        scene.add(cube4);

        //Added the 1st cube
        cubeGeometry5 = new CubeGeometry(1.4, 0.6, 1.4);
        cube5 = new Mesh(cubeGeometry5, cubeMaterial5);
        cube5.castShadow = true;
        cube5.receiveShadow = true;
        cube5.position.set(0, 7.5, 0);
        scene.add(cube5);

        //Added axis helper
        axes = new AxisHelper(20);
        plane.add(axes);
        console.log("Added Axis Helper to scene...");
 
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0x11111);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");


        //Adding the spotlight
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(5.6, 23.1, 5.4);
        spotLight.rotation.set(-0.8, 42.7, 19.5);
        spotLight.intensity = 3;
        spotLight.angle = 60 * (Math.PI / 180);
        spotLight.distance = 200;
        spotLight.castShadow = true;
        spotLight.shadowCameraNear = 1;
        spotLight.shadowMapHeight = 2048;
        spotLight.shadowMapWidth = 2048;
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");
 
 
        // add controls
        gui = new GUI();
        control = new Control(0);
        addControl(control);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	

    }

    //Adding control
    function addControl(controlObject: Control): void {
        gui.add(controlObject, 'rotationSpeed1', -0.5, 0.5);
        gui.add(controlObject, 'rotationSpeed2', -0.5, 0.5);
        gui.add(controlObject, 'rotationSpeed3', -0.5, 0.5);
        gui.add(controlObject, 'rotationSpeed4', -0.5, 0.5);
        gui.add(controlObject, 'rotationSpeed5', -0.5, 0.5);
    }

    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    // Setup main game loop
    function gameLoop(): void {
        stats.update();


        //Adding cube rotation
        cube1.rotation.y += control.rotationSpeed1;
        cube2.rotation.y += control.rotationSpeed2;
        cube3.rotation.y += control.rotationSpeed3;
        cube4.rotation.y += control.rotationSpeed4;
        cube5.rotation.y += control.rotationSpeed5;
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        // camera.position.x = 13.3;
        // camera.position.y = 15.5;
        // camera.position.z = 23.7;
        camera.position.set(22.5, 15.75, 16.4);
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

