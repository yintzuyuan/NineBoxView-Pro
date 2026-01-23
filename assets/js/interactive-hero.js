/**
 * Interactive Hero Component
 * 九宮格互動 Hero 元件邏輯
 */

(function () {
    'use strict';

    /**
     * Fisher-Yates Shuffle Algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array} - Shuffled array (new array, does not mutate original)
     */
    function shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    /**
     * Get random characters from pool
     * If pool has fewer than 8 characters, ensure each appears at least once
     * @param {Array} pool - Character pool
     * @param {number} count - Number of characters to pick (should be 8)
     * @returns {Array} - Random characters
     */
    function getRandomChars(pool, count) {
        if (pool.length >= count) {
            // Pool has enough characters, use standard shuffle
            const shuffled = shuffle(pool);
            return shuffled.slice(0, count);
        } else {
            // Pool has fewer characters than needed
            // Ensure each character appears at least once, then fill remaining slots
            const result = [...pool]; // Start with all characters
            const remaining = count - pool.length;

            // Fill remaining slots by randomly picking from pool
            for (let i = 0; i < remaining; i++) {
                const randomChar = pool[Math.floor(Math.random() * pool.length)];
                result.push(randomChar);
            }

            // Shuffle the result to randomize positions
            return shuffle(result);
        }
    }

    /**
     * Initialize an interactive hero component
     * @param {HTMLElement} container - The .interactive-hero element
     */
    function initHero(container) {
        const lang = container.dataset.lang || 'en';
        const grid = container.querySelector('.interactive-hero__grid');
        const cells = container.querySelectorAll('.interactive-hero__cell');
        const themeToggle = container.querySelector('.interactive-hero__theme-toggle');
        const blurSlider = container.querySelector('.interactive-hero__blur-slider');

        // Get character data for this language
        // Fallback to zh-Hant if language not found (e.g., English uses Traditional Chinese characters)
        const charData = (typeof HERO_CHARACTERS !== 'undefined' && HERO_CHARACTERS[lang])
            ? HERO_CHARACTERS[lang]
            : HERO_CHARACTERS['zh-Hant'];

        const presetData = (typeof HERO_PRESETS !== 'undefined' && HERO_PRESETS[lang])
            ? HERO_PRESETS[lang]
            : HERO_PRESETS['zh-Hant'];

        const centerChar = charData.center;
        // 使用第一組參考字作為字池
        const charPool = presetData.reference[0].chars;

        /**
         * Populate the grid with characters
         */
        function populateGrid() {
            // Get 8 random characters for surrounding cells
            const surroundingChars = getRandomChars(charPool, 8);
            let surroundingIndex = 0;

            cells.forEach((cell, index) => {
                if (index === 4) {
                    // Center cell
                    cell.textContent = centerChar;
                } else {
                    cell.textContent = surroundingChars[surroundingIndex];
                    cell.dataset.refChar = surroundingChars[surroundingIndex];
                    surroundingIndex++;
                }
            });
        }

        /**
         * Shuffle surrounding characters (no animation)
         * Respects locked characters - they remain fixed (only when locked is enabled)
         */
        function shuffleChars() {
            // Check if locked mode is enabled by checking the lock button state
            const lockButton = document.querySelector('.hero-panel__mini-cell--center');
            const lockedEnabled = lockButton && lockButton.classList.contains('hero-panel__mini-cell--locked');

            // Collect current reference characters from non-locked cells
            const currentRefChars = [];
            cells.forEach((cell, index) => {
                if (index !== 4) {
                    const isLocked = lockedEnabled && cell.dataset.lockedChar;
                    if (!isLocked && cell.dataset.refChar) {
                        currentRefChars.push(cell.dataset.refChar);
                    }
                }
            });

            // Shuffle the collected characters
            const shuffledChars = shuffle([...currentRefChars]);
            let shuffleIndex = 0;

            cells.forEach((cell, index) => {
                if (index !== 4) {
                    const isLocked = lockedEnabled && cell.dataset.lockedChar;
                    if (isLocked) {
                        return;
                    }
                    // Update character and refChar data attribute
                    const newChar = shuffledChars[shuffleIndex];
                    cell.textContent = newChar;
                    cell.dataset.refChar = newChar;
                    shuffleIndex++;
                }
            });
        }

        /**
         * Toggle dark/light theme
         */
        function toggleTheme() {
            const currentTheme = container.dataset.theme;
            container.dataset.theme = currentTheme === 'dark' ? 'light' : 'dark';
        }

        /**
         * Update blur amount
         * @param {number} value - Blur value (0-10)
         */
        function updateBlur(value) {
            const blurPx = value * 1; // 1px per step
            container.style.setProperty('--blur-amount', `${blurPx}px`);
        }

        // Initial population
        populateGrid();

        // Event: Click grid to shuffle
        grid.addEventListener('click', shuffleChars);

        // Event: Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevent grid click
                toggleTheme();
            });
        }

        // Event: Blur slider
        if (blurSlider) {
            blurSlider.addEventListener('input', function (e) {
                e.stopPropagation(); // Prevent grid click
                updateBlur(parseFloat(this.value));
            });

            // Prevent click propagation on slider
            blurSlider.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }

        // Prevent controls bar from triggering shuffle
        const controls = container.querySelector('.interactive-hero__controls');
        if (controls) {
            controls.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }
    }

    /**
     * Initialize all interactive hero components on the page
     */
    function initAllHeroes() {
        const heroes = document.querySelectorAll('.interactive-hero');
        heroes.forEach(initHero);
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllHeroes);
    } else {
        initAllHeroes();
    }

})();
