// PINNs系列论文研究进展数据
let pinnsPapers = [
    {
        // ===== 元信息 ===== 
        "meta": {
            "titleCN": "物理信息神经网络：解决涉及非线性偏微分方程的正向和逆向问题的深度学习框架",
            "titleEN": "Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations",
            "author": "M. Raissi",
            "unit": "美国布朗大学应用数学系",
            "venue": "Journal of Computational Physics",
            "date": "2019年2月",
            "tags": "科学机器学习, 非线性PDE, 数据驱动建模, 物理约束, 自动微分",
            "links": {
                "paper": "https://www.sciencedirect.com/science/article/pii/S0021999118307125?via%3Dihub",
                "download": "https://www.jianguoyun.com/p/DYjCwXIQ7P3jDRiTrpUGIAA",
                "cover": "https://ars.els-cdn.com/content/image/X00219991.jpg"
            },
            "coverFallback": "https://via.placeholder.com/100x140/4a90e2/ffffff?text=JCP"
        },
        "titles": {
            "suspense": "只用1%数据就能解Navier-Stokes？这支团队让AI'背会'物理定律！",
            "value": "从量子到湍流：一文看懂如何让深度学习'服从'物理规律",
            "conflict": "扔掉网格、无视噪声，布朗大学新作让PDE求解进入'无监督'时代？"
        },
        // ===== 导语(80-120字) ===== 
        "intro": "当传统数值方法遇到复杂偏微分方程时，往往需要精细的网格划分和巨大的计算成本。布朗大学Raissi团队在计算物理顶刊JCP上提出的物理信息神经网络(PINN)，通过将物理定律直接嵌入神经网络训练过程，实现了用少量数据精准求解复杂方程。这项研究不仅为科学计算带来新范式，更开启了深度学习与数学物理深度融合的新时代。",
        "content": {
            "background": {
                "field": "偏微分方程(PDE)是描述自然界物理现象的数学语言，从天气预报到材料设计都离不开它。传统数值方法需要对时空进行精细网格划分，计算成本高昂。而深度学习虽然在图像识别等领域表现出色，但面对物理问题时往往需要海量数据，缺乏对物理规律的理解。",
                "context": "近年来，机器学习在科学计算领域的应用面临两大挑战：一是数据稀缺问题——在物理实验和工程中，获取数据往往代价高昂，传统深度学习的'大数据'假设难以满足；二是可解释性困境——黑箱模型无法保证预测结果符合基本物理定律(如质量守恒、能量守恒)，导致在安全关键领域难以应用。更关键的是，物理系统中蕴含的大量先验知识(如物理方程、对称性、守恒律)在传统机器学习中被白白浪费。",
                "problem": "核心问题是，如何让神经网络在学习数据的同时，自动满足已知的物理定律？传统方法要么纯数值求解(忽略数据)，要么纯数据驱动(忽略物理)。Raissi 研究团队的切入点是利用自动微分技术，让神经网络的输出不仅拟合观测数据，还必须满足控制方程——这就是物理信息神经网络的核心思想：物理定律不再是外部约束，而是内嵌于网络训练过程的'智能正则化器'。"
            },
            "contribution": {
                "significance": "PINNs 首次把任意非线性PDE作为可微分约束嵌入损失，通过自动微分精确计算残差，实现数据与机理的端到端协同。理论上，它为PDE正反问题提供了统一的函数逼近框架；应用上，可用少量观测完成流场重建、参数反演，为实时预测、数字孪生提供轻量级求解器。",
                "method": "① 用一个前馈网络同时逼近待求场变量u(x,t)；\n\n② 将PDE左右两边差值定义残差f，通过自动微分得到∂u/∂t、∇²u等高阶导数；\n\n③ 损失函数=数据MSE + PDE残差MSE + 边界MSE，权重共享同时训练；\n\n④ 对时间依赖问题，提出连续与离散两种策略：连续型在全域采样配点，离散型借隐式Runge–Kutta把任意阶时间步长写进网络输出，实现一步大跨度预测。",
                "innovation": "① 将自动微分用于输入坐标向量求导(而非仅对参数求导)，使神经网络天然满足微分算子形式；\n\n② 物理方程残差作为正则化项，在小数据下防止过拟合；\n\n③ 离散时间模型首次实现超高阶(>100级)隐式格式，单步跨越大时间间隔。相比传统方法需数百万步迭代，PINN可一步到位，计算效率提升显著"
            },
            "validation": {
                "experiments": "研究团队在多个经典物理问题上验证了方法的有效性。在薛定谔方程(量子力学)中，仅用256个初始数据点预测复数解，相对误差仅0.2%；在Navier-Stokes方程(流体力学)中，用圆柱绕流的1%稀疏速度数据，成功识别出雷诺数(误差<5%)并重构完整压力场——尽管训练时完全没有压力观测值；在KdV方程(浅水波)中，仅用两个相隔很远的时间快照，就准确反推出方程参数(误差<0.06%)。\n\n所有案例均采用L-BFGS优化器，在单块GPU上训练时间仅几十秒至数分钟。对比传统谱方法和有限元方法，PINNs在数据稀缺场景下展现出数量级的精度优势。",
                "conclusion": "核心发现是：物理约束是比数据更强大的正则化器。当物理定律已知且方程适定时，PINNs能以极少数据逼近真实解，本质原因是物理方程将无限维的函数空间缩减到有限维的“可行解流形”上。\n\n研究还揭示，隐式高阶时间格式与神经网络的结合，可以突破经典数值方法的稳定性限制，实现“一步到位”的长时预测。这为跨尺度多物理场耦合问题提供了新思路：不再需要在每个尺度精细求解，而是让神经网络学习宏观规律的同时自动满足微观物理约束。"
            },
            "evaluation": {
                "impact": "这篇论文是PINNs领域的开山之作，截至目前引用量超过11000次，催生了整个研究方向。其学术贡献在于：提出了通用的物理嵌入框架，适用于任何可微物理定律；证明了深度学习与科学计算融合的可行性；为数据驱动建模提供了物理可解释性。\n\n应用影响遍及气候预测、航天设计、药物研发等领域，多家科技巨头已将PINNs集成到仿真平台中。",
                "limitations": "方法存在三个主要局限：其一是维度灾难，高维问题(如3D流场)需要指数级增长的配点数量，导致训练成本激增；其二是架构选择缺乏理论，网络层数、宽度、激活函数的选择仍依赖经验，不同方程最优架构差异大；其三是训练不稳定性，对于刚性方程或激波等间断解，梯度消失或爆炸问题严重，需要精心设计学习率策略。此外，方法假设物理方程已知且准确，对于未知或模型误差较大的系统效果受限。"
            }
        },
        "extension": {
            "future": "方向1-自适应配点策略：开发基于残差的动态采样算法，在解变化剧烈区域加密配点，减少总计算量。方向2-多尺度网络架构：设计编码器-解码器结构捕捉多尺度物理特征，结合小波变换处理间断解。方向3-不确定性量化：引入贝叶斯神经网络提供置信区间，使PINNs可用于安全关键决策。方向4-数据+模型混合驱动：当物理模型不完美时，自动学习修正项，平衡物理先验与数据拟合。"
        },
        "closing": {
            "summary": "PINNs将千年物理智慧注入现代AI，证明了'少即是多'——用对的约束比堆数据更有效。",
            "takeaways": "启示1：领域知识不是深度学习的障碍，而是强大的免费正则化器，可大幅降低数据需求。\n启示2：自动微分不只是训练工具，更是连接神经网络与科学方程的天然桥梁。\n启示3：经典数值方法(如Runge-Kutta)与神经网络可以深度融合，取长补短创造新范式。",
            "discussion": "你认为 PINNs 下一步最该啃或最难啃的'硬骨头‘是三维湍流、多相流界面追踪，还是其他方面？欢迎在评论区分享你的思考！"
        }
    }
];

// 页面加载完成后初始化
let filteredPapers = [...pinnsPapers];
let currentFilters = {
    researchArea: '',
    paperType: '',
    year: '',
    search: ''
};

// DOM元素
document.addEventListener('DOMContentLoaded', function () {
    initializePage();
    setupEventListeners();
    renderPapers();
});

function initializePage() {
    // 更新统计数据
    document.getElementById('paperCount').textContent = pinnsPapers.length;

    // 获取最新年份
    const latestYear = Math.max(...pinnsPapers.map(paper => {
        const year = paper.meta.date.match(/\d{4}/);
        return year ? parseInt(year[0]) : 2019;
    }));
    document.getElementById('updateTime').textContent = latestYear;
}

function setupEventListeners() {
    // 筛选器事件监听
    document.getElementById('researchAreaFilter').addEventListener('change', handleFilterChange);
    document.getElementById('paperTypeFilter').addEventListener('change', handleFilterChange);
    document.getElementById('yearFilter').addEventListener('change', handleFilterChange);
    document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 300));

    // 模态框事件监听
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('paperModal').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });
}

function handleFilterChange(e) {
    const filterId = e.target.id;
    const value = e.target.value;

    switch (filterId) {
        case 'researchAreaFilter':
            currentFilters.researchArea = value;
            break;
        case 'paperTypeFilter':
            currentFilters.paperType = value;
            break;
        case 'yearFilter':
            currentFilters.year = value;
            break;
    }

    applyFilters();
}

function handleSearch(e) {
    currentFilters.search = e.target.value.toLowerCase();
    applyFilters();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function applyFilters() {
    filteredPapers = pinnsPapers.filter(paper => {
        // 研究领域筛选
        if (currentFilters.researchArea && paper.meta.researchArea !== currentFilters.researchArea) {
            return false;
        }

        // 论文类型筛选
        if (currentFilters.paperType && paper.meta.type !== currentFilters.paperType) {
            return false;
        }

        // 年份筛选
        if (currentFilters.year) {
            const paperYear = paper.meta.date.match(/\d{4}/);
            if (!paperYear || paperYear[0] !== currentFilters.year) {
                return false;
            }
        }

        // 搜索筛选
        if (currentFilters.search) {
            const searchTerm = currentFilters.search;
            const searchableContent = [
                paper.meta.titleCN,
                paper.meta.titleEN,
                paper.meta.author,
                paper.meta.venue,
                ...paper.meta.tags
            ].join(' ').toLowerCase();

            if (!searchableContent.includes(searchTerm)) {
                return false;
            }
        }

        return true;
    });

    renderPapers();
}

function renderPapers(papers = filteredPapers) {
    const container = document.getElementById('papersContainer');

    if (papers.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>未找到相关论文</h3>
                <p>请尝试调整筛选条件或搜索关键词</p>
            </div>
        `;
        return;
    }

    const papersHTML = papers.map((paper, index) => {
        const card = createPaperCard(paper);
        return `<div style="animation-delay: ${index * 0.1}s">${card}</div>`;
    }).join('');
    container.innerHTML = `<div class="papers-grid">${papersHTML}</div>`;

    // 添加点击事件监听
    document.querySelectorAll('.paper-card').forEach(card => {
        card.addEventListener('click', function () {
            const paperId = this.dataset.paperId;
            const paper = pinnsPapers.find(p => p.meta.titleCN === paperId);
            if (paper) {
                openModal(paper);
            }
        });
    });

    // 添加标题选项点击事件
    setupTitleOptionListeners();
}

function setupTitleOptionListeners() {
    // 为标题选项添加点击事件
    document.querySelectorAll('.title-option').forEach(option => {
        option.addEventListener('click', function () {
            // 移除其他选项的激活状态
            document.querySelectorAll('.title-option').forEach(opt => opt.classList.remove('active'));
            // 添加当前选项的激活状态
            this.classList.add('active');

            // 可以在这里添加更多交互逻辑，比如显示详细信息等
            console.log('选中标题类型:', this.classList[1]);
        });
    });
}

function createPaperCard(paper, index) {
    const typeClass = paper.meta.type;
    const typeText = {
        'theory': '理论研究',
        'application': '应用研究',
        'review': '综述论文'
    }[paper.meta.type] || '研究论文';

    const tagsHTML = paper.meta.tags.split(', ').map(tag =>
        `<span class="tag ${tag.includes('PINN') ? 'pinn' : 'highlight'}">${tag}</span>`
    ).join('');

    // 创建摘要信息
    const summary = paper.closing && paper.closing.summary ? `
        <div class="paper-summary">
            <p class="summary-text">${paper.closing.summary}</p>
        </div>
    ` : '';

    // 提取年份用于显示
    const year = paper.meta.date.match(/\d{4}/) ? paper.meta.date.match(/\d{4}/)[0] : '';

    return `
        <div class="paper-card" data-paper-id="${paper.meta.titleCN}" style="animation-delay: ${index * 0.05}s">
            <!-- 卡片主体内容 -->
            <div class="paper-upper">
                <!-- 左侧封面区域 - 书籍样式 -->
                <div class="paper-cover-container">
                    <div class="paper-cover">
                        ${paper.meta.links && paper.meta.links.cover ?
            `<img src="${paper.meta.links.cover}" alt="${paper.meta.titleCN} 封面" 
                 style="display: block; width: 100%; height: 100%; object-fit: cover; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);" 
                 onload="this.style.display='block'; this.nextElementSibling.style.display='none';" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` :
            ''
        }
                        <div class="paper-cover-placeholder" ${paper.meta.links && paper.meta.links.cover ? 'style="display: none;"' : ''}>
                            <div class="cover-venue">${paper.meta.venue}</div>
                            <div class="cover-date">${year}</div>
                        </div>
                    </div>
                </div>
                
                <!-- 右侧内容区域 - 优化布局，确保核心信息优先展示 -->
                <div class="paper-content">
                    <!-- 标题区域 - 优先显示 -->
                    <div class="title-section">
                        <h3 class="paper-title">${paper.meta.titleCN}</h3>
                        <h4 class="paper-title-en">${paper.meta.titleEN}</h4>
                    </div>
                    
                    <!-- 元信息区域 - 紧凑布局 -->
                    <div class="paper-meta">
                        <div class="meta-item">
                            <div class="meta-label">作者</div>
                            <div class="meta-value">${paper.meta.author}</div>
                        </div>
                        <div class="meta-item">
                            <div class="meta-label">单位</div>
                            <div class="meta-value">${paper.meta.unit}</div>
                        </div>
                    </div>
                    
                    <!-- 标签区域 - 移至标题和元信息下方，提高信息获取效率 -->
                    <div class="paper-tags">
                        ${tagsHTML}
                    </div>
                    
                    <!-- 摘要信息 - 使用summary字段保持简洁 -->
                    ${summary}
                </div>
            </div>
            
            <!-- 底部链接区域 -->
            <div class="paper-lower">
                <div class="paper-links">
                    <a href="${paper.meta.links.paper}" class="paper-link" target="_blank">
                        <span>📄</span> 查看论文
                    </a>
                    <a href="${paper.meta.links.download}" class="paper-link" target="_blank">
                        <span>⬇️</span> 下载PDF
                    </a>
                </div>
            </div>
        </div>
    `;
}

function openModal(paper) {
    const modal = document.getElementById('paperModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalTitleEn = document.getElementById('modalTitleEn');
    const modalTags = document.getElementById('modalTags');
    const modalBody = document.getElementById('modalBody');
    const modalCover = document.getElementById('modalCover');

    // 设置封面图片 - 使用与论文卡片相同的错误处理机制
    if (paper.meta.links && paper.meta.links.cover) {
        modalCover.innerHTML = `
            <img src="${paper.meta.links.cover}" 
                 alt="论文封面" 
                 style="width: 100%; height: 100%; object-fit: cover; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
                 onload="this.style.display='block'; this.parentElement.querySelector('.paper-cover-placeholder').style.display='none';"
                 onerror="this.style.display='none'; this.parentElement.querySelector('.paper-cover-placeholder').style.display='flex';">
            <div class="paper-cover-placeholder" style="display: none;">论文封面</div>
        `;
    } else {
        modalCover.innerHTML = '<div class="paper-cover-placeholder">论文封面</div>';
    }

    // 设置标题和标签
    modalTitle.textContent = paper.meta.titleCN;
    modalTitleEn.textContent = paper.meta.titleEN;

    const tagsHTML = paper.meta.tags.split(', ').map(tag =>
        `<span class="tag ${tag.includes('PINN') ? 'pinn' : 'highlight'}">${tag}</span>`
    ).join('');
    modalTags.innerHTML = tagsHTML;

    // 构建模态框内容
    modalBody.innerHTML = createModalContent(paper);

    // 显示模态框
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createModalContent(paper) {
    const content = paper.content;
    const extension = paper.extension;
    const closing = paper.closing;

    // 创建标题选项内容
    const titleOptionsContent = paper.titles ? `
        <div class="info-section">
            <h3>标题创意</h3>
            <div class="title-options-modal">
                <div class="title-option-modal suspense">
                    <div class="title-option-header">
                        <span class="title-option-icon">🎯</span>
                        <span class="title-option-type">悬念式</span>
                    </div>
                    <p class="title-option-text">${paper.titles.suspense}</p>
                </div>
                <div class="title-option-modal value">
                    <div class="title-option-header">
                        <span class="title-option-icon">💎</span>
                        <span class="title-option-type">价值式</span>
                    </div>
                    <p class="title-option-text">${paper.titles.value}</p>
                </div>
                <div class="title-option-modal conflict">
                    <div class="title-option-header">
                        <span class="title-option-icon">⚡</span>
                        <span class="title-option-type">冲突式</span>
                    </div>
                    <p class="title-option-text">${paper.titles.conflict}</p>
                </div>
            </div>
        </div>
    ` : '';

    // 创建导语内容
    const introContent = paper.intro ? `
        <div class="info-section">
            <h3>📖 导语</h3>
            <div class="intro-modal">
                <p class="intro-text-modal">${paper.intro}</p>
            </div>
        </div>
    ` : '';

    return `
        ${titleOptionsContent}
        ${introContent}

        <div class="info-section">
            <h3>基本信息</h3>
            <div class="info-grid">
                <div class="info-item">
                    <strong>作者</strong>
                    <span>${paper.meta.author}</span>
                </div>
                <div class="info-item">
                    <strong>单位</strong>
                    <span>${paper.meta.unit}</span>
                </div>
                <div class="info-item">
                    <strong>期刊</strong>
                    <span>${paper.meta.venue}</span>
                </div>
                <div class="info-item">
                    <strong>发表时间</strong>
                    <span>${paper.meta.date}</span>
                </div>
                <div class="info-item">
                    <strong>论文类型</strong>
                    <span>${{
            'theory': '理论研究',
            'application': '应用研究',
            'review': '综述论文'
        }[paper.meta.type] || '研究论文'}</span>
                </div>
                <div class="info-item">
                    <strong>研究领域</strong>
                    <span>${paper.meta.researchArea}</span>
                </div>
            </div>
        </div>

        <div class="info-section">
            <h3>研究背景</h3>
            <div class="content-section">
                <h4>研究领域</h4>
                <p>${content.background.field}</p>
            </div>
            <div class="content-section">
                <h4>研究背景</h4>
                <p>${content.background.context}</p>
            </div>
            <div class="content-section">
                <h4>核心问题</h4>
                <p>${content.background.problem}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>主要贡献</h3>
            <div class="highlight-box">
                <h4>研究意义</h4>
                <p>${content.contribution.significance}</p>
            </div>
            <div class="content-section">
                <h4>研究方法</h4>
                <p>${content.contribution.method}</p>
            </div>
            <div class="content-section">
                <h4>创新点</h4>
                <p>${content.contribution.innovation}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>实验验证</h3>
            <div class="content-section">
                <h4>实验结果</h4>
                <p>${content.validation.experiments}</p>
            </div>
            <div class="content-section">
                <h4>研究结论</h4>
                <p>${content.validation.conclusion}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>影响评估</h3>
            <div class="content-section">
                <h4>学术影响</h4>
                <p>${content.evaluation.impact}</p>
            </div>
            <div class="content-section">
                <h4>局限性</h4>
                <p>${content.evaluation.limitations}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>未来展望</h3>
            <div class="content-section">
                <p>${extension.future}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>总结讨论</h3>
            <div class="highlight-box">
                <h4>核心总结</h4>
                <p>${closing.summary}</p>
            </div>
            <div class="content-section">
                <h4>关键收获</h4>
                <p>${closing.takeaways}</p>
            </div>
            <div class="content-section">
                <h4>互动讨论</h4>
                <p>${closing.discussion}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>论文链接</h3>
            <div class="paper-links">
                <a href="${paper.meta.links.paper}" class="paper-link" target="_blank">
                    <span>📄</span> 查看论文详情
                </a>
                <a href="${paper.meta.links.download}" class="paper-link" target="_blank">
                    <span>⬇️</span> 下载PDF全文
                </a>
            </div>
        </div>
    `;
}

function closeModal() {
    const modal = document.getElementById('paperModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 键盘事件处理
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 导出函数供全局使用
window.pinnsResearch = {
    papers: pinnsPapers,
    filteredPapers: filteredPapers,
    applyFilters: applyFilters,
    renderPapers: renderPapers
};