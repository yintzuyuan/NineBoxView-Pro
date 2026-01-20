/**
 * Hero Characters Data
 * 各語言的文字池配置
 * 
 * 編輯說明：
 * - center: 中間固定不變的字
 * - pool: 周圍八個位置會隨機抽取的文字池（建議至少 16 個字以上確保多樣性）
 */

const HERO_CHARACTERS = {
    'zh-Hant': {
        center: '永',
        pool: [
            // 第一批（圖片中的字）
            '酬', '鷹', '靈', '南', '去', '經', '三', '來'
        ]
    },

    'zh-Hans': {
        center: '永',
        pool: [
            // 簡體中文文字池
            '天', '地', '玄', '黄', '宇', '宙', '洪', '荒'
        ]
    },

    'ja': {
        center: 'あ',
        pool: [
            // 日文文字池（可包含假名或漢字）
            'い', 'う', 'え', 'お', 'か', 'き', 'く', 'さ'
        ]
    },

    'ko': {
        center: '한',
        pool: [
            // 韓文文字池（可包含韓文漢字或諺文）
            '가', '나', '다', '라', '마', '바', '사', '아',
        ]
    }
};

// Export for use in interactive-hero.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HERO_CHARACTERS;
}
