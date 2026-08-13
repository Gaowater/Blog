import type { BackgroundWallpaperConfig } from "@/types/config";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	// 壁纸模式："banner" 横幅壁纸，"fullscreen" 全屏壁纸，"overlay" 全屏透明，"none" 纯色背景无壁纸
	mode: "overlay",
	// 是否允许用户通过导航栏切换壁纸模式
	// 且同时维护多种壁纸模式过于复杂（已经屎山代码），在切换时有时候可能会出现一些奇怪的过渡效果或者bug
	// 推荐只选择自己喜欢的模式并关闭切换功能
	switchable: true,
	/**
	 * 背景图片配置
	 * 图片路径支持三种格式：
	 * 1. public 目录（以 "/" 开头，不优化）："/assets/images/banner.avif"
	 * 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/banner.avif"
	 * 3. 远程 URL："https://example.com/banner.jpg"
	 * 注意：远程URL和public目录的图片不会被优化，请确保图片体积足够小以免影响加载速度
	 *
	 * 建议不要替换d1-d6，m1-m6这些默认示例图片，但你可以删除掉节省空间
	 * 因为以后可能会更换示例图片，导致你自定义的图片被覆盖
	 * 所以建议使用自己的图片的时候命名为其他名称，不要使用d1-d6，m1-m6这些名称
	 *
	 * 如果只使用一张图片或者使用随机图API，推荐直接使用字符串格式：
	 * desktop: "https://t.alcy.cc/pc",   // 随机图API
	 * desktop: "assets/images/DesktopWallpaper/d1.avif", // 单张图片
	 *
	 * mobile: "https://t.alcy.cc/mp", // 随机图API
	 * mobile: "assets/images/MobileWallpaper/m1.avif", // 单张图片
	 *
	 * 支持配置多张图片（数组），每次刷新页面随机显示一张：
	 * desktop: [
	 * "assets/images/DesktopWallpaper/d1.avif",
	 * "assets/images/DesktopWallpaper/d2.avif",
	 * ],
	 *
	 * mobile:[
	 *   "assets/images/MobileWallpaper/m1.avif",
	 *   "assets/images/MobileWallpaper/m2.avif",
	 * ],
	 */
	src: {
		// 桌面背景图片（支持单张或多张随机）
		// desktop: "assets/images/DesktopWallpaper/d1.avif",
		desktop: [
			"assets/images/DesktopWallpaper/背景图 (1).jpg",
			"assets/images/DesktopWallpaper/背景图 (2).jpg",
			"assets/images/DesktopWallpaper/背景图 (3).jpg",
			"assets/images/DesktopWallpaper/背景图 (4).jpg",
			"assets/images/DesktopWallpaper/背景图 (5).jpg",
			"assets/images/DesktopWallpaper/背景图 (6).jpg",
			"assets/images/DesktopWallpaper/背景图 (7).jpg",
			"assets/images/DesktopWallpaper/背景图 (8).jpg",
		],
		// 移动背景图片（支持单张或多张随机）
		// mobile: "assets/images/MobileWallpaper/m1.avif",
		mobile: [
			"assets/images/MobileWallpaper/移动端背景图 (1).jpg",
			"assets/images/MobileWallpaper/移动端背景图 (2).jpg",
			"assets/images/MobileWallpaper/移动端背景图 (3).jpg",
			"assets/images/MobileWallpaper/移动端背景图 (4).jpg",
			"assets/images/MobileWallpaper/移动端背景图 (5).jpg",
			"assets/images/MobileWallpaper/移动端背景图 (6).jpg",
			"assets/images/MobileWallpaper/移动端背景图 (7).jpg",
			"assets/images/MobileWallpaper/移动端背景图 (8).jpg",
		],
	},
	// 横幅壁纸和全屏壁纸共享配置
	common: {
		// 横幅文字遮罩暗度，0-1之间，值越大越暗
		dimOpacity: 0.2,
		// 主页横幅文字
		homeText: {
			// 是否启用主页横幅文字
			enable: true,
			// 是否允许用户通过控制面板切换横幅标题显示
			switchable: true,
			// 主页横幅主标题
			title: "宝宝，我喜欢你！",
			// 主页横幅主标题字体大小
			titleSize: "3.8rem",
			// 主页横幅副标题
			subtitle: [
				"既见君子，云胡不喜。",
				"愿我如星君如月，夜夜流光相皎洁。",
				"两情若是久长时，又岂在朝朝暮暮。",
				"玲珑骰子安红豆，入骨相思知不知。",
				"只愿君心似我心，定不负相思意。",
				"金风玉露一相逢，便胜却人间无数。",
				"执子之手，与子偕老。",
				"山有木兮木有枝，心悦君兮君不知。",
				"天涯地角有穷时，只有相思无尽处。",
				"此情无计可消除，才下眉头，却上心头。",
				"人间有味是清欢。",
				"行到水穷处，坐看云起时。",
				"若无闲事挂心头，便是人间好时节。",
				"且将新火试新茶，诗酒趁年华。",
				"春风得意马蹄疾，一日看尽长安花。",
				"正是江南好风景，落花时节又逢君。",
				"竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。",
				"采菊东篱下，悠然见南山。",
				"桃花流水窅然去，别有天地非人间。",
				"隆冬之中，我发现我体内有一个不可战胜的夏天。",
				"你在北京，我在合肥，南北各一方，但心往一处想。",
				"合肥到北京，一千公里，但我愿意。",
				"北京很冷吧？我的外套借你（虽然穿不上）。",
				"在家的时候，你离我只有几公里。",
				"在同一个城市呼吸的感觉真好。",
				"不用隔着屏幕说晚安了，真好。",
				"从 What's your name 开始，故事就没停过。",
				"今天也很想你，比昨天多一点。",
				"下次见面，想给你一个很长的拥抱。",
				"你发的每条消息，我都看了不止一遍。",
				"原来喜欢一个人的感觉，是连沉默都很舒服。",
				"好想再和你一起散步，漫无目的的那种。",
				"今天也是超级喜欢你的一天。",
				"你知道吗，你笑起来是最好看的。",
				"牵手的时候，心跳好快。",
				"你的手好小，握在手里刚刚好。",
				"从背后抱住你的时候，世界安静了下来。",
				"有你在，每一天都值得被记住。",
				"你是我的月亮，也是我的太阳。",
				"未来的每一天，都想和你一起走。",
				],
			// 主页横幅副标题字体大小
			subtitleSize: "1.0rem",
			typewriter: {
				// 是否启用打字机效果
				// 打字机开启 → 循环显示所有副标题
				// 打字机关闭 → 每次刷新随机显示一条副标题
				enable: true,
				// 打字速度（毫秒）
				speed: 120,
				// 删除速度（毫秒）
				deleteSpeed: 50,
				// 完全显示后的暂停时间（毫秒）
				pauseTime: 2400,
			},
		},
		// 导航栏配置
		navbar: {
			// 导航栏透明模式："semi" 半透明，"full" 完全透明，"semifull" 动态透明
			transparentMode: "semi",
			// 是否开启毛玻璃模糊效果，开启可能会影响页面性能，如果不开启则是半透明，请根据自己的喜好开启
			enableBlur: true,
			// 毛玻璃模糊度
			blur: 5,
		},
		// 水波纹动画效果配置，开启会影响页面性能，请根据自己的喜好开启
		waves: {
			enable: {
				// 桌面端是否启用水波纹动画效果
				desktop: true,
				// 移动端是否启用水波纹动画效果
				mobile: true,
			},
			// 是否允许用户通过控制面板切换水波纹动画
			switchable: true,
		},
		// 渐变过渡效果配置，当水波纹关闭时自动启用，提供壁纸底部到背景色的平滑过渡
		gradient: {
			enable: {
				// 桌面端是否启用渐变过渡
				desktop: true,
				// 移动端是否启用渐变过渡
				mobile: true,
			},
			// 渐变高度
			height: "15vh",
			// 是否允许用户通过控制面板切换渐变过渡
			switchable: true,
		},
	},
	// Banner模式特有配置
	banner: {
		// 图片位置
		// 支持所有CSS object-position值，如: 'top', 'center', 'bottom', 'left top', 'right bottom', '25% 75%', '10px 20px'..
		// 如果不知道怎么配置百分百之类的配置，推荐直接使用：'center'居中，'top'顶部居中，'bottom' 底部居中，'left'左侧居中，'right'右侧居中
		position: "0% 20%",
		// 横幅图片轮播配置，仅在当配置多张图片时生效
		carousel: {
			// 是否启用横幅图片轮播；关闭时保持每次刷新随机显示一张
			// 开启轮播可能会有点奇怪，为了让图片之间的切换自然，图片会在下一张加载完成后，当前图片才会消失，所以会导致过渡有重影，可能会影响观感
			// 目前还没有找到更好的过渡效果方案，所以如果你觉得轮播切换时的过渡效果不好，可以考虑关闭轮播，保持每次刷新随机显示一张图片
			// 反正我目前不是很满意这个过渡效果，所以默认关闭了，如果你有更好的过渡效果方案，欢迎提交PR改进这个功能
			enable: false,
			// 轮播切换间隔（毫秒）
			interval: 5000,
			// 是否允许用户通过控制面板切换横幅轮播
			switchable: false,
		},
	},
	// 全屏透明覆盖模式特有配置
	overlay: {
		// 是否允许用户通过控制面板调整全屏透明模式参数
		switchable: {
			opacity: true,
			blur: true,
			cardOpacity: true,
		},
		// 层级，确保壁纸在背景层
		zIndex: -1,
		// 壁纸透明度
		opacity: 0.69,
		// 背景模糊度
		blur: 10,
		// 卡片透明度，0-1之间，值越小越透明
		cardOpacity: 0.5,
	},
	// 全屏壁纸模式特有配置
	fullscreen: {
		// 图片位置
		position: "center",
		// 全屏壁纸轮播配置（多张图片时每隔 interval 毫秒切换）
		carousel: {
			enable: true,      // 启用全屏壁纸轮播
			interval: 8000,   // 8秒切换一张
			switchable: false, // 不显示切换开关
		},
	},
};
