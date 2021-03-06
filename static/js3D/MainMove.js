var player
$(document).ready(function () {
    player = new Player();
    
    var scene, renderer, camera;
    var plane;
    
    init();
    animate();
    moving();
    
    function init()
    {
        console.log(player.container);
        renderer = new THREE.WebGLRenderer( {antialias:true} );
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize (width, height);
        document.body.appendChild (renderer.domElement);
    
        scene = new THREE.Scene();

        var geometry = new THREE.PlaneGeometry( 60, 60, 40, 40);
        var material = new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true, 
            opacity: 0.5
        });
        plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = Math.PI / 2;
        scene.add(plane);

        var axes = new THREE.AxesHelper(1000)
        scene.add(axes);

        player.container.position.y = 2.5;
        scene.add(player.container)
    
        camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
        camera.position.set(0,50,50);
        camera.lookAt(scene.position);
    
    }

    function moving()
    {
        var geometry = new THREE.SphereGeometry(1,10,10);
        var material = new THREE.MeshBasicMaterial({
            color: 0xcf2929,
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true, 
            opacity: 0.5
        });
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.y = 0.7
        scene.add(sphere)
        var clickedVect = new THREE.Vector3(0,0,0); 

        var directionVect = new THREE.Vector3(0,0,0);
        
        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2()

        $(document).mousedown(function (event) {
            {
                console.log("hehe")
                mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
                mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
                
                raycaster.setFromCamera(mouseVector, camera);
                
                var intersects = raycaster.intersectObject(plane);
        
                if (intersects.length > 0) {
        
                clickedVect = intersects[0].point
                //console.log(clickedVect)
        
                directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
                
                sphere.position.x = clickedVect.x;
                sphere.position.z = clickedVect.z;
                
                let distance = player.getPlayerCont().position.clone().distanceTo(clickedVect);
                let posX = Math.abs(player.getPlayerCont().position.x) + distance;
                let posZ = Math.abs(player.getPlayerCont().position.z) + distance;

                var angle = Math.atan2
                (
                    -player.getPlayerCont().position.clone().x + clickedVect.x,
                    -player.getPlayerCont().position.clone().z + clickedVect.z
                )
                console.log(angle);
                console.log(player.getPlayerCont())
                player.getPlayerMesh().rotation.y = angle;
                player.getPlayerAxes().rotation.y = angle;
                console.log(directionVect);  
                }
            }  
        })
        function render() 
        {
            requestAnimationFrame(render);
            if((Math.abs(sphere.position.x - player.getPlayerCont().position.x)>4||Math.abs(sphere.position.z - player.getPlayerCont().position.z)>4))//i < distance) 
            {
                player.getPlayerCont().translateOnAxis(directionVect, 1);
            }
                    
                    
            camera.position.x = player.getPlayerCont().position.x;
            camera.position.z = player.getPlayerCont().position.z + 50;
            camera.position.y = player.getPlayerCont().position.y + 50;
            camera.lookAt(player.getPlayerCont().position);
            renderer.render(scene, camera);
        }
        //render()
    }    
    function animate()
    {
        requestAnimationFrame ( animate );  
        renderer.render (scene, camera);
    }
 })