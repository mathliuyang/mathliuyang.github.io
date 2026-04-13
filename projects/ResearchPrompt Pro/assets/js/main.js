/**
 * Research Prompt Pro - 主要JavaScript文件
 * 现代化的交互功能和用户体验
 */

class ResearchPromptPro {
    constructor() {
        this.currentPrompt = null;
        this.isGenerating = false;
        this.theme = localStorage.getItem('theme') || 'light';
        this.isFullscreen = false;
        this.notifications = [];

        this.init();
    }

    init() {
        console.log('ResearchPromptPro初始化开始...'); // 调试信息

        this.initTheme();
        this.initEventListeners();
        this.initAnimations();
        this.initParticles();
        this.loadPromptTemplates();
        this.initKeyboardShortcuts();
        this.initTooltips();
        this.showWelcomeMessage();

        console.log('ResearchPromptPro初始化完成'); // 调试信息

        // 初始化收藏标识
        this.updatePromptListFavorites();
    }

    // ===== 主题系统 =====
    initTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.innerHTML = this.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';

        // 添加切换动画
        document.body.classList.add('theme-switching');

        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);

        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            // 添加按钮动画
            themeBtn.style.transform = 'scale(0.8) rotate(180deg)';

            setTimeout(() => {
                themeBtn.innerHTML = this.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                themeBtn.style.transform = 'scale(1) rotate(0deg)';
            }, 150);
        }

        // 移除切换动画类
        setTimeout(() => {
            document.body.classList.remove('theme-switching');
        }, 300);

        // 更新收藏标识（主题切换后可能需要重新渲染）
        setTimeout(() => {
            this.updatePromptListFavorites();
        }, 400);

        this.showNotification(
            '主题已切换',
            `已切换到${this.theme === 'dark' ? '深色' : '浅色'}模式`,
            'success'
        );
    }

    // ===== 全屏功能 =====
    toggleFullscreen() {
        const fullscreenBtn = document.getElementById('fullscreen-toggle');

        if (!this.isFullscreen) {
            // 进入全屏
            const requestFullscreen = document.documentElement.requestFullscreen ||
                document.documentElement.webkitRequestFullscreen ||
                document.documentElement.msRequestFullscreen;

            if (requestFullscreen) {
                requestFullscreen.call(document.documentElement);

                // 添加按钮动画
                if (fullscreenBtn) {
                    fullscreenBtn.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                        fullscreenBtn.style.transform = 'scale(1)';
                    }, 150);
                }

                this.showNotification('全屏模式', '已进入全屏模式，按 ESC 退出', 'info');
            } else {
                this.showNotification('不支持全屏', '您的浏览器不支持全屏功能', 'warning');
            }
        } else {
            // 退出全屏
            const exitFullscreen = document.exitFullscreen ||
                document.webkitExitFullscreen ||
                document.msExitFullscreen;

            if (exitFullscreen) {
                exitFullscreen.call(document);

                // 更新按钮状态
                if (fullscreenBtn) {
                    fullscreenBtn.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                        fullscreenBtn.style.transform = 'scale(1)';
                    }, 150);
                }

                this.showNotification('退出全屏', '已退出全屏模式', 'info');
            }
        }
    }

    // 处理全屏状态变化
    handleFullscreenChange() {
        // 检测是否处于全屏状态
        const isFullscreen = document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement;

        this.isFullscreen = !!isFullscreen;

        // 更新按钮显示状态
        const fullscreenBtn = document.getElementById('fullscreen-toggle');
        if (fullscreenBtn) {
            fullscreenBtn.innerHTML = this.isFullscreen ?
                '<i class="fas fa-compress"></i>' :
                '<i class="fas fa-expand"></i>';
        }
    }

    // ===== 初始化事件监听器 =====
    initEventListeners() {
        // 主题切换
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.addButtonClickEffect(themeToggle);
                this.toggleTheme();
            });
        }

        // 全屏切换
        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        if (fullscreenToggle) {
            fullscreenToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.addButtonClickEffect(fullscreenToggle);
                this.toggleFullscreen();
            });
        }

        // 帮助模态框
        const helpToggle = document.getElementById('help-toggle');
        const helpModal = document.getElementById('help-modal');
        const helpClose = document.querySelector('#help-modal .modal-close');

        if (helpToggle && helpModal) {
            helpToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.addButtonClickEffect(helpToggle);
                this.showModal('help-modal');
            });
        }

        if (helpClose) {
            helpClose.addEventListener('click', () => this.hideModal('help-modal'));
        }

        // 点击模态框背景关闭
        if (helpModal) {
            helpModal.addEventListener('click', (e) => {
                if (e.target === helpModal) {
                    this.hideModal('help-modal');
                }
            });
        }

        // 搜索功能增强
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.addInputFocusEffect(searchInput);
                this.searchPrompts(e.target.value);
            });

            searchInput.addEventListener('focus', () => {
                this.addInputFocusEffect(searchInput);
            });
        }

        // 收藏夹按钮
        const favoritesBtn = document.getElementById('favorites-btn');
        if (favoritesBtn) {
            favoritesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addButtonClickEffect(favoritesBtn);
                this.toggleFavoritesView(); // 使用新的切换方法
            });
        }

        // 生成按钮 - 使用事件委托处理动态生成的按钮
        document.addEventListener('click', (e) => {
            if (e.target.id === 'generate-prompt-btn' || e.target.closest('#generate-prompt-btn')) {
                e.preventDefault();
                const generateBtn = e.target.id === 'generate-prompt-btn' ? e.target : e.target.closest('#generate-prompt-btn');
                this.addButtonClickEffect(generateBtn);
                console.log('generate-prompt-btn被点击'); // 调试信息
                this.generatePrompt();
            }
        });

        // 检查初始时是否存在生成按钮
        const generateBtn = document.getElementById('generate-prompt-btn');
        console.log('初始查找generate-prompt-btn:', generateBtn); // 调试信息
        if (generateBtn) {
            console.log('找到初始generate-prompt-btn元素'); // 调试信息
        } else {
            console.log('初始未找到generate-prompt-btn元素，将使用事件委托'); // 调试信息
        }

        // 重置按钮 - 使用事件委托处理动态生成的按钮
        document.addEventListener('click', (e) => {
            if (e.target.id === 'reset-form-btn' || e.target.closest('#reset-form-btn')) {
                e.preventDefault();
                const resetBtn = e.target.id === 'reset-form-btn' ? e.target : e.target.closest('#reset-form-btn');
                this.addButtonClickEffect(resetBtn);
                this.resetForm();
            }
        });

        // 事件委托已经处理了按钮点击，这里不再重复绑定

        // 复制按钮 - 使用事件委托处理动态生成的按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn') || e.target.closest('.copy-btn')) {
                e.preventDefault();
                const copyBtn = e.target.classList.contains('copy-btn') ? e.target : e.target.closest('.copy-btn');
                this.addButtonClickEffect(copyBtn);
                this.copyCurrentResult();
            }
        });

        // 下载按钮 - 使用事件委托处理动态生成的按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('download-btn') || e.target.closest('.download-btn')) {
                e.preventDefault();
                const downloadBtn = e.target.classList.contains('download-btn') ? e.target : e.target.closest('.download-btn');
                this.addButtonClickEffect(downloadBtn);
                this.downloadCurrentResult();
            }
        });

        // 快速操作按钮
        document.querySelectorAll('.quick-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addButtonClickEffect(btn);
                const action = btn.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // 全屏状态监听
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
        // 全屏状态变化
        document.addEventListener('msfullscreenchange', () => this.handleFullscreenChange());

        // 滚动动画
        window.addEventListener('scroll', () => this.handleScrollAnimations());

        // 窗口大小变化
        window.addEventListener('resize', () => this.handleResize());

        // 鼠标移动粒子效果
        document.addEventListener('mousemove', (e) => this.createMouseParticle(e));
    }

    // ===== 新增交互效果方法 =====

    // 按钮点击效果
    addButtonClickEffect(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    // 输入框焦点效果
    addInputFocusEffect(input) {
        input.parentElement.classList.add('focused');
        setTimeout(() => {
            input.parentElement.classList.remove('focused');
        }, 300);
    }

    // 鼠标粒子效果
    createMouseParticle(e) {
        if (Math.random() > 0.7) { // 30% 概率创建粒子
            const particle = document.createElement('div');
            particle.className = 'mouse-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: mouseParticle 1s ease-out forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // 滚动动画处理
    handleScrollAnimations() {
        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                element.classList.add('animate');
            }
        });
    }

    // 窗口大小变化处理
    handleResize() {
        // 重新计算粒子位置
        this.updateParticles();

        // 更新响应式布局
        this.updateResponsiveLayout();
    }

    // 更新响应式布局
    updateResponsiveLayout() {
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile-layout', isMobile);

        if (isMobile) {
            this.showNotification('移动端模式', '已切换到移动端优化布局', 'info');
        }
    }

    // ===== 动画系统 =====
    initAnimations() {
        // 观察器用于滚动动画
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察所有需要动画的元素
        document.querySelectorAll('.feature-card, .stat-item, .category').forEach(el => {
            this.observer.observe(el);
        });

        // 统计数字动画
        this.animateStats();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    // ===== 粒子系统 =====
    initParticles() {
        // 初始化GitHub风格的粒子系统
        if (typeof ParticleSystem !== 'undefined') {
            this.particleSystem = new ParticleSystem();
        } else {
            // 降级到简单的CSS粒子效果
            const particlesContainer = document.querySelector('.particles');
            if (!particlesContainer) return;

            // 创建粒子
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (15 + Math.random() * 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }
    }

    // ===== 提示词管理 =====
    loadPromptTemplates() {
        if (typeof promptTemplates === 'undefined') {
            console.error('提示词模板未加载');
            return;
        }

        this.renderPromptList();
        this.updateStats();
    }

    renderPromptList() {
        const categories = this.groupPromptsByCategory();
        const sidebar = document.querySelector('.sidebar');

        if (!sidebar) return;

        let html = `
            <div class="sidebar-header">
                <h2><i class="fas fa-rocket"></i> 提示词模板</h2>
                <div class="search-box">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="search-input" placeholder="搜索提示词...">
                </div>
            </div>
        `;

        Object.entries(categories).forEach(([category, prompts]) => {
            html += `
                <div class="category">
                    <div class="category-header" onclick="app.toggleCategory('${category}')">
                        <div class="category-title">
                            <i class="fas fa-folder"></i>
                            <span>${category}</span>
                        </div>
                        <span class="category-count">${prompts.length}</span>
                    </div>
                    <div class="prompt-list" id="category-${category}">
                        ${prompts.map(prompt => `
                            <div class="prompt-item" data-prompt-id="${prompt.id}">
                                <i class="fas fa-file-text"></i>
                                <span>${prompt.name}</span>
                                ${prompt.isNew ? '<span class="prompt-badge">NEW</span>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        sidebar.innerHTML = html;

        // 绑定提示词项点击事件
        document.querySelectorAll('.prompt-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const promptId = item.dataset.promptId;
                if (promptId) {
                    this.selectPrompt(promptId);
                }
            });
        });
    }

    groupPromptsByCategory() {
        const categories = {};

        Object.entries(promptTemplates).forEach(([id, template]) => {
            const category = template.category || '其他';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push({
                id,
                name: template.title,
                isNew: template.isNew || false
            });
        });

        return categories;
    }

    toggleCategory(category) {
        const categoryList = document.getElementById(`category-${category}`);
        if (categoryList) {
            categoryList.style.display = categoryList.style.display === 'none' ? 'flex' : 'none';
            // 如果展开分类，更新收藏标识
            if (categoryList.style.display === 'flex') {
                this.updatePromptListFavorites();
            }
        }
    }

    selectPrompt(promptId) {
        console.log('选择提示词:', promptId); // 调试信息

        if (!promptId) {
            console.log('提示词ID为空');
            return;
        }

        // 移除之前的选中状态
        document.querySelectorAll('.prompt-item').forEach(item => {
            item.classList.remove('active');
        });

        // 添加当前选中状态
        const selectedItem = document.querySelector(`[data-prompt-id="${promptId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        this.currentPrompt = promptTemplates[promptId];
        console.log('当前选中提示词:', this.currentPrompt); // 调试信息
        this.renderPromptForm();
        this.hideWelcomeMessage();
        this.updateFavoriteButtonState(); // 更新收藏按钮状态
    }

    renderPromptForm() {
        if (!this.currentPrompt) return;

        const contentArea = document.querySelector('.content-area');
        if (!contentArea) return;

        // 获取当前提示词的收藏状态
        const favorites = JSON.parse(localStorage.getItem('favoritePrompts') || '[]');
        const promptId = Object.keys(promptTemplates).find(id => promptTemplates[id] === this.currentPrompt);
        const isFavorited = favorites.includes(promptId);

        let html = `
            <div class="prompt-section">
                <div class="content-header">
                    <div class="header-left">
                        <h2><i class="fas fa-magic prompt-icon"></i> ${this.currentPrompt.title}</h2>
                        <p>${this.currentPrompt.description || '请填写以下信息生成专业的提示词'}</p>
                    </div>
                    <div class="header-actions">
                        <button class="action-btn ${isFavorited ? 'favorited' : ''}" onclick="app.favoritePrompt()" title="${isFavorited ? '取消收藏' : '收藏'}">
                            <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <button class="action-btn" onclick="app.sharePrompt()" title="分享">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>

                <div class="form-container">
                    ${this.renderFormFields()}
                </div>

                <div class="action-bar">
                    <div class="action-left">
                        <button class="btn btn-secondary" id="reset-form-btn">
                            <i class="fas fa-undo"></i> 重置
                        </button>
                    </div>
                    <div class="action-right">
                        <button class="btn btn-primary" id="generate-prompt-btn">
                            <i class="fas fa-magic"></i> 生成提示词
                            <div class="btn-loading">
                                <i class="fas fa-spinner fa-spin"></i>
                            </div>
                        </button>
                    </div>
                </div>

                <div class="result-container" id="result">
                    <div class="result-header">
                        <h3><i class="fas fa-clipboard-check"></i> 生成结果</h3>
                        <div class="result-actions">
                            <button class="result-btn copy-btn">
                                <i class="fas fa-copy"></i> 复制
                            </button>
                            <button class="result-btn download-btn">
                                <i class="fas fa-download"></i> 下载
                            </button>
                        </div>
                    </div>
                    <div class="result-content" id="result-text"></div>
                    <div class="result-footer">
                        <div class="result-stats">
                            <div class="stat">
                                <i class="fas fa-font"></i>
                                <span id="char-count">0</span> 字符
                            </div>
                            <div class="stat">
                                <i class="fas fa-align-left"></i>
                                <span id="word-count">0</span> 词语
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contentArea.innerHTML = html;
    }

    renderFormFields() {
        if (!this.currentPrompt || !this.currentPrompt.fields) return '';

        return this.currentPrompt.fields.map(field => {
            // 安全检查，确保所有必要字段都存在
            const fieldName = field.name || '';
            const fieldLabel = field.label || '未命名字段';
            const fieldType = field.type || 'text';
            const fieldPlaceholder = field.placeholder || '';
            const fieldRequired = field.required || false;
            const fieldHelp = field.help || '';
            const fieldOptions = field.options || [];

            switch (fieldType) {
                case 'select':
                    return `
                        <div class="form-group">
                            <label class="form-label">${fieldLabel}</label>
                            <select class="form-select" name="${fieldName}" ${fieldRequired ? 'required' : ''}>
                                <option value="">请选择...</option>
                                ${fieldOptions.map(option =>
                        `<option value="${option || ''}">${option || '选项'}</option>`
                    ).join('')}
                            </select>
                            ${fieldHelp ? `<div class="form-help">${fieldHelp}</div>` : ''}
                        </div>
                    `;
                case 'textarea':
                    return `
                        <div class="form-group">
                            <label class="form-label">${fieldLabel}</label>
                            <textarea class="form-textarea" name="${fieldName}" 
                                placeholder="${fieldPlaceholder}" 
                                ${fieldRequired ? 'required' : ''}></textarea>
                            ${fieldHelp ? `<div class="form-help">${fieldHelp}</div>` : ''}
                        </div>
                    `;
                default:
                    return `
                        <div class="form-group">
                            <label class="form-label">${fieldLabel}</label>
                            <input type="text" class="form-input" name="${fieldName}" 
                                placeholder="${fieldPlaceholder}" 
                                ${fieldRequired ? 'required' : ''}>
                            ${fieldHelp ? `<div class="form-help">${fieldHelp}</div>` : ''}
                        </div>
                    `;
            }
        }).join('');
    }

    // ===== 提示词生成 =====
    async generatePrompt() {
        console.log('=== 生成提示词函数被调用 ==='); // 调试信息
        console.log('当前选中提示词:', this.currentPrompt); // 调试信息
        console.log('是否正在生成:', this.isGenerating); // 调试信息

        // 临时测试 - 直接显示结果
        console.log('当前提示词:', this.currentPrompt); // 调试信息

        if (!this.currentPrompt) {
            console.log('错误：未选择提示词模板'); // 调试信息
            this.showNotification('错误', '请先选择一个提示词模板', 'error');
            return;
        }

        if (this.isGenerating) {
            console.log('正在生成中，跳过...');
            return;
        }

        const formData = this.getFormData();
        console.log('获取表单数据:', formData); // 调试信息

        if (!this.validateForm(formData)) {
            console.log('表单验证失败');
            return;
        }

        this.isGenerating = true;
        this.showGeneratingState();

        const startTime = Date.now();

        try {
            console.log('开始模拟生成过程...'); // 调试信息
            // 模拟生成过程
            await this.delay(1000 + Math.random() * 2000);

            console.log('调用模板函数:', this.currentPrompt.template); // 调试信息
            const result = this.currentPrompt.template(formData);
            const endTime = Date.now();

            console.log('生成结果:', result); // 调试信息
            this.showResult(result, endTime - startTime);
            this.showNotification('生成成功', '提示词已生成完成', 'success');
        } catch (error) {
            console.error('生成失败:', error);
            this.showNotification('生成失败', '请检查输入内容后重试', 'error');
        } finally {
            this.isGenerating = false;
            this.hideGeneratingState();
        }
    }

    getFormData() {
        const formData = {};
        const form = document.querySelector('.form-container');

        if (form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (input.name) { // 确保input有name属性
                    formData[input.name] = input.value;
                }
            });
        }

        console.log('获取到的表单数据:', formData); // 调试信息
        return formData;
    }

    validateForm(formData) {
        if (!this.currentPrompt || !this.currentPrompt.fields) return false;

        const requiredFields = this.currentPrompt.fields.filter(field => field.required);
        const missingFields = requiredFields.filter(field => !formData[field.name] || formData[field.name].trim() === '');

        // 调试信息
        console.log('表单数据:', formData);
        console.log('必填字段:', requiredFields.map(f => f.name));
        console.log('缺失字段:', missingFields.map(f => f.name));

        if (missingFields.length > 0) {
            const fieldNames = missingFields.map(field => field.label).join('、');
            this.showNotification('表单验证失败', `请填写必填字段：${fieldNames}`, 'warning');
            return false;
        }

        return true;

        /*
        const requiredFields = this.currentPrompt.fields.filter(field => field.required);
        const missingFields = requiredFields.filter(field => !formData[field.name] || formData[field.name].trim() === '');

        // 调试信息
        console.log('表单数据:', formData);
        console.log('必填字段:', requiredFields.map(f => f.name));
        console.log('缺失字段:', missingFields.map(f => f.name));

        if (missingFields.length > 0) {
            const fieldNames = missingFields.map(field => field.label).join('、');
            this.showNotification('表单验证失败', `请填写必填字段：${fieldNames}`, 'warning');
            return false;
        }

        return true;
        */
    }

    showGeneratingState() {
        const generateBtn = document.getElementById('generate-prompt-btn');
        if (generateBtn) {
            generateBtn.classList.add('loading');
            generateBtn.disabled = true;
        }
    }

    hideGeneratingState() {
        const generateBtn = document.getElementById('generate-prompt-btn');
        if (generateBtn) {
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;
        }
    }

    showResult(content, generationTime) {
        const resultContainer = document.getElementById('result');
        const resultContent = document.getElementById('result-text');
        const charCount = document.getElementById('char-count');
        const wordCount = document.getElementById('word-count');

        if (resultContainer && resultContent) {
            resultContent.textContent = content;
            resultContainer.classList.add('show');

            // 更新统计信息
            if (charCount) charCount.textContent = content.length;
            if (wordCount) wordCount.textContent = content.split(/\s+/).length;

            // 滚动到结果区域
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    resetForm() {
        const form = document.querySelector('.form-container');
        if (form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.value = '';
            });
        }

        const resultContainer = document.getElementById('result');
        if (resultContainer) {
            resultContainer.classList.remove('show');
        }

        this.showNotification('表单已重置', '所有字段已清空', 'info');
    }

    // ===== 搜索功能 =====
    handleSearch(query) {
        const promptItems = document.querySelectorAll('.prompt-item');
        const categories = document.querySelectorAll('.category');

        if (!query.trim()) {
            // 显示所有项目
            promptItems.forEach(item => item.style.display = 'flex');
            categories.forEach(category => category.style.display = 'block');
            // 更新收藏标识
            this.updatePromptListFavorites();
            return;
        }

        const searchTerm = query.toLowerCase();
        let hasVisibleItems = false;
        const favorites = JSON.parse(localStorage.getItem('favoritePrompts') || '[]');

        categories.forEach(category => {
            const categoryItems = category.querySelectorAll('.prompt-item');
            let categoryHasVisible = false;

            categoryItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                    categoryHasVisible = true;
                    hasVisibleItems = true;
                    // 添加或移除收藏标识
                    const promptId = item.dataset.promptId;
                    if (favorites.includes(promptId)) {
                        item.classList.add('favorited-item');
                    } else {
                        item.classList.remove('favorited-item');
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            category.style.display = categoryHasVisible ? 'block' : 'none';
        });

        if (!hasVisibleItems) {
            this.showNotification('搜索结果', '未找到匹配的提示词模板', 'info');
        }
    }

    // ===== 快速操作 =====
    handleQuickAction(action) {
        switch (action) {
            case 'popular':
                this.showPopularPrompts();
                break;
            case 'recent':
                this.showRecentPrompts();
                break;
            case 'favorites':
                this.showFavoritePrompts();
                break;
            case 'random':
                this.selectRandomPrompt();
                break;
        }
    }

    showPopularPrompts() {
        const popularIds = ['academic-translation', 'paper-polish', 'style-imitation'];
        this.filterPrompts(popularIds);
        this.showNotification('热门模板', '已显示最受欢迎的提示词模板', 'info');
    }

    showRecentPrompts() {
        const recentIds = JSON.parse(localStorage.getItem('recentPrompts') || '[]');
        if (recentIds.length > 0) {
            this.filterPrompts(recentIds);
            this.showNotification('最近使用', '已显示最近使用的提示词模板', 'info');
        } else {
            this.showNotification('最近使用', '暂无最近使用的模板', 'info');
        }
    }

    showFavoritePrompts() {
        const favorites = JSON.parse(localStorage.getItem('favoritePrompts') || '[]');
        if (favorites.length > 0) {
            this.filterPrompts(favorites);
            this.showNotification('收藏夹', '已显示收藏的提示词模板', 'info');
        } else {
            this.showNotification('收藏夹', '暂无收藏的模板', 'info');
        }
    }

    selectRandomPrompt() {
        const promptIds = Object.keys(promptTemplates);
        const randomId = promptIds[Math.floor(Math.random() * promptIds.length)];
        this.selectPrompt(randomId);
        this.showNotification('随机选择', `已选择：${promptTemplates[randomId].title}`, 'success');
    }

    filterPrompts(ids) {
        const promptItems = document.querySelectorAll('.prompt-item');
        promptItems.forEach(item => {
            const promptId = item.dataset.promptId;
            item.style.display = ids.includes(promptId) ? 'flex' : 'none';
            // 添加或移除收藏标识
            if (ids.includes(promptId)) {
                item.classList.add('favorited-item');
            } else {
                item.classList.remove('favorited-item');
            }
        });
    }

    // ===== 收藏和分享 =====
    favoritePrompt() {
        if (!this.currentPrompt) return;

        const favorites = JSON.parse(localStorage.getItem('favoritePrompts') || '[]');
        const promptId = Object.keys(promptTemplates).find(id => promptTemplates[id] === this.currentPrompt);

        if (favorites.includes(promptId)) {
            const index = favorites.indexOf(promptId);
            favorites.splice(index, 1);
            this.showNotification('取消收藏', '已从收藏夹中移除', 'info');
        } else {
            favorites.push(promptId);
            this.showNotification('添加收藏', '已添加到收藏夹', 'success');
        }

        localStorage.setItem('favoritePrompts', JSON.stringify(favorites));
        this.updateFavoriteButtonState(); // 更新收藏按钮状态
        this.updatePromptListFavorites(); // 更新提示词列表中的收藏标识
    }

    // 更新收藏按钮的视觉状态
    updateFavoriteButtonState() {
        if (!this.currentPrompt) return;

        const favorites = JSON.parse(localStorage.getItem('favoritePrompts') || '[]');
        const promptId = Object.keys(promptTemplates).find(id => promptTemplates[id] === this.currentPrompt);
        const favoriteBtn = document.querySelector('.action-btn[title="收藏"]');

        if (favoriteBtn) {
            const icon = favoriteBtn.querySelector('i');
            if (favorites.includes(promptId)) {
                favoriteBtn.classList.add('favorited');
                icon.classList.remove('fa-heart');
                icon.classList.add('fa-heart', 'fas'); // 实心爱心
                favoriteBtn.title = '取消收藏';
            } else {
                favoriteBtn.classList.remove('favorited');
                icon.classList.remove('fas');
                icon.classList.add('far', 'fa-heart'); // 空心爱心
                favoriteBtn.title = '收藏';
            }
        }

        // 更新侧边栏收藏按钮的激活状态
        this.updateSidebarFavoritesButton();
    }

    // 更新侧边栏收藏按钮的激活状态
    updateSidebarFavoritesButton() {
        const favoritesBtn = document.getElementById('favorites-btn');
        if (!favoritesBtn) return;

        const favorites = JSON.parse(localStorage.getItem('favoritePrompts') || '[]');
        const isShowingFavorites = favoritesBtn.classList.contains('active');

        // 如果有收藏的项目且当前正在显示收藏夹，保持激活状态
        if (favorites.length > 0 && isShowingFavorites) {
            favoritesBtn.classList.add('active');
        } else if (favorites.length === 0 && isShowingFavorites) {
            // 如果没有收藏项目但按钮是激活状态，切换到显示全部
            this.showAllPrompts();
            favoritesBtn.classList.remove('active');
            favoritesBtn.innerHTML = '<i class="fas fa-heart"></i> 我的收藏';
        }
    }

    // 切换收藏夹显示模式
    toggleFavoritesView() {
        const favoritesBtn = document.getElementById('favorites-btn');
        const isShowingFavorites = favoritesBtn.classList.contains('active');

        if (isShowingFavorites) {
            // 显示所有提示词
            this.showAllPrompts();
            favoritesBtn.classList.remove('active');
            favoritesBtn.innerHTML = '<i class="fas fa-heart"></i> 我的收藏';
            this.showNotification('提示词列表', '已显示所有提示词模板', 'info');
        } else {
            // 检查是否有收藏的提示词
            const favorites = JSON.parse(localStorage.getItem('favoritePrompts') || '[]');
            if (favorites.length === 0) {
                this.showNotification('收藏夹为空', '您还没有收藏任何提示词模板', 'warning');
                return; // 不切换状态，保持当前显示
            }

            // 显示收藏的提示词
            this.showFavoritePrompts();
            favoritesBtn.classList.add('active');
            favoritesBtn.innerHTML = '<i class="fas fa-list"></i> 全部模板';
        }
    }

    // 显示所有提示词
    showAllPrompts() {
        const promptItems = document.querySelectorAll('.prompt-item');
        promptItems.forEach(item => {
            item.style.display = 'flex';
            item.classList.remove('favorited-item'); // 移除收藏标识
        });
    }

    // 更新提示词列表中的收藏标识
    updatePromptListFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favoritePrompts') || '[]');
        const promptItems = document.querySelectorAll('.prompt-item');

        promptItems.forEach(item => {
            const promptId = item.dataset.promptId;
            if (favorites.includes(promptId)) {
                item.classList.add('favorited-item');
            } else {
                item.classList.remove('favorited-item');
            }
        });
    }

    sharePrompt() {
        if (!this.currentPrompt) return;

        const shareData = {
            title: `Research Prompt Pro - ${this.currentPrompt.title}`,
            text: this.currentPrompt.description || '专业的学术研究提示词工具',
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            this.copyToClipboard(shareData.url);
            this.showNotification('分享链接', '链接已复制到剪贴板', 'success');
        }
    }

    // ===== 工具函数 =====
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('复制成功', '内容已复制到剪贴板', 'success');

            // 更新复制按钮状态
            const copyBtn = document.querySelector('.copy-btn');
            if (copyBtn) {
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';
                copyBtn.classList.add('success');

                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.classList.remove('success');
                }, 2000);
            }
        } catch (error) {
            console.error('复制失败:', error);
            this.showNotification('复制失败', '请手动复制内容', 'error');
        }
    }

    downloadText(content, filename = 'prompt.txt') {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('下载成功', '文件已保存到本地', 'success');
    }

    // ===== 通知系统 =====
    showNotification(title, message, type = 'info') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas ${this.getNotificationIcon(type)}"></i>
                </div>
                <div class="notification-text">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // 添加点击关闭事件
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideNotification(notification);
            });
        }

        // 点击通知本身也可以关闭
        notification.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        container.appendChild(notification);
        this.notifications.push(notification);

        // 添加进入动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // 自动移除 - 根据类型设置不同的延迟时间
        const autoHideDelay = type === 'error' ? 8000 : type === 'warning' ? 6000 : 4000;
        const autoHideTimer = setTimeout(() => {
            this.hideNotification(notification);
        }, autoHideDelay);

        // 将定时器存储在通知元素上，以便可以取消
        notification.autoHideTimer = autoHideTimer;

        // 鼠标悬停时暂停自动关闭
        notification.addEventListener('mouseenter', () => {
            if (notification.autoHideTimer) {
                clearTimeout(notification.autoHideTimer);
                notification.autoHideTimer = null;
            }
        });

        // 鼠标离开时重新开始自动关闭
        notification.addEventListener('mouseleave', () => {
            if (!notification.autoHideTimer) {
                notification.autoHideTimer = setTimeout(() => {
                    this.hideNotification(notification);
                }, 2000); // 鼠标离开后2秒关闭
            }
        });

        // 限制通知数量
        if (this.notifications.length > 3) {
            this.hideNotification(this.notifications[0]);
        }

        return notification;
    }

    hideNotification(notification) {
        if (!notification || !notification.parentNode) return;

        // 清除自动隐藏定时器
        if (notification.autoHideTimer) {
            clearTimeout(notification.autoHideTimer);
            notification.autoHideTimer = null;
        }

        // 添加退出动画
        notification.classList.remove('show');
        notification.classList.add('hiding');

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // ===== 模态框 =====
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // ===== 键盘快捷键 =====
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter: 生成提示词
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.generatePrompt();
            }

            // Ctrl/Cmd + D: 切换主题
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.toggleTheme();
            }

            // Escape: 关闭模态框
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    this.hideModal(openModal.id);
                }
            }

            // F11: 全屏切换
            if (e.key === 'F11') {
                e.preventDefault();
                this.toggleFullscreen();
            }
        });
    }
    // ===== 工具提示（已禁用）=====
    initTooltips() {
        // 已禁用工具提示功能
        console.log('工具提示功能已禁用');
    }

    showTooltip(element, text) {
        // 已禁用，不执行任何操作
    }

    hideTooltip() {
        // 已禁用，不执行任何操作
    }

    // ===== 欢迎消息 =====
    showWelcomeMessage() {
        const contentArea = document.querySelector('.content-area');
        if (!contentArea) return;

        contentArea.innerHTML = `
            <div class="welcome-section">
                <div class="welcome-content">
                    <div class="welcome-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h2>欢迎使用 Research Prompt Pro</h2>
                    <p class="welcome-description">
                        专业的学术研究提示词生成工具，帮助您快速创建高质量的学术内容。
                        选择左侧的提示词模板开始使用，或使用下方的快速操作。
                    </p>
                    
                    <div class="feature-grid">
                        <div class="feature-card">
                            <i class="fas fa-magic"></i>
                            <h3>智能生成</h3>
                            <p>基于专业模板快速生成高质量提示词</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-palette"></i>
                            <h3>多样模板</h3>
                            <p>涵盖学术写作的各个方面和场景</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-download"></i>
                            <h3>便捷导出</h3>
                            <p>支持复制和下载生成的内容</p>
                        </div>
                        <div class="feature-card">
                            <i class="fas fa-mobile-alt"></i>
                            <h3>响应式设计</h3>
                            <p>完美适配各种设备和屏幕尺寸</p>
                        </div>
                    </div>
                    
                    <div class="quick-start">
                        <h3>快速开始</h3>
                        <div class="quick-actions">
                            <a href="#" class="quick-btn" data-action="popular">
                                <i class="fas fa-fire"></i> 热门模板
                            </a>
                            <a href="#" class="quick-btn" data-action="recent">
                                <i class="fas fa-history"></i> 最近使用
                            </a>
                            <a href="#" class="quick-btn" data-action="random">
                                <i class="fas fa-random"></i> 随机选择
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    hideWelcomeMessage() {
        // 欢迎消息会被新内容替换，无需特殊处理
    }

    // ===== 统计更新 =====
    updateStats() {
        const totalPrompts = Object.keys(promptTemplates).length;
        const categories = new Set(Object.values(promptTemplates).map(t => t.category || '其他')).size;
        const usage = parseInt(localStorage.getItem('totalUsage') || '0');

        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = totalPrompts;
            statNumbers[1].textContent = categories;
            statNumbers[2].textContent = usage;
        }
    }

    // ===== 响应式处理 =====

    // ===== 当前结果处理 =====
    copyCurrentResult() {
        const resultContent = document.getElementById('result-text');
        if (resultContent && resultContent.textContent) {
            this.copyToClipboard(resultContent.textContent);
        } else {
            this.showNotification('复制失败', '没有可复制的内容', 'error');
        }
    }

    downloadCurrentResult() {
        const resultContent = document.getElementById('result-text');
        if (resultContent && resultContent.textContent) {
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const filename = `prompt-${timestamp}.txt`;
            this.downloadText(resultContent.textContent, filename);
        } else {
            this.showNotification('下载失败', '没有可下载的内容', 'error');
        }
    }
    handleResize() {
        // 处理窗口大小变化
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }

    handleScroll() {
        // 处理滚动事件
        const nav = document.querySelector('.top-nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    }

    // ===== 工具函数 =====
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ResearchPromptPro();
});

// 导出到全局作用域
window.ResearchPromptPro = ResearchPromptPro;

// 全局函数供HTML调用
window.copyPrompt = function () {
    if (app && app.copyCurrentResult) {
        app.copyCurrentResult();
    } else {
        console.error('应用未初始化或方法不存在');
    }
};

window.downloadPrompt = function () {
    if (app && app.downloadCurrentResult) {
        app.downloadCurrentResult();
    } else {
        console.error('应用未初始化或方法不存在');
    }
};