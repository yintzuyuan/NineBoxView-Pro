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

  // ========== 多語言文字池 ==========
  const textPools = {
    // 繁體中文：傳統漢字
    'zh-Hant': {
      reference: ['酬', '鷹', '靈', '風', '書', '飛', '語', '東', '雲', '雨', '雪', '霜', '龍', '鳳', '鶴', '鷺'],
      locked: ['鑫', '龍', '國', '鋒', '銘', '鎮', '霸', '韻', '鶯', '鸞'],
      center: '永'
    },
    // 簡體中文
    'zh-Hans': {
      reference: ['云', '雨', '风', '雷', '龙', '凤', '鹤', '鸳', '飞', '书', '画', '诗', '梦', '鱼', '鸟', '树'],
      locked: ['鑫', '龙', '国', '锋', '铭', '镇', '霸', '韵', '莺', '鸾'],
      center: '永'
    },
    // 日文
    'ja': {
      reference: ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'さ', 'し', 'す', 'せ', 'た', 'な', 'は', 'ま'],
      locked: ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ'],
      center: 'あ'
    },
    // 韓文
    'ko': {
      reference: ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하', '강', '물'],
      locked: ['한', '글', '힘', '빛', '꿈', '별', '달', '숲', '봄', '꽃'],
      center: '한'
    }
  };

  // ========== 設定 ==========
  const CONFIG = {
    animationDuration: 200,    // 單次淡入淡出時間 (ms)
    staggerDelay: 60,          // 鎖定層依序動畫延遲 (ms)
    layerDelay: 400,           // 層間動畫延遲 (ms)
    observerThreshold: 0.5,    // 視窗觸發閾值
    referencePositions: [0, 1, 2, 3, 5, 6, 7, 8], // 參考層有字的位置（排除中央 4）
    lockedCount: 3,            // 鎖定層顯示的字數
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
    if (textPools[pathLang]) return pathLang;

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

  /**
   * 隨機取得陣列中的 n 個不重複位置（0-8，排除指定位置）
   */
  function getRandomPositions(count, exclude = []) {
    const available = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(p => !exclude.includes(p));
    return getRandomElements(available, count);
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

  /**
   * 鎖定字層：淡入淡出到新位置
   */
  function animateLockedLayer(svg, pool) {
    const layer = svg.querySelector('#layer-locked');
    // 支援新舊 class 命名
    const existingGlyphs = layer.querySelectorAll('.glyph[data-layer="locked"], .glyph-locked[data-layer="locked"]');

    // 位置座標對應（支援 50px 和 52px 兩種格子尺寸）
    const cellSize = 52; // 新版使用 52px
    const gap = 2;
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
      // 取得新的隨機位置和文字
      const newPositions = getRandomPositions(CONFIG.lockedCount, [4]); // 排除中央
      const newChars = getRandomElements(pool.locked, CONFIG.lockedCount);

      // 移除舊文字
      existingGlyphs.forEach(g => g.remove());

      // 建立新文字元素並依序淡入
      newPositions.forEach((pos, i) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        // 使用新版 class 命名
        text.setAttribute('class', 'glyph glyph-locked fade-out');
        text.setAttribute('data-layer', 'locked');
        text.setAttribute('data-position', pos);
        text.setAttribute('x', positions[pos].x);
        text.setAttribute('y', positions[pos].y);
        text.textContent = newChars[i];
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
   * 執行完整動畫序列
   */
  function playAnimation(svg) {
    const pool = textPools[detectLanguage()];

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
   * 初始化所有概念圖 SVG
   */
  function init() {
    // 尋找所有概念圖 SVG（透過 id 或 class）
    const svgs = document.querySelectorAll('svg[aria-label*="NineBoxView"], .isometric-concept');

    svgs.forEach(svg => {
      // 避免重複初始化
      if (svg.dataset.animationInitialized) return;
      svg.dataset.animationInitialized = 'true';

      setupObserver(svg);
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
    textPools,
    detectLanguage
  };

})();
