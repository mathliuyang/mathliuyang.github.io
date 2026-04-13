// Research Prompt Pro - 提示词模板数据

const promptTemplates = {
    'translation': {
        title: '学术翻译',
        icon: '🌐',
        category: '写作辅助',
        description: '将学术文本翻译成目标语言，保持学术规范和专业术语准确性',
        fields: [
            { name: 'source_lang', label: '源语言', type: 'select', options: ['中文', '英文', '日文', '法文', '德文', '西班牙文'], required: true },
            { name: 'target_lang', label: '目标语言', type: 'select', options: ['中文', '英文', '日文', '法文', '德文', '西班牙文'], required: true },
            { name: 'field', label: '学科领域', type: 'text', placeholder: '如：计算机科学、生物医学、物理学等', required: true },
            { name: 'text', label: '待翻译文本', type: 'textarea', placeholder: '请输入需要翻译的学术文本...', required: true },
            { name: 'terminology', label: '专业术语表（可选）', type: 'textarea', placeholder: '提供关键术语的对照翻译，格式：术语1=翻译1；术语2=翻译2', required: false }
        ],
        template: (data) => `请作为${data.field}领域的专业翻译专家，将以下${data.source_lang}学术文本翻译成${data.target_lang}。

要求：
1. 保持学术写作的规范性和严谨性
2. 准确翻译专业术语，保持术语的一致性
3. 保留原文的逻辑结构和论述层次
4. 注意学术表达的地道性和流畅性
5. 保持引用格式的规范性

${data.terminology ? `专业术语对照：\n${data.terminology}\n` : ''}

待翻译文本：
${data.text}

请提供高质量的学术翻译。`
    },

    'polish': {
        title: '论文润色',
        icon: '✨',
        category: '写作辅助',
        description: '优化学术论文的语言表达，提升文章质量',
        fields: [
            { name: 'type', label: '论文类型', type: 'select', options: ['研究论文', '综述文章', '会议论文', '学位论文', '技术报告'], required: true },
            { name: 'field', label: '学科领域', type: 'text', placeholder: '如：人工智能、材料科学等', required: true },
            { name: 'level', label: '润色程度', type: 'select', options: ['轻度润色（语法纠错）', '中度润色（表达优化）', '深度润色（逻辑重组）'], required: true },
            { name: 'text', label: '待润色文本', type: 'textarea', placeholder: '请输入需要润色的论文段落...', required: true },
            { name: 'journal_style', label: '目标期刊风格（可选）', type: 'text', placeholder: '如：Nature, Science, IEEE等', required: false }
        ],
        template: (data) => `请作为${data.field}领域的学术编辑，对以下${data.type}进行${data.level}。

润色要求：
1. 改善语言的清晰度和准确性
2. 增强句子的逻辑连贯性
3. 优化学术词汇和表达方式
4. 确保语法正确，去除冗余
5. 保持原意不变，提升可读性
${data.journal_style ? `6. 参考${data.journal_style}期刊的写作风格` : ''}

原文：
${data.text}

请提供润色后的文本，并简要说明主要修改之处。`
    },

    'style-imitation': {
        title: '风格仿写',
        icon: '🎨',
        category: '写作辅助',
        description: '模仿特定作者或期刊的写作风格',
        fields: [
            { name: 'target_style', label: '目标风格', type: 'select', options: ['Nature期刊风格', 'Science期刊风格', 'IEEE论文风格', '特定作者风格', '其他'], required: true },
            { name: 'author_or_journal', label: '具体作者/期刊名称', type: 'text', placeholder: '如果选择了特定作者或其他，请详细说明', required: false },
            { name: 'content_type', label: '内容类型', type: 'select', options: ['摘要', '引言', '方法', '结果', '讨论', '结论'], required: true },
            { name: 'original_text', label: '原始文本', type: 'textarea', placeholder: '请输入需要改写的文本...', required: true },
            { name: 'key_points', label: '关键要点', type: 'textarea', placeholder: '列出需要保留的关键信息和要点', required: true }
        ],
        template: (data) => `请模仿${data.target_style}${data.author_or_journal ? `（${data.author_or_journal}）` : ''}的写作风格，重写以下${data.content_type}部分。

风格要求：
1. 保持目标风格的语言特色和表达习惯
2. 遵循相应的学术写作规范
3. 保留所有关键信息和要点
4. 确保逻辑清晰，结构合理
5. 适应目标期刊或作者的表达偏好

关键要点：
${data.key_points}

原始文本：
${data.original_text}

请提供风格化改写后的文本。`
    },

    'latex-translation': {
        title: 'LaTeX全文翻译',
        icon: '📄',
        category: '写作辅助',
        description: '翻译包含LaTeX格式的学术文档',
        fields: [
            { name: 'source_lang', label: '源语言', type: 'select', options: ['中文', '英文', '日文', '法文', '德文'], required: true },
            { name: 'target_lang', label: '目标语言', type: 'select', options: ['中文', '英文', '日文', '法文', '德文'], required: true },
            { name: 'document_type', label: '文档类型', type: 'select', options: ['完整论文', '论文章节', '会议摘要', '技术报告'], required: true },
            { name: 'latex_content', label: 'LaTeX内容', type: 'textarea', placeholder: '请粘贴包含LaTeX命令的文本...', required: true },
            { name: 'preserve_formatting', label: '格式保留选项', type: 'select', options: ['保留所有LaTeX命令', '仅保留数学公式', '转换为纯文本'], required: true }
        ],
        template: (data) => `请将以下包含LaTeX格式的${data.document_type}从${data.source_lang}翻译成${data.target_lang}。

翻译要求：
1. ${data.preserve_formatting}
2. 保持数学公式和符号的准确性
3. 维护引用和标签的完整性
4. 确保学术术语翻译的准确性
5. 保持文档的整体结构和格式

LaTeX内容：
${data.latex_content}

请提供翻译后的LaTeX文档。`
    },

    'title': {
        title: '拟定标题',
        icon: '📌',
        category: '论文撰写',
        description: '为学术论文生成合适的标题',
        fields: [
            { name: 'research_field', label: '研究领域', type: 'text', placeholder: '如：机器学习、生物信息学等', required: true },
            { name: 'main_contribution', label: '主要贡献', type: 'textarea', placeholder: '简述论文的主要创新点和贡献...', required: true },
            { name: 'methodology', label: '研究方法', type: 'text', placeholder: '使用的主要方法或技术', required: true },
            { name: 'target_audience', label: '目标受众', type: 'select', options: ['学术研究者', '工程实践者', '跨学科读者', '特定领域专家'], required: true },
            { name: 'title_style', label: '标题风格', type: 'select', options: ['简洁直接', '描述性详细', '问题导向', '结果导向'], required: true }
        ],
        template: (data) => `请为${data.research_field}领域的学术论文拟定标题。

论文信息：
- 主要贡献：${data.main_contribution}
- 研究方法：${data.methodology}
- 目标受众：${data.target_audience}
- 标题风格：${data.title_style}

要求：
1. 标题应准确反映论文的核心内容
2. 符合学术期刊的标题规范
3. 具有吸引力和可检索性
4. 长度适中（一般不超过20个单词）
5. 避免使用过于技术性的缩写

请提供3-5个不同风格的标题选项，并简要说明每个标题的特点。`
    },

    'abstract': {
        title: '撰写摘要',
        icon: '📋',
        category: '论文撰写',
        description: '生成结构化的学术论文摘要',
        fields: [
            { name: 'research_background', label: '研究背景', type: 'textarea', placeholder: '简述研究背景和问题...', required: true },
            { name: 'methodology', label: '研究方法', type: 'textarea', placeholder: '描述使用的方法和技术...', required: true },
            { name: 'main_results', label: '主要结果', type: 'textarea', placeholder: '列出关键发现和数据...', required: true },
            { name: 'conclusions', label: '结论意义', type: 'textarea', placeholder: '说明研究的意义和影响...', required: true },
            { name: 'abstract_type', label: '摘要类型', type: 'select', options: ['结构化摘要', '非结构化摘要', '图形摘要说明'], required: true },
            { name: 'word_limit', label: '字数限制', type: 'select', options: ['150字以内', '250字以内', '350字以内', '无限制'], required: true }
        ],
        template: (data) => `请撰写一份${data.abstract_type}，字数控制在${data.word_limit}。

论文要素：
- 研究背景：${data.research_background}
- 研究方法：${data.methodology}
- 主要结果：${data.main_results}
- 结论意义：${data.conclusions}

摘要要求：
1. 结构清晰，逻辑连贯
2. 突出创新点和主要贡献
3. 包含关键数据和结果
4. 语言简洁，表达准确
5. 符合目标期刊的格式要求

请提供完整的摘要文本。`
    },

    'keywords': {
        title: '生成关键词',
        icon: '🔍',
        category: '论文撰写',
        description: '为学术论文生成相关关键词',
        fields: [
            { name: 'title', label: '论文标题', type: 'text', placeholder: '请输入论文标题...', required: true },
            { name: 'abstract', label: '论文摘要', type: 'textarea', placeholder: '请输入论文摘要...', required: true },
            { name: 'research_field', label: '研究领域', type: 'text', placeholder: '如：计算机视觉、自然语言处理等', required: true },
            { name: 'keyword_count', label: '关键词数量', type: 'select', options: ['3-5个', '5-8个', '8-10个'], required: true },
            { name: 'keyword_type', label: '关键词类型', type: 'select', options: ['技术方法类', '应用领域类', '混合类型'], required: true }
        ],
        template: (data) => `请为以下学术论文生成${data.keyword_count}${data.keyword_type}关键词。

论文信息：
- 标题：${data.title}
- 研究领域：${data.research_field}
- 摘要：${data.abstract}

关键词要求：
1. 准确反映论文的核心内容
2. 具有良好的检索性和通用性
3. 避免过于宽泛或过于具体
4. 符合学术期刊的关键词规范
5. 包含领域内的标准术语

请提供关键词列表，并简要说明选择理由。`
    },

    'methodology': {
        title: '方法简称生成',
        icon: '⚙️',
        category: '论文撰写',
        description: '为研究方法生成规范的简称和缩写',
        fields: [
            { name: 'method_name', label: '方法全称', type: 'text', placeholder: '请输入方法的完整名称...', required: true },
            { name: 'method_type', label: '方法类型', type: 'select', options: ['实验方法', '计算方法', '统计方法', '分析方法', '测量方法'], required: true },
            { name: 'field', label: '应用领域', type: 'text', placeholder: '如：机器学习、生物信息学等', required: true },
            { name: 'usage_context', label: '使用场景', type: 'select', options: ['论文标题', '图表标注', '正文叙述', '摘要'], required: true },
            { name: 'abbreviation_style', label: '缩写风格', type: 'select', options: ['首字母缩写', '混合缩写', '数字缩写', '自定义'], required: true }
        ],
        template: (data) => `请为以下研究方法生成规范的简称：

方法信息：
- 方法全称：${data.method_name}
- 方法类型：${data.method_type}
- 应用领域：${data.field}
- 使用场景：${data.usage_context}
- 缩写风格：${data.abbreviation_style}

生成要求：
1. 符合学术规范和惯例
2. 简洁明了，易于理解
3. 在${data.field}领域内具有辨识度
4. 适合在${data.usage_context}中使用
5. 避免与现有方法混淆

请提供3-5个简称选项，并说明推荐理由。`
    },

    'cover-letter': {
        title: 'Cover Letter',
        icon: '📧',
        category: '学术交流',
        description: '撰写期刊投稿的Cover Letter',
        fields: [
            { name: 'journal_name', label: '期刊名称', type: 'text', placeholder: '请输入目标期刊名称...', required: true },
            { name: 'manuscript_title', label: '论文标题', type: 'text', placeholder: '请输入论文标题...', required: true },
            { name: 'manuscript_type', label: '论文类型', type: 'select', options: ['研究论文', '综述文章', '短篇通讯', '案例报告', '方法论文'], required: true },
            { name: 'key_findings', label: '主要发现', type: 'textarea', placeholder: '简述论文的主要发现和贡献...', required: true },
            { name: 'significance', label: '研究意义', type: 'textarea', placeholder: '说明研究的重要性和影响...', required: true },
            { name: 'suggested_reviewers', label: '推荐审稿人（可选）', type: 'textarea', placeholder: '提供推荐审稿人的姓名、单位和邮箱', required: false }
        ],
        template: (data) => `请撰写一封投稿${data.journal_name}的Cover Letter。

投稿信息：
- 论文标题：${data.manuscript_title}
- 论文类型：${data.manuscript_type}
- 主要发现：${data.key_findings}
- 研究意义：${data.significance}
${data.suggested_reviewers ? `推荐审稿人：${data.suggested_reviewers}` : ''}

Cover Letter结构：
1. 开头致意和投稿声明
2. 研究背景简述
3. 主要发现和贡献
4. 研究的重要性和意义
5. 期刊适合性说明
6. 推荐审稿人（如适用）
7. 结尾致谢

撰写要求：
1. 语言正式、礼貌
2. 突出研究的创新性和重要性
3. 说明为什么适合该期刊
4. 避免重复摘要内容
5. 控制在一页以内

请提供完整的Cover Letter。`
    },

    'review-response': {
        title: '审稿回复信',
        icon: '📝',
        category: '学术交流',
        description: '撰写审稿意见回复信',
        fields: [
            { name: 'journal_name', label: '期刊名称', type: 'text', placeholder: '请输入期刊名称...', required: true },
            { name: 'manuscript_title', label: '论文标题', type: 'text', placeholder: '请输入论文标题...', required: true },
            { name: 'reviewer_comments', label: '审稿意见', type: 'textarea', placeholder: '请粘贴审稿人的主要意见...', required: true },
            { name: 'revision_summary', label: '修改概要', type: 'textarea', placeholder: '总结主要的修改内容...', required: true },
            { name: 'response_style', label: '回复风格', type: 'select', options: ['详细回复', '简洁回复', '学术讨论', '礼貌反驳'], required: true }
        ],
        template: (data) => `请撰写一封${data.journal_name}的审稿回复信。

回复信息：
- 论文标题：${data.manuscript_title}
- 审稿意见：${data.reviewer_comments}
- 修改概要：${data.revision_summary}
- 回复风格：${data.response_style}

回复信结构：
1. 开头致谢
2. 总体回复
3. 逐条回复审稿意见
4. 总结和感谢

撰写要求：
1. 礼貌专业，感谢审稿人
2. 逐条回应所有意见
3. 说明具体的修改内容
4. 提供修改的页码和行号
5. 对不同意的意见礼貌解释
6. 保持学术讨论的态度

请提供完整的审稿回复信。`
    },

    'email-reply': {
        title: '邮件回复',
        icon: '💬',
        category: '学术交流',
        description: '撰写学术邮件回复',
        fields: [
            { name: 'email_context', label: '邮件背景', type: 'select', options: ['合作邀请', '学术询问', '投稿咨询', '会议邀请', '审稿邀请'], required: true },
            { name: 'sender_identity', label: '发件人身份', type: 'select', options: ['同行学者', '期刊编辑', '会议组织者', '学生', '导师'], required: true },
            { name: 'original_message', label: '原邮件内容', type: 'textarea', placeholder: '请简要描述原邮件的主要内容...', required: true },
            { name: 'response_purpose', label: '回复目的', type: 'select', options: ['接受邀请', '婉拒邀请', '提供信息', '询问详情', '表达感谢'], required: true },
            { name: 'additional_info', label: '补充信息（可选）', type: 'textarea', placeholder: '需要提供的额外信息或说明...', required: false }
        ],
        template: (data) => `请撰写一封学术邮件回复。

邮件信息：
- 邮件背景：${data.email_context}
- 发件人身份：${data.sender_identity}
- 原邮件内容：${data.original_message}
- 回复目的：${data.response_purpose}
${data.additional_info ? `补充信息：${data.additional_info}` : ''}

邮件结构：
1. 开头问候
2. 感谢来信
3. 回应主要内容
4. 提供必要信息
5. 表达期望或感谢
6. 结尾敬语

撰写要求：
1. 语言正式、礼貌
2. 回应清晰明确
3. 保持专业态度
4. 注意邮件礼仪
5. 控制适当长度

请提供完整的邮件回复。`
    },

    'reviewer': {
        title: '审稿人角色',
        icon: '👨‍🎓',
        category: '学术交流',
        description: '模拟审稿人进行论文评审',
        fields: [
            { name: 'research_field', label: '研究领域', type: 'text', placeholder: '如：人工智能、生物医学等', required: true },
            { name: 'paper_title', label: '论文标题', type: 'text', placeholder: '请输入待评审论文的标题...', required: true },
            { name: 'paper_abstract', label: '论文摘要', type: 'textarea', placeholder: '请输入论文摘要...', required: true },
            { name: 'review_focus', label: '评审重点', type: 'select', options: ['创新性', '方法学', '结果可靠性', '写作质量', '整体评价'], required: true },
            { name: 'review_detail', label: '评审详细程度', type: 'select', options: ['简要评价', '详细评审', '深度分析', '建设性建议'], required: true }
        ],
        template: (data) => `请以${data.research_field}领域审稿人的身份，对以下论文进行评审。

论文信息：
- 标题：${data.paper_title}
- 摘要：${data.paper_abstract}
- 评审重点：${data.review_focus}
- 评审详细程度：${data.review_detail}

评审报告结构：
1. 总体印象和评价
2. 主要优点和贡献
3. 主要问题和不足
4. 具体修改建议
5. 创新性和重要性评价
6. 推荐意见

评审要求：
1. 客观公正的学术评价
2. 具体明确的修改建议
3. 专业的学术语言
4. 建设性的批评意见
5. 基于学术标准的判断

请提供详细的审稿意见。`
    },

    // 格式工具类模板
    'reference-format': {
        title: '参考文献格式化',
        icon: '📚',
        category: '格式工具',
        description: '将参考文献转换为指定格式',
        fields: [
            { name: 'target_format', label: '目标格式', type: 'select', options: ['APA', 'MLA', 'Chicago', 'IEEE', 'Nature', 'Science', 'Harvard'], required: true },
            { name: 'reference_list', label: '参考文献列表', type: 'textarea', placeholder: '请粘贴需要格式化的参考文献...', required: true },
            { name: 'sort_order', label: '排序方式', type: 'select', options: ['按出现顺序', '按作者姓氏', '按年份', '按期刊名称'], required: true },
            { name: 'include_doi', label: 'DOI处理', type: 'select', options: ['包含DOI', '不包含DOI', '仅在线资源包含'], required: true }
        ],
        template: (data) => `请将以下参考文献转换为${data.target_format}格式。

参考文献：
${data.reference_list}

格式要求：
- 目标格式：${data.target_format}
- 排序方式：${data.sort_order}
- DOI处理：${data.include_doi}

格式化要求：
1. 严格遵循${data.target_format}格式规范
2. 确保所有必要信息完整
3. 统一标点符号和字体样式
4. 正确处理作者姓名格式
5. 适当处理期刊缩写
6. 检查并纠正常见错误

请提供格式化后的参考文献列表。`
    },

    'grammar-check': {
        title: '语法检查纠正',
        icon: '✅',
        category: '格式工具',
        description: '检查并纠正学术文本的语法错误',
        fields: [
            { name: 'text_content', label: '待检查文本', type: 'textarea', placeholder: '请输入需要检查语法的文本...', required: true },
            { name: 'text_type', label: '文本类型', type: 'select', options: ['论文摘要', '正文段落', '结论部分', '邮件内容', '其他'], required: true },
            { name: 'check_level', label: '检查级别', type: 'select', options: ['基础语法', '高级语法', '风格优化', '全面检查'], required: true },
            { name: 'language_variant', label: '语言变体', type: 'select', options: ['美式英语', '英式英语', '国际英语'], required: true }
        ],
        template: (data) => `请对以下${data.text_type}进行${data.check_level}检查，使用${data.language_variant}规范。

文本内容：
${data.text_content}

检查要求：
1. 纠正语法错误和拼写错误
2. 改善标点符号使用
3. 统一时态和语态
4. 优化句子结构和表达
5. 确保学术写作规范
6. 提高文本的清晰度和可读性

请提供纠错后的文本，并详细说明所有修改之处。`
    },

    'latex-format': {
        title: 'LaTeX格式化',
        icon: '📐',
        category: '格式工具',
        description: '将普通文本转换为规范的LaTeX格式',
        fields: [
            { name: 'original_text', label: '原始文本', type: 'textarea', placeholder: '请输入需要转换的文本...', required: true },
            { name: 'document_class', label: '文档类型', type: 'select', options: ['article', 'report', 'book', 'thesis'], required: true },
            { name: 'required_packages', label: '需要的包（可选）', type: 'text', placeholder: '如：graphicx, amsmath, hyperref', required: false },
            { name: 'special_formatting', label: '特殊格式要求', type: 'text', placeholder: '如：双栏、特定字体等', required: false }
        ],
        template: (data) => `请将以下文本转换为规范的LaTeX格式，使用${data.document_class}文档类。

原始文本：
${data.original_text}

${data.required_packages ? `需要包含的包：${data.required_packages}` : ''}
${data.special_formatting ? `特殊要求：${data.special_formatting}` : ''}

转换要求：
1. 添加适当的LaTeX命令和环境
2. 处理特殊字符转义
3. 格式化数学公式和符号
4. 创建适当的节和子节结构
5. 添加必要的导言区设置
6. 确保代码的可编译性

请提供完整的LaTeX代码。`
    },

    'webpage-generator': {
        title: '功能网页生成',
        icon: '🌐',
        category: '格式工具',
        description: '生成具有特定功能的网页代码',
        fields: [
            { name: 'webpage_purpose', label: '网页用途', type: 'text', placeholder: '如：数据可视化、在线计算器、表单收集等', required: true },
            { name: 'feature_requirements', label: '功能需求', type: 'textarea', placeholder: '详细描述需要的功能...', required: true },
            { name: 'design_style', label: '设计风格', type: 'select', options: ['简约现代', '专业商务', '学术风格', '创意设计'], required: true },
            { name: 'responsive_design', label: '响应式设计', type: 'select', options: ['是', '否'], required: true },
            { name: 'tech_stack', label: '技术栈', type: 'select', options: ['纯HTML/CSS/JS', 'Bootstrap', 'Vue.js', 'React'], required: true }
        ],
        template: (data) => `请生成一个${data.webpage_purpose}的网页，使用${data.tech_stack}技术栈。

功能需求：
${data.feature_requirements}

设计要求：
- 风格：${data.design_style}
- 响应式：${data.responsive_design}

网页要求：
1. 实现所有指定功能
2. 界面美观易用
3. 代码结构清晰
4. 包含必要的注释
5. 考虑用户体验
6. 确保跨浏览器兼容性

请提供完整的HTML/CSS/JavaScript代码。`
    },

    // 研究方法类模板
    'research-proposal': {
        title: '研究计划书',
        icon: '📋',
        category: '研究方法',
        description: '撰写研究计划书或项目申请书',
        fields: [
            { name: 'project_title', label: '项目标题', type: 'text', placeholder: '请输入研究项目标题...', required: true },
            { name: 'research_field', label: '研究领域', type: 'text', placeholder: '如：人工智能、生物医学等', required: true },
            { name: 'research_background', label: '研究背景', type: 'textarea', placeholder: '描述研究背景和现状...', required: true },
            { name: 'research_objectives', label: '研究目标', type: 'textarea', placeholder: '列出具体的研究目标...', required: true },
            { name: 'methodology', label: '研究方法', type: 'textarea', placeholder: '详述研究方法和技术路线...', required: true },
            { name: 'expected_outcomes', label: '预期成果', type: 'textarea', placeholder: '描述预期的研究成果...', required: true },
            { name: 'funding_agency', label: '资助机构', type: 'select', options: ['国家自然科学基金', '国家社科基金', '省级基金', '企业资助', '其他'], required: true }
        ],
        template: (data) => `请撰写一份${data.funding_agency}的研究计划书。

项目信息：
- 项目标题：${data.project_title}
- 研究领域：${data.research_field}

研究计划书结构：

1. 研究背景与意义
${data.research_background}

2. 研究目标
${data.research_objectives}

3. 研究内容与方法
${data.methodology}

4. 预期成果
${data.expected_outcomes}

撰写要求：
1. 突出研究的创新性和重要性
2. 方法可行，技术路线清晰
3. 目标明确，成果可衡量
4. 符合资助机构的申请要求
5. 逻辑严密，表达准确

请提供完整的研究计划书文本。`
    },

    'literature-review': {
        title: '文献综述',
        icon: '📖',
        category: '研究方法',
        description: '撰写系统性的文献综述',
        fields: [
            { name: 'review_topic', label: '综述主题', type: 'text', placeholder: '请输入文献综述的主题...', required: true },
            { name: 'research_scope', label: '研究范围', type: 'textarea', placeholder: '定义综述的范围和边界...', required: true },
            { name: 'key_themes', label: '主要主题', type: 'textarea', placeholder: '列出需要涵盖的主要主题...', required: true },
            { name: 'time_range', label: '时间范围', type: 'select', options: ['近5年', '近10年', '近15年', '全时段'], required: true },
            { name: 'review_type', label: '综述类型', type: 'select', options: ['系统性综述', '叙述性综述', '元分析', '批判性综述'], required: true },
            { name: 'target_journals', label: '目标期刊', type: 'text', placeholder: '如：Nature Reviews, Annual Review等', required: false }
        ],
        template: (data) => `请撰写关于"${data.review_topic}"的${data.review_type}。

综述参数：
- 研究范围：${data.research_scope}
- 时间范围：${data.time_range}
- 主要主题：${data.key_themes}
${data.target_journals ? `- 目标期刊：${data.target_journals}` : ''}

综述结构：
1. 引言
   - 背景介绍
   - 综述目的和范围
   - 文献检索策略

2. 主体内容
   - 按主题分类讨论
   - 分析研究趋势和发展
   - 识别研究空白和争议

3. 讨论与展望
   - 总结主要发现
   - 指出未来研究方向
   - 提出建议和结论

撰写要求：
1. 全面覆盖相关文献
2. 客观分析不同观点
3. 识别研究趋势和空白
4. 提供批判性评价
5. 结构清晰，逻辑严密

请提供详细的文献综述大纲和写作指导。`
    },

    'data-analysis': {
        title: '数据分析报告',
        icon: '📊',
        category: '研究方法',
        description: '生成数据分析和统计报告',
        fields: [
            { name: 'dataset_description', label: '数据集描述', type: 'textarea', placeholder: '描述数据集的来源、规模和特征...', required: true },
            { name: 'analysis_objectives', label: '分析目标', type: 'textarea', placeholder: '说明数据分析的目的和问题...', required: true },
            { name: 'statistical_methods', label: '统计方法', type: 'textarea', placeholder: '列出使用的统计方法和工具...', required: true },
            { name: 'key_findings', label: '主要发现', type: 'textarea', placeholder: '总结关键的分析结果...', required: true },
            { name: 'analysis_software', label: '分析软件', type: 'select', options: ['R', 'Python', 'SPSS', 'SAS', 'STATA', 'MATLAB'], required: true },
            { name: 'report_audience', label: '报告受众', type: 'select', options: ['学术研究者', '业界专家', '政策制定者', '一般公众'], required: true }
        ],
        template: (data) => `请撰写一份面向${data.report_audience}的数据分析报告。

分析信息：
- 数据集：${data.dataset_description}
- 分析目标：${data.analysis_objectives}
- 统计方法：${data.statistical_methods}
- 主要发现：${data.key_findings}
- 分析工具：${data.analysis_software}

报告结构：
1. 执行摘要
2. 数据描述
   - 数据来源和收集方法
   - 数据质量评估
   - 描述性统计

3. 分析方法
   - 统计方法选择理由
   - 分析流程和步骤
   - 假设检验设计

4. 结果呈现
   - 统计结果报告
   - 图表和可视化
   - 显著性检验

5. 讨论与结论
   - 结果解释和意义
   - 局限性分析
   - 建议和启示

报告要求：
1. 方法科学严谨
2. 结果准确可靠
3. 图表清晰美观
4. 语言适合受众
5. 结论有理有据

请提供完整的数据分析报告。`
    },

    'experiment-design': {
        title: '实验设计',
        icon: '🔬',
        category: '研究方法',
        description: '设计科学实验方案',
        fields: [
            { name: 'research_question', label: '研究问题', type: 'textarea', placeholder: '明确要解决的研究问题...', required: true },
            { name: 'hypothesis', label: '研究假设', type: 'textarea', placeholder: '提出具体的研究假设...', required: true },
            { name: 'variables', label: '变量定义', type: 'textarea', placeholder: '定义自变量、因变量和控制变量...', required: true },
            { name: 'experiment_type', label: '实验类型', type: 'select', options: ['对照实验', '因子实验', '随机对照试验', '准实验', '单因素实验'], required: true },
            { name: 'sample_size', label: '样本规模', type: 'text', placeholder: '估算所需的样本数量...', required: true },
            { name: 'measurement_tools', label: '测量工具', type: 'textarea', placeholder: '描述数据收集的工具和方法...', required: true }
        ],
        template: (data) => `请设计一个${data.experiment_type}来验证以下研究假设。

实验信息：
- 研究问题：${data.research_question}
- 研究假设：${data.hypothesis}
- 变量定义：${data.variables}
- 样本规模：${data.sample_size}
- 测量工具：${data.measurement_tools}

实验设计方案：

1. 实验目标
   - 明确实验目的
   - 操作化假设

2. 实验设计
   - 实验类型和设计模式
   - 实验组和对照组设置
   - 随机化和平衡策略

3. 实验程序
   - 详细的实验步骤
   - 数据收集程序
   - 质量控制措施

4. 数据分析计划
   - 统计分析方法
   - 效应量估计
   - 显著性水平设定

5. 伦理考虑
   - 伦理审查要求
   - 知情同意程序
   - 风险评估和控制

设计要求：
1. 内部效度高
2. 外部效度好
3. 可操作性强
4. 伦理合规
5. 统计功效充分

请提供完整的实验设计方案。`
    },

    // 项目申请类模板
    'conference-abstract': {
        title: '会议摘要',
        icon: '🎤',
        category: '项目申请',
        description: '撰写学术会议投稿摘要',
        fields: [
            { name: 'conference_name', label: '会议名称', type: 'text', placeholder: '请输入目标会议名称...', required: true },
            { name: 'presentation_type', label: '报告类型', type: 'select', options: ['口头报告', '海报展示', '研讨会', '工作坊'], required: true },
            { name: 'research_contribution', label: '研究贡献', type: 'textarea', placeholder: '描述主要的研究贡献和创新点...', required: true },
            { name: 'methodology_brief', label: '方法简述', type: 'textarea', placeholder: '简要描述研究方法...', required: true },
            { name: 'key_results', label: '关键结果', type: 'textarea', placeholder: '列出最重要的研究结果...', required: true },
            { name: 'word_limit', label: '字数限制', type: 'select', options: ['200字以内', '300字以内', '500字以内', '无限制'], required: true }
        ],
        template: (data) => `请为${data.conference_name}会议撰写一份${data.presentation_type}摘要，字数控制在${data.word_limit}。

摘要要素：
- 研究贡献：${data.research_contribution}
- 研究方法：${data.methodology_brief}
- 关键结果：${data.key_results}

会议摘要结构：
1. 背景和目的（简洁）
2. 方法（核心要点）
3. 结果（具体数据）
4. 结论（意义和影响）

撰写要求：
1. 突出创新性和重要性
2. 结果具体，有说服力
3. 语言简洁，信息密度高
4. 符合会议主题和要求
5. 吸引审稿人和听众兴趣

请提供完整的会议摘要。`
    },

    'grant-application': {
        title: '基金申请书',
        icon: '💰',
        category: '项目申请',
        description: '撰写科研基金申请书',
        fields: [
            { name: 'funding_program', label: '资助项目', type: 'select', options: ['国家自然科学基金面上项目', '青年科学基金项目', '重点项目', '国际合作项目', '企业合作项目'], required: true },
            { name: 'project_title', label: '项目名称', type: 'text', placeholder: '请输入项目标题...', required: true },
            { name: 'scientific_significance', label: '科学意义', type: 'textarea', placeholder: '阐述项目的科学意义和价值...', required: true },
            { name: 'innovation_points', label: '创新点', type: 'textarea', placeholder: '列出项目的主要创新点...', required: true },
            { name: 'technical_route', label: '技术路线', type: 'textarea', placeholder: '描述技术路线和实施方案...', required: true },
            { name: 'budget_estimate', label: '预算估算', type: 'text', placeholder: '项目总预算（万元）', required: true }
        ],
        template: (data) => `请撰写${data.funding_program}申请书。

项目基本信息：
- 项目名称：${data.project_title}
- 申请金额：${data.budget_estimate}万元
- 科学意义：${data.scientific_significance}
- 创新点：${data.innovation_points}
- 技术路线：${data.technical_route}

申请书结构：

1. 项目的立项依据
   - 项目的科学意义
   - 国内外研究现状分析
   - 项目的创新性

2. 项目的研究内容
   - 研究目标
   - 研究内容
   - 拟解决的关键问题

3. 项目的研究方案
   - 研究方法和技术路线
   - 可行性分析
   - 项目的特色与创新

4. 研究基础与工作条件
   - 研究基础
   - 工作条件
   - 申请人简历

5. 预期研究成果
   - 预期目标
   - 成果形式
   - 社会效益

6. 研究计划与进度安排
   - 年度计划
   - 预期进展
   - 风险分析

7. 经费预算
   - 预算说明
   - 经费使用计划

撰写要求：
1. 科学问题明确重要
2. 创新性突出
3. 方案可行性强
4. 预期成果明确
5. 预算合理

请提供完整的基金申请书。`
    },

    'peer-review': {
        title: '同行评议',
        icon: '🔍',
        category: '项目申请',
        description: '撰写同行评议意见',
        fields: [
            { name: 'review_type', label: '评议类型', type: 'select', options: ['期刊论文评审', '基金项目评审', '学位论文评审', '会议论文评审'], required: true },
            { name: 'paper_summary', label: '论文概述', type: 'textarea', placeholder: '简要概述论文的主要内容...', required: true },
            { name: 'strengths', label: '主要优点', type: 'textarea', placeholder: '列出论文的主要优点和贡献...', required: true },
            { name: 'weaknesses', label: '主要问题', type: 'textarea', placeholder: '指出论文存在的问题和不足...', required: true },
            { name: 'suggestions', label: '修改建议', type: 'textarea', placeholder: '提供具体的修改建议...', required: true },
            { name: 'recommendation', label: '推荐意见', type: 'select', options: ['接受', '小修后接受', '大修后重审', '拒稿'], required: true }
        ],
        template: (data) => `请撰写一份${data.review_type}的同行评议意见。

评议内容：
- 论文概述：${data.paper_summary}
- 主要优点：${data.strengths}
- 主要问题：${data.weaknesses}
- 修改建议：${data.suggestions}
- 推荐意见：${data.recommendation}

评议报告结构：

1. 总体评价
   - 论文质量总体评估
   - 创新性和重要性评价
   - 推荐意见

2. 主要优点
   - 研究贡献和创新点
   - 方法学优势
   - 结果的价值

3. 主要问题
   - 方法学问题
   - 结果解释问题
   - 写作和表达问题

4. 具体修改建议
   - 逐条详细建议
   - 优先级排序
   - 修改方向指导

5. 小问题和技术性修改
   - 语言表达
   - 格式规范
   - 参考文献

评议要求：
1. 客观公正，基于学术标准
2. 建设性批评，提供改进方向
3. 具体明确，便于作者修改
4. 专业严谨，符合评议规范
5. 尊重作者，鼓励学术创新

请提供完整的同行评议报告。`
    }
};