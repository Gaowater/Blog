/**
 * =========================================================
 *  📁 驻足之旅 - 手动维护数据文件
 *  =========================================================
 *  
 *  🧑‍💻 怎么添加新条目？
 *  往下翻，找到对应的分类（动漫、游戏、书籍、音乐、电影、电视剧）
 *  在数组里加一个 { } 就行了，像这样：
 * 
 *    { name: "葬送的芙莉莲", cover: "/assets/images/xxx.jpg", status: "collect" }
 * 
 *  =========================================================
 *  📝 每个字段说明：
 * 
 *  name       → 作品名称（必填）
 *  nameCn     → 中文译名（可选，不填就留空 ""）
 *  cover      → 封面图路径（必填）
 *                本地图片: "/assets/images/xxx.jpg"
 *                网络图片: "https://..."
 *  status     → 状态（必填），选一个：
 *     "wish"    → 想看/想玩/想读/想听
 *     "collect" → 已看/已玩/已读/已听
 *     "doing"   → 在看/在玩/在读/在听
 *     "hold"    → 搁置
 *     "drop"    → 抛弃
 *  comment    → 短评（可选，不填就删掉此行）
 *  date       → 看完的日期（可选，格式 "2024-12-25"）
 *  tags       → 标签（可选，如 ["科幻", "治愈"]）
 *  note       → 附注（可选，显示在卡片上的额外文字）
 *  highlight  → 高亮（可选，设为 true 会给卡片加特殊边框）
 * 
 *  ⚠️ 重要：每条用 { } 包着，中间用逗号隔开，最后一条后面不要逗号！
 *  =========================================================
 */

// ──────────────── 📺 动漫 ────────────────
export const animeList = [
  // ★ 高亮推荐
  { name: "君の名は。", nameCn: "你的名字。", cover: "/assets/images/kiminonawa.jpg", status: "collect", comment: "穿越时空的相遇，跨越彼岸的羁绊。", tags: ["动画电影", "新海诚", "治愈"], highlight: true },

  // ── 独立作品 ──
  { name: "四月は君の嘘", nameCn: "四月是你的谎言", cover: "/assets/images/shigatsu.jpg", status: "collect", comment: "在一个樱花飞舞的四月，你走进了我的世界。", tags: ["青春", "音乐", "催泪"] },
  { name: "千と千尋の神隠し", nameCn: "千与千寻", cover: "/assets/images/spirited_away.jpg", status: "collect", comment: "宫崎骏的巅峰之作，童年的奇幻冒险。", tags: ["动画电影", "宫崎骏", "奇幻"] },
  { name: "DEATH NOTE", nameCn: "死亡笔记", cover: "/assets/images/death_note.jpg", status: "collect", comment: "在这个世界上，没有什么是绝对的正义。", tags: ["悬疑", "推理", "智斗"] },
  { name: "刺客伍六七", cover: "/assets/images/scissor_seven.jpg", status: "collect", comment: "用剪刀剪出最骚的刺客路。", tags: ["国创", "搞笑", "动作"] },
  { name: "时光代理人 第一季", cover: "/assets/images/link_click.jpg", status: "collect", comment: "无论过去，不问将来。", tags: ["国创", "悬疑", "奇幻"] },
  { name: "霧山五行", nameCn: "雾山五行", cover: "/assets/images/wushan.jpg", status: "collect", comment: "水墨丹青，打斗封神。", tags: ["国创", "动作", "水墨"] },
  { name: "大理寺日志", cover: "/assets/images/dali_temple.jpg", status: "collect", comment: "少卿大人，办案了！", tags: ["国创", "搞笑", "古风"] },

  // ── 大系列：只放标志性封面，附注说明含所有内容 ──
  { name: "進撃の巨人", nameCn: "进击的巨人", cover: "/assets/images/shingeki.jpg", status: "collect",
    comment: "献出你的心脏！人类史上最宏大的史诗。",
    note: "含全四季 + 最终季 Part 1-3 + 剧场版", tags: ["史诗", "黑暗", "动作"] },
  { name: "鬼滅の刃", nameCn: "鬼灭之刃", cover: "/assets/images/kimetsu.jpg", status: "collect",
    comment: "纵使鬼途漫漫，亦有炭治郎的温暖。",
    note: "含全四季 + 无限列车篇 + 柱稽古篇", tags: ["热血", "战斗", "治愈"] },

  // ── 系列作品：逐个列出所有剧集 ──
  // --- 辉夜大小姐想让我告白 ---
  { name: "辉夜大小姐想让我告白 第一季", cover: "/assets/images/kaguya.jpg", status: "collect", tags: ["恋爱", "搞笑", "校园"] },
  { name: "辉夜大小姐想让我告白 第二季", cover: "/assets/images/kaguya.jpg", status: "collect", tags: ["恋爱", "搞笑", "校园"] },
  { name: "辉夜大小姐想让我告白 究极浪漫", cover: "/assets/images/kaguya.jpg", status: "collect", tags: ["恋爱", "搞笑", "校园"] },
  { name: "辉夜大小姐想让我告白 初吻不会结束", cover: "/assets/images/kaguya.jpg", status: "collect", tags: ["恋爱", "搞笑", "校园"] },

  // --- JOJO的奇妙冒险 ---
  { name: "JOJO的奇妙冒险 幻影之血／战斗潮流", cover: "/assets/images/jojo.jpg", status: "collect", tags: ["热血", "战斗", "奇幻"] },
  { name: "JOJO的奇妙冒险 星尘斗士", cover: "/assets/images/jojo.jpg", status: "collect", tags: ["热血", "战斗", "奇幻"] },
  { name: "JOJO的奇妙冒险 不灭钻石", cover: "/assets/images/jojo.jpg", status: "collect", tags: ["热血", "战斗", "奇幻"] },
  { name: "JOJO的奇妙冒险 黄金之风", cover: "/assets/images/jojo.jpg", status: "collect", tags: ["热血", "战斗", "奇幻"] },
  { name: "JOJO的奇妙冒险 石之海", cover: "/assets/images/jojo.jpg", status: "collect", tags: ["热血", "战斗", "奇幻"] },

  // --- 碧蓝之海 ---
  { name: "碧蓝之海 第一季", cover: "/assets/images/grand_blue.jpg", status: "collect", tags: ["搞笑", "校园", "潜水"] },
  { name: "碧蓝之海 第二季", cover: "/assets/images/grand_blue.jpg", status: "collect", tags: ["搞笑", "校园", "潜水"] },

  // --- 罗小黑战记 ---
  { name: "罗小黑战记 剧集", cover: "/assets/images/luoxiaohei.jpg", status: "collect", tags: ["国创", "治愈", "奇幻"] },
  { name: "罗小黑战记 大电影", cover: "/assets/images/luoxiaohei.jpg", status: "collect", comment: "国产动画电影的骄傲，小黑萌翻了！", tags: ["国创", "治愈", "奇幻"] },

  // --- 灵笼 ---
  { name: "灵笼 第一季", cover: "/assets/images/linglong.jpg", status: "collect", tags: ["国创", "科幻", "末日"] },
  { name: "灵笼 第二季", cover: "/assets/images/linglong.jpg", status: "collect", tags: ["国创", "科幻", "末日"] },

  // --- 我的三体 ---
  { name: "我的三体之罗辑传", cover: "/assets/images/threebody_luoji.jpg", status: "collect", comment: "面壁者罗辑，我是你的破壁人。", tags: ["国创", "科幻", "三体"] },
  { name: "我的三体之章北海传", cover: "/assets/images/threebody_zhang.jpg", status: "collect", comment: "没关系，都一样。", tags: ["国创", "科幻", "三体"] },
]

// ──────────────── 🎮 游戏 ────────────────
export const gameList = [
  // { name: "Elden Ring", nameCn: "艾尔登法环", cover: "/assets/images/xxx.jpg", status: "collect", comment: "年度最佳", tags: ["开放世界", "动作RPG"] },
]

// ──────────────── 📚 书籍 ────────────────
export const bookList = [
  // { name: "三体", cover: "/assets/images/xxx.jpg", status: "collect", tags: ["科幻"] },
]

// ──────────────── 🎵 音乐 ────────────────
export const musicList = [
  // { name: "万能青年旅店 - 冀西南林路行", cover: "/assets/images/xxx.jpg", status: "collect", tags: ["摇滚"] },
]

// ──────────────── 🎬 银幕记忆（电影）────────
export const movieList = [
  { name: "The Shawshank Redemption", nameCn: "肖申克的救赎",            cover: "/assets/images/shawshank.jpg",    status: "collect", comment: "恐惧让你沦为囚犯，希望让你重获自由。一部关于希望与自由的经典，每次看都有新的感悟。", tags: ["经典", "剧情", "励志"] },
  { name: "Interstellar",             nameCn: "星际穿越",                cover: "/assets/images/interstellar.jpg",  status: "collect", comment: "爱是我们能感知的唯一超越时空维度的东西。", tags: ["科幻", "太空", "诺兰"] },
  { name: "Titanic",                  nameCn: "泰坦尼克号",              cover: "/assets/images/titanic.jpg",       status: "collect", comment: "经典之所以是经典，是因为它无论过去多少年依然能打动人心。", tags: ["经典", "爱情", "灾难"] },
  { name: "流浪地球2",                                                   cover: "/assets/images/wandering2.jpg",   status: "collect", comment: "中国科幻电影的制作标杆，格局与情感并存。", tags: ["科幻", "国产", "灾难"] },
  { name: "F1",                       nameCn: "F1：狂飙赛车",            cover: "/assets/images/f1-2025.jpg",       status: "collect", comment: "速度与激情的极致体现，引擎轰鸣就是最好的配乐。", tags: ["赛车", "动作"] },
  { name: "飞驰人生3",                                                    cover: "/assets/images/飞驰人生3.jpg",    status: "collect", comment: "韩寒镜头下的赛车世界，热血中带着幽默。", tags: ["国产", "赛车", "喜剧"] },
  { name: "我不是药神",                                                   cover: "/assets/images/我不是药神.jpg",   status: "collect", comment: "现实比电影更残酷，善意比制度更温暖。国产电影的良心之作。", tags: ["国产", "剧情", "现实"] },
  { name: "大话西游之月光宝盒",                                          cover: "/assets/images/月光宝盒.jpg",     status: "collect", comment: "曾经有一份真诚的爱情放在我面前，我没有珍惜。", tags: ["经典", "喜剧", "奇幻", "周星驰"] },
  { name: "大话西游之大圣娶亲",                                          cover: "/assets/images/大圣娶亲.jpg",     status: "collect", comment: "我的意中人是个盖世英雄，有一天他会踩着七色云彩来娶我。", tags: ["经典", "喜剧", "奇幻", "周星驰"] },
  { name: "周处除三害",                                                   cover: "/assets/images/周处除三害.jpg",   status: "collect", comment: "暴力美学与人性救赎的黑色寓言。", tags: ["国产", "犯罪", "动作"] },
]

// ──────────────── 📺 剧集时光（电视剧）─────
export const tvList = [
  { name: "大明王朝1566",  cover: "/assets/images/大明王朝1566.jpg", status: "collect", comment: "国产历史剧的巅峰，每个角色都是权谋棋盘上的一颗棋子。", tags: ["国产", "历史", "权谋"] },
  { name: "The Boys", nameCn: "黑袍纠察队", cover: "/assets/images/the-boys.jpg", status: "collect", comment: "把超级英雄拉下神坛，黑暗、血腥又荒诞。", tags: ["美剧", "超级英雄", "黑暗"] },
  { name: "狂飙",          cover: "/assets/images/狂飙.jpg",        status: "collect", comment: "高启强这个角色塑造得太绝了，从底层鱼贩到黑道大佬的浮沉录。", tags: ["国产", "犯罪", "剧情"] },
  { name: "开端",          cover: "/assets/images/开端.jpg",        status: "collect", comment: "无限循环的设定玩出了新花样，国产悬疑剧的惊喜之作。", tags: ["国产", "悬疑", "科幻"] },
  { name: "隐秘的角落",    cover: "/assets/images/隐秘的角落.jpg",  status: "collect", comment: "一起爬山吗？国产悬疑剧的封神之作，全员演技在线。", tags: ["国产", "悬疑", "犯罪"] },
]
