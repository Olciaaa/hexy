class AllyModel extends THREE.Object3D {

    constructor() {
        super()
        this.mesh = null
        this.mixer = null
        this.clock = new THREE.Clock();

    }

    loadModel(url, callback) {

        let that = this
        this.name = "allyModel";
        let loader = new THREE.JSONLoader();
        var material = new THREE.MeshBasicMaterial(
            {
                map: new THREE.TextureLoader().load("player/black_yoshi.jpg"),
                morphTargets: true // ta własność odpowiada za możliwość animowania materiału modelu
            });

        loader.load(url, function (geometry) {

            that.mesh = new THREE.Mesh(geometry, material) // w materiale morphTargets:true
           
            that.mesh.name = "ally"
            that.mesh.scale.set(0.3,0.3,0.3);

            that.mixer = new THREE.AnimationMixer(that.mesh);

            that.mixer.clipAction("stand").play();
           
            that.mixer.timeScale = 1 // szybkość wykonywania animacji, można ją dostosować do projektu
            //
            that.add(that.mesh)
            //
            callback(that);

        });
    }

    // funkcja aktualizująca animację modelu

    updateModel() {
        var delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta)
    }

    //funkcja do zmiany animacji

    setAnimation (animationName) {
        if (this.mixer) {
            this.mixer.uncacheRoot(this.mesh)
            this.mixer.clipAction(animationName).play();
        }
    }

}