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
            console.log(allies.position)
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

        $(document).mousedown(function (event) {
            //if(event.button == 2)
            {
                mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
                mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
                
                raycaster.setFromCamera(mouseVector, camera);
                
                var intersects = raycaster.intersectObjects(scene.children, true);
                console.log(scene.children)
        
                if (intersects.length > 0) {
                console.log(intersects[0].object.geometry)
                if(intersects[0].object.geometry.type == "SphereGeometry")
                {
                    let clickedMesh = intersects[0].object;
                    //clickedMesh.position.x = player.getPlayerCont().position.x;
                    //clickedMesh.position.z = player.getPlayerCont().position.z;
                    //player.container.add(clickedMesh)
                    clickedAllies.push(clickedMesh);
                }
                else if(intersects[0].object.geometry.type == "PlaneGeometry")
                {
                    clickedVect = intersects[0].point
                    //console.log(clickedVect)
            
                    directionVect = clickedVect.clone().sub(player.getPlayerCont().position).normalize() // sub - > odejmij pozycję playera od pozycji kliknięcia
                    sphere.position.x = clickedVect.x ;
                    sphere.position.z = clickedVect.z;
                    
                    let distance = player.getPlayerCont().position.clone().distanceTo(clickedVect);
                    let posX = Math.abs(player.getPlayerCont().position.x) + distance;
                    let posZ = Math.abs(player.getPlayerCont().position.x) + distance;
                    //console.log(clickedVect);
                    //console.log()
                    let i = 0;

                    var angle = Math.atan2
                    (
                        -player.getPlayerCont().position.clone().x + clickedVect.x,
                        -player.getPlayerCont().position.clone().z + clickedVect.z
                    )
                    //console.log(angle);
                    //console.log(player.getPlayerCont())
                    player.getPlayerMesh().rotation.y = angle;
                    player.getPlayerAxes().rotation.y = angle;
                    
                    function render() {      
                        if(i < distance) 
                        {
                            requestAnimationFrame(render);
                            i++;
                        }
                        player.getPlayerCont().translateOnAxis(directionVect, 1)
                        for(let i =1; i<clickedAllies.length;i++)
                        {
                            directionVect1 = clickedAllies[i-1].position.clone().sub(clickedAllies[i].position).normalize();
                            clickedAllies[i].translateOnAxis(directionVect1, 0.8 - 0.1*i);
                        }
                        /*clickedAllies.forEach(element => {
                            directionVect1 = player.getPlayerCont().position.clone().sub(element.position).normalize()
                            element.translateOnAxis(directionVect1, 0.9)
                        });*/
                        
                        //console.log(clickedVect);
                        //console.log(player.getPlayerCont().position)
                        camera.position.x = player.getPlayerCont().position.x
                        camera.position.z = player.getPlayerCont().position.z + 50
                        camera.position.y = player.getPlayerCont().position.y + 50
                        camera.lookAt(player.getPlayerCont().position)
                        renderer.render(scene, camera);
                    }
                    render()
                    }

                }
                
            }
            
        })
    }    
    function animate()
    {
        requestAnimationFrame ( animate );  
        renderer.render (scene, camera);
    }
 })