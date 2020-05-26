class Level3D {

    constructor(){
       this.getData();
       this.player();
       
       this.lights = [];
       this.scene = new THREE.Scene();
       this.playerModel;
       this.modelCont;
       this.modelC = new Model();
       this.modelAllyClass = [];
       //this.modelAlly;
       this.whereAlly = [];
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
 
    makeLevel(level)
    {
        var ring = new Ring()
        console.log(ring.type)
       //console.log(level.level[0].x.split("p")[0])
       //console.log(new Hex3D(1,2))
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
        var tymczasowa = []
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
                
                else if(element.type == "enemy")
                {
                    console.log("enemy");
                    tymczasowa.push({"x":element.x.split("p")[0],"z":element.z.split("p")[0]})
                }
                
                scene.add(hexx);
                //console.log(hexx);
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
        this.whereAlly = tymczasowa;
        console.log(this.whereAlly);
        this.ally();
        function animate()
        {
            //controls.update();
            requestAnimationFrame ( animate );  
            renderer.render (scene, camera);
        }
        var clickedVect = new THREE.Vector3(0,0,0); 

        var directionVect = new THREE.Vector3(0,0,0);
        var directionVect1 = new THREE.Vector3(0,0,0);
        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2();
        //console.log(model);
        var action = "wave";
        var modelClass = this.modelC;
        var clickedAllies = [];
        //clickedAllies[0] = modelClass.container;
        $(document).mousedown((event)=> 
        {
            //console.log(player);
            action = "run";
            var player = this.playerModel;
            clickedAllies[0] = player;
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
                
                raycaster.setFromCamera(mouseVector, camera);
                
                var intersects = raycaster.intersectObjects(this.scene.children);
                var intersectsAlly = raycaster.intersectObjects(scene.children, true);
        
                if (intersects.length > 0) {
                    
                    if(intersectsAlly[0].object.parent.name == "allyModel")//&& intersectsAlly[0].object.name == "ally")
                    {
                        //console.log(intersectsAlly[0].object.parent);
                        let isItClicked = false;
                        clickedAllies.forEach(element => {
                            if(element == intersectsAlly[0].object.parent)
                            {
                                isItClicked = true;
                            }
                        });
                        if(isItClicked == false)
                        {
                            clickedAllies.push(intersectsAlly[0].object.parent);
                        }
                        
                        console.log(clickedAllies)
                    }
                clickedVect = intersects[0].point;
                directionVect = clickedVect.clone().sub(player.position).normalize()
                //console.log(directionVect);
                
                directionVect.z = directionVect.z //+ Math.PI/2
                directionVect.x = directionVect.x //+ Math.PI/2;
                directionVect.y = player.position.y

                var angle = Math.atan2
                (
                    player.position.clone().x - clickedVect.x,
                    player.position.clone().z - clickedVect.z
                )
                //console.log(this.modelCont);
                //console.log(this.playerModel);

                player.children[1].rotation.y = angle - Math.PI/2;
                player.children[0].rotation.y = angle;
            }
        })
        var raycasterr = new THREE.Raycaster();
        var ring = new Ring()
        var ringIn = false;
        $(document).mousemove((event)=> {
            
            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components
        
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            //console.log(mouseVector);
            raycasterr.setFromCamera(mouseVector, camera);
            var intersects = raycasterr.intersectObjects(this.scene.children,true);
        
            if (intersects.length > 0) 
            {
                //console.log(intersects[0].object)
                if(intersects[0].object.parent.name == "allyModel")//&& intersectsAlly[0].object.name == "ally")
                {
                    var over = intersects[0].object;
                    let isItClicked = false;
                    clickedAllies.forEach(element => {
                    if(element == intersects[0].object.parent)
                    {
                        isItClicked = true;
                    }
                    });
                    if(isItClicked == false)
                    {
                        //console.log(over)
                        ring.position.x = intersects[0].object.parent.position.x;
                        ring.position.z = intersects[0].object.parent.position.z;
                        scene.add(ring)
                        ringIn = true;
                    }
                    //clickedAllies.push(intersectsAlly[0].object.parent);
                    
                }
                else
                {
                    if(ringIn == true)
                    {
                        scene.remove(ring);
                        ringIn = false;
                    }
                    
                }
            }
        })
        //window.addEventListener( 'mousemove', onMouseMove, false );
        let model = this.modelCont;
        var allyModel = this.allyModelClass
        //console.log(allyModel)
        var angle = 0;
        function render() 
        {      
            requestAnimationFrame(render);

            if(ringIn == true)
            {
                ring.rotation.z += 0.01;
            }

            if((Math.abs(clickedVect.x - model.position.x)>4||Math.abs(clickedVect.z - model.position.z)>4))//i < distance) 
            {
                model.translateOnAxis(directionVect, 1);
                action = "run"
                
                for(let i =1; i<clickedAllies.length;i++)
                {
                    var anglee = Math.atan2
                    (
                        clickedAllies[i-1].position.x -  clickedAllies[i].position.x,
                        clickedAllies[i-1].position.z -  clickedAllies[i].position.z
                    )
                    clickedAllies[i].children[0].rotation.y = anglee + Math.PI/2;
                    directionVect1 = clickedAllies[i-1].position.clone().sub(clickedAllies[i].position).normalize();
                    //console.log(directionVect1)
                    if((Math.abs(clickedAllies[i-1].position.x - clickedAllies[i].position.x)>15)||(Math.abs(clickedAllies[i-1].position.z - clickedAllies[i].position.z))>15)//i < distance) 
                    {
                        clickedAllies[i].translateOnAxis(directionVect1, 1);
                    } 
                }
            }
            else
            {
                action = "stand";
            }
            if(modelClass.mixer)
            {
                if(modelClass.mixer._actions[0]._clip.name != action)
                {
                    modelClass.mixer.uncacheRoot(model.children[1]);
                    modelClass.setAnimation(action);
                    for(let i =1; i<clickedAllies.length;i++)
                    {
                        console.log(clickedAllies[i])
                        clickedAllies[i].setAnimation(action);
                    }
                    if(action == "stand")
                    {
                       // model.children[1].rotation.y = model.children[1].rotation.y + Math.PI/2
                    }
                }
            }  
            
            camera.position.x = model.position.x
            camera.position.z = model.position.z + 100
            camera.position.y = model.position.y + 100
            camera.lookAt(model.position)
            renderer.render(scene, camera);
            modelClass.updateModel();
            //allyModel.updateModel()
            allyModel.forEach(element => {
                element.updateModel();
            });
           // modelAllyClass.updateModelAlly();
            //console.log(modelClass.mixer._actions[0]._clip.name)
        }
        //var func = render.bind(this)
        render()
    }
    player()
    {
        this.playerModel;
        model.loadModel("player/tris.js", (modeldata)=>{
            //console.log("model został załadowany", modeldata)
            //console.log(this.scene);
            //console.log(modeldata)
            this.scene.add(modeldata) // data to obiekt kontenera zwrócony z Model.js
            this.playerModel = modeldata
            //console.log(this.playerModel.children[1])
            for (var i = 0; i < this.playerModel.children[1].geometry.animations.length; i++) {
                //console.log(this.playerModel.children[1].geometry.animations[i].name);
            }
            this.modelC.mixer = new THREE.AnimationMixer(this.playerModel.children[1])
            this.modelC.model = this.playerModel.children[1]
            this.modelC.mixer.clipAction("stand").play();
            //console.log(this.modelC.mixer._actions[0]._clip.name)
        })
        //console.log(model.container)
        this.modelCont = model.container;
        //
    }
    ally()
    {
        var tymczasowa = [];
        console.log(this.whereAlly);
        this.whereAlly.forEach(element => {
            var allyModel = new AllyModel()
            //console.log(allyModel);
            tymczasowa.push(allyModel);
    
            allyModel.loadModel("player/yoshi.js",  (allydata)=> {
            //console.log("model jest załadowany")
            allydata.position.set(parseInt(element.x),0,parseInt(element.z));
            this.scene.add(allydata)
            })
    
            allyModel.setAnimation("stand")
        });
        this.allyModelClass = tymczasowa;
    }
 
 }