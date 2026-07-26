import sharp from "sharp";
import { glob } from "glob";
import path from "node:path";
import fs from "node:fs";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const PHOTO_THUMB_WIDTH = 300;
const COVER_THUMB_WIDTH = 600;

async function generateThumbnails() {
	if (!fs.existsSync(GALLERY_DIR)) {
		console.log("  gallery 目录不存在，跳过");
		return;
	}

	const images = await glob("**/*.{jpg,jpeg,png,webp,avif,gif}", {
		cwd: GALLERY_DIR,
		nodir: true,
	});

	let count = 0;
	for (const image of images) {
		// 跳过已生成的缩略图
		if (image.includes("_thumb.")) continue;
		const inputPath = path.join(GALLERY_DIR, image);
		const parsed = path.parse(inputPath);
		const thumbName = `${parsed.name}_thumb.webp`;
		const thumbPath = path.join(parsed.dir, thumbName);

		// 跳过已存在且比原图新的缩略图
		if (fs.existsSync(thumbPath)) {
			const thumbStat = fs.statSync(thumbPath);
			const origStat = fs.statSync(inputPath);
			if (thumbStat.mtimeMs > origStat.mtimeMs) continue;
		}

		const isCover = parsed.name.toLowerCase().startsWith("cover");
		const width = isCover ? COVER_THUMB_WIDTH : PHOTO_THUMB_WIDTH;

		await sharp(inputPath)
			.resize(width, null, { withoutEnlargement: true })
			.webp({ quality: 80 })
			.toFile(thumbPath);

		const size = fs.statSync(thumbPath).size;
		console.log(`  ✓ ${thumbName} (${(size / 1024).toFixed(0)}KB)`);
		count++;
	}

	if (count === 0) {
		console.log("  所有缩略图已是最新，无需生成");
	} else {
		console.log(`  共生成 ${count} 张缩略图`);
	}
}

console.log("📷 生成相册缩略图...");
generateThumbnails()
	.then(() => console.log("✅ 缩略图生成完成"))
	.catch((err) => {
		console.error("❌ 缩略图生成失败:", err);
		process.exit(1);
	});
