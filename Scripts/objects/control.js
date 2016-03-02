/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed) {
            this.rotationSpeed1 = rotationSpeed;
            this.rotationSpeed2 = rotationSpeed;
            this.rotationSpeed3 = rotationSpeed;
            this.rotationSpeed4 = rotationSpeed;
            this.rotationSpeed5 = rotationSpeed;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map