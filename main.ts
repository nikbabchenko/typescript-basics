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