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
            { id: '1', chars: '南去經三國 東來過五湖' },
            { id: '2', chars: '曾經滄海難為水 除卻巫山不是雲' },
            { id: '3', chars: '問君能有幾多愁 恰似一江春水向東流' },
            { id: '4', chars: '風急天高猿嘯哀 渚清沙白鳥飛回' },
            { id: '5', chars: '人生自古誰無死 留取丹心照汗青' },
            { id: '6', chars: '美麗島上經 散播了無限種子 自由的花 平等的樹' }
        ],
        locked: [
            { id: 'corners', positions: { 0: '國', 2: '東', 6: '我', 8: '今' } },
            { id: 'cross', positions: { 1: '上', 3: '左', 5: '右', 7: '下' } }
        ]
    },

    'zh-Hans': {
        reference: [
            { id: '1', chars: '天地玄黄 宇宙洪荒' },
            { id: '2', chars: '滚滚长江东逝水 浪花淘尽英雄' },
            { id: '3', chars: '落霞与孤鹜齐飞 秋水共长天一色' },
            { id: '4', chars: '大江东去 浪淘尽 千古风流人物' },
            { id: '5', chars: '在我的后园 可以看见墙外有两株树 一株是枣树 还有一株也是枣树' },
            { id: '6', chars: '横眉冷对千夫指 俯首甘为孺子牛' }
        ],
        locked: [
            { id: 'corners', positions: { 0: '东', 2: '西', 6: '南', 8: '北' } },
            { id: 'cross', positions: { 1: '春', 3: '夏', 5: '秋', 7: '冬' } }
        ]
    },

    'ja': {
        reference: [
            { id: '1', chars: 'いろはにほへと ちりぬるを わかよたれそ つねならむ うゐのおくやま けふこえて あさきゆめみし ゑひもせす' },
            { id: '2', chars: '愛のあるユニークで豊かな書体' },
            { id: '3', chars: '山路を登りながら こう考えた 智に働けば角が立つ' },
            { id: '4', chars: '吾輩は猫である 名前はまだ無い どこで生れたかとんと見当がつかぬ' },
            { id: '5', chars: 'デジタル文字は美しく進化する' },
            { id: '6', chars: 'あたらしい朝が来た希望の朝だ' }
        ],
        locked: [
            { id: 'corners', positions: { 0: '東', 2: '西', 6: '南', 8: '北' } },
            { id: 'seasons', positions: { 1: '春', 3: '夏', 5: '秋', 7: '冬' } }
        ]
    },

    'ko': {
        reference: [
            { id: '1', chars: '다람쥐 헌 쳇바퀴에 타고파' },
            { id: '2', chars: '키스의 고유 조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다' },
            { id: '3', chars: '정 참판 양반댁 규수 큰 교자 타고 혼례 치른 날' },
            { id: '4', chars: '콩고물과 우유가 들어간 빙수는 차게 먹어야 특별한 맛이 잘 표현된다' },
            { id: '5', chars: '덧글은 통신 예절 지키면서 표현 자유 추구하는 방향으로' },
            { id: '6', chars: '야 니들 밥에 쵸코우유 토핑해 먹었쪄' }
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
