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
                video.play().catch(err => {
                    console.log('Video play failed:', err);
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
