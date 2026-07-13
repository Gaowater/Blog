/**
 * 📅 纪念日配置
 * =================
 * 在这里添加你想在日历上标记的特殊日期。
 * 添加后日历上会显示小标记，底部会展示卡片。
 * 支持农历/公历，格式统一用 YYYY-MM-DD。
 *
 * 示例：
 *   { date: "2026-02-07", label: "相识" }
 *   { date: "2026-06-01", label: "在一起" }
 */
export interface MemorableDate {
  date: string;   // 日期，格式 "YYYY-MM-DD"
  label: string;  // 对这个日期的描述
}

export const memorableDates: MemorableDate[] = [
  // ⬇️ 在这里添加你的纪念日 ⬇️
  { date: "0000-05-03", label: "你的生日 🎂" },
  { date: "0000-09-07", label: "我的生日 🎂" },
  { date: "2026-02-07", label: "相识" },
  { date: "2026-03-22", label: "你送给我的第一杯奶茶" },
  { date: "2026-05-17", label: "一百天纪念日" },
  { date: "2026-06-12", label: "告白日" },
  { date: "2026-06-13", label: "第一次深度聊天" },
  { date: "2026-06-10", label: "第一次煲电话粥" },
  { date: "2026-06-28", label: "我情绪失控最严重的一次" },
  { date: "2026-07-02", label: "第一次露脸打视频" },
  { date: "2026-07-11", label: "第一次和你一起玩游戏（双人成行）" },
  { date: "2026-07-13", label: "第一次和你约会" },
  // { date: "2026-XX-XX", label: "纪念日" },
];
