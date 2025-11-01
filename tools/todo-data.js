// 待办事项数据存储
// 持久化存储方案：
// 1. 默认数据数组作为基础
// 2. 结合localStorage实现浏览器内持久化
// 3. 提供导出/导入功能手动保存到文件

// 默认待办事项数据 - 这部分会在文件中持久保存
const defaultTodos = [
    // 这里可以保留一些默认的待办事项
    // { id: 1, text: "示例待办事项", completed: false, priority: "medium", createdAt: "2024-01-01T00:00:00.000Z" }
];

// 初始化todos数组
// 优先从localStorage读取，如果没有则使用默认数据
let todos = JSON.parse(localStorage.getItem('todos')) || [...defaultTodos];

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
    saveTodos(); // 保存到localStorage
}

/**
 * 保存待办事项到localStorage
 */
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * 添加新的待办事项
 * @param {Object} todo 待办事项对象
 */
export function addTodo(todo) {
    todos.unshift(todo);
    saveTodos(); // 保存到localStorage
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
        saveTodos(); // 保存到localStorage
    }
    return todo;
}

/**
 * 删除待办事项
 * @param {number} id 待办事项ID
 */
export function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos(); // 保存到localStorage
}

/**
 * 清空所有待办事项
 */
export function clearTodos() {
    todos = [];
    saveTodos(); // 保存到localStorage
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
 * 导出待办事项数据为JSON文件
 */
export function exportTodos() {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileName = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
}

/**
 * 从JSON文件导入待办事项数据
 * @param {File} file 用户选择的JSON文件
 * @returns {Promise<Array>} 导入的待办事项数组
 */
export function importTodos(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const importedTodos = JSON.parse(event.target.result);
                
                // 验证导入数据的格式
                if (!Array.isArray(importedTodos)) {
                    throw new Error('导入的数据格式不正确');
                }
                
                // 为导入的每个待办事项生成新的ID，避免冲突
                const todosWithNewIds = importedTodos.map(todo => ({
                    ...todo,
                    id: Date.now() + Math.random()
                }));
                
                todos = [...todosWithNewIds];
                saveTodos(); // 保存到localStorage
                resolve(todos);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => {
            reject(new Error('文件读取失败'));
        };
        
        reader.readAsText(file);
    });
}