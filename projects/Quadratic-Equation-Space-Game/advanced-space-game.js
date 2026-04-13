// ==================== 高级太空游戏引擎 v3.0 ====================
// 全面优化的游戏系统 - 自动射击、多武器、僚机系统、Boss战

class AdvancedSpaceGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.bgCanvas = null;
        this.bgCtx = null;
        this.uiCanvas = null;
        this.uiCtx = null;
        
        this.gameState = null;
        this.lastTime = 0;
        this.deltaTime = 0;
        
        this.systems = {};
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        this.setupCanvases();
        this.initGameState();
        
        this.systems.input = new InputSystem(this);
        this.systems.background = new BackgroundSystem(this);
        this.systems.player = new PlayerSystem(this);
        this.systems.weapon = new WeaponSystem(this);
        this.systems.wingman = new WingmanSystem(this);
        this.systems.enemy = new EnemySystem(this);
        this.systems.boss = new BossSystem(this);
        this.systems.particle = new ParticleSystem(this);
        this.systems.collision = new CollisionSystem(this);
        this.systems.question = new QuestionSystem(this);
        this.systems.ui = new UISystem(this);
        this.systems.audio = new AudioSystem(this);
        
        Object.values(this.systems).forEach(system => system.init());
        
        this.initialized = true;
        this.lastTime = performance.now();
        
        this.gameLoop();
    }

    setupCanvases() {
        const container = document.getElementById('spaceGameContainer');
        
        this.bgCanvas = document.getElementById('bgCanvas');
        this.canvas = document.getElementById('gameCanvas');
        this.uiCanvas = document.getElementById('uiCanvas');
        
        this.bgCtx = this.bgCanvas.getContext('2d');
        this.ctx = this.canvas.getContext('2d');
        this.uiCtx = this.uiCanvas.getContext('2d');
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        [this.bgCanvas, this.canvas, this.uiCanvas].forEach(canvas => {
            canvas.width = width;
            canvas.height = height;
        });
    }

    initGameState() {
        this.gameState = {
            player: {
                x: this.canvas.width / 2,
                y: this.canvas.height - 120,
                vx: 0, vy: 0,
                width: 50, height: 60,
                health: 100, maxHealth: 100,
                shield: 50, maxShield: 100,
                speed: 8, angle: 0,
                invincible: false, invincibleTime: 0,
                level: 1, exp: 0, expToNext: 100,
                skillCount: 3, maxSkillCount: 3
            },
            
            score: 0, combo: 0, maxCombo: 0,
            level: 1, gameTime: 300,
            isRunning: true, isPaused: false,
            
            weapons: {
                normal: { level: 1, damage: 15, cooldown: 200, unlocked: true, active: true },
                laser: { level: 0, damage: 25, cooldown: 150, unlocked: false, active: false },
                spread: { level: 0, damage: 12, cooldown: 300, unlocked: false, active: false },
                missile: { level: 0, damage: 60, cooldown: 600, unlocked: false, active: false },
                rapid: { level: 0, damage: 8, cooldown: 80, unlocked: false, active: false }
            },
            
            wingmen: [],
            maxWingmen: 0,
            
            bullets: [], enemyBullets: [],
            enemies: [], powerUps: [],
            
            boss: null,
            bossDefeated: 0,
            
            questionActive: false,
            currentQuestion: null,
            questionTimer: 0,
            
            screenShake: 0, slowMotion: 1,
            
            enemiesKilled: 0, bulletsFired: 0,
            damageDealt: 0, damageTaken: 0,
            
            frameCount: 0
        };
    }

    gameLoop() {
        if (!this.gameState.isRunning) return;
        
        const currentTime = performance.now();
        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        if (!this.gameState.isPaused) {
            this.update();
        }
        this.render();
        
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        const dt = this.deltaTime * this.gameState.slowMotion;
        
        this.gameState.frameCount++;
        
        this.systems.background.update(dt);
        this.systems.player.update(dt);
        this.systems.weapon.update(dt);
        this.systems.wingman.update(dt);
        this.systems.enemy.update(dt);
        this.systems.boss.update(dt);
        this.systems.particle.update(dt);
        this.systems.collision.update(dt);
        this.systems.question.update(dt);
        this.systems.ui.update(dt);
        
        if (this.gameState.screenShake > 0) {
            this.gameState.screenShake *= 0.9;
            if (this.gameState.screenShake < 0.5) this.gameState.screenShake = 0;
        }
        
        if (this.gameState.slowMotion < 1) {
            this.gameState.slowMotion = Math.min(1, this.gameState.slowMotion + this.deltaTime);
        }
    }

    render() {
        let shakeX = 0, shakeY = 0;
        if (this.gameState.screenShake > 0) {
            shakeX = (Math.random() - 0.5) * this.gameState.screenShake;
            shakeY = (Math.random() - 0.5) * this.gameState.screenShake;
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.uiCtx.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);
        
        this.ctx.save();
        this.ctx.translate(shakeX, shakeY);
        
        if (Math.floor(performance.now() / 33) % 2 === 0) {
            this.systems.background.render(this.bgCtx);
        }
        
        this.systems.particle.render(this.ctx);
        this.systems.wingman.render(this.ctx);
        this.systems.weapon.render(this.ctx);
        this.systems.boss.render(this.ctx);
        this.systems.enemy.render(this.ctx);
        this.systems.player.render(this.ctx);
        
        this.ctx.restore();
        
        this.systems.ui.render(this.uiCtx);
    }

    pause() {
        this.gameState.isPaused = !this.gameState.isPaused;
        this.systems.ui.showPauseMenu(this.gameState.isPaused);
    }

    end() {
        this.gameState.isRunning = false;
        this.systems.audio.stopBGM();
    }
}

// ==================== 输入系统 ====================
class InputSystem {
    constructor(game) {
        this.game = game;
        this.keys = {};
    }

    init() {
        document.addEventListener('keydown', e => {
            this.keys[e.key.toLowerCase()] = true;
            
            if (e.key === 'Escape') this.game.pause();
            if (e.key === ' ') this.game.systems.player.useSkill();
        });
        
        document.addEventListener('keyup', e => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    isKeyPressed(key) {
        return !!this.keys[key.toLowerCase()];
    }
}

// ==================== 背景系统 ====================
class BackgroundSystem {
    constructor(game) {
        this.game = game;
        this.stars = [];
        this.nebulas = [];
        this.gridOffset = 0;
    }

    init() {
        for (let i = 0; i < 200; i++) {
            this.stars.push({
                x: Math.random() * this.game.canvas.width,
                y: Math.random() * this.game.canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 3 + 0.5,
                brightness: Math.random(),
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
        
        for (let i = 0; i < 3; i++) {
            this.nebulas.push({
                x: Math.random() * this.game.canvas.width,
                y: Math.random() * this.game.canvas.height,
                radius: 150 + Math.random() * 200,
                color: ['#ff00ff', '#00ffff', '#ff6600'][i],
                alpha: 0.1 + Math.random() * 0.1
            });
        }
    }

    update(dt) {
        this.gridOffset = (this.gridOffset + 30 * dt) % 40;
        
        this.stars.forEach(star => {
            star.y += star.speed * this.game.gameState.slowMotion;
            star.brightness += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
            
            if (star.y > this.game.canvas.height) {
                star.y = -10;
                star.x = Math.random() * this.game.canvas.width;
            }
        });
    }

    render(ctx) {
        const width = this.game.canvas.width;
        const height = this.game.canvas.height;
        
        const gradient = ctx.createRadialGradient(
            width / 2, height / 2, 0,
            width / 2, height / 2, height
        );
        gradient.addColorStop(0, '#0a0a2e');
        gradient.addColorStop(0.5, '#050518');
        gradient.addColorStop(1, '#000000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        this.nebulas.forEach(nebula => {
            const grad = ctx.createRadialGradient(
                nebula.x, nebula.y, 0,
                nebula.x, nebula.y, nebula.radius
            );
            grad.addColorStop(0, nebula.color + Math.floor(nebula.alpha * 255).toString(16).padStart(2, '0'));
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
        });
        
        this.stars.forEach(star => {
            const alpha = Math.max(0.2, Math.min(1, star.brightness));
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.08)';
        ctx.lineWidth = 1;
        
        for (let x = -this.gridOffset; x < width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        for (let y = -this.gridOffset; y < height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }
}

// ==================== 玩家系统 ====================
class PlayerSystem {
    constructor(game) {
        this.game = game;
        this.player = null;
    }

    init() {
        this.player = this.game.gameState.player;
    }

    update(dt) {
        const input = this.game.systems.input;
        const player = this.player;
        const speed = player.speed * this.game.gameState.slowMotion;
        
        let dx = 0, dy = 0;
        
        if (input.isKeyPressed('w') || input.isKeyPressed('arrowup')) dy -= 1;
        if (input.isKeyPressed('s') || input.isKeyPressed('arrowdown')) dy += 1;
        if (input.isKeyPressed('a') || input.isKeyPressed('arrowleft')) dx -= 1;
        if (input.isKeyPressed('d') || input.isKeyPressed('arrowright')) dx += 1;
        
        if (dx !== 0 && dy !== 0) {
            dx *= 0.707;
            dy *= 0.707;
        }
        
        player.vx += dx * 15 * dt;
        player.vy += dy * 15 * dt;
        
        player.vx *= Math.pow(0.92, dt * 60);
        player.vy *= Math.pow(0.92, dt * 60);
        
        const maxSpeed = speed;
        const currentSpeed = Math.sqrt(player.vx ** 2 + player.vy ** 2);
        if (currentSpeed > maxSpeed) {
            player.vx = (player.vx / currentSpeed) * maxSpeed;
            player.vy = (player.vy / currentSpeed) * maxSpeed;
        }
        
        player.x += player.vx * this.game.gameState.slowMotion;
        player.y += player.vy * this.game.gameState.slowMotion;
        
        if (Math.abs(player.vx) > 0.1 || Math.abs(player.vy) > 0.1) {
            player.angle = Math.atan2(player.vy, player.vx);
        }
        
        const margin = 30;
        const width = this.game.canvas.width;
        const height = this.game.canvas.height;
        
        if (player.x < margin) { player.x = margin; player.vx *= -0.5; }
        if (player.x > width - margin) { player.x = width - margin; player.vx *= -0.5; }
        if (player.y < margin) { player.y = margin; player.vy *= -0.5; }
        if (player.y > height - margin) { player.y = height - margin; player.vy *= -0.5; }
        
        if (player.invincible) {
            player.invincibleTime -= dt * 1000;
            if (player.invincibleTime <= 0) player.invincible = false;
        }
        
        if (player.shield < player.maxShield) {
            player.shield = Math.min(player.maxShield, player.shield + 8 * dt);
        }
        
        if (currentSpeed > 1) {
            for (let i = 0; i < 2; i++) {
                const offsetX = (Math.random() - 0.5) * 15;
                this.game.systems.particle.emitTrail(player.x + offsetX, player.y + 25);
            }
        }
    }

    render(ctx) {
        const player = this.player;
        
        ctx.save();
        ctx.translate(player.x, player.y);
        
        if (player.invincible && Math.floor(Date.now() / 50) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }
        
        if (player.shield > 0) {
            const shieldAlpha = 0.2 + (player.shield / player.maxShield) * 0.3;
            ctx.strokeStyle = `rgba(0, 255, 255, ${shieldAlpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 45, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.rotate(player.angle * 0.1);
        ctx.shadowColor = '#00aaff';
        ctx.shadowBlur = 20;
        
        const bodyGradient = ctx.createLinearGradient(0, -30, 0, 30);
        bodyGradient.addColorStop(0, '#00ccff');
        bodyGradient.addColorStop(0.5, '#0066aa');
        bodyGradient.addColorStop(1, '#003366');
        
        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.moveTo(0, -35);
        ctx.lineTo(-20, 20);
        ctx.lineTo(-10, 25);
        ctx.lineTo(0, 15);
        ctx.lineTo(10, 25);
        ctx.lineTo(20, 20);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.moveTo(0, -25);
        ctx.lineTo(-8, 5);
        ctx.lineTo(0, 0);
        ctx.lineTo(8, 5);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(0, -10, 5, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowColor = '#ff6600';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ffaa00';
        ctx.beginPath();
        ctx.arc(-12, 22, 4, 0, Math.PI * 2);
        ctx.arc(12, 22, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    useSkill() {
        const player = this.player;
        
        if (player.skillCount <= 0) {
            this.game.systems.audio.playSFX('wrong');
            return;
        }
        
        player.skillCount--;
        
        this.game.gameState.enemyBullets = [];
        
        this.game.gameState.enemies.forEach(enemy => {
            enemy.health -= 15;
            if (enemy.health <= 0) {
                this.game.systems.enemy.destroyEnemy(enemy);
            }
        });
        
        if (this.game.gameState.boss) {
            this.game.gameState.boss.health -= 50;
        }
        
        this.game.gameState.screenShake = 20;
        this.game.systems.audio.playSFX('bomb');
        this.game.systems.particle.emitExplosion(player.x, player.y, 'large');
        
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            this.game.systems.particle.emitExplosion(
                player.x + Math.cos(angle) * 100,
                player.y + Math.sin(angle) * 100,
                'medium'
            );
        }
    }

    takeDamage(damage) {
        const player = this.game.gameState.player;
        
        if (player.invincible) return;
        
        console.log(`受到伤害: ${damage}, 当前血量: ${player.health}, 护盾: ${player.shield}`);
        
        if (player.shield > 0) {
            const shieldAbsorb = Math.min(player.shield, damage);
            player.shield -= shieldAbsorb;
            damage -= shieldAbsorb;
            console.log(`护盾吸收: ${shieldAbsorb}, 剩余伤害: ${damage}`);
        }
        
        if (damage > 0) {
            player.health -= damage;
            this.game.gameState.damageTaken += damage;
            console.log(`血量减少: ${damage}, 剩余血量: ${player.health}`);
            
            player.invincible = true;
            player.invincibleTime = 1000;
            
            this.game.gameState.screenShake = 10;
            this.game.systems.audio.playSFX('hit');
        }
        
        if (player.health <= 0) {
            this.game.end();
        }
    }
}

// ==================== 武器系统 ====================
class WeaponSystem {
    constructor(game) {
        this.game = game;
        this.lastShot = {};
    }

    init() {
        Object.keys(this.game.gameState.weapons).forEach(weapon => {
            this.lastShot[weapon] = 0;
        });
    }

    update(dt) {
        const now = Date.now();
        const weapons = this.game.gameState.weapons;
        
        Object.keys(weapons).forEach(weaponType => {
            const weapon = weapons[weaponType];
            if (weapon.unlocked && weapon.active && now - this.lastShot[weaponType] > weapon.cooldown) {
                this.fire(weaponType);
                this.lastShot[weaponType] = now;
            }
        });
    }

    fire(weaponType) {
        const player = this.game.gameState.player;
        const weapon = this.game.gameState.weapons[weaponType];
        const level = weapon.level || 1;
        
        this.game.gameState.bulletsFired++;
        
        switch (weaponType) {
            case 'normal':
                this.createBullet(player.x, player.y - 30, 0, -12, weapon.damage, '#00ff00');
                if (level >= 2) {
                    this.createBullet(player.x - 15, player.y - 25, -2, -11, weapon.damage, '#00ff00');
                    this.createBullet(player.x + 15, player.y - 25, 2, -11, weapon.damage, '#00ff00');
                }
                if (level >= 3) {
                    this.createBullet(player.x - 25, player.y - 20, -4, -10, weapon.damage, '#00ff00');
                    this.createBullet(player.x + 25, player.y - 20, 4, -10, weapon.damage, '#00ff00');
                }
                break;
                
            case 'laser':
                this.createBullet(player.x, player.y - 30, 0, -20, weapon.damage, '#ff0080', 8, 30);
                if (level >= 2) {
                    this.createBullet(player.x - 10, player.y - 30, 0, -20, weapon.damage, '#ff0080', 6, 25);
                    this.createBullet(player.x + 10, player.y - 30, 0, -20, weapon.damage, '#ff0080', 6, 25);
                }
                break;
                
            case 'spread':
                const spreadCount = 3 + level;
                for (let i = 0; i < spreadCount; i++) {
                    const angle = (i - (spreadCount - 1) / 2) * 0.4;
                    this.createBullet(
                        player.x, player.y - 30,
                        Math.sin(angle) * 6, -10 + Math.cos(angle) * 2,
                        weapon.damage, '#ffff00', 5, 12
                    );
                }
                break;
                
            case 'missile':
                this.createHomingMissile(player.x, player.y - 30);
                if (level >= 2) {
                    setTimeout(() => this.createHomingMissile(player.x - 20, player.y - 20), 100);
                    setTimeout(() => this.createHomingMissile(player.x + 20, player.y - 20), 200);
                }
                break;
                
            case 'rapid':
                this.createBullet(player.x, player.y - 30, 0, -15, weapon.damage, '#ff00ff', 3, 10);
                break;
        }
        
        this.game.systems.audio.playSFX('shoot');
    }

    createBullet(x, y, vx, vy, damage, color, width = 4, height = 15) {
        this.game.gameState.bullets.push({
            x, y, vx, vy, damage, color, width, height,
            isEnemy: false, life: 100
        });
    }

    createHomingMissile(x, y) {
        this.game.gameState.bullets.push({
            x, y, vx: 0, vy: -6,
            damage: 60,
            color: '#ff6600',
            width: 12, height: 20,
            isEnemy: false,
            isHoming: true,
            life: 200
        });
    }

    render(ctx) {
        this.game.gameState.bullets.forEach((bullet, index) => {
            bullet.x += bullet.vx * this.game.gameState.slowMotion;
            bullet.y += bullet.vy * this.game.gameState.slowMotion;
            
            if (bullet.isHoming) {
                const nearestEnemy = this.findNearestEnemy(bullet);
                if (nearestEnemy) {
                    const angle = Math.atan2(nearestEnemy.y - bullet.y, nearestEnemy.x - bullet.x);
                    bullet.vx += Math.cos(angle) * 0.5;
                    bullet.vy += Math.sin(angle) * 0.5;
                    const speed = Math.min(8, Math.hypot(bullet.vx, bullet.vy));
                    bullet.vx = (bullet.vx / Math.hypot(bullet.vx, bullet.vy)) * speed;
                    bullet.vy = (bullet.vy / Math.hypot(bullet.vx, bullet.vy)) * speed;
                }
            }
            
            ctx.save();
            ctx.fillStyle = bullet.color;
            ctx.shadowColor = bullet.color;
            ctx.shadowBlur = 10;
            
            if (bullet.isHoming) {
                ctx.translate(bullet.x, bullet.y);
                ctx.rotate(Math.atan2(bullet.vy, bullet.vx) + Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(0, -10);
                ctx.lineTo(-5, 10);
                ctx.lineTo(5, 10);
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.fillRect(bullet.x - bullet.width / 2, bullet.y - bullet.height / 2, bullet.width, bullet.height);
            }
            
            ctx.restore();
            
            bullet.life -= this.game.gameState.slowMotion;
            if (bullet.y < -20 || bullet.life <= 0) {
                this.game.gameState.bullets.splice(index, 1);
            }
        });
    }

    findNearestEnemy(bullet) {
        let nearest = null;
        let minDist = Infinity;
        
        this.game.gameState.enemies.forEach(enemy => {
            const dist = Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y);
            if (dist < minDist && dist < 300) {
                minDist = dist;
                nearest = enemy;
            }
        });
        
        if (this.game.gameState.boss) {
            const boss = this.game.gameState.boss;
            const dist = Math.hypot(boss.x - bullet.x, boss.y - bullet.y);
            if (dist < minDist) {
                nearest = boss;
            }
        }
        
        return nearest;
    }
}

// ==================== 僚机系统 ====================
class WingmanSystem {
    constructor(game) {
        this.game = game;
    }

    init() {}

    addWingman() {
        const wingmen = this.game.gameState.wingmen;
        const index = wingmen.length;
        
        wingmen.push({
            x: 0, y: 0,
            targetX: 0, targetY: 0,
            angle: 0,
            index: index,
            offsetX: (index % 2 === 0 ? -1 : 1) * (60 + Math.floor(index / 2) * 40),
            offsetY: -30 - Math.floor(index / 2) * 20,
            lastShot: 0
        });
    }

    update(dt) {
        const player = this.game.gameState.player;
        const wingmen = this.game.gameState.wingmen;
        
        wingmen.forEach(wingman => {
            wingman.targetX = player.x + wingman.offsetX;
            wingman.targetY = player.y + wingman.offsetY;
            
            wingman.x += (wingman.targetX - wingman.x) * 5 * dt;
            wingman.y += (wingman.targetY - wingman.y) * 5 * dt;
            
            wingman.angle = Math.atan2(wingman.targetY - wingman.y, wingman.targetX - wingman.x);
            
            if (Date.now() - wingman.lastShot > 400) {
                this.fire(wingman);
                wingman.lastShot = Date.now();
            }
        });
    }

    fire(wingman) {
        this.game.gameState.bullets.push({
            x: wingman.x, y: wingman.y - 15,
            vx: 0, vy: -10,
            damage: 10,
            color: '#00ffff',
            width: 3, height: 10,
            isEnemy: false, life: 100
        });
    }

    render(ctx) {
        this.game.gameState.wingmen.forEach(wingman => {
            ctx.save();
            ctx.translate(wingman.x, wingman.y);
            ctx.rotate(wingman.angle * 0.3);
            
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 10;
            
            ctx.fillStyle = '#00aaaa';
            ctx.beginPath();
            ctx.moveTo(0, -12);
            ctx.lineTo(-8, 8);
            ctx.lineTo(0, 5);
            ctx.lineTo(8, 8);
            ctx.closePath();
            ctx.fill();
            
            ctx.fillStyle = '#00ffff';
            ctx.beginPath();
            ctx.arc(0, 0, 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
    }
}

// ==================== 高级敌人系统 ====================
class EnemySystem {
    constructor(game) {
        this.game = game;
        this.spawnTimer = 0;
        this.spawnInterval = 2;
    }

    init() {}

    update(dt) {
        this.spawnTimer += dt;
        
        // 生成敌机
        if (!this.game.gameState.boss && this.spawnTimer > this.spawnInterval) {
            this.spawnEnemy();
            this.spawnTimer = 0;
            this.spawnInterval = Math.max(0.5, 2 - this.game.gameState.level * 0.1);
        }
        
        // 生成Boss
        if (!this.game.gameState.boss && this.game.gameState.enemiesKilled > 0 && 
            this.game.gameState.enemiesKilled % 20 === 0 && this.game.gameState.enemies.length === 0) {
            this.game.systems.boss.spawnBoss(Math.floor(this.game.gameState.enemiesKilled / 20));
        }
        
        // 更新敌机
        this.game.gameState.enemies.forEach(enemy => {
            enemy.patternTimer += dt;
            this.updateEnemyMovement(enemy, dt);
            
            // 射击
            if (Date.now() - enemy.lastShot > enemy.shootInterval) {
                this.enemyShoot(enemy);
                enemy.lastShot = Date.now();
            }
            
            // 移除屏幕外敌机
            if (enemy.y > this.game.canvas.height + 100) {
                const index = this.game.gameState.enemies.indexOf(enemy);
                if (index > -1) this.game.gameState.enemies.splice(index, 1);
            }
        });
    }

    spawnEnemy() {
        const types = ['basic', 'fast', 'tank', 'destroyer', 'elite', 'formation', 'circle'];
        const weights = [0.3, 0.25, 0.2, 0.1, 0.08, 0.05, 0.02];
        
        let random = Math.random();
        let type = 'basic';
        let cumulativeWeight = 0;
        
        for (let i = 0; i < types.length; i++) {
            cumulativeWeight += weights[i];
            if (random <= cumulativeWeight) {
                type = types[i];
                break;
            }
        }
        
        const enemy = this.createEnemy(type);
        this.game.gameState.enemies.push(enemy);
        
        // 编队敌机生成僚机
        if (type === 'formation') {
            for (let i = 0; i < 2; i++) {
                const escort = this.createEnemy('escort');
                escort.master = enemy;
                escort.formationOffset = (i === 0 ? -40 : 40);
                this.game.gameState.enemies.push(escort);
            }
        }
    }

    createEnemy(type) {
        const width = this.game.canvas.width;
        const enemyTypes = {
            basic: {
                type: 'basic',
                shape: 'triangle',
                width: 40, height: 35,
                health: 15, maxHealth: 15,
                speed: 2.5,
                color: '#ff4444', glow: '#ff0000',
                score: 100,
                shootInterval: 2500,
                pattern: 'straight'
            },
            fast: {
                type: 'fast',
                shape: 'arrow',
                width: 35, height: 40,
                health: 10, maxHealth: 10,
                speed: 5,
                color: '#ff8844', glow: '#ff6600',
                score: 150,
                shootInterval: 2000,
                pattern: 'zigzag'
            },
            tank: {
                type: 'tank',
                shape: 'hexagon',
                width: 55, height: 50,
                health: 40, maxHealth: 40,
                speed: 1.2,
                color: '#8844ff', glow: '#6600ff',
                score: 250,
                shootInterval: 3000,
                pattern: 'slow'
            },
            destroyer: {
                type: 'destroyer',
                shape: 'octagon',
                width: 60, height: 55,
                health: 60, maxHealth: 60,
                speed: 1,
                color: '#ff4488', glow: '#ff0066',
                score: 400,
                shootInterval: 2000,
                pattern: 'elite'
            },
            elite: {
                type: 'elite',
                shape: 'diamond',
                width: 50, height: 50,
                health: 80, maxHealth: 80,
                speed: 1.5,
                color: '#ffaa44', glow: '#ff8800',
                score: 500,
                shootInterval: 1500,
                pattern: 'circle'
            },
            formation: {
                type: 'formation',
                shape: 'crab',
                width: 50, height: 45,
                health: 30, maxHealth: 30,
                speed: 1.8,
                color: '#44ff88', glow: '#00ff66',
                score: 300,
                shootInterval: 2200,
                pattern: 'formation'
            },
            circle: {
                type: 'circle',
                shape: 'mantis',
                width: 45, height: 45,
                health: 25, maxHealth: 25,
                speed: 2,
                color: '#44aaff', glow: '#0088ff',
                score: 200,
                shootInterval: 1800,
                pattern: 'circle'
            },
            escort: {
                type: 'escort',
                shape: 'triangle',
                width: 30, height: 28,
                health: 8, maxHealth: 8,
                speed: 0,
                color: '#88ff44', glow: '#66ff00',
                score: 50,
                shootInterval: 3000,
                pattern: 'escort'
            },
            drone: {
                type: 'drone',
                shape: 'triangle',
                width: 25, height: 25,
                health: 5, maxHealth: 5,
                speed: 4,
                color: '#ff6644', glow: '#ff4400',
                score: 30,
                shootInterval: 4000,
                pattern: 'dive'
            }
        };
        
        const template = enemyTypes[type];
        return {
            ...template,
            x: Math.random() * (width - 100) + 50,
            y: -50,
            patternTimer: 0,
            lastShot: 0,
            initialX: Math.random() * (width - 100) + 50,
            circleAngle: Math.random() * Math.PI * 2
        };
    }

    updateEnemyMovement(enemy, dt) {
        switch (enemy.pattern) {
            case 'straight':
                enemy.y += enemy.speed * this.game.gameState.slowMotion;
                break;
                
            case 'zigzag':
                enemy.x = enemy.initialX + Math.sin(enemy.patternTimer * 3) * 80;
                enemy.y += enemy.speed * this.game.gameState.slowMotion;
                break;
                
            case 'slow':
                enemy.y += enemy.speed * this.game.gameState.slowMotion;
                break;
                
            case 'elite':
                enemy.x = enemy.initialX + Math.sin(enemy.patternTimer * 2) * 150;
                if (enemy.y < 180) {
                    enemy.y += enemy.speed * this.game.gameState.slowMotion;
                }
                break;
                
            case 'formation':
                enemy.x = this.game.canvas.width / 2 + enemy.formationOffset + Math.sin(enemy.patternTimer * 2) * 20;
                enemy.y += enemy.speed * this.game.gameState.slowMotion;
                break;
                
            case 'circle':
                const centerX = this.game.canvas.width / 2;
                enemy.x = centerX + Math.cos(enemy.circleAngle + enemy.patternTimer) * 150;
                enemy.y += enemy.speed * 0.5 * this.game.gameState.slowMotion;
                break;
                
            case 'escort':
                if (enemy.master && enemy.master.health > 0) {
                    enemy.x = enemy.master.x + (enemy.master.x > this.game.canvas.width / 2 ? -60 : 60);
                    enemy.y = enemy.master.y - 50;
                } else {
                    enemy.pattern = 'zigzag';
                }
                break;
                
            case 'dive':
                const player = this.game.gameState.player;
                const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
                enemy.vx = Math.cos(angle) * enemy.speed;
                enemy.vy = Math.sin(angle) * enemy.speed;
                enemy.x += enemy.vx * this.game.gameState.slowMotion;
                enemy.y += enemy.vy * this.game.gameState.slowMotion;
                break;
                
            default:
                enemy.y += enemy.speed * this.game.gameState.slowMotion;
        }
    }

    enemyShoot(enemy) {
        const player = this.game.gameState.player;
        const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
        
        if (enemy.type === 'destroyer') {
            // 扇形射击
            for (let i = -1; i <= 1; i++) {
                const spreadAngle = angle + i * 0.3;
                this.game.gameState.enemyBullets.push({
                    x: enemy.x, y: enemy.y + enemy.height / 2,
                    vx: Math.cos(spreadAngle) * 5, vy: Math.sin(spreadAngle) * 5,
                    damage: 12, color: '#ff0066',
                    width: 8, height: 8, isEnemy: true
                });
            }
        } else if (enemy.type === 'elite') {
            // 螺旋射击
            const spiralAngle = enemy.patternTimer * 3;
            for (let i = 0; i < 4; i++) {
                const shootAngle = spiralAngle + (Math.PI / 2) * i;
                this.game.gameState.enemyBullets.push({
                    x: enemy.x, y: enemy.y,
                    vx: Math.cos(shootAngle) * 6, vy: Math.sin(shootAngle) * 6,
                    damage: 10, color: '#ff6600',
                    width: 6, height: 6, isEnemy: true
                });
            }
        } else if (enemy.type === 'sniper') {
            // 高速狙击弹
            this.game.gameState.enemyBullets.push({
                x: enemy.x, y: enemy.y + enemy.height / 2,
                vx: Math.cos(angle) * 10, vy: Math.sin(angle) * 10,
                damage: 25, color: '#00ffff',
                width: 10, height: 10, isEnemy: true, isSniper: true
            });
        } else {
            this.game.gameState.enemyBullets.push({
                x: enemy.x, y: enemy.y + enemy.height / 2,
                vx: Math.cos(angle) * 5, vy: Math.sin(angle) * 5,
                damage: 10, color: '#ff0000',
                width: 6, height: 6, isEnemy: true
            });
        }
    }

    destroyEnemy(enemy, fromCollision = false) {
        const index = this.game.gameState.enemies.indexOf(enemy);
        if (index > -1) {
            this.game.gameState.enemies.splice(index, 1);
            
            // 只有被子弹击杀才给奖励，碰撞不给
            if (!fromCollision) {
                this.game.gameState.score += enemy.score * (1 + this.game.gameState.combo * 0.1);
                this.game.gameState.combo++;
                this.game.gameState.comboTimer = 3;
                this.game.gameState.maxCombo = Math.max(this.game.gameState.maxCombo, this.game.gameState.combo);
                this.game.gameState.enemiesKilled++;
                
                this.game.gameState.player.exp += enemy.score;
                this.checkLevelUp();
            }
            
            const size = enemy.health > 10 ? 'large' : 'medium';
            this.game.systems.particle.emitExplosion(enemy.x, enemy.y, size);
            this.game.systems.audio.playSFX('explosion');
        }
    }

    checkLevelUp() {
        const player = this.game.gameState.player;
        if (player.exp >= player.expToNext) {
            player.level++;
            player.exp -= player.expToNext;
            player.expToNext = Math.floor(player.expToNext * 1.15);
            player.maxHealth += 15;
            player.health = player.maxHealth;
            this.game.systems.ui.showLevelUp();
        }
    }

    render(ctx) {
        this.game.gameState.enemies.forEach(enemy => {
            ctx.save();
            ctx.translate(enemy.x, enemy.y);
            
            ctx.shadowColor = enemy.glow;
            ctx.shadowBlur = 15;
            ctx.fillStyle = enemy.color;
            ctx.strokeStyle = enemy.color;
            ctx.lineWidth = 2;
            
            this.drawEnemyShape(ctx, enemy);
            
            // 生命条
            if (enemy.health < enemy.maxHealth) {
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#333';
                ctx.fillRect(-30, -enemy.height / 2 - 15, 60, 5);
                ctx.fillStyle = enemy.health > enemy.maxHealth * 0.5 ? '#0f0' : '#f00';
                ctx.fillRect(-30, -enemy.height / 2 - 15, 60 * (enemy.health / enemy.maxHealth), 5);
            }
            
            ctx.restore();
        });
        
        this.game.gameState.enemyBullets.forEach((bullet, index) => {
            bullet.x += bullet.vx * this.game.gameState.slowMotion;
            bullet.y += bullet.vy * this.game.gameState.slowMotion;
            
            ctx.save();
            ctx.fillStyle = bullet.color;
            ctx.shadowColor = bullet.color;
            ctx.shadowBlur = bullet.isSniper ? 15 : 8;
            ctx.beginPath();
            ctx.arc(bullet.x, bullet.y, bullet.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            
            if (bullet.y > this.game.canvas.height + 20) {
                this.game.gameState.enemyBullets.splice(index, 1);
            }
        });
    }
    
    drawEnemyShape(ctx, enemy) {
        const w = enemy.width / 2;
        const h = enemy.height / 2;
        
        ctx.beginPath();
        
        switch (enemy.shape) {
            case 'triangle':
                ctx.moveTo(0, -h);
                ctx.lineTo(-w, h);
                ctx.lineTo(w, h);
                break;
                
            case 'arrow':
                ctx.moveTo(0, -h);
                ctx.lineTo(-w, 0);
                ctx.lineTo(-w * 0.5, 0);
                ctx.lineTo(-w * 0.5, h);
                ctx.lineTo(w * 0.5, h);
                ctx.lineTo(w * 0.5, 0);
                ctx.lineTo(w, 0);
                break;
                
            case 'hexagon':
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i - Math.PI / 2;
                    const x = Math.cos(angle) * w;
                    const y = Math.sin(angle) * h;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                break;
                
            case 'octagon':
                for (let i = 0; i < 8; i++) {
                    const angle = (Math.PI / 4) * i - Math.PI / 2;
                    const x = Math.cos(angle) * w;
                    const y = Math.sin(angle) * h;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                break;
                
            case 'diamond':
                ctx.moveTo(0, -h);
                ctx.lineTo(w, 0);
                ctx.lineTo(0, h);
                ctx.lineTo(-w, 0);
                break;
                
            case 'crab':
                ctx.moveTo(-w * 0.3, -h);
                ctx.lineTo(w * 0.3, -h);
                ctx.lineTo(w, -h * 0.3);
                ctx.lineTo(w, h * 0.5);
                ctx.lineTo(w * 0.5, h);
                ctx.lineTo(-w * 0.5, h);
                ctx.lineTo(-w, h * 0.5);
                ctx.lineTo(-w, -h * 0.3);
                break;
                
            case 'mantis':
                ctx.moveTo(0, -h);
                ctx.lineTo(w * 0.5, -h * 0.3);
                ctx.lineTo(w, -h * 0.5);
                ctx.lineTo(w * 0.7, h * 0.3);
                ctx.lineTo(w * 0.3, h);
                ctx.lineTo(-w * 0.3, h);
                ctx.lineTo(-w * 0.7, h * 0.3);
                ctx.lineTo(-w, -h * 0.5);
                ctx.lineTo(-w * 0.5, -h * 0.3);
                break;
                
            default:
                ctx.arc(0, 0, w, 0, Math.PI * 2);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // 内部装饰
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, w * 0.3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ==================== Boss系统 ====================
class BossSystem {
    constructor(game) {
        this.game = game;
    }

    init() {}

    spawnBoss(level) {
        const width = this.game.canvas.width;
        
        const bossTypes = [
            {
                name: '毁灭者号',
                width: 180, height: 140,
                health: 500, maxHealth: 500,
                color: '#ff0066', glow: '#ff0066',
                speed: 0.8,
                phases: 3,
                skills: ['laserSweep', 'missileRain', 'shieldBurst']
            },
            {
                name: '虚空吞噬者',
                width: 200, height: 160,
                health: 800, maxHealth: 800,
                color: '#6600ff', glow: '#6600ff',
                speed: 0.5,
                phases: 4,
                skills: ['blackHole', 'voidSpikes', 'teleportStrike', 'energyWave']
            },
            {
                name: '星际要塞',
                width: 220, height: 180,
                health: 1200, maxHealth: 1200,
                color: '#ff6600', glow: '#ff6600',
                speed: 0.3,
                phases: 5,
                skills: ['cannonBarrage', 'droneSwarm', 'plasmaBeam', 'armorRepair', 'finalBurst']
            }
        ];
        
        const bossTemplate = bossTypes[(level - 1) % bossTypes.length];
        
        this.game.gameState.boss = {
            ...bossTemplate,
            x: width / 2, y: -200,
            targetY: 150,
            currentPhase: 1,
            phaseTimer: 0,
            skillTimer: 0,
            currentSkill: null,
            invincible: false,
            entering: true,
            angle: 0
        };
        
        this.game.systems.ui.showBossWarning(bossTemplate.name);
        this.game.systems.audio.playSFX('bossAppear');
    }

    update(dt) {
        const boss = this.game.gameState.boss;
        if (!boss) return;
        
        const player = this.game.gameState.player;
        boss.phaseTimer += dt;
        boss.skillTimer += dt;
        
        // 入场动画
        if (boss.entering) {
            boss.y += 2;
            if (boss.y >= boss.targetY) {
                boss.entering = false;
            }
            return;
        }
        
        // 移动模式
        boss.angle += dt * 0.5;
        boss.x = this.game.canvas.width / 2 + Math.sin(boss.angle) * 200;
        
        // 阶段切换
        const healthPercent = boss.health / boss.maxHealth;
        const targetPhase = Math.ceil((1 - healthPercent) * boss.phases) + 1;
        
        if (targetPhase > boss.currentPhase && targetPhase <= boss.phases) {
            boss.currentPhase = targetPhase;
            boss.invincible = true;
            setTimeout(() => boss.invincible = false, 2000);
            this.game.systems.ui.showPhaseChange(boss.currentPhase);
            this.game.systems.audio.playSFX('phaseChange');
        }
        
        // 技能释放
        if (!boss.currentSkill && boss.skillTimer > 3 - boss.currentPhase * 0.3) {
            this.castSkill(boss);
        }
        
        // 普通攻击
        if (Date.now() - (boss.lastShot || 0) > 800 - boss.currentPhase * 100) {
            this.bossAttack(boss);
            boss.lastShot = Date.now();
        }
        
        // 检查Boss死亡
        if (boss.health <= 0) {
            this.destroyBoss(boss);
        }
    }
    
    castSkill(boss) {
        const availableSkills = boss.skills.slice(0, boss.currentPhase);
        const skill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
        
        boss.currentSkill = skill;
        boss.skillTimer = 0;
        
        this.game.systems.ui.showBossSkill(skill);
        
        switch (skill) {
            case 'laserSweep':
                this.laserSweep(boss);
                break;
            case 'missileRain':
                this.missileRain(boss);
                break;
            case 'shieldBurst':
                this.shieldBurst(boss);
                break;
            case 'blackHole':
                this.blackHole(boss);
                break;
            case 'voidSpikes':
                this.voidSpikes(boss);
                break;
            case 'teleportStrike':
                this.teleportStrike(boss);
                break;
            case 'energyWave':
                this.energyWave(boss);
                break;
            case 'cannonBarrage':
                this.cannonBarrage(boss);
                break;
            case 'droneSwarm':
                this.droneSwarm(boss);
                break;
            case 'plasmaBeam':
                this.plasmaBeam(boss);
                break;
            case 'armorRepair':
                this.armorRepair(boss);
                break;
            case 'finalBurst':
                this.finalBurst(boss);
                break;
        }
        
        setTimeout(() => boss.currentSkill = null, 3000);
    }
    
    // Boss技能实现
    laserSweep(boss) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const angle = -Math.PI / 2 + (i - 2) * 0.3;
                for (let j = 0; j < 3; j++) {
                    this.game.gameState.enemyBullets.push({
                        x: boss.x, y: boss.y + boss.height / 2,
                        vx: Math.cos(angle + j * 0.1) * 8, vy: Math.sin(angle + j * 0.1) * 8,
                        damage: 20, color: '#ff0066',
                        width: 12, height: 12, isEnemy: true, isLaser: true
                    });
                }
            }, i * 200);
        }
    }
    
    missileRain(boss) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const x = 100 + Math.random() * (this.game.canvas.width - 200);
                this.game.gameState.enemyBullets.push({
                    x: x, y: -50,
                    vx: 0, vy: 6,
                    damage: 25, color: '#ff6600',
                    width: 15, height: 20, isEnemy: true, isMissile: true,
                    target: this.game.gameState.player
                });
            }, i * 150);
        }
    }
    
    shieldBurst(boss) {
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            this.game.gameState.enemyBullets.push({
                x: boss.x, y: boss.y,
                vx: Math.cos(angle) * 4, vy: Math.sin(angle) * 4,
                damage: 15, color: '#00ffff',
                width: 10, height: 10, isEnemy: true
            });
        }
        boss.invincible = true;
        setTimeout(() => boss.invincible = false, 1500);
    }
    
    blackHole(boss) {
        const blackHole = {
            x: this.game.gameState.player.x,
            y: 200,
            radius: 0,
            maxRadius: 100,
            pullStrength: 3,
            damage: 10
        };
        
        // 创建黑洞视觉效果
        this.game.systems.particle.emitExplosion(blackHole.x, blackHole.y, 'large');
        
        // 吸引玩家
        const pullInterval = setInterval(() => {
            const player = this.game.gameState.player;
            const dx = blackHole.x - player.x;
            const dy = blackHole.y - player.y;
            const dist = Math.hypot(dx, dy);
            
            if (dist < 200) {
                player.vx += (dx / dist) * blackHole.pullStrength;
                player.vy += (dy / dist) * blackHole.pullStrength;
            }
        }, 50);
        
        setTimeout(() => clearInterval(pullInterval), 4000);
    }
    
    voidSpikes(boss) {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const x = (this.game.canvas.width / 7) * (i + 1);
                for (let j = 0; j < 3; j++) {
                    this.game.gameState.enemyBullets.push({
                        x: x, y: boss.y,
                        vx: 0, vy: 8 + j * 2,
                        damage: 20, color: '#6600ff',
                        width: 8, height: 25, isEnemy: true, isSpike: true
                    });
                }
            }, i * 100);
        }
    }
    
    teleportStrike(boss) {
        const oldX = boss.x;
        boss.x = this.game.gameState.player.x;
        boss.invincible = true;
        
        this.game.systems.particle.emitExplosion(oldX, boss.y, 'medium');
        
        setTimeout(() => {
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI * 2 * i) / 8;
                this.game.gameState.enemyBullets.push({
                    x: boss.x, y: boss.y,
                    vx: Math.cos(angle) * 6, vy: Math.sin(angle) * 6,
                    damage: 18, color: '#6600ff',
                    width: 10, height: 10, isEnemy: true
                });
            }
            boss.invincible = false;
        }, 500);
    }
    
    energyWave(boss) {
        for (let wave = 0; wave < 3; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 20; i++) {
                    const angle = (Math.PI * 2 * i) / 20;
                    this.game.gameState.enemyBullets.push({
                        x: boss.x, y: boss.y,
                        vx: Math.cos(angle) * (3 + wave), vy: Math.sin(angle) * (3 + wave),
                        damage: 12, color: '#9900ff',
                        width: 8, height: 8, isEnemy: true
                    });
                }
            }, wave * 800);
        }
    }
    
    cannonBarrage(boss) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const targetX = this.game.gameState.player.x + (Math.random() - 0.5) * 200;
                const angle = Math.atan2(this.game.canvas.height, targetX - boss.x);
                
                this.game.gameState.enemyBullets.push({
                    x: boss.x, y: boss.y,
                    vx: Math.cos(angle) * 10, vy: Math.sin(angle) * 10,
                    damage: 30, color: '#ff6600',
                    width: 20, height: 20, isEnemy: true, isCannon: true
                });
            }, i * 100);
        }
    }
    
    droneSwarm(boss) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const enemy = this.game.systems.enemy.createEnemy('drone');
                enemy.x = boss.x + (i - 2) * 60;
                enemy.y = boss.y + 100;
                enemy.health = 5;
                enemy.pattern = 'dive';
                this.game.gameState.enemies.push(enemy);
            }, i * 200);
        }
    }
    
    plasmaBeam(boss) {
        const player = this.game.gameState.player;
        const angle = Math.atan2(player.y - boss.y, player.x - boss.x);
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.game.gameState.enemyBullets.push({
                    x: boss.x + Math.cos(angle) * i * 15,
                    y: boss.y + Math.sin(angle) * i * 15,
                    vx: Math.cos(angle) * 12, vy: Math.sin(angle) * 12,
                    damage: 25, color: '#ffaa00',
                    width: 15, height: 15, isEnemy: true, isBeam: true
                });
            }, i * 30);
        }
    }
    
    armorRepair(boss) {
        boss.health = Math.min(boss.maxHealth, boss.health + 200);
        this.game.systems.particle.emitExplosion(boss.x, boss.y, 'large');
    }
    
    destroyBoss(boss) {
        // 大爆炸效果
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * boss.width;
                const offsetY = (Math.random() - 0.5) * boss.height;
                this.game.systems.particle.emitExplosion(boss.x + offsetX, boss.y + offsetY, 'large');
            }, i * 100);
        }
        
        this.game.gameState.score += 5000;
        this.game.gameState.bossDefeated++;
        this.game.gameState.boss = null;
        this.game.gameState.player.skillCount = Math.min(
            this.game.gameState.player.maxSkillCount,
            this.game.gameState.player.skillCount + 1
        );
        
        this.game.systems.audio.playSFX('bossDefeated');
        this.game.systems.ui.showBossDefeated();
        
        // 恢复游戏难度
        this.game.gameState.slowMotion = 1;
    }
    
    finalBurst(boss) {
        // 最终爆发 - 全屏攻击
        for (let i = 0; i < 36; i++) {
            const angle = (Math.PI * 2 * i) / 36;
            this.game.gameState.enemyBullets.push({
                x: boss.x, y: boss.y,
                vx: Math.cos(angle) * 5, vy: Math.sin(angle) * 5,
                damage: 30, color: '#ff0000',
                width: 12, height: 12, isEnemy: true
            });
        }
        
        // 召唤大量敌机
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const enemy = this.game.systems.enemy.createEnemy('destroyer');
                enemy.x = 100 + Math.random() * (this.game.canvas.width - 200);
                enemy.y = -50;
                this.game.gameState.enemies.push(enemy);
            }, i * 300);
        }
    }
    
    bossAttack(boss) {
        const player = this.game.gameState.player;
        const angle = Math.atan2(player.y - boss.y, player.x - boss.x);
        
        // 根据阶段增加攻击强度
        const bulletCount = boss.currentPhase;
        const speed = 5 + boss.currentPhase;
        
        for (let i = 0; i < bulletCount; i++) {
            const spread = (i - (bulletCount - 1) / 2) * 0.2;
            this.game.gameState.enemyBullets.push({
                x: boss.x, y: boss.y + boss.height / 2,
                vx: Math.cos(angle + spread) * speed,
                vy: Math.sin(angle + spread) * speed,
                damage: 15 + boss.currentPhase * 5,
                color: boss.color,
                width: 8 + boss.currentPhase * 2,
                height: 8 + boss.currentPhase * 2,
                isEnemy: true
            });
        }
    }
    
    render(ctx) {
        const boss = this.game.gameState.boss;
        if (!boss) return;
        
        ctx.save();
        ctx.translate(boss.x, boss.y);
        
        // 无敌状态闪烁
        if (boss.invincible && Math.floor(Date.now() / 100) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }
        
        // Boss阴影效果
        ctx.shadowColor = boss.glow;
        ctx.shadowBlur = 30;
        
        // 绘制Boss主体
        ctx.fillStyle = boss.color;
        ctx.strokeStyle = boss.color;
        ctx.lineWidth = 3;
        
        const w = boss.width / 2;
        const h = boss.height / 2;
        
        ctx.beginPath();
        
        // 根据Boss名称绘制不同形状
        if (boss.name === '毁灭者号') {
            // 毁灭者号 - 尖锐的攻击型
            ctx.moveTo(0, -h);
            ctx.lineTo(w * 0.8, -h * 0.3);
            ctx.lineTo(w, 0);
            ctx.lineTo(w * 0.6, h * 0.5);
            ctx.lineTo(w * 0.3, h);
            ctx.lineTo(-w * 0.3, h);
            ctx.lineTo(-w * 0.6, h * 0.5);
            ctx.lineTo(-w, 0);
            ctx.lineTo(-w * 0.8, -h * 0.3);
        } else if (boss.name === '虚空吞噬者') {
            // 虚空吞噬者 - 神秘的圆形
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI / 4) * i - Math.PI / 2;
                const r = i % 2 === 0 ? w : w * 0.7;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * h;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
        } else {
            // 星际要塞 - 厚重的装甲型
            ctx.moveTo(-w * 0.8, -h);
            ctx.lineTo(w * 0.8, -h);
            ctx.lineTo(w, -h * 0.5);
            ctx.lineTo(w, h * 0.5);
            ctx.lineTo(w * 0.8, h);
            ctx.lineTo(-w * 0.8, h);
            ctx.lineTo(-w, h * 0.5);
            ctx.lineTo(-w, -h * 0.5);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // 绘制内部核心
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(0, 0, w * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // 核心发光
        ctx.fillStyle = boss.glow;
        ctx.beginPath();
        ctx.arc(0, 0, w * 0.15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
        
        // 绘制Boss血条
        this.renderBossHealthBar(ctx, boss);
        
        // 绘制技能名称
        if (boss.currentSkill) {
            ctx.save();
            ctx.fillStyle = boss.glow;
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.shadowColor = boss.glow;
            ctx.shadowBlur = 10;
            ctx.fillText(`⚠ ${this.getSkillName(boss.currentSkill)}`, boss.x, boss.y - h - 30);
            ctx.restore();
        }
    }
    
    renderBossHealthBar(ctx, boss) {
        const barWidth = 300;
        const barHeight = 20;
        const x = (this.game.canvas.width - barWidth) / 2;
        const y = 50;
        
        // 背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // 血条
        const healthPercent = boss.health / boss.maxHealth;
        const gradient = ctx.createLinearGradient(x, y, x + barWidth, y);
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(0.5, '#ff6600');
        gradient.addColorStop(1, '#ffcc00');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth * healthPercent, barHeight);
        
        // 边框
        ctx.strokeStyle = boss.glow;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);
        
        // 阶段标记
        for (let i = 1; i < boss.phases; i++) {
            const phaseX = x + barWidth * (i / boss.phases);
            ctx.strokeStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(phaseX, y);
            ctx.lineTo(phaseX, y + barHeight);
            ctx.stroke();
        }
        
        // Boss名称
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${boss.name} - 阶段 ${boss.currentPhase}/${boss.phases}`, this.game.canvas.width / 2, y - 10);
        
        // 血量数字
        ctx.font = '12px Arial';
        ctx.fillText(`${Math.floor(boss.health)}/${boss.maxHealth}`, this.game.canvas.width / 2, y + barHeight + 15);
    }
    
    getSkillName(skill) {
        const names = {
            laserSweep: '激光扫射',
            missileRain: '导弹雨',
            shieldBurst: '护盾爆发',
            blackHole: '黑洞引力',
            voidSpikes: '虚空尖刺',
            teleportStrike: '瞬移打击',
            energyWave: '能量波',
            cannonBarrage: '火炮齐射',
            droneSwarm: '无人机群',
            plasmaBeam: '等离子光束',
            armorRepair: '装甲修复',
            finalBurst: '最终爆发'
        };
        return names[skill] || skill;
    }
}

// ==================== 粒子系统 ====================
class ParticleSystem {
    constructor(game) {
        this.game = game;
        this.particles = [];
    }

    init() {}

    emitExplosion(x, y, size = 'medium') {
        const counts = { small: 8, medium: 15, large: 30 };
        const count = counts[size] || 15;
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
            const speed = 2 + Math.random() * 4;
            const colors = ['#ff6600', '#ffaa00', '#ff0000', '#ffff00'];
            
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.02 + Math.random() * 0.02,
                size: 3 + Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        
        this.game.gameState.screenShake = size === 'large' ? 15 : (size === 'medium' ? 8 : 3);
    }

    emitTrail(x, y) {
        this.particles.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 5,
            vx: 0,
            vy: 2 + Math.random() * 2,
            life: 0.5,
            decay: 0.03,
            size: 2 + Math.random() * 3,
            color: `rgba(255, ${100 + Math.random() * 100}, 0, 0.8)`
        });
    }

    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * this.game.gameState.slowMotion;
            p.y += p.vy * this.game.gameState.slowMotion;
            p.life -= p.decay * this.game.gameState.slowMotion;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    render(ctx) {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
}

// ==================== 碰撞系统 ====================
class CollisionSystem {
    constructor(game) {
        this.game = game;
    }

    init() {}

    update(dt) {
        this.checkBulletEnemyCollisions();
        this.checkBulletPlayerCollisions();
        this.checkPlayerEnemyCollisions();
        this.checkPlayerPowerUpCollisions();
    }

    checkBulletEnemyCollisions() {
        const bullets = this.game.gameState.bullets;
        const enemies = this.game.gameState.enemies;
        
        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];
            if (bullet.isEnemy) continue;
            
            for (let j = enemies.length - 1; j >= 0; j--) {
                const enemy = enemies[j];
                if (this.isColliding(bullet, enemy)) {
                    enemy.health -= bullet.damage;
                    this.game.gameState.damageDealt += bullet.damage;
                    
                    bullets.splice(i, 1);
                    
                    if (enemy.health <= 0) {
                        this.game.systems.enemy.destroyEnemy(enemy);
                    }
                    break;
                }
            }
        }
        
        // 检查Boss碰撞
        const boss = this.game.gameState.boss;
        if (boss && !boss.invincible) {
            for (let i = bullets.length - 1; i >= 0; i--) {
                const bullet = bullets[i];
                if (bullet.isEnemy) continue;
                
                if (this.isColliding(bullet, boss)) {
                    boss.health -= bullet.damage;
                    this.game.gameState.damageDealt += bullet.damage;
                    bullets.splice(i, 1);
                    
                    this.game.systems.particle.emitExplosion(bullet.x, bullet.y, 'small');
                }
            }
        }
    }

    checkBulletPlayerCollisions() {
        const bullets = this.game.gameState.enemyBullets;
        const player = this.game.gameState.player;
        
        // 调试：每60帧输出一次子弹数量
        if (this.game.gameState.frameCount % 60 === 0 && bullets.length > 0) {
            console.log(`当前敌机子弹数量: ${bullets.length}`);
        }
        
        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];
            
            // 调试：检查每颗子弹与玩家的距离
            const dx = Math.abs(bullet.x - player.x);
            const dy = Math.abs(bullet.y - player.y);
            const thresholdX = (bullet.width + player.width) / 2 + 5;
            const thresholdY = (bullet.height + player.height) / 2 + 5;
            
            if (dx < thresholdX && dy < thresholdY) {
                console.log(`子弹碰撞! 子弹位置: (${bullet.x.toFixed(1)}, ${bullet.y.toFixed(1)}), 玩家位置: (${player.x.toFixed(1)}, ${player.y.toFixed(1)}), 距离: (${dx.toFixed(1)}, ${dy.toFixed(1)}), 伤害: ${bullet.damage}`);
                this.game.systems.player.takeDamage(bullet.damage);
                bullets.splice(i, 1);
            }
        }
    }

    checkPlayerEnemyCollisions() {
        const enemies = this.game.gameState.enemies;
        const player = this.game.gameState.player;
        
        enemies.forEach(enemy => {
            if (this.isColliding(enemy, player)) {
                console.log(`与敌机碰撞! 敌机位置: (${enemy.x.toFixed(1)}, ${enemy.y.toFixed(1)}), 玩家位置: (${player.x.toFixed(1)}, ${player.y.toFixed(1)})`);
                this.game.systems.player.takeDamage(20);
                enemy.health -= 50;
                if (enemy.health <= 0) {
                    this.game.systems.enemy.destroyEnemy(enemy, true); // true 表示来自碰撞
                }
            }
        });
        
        const boss = this.game.gameState.boss;
        if (boss && !boss.invincible && this.isColliding(boss, player)) {
            this.game.systems.player.takeDamage(50);
        }
    }

    checkPlayerPowerUpCollisions() {
        const powerUps = this.game.gameState.powerUps;
        const player = this.game.gameState.player;
        
        for (let i = powerUps.length - 1; i >= 0; i--) {
            const powerUp = powerUps[i];
            
            if (this.isColliding(powerUp, player)) {
                this.applyPowerUp(powerUp);
                powerUps.splice(i, 1);
            }
        }
    }

    isColliding(a, b) {
        const aWidth = a.width || 20;
        const aHeight = a.height || 20;
        const bWidth = b.width || 20;
        const bHeight = b.height || 20;
        
        // 使用矩形碰撞检测 - 稍微放宽检测范围
        const collisionThresholdX = (aWidth + bWidth) / 2 + 5; // 增加5像素容错
        const collisionThresholdY = (aHeight + bHeight) / 2 + 5;
        
        const dx = Math.abs(a.x - b.x);
        const dy = Math.abs(a.y - b.y);
        
        return dx < collisionThresholdX && dy < collisionThresholdY;
    }

    applyPowerUp(powerUp) {
        const player = this.game.gameState.player;
        
        switch (powerUp.type) {
            case 'health':
                player.health = Math.min(player.maxHealth, player.health + 30);
                break;
            case 'shield':
                player.shield = player.maxShield;
                break;
            case 'skill':
                player.skillCount = Math.min(player.maxSkillCount, player.skillCount + 1);
                break;
        }
        
        this.game.systems.audio.playSFX('powerup');
    }
}

// ==================== 问题系统 ====================
class QuestionSystem {
    constructor(game) {
        this.game = game;
        this.questionPool = [];
    }

    init() {
        this.generateQuestionPool();
    }

    generateQuestionPool() {
        // 一元二次方程题目池 - 答案随机分布
        const rawQuestions = [
            { q: 'x² - 5x + 6 = 0, x = ?', correct: '2或3', wrong: ['1或6', '-2或-3', '-1或-6'] },
            { q: 'x² + 4x + 4 = 0, x = ?', correct: '-2', wrong: ['2', '4', '-4'] },
            { q: 'x² - 9 = 0, x = ?', correct: '3或-3', wrong: ['9', '3', '-9'] },
            { q: 'x² - 7x + 12 = 0, x = ?', correct: '3或4', wrong: ['2或6', '1或12', '-3或-4'] },
            { q: 'x² + 5x + 6 = 0, x = ?', correct: '-2或-3', wrong: ['2或3', '1或6', '-1或-6'] },
            { q: 'x² - 4x - 5 = 0, x = ?', correct: '5或-1', wrong: ['-5或1', '4或-1', '-4或1'] },
            { q: 'x² + 6x + 9 = 0, x = ?', correct: '-3', wrong: ['3', '6', '-6'] },
            { q: 'x² - 8x + 16 = 0, x = ?', correct: '4', wrong: ['-4', '8', '-8'] },
            { q: 'x² + 3x - 10 = 0, x = ?', correct: '2或-5', wrong: ['-2或5', '1或-10', '-1或10'] },
            { q: 'x² - 6x + 8 = 0, x = ?', correct: '2或4', wrong: ['-2或-4', '1或8', '-1或-8'] },
            { q: 'x² + 2x - 8 = 0, x = ?', correct: '2或-4', wrong: ['-2或4', '1或-8', '-1或8'] },
            { q: 'x² - 10x + 25 = 0, x = ?', correct: '5', wrong: ['-5', '10', '-10'] },
            { q: 'x² + 8x + 15 = 0, x = ?', correct: '-3或-5', wrong: ['3或5', '-1或-15', '1或15'] },
            { q: 'x² - 3x - 4 = 0, x = ?', correct: '4或-1', wrong: ['-4或1', '2或-2', '1或-4'] },
            { q: 'x² + x - 6 = 0, x = ?', correct: '2或-3', wrong: ['-2或3', '1或-6', '-1或6'] },
            { q: 'x² - 2x - 15 = 0, x = ?', correct: '5或-3', wrong: ['-5或3', '3或-5', '15或-1'] },
            { q: 'x² + 2x + 1 = 0, x = ?', correct: '-1', wrong: ['1', '2', '-2'] },
            { q: 'x² - 12x + 36 = 0, x = ?', correct: '6', wrong: ['-6', '12', '-12'] },
            { q: 'x² + 7x + 12 = 0, x = ?', correct: '-3或-4', wrong: ['3或4', '3或-4', '-3或4'] },
            { q: 'x² - 5x - 14 = 0, x = ?', correct: '7或-2', wrong: ['-7或2', '2或-7', '14或-1'] }
        ];
        
        // 随机打乱选项位置
        this.questionPool = rawQuestions.map(q => {
            const allOptions = [q.correct, ...q.wrong];
            // Fisher-Yates 洗牌算法
            for (let i = allOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
            }
            // 找到正确答案的新位置
            const correctIndex = allOptions.indexOf(q.correct);
            return { q: q.q, options: allOptions, answer: correctIndex };
        });
    }

    update(dt) {
        if (!this.game.gameState.questionActive) {
            this.game.gameState.questionTimer += dt;
            if (this.game.gameState.questionTimer > 15) {
                this.spawnQuestion();
            }
        }
    }

    spawnQuestion() {
        const question = this.questionPool[Math.floor(Math.random() * this.questionPool.length)];
        this.game.gameState.currentQuestion = { ...question };
        this.game.gameState.questionActive = true;
        this.game.gameState.questionTimer = 0;
        this.game.systems.ui.showQuestion(question);
        this.game.systems.audio.playSFX('question');
    }

    answerQuestion(answerIndex) {
        const question = this.game.gameState.currentQuestion;
        if (answerIndex === question.answer) {
            this.game.systems.audio.playSFX('correct');
            this.game.systems.ui.showCorrectFeedback();
            this.upgradeEquipment();
            this.game.gameState.score += 100;
        } else {
            this.game.systems.audio.playSFX('wrong');
            this.game.systems.ui.showWrongFeedback();
        }
        this.game.gameState.questionActive = false;
        this.game.gameState.currentQuestion = null;
        this.game.gameState.questionTimer = 0;
        this.game.systems.ui.hideQuestion();
    }

    upgradeEquipment() {
        const weapons = this.game.gameState.weapons;
        const unlockedWeapons = Object.keys(weapons).filter(w => weapons[w].unlocked);
        const lockedWeapons = Object.keys(weapons).filter(w => !weapons[w].unlocked);
        
        if (lockedWeapons.length > 0 && Math.random() < 0.5) {
            const newWeapon = lockedWeapons[Math.floor(Math.random() * lockedWeapons.length)];
            weapons[newWeapon].unlocked = true;
            weapons[newWeapon].active = true;
            weapons[newWeapon].level = 1;
            this.game.systems.ui.showWeaponUnlocked(newWeapon);
        } else {
            const weaponToUpgrade = unlockedWeapons[Math.floor(Math.random() * unlockedWeapons.length)];
            if (weaponToUpgrade && weapons[weaponToUpgrade].level < 3) {
                weapons[weaponToUpgrade].level++;
                this.game.systems.ui.showWeaponUpgraded(weaponToUpgrade);
            }
        }
        
        if (this.game.gameState.maxWingmen < 4 && Math.random() < 0.3) {
            this.game.gameState.maxWingmen++;
            this.game.systems.wingman.addWingman();
        }
        
        this.game.gameState.player.skillCount = Math.min(
            this.game.gameState.player.maxSkillCount,
            this.game.gameState.player.skillCount + 1
        );
    }
}

// ==================== UI系统 ====================
class UISystem {
    constructor(game) {
        this.game = game;
    }

    init() {}
    update(dt) {}

    render(ctx) {
        const state = this.game.gameState;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`分数: ${Math.floor(state.score)}`, 20, 40);
        
        if (state.combo > 1) {
            ctx.fillStyle = '#ffaa00';
            ctx.font = 'bold 24px Arial';
            ctx.fillText(`${state.combo} 连击!`, 20, 70);
        }
        
        this.renderPlayerStatus(ctx);
        this.renderSkillCount(ctx);
        this.renderWeaponStatus(ctx);
    }

    renderPlayerStatus(ctx) {
        const player = this.game.gameState.player;
        const canvasHeight = this.game.uiCanvas.height;
        const x = 20;
        const y = canvasHeight - 100;
        
        // 绘制血量条背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y, 150, 15);
        
        // 绘制血量
        const healthPercent = Math.max(0, player.health / player.maxHealth);
        ctx.fillStyle = healthPercent > 0.5 ? '#00ff00' : '#ff0000';
        ctx.fillRect(x, y, 150 * healthPercent, 15);
        
        // 血量条边框
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 150, 15);
        
        // 绘制护盾条背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y + 20, 150, 10);
        
        // 绘制护盾
        const shieldPercent = Math.max(0, player.shield / player.maxShield);
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(x, y + 20, 150 * shieldPercent, 10);
        
        // 护盾条边框
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y + 20, 150, 10);
        
        // 绘制等级文字
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`等级 ${player.level}`, x, y - 10);
        
        // 绘制血量数字
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.fillText(`${Math.floor(player.health)}/${player.maxHealth}`, x + 155, y + 12);
    }

    renderSkillCount(ctx) {
        const player = this.game.gameState.player;
        const canvasWidth = this.game.uiCanvas.width;
        const canvasHeight = this.game.uiCanvas.height;
        const x = canvasWidth - 150;
        const y = canvasHeight - 60;
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('空格技能:', x, y);
        
        for (let i = 0; i < player.maxSkillCount; i++) {
            const filled = i < player.skillCount;
            ctx.fillStyle = filled ? '#ff6600' : '#333333';
            ctx.beginPath();
            ctx.arc(x + 20 + i * 25, y + 20, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    renderWeaponStatus(ctx) {
        const weapons = this.game.gameState.weapons;
        const weaponNames = { normal: '普通', laser: '激光', spread: '散射', missile: '导弹', rapid: '速射' };
        const canvasWidth = this.game.uiCanvas.width;
        const canvasHeight = this.game.uiCanvas.height;
        let x = canvasWidth / 2 - 200;
        const y = canvasHeight - 40;
        
        Object.keys(weapons).forEach((type, index) => {
            const weapon = weapons[type];
            if (weapon.unlocked) {
                ctx.fillStyle = weapon.active ? '#0f0' : '#666';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`${weaponNames[type]} Lv.${weapon.level}`, x + index * 80, y);
            }
        });
    }

    showQuestion(question) {
        const sidebar = document.getElementById('questionSidebar');
        const questionEl = document.getElementById('sidebarQuestion');
        const optionsEl = document.getElementById('sidebarOptions');
        if (!sidebar || !questionEl || !optionsEl) return;
        
        questionEl.textContent = question.q;
        optionsEl.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'w-full p-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm transition-colors';
            btn.textContent = option;
            btn.onclick = () => this.game.systems.question.answerQuestion(index);
            optionsEl.appendChild(btn);
        });
        
        sidebar.classList.remove('translate-x-full', 'opacity-0');
    }

    hideQuestion() {
        const sidebar = document.getElementById('questionSidebar');
        if (sidebar) sidebar.classList.add('translate-x-full', 'opacity-0');
    }

    showCorrectFeedback() { this.showFloatingText('回答正确! +装备升级', '#0f0'); }
    showWrongFeedback() { this.showFloatingText('回答错误!', '#f00'); }
    showWeaponUnlocked(weapon) {
        const names = { normal: '普通', laser: '激光', spread: '散射', missile: '导弹', rapid: '速射' };
        this.showFloatingText(`解锁武器: ${names[weapon]}!`, '#ff0');
    }
    showWeaponUpgraded(weapon) {
        const names = { normal: '普通', laser: '激光', spread: '散射', missile: '导弹', rapid: '速射' };
        this.showFloatingText(`${names[weapon]} 升级!`, '#0ff');
    }
    showLevelUp() { this.showFloatingText('等级提升!', '#f0f'); }
    showBossWarning(bossName) { this.showFloatingText(`⚠ BOSS出现: ${bossName}`, '#f00', 60); }
    showPhaseChange(phase) { this.showFloatingText(`BOSS进入阶段 ${phase}!`, '#ff0', 50); }
    showBossSkill(skill) {
        const names = { laserSweep: '激光扫射', missileRain: '导弹雨', shieldBurst: '护盾爆发', blackHole: '黑洞引力', voidSpikes: '虚空尖刺', teleportStrike: '瞬移打击', energyWave: '能量波', cannonBarrage: '火炮齐射', droneSwarm: '无人机群', plasmaBeam: '等离子光束', armorRepair: '装甲修复', finalBurst: '最终爆发' };
        this.showFloatingText(`BOSS技能: ${names[skill]}`, '#f60', 40);
    }
    showBossDefeated() { this.showFloatingText('BOSS被击败! +5000分', '#0f0', 60); }

    showFloatingText(text, color, size = 30) {
        const div = document.createElement('div');
        div.textContent = text;
        div.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); color: ${color}; font-size: ${size}px; font-weight: bold; text-shadow: 0 0 10px ${color}; pointer-events: none; z-index: 9999; animation: floatUp 2s ease-out forwards;`;
        
        if (!document.getElementById('floatAnimation')) {
            const style = document.createElement('style');
            style.id = 'floatAnimation';
            style.textContent = '@keyframes floatUp { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -150%) scale(1.5); } }';
            document.head.appendChild(style);
        }
        
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 2000);
    }

    showPauseMenu(paused) {}
}

// ==================== 音频系统 ====================
class AudioSystem {
    constructor(game) {
        this.game = game;
        this.sounds = {};
        this.bgm = null;
        this.enabled = true;
    }

    init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playSFX(name) {
        if (!this.enabled || !this.audioContext) return;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        const now = this.audioContext.currentTime;
        
        switch (name) {
            case 'shoot':
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(); osc.stop(now + 0.1);
                break;
            case 'explosion':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.start(); osc.stop(now + 0.3);
                break;
            case 'hit':
                osc.type = 'square';
                osc.frequency.setValueAtTime(300, now);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(); osc.stop(now + 0.1);
                break;
            case 'bomb':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.exponentialRampToValueAtTime(20, now + 0.5);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(); osc.stop(now + 0.5);
                break;
            case 'correct':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523, now);
                osc.frequency.setValueAtTime(659, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(); osc.stop(now + 0.3);
                break;
            case 'wrong':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.linearRampToValueAtTime(150, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.2);
                osc.start(); osc.stop(now + 0.2);
                break;
            case 'powerup':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.2);
                osc.start(); osc.stop(now + 0.2);
                break;
            case 'bossAppear':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + 1);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0, now + 1);
                osc.start(); osc.stop(now + 1);
                break;
            case 'phaseChange':
                osc.type = 'square';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(200, now + 0.5);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.5);
                osc.start(); osc.stop(now + 0.5);
                break;
            case 'bossDefeated':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(554, now + 0.1);
                osc.frequency.setValueAtTime(659, now + 0.2);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.6);
                osc.start(); osc.stop(now + 0.6);
                break;
            case 'question':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.1);
                osc.start(); osc.stop(now + 0.1);
                break;
        }
    }

    playBGM(url) {
        if (this.bgm) { this.bgm.pause(); this.bgm = null; }
        this.bgm = new Audio(url);
        this.bgm.loop = true;
        this.bgm.volume = 0.5;
        this.bgm.play().catch(e => console.log('BGM play failed:', e));
    }

    stopBGM() {
        if (this.bgm) { this.bgm.pause(); this.bgm = null; }
    }
}

// 导出游戏类
window.AdvancedSpaceGame = AdvancedSpaceGame;