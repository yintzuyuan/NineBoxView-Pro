/**
 * Hero Characters Data
 * 各語言的文字池配置與子面板預設組合
 *
 * 編輯說明：
 * - center: 中間固定不變的字
 * - pool: 周圍八個位置會隨機抽取的文字池（建議至少 16 個字以上確保多樣性）
 *
 * HERO_PRESETS 說明：
 * - reference: 參考字字組陣列，每組 8 個字
 * - locked: 鎖定字預設組合，使用 positions 物件指定位置（0-8，跳過中央 4）
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

/**
 * Hero Presets Data
 * 子面板預設字組配置
 *
 * 注意：英文版使用繁體中文字組（與 zh-Hant 共用）
 */
const HERO_PRESETS = {
    'zh-Hant': {
        reference: [
            { id: 'common', chars: ['酬', '鷹', '靈', '南', '去', '經', '三', '來'] },
            { id: 'complex', chars: ['鑫', '龍', '鸚', '鷺', '鬱', '纖', '靄', '鑼'] }
        ],
        locked: [
            { id: 'corners', positions: { 0: '國', 2: '東', 6: '我', 8: '今' } },
            { id: 'cross', positions: { 1: '上', 3: '左', 5: '右', 7: '下' } }
        ]
    },

    'zh-Hans': {
        reference: [
            { id: 'common', chars: ['天', '地', '玄', '黄', '宇', '宙', '洪', '荒'] },
            { id: 'complex', chars: ['龙', '凤', '麟', '龟', '鹤', '鹏', '鸾', '雀'] }
        ],
        locked: [
            { id: 'corners', positions: { 0: '东', 2: '西', 6: '南', 8: '北' } },
            { id: 'cross', positions: { 1: '春', 3: '夏', 5: '秋', 7: '冬' } }
        ]
    },

    'ja': {
        reference: [
            { id: 'hiragana', chars: ['い', 'う', 'え', 'お', 'か', 'き', 'く', 'さ'] },
            { id: 'kanji', chars: ['風', '林', '火', '山', '雪', '月', '花', '鳥'] }
        ],
        locked: [
            { id: 'corners', positions: { 0: '東', 2: '西', 6: '南', 8: '北' } },
            { id: 'seasons', positions: { 1: '春', 3: '夏', 5: '秋', 7: '冬' } }
        ]
    },

    'ko': {
        reference: [
            { id: 'hangul', chars: ['가', '나', '다', '라', '마', '바', '사', '아'] },
            { id: 'hanja', chars: ['天', '地', '人', '山', '水', '火', '風', '雷'] }
        ],
        locked: [
            { id: 'corners', positions: { 0: '東', 2: '西', 6: '南', 8: '北' } },
            { id: 'elements', positions: { 1: '金', 3: '木', 5: '水', 7: '火' } }
        ]
    }
};

// 英文版使用繁體中文字組
HERO_PRESETS['en'] = HERO_PRESETS['zh-Hant'];

// Export for use in interactive-hero.js and hero-panels.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HERO_CHARACTERS, HERO_PRESETS };
}
