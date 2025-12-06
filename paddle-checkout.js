/**
 * Paddle Checkout Integration
 * NineBoxView Pro - 統一管理所有語言版本的結帳邏輯
 */

// Paddle 配置
const PADDLE_CONFIG = {
  token: 'live_bcd7ccbae67e2898f24a47b9021',
  priceId: 'pri_01kbn8p26p62k3sv8tnbqg5kgc'
};

// 語言對應表（HTML lang 屬性 → Paddle locale）
const LOCALE_MAP = {
  'zh-Hant': 'zh',
  'zh-Hans': 'zh',
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
  Paddle.Initialize({ token: PADDLE_CONFIG.token });
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
