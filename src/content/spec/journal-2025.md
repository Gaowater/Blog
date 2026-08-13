---
# ═══════════════════════════════════════════════
#  📖 2025 手账本（示例：往年的归档本）
#  ═══════════════════════════════════════════════
#  说明：每一年 = 一个文件，命名规则 journal-年份.md
#  页面顶部工具栏的年份下拉可以来回切换各年份本子
#  ═══════════════════════════════════════════════

# ── 封面 ──
title: "我的手账"
author: "牧河伊琉"
subtitle: "把日子过成诗，把琐碎写成字。"
date: "2025 · 12"
year: "2025"
# 纸张主题：lined 横线 / blank 空白 / kraft 牛皮纸
paper: "lined"

# ── 模块开关 ──
enableMoods: true
enableNotes: true
enableTodos: true
enableDiary: true
enableQuotes: true

# ── 隐藏开关（分开控制；true = 隐藏对应部分，内容仍在文件里可随时恢复） ──
hideJournal: true # 隐藏手账内容（年份下拉/书页不显示）
hideAnnual: true # 隐藏年度总结（年度视图不显示）
hideMonthly: true # 隐藏月度总结（月度视图不显示）

# ── 年度总结（叙事 + 数字自动统计；去掉整个 annual 块则不显示年度视图） ──
annual:
  # 一句话总结（年度 Hero 区）
  tagline: "在年末的雪里，把这一年的光都收进了手账。"
  # 重要事件时间线
  events:
    - date: "2025-12-24"
      title: "平安夜"
      note: "窗外飘着雪，热可可冒着热气，是一年里最温柔的一个晚上。"
    - date: "2025-12-31"
      title: "跨年夜"
      note: "零点的烟花升起时，这一年的遗憾和圆满都被照亮了。"
  # 年度关键词
  keywords:
    - "相遇"
    - "记录"
    - "慢慢来"
  # 进步（左侧栏）
  growth:
    - "开始认真记录生活，把琐碎写成字"
    - "学会了在冬天给自己泡一杯热可可"
    - "把那些想说的话，都好好地写了下来"
  # 遗憾（右侧栏）
  regrets:
    - "有些想见的人，还是没能见到"
    - "计划里的远方，留到了下一年"
    - "偶尔还是会把日子过得太赶"
  # 下一年期许
  outlook: "新的一年，愿日子常新，未来不远。继续记录，继续相爱，继续把平凡的日子过成诗。"

# ── 月度总结（叙事化记忆档案；去掉整个 monthly 块则不显示月度视图） ──
monthly:
  - month: "2025-12"
    # 月份主题句（扉页）
    theme: "岁末的雪与热可可"
    # 正文区（每行一段）
    body: |
      十二月的风越来越凉，日子却因为岁末变得格外柔软。
      这个月把一年的尾巴过得很慢：写贺卡、挑礼物、在暖黄的灯下回望这一年。
      平安夜的雪落得很安静，跨年零点的烟花却很吵——吵得刚刚好。
    # 情感时间线（故事主体：日期 / 标题 / 当时心情 / 叙事段落）
    events:
      - date: "2025-12-24"
        title: "平安夜"
        mood: "qingxue"
        text: "窗外飘着雪，热可可冒着热气。把没写完的贺卡收好，突然觉得，一年里最温柔的就是这样的晚上。"
      - date: "2025-12-31"
        title: "跨年夜"
        mood: "xingguang"
        text: "零点的烟花升起来的时候，这一年所有的遗憾和圆满，都在这一瞬间被照亮了。明年见。"
    # 亮点瞬间（一句话）
    moments:
      - "热可可的第一口"
      - "贺卡落笔前的犹豫"
      - "零点烟花亮起的刹那"
    # 月尾金句
    quote: "岁岁常欢愉，年年皆胜意。"

# ── 页面列表 ──
pages:
  # ── 心情小记：12 种天气心情各一篇，展示图标实际效果（mood 用完整图标名） ──
  - date: "2025-12-01"
    title: "晴 · 开心"
    mood: "material-symbols:wb-sunny"
    notes:
      - color: "yellow"
        title: "晴"
        content: "阳光落在窗台上，心情也跟着亮了起来。"
        rotate: -2

  - date: "2025-12-02"
    title: "多云 · 复杂"
    mood: "material-symbols:partly-cloudy-day"
    notes:
      - color: "gray"
        title: "多云"
        content: "心里一半是晴天，一半是云，说不清什么滋味。"
        rotate: 2

  - date: "2025-12-03"
    title: "阴 · 低落"
    mood: "material-symbols:cloud"
    notes:
      - color: "gray"
        title: "阴"
        content: "天灰灰的，人也懒懒的，什么都不太想做。"
        rotate: -1

  - date: "2025-12-04"
    title: "雨 · 悲伤"
    mood: "material-symbols:rainy"
    notes:
      - color: "blue"
        title: "雨"
        content: "雨点打在玻璃上，有些话没说出口，就跟着雨一起落下了。"
        rotate: 2

  - date: "2025-12-05"
    title: "小雨 · 淡淡忧伤"
    mood: "material-symbols:rainy-light"
    notes:
      - color: "blue"
        title: "小雨"
        content: "毛毛雨落在肩上，一点点的凉，一点点的心事。"
        rotate: -2

  - date: "2025-12-06"
    title: "大雨 · 难过"
    mood: "material-symbols:rainy-heavy"
    notes:
      - color: "blue"
        title: "大雨"
        content: "雨下得很大，把一整天的委屈都冲了出来。"
        rotate: 2

  - date: "2025-12-07"
    title: "雷暴 · 愤怒"
    mood: "material-symbols:thunderstorm"
    notes:
      - color: "orange"
        title: "雷暴"
        content: "雷声隆隆，心里的火气也跟着炸开了。"
        rotate: -1

  - date: "2025-12-08"
    title: "雪 · 宁静"
    mood: "material-symbols:weather-snowy"
    notes:
      - color: "gray"
        title: "雪"
        content: "雪落无声，世界安静下来，心也跟着静了。"
        rotate: 2

  - date: "2025-12-09"
    title: "晴雪 · 温馨"
    mood: "material-symbols:sunny-snowing"
    notes:
      - color: "purple"
        title: "晴雪"
        content: "雪后初晴，阳光照着雪地，亮晶晶的，暖洋洋的。"
        rotate: -2

  - date: "2025-12-10"
    title: "雾 · 迷茫"
    mood: "material-symbols:foggy"
    notes:
      - color: "gray"
        title: "雾"
        content: "雾蒙蒙的看不清前方，走一步算一步吧。"
        rotate: 1

  - date: "2025-12-11"
    title: "夜 · 平静"
    mood: "material-symbols:nightlight"
    notes:
      - color: "purple"
        title: "夜"
        content: "夜深了，灯还亮着，一个人待着也很安稳。"
        rotate: -1

  - date: "2025-12-12"
    title: "星光 · 希望"
    mood: "material-symbols:auto-awesome"
    notes:
      - color: "green"
        title: "星光"
        content: "抬头看见星星，好像一切又有了盼头。"
        rotate: 2

  # 心情图鉴：12 种天气心情速查（mood 支持 emoji / 天气拼音 / 完整图标名）
  # 这里统一用"完整图标名"写法，方便对照复制
  - date: "2025-12-20"
    title: "心情图鉴"
    mood: "material-symbols:auto-awesome"
    notes:
      - color: "yellow"
        title: "qing 晴 · 开心"
        content: "material-symbols:wb-sunny"
        rotate: -2
      - color: "blue"
        title: "duoyun 多云 · 复杂"
        content: "material-symbols:partly-cloudy-day"
        rotate: 2
      - color: "gray"
        title: "yin 阴 · 低落"
        content: "material-symbols:cloud"
        rotate: -2
      - color: "blue"
        title: "yu 雨 · 悲伤"
        content: "material-symbols:rainy"
        rotate: 2
      - color: "blue"
        title: "xiaoyu 小雨 · 淡淡忧伤"
        content: "material-symbols:rainy-light"
        rotate: -1
      - color: "blue"
        title: "dayu 大雨 · 难过"
        content: "material-symbols:rainy-heavy"
        rotate: 1
      - color: "orange"
        title: "lei 雷暴 · 愤怒"
        content: "material-symbols:thunderstorm"
        rotate: -2
      - color: "gray"
        title: "xue 雪 · 宁静"
        content: "material-symbols:weather-snowy"
        rotate: 2
      - color: "purple"
        title: "qingxue 晴雪 · 温馨"
        content: "material-symbols:sunny-snowing"
        rotate: -1
      - color: "gray"
        title: "wu 雾 · 迷茫"
        content: "material-symbols:foggy"
        rotate: 1
      - color: "purple"
        title: "ye 夜 · 平静"
        content: "material-symbols:nightlight"
        rotate: -2
      - color: "green"
        title: "xingguang 星光 · 希望"
        content: "material-symbols:auto-awesome"
        rotate: 2

  - date: "2025-12-24"
    title: "平安夜"
    mood: "qingxue"
    notes:
      - color: "pink"
        title: "平安夜"
        content: "窗外飘着雪，热可可冒着热气，是冬天最好的样子。"
        rotate: -2
    todos:
      - done: true
        text: "给家人寄圣诞贺卡"
      - done: false
        text: "装饰圣诞树"
    quotes:
      - text: "岁岁常欢愉，年年皆胜意。"
        author: "佚名"

  - date: "2025-12-31"
    title: "跨年夜"
    mood: "xingguang"
    images:
      - "/assets/images/firework.jpg"
    todos:
      - done: true
        text: "写年度总结"
      - done: false
        text: "定下明年的三个小目标"
---

# 日记正文

## 2025-12-01

今天难得放晴，阳光斜斜地照进窗来，连带着心情也亮堂堂的。走在路上不自觉哼起歌，觉得生活真好啊。

## 2025-12-02

天上一半晴一半云，心里也说不清是什么滋味。想做的事很多，又觉得什么都没准备好，就这么纠结着过了一天。

## 2025-12-03

整天的天都灰灰的，人也跟着懒下来。提不起劲，只想窝在沙发里发一会儿呆。

## 2025-12-04

下雨了。雨点啪嗒啪嗒打在玻璃上，有些话在嘴边转了一圈，最后还是没说出口，跟着雨一起落进了土里。

## 2025-12-05

毛毛雨下了一天，落在肩上凉丝丝的。一点点的冷，配一点点的旧心事，倒也刚刚好。

## 2025-12-06

傍晚突然下了场大雨，把这一天的疲惫和委屈全冲了出来。雨停的时候，好像也没那么难受了。

## 2025-12-07

雷声轰轰的，心里的火气也跟着炸开。气冲冲地关上门，又在雨里慢慢冷静下来——算了，不跟他计较。

## 2025-12-08

雪落下来了，安安静静的。世界一下子慢下来，心也跟着静了，只想在窗前看这场雪下完。

## 2025-12-09

雪后初晴，阳光洒在雪地上亮晶晶的。踩上去咯吱咯吱响，呵出的白气都是暖的，是冬天里难得的温柔。

## 2025-12-10

起了大雾，前方模模糊糊的看不真切。迷茫归迷茫，还是先走好眼前这几步吧。

## 2025-12-11

夜深了，只剩一盏灯还亮着。什么都不想，就这样安静地待着，也觉得心里很稳。

## 2025-12-12

抬头看见满天的星星，一闪一闪的。忽然觉得，明天好像又有盼头了。

## 2025-12-24

平安夜，窗外的雪落得很安静。热可可、暖黄的灯、还没写完的贺卡——一年里最温柔的一个晚上。

## 2025-12-31

零点的烟花升起来的时候，突然觉得，这一年所有的遗憾和圆满，都在这一瞬间被照亮了。

明年见。
