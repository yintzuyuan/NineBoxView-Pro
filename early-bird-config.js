/**
 * NineBoxView Pro 早鳥優惠配置
 * 統一管理截止時間、Price ID 和多語言文案
 */
const EARLY_BIRD_CONFIG = {
  // 早鳥截止時間（UTC）= 台北時間 2026-02-28 23:59:59
  deadline: new Date('2026-02-28T15:59:59Z'),

  // Paddle Price ID
  priceIds: {
    earlyBird: 'pri_01kbn8p26p62k3sv8tnbqg5kgc',  // 早鳥價
    regular: 'pri_01kfq45n0w5qnj2zztdnxxhc36'     // 原價
  },

  // 多語言文案
  i18n: {
    'zh-Hant': {
      topbarText: '✦ 早鳥優惠至 2/28 — 試用滿意後可享優惠價格',
      checkoutSubtitle: '🎉 早鳥優惠 · 至 2026/2/28',
      expired: '早鳥優惠已結束',
      finalCtaLabel: '已經試用過？',
      finalCtaBuy: '立即購買 · 早鳥優惠'
    },
    'zh-Hans': {
      topbarText: '✦ 早鸟优惠至 2/28 — 试用满意后可享优惠价格',
      checkoutSubtitle: '🎉 早鸟优惠 · 至 2026/2/28',
      expired: '早鸟优惠已结束',
      finalCtaLabel: '已经试用过？',
      finalCtaBuy: '立即购买 · 早鸟优惠'
    },
    'en': {
      topbarText: '✦ Early bird offer until 2/28 — Try first, then enjoy the discount',
      checkoutSubtitle: '🎉 Early Bird Offer · Until 2026/2/28',
      expired: 'Early bird offer has ended',
      finalCtaLabel: 'Already tried it?',
      finalCtaBuy: 'Buy Now · Early Bird'
    },
    'ja': {
      topbarText: '✦ アーリーバード特典 2/28まで — お試し後、特別価格でご購入いただけます',
      checkoutSubtitle: '🎉 アーリーバード特典 · 2026/2/28まで',
      expired: 'アーリーバード特典は終了しました',
      finalCtaLabel: 'すでにお試し済みですか？',
      finalCtaBuy: '今すぐ購入 · 特別価格'
    },
    'ko': {
      topbarText: '✦ 얼리버드 혜택 2/28까지 — 체험 후 할인가로 구매하세요',
      checkoutSubtitle: '🎉 얼리버드 혜택 · 2026/2/28까지',
      expired: '얼리버드 혜택이 종료되었습니다',
      finalCtaLabel: '이미 체험하셨나요?',
      finalCtaBuy: '지금 구매 · 얼리버드'
    }
  }
};

/**
 * 檢查早鳥優惠是否仍在進行中
 * @returns {boolean}
 */
function isEarlyBirdActive() {
  return new Date() < EARLY_BIRD_CONFIG.deadline;
}

/**
 * 取得當前應使用的 Price ID
 * @returns {string}
 */
function getCurrentPriceId() {
  return isEarlyBirdActive()
    ? EARLY_BIRD_CONFIG.priceIds.earlyBird
    : EARLY_BIRD_CONFIG.priceIds.regular;
}

/**
 * 計算剩餘時間
 * @returns {Object|null} { days, hours, minutes, seconds } 或 null（已過期）
 */
function getTimeRemaining() {
  const now = new Date();
  const diff = EARLY_BIRD_CONFIG.deadline - now;

  if (diff <= 0) {
    return null;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

/**
 * 取得指定語言的文案
 * @param {string} lang - 語言代碼
 * @returns {Object}
 */
function getEarlyBirdI18n(lang) {
  return EARLY_BIRD_CONFIG.i18n[lang] || EARLY_BIRD_CONFIG.i18n['en'];
}

// 支援 ES Module 和傳統 script 載入
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EARLY_BIRD_CONFIG,
    isEarlyBirdActive,
    getCurrentPriceId,
    getTimeRemaining,
    getEarlyBirdI18n
  };
}
