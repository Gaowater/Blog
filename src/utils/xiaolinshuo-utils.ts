import { getCollection, type CollectionEntry } from "astro:content";

export type XiaoEntry = CollectionEntry<"xiaolinshuo">;

/** 去掉 .md / .mdx 后缀，得到 slug */
const stripExt = (id: string): string => id.replace(/\.(md|mdx)$/i, "");

/** 栏目内所有文章：置顶优先，其余按发布时间倒序；生产环境过滤草稿 */
export async function getXiaoEntries(): Promise<XiaoEntry[]> {
	const entries = await getCollection("xiaolinshuo", ({ data }) =>
		import.meta.env.PROD ? data.draft !== true : true,
	);

	return entries.sort((a, b) => {
		if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
		return b.data.published.getTime() - a.data.published.getTime();
	});
}

export const getXiaoSlug = (entry: XiaoEntry): string => stripExt(entry.id);

export const getXiaoUrl = (entry: XiaoEntry): string =>
	`/xiaolinshuo/${stripExt(entry.id)}/`;

/** 2026.11.03 —— 统一用 UTC 取值，避免时区把日期挪一天 */
export function formatXiaoDate(date: Date): string {
	const y = date.getUTCFullYear();
	const m = String(date.getUTCMonth() + 1).padStart(2, "0");
	const d = String(date.getUTCDate()).padStart(2, "0");
	return `${y}.${m}.${d}`;
}

/** 中文长日期：二〇二六年十一月三日 */
export function formatXiaoDateCn(date: Date): string {
	const digits = "〇一二三四五六七八九";
	const num = (n: number): string =>
		n <= 10
			? n === 10
				? "十"
				: digits[n]
			: n < 20
				? `十${digits[n - 10]}`
				: `${digits[Math.floor(n / 10)]}十${n % 10 === 0 ? "" : digits[n % 10]}`;

	const y = String(date.getUTCFullYear())
		.split("")
		.map((c) => digits[Number(c)])
		.join("");
	const m = num(date.getUTCMonth() + 1);
	const d = num(date.getUTCDate());
	return `${y}年${m}月${d}日`;
}
