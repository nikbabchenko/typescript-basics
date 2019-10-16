
function AutomaticTransmittion(constr: Function) {
  constr.prototype.automatic = true;
}


@AutomaticTransmittion
class Car {
}

const bmw = new Car();

console.log(bmw['automatic']);