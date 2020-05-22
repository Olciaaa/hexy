class Level3D {

    constructor(){
       this.getData();
       this.player()
       this.lights = [];
       this.scene = new THREE.Scene();
       this.playerModel;
       this.modelCont;
    }
 
    getData(){
        $.ajax({
                url: "getlvl", // url post-a na serwerze
                data: {}, // przykładowe dane
                type: "POST",
                success:  (data) =>{
                    //console.log(JSON.parse(data).length);
                    let lvl = JSON.parse(data);

                    if(lvl.length > 0)
                    {
                        var level = prompt("Który level chcesz wczytać? Wybierz numer od 0 do " + (lvl.length - 1));
                        if(parseInt(level) < lvl.length)
                        {
                            console.log(lvl[parseInt(level)])
                            this.makeLevel(lvl[parseInt(level)])
                        }
                        else
                        {
                            alert("nie ma jeszcze wczytanego takiego poziomu, maksymalny to: " + (lvl.length - 1));
                        }
                    }
                    else
                    {
                        alert("nie masz jeszcze zapisanych żadnych poziomów :(")
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                },
        });
        
       // pobranie danych levelu ajaxem z serwera
       // i uruchomienie generowania levelu (makeLevel)
    }
 
    makeLevel(level){
       console.log(level.level[0].x.split("p")[0])
       console.log(new Hex3D(1,2))
       var hex = new Hex3D(1,2);
       let light = new Light();
       
       var scene, renderer, camera;
        var controls;
        scene = this.scene;
        
        init();
        animate();
       // render();
        
        function init()
        {
            renderer = new THREE.WebGLRenderer( {antialias:true} );
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize (width, height);
            document.body.appendChild (renderer.domElement);

            var axes = new THREE.AxesHelper(1000)
            scene.add(axes);
            //console.log(hexjs)
        
            camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
            camera.position.set(0,100,100);
            camera.lookAt(scene.position);
        
            controls = new THREE.OrbitControls (camera, renderer.domElement);
        }
        
        let create = ()=>
        {
            level.level.forEach(element => {
                let hexx = new Hex3D(element.dirIn,element.dirOut);

                var geometryy = new THREE.CylinderGeometry( Settings.radius, Settings.radius, 5, 6 );
                var cylinder = new THREE.Mesh( geometryy, Settings.material1 );
                cylinder.position.y = -25;
                cylinder.rotation.y = Math.PI / 2;
                
                //onsole.log(element.z.split("p")[0]);
                hexx.position.x = element.x.split("p")[0];
                hexx.position.z = element.z.split("p")[0];
                cylinder.position.x = element.x.split("p")[0];
                cylinder.position.z = element.z.split("p")[0];
                scene.add( cylinder);
                if(element.type == "light")
                {
                    let lightt = light.clone();
                    lightt.position.x = element.x.split("p")[0];
                    lightt.position.z = element.z.split("p")[0];
                    this.lights.push(lightt);
                    scene.add(lightt)
                }
                scene.add(hexx);
                console.log(hexx);
            });
            $("#position").on("input",()=>
            {
                this.lights.forEach(element => {
                    element.position.y = parseInt($("#position")[0].value)
                });
            })
            $("#intensity").on("input",()=>
            {
                this.lights.forEach(element => {
                    element.children[0].intensity = parseInt($("#intensity")[0].value)
                });
            })
        }
        create();

        function animate()
        {
            //controls.update();
            requestAnimationFrame ( animate );  
            renderer.render (scene, camera);
        }
        var clickedVect = new THREE.Vector3(0,0,0); 

        var directionVect = new THREE.Vector3(0,0,0);
        
        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2();

        $(document).mousedown((event)=> {
            //if(event.button == 2)
            {
                /*var geometry = new THREE.CubeGeometry( 5, 5, 5);
                var material = new THREE.MeshBasicMaterial({
                    color: 0x8888ff,
                    side: THREE.DoubleSide,
                    wireframe: false,
                    transparent: true, 
                    opacity: 0.5
                });
                let player = new THREE.Mesh(geometry, material);
                scene.add(player)
                console.log(this.playerModel)*/
                let player = this.playerModel;
                //player.rotation.y = Math.PI/2;
                mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
                mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
                
                raycaster.setFromCamera(mouseVector, camera);
                
                var intersects = raycaster.intersectObjects(this.scene.children);
        
                if (intersects.length > 0) {
        
                clickedVect = intersects[0].point;
        
                directionVect = clickedVect.clone().sub(player.position).normalize()
                console.log(directionVect);
                
                let distance = player.position.clone().distanceTo(clickedVect);
                let posX = Math.abs(player.position.x) + distance;
                let posZ = Math.abs(player.position.x) + distance;
                //console.log(clickedVect);
                //console.log()
                let i = 0;
                //directionVect.x = -directionVect.x;
                //directionVect.z = -directionVect.z;
                //directionVect.rotate.y = Math.PI/2
                directionVect.z = directionVect.z //+ Math.PI/2
                directionVect.x = directionVect.x //+ Math.PI/2;
                directionVect.y = player.position.y

                var angle = Math.atan2
                (
                    player.position.clone().x - clickedVect.x,
                    player.position.clone().z - clickedVect.z
                )
                console.log(this.modelCont);
                console.log(this.playerModel);

                player.children[1].rotation.y = angle;
                player.children[0].rotation.y = angle;
                //player.position.x = clickedVect.x;
                //player.position.z = clickedVect.z;
                //directionVect.x = directionVect.x + Math.PI/2
                let model = this.modelCont;
                
                function render() {      
                    if(i < distance) 
                    {
                        requestAnimationFrame(render);
                        i++;
                        //console.log(i);
                        //console.log(distance)
                    }
                    model.translateOnAxis(directionVect, 1)
                    //console.log(directionVect);
                    //console.log(player.position)
                    camera.position.x = player.position.x
                    camera.position.z = player.position.z + 100
                    camera.position.y = player.position.y + 100
                    camera.lookAt(player.position)
                    renderer.render(scene, camera);
                }
                render()
                }
            }
        })
        // tu wygeneruj level (ściany, światła, itemy) na podstawie danych zwracanych z serwera
        // i
        // - albo zwróć je do sceny w kontenerze
        // - albo wstaw bezpośrednio do sceny, przekazanej w konstruktorze klasy Level3D
        }
    player()
    {
        this.playerModel;
        model.loadModel("player/tris.js", (modeldata)=>{
            console.log("model został załadowany", modeldata)
            console.log(this.scene);
            console.log(modeldata)
            this.scene.add(modeldata) // data to obiekt kontenera zwrócony z Model.js
            this.playerModel = modeldata
        })
        console.log(model.container)
        this.modelCont = model.container;
        //model.container.rotation.y = Math.PI/2;
        //
    }
   
 
 }