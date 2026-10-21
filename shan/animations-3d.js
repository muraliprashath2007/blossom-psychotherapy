/**
 * Blossom Psychotherapy & Wellness Platform
 * 3D Graphics, Three.js Ambient Visualizer, Multi-Theme System & 3D Tilt Engine
 */

(function () {
  "use strict";

  /* ==========================================================================
     1. MULTI-THEME ENGINE
     ========================================================================== */
  const THEMES = {
    emerald: {
      name: "emerald",
      label: "Emerald Zen",
      primary: 0x0a7062,
      secondary: 0x14b8a6,
      accent: 0xf26522,
      particleColor: 0x14b8a6,
      ambientColor: 0x0a7062
    },
    midnight: {
      name: "midnight",
      label: "Midnight Calm",
      primary: 0x14b8a6,
      secondary: 0x06b6d4,
      accent: 0xa855f7,
      particleColor: 0x2dd4bf,
      ambientColor: 0x14b8a6
    },
    blossom: {
      name: "blossom",
      label: "Blossom Rose",
      primary: 0xbe185d,
      secondary: 0xf43f5e,
      accent: 0xf59e0b,
      particleColor: 0xfb7185,
      ambientColor: 0xbe185d
    }
  };

  let currentTheme = localStorage.getItem("blossom_theme") || "emerald";
  if (!THEMES[currentTheme]) currentTheme = "emerald";

  function applyTheme(themeKey, animate = true) {
    if (!THEMES[themeKey]) return;
    currentTheme = themeKey;
    document.documentElement.setAttribute("data-theme", themeKey);
    localStorage.setItem("blossom_theme", themeKey);

    // Update Theme Switcher Dropdown UI
    document.querySelectorAll(".theme-option").forEach((opt) => {
      const match = opt.getAttribute("data-theme") === themeKey;
      opt.classList.toggle("active", match);
    });

    // Notify Three.js and custom listeners
    window.dispatchEvent(
      new CustomEvent("blossom:themeChanged", {
        detail: { theme: THEMES[themeKey], animate }
      })
    );
  }

  function initThemeSwitcher() {
    applyTheme(currentTheme, false);

    const btn = document.getElementById("themeSwitchBtn");
    const dropdown = document.getElementById("themeDropdown");
    const orb = document.getElementById("floatingThemeOrb");

    if (btn && dropdown) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
      });

      document.querySelectorAll(".theme-option").forEach((opt) => {
        opt.addEventListener("click", () => {
          const t = opt.getAttribute("data-theme");
          applyTheme(t);
          dropdown.classList.remove("active");
        });
      });

      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
          dropdown.classList.remove("active");
        }
      });
    }

    if (orb) {
      orb.addEventListener("click", () => {
        const themeKeys = Object.keys(THEMES);
        const nextIdx = (themeKeys.indexOf(currentTheme) + 1) % themeKeys.length;
        applyTheme(themeKeys[nextIdx]);
        if (window.showToast) {
          window.showToast(`🎨 Theme switched to ${THEMES[themeKeys[nextIdx]].label}`);
        }
      });
    }
  }

  /* ==========================================================================
     2. THREE.JS 3D ZEN MEDITATION ENGINE & AMBIENT STARFIELD
     ========================================================================== */

  // A. Dedicated 3D Zen Meditation Visual (Orbital Rings & Mindfulness Spheres)
  function initZenMeditation3D() {
    const canvas = document.getElementById("zen3dCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    const wrapper = canvas.parentElement || document.querySelector(".zen-3d-wrapper");
    if (!wrapper) return;

    let width = wrapper.clientWidth || 500;
    let height = wrapper.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    let themeConfig = THEMES[currentTheme] || THEMES.emerald;

    // Master 3D Group containing all rotating Zen elements
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // 1. Three 3D Zen Orbital Rings (matching the orbits in user image 2)
    // Ring 1: Primary Emerald / Teal Orbital Ring
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.036, 24, 128);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: themeConfig.secondary,
      roughness: 0.2,
      metalness: 0.35,
      transparent: true,
      opacity: 0.88
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.38;
    ring1.rotation.y = Math.PI * 0.16;
    orbitGroup.add(ring1);

    // Ring 2: Intersecting Cross Orbital Ring
    const ring2Geo = new THREE.TorusGeometry(2.72, 0.03, 24, 128);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: themeConfig.primary,
      roughness: 0.25,
      metalness: 0.28,
      transparent: true,
      opacity: 0.78
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.32;
    ring2.rotation.z = Math.PI * 0.26;
    orbitGroup.add(ring2);

    // Ring 3: Wide Outer Equatorial Orbital Ring
    const ring3Geo = new THREE.TorusGeometry(3.1, 0.024, 24, 128);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: themeConfig.accent,
      roughness: 0.3,
      metalness: 0.4,
      transparent: true,
      opacity: 0.65
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI * 0.12;
    ring3.rotation.y = -Math.PI * 0.35;
    orbitGroup.add(ring3);

    // 2. 16 Floating 3D Mindfulness Spheres (the green orbs from image 2)
    const zenSpheres = [];
    const sphereCount = 16;
    const sphereMaterials = [];

    for (let i = 0; i < sphereCount; i++) {
      const radius = 0.075 + Math.random() * 0.13; // variable sizes
      const geom = new THREE.SphereGeometry(radius, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: (i % 3 === 0) ? themeConfig.secondary : ((i % 3 === 1) ? themeConfig.primary : themeConfig.accent),
        roughness: 0.18,
        metalness: 0.3,
        transparent: true,
        opacity: 0.95
      });
      sphereMaterials.push(mat);

      const mesh = new THREE.Mesh(geom, mat);
      const orbitRadius = 1.6 + Math.random() * 1.5;
      const inclination = (Math.random() - 0.5) * Math.PI * 0.75;
      const speed = (0.007 + Math.random() * 0.011) * (Math.random() > 0.45 ? 1 : -1);
      const angle = (i / sphereCount) * Math.PI * 2 + Math.random() * 0.5;
      const yBobFreq = 1.2 + Math.random() * 1.6;
      const yBobPhase = Math.random() * Math.PI * 2;
      const yBobAmp = 0.1 + Math.random() * 0.16;

      zenSpheres.push({
        mesh,
        orbitRadius,
        inclination,
        speed,
        angle,
        yBobFreq,
        yBobPhase,
        yBobAmp
      });
      orbitGroup.add(mesh);
    }

    // 3. Lighting in the 3D Zen Chamber
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(themeConfig.secondary, 2.5, 25);
    pointLight1.position.set(3.5, 3.5, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(themeConfig.accent, 1.8, 25);
    pointLight2.position.set(-3, -2.5, 3.5);
    scene.add(pointLight2);

    // 4. Interactive Mouse Coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const heroSection = document.querySelector(".hero-section") || window;
    heroSection.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetMouseX = (e.clientX - centerX) / (window.innerWidth / 2);
      targetMouseY = (e.clientY - centerY) / (window.innerHeight / 2);
    });

    // 5. Theme synchronization
    window.addEventListener("blossom:themeChanged", (e) => {
      const t = e.detail.theme;
      if (!t) return;
      themeConfig = t;

      ring1Mat.color.setHex(t.secondary);
      ring2Mat.color.setHex(t.primary);
      ring3Mat.color.setHex(t.accent);

      pointLight1.color.setHex(t.secondary);
      pointLight2.color.setHex(t.accent);

      sphereMaterials.forEach((mat, idx) => {
        mat.color.setHex((idx % 3 === 0) ? t.secondary : ((idx % 3 === 1) ? t.primary : t.accent));
      });
    });

    // 6. Responsive resize
    function onResize() {
      width = wrapper.clientWidth || 500;
      height = wrapper.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", onResize);

    // 7. Visibility observer
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(wrapper);

    // 8. Animation loop
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Damped mouse follow
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Rotate 3D Orbital Rings smoothly
      ring1.rotation.z = elapsed * 0.18;
      ring1.rotation.y = Math.PI * 0.16 + Math.sin(elapsed * 0.25) * 0.12;

      ring2.rotation.y = -elapsed * 0.22;
      ring2.rotation.x = -Math.PI * 0.32 + Math.cos(elapsed * 0.2) * 0.1;

      ring3.rotation.z = elapsed * 0.12;
      ring3.rotation.x = Math.PI * 0.12 + Math.sin(elapsed * 0.15) * 0.08;

      // Orbit the 3D Mindfulness Spheres in authentic 3D trajectories
      for (let i = 0; i < zenSpheres.length; i++) {
        const s = zenSpheres[i];
        s.angle += s.speed;

        const x = Math.cos(s.angle) * s.orbitRadius;
        const z = Math.sin(s.angle) * s.orbitRadius * Math.cos(s.inclination);
        const y = Math.sin(s.angle) * s.orbitRadius * Math.sin(s.inclination) + Math.sin(elapsed * s.yBobFreq + s.yBobPhase) * s.yBobAmp;

        s.mesh.position.set(x, y, z);
      }

      // 3D Parallax tilt response
      orbitGroup.rotation.y = mouseX * 0.38;
      orbitGroup.rotation.x = -mouseY * 0.28;

      renderer.render(scene, camera);
    }
    animate();
  }

  // B. Ambient Soft Particle Background Canvas (Zero text collision)
  function initHeroAmbientCanvas() {
    const canvas = document.getElementById("hero3dCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    const container = canvas.parentElement || document.querySelector(".hero-section");
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 650;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    let themeConfig = THEMES[currentTheme] || THEMES.emerald;

    // 120 Gentle Ambient Zen Specks
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Particle Texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext("2d");
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, "rgba(255,255,255,0.9)");
    pGrad.addColorStop(0.3, "rgba(255,255,255,0.5)");
    pGrad.addColorStop(1, "rgba(255,255,255,0)");
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTex = new THREE.CanvasTexture(pCanvas);
    const pMat = new THREE.PointsMaterial({
      color: themeConfig.particleColor,
      size: 0.16,
      map: pTex,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, pMat);
    scene.add(particles);

    window.addEventListener("blossom:themeChanged", (e) => {
      if (e.detail && e.detail.theme) {
        pMat.color.setHex(e.detail.theme.particleColor);
      }
    });

    function onResize() {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 650;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = Math.sin(elapsed * 0.015) * 0.05;
      renderer.render(scene, camera);
    }
    animate();
  }

  /* ==========================================================================
     3. 3D CARD TILT WITH DYNAMIC SPECULAR LIGHTING
     ========================================================================== */
  function init3DCardTilt() {
    const cards = document.querySelectorAll(
      ".tilt-card-3d, .quiz-card, .concern-card, .therapist-spotlight-card, .pricing-card, .feature-box, .step-card, .testimonial-card, .hero-widget"
    );

    cards.forEach((card) => {
      card.classList.add("tilt-card-3d");

      // Add specular glare layer if not present
      if (!card.querySelector(".tilt-card-glare")) {
        const glare = document.createElement("div");
        glare.className = "tilt-card-glare";
        card.appendChild(glare);
      }

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;

        const centerX = width / 2;
        const centerY = height / 2;

        const rotateX = -((y - centerY) / centerY) * 9;
        const rotateY = ((x - centerX) / centerX) * 9;

        const glareX = (x / width) * 100;
        const glareY = (y / height) * 100;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty("--glare-x", `${glareX.toFixed(1)}%`);
        card.style.setProperty("--glare-y", `${glareY.toFixed(1)}%`);
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)";
      });
    });
  }

  /* ==========================================================================
     4. ZEN BREATHING 3D GUIDED MINDFULNESS WIDGET
     ========================================================================== */
  let breathingInterval = null;
  let currentBreathCycle = 1;
  const maxBreathCycles = 4;

  const BREATH_PHASES = [
    { title: "Breathe In Slowly", sub: "Feel the calm energy filling your mind", class: "inhale", duration: 4 },
    { title: "Hold Gently", sub: "Rest in peaceful stillness", class: "hold", duration: 4 },
    { title: "Breathe Out Completely", sub: "Release all stress, tension & fatigue", class: "exhale", duration: 4 },
    { title: "Pause in Peace", sub: "Your mind is quiet, serene & clear", class: "hold", duration: 4 }
  ];

  function startBreathingCycle() {
    let phaseIdx = 0;
    const stage = document.getElementById("zenBreathingStage");
    const title = document.getElementById("zenPhaseTitle");
    const sub = document.getElementById("zenPhaseSub");
    const seconds = document.getElementById("zenSecondsDisplay");

    if (!stage || !title) return;

    function applyPhase() {
      const p = BREATH_PHASES[phaseIdx];
      stage.className = `zen-breathing-stage ${p.class}`;
      title.textContent = p.title;
      if (sub) sub.textContent = p.sub;

      let remainingSec = p.duration;
      if (seconds) seconds.textContent = `${remainingSec}s`;

      const secCountdown = setInterval(() => {
        remainingSec--;
        if (seconds && remainingSec > 0) seconds.textContent = `${remainingSec}s`;
        if (remainingSec <= 0) clearInterval(secCountdown);
      }, 1000);

      phaseIdx = (phaseIdx + 1) % BREATH_PHASES.length;

      // Update cycle pills
      if (phaseIdx === 0) {
        currentBreathCycle = (currentBreathCycle % maxBreathCycles) + 1;
        document.querySelectorAll(".zen-pill").forEach((pill, idx) => {
          pill.classList.toggle("active", idx < currentBreathCycle);
        });
      }
    }

    applyPhase();
    clearInterval(breathingInterval);
    breathingInterval = setInterval(applyPhase, 4000);
  }

  function stopBreathingCycle() {
    clearInterval(breathingInterval);
    breathingInterval = null;
  }

  function initZenBreathingModal() {
    const trigger = document.getElementById("zenBreatheTrigger");
    const overlay = document.getElementById("zenBreathingOverlay");
    const closeBtn = document.getElementById("zenCloseBtn");

    if (trigger && overlay) {
      trigger.addEventListener("click", () => {
        overlay.classList.add("active");
        currentBreathCycle = 1;
        startBreathingCycle();
      });
    }

    if (closeBtn && overlay) {
      closeBtn.addEventListener("click", () => {
        overlay.classList.remove("active");
        stopBreathingCycle();
      });
    }

    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
          stopBreathingCycle();
        }
      });
    }
  }

  /* ==========================================================================
     5. SCROLL-TRIGGERED 3D REVEAL & NUMERIC STAT COUNTERS
     ========================================================================== */
  function init3DScrollReveal() {
    const revealTargets = document.querySelectorAll(
      ".hero-widget, .step-card, .concern-card, .quiz-card, .pricing-card, .feature-box, .therapist-spotlight-card, .faq-item"
    );

    revealTargets.forEach((target, i) => {
      target.classList.add("reveal-3d");
      target.style.transitionDelay = `${(i % 3) * 0.08}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((t) => observer.observe(t));

    // Numeric Stat Counters Animation
    const statElements = document.querySelectorAll(".metric-data h4");
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statElements.forEach((stat) => {
          const raw = stat.textContent.trim();
          if (raw.includes("500,000") || raw.includes("50,000")) {
            animateNumber(stat, 0, 50000, 1800, "+", true);
          } else if (raw.includes("45,000") || raw.includes("4,000")) {
            animateNumber(stat, 0, 4000, 1600, "+", true);
          }
        });
      }
    });

    const trustMetrics = document.querySelector(".trust-metrics");
    if (trustMetrics) statsObserver.observe(trustMetrics);
  }

  function animateNumber(element, start, end, duration, suffix = "", formatComma = false) {
    const startTime = performance.now();
    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * ease);
      element.textContent = (formatComma ? current.toLocaleString() : current) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  /* ==========================================================================
     INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitcher();
    initHeroAmbientCanvas();
    initZenMeditation3D();
    init3DCardTilt();
    initZenBreathingModal();
    init3DScrollReveal();
  });
})();
