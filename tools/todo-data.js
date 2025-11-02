// 待办事项数据存储
// 持久化存储方案：
// 将所有待办事项数据直接存储在这个文件中
// 当数据更改时，通过特殊机制更新此文件

// 待办事项数据数组 - 这是持久化存储的核心
// 所有待办事项将直接保存在这里
let todos = [
        {
            "id": 1762060441977,
            "text": "1221221",
            "completed": false,
            "priority": "medium",
            "createdAt": "2025-11-02T05:14:01.977Z",
            "dueDate": null
        },
        {
            "id": 1762023095274,
            "text": "6666",
            "completed": true,
            "priority": "medium",
            "createdAt": "2025-11-01T18:51:35.274Z",
            "dueDate": null
        },
        {
            "id": 1762023042492,
            "text": "777",
            "completed": false,
            "priority": "medium",
            "createdAt": "2025-11-01T18:50:42.492Z",
            "dueDate": "2025-10-09T00:00:00.000Z"
        },
        {
            "id": 1762023025295,
            "text": "456",
            "completed": false,
            "priority": "medium",
            "createdAt": "2025-11-01T18:50:25.295Z",
            "dueDate": "2025-11-12T00:00:00.000Z"
        },
        {
            "id": 1762022768951,
            "text": "11",
            "completed": false,
            "priority": "medium",
            "createdAt": "2025-11-01T18:46:08.951Z",
            "dueDate": "2025-11-19T00:00:00.000Z"
        },
        {
            "id": 1762022736927,
            "text": "22",
            "completed": false,
            "priority": "medium",
            "createdAt": "2025-11-01T18:45:36.927Z",
            "dueDate": "2025-11-11T00:00:00.000Z"
        },
        {
            "id": 1762022167043,
            "text": "11",
            "completed": false,
            "priority": "medium",
            "createdAt": "2025-11-01T18:36:07.043Z"
        },
        {
            "id": 1762021748629,
            "text": "55",
            "completed": true,
            "priority": "medium",
            "createdAt": "2025-11-01T18:29:08.629Z"
        },
        {
            "id": 1762020130809,
            "text": "2345",
            "completed": true,
            "priority": "medium",
            "createdAt": "2025-11-01T18:02:10.809Z"
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
        return todo;
    }
    return null;
}

/**
 * 删除待办事项
 * @param {number} id 待办事项ID
 * @returns {boolean} 是否删除成功
 */
export function deleteTodo(id) {
    // 先确保todos是扁平化的
    const flatTodos = flattenDeep(todos);
    const index = flatTodos.findIndex(t => t.id === id);
    if (index !== -1) {
        flatTodos.splice(index, 1);
        // 更新原始数组
        todos = flatTodos;
        return true;
    }
    return false;
}

/**
 * 获取待办事项统计信息
 * @returns {Object} 统计信息对象
 */
export function getTodoStats() {
    // 确保数据是扁平化的
    const flatTodos = flattenDeep(todos);
    const now = new Date();
    
    return {
        total: flatTodos.length,
        active: flatTodos.filter(t => !t.completed).length,
        completed: flatTodos.filter(t => t.completed).length,
        overdue: flatTodos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < now).length
    };
}