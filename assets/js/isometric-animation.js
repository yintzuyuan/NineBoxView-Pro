/**
 * NineBoxView Pro 等角投影概念圖 - 互動動畫
 *
 * 功能：
 * - 滾動觸發動畫（Intersection Observer）
 * - 參考字層隨機文字替換
 * - 鎖定字層淡入淡出位移
 * - 多語言支援
 */

(function () {
  'use strict';

  // ========== 從 HERO_PRESETS 動態生成文字池 ==========

  /**
   * 從 HERO_PRESETS 和 HERO_CHARACTERS 建構動畫用文字池
   * 統一字池來源，避免重複定義
   *
   * 轉換規則：
   * - reference: 合併所有 reference 組的字元（去除空格和重複）
   * - locked: 保留三組完整結構（與展示工具一致）
   * - center: HERO_CHARACTERS[locale].center
   */
  function buildTextPools() {
    const pools = {};
    const locales = ['zh-Hant', 'zh-Hans', 'ja', 'ko'];

    locales.forEach(locale => {
      const preset = HERO_PRESETS[locale];
      const hero = HERO_CHARACTERS[locale];

      // reference: 合併所有 reference 組的字元（去除空格和重複）
      const allRefChars = new Set();
      preset.reference.forEach(group => {
        const chars = group.chars.replace(/\s/g, '');
        for (const char of chars) {
          allRefChars.add(char);
        }
      });
      const reference = Array.from(allRefChars);

      // locked: 保留三組完整結構（每組包含 positions 物件）
      const locked = preset.locked;

      pools[locale] = {
        reference,
        locked,
        center: hero.center
      };
    });

    return pools;
  }

  // 建構文字池（延遲初始化，確保 HERO_PRESETS 已載入）
  let textPools = null;

  function getTextPools() {
    if (!textPools) {
      if (typeof HERO_PRESETS === 'undefined' || typeof HERO_CHARACTERS === 'undefined') {
        // 備用字池（三組結構，與 HERO_PRESETS 一致）
        return {
          'zh-Hant': {
            reference: ['南', '去', '經', '三', '國', '東', '來', '過'],
            locked: [
              { id: 'extremes', positions: { 0: '東', 2: '國', 6: '鷹', 8: '愛' } },
              { id: 'density', positions: { 1: '酬', 3: '三', 5: '鷹', 7: '東' } },
              { id: 'balance', positions: { 0: '永', 2: '袋', 6: '今', 8: '力' } }
            ],
            center: '永'
          },
          'zh-Hans': {
            reference: ['天', '地', '玄', '黄', '宇', '宙', '洪', '荒'],
            locked: [
              { id: 'extremes', positions: { 0: '东', 2: '国', 6: '鹰', 8: '爱' } },
              { id: 'density', positions: { 1: '灵', 3: '三', 5: '酬', 7: '郁' } },
              { id: 'simplified', positions: { 0: '龙', 2: '凤', 6: '龟', 8: '鸟' } }
            ],
            center: '永'
          },
          'ja': {
            reference: ['い', 'ろ', 'は', 'に', 'ほ', 'へ', 'と', 'ち'],
            locked: [
              { id: 'hiragana', positions: { 0: 'り', 2: 'の', 6: 'し', 8: 'む' } },
              { id: 'katakana', positions: { 1: 'リ', 3: 'エ', 5: 'ノ', 7: 'ム' } },
              { id: 'kanji', positions: { 0: '東', 2: '國', 6: '鷹', 8: '愛' } }
            ],
            center: 'あ'
          },
          'ko': {
            reference: ['다', '람', '쥐', '헌', '쳇', '바', '퀴', '에'],
            locked: [
              { id: 'vertical', positions: { 0: '가', 2: '나', 6: '다', 8: '마' } },
              { id: 'horizontal', positions: { 1: '가', 3: '고', 5: '노', 7: '나' } },
              { id: 'complex', positions: { 0: '닭', 2: '읽', 6: '삶', 8: '없' } }
            ],
            center: '한'
          }
        };
      }
      textPools = buildTextPools();
    }
    return textPools;
  }

  // ========== 設定 ==========
  const CONFIG = {
    animationDuration: 200,    // 單次淡入淡出時間 (ms)
    staggerDelay: 60,          // 鎖定層依序動畫延遲 (ms)
    layerDelay: 400,           // 層間動畫延遲 (ms)
    observerThreshold: 0.5,    // 視窗觸發閾值
    referencePositions: [0, 1, 2, 3, 5, 6, 7, 8], // 參考層有字的位置（排除中央 4）
    lockedRepeat: 3,           // 鎖定層動畫重複次數
    lockedRepeatDelay: 1000    // 鎖定層每次重複間隔 (ms)
  };

  // ========== 工具函數 ==========

  /**
   * 偵測當前語言
   */
  function detectLanguage() {
    // 優先從 HTML lang 屬性取得
    const htmlLang = document.documentElement.lang;
    if (htmlLang) {
      // 處理 zh-TW -> zh-Hant, zh-CN -> zh-Hans
      if (htmlLang.startsWith('zh-TW') || htmlLang === 'zh-Hant') return 'zh-Hant';
      if (htmlLang.startsWith('zh-CN') || htmlLang === 'zh-Hans') return 'zh-Hans';
      if (htmlLang.startsWith('ja')) return 'ja';
      if (htmlLang.startsWith('ko')) return 'ko';
    }

    // 從 URL 路徑判斷
    const pathLang = window.location.pathname.split('/')[1];
    if (getTextPools()[pathLang]) return pathLang;

    // 預設繁體中文
    return 'zh-Hant';
  }

  /**
   * 隨機取得陣列中的 n 個不重複元素
   */
  function getRandomElements(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }

  // ========== 動畫函數 ==========

  /**
   * 參考字層：隨機替換文字（帶跳動效果，漸慢停止）
   */
  function shuffleReferenceLayer(svg, pool) {
    // 支援新舊 class 命名
    const glyphs = svg.querySelectorAll('.glyph[data-layer="reference"], .glyph-reference[data-layer="reference"]');
    const finalChars = getRandomElements(pool.reference, CONFIG.referencePositions.length);

    // 跳動參數（開頭緊湊，結尾緩慢）
    const shuffleTimes = [40, 50, 60, 80, 120, 180, 280, 400]; // 漸慢的間隔時間

    // 淡出
    glyphs.forEach(g => g.classList.add('fade-out'));

    // 淡入後開始跳動
    setTimeout(() => {
      glyphs.forEach(g => g.classList.remove('fade-out'));

      // 執行漸慢跳動
      let index = 0;

      function doShuffle() {
        if (index < shuffleTimes.length) {
          const randomChars = getRandomElements(pool.reference, glyphs.length);
          glyphs.forEach((g, i) => {
            g.textContent = randomChars[i] || '';
          });
          index++;
          setTimeout(doShuffle, shuffleTimes[index - 1]);
        } else {
          // 最後定格在最終文字
          glyphs.forEach((g, i) => {
            g.textContent = finalChars[i] || '';
          });
        }
      }

      doShuffle();
    }, CONFIG.animationDuration);
  }

  // 記住上一次選的鎖定字組別，避免連續重複
  let lastLockedGroupIndex = 1; // 初始為第二組（與 initializeLockedLayer 一致）

  /**
   * 鎖定字層：淡入淡出到新位置
   */
  function animateLockedLayer(svg, pool) {
    const layer = svg.querySelector('#layer-locked');
    // 支援新舊 class 命名
    const existingGlyphs = layer.querySelectorAll('.glyph[data-layer="locked"], .glyph-locked[data-layer="locked"]');

    // 位置座標對應
    const positions = [
      { x: 26, y: 26 },   // 0
      { x: 80, y: 26 },   // 1
      { x: 134, y: 26 },  // 2
      { x: 26, y: 80 },   // 3
      { x: 80, y: 80 },   // 4
      { x: 134, y: 80 },  // 5
      { x: 26, y: 134 },  // 6
      { x: 80, y: 134 },  // 7
      { x: 134, y: 134 }  // 8
    ];

    // 依序淡出現有文字
    existingGlyphs.forEach((g, i) => {
      setTimeout(() => {
        g.classList.add('fade-out');
      }, i * CONFIG.staggerDelay);
    });

    // 淡出完成後，更新位置和文字，再淡入
    const fadeOutDuration = CONFIG.animationDuration + (existingGlyphs.length * CONFIG.staggerDelay);

    setTimeout(() => {
      // 從三組 locked 中隨機選一組（排除上一次選的，避免連續重複）
      const availableIndices = [0, 1, 2].filter(i => i !== lastLockedGroupIndex);
      const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      lastLockedGroupIndex = newIndex;

      const randomGroup = pool.locked[newIndex];
      const groupPositions = randomGroup.positions;

      // 移除舊文字
      existingGlyphs.forEach(g => g.remove());

      // 建立新文字元素並依序淡入
      Object.entries(groupPositions).forEach(([pos, char], i) => {
        const posNum = parseInt(pos, 10);
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        // 使用新版 class 命名
        text.setAttribute('class', 'glyph glyph-locked fade-out');
        text.setAttribute('data-layer', 'locked');
        text.setAttribute('data-position', posNum);
        text.setAttribute('x', positions[posNum].x);
        text.setAttribute('y', positions[posNum].y);
        text.textContent = char;
        layer.appendChild(text);

        // 依序淡入
        setTimeout(() => {
          text.classList.remove('fade-out');
        }, i * CONFIG.staggerDelay);
      });
    }, fadeOutDuration);
  }

  /**
   * 編輯字層：更新中心字（當前編輯的字）
   */
  function updateEditLayer(svg, pool) {
    const glyphs = svg.querySelectorAll('.glyph[data-layer="edit"], .glyph-edit[data-layer="edit"]');
    const centerChar = pool.center;

    glyphs.forEach(g => {
      g.textContent = centerChar;
    });
  }

  /**
   * 初始化鎖定字層：從 HERO_PRESETS 動態填入初始內容
   * 使用第二組（density/katakana/horizontal）作為預設顯示
   */
  function initializeLockedLayer(svg, pool) {
    const layer = svg.querySelector('#layer-locked');
    if (!layer) return;

    // 位置座標對應
    const positions = [
      { x: 26, y: 26 },   // 0
      { x: 80, y: 26 },   // 1
      { x: 134, y: 26 },  // 2
      { x: 26, y: 80 },   // 3
      { x: 80, y: 80 },   // 4
      { x: 134, y: 80 },  // 5
      { x: 26, y: 134 },  // 6
      { x: 80, y: 134 },  // 7
      { x: 134, y: 134 }  // 8
    ];

    // 移除現有的鎖定字文字元素
    const existingGlyphs = layer.querySelectorAll('.glyph[data-layer="locked"], .glyph-locked[data-layer="locked"]');
    existingGlyphs.forEach(g => g.remove());

    // 使用第二組（index 1）作為預設顯示
    const defaultGroup = pool.locked[1];
    const groupPositions = defaultGroup.positions;

    // 建立新的鎖定字文字元素
    Object.entries(groupPositions).forEach(([pos, char]) => {
      const posNum = parseInt(pos, 10);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('class', 'glyph glyph-locked');
      text.setAttribute('data-layer', 'locked');
      text.setAttribute('data-position', posNum);
      text.setAttribute('x', positions[posNum].x);
      text.setAttribute('y', positions[posNum].y);
      text.textContent = char;
      layer.appendChild(text);
    });
  }

  /**
   * 執行完整動畫序列
   */
  function playAnimation(svg) {
    const pool = getTextPools()[detectLanguage()];

    // 更新編輯字層的中心字
    updateEditLayer(svg, pool);

    // 參考字層動畫
    shuffleReferenceLayer(svg, pool);

    // 鎖定字層動畫（延遲執行，重複多次）
    for (let i = 0; i < CONFIG.lockedRepeat; i++) {
      const delay = CONFIG.layerDelay + (i * CONFIG.lockedRepeatDelay);
      setTimeout(() => {
        animateLockedLayer(svg, pool);
      }, delay);
    }
  }

  // ========== 初始化 ==========

  /**
   * 設置動畫觸發器（每次進入視窗都觸發）
   */
  function setupObserver(svg) {
    const diagram = svg.querySelector('#concept-diagram');
    if (!diagram) return null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 確保 CSS 動畫 class 存在
          if (!diagram.classList.contains('is-animated')) {
            diagram.classList.add('is-animated');
          }
          playAnimation(svg);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(svg);
    return observer;
  }

  /**
   * 設置字卡 hover 強調對應圖層
   */
  function setupLayerHighlight(svg) {
    const layerCards = document.querySelectorAll('.layer-card');

    layerCards.forEach(card => {
      const layerType = card.classList.contains('layer-card--edit') ? 'edit'
        : card.classList.contains('layer-card--reference') ? 'reference'
        : card.classList.contains('layer-card--locked') ? 'locked'
        : null;

      if (!layerType) return;

      card.addEventListener('mouseenter', () => {
        svg.classList.add(`highlight-${layerType}`);
      });

      card.addEventListener('mouseleave', () => {
        svg.classList.remove(`highlight-${layerType}`);
      });
    });
  }

  /**
   * 初始化所有概念圖 SVG
   */
  function init() {
    // 尋找所有概念圖 SVG（透過 id 或 class）
    const svgs = document.querySelectorAll('svg[aria-label*="NineBoxView"], .isometric-concept');
    const pool = getTextPools()[detectLanguage()];

    svgs.forEach(svg => {
      // 避免重複初始化
      if (svg.dataset.animationInitialized) return;
      svg.dataset.animationInitialized = 'true';

      // 初始化鎖定字層內容（從 HERO_PRESETS 動態填入）
      initializeLockedLayer(svg, pool);

      setupObserver(svg);
      setupLayerHighlight(svg);
    });
  }

  // ========== 執行 ==========

  // DOM 載入完成後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 匯出 API（供外部調用）
  window.IsometricAnimation = {
    init,
    playAnimation,
    getTextPools,
    detectLanguage
  };

})();
