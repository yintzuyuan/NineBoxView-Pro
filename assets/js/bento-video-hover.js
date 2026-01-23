// Bento Grid 影片懸停播放功能
// 當滑鼠移入卡片時播放影片，移出時暫停並重置

document.addEventListener('DOMContentLoaded', () => {
    const bentoCards = document.querySelectorAll('.bento__card');

    bentoCards.forEach(card => {
        const video = card.querySelector('video');

        if (video) {
            // 移除 autoplay 屬性（如果存在）
            video.removeAttribute('autoplay');

            // 滑鼠移入時播放
            card.addEventListener('mouseenter', () => {
                // 支援 lazy loading：如果 src 尚未設定，從 data-src 載入
                if (!video.src && video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                }
                video.play().catch(() => {
                    // 靜默處理播放失敗
                });
            });

            // 滑鼠移出時暫停並重置
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // 重置到開頭
            });
        }
    });
});
