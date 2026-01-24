/**
 * NineBoxView Pro Final CTA 早鳥購買連結
 * 在 Final CTA 區域新增「已經試用過？立即購買」連結
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

  function createEarlyBirdCta(lang) {
    var i18n = getEarlyBirdI18n(lang);

    // 建立容器
    var container = document.createElement('div');
    container.className = 'final-cta__early-bird';

    // 分隔線
    var divider = document.createElement('div');
    divider.className = 'final-cta__divider';

    var dividerLine = document.createElement('span');
    dividerLine.className = 'final-cta__divider-line';

    var dividerText = document.createElement('span');
    dividerText.className = 'final-cta__divider-text';
    dividerText.textContent = i18n.finalCtaLabel;

    var dividerLine2 = document.createElement('span');
    dividerLine2.className = 'final-cta__divider-line';

    divider.appendChild(dividerLine);
    divider.appendChild(dividerText);
    divider.appendChild(dividerLine2);

    // 購買按鈕（outline 樣式）
    var buyLink = document.createElement('a');
    buyLink.className = 'cta cta--outline final-cta__buy-btn';
    buyLink.href = '../checkout/?lang=' + lang;
    buyLink.textContent = i18n.finalCtaBuy;

    container.appendChild(divider);
    container.appendChild(buyLink);

    return container;
  }

  function initEarlyBirdCta() {
    if (!isEarlyBirdActive()) {
      return;
    }

    var lang = getCurrentLang();

    // 找到 Final CTA 區域
    var finalCtaNote = document.querySelector('.final-cta__note[data-show="mac"]');
    if (!finalCtaNote) {
      return;
    }

    var earlyBirdCta = createEarlyBirdCta(lang);

    // 插入到 note 後面
    finalCtaNote.parentNode.insertBefore(earlyBirdCta, finalCtaNote.nextSibling);
  }

  window.EarlyBirdCta = {
    init: initEarlyBirdCta
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      waitForConfig(initEarlyBirdCta);
    });
  } else {
    waitForConfig(initEarlyBirdCta);
  }
})();
