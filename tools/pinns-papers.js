// PINNs系列论文研究进展数据
let pinnsPapers = [
    {
        // 物理信息神经网络：解决涉及非线性偏微分方程的正向和逆向问题的深度学习框架
        "meta": {
            "titleCN": "物理信息神经网络：解决涉及非线性偏微分方程的正向和逆向问题的深度学习框架",
            "titleEN": "Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations",
            "author": "M. Raissi",
            "unit": "布朗大学应用数学系",
            "venue": "Journal of Computational Physics (计算物理学报)",
            "date": "2019年02月",
            "tags": ["深度学习", "偏微分方程", "科学计算", "物理建模", "PINN"],
            "links": {
                "paper": "https://www.sciencedirect.com/science/article/pii/S0021999118307125?via%3Dihub",
                "download": "https://www.sciencedirect.com/science/article/pii/S0021999118307125/pdfft?md5=089ff261bda4a8795ae8b0cd73dcd9d4&pid=1-s2.0-S0021999118307125-main.pdf"
            },
            "type": "theory",
            "researchArea": "理论框架"
        },
        "titles": {
            "suspense": "AI能解物理方程？这个方法颠覆传统数值计算",
            "value": "一文读懂PINN：让神经网络学会物理定律的革命性框架",
            "conflict": "不需要大数据！用物理约束训练AI的突破性思路"
        },
        "intro": "当传统数值方法遇到复杂偏微分方程时，往往需要精细的网格划分和巨大的计算成本。布朗大学Raissi团队在计算物理顶刊JCP上提出的物理信息神经网络(PINN)，通过将物理定律直接嵌入神经网络训练过程，实现了用少量数据精准求解复杂方程。这项研究不仅为科学计算带来新范式，更开启了深度学习与数学物理深度融合的新时代。",
        "content": {
            "background": {
                "field": "偏微分方程(PDE)是描述自然界物理现象的基本数学工具，从流体力学、量子力学到气候模拟都离不开它。传统求解方法如有限元、谱方法已经发展成熟，但在处理高维、强非线性问题时仍面临计算效率瓶颈。",
                "context": "近年来深度学习在图像识别、自然语言处理等领域取得突破，但在科学计算领域的应用受限于数据获取成本高昂。物理系统往往只能提供稀疏的观测数据，而标准神经网络在小数据场景下容易过拟合、缺乏泛化能力。更关键的是，黑箱式的神经网络无法保证预测结果遵守物理定律，这在科学应用中是致命缺陷。如何让AI既能从数据学习，又能尊重物理规律，成为亟待解决的核心问题。",
                "problem": "研究者面临两大挑战：一是如何在小样本场景下训练出可靠的神经网络模型？二是如何确保AI的预测遵守已知的物理定律(如质量守恒、动量守恒)？传统方法要么依赖大量数据，要么需要复杂的时空离散化。本研究的切入点在于：能否将物理方程作为正则化约束，直接嵌入神经网络的损失函数，从而用物理知识引导学习过程？"
            },
            "contribution": {
                "significance": "PINN框架的提出具有双重价值：理论上，它建立了深度学习与数学物理的桥梁，将微分算子通过自动微分技术融入神经网络架构，开创了'物理先验'指导AI学习的新范式；应用上，它能够用极少的观测数据(几百到几千个点)求解复杂PDE，预测精度可达传统方法水平，同时无需时空网格离散，在高维问题上展现巨大潜力。这为数据驱动的科学发现、模型反演、多物理场耦合模拟等提供了全新工具。",
                "method": "PINN的核心思想是构造'物理信息神经网络'，具体分为两类模型：\n\n**连续时间模型**：用神经网络u(t,x;θ)逼近未知解，通过自动微分计算偏导数，构建物理残差f(t,x;θ)=PDE左侧。损失函数包含两部分：数据拟合项(初边值条件)和物理约束项(配点上的PDE残差)。这样网络在学习数据的同时，必须满足物理方程。\n\n**离散时间模型**：利用高阶Runge-Kutta格式，将时间演化嵌入网络结构。关键创新是允许任意多级(如500级)隐式格式，实现大时间步长推进，单步即可从初态预测终态，突破传统时间步长的稳定性限制。\n\n整个流程无需手动网格划分，用L-BFGS优化器训练网络参数即可，实现端到端的方程求解。",
                "innovation": "**三大创新点**：1)将自动微分用于输入坐标求导(而非仅对参数求导)，使神经网络天然满足微分算子形式；2)物理方程残差作为正则化项，在小数据下防止过拟合；3)离散时间模型首次实现超高阶(>100级)隐式格式，单步跨越大时间间隔。相比传统方法需数百万步迭代，PINN可一步到位，计算效率提升显著。"
            },
            "validation": {
                "experiments": "研究团队在多个经典物理问题上验证了方法有效性：\n\n**薛定谔方程**(量子力学)：仅用50个初值点+20000个配点，预测相对误差仅1.97×10⁻³，准确捕捉非线性波传播的复杂行为。\n\n**Navier-Stokes方程**(流体力学)：从圆柱绕流的速度场稀疏观测(仅1%数据)，同时识别粘度系数(误差0.078%)和重构整个压力场，尽管训练时完全没有压力数据！\n\n**KdV方程**(浅水波)：仅用两个相隔0.8秒的快照，识别方程参数误差<0.03%，展现了在时间稀疏数据下的强大能力。所有实验在噪声数据(1-10%噪声)下仍保持鲁棒性。",
                "conclusion": "PINN证明了物理约束可以作为强有力的归纳偏置，让神经网络在极少数据下实现高精度预测。更重要的发现是：网络不仅能求解正问题(给定方程求解)，还能解决逆问题(从数据中发现未知参数)，开辟了数据驱动的物理定律发现新途径。研究表明，AI与物理的结合不是简单叠加，而是互相赋能的范式创新。"
            },
            "evaluation": {
                "impact": "**学术影响**：论文已成为PINN领域的奠基之作，被引超过11000次，催生了系列后续研究。**应用前景**：在流体动力学、材料科学、生物医学等领域展现应用潜力，如湍流建模、药物扩散预测、地震波反演等。特别是在昂贵实验/模拟场景下，能用少量观测快速建立代理模型，加速科学发现过程。",
                "limitations": "论文也坦诚指出三点局限：1)网络架构设计(深度、宽度)缺乏理论指导，需要试错；2)高维问题配点数量指数增长，连续时间模型面临维度灾难(虽离散时间模型部分缓解)；3)优化可能陷入局部最优，尽管实践中问题不大，但缺乏收敛性理论保证。此外，对于非唯一解或病态问题，方法有效性仍需探索。"
            }
        },
        "extension": {
            "future": "作者提出的未来方向包括：1)**不确定性量化**：采用贝叶斯方法给出预测置信区间；2)**自适应采样**：动态选择配点位置提升效率；3)**多尺度/多物理场耦合**：处理跨尺度问题如湍流-化学反应耦合；4)**实时预测控制**：用于模型预测控制系统。从学术角度，理解PINN为何在小数据下有效、如何避免梯度消失、与传统数值方法的理论联系等问题，都值得深入研究。这些方向既有理论价值，也对工业应用至关重要。"
        },
        "closing": {
            "summary": "PINN用物理定律约束神经网络，实现了小数据高精度求解偏微分方程的突破。",
            "takeaways": "**几个关键启示**：\n1. 领域知识(物理定律)可以作为强正则化，突破深度学习的数据饥渴\n2. 自动微分不仅能求参数梯度，更能表达物理算子，是AI与科学计算融合的关键技术\n3. 高阶隐式时间格式在神经网络框架下可以实用化，打破传统数值方法的稳定性桎梏\n4. 正逆问题统一框架：同一套方法既能预测又能发现规律",
            "discussion": "**开放讨论**：如果你的研究领域也面临'小数据、强物理约束'的场景，PINN是否能带来新思路？当物理方程本身不完全已知时(如湍流、生物系统)，如何设计混合驱动的框架？欢迎在评论区分享你的思考！"
        }
    },
    {
        // 基于物理增强神经网络材料模型的功能梯度晶格结构多尺度拓扑优化
        "meta": {
            "titleCN": "基于物理增强神经网络材料模型的功能梯度晶格结构多尺度拓扑优化",
            "titleEN": "Multiscale topology optimization of functional gradient lattice structures based on physically enhanced neural network material models",
            "author": "刘洋",
            "unit": "四川大学",
            "venue": "Computer Methods in Applied Mechanics and Engineering",
            "date": "2025年12月",
            "tags": ["拓扑优化", "增材制造", "神经网络", "功能梯度材料", "晶格结构"],
            "links": {
                "paper": "https://www.x-mol.com/paper/1891400486027354112",
                "download": "https://www.x-mol.com/paper/1891400486027354112"
            },
            "type": "application",
            "researchArea": "拓扑优化"
        },
        "titles": {
            "suspense": "神经网络如何突破传统材料优化的极限? 一种全新的设计框架揭开了答案！",
            "value": "这项研究为增材制造中的功能梯度晶格结构优化提供了前所未有的设计策略！",
            "conflict": "打破传统拓扑优化的限制，基于物理增强神经网络的设计方法或许将改变一切！"
        },
        "intro": "增材制造为我们提供了前所未有的设计自由，但如何在这些自由中找到最优的结构？新研究通过一种全新的基于物理增强神经网络的拓扑优化方法，解决了功能梯度晶格结构设计中的多个难题。通过结合物理规律和神经网络，它为复杂的材料优化提供了一条更精准、更高效的路径，掀起了设计优化领域的新风潮。想知道这背后的突破性方法吗？",
        "content": {
            "background": {
                "field": "拓扑优化、神经网络、增材制造",
                "context": "随着增材制造技术的进步，越来越多的复杂结构可以通过3D打印制造，功能梯度晶格结构因其优异的刚度重量比、热导性和能量吸收性能，成为了研究热点。然而，传统的拓扑优化方法在处理复杂多孔结构时往往计算资源消耗大，且优化效果有限。",
                "problem": "尽管已有的拓扑优化方法有所进展，但如何在保证结构性能的同时，提高计算效率，并能处理更复杂的材料梯度，仍然是一个亟待解决的问题。现有的基于密度的优化方法，往往受到制造约束和计算能力的双重制约。"
            },
            "contribution": {
                "significance": "本研究提出了一种新型的多尺度拓扑优化框架，通过引入物理增强神经网络（PANN）材料模型，成功将拓扑优化与材料性能优化结合。该方法不仅提升了优化计算的效率，还确保了结构在制造过程中的可行性，为功能梯度材料的设计开辟了新天地。此框架具有广泛的应用潜力，尤其在航空航天和汽车等领域。",
                "method": "研究首先提出了一种新的松弛优化问题，将拓扑优化与相对密度梯度优化问题结合。随后，引入了一个基于物理增强神经网络的材料模型，通过计算均匀化生成训练数据，进一步提升了计算精度。在优化过程中，设计变量与相对密度梯度的同步优化，使得最终设计在保证强度的同时，具备极高的材料利用率。整个过程可以通过标准的梯度算法高效实现，为工程应用提供了全新的解决方案。",
                "innovation": "1. 提出了一种新颖的基于物理增强神经网络的材料模型，提升了拓扑优化计算效率；\n2. 结合相对密度梯度与拓扑优化，实现了更符合实际制造要求的设计；\n3. 提供了二维和三维的验证示例，展现了方法的广泛适用性。"
            },
            "validation": {
                "experiments": "通过对二维和三维结构（如MBB梁、悬臂梁、喷气发动机支架）的优化计算，结果表明该方法在优化结构的刚度与重量比方面具有显著优势。例如，在MBB梁优化中，结构的刚度提升了超过35%。实验表明，基于PANN的优化方法能够有效处理功能梯度材料的设计问题，并在保证材料利用率的同时，显著提高结构性能。",
                "conclusion": "本研究成功地通过将物理增强神经网络与拓扑优化结合，提出了一种创新的框架，能够在多孔材料设计中实现性能优化。该方法不仅提高了优化效率，还能处理更加复杂的设计需求，为未来的增材制造技术提供了坚实的基础。"
            },
            "evaluation": {
                "impact": "该研究为功能梯度材料的设计和增材制造的拓扑优化提供了全新的思路，尤其在航空航天、汽车及其他高性能工程材料的设计中具有广泛的应用前景。通过提高计算效率与设计精度，它有助于推动智能制造技术的发展。",
                "limitations": "尽管该方法在许多工程案例中取得了良好效果，但在更大规模的复杂结构优化中，可能仍需要进一步提高计算效率。此外，如何结合实际生产中的约束条件进行更精细的优化，仍然是未来研究的一个重要方向。"
            }
        },
        "extension": {
            "future": "1. 将该方法扩展到多尺度结构的实时优化中，提升其对实际工程问题的适应性；\n2. 结合更广泛的材料模型，探索更多种类的功能梯度材料设计；\n3. 深入研究如何在多物理场耦合问题中，进一步提升拓扑优化的精度与效率；\n4. 结合AI与机器学习技术，进一步优化神经网络的性能，实现更加智能化的结构设计。"
        },
        "closing": {
            "summary": "基于物理增强神经网络的多尺度拓扑优化方法为复杂材料设计提供了新的思路，并有效提高了设计的效率与精度。",
            "takeaways": "1. 物理增强神经网络助力材料优化；\n2. 结合拓扑优化与材料梯度设计，实现高效制造；\n3. 多领域工程设计的突破性进展。",
            "discussion": "你认为，AI在增材制造中的应用会如何影响未来的工程设计？是否能在更多领域实现突破性应用？"
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
        return year ? parseInt(year[0]) : 2024;
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

function renderPapers() {
    const container = document.getElementById('papersContainer');

    if (filteredPapers.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>未找到相关论文</h3>
                <p>请尝试调整筛选条件或搜索关键词</p>
            </div>
        `;
        return;
    }

    const papersHTML = filteredPapers.map(paper => createPaperCard(paper)).join('');
    container.innerHTML = `<div class="papers-grid">${papersHTML}</div>`;

    // 添加点击事件监听
    document.querySelectorAll('.paper-card').forEach(card => {
        card.addEventListener('click', function () {
            const paperId = this.dataset.paperId;
            const paper = pinnsPapers.find(p => p.meta.titleCN === paperId);
            if (paper) {
                showPaperModal(paper);
            }
        });
    });
}

function createPaperCard(paper) {
    const typeClass = paper.meta.type;
    const typeText = {
        'theory': '理论研究',
        'application': '应用研究',
        'review': '综述论文'
    }[paper.meta.type] || '研究论文';

    const tagsHTML = paper.meta.tags.map(tag =>
        `<span class="tag ${tag.includes('PINN') ? 'pinn' : 'highlight'}">${tag}</span>`
    ).join('');

    return `
        <div class="paper-card" data-paper-id="${paper.meta.titleCN}">
            <div class="paper-type ${typeClass}">${typeText}</div>
            <div class="paper-upper">
                <div class="paper-cover-container">
                    <div class="paper-cover">
                        <div class="paper-cover-placeholder">
                            ${paper.meta.venue}<br>
                            <small>${paper.meta.date}</small>
                        </div>
                    </div>
                </div>
                <div class="paper-content">
                    <h3 class="paper-title">${paper.meta.titleCN}</h3>
                    <h4 class="paper-title-en">${paper.meta.titleEN}</h4>
                    <div class="paper-meta">
                        <div class="meta-item">
                            <div class="meta-label">作者</div>
                            <div class="meta-value">${paper.meta.author}</div>
                        </div>
                        <div class="meta-item">
                            <div class="meta-label">单位</div>
                            <div class="meta-value">${paper.meta.unit}</div>
                        </div>
                        <div class="meta-item">
                            <div class="meta-label">期刊</div>
                            <div class="meta-value">${paper.meta.venue}</div>
                        </div>
                    </div>
                    <div class="paper-tags">
                        ${tagsHTML}
                    </div>
                </div>
            </div>
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

function showPaperModal(paper) {
    const modal = document.getElementById('paperModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalTitleEn = document.getElementById('modalTitleEn');
    const modalTags = document.getElementById('modalTags');
    const modalBody = document.getElementById('modalBody');

    // 设置标题和标签
    modalTitle.textContent = paper.meta.titleCN;
    modalTitleEn.textContent = paper.meta.titleEN;

    const tagsHTML = paper.meta.tags.map(tag =>
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

    return `
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