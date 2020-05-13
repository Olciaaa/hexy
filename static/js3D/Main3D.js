var doors;
var hexjs;

$(document).ready(function () {
    doors = new Doors3D()
    hexjs = new Hex3D();
    
    var scene, renderer, camera;
    var controls;
    
    init();
    animate();
    
    function init()
    {
        renderer = new THREE.WebGLRenderer( {antialias:true} );
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize (width, height);
        document.body.appendChild (renderer.domElement);
    
        scene = new THREE.Scene();

        var axes = new THREE.AxesHelper(1000)
        scene.add(axes);
        console.log(hexjs)

        scene.add(hexjs)
    
        camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
        camera.position.set(0,0,200);
        ////camera.rotation._x = -1.5;
        //camera.rotation._y = -10;
        //camera.rotation._z = -1.5;
        //set(-1.5,-10,-1.5)
        camera.lookAt(scene.position);
    
        controls = new THREE.OrbitControls (camera, renderer.domElement);
        
        /*var gridXZ = new THREE.GridHelper(100, 10);
        gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
        scene.add(gridXZ);*/
    }
    
    function animate()
    {
        controls.update();
        requestAnimationFrame ( animate );  
        renderer.render (scene, camera);
        //console.log(camera.rotation)
    }
 })