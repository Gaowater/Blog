import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false),
		author: z.string().optional().default(""),
		sourceLink: z.string().optional().default(""),
		licenseName: z.string().optional().default(""),
		licenseUrl: z.string().optional().default(""),
		comment: z.boolean().optional().default(true),
		password: z.string().optional().default(""),
		passwordHint: z.string().optional().default(""),
		searchBar: z.boolean().optional().default(false),
		mood: z.enum(['rain', 'sunlight', 'fireflies', 'bubbles', 'stars']).optional(),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const specCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/spec" }),
	// 手账（journal.md）专用字段全部 optional，不影响 about/friends/guestbook
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		// ── 手账封面 ──
		subtitle: z.string().optional(),
		signature: z.string().optional(),
		date: z.string().optional(),
		author: z.string().optional(),
		coverText: z.string().optional(), // 封面正文段落（每行一段）
		// ── 引言页（封面之后的第二页；intro 为空则不显示该页） ──
		introTitle: z.string().optional(), // 引言标题，如 "写在前面"
		intro: z.string().optional(), // 引言正文，每行一段
		year: z.string().optional(), // 手账本年份（归档用），如 "2026"
		// 手账纸张主题：lined 横线 / grid 方格 / blank 空白 / kraft 牛皮纸
		paper: z
			.enum(["lined", "grid", "blank", "kraft"])
			.optional()
			.default("lined"),
		// ── 手账模块开关：false 则不渲染对应模块 ──
		enableMoods: z.boolean().optional().default(true),
		enableNotes: z.boolean().optional().default(true),
		enableTodos: z.boolean().optional().default(true),
		enableDiary: z.boolean().optional().default(true),
		enableQuotes: z.boolean().optional().default(true),
		// ── 隐藏开关（分开控制）：true = 隐藏对应部分，内容仍在文件里随时可恢复 ──
		hideJournal: z.boolean().optional().default(false), // 隐藏手账内容（年份下拉/书页不显示）
		hideAnnual: z.boolean().optional().default(false), // 隐藏年度总结（年度视图不显示）
		hideMonthly: z.boolean().optional().default(false), // 隐藏月度总结（月度视图不显示）
		// ── 手账页面列表：每新增一天就在数组里加一项 ──
		pages: z
			.array(
				z.object({
					date: z.string(), // 日期，如 "2026-08-07"
					title: z.string().optional(), // 当天的小标题（可选）
					mood: z.string().optional(), // 心情 emoji，如 "☀️"
					images: z.array(z.string()).optional(), // 图片路径，如 "/assets/images/xxx.jpg"
					imagePortrait: z
						.boolean()
						.optional()
						.default(false), // 强制该页图片以竖图样式完整显示（不按横图裁切）
					notes: z
						.array(
							z.object({
								color: z
									.enum([
										"yellow",
										"pink",
										"blue",
										"green",
										"orange",
										"purple",
										"gray",
									])
									.optional()
									.default("yellow"),
								title: z.string(),
								content: z.string(),
								rotate: z.number().optional().default(0),
							}),
						)
						.optional(),
					todos: z
						.array(
							z.object({
								done: z.boolean().optional().default(false),
								text: z.string(),
							}),
						)
						.optional(),
					quotes: z
						.array(
							z.object({
								text: z.string(),
								author: z.string().optional().default(""),
							}),
						)
						.optional(),
				}),
			)
			.optional()
			.default([]),
		// ── 年度总结（叙事 + 数字自动统计；无此字段则不渲染年度视图） ──
		annual: z
			.object({
				tagline: z.string().optional(), // 一句话总结
				events: z
					.array(
						z.object({
							date: z.string(), // 如 "2025-12-24"
							title: z.string(),
							note: z.string().optional(), // 简述
						}),
					)
					.optional()
					.default([]), // 重要事件时间线
				keywords: z.array(z.string()).optional().default([]), // 年度关键词
				growth: z.array(z.string()).optional().default([]), // 进步
				regrets: z.array(z.string()).optional().default([]), // 遗憾
				outlook: z.string().optional(), // 下一年期许
			})
			.optional(),
		// ── 月度总结（叙事化记忆档案；无此字段则不渲染月度视图） ──
		monthly: z
			.array(
				z.object({
					month: z.string(), // 月份键，如 "2025-12"（决定归入哪年、排序）
					theme: z.string().optional(), // 月份主题句
					body: z.string().optional(), // 正文区（每行一段）
					events: z
						.array(
							z.object({
								date: z.string().optional(),
								title: z.string(),
								mood: z.string().optional(), // 当时心情（天气图标名）
								text: z.string(), // 叙事段落
							}),
						)
						.optional()
						.default([]), // 情感时间线
					moments: z.array(z.string()).optional().default([]), // 亮点瞬间
					quote: z.string().optional(), // 月尾金句
				}),
			)
			.optional()
			.default([]),
	}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
};
