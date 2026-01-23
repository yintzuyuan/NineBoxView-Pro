/**
 * Paddle Checkout Integration
 * NineBoxView Pro - 統一管理所有語言版本的結帳邏輯
 */

// Paddle 配置
const PADDLE_CONFIG = {
  token: 'live_bcd7ccbae67e2898f24a47b9021', // 你的 Paddle 公開 client-side token
  priceId: 'pri_01kbn8p26p62k3sv8tnbqg5kgc',  // NineBoxView Pro 的價格 ID
  environment: 'production'  // 可選 'sandbox' 或 'production'
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
    return;
  }
  Paddle.Environment.set(PADDLE_CONFIG.environment);
  Paddle.Initialize({
    token: PADDLE_CONFIG.token
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
document.addEventListener('DOMContentLoaded', function() {
  initPaddle();

  // 偵測 URL 參數，自動開啟結帳
  var params = new URLSearchParams(window.location.search);
  if (params.get('checkout') === 'true') {
    // 等待 Paddle 初始化完成
    setTimeout(openCheckout, 500);
  }
});
