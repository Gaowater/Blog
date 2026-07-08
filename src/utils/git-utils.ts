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
 * @param entryId 文章的 entry.id（如 "加密文章2.md"）
 * @returns "YYYY-MM-DD" 格式的日期字符串，若无法获取则返回 null
 */
export function getLastGitDate(entryId: string): string | null {
	if (cache[entryId] !== undefined) return cache[entryId];

	const base = path.resolve("src/content/posts");
	const filePath = path.join(base, entryId);

	if (!existsSync(filePath)) {
		cache[entryId] = null;
		return null;
	}

	try {
		const date = execSync(
			`git log -1 --format=%cd --date=format:"%Y-%m-%d" -- "${filePath}"`,
			{ encoding: "utf-8", cwd: path.resolve(".") },
		).trim();
		cache[entryId] = date || null;
		return cache[entryId];
	} catch {
		cache[entryId] = null;
		return null;
	}
}
