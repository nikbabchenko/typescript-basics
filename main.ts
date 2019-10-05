// Type annotations


//  let [identifier] = [value];
//  let [identifier]:[type];
//  let [identifier]:[type] = [value];

// primitive type annotation
let b = 2;
let c: string;
let d: string = "Angular is Awesome";

const height: number = 29.99;
const isActive: boolean = true;
``
// array type annotation
const carManufactures: string[] = ['Mercedes', 'BMW', 'Audi', 'Toyota'];

// function annotation
let sayHi: (name: string) => string;

// implementation
sayHi = (name) => `Hello ${name}`;

// object annotation
let person: {name: string; surname: string};

// implementation
person = {
    name: 'John',
    surname: 'Doe'
};


// Tuple
let x: [string, number];
x = [10, 20]; // not valid
x = ['10', 20]; // valid
x = [null, null];
x = [undefined, null];

// Enum
enum Stages {
  Basic,
  Intermediate,
  Pro
}

console.log(Stages[0]); // Basic

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// Any array
let list: any[] = [1, true, "free"];

// Void
function warnUser(): void {
  console.log("This is my warning message");
}

// Never
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}
