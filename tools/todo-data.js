// 待办事项数据存储
// 持久化存储方案：
// 将所有待办事项数据直接存储在这个文件中
// 当数据更改时，通过特殊机制更新此文件

// 待办事项数据数组 - 这是持久化存储的核心
// 所有待办事项将直接保存在这里
let todos = [
        {
            "id": 1762020130809,
            "text": "2345",
            "completed": true,
            "priority": "medium",
            "createdAt": "2025-11-01T18:02:10.809Z"
        },
        {
            "id": 1762019879701,
            "text": "11111",
            "completed": false,
            "priority": "medium",
            "createdAt": "2025-11-01T17:57:59.701Z"
        },
        {
            "id": 1762018518469,
            "text": "示例待办事项 1",
            "completed": false,
            "priority": "medium",
            "createdAt": "2025-11-01T17:35:18.469Z"
        },
        {
            "id": 1762017518469,
            "text": "示例待办事项 2",
            "completed": true,
            "priority": "high",
            "createdAt": "2025-11-01T17:18:38.469Z"
        }
];

/**
 * 扁平化嵌套数组，确保数据结构正确
 * @param {Array} arr 需要扁平化的数组
 * @returns {Array} 扁平化后的数组
 */
function flattenDeep(arr) {
    return Array.isArray(arr) 
        ? arr.reduce((acc, val) => acc.concat(flattenDeep(val)), [])
        : [arr];
}

/**
 * 获取所有待办事项
 * @returns {Array} 待办事项数组
 */
export function getTodos() {
    // 确保返回的是扁平化的数组结构
    return flattenDeep(todos);
}

/**
 * 设置待办事项数据
 * @param {Array} newTodos 新的待办事项数组
 */
export function setTodos(newTodos) {
    // 存储前先扁平化数组，避免嵌套结构
    todos = Array.isArray(newTodos) ? flattenDeep(newTodos) : [];
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
    // 先确保todos是扁平化的
    const flatTodos = flattenDeep(todos);
    const todo = flatTodos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        // 更新原始数组
        todos = flatTodos;
    }
    return todo;
}

/**
 * 删除待办事项
 * @param {number} id 待办事项ID
 */
export function deleteTodo(id) {
    // 先确保todos是扁平化的，然后再过滤
    const flatTodos = flattenDeep(todos);
    todos = flatTodos.filter(t => t.id !== id);
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
    // 使用扁平化后的数组计算统计信息
    const flatTodos = flattenDeep(todos);
    return {
        total: flatTodos.length,
        active: flatTodos.filter(t => !t.completed).length,
        completed: flatTodos.filter(t => t.completed).length
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