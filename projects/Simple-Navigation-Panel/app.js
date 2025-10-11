// 默认网站数据
const defaultSites = [
    { name: '微信文件传输助手', url: 'https://filehelper.weixin.qq.com/', category: '工具', description: '微信官方提供的网页版文件传输工具' },
    { name: '虾皮卖家中心', url: 'https://seller.shopee.cn/', category: '工作', description: '东南亚领先的跨境电商平台Shopee的卖家后台管理系统' },
    { name: '客优云', url: 'https://erp.keyouyun.com/', category: '工作', description: '专业的多平台电商ERP管理系统，支持订单处理、库存管理和数据分析' },
    { name: '哔哩哔哩', url: 'http://www.bilibili.com/', category: '娱乐', description: '中国领先的年轻人文化社区和视频平台，以弹幕互动为特色' },
    { name: '小红书', url: 'https://www.xiaohongshu.com/explore?m_source=itab', category: '社交', description: '中国知名的生活方式分享和购物指南社区平台' },
    { name: '秘塔AI搜索', url: 'https://metaso.cn/?s=itaber&referrer_s=itaber', category: 'AI工具', description: '新一代AI驱动的智能搜索引擎，提供精准的语义理解和知识图谱' },
    { name: '问小白', url: 'https://www.wenxiaobai.com/chat/200006', category: 'AI工具', description: '基于大语言模型的智能对话助手，支持多轮对话和知识问答' },
    { name: '腾讯元宝', url: 'https://yuanbao.tencent.com/chat/', category: 'AI工具', description: '腾讯公司推出的AI大模型助手，整合了多种AI能力' },
    { name: 'DeepSeek', url: 'https://www.deepseek.com/', category: 'AI工具', description: '专注于代码生成和理解的AI编程助手' },
    { name: '智谱清言', url: 'https://chatglm.cn/apps?image=https%3A%2F%2Fsfile.chatglm.cn%2Factiveimg%2Fbdms%2F66b97e348217030036f486f1&open_from=ads_web_itab&fr=ads_web_itab', category: 'AI工具', description: '基于ChatGLM大模型的智能对话系统，由清华大学和智谱AI联合研发' },
    { name: '通义千问', url: 'https://tongyi.aliyun.com/qianwen/', category: 'AI工具', description: '阿里巴巴推出的通用大语言模型AI助手' },
    { name: '硅基流动', url: 'https://cloud.siliconflow.cn/models', category: 'AI工具', description: '提供多种AI模型API服务的平台，支持模型训练和部署' },
    { name: '火山引擎', url: 'https://console.volcengine.com/ark/region:ark+cn-beijing/overview?briefPage=0&briefType=introduce&projectName=undefined&type=new', category: '开发', description: '字节跳动旗下的云计算服务平台，提供多种云产品和解决方案' },
    { name: 'GitHub', url: 'https://github.com/', category: '开发', description: '全球最大的代码托管与协作平台，支持Git版本控制和CI/CD' },
    { name: 'CSDN', url: 'https://www.csdn.net/', category: '开发', description: '中国最大的IT技术社区和开发者服务平台' },
    { name: 'citexs', url: 'https://www.citexs.com/', category: '学术资源', description: '专业的学术文献检索和分析平台，支持文献管理和引用分析' },
    { name: '中国知网', url: 'https://chn.oversea.cnki.net/index/', category: '学术资源', description: '中国最具权威性的中文学术资源数据库和知识服务平台' },
    { name: 'Google 学术', url: 'https://scholar.google.com/', category: '学术资源', description: '全球最全面的学术搜索引擎，索引各类学术出版物' },
    { name: '烂番薯', url: 'https://scholar.lanfanshu.cn/', category: '学术资源', description: '提供Google学术等资源镜像访问服务的学术平台' },
    { name: '科研废物', url: 'https://www.yanweb.top/', category: '学术资源', description: '整合各类科研工具和资源的导航网站' },
    { name: 'Semantic Scholar', url: 'https://www.semanticscholar.org/', category: '学术资源', description: '基于AI技术的学术搜索引擎，由Allen Institute开发' },
    { name: 'arXiv', url: 'https://arxiv.org/', category: '学术资源', description: '全球最大的物理学、数学、计算机科学等领域预印本论文平台' },
    { name: 'LetPub', url: 'https://www.letpub.com.cn/index.php?page=journalapp', category: '学术资源', description: '专业的SCI期刊查询和投稿分析工具' },
    { name: '川大统一认证', url: 'https://id.scu.edu.cn/frontend/login#/login?sp_code=bDBhREE1WDMzK3llSzZyVFZNeE81czRDd1hESTI4NWxGaFdsTnlvcGt3eVdTb2cxSjN5a1FJTDVMWTBEQkFFd2k1bWZRMy82OXN6V21ZYzFLd2NlSDl1ekZ4bSt4Q0kzSWJYRG5UZkRzQ002ek10cUlNVGE4V2JmQXJqdnF0NFJFUHdWSmlHWDJ0NEp3Q3gyNzltcEdOUTNHUU5NUzhaYnpJV2N3Q0puNFN6Y29JMmRWS1BNMjBiV25T', category: '工作', description: '四川大学统一的身份认证和单点登录系统' },
    { name: '欧路词典', url: 'https://my.eudic.net/studyList', category: '学习', description: '专业的英语学习词典软件，支持多词典查询和生词本管理' },
    { name: 'Mathpix 自助充值', url: 'https://fuyiqu.cn/pro/math/pix/vip/2412/8e491c1bb75f/index.htm', category: '工具', description: 'Mathpix数学公式识别工具的自助充值页面' },
    { name: '扩展搜搜', url: 'https://www.crxsoso.com/?utm=itab', category: '工具', description: '提供Chrome浏览器扩展下载的镜像站点' },
    { name: 'Aconvert', url: 'https://www.aconvert.com/cn/', category: '工具', description: '支持多种格式的在线文件转换工具，包括文档、图片和视频' },
    { name: 'Doc2X', url: 'https://doc2x.noedgeai.com', category: '工具', description: '基于AI的智能文档转换工具，支持多种格式互转' },
    { name: 'FreeOK', url: 'https://www.freeok.mobi/', category: '娱乐', description: '提供免费在线影视资源观看的网站' },
    { name: '句乐部', url: 'https://julebu.co/home', category: '娱乐', description: '专注于短剧内容的在线观看平台' },
    { name: '毒舌电影', url: 'https://www.dushe1.app/', category: '娱乐', description: '提供专业影视评论和资讯的移动应用' },
    { name: '夸克扫描王', url: 'https://scan.quark.cn/web/?entry=offical_website', category: '工具', description: '夸克浏览器推出的智能文档扫描和OCR识别工具' }
];

// 初始化应用
class NavigationApp {
    constructor() {
        this.sites = [];
        this.currentCategory = '全部';
        this.themePreference = 'light';
        this.categoryOrder = [];
        this.init();
    }

    init() {
        this.loadSites();
        this.renderCategories();
        this.renderSites();
        this.setupEventListeners();
        this.setupTitleEdit();
    }

    async loadSites() {
        const savedData = localStorage.getItem('navPanelSettings');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.sites = data.sites || defaultSites;
            this.currentCategory = data.currentCategory || '全部';
            document.title = data.title || '我的导航面板';
            if (data.windowWidth && data.windowHeight) {
                window.resizeTo(data.windowWidth, data.windowHeight);
            }
        } else {
            this.sites = defaultSites;
        }

        const savedTheme = localStorage.getItem('themePreference');
        this.themePreference = savedTheme || 'light';
        document.documentElement.setAttribute('data-theme', this.themePreference);

        const savedOrder = localStorage.getItem('categoryOrder');
        this.categoryOrder = savedOrder ? JSON.parse(savedOrder) : [];
        return Promise.resolve();
    }

    async saveSites() {
        const data = {
            sites: this.sites,
            currentCategory: this.currentCategory,
            title: document.title,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
        localStorage.setItem('navPanelSettings', JSON.stringify(data));
        localStorage.setItem('themePreference', this.themePreference);
        localStorage.setItem('categoryOrder', JSON.stringify(this.categoryOrder));
        return Promise.resolve();
    }

    renderCategories() {
        const categories = ['全部', ...new Set(this.sites.map(site => site.category))];

        // 保持分类顺序
        if (this.categoryOrder.length > 0) {
            categories.sort((a, b) => {
                if (a === '全部') return -1;
                if (b === '全部') return 1;
                const indexA = this.categoryOrder.indexOf(a);
                const indexB = this.categoryOrder.indexOf(b);
                return indexA - indexB;
            });
        }

        const categoriesContainer = document.querySelector('.categories ul');

        categoriesContainer.innerHTML = categories.map(category =>
            `<li class="${category === '全部' ? 'active' : ''}" data-category="${category}">
                ${category}
                ${category !== '全部' ? `<button class="category-delete-btn" data-category="${category}">×</button>` : ''}
            </li>`
        ).join('');

        // 添加分类名称双击编辑功能
        document.querySelectorAll('.categories li').forEach(item => {
            item.addEventListener('dblclick', (e) => {
                if (e.target.classList.contains('category-delete-btn')) return;

                const oldCategory = item.dataset.category;
                if (oldCategory === '全部') return;

                const span = item.querySelector('span');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = oldCategory;
                input.style.width = `${span.offsetWidth}px`;
                input.style.padding = '4px 8px';
                input.style.borderRadius = '20px';
                input.style.border = '1px solid var(--primary-color)';
                input.style.background = 'var(--card-bg)';
                input.style.color = 'var(--text-color)';

                span.replaceWith(input);
                input.focus();

                const handleBlur = () => {
                    const newCategory = input.value.trim();
                    if (newCategory && newCategory !== oldCategory) {
                        this.sites.forEach(site => {
                            if (site.category === oldCategory) {
                                site.category = newCategory;
                            }
                        });
                        this.saveSites();
                        this.renderCategories();
                        this.renderSites();
                        this.showToast(`分类名称已更新: ${oldCategory} → ${newCategory}`);
                    } else {
                        input.replaceWith(span);
                    }
                    input.removeEventListener('blur', handleBlur);
                    input.removeEventListener('keydown', handleKeyDown);
                };

                const handleKeyDown = (e) => {
                    if (e.key === 'Enter') {
                        handleBlur();
                    } else if (e.key === 'Escape') {
                        input.replaceWith(span);
                        input.removeEventListener('blur', handleBlur);
                        input.removeEventListener('keydown', handleKeyDown);
                    }
                };

                input.addEventListener('blur', handleBlur);
                input.addEventListener('keydown', handleKeyDown);
            });
        });
    }

    renderSites() {
        const gridContainer = document.getElementById('sites-grid');
        const filteredSites = this.currentCategory === '全部'
            ? this.sites
            : this.sites.filter(site => site.category === this.currentCategory);

        gridContainer.innerHTML = filteredSites.map(site =>
            `<div class="site-card" data-url="${site.url}" draggable="true" data-name="${site.name}">
                <h3>${site.name}</h3>
                <div class="description">${site.description || (defaultSites.find(d => d.name === site.name)?.description || '暂无描述')}</div>
                <button class="delete-btn" data-name="${site.name}">×</button>
            </div>`
        ).join('');


    }

    setupEventListeners() {
        // 分类切换
        document.querySelectorAll('.categories li').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelector('.categories li.active').classList.remove('active');
                item.classList.add('active');
                this.currentCategory = item.dataset.category;
                this.renderSites();
            });
        });

        // 拖拽功能
        const gridContainer = document.getElementById('sites-grid');
        let draggedItem = null;

        gridContainer.addEventListener('dragstart', e => {
            if (e.target.classList.contains('site-card')) {
                draggedItem = e.target;
                e.target.classList.add('dragging');
                e.dataTransfer.setData('text/plain', e.target.dataset.url);
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        gridContainer.addEventListener('dragover', e => {
            e.preventDefault();
            const card = e.target.closest('.site-card');
            if (card && card !== draggedItem) {
                card.classList.add('drag-over');
            }
        });

        gridContainer.addEventListener('dragleave', e => {
            const card = e.target.closest('.site-card');
            if (card) {
                card.classList.remove('drag-over');
            }
        });

        gridContainer.addEventListener('drop', e => {
            e.preventDefault();
            const dropTarget = e.target.closest('.site-card');
            if (dropTarget && draggedItem) {
                dropTarget.classList.remove('drag-over');

                // 获取拖拽元素和放置目标的URL
                const draggedUrl = draggedItem.dataset.url;
                const targetUrl = dropTarget.dataset.url;

                // 更新数据顺序
                const draggedIndex = this.sites.findIndex(site => site.url === draggedUrl);
                const targetIndex = this.sites.findIndex(site => site.url === targetUrl);

                if (draggedIndex !== -1 && targetIndex !== -1) {
                    const [removed] = this.sites.splice(draggedIndex, 1);
                    this.sites.splice(targetIndex, 0, removed);
                    this.saveSites();
                    this.renderSites();
                }
            }
        });

        gridContainer.addEventListener('dragend', () => {
            document.querySelectorAll('.site-card').forEach(card => {
                card.classList.remove('dragging', 'drag-over');
            });
            draggedItem = null;
        });

        // 网站卡片点击
        document.addEventListener('click', e => {
            // 如果点击的是编辑表单区域，则不跳转
            if (e.target.closest('.edit-form')) {
                return;
            }

            const siteCard = e.target.closest('.site-card');
            if (siteCard) {
                window.open(siteCard.dataset.url, '_blank');
            }

            // 删除按钮
            const deleteBtn = e.target.closest('.delete-btn');
            if (deleteBtn) {
                e.stopPropagation();
                const siteName = deleteBtn.dataset.name;
                this.sites = this.sites.filter(site => site.name !== siteName);
                this.saveSites();
                this.renderSites();
                this.renderCategories();
                this.showToast(`已删除: ${siteName}`);
            }

            // 分类删除按钮
            const categoryDeleteBtn = e.target.closest('.category-delete-btn');
            if (categoryDeleteBtn) {
                e.stopPropagation();
                const category = categoryDeleteBtn.dataset.category;
                this.deleteCategory(category);
            }
        });

        // 添加按钮
        document.querySelector('.add-btn').addEventListener('click', () => {
            const name = prompt('请输入网站名称:');
            if (!name) return;

            const url = prompt('请输入网站URL:');
            if (!url) return;

            const category = prompt('请输入分类:');
            if (!category) return;

            const description = prompt('请输入描述:');

            this.sites.push({ name, url, category, description: description || '' });
            this.saveSites();
            this.renderSites();
            this.renderCategories();
            this.showToast(`已添加: ${name}`);
        });

        // 右键点击编辑功能
        document.querySelectorAll('.site-card').forEach(card => {
            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const siteName = card.dataset.name;
                const site = this.sites.find(s => s.name === siteName);
                if (!site) return;

                // 创建编辑表单
                const editForm = document.createElement('div');
                editForm.className = 'edit-form';
                editForm.innerHTML = `
                    <div class='edit-form-content'>
                        <div class='edit-form-header'>
                            <h3>编辑网站</h3>
                            <button class='close-btn'>×</button>
                        </div>
                        <div class='edit-form-body'>
                            <div class='form-group'>
                                <label>网站名称</label>
                                <input type='text' class='edit-name' value='${site.name}'>
                            </div>
                            <div class='form-group'>
                                <label>网站URL</label>
                                <input type='text' class='edit-url' value='${site.url}'>
                            </div>
                            <div class='form-group'>
                                <label>分类</label>
                                <input type='text' class='edit-category' value='${site.category}'>
                            </div>
                            <div class='form-group'>
                                <label>描述</label>
                                <textarea class='edit-description'>${site.description || (defaultSites.find(d => d.name === site.name)?.description || '')}</textarea>
                            </div>
                            <div class='form-actions'>
                                <button class='save-btn'>保存</button>
                                <button class='cancel-btn'>取消</button>
                            </div>
                        </div>
                    </div>
                `;

                // 计算最佳显示位置
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const formWidth = 400; // 表单宽度
                const formHeight = 400; // 表单高度

                // 默认显示在鼠标右侧
                let left = e.clientX;
                let top = e.clientY;

                // 如果右侧空间不足，显示在左侧
                if (left + formWidth > viewportWidth) {
                    left = e.clientX - formWidth;
                }

                // 如果底部空间不足，调整垂直位置
                if (top + formHeight > viewportHeight) {
                    top = viewportHeight - formHeight;
                }

                // 设置表单位置
                editForm.style.position = 'absolute';
                editForm.style.left = `${left}px`;
                editForm.style.top = `${top}px`;
                editForm.style.width = `${formWidth}px`;
                editForm.style.height = 'auto';
                editForm.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

                // 添加到body而不是卡片，避免被卡片样式影响
                document.body.appendChild(editForm);

                // 关闭按钮事件
                editForm.querySelector('.close-btn').addEventListener('click', () => {
                    editForm.remove();
                });

                // 取消按钮事件
                editForm.querySelector('.cancel-btn').addEventListener('click', () => {
                    editForm.remove();
                });

                // 保存按钮事件
                editForm.querySelector('.save-btn').addEventListener('click', () => {
                    const newName = editForm.querySelector('.edit-name').value.trim();
                    const newUrl = editForm.querySelector('.edit-url').value.trim();
                    const newCategory = editForm.querySelector('.edit-category').value.trim();
                    const newDesc = editForm.querySelector('.edit-description').value.trim();

                    if (newName && newUrl && newCategory) {
                        site.name = newName;
                        site.url = newUrl;
                        site.category = newCategory;
                        site.description = newDesc;

                        this.saveSites();
                        this.renderSites();
                        this.renderCategories();
                        this.showToast(`已更新: ${newName}`);
                        editForm.remove();
                    } else {
                        this.showToast('请填写所有必填字段');
                    }
                });
            });
        });

        // 搜索功能
        document.querySelector('.search-box input').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allCards = document.querySelectorAll('.site-card');

            allCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = name.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }

    deleteCategory(category) {
        if (category === '全部') return;

        if (confirm(`确定要删除分类"${category}"及其下所有网站吗？`)) {
            this.sites = this.sites.filter(site => site.category !== category);
            this.saveSites();
            this.currentCategory = '全部';
            this.renderSites();
            this.renderCategories();
            this.showToast(`已删除分类: ${category}`);
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 2000);
        }, 10);
    }

    saveFormData(form, site) {
        const newName = form.querySelector('.edit-name').value.trim();
        const newUrl = form.querySelector('.edit-url').value.trim();
        const newCategory = form.querySelector('.edit-category').value.trim();
        const newDesc = form.querySelector('.edit-description').value.trim();

        if (newName && newUrl && newCategory) {
            site.name = newName;
            site.url = newUrl;
            site.category = newCategory;
            site.description = newDesc;

            this.saveSites();
            this.renderSites();
            this.renderCategories();
            this.showToast(`已更新: ${newName}`);
        } else {
            this.showToast('请填写所有必填字段');
        }
    }

    setupTitleEdit() {
        // 标题编辑功能
        const title = document.querySelector('header h1');
        title.addEventListener('dblclick', () => {
            const oldText = title.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = oldText;
            input.style.width = `${title.offsetWidth}px`;
            input.style.padding = '4px 8px';
            input.style.borderRadius = '20px';
            input.style.border = '1px solid var(--primary-color)';
            input.style.background = 'var(--card-bg)';
            input.style.color = 'var(--text-color)';
            input.style.fontSize = 'inherit';
            input.style.fontWeight = 'inherit';

            title.replaceWith(input);
            input.focus();

            const handleBlur = () => {
                const newText = input.value.trim();
                if (newText && newText !== oldText) {
                    title.textContent = newText;
                    this.showToast(`标题已更新: ${oldText} → ${newText}`);
                }
                input.replaceWith(title);
                input.removeEventListener('blur', handleBlur);
                input.removeEventListener('keydown', handleKeyDown);
            };

            const handleKeyDown = (e) => {
                if (e.key === 'Enter') {
                    handleBlur();
                } else if (e.key === 'Escape') {
                    input.replaceWith(title);
                    input.removeEventListener('blur', handleBlur);
                    input.removeEventListener('keydown', handleKeyDown);
                }
            };

            input.addEventListener('blur', handleBlur);
            input.addEventListener('keydown', handleKeyDown);
        });
    }
}

// 启动应用
new NavigationApp();