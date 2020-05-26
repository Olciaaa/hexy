class Model {

    constructor(){     
       this.container = new THREE.Object3D()
       this.mixer = null;
       this.clock = new THREE.Clock();
       this.model;
    }   
 
    loadModel(url, callback) 
    {
        var container = this.container
 
         var loader = new THREE.JSONLoader();
         var modelMaterial = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("player/sydney.jpg"),
                morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
            });
 
         loader.load(url, (geometry) =>{
            var meshModel = new THREE.Mesh(geometry, modelMaterial)
            meshModel.name = "name";
            meshModel.rotation.y = Math.PI/2; // ustaw obrót modelu
            meshModel.position.y = 0; // ustaw pozycje modelu
            meshModel.position.x = 0;
            meshModel.position.z = 0;
            meshModel.scale.set(1,1,1); // ustaw skalę modelu
            
            var axes = new THREE.AxesHelper(0) // osie konieczne do kontroli kierunku ruchu
 
            container.add(axes)
             
             container.add(meshModel);
             //container.rotation.y = Math.PI/2;
             // zwrócenie kontenera
 
             callback(container); 
             //this.model = meshModel;
         });
     }
 
 
    // update mixera
 
    updateModel () {
        //console.log(this.model)
        var delta = this.clock.getDelta();
         if (this.mixer) this.mixer.update(delta)
     }
 
    //animowanie postaci
 
     setAnimation (action) 
     {

        this.mixer.clipAction(action).play();

     }
 
 }