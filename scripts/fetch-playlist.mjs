#!/usr/bin/env node
/**
 * 抓取 Meting 歌单元数据，生成静态快照 src/data/music-playlist.json
 *
 * 用途：让播放列表在页面加载后立刻出现，不必等网络往返。
 * 只保存不会过期的字段（歌名 / 歌手 / 歌曲 id / 封面 id）；
 * 带时间戳签名的音频直链一律不存，改由 /api/meting/media 在播放时按 id 实时解析。
 *
 * 用法：node scripts/fetch-playlist.mjs
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = resolve(root, "src/config/musicConfig.ts");
const OUT_PATH = resolve(root, "src/data/music-playlist.json");

const UPSTREAMS = [
  "https://api.i-meto.com/meting/api?",
  "https://api.injahow.cn/meting/?",
  "https://api.moeyao.cn/meting/?",
];

const TIMEOUT_MS = 15000;

/** 从 musicConfig.ts 的 meting 配置块里取出 server / type / id */
async function readMetingConfig() {
	const source = await readFile(CONFIG_PATH, "utf8");
	const block = source.match(/meting:\s*\{([\s\S]*?)\n\t\}/);
	if (!block) throw new Error("在 musicConfig.ts 里找不到 meting 配置块");
	const body = block[1];

	const pick = (key) => {
		const m = body.match(new RegExp(`\\b${key}:\\s*"([^"]*)"`));
		return m ? m[1] : "";
	};

	const server = pick("server");
	const type = pick("type");
	const id = pick("id");

	if (!server || !type || !id) {
		throw new Error(`meting 配置不完整：server=${server} type=${type} id=${id}`);
	}
	return { server, type, id };
}

/** 从上游返回的链接里提取歌曲/封面 id */
function idFromUrl(value) {
	if (typeof value !== "string" || !value) return "";
	const m = value.match(/[?&]id=([^&#]+)/);
	return m ? m[1] : "";
}

async function fetchJson(url) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
	try {
		const resp = await fetch(url, {
			signal: controller.signal,
			headers: { Accept: "application/json, */*" },
		});
		if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
		return await resp.json();
	} finally {
		clearTimeout(timer);
	}
}

async function fetchPlaylist({ server, type, id }) {
	let lastError = null;
	for (const base of UPSTREAMS) {
		const url = `${base}server=${server}&type=${type}&id=${id}&r=${Date.now()}`;
		try {
			const data = await fetchJson(url);
			if (Array.isArray(data) && data.length > 0) return data;
			lastError = new Error("接口返回空列表");
		} catch (e) {
			lastError = e;
		}
	}
	throw lastError || new Error("所有上游接口均失败");
}

async function main() {
	const config = await readMetingConfig();
	console.log(`[playlist] 读取配置：server=${config.server} type=${config.type} id=${config.id}`);

	const raw = await fetchPlaylist(config);
	console.log(`[playlist] 上游返回 ${raw.length} 首`);

	const tracks = raw
		.map((item) => {
			const songId = idFromUrl(item.url);
			return {
				n: item.name || item.title || "Unknown",
				a: item.artist || item.author || "Unknown",
				i: songId,
				p: idFromUrl(item.pic || item.cover),
			};
		})
		.filter((t) => t.i);

	const skipped = raw.length - tracks.length;
	if (skipped > 0) console.warn(`[playlist] 跳过 ${skipped} 首（拿不到歌曲 id）`);
	if (tracks.length === 0) throw new Error("没有解析出任何可用曲目，保留原有快照");

	const payload = {
		generatedAt: new Date().toISOString(),
		source: config,
		tracks,
	};

	await mkdir(dirname(OUT_PATH), { recursive: true });
	await writeFile(OUT_PATH, `${JSON.stringify(payload)}\n`, "utf8");

	const sizeKb = (JSON.stringify(payload).length / 1024).toFixed(1);
	console.log(`[playlist] 已写入 ${OUT_PATH}（${tracks.length} 首，${sizeKb} KB）`);
}

main().catch((e) => {
	console.error(`[playlist] 生成失败：${e.message}`);
	if (existsSync(OUT_PATH)) {
		console.error("[playlist] 已保留上一版快照，网页会回落到运行时拉取");
	}
	process.exit(1);
});
