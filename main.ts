// Complex types Interface and type alias

// Duck checking
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

// Types vs Interfaces

interface ICar {
  model: string;
  brand: string;
}

interface MuscleCar extends ICar {
  horsePowers: number;
}

type CarType = {
  model: string;
  brand: string;
};

class Car implements ICar {
  constructor(public model: string, public brand: string) {}
}

// Optional Parameters
interface SquareConfig {
  color?: string;
  width?: number;
}

type Square = {
  color: string;
  area: number;
};

function createSquare(config: SquareConfig): Square {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
      newSquare.color = config.color;
  }
  if (config.width) {
      newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});


// Read Only
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!