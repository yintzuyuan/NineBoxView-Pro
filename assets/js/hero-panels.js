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

        // Current state
        let currentTab = 'ref';
        let selectedPresetIndex = 0;
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

            items.forEach((item, index) => {
                const li = document.createElement('div');
                li.className = 'hero-panel__list-item';
                if (index === selectedPresetIndex) {
                    li.classList.add('hero-panel__list-item--selected');
                }

                // Display character content (not names) using textContent
                if (currentTab === 'ref') {
                    li.textContent = item.chars.join('');
                } else {
                    // For locked presets, show positions
                    const positions = Object.values(item.positions);
                    li.textContent = positions.join('');
                }

                li.addEventListener('click', () => selectPreset(index));
                list.appendChild(li);
            });
        }

        /**
         * Select a preset and update panels
         * @param {number} index - Preset index
         */
        function selectPreset(index) {
            selectedPresetIndex = index;
            populatePresetList();

            if (currentTab === 'ref') {
                updateReferencePanel();
                updateMainGridReference();
            } else {
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

            const preset = presetData.reference[selectedPresetIndex];
            if (preset) {
                textarea.value = preset.chars.join('');
            }
        }

        /**
         * Update Locked panel mini-grid
         */
        function updateLockedPanel() {
            const miniGrid = lockedPanel.querySelector('.hero-panel__mini-grid');
            if (!miniGrid) return;

            const preset = presetData.locked[selectedPresetIndex];
            if (!preset) return;

            // Update non-center cells
            const cells = miniGrid.querySelectorAll('.hero-panel__mini-cell:not(.hero-panel__mini-cell--center)');
            cells.forEach(cell => {
                const pos = parseInt(cell.dataset.position, 10);
                if (preset.positions[pos]) {
                    cell.textContent = preset.positions[pos];
                    cell.classList.remove('hero-panel__mini-cell--empty');
                } else {
                    cell.textContent = '';
                    cell.classList.add('hero-panel__mini-cell--empty');
                }
            });
        }

        /**
         * Update main grid with reference characters
         */
        function updateMainGridReference() {
            if (!heroComponent) return;

            const preset = presetData.reference[selectedPresetIndex];
            if (!preset) return;

            const cells = heroComponent.querySelectorAll('.interactive-hero__cell:not(.interactive-hero__cell--center)');
            cells.forEach((cell, index) => {
                if (preset.chars[index]) {
                    cell.textContent = preset.chars[index];
                }
            });
        }

        /**
         * Update main grid with locked characters
         */
        function updateMainGridLocked() {
            if (!heroComponent) return;

            const preset = presetData.locked[selectedPresetIndex];
            if (!preset) return;

            // Update cells based on locked positions
            const cells = heroComponent.querySelectorAll('.interactive-hero__cell');
            cells.forEach(cell => {
                const pos = parseInt(cell.dataset.position, 10);
                // Skip center cell (position 4)
                if (pos === 4) return;

                if (preset.positions[pos]) {
                    cell.textContent = preset.positions[pos];
                    cell.classList.add('interactive-hero__cell--locked');
                } else {
                    cell.classList.remove('interactive-hero__cell--locked');
                }
            });
        }

        /**
         * Switch tab in Presets panel
         * @param {string} tab - 'ref' or 'locked'
         */
        function switchTab(tab) {
            currentTab = tab;
            selectedPresetIndex = 0;

            // Update tab buttons
            const tabs = presetsPanel.querySelectorAll('.hero-panel__tab');
            tabs.forEach(t => {
                t.classList.toggle('hero-panel__tab--active', t.dataset.tab === tab);
            });

            populatePresetList();

            // Update corresponding panel
            if (tab === 'ref') {
                updateReferencePanel();
            } else {
                updateLockedPanel();
            }
        }

        /**
         * Toggle locked characters visibility
         */
        function toggleLockedVisibility() {
            lockedVisible = !lockedVisible;
            const miniGrid = lockedPanel.querySelector('.hero-panel__mini-grid');
            if (miniGrid) {
                miniGrid.classList.toggle('hero-panel__mini-grid--hidden', !lockedVisible);
            }
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

        // Initial population
        populatePresetList();
        updateReferencePanel();
        updateLockedPanel();

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
