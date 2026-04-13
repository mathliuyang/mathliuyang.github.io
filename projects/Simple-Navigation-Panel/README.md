# Simple Navigation Panel

个性化浏览器导航插件，提供美观的界面和流畅的用户体验。

## 🌟 功能特性

- **个性化导航**：支持自定义网站分类和快速访问
- **美观界面**：现代化的UI设计，支持深色/浅色主题
- **流畅体验**：平滑的动画效果和交互反馈
- **Chrome扩展**：可作为Chrome浏览器扩展程序使用
- **响应式设计**：适配不同屏幕尺寸

## 🚀 快速开始

### 作为网页使用

1. 直接打开 `index.html` 文件
2. 开始自定义您的导航面板

### 作为Chrome扩展使用

1. 打开Chrome浏览器，进入 `chrome://extensions/`
2. 开启"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `Simple-Navigation-Panel` 文件夹
5. 扩展安装完成，可以在浏览器工具栏看到图标

## 🛠️ 技术栈

- **HTML5**：语义化标签结构
- **CSS3**：现代样式和动画效果
- **JavaScript**：交互逻辑和动态功能
- **Chrome Extension API**：浏览器扩展功能

## 📁 项目结构

```
Simple-Navigation-Panel/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── app.js             # 主要JavaScript逻辑
├── manifest.json      # Chrome扩展配置文件
├── particles.js       # 粒子动画效果
├── particles.css      # 粒子动画样式
└── icons/             # 图标资源
    ├── icon16.png     # 16x16图标
    ├── icon48.png     # 48x48图标
    └── icon128.png    # 128x128图标
```

## 🎯 主要功能

### 网站管理
- 添加/删除网站链接
- 自定义网站图标和标题
- 分类管理（工作、学习、娱乐等）

### 主题定制
- 支持深色和浅色主题切换
- 自定义背景颜色和渐变
- 粒子动画效果开关

### 搜索功能
- 集成搜索引擎快速搜索
- 支持自定义搜索引擎
- 搜索历史记录

## 🔧 配置说明

### manifest.json 配置
```json
{
  "manifest_version": 3,
  "name": "Simple Navigation Panel",
  "version": "1.0.0",
  "description": "个性化浏览器导航插件",
  "permissions": ["storage"],
  "action": {
    "default_popup": "index.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  }
}
```

## 🎨 自定义开发

### 添加新网站分类
在 `app.js` 中修改分类配置：
```javascript
const categories = [
  { id: 'work', name: '工作', icon: '💼' },
  { id: 'study', name: '学习', icon: '📚' },
  { id: 'entertainment', name: '娱乐', icon: '🎮' },
  // 添加您的分类
];
```

### 修改主题颜色
在 `styles.css` 中自定义CSS变量：
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --background-color: #ffffff;
  --text-color: #1f2937;
}
```

## 📱 浏览器兼容性

- Chrome/Chromium (推荐)
- Edge
- Firefox (部分功能)
- Safari (部分功能)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

### 开发步骤
1. Fork 这个项目
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 感谢所有开源项目的贡献者
- 灵感来源于各种现代化的浏览器新标签页扩展
- 粒子动画效果基于 Canvas 技术实现

---

⭐ 如果这个项目对您有帮助，请给它一个星标！

**作者**: 图灵的猫  
**更新日期**: 2024年