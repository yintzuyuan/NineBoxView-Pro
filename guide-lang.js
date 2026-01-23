/**
 * Language Menu - Custom Dropdown
 *
 * 處理語言切換選單的開關邏輯，支援鍵盤導航
 */
(function() {
  'use strict';

  document.querySelectorAll('.lang-menu').forEach(function(menu) {
    const trigger = menu.querySelector('.lang-trigger');
    const dropdown = menu.querySelector('.lang-dropdown');
    if (!trigger || !dropdown) return;

    const items = dropdown.querySelectorAll('a');
    let focusedIndex = -1;

    function closeMenu() {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      focusedIndex = -1;
    }

    function openMenu() {
      menu.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function focusItem(index) {
      if (index < 0) index = items.length - 1;
      if (index >= items.length) index = 0;
      focusedIndex = index;
      items[focusedIndex].focus();
    }

    // 點擊按鈕切換選單
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');

      // 關閉所有其他選單
      document.querySelectorAll('.lang-menu.open').forEach(function(m) {
        if (m !== menu) {
          m.classList.remove('open');
          m.querySelector('.lang-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // 切換當前選單
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // 鍵盤導航
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!menu.classList.contains('open')) {
          openMenu();
        }
        focusItem(0);
      }
    });

    dropdown.addEventListener('keydown', function(e) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          focusItem(focusedIndex + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          focusItem(focusedIndex - 1);
          break;
        case 'Escape':
          e.preventDefault();
          closeMenu();
          trigger.focus();
          break;
        case 'Tab':
          closeMenu();
          break;
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

  // ESC 鍵關閉選單（全域）
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-menu.open').forEach(function(m) {
        m.classList.remove('open');
        m.querySelector('.lang-trigger').setAttribute('aria-expanded', 'false');
      });
    }
  });
})();
