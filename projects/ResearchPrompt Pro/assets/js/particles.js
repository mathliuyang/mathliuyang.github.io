/**
 * GitHub风格粒子特效系统
 * 支持主题切换和繁星闪烁效果
 */
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.stars = [];
        this.animationId = null;
        this.isDarkTheme = true;
        this.config = {
            particleCount: 60,      // 粒子数量
            starCount: 30,          // 星星数量
            minSize: 1,             // 最小尺寸
            maxSize: 3,             // 最大尺寸
            minSpeed: 0.2,          // 最小速度
            maxSpeed: 0.8,          // 最大速度
            connectionDistance: 120, // 连线距离
            twinkleSpeed: 0.02      // 闪烁速度
        };
        
        this.init();
    }

    /**
     * 初始化粒子系统
     */
    init() {
        this.createCanvas();
        this.createParticles();
        this.createStars();
        this.bindEvents();
        this.animate();
    }

    /**
     * 创建Canvas元素
     */
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 设置Canvas样式
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        // 设置Canvas尺寸
        this.resizeCanvas();
        
        // 添加到背景动画容器
        const backgroundContainer = document.querySelector('.background-animation');
        if (backgroundContainer) {
            backgroundContainer.appendChild(this.canvas);
        } else {
            document.body.appendChild(this.canvas);
        }
    }

    /**
     * 调整Canvas尺寸
     */
    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
    }

    /**
     * 创建粒子
     */
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * this.config.maxSpeed,
                vy: (Math.random() - 0.5) * this.config.maxSpeed,
                size: Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize,
                opacity: Math.random() * 0.5 + 0.3,
                hue: Math.random() * 60 + 200 // 蓝紫色调
            });
        }
    }

    /**
     * 创建星星（闪烁效果）
     */
    createStars() {
        this.stars = [];
        for (let i = 0; i < this.config.starCount; i++) {
            this.stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random(),
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    /**
     * 更新粒子位置
     */
    updateParticles() {
        this.particles.forEach(particle => {
            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 边界检测
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            }

            // 随机改变透明度和大小，创建闪烁效果
            particle.opacity += (Math.random() - 0.5) * 0.02;
            particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
            
            particle.currentSize = particle.size * (1 + Math.sin(Date.now() * 0.003 + particle.x * 0.01) * 0.2);
        });
    }

    /**
     * 更新星星闪烁
     */
    updateStars() {
        this.stars.forEach(star => {
            star.twinklePhase += star.twinkleSpeed;
            // 使用多重正弦波创建更丰富的闪烁效果
            const baseOpacity = (Math.sin(star.twinklePhase) + 1) * 0.4 + 0.2;
            const secondaryOpacity = (Math.sin(star.twinklePhase * 2.3) + 1) * 0.2;
            star.opacity = baseOpacity + secondaryOpacity;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
            
            // 添加大小变化
            star.currentSize = star.size * (1 + Math.sin(star.twinklePhase * 1.5) * 0.3);
        });
    }

    /**
     * 绘制粒子
     */
    drawParticles() {
        this.particles.forEach(particle => {
            const size = particle.currentSize || particle.size;
            
            // 创建发光效果
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size * 1.5, 0, Math.PI * 2);
            
            if (this.isDarkTheme) {
                this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.2})`;
            } else {
                this.ctx.fillStyle = `hsla(${particle.hue}, 50%, 40%, ${particle.opacity * 0.1})`;
            }
            this.ctx.fill();
            
            // 绘制主粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            
            // 根据主题设置颜色
            if (this.isDarkTheme) {
                this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
            } else {
                this.ctx.fillStyle = `hsla(${particle.hue}, 50%, 40%, ${particle.opacity * 0.6})`;
            }
            
            this.ctx.fill();
        });
    }

    /**
     * 绘制星星
     */
    drawStars() {
        this.stars.forEach(star => {
            const size = star.currentSize || star.size;
            
            // 创建发光效果
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, size * 2, 0, Math.PI * 2);
            
            // 根据主题设置发光颜色
            if (this.isDarkTheme) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.1})`;
            } else {
                this.ctx.fillStyle = `rgba(100, 150, 200, ${star.opacity * 0.05})`;
            }
            this.ctx.fill();
            
            // 绘制十字星形
            this.ctx.beginPath();
            this.ctx.moveTo(star.x - size, star.y);
            this.ctx.lineTo(star.x + size, star.y);
            this.ctx.moveTo(star.x, star.y - size);
            this.ctx.lineTo(star.x, star.y + size);
            
            // 绘制对角线
            const diagSize = size * 0.7;
            this.ctx.moveTo(star.x - diagSize, star.y - diagSize);
            this.ctx.lineTo(star.x + diagSize, star.y + diagSize);
            this.ctx.moveTo(star.x - diagSize, star.y + diagSize);
            this.ctx.lineTo(star.x + diagSize, star.y - diagSize);
            
            // 根据主题设置颜色
            if (this.isDarkTheme) {
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
            } else {
                this.ctx.strokeStyle = `rgba(100, 150, 200, ${star.opacity * 0.8})`;
            }
            
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
            // 添加中心点
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, size * 0.3, 0, Math.PI * 2);
            this.ctx.fillStyle = this.ctx.strokeStyle;
            this.ctx.fill();
        });
    }

    /**
     * 绘制连线
     */
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - distance / this.config.connectionDistance) * 0.3;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    
                    // 根据主题设置连线颜色
                    if (this.isDarkTheme) {
                        this.ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
                    } else {
                        this.ctx.strokeStyle = `rgba(150, 180, 220, ${opacity * 0.6})`;
                    }
                    
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }

    /**
     * 动画循环
     */
    animate() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        // 更新位置
        this.updateParticles();
        this.updateStars();
        
        // 绘制元素
        this.drawConnections();
        this.drawParticles();
        this.drawStars();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    /**
     * 更新主题
     */
    updateTheme(isDark) {
        this.isDarkTheme = isDark;
        
        // 重新创建粒子以适应新主题
        this.createParticles();
        this.createStars();
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 窗口大小改变
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
            this.createStars();
        });

        // 监听主题变化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    this.updateTheme(isDark);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    /**
     * 销毁粒子系统
     */
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// 导出粒子系统
window.ParticleSystem = ParticleSystem;