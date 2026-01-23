/**
 * Hero Characters Data
 * 各語言的中央字配置
 *
 * 編輯說明：
 * - center: 中間固定不變的字
 * - 周圍八格的字池改為使用 HERO_PRESETS.reference[0].chars（第一組參考字）
 *
 * HERO_PRESETS 說明：
 * - reference: 參考字字組字串，空格會被忽略（可用於視覺分組），第一組同時作為亂數排列的字池
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
            { id: 'common', chars: '酬鷹靈 南去經 三來' },
            { id: 'complex', chars: '鑫龍鸚 鷺鬱纖 靄鑼' }
        ],
        locked: [
            { id: 'corners', positions: { 0: '國', 2: '東', 6: '我', 8: '今' } },
            { id: 'cross', positions: { 1: '上', 3: '左', 5: '右', 7: '下' } }
        ]
    },

    'zh-Hans': {
        reference: [
            { id: 'common', chars: '天地玄 黄宇宙 洪荒' },
            { id: 'complex', chars: '龙凤麟 龟鹤鹏 鸾雀' }
        ],
        locked: [
            { id: 'corners', positions: { 0: '东', 2: '西', 6: '南', 8: '北' } },
            { id: 'cross', positions: { 1: '春', 3: '夏', 5: '秋', 7: '冬' } }
        ]
    },

    'ja': {
        reference: [
            { id: 'hiragana', chars: 'いうえ おかき くさ' },
            { id: 'kanji', chars: '風林火 山雪月 花鳥' }
        ],
        locked: [
            { id: 'corners', positions: { 0: '東', 2: '西', 6: '南', 8: '北' } },
            { id: 'seasons', positions: { 1: '春', 3: '夏', 5: '秋', 7: '冬' } }
        ]
    },

    'ko': {
        reference: [
            { id: 'hangul', chars: '가나다 라마바 사아' },
            { id: 'hanja', chars: '天地人 山水火 風雷' }
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
