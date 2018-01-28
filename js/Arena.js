Arena = function (game) {
    var scene = game.scene;

    this._initBoxes(scene);
    this._initFloor(scene);
    this._initGravity(scene);
    this._initLight(scene);
    this._initSkyBox(scene);
};

function random(min, max) {
    return (Math.random() * (max - min) + min);
}

Arena.prototype = {

    _initBoxes: function (scene) {
        this.boxMaterial = new BABYLON.StandardMaterial("bMaterial", scene);
        this.boxMaterial.diffuseTexture = new BABYLON.Texture("images/box.png", scene);

        var cubeSize = 2.5;

        for (var i = 0; i < 15; i++) {
            var box = BABYLON.Mesh.CreateBox("box" + i, cubeSize, scene);
            box.tag = "enemy";
            box.position = new BABYLON.Vector3(random(0, 50), cubeSize / 2, random(0, 50));
            box.material = this.boxMaterial;
            box.checkCollisions = true;
        }
    },

    _initFloor: function (scene) {
        this.ground = BABYLON.Mesh.CreatePlane("ground", 150, scene);
        this.ground.rotation.x = Math.PI / 2;
        this.ground.material = new BABYLON.StandardMaterial("gMaterial", scene);
        this.ground.material.diffuseTexture = new BABYLON.Texture("images/ground.png", scene);
        this.ground.checkCollisions = true;
    },

    _initGravity: function (scene) {
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        scene.collisionsEnabled = true;
    },

    _initLight: function(scene) {
        this.light = new BABYLON.HemisphericLight("DirLight", new BABYLON.Vector3(0, 10, 0), scene);
        this.light.diffuse = new BABYLON.Color3(1, 1, 1);
        this.light.specular = new BABYLON.Color3(0.6, 0.6, 0.6);
        this.light.intensity = 0.5;
    },

    _initSkyBox: function (scene) {
        this.skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", scene);
        this.skyboxMaterial.backFaceCulling = false;
        this.skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/skybox", scene);
        this.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        this.skybox = BABYLON.Mesh.CreateBox("skybox", 250, scene);
        this.skybox.material = this.skyboxMaterial;
    }

};