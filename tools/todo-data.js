// 待办事项数据存储
// 持久化存储方案：
// 将所有待办事项数据直接存储在这个文件中
// 当数据更改时，通过特殊机制更新此文件

// 待办事项数据数组 - 这是持久化存储的核心
// 所有待办事项将直接保存在这里
let todos = [
    // 这里会自动保存所有待办事项
];

/**
 * 获取所有待办事项
 * @returns {Array} 待办事项数组
 */
export function getTodos() {
    return todos;
}

/**
 * 设置待办事项数据
 * @param {Array} newTodos 新的待办事项数组
 */
export function setTodos(newTodos) {
    todos = newTodos;
}

/**
 * 添加新的待办事项
 * @param {Object} todo 待办事项对象
 */
export function addTodo(todo) {
    todos.unshift(todo);
}

/**
 * 切换待办事项的完成状态
 * @param {number} id 待办事项ID
 * @returns {Object|null} 更新后的待办事项对象或null
 */
export function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
    }
    return todo;
}

/**
 * 删除待办事项
 * @param {number} id 待办事项ID
 */
export function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
}

/**
 * 清空所有待办事项
 */
export function clearTodos() {
    todos = [];
}

/**
 * 获取待办事项统计信息
 * @returns {Object} 包含总数、进行中和已完成数量的对象
 */
export function getTodoStats() {
    return {
        total: todos.length,
        active: todos.filter(t => !t.completed).length,
        completed: todos.filter(t => t.completed).length
    };
}

/**
 * 生成当前数据的JavaScript代码字符串
 * 用于更新todo-data.js文件中的todos数组
 * @returns {string} 包含完整todos数据的JavaScript代码
 */
export function generateDataCode() {
    const fileHeader = `// 待办事项数据存储
// 持久化存储方案：
// 将所有待办事项数据直接存储在这个文件中
// 当数据更改时，通过特殊机制更新此文件

// 待办事项数据数组 - 这是持久化存储的核心
// 所有待办事项将直接保存在这里
`;
    
    const todosArrayString = `let todos = ${JSON.stringify(todos, null, 2)};`;
    
    // 获取当前文件中从第30行开始的剩余代码（函数定义部分）
    // 注意：在实际浏览器环境中，这部分需要服务器端支持
    // 这里我们只生成数据部分，函数部分会在服务器端合并
    
    return fileHeader + todosArrayString;
}