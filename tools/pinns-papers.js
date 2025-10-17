// Markdown格式处理函数 - 将Markdown格式转换为HTML格式
function processMarkdown(text) {
    if (!text) return '';

    console.log('原始文本:', text);

    // 处理加粗格式 **文本** -> <strong>文本</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 处理换行格式
    // 先将双换行替换为段落分隔符
    text = text.replace(/\n\n/g, '||PARAGRAPH||');

    // 将单换行替换为HTML换行
    text = text.replace(/\n/g, '<br>');

    // 将段落分隔符替换为段落标签
    text = text.replace(/\|\|PARAGRAPH\|\|/g, '</p><p>');

    // 确保文本被段落标签包裹
    if (!text.startsWith('<p>')) {
        text = '<p>' + text + '</p>';
    }

    console.log('处理后文本:', text);

    return text;
}



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
    },
    {
        // ===== 元信息 ===== 
        "meta": {
            "titleCN": "守恒型物理信息神经网络在离散域上的守恒定律：应用于正向和逆向问题",
            "titleEN": "Conservative physics-informed neural networks on discrete domains for conservation laws: Applications to forward and inverse problems",
            "author": "Ameya D. Jagtap",
            "unit": "美国布朗大学应用数学系",
            "venue": "Computer Methods in Applied Mechanics and Engineering",
            "date": "2020年6月",
            "tags": "科学机器学习, 守恒律, 域分解, PINNs拓展, 并行计算",
            "links": {
                "paper": "https://www.sciencedirect.com/science/article/pii/S0045782520302127?via%3Dihub",
                "download": "https://www.jianguoyun.com/p/DY2wPusQ7P3jDRj4s5UGIAA",
                "cover": "https://ars.els-cdn.com/content/image/1-s2.0-S0045782520X00053-cov200h.gif"
            },
            "coverFallback": "https://via.placeholder.com/100x140/4a90e2/ffffff?text=CMAME"
        },
        "titles": {
            "suspense": "PINNs遇到激波就崩溃？布朗团队用'分而治之'破解守恒难题！",
            "value": "从单网络到多网络：一文看懂如何让PINNs'守住'物理守恒律",
            "conflict": "扔掉全局网格，每个区域独立训练——这支团队让AI学会'因地制宜'！"
        },
        // ===== 导语(80-120字) ===== 
        "intro": "当PINNs遇到激波、不连续解等复杂守恒律问题时，单一神经网络往往力不从心。布朗大学Jagtap团队在计算力学顶刊CMAME上提出的守恒型物理信息神经网络(cPINN)，通过域分解策略让每个子区域使用专属网络，并在界面强制守恒量连续。这项研究不仅大幅提升了PINNs求解守恒律方程的精度，更为科学计算中的并行化和多尺度问题提供了新思路。",
        "content": {
            "background": {
                "field": "守恒律是自然界的基本规律，质量守恒、动量守恒、能量守恒支配着从流体流动到天气演变的一切过程。这些守恒律可以用偏微分方程(PDE)来描述，比如描述激波的Euler方程、描述流体的Navier-Stokes方程。传统数值方法虽然能求解，但面对复杂几何、多尺度现象时计算成本极高。",
                "context": "2019年Raissi提出的物理信息神经网络(PINNs)为PDE求解带来了革命性思路，但很快研究者发现了两个致命弱点：其一是精度瓶颈——对于陡峭梯度、激波等不连续解，单一神经网络难以准确捕捉，误差往往停留在10⁻⁵量级无法下降；其二是训练成本——对于高维、长时间问题，全局网络的训练非常耗时，尤其是解在不同区域复杂度差异巨大时，全局统一的网络架构显得'大材小用'或'小马拉大车'。更关键的是，PINNs虽然嵌入了物理方程，但对于守恒律这类特殊方程，并没有显式保证守恒量(如通量)在空间中的连续性。",
                "problem": "核心矛盾在于：物理问题往往具有区域异质性(如激波只在局部出现、边界层很薄)，但PINNs用单一网络覆盖整个求解域，无法灵活适配。研究团队的洞察是：能否借鉴传统数值方法中的域分解思想，将计算域拆成多个子域，每个子域用独立的神经网络，然后通过物理约束(守恒量连续性)把它们'缝合'起来？这就是cPINN的核心理念——让AI学会'因地制宜'，在简单区域用浅网络快速求解，在复杂区域用深网络精细刻画。"
            },
            "contribution": {
                "significance": "cPINN首次将域分解与守恒量约束深度融合到PINNs框架中，为守恒律方程提供了精度更高、灵活性更强的求解范式。理论上，它通过在界面强制通量连续性，确保了全局守恒性这一物理本质；应用上，多网络架构天然支持并行计算，每个子域可以分配到不同计算节点，大幅降低训练时间。这为复杂工程问题(如高速流动、多相流)的实时预测提供了可行路径。",
                "method": "cPINN的工作流程可以分为四步：\n\n① **域分解**：将计算域Ω分割成若干不重叠的子域Ω₁, Ω₂, ...，分割可以是规则的(如网格状)，也可以是不规则的(如沿激波位置划分)。关键是根据解的先验知识(如哪里有陡峭梯度)进行智能划分。\n\n② **子网络构建**：每个子域Ωᵢ配备独立的神经网络uᵢ(x,t;θᵢ)，网络的深度、宽度、激活函数都可以不同。比如在激波区域用6层深网络，在平滑区域用2层浅网络。研究团队还引入了自适应激活函数(在每层激活函数前乘以可学习的缩放因子)来加速收敛。\n\n③ **守恒约束缝合**：这是cPINN的灵魂。在相邻子域的公共界面上，必须满足两个条件——通量连续性(Flux Continuity)和解的平均值匹配。具体来说，如果Ωᵢ和Ωⱼ相邻，在界面Γᵢⱼ上要强制：Fᵢ·n = Fⱼ·n(法向通量相等)，且(uᵢ + uⱼ)/2 = 界面值。前者保证守恒，后者加速收敛。\n\n④ **联合优化**：损失函数包含三部分——初边值条件MSE、PDE残差MSE、界面条件MSE。关键是界面项的权重wᵢₙₜ可以调节，研究发现适当增大界面权重可以显著提升收敛速度。所有子网络参数{θ₁, θ₂, ...}联合优化，但每个子网络可以异步更新，天然支持并行。",
                "innovation": "① **物理驱动的域分解**：不是机械地均匀划分，而是根据守恒律的特点(如双曲方程沿特征线传播)和解的结构(如激波位置)进行自适应划分。在二维Burgers方程案例中，他们用不规则的三子域划分成功捕捉了斜激波；\n\n② **强形式界面约束**：传统有限元中的mortar方法用弱形式耦合，而cPINN直接在配点上强制通量相等，实现了真正的'点对点'守恒。这比vanilla PINNs的全局残差最小化更符合守恒律本质；\n\n③ **异构网络架构**：在12子域的Navier-Stokes算例中，不同子域的网络层数从2层到6层不等，残差点数从200到10000不等。这种灵活性让网络能够'精准打击'复杂区域，避免过度参数化导致的过拟合和欠参数化导致的表达力不足；\n\n④ **并行友好设计**：子网络的部分独立性(只通过界面耦合)使得训练可以分布到多个GPU，每个负责一个子域。虽然论文中没有实现并行，但架构已经铺好了路。"
            },
            "validation": {
                "experiments": "研究团队在六类经典守恒律问题上验证了cPINN的有效性，从一维到三维、从平滑解到不连续解、从正问题到逆问题全覆盖。\n\n在**一维Burgers方程**(粘性系数0.01，陡峭冲击)中，4子域cPINN的相对L²误差在各子域均保持在0.005-0.06之间，而同参数量的单网络PINN误差高达0.15。强制界面平均值约束后，收敛速度提升约3倍。\n\n在**KdV方程**(色散波传播)中对比最为惊艳：PINN完全失败(点误差达0.5以上)，而2子域cPINN准确捕捉所有色散波结构，点误差仅0.005。原因是cPINN在界面提供的额外通量信息起到了'中继站'作用，阻止了误差在全域扩散。\n\n在**可压Euler方程**(马赫2斜激波)中，12子域均匀划分的密度场相对误差7.5%，而3子域沿激波方向不规则划分的误差降至0.8%——证明智能域分解比暴力堆子域更有效。\n\n**逆问题**方面，在二维无粘Burgers方程中，cPINN从含1%噪声的数据成功识别出粘性系数μ(真值为0)，误差仅0.0002，而PINN在噪声下容易陷入局部最优。\n\n所有算例均在单GPU上训练，迭代次数1.5万至50万不等，训练时间从几分钟到数小时。相比传统谱方法，cPINN的优势在于无需网格生成、自动适配复杂几何。",
                "conclusion": "核心发现有三点：第一，域分解+守恒约束是破解PINNs精度瓶颈的有效策略，尤其对于不连续解和多尺度问题。界面的通量连续性不仅是物理要求，更是阻断误差传播的'防火墙'。\n\n第二，子网络的异构性(不同架构、超参数)大幅提升了网络的表达能力和训练效率。这印证了'No Free Lunch'定理——没有单一最优网络，最好的策略是让问题本身决定网络结构。\n\n第三，强制界面平均值虽然在物理上不是必需的(对于连续解来说冗余)，但在实践中起到了正则化作用，防止相邻子网络的预测'撕裂'。这揭示了数值稳定性与物理一致性的微妙平衡：有时'过度约束'反而有益。\n\n研究还发现，cPINN的误差来源有三：近似误差(网络表达力)、泛化误差(配点分布)、优化误差(局部极小值)，它们在不同子域相互耦合。未来需要理论工具分析这种跨域误差传播机制。"
            },
            "evaluation": {
                "impact": "这篇论文是PINNs域分解方向的奠基之作，引用量已达783次，直接催生了XPINNs(时空域分解)、hp-VPINNs(变分域分解)等后续工作。其学术贡献在于：证明了守恒律的特殊结构(通量形式)可以显式编码到神经网络训练中；提出了物理嵌入与域分解协同的新范式；为PINNs的并行化打开了大门。\n\n工程影响方面，cPINN已被应用于航空航天(跨声速流动)、能源(多相流)、气候(海洋模拟)等领域。其灵活的多网络架构特别适合工业场景中'局部复杂、整体简单'的问题，可大幅降低计算成本。",
                "limitations": "方法存在四个主要局限：第一，域分解策略仍依赖人工经验，如何自动识别最优划分(子域数量、形状、界面位置)缺乏理论指导，目前只能靠试错；第二，界面权重的选择是敏感超参数，设置不当会导致界面处振荡或收敛缓慢，需要针对不同方程精心调参；第三，虽然架构支持并行，但论文未实现真正的分布式训练，通信开销和负载均衡问题尚未解决；第四，对于三维高雷诺数湍流等极端复杂问题，即使用cPINN仍面临维度灾难——子域数量指数增长导致界面条件难以管理。此外，方法假设子域界面不随时间变化(欧拉网格)，对于运动边界、相变等拉格朗日问题需要进一步扩展。"
            }
        },
        "extension": {
            "future": "① **自适应域分解算法**：开发基于残差估计的动态划分策略，训练过程中自动增删子域或调整界面位置，类似于传统数值方法中的自适应网格加密(AMR)技术，但完全数据驱动；\n\n② **分层域分解架构**：对于多尺度问题，设计粗细两层分解——粗层捕捉全局趋势，细层聚焦局部结构，类似多重网格法的思想，但用神经网络替代传统插值；\n\n③ **物理引导的元学习**：构建元网络来自动预测给定PDE的最优子域数、网络架构、界面权重，将cPINN的'艺术性'调参转化为可学习的策略；\n\n④ **异步并行训练框架**：实现真正的分布式cPINN，每个子域在独立节点训练，通过梯度聚合或界面信息交换实现全局协调，挑战在于如何高效同步界面条件避免通信瓶颈。"
        },
        "closing": {
            "summary": "cPINN用'分而治之'思想让AI学会守恒——多网络协作比单打独斗更接近物理真相。",
            "takeaways": "① 物理约束不只是全局方程残差，界面上的守恒量连续性同样重要，它是连接局部与整体的关键纽带；\n\n② 深度学习中的'一刀切'架构往往低效，根据问题结构设计异构网络才是正道，这需要领域知识与数据双驱动；\n\n③ 域分解不是传统数值方法的专利，神经网络时代同样需要'化整为零'，但分解策略可以更灵活、更物理导向。",
            "discussion": "你觉得cPINN的下一个突破口是自动域分解算法，还是三维湍流等超高维问题的扩展，亦或是与传统CFD软件的混合求解器？欢迎在评论区分享你的观点！如果你是PINNs研究者，cPINN的哪个创新点对你最有启发？"
        }
    },
    {
        // ===== 元信息 ===== 
        "meta": {
            "titleCN": "hp-VPINNs：基于域分解的变分物理信息神经网络",
            "titleEN": "hp-VPINNs: Variational physics-informed neural networks with domain decomposition",
            "author": "Ehsan Kharazmi",
            "unit": "美国布朗大学应用数学系",
            "venue": "Computer Methods in Applied Mechanics and Engineering",
            "date": "2021年2月",
            "tags": "科学机器学习, 变分方法, 域分解, hp-refinement, Petrov-Galerkin",
            "links": {
                "paper": "https://www.sciencedirect.com/science/article/pii/S0045782520307325?via%3Dihub",
                "download": "https://www.jianguoyun.com/p/DUkXZh4Q7P3jDRjZt5UGIAA",
                "cover": "https://ars.els-cdn.com/content/image/X00457825.jpg"
            },
            "coverFallback": "https://via.placeholder.com/100x140/4a90e2/ffffff?text=CMAME"
        },
        "titles": {
            "suspense": "PINNs遇到角点奇异就崩溃？这个变分版本让AI'会算积分'了！",
            "value": "从配点到变分：一文看懂如何让神经网络像有限元一样'优雅'",
            "conflict": "扔掉残差配点，用数学测试函数——布朗团队让PINNs进入'变分时代'！"
        },
        // ===== 导语(80-120字) ===== 
        "intro": "当PINNs遇到激波、角点奇异性等粗糙解时，传统的配点法常常力不从心。布朗大学Kharazmi团队在计算力学顶刊CMAME上提出的hp-变分物理信息神经网络(hp-VPINNs)，将经典有限元的Petrov-Galerkin思想引入深度学习——用高阶多项式做测试函数，通过分部积分降低对解的光滑性要求。这项研究不仅让PINNs的精度提升数个量级，更为处理不连续解和奇异性问题提供了数学上更'优雅'的解决方案。",
        "content": {
            "background": {
                "field": "数值求解偏微分方程(PDE)有两大经典流派：配点法(在特定点上强制满足方程)和变分法(在函数空间上寻求最优解)。传统有限元属于变分法，PINNs则采用配点法。配点法简单直接，但对不光滑解(如激波、角点奇异性、边界层)的处理能力有限，因为它要求解足够光滑才能计算高阶导数。",
                "context": "自2019年PINNs问世以来，研究者发现了一个尴尬问题：当方程的解出现陡峭梯度或不连续时，配点法的表现急剧恶化。更致命的是，如果使用ReLU激活函数，二阶导数根本不连续，配点法完全失效。2019年同团队提出的VPINN尝试用全局多项式做测试函数，但全局测试函数对局部特征(如激波)的刻画不够精细，且无法利用域分解的优势。核心矛盾在于：如何既保留神经网络的全局表达能力，又获得有限元方法处理粗糙解的鲁棒性？",
                "problem": "问题的关键在于测试函数的选择。配点法等价于用Dirac delta函数(即点采样)做测试，这要求解在采样点处足够光滑。研究团队的洞察是：能否借鉴有限元的Petrov-Galerkin框架，用分段高阶多项式做测试函数？这样既可以通过分部积分降低微分算子的阶数(从而放松光滑性要求)，又可以通过hp-refinement(h是网格细化，p是多项式阶数提升)灵活适配解的局部特征。这就是hp-VPINNs的核心理念——让神经网络像有限元一样'会做变分'。"
            },

            "contribution": {
                "significance": "hp-VPINNs首次将子域Petrov-Galerkin方法系统引入物理信息神经网络，实现了试探空间(全局神经网络)与测试空间(局部分段多项式)的完美解耦。理论上，它通过变分形式和分部积分，将对解的光滑性要求从C²降至C¹甚至L²，使得处理粗糙解成为可能；应用上，hp-refinement机制可以在陡峭区域加密子域或提升多项式阶数，实现自适应高精度求解。这为科学计算中的奇异性问题、多尺度问题提供了深度学习的新范式。",
                "method": "hp-VPINNs的核心是一个精妙的'测试-试探'分离设计，可分四步理解：\n\n① **全局试探 + 局部测试**：用一个全局定义的深度神经网络u_θ(x)作为试探解，但测试函数v_i(x)只在子域Ω_i上非零，在其他子域为0。这种设计让优化可以'聚焦'到局部，但最终拼出的是全局解。\n\n② **变分残差构建**：不是直接计算PDE残差R(u)=Lu-f在配点上的值，而是计算积分⟨R(u), v_i⟩。关键是这个积分可以分部积分：比如对Poisson方程-Δu=f，可以写成⟨∇u, ∇v_i⟩-⟨f, v_i⟩，微分算子从二阶降到一阶！这意味着即使u只有一阶导连续，方法依然有效。\n\n③ **hp-refinement策略**：h-refinement是将计算域分成更多更小的子域(如在激波处加密)；p-refinement是在每个子域使用更高阶的Legendre或Chebyshev多项式作为测试函数。研究团队提供了基于点残差值的自适应划分策略：哪里残差大就在哪里细化。\n\n④ **数值积分实现**：变分残差中的积分用Gauss积分计算。关键技巧是用TensorFlow的自动微分计算神经网络输出的梯度(∇u_θ)，然后与多项式测试函数的梯度做内积。对于浅层网络，甚至可以解析计算这些积分，完全消除数值积分误差。",
                "innovation": "① **Petrov-Galerkin框架**：不同于PINN的Galerkin方法(试探=测试)或配点法，hp-VPINNs采用Petrov-Galerkin(试探≠测试)。试探空间是神经网络(全局、非线性、高表达力)，测试空间是分段多项式(局部、正交、易积分)，取长补短；\n\n② **分部积分降阶**：提出三种变分形式(L0/L1/L2)对应0/1/2次分部积分。L2形式将二阶PDE转化为只需一阶导数的弱形式，这意味着可以用ReLU等非光滑激活函数，突破了PINN的激活函数限制；\n\n③ **局部学习的外推能力**：意外发现当只在子域Ω_i训练时，网络不仅学到了u(x)在Ω_i上的值，还'顺便'学到了导数信息，使其能在Ω_i边界外一定范围内保持精度。这揭示了变分方法的隐含正则化作用；\n\n④ **自适应hp-refinement**：根据点残差分布自动决定在哪里细化(h)、用多高阶多项式(p)。在L型域角点奇异性案例中，通过非均匀35子域划分，将角点误差从10⁻¹降至10⁻³。"
            },

            "validation": {
                "experiments": "研究团队设计了从函数逼近到PDE求解的全方位测试，重点验证对粗糙解的处理能力。\n\n**函数逼近**：对于含跳跃间断的分段函数(跳幅6)，单域VNN误差10⁻¹，而3子域局部VNN在间断处误差降至10⁻²。傅里叶域分析显示，多子域设置能同时学习低频平滑部分和高频间断部分。\n\n**一维Poisson方程**：对陡峭解(exp(-100x²))，单域VPINN点误差10⁻²，3子域hp-VPINN降至10⁻³，相比PINN(误差10⁻¹)提升两个量级。对边界层解，hp-VPINN误差10⁻⁴，而PINN需要精心调整边界权重才能达到10⁻³。\n\n**二维L型域**：这是测试角点奇异性的经典算例。PINN在角点(0,0)误差最大达0.15；粗网格(3子域)hp-VPINN降至0.08；细网格(35子域非均匀划分)进一步降至0.03。对比谱元法基准解，hp-VPINN在内域精度更高。\n\n**逆问题**：对流扩散方程中，仅用15个时空稀疏观测点，hp-VPINN成功识别扩散系数κ(真值0.01，预测0.0098±0.0003)，10次随机实验的标准差极小，证明方法鲁棒性。\n\n**间断解**：对流方程的双跳初值(类似矩形波)，8层网络的hp-VPINN准确捕捉间断传播，而PINN在间断处出现明显振荡(Gibbs现象)。",
                "conclusion": "核心发现有三：第一，变分形式通过分部积分本质上是在'交易'——用牺牲测试函数的光滑性换取对试探解光滑性要求的降低。这使得hp-VPINNs可以处理PINN无法胜任的粗糙解问题。\n\n第二，hp-refinement不是简单的网格加密，而是一种'物理感知'的自适应策略。通过残差指示器识别'问题区域'(如激波、奇异点)后定向加密，效率远高于均匀细化。在不对称陡峭解案例中，即使不知道陡峭位置，通过逐步h-refinement也能自动'找到'它。\n\n第三，局部测试函数的正交性带来了意外的好处——即使只在子域Ω_i训练，网络在Ω_i边界外也能保持一定精度(称为'learning out-of-the-box')。这源于变分形式隐含地正则化了解的导数，使其满足一定的连续性。这一发现为设计重叠域分解方法提供了理论依据。\n\n研究还揭示了测试函数选择的微妙性：Legendre多项式适合光滑解(收敛快)，Chebyshev多项式适合边界层(端点加密)。对于间断解，低阶多项式反而更稳定(高阶容易产生Runge现象)。最优选择需要根据解的结构动态调整，这正是未来自适应策略的关键。"
            },

            "evaluation": {
                "impact": "这篇论文是PINNs变分方向的里程碑之作，引用量已达507次，直接推动了变分框架在科学机器学习中的应用。其学术贡献在于：首次系统建立了子域Petrov-Galerkin框架下的物理信息神经网络理论；证明了分部积分可以显著放松对解的正则性要求；提供了hp-refinement的完整实现和自适应策略。\n\n工程影响方面，hp-VPINNs特别适合结构力学(角点应力集中)、断裂力学(裂纹尖端奇异性)、湍流(间歇性)等含奇异性的问题。代码开源(GitHub: ehsankharazmi/hp-VPINNs)促进了方法的快速传播，多个后续工作在此基础上发展了快速变分PINNs(FastVPINNs)、保守变分PINNs等。",
                "limitations": "方法存在四个主要局限：第一，变分形式引入了积分计算，虽然可用Gauss积分但仍增加计算成本。高维问题(如3D)需要张量积积分点，数量随维度指数增长，可能抵消精度优势；第二，hp-refinement策略仍高度依赖经验：何时h-refinement、何时p-refinement、如何平衡两者，缺乏自动化判据；第三，测试函数的选择(Legendre vs Chebyshev、阶数p)对结果影响大，但最优选择的理论尚不完善；第四，方法假设子域界面可以自由划分，但对于运动界面(如相变、流固耦合)需要额外处理。此外，虽然理论上支持并行(每个子域独立优化)，但论文未实现真正的分布式训练，通信和同步机制有待完善。"
            }
        },

        "extension": {
            "future": "① **自适应测试函数选择**：开发基于后验误差估计的自动选择策略——对于光滑区域用高阶Legendre多项式，对于边界层用Chebyshev多项式，对于间断区域用低阶分段常数。可借鉴自适应有限元的残差型或梯度恢复型误差指示器；\n\n② **变分-配点混合方法**：在光滑区域用配点法(计算便宜)，在粗糙区域用变分法(精度高)，通过残差动态切换。这种混合策略可以平衡精度和效率，类似于多重网格中的粗细网格配合；\n\n③ **基于物理的hp决策**：不仅根据数值残差，还根据物理量的特征(如应力张量的特征值、速度梯度张量的不变量)来决定hp-refinement。例如在激波处自动触发h-refinement，在平滑区域自动提升p阶；\n\n④ **变分神经算子**：将hp-VPINN的思想推广到算子学习——用神经网络逼近PDE的解算子，但在测试阶段用变分形式评估。这可以结合DeepONet和VPINNs的优势，实现快速且精确的参数化PDE族求解。"
        },

        "closing": {
            "summary": "hp-VPINNs用'变分思维'重构PINNs——全局试探+局部测试，让AI既会微分又会积分。",
            "takeaways": "① 变分不是配点的替代，而是互补——变分适合粗糙解、奇异性，配点适合光滑解、快速原型。选择方法要'因解制宜'；\n\n② 分部积分是数学的魔法——它不仅简化计算，更本质地降低了对解的光滑性要求，这是处理不连续问题的关键；\n\n③ hp-refinement体现了'局部精细+全局统筹'的智慧——不是一刀切地增加复杂度，而是在需要的地方投入资源，这也是自适应方法的核心哲学。",
            "discussion": "你觉得变分PINNs和配点PINNs，哪个更有发展潜力？是变分的数学优雅性会胜出，还是配点的计算简洁性更实用？如果你是PINNs研究者，hp-VPINNs的哪个技术细节最启发你？欢迎在评论区分享你的看法！"
        }
    },

    {
        "meta": {
            "titleCN": "fPINNs：分数物理信息神经网络",
            "titleEN": "fPINNs: FRACTIONAL PHYSICS-INFORMED NEURAL NETWORKS",
            "author": "Guofei Pang & Lu Lu（共同一作）",
            "unit": "美国布朗大学应用数学系",
            "venue": "SIAM Journal on Scientific Computing",
            "date": "2019年8月",
            "tags": "科学机器学习, 分数阶微积分, 物理信息神经网络, 反常扩散, 参数识别",
            "links": {
                "paper": "https://epubs.siam.org/doi/10.1137/18M1229845",
                "download": "https://www.jianguoyun.com/p/DYFM-hwQ7P3jDRjqzpUGIAA",
                "cover": "https://epubs.siam.org/cms/10.1137/sjoce3.47.5/asset/17efe382-d417-fe38-2d41-efe3822d417e/cover.jpg",
                "code": "未开源"
            },
            "coverFallback": "https://via.placeholder.com/100x140/e74c3c/ffffff?text=SIAM"
        },

        "titles": {
            "suspense": "自动微分遇到分数阶导数就失效？布朗团队用这招破解百年难题！",
            "value": "从记忆效应到非局部扩散：一文搞懂如何让AI学会分数阶物理",
            "conflict": "传统链式法则不管用了？这个混合框架让神经网络'驾驭'分数微积分"
        },

        "intro": "当物理系统展现记忆效应或空间非局部性时，经典整数阶方程就捉襟见肘了——裂缝介质中的污染物运输、粘弹性材料的应力响应，都需要分数阶微分方程来描述。布朗大学Karniadakis团队在计算科学顶刊SIAM JSC上发表的这项研究，首次让物理信息神经网络突破整数阶限制，通过巧妙的混合策略解决了分数阶算子无法自动微分的根本难题，为数据驱动的复杂物理建模打开新天地。",

        "content": {
            "background": {
                "field": "分数阶微积分是传统微积分的推广，导数阶数可以是任意实数(比如1.5阶导数)。这种'非整数阶'特性天然适合描述具有记忆性(历史依赖)和非局部性(远程相互作用)的系统。分数阶偏微分方程已广泛应用于多孔介质渗流、声波传播、湍流建模等领域，其中的分数阶参数直接决定了系统的幂律行为特征。",
                "context": "然而，求解分数阶方程面临双重困境：正向求解时，分数阶导数的卷积形式导致计算矩阵是满秩的，计算成本随维度指数增长；反向识别时，需要从稀疏噪声数据中反推分数阶参数(如扩散指数α、时间记忆指数γ)更是难上加难。传统数值方法依赖规则网格，难以处理黑盒(只有散点观测值)的强迫项；而机器学习虽能拟合数据，却无法保证解满足物理定律。更棘手的是，物理信息神经网络(PINNs)赖以生存的自动微分技术，在分数阶算子前彻底失效——因为经典链式法则在分数阶微积分中根本不成立，即便存在分数阶链式法则也是无穷级数形式，计算不可行。",
                "problem": "核心矛盾是：如何让神经网络既保留PINNs的数据-物理融合优势，又能处理无法自动微分的分数阶算子？Karniadakis团队的突破口在于'不强求统一'——既然分数阶算子不能自动微分，那就数值离散化！他们提出的fPINNs采用混合策略：整数阶部分(如对流项∇u)继续用自动微分保持精确性，分数阶部分(如时间记忆项∂^γu/∂t^γ)则用成熟的Grünwald-Letnikov格式离散。这样既绕开了分数阶链式法则的困境，又保留了神经网络的灵活性和物理约束的精确性。"
            },

            "contribution": {
                "significance": "fPINNs首次实现了数据驱动与分数阶物理定律的端到端融合。理论上，它为分数阶正反问题提供了统一的函数逼近框架，并系统揭示了四种误差源(离散化、采样、网络逼近、优化)的相互作用机制；应用上，能从散点噪声测量中同时识别多个分数阶参数(α、γ、扩散系数c、流速v)，且对黑盒强迫项的处理能力远超传统方法，为地下水污染溯源、粘弹性材料表征等实际问题提供了强大工具。",
                "method": "① 构造近似解：用带边界嵌入的神经网络ũ(x,t)=tρ(x)u_NN(x,t)+g(x)自动满足初边值条件；\n\n② 混合残差计算：整数阶算子(如∇u)通过自动微分得到解析导数，分数阶算子(如∂^γu/∂t^γ)通过L1格式或Grünwald-Letnikov公式离散化——每个训练点需要引入'辅助点'来构建差分模板；\n\n③ 损失函数设计：L = 1/N Σ[L^FDM{ũ} + L^AD{ũ} - f_BB]²，前两项分别是分数阶和整数阶物理残差，f_BB是黑盒强迫项观测值；\n\n④ 反问题扩展：在损失中加入终时刻观测误差项，联合优化网络参数μ和物理参数ξ={α,γ,c,v}。对于三维时空分数阶问题，采用方向分数阶Laplacian结合Gauss-Legendre求积，用向量GL公式处理各向异性扩散。",
                "innovation": "① 混合微分策略：首次证明自动微分(AD)与有限差分(FD)可协同工作，AD保证整数阶部分的机器精度，FD处理无法AD的分数阶部分；\n\n② 辅助点机制：创造性地区分'训练点'(损失采样点)和'辅助点'(用于构建分数阶差分模板的历史/邻域点)，通过参数λ动态平衡离散化误差与采样误差；\n\n③ 误差理论分析：首次系统解析了四类误差的耦合规律——发现当训练点数N与辅助点数λd成正比时精度最优，揭示了优化误差在大规模问题中的主导地位(损失可达10^-14但解误差饱和在10^-5)；\n\n④ 黑盒强迫优势：对于仅在散点处已知的强迫项，fPINNs直接在观测点计算残差无需插值，而传统有限差分必须先全域插值导致误差累积，使fPINNs在稀疏数据下精度高出数量级。"
            },

            "validation": {
                "experiments": "研究团队设计了从一维到三维的系统验证。① 收敛性研究(1D分数阶Poisson)：对比一阶、二阶、三阶GL格式，发现小训练集时呈现理论收敛阶，但当N>100时误差因优化困难饱和；通过10次随机初始化统计均值±标准差，量化了NN参数敏感性。② 时间依赖问题(1D时空分数阶ADE)：白盒强迫项下fPINNs与FDM精度相当，但黑盒强迫时fPINNs误差仅FDM的1/10——用100个散点即达到FDM千点网格精度。③ 高维问题(2D/3D)：在单位圆盘/球上求解，用200/400个Sobol序列点+λ_x=400/λ_t=200个辅助点，相对误差达10^-3~10^-4；成功重构二维湍流场和三维扩散过程。④ 反问题挑战：从单一终时刻观测识别6个参数(三维时空分数阶ADE的α、γ、c、v_x、v_y、v_z)，识别误差<2%；在10%噪声下仍能准确恢复扩散系数和速度场，但时间分数阶γ对噪声最敏感，需100+传感器才能稳定识别。",
                "conclusion": "核心发现揭示了fPINNs的独特优势与本质限制：当物理方程已知且数据稀疏时，混合策略能以极少观测(1%数据量)达到传统方法的精度，根源在于分数阶物理约束将解空间投影到低维流形上，神经网络只需学习流形结构而非全空间。\n\n误差分析表明存在'有效训练点'现象——当N和λ相当时精度最优，过多训练点反而因损失函数复杂度增加导致优化困难。深度比宽度更重要，但超过某个阈值后标准差激增意味着过拟合风险。\n\n黑盒强迫优势的物理解释是：fPINNs直接让NN输出在观测点满足方程，绕过了传统方法'观测→插值→求解'的误差传播链，本质上实现了数据与方程的'点对点'融合。噪声鲁棒性差异源于损失函数权重——PDE残差贡献大于边界误差时，强迫项噪声比边界噪声影响更严重。"
            },

            "evaluation": {
                "impact": "这篇论文开创了分数阶科学机器学习的先河，是fPINNs领域的奠基之作，为后续数百篇工作铺平道路。学术贡献体现在：① 证明了混合微分策略的可行性，为处理其他非局部/记忆算子(如积分-微分方程、非局部扩散)提供了方法论；② 首次给出PINNs类方法的系统误差理论，揭示了离散化-采样-逼近-优化的四维误差空间；③ 为分数阶参数识别提供了端到端工具，无需先求解正问题再反演。\n\n应用影响遍及地球科学(地下水污染物迁移的α识别)、材料工程(粘弹性本构关系的γ标定)、生物医学(反常扩散建模)。多个团队已将fPINNs应用于实际数据，推动了'模型发现'从经典方程到分数阶方程的跨越。",
                "limitations": "方法面临三大挑战：① 维度诅咒加剧——分数阶算子的非局部性要求每个训练点关联大量辅助点(1D问题需~λd个，3D问题需~(λd)³个)，高维时内存和计算量爆炸式增长，目前难以处理超过3维的实际问题；② 刚性方程困境——对于含激波或间断的分数阶问题(如分数阶Burgers方程)，梯度病态导致训练极不稳定，需要精心设计学习率退火和自适应权重策略，成功率依赖经验；③ 黑盒假设局限——方法假设分数阶类型(Riemann-Liouville还是Caputo)和方程形式已知，若物理模型本身有误或分数阶定义不明确，则无法自动纠正。此外，论文未涉及分数阶边界条件(如Robin型)的处理，限制了复杂几何问题的应用。"
            }
        },

        "extension": {
            "future": "方向①-自适应辅助点生成：开发基于后验误差估计的动态λ调整算法，在解梯度大的区域局部加密辅助点，全局只需O(N)而非O(N·λ^d)的存储；方向②-物理先验架构：设计针对分数阶对称性(如尺度不变性、自相似性)的神经网络架构，用群论指导层间连接，降低可训练参数数量；方向③-多保真度融合：结合低保真大数据(便宜但含模型误差)与高保真小数据(昂贵但准确)，用迁移学习在两者间建立桥梁，解决工程中'数据-模型'双不确定性问题；方向④-时空自适应策略：对于长时演化问题，采用序列训练(先学短时后外推长时)结合强化学习动态选择时间步长，突破当前'一网到底'的训练模式。"
        },

        "closing": {
            "summary": "fPINNs用'混合'智慧驯服了分数阶的'野性'，证明数值方法与深度学习并非对立而是互补共生。",
            "takeaways": "启示①：当遇到技术障碍(如无法自动微分)时，'绕道而行'比'硬刚到底'更明智——混合策略往往是最优解。启示②：误差不是孤立的，离散化、采样、优化三者相互制约，系统优化比单点突破更有效。启示③：物理先验的价值在数据稀缺时尤为凸显，1%的数据+100%的物理能胜过100%的数据+0%的物理。",
            "discussion": "你认为fPINNs的下一个'杀手级'应用会出现在哪个领域？是攻克高维分数阶Navier-Stokes的湍流难题，还是破解粘弹性材料的实时本构识别，又或是开辟药物在组织中的反常扩散建模新战场？欢迎在评论区分享你的见解！如果你手头正好有分数阶相关的数据或问题，也欢迎探讨fPINNs的应用可能性～"
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

    // 只显示前三个标签，其余的在详情页展示
    const allTags = paper.meta.tags.split(', ');
    const displayTags = allTags.slice(0, 3); // 只取前三个标签
    const tagsHTML = displayTags.map(tag =>
        `<span class="tag ${tag.includes('PINN') ? 'pinn' : 'highlight'}">${tag}</span>`
    ).join('');

    // 创建摘要信息
    const summary = paper.closing && paper.closing.summary ? `
        <div class="paper-summary">
            <p class="summary-text">${processMarkdown(paper.closing.summary)}</p>
        </div>
    ` : '';

    // 提取年份用于显示
    const year = paper.meta.date.match(/\d{4}/) ? paper.meta.date.match(/\d{4}/)[0] : '';

    return `
        <div class="paper-card" data-paper-id="${paper.meta.titleCN}" style="animation-delay: ${index * 0.05}s">
            <!-- 上栏：封面和标题信息 -->
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
                    <!-- 封面下方期刊信息 -->
                    <div class="cover-journal-info">
                        <div class="journal-name">${paper.meta.venue}</div>
                    </div>
                </div>
                
                <!-- 右侧标题区域 - 优化布局 -->
                <div class="paper-header-content">
                    <!-- 标题区域 - 优先显示 -->
                    <div class="title-section">
                        <h3 class="paper-title">${paper.meta.titleCN}</h3>
                        <h4 class="paper-title-en">${paper.meta.titleEN}</h4>
                    </div>
                    
                    <!-- 元信息区域 - 上下三行布局（发表日期、作者、单位） -->
                    <div class="paper-meta">
                        <div class="meta-row">
                            <div class="meta-label">发表</div>
                            <div class="meta-value">${paper.meta.date}</div>
                        </div>
                        <div class="meta-row">
                            <div class="meta-label">作者</div>
                            <div class="meta-value">${paper.meta.author}</div>
                        </div>
                        <div class="meta-row">
                            <div class="meta-label">单位</div>
                            <div class="meta-value">${paper.meta.unit}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 下栏：标签和摘要信息 -->
            <div class="paper-middle">
                <!-- 标签区域 -->
                <div class="paper-tags">
                    ${tagsHTML}
                </div>
                
                <!-- 摘要信息 -->
                ${summary}
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
                    <p class="title-option-text">${processMarkdown(paper.titles.suspense)}</p>
                </div>
                <div class="title-option-modal value">
                    <div class="title-option-header">
                        <span class="title-option-icon">💎</span>
                        <span class="title-option-type">价值式</span>
                    </div>
                    <p class="title-option-text">${processMarkdown(paper.titles.value)}</p>
                </div>
                <div class="title-option-modal conflict">
                    <div class="title-option-header">
                        <span class="title-option-icon">⚡</span>
                        <span class="title-option-type">冲突式</span>
                    </div>
                    <p class="title-option-text">${processMarkdown(paper.titles.conflict)}</p>
                </div>
            </div>
        </div>
    ` : '';

    // 创建导语内容
    const introContent = paper.intro ? `
        <div class="info-section">
            <h3>📖 导语</h3>
            <div class="intro-modal">
                <p class="intro-text-modal">${processMarkdown(paper.intro)}</p>
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
            </div>
        </div>

        <div class="info-section">
            <h3>研究背景</h3>
            <div class="content-section">
                <h4>研究领域</h4>
                <p>${processMarkdown(content.background.field)}</p>
            </div>
            <div class="content-section">
                <h4>研究背景</h4>
                <p>${processMarkdown(content.background.context)}</p>
            </div>
            <div class="content-section">
                <h4>核心问题</h4>
                <p>${processMarkdown(content.background.problem)}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>主要贡献</h3>
            <div class="content-section">
                <h4>研究意义</h4>
                <p>${processMarkdown(content.contribution.significance)}</p>
            </div>
            <div class="content-section">
                <h4>研究方法</h4>
                <p>${processMarkdown(content.contribution.method)}</p>
            </div>
            <div class="content-section">
                <h4>创新点</h4>
                <p>${processMarkdown(content.contribution.innovation)}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>实验验证</h3>
            <div class="content-section">
                <h4>实验结果</h4>
                <p>${processMarkdown(content.validation.experiments)}</p>
            </div>
            <div class="content-section">
                <h4>研究结论</h4>
                <p>${processMarkdown(content.validation.conclusion)}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>影响评估</h3>
            <div class="content-section">
                <h4>学术影响</h4>
                <p>${processMarkdown(content.evaluation.impact)}</p>
            </div>
            <div class="content-section">
                <h4>局限性</h4>
                <p>${processMarkdown(content.evaluation.limitations)}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>未来展望</h3>
            <div class="content-section">
                <p>${processMarkdown(extension.future)}</p>
            </div>
        </div>

        <div class="info-section">
            <h3>总结讨论</h3>
            <div class="content-section">
                <h4>核心总结</h4>
                <p>${processMarkdown(closing.summary)}</p>
            </div>
            <div class="content-section">
                <h4>关键收获</h4>
                <p>${processMarkdown(closing.takeaways)}</p>
            </div>
            <div class="content-section">
                <h4>互动讨论</h4>
                <p>${processMarkdown(closing.discussion)}</p>
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