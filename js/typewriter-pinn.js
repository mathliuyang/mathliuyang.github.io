// ==========================================
// PINN Typewriter Animation Engine
// Physics-Informed Neural Networks Derivation & Code
// ==========================================

(function() {
    'use strict';

    // ==========================================
    // 数据定义 - 丰富的数学推导和代码内容
    // ==========================================
    
    const mathContent = {
        lines: [
            [{ t: '## 1. 稳态中子输运方程 (Steady-State NTE)', c: 'text-[#00FF88] font-bold' }],
            [{ t: '', c: '' }],
            [{ t: '在核反应堆物理中，角通量 ψ 满足线性玻尔兹曼方程：', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: 'Ω·∇ψ(r,Ω) + Σₜ(r)·ψ = q(r,Ω)', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '其中：', c: 'text-gray-500' }],
            [{ t: '  • ψ(r,Ω) : 角中子通量 [n/(cm²·s·sr)]', c: 'text-gray-400' }],
            [{ t: '  • Ω : 中子飞行方向单位矢量', c: 'text-gray-400' }],
            [{ t: '  • Σₜ : 宏观总截面 [cm⁻¹]', c: 'text-gray-400' }],
            [{ t: '  • q : 中子源项', c: 'text-gray-400' }],
            [{ t: '', c: '' }],
            [{ t: '## 2. 边界条件与约束', c: 'text-[#00FF88] font-bold' }],
            [{ t: '', c: '' }],
            [{ t: '真空边界条件:', c: 'text-gray-500' }],
            [{ t: 'ψ(rᵦ, Ω) = 0,  ∀rᵦ ∈ ∂D, n·Ω < 0', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '反射边界条件:', c: 'text-gray-500' }],
            [{ t: 'ψ(rᵦ, Ω) = ψ(rᵦ, Ω′),  Ω′ = Ω - 2(n·Ω)n', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '## 3. Physics-Informed Neural Network', c: 'text-[#00FF88] font-bold' }],
            [{ t: '', c: '' }],
            [{ t: '使用深度神经网络参数化角通量:', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: 'ψ̂(r, Ω; θ) := NN(r ⊕ Ω; θ)', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '网络结构: 输入(5) → [64×tanh]×4 → 输出(1)', c: 'text-gray-400' }],
            [{ t: '', c: '' }],
            [{ t: '## 4. 自动微分计算空间导数', c: 'text-[#00FF88] font-bold' }],
            [{ t: '', c: '' }],
            [{ t: '利用 PyTorch 的自动微分机制:', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: '∇ψ̂ = [∂ψ̂/∂x, ∂ψ̂/∂y, ∂ψ̂/∂z]ᵀ', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '通过 torch.autograd.grad 自动计算:', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: 'grad_psi = torch.autograd.grad(psi, x,', c: 'text-white' }],
            [{ t: '    grad_outputs=torch.ones_like(psi),', c: 'text-white' }],
            [{ t: '    create_graph=True)[0]', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '## 5. 物理约束残差算子', c: 'text-[#00FF88] font-bold' }],
            [{ t: '', c: '' }],
            [{ t: '定义 PDE 残差:', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: 'R_θ = Ω·∇ψ̂ + Σₜ·ψ̂ - q', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '展开为分量形式:', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: 'R_θ = μ·∂ψ̂/∂x + η·∂ψ̂/∂y + ξ·∂ψ̂/∂z', c: 'text-white' }],
            [{ t: '      + Σₜ·ψ̂ - q', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '其中 Ω = (μ, η, ξ) 为方向余弦', c: 'text-gray-400' }],
            [{ t: '', c: '' }],
            [{ t: '## 6. 加权损失函数构建', c: 'text-[#00FF88] font-bold' }],
            [{ t: '', c: '' }],
            [{ t: '总损失 = PDE残差损失 + 边界条件损失', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: 'L(θ) = w_f·L_f + w_b·L_b', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: 'L_f = (1/N_f) Σ|R_θ(r_f, Ω_f)|²', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: 'L_b = (1/N_b) Σ|ψ̂(r_b, Ω_b) - ψ_b|²', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '## 7. 优化求解', c: 'text-[#00FF88] font-bold' }],
            [{ t: '', c: '' }],
            [{ t: '使用 Adam 优化器:', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: 'θ* = argmin L(θ)', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: 'optimizer = torch.optim.Adam(model.parameters(),', c: 'text-white' }],
            [{ t: '                       lr=1e-3)', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '训练过程:', c: 'text-gray-500' }],
            [{ t: 'for epoch in range(n_epochs):', c: 'text-white' }],
            [{ t: '    loss = compute_total_loss()', c: 'text-white' }],
            [{ t: '    loss.backward()', c: 'text-white' }],
            [{ t: '    optimizer.step()', c: 'text-white' }],
            [{ t: '    optimizer.zero_grad()', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '## 8. 数值结果验证', c: 'text-[#00FF88] font-bold' }],
            [{ t: '', c: '' }],
            [{ t: '相对 L2 误差:', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: 'Error = ||ψ̂ - ψ_exact||₂ / ||ψ_exact||₂', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '典型结果: Error < 1% (10000 epochs)', c: 'text-gray-400' }]
        ]
    };

    const codeContent = {
        lines: [
            [{ t: 'import ', c: 'text-purple-400' }, { t: 'torch', c: 'text-cyan-400' }],
            [{ t: 'import ', c: 'text-purple-400' }, { t: 'torch.nn ', c: 'text-cyan-400' }, { t: 'as ', c: 'text-purple-400' }, { t: 'nn', c: 'text-cyan-400' }],
            [{ t: 'import ', c: 'text-purple-400' }, { t: 'numpy ', c: 'text-cyan-400' }, { t: 'as ', c: 'text-purple-400' }, { t: 'np', c: 'text-cyan-400' }],
            [{ t: '', c: '' }],
            [{ t: 'class ', c: 'text-purple-400' }, { t: 'TransportPINN', c: 'text-yellow-300' }, { t: '(nn.Module):', c: 'text-white' }],
            [{ t: '    """', c: 'text-gray-500' }],
            [{ t: '    Physics-Informed Neural Network for', c: 'text-gray-500' }],
            [{ t: '    Steady-State Neutron Transport Equation', c: 'text-gray-500' }],
            [{ t: '    """', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: '    def ', c: 'text-purple-400' }, { t: '__init__', c: 'text-blue-300' }, { t: '(self, layers, sigma_t):', c: 'text-white' }],
            [{ t: '        super().__init__()', c: 'text-gray-300' }],
            [{ t: '        self.sigma_t = sigma_t', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Build neural network', c: 'text-gray-500' }],
            [{ t: '        self.network = self._build_network(layers)', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '    def ', c: 'text-purple-400' }, { t: '_build_network', c: 'text-blue-300' }, { t: '(self, layers):', c: 'text-white' }],
            [{ t: '        """Construct MLP with tanh activation"""', c: 'text-gray-500' }],
            [{ t: '        modules = []', c: 'text-gray-300' }],
            [{ t: '        for i in range(len(layers)-1):', c: 'text-gray-300' }],
            [{ t: '            modules.append(nn.Linear(layers[i],', c: 'text-gray-300' }],
            [{ t: '                                      layers[i+1]))', c: 'text-gray-300' }],
            [{ t: '            if i < len(layers)-2:', c: 'text-gray-300' }],
            [{ t: '                modules.append(nn.Tanh())', c: 'text-gray-300' }],
            [{ t: '        return nn.Sequential(*modules)', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '    def ', c: 'text-purple-400' }, { t: 'forward', c: 'text-blue-300' }, { t: '(self, x):', c: 'text-white' }],
            [{ t: '        """Forward pass"""', c: 'text-gray-500' }],
            [{ t: '        return self.network(x)', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '    def ', c: 'text-purple-400' }, { t: 'compute_derivatives', c: 'text-blue-300' }, { t: '(self, x, y, z):', c: 'text-white' }],
            [{ t: '        """Compute spatial derivatives via autograd"""', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: '        # Enable gradient tracking', c: 'text-gray-500' }],
            [{ t: '        x.requires_grad_(True)', c: 'text-gray-300' }],
            [{ t: '        y.requires_grad_(True)', c: 'text-gray-300' }],
            [{ t: '        z.requires_grad_(True)', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Concatenate inputs: [x, y, z, mu, eta, xi]', c: 'text-gray-500' }],
            [{ t: '        coords = torch.stack([x, y, z], dim=-1)', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Forward pass to get psi', c: 'text-gray-500' }],
            [{ t: '        psi = self.forward(coords)', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Compute gradients using autograd', c: 'text-gray-500' }],
            [{ t: '        psi_x = torch.autograd.grad(psi, x,', c: 'text-gray-300' }],
            [{ t: '            grad_outputs=torch.ones_like(psi),', c: 'text-gray-300' }],
            [{ t: '            create_graph=True)[0]', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '        psi_y = torch.autograd.grad(psi, y,', c: 'text-gray-300' }],
            [{ t: '            grad_outputs=torch.ones_like(psi),', c: 'text-gray-300' }],
            [{ t: '            create_graph=True)[0]', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '        psi_z = torch.autograd.grad(psi, z,', c: 'text-gray-300' }],
            [{ t: '            grad_outputs=torch.ones_like(psi),', c: 'text-gray-300' }],
            [{ t: '            create_graph=True)[0]', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '        return ', c: 'text-purple-400' }, { t: 'psi, psi_x, psi_y, psi_z', c: 'text-cyan-400' }],
            [{ t: '', c: '' }],
            [{ t: '    def ', c: 'text-purple-400' }, { t: 'pde_residual', c: 'text-blue-300' }, { t: '(self, x, y, z, mu, eta, xi, q):', c: 'text-white' }],
            [{ t: '        """Compute PDE residual: R = Ω·∇ψ + Σₜψ - q"""', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: '        # Get psi and its derivatives', c: 'text-gray-500' }],
            [{ t: '        psi, psi_x, psi_y, psi_z = self.compute_derivatives(x, y, z)', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Streaming term: Ω·∇ψ', c: 'text-gray-500' }],
            [{ t: '        streaming = mu * psi_x + eta * psi_y + xi * psi_z', c: 'text-orange-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Collision term: Σₜψ', c: 'text-gray-500' }],
            [{ t: '        collision = self.sigma_t * psi', c: 'text-pink-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Total residual', c: 'text-gray-500' }],
            [{ t: '        residual = streaming + collision - q', c: 'text-red-300' }],
            [{ t: '', c: '' }],
            [{ t: '        return ', c: 'text-purple-400' }, { t: 'residual', c: 'text-cyan-400' }],
            [{ t: '', c: '' }],
            [{ t: '    def ', c: 'text-purple-400' }, { t: 'boundary_loss', c: 'text-blue-300' }, { t: '(self, x_b, y_b, z_b, mu_b, eta_b, xi_b):', c: 'text-white' }],
            [{ t: '        """Vacuum boundary condition: ψ = 0 for incoming directions"""', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: '        coords = torch.stack([x_b, y_b, z_b], dim=-1)', c: 'text-gray-300' }],
            [{ t: '        psi_b = self.forward(coords)', c: 'text-gray-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Vacuum boundary: ψ = 0', c: 'text-gray-500' }],
            [{ t: '        bc_loss = torch.mean(psi_b**2)', c: 'text-yellow-200' }],
            [{ t: '', c: '' }],
            [{ t: '        return ', c: 'text-purple-400' }, { t: 'bc_loss', c: 'text-cyan-400' }],
            [{ t: '', c: '' }],
            [{ t: 'def ', c: 'text-purple-400' }, { t: 'train_pinn', c: 'text-yellow-300' }, { t: '(model, optimizer, n_epochs=10000):', c: 'text-white' }],
            [{ t: '    """Training loop for PINN"""', c: 'text-gray-500' }],
            [{ t: '', c: '' }],
            [{ t: '    for ', c: 'text-purple-400' }, { t: 'epoch', c: 'text-orange-300' }, { t: ' in range(n_epochs):', c: 'text-white' }],
            [{ t: '        # Sample collocation points', c: 'text-gray-500' }],
            [{ t: '        x_f = torch.rand(1000, 1, requires_grad=True)', c: 'text-cyan-300' }],
            [{ t: '        y_f = torch.rand(1000, 1, requires_grad=True)', c: 'text-cyan-300' }],
            [{ t: '        z_f = torch.rand(1000, 1, requires_grad=True)', c: 'text-cyan-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Random direction samples', c: 'text-gray-500' }],
            [{ t: '        omega = torch.randn(1000, 3)', c: 'text-cyan-300' }],
            [{ t: '        omega = omega / torch.norm(omega, dim=1, keepdim=True)', c: 'text-cyan-300' }],
            [{ t: '        mu, eta, xi = omega[:, 0:1], omega[:, 1:2], omega[:, 2:3]', c: 'text-orange-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Source term (e.g., isotropic point source)', c: 'text-gray-500' }],
            [{ t: '        q = torch.exp(-((x_f-0.5)**2 + (y_f-0.5)**2) / 0.01)', c: 'text-pink-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Compute PDE residual loss', c: 'text-gray-500' }],
            [{ t: '        residual = model.pde_residual(x_f, y_f, z_f,', c: 'text-cyan-300' }],
            [{ t: '                                      mu, eta, xi, q)', c: 'text-cyan-300' }],
            [{ t: '        loss_f = torch.mean(residual**2)', c: 'text-red-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Compute boundary loss', c: 'text-gray-500' }],
            [{ t: '        loss_b = model.boundary_loss(x_b, y_b, z_b,', c: 'text-cyan-300' }],
            [{ t: '                                      mu_b, eta_b, xi_b)', c: 'text-cyan-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Total loss', c: 'text-gray-500' }],
            [{ t: '        loss = loss_f + ', c: 'text-white' }, { t: '10.0', c: 'text-yellow-300' }, { t: ' * loss_b', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '        # Backpropagation', c: 'text-gray-500' }],
            [{ t: '        optimizer.zero_grad()', c: 'text-purple-300' }],
            [{ t: '        loss.backward()', c: 'text-purple-300' }],
            [{ t: '        optimizer.step()', c: 'text-purple-300' }],
            [{ t: '', c: '' }],
            [{ t: '        # Print progress', c: 'text-gray-500' }],
            [{ t: '        if ', c: 'text-purple-400' }, { t: 'epoch % 1000 == 0', c: 'text-orange-300' }, { t: ':', c: 'text-white' }],
            [{ t: '            print(f"Epoch {epoch}, Loss: {loss.item():.2e}")', c: 'text-green-300' }],
            [{ t: '', c: '' }],
            [{ t: '# Initialize model and optimizer', c: 'text-gray-500' }],
            [{ t: 'layers = [5, 64, 64, 64, 64, 1]', c: 'text-yellow-200' }],
            [{ t: 'model = ', c: 'text-white' }, { t: 'TransportPINN', c: 'text-yellow-300' }, { t: '(layers, sigma_t=1.0)', c: 'text-white' }],
            [{ t: 'optimizer = torch.optim.', c: 'text-white' }, { t: 'Adam', c: 'text-yellow-300' }, { t: '(model.parameters(), lr=', c: 'text-white' }, { t: '1e-3', c: 'text-orange-300' }, { t: ')', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '# Start training', c: 'text-gray-500' }],
            [{ t: 'train_pinn(model, optimizer, n_epochs=', c: 'text-white' }, { t: '10000', c: 'text-orange-300' }, { t: ')', c: 'text-white' }],
            [{ t: '', c: '' }],
            [{ t: '# Training Output:', c: 'text-[#00FF88]' }],
            [{ t: '# Epoch 0, Loss: 5.23e-01', c: 'text-gray-400' }],
            [{ t: '# Epoch 1000, Loss: 3.14e-03', c: 'text-gray-400' }],
            [{ t: '# Epoch 5000, Loss: 2.87e-04', c: 'text-gray-400' }],
            [{ t: '# Epoch 10000, Loss: 1.52e-05', c: 'text-[#00FF88] font-bold' }]
        ]
    };

    // ==========================================
    // 打字机核心引擎 - 同步控制
    // ==========================================
    
    class TypewriterEngine {
        constructor(containerId, scrollBoxId, content, speedMultiplier = 1) {
            this.container = document.getElementById(containerId);
            this.scrollBox = document.getElementById(scrollBoxId);
            this.content = content;
            this.currentLine = 0;
            this.isRunning = false;
            this.baseSpeed = 25 * speedMultiplier; // 基础打字速度(ms)
            this.variance = 15;  // 随机波动范围
            this.speedMultiplier = speedMultiplier;
        }

        // 计算内容总字符数
        getTotalChars() {
            let total = 0;
            for (const line of this.content.lines) {
                for (const token of line) {
                    total += token.t.length;
                }
            }
            return total;
        }

        async typeLine(lineIndex) {
            if (lineIndex >= this.content.lines.length) return;

            const lineData = this.content.lines[lineIndex];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'whitespace-pre-wrap leading-relaxed min-h-[1.5em] flex items-center flex-wrap';
            this.container.appendChild(lineDiv);

            // 创建光标
            const cursor = document.createElement('span');
            cursor.className = 'inline-block w-1.5 h-3.5 ml-0.5 bg-[#00FF88] animate-pulse';
            lineDiv.appendChild(cursor);

            // 空行快速跳过
            if (lineData.length === 1 && lineData[0].t === '') {
                cursor.remove();
                return;
            }

            // 打字每个token
            for (const token of lineData) {
                const span = document.createElement('span');
                if (token.c) span.className = token.c;
                lineDiv.insertBefore(span, cursor);

                // 根据内容类型调整速度
                let speed = this.baseSpeed;
                if (token.c && token.c.includes('gray-500')) {
                    speed = 8; // 注释快速
                } else if (token.t.length > 30) {
                    speed = 12; // 长代码行稍快
                }

                // 逐个字符打字
                for (let i = 0; i < token.t.length; i++) {
                    span.textContent += token.t[i];
                    
                    // 自动滚动
                    this.scrollBox.scrollTop = this.scrollBox.scrollHeight;
                    
                    // 随机延迟模拟人类打字
                    const delay = speed + Math.random() * this.variance;
                    await this.sleep(delay);
                }
            }

            cursor.remove();
            
            // 行结束后的短暂停顿
            await this.sleep(80 + Math.random() * 120);
        }

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async run() {
            this.isRunning = true;
            this.container.innerHTML = '';
            this.currentLine = 0;

            for (let i = 0; i < this.content.lines.length; i++) {
                if (!this.isRunning) break;
                await this.typeLine(i);
                this.currentLine = i + 1;
            }

            // 添加结尾光标
            const endCursor = document.createElement('div');
            endCursor.className = 'whitespace-pre-wrap leading-relaxed min-h-[1.5em]';
            endCursor.innerHTML = '<span class="inline-block w-1.5 h-3.5 bg-[#00FF88] animate-pulse"></span>';
            this.container.appendChild(endCursor);
            this.scrollBox.scrollTop = this.scrollBox.scrollHeight;
        }

        stop() {
            this.isRunning = false;
        }

        reset() {
            this.stop();
            this.container.innerHTML = '';
            this.currentLine = 0;
        }
    }

    // ==========================================
    // 同步控制器 - 确保左右同时结束
    // ==========================================
    
    class SyncController {
        constructor() {
            this.mathEngine = null;
            this.codeEngine = null;
            this.isActive = false;
            this.loopDelay = 2000; // 循环间隔
        }

        init() {
            // 计算两侧内容的字符数
            const mathChars = mathContent.lines.reduce((sum, line) => 
                sum + line.reduce((lineSum, token) => lineSum + token.t.length, 0), 0);
            const codeChars = codeContent.lines.reduce((sum, line) => 
                sum + line.reduce((lineSum, token) => lineSum + token.t.length, 0), 0);
            
            // 左边数学推导慢一些(0.7倍速)，右边代码快一些(1.3倍速)
            // 根据内容长度调整，让两边同时完成
            // 目标：mathTime = codeTime
            // mathChars * mathSpeed = codeChars * codeSpeed
            // 设 mathSpeed = 35ms (慢), codeSpeed = 20ms (快)
            const mathSpeed = 85;
            const codeSpeed = mathChars * mathSpeed / codeChars;
            
            this.mathEngine = new TypewriterEngine('formula-container', 'math-scroll-box', mathContent, mathSpeed / 25);
            this.codeEngine = new TypewriterEngine('code-container', 'code-scroll-box', codeContent, codeSpeed / 25);
            
            console.log(`Math chars: ${mathChars}, Code chars: ${codeChars}`);
            console.log(`Math speed: ${mathSpeed}ms, Code speed: ${codeSpeed.toFixed(2)}ms`);
        }

        async start() {
            if (this.isActive) return;
            this.isActive = true;

            // 左右两边独立运行，各自循环
            this.runIndependent(this.mathEngine, 'formula-container');
            this.runIndependent(this.codeEngine, 'code-container');
        }

        // 独立运行每个打字机
        async runIndependent(engine, containerId) {
            while (this.isActive) {
                // 运行打字机
                await engine.run();

                // 短暂停留展示结果
                await this.sleep(this.loopDelay);

                // 淡出效果
                const container = document.getElementById(containerId);
                container.style.transition = 'opacity 0.4s ease';
                container.style.opacity = '0';
                await this.sleep(400);

                // 重置
                engine.reset();
                
                // 淡入
                container.style.opacity = '1';
                await this.sleep(300);
            }
        }

        async fadeOut() {
            const mathContainer = document.getElementById('formula-container');
            const codeContainer = document.getElementById('code-container');
            
            mathContainer.style.transition = 'opacity 0.4s ease';
            codeContainer.style.transition = 'opacity 0.4s ease';
            
            mathContainer.style.opacity = '0';
            codeContainer.style.opacity = '0';
            
            await this.sleep(400);
            
            mathContainer.style.opacity = '1';
            codeContainer.style.opacity = '1';
        }

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        stop() {
            this.isActive = false;
            if (this.mathEngine) this.mathEngine.stop();
            if (this.codeEngine) this.codeEngine.stop();
        }
    }

    // ==========================================
    // 启动
    // ==========================================
    
    // 等待DOM加载完成
    function init() {
        const controller = new SyncController();
        controller.init();
        controller.start();
        
        // 暴露到全局以便调试
        window.typewriterController = controller;
    }

    // 如果DOM已加载则立即执行，否则等待
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
