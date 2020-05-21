class Doors3D{
    constructor() {
        //console.log("doors3d");
        let containerr = new THREE.Object3D()
        var geometry = new THREE.BoxGeometry(Settings.radius/4, 100, 7)
        var wall = new THREE.Mesh(geometry, Settings.material1);

        for (var i = 0; i < 2; i++) {
            var side = wall.clone()            // klon ściany
            side.position.x = i * Settings.radius * 2/3 - Settings.radius * 1/3//* Math.PI;              // punkt na okręgu, do obliczenia
            //side.position.z = i* Settings.radius/4;//* Math.PI//i*40;          // punkt na okręgu, do obliczenia      
            //side.lookAt(container.position)    // nakierowanie ściany na środek kontenera 3D  
            containerr.add(side)                // dodanie ściany do kontenera
            //console.log(containerr)
        }
        return containerr;
    }
}