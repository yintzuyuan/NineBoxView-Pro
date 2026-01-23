/**
 * Video Lazy Loading
 * 使用 Intersection Observer 延遲載入影片，提升初始載入效能
 */
(function() {
    'use strict';

    // 設定 Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '100px', // 提前 100px 開始載入
        threshold: 0
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const src = video.dataset.src;

                if (src) {
                    video.src = src;
                    video.removeAttribute('data-src');

                    // 如果影片設定為 autoplay，載入後開始播放
                    if (video.hasAttribute('data-autoplay')) {
                        video.play().catch(() => {
                            // 靜默處理自動播放失敗（通常是瀏覽器策略限制）
                        });
                    }
                }

                videoObserver.unobserve(video);
            }
        });
    }, observerOptions);

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        const lazyVideos = document.querySelectorAll('video[data-src]');
        lazyVideos.forEach(video => videoObserver.observe(video));
    });
})();
