/**
 * Git 工具函数
 * 读取文件最后 git commit 日期（仅构建时可用）
 */
import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

const cache: Record<string, string | null> = {};

/**
 * 获取某篇文章的最后 git commit 日期
 * @param entryId 文章的 entry.id（不含扩展名）
 * @returns "YYYY-MM-DD" 格式的日期字符串，若无法获取则返回 null
 */
export function getLastGitDate(entryId: string): string | null {
	if (cache[entryId] !== undefined) return cache[entryId];

	const base = path.resolve("src/content/posts");

	// 尝试 .md 和 .mdx 两种扩展名
	for (const ext of [".md", ".mdx"]) {
		const filePath = path.join(base, `${entryId}${ext}`);
		if (!existsSync(filePath)) continue;

		try {
			const date = execSync(
				`git log -1 --format=%cd --date=format:"%Y-%m-%d" -- "${filePath}"`,
				{ encoding: "utf-8", cwd: path.resolve(".") },
			).trim();
			cache[entryId] = date || null;
			return cache[entryId];
		} catch {
			// 文件未纳入 git 管理，跳过
			continue;
		}
	}

	cache[entryId] = null;
	return null;
}
