/**
 * =========================================================
 *  📁 驻足之旅 - 手动维护数据文件
 *  =========================================================
 *  
 *  🧑‍💻 怎么添加新条目？
 *  往下翻，找到对应的分类，在数组里加一个 { } 就行了。
 * 
 *  =========================================================
 *  📝 每个字段说明：
 * 
 *  name       → 作品名称（必填）
 *  nameCn     → 中文译名（可选）
 *  cover      → 封面图路径（必填，本地图片 "/assets/images/xxx.jpg"）
 *  status     → 状态（必填）："wish"/"collect"/"doing"/"hold"/"drop"
 *  comment    → 短评（可选）
 *  date       → 看完的日期（可选，格式 "2024-12-25"）
 *  tags       → 标签（可选，如 ["科幻", "治愈"]）
 *  note       → 附注（可选，显示在卡片上的额外文字，如 "含全四季"）
 *  highlight  → 高亮（可选，true 给卡片加特殊边框）
 * 
 *  ⚠️ 重要：每条用 { } 包着，逗号隔开，最后一条不要逗号！
 *  =========================================================
 */

// ──────────────── 📺 动漫 ────────────────
export const animeList = [
  // ⭐ 加框推荐（置顶）
  { name: "君の名は。", nameCn: "你的名字。", cover: "/assets/images/kiminonawa.jpg", status: "collect",
    comment: "穿越时空的相遇，跨越彼岸的羁绊。", tags: ["动画电影", "新海诚", "治愈"], highlight: true },
  { name: "碧蓝之海 系列", cover: "/assets/images/grand_blue.jpg", status: "collect",
    comment: "唯一一部让我笑到腹肌疼的番。", note: "含第一季 + 第二季", tags: ["搞笑", "校园", "潜水"], highlight: true },
  { name: "罗小黑战记 大电影", cover: "/assets/images/luoxiaohei_movie.jpg", status: "collect",
    comment: "国产动画电影的骄傲，小黑萌翻了！", tags: ["国创", "治愈", "奇幻"], highlight: true },

  // ── 独立作品 ──
  { name: "四月は君の嘘", nameCn: "四月是你的谎言", cover: "/assets/images/shigatsu.jpg", status: "collect",
    comment: "在一个樱花飞舞的四月，你走进了我的世界。", tags: ["青春", "音乐", "催泪"] },
  { name: "千と千尋の神隠し", nameCn: "千与千寻", cover: "/assets/images/spirited_away.jpg", status: "collect",
    comment: "宫崎骏的巅峰之作，童年的奇幻冒险。", tags: ["动画电影", "宫崎骏", "奇幻"] },
  { name: "DEATH NOTE", nameCn: "死亡笔记", cover: "/assets/images/death_note.jpg", status: "collect",
    comment: "在这个世界上，没有什么是绝对的正义。", tags: ["悬疑", "推理", "智斗"] },
  { name: "大理寺日志", cover: "/assets/images/大理寺日志.jpg", status: "collect",
    comment: "少卿大人，办案了！", tags: ["国创", "搞笑", "古风"] },
  { name: "我的三体之罗辑传", cover: "/assets/images/threebody_luoji.jpg", status: "collect",
    comment: "面壁者罗辑，我是你的破壁人。", tags: ["国创", "科幻", "三体"] },
  { name: "我的三体之章北海传", cover: "/assets/images/threebody_zhang.jpg", status: "collect",
    comment: "没关系，都一样。", tags: ["国创", "科幻", "三体"] },

  // ── 系列作品（合并为一个格子，附注说明含所有内容）──

  // --- 刺客伍六七 ---
  { name: "刺客伍六七 系列", cover: "/assets/images/scissor_seven.jpg", status: "collect",
    comment: "用剪刀剪出最骚的刺客路。", note: "含全四季 + 大电影", tags: ["国创", "搞笑", "动作"] },

  // --- 时光代理人 ---
  { name: "时光代理人 系列", cover: "/assets/images/link_click.jpg", status: "collect",
    comment: "无论过去，不问将来。", note: "含第一季 + 第二季", tags: ["国创", "悬疑", "奇幻"] },

  // --- 雾山五行 ---
  { name: "雾山五行 系列", cover: "/assets/images/wushan.jpg", status: "collect",
    comment: "水墨丹青，打斗封神。", note: "含第一季 + 第二季", tags: ["国创", "动作", "水墨"] },

  // --- 辉夜大小姐想让我告白 ---
  { name: "辉夜大小姐想让我告白 系列", cover: "/assets/images/kaguya.jpg", status: "collect",
    comment: "书记的舞我能看一百遍。", note: "含全四季", tags: ["恋爱", "搞笑", "校园"] },

  // --- 灵笼 ---
  { name: "灵笼 系列", cover: "/assets/images/灵笼.jpg", status: "collect",
    comment: "末日废土下的国漫之光，制作精良。", note: "含第一季 + 第二季", tags: ["国创", "科幻", "末日"] },

  // --- 进击的巨人 ---
  { name: "進撃の巨人", nameCn: "进击的巨人", cover: "/assets/images/shingeki.jpg", status: "collect",
    comment: "献出你的心脏！人类史上最宏大的史诗。",
    note: "含全四季 + 最终季 Part 1-3 + 剧场版", tags: ["史诗", "黑暗", "动作"] },

  // --- 鬼灭之刃 ---
  { name: "鬼滅の刃", nameCn: "鬼灭之刃", cover: "/assets/images/kimetsu.jpg", status: "collect",
    comment: "纵使鬼途漫漫，亦有炭治郎的温暖。",
    note: "含全四季 + 无限列车篇 + 柱稽古篇", tags: ["热血", "战斗", "治愈"] },

  // --- 罗小黑战记 剧集 ---
  { name: "罗小黑战记 剧集", cover: "/assets/images/罗小黑战记.jpg", status: "collect",
    comment: "治愈系国漫的天花板，每一帧都是壁纸。", tags: ["国创", "治愈", "奇幻"] },

  // ── JOJO的奇妙冒险 全6季 ──
  { name: "JOJO的奇妙冒险 幻影之血", cover: "/assets/images/jojo1.jpg", status: "collect",
    comment: "一切的开始，DIO的恶之华。", tags: ["热血", "战斗", "奇幻"] },
  { name: "JOJO的奇妙冒险 战斗潮流", cover: "/assets/images/jojo2.jpg", status: "collect",
    comment: "西————萨！！波纹战士的巅峰对决。", tags: ["热血", "战斗", "奇幻"] },
  { name: "JOJO的奇妙冒险 星尘斗士", cover: "/assets/images/jojo3.jpg", status: "collect",
    comment: "替身时代的开启，欧拉欧拉欧拉！", tags: ["热血", "战斗", "奇幻"] },
  { name: "JOJO的奇妙冒险 不灭钻石", cover: "/assets/images/jojo4.jpg", status: "collect",
    comment: "杜王町的日常与疯狂，吉良吉影的压迫感。", tags: ["热血", "战斗", "奇幻"] },
  { name: "JOJO的奇妙冒险 黄金之风", cover: "/assets/images/jojo5.jpg", status: "collect",
    comment: "所谓的觉悟，就是在漆黑的荒野上开辟出理应前行的道路。", tags: ["热血", "战斗", "奇幻"] },
  { name: "JOJO的奇妙冒险 石之海", cover: "/assets/images/jojo6.jpg", status: "collect",
    comment: "徐伦的勇气与自由，JOJO宇宙的终章。", tags: ["热血", "战斗", "奇幻"] },

  // --- 火影忍者 ---
  { name: "NARUTO -ナルト-", nameCn: "火影忍者", cover: "/assets/images/naruto.jpg", status: "doing",
    comment: "有话直说，说到做到，这就是我的忍道！", tags: ["热血", "战斗", "成长"] },
]

// ──────────────── 🎮 游戏 ────────────────
export const gameList = [
  // ⭐ 力荐（置顶）
  { name: "Black Myth: Wukong", nameCn: "黑神话：悟空", cover: "/assets/images/black_myth_wukong.jpg", status: "collect",
    comment: "踏碎凌霄，放肆桀骜。国产3A的里程碑之作。", note: "约105小时", tags: ["动作RPG", "国产", "神话"], highlight: true },
  { name: "Red Dead Redemption 2", nameCn: "荒野大镖客2", cover: "/assets/images/rdr2.jpg", status: "collect",
    comment: "西部世界的最后一抹余晖，亚瑟·摩根的故事让人动容。", note: "约81小时", tags: ["开放世界", "剧情", "西部"], highlight: true },
  { name: "Ori and the Will of the Wisps", nameCn: "奥日与精灵意志", cover: "/assets/images/ori_will_wisps.jpg", status: "collect",
    comment: "画面和音乐都美到窒息，玩的时候截图比打怪多。", note: "约25小时", tags: ["平台跳跃", "治愈", "神级配乐"], highlight: true },
  { name: "Detroit: Become Human", nameCn: "底特律：化身为人", cover: "/assets/images/detroit_become_human.jpg", status: "collect",
    comment: "每一次选择都沉重而有分量，仿生人的自我觉醒之路。", note: "约16小时", tags: ["互动电影", "科幻", "剧情"], highlight: true },
  { name: "Aliya: Timelink", nameCn: "阿莉雅：时空联结", cover: "/assets/images/aliya_timelink.jpg", status: "collect",
    comment: "国产独立解谜游戏，时间回溯的玩法有新意。", note: "约3小时", tags: ["国产", "解谜", "独立"], highlight: true },

  // ── 独立作品 ──
  { name: "Dead Cells", nameCn: "死亡细胞", cover: "/assets/images/dead_cells.jpg", status: "collect",
    comment: "RogueLike动作游戏的标杆，死了还想再来一把。", note: "约23小时", tags: ["RogueLike", "动作", "像素"] },
  { name: "Cities: Skylines", nameCn: "城市：天际线", cover: "/assets/images/cities_skylines.jpg", status: "collect",
    comment: "一玩就忘了时间，我的城市规划梦。", note: "约17小时", tags: ["模拟经营", "城市建设"] },
  { name: "Left 4 Dead 2", nameCn: "求生之路2", cover: "/assets/images/left4dead2.jpg", status: "collect",
    comment: "经典永不褪色，和朋友们一起打丧尸的快乐。", note: "约14小时", tags: ["合作", "丧尸", "经典"] },
  { name: "Firework", nameCn: "烟火", cover: "/assets/images/firework.jpg", status: "collect",
    comment: "国产恐怖游戏的惊喜之作，中式恐怖的韵味拿捏到位。", note: "约6小时", tags: ["国产", "恐怖", "剧情"] },
  { name: "DEATH STRANDING DIRECTOR'S CUT", nameCn: "死亡搁浅 导剪版", cover: "/assets/images/death_stranding_dc.jpg", status: "collect",
    comment: "送快递也能如此上瘾，小岛秀夫的天马行空。", note: "约5小时", tags: ["开放世界", "剧情", "独特"] },
  { name: "Shadow of the Tomb Raider", nameCn: "古墓丽影：暗影", cover: "/assets/images/shadow_of_tomb_raider.jpg", status: "collect",
    comment: "劳拉的终章，古墓解密依旧精彩。", note: "约4小时", tags: ["动作冒险", "解谜"] },
  { name: "Devil May Cry 5", nameCn: "鬼泣5", cover: "/assets/images/devil_may_cry_5.jpg", status: "collect",
    comment: "华丽的连招系统，但丁和尼禄帅炸了。", note: "约3小时", tags: ["动作", "华丽连招"] },
  { name: "Riders Republic", nameCn: "极限国度", cover: "/assets/images/riders_republic.jpg", status: "collect",
    comment: "开放世界极限运动，骑着自行车从山顶冲下来很解压。", note: "约3小时", tags: ["体育", "开放世界"] },
  { name: "Frostpunk", nameCn: "冰汽时代", cover: "/assets/images/frostpunk.jpg", status: "collect",
    comment: "在末日严寒中艰难求存，每一次抉择都拷问人性。", note: "约2.5小时", tags: ["策略", "生存", "模拟经营"] },
  { name: "Resident Evil 4", nameCn: "生化危机4", cover: "/assets/images/re4.jpg", status: "collect",
    comment: "三上真司的经典之作，重制版也很棒。", note: "约2小时", tags: ["恐怖", "动作", "经典"] },
  { name: "Assassin's Creed Origins", nameCn: "刺客信条：起源", cover: "/assets/images/assassins_creed_origins.jpg", status: "collect",
    comment: "古埃及的风景很美，旅游模拟器名不虚传。", note: "约1小时", tags: ["开放世界", "历史", "动作RPG"] },
  { name: "Battlefield V", nameCn: "战地5", cover: "/assets/images/battlefield_5.jpg", status: "collect",
    comment: "二战题材的战场氛围拉满，大场面很震撼。", note: "约1小时", tags: ["FPS", "二战", "多人"] },
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
  // ⭐ 加框推荐（置顶）
  { name: "Titanic",                  nameCn: "泰坦尼克号",              cover: "/assets/images/titanic.jpg",       status: "collect", comment: "经典之所以是经典，是因为它无论过去多少年依然能打动人心。", tags: ["经典", "爱情", "灾难"], highlight: true },

  // ── 其他电影 ──
  { name: "The Shawshank Redemption", nameCn: "肖申克的救赎",            cover: "/assets/images/shawshank.jpg",    status: "collect", comment: "恐惧让你沦为囚犯，希望让你重获自由。一部关于希望与自由的经典，每次看都有新的感悟。", tags: ["经典", "剧情", "励志"] },
  { name: "Interstellar",             nameCn: "星际穿越",                cover: "/assets/images/interstellar.jpg",  status: "collect", comment: "爱是我们能感知的唯一超越时空维度的东西。", tags: ["科幻", "太空", "诺兰"] },
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
  { name: "黑袍纠察队 系列", nameCn: "The Boys", cover: "/assets/images/黑袍纠察队.jpg", status: "collect", note: "含全四季", comment: "把超级英雄拉下神坛，黑暗、血腥又荒诞。", tags: ["美剧", "超级英雄", "黑暗"] },
  { name: "狂飙",          cover: "/assets/images/狂飙.jpg",        status: "collect", comment: "高启强这个角色塑造得太绝了，从底层鱼贩到黑道大佬的浮沉录。", tags: ["国产", "犯罪", "剧情"] },
  { name: "开端",          cover: "/assets/images/开端.jpg",        status: "collect", comment: "无限循环的设定玩出了新花样，国产悬疑剧的惊喜之作。", tags: ["国产", "悬疑", "科幻"] },
  { name: "隐秘的角落",    cover: "/assets/images/隐秘的角落.jpg",  status: "collect", comment: "一起爬山吗？国产悬疑剧的封神之作，全员演技在线。", tags: ["国产", "悬疑", "犯罪"] },
]
