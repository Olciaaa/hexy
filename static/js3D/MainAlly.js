var player
$(document).ready(function () {
    player = new Player();
    
    var scene, renderer, camera;
    
    init();
    animate();
    moving();
    
    function init()
    {
        //console.log(player.container);
        var ally = new Ally()
        console.log(ally)
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
        var plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = Math.PI / 2;
        scene.add( plane );

        var axes = new THREE.AxesHelper(1000)
        scene.add(axes);

        
        for(let i = 0; i <=10; i++)
        {
            let x = Math.random() * (30 - (-30)) - 30;
            let z = Math.random() * (30 - (-30)) - 30;
            let allies = ally.clone().children[0];
            allies.position.x = x;
            allies.position.z = z;
            //console.log(allies.position)
            scene.add(allies);
        }

        player.container.position.y = 2.5;
        scene.add(player.container)
    
        camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
        camera.position.set(0,50,50);
        camera.lookAt(scene.position);
    
    }

    function moving()
    {
        let pressing = false;
        var clickedAllies = [];
        clickedAllies[0] = player.getPlayerCont();
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
        var directionVect1 = new THREE.Vector3(0,0,0);
        
        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2()

        $(document).mousedown(function (e) 
        {
            pressing = true;
            //$(document).mousemove(function (event) 
            //{
                if(pressing == true)
                {
                    mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
                    mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
                    
                    raycaster.setFromCamera(mouseVector, camera);
                    
                    var intersects = raycaster.intersectObjects(scene.children, true);
            
                    if (intersects.length > 0) 
                    {
                // console.log(intersects[0].object.geometry)
                    if(intersects[0].object.geometry.type == "SphereGeometry")
                    {
                        let clickedMesh = intersects[0].object;
                        clickedMesh.material.color.set( 0x0BFCF8 );
                        clickedAllies.push(clickedMesh);
                    }
                    else if(intersects[0].object.geometry.type == "PlaneGeometry")
                    {
                        clickedVect = intersects[0].point
                
                        directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
                        sphere.position.x = clickedVect.x;
                        sphere.position.z = clickedVect.z;

                        var angle = Math.atan2
                        (
                            -player.getPlayerCont().position.clone().x + clickedVect.x,
                            -player.getPlayerCont().position.clone().z + clickedVect.z
                        )
                        player.getPlayerMesh().rotation.y = angle;
                        player.getPlayerAxes().rotation.y = angle;
                        render()
                        }
                    }  
                }
            //})
        })
        $(document).mouseup(function (e) {
            pressing = false;
        })
        function render() {   
            if((Math.abs(sphere.position.x - player.getPlayerCont().position.x)>4||Math.abs(sphere.position.z - player.getPlayerCont().position.z)>4))//i < distance) 
            {
                requestAnimationFrame(render);
            }   
            player.getPlayerCont().translateOnAxis(directionVect, 1)
            for(let i =1; i<clickedAllies.length;i++)
            {
                directionVect1 = clickedAllies[i-1].position.clone().sub(clickedAllies[i].position).normalize();
                //console.log(directionVect1)
                if((Math.abs(clickedAllies[i-1].position.x - clickedAllies[i].position.x)>4)||(Math.abs(clickedAllies[i-1].position.z - clickedAllies[i].position.z))>4)//i < distance) 
                {
                    clickedAllies[i].translateOnAxis(directionVect1, 0.95);
                } 
                
            }
            camera.position.x = player.getPlayerCont().position.x
            camera.position.z = player.getPlayerCont().position.z + 50
            camera.position.y = player.getPlayerCont().position.y + 50
            camera.lookAt(player.getPlayerCont().position)
            renderer.render(scene, camera);
        }
    }    
    function animate()
    {
        requestAnimationFrame ( animate );  
        renderer.render (scene, camera);
    }
 })