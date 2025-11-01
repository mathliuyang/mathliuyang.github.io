#!/usr/bin/env node

/**
 * 待办事项数据持久化服务器
 * 提供API接口用于将待办事项数据保存到todo-data.js文件中
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// 创建Express应用
const app = express();
const PORT = 3000;

// 增强的中间件配置
app.use(cors({
    origin: '*', // 允许所有来源的请求
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); 

// 添加请求日志中间件
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json({ limit: '1mb' })); // 解析JSON请求体，设置较大的限制

// 获取todo-data.js的完整路径
const todoDataPath = path.join(__dirname, 'todo-data.js');

// 保存数据的API端点
app.post('/api/save-todos', (req, res) => {
    try {
        // 获取待办事项数据
        let todos = req.body.todos;
        
        console.log('收到保存请求，原始数据类型:', typeof todos);
        console.log('原始数据结构检查:', Array.isArray(todos) ? '是数组' : '非数组');
        
        // 确保是数组
        if (!Array.isArray(todos)) {
            todos = [];
            console.log('⚠️  修复非数组数据为[]');
        }
        
        // 使用递归函数彻底扁平化数组
        function flattenDeep(arr) {
            return Array.isArray(arr) 
                ? arr.reduce((acc, val) => acc.concat(flattenDeep(val)), [])
                : [arr];
        }
        
        // 过滤出有效的待办事项对象（只保留包含id和text的对象）
        const flatTodos = flattenDeep(todos).filter(item => 
            typeof item === 'object' && 
            item !== null && 
            'id' in item && 
            'text' in item
        );
        
        console.log('✅ 数据扁平化处理完成');
        console.log('处理后待办事项数量:', flatTodos.length);
        
        // 读取现有的todo-data.js文件内容
        let fileContent = fs.readFileSync(todoDataPath, 'utf8');
        
        // 使用更简单可靠的方法更新文件内容
        // 1. 先将文件内容按行分割
        const lines = fileContent.split('\n');
        
        // 2. 查找todos数组定义的开始和结束位置
        let startIndex = -1;
        let endIndex = -1;
        let braceCount = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // 找到数组定义的开始行
            if (startIndex === -1 && line.trim().startsWith('let todos = [')) {
                startIndex = i;
                // 检查这一行是否包含完整的数组
                if (line.includes('];')) {
                    endIndex = i;
                    break;
                }
                // 计算当前行的大括号数量
                braceCount += (line.match(/\[/g) || []).length;
                braceCount -= (line.match(/\]/g) || []).length;
            } 
            // 找到数组定义的结束行
            else if (startIndex !== -1) {
                braceCount += (line.match(/\[/g) || []).length;
                braceCount -= (line.match(/\]/g) || []).length;
                
                // 当大括号匹配且找到结束标记时
                if (braceCount === 0 && line.includes('];')) {
                    endIndex = i;
                    break;
                }
            }
        }
        
        // 3. 准备新的todos数组内容
        const todosStr = JSON.stringify(flatTodos, null, 4);
        const newTodosLines = [`let todos = [`, ...todosStr.split('\n').slice(1, -1).map(line => '    ' + line), `];`];
        
        // 4. 替换数组定义部分
        let updatedLines;
        if (startIndex !== -1 && endIndex !== -1) {
            updatedLines = [
                ...lines.slice(0, startIndex),
                ...newTodosLines,
                ...lines.slice(endIndex + 1)
            ];
        } else {
            // 如果找不到现有的数组定义，添加到文件开头
            updatedLines = [...newTodosLines, '', ...lines];
        }
        
        // 5. 重新组合文件内容
        const updatedContent = updatedLines.join('\n');
        
        // 写入更新后的内容
        fs.writeFileSync(todoDataPath, updatedContent, 'utf8');
        
        console.log(`✓ 待办事项保存成功 ${new Date().toLocaleString()}`);
        console.log(`✓ 总待办事项数: ${flatTodos.length}`);
        console.log(`✓ 数据已彻底扁平化，确保正确存储为一维数组`);
        console.log(`✓ 保存的数据格式: 一维数组`);
        console.log(`✓ 数组定义行范围: 从第${startIndex + 1}行到第${endIndex + 1}行`);
        
        res.status(200).json({
            success: true,
            message: 'Todos saved successfully',
            timestamp: new Date().toISOString(),
            count: flatTodos.length,
            flattened: true
        });
    } catch (error) {
        console.error('❌ 保存待办事项失败:', error.message);
        console.error('错误详情:', error.stack);
        res.status(500).json({
            success: false,
            message: `Failed to save todos: ${error.message}`
        });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`待办事项持久化服务器已启动，监听端口 ${PORT}`);
    console.log(`保存API: POST http://localhost:${PORT}/api/save-todos`);
    console.log(`请保持此服务器运行，以便自动保存待办事项数据`);
});