// Generics
function makeRequest<T>(url: string):Promise<T> {
    return fetch(url).then(resp => resp.json());
}

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

class Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    constructor(userId: Todo) {
        Object.assign(this, userId);
    }
}

const fetchTodo = (id: number) => makeRequest<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`);

fetchTodo(1).then(todo => {
    console.log('--fetched TODO', new Todo(todo));
})