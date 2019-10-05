// Generics
function makeRequest(url) {
    return fetch(url).then(function (resp) { return resp.json(); });
}
var fetchTodo = function (id) { return makeRequest("https://jsonplaceholder.typicode.com/todos/" + id); };
fetchTodo(1).then(function (todo) {
    console.log('--fetched TODO', todo);
});
