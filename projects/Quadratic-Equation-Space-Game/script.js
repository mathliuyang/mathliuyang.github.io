document.addEventListener('DOMContentLoaded', function () {
    // 1. 创建星空背景
    createStars();

    // 2. 移动端菜单切换
    setupMobileMenu();

    // 3. 平滑滚动效果
    setupSmoothScroll();

    // 4. 初始化比赛场次图表
    initMatchChart();

    // 5. 练习题答案显示功能
    setupPracticeQuestions();

    // 6. 游戏模式初始化 - 太空大战版
    setupSpaceBattle();

    // 7. 添加页面加载动画
    document.body.classList.add('loaded');
});

// 创建星空背景
function createStars() {
    const stars = document.getElementById('stars');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('particle');

        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // 随机大小
        const size = Math.random() * 2 + 1;

        // 随机动画延迟和持续时间
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        star.style.opacity = Math.random() * 0.8 + 0.2;

        stars.appendChild(star);
    }
}

// 移动端菜单切换
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');

        // 切换图标
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // 点击菜单项后关闭菜单
    const menuItems = mobileMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// 平滑滚动效果
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑头部高度
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 初始化比赛场次图表
function initMatchChart() {
    const ctx = document.getElementById('matchChart').getContext('2d');

    // 生成数据：队数与比赛场次的关系
    const teamCounts = Array.from({ length: 10 }, (_, i) => i + 2);
    const matchCounts = teamCounts.map(teams => teams * (teams - 1) / 2);

    const matchChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: teamCounts,
            datasets: [{
                label: '比赛场次',
                data: matchCounts,
                backgroundColor: 'rgba(14, 165, 233, 0.2)',
                borderColor: 'rgba(14, 165, 233, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#f8fafc'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '参赛队数',
                        color: '#f8fafc'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#f8fafc'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#f8fafc'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#f8fafc',
                    borderColor: 'rgba(14, 165, 233, 0.5)',
                    borderWidth: 1
                }
            },
            elements: {
                point: {
                    backgroundColor: '#ec4899',
                    borderColor: '#f8fafc',
                    borderWidth: 1,
                    radius: 4,
                    hoverRadius: 6
                }
            }
        }
    });
}

// 练习题答案显示功能
function setupPracticeQuestions() {
    const checkButtons = document.querySelectorAll('.check-btn');

    checkButtons.forEach(button => {
        button.addEventListener('click', function () {
            const answerDiv = this.nextElementSibling;
            const answer = this.getAttribute('data-answer');

            answerDiv.textContent = `答案: ${answer}`;
            answerDiv.classList.remove('hidden');

            // 添加显示动画
            answerDiv.style.opacity = '0';
            answerDiv.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                answerDiv.style.opacity = '1';
            }, 10);
        });
    });
}

// 太空大战游戏模式初始化
function setupSpaceBattle() {
    const startGameBtn = document.getElementById('startGame');
    const gameStartScreen = document.querySelector('.game-start');
    const problemArea = document.querySelector('.problem-area');
    const problemText = document.getElementById('problemText');
    const answerInput = document.getElementById('answerInput');
    const submitAnswerBtn = document.getElementById('submitAnswer');
    const feedback = document.getElementById('feedback');
    const energyDisplay = document.getElementById('energy');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const gameContainer = document.querySelector('.game-container');

    // 创建血条
    let healthBarContainer, healthBar, healthText;
    let timerDisplay;
    let countdownInterval;
    let gameDuration = 10 * 60; // 10分钟，单位秒

    // 创建游戏所需的DOM元素
    function createGameUI() {
        // 血条容器
        healthBarContainer = document.createElement('div');
        healthBarContainer.className = 'absolute bottom-4 left-4 w-64 h-4 bg-dark/70 border border-gray-700 rounded-full overflow-hidden';

        // 血条
        healthBar = document.createElement('div');
        healthBar.className = 'h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300';
        healthBar.style.width = '100%';

        // 血量文本
        healthText = document.createElement('div');
        healthText.className = 'absolute bottom-10 left-4 text-xs text-gray-300';
        healthText.textContent = '生命值: 100';

        // 计时器
        timerDisplay = document.createElement('div');
        timerDisplay.className = 'absolute bottom-4 right-4 text-sm text-primary';

        // 武器信息显示
        const weaponInfo = document.createElement('div');
        weaponInfo.id = 'weaponInfo';
        weaponInfo.className = 'absolute bottom-16 right-4 text-xs text-gray-300';

        healthBarContainer.appendChild(healthBar);
        gameContainer.appendChild(healthBarContainer);
        gameContainer.appendChild(healthText);
        gameContainer.appendChild(timerDisplay);
        gameContainer.appendChild(weaponInfo);
    }

    // 游戏状态
    let gameState = {
        health: 100,
        score: 0,
        level: 1,
        currentProblem: null,
        gameActive: false,
        problemTimer: null,
        energyTimer: null,
        enemyTimer: null,
        bulletTimer: null,
        player: null,
        enemies: [],
        bullets: [],
        enemyBullets: [],
        powerUps: [],
        isInvincible: false,
        gameTime: 0,
        bossActive: false,
        boss: null,
        bossHealth: 0,
        bossHealthBar: null,
        consecutiveCorrectAnswers: 0,
        revivalAttempts: 0,
        revivalNeeded: false,
        // 保存的玩家装备状态
        savedPlayerStats: {
            weaponLevel: 1,
            shootSpeed: 1000,
            damageMultiplier: 1.0,
            playerWidth: 50
        }
    };

    // 游戏问题库 - 按照难度分级
    const problemLibrary = [
        // 等级1问题（基础）
        { question: "将方程 x² = 4 化为一般形式", answer: "x² - 4 = 0" },
        { question: "将方程 x(x + 3) = 0 化为一般形式", answer: "x² + 3x = 0" },
        { question: "方程 x² - 5x + 6 = 0 的二次项系数是多少", answer: "1" },
        { question: "方程 2x² + 3x - 1 = 0 的一次项系数是多少", answer: "3" },
        { question: "方程 3x² - 7 = 0 的常数项是多少", answer: "-7" },
        // 等级2问题（中等）
        { question: "将方程 2x(x - 1) = 3 化为一般形式", answer: "2x² - 2x - 3 = 0" },
        { question: "将方程 (x + 2)(x - 3) = 0 化为一般形式", answer: "x² - x - 6 = 0" },
        { question: "方程 5x² + 2x - 8 = 0 的二次项系数是多少", answer: "5" },
        { question: "将方程 3x² = 4x + 1 化为一般形式", answer: "3x² - 4x - 1 = 0" },
        { question: "方程 -2x² + 5x = 0 的一次项系数是多少", answer: "5" },
        // 等级3问题（困难）
        { question: "将方程 4x(x + 2) = 25 化为一般形式", answer: "4x² + 8x - 25 = 0" },
        { question: "将方程 (3x - 2)(x + 1) = 8x - 3 化为一般形式", answer: "3x² - 7x + 1 = 0" },
        { question: "方程 -x² + 2x - 3 = 0 的二次项系数是多少", answer: "-1" },
        { question: "将方程 2(x² - 3) = 5x 化为一般形式", answer: "2x² - 5x - 6 = 0" },
        { question: "方程 0.5x² + 0.2x - 0.3 = 0 的常数项是多少", answer: "-0.3" },
        // 等级4问题（进阶）
        { question: "x² + 6x + 9 = 0 的根是什么", answer: "x=-3" },
        { question: "方程 (2x - 1)^2 = 0 的解是什么", answer: "x=1/2" },
        { question: "用配方法解方程 x² - 4x - 5 = 0，配方后得到什么", answer: "(x-2)^2=9" },
        { question: "方程 2x² - x - 1 = 0 的二次项系数、一次项系数和常数项之和是多少", answer: "0" },
        { question: "判断 2x² + x = 3 是否为一元二次方程", answer: "是" },
        // 等级5问题（挑战）
        { question: "若关于x的方程 (m-1)x² + 2x + 1 = 0 是一元二次方程，则m的取值范围是什么", answer: "m≠1" },
        { question: "将方程 (x + 1)(x - 1) = 2x 化为一般形式", answer: "x² - 2x - 1 = 0" },
        { question: "若x=1是方程 ax² + bx + c = 0 的根，则 a + b + c 的值为多少", answer: "0" },
        { question: "将方程 x² = 0.25 化为一般形式", answer: "x² - 0.25 = 0" },
        { question: "若方程 (k-1)x² + 3x = 0 是一元二次方程，则k的取值范围是什么", answer: "k≠1" }
    ];

    // 开始游戏
    startGameBtn.addEventListener('click', function () {
        if (!healthBarContainer) {
            createGameUI();
        }

        gameStartScreen.classList.add('hidden');
        problemArea.classList.remove('hidden');

        // 初始化游戏状态
        gameState = {
            health: 100,
            score: 0,
            level: 1,
            currentProblem: null,
            gameActive: true,
            problemTimer: null,
            enemyTimer: null,
            bulletTimer: null,
            player: null,
            enemies: [],
            bullets: [],
            enemyBullets: [],
            powerUps: [],
            isInvincible: false,
            gameTime: gameDuration, // 设置为总时长
            bossActive: false,
            boss: null,
            bossHealth: 0,
            bossHealthBar: null,
            consecutiveCorrectAnswers: 0,
            revivalAttempts: 0,
            revivalNeeded: false,
            // 玩家状态持久化存储
            savedPlayerStats: {
                weaponLevel: 1,
                shootSpeed: 1000,
                damageMultiplier: 1.0,
                playerWidth: 60,
                canUseWaveBullets: false,
                canUseExplosiveBullets: false,
                canUseTrackingBullets: false
            }
        };

        updateGameStats();
        generateProblem();

        // 创建玩家飞机
        createPlayer();

        // 开始生成敌人
        startEnemySpawn();

        // 开始计时器
        startCountdown();
    });

    // 提交答案
    submitAnswerBtn.addEventListener('click', function () {
        checkAnswer();
    });

    // 回车键提交答案
    answerInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    // 检查答案
    function checkAnswer() {
        if (!gameState.gameActive) return;

        // 获取用户输入并规范化
        const userAnswer = normalizeLatex(answerInput.value.trim().toLowerCase());
        // 规范化正确答案
        const correctAnswer = normalizeLatex(gameState.currentProblem.answer.toLowerCase());

        if (userAnswer === correctAnswer) {
            // 答案正确
            feedback.textContent = "回答正确！获得10分！";
            feedback.className = "text-center text-green-400";
            gameState.score += 10;
            gameState.consecutiveCorrectAnswers++;

            // 随机获得生命值回复
            if (Math.random() < 0.3) {
                gameState.health = Math.min(100, gameState.health + 10);
                feedback.textContent += " 获得10点生命值！";
            }

            // 每答对一题升级
            gameState.level++;
            feedback.textContent += ` 恭喜升级到等级 ${gameState.level}！`;

            // 升级效果：提升射击速度，增加子弹路数等
            upgradePlayer();

            // 添加得分动画
            createScoreAnimation('+10', '#ec4899');

            // 处理复活逻辑
            if (gameState.revivalNeeded) {
                gameState.revivalAttempts++;
                if (gameState.revivalAttempts >= 3) {
                    // 成功复活
                    revivePlayer();
                    feedback.textContent += " 成功复活！";
                } else {
                    feedback.textContent += ` 还需答对 ${3 - gameState.revivalAttempts} 题才能复活！`;
                }
            }

            // 击中当前目标（如果有）
            hitCurrentTarget();
        } else {
            // 答案错误
            feedback.textContent = `回答错误！正确答案是：${gameState.currentProblem.answer}`;
            feedback.className = "text-center text-red-400";
            gameState.consecutiveCorrectAnswers = 0;

            // 如果处于复活状态，重置复活尝试
            if (gameState.revivalNeeded) {
                gameState.revivalAttempts = 0;
                feedback.textContent += " 复活进度重置！";
            }
        }

        feedback.classList.remove('hidden');

        // 更新游戏状态
        updateGameStats();

        // 3秒后生成新问题
        clearTimeout(gameState.problemTimer);
        gameState.problemTimer = setTimeout(() => {
            feedback.classList.add('hidden');
            answerInput.value = '';

            // 如果游戏还在进行中，生成新问题
            if (gameState.gameActive && !gameState.revivalNeeded) {
                generateProblem();
            }
        }, 3000);
    }

    // 规范化LaTeX格式的答案，使^2等符号可以被正确识别
    function normalizeLatex(text) {
        // 替换常见的LaTeX符号
        let normalized = text
            // 处理平方符号: x^2 -> x²
            .replace(/\^2/g, '²')
            // 处理立方符号: x^3 -> x³
            .replace(/\^3/g, '³')
            // 处理上标数字: x^4 -> x⁴, x^5 -> x⁵等
            .replace(/\^(\d+)/g, (match, p1) => {
                const superscripts = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
                return p1.split('').map(digit => superscripts[digit] || digit).join('');
            })
            // 处理空格差异
            .replace(/\s+/g, '')
            // 处理等号前后空格
            .replace(/\s*=\s*/g, '=')
            // 处理正负号: +/- -> ±
            .replace(/\+\/\-/g, '±')
            // 处理减号（确保使用标准减号）
            .replace(/−/g, '-')
            // 处理乘号: * 或 × -> *
            .replace(/×/g, '*')
            // 处理分数格式：1/2 和 ½
            .replace(/½/g, '1/2')
            .replace(/¼/g, '1/4')
            .replace(/¾/g, '3/4');

        return normalized;
    }

    // 生成问题
    function generateProblem() {
        // 根据当前等级选择问题
        let levelProblems;
        if (gameState.level === 1) {
            levelProblems = problemLibrary.slice(0, 5);
        } else if (gameState.level === 2) {
            levelProblems = problemLibrary.slice(0, 10);
        } else if (gameState.level === 3) {
            levelProblems = problemLibrary.slice(0, 15);
        } else if (gameState.level === 4) {
            levelProblems = problemLibrary.slice(0, 20);
        } else {
            levelProblems = problemLibrary;
        }

        // 随机选择一个问题
        const randomIndex = Math.floor(Math.random() * levelProblems.length);
        gameState.currentProblem = levelProblems[randomIndex];

        // 显示问题
        problemText.textContent = gameState.currentProblem.question;

        // 添加问题出现动画
        problemArea.style.transform = 'translate(-50%, -20px) scale(0.9)';
        problemArea.style.opacity = '0';

        setTimeout(() => {
            problemArea.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            problemArea.style.transform = 'translate(-50%, 0) scale(1)';
            problemArea.style.opacity = '1';
        }, 10);
    }

    // 创建玩家飞机
    function createPlayer() {
        // 移除旧玩家
        if (gameState.player) {
            gameContainer.removeChild(gameState.player);
        }

        const player = document.createElement('div');
        player.className = 'absolute text-3xl z-10 font-bold';

        // 应用保存的玩家状态
        player.weaponLevel = gameState.savedPlayerStats.weaponLevel;
        player.shootSpeed = gameState.savedPlayerStats.shootSpeed;
        player.damageMultiplier = gameState.savedPlayerStats.damageMultiplier || 1.0;
        
        // 应用解锁的特效属性
        player.canUseWaveBullets = gameState.savedPlayerStats.canUseWaveBullets || false;
        player.canUseExplosiveBullets = gameState.savedPlayerStats.canUseExplosiveBullets || false;
        player.canUseTrackingBullets = gameState.savedPlayerStats.canUseTrackingBullets || false;

        // 设置玩家大小
        const playerWidth = gameState.savedPlayerStats.playerWidth;
        player.style.width = `${playerWidth}px`;
        player.style.height = `${playerWidth}px`;
        player.style.display = 'flex';
        player.style.alignItems = 'center';
        player.style.justifyContent = 'center';
        player.style.bottom = '10%';
        player.style.left = '50%';
        player.style.transform = 'translateX(-50%)';
        player.textContent = '🛸'; // 使用UFO emoji

        // 根据武器等级设置视觉效果
        if (player.weaponLevel >= 10) {
            player.style.textShadow = '0 -5px 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(59, 130, 246, 0.5)';
        } else if (player.weaponLevel >= 8) {
            player.style.textShadow = '0 -5px 20px rgba(245, 158, 11, 0.8), 0 0 40px rgba(245, 158, 11, 0.5)';
        } else if (player.weaponLevel >= 5) {
            player.style.textShadow = '0 -5px 20px rgba(236, 72, 153, 0.8)';
        } else {
            player.style.textShadow = '0 -5px 15px rgba(14, 165, 233, 0.8)';
        }

        // 根据等级设置emoji大小
        player.style.fontSize = `${Math.min(56, 36 + (player.weaponLevel - 1) * 2)}px`;

        gameContainer.appendChild(player);
        gameState.player = player;

        // 启动自动追踪敌人
        startAutoTracking();

        // 启动自动射击
        startAutoShooting();
    }

    // 开始自动追踪敌人
    function startAutoTracking() {
        let trackingInterval = setInterval(() => {
            if (!gameState.gameActive || gameState.revivalNeeded || !gameState.player) {
                return;
            }

            // 寻找最近的敌人作为目标
            const target = findNearestEnemy();
            if (target) {
                // 计算目标中心位置
                const targetRect = target.getBoundingClientRect();
                const containerRect = gameContainer.getBoundingClientRect();
                const targetX = targetRect.left - containerRect.left + targetRect.width / 2;

                // 移动玩家朝向目标
                const playerWidth = gameState.player.offsetWidth;
                const maxX = containerRect.width - playerWidth;
                const newX = Math.max(0, Math.min(maxX, targetX - playerWidth / 2));

                // 平滑移动效果
                const currentX = parseInt(gameState.player.style.left || (containerRect.width - playerWidth) / 2);
                const moveAmount = Math.sign(newX - currentX) * Math.min(5, Math.abs(newX - currentX));

                gameState.player.style.left = `${currentX + moveAmount}px`;
                gameState.player.style.transform = 'none';
            }
        }, 50); // 每50ms更新一次位置

        // 存储interval ID以便后续清理
        gameState.trackingInterval = trackingInterval;
    }

    // 寻找最近的敌人
    function findNearestEnemy() {
        if (!gameState.enemies.length) return null;

        const playerRect = gameState.player.getBoundingClientRect();
        let nearestEnemy = null;
        let minDistance = Infinity;

        gameState.enemies.forEach(enemy => {
            const enemyRect = enemy.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(enemyRect.left - playerRect.left, 2) +
                Math.pow(enemyRect.top - playerRect.top, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearestEnemy = enemy;
            }
        });

        return nearestEnemy;
    }

    // 移动玩家飞机（预留函数，现在主要使用自动追踪）
    function movePlayer(e) {
        // 保持空实现，因为我们现在使用自动追踪
    }

    // 升级玩家
    function upgradePlayer() {
        if (!gameState.player) return;

        // 提升武器等级，增加上限到8级以支持新的子弹类型
        gameState.player.weaponLevel = Math.min(8, gameState.player.weaponLevel + 1);

        // 提升射击速度
        gameState.player.shootSpeed = Math.max(150, gameState.player.shootSpeed - 120);

        // 增加伤害倍数
        if (!gameState.player.damageMultiplier) {
            gameState.player.damageMultiplier = 1.0;
        }
        gameState.player.damageMultiplier += 0.1; // 每次升级增加10%伤害
        
        // 增强版：根据武器等级增加特殊效果和属性
        switch (gameState.player.weaponLevel) {
            case 3:
                // 解锁波浪子弹效果
                gameState.player.canUseWaveBullets = true;
                break;
            case 5:
                // 解锁爆炸子弹效果
                gameState.player.canUseExplosiveBullets = true;
                break;
            case 7:
                // 解锁跟踪子弹效果
                gameState.player.canUseTrackingBullets = true;
                break;
            case 8:
                // 终极武器升级：增强所有子弹效果
                gameState.player.damageMultiplier += 0.2; // 额外20%伤害
                gameState.player.shootSpeed = Math.max(120, gameState.player.shootSpeed - 30); // 更快的射速
                break;
        }

        // 增加玩家大小（一定等级后）
        if (gameState.level % 3 === 0) {
            const currentWidth = parseInt(gameState.player.style.width);
            const newWidth = Math.min(80, currentWidth + 5);
            gameState.player.style.width = `${newWidth}px`;
            gameState.player.style.height = `${newWidth}px`;
            // 根据等级改变emoji大小
            gameState.player.style.fontSize = `${Math.min(56, 36 + (gameState.level - 1) * 2)}px`;
        }

        // 增强视觉效果，根据不同等级提供更华丽的特效
        if (gameState.level >= 5) {
            gameState.player.style.textShadow = '0 -5px 20px rgba(236, 72, 153, 0.8)';
        }
        if (gameState.level >= 8) {
            gameState.player.style.textShadow = '0 -5px 20px rgba(245, 158, 11, 0.8), 0 0 40px rgba(245, 158, 11, 0.5)';
        }
        if (gameState.level >= 10) {
            gameState.player.style.textShadow = '0 -5px 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(59, 130, 246, 0.5)';
        }

        // 保存玩家状态到savedPlayerStats，实现持久化
        gameState.savedPlayerStats.weaponLevel = gameState.player.weaponLevel;
        gameState.savedPlayerStats.shootSpeed = gameState.player.shootSpeed;
        gameState.savedPlayerStats.damageMultiplier = gameState.player.damageMultiplier;
        gameState.savedPlayerStats.playerWidth = parseInt(gameState.player.style.width);
        gameState.savedPlayerStats.canUseWaveBullets = gameState.player.canUseWaveBullets || false;
        gameState.savedPlayerStats.canUseExplosiveBullets = gameState.player.canUseExplosiveBullets || false;
        gameState.savedPlayerStats.canUseTrackingBullets = gameState.player.canUseTrackingBullets || false;

        // 清除并重新开始自动射击，以应用新的射击速度
        clearInterval(gameState.bulletTimer);
        startAutoShooting();

        // 更新游戏状态显示，立即显示新的武器信息
        updateGameStats();
    }

    // 开始自动射击
    function startAutoShooting() {
        if (!gameState.player || !gameState.gameActive || gameState.revivalNeeded) return;

        gameState.bulletTimer = setInterval(() => {
            shoot();
        }, gameState.player.shootSpeed);
    }

    // 创建激光束 - 增强版，支持多种激光效果
    function createLaser(x, y, color, laserType = 'normal') {
        const laser = document.createElement('div');
        laser.className = 'absolute z-5';
        laser.style.left = `${x}px`;
        laser.style.top = `-50px`;
        laser.style.backgroundColor = color;
        
        // 根据激光类型设置属性
        if (laserType === 'wide') {
            laser.style.width = '12px';
            laser.style.height = '200px';
            laser.style.borderRadius = '6px';
            laser.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
        } else if (laserType === 'pulse') {
            laser.style.width = '6px';
            laser.style.height = '180px';
            laser.style.borderRadius = '3px';
            laser.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
            
            // 脉冲动画
            let pulseOpacity = 1;
            let pulseDirection = -0.05;
            const pulseInterval = setInterval(() => {
                if (!laser.parentNode) {
                    clearInterval(pulseInterval);
                    return;
                }
                
                pulseOpacity += pulseDirection;
                if (pulseOpacity <= 0.5 || pulseOpacity >= 1) {
                    pulseDirection = -pulseDirection;
                }
                laser.style.opacity = pulseOpacity.toString();
            }, 30);
        } else if (laserType === 'plasma') {
            laser.style.width = '8px';
            laser.style.height = '220px';
            laser.style.borderRadius = '4px';
            laser.style.boxShadow = `0 0 25px ${color}, 0 0 50px ${color}, inset 0 0 10px rgba(255,255,255,0.5)`;
            laser.style.border = `1px solid rgba(255,255,255,0.8)`;
        } else { // normal
            laser.style.width = '4px';
            laser.style.height = '150px';
            laser.style.borderRadius = '2px';
            laser.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
        }

        // 基础伤害
        let baseDamage = 50;
        if (laserType === 'wide') {
            baseDamage = 70;
        } else if (laserType === 'pulse') {
            baseDamage = 60;
        } else if (laserType === 'plasma') {
            baseDamage = 80;
        }

        // 应用伤害倍数
        if (gameState.player && gameState.player.damageMultiplier) {
            baseDamage = Math.floor(baseDamage * gameState.player.damageMultiplier);
        }

        laser.damage = baseDamage;
        laser.isLaser = true;

        gameContainer.appendChild(laser);
        gameState.bullets.push(laser);

        // 激光特效动画
        laser.style.opacity = '0.7';
        
        // 波纹效果
        const ripple = document.createElement('div');
        ripple.className = 'absolute z-4';
        ripple.style.width = '2px';
        ripple.style.height = '100px';
        ripple.style.backgroundColor = color;
        ripple.style.left = `${x}px`;
        ripple.style.top = `-50px`;
        ripple.style.opacity = '0.5';
        ripple.style.transform = 'translateX(-50%)';
        gameContainer.appendChild(ripple);
        
        // 波纹动画
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 200);

        // 移动激光（实际上是固定位置，等待消失）
        setTimeout(() => {
            // 移除激光
            if (laser.parentNode) {
                laser.parentNode.removeChild(laser);
                gameState.bullets = gameState.bullets.filter(b => b !== laser);
            }
        }, 300);

        // 立即检查激光碰撞
        checkBulletCollisions(laser);
    }

    // 创建爆炸弹 - 增强版，支持多种爆炸效果
    function createBomb(x, y, bombType = 'normal') {
        const bomb = document.createElement('div');
        bomb.className = 'absolute z-5';
        bomb.style.borderRadius = '50%';
        bomb.style.left = `${x}px`;
        bomb.style.top = `${y}px`;
        
        // 根据炸弹类型设置属性
        let color = '#ef4444';
        let pulseInterval;
        
        if (bombType === 'napalm') {
            bomb.style.width = '12px';
            bomb.style.height = '12px';
            color = '#f59e0b';
            bomb.style.backgroundColor = color;
            bomb.style.boxShadow = `0 0 20px ${color}`;
            // 添加尾部火焰效果
            const trail = document.createElement('div');
            trail.className = 'absolute z-4';
            trail.style.width = '8px';
            trail.style.height = '30px';
            trail.style.backgroundColor = 'rgba(245, 158, 11, 0.7)';
            trail.style.left = `${x}px`;
            trail.style.top = `${y + 10}px`;
            trail.style.transform = 'translateX(-50%)';
            trail.style.borderBottomLeftRadius = '4px';
            trail.style.borderBottomRightRadius = '4px';
            trail.style.boxShadow = `0 0 10px ${color}`;
            gameContainer.appendChild(trail);
            
            // 追踪炸弹位置的尾部效果
            let trailUpdateInterval = setInterval(() => {
                if (!bomb.parentNode || !trail.parentNode) {
                    clearInterval(trailUpdateInterval);
                    if (trail.parentNode) trail.parentNode.removeChild(trail);
                    return;
                }
                const bombTop = parseInt(bomb.style.top);
                trail.style.top = `${bombTop + 10}px`;
            }, 10);
        } else if (bombType === 'electric') {
            bomb.style.width = '10px';
            bomb.style.height = '10px';
            color = '#06b6d4';
            bomb.style.backgroundColor = color;
            bomb.style.boxShadow = `0 0 25px ${color}`;
            bomb.style.border = '1px solid white';
            
            // 电击动画效果
            let electricPulse = 0;
            pulseInterval = setInterval(() => {
                if (!bomb.parentNode) {
                    clearInterval(pulseInterval);
                    return;
                }
                electricPulse += 0.1;
                const scale = 1 + 0.2 * Math.sin(electricPulse * 3);
                bomb.style.transform = `scale(${scale})`;
            }, 50);
        } else if (bombType === 'cluster') {
            bomb.style.width = '14px';
            bomb.style.height = '14px';
            color = '#8b5cf6';
            bomb.style.backgroundColor = color;
            bomb.style.boxShadow = `0 0 20px ${color}`;
            bomb.style.border = '2px dashed rgba(255,255,255,0.5)';
        } else { // normal
            bomb.style.width = '10px';
            bomb.style.height = '10px';
            bomb.style.backgroundColor = color;
            bomb.style.boxShadow = '0 0 15px #ef4444';
        }

        // 基础伤害
        let baseDamage = 10;
        if (bombType === 'napalm') {
            baseDamage = 15;
        } else if (bombType === 'electric') {
            baseDamage = 12;
        } else if (bombType === 'cluster') {
            baseDamage = 18;
        }

        // 应用伤害倍数
        if (gameState.player && gameState.player.damageMultiplier) {
            baseDamage = Math.floor(baseDamage * gameState.player.damageMultiplier);
        }

        bomb.damage = baseDamage;
        bomb.isBomb = true;
        bomb.exploded = false;
        bomb.bombType = bombType;
        
        // 根据炸弹类型设置速度
        if (bombType === 'napalm') {
            bomb.speed = 7;
        } else if (bombType === 'electric') {
            bomb.speed = 9;
        } else {
            bomb.speed = 8;
        }

        gameContainer.appendChild(bomb);
        gameState.bullets.push(bomb);

        // 移动炸弹
        function moveBomb() {
            if (!bomb || !gameState.gameActive || bomb.exploded) {
                if (pulseInterval) clearInterval(pulseInterval);
                return;
            }

            let currentTop = parseInt(bomb.style.top);

            // 更新炸弹位置
            currentTop -= bomb.speed;
            bomb.style.top = `${currentTop}px`;

            // 检测碰撞
            checkBulletCollisions(bomb);

            // 检查是否超出屏幕或需要继续移动
            if (currentTop < -20) {
                // 移除炸弹
                if (bomb.parentNode) {
                    bomb.parentNode.removeChild(bomb);
                    gameState.bullets = gameState.bullets.filter(b => b !== bomb);
                }
                if (pulseInterval) clearInterval(pulseInterval);
            } else {
                // 继续移动炸弹
                requestAnimationFrame(moveBomb);
            }
        }

        moveBomb();
    }

    // 射击 - 增强版，支持特效解锁和动态升级
    function shoot() {
        if (!gameState.player || !gameState.gameActive || gameState.revivalNeeded) return;

        const weaponLevel = gameState.player.weaponLevel;
        const playerRect = gameState.player.getBoundingClientRect();
        const containerRect = gameContainer.getBoundingClientRect();
        const playerX = playerRect.left - containerRect.left;
        const playerY = playerRect.top - containerRect.top;
        const playerCenter = playerX + playerRect.width / 2;
        
        // 获取玩家已解锁的特效
        const canUseWaveBullets = gameState.player.canUseWaveBullets || false;
        const canUseExplosiveBullets = gameState.player.canUseExplosiveBullets || false;
        const canUseTrackingBullets = gameState.player.canUseTrackingBullets || false;

        // 根据武器等级和已解锁特效发射不同数量和类型的子弹
        switch (weaponLevel) {
            case 1: // 单发射击 - 基础蓝色子弹
                createBullet(playerCenter, playerY, 0, '#0ea5e9', false, false, 'normal', 'glow');
                break;
            case 2: // 双发射击 - 蓝色子弹，带有轻微发光效果
                createBullet(playerCenter - 10, playerY, 0, '#0ea5e9', false, false, 'normal', 'glow');
                createBullet(playerCenter + 10, playerY, 0, '#0ea5e9', false, false, 'normal', 'glow');
                break;
            case 3: // 三发射击 - 粉色子弹，带有波浪轨迹
                // 如果解锁了波浪效果，增强波浪振幅
                const waveAmplitude = canUseWaveBullets ? 2 : 1;
                
                const pinkBullet1 = createBullet(playerCenter, playerY, 0, '#ec4899', false, false, 'normal');
                if (pinkBullet1) pinkBullet1.waveAmplitude = waveAmplitude;
                
                const pinkBullet2 = createBullet(playerCenter - 15, playerY, -5, '#ec4899', false, false, 'normal');
                if (pinkBullet2) pinkBullet2.waveAmplitude = waveAmplitude;
                
                const pinkBullet3 = createBullet(playerCenter + 15, playerY, 5, '#ec4899', false, false, 'normal');
                if (pinkBullet3) pinkBullet3.waveAmplitude = waveAmplitude;
                
                // 解锁波浪效果时添加额外的特效
                if (canUseWaveBullets) {
                    const extraWave1 = createBullet(playerCenter - 25, playerY, -8, '#ec4899', false, false, 'small');
                    const extraWave2 = createBullet(playerCenter + 25, playerY, 8, '#ec4899', false, false, 'small');
                    if (extraWave1) extraWave1.waveAmplitude = waveAmplitude + 1;
                    if (extraWave2) extraWave2.waveAmplitude = waveAmplitude + 1;
                }
                break;
            case 4: // 四发射击 - 紫色子弹，增加伤害
                createBullet(playerCenter - 10, playerY, 0, '#7c3aed', false, false, 'large');
                createBullet(playerCenter + 10, playerY, 0, '#7c3aed', false, false, 'large');
                createBullet(playerCenter - 20, playerY, -3, '#7c3aed', false, false, 'normal');
                createBullet(playerCenter + 20, playerY, 3, '#7c3aed', false, false, 'normal');
                break;
            case 5: // 五发射击 - 黄色子弹，带有爆炸效果
                // 中心发射爆炸子弹
                createBullet(playerCenter, playerY, 0, '#fbbf24', canUseExplosiveBullets, false, 'large', 'fire');
                
                // 两侧发射普通子弹
                createBullet(playerCenter - 15, playerY, -4, '#fbbf24', false, false, 'normal', 'fire');
                createBullet(playerCenter + 15, playerY, 4, '#fbbf24', false, false, 'normal', 'fire');
                createBullet(playerCenter - 30, playerY, -8, '#fbbf24', false, false, 'normal');
                createBullet(playerCenter + 30, playerY, 8, '#fbbf24', false, false, 'normal');
                
                // 解锁爆炸效果时添加额外的爆炸子弹
                if (canUseExplosiveBullets) {
                    createBullet(playerCenter - 22, playerY, -6, '#fbbf24', true, false, 'normal', 'fire');
                    createBullet(playerCenter + 22, playerY, 6, '#fbbf24', true, false, 'normal', 'fire');
                }
                break;
            case 6: // 爆炸弹模式 - 红色子弹和爆炸弹的组合
                // 两侧发射炸弹
                createBomb(playerCenter - 20, playerY);
                createBomb(playerCenter + 20, playerY);
                
                // 中心发射强力爆炸子弹
                createBullet(playerCenter, playerY, 0, '#f87171', true, false, 'huge', 'fire');
                
                // 根据已解锁特效增强射击
                if (canUseWaveBullets) {
                    const waveBomb1 = createBullet(playerCenter - 10, playerY, -2, '#f87171', true, false, 'large', 'fire');
                    const waveBomb2 = createBullet(playerCenter + 10, playerY, 2, '#f87171', true, false, 'large', 'fire');
                    if (waveBomb1) waveBomb1.waveAmplitude = 1;
                    if (waveBomb2) waveBomb2.waveAmplitude = 1;
                }
                break;
            case 7: // 激光模式 - 绿色激光束和跟踪子弹
                // 三束激光
                createLaser(playerCenter - 15, playerY, '#34d399');
                createLaser(playerCenter, playerY, '#34d399');
                createLaser(playerCenter + 15, playerY, '#34d399');
                
                // 添加跟踪子弹
                if (canUseTrackingBullets) {
                    // 解锁跟踪效果时，增加跟踪子弹数量和提升性能
                    createBullet(playerCenter - 25, playerY, 0, '#34d399', false, true, 'small');
                    createBullet(playerCenter + 25, playerY, 0, '#34d399', false, true, 'small');
                    createBullet(playerCenter - 35, playerY, -2, '#34d399', false, true, 'small');
                    createBullet(playerCenter + 35, playerY, 2, '#34d399', false, true, 'small');
                } else {
                    // 未解锁跟踪效果时，使用普通子弹
                    createBullet(playerCenter - 25, playerY, 0, '#34d399', false, false, 'small');
                    createBullet(playerCenter + 25, playerY, 0, '#34d399', false, false, 'small');
                }
                break;
            case 8: // 终极模式 - 多彩混合子弹效果
                // 中心发射强力激光
                createLaser(playerCenter, playerY, '#60a5fa');
                
                // 两侧发射爆炸弹
                createBomb(playerCenter - 30, playerY);
                createBomb(playerCenter + 30, playerY);
                
                // 周围发射高级子弹 - 结合爆炸和跟踪效果
                const isExplosiveAndTracking = canUseExplosiveBullets && canUseTrackingBullets;
                createBullet(playerCenter - 10, playerY, -2, '#fbbf24', isExplosiveAndTracking, canUseTrackingBullets, 'large', 'glow');
                createBullet(playerCenter + 10, playerY, 2, '#fbbf24', isExplosiveAndTracking, canUseTrackingBullets, 'large', 'glow');
                
                // 闪电效果子弹
                createBullet(playerCenter - 40, playerY, -4, '#06b6d4', false, false, 'normal', 'lightning');
                createBullet(playerCenter + 40, playerY, 4, '#06b6d4', false, false, 'normal', 'lightning');
                
                // 波浪轨迹子弹 - 根据解锁的波浪效果增强
                const finalWaveAmplitude = canUseWaveBullets ? 3 : 2;
                const waveBullet1 = createBullet(playerCenter - 20, playerY, -1, '#f472b6', false, false, 'normal');
                const waveBullet2 = createBullet(playerCenter + 20, playerY, 1, '#f472b6', false, false, 'normal');
                if (waveBullet1) waveBullet1.waveAmplitude = finalWaveAmplitude;
                if (waveBullet2) waveBullet2.waveAmplitude = finalWaveAmplitude;
                
                // 终极武器额外增强
                if (gameState.player.damageMultiplier >= 1.8) {
                    // 额外的爆炸子弹
                    createBullet(playerCenter - 50, playerY, -6, '#8b5cf6', true, canUseTrackingBullets, 'large', 'glow');
                    createBullet(playerCenter + 50, playerY, 6, '#8b5cf6', true, canUseTrackingBullets, 'large', 'glow');
                }
                break;
        }

        // 射击音效（可以添加）
    }

    // 创建子弹 - 增强版，支持多种效果
    function createBullet(x, y, angle, color, isExplosive = false, isTracking = false, bulletSize = 'normal', bulletEffect = 'none') {
        const bullet = document.createElement('div');
        bullet.className = 'absolute z-5';
        
        // 根据子弹大小设置尺寸
        switch (bulletSize) {
            case 'small':
                bullet.style.width = '4px';
                bullet.style.height = '10px';
                break;
            case 'large':
                bullet.style.width = '10px';
                bullet.style.height = '20px';
                break;
            case 'huge':
                bullet.style.width = '15px';
                bullet.style.height = '25px';
                break;
            default: // normal
                bullet.style.width = '6px';
                bullet.style.height = '15px';
        }
        
        // 设置子弹样式
        bullet.style.backgroundColor = color;
        bullet.style.borderRadius = '3px';
        bullet.style.left = `${x}px`;
        bullet.style.top = `${y}px`;
        bullet.style.transform = `translateX(-50%)`;
        
        // 根据子弹效果设置特殊样式
        let boxShadow = `0 0 10px ${color}`;
        if (bulletEffect === 'glow') {
            boxShadow = `0 0 20px ${color}, 0 0 30px ${color}`;
        } else if (bulletEffect === 'fire') {
            boxShadow = `0 0 15px ${color}, 0 0 25px rgba(251, 191, 36, 0.5)`;
        } else if (bulletEffect === 'lightning') {
            boxShadow = `0 0 10px ${color}, 0 0 20px rgba(14, 165, 233, 0.7)`;
            bullet.style.border = `1px solid ${color}`;
        }
        bullet.style.boxShadow = boxShadow;

        // 基础伤害
        let baseDamage = 5;
        if (isExplosive) {
            baseDamage = 12;
        } else if (bulletSize === 'large') {
            baseDamage = 8;
        } else if (bulletSize === 'huge') {
            baseDamage = 15;
        }

        // 应用伤害倍数
        if (gameState.player && gameState.player.damageMultiplier) {
            baseDamage = Math.floor(baseDamage * gameState.player.damageMultiplier);
        }

        // 设置子弹属性
        bullet.damage = baseDamage;
        bullet.isExplosive = isExplosive;
        bullet.isTracking = isTracking;
        bullet.angle = angle;
        bullet.phase = 0; // 用于波浪运动
        bullet.waveAmplitude = 0; // 波浪振幅
        bullet.effect = bulletEffect;
        
        // 根据子弹等级和效果设置速度
        if (bulletSize === 'small') {
            bullet.speed = 18;
        } else if (bulletSize === 'huge') {
            bullet.speed = 12;
        } else if (bulletEffect === 'lightning') {
            bullet.speed = 25;
        } else {
            bullet.speed = 15;
        }

        gameContainer.appendChild(bullet);
        gameState.bullets.push(bullet);

        // 移动子弹
        function moveBullet() {
            if (!bullet || !gameState.gameActive || gameState.revivalNeeded) return;

            let currentTop = parseInt(bullet.style.top);
            let currentLeft = parseInt(bullet.style.left);

            // 更新子弹位置
            currentTop -= bullet.speed;
            
            // 追踪效果
            if (isTracking && gameState.enemies.length > 0) {
                // 寻找最近的敌人
                let closestEnemy = null;
                let minDistance = Infinity;
                
                for (const enemy of gameState.enemies) {
                    const enemyRect = enemy.getBoundingClientRect();
                    const enemyX = enemyRect.left - gameContainer.getBoundingClientRect().left + enemyRect.width / 2;
                    const enemyY = enemyRect.top - gameContainer.getBoundingClientRect().top + enemyRect.height / 2;
                    
                    const distance = Math.sqrt(Math.pow(enemyX - currentLeft, 2) + Math.pow(enemyY - currentTop, 2));
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestEnemy = enemy;
                    }
                }
                
                // 如果找到敌人，则追踪
                if (closestEnemy) {
                    const enemyRect = closestEnemy.getBoundingClientRect();
                    const enemyX = enemyRect.left - gameContainer.getBoundingClientRect().left + enemyRect.width / 2;
                    
                    // 缓慢调整角度追踪
                    if (Math.abs(enemyX - currentLeft) > 5) {
                        bullet.angle = (enemyX > currentLeft) ? 0.5 : -0.5;
                    }
                }
            }
            
            // 波浪运动效果
            if (bullet.waveAmplitude > 0) {
                bullet.phase += 0.1;
                currentLeft += bullet.waveAmplitude * Math.sin(bullet.phase);
            } else {
                currentLeft += bullet.angle;
            }

            bullet.style.top = `${currentTop}px`;
            bullet.style.left = `${currentLeft}px`;

            // 检测碰撞
            checkBulletCollisions(bullet);

            // 检查是否超出屏幕或需要继续移动
            if (currentTop < -20 || currentLeft < -20 || currentLeft > gameContainer.offsetWidth + 20) {
                // 移除子弹
                if (bullet.parentNode) {
                    bullet.parentNode.removeChild(bullet);
                    gameState.bullets = gameState.bullets.filter(b => b !== bullet);
                }
            } else {
                // 继续移动子弹
                requestAnimationFrame(moveBullet);
            }
        }

        moveBullet();
    }

    // 检测子弹碰撞 - 增强版，支持多种爆炸效果
    function checkBulletCollisions(bullet) {
        if (!bullet) return;

        const bulletRect = bullet.getBoundingClientRect();

        // 激光特殊处理
        if (bullet.isLaser) {
            // 激光可以穿透多个敌人
            let enemiesHit = 0;

            // 检查是否击中BOSS
            if (gameState.bossActive && gameState.boss) {
                const bossRect = gameState.boss.getBoundingClientRect();

                if (isColliding(bulletRect, bossRect)) {
                    // 击中BOSS
                    gameState.bossHealth -= bullet.damage;
                    updateBossHealth();
                    enemiesHit++;

                    // BOSS受伤特效
                    createExplosion(bulletRect.left, bulletRect.top, 40, '#34d399');
                }
            }

            // 检查是否击中普通敌人
            for (let i = gameState.enemies.length - 1; i >= 0; i--) {
                const enemy = gameState.enemies[i];
                if (!enemy) continue;

                const enemyRect = enemy.getBoundingClientRect();

                if (isColliding(bulletRect, enemyRect)) {
                    // 击中敌人
                    enemy.health -= bullet.damage;
                    enemiesHit++;

                    // 敌人受伤效果
                    enemy.style.opacity = '0.7';
                    setTimeout(() => {
                        if (enemy) enemy.style.opacity = '1';
                    }, 100);

                    // 激光击中特效
                    createExplosion(bulletRect.left, bulletRect.top, 20, '#34d399');

                    // 检查敌人是否被消灭
                    if (enemy.health <= 0) {
                        destroyEnemy(enemy, i);
                    }
                }
            }

            // 激光有击中效果
            if (enemiesHit > 0) {
                bullet.style.boxShadow = `0 0 20px #34d399, 0 0 40px #34d399`;
                setTimeout(() => {
                    if (bullet) {
                        bullet.style.boxShadow = `0 0 15px #34d399, 0 0 30px #34d399`;
                    }
                }, 100);
            }

            return;
        }

        // 炸弹特殊处理
        if (bullet.isBomb && !bullet.exploded) {
            // 根据炸弹类型创建不同的爆炸效果
            const bombType = bullet.bombType || 'normal';
            const explosionRadius = bombType === 'napalm' ? 70 : bombType === 'electric' ? 65 : 60;
            
            // 检查是否击中BOSS
            if (gameState.bossActive && gameState.boss) {
                const bossRect = gameState.boss.getBoundingClientRect();

                if (isColliding(bulletRect, bossRect)) {
                    // 炸弹爆炸
                    bullet.exploded = true;

                    // 移除炸弹
                    if (bullet.parentNode) {
                        bullet.parentNode.removeChild(bullet);
                        gameState.bullets = gameState.bullets.filter(b => b !== bullet);
                    }

                    // 根据炸弹类型创建不同的爆炸效果
                    createEnhancedExplosion(bulletRect.left, bulletRect.top, bombType);

                    // 对BOSS造成范围伤害
                    let damage = bullet.damage * 5;
                    
                    // 根据炸弹类型调整伤害
                    if (bombType === 'napalm') {
                        damage = Math.floor(damage * 1.3);
                        // 对BOSS应用燃烧效果
                        applyBurnEffect(gameState.boss, 5, 8);
                    } else if (bombType === 'electric') {
                        damage = Math.floor(damage * 1.2);
                        createElectricChain(bulletRect.left, bulletRect.top);
                    } else if (bombType === 'cluster') {
                        damage = Math.floor(damage * 1.1);
                        createClusterBombs(bulletRect.left, bulletRect.top);
                    }
                    
                    gameState.bossHealth -= damage;
                    updateBossHealth();

                    return;
                }
            }

            // 检查是否击中普通敌人
            for (let i = gameState.enemies.length - 1; i >= 0; i--) {
                const enemy = gameState.enemies[i];
                if (!enemy) continue;

                const enemyRect = enemy.getBoundingClientRect();

                if (isColliding(bulletRect, enemyRect)) {
                    // 炸弹爆炸
                    bullet.exploded = true;

                    // 移除炸弹
                    if (bullet.parentNode) {
                        bullet.parentNode.removeChild(bullet);
                        gameState.bullets = gameState.bullets.filter(b => b !== bullet);
                    }

                    // 创建爆炸效果
                    createEnhancedExplosion(bulletRect.left, bulletRect.top, bombType);

                    // 对范围内的敌人造成伤害
                    const explosionX = bulletRect.left;
                    const explosionY = bulletRect.top;

                    // 根据炸弹类型添加特殊效果
                    if (bombType === 'electric') {
                        createElectricChain(explosionX, explosionY);
                    } else if (bombType === 'cluster') {
                        createClusterBombs(explosionX, explosionY);
                    }

                    for (let j = gameState.enemies.length - 1; j >= 0; j--) {
                        const enemyInRange = gameState.enemies[j];
                        if (!enemyInRange) continue;

                        const enemyInRangeRect = enemyInRange.getBoundingClientRect();
                        const enemyCenterX = enemyInRangeRect.left + enemyInRangeRect.width / 2;
                        const enemyCenterY = enemyInRangeRect.top + enemyInRangeRect.height / 2;

                        // 计算距离
                        const distance = Math.sqrt(
                            Math.pow(enemyCenterX - explosionX, 2) +
                            Math.pow(enemyCenterY - explosionY, 2)
                        );

                        // 在爆炸范围内的敌人受到伤害
                        if (distance <= explosionRadius) {
                            // 根据距离计算伤害
                            const damageFactor = 1 - (distance / explosionRadius);
                            let damage = bullet.damage * 3 * damageFactor;
                            
                            // 根据炸弹类型调整伤害
                            if (bombType === 'napalm') {
                                damage = Math.floor(damage * 1.2); // 燃烧弹额外伤害
                            } else if (bombType === 'electric') {
                                damage = Math.floor(damage * 1.1); // 电浆弹小幅额外伤害
                            }
                            
                            enemyInRange.health -= damage;

                            // 敌人受伤效果
                            enemyInRange.style.opacity = '0.7';
                            setTimeout(() => {
                                if (enemyInRange) enemyInRange.style.opacity = '1';
                            }, 100);
                            
                            // 燃烧弹的持续伤害效果
                            if (bombType === 'napalm' && Math.random() > 0.3) {
                                applyBurnEffect(enemyInRange, 3, 5); // 3次，每次5点伤害
                            }

                            // 检查敌人是否被消灭
                            if (enemyInRange.health <= 0) {
                                destroyEnemy(enemyInRange, j);
                            }
                        }
                    }

                    break;
                }
            }

            return;
        }

        // 普通子弹和爆炸子弹的处理
        // 检查是否击中BOSS
        if (gameState.bossActive && gameState.boss) {
            const bossRect = gameState.boss.getBoundingClientRect();

            if (isColliding(bulletRect, bossRect)) {
                // 击中BOSS
                gameState.bossHealth -= bullet.damage;
                updateBossHealth();

                // 移除子弹
                if (bullet.parentNode) {
                    bullet.parentNode.removeChild(bullet);
                    gameState.bullets = gameState.bullets.filter(b => b !== bullet);
                }

                // 子弹爆炸效果
                if (bullet.isExplosive) {
                    createExplosion(bulletRect.left, bulletRect.top, 30, '#fbbf24');
                }
                
                // 如果是带有特殊效果的子弹，应用对应效果
                if (bullet.effect === 'lightning') {
                    createLightningEffect(bulletRect.left, bulletRect.top, bossRect.left, bossRect.top);
                } else if (bullet.effect === 'fire') {
                    createSmallExplosion(bulletRect.left, bulletRect.top, 'fire');
                }

                return;
            }
        }

        // 检查是否击中普通敌人
        for (let i = gameState.enemies.length - 1; i >= 0; i--) {
            const enemy = gameState.enemies[i];
            if (!enemy) continue;

            const enemyRect = enemy.getBoundingClientRect();

            if (isColliding(bulletRect, enemyRect)) {
                // 击中敌人
                enemy.health -= bullet.damage;

                // 敌人受伤效果
                enemy.style.opacity = '0.7';
                setTimeout(() => {
                    if (enemy) enemy.style.opacity = '1';
                }, 100);

                // 移除子弹
                if (bullet.parentNode) {
                    bullet.parentNode.removeChild(bullet);
                    gameState.bullets = gameState.bullets.filter(b => b !== bullet);
                }

                // 子弹爆炸效果
                if (bullet.isExplosive) {
                    createExplosion(bulletRect.left, bulletRect.top, 30, '#fbbf24');
                }
                
                // 如果是带有特殊效果的子弹，应用对应效果
                if (bullet.effect === 'lightning') {
                    createLightningEffect(bulletRect.left, bulletRect.top, enemyRect.left, enemyRect.top);
                } else if (bullet.effect === 'fire') {
                    createSmallExplosion(bulletRect.left, bulletRect.top, 'fire');
                }

                // 检查敌人是否被消灭
                if (enemy.health <= 0) {
                    destroyEnemy(enemy, i);
                }

                break;
            }
        }
    }

    // 创建增强版爆炸效果
    function createEnhancedExplosion(x, y, explosionType = 'normal') {
        const explosion = document.createElement('div');
        explosion.className = 'absolute z-40';
        explosion.style.borderRadius = '50%';
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;
        explosion.style.transform = 'translate(-50%, -50%)';
        explosion.style.opacity = '0.8';
        explosion.style.transform = 'scale(0)';
        explosion.style.transition = 'all 0.6s ease-out';
        
        let color = '#ef4444';
        let size = 60;
        
        // 根据爆炸类型设置不同属性
        if (explosionType === 'napalm') {
            color = '#f59e0b';
            size = 70;
            explosion.style.backgroundColor = color;
            explosion.style.boxShadow = `0 0 40px ${color}`;
            
            // 添加火焰粒子效果
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createFireParticle(x, y);
                }, i * 50);
            }
        } else if (explosionType === 'electric') {
            color = '#06b6d4';
            size = 65;
            explosion.style.backgroundColor = color;
            explosion.style.boxShadow = `0 0 45px ${color}`;
            explosion.style.border = '2px solid white';
        } else if (explosionType === 'cluster') {
            color = '#8b5cf6';
            size = 55;
            explosion.style.backgroundColor = color;
            explosion.style.boxShadow = `0 0 40px ${color}`;
        } else { // normal
            explosion.style.backgroundColor = color;
            explosion.style.boxShadow = '0 0 30px #ef4444';
        }
        
        explosion.style.width = `${size}px`;
        explosion.style.height = `${size}px`;
        
        gameContainer.appendChild(explosion);
        
        // 触发爆炸动画
        setTimeout(() => {
            explosion.style.transform = 'scale(1.2) translate(-50%, -50%)';
            explosion.style.opacity = '0';
        }, 10);
        
        // 移除爆炸效果
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 700);
        
        // 创建波纹效果增强视觉冲击力
        for (let i = 1; i <= 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('div');
                ripple.className = 'absolute z-30';
                ripple.style.width = `${size * (0.5 + i * 0.3)}px`;
                ripple.style.height = `${size * (0.5 + i * 0.3)}px`;
                ripple.style.border = `2px solid ${color}`;
                ripple.style.borderRadius = '50%';
                ripple.style.left = `${x - (size * (0.5 + i * 0.3)) / 2}px`;
                ripple.style.top = `${y - (size * (0.5 + i * 0.3)) / 2}px`;
                ripple.style.opacity = '0.7';
                ripple.style.transform = 'scale(0)';
                ripple.style.transition = `all 0.8s ease-out`;

                gameContainer.appendChild(ripple);

                setTimeout(() => {
                    ripple.style.transform = 'scale(1)';
                    ripple.style.opacity = '0';
                }, 10);

                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 900);
            }, i * 100);
        }
    }

    // 创建火焰粒子效果
    function createFireParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'absolute z-5';
        particle.style.width = `${Math.random() * 6 + 3}px`;
        particle.style.height = `${Math.random() * 6 + 3}px`;
        particle.style.backgroundColor = `rgba(245, 158, 11, ${Math.random() * 0.5 + 0.5})`;
        particle.style.borderRadius = '50%';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.pointerEvents = 'none';
        
        gameContainer.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        const duration = Math.random() * 30 + 30;
        let currentTime = 0;
        
        function animateParticle() {
            if (currentTime < duration) {
                currentTime++;
                const progress = currentTime / duration;
                const xOffset = Math.cos(angle) * speed * progress;
                const yOffset = Math.sin(angle) * speed * progress;
                particle.style.left = `${x + xOffset}px`;
                particle.style.top = `${y + yOffset}px`;
                particle.style.opacity = 1 - progress;
                requestAnimationFrame(animateParticle);
            } else {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        }
        
        animateParticle();
    }

    // 创建闪电效果
    function createLightningEffect(x1, y1, x2, y2) {
        const lightning = document.createElement('div');
        lightning.className = 'absolute z-5';
        lightning.style.backgroundColor = '#06b6d4';
        lightning.style.opacity = '0.8';
        lightning.style.pointerEvents = 'none';
        
        // 计算闪电的长度和角度
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        lightning.style.width = `${length}px`;
        lightning.style.height = '2px';
        lightning.style.left = `${x1}px`;
        lightning.style.top = `${y1 + 2.5}px`;
        lightning.style.transformOrigin = '0 0';
        lightning.style.transform = `rotate(${angle}deg)`;
        lightning.style.boxShadow = '0 0 10px #06b6d4';
        
        gameContainer.appendChild(lightning);
        
        // 闪烁效果
        let opacity = 0.8;
        let fadeOut = false;
        
        function animateLightning() {
            if (opacity > 0) {
                if (fadeOut) {
                    opacity -= 0.1;
                } else {
                    opacity += 0.05;
                    if (opacity >= 0.9) fadeOut = true;
                }
                lightning.style.opacity = opacity;
                requestAnimationFrame(animateLightning);
            } else {
                if (lightning.parentNode) {
                    lightning.parentNode.removeChild(lightning);
                }
            }
        }
        
        animateLightning();
    }

    // 创建小型爆炸效果
    function createSmallExplosion(x, y, type = 'normal') {
        const explosion = document.createElement('div');
        explosion.className = 'absolute z-5';
        explosion.style.borderRadius = '50%';
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;
        explosion.style.transform = 'translate(-50%, -50%)';
        explosion.style.opacity = '0.8';
        explosion.style.transform = 'scale(0)';
        explosion.style.transition = 'all 0.3s ease-out';
        
        if (type === 'fire') {
            explosion.style.backgroundColor = 'rgba(245, 158, 11, 0.8)';
            explosion.style.boxShadow = '0 0 15px #f59e0b';
        } else {
            explosion.style.backgroundColor = 'rgba(239, 68, 68, 0.8)';
            explosion.style.boxShadow = '0 0 15px #ef4444';
        }
        
        explosion.style.width = '15px';
        explosion.style.height = '15px';
        
        gameContainer.appendChild(explosion);
        
        // 触发爆炸动画
        setTimeout(() => {
            explosion.style.transform = 'scale(1.2) translate(-50%, -50%)';
            explosion.style.opacity = '0';
        }, 10);
        
        // 移除爆炸效果
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 300);
    }

    // 创建电链效果
    function createElectricChain(x, y) {
        // 找到附近的敌人
        let closestEnemy = null;
        let minDistance = Infinity;
        const searchRadius = 150;
        
        gameState.enemies.forEach(enemy => {
            if (!enemy || !enemy.offsetParent) return;
            const eRect = enemy.getBoundingClientRect();
            const enemyCenterX = eRect.left + eRect.width / 2;
            const enemyCenterY = eRect.top + eRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(enemyCenterX - x, 2) + 
                Math.pow(enemyCenterY - y, 2)
            );
            
            if (distance < minDistance && distance < searchRadius) {
                minDistance = distance;
                closestEnemy = {x: enemyCenterX, y: enemyCenterY};
            }
        });
        
        // 如果找到敌人，创建闪电链
        if (closestEnemy) {
            createLightningEffect(x, y, closestEnemy.x, closestEnemy.y);
            
            // 有概率继续链到下一个敌人
            if (Math.random() > 0.6) {
                setTimeout(() => {
                    createElectricChain(closestEnemy.x, closestEnemy.y);
                }, 100);
            }
        }
    }

    // 创建集束炸弹效果
    function createClusterBombs(x, y) {
        // 创建6个小型爆炸效果
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const distance = 30;
            const clusterX = x + Math.cos(angle) * distance;
            const clusterY = y + Math.sin(angle) * distance;
            
            setTimeout(() => {
                createSmallExplosion(clusterX, clusterY, 'normal');
            }, i * 50);
        }
    }

    // 应用燃烧效果
    function applyBurnEffect(target, duration, damagePerTick) {
        if (!target || !target.offsetParent || target.isBurning) return;
        
        target.isBurning = true;
        let burnTicks = 0;
        
        // 添加燃烧视觉效果
        const burnEffect = document.createElement('div');
        burnEffect.className = 'absolute z-3 pointer-events-none';
        burnEffect.style.width = '100%';
        burnEffect.style.height = '100%';
        burnEffect.style.backgroundColor = 'rgba(245, 158, 11, 0.3)';
        burnEffect.style.boxShadow = '0 0 10px #f59e0b';
        
        if (target.isBoss) {
            // BOSS的燃烧效果
            burnEffect.style.border = '2px solid rgba(245, 158, 11, 0.8)';
            target.appendChild(burnEffect);
        } else {
            // 普通敌人的燃烧效果
            target.appendChild(burnEffect);
        }
        
        const burnInterval = setInterval(() => {
            if (!target || !target.offsetParent || burnTicks >= duration) {
                clearInterval(burnInterval);
                if (burnEffect.parentNode) {
                    burnEffect.parentNode.removeChild(burnEffect);
                }
                if (target) target.isBurning = false;
                return;
            }
            
            burnTicks++;
            
            // 闪烁效果
            burnEffect.style.opacity = Math.sin(burnTicks) * 0.2 + 0.3;
            
            // 造成伤害
            if (target.isBoss) {
                gameState.bossHealth -= damagePerTick;
                updateBossHealth();
            } else {
                target.health -= damagePerTick;
                
                // 检查敌人是否被消灭
                if (target.health <= 0) {
                    // 找到敌人索引
                    const index = gameState.enemies.findIndex(e => e === target);
                    if (index !== -1) {
                        destroyEnemy(target, index);
                    }
                }
            }
        }, 500); // 每500毫秒造成一次伤害
    }

    // 创建大型爆炸效果
    function createBigExplosion(x, y, size, color) {
        const explosion = document.createElement('div');
        explosion.className = 'absolute z-40';
        explosion.style.width = `${size}px`;
        explosion.style.height = `${size}px`;
        explosion.style.backgroundColor = color;
        explosion.style.borderRadius = '50%';
        explosion.style.left = `${x - size / 2}px`;
        explosion.style.top = `${y - size / 2}px`;
        explosion.style.opacity = '0.8';
        explosion.style.transform = 'scale(0)';
        explosion.style.transition = 'all 0.6s ease-out';

        // 添加径向渐变效果
        const gradientColor = color === '#ef4444' ? '#f87171' : color;
        explosion.style.boxShadow = `0 0 40px ${gradientColor}`;

        gameContainer.appendChild(explosion);

        // 触发爆炸动画
        setTimeout(() => {
            explosion.style.transform = 'scale(1.2)';
            explosion.style.opacity = '0';
        }, 10);

        // 移除爆炸效果
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 700);

        // 创建波纹效果增强视觉冲击力
        for (let i = 1; i <= 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('div');
                ripple.className = 'absolute z-30';
                ripple.style.width = `${size * (0.5 + i * 0.3)}px`;
                ripple.style.height = `${size * (0.5 + i * 0.3)}px`;
                ripple.style.border = `2px solid ${color}`;
                ripple.style.borderRadius = '50%';
                ripple.style.left = `${x - (size * (0.5 + i * 0.3)) / 2}px`;
                ripple.style.top = `${y - (size * (0.5 + i * 0.3)) / 2}px`;
                ripple.style.opacity = '0.7';
                ripple.style.transform = 'scale(0)';
                ripple.style.transition = `all 0.8s ease-out`;

                gameContainer.appendChild(ripple);

                setTimeout(() => {
                    ripple.style.transform = 'scale(1)';
                    ripple.style.opacity = '0';
                }, 10);

                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 900);
            }, i * 100);
        }
    }

    // 开始生成敌人
    function startEnemySpawn() {
        // 初始生成间隔（毫秒），随时间逐渐缩短但有最小值
        const spawnRate = 2500; // 增加初始间隔时间，让游戏更平缓

        gameState.enemyTimer = setInterval(() => {
            if (!gameState.gameActive || gameState.revivalNeeded) return;

            // 限制敌人数量上限，随时间缓慢增加
            const elapsedTime = gameDuration - gameState.gameTime;
            const maxEnemies = Math.min(15, 5 + Math.floor(elapsedTime / 15)); // 初始最多5个敌人，每15秒增加1个

            if (gameState.enemies.length >= maxEnemies) return;

            // 每30秒检查是否生成BOSS
            if (elapsedTime > 0 && elapsedTime % 30 === 0 && !gameState.bossActive) {
                spawnBoss();
            } else {
                // 生成普通敌人，降低生成数量
                const enemyCount = Math.min(1, Math.floor(elapsedTime / 30) + 1); // 减少初始生成数量
                for (let i = 0; i < enemyCount; i++) {
                    setTimeout(() => {
                        spawnEnemy(elapsedTime);
                    }, i * 700);
                }
            }

            // 随时间增加生成频率，但不要太快
            const newSpawnRate = Math.max(1200, spawnRate - elapsedTime * 3); // 减缓频率增加速度
            clearInterval(gameState.enemyTimer);
            gameState.enemyTimer = setInterval(() => {
                // 调整定时器逻辑，避免重复嵌套调用
                if (gameState.gameActive && !gameState.revivalNeeded) {
                    const currentElapsedTime = gameDuration - gameState.gameTime;
                    const currentMaxEnemies = Math.min(15, 5 + Math.floor(currentElapsedTime / 15));

                    if (gameState.enemies.length < currentMaxEnemies) {
                        const currentEnemyCount = Math.min(1, Math.floor(currentElapsedTime / 30) + 1);
                        for (let i = 0; i < currentEnemyCount; i++) {
                            setTimeout(() => {
                                spawnEnemy(currentElapsedTime);
                            }, i * 700);
                        }
                    }
                }
            }, newSpawnRate);
        }, spawnRate);
    }

    // 生成普通敌人
    function spawnEnemy(elapsedTime) {
        if (!gameState.gameActive || gameState.revivalNeeded) return;

        // 根据时间调整敌人强度
        const enemyLevel = Math.min(5, Math.floor(elapsedTime / 30) + 1); // 减缓敌人强度增加速度

        const enemy = document.createElement('div');
        enemy.className = 'absolute text-2xl z-20';
        enemy.style.width = '40px';
        enemy.style.height = '40px';
        enemy.style.display = 'flex';
        enemy.style.alignItems = 'center';
        enemy.style.justifyContent = 'center';

        // 根据等级使用不同的敌人emoji
        const enemyEmojis = ['👾', '🛸', '💀', '👽', '🚨'];
        enemy.textContent = enemyEmojis[Math.min(enemyLevel - 1, enemyEmojis.length - 1)];

        // 随机位置（从顶部进入）
        const containerWidth = gameContainer.offsetWidth;
        const x = Math.random() * (containerWidth - 40);
        enemy.style.left = `${x}px`;
        enemy.style.top = '-50px';

        // 设置敌人属性
        enemy.health = 10 * enemyLevel;
        enemy.speed = 1.5 + (enemyLevel - 1) * 0.3; // 降低初始移动速度
        enemy.damage = 10 + (enemyLevel - 1) * 5;

        // 添加移动模式属性，使敌人移动多样化
        enemy.movePattern = Math.floor(Math.random() * 3); // 0: 直线下落, 1: 波浪形, 2: 追踪玩家
        enemy.movePatternData = {
            offsetX: 0,
            amplitude: 2 + Math.random() * 3, // 波浪幅度
            frequency: 0.02 + Math.random() * 0.03, // 波浪频率
            phase: Math.random() * Math.PI * 2 // 初始相位
        };

        // 添加射击能力 - 根据敌人等级和随机概率决定
        enemy.canShoot = Math.random() < 0.7; // 70%的敌人可以射击
        if (enemy.canShoot) {
            // 根据敌人等级选择射击模式
            const shootPatterns = ['normal', 'triple', 'spread', 'laser'];
            enemy.shootPattern = shootPatterns[Math.min(enemyLevel - 1, shootPatterns.length - 1)];
            enemy.shootInterval = Math.max(1500, 3000 - (enemyLevel - 1) * 300); // 射击间隔，等级越高间隔越短
        }

        gameContainer.appendChild(enemy);
        gameState.enemies.push(enemy);

        // 移动敌人
        moveEnemy(enemy);
    }

    // 生成BOSS
    function spawnBoss() {
        if (!gameState.gameActive || gameState.bossActive || gameState.revivalNeeded) return;

        // 显示BOSS即将到来的警告
        const warning = document.createElement('div');
        warning.className = 'absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-red-500 text-2xl font-bold animate-pulse';
        warning.textContent = '⚠️ BOSS即将到来 ⚠️';
        gameContainer.appendChild(warning);

        setTimeout(() => {
            if (warning.parentNode) {
                warning.parentNode.removeChild(warning);
            }

            // 创建BOSS
            const boss = document.createElement('div');
            boss.className = 'absolute text-6xl z-30';
            boss.style.width = '150px';
            boss.style.height = '150px';
            boss.style.display = 'flex';
            boss.style.alignItems = 'center';
            boss.style.justifyContent = 'center';
            boss.style.left = `${(gameContainer.offsetWidth - 150) / 2}px`;
            boss.style.top = '-180px';
            boss.textContent = '👾'; // 使用大型外星人emoji作为BOSS
            boss.style.textShadow = '0 0 40px rgba(220, 38, 38, 0.8)';

            // 设置BOSS属性
            boss.health = 500 + gameState.level * 100;
            boss.speed = 1.5;
            boss.damage = 30;

            gameContainer.appendChild(boss);
            gameState.boss = boss;
            gameState.bossActive = true;
            gameState.bossHealth = boss.health;

            // 创建BOSS血条
            createBossHealthBar();

            // 移动BOSS
            moveBoss(boss);
        }, 3000);
    }

    // 创建BOSS血条
    function createBossHealthBar() {
        // 移除旧血条
        if (gameState.bossHealthBar) {
            gameContainer.removeChild(gameState.bossHealthBar);
        }

        const healthBarContainer = document.createElement('div');
        healthBarContainer.className = 'absolute top-20 left-1/4 right-1/4 h-6 bg-dark/70 border border-gray-700 rounded-full overflow-hidden z-30';

        const healthBar = document.createElement('div');
        healthBar.className = 'h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300';
        healthBar.style.width = '100%';

        const healthText = document.createElement('div');
        healthText.className = 'absolute inset-0 flex items-center justify-center text-white text-xs font-bold';
        healthText.textContent = `BOSS 生命值: ${gameState.bossHealth}/${gameState.bossHealth}`;

        healthBarContainer.appendChild(healthBar);
        healthBarContainer.appendChild(healthText);
        gameContainer.appendChild(healthBarContainer);

        gameState.bossHealthBar = healthBarContainer;
        gameState.bossHealthBar.healthBar = healthBar;
        gameState.bossHealthBar.healthText = healthText;
    }

    // 更新BOSS血条
    function updateBossHealth() {
        if (!gameState.bossHealthBar || !gameState.bossActive) return;

        const percentage = (gameState.bossHealth / (500 + gameState.level * 100)) * 100;
        gameState.bossHealthBar.healthBar.style.width = `${percentage}%`;
        gameState.bossHealthBar.healthText.textContent = `BOSS 生命值: ${Math.max(0, Math.floor(gameState.bossHealth))}/${500 + gameState.level * 100}`;

        // 检查BOSS是否被击败
        if (gameState.bossHealth <= 0) {
            destroyBoss();
        }
    }

    // 创建敌机子弹 - 增强版，支持多种子弹类型和效果
    function createEnemyBullet(x, y, targetX, targetY, color, speed = 3, isSpecial = false, bulletType = 'normal') {
        const bullet = document.createElement('div');
        bullet.className = 'absolute z-5';
        
        // 计算朝向玩家的角度
        const dx = targetX - x;
        const dy = targetY - y;
        const angle = Math.atan2(dy, dx);
        
        // 根据子弹类型设置样式和属性
        switch (bulletType) {
            case 'laser':
                // 激光子弹
                bullet.style.width = '3px';
                bullet.style.height = '25px';
                bullet.style.background = `linear-gradient(0deg, transparent 0%, ${color} 50%, transparent 100%)`;
                bullet.style.borderRadius = '0';
                bullet.style.boxShadow = `0 0 15px ${color}`;
                bullet.damage = 20;
                bullet.speed = 12;
                
                // 添加激光粒子效果
                createLaserParticles(x, y, angle, color);
                break;
            case 'homing':
                // 追踪导弹
                bullet.style.width = '10px';
                bullet.style.height = '20px';
                bullet.style.background = `linear-gradient(to right, ${color}44, ${color})`;
                bullet.style.borderRadius = '10px 2px 2px 10px';
                bullet.style.boxShadow = `0 0 12px ${color}, -8px 0 10px ${color}44`;
                bullet.damage = 25;
                bullet.speed = 6;
                
                // 添加导弹尾焰
                createMissileTrail(bullet, color, angle);
                break;
            case 'bomb':
                // 炸弹子弹
                bullet.style.width = '15px';
                bullet.style.height = '15px';
                bullet.style.background = `radial-gradient(circle, ${color}aa, ${color})`;
                bullet.style.borderRadius = '50%';
                bullet.style.boxShadow = `0 0 15px ${color}`;
                bullet.style.border = `2px dashed ${color}88`;
                bullet.damage = 30;
                bullet.speed = 2.5;
                
                // 添加脉冲动画
                bullet.bombSize = 1;
                bullet.pulseInterval = setInterval(() => {
                    const sizeFactor = 1 + Math.sin(Date.now() * 0.005) * 0.1;
                    bullet.style.transform = `translateX(-50%) rotate(${angle}rad) scale(${sizeFactor})`;
                }, 50);
                break;
            case 'wavy':
                // 波浪子弹
                bullet.style.width = '8px';
                bullet.style.height = '8px';
                bullet.style.background = `radial-gradient(circle, ${color}, ${color}88)`;
                bullet.style.borderRadius = '50%';
                bullet.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}44`;
                bullet.damage = 12;
                bullet.speed = 7;
                
                // 波浪轨迹属性
                bullet.waveOffset = 0;
                break;
            case 'rapid':
                // 快速子弹
                bullet.style.width = '5px';
                bullet.style.height = '10px';
                bullet.style.background = color;
                bullet.style.borderRadius = '2px';
                bullet.style.boxShadow = `0 0 8px ${color}`;
                bullet.damage = 8;
                bullet.speed = 10;
                break;
            case 'ring':
                // 环形子弹
                bullet.style.width = '12px';
                bullet.style.height = '12px';
                bullet.style.background = 'transparent';
                bullet.style.border = `2px solid ${color}`;
                bullet.style.borderRadius = '50%';
                bullet.style.boxShadow = `0 0 10px ${color}`;
                bullet.damage = 15;
                bullet.speed = 8;
                break;
            default:
                // 普通子弹
                bullet.style.width = isSpecial ? '10px' : '6px';
                bullet.style.height = isSpecial ? '18px' : '12px';
                bullet.style.background = color;
                bullet.style.borderRadius = '2px';
                bullet.style.boxShadow = isSpecial ? `0 0 15px ${color}, 0 0 25px ${color}` : `0 0 10px ${color}`;
                bullet.damage = isSpecial ? 20 : 10;
                bullet.speed = speed;
                
                // 特殊子弹额外效果
                if (isSpecial) {
                    bullet.style.border = `1px solid ${color}`;
                }
        }
        
        // 设置子弹位置和基础样式
        bullet.style.left = `${x}px`;
        bullet.style.top = `${y}px`;
        bullet.style.transform = `translateX(-50%) rotate(${angle}rad)`;
        bullet.style.transformOrigin = 'center bottom';
        bullet.style.pointerEvents = 'none';
        
        // 设置子弹属性
        bullet.enemyBullet = true;
        bullet.speed = speed;
        bullet.angle = angle;
        bullet.bulletType = bulletType;
        
        // 添加到游戏容器和子弹数组
        gameContainer.appendChild(bullet);
        gameState.enemyBullets.push(bullet);
        
        // 移动子弹
        function moveEnemyBullet() {
            if (!bullet || !gameState.gameActive) {
                // 清理子弹相关资源
                cleanupBullet();
                return;
            }
            
            let currentTop = parseInt(bullet.style.top) || y;
            let currentLeft = parseInt(bullet.style.left) || x;
            
            // 根据子弹类型应用特殊移动逻辑
            if (bullet.bulletType === 'homing' && gameState.player && !gameState.isInvincible && !gameState.revivalNeeded) {
                // 追踪导弹：持续更新朝向玩家的角度
                const containerRect = gameContainer.getBoundingClientRect();
                const playerRect = gameState.player.getBoundingClientRect();
                const playerX = playerRect.left - containerRect.left + playerRect.width / 2;
                const playerY = playerRect.top - containerRect.top + playerRect.height / 2;
                
                const dx = playerX - currentLeft;
                const dy = playerY - currentTop;
                const newAngle = Math.atan2(dy, dx);
                
                // 平滑过渡到新角度
                const angleDiff = newAngle - bullet.angle;
                bullet.angle += angleDiff * 0.1;
                
                // 更新子弹旋转
                bullet.style.transform = `translateX(-50%) rotate(${bullet.angle}rad)`;
            } else if (bullet.bulletType === 'wavy') {
                // 波浪子弹：添加横向波动
                bullet.waveOffset += 0.1;
                const waveAmplitude = Math.sin(bullet.waveOffset) * 3;
                currentLeft += waveAmplitude;
            } else if (bullet.bulletType === 'bomb') {
                // 炸弹：逐渐变大
                bullet.bombSize = (bullet.bombSize || 1) + 0.02;
                bullet.style.transform = `translateX(-50%) rotate(${bullet.angle}rad) scale(${bullet.bombSize})`;
            }
            
            // 更新子弹位置
            currentTop += bullet.speed * Math.sin(bullet.angle);
            currentLeft += bullet.speed * Math.cos(bullet.angle);
            
            bullet.style.top = `${currentTop}px`;
            bullet.style.left = `${currentLeft}px`;
            
            // 检测与玩家的碰撞
            if (gameState.player && !gameState.isInvincible && !gameState.revivalNeeded) {
                const bulletRect = bullet.getBoundingClientRect();
                const playerRect = gameState.player.getBoundingClientRect();
                
                if (isColliding(bulletRect, playerRect)) {
                    // 击中玩家
                    takeDamage(bullet.damage);
                    
                    // 特殊子弹爆炸效果
                    if (bullet.bulletType === 'bomb') {
                        createExplosion(bulletRect.left, bulletRect.top, 40, color);
                    } else if (bullet.bulletType === 'homing') {
                        createExplosion(bulletRect.left, bulletRect.top, 30, color);
                    }
                    
                    // 移除子弹
                    cleanupBullet();
                    
                    return;
                }
            }
            
            // 检查是否超出屏幕或炸弹达到最大尺寸
            if (currentTop > gameContainer.offsetHeight + 20 || 
                currentLeft < -20 || 
                currentLeft > gameContainer.offsetWidth + 20 ||
                (bullet.bulletType === 'bomb' && bullet.bombSize >= 2)) {
                
                // 炸弹在超出屏幕或达到最大尺寸时爆炸
                if (bullet.bulletType === 'bomb') {
                    createExplosion(currentLeft, currentTop, 45, color);
                }
                
                // 移除子弹
                cleanupBullet();
            } else {
                // 继续移动子弹
                requestAnimationFrame(moveEnemyBullet);
            }
        }
        
        // 子弹清理函数
        function cleanupBullet() {
            if (bullet.parentNode) {
                bullet.parentNode.removeChild(bullet);
                gameState.enemyBullets = gameState.enemyBullets.filter(b => b !== bullet);
            }
            
            // 清除动画间隔
            if (bullet.pulseInterval) {
                clearInterval(bullet.pulseInterval);
            }
            
            // 清除尾焰元素
            if (bullet.trailElement) {
                if (bullet.trailElement.parentNode) {
                    bullet.trailElement.parentNode.removeChild(bullet.trailElement);
                }
                bullet.trailElement = null;
            }
        }
        
        // 开始移动子弹
        requestAnimationFrame(moveEnemyBullet);
    }
    
    // 创建导弹尾焰效果
    function createMissileTrail(bullet, color, angle) {
        const trail = document.createElement('div');
        trail.className = 'absolute z-4';
        trail.style.width = '15px';
        trail.style.height = '6px';
        trail.style.background = `linear-gradient(to right, transparent, ${color}88)`;
        trail.style.transformOrigin = 'center center';
        trail.style.pointerEvents = 'none';
        
        // 将尾焰附加到子弹
        gameContainer.appendChild(trail);
        bullet.trailElement = trail;
        
        // 更新尾焰位置
        function updateTrail() {
            if (!bullet || !trail || !gameState.gameActive) {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
                return;
            }
            
            const bulletRect = bullet.getBoundingClientRect();
            const containerRect = gameContainer.getBoundingClientRect();
            
            // 计算尾焰位置（子弹后方）
            const trailAngle = bullet.angle + Math.PI;
            const offsetX = Math.cos(trailAngle) * 12;
            const offsetY = Math.sin(trailAngle) * 12;
            
            trail.style.left = `${bulletRect.left - containerRect.left + bulletRect.width / 2 + offsetX}px`;
            trail.style.top = `${bulletRect.top - containerRect.top + bulletRect.height / 2 + offsetY}px`;
            trail.style.transform = `translate(-50%, -50%) rotate(${bullet.angle}rad)`;
            
            requestAnimationFrame(updateTrail);
        }
        
        updateTrail();
    }
    
    // 创建激光粒子效果
    function createLaserParticles(x, y, angle, color) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute z-4';
            
            // 粒子样式
            const size = 2 + Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 8px ${color}`;
            particle.style.pointerEvents = 'none';
            
            // 设置初始位置
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.transform = 'translate(-50%, -50%)';
            
            // 添加到游戏容器
            gameContainer.appendChild(particle);
            
            // 粒子动画参数
            const particleAngle = angle + (Math.random() - 0.5) * 0.6;
            const speed = 6 + Math.random() * 6;
            const duration = 400 + Math.random() * 300;
            
            // 动画函数
            let startTime = null;
            function animateParticle(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / duration;
                
                if (progress < 1) {
                    // 计算当前位置
                    const currentX = x + Math.cos(particleAngle) * speed * progress;
                    const currentY = y + Math.sin(particleAngle) * speed * progress;
                    
                    // 更新粒子位置和透明度
                    particle.style.left = `${currentX}px`;
                    particle.style.top = `${currentY}px`;
                    particle.style.opacity = (1 - progress).toString();
                    
                    requestAnimationFrame(animateParticle);
                } else {
                    // 移除粒子
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }
            }
            
            // 开始动画
            requestAnimationFrame(animateParticle);
        }
    }
    
    // 敌机射击函数 - 增强版，支持多种攻击模式和子弹类型
    function enemyShoot(enemy, shootPattern = 'normal') {
        if (!enemy || !gameState.gameActive || !gameState.player) return;
        
        const enemyRect = enemy.getBoundingClientRect();
        const containerRect = gameContainer.getBoundingClientRect();
        const enemyX = enemyRect.left - containerRect.left + enemyRect.width / 2;
        const enemyY = enemyRect.top - containerRect.top + enemyRect.height;
        
        // 获取玩家中心位置
        const playerRect = gameState.player.getBoundingClientRect();
        const playerX = playerRect.left - containerRect.left + playerRect.width / 2;
        const playerY = playerRect.top - containerRect.top + playerRect.height / 2;
        
        // 根据射击模式发射不同类型的子弹
        switch (shootPattern) {
            case 'normal':
                // 普通射击：直接朝向玩家
                createEnemyBullet(enemyX, enemyY, playerX, playerY, '#f87171', 7, false, 'normal');
                break;
            case 'triple':
                // 三发射击：扇形散开
                for (let i = -1; i <= 1; i++) {
                    const angleOffset = i * 0.2; // 角度偏移
                    const targetOffsetX = playerX + Math.sin(angleOffset) * 100;
                    const targetOffsetY = playerY + Math.cos(angleOffset) * 100;
                    createEnemyBullet(enemyX, enemyY, targetOffsetX, targetOffsetY, '#fb923c', 6, false, 'normal');
                }
                break;
            case 'spread':
                // 扩散射击：多个方向
                for (let i = 0; i < 5; i++) {
                    const angle = (i - 2) * 0.1;
                    const targetOffsetX = playerX + Math.sin(angle) * 150;
                    const targetOffsetY = playerY + 200;
                    createEnemyBullet(enemyX, enemyY, targetOffsetX, targetOffsetY, '#fbbf24', 5, false, 'normal');
                }
                break;
            case 'laser':
                // 激光射击：特殊子弹
                createEnemyBullet(enemyX, enemyY, playerX, playerY, '#f472b6', 12, true, 'laser');
                break;
            case 'ring':
                // 环形射击：向8个方向发射子弹
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const targetX = enemyX + Math.cos(angle) * 200;
                    const targetY = enemyY + Math.sin(angle) * 200;
                    createEnemyBullet(enemyX, enemyY, targetX, targetY, '#3b82f6', 8, false, 'ring');
                }
                break;
            case 'homing':
                // 追踪导弹：发射能够追踪玩家的子弹
                createEnemyBullet(enemyX, enemyY, playerX, playerY, '#10b981', 6, true, 'homing');
                break;
            case 'wavy':
                // 波浪轨迹：子弹按波浪形轨迹移动
                for (let i = 0; i < 3; i++) {
                    const angleOffset = (i - 1) * 0.2;
                    const targetOffsetX = playerX + Math.sin(angleOffset) * 100;
                    const targetOffsetY = playerY + Math.cos(angleOffset) * 100;
                    createEnemyBullet(enemyX, enemyY, targetOffsetX, targetOffsetY, '#8b5cf6', 7, false, 'wavy');
                }
                break;
            case 'bomb':
                // 炸弹射击：发射会爆炸的子弹
                createEnemyBullet(enemyX, enemyY, playerX, playerY, '#ef4444', 2.5, true, 'bomb');
                break;
            case 'rapid':
                // 快速射击：短时间内发射多颗子弹
                let rapidAngle = 0;
                const rapidInterval = setInterval(() => {
                    if (!gameState.gameActive || !gameState.player) {
                        clearInterval(rapidInterval);
                        return;
                    }
                    
                    const currentPlayerRect = gameState.player.getBoundingClientRect();
                    const currentPlayerX = currentPlayerRect.left - containerRect.left + currentPlayerRect.width / 2;
                    const currentPlayerY = currentPlayerRect.top - containerRect.top + currentPlayerRect.height / 2;
                    
                    const angle = Math.atan2(currentPlayerY - enemyY, currentPlayerX - enemyX) + rapidAngle;
                    const targetX = enemyX + Math.cos(angle) * 200;
                    const targetY = enemyY + Math.sin(angle) * 200;
                    
                    createEnemyBullet(enemyX, enemyY, targetX, targetY, '#f59e0b', 10, false, 'rapid');
                    
                    rapidAngle += 0.1;
                    
                    // 停止快速射击
                    if (rapidAngle > 0.5) {
                        clearInterval(rapidInterval);
                    }
                }, 80);
                break;
            case 'double':
                // 双发模式：同时发射两颗追踪导弹
                createEnemyBullet(enemyX - 5, enemyY, playerX, playerY, '#34d399', 6, true, 'homing');
                createEnemyBullet(enemyX + 5, enemyY, playerX, playerY, '#34d399', 6, true, 'homing');
                break;
            case 'mixed':
                // 混合攻击：同时发射多种类型的子弹
                createEnemyBullet(enemyX, enemyY, playerX, playerY, '#f472b6', 12, true, 'laser');
                setTimeout(() => {
                    if (gameState.gameActive) {
                        createEnemyBullet(enemyX, enemyY, playerX, playerY, '#ef4444', 2.5, true, 'bomb');
                    }
                }, 300);
                break;
        }
    }
    
    // 敌机子弹移动函数 - 增强版，支持多种移动模式
    function moveEnemyBullet() {
        for (let i = gameState.enemyBullets.length - 1; i >= 0; i--) {
            const bullet = gameState.enemyBullets[i];
            if (!bullet || !gameState.gameActive) continue;
            
            let currentTop = parseInt(bullet.style.top);
            let currentLeft = parseInt(bullet.style.left);
            
            // 根据子弹类型和移动模式更新位置
            if (bullet.movePattern === 'homing' && gameState.player && !gameState.isInvincible && !gameState.revivalNeeded) {
                // 追踪导弹：持续更新朝向玩家的角度
                const containerRect = gameContainer.getBoundingClientRect();
                const playerRect = gameState.player.getBoundingClientRect();
                const playerX = playerRect.left - containerRect.left + playerRect.width / 2;
                const playerY = playerRect.top - containerRect.top + playerRect.height / 2;
                
                const dx = playerX - currentLeft;
                const dy = playerY - currentTop;
                const newAngle = Math.atan2(dy, dx);
                
                // 平滑过渡到新角度
                const angleDiff = newAngle - bullet.angle;
                bullet.angle += angleDiff * 0.1; // 追踪速度
                
                bullet.style.transform = `translateX(-50%) rotate(${bullet.angle}rad)`;
            } else if (bullet.movePattern === 'wavy') {
                // 波浪轨迹：添加横向波动
                bullet.waveOffset = (bullet.waveOffset || 0) + 0.1;
                const waveAmplitude = Math.sin(bullet.waveOffset) * 3;
                currentLeft += waveAmplitude;
            } else if (bullet.movePattern === 'bomb') {
                // 炸弹：更慢的速度，更大的体积
                bullet.bombSize = (bullet.bombSize || 1) + 0.02;
                bullet.style.transform = `translateX(-50%) scale(${bullet.bombSize})`;
            }
            
            // 更新子弹位置
            currentTop += bullet.speed * Math.sin(bullet.angle);
            currentLeft += bullet.speed * Math.cos(bullet.angle);
            
            bullet.style.top = `${currentTop}px`;
            bullet.style.left = `${currentLeft}px`;
            
            // 检测与玩家的碰撞
            if (gameState.player && !gameState.isInvincible && !gameState.revivalNeeded) {
                const bulletRect = bullet.getBoundingClientRect();
                const playerRect = gameState.player.getBoundingClientRect();
                
                if (isColliding(bulletRect, playerRect)) {
                    // 击中玩家
                    takeDamage(bullet.damage);
                    
                    // 特殊子弹效果
                    if (bullet.movePattern === 'bomb') {
                        // 炸弹爆炸效果
                        createExplosion(currentLeft, currentTop, 30, '#ef4444');
                    } else if (bullet.movePattern === 'homing') {
                        // 追踪导弹爆炸效果
                        createExplosion(currentLeft, currentTop, 25, '#10b981');
                    }
                    
                    // 移除子弹
                    if (bullet.parentNode) {
                        bullet.parentNode.removeChild(bullet);
                        gameState.enemyBullets = gameState.enemyBullets.filter(b => b !== bullet);
                    }
                    
                    // 击中效果
                    createExplosion(currentLeft, currentTop, 20, '#ef4444');
                    
                    continue;
                }
            }
            
            // 检查是否超出屏幕或需要引爆
            if (currentTop > gameContainer.offsetHeight + 20 || 
                currentLeft < -20 || 
                currentLeft > gameContainer.offsetWidth + 20 ||
                (bullet.movePattern === 'bomb' && bullet.bombSize >= 1.8)) {
                
                // 炸弹在超出屏幕或达到最大尺寸时爆炸
                if (bullet.movePattern === 'bomb') {
                    createExplosion(currentLeft, currentTop, 35, '#ef4444');
                }
                
                // 移除子弹
                if (bullet.parentNode) {
                    bullet.parentNode.removeChild(bullet);
                    gameState.enemyBullets = gameState.enemyBullets.filter(b => b !== bullet);
                }
            }
        }
        
        // 继续移动子弹
        if (gameState.gameActive) {
            requestAnimationFrame(moveEnemyBullet);
        }
    }

        const containerHeight = gameContainer.offsetHeight;
        const containerWidth = gameContainer.offsetWidth;
        let currentTop = parseInt(enemy.style.top) || 0;
        let currentLeft = parseInt(enemy.style.left) || 0;

        // 更新敌人垂直位置
        currentTop += enemy.speed;
        enemy.style.top = `${currentTop}px`;

        // 根据移动模式更新水平位置
        if (enemy.movePattern === 1) { // 波浪形移动
            enemy.movePatternData.offsetX = enemy.movePatternData.amplitude * Math.sin(enemy.movePatternData.phase);
            enemy.movePatternData.phase += enemy.movePatternData.frequency;

            const newLeft = currentLeft + enemy.movePatternData.offsetX;
            // 确保敌人不会移出屏幕
            if (newLeft >= 0 && newLeft <= containerWidth - 40) {
                enemy.style.left = `${newLeft}px`;
            }
        } else if (enemy.movePattern === 2 && gameState.player && !gameState.revivalNeeded) { // 追踪玩家（有延迟）
            // 只有部分敌人会追踪玩家，并且追踪速度较慢
            const playerX = parseInt(gameState.player.style.left) || (containerWidth - 50) / 2;
            const playerCenter = playerX + 25; // 玩家中心位置
            const enemyCenter = currentLeft + 20; // 敌人中心位置

            // 缓慢向玩家方向移动
            if (Math.abs(playerCenter - enemyCenter) > 10) {
                const moveTowardsPlayer = (playerCenter > enemyCenter) ? 0.3 : -0.3;
                const newLeft = currentLeft + moveTowardsPlayer;
                // 确保敌人不会移出屏幕
                if (newLeft >= 0 && newLeft <= containerWidth - 40) {
                    enemy.style.left = `${newLeft}px`;
                }
            }
        }

        // 敌人射击逻辑
        if (enemy.canShoot && !enemy.shootingInterval) {
            // 当敌人进入屏幕一定距离后开始射击
            if (currentTop > 50) {
                enemy.shootingInterval = setInterval(() => {
                    if (gameState.gameActive && gameState.player && !gameState.revivalNeeded) {
                        // 随机决定是否射击（增加射击的不规则性）
                        const shootProbability = Math.random();
                        if (shootProbability < 0.7) { // 70%的概率射击
                            enemyShoot(enemy, enemy.shootPattern);
                        }
                    }
                }, enemy.shootInterval);
            }
        }

        // 检测与玩家的碰撞
        if (gameState.player && !gameState.isInvincible && !gameState.revivalNeeded) {
            const enemyRect = enemy.getBoundingClientRect();
            const playerRect = gameState.player.getBoundingClientRect();

            if (isColliding(enemyRect, playerRect)) {
                // 敌人与玩家碰撞
                takeDamage(enemy.damage);

                // 清除射击定时器
                if (enemy.shootingInterval) {
                    clearInterval(enemy.shootingInterval);
                }

                // 移除敌人
                if (enemy.parentNode) {
                    enemy.parentNode.removeChild(enemy);
                    gameState.enemies = gameState.enemies.filter(e => e !== enemy);
                }

                // 玩家受伤效果
                createExplosion(playerRect.left + playerRect.width / 2, playerRect.top + playerRect.height / 2, 40, '#ef4444');

                return;
            }
        }

        // 检查是否超出屏幕或需要继续移动
        if (currentTop > containerHeight) {
            // 清除射击定时器
            if (enemy.shootingInterval) {
                clearInterval(enemy.shootingInterval);
            }

            // 移除敌人（未击中玩家）
            if (enemy.parentNode) {
                enemy.parentNode.removeChild(enemy);
                gameState.enemies = gameState.enemies.filter(e => e !== enemy);
            }
        } else {
            // 继续移动敌人
            requestAnimationFrame(() => moveEnemy(enemy));
        }
    }

    // 移动BOSS
    function moveBoss(boss) {
        if (!boss || !gameState.gameActive || !gameState.bossActive) return;

        const containerHeight = gameContainer.offsetHeight;
        let currentTop = parseInt(boss.style.top);

        // 让BOSS向下移动到一定位置后左右移动
        if (currentTop < 100) {
            // 向下移动
            currentTop += boss.speed;
            boss.style.top = `${currentTop}px`;
        } else {
            // 左右移动（追踪玩家）
            if (gameState.player && !gameState.revivalNeeded) {
                const playerX = parseInt(gameState.player.style.left);
                const playerWidth = gameState.player.offsetWidth;
                const bossX = parseInt(boss.style.left);
                const bossWidth = boss.offsetWidth;

                const playerCenter = playerX + playerWidth / 2;
                const bossCenter = bossX + bossWidth / 2;

                // 缓慢追踪玩家
                if (Math.abs(playerCenter - bossCenter) > 5) {
                    if (playerCenter > bossCenter) {
                        boss.style.left = `${bossX + 1}px`;
                    } else {
                        boss.style.left = `${bossX - 1}px`;
                    }
                }
            }
        }

        // 检测与玩家的碰撞
        if (gameState.player && !gameState.isInvincible && !gameState.revivalNeeded) {
            const bossRect = boss.getBoundingClientRect();
            const playerRect = gameState.player.getBoundingClientRect();

            if (isColliding(bossRect, playerRect)) {
                // BOSS与玩家碰撞
                takeDamage(boss.damage);

                // 玩家受伤效果
                createExplosion(playerRect.left + playerRect.width / 2, playerRect.top + playerRect.height / 2, 60, '#ef4444');
            }
        }

        // 继续移动BOSS
        requestAnimationFrame(() => moveBoss(boss));
    }

    // 摧毁普通敌人
    function destroyEnemy(enemy, index) {
        if (!enemy) return;

        // 爆炸效果
        const enemyRect = enemy.getBoundingClientRect();
        createExplosion(enemyRect.left + enemyRect.width / 2, enemyRect.top + enemyRect.height / 2, 30, '#22c55e');

        // 移除敌人
        if (enemy.parentNode) {
            enemy.parentNode.removeChild(enemy);
            gameState.enemies.splice(index, 1);
        }

        // 加分
        gameState.score += 5;
        createScoreAnimation('+5', '#22c55e');
        updateGameStats();
    }

    // 摧毁BOSS
    function destroyBoss() {
        if (!gameState.boss) return;

        // BOSS爆炸效果
        const bossRect = gameState.boss.getBoundingClientRect();
        createExplosion(bossRect.left + bossRect.width / 2, bossRect.top + bossRect.height / 2, 100, '#dc2626');

        // 移除BOSS和血条
        if (gameState.boss.parentNode) {
            gameState.boss.parentNode.removeChild(gameState.boss);
        }

        if (gameState.bossHealthBar && gameState.bossHealthBar.parentNode) {
            gameState.bossHealthBar.parentNode.removeChild(gameState.bossHealthBar);
        }

        // 加分
        gameState.score += 100;
        createScoreAnimation('+100', '#fbbf24');
        updateGameStats();

        // 重置BOSS状态
        gameState.bossActive = false;
        gameState.boss = null;
        gameState.bossHealth = 0;
        gameState.bossHealthBar = null;

        // 显示BOSS被击败的消息
        const message = document.createElement('div');
        message.className = 'absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-yellow-400 text-2xl font-bold animate-pulse';
        message.textContent = '🎉 BOSS被击败！获得100分！';
        gameContainer.appendChild(message);

        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }

    // 创建爆炸效果
    function createExplosion(x, y, size, color) {
        const explosion = document.createElement('div');
        explosion.className = 'absolute z-40';
        explosion.style.width = `${size}px`;
        explosion.style.height = `${size}px`;
        explosion.style.backgroundColor = color;
        explosion.style.borderRadius = '50%';
        explosion.style.left = `${x - size / 2}px`;
        explosion.style.top = `${y - size / 2}px`;
        explosion.style.opacity = '0.7';
        explosion.style.transform = 'scale(0)';
        explosion.style.transition = 'all 0.5s ease-out';

        gameContainer.appendChild(explosion);

        // 触发爆炸动画
        setTimeout(() => {
            explosion.style.transform = 'scale(1)';
            explosion.style.opacity = '0';
        }, 10);

        // 移除爆炸效果
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 600);
    }

    // 击中当前目标（用于回答问题时的额外效果）
    function hitCurrentTarget() {
        // 优先攻击BOSS
        if (gameState.bossActive && gameState.boss) {
            // 对BOSS造成额外伤害
            gameState.bossHealth -= 20 + gameState.level * 5;
            updateBossHealth();

            // BOSS受伤特效
            const bossRect = gameState.boss.getBoundingClientRect();
            createExplosion(bossRect.left + Math.random() * bossRect.width, bossRect.top + Math.random() * bossRect.height, 40, '#ec4899');
        } else if (gameState.enemies.length > 0) {
            // 随机选择一个敌人造成额外伤害
            const randomEnemyIndex = Math.floor(Math.random() * gameState.enemies.length);
            const enemy = gameState.enemies[randomEnemyIndex];

            if (enemy) {
                enemy.health -= 15 + gameState.level * 3;

                // 敌人受伤特效
                const enemyRect = enemy.getBoundingClientRect();
                createExplosion(enemyRect.left + enemyRect.width / 2, enemyRect.top + enemyRect.height / 2, 30, '#ec4899');

                // 检查敌人是否被消灭
                if (enemy.health <= 0) {
                    destroyEnemy(enemy, randomEnemyIndex);
                }
            }
        }
    }

    // 玩家受到伤害
    function takeDamage(amount) {
        if (gameState.isInvincible || gameState.revivalNeeded) return;

        gameState.health -= amount;

        // 受伤闪烁效果
        if (gameState.player) {
            gameState.player.style.opacity = '0.5';
            setTimeout(() => {
                if (gameState.player) gameState.player.style.opacity = '1';
            }, 100);
        }

        // 更新游戏状态
        updateGameStats();

        // 检查是否游戏结束
        if (gameState.health <= 0) {
            gameOver();
        }
    }

    // 游戏结束（需要复活）
    function gameOver() {
        gameState.revivalNeeded = true;
        gameState.revivalAttempts = 0;

        // 隐藏玩家
        if (gameState.player) {
            gameState.player.style.display = 'none';
        }

        // 显示复活提示
        const revivalMessage = document.createElement('div');
        revivalMessage.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-dark/90 border border-red-500 rounded-xl p-6 text-center';
        revivalMessage.innerHTML = `
            <h4 class="text-xl font-bold mb-4 text-red-400">飞船受损严重！</h4>
            <p class="mb-2">需要连续答对3道题才能修复飞船继续战斗！</p>
        `;
        gameContainer.appendChild(revivalMessage);

        // 保存引用以便后续移除
        gameState.revivalMessage = revivalMessage;
    }

    // 复活玩家
    function revivePlayer() {
        gameState.revivalNeeded = false;
        gameState.health = 50; // 复活后恢复50点生命值
        gameState.isInvincible = true; // 短暂无敌状态

        // 移除复活提示
        if (gameState.revivalMessage && gameState.revivalMessage.parentNode) {
            gameState.revivalMessage.parentNode.removeChild(gameState.revivalMessage);
        }

        // 显示玩家并设置无敌效果
        if (gameState.player) {
            gameState.player.style.display = 'flex';
            gameState.player.style.boxShadow = '0 0 20px rgba(52, 211, 153, 0.8)';

            // 无敌闪烁效果
            let invincibleInterval = setInterval(() => {
                gameState.player.style.opacity = gameState.player.style.opacity === '1' ? '0.5' : '1';
            }, 200);

            // 3秒后取消无敌状态
            setTimeout(() => {
                clearInterval(invincibleInterval);
                gameState.isInvincible = false;
                if (gameState.player) {
                    gameState.player.style.opacity = '1';
                    gameState.player.style.boxShadow = gameState.level >= 5 ?
                        '0 -5px 20px rgba(236, 72, 153, 0.8)' :
                        '0 -5px 15px rgba(14, 165, 233, 0.8)';
                }
            }, 3000);
        }

        // 更新游戏状态
        updateGameStats();
    }

    // 开始倒计时
    function startCountdown() {
        updateTimerDisplay();

        countdownInterval = setInterval(() => {
            if (!gameState.gameActive) return;

            gameState.gameTime--;
            updateTimerDisplay();

            // 检查时间是否结束
            if (gameState.gameTime <= 0) {
                endGame('timeUp');
            }
        }, 1000);
    }

    // 更新计时器显示
    function updateTimerDisplay() {
        const minutes = Math.floor(gameState.gameTime / 60);
        const seconds = gameState.gameTime % 60;
        timerDisplay.textContent = `剩余时间: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // 根据剩余时间改变计时器颜色和动画效果
        if (gameState.gameTime < 60) {
            // 最后60秒 - 红色，脉动效果
            timerDisplay.className = 'absolute bottom-4 right-4 text-sm text-red-400 animate-pulse';
        } else if (gameState.gameTime < 180) {
            // 最后3分钟 - 橙色
            timerDisplay.className = 'absolute bottom-4 right-4 text-sm text-orange-400';
        } else if (gameState.gameTime < 300) {
            // 最后5分钟 - 黄色
            timerDisplay.className = 'absolute bottom-4 right-4 text-sm text-yellow-400';
        } else {
            // 剩余时间充足 - 蓝色
            timerDisplay.className = 'absolute bottom-4 right-4 text-sm text-primary';
        }
    }

    // 更新游戏状态显示
    function updateGameStats() {
        scoreDisplay.textContent = gameState.score;
        levelDisplay.textContent = gameState.level;

        // 更新健康值显示
        healthBar.style.width = `${gameState.health}%`;
        healthText.textContent = `生命值: ${gameState.health}`;

        // 更新健康值颜色和效果
        if (gameState.health < 30) {
            healthBar.className = 'h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300';
            healthText.className = 'absolute bottom-10 left-4 text-xs text-red-400';
            // 低血量时添加脉动效果
            healthBar.style.animation = 'pulse 1s ease-in-out infinite';
        } else if (gameState.health < 60) {
            healthBar.className = 'h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300';
            healthText.className = 'absolute bottom-10 left-4 text-xs text-yellow-400';
            healthBar.style.animation = 'none';
        } else {
            healthBar.className = 'h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300';
            healthText.className = 'absolute bottom-10 left-4 text-xs text-green-400';
            healthBar.style.animation = 'none';
        }

        // 显示武器信息
        if (gameState.player && document.getElementById('weaponInfo')) {
            const weaponInfo = document.getElementById('weaponInfo');
            const weaponLevel = gameState.player.weaponLevel || 1;
            const shootSpeed = gameState.player.shootSpeed || 1000;
            const damageMultiplier = (gameState.player.damageMultiplier || 1.0).toFixed(1);

            // 计算每秒射击次数
            const shotsPerSecond = (1000 / shootSpeed).toFixed(1);

            weaponInfo.textContent = `武器等级: ${weaponLevel} | 射速: ${shotsPerSecond}发/秒 | 伤害倍数: ${damageMultiplier}x`;
        }
    }

    // 创建得分动画
    function createScoreAnimation(text, color) {
        const scoreElement = document.createElement('div');
        scoreElement.textContent = text;
        scoreElement.style.position = 'absolute';
        scoreElement.style.left = '50%';
        scoreElement.style.top = '50%';
        scoreElement.style.transform = 'translate(-50%, -50%)';
        scoreElement.style.color = color;
        scoreElement.style.fontSize = '24px';
        scoreElement.style.fontWeight = 'bold';
        scoreElement.style.zIndex = '10';
        scoreElement.style.pointerEvents = 'none';
        scoreElement.style.opacity = '0';
        scoreElement.style.transition = 'opacity 0.3s ease, transform 1s ease';

        gameContainer.appendChild(scoreElement);

        // 触发动画
        setTimeout(() => {
            scoreElement.style.opacity = '1';
            scoreElement.style.transform = 'translate(-50%, -100px)';
        }, 10);

        // 动画结束后移除元素
        setTimeout(() => {
            scoreElement.style.opacity = '0';
            setTimeout(() => {
                if (scoreElement.parentNode) {
                    scoreElement.parentNode.removeChild(scoreElement);
                }
            }, 300);
        }, 1000);
    }

    // 碰撞检测
    function isColliding(rect1, rect2) {
        return rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top;
    }

    // 结束游戏
    function endGame(reason) {
        gameState.gameActive = false;

        // 清除所有定时器
        clearInterval(gameState.enemyTimer);
        clearInterval(gameState.bulletTimer);
        clearTimeout(gameState.problemTimer);
        clearInterval(countdownInterval);
        clearInterval(gameState.trackingInterval);

        // 显示游戏结束画面
        const gameOverScreen = document.createElement('div');
        gameOverScreen.className = 'absolute inset-0 flex flex-col items-center justify-center bg-dark/90 z-20';

        let gameOverTitle = '游戏结束';
        let gameOverMessage = '';

        if (reason === 'timeUp') {
            gameOverTitle = '时间到！';
            gameOverMessage = '你成功完成了太空冒险！';
        } else if (gameState.revivalNeeded) {
            gameOverTitle = '任务失败';
            gameOverMessage = '飞船无法修复，任务失败！';
        }

        gameOverScreen.innerHTML = `
            <h3 class="text-2xl font-bold mb-4 text-accent">${gameOverTitle}</h3>
            <p class="text-lg mb-2">${gameOverMessage}</p>
            <p class="text-lg mb-2">最终得分: <span class="text-primary">${gameState.score}</span></p>
            <p class="text-lg mb-6">达到等级: <span class="text-secondary">${gameState.level}</span></p>
            <button id="restartGame" class="bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-lg">
                 重新开始 <i class="fa fa-refresh ml-2"></i>
             </button>
         `;

        gameContainer.appendChild(gameOverScreen);

        // 重新开始游戏
        const restartGameBtn = document.getElementById('restartGame');
        restartGameBtn.addEventListener('click', function () {
            gameOverScreen.remove();
            answerInput.value = '';
            feedback.classList.add('hidden');

            // 移除所有游戏元素
            const gameElements = gameContainer.querySelectorAll('.game-element, .particle:not(#stars > .particle)');
            gameElements.forEach(el => el.remove());

            // 清空数组
            gameState.enemies = [];
            gameState.bullets = [];
            gameState.powerUps = [];

            answerInput.value = '';
            feedback.classList.add('hidden');

            // 重新开始游戏
            startGameBtn.click();
        });
    }

    // 页面滚动监听，显示元素动画
    window.addEventListener('scroll', function () {
        const elements = document.querySelectorAll('.card-3d, #concepts h3, #examples h3, #practice h3, #game h3');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('opacity-100');
                element.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    });

    // 添加页面加载动画
    window.addEventListener('load', function () {
        // 页面完全加载后的动画可以在这里添加
    });

    // 雕像问题的交互效果
    function setupStatueInteraction() {
        const statueTop = document.getElementById('statueTop');
        const statueBottom = document.getElementById('statueBottom');

        // 可以添加鼠标悬停效果或其他交互
        if (statueTop && statueBottom) {
            statueTop.addEventListener('mouseenter', function () {
                this.style.backgroundColor = 'rgba(236, 72, 153, 0.2)';
            });

            statueTop.addEventListener('mouseleave', function () {
                this.style.backgroundColor = 'transparent';
            });

            statueBottom.addEventListener('mouseenter', function () {
                this.style.backgroundColor = 'rgba(14, 165, 233, 0.2)';
            });

            statueBottom.addEventListener('mouseleave', function () {
                this.style.backgroundColor = 'transparent';
            });
        }
    }

    // 当页面加载完成后，设置雕像交互
    window.addEventListener('load', setupStatueInteraction);

    // 响应式调整
    window.addEventListener('resize', function () {
        // 可以在这里添加响应式调整逻辑
    });