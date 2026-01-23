/**
 * FAQ Accordion
 * 點擊或鍵盤展開/收合常見問題
 */
(function() {
    'use strict';

    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach((item, index) => {
        const dt = item.querySelector('dt');
        const dd = item.querySelector('dd');
        if (!dt || !dd) return;

        // 設定 ARIA 屬性
        const id = `faq-answer-${index}`;
        dt.setAttribute('role', 'button');
        dt.setAttribute('tabindex', '0');
        dt.setAttribute('aria-expanded', 'false');
        dt.setAttribute('aria-controls', id);
        dd.setAttribute('id', id);

        function toggleItem() {
            // 收合其他項目
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('open')) {
                    other.classList.remove('open');
                    const otherDt = other.querySelector('dt');
                    if (otherDt) otherDt.setAttribute('aria-expanded', 'false');
                }
            });

            // 切換當前項目
            const isOpen = item.classList.toggle('open');
            dt.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }

        // 點擊事件
        dt.addEventListener('click', toggleItem);

        // 鍵盤事件（Enter 和 Space）
        dt.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleItem();
            }
        });
    });
})();
