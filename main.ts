function withErrorHandling() {
  return (proto: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    console.log('calling function', propertyKey);
    console.log('on proto', proto);
    
    descriptor.value = function(...args: any[]) {
      return originalMethod(...args)
        .then(data => {
          console.log('--message', data);
          return data;
        })
        .catch(err => {
          console.log('--not resolved', err);
          throw err;
        });
    };

    return descriptor;
  };
}

class ApiService {
  @withErrorHandling()
  fetchUsers(msg) {
    return Promise.resolve(msg);
  }
}

const api = new ApiService();
api.fetchUsers('hello world');


function LoadingCount() {
  return (proto: any, methodName: string, descriptor: PropertyDescriptor) => {
    console.log('calling function on some method name');
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
