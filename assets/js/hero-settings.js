/**
 * Hero Settings Module
 * 模擬工具設定持久化管理
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'nineboxview-hero-settings';

    const DEFAULT_SETTINGS = {
        theme: 'light',
        blur: 0,
        panels: {
            presets: true,
            locked: true,
            reference: true
        }
    };

    /**
     * Get all settings (with defaults for missing keys)
     * @returns {Object} Current settings
     */
    function get() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return { ...DEFAULT_SETTINGS };
            }
            const parsed = JSON.parse(stored);
            // Merge with defaults to handle missing keys
            return {
                theme: parsed.theme ?? DEFAULT_SETTINGS.theme,
                blur: parsed.blur ?? DEFAULT_SETTINGS.blur,
                panels: {
                    presets: parsed.panels?.presets ?? DEFAULT_SETTINGS.panels.presets,
                    locked: parsed.panels?.locked ?? DEFAULT_SETTINGS.panels.locked,
                    reference: parsed.panels?.reference ?? DEFAULT_SETTINGS.panels.reference
                }
            };
        } catch (e) {
            return { ...DEFAULT_SETTINGS };
        }
    }

    /**
     * Save a single setting
     * @param {string} key - Setting key (e.g., 'theme', 'blur', 'panels.presets')
     * @param {*} value - Setting value
     */
    function save(key, value) {
        try {
            const settings = get();

            // Handle nested keys like 'panels.presets'
            if (key.startsWith('panels.')) {
                const panelKey = key.split('.')[1];
                settings.panels[panelKey] = value;
            } else {
                settings[key] = value;
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (e) {
            // Silent fail for localStorage errors
        }
    }

    // Expose global API
    window.HeroSettings = {
        get: get,
        save: save
    };

})();
