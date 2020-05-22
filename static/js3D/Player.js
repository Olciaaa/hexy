class Player {

    constructor(){  
 
        this.container = new THREE.Object3D()
 
        var geometry = new THREE.CubeGeometry( 5, 5, 5);
        var material = new THREE.MeshBasicMaterial({
            color: 0x8888ff,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true, 
            opacity: 0.5
        });
        this.player = new THREE.Mesh(geometry, material);
 
        this.container.add(this.player) // kontener w którym jest player
 
        this.axes = new THREE.AxesHelper(200) // osie konieczne do kontroli kierunku ruchu
        this.axes.scale.x = 0.1;
        this.axes.scale.y = 0.1;
        this.axes.scale.z = 0.1;
        console.log(this.axes)
 
        this.container.add(this.axes)
        this.getPlayerCont();
        this.getPlayerMesh();
        this.getPlayerAxes()
    }
     //funkcja zwracająca cały kontener
 
     getPlayerCont () {
         return this.container
     }
 
     //funkcja zwracająca playera czyli sam sześcian
 
     getPlayerMesh () {
         return this.player
     }
     getPlayerAxes()
     {
         return this.axes;
     }
 
 }