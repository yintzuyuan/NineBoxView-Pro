/**
 * NineBoxView Pro Guide - Theme Toggle
 * 主題切換邏輯：首次訪問讀取系統偏好，之後由 localStorage 控制
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'nineboxview-guide-theme';

  // SVG 圖示
  const icons = {
    sun: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-17-17a8,8,0,0,0-11.32,11.32Zm0,116.68-17,17a8,8,0,0,0,11.32,11.32l17-17a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l17-17a8,8,0,0,0-11.32-11.32l-17,17A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l17,17a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"/></svg>'
  };

  /**
   * 取得初始主題
   * 優先讀取 localStorage，無則讀取系統偏好
   */
  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    // 首次訪問：讀取系統偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * 套用主題
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateButtonIcon(theme);
    updateConceptImages(theme);
  }

  /**
   * 更新概念圖圖片（根據主題切換 src）
   */
  function updateConceptImages(theme) {
    document.querySelectorAll('.concept-layers-img').forEach(function(img) {
      var src = theme === 'dark' ? img.dataset.srcDark : img.dataset.srcLight;
      if (src && img.src !== src) {
        img.src = src;
      }
    });
  }

  /**
   * 更新按鈕圖示
   */
  function updateButtonIcon(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      // 淺色模式顯示月亮（點擊切換到深色），深色模式顯示太陽（點擊切換到淺色）
      btn.innerHTML = theme === 'dark' ? icons.sun : icons.moon;
      // 使用 data 屬性取得本地化的 aria-label
      const labelLight = btn.dataset.labelLight || 'Switch to dark mode';
      const labelDark = btn.dataset.labelDark || 'Switch to light mode';
      btn.setAttribute('aria-label', theme === 'dark' ? labelDark : labelLight);
    }
  }

  /**
   * 切換主題
   */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || getInitialTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  /**
   * 初始化
   */
  function init() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
      // 設定初始圖示
      const currentTheme = document.documentElement.getAttribute('data-theme') || getInitialTheme();
      updateButtonIcon(currentTheme);
    }
  }

  // 頁面載入前先套用主題（已在 head 中處理，這裡僅初始化按鈕）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
