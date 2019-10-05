import {StandardMap} from './map';

const map = new StandardMap();
map.init();

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

interface FakePerson {
    firstName: string;
    lastName: string;
}


class FakeStudent implements FakePerson {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

const john = new FakeStudent("John", "Mr.", "Doe");
const ivan = new Student("Ivan", "Mr.", "Doe");

document.body.innerText = greeter(<FakePerson>john);

