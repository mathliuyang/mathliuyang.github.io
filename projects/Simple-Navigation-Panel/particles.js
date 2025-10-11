// 粒子系统
class Particles {
    constructor() {
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        // 创建粒子容器
        const container = document.createElement('div');
        container.className = 'particles';
        document.body.appendChild(container);

        // 创建粒子
        this.createParticles(container);

        // 监听鼠标移动
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // 动画循环
        this.animate();
    }

    createParticles(container) {
        // 根据屏幕大小计算粒子数量(减少密度)
        const particleCount = Math.floor(window.innerWidth * window.innerHeight / 10000);

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // 使用窗口宽高定位
            particle.style.left = `${Math.random() * window.innerWidth}px`;
            particle.style.top = `${Math.random() * window.innerHeight}px`;

            // 随机大小和透明度
            const size = 1 + Math.random() * 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = 0.2 + Math.random() * 0.5;

            container.appendChild(particle);
            this.particles.push({
                element: particle,
                x: parseFloat(particle.style.left) / window.innerWidth * 100,
                y: parseFloat(particle.style.top) / window.innerHeight * 100,
                initialX: parseFloat(particle.style.left) / window.innerWidth * 100, // 保存初始位置
                initialY: parseFloat(particle.style.top) / window.innerHeight * 100,
                speed: 0.01 + Math.random() * 0.02
            });
        }
    }

    animate() {
        // 更新时间变量用于动画
        const time = Date.now() * 0.001;

        // 更新粒子位置
        this.particles.forEach(particle => {
            // 计算粒子到鼠标的距离
            const dx = this.mouseX - particle.x * window.innerWidth / 100;
            const dy = this.mouseY - particle.y * window.innerHeight / 100;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 根据距离计算偏移量
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (100 - distance) / 100;

            // 应用偏移 - 增强鼠标吸引力
            const attractionRadius = 500;
            const maxSpeed = 0.8;
            const minSpeed = 0.1;

            // 计算吸引力 - 使用平方反比定律使距离影响更明显
            const attractionForce = Math.pow(1 - (distance / attractionRadius), 2);
            const speed = Math.min(maxSpeed, Math.max(minSpeed, particle.speed * attractionForce * 10));

            // 平滑过渡 - 所有粒子都会受到鼠标影响，但距离越近影响越大
            const influenceFactor = 1 / (1 + Math.pow(distance / 100, 2));

            // 计算自主运动
            const noiseX = Math.sin(time * 0.8 + particle.x * 0.15) * 0.3;
            const noiseY = Math.cos(time * 0.7 + particle.y * 0.12) * 0.3;

            // 混合鼠标吸引力和自主运动(减弱鼠标影响)
            const mouseInfluence = 0.15; // 进一步降低鼠标影响力
            let newX = forceDirectionX * speed * influenceFactor * mouseInfluence + noiseX * (1 - influenceFactor);
            let newY = forceDirectionY * speed * influenceFactor * mouseInfluence + noiseY * (1 - influenceFactor);

            // 添加回归初始位置的力
            const returnForce = 0.05; // 增强回归力
            newX += (particle.initialX - particle.x) * returnForce;
            newY += (particle.initialY - particle.y) * returnForce;

            particle.x += newX;
            particle.y += newY;

            // 边界检查
            if (particle.x > 100) particle.x = 0;
            if (particle.x < 0) particle.x = 100;
            if (particle.y > 100) particle.y = 0;
            if (particle.y < 0) particle.y = 100;

            // 呼吸动画效果 - 使用正弦波控制大小和透明度
            const breathFactor = 0.5 + Math.sin(time * 5 + particle.x * 0.3 + particle.y * 0.3) * 0.5;
            const size = 1 + breathFactor * 4;
            const opacity = 0.2 + breathFactor * 1.0;

            // 更新DOM
            particle.element.style.left = `${particle.x}%`;
            particle.element.style.top = `${particle.y}%`;
            particle.element.style.width = `${size}px`;
            particle.element.style.height = `${size}px`;
            particle.element.style.opacity = opacity;

            // 根据主题动态更新粒子颜色
            const currentTheme = document.documentElement.getAttribute('data-theme');
            particle.element.style.backgroundColor = currentTheme === 'light' ?
                'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 初始化粒子系统
new Particles();