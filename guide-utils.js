/**
 * NineBoxView Pro Guide - Utility Functions
 * 返回頂部按鈕、程式碼複製、Scroll Spy 等功能
 */

(function() {
  'use strict';

  // 預定義的安全 SVG 圖示（避免動態 HTML 注入）
  var ICONS = {
    copy: '<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>'
  };

  // =============================================================================
  // 返回頂部按鈕
  // =============================================================================
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    // 滾動超過 300px 時顯示按鈕
    var SCROLL_THRESHOLD = 300;

    function toggleVisibility() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    // 使用 passive listener 優化滾動效能
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    // 點擊返回頂部
    btn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // 初始化時檢查一次
    toggleVisibility();
  }

  // =============================================================================
  // 程式碼區塊複製按鈕
  // =============================================================================
  function initCodeCopy() {
    var codeBlocks = document.querySelectorAll('.guide__content pre');
    if (codeBlocks.length === 0) return;

    codeBlocks.forEach(function(pre) {
      // 建立包裝容器
      var wrapper = document.createElement('div');
      wrapper.className = 'code-block';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // 建立複製按鈕（使用 DOM API 安全地設定內容）
      var copyBtn = document.createElement('button');
      copyBtn.className = 'code-block__copy';
      copyBtn.type = 'button';
      copyBtn.setAttribute('aria-label', 'Copy code');

      // 安全地設定 SVG 圖示
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = ICONS.copy;
      copyBtn.appendChild(tempDiv.firstChild);

      wrapper.appendChild(copyBtn);

      // 點擊複製
      copyBtn.addEventListener('click', function() {
        var code = pre.querySelector('code') || pre;
        var text = code.textContent || '';

        navigator.clipboard.writeText(text).then(function() {
          // 顯示「已複製」狀態
          copyBtn.classList.add('is-copied');
          // 清除現有圖示並設定新圖示
          while (copyBtn.firstChild) {
            copyBtn.removeChild(copyBtn.firstChild);
          }
          var checkDiv = document.createElement('div');
          checkDiv.innerHTML = ICONS.check;
          copyBtn.appendChild(checkDiv.firstChild);

          // 2 秒後恢復
          setTimeout(function() {
            copyBtn.classList.remove('is-copied');
            while (copyBtn.firstChild) {
              copyBtn.removeChild(copyBtn.firstChild);
            }
            var copyDiv = document.createElement('div');
            copyDiv.innerHTML = ICONS.copy;
            copyBtn.appendChild(copyDiv.firstChild);
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy:', err);
        });
      });
    });
  }

  // =============================================================================
  // Scroll Spy - 側邊欄追蹤
  // =============================================================================
  function initScrollSpy() {
    var headings = document.querySelectorAll('.guide__content h2[id]');
    var navLinks = document.querySelectorAll('.guide__nav a');

    if (headings.length === 0 || navLinks.length === 0) return;

    // 建立 heading ID 到 nav link 的映射
    var linkMap = {};
    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        linkMap[href.slice(1)] = link;
      }
    });

    // 如果沒有錨點連結，不啟用 scroll spy
    if (Object.keys(linkMap).length === 0) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          var link = linkMap[id];

          if (link) {
            // 移除所有 active 狀態
            navLinks.forEach(function(l) {
              l.classList.remove('active');
            });
            // 添加當前 active 狀態
            link.classList.add('active');
          }
        }
      });
    }, {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    });

    headings.forEach(function(heading) {
      observer.observe(heading);
    });
  }

  // =============================================================================
  // 閱讀進度指示器
  // =============================================================================
  function initProgressBar() {
    var progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // =============================================================================
  // 手機版導航切換
  // =============================================================================
  function initMobileNav() {
    var toggle = document.getElementById('mobile-nav-toggle');
    var sidebar = document.getElementById('guide-sidebar');

    if (!toggle || !sidebar) return;

    function openNav() {
      toggle.setAttribute('aria-expanded', 'true');
      sidebar.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      toggle.setAttribute('aria-expanded', 'false');
      sidebar.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    // 點擊切換按鈕
    toggle.addEventListener('click', function() {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // 點擊導航連結後關閉選單
    sidebar.querySelectorAll('.guide__nav a').forEach(function(link) {
      link.addEventListener('click', function() {
        closeNav();
      });
    });

    // 點擊側邊欄外部區域（遮罩）關閉選單
    sidebar.addEventListener('click', function(e) {
      // 只有點擊 sidebar 本身（遮罩區域）才關閉，點擊內容不關閉
      if (e.target === sidebar) {
        closeNav();
      }
    });

    // ESC 鍵關閉選單
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });

    // 螢幕尺寸變化時，如果變成桌面版就關閉選單
    var mediaQuery = window.matchMedia('(min-width: 769px)');
    function handleResize(e) {
      if (e.matches) {
        closeNav();
      }
    }
    mediaQuery.addEventListener('change', handleResize);
  }

  // =============================================================================
  // 初始化
  // =============================================================================
  function init() {
    initBackToTop();
    initCodeCopy();
    initScrollSpy();
    initProgressBar();
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
