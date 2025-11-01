#!/usr/bin/env node

/**
 * 待办事项数据文件更新脚本
 * 用于更新todo-data.js文件中的数据部分
 * 注意：在浏览器环境中不能直接写入文件系统，需要通过Node.js服务器来实现
 */

const fs = require('fs');
const path = require('path');

// 获取命令行参数中的数据
const dataArg = process.argv[2];
const todoDataPath = path.join(__dirname, 'todo-data.js');

if (!dataArg) {
    console.error('错误：没有提供数据参数');
    process.exit(1);
}

try {
    // 解析传入的数据
    const newTodosData = JSON.parse(decodeURIComponent(dataArg));
    
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
    const newTodosString = JSON.stringify(newTodosData, null, 2);
    const newContent = `${fileHeader}let todos = ${newTodosString};
${functionDefinitions}`;
    
    // 写入文件
    fs.writeFileSync(todoDataPath, newContent, 'utf8');
    console.log('Todo数据文件已成功更新');
} catch (error) {
    console.error(`更新todo-data.js失败: ${error.message}`);
    process.exit(1);
}