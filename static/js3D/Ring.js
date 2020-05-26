class Ring extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        
        this.geometry = new THREE.RingGeometry( 10, 15, 8);
        this.material = Settings.ringMaterial
        this.rotation.x = Math.PI / 2;
        //this = new THREE.Mesh( this.geometry, this.material );
        console.log(this)
    }
}