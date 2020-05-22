class Model {

    constructor(){     
       this.container = new THREE.Object3D()
       this.mixer = null
    }   
 
    loadModel(url, callback) 
    {
        var container = this.container
 
         var loader = new THREE.JSONLoader();
         var modelMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("player/tris.jpg"),
                morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
            });
 
         loader.load(url, function (geometry) {

            console.log("tralala");
            var meshModel = new THREE.Mesh(geometry, modelMaterial)
            meshModel.name = "name";
            meshModel.rotation.y = -10; // ustaw obrót modelu
            meshModel.position.y = 0; // ustaw pozycje modelu
            meshModel.position.x = 0;
            meshModel.position.z = 0;
            meshModel.scale.set(1,1,1); // ustaw skalę modelu
 
         // ładowanie modelu jak poprzednio
 
         //utworzenie mixera jak poprzednio
             
             //dodanie modelu do kontenera (na poprzednich zajęciach był to testowy sześcian)
             var axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu
 
            container.add(axes)
             
             container.add(meshModel)
 
             // zwrócenie kontenera
 
             callback(container); 
 
         });
     }
 
 
    // update mixera
 
     updateModel () {
         if (this.mixer) this.mixer.update(delta)
     }
 
    //animowanie postaci
 
     setAnimation () {
         this.mixer.clipAction("run").play();
     }
 
 }