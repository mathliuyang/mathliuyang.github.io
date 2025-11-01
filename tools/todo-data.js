// 待办事项数据存储
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

// 导出函数供todo-list.html使用
export function getTodos() {
    return todos;
}

export function setTodos(newTodos) {
    todos = newTodos;
    saveTodos();
}

export function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function addTodo(todo) {
    todos.unshift(todo);
    saveTodos();
}

export function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
    }
    return todo;
}

export function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
}

export function getTodoStats() {
    return {
        total: todos.length,
        active: todos.filter(t => !t.completed).length,
        completed: todos.filter(t => t.completed).length
    };
}