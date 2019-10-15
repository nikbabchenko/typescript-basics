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
  @LoadingCount()
  someMethod() {}
}
