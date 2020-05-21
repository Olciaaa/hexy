var doors;
var hexjs;

$(document).ready(function () {
    hexjs = new Hex3D(5,2);
    
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
        //console.log(hexjs)

        scene.add(hexjs);
    
        camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
        camera.position.set(0,0,200);
        camera.lookAt(scene.position);
    
        controls = new THREE.OrbitControls (camera, renderer.domElement);
    }
    
    function animate()
    {
        controls.update();
        requestAnimationFrame ( animate );  
        renderer.render (scene, camera);
    }
 })