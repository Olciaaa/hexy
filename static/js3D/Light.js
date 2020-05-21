class Light {
    constructor(){

       let container = new THREE.Object3D() // kontener na obiekty 3D
       
       var light = new THREE.PointLight(0xffff00, 10);
        light.position.set(0, -40, 0);
        var geometry = new THREE.BoxGeometry(6, 6, 6)
        var point = new THREE.Mesh(geometry, Settings.material1);
        point.position.set(0,-40,0);
        light.intensity = 0.5;
        
        container.add(light,point)
       return container;
       //console.log(container)
    }
}