/**
 * Language Menu - Custom Dropdown
 *
 * 處理語言切換選單的開關邏輯
 */
(function() {
  'use strict';

  document.querySelectorAll('.lang-menu').forEach(function(menu) {
    const trigger = menu.querySelector('.lang-trigger');
    if (!trigger) return;

    // 點擊按鈕切換選單
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');

      // 關閉所有其他選單
      document.querySelectorAll('.lang-menu.open').forEach(function(m) {
        m.classList.remove('open');
        m.querySelector('.lang-trigger').setAttribute('aria-expanded', 'false');
      });

      // 切換當前選單
      if (!isOpen) {
        menu.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 點擊外部關閉選單
  document.addEventListener('click', function() {
    document.querySelectorAll('.lang-menu.open').forEach(function(m) {
      m.classList.remove('open');
      m.querySelector('.lang-trigger').setAttribute('aria-expanded', 'false');
    });
  });

  // ESC 鍵關閉選單
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-menu.open').forEach(function(m) {
        m.classList.remove('open');
        m.querySelector('.lang-trigger').setAttribute('aria-expanded', 'false');
      });
    }
  });
})();
