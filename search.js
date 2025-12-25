/**
 * NineBoxView Pro - Guide Search
 *
 * 使用 Fuse.js 實現的客戶端搜尋功能
 * 支援 Cmd+K / Ctrl+K 快捷鍵
 */

(function () {
  'use strict';

  // 配置
  const CONFIG = {
    debounceMs: 150,
    maxResults: 15,
    minQueryLength: 2
  };

  // 狀態
  let fuse = null;
  let isModalOpen = false;
  let selectedIndex = 0;

  // DOM 元素
  let modal, input, resultsList, noResults;

  // 多語言文字
  const TEXTS = {
    'zh-Hant': {
      placeholder: '搜尋說明書...',
      noResults: '找不到相關結果',
      navigate: '導航',
      select: '選擇'
    },
    'en': {
      placeholder: 'Search guide...',
      noResults: 'No results found',
      navigate: 'Navigate',
      select: 'Select'
    },
    'zh-Hans': {
      placeholder: '搜索说明书...',
      noResults: '未找到相关结果',
      navigate: '导航',
      select: '选择'
    },
    'ja': {
      placeholder: 'ガイドを検索...',
      noResults: '結果が見つかりません',
      navigate: 'ナビゲート',
      select: '選択'
    },
    'ko': {
      placeholder: '가이드 검색...',
      noResults: '결과를 찾을 수 없습니다',
      navigate: '탐색',
      select: '선택'
    }
  };

  /**
   * 取得當前語系
   */
  function getCurrentLocale() {
    const path = window.location.pathname;
    if (path.includes('/en/')) return 'en';
    if (path.includes('/zh-Hans/')) return 'zh-Hans';
    if (path.includes('/ja/')) return 'ja';
    if (path.includes('/ko/')) return 'ko';
    return 'zh-Hant';
  }

  /**
   * 取得文字
   */
  function getText(key) {
    const locale = getCurrentLocale();
    return TEXTS[locale]?.[key] || TEXTS['en'][key];
  }

  /**
   * 取得搜尋索引路徑
   */
  function getIndexPath() {
    // 索引檔案與 HTML 頁面在同一目錄
    return 'search-index.json';
  }

  /**
   * 初始化
   */
  function init() {
    createModal();
    bindKeyboardShortcuts();
    bindSearchTrigger();
    loadSearchIndex();
  }

  /**
   * 綁定側邊欄搜尋按鈕
   */
  function bindSearchTrigger() {
    const trigger = document.querySelector('.search-trigger');
    if (trigger) {
      trigger.addEventListener('click', openModal);
    }
  }

  /**
   * 載入搜尋索引（使用內嵌在 HTML 中的索引）
   */
  function loadSearchIndex() {
    const data = window.SEARCH_INDEX;

    if (!data || !Array.isArray(data)) {
      console.warn('[Search] No search index found');
      return;
    }

    console.log('[Search] Loaded', data.length, 'entries');

    // 初始化 Fuse.js
    fuse = new Fuse(data, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'content', weight: 1 }
      ],
      threshold: 0.3,
      ignoreLocation: true,
      includeMatches: true
    });

    console.log('[Search] Fuse.js initialized');
  }

  /**
   * 建立 Modal DOM
   */
  function createModal() {
    modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
      <div class="search-modal__backdrop"></div>
      <div class="search-modal__container">
        <div class="search-modal__header">
          <svg class="search-modal__icon" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
          <input type="text"
                 class="search-modal__input"
                 placeholder="${getText('placeholder')}"
                 autocomplete="off"
                 spellcheck="false">
          <kbd class="search-modal__shortcut">ESC</kbd>
        </div>
        <div class="search-modal__results">
          <ul class="search-results"></ul>
          <div class="search-no-results" style="display:none;">
            ${getText('noResults')}
          </div>
        </div>
        <div class="search-modal__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> ${getText('navigate')}</span>
          <span><kbd>Enter</kbd> ${getText('select')}</span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // 取得元素引用
    input = modal.querySelector('.search-modal__input');
    resultsList = modal.querySelector('.search-results');
    noResults = modal.querySelector('.search-no-results');

    // 綁定事件
    modal.querySelector('.search-modal__backdrop').addEventListener('click', closeModal);
    input.addEventListener('input', debounce(handleInput, CONFIG.debounceMs));
    input.addEventListener('keydown', handleResultNavigation);
  }

  /**
   * 綁定鍵盤快捷鍵
   */
  function bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Cmd+K (macOS) 或 Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleModal();
      }

      // ESC 關閉
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    });
  }

  /**
   * 處理輸入
   */
  function handleInput(e) {
    const query = e.target.value.trim();

    if (!fuse || query.length < CONFIG.minQueryLength) {
      resultsList.innerHTML = '';
      noResults.style.display = 'none';
      return;
    }

    const results = fuse.search(query).slice(0, CONFIG.maxResults);
    renderResults(results, query);
  }

  /**
   * 渲染搜尋結果
   */
  function renderResults(results, query) {
    if (results.length === 0) {
      resultsList.innerHTML = '';
      noResults.style.display = 'block';
      return;
    }

    noResults.style.display = 'none';
    selectedIndex = 0;

    resultsList.innerHTML = results.map((result, index) => {
      const item = result.item;
      return `
        <li class="search-result ${index === 0 ? 'search-result--selected' : ''}"
            data-url="${item.page}${item.anchor}">
          <div class="search-result__page">${item.pageTitle}</div>
          <div class="search-result__title">${highlightMatch(item.title, query)}</div>
          <div class="search-result__preview">${getPreview(item.content, query)}</div>
        </li>
      `;
    }).join('');

    // 綁定點擊事件
    resultsList.querySelectorAll('.search-result').forEach(item => {
      item.addEventListener('click', () => navigateToResult(item.dataset.url));
    });
  }

  /**
   * 鍵盤導航
   */
  function handleResultNavigation(e) {
    const results = resultsList.querySelectorAll('.search-result');
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
      updateSelection(results);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelection(results);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) navigateToResult(selected.dataset.url);
    }
  }

  /**
   * 更新選擇狀態
   */
  function updateSelection(results) {
    results.forEach((r, i) => {
      r.classList.toggle('search-result--selected', i === selectedIndex);
    });
    results[selectedIndex]?.scrollIntoView({ block: 'nearest' });
  }

  /**
   * 導航到結果頁面
   */
  function navigateToResult(url) {
    closeModal();
    window.location.href = url;
  }

  /**
   * 開關 Modal
   */
  function toggleModal() {
    isModalOpen ? closeModal() : openModal();
  }

  function openModal() {
    modal.classList.add('search-modal--open');
    isModalOpen = true;
    input.value = '';
    resultsList.innerHTML = '';
    noResults.style.display = 'none';
    selectedIndex = 0;
    setTimeout(() => input.focus(), 50);
  }

  function closeModal() {
    modal.classList.remove('search-modal--open');
    isModalOpen = false;
  }

  // === 工具函式 ===

  function debounce(fn, ms) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), ms);
    };
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }

  function getPreview(content, query, maxLength = 120) {
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);

    if (index === -1) {
      return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
    }

    const start = Math.max(0, index - 30);
    const end = Math.min(content.length, index + query.length + 90);
    let preview = content.slice(start, end);

    if (start > 0) preview = '...' + preview;
    if (end < content.length) preview = preview + '...';

    return highlightMatch(preview, query);
  }

  // 頁面載入後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 公開 API
  window.NineBoxSearch = { openModal, closeModal };
})();
