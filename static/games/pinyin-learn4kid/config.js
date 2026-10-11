// 拼音大冒险 - 游戏配置和数据文件
// 所有游戏内容、字词表和游戏参数都在这里配置，方便家长/开发者修改

// ===== 素材文件路径参考 =====
// 在 vocabulary 数组中，audio 和 image 字段用于指定本地素材路径。
// 若素材文件不存在，游戏会自动降级到 TTS 合成 / 文字显示。
//
// 示例音频文件放置位置：
//   assets/audio/ma1.mp3      — 完整字音（如 "妈" 的 mā）
//   assets/audio/m.mp3        — 声母音（如 m）
//   assets/audio/a1.mp3       — 韵母音（如 ā）
//   assets/audio/ping_guo.mp3 — 词语音（如 "苹果" 的 píng guǒ）
//
// 示例图片文件放置位置：
//   assets/images/apple.png   — 生活场景图片
//   assets/images/banana.png
//   assets/images/strawberry.png
//   ...
// 若图片加载失败，自动显示汉字文本作为fallback。
//
window.GameConfig = {
  // ========================
  // 全局游戏参数
  // ========================
  settings: {
    maxErrorsBeforeHint: 2,
    maxErrorsBeforeAnswer: 4,
    baseScore: 10,
  },

  // ========================
  // 拼音 -> 外部素材映射表
  // 用于优先引用本地音频；找不到时回退到 TTS / 音频合成引擎
  // 说明：key 为拼音音节，value 为素材路径
  // ========================
  pinyinToAudioMap: {
    // 单韵母
    //"a": "assets/audio/a0.mp3",
    //"ā": "assets/audio/a1.mp3",
    "á": "assets/audio/a2.mp3",
    "ǎ": "assets/audio/a3.mp3",
    "à": "assets/audio/a4.mp3",

    "o": "assets/audio/o0.mp3",
    "ō": "assets/audio/o1.mp3",
    "ó": "assets/audio/o2.mp3",
    "ǒ": "assets/audio/o3.mp3",
    "ò": "assets/audio/o4.mp3",

    "e": "assets/audio/e0.mp3",
    "ē": "assets/audio/e1.mp3",
    "é": "assets/audio/e2.mp3",
    "ě": "assets/audio/e3.mp3",
    "è": "assets/audio/e4.mp3",

    /*"i": "assets/audio/i0.mp3",
    "ī": "assets/audio/i1.mp3",
    "í": "assets/audio/i2.mp3",
    "ǐ": "assets/audio/i3.mp3",
    "ì": "assets/audio/i4.mp3",

    "u": "assets/audio/u0.mp3",
    "ū": "assets/audio/u1.mp3",
    "ú": "assets/audio/u2.mp3",
    "ǔ": "assets/audio/u3.mp3",
    "ù": "assets/audio/u4.mp3",

    "ü": "assets/audio/yu0.mp3",
    "ǖ": "assets/audio/yu1.mp3",
    "ǘ": "assets/audio/yu2.mp3",
    "ǚ": "assets/audio/yu3.mp3",
    "ǜ": "assets/audio/yu4.mp3",*/

    // 声母
    //"b": "assets/audio/b.mp3",
    //"p": "assets/audio/p.mp3",
    //"m": "assets/audio/m.mp3",
    //"f": "assets/audio/f.mp3",
    "d": "assets/audio/d.mp3",
    "t": "assets/audio/t.mp3",
    "n": "assets/audio/n.mp3",
    "l": "assets/audio/l.mp3",
    //"g": "assets/audio/g.mp3",
    //"k": "assets/audio/k.mp3",
    //"h": "assets/audio/h.mp3",
    //"j": "assets/audio/j.mp3",
    //"q": "assets/audio/q.mp3",
    //"x": "assets/audio/x.mp3",
    //"z": "assets/audio/z.mp3",
    "c": "assets/audio/c.mp3",
    //"s": "assets/audio/s.mp3",
    "r": "assets/audio/r.mp3",
    //"zh": "assets/audio/zh.mp3",
    //"ch": "assets/audio/ch.mp3",
    //"sh": "assets/audio/sh.mp3",
    //"y": "assets/audio/y.mp3",
    //"w": "assets/audio/w.mp3",

    // 复韵母
    /*"ai": "assets/audio/ai0.mp3",
    "āi": "assets/audio/ai1.mp3",
    "ái": "assets/audio/ai2.mp3",
    "ǎi": "assets/audio/ai3.mp3",
    "ài": "assets/audio/ai4.mp3",*/

    "ei": "assets/audio/ei0.mp3",
    "ēi": "assets/audio/ei1.mp3",
    "éi": "assets/audio/ei2.mp3",
    "ěi": "assets/audio/ei3.mp3",
    "èi": "assets/audio/ei4.mp3",

    /*"ui": "assets/audio/ui0.mp3",
    "uī": "assets/audio/ui1.mp3",
    "uí": "assets/audio/ui2.mp3",
    "uǐ": "assets/audio/ui3.mp3",
    "uì": "assets/audio/ui4.mp3",*/

    "ao": "assets/audio/ao0.mp3",
    "āo": "assets/audio/ao1.mp3",
    //"áo": "assets/audio/ao2.mp3",
    "ǎo": "assets/audio/ao3.mp3",
    "ào": "assets/audio/ao4.mp3",

    /*"ou": "assets/audio/ou0.mp3",
    "ōu": "assets/audio/ou1.mp3",
    "óu": "assets/audio/ou2.mp3",
    "ǒu": "assets/audio/ou3.mp3",
    "òu": "assets/audio/ou4.mp3",*/

    "iu": "assets/audio/iu0.mp3",
    "iū": "assets/audio/iu1.mp3",
    "iú": "assets/audio/iu2.mp3",
    "iǔ": "assets/audio/iu3.mp3",
    "iù": "assets/audio/iu4.mp3",

    /*"ie": "assets/audio/ie0.mp3",
    "iē": "assets/audio/ie1.mp3",
    "ié": "assets/audio/ie2.mp3",
    "iě": "assets/audio/ie3.mp3",
    "iè": "assets/audio/ie4.mp3",*/

    /*"üe": "assets/audio/yue0.mp3",
    "ǖe": "assets/audio/yue1.mp3",
    "ǘe": "assets/audio/yue2.mp3",
    "ǚe": "assets/audio/yue3.mp3",
    "ǜe": "assets/audio/yue4.mp3",*/

    "er": "assets/audio/er0.mp3",
    //"ēr": "assets/audio/er1.mp3",
    "ér": "assets/audio/er2.mp3",
    "ěr": "assets/audio/er3.mp3",
    "èr": "assets/audio/er4.mp3",

    /*"an": "assets/audio/an0.mp3",
    "ān": "assets/audio/an1.mp3",
    "án": "assets/audio/an2.mp3",
    "ǎn": "assets/audio/an3.mp3",
    "àn": "assets/audio/an4.mp3",*/

    /*"en": "assets/audio/en0.mp3",
    "ēn": "assets/audio/en1.mp3",
    "én": "assets/audio/en2.mp3",
    "ěn": "assets/audio/en3.mp3",
    "èn": "assets/audio/en4.mp3",*/

    /*"in": "assets/audio/in0.mp3",
    "īn": "assets/audio/in1.mp3",
    "ín": "assets/audio/in2.mp3",
    "ǐn": "assets/audio/in3.mp3",
    "ìn": "assets/audio/in4.mp3",*/

    /*"un": "assets/audio/un0.mp3",
    "ūn": "assets/audio/un1.mp3",
    "ún": "assets/audio/un2.mp3",
    "ǔn": "assets/audio/un3.mp3",
    "ùn": "assets/audio/un4.mp3",*/

    /*"ün": "assets/audio/yun0.mp3",
    "ǖn": "assets/audio/yun1.mp3",
    "ǘn": "assets/audio/yun2.mp3",
    "ǚn": "assets/audio/yun3.mp3",
    "ǜn": "assets/audio/yun4.mp3",*/

    "ang": "assets/audio/ang0.mp3",
    "āng": "assets/audio/ang1.mp3",
    "áng": "assets/audio/ang2.mp3",
    "ǎng": "assets/audio/ang3.mp3",
    "àng": "assets/audio/ang4.mp3",

    /*"eng": "assets/audio/eng0.mp3",
    "ēng": "assets/audio/eng1.mp3",
    "éng": "assets/audio/eng2.mp3",
    "ěng": "assets/audio/eng3.mp3",
    "èng": "assets/audio/eng4.mp3",*/

    /*"ing": "assets/audio/ing0.mp3",
    "īng": "assets/audio/ing1.mp3",
    "íng": "assets/audio/ing2.mp3",
    "ǐng": "assets/audio/ing3.mp3",
    "ìng": "assets/audio/ing4.mp3",*/

    "ong": "assets/audio/ong0.mp3",
    "ōng": "assets/audio/ong1.mp3",
    "óng": "assets/audio/ong2.mp3",
    "ǒng": "assets/audio/ong3.mp3",
    "òng": "assets/audio/ong4.mp3",

    // 整体认读音节
    /*"zhi": "assets/audio/zhi0.mp3",
    "zhī": "assets/audio/zhi1.mp3",
    "zhí": "assets/audio/zhi2.mp3",
    "zhǐ": "assets/audio/zhi3.mp3",
    "zhì": "assets/audio/zhi4.mp3",

    "chi": "assets/audio/chi0.mp3",
    "chī": "assets/audio/chi1.mp3",
    "chí": "assets/audio/chi2.mp3",
    "chǐ": "assets/audio/chi3.mp3",
    "chì": "assets/audio/chi4.mp3",

    "shi": "assets/audio/shi0.mp3",
    "shī": "assets/audio/shi1.mp3",
    "shí": "assets/audio/shi2.mp3",
    "shǐ": "assets/audio/shi3.mp3",
    "shì": "assets/audio/shi4.mp3",*/

    "ri": "assets/audio/ri0.mp3"
    /*"rī": "assets/audio/ri1.mp3",
    "rí": "assets/audio/ri2.mp3",
    "rǐ": "assets/audio/ri3.mp3",
    "rì": "assets/audio/ri4.mp3",

    "zi": "assets/audio/zi0.mp3",
    "zī": "assets/audio/zi1.mp3",
    "zí": "assets/audio/zi2.mp3",
    "zǐ": "assets/audio/zi3.mp3",
    "zì": "assets/audio/zi4.mp3",

    "ci": "assets/audio/ci0.mp3",
    "cī": "assets/audio/ci1.mp3",
    "cí": "assets/audio/ci2.mp3",
    "cǐ": "assets/audio/ci3.mp3",
    "cì": "assets/audio/ci4.mp3",

    "si": "assets/audio/si0.mp3",
    "sī": "assets/audio/si1.mp3",
    "sí": "assets/audio/si2.mp3",
    "sǐ": "assets/audio/si3.mp3",
    "sì": "assets/audio/si4.mp3",

    "yi": "assets/audio/yi0.mp3",
    "yī": "assets/audio/yi1.mp3",
    "yí": "assets/audio/yi2.mp3",
    "yǐ": "assets/audio/yi3.mp3",
    "yì": "assets/audio/yi4.mp3",

    "wu": "assets/audio/wu0.mp3",
    "wū": "assets/audio/wu1.mp3",
    "wú": "assets/audio/wu2.mp3",
    "wǔ": "assets/audio/wu3.mp3",
    "wù": "assets/audio/wu4.mp3",

    "yu": "assets/audio/yu0.mp3",
    "yū": "assets/audio/yu1.mp3",
    "yú": "assets/audio/yu2.mp3",
    "yǔ": "assets/audio/yu3.mp3",
    "yù": "assets/audio/yu4.mp3",

    "ye": "assets/audio/ye0.mp3",
    "yē": "assets/audio/ye1.mp3",
    "yé": "assets/audio/ye2.mp3",
    "yě": "assets/audio/ye3.mp3",
    "yè": "assets/audio/ye4.mp3",

    "yue": "assets/audio/yue0.mp3",
    "yuē": "assets/audio/yue1.mp3",
    "yué": "assets/audio/yue2.mp3",
    "yuě": "assets/audio/yue3.mp3",
    "yuè": "assets/audio/yue4.mp3",

    "yuan": "assets/audio/yuan0.mp3",
    "yuān": "assets/audio/yuan1.mp3",
    "yuán": "assets/audio/yuan2.mp3",
    "yuǎn": "assets/audio/yuan3.mp3",
    "yuàn": "assets/audio/yuan4.mp3",

    "yin": "assets/audio/yin0.mp3",
    "yīn": "assets/audio/yin1.mp3",
    "yín": "assets/audio/yin2.mp3",
    "yǐn": "assets/audio/yin3.mp3",
    "yìn": "assets/audio/yin4.mp3",

    "yun": "assets/audio/yun0.mp3",
    "yūn": "assets/audio/yun1.mp3",
    "yún": "assets/audio/yun2.mp3",
    "yǔn": "assets/audio/yun3.mp3",
    "yùn": "assets/audio/yun4.mp3",

    "ying": "assets/audio/ying0.mp3",
    "yīng": "assets/audio/ying1.mp3",
    "yíng": "assets/audio/ying2.mp3",
    "yǐng": "assets/audio/ying3.mp3",
    "yìng": "assets/audio/ying4.mp3"*/
  },

  // ========================
  // 复习关卡：分组显示表
  // ========================
  reviewData: [
    { title: "单韵母", items: ["a", "o", "e", "i", "u", "ü"] },
    { title: "声母", items: ["b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "z", "c", "s", "r", "zh", "ch", "sh", "y", "w"] },
    { title: "复韵母", items: ["ai", "ei", "ui", "ao", "ou", "iu", "ie", "üe", "er", "an", "en", "in", "un", "ün", "ang", "eng", "ing", "ong"] },
    { title: "整体认读音节", items: ["zhi", "chi", "shi", "ri", "zi", "ci", "si", "yi", "wu", "yu", "ye", "yue", "yuan", "yin", "yun", "ying"] }
  ],

  // ========================
  // 拼音 -> 汉字发音映射表
  // 用于 TTS 朗读单个拼音 / 带调韵母
  // ========================
  pinyinToHanziMap: {
    // 基础韵母与带调
    'a': '啊', 'ā': '啊', 'á': '嗄', 'ǎ': '啊', 'à': '啊',
    'o': '哦', 'ō': '喔', 'ó': '哦', 'ǒ': '哦', 'ò': '哦',
    'e': '呃', 'ē': '呃', 'é': '鹅', 'ě': '娥', 'è': '饿',
    'i': '衣', 'ī': '衣', 'í': '姨', 'ǐ': '已', 'ì': '亦',
    'u': '乌', 'ū': '乌', 'ú': '吾', 'ǔ': '五', 'ù': '雾',
    'ü': '迂', 'ǖ': '迂', 'ǘ': '鱼', 'ǚ': '雨', 'ǜ': '玉',

    // 声母
    'b': '波', 'p': '坡', 'm': '摸', 'f': 'for',
    'd': '嘚', 't': '特', 'n': '讷', 'l': '勒',
    'g': '哥', 'k': '科', 'h': '喝', 'j': '鸡',
    'q': '七', 'x': '西', 'zh': '知', 'ch': '吃',
    'sh': '诗', 'r': '日', 'z': '资', 'c': '雌',
    's': '思', 'y': '衣', 'w': '屋',

    // 复韵母
    'ai': '哀', 'ei': '诶', 'ui': '威', 'ao': '熬', 'ou': '欧',
    'iu': '优', 'ie': '耶', 'üe': '约', 'er': '耳',
    'an': '安', 'en': '恩', 'in': '因', 'un': '温', 'ün': '晕',
    'ang': '昂', 'eng': '鞥', 'ing': '英', 'ong': '轰',

    // 整体认读音节
    'zhi': '知', 'chi': '吃', 'shi': '诗', 'ri': '日',
    'zi': '资', 'ci': '雌', 'si': '思', 'yi': '衣',
    'wu': '屋', 'yu': '迂', 'ye': '耶', 'yue': '约',
    'yuan': '冤', 'yin': '因', 'yun': '晕', 'ying': '英',
  },

// ========================
// 声韵初识（关卡 1）题目数据
// ========================
level1Questions: [
  // 单韵母 (带调)
  { sound: 'ā', options: ['ā', 'á', 'ǎ', 'à'], answer: 'ā' },
  { sound: 'á', options: ['ā', 'á', 'ǎ', 'à'], answer: 'á' },
  { sound: 'ǎ', options: ['ā', 'á', 'ǎ', 'à'], answer: 'ǎ' },
  { sound: 'à', options: ['ā', 'á', 'ǎ', 'à'], answer: 'à' },
  { sound: 'ō', options: ['ō', 'ó', 'ǒ', 'ò'], answer: 'ō' },
  { sound: 'ó', options: ['ō', 'ó', 'ǒ', 'ò'], answer: 'ó' },
  { sound: 'ǒ', options: ['ō', 'ó', 'ǒ', 'ò'], answer: 'ǒ' },
  { sound: 'ò', options: ['ō', 'ó', 'ǒ', 'ò'], answer: 'ò' },
  { sound: 'ē', options: ['ē', 'é', 'ě', 'è'], answer: 'ē' },
  { sound: 'é', options: ['ē', 'é', 'ě', 'è'], answer: 'é' },
  { sound: 'ě', options: ['ē', 'é', 'ě', 'è'], answer: 'ě' },
  { sound: 'è', options: ['ē', 'é', 'ě', 'è'], answer: 'è' },
  { sound: 'ī', options: ['ī', 'í', 'ǐ', 'ì'], answer: 'ī' },
  { sound: 'í', options: ['ī', 'í', 'ǐ', 'ì'], answer: 'í' },
  { sound: 'ǐ', options: ['ī', 'í', 'ǐ', 'ì'], answer: 'ǐ' },
  { sound: 'ì', options: ['ī', 'í', 'ǐ', 'ì'], answer: 'ì' },
  { sound: 'ū', options: ['ū', 'ú', 'ǔ', 'ù'], answer: 'ū' },
  { sound: 'ú', options: ['ū', 'ú', 'ǔ', 'ù'], answer: 'ú' },
  { sound: 'ǔ', options: ['ū', 'ú', 'ǔ', 'ù'], answer: 'ǔ' },
  { sound: 'ù', options: ['ū', 'ú', 'ǔ', 'ù'], answer: 'ù' },
  { sound: 'ǖ', options: ['ǖ', 'ǘ', 'ǚ', 'ǜ'], answer: 'ǖ' },
  { sound: 'ǘ', options: ['ǖ', 'ǘ', 'ǚ', 'ǜ'], answer: 'ǘ' },
  { sound: 'ǚ', options: ['ǖ', 'ǘ', 'ǚ', 'ǜ'], answer: 'ǚ' },
  { sound: 'ǜ', options: ['ǖ', 'ǘ', 'ǚ', 'ǜ'], answer: 'ǜ' },

  // 声母
  { sound: 'b', options: ['b', 'p', 'm', 'f'], answer: 'b' },
  { sound: 'p', options: ['p', 'b', 'm', 'f'], answer: 'p' },
  { sound: 'm', options: ['m', 'b', 'p', 'f'], answer: 'm' },
  { sound: 'f', options: ['f', 'b', 'p', 'm'], answer: 'f' },
  { sound: 'd', options: ['d', 't', 'n', 'l'], answer: 'd' },
  { sound: 't', options: ['t', 'd', 'n', 'l'], answer: 't' },
  { sound: 'n', options: ['n', 'd', 't', 'l'], answer: 'n' },
  { sound: 'l', options: ['l', 'd', 't', 'n'], answer: 'l' },
  { sound: 'g', options: ['g', 'k', 'h', 'j'], answer: 'g' },
  { sound: 'k', options: ['k', 'g', 'h', 'j'], answer: 'k' },
  { sound: 'h', options: ['h', 'g', 'k', 'j'], answer: 'h' },
  { sound: 'j', options: ['j', 'q', 'x', 'zh'], answer: 'j' },
  { sound: 'q', options: ['q', 'j', 'x', 'ch'], answer: 'q' },
  { sound: 'x', options: ['x', 'j', 'q', 'sh'], answer: 'x' },
  { sound: 'z', options: ['z', 'c', 's', 'r'], answer: 'z' },
  { sound: 'c', options: ['c', 'z', 's', 'r'], answer: 'c' },
  { sound: 's', options: ['s', 'z', 'c', 'r'], answer: 's' },
  { sound: 'r', options: ['r', 'zh', 'ch', 'sh'], answer: 'r' },
  { sound: 'zh', options: ['zh', 'ch', 'sh', 'r'], answer: 'zh' },
  { sound: 'ch', options: ['ch', 'zh', 'sh', 'r'], answer: 'ch' },
  { sound: 'sh', options: ['sh', 'zh', 'ch', 'r'], answer: 'sh' },
  { sound: 'y', options: ['y', 'w', 'i', 'ü'], answer: 'y' },
  { sound: 'w', options: ['w', 'y', 'x', 'b'], answer: 'w' },

  // 复韵母
  { sound: 'ai', options: ['ai', 'ei', 'ui', 'ao'], answer: 'ai' },
  { sound: 'ei', options: ['ei', 'ai', 'ui', 'ao'], answer: 'ei' },
  { sound: 'ui', options: ['ui', 'ai', 'ei', 'ao'], answer: 'ui' },
  { sound: 'ao', options: ['ao', 'ou', 'iu', 'ie'], answer: 'ao' },
  { sound: 'ou', options: ['ou', 'ao', 'iu', 'ie'], answer: 'ou' },
  { sound: 'iu', options: ['iu', 'ao', 'ou', 'ie'], answer: 'iu' },
  { sound: 'ie', options: ['ie', 'üe', 'er', 'ai'], answer: 'ie' },
  { sound: 'üe', options: ['üe', 'ie', 'er', 'ei'], answer: 'üe' },
  { sound: 'er', options: ['er', 'ie', 'üe', 'an'], answer: 'er' },
  { sound: 'an', options: ['an', 'en', 'in', 'un'], answer: 'an' },
  { sound: 'en', options: ['en', 'an', 'in', 'un'], answer: 'en' },
  { sound: 'in', options: ['in', 'an', 'en', 'un'], answer: 'in' },
  { sound: 'un', options: ['un', 'in', 'en', 'an'], answer: 'un' },
  { sound: 'ang', options: ['ang', 'eng', 'ing', 'ong'], answer: 'ang' },
  { sound: 'eng', options: ['eng', 'ang', 'ing', 'ong'], answer: 'eng' },
  { sound: 'ing', options: ['ing', 'ang', 'eng', 'ong'], answer: 'ing' },
  { sound: 'ong', options: ['ong', 'ang', 'eng', 'ing'], answer: 'ong' },

  // 整体认读音节
  { sound: 'zhi', options: ['zhi', 'chi', 'shi', 'ri'], answer: 'zhi' },
  { sound: 'chi', options: ['chi', 'zhi', 'shi', 'ri'], answer: 'chi' },
  { sound: 'shi', options: ['shi', 'zhi', 'chi', 'ri'], answer: 'shi' },
  { sound: 'ri', options: ['ri', 'zhi', 'chi', 'shi'], answer: 'ri' },
  { sound: 'zi', options: ['zi', 'ci', 'si', 'yi'], answer: 'zi' },
  { sound: 'ci', options: ['ci', 'zi', 'si', 'yi'], answer: 'ci' },
  { sound: 'si', options: ['si', 'zi', 'ci', 'yi'], answer: 'si' },
  { sound: 'yi', options: ['yi', 'wu', 'yu', 'ye'], answer: 'yi' },
  { sound: 'wu', options: ['wu', 'yi', 'yu', 'ye'], answer: 'wu' },
  { sound: 'yu', options: ['yu', 'yi', 'wu', 'ye'], answer: 'yu' },
  { sound: 'ye', options: ['ye', 'yue', 'yuan', 'yin'], answer: 'ye' },
  { sound: 'yue', options: ['yue', 'ye', 'yuan', 'yin'], answer: 'yue' },
  { sound: 'yuan', options: ['yuan', 'ye', 'yue', 'yin'], answer: 'yuan' },
  { sound: 'yin', options: ['yin', 'yun', 'ying', 'yi'], answer: 'yin' },
  { sound: 'yun', options: ['yun', 'yin', 'ying', 'yu'], answer: 'yun' },
  { sound: 'ying', options: ['ying', 'yin', 'yun', 'yi'], answer: 'ying' },
],

// ========================
// 声韵对对碰（关卡 2）题目数据
// ========================
level2Questions: [
  // 常见生活字：保留并修正
  { hanzi: '妈', pinyin: 'mā', shengmu: 'm', yunmu: 'ā', shengmuOpts: ['m', 'b', 'p', 'n'], yunmuOpts: ['ā', 'á', 'ǎ', 'à'] },
  { hanzi: '爸', pinyin: 'bà', shengmu: 'b', yunmu: 'à', shengmuOpts: ['b', 'p', 'd', 'm'], yunmuOpts: ['à', 'ā', 'á', 'ǎ'] },
  { hanzi: '皮', pinyin: 'pí', shengmu: 'p', yunmu: 'í', shengmuOpts: ['p', 'b', 't', 'd'], yunmuOpts: ['í', 'ī', 'ǐ', 'ì'] },
  { hanzi: '木', pinyin: 'mù', shengmu: 'm', yunmu: 'ù', shengmuOpts: ['m', 'n', 'l', 'b'], yunmuOpts: ['ù', 'ū', 'ú', 'ǔ'] },
  { hanzi: '他', pinyin: 'tā', shengmu: 't', yunmu: 'ā', shengmuOpts: ['t', 'd', 'n', 'l'], yunmuOpts: ['ā', 'á', 'ǎ', 'à'] },
  { hanzi: '得', pinyin: 'dé', shengmu: 'd', yunmu: 'é', shengmuOpts: ['d', 't', 'b', 'g'], yunmuOpts: ['é', 'ē', 'ě', 'è'] },
  { hanzi: '喝', pinyin: 'hē', shengmu: 'h', yunmu: 'ē', shengmuOpts: ['h', 'k', 'g', 'f'], yunmuOpts: ['ē', 'é', 'ě', 'è'] },
  { hanzi: '哦', pinyin: 'ō', shengmu: '', yunmu: 'ō', shengmuOpts: ['', 'y', 'w', 'h'], yunmuOpts: ['ō', 'ó', 'ǒ', 'ò'] },
  { hanzi: '妹', pinyin: 'mèi', shengmu: 'm', yunmu: 'èi', shengmuOpts: ['m', 'b', 'p', 'f'], yunmuOpts: ['èi', 'āi', 'ái', 'uì'] },
  { hanzi: '柴', pinyin: 'chái', shengmu: 'ch', yunmu: 'ái', shengmuOpts: ['ch', 'c', 'sh', 'zh'], yunmuOpts: ['ái', 'āi', 'ǎi', 'ài'] },
  { hanzi: '上', pinyin: 'shàng', shengmu: 'sh', yunmu: 'àng', shengmuOpts: ['sh', 's', 'zh', 'ch'], yunmuOpts: ['àng', 'āng', 'ǎng', 'èng'] },
  { hanzi: '红', pinyin: 'hóng', shengmu: 'h', yunmu: 'óng', shengmuOpts: ['h', 'g', 'k', 'f'], yunmuOpts: ['óng', 'āng', 'ǎng', 'èng'] },

  // 小学一年级常用字
  { hanzi: '我', pinyin: 'wǒ', shengmu: 'w', yunmu: 'ǒ', shengmuOpts: ['w', 'y', 'b', 'm'], yunmuOpts: ['ǒ', 'ō', 'ó', 'ò'] },
  { hanzi: '你', pinyin: 'nǐ', shengmu: 'n', yunmu: 'ǐ', shengmuOpts: ['n', 'l', 'm', 'd'], yunmuOpts: ['ǐ', 'ī', 'í', 'ì'] },
  { hanzi: '们', pinyin: 'men', shengmu: 'm', yunmu: 'en', shengmuOpts: ['m', 'b', 'p', 'f'], yunmuOpts: ['en', 'an', 'eng', 'in'] },
  { hanzi: '大', pinyin: 'dà', shengmu: 'd', yunmu: 'à', shengmuOpts: ['d', 't', 'b', 'g'], yunmuOpts: ['à', 'ā', 'á', 'ǎ'] },
  { hanzi: '小', pinyin: 'xiǎo', shengmu: 'x', yunmu: 'iǎo', shengmuOpts: ['x', 'q', 'j', 'sh'], yunmuOpts: ['iǎo', 'iāo', 'iào', 'uǎo'] },
  { hanzi: '天', pinyin: 'tiān', shengmu: 't', yunmu: 'iān', shengmuOpts: ['t', 'd', 'n', 'l'], yunmuOpts: ['iān', 'ián', 'iǎn', 'iàn'] },
  { hanzi: '人', pinyin: 'rén', shengmu: 'r', yunmu: 'én', shengmuOpts: ['r', 'zh', 'ch', 'sh'], yunmuOpts: ['én', 'ēn', 'ěn', 'èn'] },
  { hanzi: '口', pinyin: 'kǒu', shengmu: 'k', yunmu: 'ǒu', shengmuOpts: ['k', 'g', 'h', 'j'], yunmuOpts: ['ǒu', 'ōu', 'óu', 'òu'] },
  { hanzi: '日', pinyin: 'rì', shengmu: 'r', yunmu: 'ì', shengmuOpts: ['r', 'zh', 'ch', 'sh'], yunmuOpts: ['ì', 'ī', 'í', 'ǐ'] },
  { hanzi: '月', pinyin: 'yuè', shengmu: 'y', yunmu: 'uè', shengmuOpts: ['y', 'w', 'j', 'q'], yunmuOpts: ['uè', 'ō', 'ē', 'iè'] },

  { hanzi: '山', pinyin: 'shān', shengmu: 'sh', yunmu: 'ān', shengmuOpts: ['sh', 's', 'zh', 'ch'], yunmuOpts: ['ān', 'án', 'ǎn', 'àn'] },
  { hanzi: '水', pinyin: 'shuǐ', shengmu: 'sh', yunmu: 'uǐ', shengmuOpts: ['sh', 's', 'zh', 'ch'], yunmuOpts: ['uǐ', 'uī', 'uí', 'uì'] },
  { hanzi: '火', pinyin: 'huǒ', shengmu: 'h', yunmu: 'uǒ', shengmuOpts: ['h', 'k', 'g', 'f'], yunmuOpts: ['uǒ', 'uō', 'uó', 'uò'] },
  { hanzi: '土', pinyin: 'tǔ', shengmu: 't', yunmu: 'ǔ', shengmuOpts: ['t', 'd', 'n', 'l'], yunmuOpts: ['ǔ', 'ū', 'ú', 'ù'] },
  { hanzi: '木', pinyin: 'mù', shengmu: 'm', yunmu: 'ù', shengmuOpts: ['m', 'b', 'p', 'f'], yunmuOpts: ['ù', 'ū', 'ú', 'ǔ'] },
  { hanzi: '禾', pinyin: 'hé', shengmu: 'h', yunmu: 'é', shengmuOpts: ['h', 'k', 'g', 'f'], yunmuOpts: ['é', 'ē', 'ě', 'è'] },
  { hanzi: '雨', pinyin: 'yǔ', shengmu: 'y', yunmu: 'ǔ', shengmuOpts: ['y', 'w', 'j', 'q'], yunmuOpts: ['ǔ', 'ū', 'ú', 'ù'] },
  { hanzi: '电', pinyin: 'diàn', shengmu: 'd', yunmu: 'iàn', shengmuOpts: ['d', 't', 'b', 'p'], yunmuOpts: ['iàn', 'iān', 'iǎn', 'ián'] },
  { hanzi: '云', pinyin: 'yún', shengmu: 'y', yunmu: 'ún', shengmuOpts: ['y', 'w', 'j', 'q'], yunmuOpts: ['ún', 'ūn', 'ǔn', 'ùn'] },

  { hanzi: '爸', pinyin: 'bà', shengmu: 'b', yunmu: 'à', shengmuOpts: ['b', 'p', 'm', 'f'], yunmuOpts: ['à', 'ā', 'á', 'ǎ'] },
  { hanzi: '妈', pinyin: 'mā', shengmu: 'm', yunmu: 'ā', shengmuOpts: ['m', 'b', 'p', 'n'], yunmuOpts: ['ā', 'á', 'ǎ', 'à'] },
  { hanzi: '哥', pinyin: 'gē', shengmu: 'g', yunmu: 'ē', shengmuOpts: ['g', 'k', 'h', 'j'], yunmuOpts: ['ē', 'é', 'ě', 'è'] },
  { hanzi: '姐', pinyin: 'jiě', shengmu: 'j', yunmu: 'iě', shengmuOpts: ['j', 'q', 'x', 'zh'], yunmuOpts: ['iě', 'iē', 'ié', 'iè'] },
  { hanzi: '弟', pinyin: 'dì', shengmu: 'd', yunmu: 'ì', shengmuOpts: ['d', 't', 'b', 'p'], yunmuOpts: ['ì', 'ī', 'í', 'ǐ'] },
  { hanzi: '妹', pinyin: 'mèi', shengmu: 'm', yunmu: 'èi', shengmuOpts: ['m', 'b', 'p', 'f'], yunmuOpts: ['èi', 'āi', 'ái', 'uì'] },
  { hanzi: '牛', pinyin: 'niú', shengmu: 'n', yunmu: 'iú', shengmuOpts: ['n', 'l', 'm', 'd'], yunmuOpts: ['iú', 'iū', 'uī', 'iǔ'] },
  { hanzi: '马', pinyin: 'mǎ', shengmu: 'm', yunmu: 'ǎ', shengmuOpts: ['m', 'b', 'p', 'f'], yunmuOpts: ['ǎ', 'ā', 'á', 'à'] },
  { hanzi: '鸟', pinyin: 'niǎo', shengmu: 'n', yunmu: 'iǎo', shengmuOpts: ['n', 'l', 'm', 'd'], yunmuOpts: ['iǎo', 'iāo', 'iào', 'uǎo'] },
  { hanzi: '虫', pinyin: 'chóng', shengmu: 'ch', yunmu: 'óng', shengmuOpts: ['ch', 'zh', 'sh', 'c'], yunmuOpts: ['óng', 'ōng', 'ǎng', 'èng'] },

  { hanzi: '吃', pinyin: 'chī', shengmu: 'ch', yunmu: 'ī', shengmuOpts: ['ch', 'zh', 'sh', 'c'], yunmuOpts: ['ī', 'í', 'ǐ', 'ì'] },
  { hanzi: '喝', pinyin: 'hē', shengmu: 'h', yunmu: 'ē', shengmuOpts: ['h', 'k', 'g', 'f'], yunmuOpts: ['ē', 'é', 'ě', 'è'] },
  { hanzi: '看', pinyin: 'kàn', shengmu: 'k', yunmu: 'àn', shengmuOpts: ['k', 'g', 'h', 'f'], yunmuOpts: ['àn', 'ān', 'án', 'ǎn'] },
  { hanzi: '说', pinyin: 'shuō', shengmu: 'sh', yunmu: 'uō', shengmuOpts: ['sh', 's', 'zh', 'ch'], yunmuOpts: ['uō', 'uó', 'uǒ', 'uò'] },
  { hanzi: '写', pinyin: 'xiě', shengmu: 'x', yunmu: 'iě', shengmuOpts: ['x', 'q', 'j', 'sh'], yunmuOpts: ['iě', 'iē', 'ié', 'iè'] },
  { hanzi: '读', pinyin: 'dú', shengmu: 'd', yunmu: 'ú', shengmuOpts: ['d', 't', 'b', 'p'], yunmuOpts: ['ú', 'ū', 'ǔ', 'ù'] },
  { hanzi: '书', pinyin: 'shū', shengmu: 'sh', yunmu: 'ū', shengmuOpts: ['sh', 's', 'zh', 'ch'], yunmuOpts: ['ū', 'ú', 'ǔ', 'ù'] },
  { hanzi: '画', pinyin: 'huà', shengmu: 'h', yunmu: 'uà', shengmuOpts: ['h', 'k', 'g', 'f'], yunmuOpts: ['uà', 'uā', 'uá', 'uǎ'] },

  { hanzi: '花', pinyin: 'huā', shengmu: 'h', yunmu: 'uā', shengmuOpts: ['h', 'k', 'g', 'f'], yunmuOpts: ['uā', 'uá', 'uǎ', 'uà'] },
  { hanzi: '草', pinyin: 'cǎo', shengmu: 'c', yunmu: 'ǎo', shengmuOpts: ['c', 'z', 's', 'ch'], yunmuOpts: ['ǎo', 'āo', 'áo', 'ào'] },
  { hanzi: '开', pinyin: 'kāi', shengmu: 'k', yunmu: 'āi', shengmuOpts: ['k', 'g', 'h', 'j'], yunmuOpts: ['āi', 'ái', 'ǎi', 'ài'] },
  { hanzi: '关', pinyin: 'guān', shengmu: 'g', yunmu: 'uān', shengmuOpts: ['g', 'k', 'h', 'j'], yunmuOpts: ['uān', 'uán', 'uǎn', 'uàn'] },
  { hanzi: '门', pinyin: 'mén', shengmu: 'm', yunmu: 'én', shengmuOpts: ['m', 'b', 'p', 'f'], yunmuOpts: ['én', 'ēn', 'ěn', 'èn'] },
  { hanzi: '车', pinyin: 'chē', shengmu: 'ch', yunmu: 'ē', shengmuOpts: ['ch', 'zh', 'sh', 'c'], yunmuOpts: ['ē', 'é', 'ě', 'è'] },
  { hanzi: '灯', pinyin: 'dēng', shengmu: 'd', yunmu: 'ēng', shengmuOpts: ['d', 't', 'b', 'p'], yunmuOpts: ['ēng', 'éng', 'ěng', 'èng'] },
  { hanzi: '星', pinyin: 'xīng', shengmu: 'x', yunmu: 'īng', shengmuOpts: ['x', 'q', 'j', 'sh'], yunmuOpts: ['īng', 'íng', 'ǐng', 'ìng'] },
],

// ========================
// 单字拼读（关卡 3）题目数据
// ========================
level3Questions: [
  // 保留并修正现有题目
  { hanzi: '山', pinyin: 'shān', parts: ['sh', 'ān'], candidates: ['sh', 's', 'ān', 'āng'] },
  { hanzi: '红', pinyin: 'hóng', parts: ['h', 'óng'], candidates: ['h', 'f', 'óng', 'ōng'] },
  { hanzi: '手', pinyin: 'shǒu', parts: ['sh', 'ǒu'], candidates: ['sh', 'ch', 'ǒu', 'ōu'] },
  { hanzi: '花', pinyin: 'huā', parts: ['h', 'uā'], candidates: ['h', 'g', 'uā', 'guā'] },
  { hanzi: '庄', pinyin: 'zhuāng', parts: ['zh', 'uāng'], candidates: ['zh', 'z', 'uāng', 'chuāng'] },
  { hanzi: '猫', pinyin: 'māo', parts: ['m', 'āo'], candidates: ['m', 'ma', 'āo', 'ào'] },
  { hanzi: '蛋', pinyin: 'dàn', parts: ['d', 'àn'], candidates: ['d', 't', 'àn', 'ān'] },
  { hanzi: '飞', pinyin: 'fēi', parts: ['f', 'ēi'], candidates: ['f', 'fe', 'ēi', 'éi'] },
  { hanzi: '牛', pinyin: 'niú', parts: ['n', 'iú'], candidates: ['n', 'l', 'iú', 'iū'] },
  { hanzi: '国', pinyin: 'guó', parts: ['g', 'uó'], candidates: ['g', 'k', 'uó', 'ó'] },

  // 扩充到 50 题：小学一年级常用字
  { hanzi: '妈', pinyin: 'mā', parts: ['m', 'ā'], candidates: ['m', 'b', 'ā', 'á'] },
  { hanzi: '爸', pinyin: 'bà', parts: ['b', 'à'], candidates: ['b', 'p', 'à', 'ā'] },
  { hanzi: '我', pinyin: 'wǒ', parts: ['w', 'ǒ'], candidates: ['w', 'y', 'ǒ', 'ò'] },
  { hanzi: '你', pinyin: 'nǐ', parts: ['n', 'ǐ'], candidates: ['n', 'l', 'ǐ', 'ī'] },
  { hanzi: '他', pinyin: 'tā', parts: ['t', 'ā'], candidates: ['t', 'd', 'ā', 'á'] },
  { hanzi: '她', pinyin: 'tā', parts: ['t', 'ā'], candidates: ['t', 'd', 'ā', 'á'] },
  { hanzi: '们', pinyin: 'men', parts: ['m', 'en'], candidates: ['m', 'b', 'en', 'eng'] },
  { hanzi: '大', pinyin: 'dà', parts: ['d', 'à'], candidates: ['d', 't', 'à', 'ā'] },
  { hanzi: '小', pinyin: 'xiǎo', parts: ['x', 'iǎo'], candidates: ['x', 'q', 'iǎo', 'iāo'] },
  { hanzi: '天', pinyin: 'tiān', parts: ['t', 'iān'], candidates: ['t', 'd', 'iān', 'ián'] },

  { hanzi: '人', pinyin: 'rén', parts: ['r', 'én'], candidates: ['r', 'zh', 'én', 'ēn'] },
  { hanzi: '口', pinyin: 'kǒu', parts: ['k', 'ǒu'], candidates: ['k', 'g', 'ǒu', 'ōu'] },
  { hanzi: '日', pinyin: 'rì', parts: ['r', 'ì'], candidates: ['r', 'zh', 'ì', 'í'] },
  { hanzi: '月', pinyin: 'yuè', parts: ['y', 'uè'], candidates: ['y', 'w', 'uè', 'ō'] },
  { hanzi: '山', pinyin: 'shān', parts: ['sh', 'ān'], candidates: ['sh', 's', 'ān', 'àn'] },
  { hanzi: '水', pinyin: 'shuǐ', parts: ['sh', 'uǐ'], candidates: ['sh', 's', 'uǐ', 'uī'] },
  { hanzi: '火', pinyin: 'huǒ', parts: ['h', 'uǒ'], candidates: ['h', 'k', 'uǒ', 'uó'] },
  { hanzi: '土', pinyin: 'tǔ', parts: ['t', 'ǔ'], candidates: ['t', 'd', 'ǔ', 'ū'] },
  { hanzi: '木', pinyin: 'mù', parts: ['m', 'ù'], candidates: ['m', 'b', 'ù', 'ū'] },
  { hanzi: '禾', pinyin: 'hé', parts: ['h', 'é'], candidates: ['h', 'k', 'é', 'ē'] },

  { hanzi: '雨', pinyin: 'yǔ', parts: ['y', 'ǔ'], candidates: ['y', 'w', 'ǔ', 'ū'] },
  { hanzi: '云', pinyin: 'yún', parts: ['y', 'ún'], candidates: ['y', 'w', 'ún', 'ūn'] },
  { hanzi: '风', pinyin: 'fēng', parts: ['f', 'ēng'], candidates: ['f', 'h', 'ēng', 'éng'] },
  { hanzi: '车', pinyin: 'chē', parts: ['ch', 'ē'], candidates: ['ch', 'zh', 'ē', 'é'] },
  { hanzi: '书', pinyin: 'shū', parts: ['sh', 'ū'], candidates: ['sh', 's', 'ū', 'ù'] },
  { hanzi: '画', pinyin: 'huà', parts: ['h', 'uà'], candidates: ['h', 'g', 'uà', 'uā'] },
  { hanzi: '鸟', pinyin: 'niǎo', parts: ['n', 'iǎo'], candidates: ['n', 'l', 'iǎo', 'iāo'] },
  { hanzi: '鱼', pinyin: 'yú', parts: ['y', 'ú'], candidates: ['y', 'w', 'ú', 'ū'] },
  { hanzi: '羊', pinyin: 'yáng', parts: ['y', 'áng'], candidates: ['y', 'w', 'áng', 'ān'] },
  { hanzi: '马', pinyin: 'mǎ', parts: ['m', 'ǎ'], candidates: ['m', 'b', 'ǎ', 'ā'] },

  { hanzi: '牛', pinyin: 'niú', parts: ['n', 'iú'], candidates: ['n', 'l', 'iú', 'iū'] },
  { hanzi: '狗', pinyin: 'gǒu', parts: ['g', 'ǒu'], candidates: ['g', 'k', 'ǒu', 'ōu'] },
  { hanzi: '虫', pinyin: 'chóng', parts: ['ch', 'óng'], candidates: ['ch', 'zh', 'óng', 'ōng'] },
  { hanzi: '竹', pinyin: 'zhú', parts: ['zh', 'ú'], candidates: ['zh', 'z', 'ú', 'ū'] },
  { hanzi: '桃', pinyin: 'táo', parts: ['t', 'áo'], candidates: ['t', 'd', 'áo', 'ào'] },
  { hanzi: '梨', pinyin: 'lí', parts: ['l', 'í'], candidates: ['l', 'n', 'í', 'ī'] },
  { hanzi: '米', pinyin: 'mǐ', parts: ['m', 'ǐ'], candidates: ['m', 'b', 'ǐ', 'ī'] },
  { hanzi: '饭', pinyin: 'fàn', parts: ['f', 'àn'], candidates: ['f', 'h', 'àn', 'ān'] },
  { hanzi: '看', pinyin: 'kàn', parts: ['k', 'àn'], candidates: ['k', 'g', 'àn', 'ān'] },
  { hanzi: '听', pinyin: 'tīng', parts: ['t', 'īng'], candidates: ['t', 'd', 'īng', 'íng'] },

  { hanzi: '说', pinyin: 'shuō', parts: ['sh', 'uō'], candidates: ['sh', 's', 'uō', 'ō'] },
  { hanzi: '写', pinyin: 'xiě', parts: ['x', 'iě'], candidates: ['x', 'q', 'iě', 'iē'] },
  { hanzi: '读', pinyin: 'dú', parts: ['d', 'ú'], candidates: ['d', 't', 'ú', 'ū'] },
  { hanzi: '做', pinyin: 'zuò', parts: ['z', 'uò'], candidates: ['z', 'c', 'uò', 'ō'] },
  { hanzi: '开', pinyin: 'kāi', parts: ['k', 'āi'], candidates: ['k', 'g', 'āi', 'ái'] },
  { hanzi: '关', pinyin: 'guān', parts: ['g', 'uān'], candidates: ['g', 'k', 'uān', 'uá'] },
  { hanzi: '门', pinyin: 'mén', parts: ['m', 'én'], candidates: ['m', 'n', 'én', 'ēn'] },
  { hanzi: '灯', pinyin: 'dēng', parts: ['d', 'ēng'], candidates: ['d', 't', 'ēng', 'éng'] },
  { hanzi: '星', pinyin: 'xīng', parts: ['x', 'īng'], candidates: ['x', 'q', 'īng', 'íng'] },
  { hanzi: '花', pinyin: 'huā', parts: ['h', 'uā'], candidates: ['h', 'f', 'uā', 'uá'] },
],

// ========================
// 词语大作战（关卡 4）题目数据
// ========================
level4Questions: [
  // 保留并修正现有题目
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '苹果',
    imageSrc: 'assets/images/apple.png',
    options: ['píng guǒ', 'xiāng jiāo', 'xiǎo māo', 'mèi lì'],
    answer: 'píng guǒ',
  },
  {
    questionType: 'find-word',
    displayText: 'xiāng jiāo',
    options: ['苹果', '香蕉', '小猫', '大狗'],
    answer: '香蕉',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'image',
    displayText: '香蕉',
    imageSrc: 'assets/images/banana.png',
    options: ['píng guǒ', 'xiāng jiāo', 'xiǎo māo', 'dà gǒu'],
    answer: 'xiāng jiāo',
  },
  {
    questionType: 'find-word',
    displayText: 'xiǎo māo',
    options: ['苹果', '香蕉', '小猫', '大狗'],
    answer: '小猫',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '胡萝卜',
    options: ['hú luó bo', 'nán guā', 'xī guā', 'shān xī'],
    answer: 'hú luó bo',
  },
  {
    questionType: 'find-word',
    displayText: 'shān xī',
    options: ['山西', '陕西', '广西', '辽宁'],
    answer: '山西',
  },
  {
    questionType: 'find-word',
    displayText: 'shǎn xī',
    options: ['山西', '陕西', '广西', '辽宁'],
    answer: '陕西',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'image',
    displayText: '草莓',
    imageSrc: 'assets/images/strawberry.png',
    options: ['cǎo méi', 'pú táo', 'chéng zǐ', 'xiāng jiāo'],
    answer: 'cǎo méi',
  },

  // 扩充到 30 个词：小学一年级常见词语
  {
    questionType: 'find-word',
    displayText: 'mā mā',
    options: ['妈妈', '爸爸', '姐姐', '妹妹'],
    answer: '妈妈',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '爸爸',
    options: ['bà bà', 'mā mā', 'dà gē', 'xiǎo mèi'],
    answer: 'bà bà',
  },
  {
    questionType: 'find-word',
    displayText: 'xiǎo niǎo',
    options: ['小鸟', '小牛', '小羊', '小鱼'],
    answer: '小鸟',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '大山',
    options: ['dà shān', 'xiǎo shān', 'dà shuǐ', 'dà huǒ'],
    answer: 'dà shān',
  },
  {
    questionType: 'find-word',
    displayText: 'xiǎo yú',
    options: ['小鱼', '小风', '小云', '小马'],
    answer: '小鱼',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '红花',
    options: ['hóng huā', 'hóng guǒ', 'hóng shū', 'hóng niǎo'],
    answer: 'hóng huā',
  },
  {
    questionType: 'find-word',
    displayText: 'bái yún',
    options: ['白云', '红云', '黑云', '蓝云'],
    answer: '白云',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '绿草',
    options: ['lǜ cǎo', 'lǜ huā', 'lǜ shān', 'lǜ mù'],
    answer: 'lǜ cǎo',
  },
  {
    questionType: 'find-word',
    displayText: 'huǒ chē',
    options: ['火车', '飞机', '小车', '大船'],
    answer: '火车',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '飞机',
    options: ['fēi jī', 'fēi qī', 'huǒ jī', 'shū jī'],
    answer: 'fēi jī',
  },

  {
    questionType: 'find-word',
    displayText: 'shuǐ guǒ',
    options: ['水果', '花朵', '衣服', '书包'],
    answer: '水果',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '书包',
    options: ['shū bāo', 'shū pāo', 'shǔ bāo', 'shū māo'],
    answer: 'shū bāo',
  },
  {
    questionType: 'find-word',
    displayText: 'hóng sè',
    options: ['红色', '黑色', '蓝色', '绿色'],
    answer: '红色',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '绿色',
    options: ['lǜ sè', 'lù sè', 'lǘ sè', 'lǜ shè'],
    answer: 'lǜ sè',
  },
  {
    questionType: 'find-word',
    displayText: 'kāi xīn',
    options: ['开心', '开门', '开始', '开车'],
    answer: '开心',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '开门',
    options: ['kāi mén', 'kài mén', 'kāi mèn', 'gāi mén'],
    answer: 'kāi mén',
  },
  {
    questionType: 'find-word',
    displayText: 'dà xiàng',
    options: ['大象', '大羊', '大马', '大牛'],
    answer: '大象',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '小狗',
    options: ['xiǎo gǒu', 'xiǎo dǒu', 'xiāo gǒu', 'xiǎo guǒ'],
    answer: 'xiǎo gǒu',
  },
  {
    questionType: 'find-word',
    displayText: 'bái tù',
    options: ['白兔', '白牛', '白鸟', '白鱼'],
    answer: '白兔',
  },

  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '小猫',
    options: ['xiǎo māo', 'xiǎo máo', 'xiǎo miāo', 'xiā tian'],
    answer: 'xiǎo māo',
  },
  {
    questionType: 'find-word',
    displayText: 'tiān qì',
    options: ['天气', '空气', '白云', '吹风'],
    answer: '天气',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '太阳',
    options: ['tài yáng', 'tāi yáng', 'tài yān', 'tǎi yáng'],
    answer: 'tài yáng',
  },
  {
    questionType: 'find-word',
    displayText: 'yuè liàng',
    options: ['月亮', '太阳', '星星', '云朵'],
    answer: '月亮',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '星星',
    options: ['xīng xīng', 'xíng xíng', 'xīng xìn', 'xìn xīng'],
    answer: 'xīng xīng',
  },
  {
    questionType: 'find-word',
    displayText: 'wǒ men',
    options: ['我们', '你们', '他们', '她们'],
    answer: '我们',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '你们',
    options: ['nǐ men', 'nǐ mén', 'lǐ men', 'nī men'],
    answer: 'nǐ men',
  },
  {
    questionType: 'find-word',
    displayText: 'xiǎo xīn',
    options: ['小心', '小新', '小星', '小青'],
    answer: '小心',
  },
  {
    questionType: 'find-pinyin',
    displayType: 'char',
    displayText: '春天',
    options: ['chūn tiān', 'cūn tiān', 'chún tiān', 'shūn tiān'],
    answer: 'chūn tiān',
  },
  {
    questionType: 'find-word',
    displayText: 'dōng tiān',
    options: ['冬天', '春天', '夏天', '秋天'],
    answer: '冬天',
  },
],

// ========================
// 逆向拆解（关卡 5）题目数据
// ========================
level5Questions: [
  // 保留并修正现有题目
  { hanzi: '鱼', pinyin: 'yú', parts: ['y', 'ú'] },
  { hanzi: '花', pinyin: 'huā', parts: ['h', 'uā'] },
  { hanzi: '猫', pinyin: 'māo', parts: ['m', 'āo'] },
  { hanzi: '山', pinyin: 'shān', parts: ['sh', 'ān'] },
  { hanzi: '红', pinyin: 'hóng', parts: ['h', 'óng'] },
  { hanzi: '牛', pinyin: 'niú', parts: ['n', 'iú'] },
  { hanzi: '国', pinyin: 'guó', parts: ['g', 'uó'] },
  { hanzi: '庄', pinyin: 'zhuāng', parts: ['zh', 'uāng'] },
  { hanzi: '飞', pinyin: 'fēi', parts: ['f', 'ēi'] },
  { hanzi: '读', pinyin: 'dú', parts: ['d', 'ú'] },

  // 扩充到 40 题：适合小学一年级常用字
  { hanzi: '妈', pinyin: 'mā', parts: ['m', 'ā'] },
  { hanzi: '爸', pinyin: 'bà', parts: ['b', 'à'] },
  { hanzi: '我', pinyin: 'wǒ', parts: ['w', 'ǒ'] },
  { hanzi: '你', pinyin: 'nǐ', parts: ['n', 'ǐ'] },
  { hanzi: '他', pinyin: 'tā', parts: ['t', 'ā'] },
  { hanzi: '她', pinyin: 'tā', parts: ['t', 'ā'] },
  { hanzi: '大', pinyin: 'dà', parts: ['d', 'à'] },
  { hanzi: '小', pinyin: 'xiǎo', parts: ['x', 'iǎo'] },
  { hanzi: '人', pinyin: 'rén', parts: ['r', 'én'] },
  { hanzi: '口', pinyin: 'kǒu', parts: ['k', 'ǒu'] },

  { hanzi: '日', pinyin: 'rì', parts: ['r', 'ì'] },
  { hanzi: '月', pinyin: 'yuè', parts: ['y', 'uè'] },
  { hanzi: '水', pinyin: 'shuǐ', parts: ['sh', 'uǐ'] },
  { hanzi: '火', pinyin: 'huǒ', parts: ['h', 'uǒ'] },
  { hanzi: '土', pinyin: 'tǔ', parts: ['t', 'ǔ'] },
  { hanzi: '木', pinyin: 'mù', parts: ['m', 'ù'] },
  { hanzi: '禾', pinyin: 'hé', parts: ['h', 'é'] },
  { hanzi: '雨', pinyin: 'yǔ', parts: ['y', 'ǔ'] },
  { hanzi: '云', pinyin: 'yún', parts: ['y', 'ún'] },
  { hanzi: '风', pinyin: 'fēng', parts: ['f', 'ēng'] },

  { hanzi: '车', pinyin: 'chē', parts: ['ch', 'ē'] },
  { hanzi: '书', pinyin: 'shū', parts: ['sh', 'ū'] },
  { hanzi: '画', pinyin: 'huà', parts: ['h', 'uà'] },
  { hanzi: '鸟', pinyin: 'niǎo', parts: ['n', 'iǎo'] },
  { hanzi: '马', pinyin: 'mǎ', parts: ['m', 'ǎ'] },
  { hanzi: '羊', pinyin: 'yáng', parts: ['y', 'áng'] },
  { hanzi: '狗', pinyin: 'gǒu', parts: ['g', 'ǒu'] },
  { hanzi: '虫', pinyin: 'chóng', parts: ['ch', 'óng'] },
  { hanzi: '竹', pinyin: 'zhú', parts: ['zh', 'ú'] },
  { hanzi: '米', pinyin: 'mǐ', parts: ['m', 'ǐ'] },

  { hanzi: '饭', pinyin: 'fàn', parts: ['f', 'àn'] },
  { hanzi: '看', pinyin: 'kàn', parts: ['k', 'àn'] },
  { hanzi: '听', pinyin: 'tīng', parts: ['t', 'īng'] },
  { hanzi: '说', pinyin: 'shuō', parts: ['sh', 'uō'] },
  { hanzi: '写', pinyin: 'xiě', parts: ['x', 'iě'] },
  { hanzi: '开', pinyin: 'kāi', parts: ['k', 'āi'] },
  { hanzi: '关', pinyin: 'guān', parts: ['g', 'uān'] },
  { hanzi: '门', pinyin: 'mén', parts: ['m', 'én'] },
  { hanzi: '灯', pinyin: 'dēng', parts: ['d', 'ēng'] },
  { hanzi: '星', pinyin: 'xīng', parts: ['x', 'īng'] },
],

  // ========================
  // 关卡级别标签
  // ========================
  levelMeta: [
    { id: 0, name: '拼音总表', desc: '分组温习单韵母、声母与复韵母', icon: '📖', color: 'green' },
    { id: 1, name: '声韵初识', desc: '听发音，认读单韵母与声调', icon: '🎈', color: 'yellow' },
    { id: 2, name: '声韵对对碰', desc: '声母+韵母，拼出汉字', icon: '🤝', color: 'blue' },
    { id: 3, name: '单字拼读', desc: '听读音，按顺序选出声母和韵母', icon: '🧩', color: 'purple' },
    { id: 4, name: '词语大作战', desc: '选出正确的拼音或词语', icon: '🔗', color: 'pink' },
    { id: 5, name: '逆向拆解', desc: '听汉字读音，通过拼音键盘拼出读音', icon: '⌨️', color: 'green' },
  ],
};
