class Hex3D {
    constructor(doors1, doors2){
        //console.log(Settings);
        //console.log(doors1, doors2)
        doors = new Doors3D()

       //var radius = 100 // zmienna wielkość hexagona, a tym samym całego labiryntu

       let container = new THREE.Object3D() // kontener na obiekty 3D
        var geometry = new THREE.BoxGeometry(Settings.radius, 50, 7)
       var wall = new THREE.Mesh(geometry, Settings.material1); // prostopadłościan - ściana hex-a

       for (var i = 0; i < 6; i++) {
           if(i == doors1 || i== doors2)
           {
                var side = doors.clone();
           }
           else
           {
                var side = wall.clone()   
           }
                    // klon ściany
           side.position.x = Math.sin(i * Math.PI / 3) * Settings.radius * Math.sqrt(3)/2;//* Math.PI;              // punkt na okręgu, do obliczenia
           side.position.z = Math.cos(i * Math.PI / 3) * Settings.radius * Math.sqrt(3)/2;//* Math.PI//i*40;          // punkt na okręgu, do obliczenia      
           side.lookAt(container.position)    // nakierowanie ściany na środek kontenera 3D  
           container.add(side)                // dodanie ściany do kontenera
           //console.log(container)
       }
       return container;
       //console.log(container)
    }
}