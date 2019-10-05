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

const fetchTodo = (id: number) => makeRequest<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`);

fetchTodo(1).then(todo => {
    console.log('--fetched TODO', todo);
})