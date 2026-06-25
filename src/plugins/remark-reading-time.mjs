// biome-ignore lint/suspicious/noShadowRestrictedNames: <toString from mdast-util-to-string>
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

/**
 * 深拷贝一个对象（用于克隆 AST，避免修改原树）
 */
function deepClone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

/**
 * 从 AST 中移除指定类型的节点（如 html、code 等），
 * 这样 toString() 就不会提取这些节点的文字。
 */
function removeNodeTypes(tree, types) {
	if (!tree || !tree.children) return;
	tree.children = tree.children.filter((node) => !types.includes(node.type));
	tree.children.forEach((child) => removeNodeTypes(child, types));
}

export function remarkReadingTime() {
	return (tree, { data }) => {
		// 克隆树，避免影响其他 remark 插件
		const cleanTree = deepClone(tree);
		// 从克隆树中剔除 html 节点（<style>/<script>/<div> 等嵌入的 UI HTML），
		// 以及 code 节点（代码块），避免它们的内容被计入字数
		removeNodeTypes(cleanTree, ["html", "code"]);
		const textOnPage = toString(cleanTree);

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
