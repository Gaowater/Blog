// biome-ignore lint/suspicious/noShadowRestrictedNames: <toString from mdast-util-to-string>
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function remarkReadingTime() {
	return (tree, { data }) => {
		const textOnPage = toString(tree);
		// reading-time 默认按英文算（约 200 词/分钟），
		// 但中文没有空格分隔，每个字会被算成一个"词"，导致时间偏长。
		// 所以把阅读速度设为 500 字/分钟，更适合中文阅读习惯。
		const readingTime = getReadingTime(textOnPage, { wordsPerMinute: 500 });
		data.astro.frontmatter.minutes = Math.max(
			1,
			Math.round(readingTime.minutes),
		);
		data.astro.frontmatter.words = readingTime.words;
	};
}
