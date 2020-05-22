var Settings = {

    zmiennaA: 20,
    zmiennaB: 30,
    material1:new THREE.MeshPhongMaterial({
        color: 0x8768ff,
        side: THREE.DoubleSide,
        specular: 0xffffff,
        wireframe: false,
        shininess: 50,
        transparent: false,
        map: new THREE.TextureLoader().load("pictures/ściany.jpg"),
    }),
    material2:new THREE.MeshPhongMaterial({
        color: 0x8768ff,
        side: THREE.DoubleSide,
        specular: 0xffffff,
        wireframe: false,
        shininess: 50,
        transparent: false
    }),

    radius: 60
}