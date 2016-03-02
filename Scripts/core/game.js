/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var plane;
    var cube1;
    var cube2;
    var cube3;
    var cube4;
    var cube5;
    var cubeGeometry1;
    var cubeGeometry2;
    var cubeGeometry3;
    var cubeGeometry4;
    var cubeGeometry5;
    var axes;
    var ambientLight;
    var spotLight;
    var cubeMaterial1;
    var cubeMaterial2;
    var cubeMaterial3;
    var cubeMaterial4;
    var cubeMaterial5;
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        /* ENTER CODE HERE */
        //Add a Plane to the Scene
        plane = new gameObject(new PlaneGeometry(16, 16, 1, 1), new LambertMaterial({ color: 0xf4a460 }), 0, 0, 0);
        plane.rotation.x = -0.5 * Math.PI;
        plane.name = "ground";
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
        cubeMaterial1 = new LambertMaterial({ color: 0xffff00 });
        cubeMaterial2 = new LambertMaterial({ color: 0xff00ff });
        cubeMaterial3 = new LambertMaterial({ color: 0x00ffff });
        cubeMaterial4 = new LambertMaterial({ color: 0xff0000 });
        cubeMaterial5 = new LambertMaterial({ color: 0x0000ff });
        cubeGeometry1 = new CubeGeometry(6, 2, 6);
        cube1 = new Mesh(cubeGeometry1, cubeMaterial1);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        cube1.position.set(0, 1, 0);
        scene.add(cube1);
        cubeGeometry2 = new CubeGeometry(4.6, 2, 4.6);
        cube2 = new Mesh(cubeGeometry2, cubeMaterial2);
        cube2.castShadow = true;
        cube2.receiveShadow = true;
        cube2.position.set(0, 3, 0);
        scene.add(cube2);
        cubeGeometry3 = new CubeGeometry(3.4, 2, 3.4);
        cube3 = new Mesh(cubeGeometry3, cubeMaterial3);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        cube3.position.set(0, 5, 0);
        scene.add(cube3);
        cubeGeometry4 = new CubeGeometry(2.2, 1.2, 2.2);
        cube4 = new Mesh(cubeGeometry4, cubeMaterial4);
        cube4.castShadow = true;
        cube4.receiveShadow = true;
        cube4.position.set(0, 6.6, 0);
        scene.add(cube4);
        cubeGeometry5 = new CubeGeometry(1.4, 0.6, 1.4);
        cube5 = new Mesh(cubeGeometry5, cubeMaterial5);
        cube5.castShadow = true;
        cube5.receiveShadow = true;
        cube5.position.set(0, 7.5, 0);
        scene.add(cube5);
        axes = new AxisHelper(20);
        plane.add(axes);
        console.log("Added Axis Helper to scene...");
        // Add an AmbientLight to the scene
        // ambientLight = new AmbientLight(0xffffff);
        // scene.add(ambientLight);
        // console.log("Added an Ambient Light to Scene");
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
    function addControl(controlObject) {
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
    function gameLoop() {
        stats.update();
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
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 15.3;
        camera.position.y = 18.5;
        camera.position.z = -28.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
//# sourceMappingURL=game.js.map