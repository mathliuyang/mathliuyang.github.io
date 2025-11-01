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

// 中间件配置
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON请求体

// 获取todo-data.js的完整路径
const todoDataPath = path.join(__dirname, 'todo-data.js');

// 保存数据的API端点
app.post('/api/save-todos', (req, res) => {
    try {
        const newTodos = req.body.todos;
        
        if (!Array.isArray(newTodos)) {
            return res.status(400).json({ error: '无效的待办事项数据格式' });
        }
        
        // 读取当前的todo-data.js文件内容
        const currentContent = fs.readFileSync(todoDataPath, 'utf8');
        
        // 提取文件头部（注释部分）和函数定义部分
        // 找到todos数组定义的起始和结束位置
        const arrayStartRegex = /let todos = \[/;
        const arrayEndRegex = /];/;
        
        const startMatch = currentContent.match(arrayStartRegex);
        const endMatch = currentContent.match(arrayEndRegex);
        
        if (!startMatch || !endMatch) {
            throw new Error('无法在todo-data.js中找到todos数组定义');
        }
        
        // 保留文件头部注释和函数定义部分
        const fileHeader = currentContent.substring(0, startMatch.index);
        const functionDefinitions = currentContent.substring(endMatch.index + 2);
        
        // 创建新的文件内容
        const newTodosString = JSON.stringify(newTodos, null, 2);
        const newContent = `${fileHeader}let todos = ${newTodosString};
${functionDefinitions}`;
        
        // 写入文件
        fs.writeFileSync(todoDataPath, newContent, 'utf8');
        
        console.log(`[${new Date().toLocaleTimeString()}] 待办事项数据已保存到文件`);
        
        res.json({
            success: true,
            message: '待办事项数据已成功保存到文件',
            savedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error(`[${new Date().toLocaleTimeString()}] 保存数据失败: ${error.message}`);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`待办事项持久化服务器已启动，监听端口 ${PORT}`);
    console.log(`保存API: POST http://localhost:${PORT}/api/save-todos`);
    console.log(`请保持此服务器运行，以便自动保存待办事项数据`);
});