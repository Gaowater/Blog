import {
	LinkPreset,
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";
import { siteConfig } from "./siteConfig";

// 根据页面开关动态生成导航栏配置
const getDynamicNavBarConfig = (): NavBarConfig => {
	// 基础导航栏链接
	const links: (NavBarLink | LinkPreset)[] = [
		// 主页
		LinkPreset.Home,

		// 归档
		LinkPreset.Archive,
	];

	// 根据配置决定是否添加手账，在siteConfig关闭pages.journal时导航栏不显示手账
	if (siteConfig.pages.journal) {
		// 手账内容修改：src/data/journal.ts
		links.push({
			name: "手账",
			url: "/journal/",
			icon: "material-symbols:edit-note",
		});
	}

	// 根据配置决定是否添加友链，在siteConfig关闭pages.friends时导航栏不显示友链
	if (siteConfig.pages.friends) {
		links.push(LinkPreset.Friends);
	}

	// 根据配置决定是否添加留言板，在siteConfig关闭pages.guestbook时导航栏不显示留言板
	if (siteConfig.pages.guestbook) {
		links.push(LinkPreset.Guestbook);
	}

	// 我的及其子菜单
	links.push({
		name: "我的",
		url: "/my/",
		icon: "material-symbols:person",
		children: [
			// 根据配置决定是否添加相册，在siteConfig关闭pages.gallery时导航栏不显示相册
			...(siteConfig.pages.gallery ? [LinkPreset.Gallery] : []),

			// ─────────────────────────────────────────────
			// 📁 驻足之旅（手动维护，不再使用 Bangumi API）
			// 数据文件：src/data/collections.ts
			// 修改那个文件里的数据就行
			// ─────────────────────────────────────────────
			{
				name: "驻足之旅",
				url: "/collections/",
				icon: "material-symbols:movie",
			},
		],
	});

	// 关于及其子菜单
	links.push({
		name: "关于",
		url: "/content/",
		icon: "material-symbols:info",
		children: [
			// 根据配置决定是否添加赞助，在siteConfig关闭pages.sponsor时导航栏不显示赞助
			...(siteConfig.pages.sponsor ? [LinkPreset.Sponsor] : []),

			// 关于页面
			LinkPreset.About,
		],
	});

	// 自定义导航栏链接,并且支持多级菜单
	links.push({
		name: "链接",
		url: "/links/",
		icon: "material-symbols:link",

		// 子菜单
		children: [
			{
				name: "GitHub",
				url: "https://github.com/Gaowater/Blog",
				external: true,
				icon: "fa7-brands:github",
			},
			{
				name: "Our 100 days",
				url: "https://853697.xyz",
				external: true,
				icon: "fa7-regular:chess-rook",
			},
			{
				name: "Our 200 days",
				url: "https://200days.853697.xyz/",
				external: true,
				icon: "material-symbols:celebration",
			},
			{
				name: "记账",
				url: "https://ledger.853697.xyz/",
				external: true,
				icon: "material-symbols:edit-note",
			},
		],
	});

	// 仅返回链接，其它导航搜索相关配置在模块顶层常量中独立导出
	return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
