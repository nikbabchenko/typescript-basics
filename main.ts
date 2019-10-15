/**
 * Class method decorator LoadingCount
 * 1. Adds loadingCount property to Class
 * 2. Decorates  Method with returns any promise and adds counter at starting call,
 * and decreases loadingCount value if promise failed/fullfilled
 *
 */
function LoadingCount() {
  return (proto: any, _methodName: string, descriptor: PropertyDescriptor) => {
    // safety check if Class doesn't have loadingCount prop
    if (!proto.loadingCount) {
      proto.loadingCount = 0;
    }

    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      proto.loadingCount++;
      return originalMethod
        .apply(this, args)
        .then(data => {
          proto.loadingCount--;
          return data;
        })
        .catch(err => {
          proto.loadingCount--;
          throw err;
        });
    };

    return descriptor;
  };
}


class Service {
    // target === Service.prototype
    // propertyName === "someMethod"
    // propertyDesciptor === Object.getOwnPropertyDescriptor(Service.prototype, "someMethod")
  @LoadingCount()
  someMethod() {}
}
