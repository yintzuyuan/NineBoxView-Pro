/**
 * NineBoxView Pro 早鳥頂部通知條
 * 優雅的一行通知，可關閉
 */
(function() {
  'use strict';

  function waitForConfig(callback, maxAttempts) {
    maxAttempts = maxAttempts || 50;
    var attempts = 0;

    function check() {
      if (typeof EARLY_BIRD_CONFIG !== 'undefined' && typeof isEarlyBirdActive === 'function') {
        callback();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(check, 100);
      }
    }
    check();
  }

  function getCurrentLang() {
    var htmlLang = document.documentElement.lang;
    var validLangs = ['zh-Hant', 'zh-Hans', 'en', 'ja', 'ko'];
    return validLangs.indexOf(htmlLang) !== -1 ? htmlLang : 'zh-Hant';
  }

  function createTopbar(lang) {
    var i18n = getEarlyBirdI18n(lang);

    var topbar = document.createElement('div');
    topbar.className = 'early-bird-topbar';
    topbar.setAttribute('role', 'banner');

    var text = document.createElement('a');
    text.className = 'early-bird-topbar__text';
    text.href = '#final-cta';
    text.textContent = i18n.topbarText;
    text.addEventListener('click', function(e) {
      e.preventDefault();
      var finalCta = document.querySelector('.final-cta');
      if (finalCta) {
        // 計算位置，預留頂部空間讓標題完整顯示
        var rect = finalCta.getBoundingClientRect();
        var offset = 80; // 預留空間
        var targetY = window.scrollY + rect.top - offset;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    });

    var closeBtn = document.createElement('button');
    closeBtn.className = 'early-bird-topbar__close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', function() {
      topbar.classList.add('early-bird-topbar--hidden');
      document.body.classList.remove('has-topbar');
      sessionStorage.setItem('earlyBirdTopbarClosed', 'true');
    });

    topbar.appendChild(text);
    topbar.appendChild(closeBtn);

    return topbar;
  }

  function initTopbar() {
    if (!isEarlyBirdActive()) {
      return;
    }

    if (sessionStorage.getItem('earlyBirdTopbarClosed') === 'true') {
      return;
    }

    // 不在 checkout 頁面顯示
    if (window.location.pathname.indexOf('/checkout') !== -1) {
      return;
    }

    var lang = getCurrentLang();
    var topbar = createTopbar(lang);

    // 插入到 body 最前面
    document.body.insertBefore(topbar, document.body.firstChild);
    document.body.classList.add('has-topbar');
  }

  window.EarlyBirdTopbar = {
    init: initTopbar
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      waitForConfig(initTopbar);
    });
  } else {
    waitForConfig(initTopbar);
  }
})();
