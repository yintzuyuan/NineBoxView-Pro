/**
 * Hero Panels Component
 * 子面板互動邏輯
 */

(function () {
    'use strict';

    /**
     * Initialize hero panels for a workspace
     * @param {HTMLElement} workspace - The .hero-workspace element
     */
    function initHeroPanels(workspace) {
        const lang = workspace.dataset.lang || 'en';
        const heroComponent = workspace.querySelector('.interactive-hero');

        // Get preset data for this language
        const presetData = (typeof HERO_PRESETS !== 'undefined' && HERO_PRESETS[lang])
            ? HERO_PRESETS[lang]
            : HERO_PRESETS['zh-Hant'];

        // Panel elements
        const presetsPanel = workspace.querySelector('[data-panel="presets"]');
        const referencePanel = workspace.querySelector('[data-panel="reference"]');
        const lockedPanel = workspace.querySelector('[data-panel="locked"]');

        // Toolbar toggle buttons
        const toggleButtons = workspace.querySelectorAll('[data-toggle]');

        // Current state - 分開追蹤兩個分頁的選取索引
        let currentTab = 'ref';
        let selectedRefIndex = 0;
        let selectedLockedIndex = 0;
        let lockedVisible = true;

        /**
         * Populate preset list based on current tab
         */
        function populatePresetList() {
            const list = presetsPanel.querySelector('.hero-panel__list');
            if (!list) return;

            const items = currentTab === 'ref' ? presetData.reference : presetData.locked;

            // Clear existing items using DOM methods
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            const currentIndex = currentTab === 'ref' ? selectedRefIndex : selectedLockedIndex;
            items.forEach((item, index) => {
                const li = document.createElement('div');
                li.className = 'hero-panel__list-item';
                if (index === currentIndex) {
                    li.classList.add('hero-panel__list-item--selected');
                }

                // Display character content (not names) using textContent
                if (currentTab === 'ref') {
                    li.textContent = item.chars.join('');
                } else {
                    // For locked presets, format: 第一行·第二行·第三行，空位用 □，跳過中央(4)
                    const rows = [
                        [0, 1, 2],  // 第一行
                        [3, 5],     // 第二行（跳過中央 4）
                        [6, 7, 8]   // 第三行
                    ];
                    const formatted = rows.map(row =>
                        row.map(pos => item.positions[pos] || '□').join('')
                    ).join('・');
                    li.textContent = formatted;
                }

                // 單擊：選取項目（高亮）
                li.addEventListener('click', () => highlightPreset(index));
                // 雙擊：套用到主視窗
                li.addEventListener('dblclick', () => applyPreset(index));
                list.appendChild(li);
            });
        }

        /**
         * Highlight a preset (single click) - 只高亮，不更新面板
         * @param {number} index - Preset index
         */
        function highlightPreset(index) {
            if (currentTab === 'ref') {
                selectedRefIndex = index;
            } else {
                selectedLockedIndex = index;
            }
            populatePresetList();
        }

        /**
         * Apply a preset (double click) - 更新面板和主視窗
         * @param {number} index - Preset index
         */
        function applyPreset(index) {
            if (currentTab === 'ref') {
                selectedRefIndex = index;
                populatePresetList();
                updateReferencePanel();
                updateMainGridReference();
            } else {
                selectedLockedIndex = index;
                populatePresetList();
                updateLockedPanel();
                updateMainGridLocked();
            }
        }

        /**
         * Update Reference panel content
         */
        function updateReferencePanel() {
            const textarea = referencePanel.querySelector('.hero-panel__textarea');
            if (!textarea) return;

            const preset = presetData.reference[selectedRefIndex];
            if (preset) {
                textarea.value = preset.chars.join('');
            }
        }

        /**
         * Update Locked panel mini-grid cell backgrounds
         * 只更新背景色，不改變內容（用於系統顏色切換）
         */
        function updateLockedPanelColors() {
            const miniGrid = lockedPanel.querySelector('.hero-panel__mini-grid');
            if (!miniGrid) return;

            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            // 深色模式：filled 要比 empty 更暗（數值更小）
            const filledBg = isDark ? '#2d2d2d' : '#f0f0f0';

            const cells = miniGrid.querySelectorAll('.hero-panel__mini-cell:not(.hero-panel__mini-cell--center)');
            cells.forEach(cell => {
                const hasContent = cell.textContent.trim() !== '';
                // 有內容才套用 inline style，空格子回歸 CSS 預設
                cell.style.background = hasContent ? filledBg : '';
            });
        }

        /**
         * Update Locked panel mini-grid
         */
        function updateLockedPanel() {
            const miniGrid = lockedPanel.querySelector('.hero-panel__mini-grid');
            if (!miniGrid) return;

            const preset = presetData.locked[selectedLockedIndex];
            if (!preset) return;

            // Update non-center cells (always visible, empty cells show blank)
            const cells = miniGrid.querySelectorAll('.hero-panel__mini-cell:not(.hero-panel__mini-cell--center)');
            cells.forEach(cell => {
                const pos = parseInt(cell.dataset.position, 10);
                if (preset.positions[pos]) {
                    cell.textContent = preset.positions[pos];
                } else {
                    cell.textContent = '';
                }
            });

            // 套用背景色
            updateLockedPanelColors();
        }

        /**
         * Update main grid with reference characters (base layer)
         */
        function updateMainGridReference() {
            if (!heroComponent) return;

            const preset = presetData.reference[selectedRefIndex];
            if (!preset) return;

            const cells = heroComponent.querySelectorAll('.interactive-hero__cell:not(.interactive-hero__cell--center)');
            cells.forEach((cell, index) => {
                if (preset.chars[index]) {
                    // 設定參考字為 data 屬性，作為基底層
                    cell.dataset.refChar = preset.chars[index];
                    // 如果沒有鎖定字，顯示參考字
                    if (!cell.dataset.lockedChar) {
                        cell.textContent = preset.chars[index];
                    }
                }
            });
        }

        /**
         * Update main grid with locked characters (overlay on top of reference)
         */
        function updateMainGridLocked() {
            if (!heroComponent) return;

            const preset = presetData.locked[selectedLockedIndex];
            if (!preset) return;

            // Update cells based on locked positions
            const cells = heroComponent.querySelectorAll('.interactive-hero__cell:not(.interactive-hero__cell--center)');
            cells.forEach(cell => {
                const pos = parseInt(cell.dataset.position, 10);

                if (preset.positions[pos]) {
                    // 設定鎖定字，覆蓋參考字
                    cell.dataset.lockedChar = preset.positions[pos];
                    cell.textContent = preset.positions[pos];
                    cell.classList.add('interactive-hero__cell--locked');
                } else {
                    // 移除鎖定字，恢復顯示參考字
                    delete cell.dataset.lockedChar;
                    cell.classList.remove('interactive-hero__cell--locked');
                    if (cell.dataset.refChar) {
                        cell.textContent = cell.dataset.refChar;
                    }
                }
            });
        }

        /**
         * Switch tab in Presets panel
         * @param {string} tab - 'ref' or 'locked'
         */
        function switchTab(tab) {
            currentTab = tab;

            // Update tab buttons
            const tabs = presetsPanel.querySelectorAll('.hero-panel__tab');
            tabs.forEach(t => {
                t.classList.toggle('hero-panel__tab--active', t.dataset.tab === tab);
            });

            // 重新填充列表（保留各自的選取狀態）
            populatePresetList();
        }

        // 鎖定/解鎖圖示 SVG path (Phosphor Icons)
        const LOCK_ICON = 'M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z';
        const UNLOCK_ICON = 'M208,80H96V56a32,32,0,0,1,64,0,8,8,0,0,0,16,0,48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm0,128H48V96H208Z';

        /**
         * Toggle locked state (icon, button style, and main grid locked chars)
         */
        function toggleLockedVisibility() {
            lockedVisible = !lockedVisible;
            const centerCell = lockedPanel.querySelector('.hero-panel__mini-cell--center');

            // Update center button highlight state and icon
            if (centerCell) {
                centerCell.classList.toggle('hero-panel__mini-cell--locked', lockedVisible);
                const path = centerCell.querySelector('svg path');
                if (path) {
                    path.setAttribute('d', lockedVisible ? LOCK_ICON : UNLOCK_ICON);
                }
            }

            // Toggle main grid locked characters visibility
            if (heroComponent) {
                const cells = heroComponent.querySelectorAll('.interactive-hero__cell:not(.interactive-hero__cell--center)');
                cells.forEach(cell => {
                    if (cell.dataset.lockedChar) {
                        if (lockedVisible) {
                            // 鎖定：顯示鎖定字
                            cell.textContent = cell.dataset.lockedChar;
                        } else {
                            // 解鎖：恢復顯示參考字，沒有則清空
                            cell.textContent = cell.dataset.refChar || '';
                        }
                    }
                });
            }
        }

        /**
         * Initialize center button locked state
         */
        function initLockedButtonState() {
            const centerCell = lockedPanel.querySelector('.hero-panel__mini-cell--center');
            if (centerCell && lockedVisible) {
                centerCell.classList.add('hero-panel__mini-cell--locked');
            }
        }

        /**
         * Clear locked panel cells (initial state)
         */
        function clearLockedPanel() {
            const miniGrid = lockedPanel.querySelector('.hero-panel__mini-grid');
            if (!miniGrid) return;

            const cells = miniGrid.querySelectorAll('.hero-panel__mini-cell:not(.hero-panel__mini-cell--center)');
            cells.forEach(cell => {
                cell.textContent = '';
                cell.style.background = '';  // 清除 inline style，回歸 CSS 預設
            });
        }

        /**
         * Toggle panel visibility (use class to preserve layout)
         * @param {string} panelType - 'presets', 'locked', or 'reference'
         */
        function togglePanel(panelType) {
            let panel;
            switch (panelType) {
                case 'presets':
                    panel = presetsPanel;
                    break;
                case 'locked':
                    panel = lockedPanel;
                    break;
                case 'reference':
                    panel = referencePanel;
                    break;
            }

            if (panel) {
                const isHidden = panel.classList.contains('hero-panel--hidden');
                panel.classList.toggle('hero-panel--hidden', !isHidden);

                // Update toggle button state
                const btn = workspace.querySelector(`[data-toggle="${panelType}"]`);
                if (btn) {
                    btn.classList.toggle('interactive-hero__icon-btn--active', isHidden);
                }
            }
        }

        /**
         * Set panel focus state (colored traffic lights)
         * @param {HTMLElement} panel - Panel element to focus
         */
        function setFocusedPanel(panel) {
            // Remove focus from all panels
            workspace.querySelectorAll('.hero-panel').forEach(p => {
                p.classList.remove('hero-panel--focused');
            });

            // Add focus to clicked panel
            if (panel) {
                panel.classList.add('hero-panel--focused');
            }
        }

        // Event: Tab switching
        const tabs = presetsPanel.querySelectorAll('.hero-panel__tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.stopPropagation();
                switchTab(tab.dataset.tab);
            });
        });

        // Event: Locked center cell click (toggle visibility)
        const lockedCenterCell = lockedPanel.querySelector('.hero-panel__mini-cell--center');
        if (lockedCenterCell) {
            lockedCenterCell.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleLockedVisibility();
            });
        }

        // Event: Panel toggle buttons
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePanel(btn.dataset.toggle);
            });
        });

        // Event: Panel focus
        [presetsPanel, referencePanel, lockedPanel].forEach(panel => {
            if (panel) {
                panel.addEventListener('click', () => {
                    setFocusedPanel(panel);
                });
            }
        });

        // Event: Click outside panels to remove focus
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.hero-panel')) {
                setFocusedPanel(null);
            }
        });

        // Initial population (只填充列表，不自動套用到面板)
        populatePresetList();

        // Initialize locked button state
        initLockedButtonState();

        // 清空鎖定字面板（初始狀態應為空白）
        clearLockedPanel();

        // 監聽系統深淺模式變化，自動更新鎖定格背景色
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLockedPanelColors);

        // Set initial focus to presets panel
        if (presetsPanel) {
            presetsPanel.classList.add('hero-panel--focused');
        }
    }

    /**
     * Initialize all hero workspaces on the page
     */
    function initAllWorkspaces() {
        const workspaces = document.querySelectorAll('.hero-workspace');
        workspaces.forEach(initHeroPanels);
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllWorkspaces);
    } else {
        initAllWorkspaces();
    }

})();
