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
  { date: "2026-02-07", label: "相识" },
  // { date: "2026-XX-XX", label: "纪念日" },
];
