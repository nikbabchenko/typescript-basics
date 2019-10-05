// Type annotations
//  let [identifier] = [value];
//  let [identifier]:[type];
//  let [identifier]:[type] = [value];
// primitive type annotation
var b = 2;
var c;
var d = "Angular is Awesome";
var height = 29.99;
var isActive = true;
"";
// array type annotation
var carManufactures = ['Mercedes', 'BMW', 'Audi', 'Toyota'];
// function annotation
var sayHi;
// implementation
sayHi = function (name) { return "Hello " + name; };
// object annotation
var person;
// implementation
person = {
    name: 'John',
    surname: 'Doe'
};
// Tuple
var x;
x = [10, 20]; // not valid
x = ['10', 20]; // valid
// Enum
var Stages;
(function (Stages) {
    Stages[Stages["Basic"] = 0] = "Basic";
    Stages[Stages["Intermediate"] = 1] = "Intermediate";
    Stages[Stages["Pro"] = 2] = "Pro";
})(Stages || (Stages = {}));
console.log(Stages[0]); // Basic
// Any
var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
