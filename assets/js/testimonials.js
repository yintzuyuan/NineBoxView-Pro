/**
 * 證言池隨機載入模組
 * 從 JSON 載入證言資料，使用 Fisher-Yates 洗牌演算法隨機排列
 */

// 根據頁面路徑判斷資源路徑前綴
function getBasePath() {
  const path = window.location.pathname;
  // 如果在語言子目錄中（如 /zh-Hant/），需要往上一層
  if (path.includes('/zh-Hant/') || path.includes('/zh-Hans/') || path.includes('/en/') || path.includes('/ja/') || path.includes('/ko/')) {
    return '..';
  }
  return '.';
}

/**
 * Fisher-Yates 洗牌演算法
 * @param {Array} array - 要洗牌的陣列
 * @returns {Array} - 洗牌後的新陣列
 */
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 建立單個證言卡片元素
 * 使用安全的 DOM API 避免 XSS 風險
 * @param {Object} t - 證言資料物件
 * @param {string} basePath - 資源路徑前綴
 * @returns {HTMLElement} - 證言卡片元素
 */
function createTestimonialCard(t, basePath) {
  const article = document.createElement('article');
  article.className = 'testimonial';
  article.setAttribute('lang', t.lang);

  // Avatar wrapper
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'testimonial__avatar-wrapper';

  const picture = document.createElement('picture');

  // WebP source
  const source = document.createElement('source');
  source.srcset = `${basePath}/assets/avatars/${t.avatar}`;
  source.type = 'image/webp';

  // Fallback image（根據 id 查詢原始格式）
  const img = document.createElement('img');
  const fallbackExtMap = { user01: 'png' };
  const fallbackExt = fallbackExtMap[t.id] || 'jpg';
  img.src = `${basePath}/assets/avatars/${t.id}.${fallbackExt}`;
  img.alt = t.name;
  img.className = 'testimonial__avatar';
  img.loading = 'lazy';
  img.width = 80;
  img.height = 80;

  picture.appendChild(source);
  picture.appendChild(img);
  avatarWrapper.appendChild(picture);

  // Quote blockquote
  const blockquote = document.createElement('blockquote');
  blockquote.className = 'testimonial__quote';

  const quoteContent = document.createElement('p');
  quoteContent.className = 'testimonial__content';
  quoteContent.textContent = `"${t.quote}"`;
  blockquote.appendChild(quoteContent);

  // Author footer
  const footer = document.createElement('footer');
  footer.className = 'testimonial__author';

  const name = document.createElement('p');
  name.className = 'testimonial__name';
  name.textContent = t.name;

  const role = document.createElement('p');
  role.className = 'testimonial__role';
  role.textContent = t.role;

  const company = document.createElement('p');
  company.className = 'testimonial__company';
  company.textContent = t.company;

  footer.appendChild(name);
  footer.appendChild(role);
  footer.appendChild(company);

  // 組裝卡片
  article.appendChild(avatarWrapper);
  article.appendChild(blockquote);
  article.appendChild(footer);

  return article;
}

/**
 * 渲染證言列表到 DOM
 * @param {Array} testimonials - 證言資料陣列
 * @param {string} basePath - 資源路徑前綴
 */
function renderTestimonials(testimonials, basePath) {
  const grid = document.querySelector('.testimonials__grid');
  if (!grid) {
    return;
  }

  // 清空現有內容
  grid.replaceChildren();

  // 建立並插入卡片
  testimonials.forEach(t => {
    grid.appendChild(createTestimonialCard(t, basePath));
  });
}

/**
 * 載入並顯示證言
 * 從 JSON 檔案載入資料，隨機排列後顯示
 */
async function loadTestimonials() {
  const basePath = getBasePath();

  try {
    const response = await fetch(`${basePath}/assets/data/testimonials.json`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.testimonials || !Array.isArray(data.testimonials)) {
      throw new Error('無效的證言資料格式');
    }

    // 洗牌
    const shuffled = shuffle(data.testimonials);

    // 取前 3 筆顯示（若不足 3 筆則全部顯示）
    const displayCount = Math.min(3, shuffled.length);
    const selected = shuffled.slice(0, displayCount);

    renderTestimonials(selected, basePath);

  } catch (error) {
    // 載入失敗時保留原有 HTML 內容（如果有的話）
  }
}

// DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', loadTestimonials);
