class Hex3D {
    constructor(doors1, doors2){
        console.log(Settings);

       var radius = 100 // zmienna wielkość hexagona, a tym samym całego labiryntu

       let container = new THREE.Object3D() // kontener na obiekty 3D

       var wall = new THREE.Mesh(Settings.geometry1, Settings.material1); // prostopadłościan - ściana hex-a
  
       for (var i = 0; i < 6; i++) {
           var side = wall.clone()            // klon ściany
           side.position.x = Math.sin(i) * 50 //* Math.PI;              // punkt na okręgu, do obliczenia
           side.position.z = Math.cos(i) * 50 //* Math.PI//i*40;          // punkt na okręgu, do obliczenia      
           side.lookAt(container.position)    // nakierowanie ściany na środek kontenera 3D  
           container.add(side)                // dodanie ściany do kontenera
           console.log(container)
       }
       return container;
       console.log(container)
       //this.container = container;
    }
}