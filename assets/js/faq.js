/**
 * FAQ Accordion
 * 點擊展開/收合常見問題
 */
(function() {
    'use strict';

    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const dt = item.querySelector('dt');
        if (!dt) return;

        dt.addEventListener('click', () => {
            // 收合其他項目（可選：如果要允許同時展開多個，移除這段）
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('open')) {
                    other.classList.remove('open');
                }
            });

            // 切換當前項目
            item.classList.toggle('open');
        });
    });
})();
