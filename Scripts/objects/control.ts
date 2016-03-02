/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        public rotationSpeed1:number;
        public rotationSpeed2:number;
        public rotationSpeed3:number;
        public rotationSpeed4:number;
        public rotationSpeed5:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number) {
           this.rotationSpeed1 = rotationSpeed;
           this.rotationSpeed2 = rotationSpeed;
           this.rotationSpeed3 = rotationSpeed;
           this.rotationSpeed4 = rotationSpeed;
           this.rotationSpeed5 = rotationSpeed;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}
