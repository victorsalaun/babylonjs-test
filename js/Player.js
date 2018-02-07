Player = function (game, canvas) {
    this.scene = game.scene;

    this.isJumping = false;

    this._initCamera(this.scene, canvas);
    this._initPointerLock(this.scene, canvas);
    this._initWeapon(this.scene);
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
        var pointerLockChange = function (event) {
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
        document.addEventListener("pointerlockchange", pointerLockChange, false);
        document.addEventListener("mspointerlockchange", pointerLockChange, false);
        document.addEventListener("mozpointerlockchange", pointerLockChange, false);
        document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
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
    },

    jump: function (scene) {
        var _this = this;
        if (!_this.isJumping) {
            this.isJumping = false;
            _this.isJumping = false;

            this.camera.animations = [];
            var animation = new BABYLON.Animation(
                "a",
                "position.y", 20,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

            // Animation keys
            var keys = [];
            keys.push({frame: 0, value: this.camera.position.y});
            keys.push({frame: 10, value: this.camera.position.y + 15});
            keys.push({frame: 20, value: this.camera.position.y});
            animation.setKeys(keys);

            var easingFunction = new BABYLON.CircleEase();
            easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
            animation.setEasingFunction(easingFunction);

            this.camera.animations.push(animation);

            var animationEnd = function () {
                _this.isJumping = false;
            };

            scene.beginAnimation(this.camera, 0, 20, false, 1, animationEnd);

            _this.isJumping = true;
        }
    }
};
