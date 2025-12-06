/**
 * Paddle Checkout Integration
 * NineBoxView Pro - 統一管理所有語言版本的結帳邏輯
 */

// Paddle 配置（Sandbox 模式）
const PADDLE_CONFIG = {
  token: 'test_86bc26e0361179c74bee97d56d8',
  priceId: 'pri_01kbt8e0yeaqvfvap0p973kx06',
  environment: 'sandbox'
};

// 語言對應表（HTML lang 屬性 → Paddle locale）
const LOCALE_MAP = {
  'zh-Hant': 'zh-TW',  // 繁體中文（2024-11 新增支援）
  'zh-Hans': 'zh',     // 簡體中文
  'en': 'en',
  'ja': 'ja',
  'ko': 'ko'
};

// 初始化 Paddle
function initPaddle() {
  if (typeof Paddle === 'undefined') {
    console.error('Paddle.js not loaded');
    return;
  }
  Paddle.Environment.set(PADDLE_CONFIG.environment);
  Paddle.Initialize({
    token: PADDLE_CONFIG.token,
    eventCallback: function(event) {
      console.log('Paddle Event:', event.name, event.data);
      if (event.name === 'checkout.warning' || event.name === 'checkout.error') {
        console.error('Paddle Error Details:', event);
      }
    }
  });
}

// 開啟結帳視窗
function openCheckout() {
  var htmlLang = document.documentElement.lang || 'en';
  var locale = LOCALE_MAP[htmlLang] || 'en';

  Paddle.Checkout.open({
    items: [{ priceId: PADDLE_CONFIG.priceId, quantity: 1 }],
    settings: {
      displayMode: 'overlay',
      theme: 'light',
      locale: locale
    }
  });
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', initPaddle);
