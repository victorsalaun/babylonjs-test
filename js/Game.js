// Page entièrement chargé, on lance le jeu
document.addEventListener("DOMContentLoaded", function () {
    new Game('renderCanvas');
}, false);


Game = function (canvasId) {
    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);
    var _this = this;

    // On initie la scène avec une fonction associé à l'objet Game
    this.scene = this._initScene(engine);

    var _player = new Player(_this, canvas);
    var _arena = new Arena(_this);

    engine.runRenderLoop(function () {
        _this.scene.render();
    });

    // Ajuste la vue 3D si la fenetre est agrandi ou diminué
    window.addEventListener("resize", function () {
        if (engine) {
            engine.resize();
        }
    }, false);

    window.addEventListener("keyup", function (event) {
        if (event.keyCode === 32) {
            _player.jump();
        }
    });

};

Game.prototype = {
    _initScene: function (engine) {
        return new BABYLON.Scene(engine);
    }
};
