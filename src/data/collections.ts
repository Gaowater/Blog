/**
 * =========================================================
 *  📁 驻足之旅 - 手动维护数据文件
 *  =========================================================
 *  
 *  🧑‍💻 怎么添加新条目？
 *  往下翻，找到对应的分类（动画、游戏、书籍、音乐、影视剧）
 *  在数组里加一个 { } 就行了，像这样：
 * 
 *    { name: "葬送的芙莉莲", cover: "https://xxx.jpg", status: "collect", score: 10 }
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
 *  score      → 评分 0~10（必填）
 *  comment    → 短评（可选，不填就删掉此行）
 *  date       → 看完的日期（可选，格式 "2024-12-25"）
 *  tags       → 标签（可选，如 ["科幻", "治愈"]）
 * 
 *  ⚠️ 重要：每条用 { } 包着，中间用逗号隔开，最后一条后面不要逗号！
 *  =========================================================
 */

// ──────────────── 📺 动画 ────────────────
export const animeList = [
  // 示例（删掉或改成你自己的）：
  // { name: "Steins;Gate", nameCn: "命运石之门", cover: "https://placehold.co/200x280?text=SG", status: "collect", score: 10, comment: "神作！", date: "2023-01-15", tags: ["科幻", "悬疑"] },
  // { name: "葬送的芙莉莲", cover: "https://placehold.co/200x280?text=芙莉莲", status: "doing", score: 9, tags: ["奇幻", "治愈"] },
]

// ──────────────── 🎮 游戏 ────────────────
export const gameList = [
  // { name: "Elden Ring", nameCn: "艾尔登法环", cover: "https://placehold.co/200x280?text=EldenRing", status: "collect", score: 10, comment: "年度最佳", tags: ["开放世界", "动作RPG"] },
]

// ──────────────── 📚 书籍 ────────────────
export const bookList = [
  // { name: "三体", cover: "https://placehold.co/200x280?text=三体", status: "collect", score: 9, tags: ["科幻"] },
]

// ──────────────── 🎵 音乐 ────────────────
export const musicList = [
  // { name: "万能青年旅店 - 冀西南林路行", cover: "https://placehold.co/200x280?text=冀西南林路行", status: "collect", score: 10, tags: ["摇滚"] },
]

// ──────────────── 🎬 影视剧 ────────────────
export const realList = [
  { name: "The Shawshank Redemption", nameCn: "肖申克的救赎", cover: "/assets/images/shawshank.jpg", status: "collect", score: 10, comment: "恐惧让你沦为囚犯，希望让你重获自由。一部关于希望与自由的经典，每次看都有新的感悟。", tags: ["经典", "剧情", "励志"] },
]
