/**
 * Video Click-to-Play
 * 點擊縮圖後才載入影片，大幅減少初始載入量
 */
(function() {
    'use strict';

    /**
     * 為影片容器加入播放覆蓋層
     */
    function addPlayOverlay(video) {
        const container = video.closest('.feature-showcase__media, .bento__media');
        if (!container || container.querySelector('.play-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'play-overlay';
        overlay.setAttribute('role', 'button');
        overlay.setAttribute('aria-label', '播放影片');
        container.appendChild(overlay);

        // 點擊播放
        container.addEventListener('click', () => handlePlay(video, container));
    }

    /**
     * 處理播放/暫停邏輯
     */
    function handlePlay(video, container) {
        // 已在播放中，點擊則暫停
        if (container.classList.contains('is-playing')) {
            video.pause();
            container.classList.remove('is-playing');
            return;
        }

        // 載入影片（如果尚未載入）
        const src = video.dataset.src;
        if (src) {
            video.src = src;
            video.removeAttribute('data-src');
        }

        video.play().then(() => {
            container.classList.add('is-playing');
        }).catch(() => {
            // 播放失敗時靜默處理
        });
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        const lazyVideos = document.querySelectorAll('video[data-src]');
        lazyVideos.forEach(video => addPlayOverlay(video));
    });
})();
