/**
 * =========================================================
 *  📁 驻足之旅 - 手动维护数据文件
 *  =========================================================
 *  
 *  🧑‍💻 怎么添加新条目？
 *  往下翻，找到对应的分类（动漫、游戏、书籍、音乐、电影...）
 *  在数组里加一个 { } 就行了，像这样：
 * 
 *    { name: "葬送的芙莉莲", cover: "https://xxx.jpg", status: "collect" }
 * 
 *  =========================================================
 *  📝 每个字段说明：
 * 
 *  name       → 作品名称（必填）
 *  nameCn     → 中文译名（可选，不填就留空 ""）
 *  cover      → 封面图链接（必填！没图可以用占位图）
 *                https://placehold.co/200x280?text=标题
 *  status     → 状态（必填），选一个：
 *     "wish"    → 想看/想玩/想读/想听
 *     "collect" → 已看/已玩/已读/已听
 *     "doing"   → 在看/在玩/在读/在听
 *     "hold"    → 搁置
 *     "drop"    → 抛弃
 *  comment    → 短评（可选，不填就删掉此行）
 *  date       → 看完的日期（可选，格式 "2024-12-25"）
 *  tags       → 标签（可选，如 ["科幻", "治愈"]）
 * 
 *  ⚠️ 重要：每条用 { } 包着，中间用逗号隔开，最后一条后面不要逗号！
 *  =========================================================
 */

// ──────────────── 📺 动漫 ────────────────
export const animeList = [
  // 示例（去掉 // 就能用）：
  // { name: "葬送的芙莉莲", cover: "https://placehold.co/200x280?text=芙莉莲", status: "doing", tags: ["奇幻", "治愈"] },
]

// ──────────────── 🎮 游戏 ────────────────
export const gameList = [
  // { name: "Elden Ring", nameCn: "艾尔登法环", cover: "https://placehold.co/200x280?text=EldenRing", status: "collect", comment: "年度最佳", tags: ["开放世界", "动作RPG"] },
]

// ──────────────── 📚 书籍 ────────────────
export const bookList = [
  // { name: "三体", cover: "https://placehold.co/200x280?text=三体", status: "collect", tags: ["科幻"] },
]

// ──────────────── 🎵 音乐 ────────────────
export const musicList = [
  // { name: "万能青年旅店 - 冀西南林路行", cover: "https://placehold.co/200x280?text=冀西南林路行", status: "collect", tags: ["摇滚"] },
]

// ──────────────── 🎬 银幕记忆（电影）────────
export const movieList = [
  { name: "The Shawshank Redemption", nameCn: "肖申克的救赎", cover: "/assets/images/shawshank.jpg", status: "collect", comment: "恐惧让你沦为囚犯，希望让你重获自由。一部关于希望与自由的经典，每次看都有新的感悟。", tags: ["经典", "剧情", "励志"] },
  { name: "Interstellar", nameCn: "星际穿越", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=Interstellar", status: "collect", comment: "爱是我们能感知的唯一超越时空维度的东西。", tags: ["科幻", "太空", "诺兰"] },
  { name: "Titanic", nameCn: "泰坦尼克号", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=Titanic", status: "collect", comment: "经典之所以是经典，是因为它无论过去多少年依然能打动人心。", tags: ["经典", "爱情", "灾难"] },
  { name: "流浪地球2", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=流浪地球2", status: "collect", comment: "中国科幻电影的制作标杆，格局与情感并存。", tags: ["科幻", "国产", "灾难"] },
  { name: "F1", nameCn: "F1：狂飙赛车", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=F1", status: "collect", comment: "速度与激情的极致体现，引擎轰鸣就是最好的配乐。", tags: ["赛车", "动作"] },
  { name: "飞驰人生3", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=飞驰人生3", status: "collect", comment: "韩寒镜头下的赛车世界，热血中带着幽默。", tags: ["国产", "赛车", "喜剧"] },
  { name: "我不是药神", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=我不是药神", status: "collect", comment: "现实比电影更残酷，善意比制度更温暖。国产电影的良心之作。", tags: ["国产", "剧情", "现实"] },
  { name: "大话西游之月光宝盒", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=月光宝盒", status: "collect", comment: "曾经有一份真诚的爱情放在我面前，我没有珍惜。", tags: ["经典", "喜剧", "奇幻", "周星驰"] },
  { name: "大话西游之大圣娶亲", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=大圣娶亲", status: "collect", comment: "我的意中人是个盖世英雄，有一天他会踩着七色云彩来娶我。", tags: ["经典", "喜剧", "奇幻", "周星驰"] },
  { name: "周处除三害", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=周处除三害", status: "collect", comment: "暴力美学与人性救赎的黑色寓言。", tags: ["国产", "犯罪", "动作"] },
]

// ──────────────── 📺 剧集时光（电视剧）─────
export const tvList = [
  { name: "大明王朝1566", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=大明王朝1566", status: "collect", comment: "国产历史剧的巅峰，每个角色都是权谋棋盘上的一颗棋子。", tags: ["国产", "历史", "权谋"] },
  { name: "The Boys", nameCn: "黑袍纠察队", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=TheBoys", status: "collect", comment: "把超级英雄拉下神坛，黑暗、血腥又荒诞。", tags: ["美剧", "超级英雄", "黑暗"] },
  { name: "狂飙", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=狂飙", status: "collect", comment: "高启强这个角色塑造得太绝了，从底层鱼贩到黑道大佬的浮沉录。", tags: ["国产", "犯罪", "剧情"] },
  { name: "开端", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=开端", status: "collect", comment: "无限循环的设定玩出了新花样，国产悬疑剧的惊喜之作。", tags: ["国产", "悬疑", "科幻"] },
  { name: "隐秘的角落", cover: "https://placehold.co/200x280/1a1a2e/eeeeee?text=隐秘的角落", status: "collect", comment: "一起爬山吗？国产悬疑剧的封神之作，全员演技在线。", tags: ["国产", "悬疑", "犯罪"] },
]
