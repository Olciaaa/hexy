class Ally extends THREE.Mesh {
    constructor() {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        console.log(this)
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(2.5, 15, 15),
            new THREE.MeshBasicMaterial({ color: 0xFF2845,wireframe: true, })
        );
        this.mesh.position.y = 1;
        
        //this.axes = new THREE.AxesHelper(5) // osie konieczne do kontroli kierunku ruchu
       // this.axes.scale.x = 0.05;
        //this.axes.scale.y = 0.05;
        //this.axes.scale.z = 0.05;
        this.add(this.mesh);
        //this.add(this.axes);
    }
}