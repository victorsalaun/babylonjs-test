Player = function (game, canvas) {
    this.scene = game.scene;

    this._initCamera(this.scene, canvas);
    this._initPointerLock(this.scene, canvas);
    this._initWeapon(this.scene)
};

Player.prototype = {
    _initCamera: function (scene, canvas) {
        this.camera = new BABYLON.FreeCamera("MainCamera", new BABYLON.Vector3(0, 2.5, 5), scene);
        this.camera.applyGravity = true;
        this.camera.checkCollisions = true;

        this.camera.speed = 0.5;
        this.camera.angularSensibility = 3000;

        this.camera.keysUp = [38, 90]; // Touche Z
        this.camera.keysDown = [40, 83]; // Touche S
        this.camera.keysLeft = [37, 81]; // Touche Q
        this.camera.keysRight = [39, 68]; // Touche D;
        scene.activeCamera.attachControl(canvas);
    },

    _initPointerLock: function (scene, canvas) {
        var _this = this;
        // On click event, request pointer lock
        canvas.addEventListener("click", function (evt) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }, false);

        // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
        var pointerlockchange = function (event) {
            _this.controlEnabled = (
                document.mozPointerLockElement === canvas
                || document.webkitPointerLockElement === canvas
                || document.msPointerLockElement === canvas
                || document.pointerLockElement === canvas);
            // If the user is alreday locked
            if (!_this.controlEnabled) {
                _this.camera.detachControl(canvas);
            } else {
                _this.camera.attachControl(canvas);
            }
        };

        // Attach events to the document
        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    },

    _initWeapon: function (scene) {
        this.weapon = BABYLON.Mesh.CreateBox("weapon", 1, scene);
        this.weapon.scaling = new BABYLON.Vector3(0.2, 0.2, 0.5);
        this.weapon.material = new BABYLON.StandardMaterial("wMaterial", scene);
        this.weapon.material.diffuseTexture = new BABYLON.Texture("images/weapon.png", scene);
        this.weapon.position.x = 0.4;
        this.weapon.position.y = -0.3; //-0.1;
        this.weapon.position.z = 1; //0.4;
        this.weapon.parent = scene.activeCamera;
    }
};
