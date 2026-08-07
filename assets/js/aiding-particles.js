// ==========================================
        // Particle System (Three.js)
        // ==========================================
        const initParticles = () => {
            const container = document.getElementById('particle-canvas');
            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);
            camera.position.z = 45;

            const renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true, antialias: false });
            renderer.setSize(window.innerWidth, window.innerHeight);
            const pixelRatio = Math.min(window.devicePixelRatio, 2);
            renderer.setPixelRatio(pixelRatio);

            const spacing = 0.45;
            const width = 280;
            const height = 140;
            const cols = Math.floor(width / spacing);
            const rows = Math.floor(height / spacing);
            const particleCount = cols * rows;

            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const randoms = new Float32Array(particleCount);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const idx = (i * rows + j);
                    positions[idx * 3] = (i - cols / 2) * spacing;
                    positions[idx * 3 + 1] = (j - rows / 2) * spacing;
                    positions[idx * 3 + 2] = 0.0;
                    randoms[idx] = Math.random();
                }
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0.0 },
                    uMousePos: { value: new THREE.Vector2(-999, -999) },
                    uMouseForce: { value: 0.0 },
                    uPixelRatio: { value: pixelRatio }
                },
                vertexShader: `
                    uniform float uTime;
                    uniform vec2 uMousePos;
                    uniform float uMouseForce;
                    uniform float uPixelRatio;

                    attribute float aRandom;

                    varying vec3 vColor;
                    varying float vAlpha;

                    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

                    float snoise(vec3 v) {
                        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                        vec3 i  = floor(v + dot(v, C.yyy));
                        vec3 x0 = v - i + dot(i, C.xxx);
                        vec3 g = step(x0.yzx, x0.xyz);
                        vec3 l = 1.0 - g;
                        vec3 i1 = min(g.xyz, l.zxy);
                        vec3 i2 = max(g.xyz, l.zxy);
                        vec3 x1 = x0 - i1 + C.xxx;
                        vec3 x2 = x0 - i2 + C.yyy;
                        vec3 x3 = x0 - D.yyy;
                        i = mod289(i);
                        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                        float n_ = 0.142857142857;
                        vec3 ns = n_ * D.wyz - D.xzx;
                        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                        vec4 x_ = floor(j * ns.z);
                        vec4 y_ = floor(j - 7.0 * x_);
                        vec4 x = x_ *ns.x + ns.yyyy;
                        vec4 y = y_ *ns.x + ns.yyyy;
                        vec4 h = 1.0 - abs(x) - abs(y);
                        vec4 b0 = vec4(x.xy, y.xy);
                        vec4 b1 = vec4(x.zw, y.zw);
                        vec4 s0 = floor(b0)*2.0 + 1.0;
                        vec4 s1 = floor(b1)*2.0 + 1.0;
                        vec4 sh = -step(h, vec4(0.0));
                        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
                        vec3 p0 = vec3(a0.xy,h.x);
                        vec3 p1 = vec3(a0.zw,h.y);
                        vec3 p2 = vec3(a1.xy,h.z);
                        vec3 p3 = vec3(a1.zw,h.w);
                        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
                        vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                        m = m * m;
                        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
                    }

                    void main() {
                        vec3 pos = position;
                        float waveSpeed = 0.15;
                        float waveFreq = 0.008;
                        float waveX = pos.x * waveFreq - uTime * waveSpeed;
                        float waveY = pos.y * waveFreq * 0.5;

                        float mainWave = sin(waveX + snoise(vec3(waveY, 0.0, uTime * 0.02)) * 2.0);
                        float subWave = sin(waveX * 2.5 + uTime * 0.3) * 0.5 + 0.5;
                        float verticalWave = sin(pos.y * 0.01 + uTime * 0.2) * 0.3;
                        float combinedWave = mainWave * 0.6 + subWave * 0.3 + verticalWave * 0.1;

                        float noise = snoise(vec3(pos.x * 0.005, pos.y * 0.005, uTime * 0.03));
                        combinedWave += noise * 0.2;

                        float travelWave = sin(waveX * 3.0 + noise * 2.0);
                        float visibilityThreshold = 0.2 + travelWave * 0.3;
                        float particlePhase = sin(waveX * 5.0 + pos.y * 0.01 + uTime * 0.5 + aRandom * 3.14);
                        float isVisible = step(visibilityThreshold, particlePhase);

                        float dist = distance(pos.xy, uMousePos);
                        float glowForce = exp(-(dist * dist) / 80.0) * uMouseForce;
                        glowForce *= 0.8 + 0.2 * sin(uTime * 4.0 - dist * 0.1);

                        float colorPhase = sin(waveX + uTime * 0.1);
                        float isGreen = step(0.0, colorPhase + (aRandom - 0.5) * 0.6);

                        vec3 cGray = vec3(0.2, 0.2, 0.22);
                        vec3 cDarkGreen = vec3(0.0, 0.5, 0.28);
                        vec3 cBrightGreen = vec3(0.0, 0.75, 0.42);

                        vec3 baseColor = mix(cGray, cDarkGreen, isGreen);
                        float waveFront = smoothstep(0.3, 0.7, particlePhase - visibilityThreshold);
                        baseColor = mix(baseColor, cBrightGreen, waveFront * 0.4);

                        vec3 cHighlight = vec3(0.0, 0.9, 0.5);
                        vColor = mix(baseColor, cHighlight, glowForce * 0.6);

                        float fadeInOut = sin(waveX * 2.0 + uTime * 0.3) * 0.5 + 0.5;
                        float baseAlpha = 0.4 + fadeInOut * 0.4;
                        float breathe = 0.7 + 0.3 * sin(uTime * 3.0 + aRandom * 6.28);

                        vAlpha = isVisible * baseAlpha * breathe;

                        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                        gl_PointSize = uPixelRatio * 4.0 * (45.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    varying float vAlpha;

                    void main() {
                        if (vAlpha < 0.05) discard;
                        gl_FragColor = vec4(vColor, vAlpha);
                    }
                `,
                transparent: true,
                depthWrite: false,
                depthTest: false
            });

            const points = new THREE.Points(geometry, material);
            scene.add(points);

            const mouse = new THREE.Vector2();
            const raycaster = new THREE.Raycaster();
            const targetPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

            const targetWorldMouse = new THREE.Vector3(0, 0, 0);
            const currentWorldMouse = new THREE.Vector3(0, 0, 0);

            let targetForce = 0.0;
            let currentForce = 0.0;
            let interactionTimeout;
            let isFirstMove = true;

            window.addEventListener('mousemove', (event) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                raycaster.ray.intersectPlane(targetPlane, targetWorldMouse);

                if (isFirstMove) {
                    currentWorldMouse.copy(targetWorldMouse);
                    isFirstMove = false;
                }
                targetForce = 1.0;
                clearTimeout(interactionTimeout);
                interactionTimeout = setTimeout(() => {
                    targetForce = 0.0;
                }, 500);
            });

            window.addEventListener('mouseout', () => {
                targetForce = 0.0;
            });

            const clock = new THREE.Clock();

            function animate() {
                requestAnimationFrame(animate);
                currentWorldMouse.lerp(targetWorldMouse, 0.15);
                currentForce += (targetForce - currentForce) * 0.05;
                material.uniforms.uTime.value = clock.getElapsedTime();
                material.uniforms.uMousePos.value.set(currentWorldMouse.x, currentWorldMouse.y);
                material.uniforms.uMouseForce.value = currentForce;
                renderer.render(scene, camera);
            }

            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        };

        initParticles();
