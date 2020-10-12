var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function withErrorHandling() {
    return (proto, _methodName, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
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
    fetchUsers(msg) {
        return Promise.resolve(msg);
    }
}
__decorate([
    withErrorHandling()
], ApiService.prototype, "fetchUsers", null);
const api = new ApiService();
api.fetchUsers('hello world');
function LoadingCount() {
    return (proto, _methodName, descriptor) => {
        // safety check if Class doesn't have loadingCount prop
        if (!proto.loadingCount) {
            proto.loadingCount = 0;
        }
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
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
    someMethod() { }
}
__decorate([
    LoadingCount()
], Service.prototype, "someMethod", null);
