/**
 * NineBoxView Pro - i18n Language Detection and Switching
 *
 * Detection Priority:
 * 1. URL parameter ?lang=xx (from erikyin.net linking)
 * 2. localStorage saved user preference
 * 3. Browser language (navigator.language)
 * 4. Default: Traditional Chinese (zh-Hant)
 *
 * Language Mapping:
 * zh-TW, zh-Hant → / (Traditional Chinese, default)
 * en             → /en/
 * zh-CN, zh-Hans → /zh-Hans/
 * ja             → /ja/
 * ko             → /ko/
 */

(function() {
  'use strict';

  // Language configuration
  const LANG_CONFIG = {
    'zh-Hant': { path: './', aliases: ['zh-TW', 'zh-Hant', 'zh'] },
    'en': { path: './en/', aliases: ['en', 'en-US', 'en-GB', 'en-AU'] },
    'zh-Hans': { path: './zh-Hans/', aliases: ['zh-CN', 'zh-Hans', 'zh-SG'] },
    'ja': { path: './ja/', aliases: ['ja', 'ja-JP'] },
    'ko': { path: './ko/', aliases: ['ko', 'ko-KR'] }
  };

  const DEFAULT_LANG = 'zh-Hant';
  const STORAGE_KEY = 'nineboxview_lang';

  /**
   * Get the base path for the website (handles GitHub Pages subdirectory)
   */
  function getBasePath() {
    const path = window.location.pathname;
    // Find the docs/ directory or root
    const docsIndex = path.indexOf('/docs/');
    if (docsIndex !== -1) {
      return path.substring(0, docsIndex + 6); // Include '/docs/'
    }
    // For local file:// protocol or root deployment
    return path.substring(0, path.lastIndexOf('/') + 1).replace(/\/(en|zh-Hans|ja|ko)\/$/, '/');
  }

  /**
   * Get the current page language from URL
   */
  function getCurrentLangFromUrl() {
    const path = window.location.pathname;
    if (path.includes('/en/')) return 'en';
    if (path.includes('/zh-Hans/')) return 'zh-Hans';
    if (path.includes('/ja/')) return 'ja';
    if (path.includes('/ko/')) return 'ko';
    return 'zh-Hant'; // Default (root path)
  }

  /**
   * Detect preferred language from various sources
   */
  function detectPreferredLanguage() {
    // 1. Check URL parameter (highest priority - from erikyin.net)
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam) {
      const normalizedLang = normalizeLangCode(langParam);
      if (normalizedLang) {
        // Save preference
        localStorage.setItem(STORAGE_KEY, normalizedLang);
        return normalizedLang;
      }
    }

    // 2. Check localStorage
    const storedLang = localStorage.getItem(STORAGE_KEY);
    if (storedLang && LANG_CONFIG[storedLang]) {
      return storedLang;
    }

    // 3. Check browser languages (iterate through user's preferred languages)
    const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage];
    for (const langCode of browserLangs) {
      const normalizedLang = normalizeLangCode(langCode);
      if (normalizedLang) {
        return normalizedLang;
      }
    }

    // 4. Default to Traditional Chinese
    return DEFAULT_LANG;
  }

  /**
   * Normalize various language codes to our supported languages
   */
  function normalizeLangCode(code) {
    if (!code) return null;

    const lowerCode = code.toLowerCase();

    for (const [lang, config] of Object.entries(LANG_CONFIG)) {
      for (const alias of config.aliases) {
        if (lowerCode === alias.toLowerCase() || lowerCode.startsWith(alias.toLowerCase() + '-')) {
          return lang;
        }
      }
    }

    // Special handling for generic 'zh' - default to Traditional Chinese
    if (lowerCode === 'zh' || lowerCode.startsWith('zh-')) {
      return DEFAULT_LANG;
    }

    return null;
  }

  /**
   * Redirect to the appropriate language version
   */
  function redirectToLanguage(targetLang) {
    const currentLang = getCurrentLangFromUrl();

    if (currentLang === targetLang) {
      return; // Already on correct language
    }

    const basePath = getBasePath();
    const config = LANG_CONFIG[targetLang];

    if (!config) return;

    // Build new URL using LANG_CONFIG path
    const relativePath = config.path.startsWith('./') ? config.path.substring(2) : config.path;
    const newPath = basePath + relativePath + 'index.html';

    // Preserve hash if any
    const hash = window.location.hash;

    // Redirect
    window.location.href = newPath + hash;
  }

  /**
   * Save language preference
   */
  function saveLanguagePreference(lang) {
    if (LANG_CONFIG[lang]) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  /**
   * Initialize language detection and potential redirect
   * Only redirect on first visit (no stored preference) or when ?lang= is present
   */
  function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const hasLangParam = urlParams.has('lang');
    const hasStoredPref = localStorage.getItem(STORAGE_KEY);
    const currentLang = getCurrentLangFromUrl();

    // If ?lang= parameter is present, always redirect
    if (hasLangParam) {
      const preferredLang = detectPreferredLanguage();
      if (preferredLang !== currentLang) {
        // Clean URL (remove ?lang= parameter) and redirect
        urlParams.delete('lang');
        const cleanSearch = urlParams.toString();
        const newUrl = window.location.pathname + (cleanSearch ? '?' + cleanSearch : '') + window.location.hash;
        history.replaceState(null, '', newUrl);
        redirectToLanguage(preferredLang);
        return;
      }
    }

    // If no stored preference and not on detected language, redirect
    if (!hasStoredPref) {
      const preferredLang = detectPreferredLanguage();
      if (preferredLang !== currentLang) {
        redirectToLanguage(preferredLang);
        return;
      }
    }

    // Save current language as preference (user explicitly navigated here)
    saveLanguagePreference(currentLang);
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for debugging
  window.NineBoxI18n = {
    detectPreferredLanguage,
    getCurrentLangFromUrl,
    redirectToLanguage,
    saveLanguagePreference,
    LANG_CONFIG
  };
})();
