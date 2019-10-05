class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");

// Inheritance Car --> Electric Car
class Car {
    move(distanceInMeters: 0) {
        console.log('--moving', distanceInMeters);
    }
}

class ElectricCar extends Car {
    charge(place: string) {
        console.log('--going to charge in', place);
    }
}

const tesla = new ElectricCar();
tesla.charge('New York');

// Public, private, and protected modifiers

// Abstract Classes , Page for example