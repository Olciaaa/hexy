class Light {
    constructor(){

       let container = new THREE.Object3D() // kontener na obiekty 3D
       
       var light = new THREE.PointLight(0xF3ECDB, 10);
        light.position.set(0, 50, 0);
        var geometry = new THREE.BoxGeometry(6, 6, 6)
        var point = new THREE.Mesh(geometry, Settings.material2);
        point.position.set(0,40,0);
        light.intensity = 1;
        
        container.add(light,point)
       return container;
       //console.log(container)
    }
}