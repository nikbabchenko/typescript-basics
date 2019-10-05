// Complex types Interface and type alias

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
