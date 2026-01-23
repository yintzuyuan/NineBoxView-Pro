/**
 * Hero Characters Data
 * 各語言的中央字配置
 *
 * 編輯說明：
 * - center: 中間固定不變的字
 * - 周圍八格的字池改為使用 HERO_PRESETS.reference[0].chars（第一組參考字）
 *
 * HERO_PRESETS 說明：
 * - reference: 參考字字組陣列，每組 8 個字（第一組同時作為亂數排列的字池）
 * - locked: 鎖定字預設組合，使用 positions 物件指定位置（0-8，跳過中央 4）
 */

const HERO_CHARACTERS = {
    'zh-Hant': { center: '永' },
    'zh-Hans': { center: '永' },
    'ja': { center: 'あ' },
    'ko': { center: '한' }
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
