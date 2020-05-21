class Level3D {

    constructor(){
       this.getData();
       this.lights = [];
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
        
            scene = new THREE.Scene();

            var axes = new THREE.AxesHelper(1000)
            scene.add(axes);
            //console.log(hexjs)
        
            camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
            camera.position.set(0,0,200);
            camera.lookAt(scene.position);
        
            controls = new THREE.OrbitControls (camera, renderer.domElement);
        }
        
        let create = ()=>
        {
            level.level.forEach(element => {
                let hexx = new Hex3D(element.dirIn,element.dirOut);

                var geometryy = new THREE.CylinderGeometry( Settings.radius, Settings.radius, 5, 6 );
                var cylinder = new THREE.Mesh( geometryy, Settings.material1 );
                cylinder.position.y = -50;
                cylinder.rotation.y = Math.PI / 2;
                hexx.add( cylinder);
                //onsole.log(element.z.split("p")[0]);
                hexx.position.x = element.x.split("p")[0];
                hexx.position.z = element.z.split("p")[0];

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
            controls.update();
            requestAnimationFrame ( animate );  
            renderer.render (scene, camera);
        }
        function render() {       
            requestAnimationFrame(render);
        
            // potwierdzenie w konsoli, że render się wykonuje
        
            console.log("render leci")
                
            renderer.render(scene, camera);
        }
        // tu wygeneruj level (ściany, światła, itemy) na podstawie danych zwracanych z serwera
        // i
        // - albo zwróć je do sceny w kontenerze
        // - albo wstaw bezpośrednio do sceny, przekazanej w konstruktorze klasy Level3D
        }
 
   
 
 }