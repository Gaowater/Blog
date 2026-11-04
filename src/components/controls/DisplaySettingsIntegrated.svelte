<script lang="ts">
import {
	WALLPAPER_BANNER,
	WALLPAPER_FULLSCREEN,
	WALLPAPER_NONE,
	WALLPAPER_OVERLAY,
} from "@constants/constants";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import {
	getAutoChromaForHue,
	getAutoLightnessForHue,
	getDefaultBannerCarouselEnabled,
	getDefaultBannerTitleEnabled,
	getDefaultGradientEnabled,
	getDefaultHue,
	getDefaultOverlayBlur,
	getDefaultOverlayCardOpacity,
	getDefaultOverlayOpacity,
	getDefaultSakuraEnabled,
	getDefaultWavesEnabled,
	getHue,
	getPrimaryChroma,
	getPrimaryLightness,
	getStoredBannerCarouselEnabled,
	getStoredBannerTitleEnabled,
	getStoredGradientEnabled,
	getStoredOverlayBlur,
	getStoredOverlayCardOpacity,
	getStoredOverlayOpacity,
	getStoredSakuraEnabled,
	getStoredWallpaperMode,
	getStoredWavesEnabled,
	resetPrimaryChroma,
	resetPrimaryLightness,
	setBannerCarouselEnabled,
	setBannerTitleEnabled,
	setGradientEnabled,
	setHue,
	setOverlayBlur,
	setOverlayCardOpacity,
	setOverlayOpacity,
	setPrimaryChroma,
	setPrimaryLightness,
	setSakuraEnabled,
	setWallpaperMode,
	setWavesEnabled,
} from "@utils/setting-utils";
import { onMount, tick } from "svelte";
import Icon from "@/components/common/Icon.svelte";
import { backgroundWallpaper, sakuraConfig, siteConfig } from "@/config";
import { DARK_MODE, LIGHT_MODE, SYSTEM_MODE } from "@/constants/constants";
import type { LIGHT_DARK_MODE, WALLPAPER_MODE } from "@/types/config";
import {
	applyDisplayPrefsToDocument,
	getStoredPostDensity,
	getStoredReduceMotion,
	getStoredSakuraDensity,
	getStoredTheme,
	setPostDensity,
	setReduceMotion,
	setSakuraDensity,
	setTheme,
	type PostDensity,
	type SakuraDensity,
} from "@utils/setting-utils";

type OverlaySliderItem = {
	key: "opacity" | "blur" | "cardOpacity";
	enabled: boolean;
	label: string;
	displayValue: string;
	ariaLabel: string;
	min: number;
	max: number;
	step: number;
	value: number;
	onValueChange: (value: number) => void;
};

let hue = $state(getHue());
const defaultHue = getDefaultHue();
let primaryLightness = $state(getPrimaryLightness() ?? getAutoLightnessForHue(hue));
let primaryChroma = $state(getPrimaryChroma() ?? getAutoChromaForHue(hue));
let wallpaperMode: WALLPAPER_MODE = $state(backgroundWallpaper.mode);
const defaultWallpaperMode = backgroundWallpaper.mode;
let currentLayout: "list" | "grid" = $state("list");
const defaultLayout = siteConfig.postListLayout.defaultMode;
const mobileDefaultLayout =
	siteConfig.postListLayout.mobileDefaultMode || defaultLayout;
let mounted = $state(false);
let isSmallScreen = $state(
	typeof window !== "undefined" ? window.innerWidth < 1200 : false,
);
let isMobileWidth = $state(
	typeof window !== "undefined" ? window.innerWidth < 780 : false,
);
let isSwitching = $state(false);
let wavesEnabled = $state(true);
const defaultWavesEnabled = getDefaultWavesEnabled();
let gradientEnabled = $state(true);
const defaultGradientEnabled = getDefaultGradientEnabled();
let bannerTitleEnabled = $state(true);
const defaultBannerTitleEnabled = getDefaultBannerTitleEnabled();
let bannerCarouselEnabled = $state(true);
const defaultBannerCarouselEnabled = getDefaultBannerCarouselEnabled();
let sakuraEnabled = $state(true);
const defaultSakuraEnabled = getDefaultSakuraEnabled();
let overlayOpacity = $state(getDefaultOverlayOpacity());
const defaultOverlayOpacity = getDefaultOverlayOpacity();
let overlayBlur = $state(getDefaultOverlayBlur());
const defaultOverlayBlur = getDefaultOverlayBlur();
let overlayCardOpacity = $state(getDefaultOverlayCardOpacity());
const defaultOverlayCardOpacity = getDefaultOverlayCardOpacity();

// ── 标签页与面板新增偏好 ──
type PanelTab = "look" | "bgm" | "motion" | "layout";
let activeTab = $state<PanelTab>("look");
let themeMode = $state<LIGHT_DARK_MODE>(LIGHT_MODE);
const HUE_PRESETS = [0, 32, 48, 148, 196, 252, 288, 332];
// 色相条与主色同源：都用当前亮度/彩度的 oklch()，避免滑块位置和实际颜色对不上
const hueBar = `linear-gradient(to right, ${Array.from(
	{ length: 13 },
	(_, i) => `oklch(var(--primary-l) var(--primary-c) ${i * 30})`,
).join(", ")})`;
let sakuraDensity = $state<SakuraDensity>(getStoredSakuraDensity());
let reduceMotion = $state(getStoredReduceMotion());
let postDensity = $state<PostDensity>(getStoredPostDensity());

const isWallpaperSwitchable = backgroundWallpaper.switchable ?? true;
const allowLayoutSwitch = siteConfig.postListLayout.allowSwitch;
let effectiveDefaultLayout = $derived(
	isMobileWidth ? mobileDefaultLayout : defaultLayout,
);
const showThemeColor = !siteConfig.themeColor.fixed;
// 是否允许用户切换水波纹动画（只看 switchable 配置）
const isWavesSwitchable =
	backgroundWallpaper.common?.waves?.switchable ?? false;
// 是否允许用户切换渐变过渡（只看 switchable 配置）
const isGradientSwitchable =
	backgroundWallpaper.common?.gradient?.switchable ?? false;
// 检查是否启用横幅标题配置
const isBannerTitleEnabled =
	backgroundWallpaper.common?.homeText?.enable ?? false;
// 是否允许用户切换横幅标题
const isBannerTitleSwitchable =
	isBannerTitleEnabled &&
	(backgroundWallpaper.common?.homeText?.switchable ?? false);
// 是否允许用户切换横幅轮播
const isBannerCarouselSwitchable =
	backgroundWallpaper.banner?.carousel?.switchable ?? false;
// 是否允许用户切换樱花特效
const isSakuraSwitchable = sakuraConfig?.switchable ?? false;
// 是否有任何横幅设置可显示（后续添加新设置时在此处添加条件）
const hasBannerSettings =
	isWavesSwitchable ||
	isGradientSwitchable ||
	isBannerTitleSwitchable ||
	isBannerCarouselSwitchable;
const overlaySwitchableConfig =
	backgroundWallpaper.overlay?.switchable ?? false;
const isOverlaySettingsSwitchable =
	typeof overlaySwitchableConfig === "boolean" ? overlaySwitchableConfig : true;
const isOverlayOpacitySwitchable =
	typeof overlaySwitchableConfig === "boolean"
		? overlaySwitchableConfig
		: (overlaySwitchableConfig.opacity ?? false);
const isOverlayBlurSwitchable =
	typeof overlaySwitchableConfig === "boolean"
		? overlaySwitchableConfig
		: (overlaySwitchableConfig.blur ?? false);
const isOverlayCardOpacitySwitchable =
	typeof overlaySwitchableConfig === "boolean"
		? overlaySwitchableConfig
		: (overlaySwitchableConfig.cardOpacity ?? false);
const hasOverlaySettings =
	isOverlaySettingsSwitchable &&
	(isOverlayOpacitySwitchable ||
		isOverlayBlurSwitchable ||
		isOverlayCardOpacitySwitchable);
let overlaySettingsIsDefault = $derived(
	(!isOverlayOpacitySwitchable || overlayOpacity === defaultOverlayOpacity) &&
		(!isOverlayBlurSwitchable || overlayBlur === defaultOverlayBlur) &&
		(!isOverlayCardOpacitySwitchable ||
			overlayCardOpacity === defaultOverlayCardOpacity),
);
// 横幅设置是否全部为默认值（用于控制恢复默认按钮的显隐）
let bannerSettingsIsDefault = $derived(
	(!isBannerTitleSwitchable ||
		bannerTitleEnabled === defaultBannerTitleEnabled) &&
		(!isWavesSwitchable || wavesEnabled === defaultWavesEnabled) &&
		(!isGradientSwitchable || gradientEnabled === defaultGradientEnabled) &&
		(!isBannerCarouselSwitchable ||
			bannerCarouselEnabled === defaultBannerCarouselEnabled),
);
const hasAnyContent =
	showThemeColor ||
	isWallpaperSwitchable ||
	allowLayoutSwitch ||
	hasBannerSettings ||
	hasOverlaySettings ||
	isSakuraSwitchable;

let overlaySliderItems = $derived<OverlaySliderItem[]>([
	{
		key: "opacity",
		enabled: isOverlayOpacitySwitchable,
		label: i18n(I18nKey.overlayOpacity),
		displayValue: `${Math.round(overlayOpacity * 100)}%`,
		ariaLabel: i18n(I18nKey.overlayOpacity),
		min: 20,
		max: 100,
		step: 1,
		value: Math.round(overlayOpacity * 100),
		onValueChange: (value) => {
			overlayOpacity = value / 100;
		},
	},
	{
		key: "blur",
		enabled: isOverlayBlurSwitchable,
		label: i18n(I18nKey.overlayBlur),
		displayValue: `${overlayBlur.toFixed(1)}px`,
		ariaLabel: i18n(I18nKey.overlayBlur),
		min: 0,
		max: 20,
		step: 0.5,
		value: overlayBlur,
		onValueChange: (value) => {
			overlayBlur = value;
		},
	},
	{
		key: "cardOpacity",
		enabled: isOverlayCardOpacitySwitchable,
		label: i18n(I18nKey.overlayCardOpacity),
		displayValue: `${Math.round(overlayCardOpacity * 100)}%`,
		ariaLabel: i18n(I18nKey.overlayCardOpacity),
		min: 20,
		max: 100,
		step: 1,
		value: Math.round(overlayCardOpacity * 100),
		onValueChange: (value) => {
			overlayCardOpacity = value / 100;
		},
	},
]);

function resetHue() {
	hue = getDefaultHue();
}

function resetWallpaperMode() {
	wallpaperMode = defaultWallpaperMode;
	setWallpaperMode(defaultWallpaperMode);
}

function resetLayout() {
	currentLayout = effectiveDefaultLayout;
	localStorage.removeItem("postListLayout");

	// 触发自定义事件，通知页面布局已改变
	const event = new CustomEvent("layoutChange", {
		detail: { layout: effectiveDefaultLayout },
	});
	window.dispatchEvent(event);
}

function resetWavesEnabled() {
	wavesEnabled = defaultWavesEnabled;
	setWavesEnabled(defaultWavesEnabled);
}

function resetGradientEnabled() {
	gradientEnabled = defaultGradientEnabled;
	setGradientEnabled(defaultGradientEnabled);
}

function resetBannerSettings() {
	if (
		isBannerTitleSwitchable &&
		bannerTitleEnabled !== defaultBannerTitleEnabled
	) {
		bannerTitleEnabled = defaultBannerTitleEnabled;
		setBannerTitleEnabled(defaultBannerTitleEnabled);
	}
	if (isWavesSwitchable && wavesEnabled !== defaultWavesEnabled) {
		wavesEnabled = defaultWavesEnabled;
		setWavesEnabled(defaultWavesEnabled);
	}
	if (isGradientSwitchable && gradientEnabled !== defaultGradientEnabled) {
		gradientEnabled = defaultGradientEnabled;
		setGradientEnabled(defaultGradientEnabled);
	}
	if (
		isBannerCarouselSwitchable &&
		bannerCarouselEnabled !== defaultBannerCarouselEnabled
	) {
		bannerCarouselEnabled = defaultBannerCarouselEnabled;
		setBannerCarouselEnabled(defaultBannerCarouselEnabled);
	}
}

function resetOverlaySettings() {
	if (isOverlayOpacitySwitchable && overlayOpacity !== defaultOverlayOpacity) {
		overlayOpacity = defaultOverlayOpacity;
		setOverlayOpacity(defaultOverlayOpacity);
	}
	if (isOverlayBlurSwitchable && overlayBlur !== defaultOverlayBlur) {
		overlayBlur = defaultOverlayBlur;
		setOverlayBlur(defaultOverlayBlur);
	}
	if (
		isOverlayCardOpacitySwitchable &&
		overlayCardOpacity !== defaultOverlayCardOpacity
	) {
		overlayCardOpacity = defaultOverlayCardOpacity;
		setOverlayCardOpacity(defaultOverlayCardOpacity);
	}
}

// 水波纹与渐变过渡互斥：开一个自动关另一个（两者都画在壁纸底边，叠加会互相干扰）
function toggleWavesEnabled() {
	const next = !wavesEnabled;
	wavesEnabled = next;
	setWavesEnabled(next);
	if (next && isGradientSwitchable && gradientEnabled) {
		gradientEnabled = false;
		setGradientEnabled(false);
	}
}

function toggleGradientEnabled() {
	const next = !gradientEnabled;
	gradientEnabled = next;
	setGradientEnabled(next);
	if (next && isWavesSwitchable && wavesEnabled) {
		wavesEnabled = false;
		setWavesEnabled(false);
	}
}

function toggleBannerTitleEnabled() {
	bannerTitleEnabled = !bannerTitleEnabled;
	setBannerTitleEnabled(bannerTitleEnabled);
}

function toggleBannerCarouselEnabled() {
	bannerCarouselEnabled = !bannerCarouselEnabled;
	setBannerCarouselEnabled(bannerCarouselEnabled);
}

function toggleSakuraEnabled() {
	sakuraEnabled = !sakuraEnabled;
	setSakuraEnabled(sakuraEnabled);
}

function switchWallpaperMode(newMode: WALLPAPER_MODE) {
	wallpaperMode = newMode;
	setWallpaperMode(newMode);
	window.scrollTo({ top: 0 });

	if (newMode === WALLPAPER_OVERLAY) {
	}
}

function checkScreenSize() {
	isSmallScreen = window.innerWidth < 1200;
	isMobileWidth = window.innerWidth < 780;
	// 低于380px强制网格模式
	if (window.innerWidth < 380 && currentLayout === "list") {
		currentLayout = "grid";
		const event = new CustomEvent("layoutChange", {
			detail: { layout: "grid" },
		});
		window.dispatchEvent(event);
	}
}

function switchLayout() {
	if (!mounted || isSwitching) return;

	isSwitching = true;
	currentLayout = currentLayout === "list" ? "grid" : "list";
	localStorage.setItem("postListLayout", currentLayout);

	// 触发自定义事件，通知页面布局已改变
	const event = new CustomEvent("layoutChange", {
		detail: { layout: currentLayout },
	});
	window.dispatchEvent(event);

	// 动画完成后重置状态
	setTimeout(() => {
		isSwitching = false;
	}, 500);
}

// ── 新增控件的处理函数 ──
function switchThemeMode(mode: LIGHT_DARK_MODE) {
	themeMode = mode;
	setTheme(mode);
}

function updateSakuraDensity(density: SakuraDensity) {
	sakuraDensity = density;
	setSakuraDensity(density);
}

function toggleReduceMotion() {
	reduceMotion = !reduceMotion;
	setReduceMotion(reduceMotion);
}

function updatePostDensity(density: PostDensity) {
	postDensity = density;
	setPostDensity(density);
}

function resetAllSettings() {
	hue = defaultHue;
	primaryLightness = getAutoLightnessForHue(defaultHue);
	primaryChroma = getAutoChromaForHue(defaultHue);
	resetWallpaperMode();
	resetBannerSettings();
	resetOverlaySettings();
	resetLayout();
	sakuraEnabled = defaultSakuraEnabled;
	setSakuraEnabled(defaultSakuraEnabled);
	sakuraDensity = "mid";
	setSakuraDensity("mid");
	reduceMotion = false;
	setReduceMotion(false);
	postDensity = "comfortable";
	setPostDensity("comfortable");
}

onMount(() => {
	themeMode = getStoredTheme();
	applyDisplayPrefsToDocument();
});

onMount(() => {
	mounted = true;
	checkScreenSize();

	// 从localStorage读取保存的壁纸模式
	wallpaperMode = getStoredWallpaperMode();

	// 从localStorage读取水波纹动画状态
	wavesEnabled = getStoredWavesEnabled();

	// 从localStorage读取渐变过渡状态
	gradientEnabled = getStoredGradientEnabled();
	// 历史偏好里可能两个都开着，按原设计优先级保留水波纹、关掉渐变
	if (wavesEnabled && gradientEnabled) {
		gradientEnabled = false;
		setGradientEnabled(false);
	}

	// 从localStorage读取横幅标题状态
	bannerTitleEnabled = getStoredBannerTitleEnabled();

	// 从localStorage读取横幅轮播状态
	bannerCarouselEnabled = getStoredBannerCarouselEnabled();

	// 从localStorage读取樱花特效状态
	sakuraEnabled = getStoredSakuraEnabled();

	// 从localStorage读取全屏透明设置状态
	overlayOpacity = getStoredOverlayOpacity();
	overlayBlur = getStoredOverlayBlur();
	overlayCardOpacity = getStoredOverlayCardOpacity();

	// 从localStorage读取用户偏好布局
	const savedLayout = localStorage.getItem("postListLayout");
	if (savedLayout && (savedLayout === "list" || savedLayout === "grid")) {
		currentLayout = savedLayout;
	} else {
		currentLayout =
			window.innerWidth < 780 ? mobileDefaultLayout : defaultLayout;
	}

	// 监听窗口大小变化
	window.addEventListener("resize", checkScreenSize);

	return () => {
		window.removeEventListener("resize", checkScreenSize);
	};
});

// 监听布局变化事件
onMount(() => {
	const handleCustomEvent = (event: Event) => {
		const customEvent = event as CustomEvent<{ layout: "list" | "grid" }>;
		currentLayout = customEvent.detail.layout;
	};

	window.addEventListener("layoutChange", handleCustomEvent);

	return () => {
		window.removeEventListener("layoutChange", handleCustomEvent);
	};
});


onMount(() => {
	const handleWallpaperModeChange = (event: Event) => {
		const customEvent = event as CustomEvent<{ mode: WALLPAPER_MODE }>;
		wallpaperMode = customEvent.detail.mode;
	};

	window.addEventListener("wallpaperModeChange", handleWallpaperModeChange);

	return () => {
		window.removeEventListener(
			"wallpaperModeChange",
			handleWallpaperModeChange,
		);
	};
});

$effect(() => {
	if (hue || hue === 0) {
		setHue(hue);
		// 当主滑块变化时，如果用户没有手动微调亮度和彩度，更新为自动值
		if (!getPrimaryLightness()) {
			const autoL = getAutoLightnessForHue(hue);
			primaryLightness = autoL;
		}
		if (!getPrimaryChroma()) {
			const autoC = getAutoChromaForHue(hue);
			primaryChroma = autoC;
		}
	}
});

$effect(() => {
	if (primaryLightness || primaryLightness === 0) {
		setPrimaryLightness(primaryLightness);
	}
});

$effect(() => {
	if (primaryChroma || primaryChroma === 0) {
		setPrimaryChroma(primaryChroma);
	}
});

$effect(() => {
	if (wallpaperMode === WALLPAPER_OVERLAY) {
		if (isOverlayOpacitySwitchable) {
			setOverlayOpacity(overlayOpacity);
		}
		if (isOverlayBlurSwitchable) {
			setOverlayBlur(overlayBlur);
		}
		if (isOverlayCardOpacitySwitchable) {
			setOverlayCardOpacity(overlayCardOpacity);
		}
	}
});
</script>

{#if hasAnyContent}
<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 py-0 px-0 overflow-hidden">
    <!-- 标题栏 -->
    <div class="flex items-center gap-2 px-4 pt-3.5 pb-3">
        <div class="text-(--primary) flex items-center">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="block w-[1.05rem] h-[1.05rem]"
            >
                <path d="M3.6 6.8h6.3" />
                <path d="M16.1 6.8h4.3" />
                <circle cx="14" cy="6.8" r="2.05" />
                <path d="M3.6 12h2" />
                <path d="M9.7 12h10.7" />
                <circle cx="7.6" cy="12" r="2.05" />
                <path d="M3.6 17.2h11.7" />
                <path d="M19.4 17.2h1" />
                <circle cx="17.3" cy="17.2" r="2.05" />
            </svg>
        </div>
        <span class="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            {i18n(I18nKey.displaySettings)}
        </span>
        <div class="flex-1"></div>
        <button
            aria-label={i18n(I18nKey.resetAll)}
            class="btn-regular h-7 px-2 rounded-md flex items-center gap-1 text-[0.7rem] text-(--btn-content) active:scale-90"
            onclick={resetAllSettings}
        >
            <Icon icon="fa7-solid:arrow-rotate-left" class="text-[0.7rem]"></Icon>
            <span>{i18n(I18nKey.resetAll)}</span>
        </button>
    </div>

    <!-- 标签页 -->
    <div class="flex gap-1 px-2.5 border-b border-(--line-divider)">
        <button class="ds-tab" class:ds-tab-on={activeTab === "look"} onclick={() => (activeTab = "look")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="8.5" />
                <circle cx="9.5" cy="9.5" r="0.9" />
                <circle cx="14.5" cy="9.5" r="0.9" />
                <circle cx="9.5" cy="14" r="0.9" />
                <circle cx="14" cy="14" r="0.9" />
            </svg>
            <span>{i18n(I18nKey.appearanceTab)}</span>
        </button>
        <button class="ds-tab" class:ds-tab-on={activeTab === "bgm"} onclick={() => (activeTab = "bgm")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
                <path d="m6 16 3.5-3.5L12 15l2.5-2.5L18 16" />
                <circle cx="8.5" cy="8.5" r="1.1" />
            </svg>
            <span>{i18n(I18nKey.backgroundTab)}</span>
        </button>
        <button class="ds-tab" class:ds-tab-on={activeTab === "motion"} onclick={() => (activeTab = "motion")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3.5 13.6 9 19 10.6 13.6 12.2 12 17.7 10.4 12.2 5 10.6 10.4 9z" />
                <path d="M18.5 16.5l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" />
            </svg>
            <span>{i18n(I18nKey.motionTab)}</span>
        </button>
        <button class="ds-tab" class:ds-tab-on={activeTab === "layout"} onclick={() => (activeTab = "layout")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
                <path d="M3.5 10h17M10 10v9.5" />
            </svg>
            <span>{i18n(I18nKey.layoutTab)}</span>
        </button>
    </div>

    <div class="ds-body">
        <!-- ══════ 外观 ══════ -->
        {#if activeTab === "look"}
        <div class="ds-group">{i18n(I18nKey.appearanceTab)}</div>

        <div class="ds-seg ds-seg-3 mb-3">
            <button class:on={themeMode === LIGHT_MODE} onclick={() => switchThemeMode(LIGHT_MODE)}>
                <Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1rem]"></Icon>
                <span>{i18n(I18nKey.lightMode)}</span>
            </button>
            <button class:on={themeMode === DARK_MODE} onclick={() => switchThemeMode(DARK_MODE)}>
                <Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1rem]"></Icon>
                <span>{i18n(I18nKey.darkMode)}</span>
            </button>
            <button class:on={themeMode === SYSTEM_MODE} onclick={() => switchThemeMode(SYSTEM_MODE)}>
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="block w-[1rem] h-[1rem]"
                >
                    <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.7" />
                    <path d="M12 3.6a8.4 8.4 0 0 1 0 16.8z" fill="currentColor" />
                </svg>
                <span>{i18n(I18nKey.systemMode)}</span>
            </button>
        </div>

        {#if showThemeColor}
        <div class="ds-group">{i18n(I18nKey.themeColor)}</div>

        <div class="ds-swatches">
            {#each HUE_PRESETS as preset (preset)}
            <button
                aria-label={`色相 ${preset}`}
                class="ds-swatch"
                class:on={hue === preset}
                style={`background: oklch(var(--primary-l) var(--primary-c) ${preset})`}
                onclick={() => {
                    hue = preset;
                }}
            ></button>
            {/each}
        </div>

        <div class="w-full mt-3 select-none">
            <input aria-label={i18n(I18nKey.themeColor)} type="range" min="0" max="360" bind:value={hue}
                   class="slider" id="colorSlider" step="1" style={`width: 100%; background-image: ${hueBar};`}>
        </div>

        <div class="ds-field ds-field-gap">
            <div class="ds-group ds-group-row">
                <span>亮度</span>
                <span class="ds-group-val">{Math.round(primaryLightness * 100)}%</span>
            </div>
            <div class="ds-card">
                <input aria-label="主色亮度微调" type="range" min="0.50" max="0.90" step="0.01"
                       bind:value={primaryLightness} class="slider w-full"
                       style={`--range-progress: ${(((primaryLightness - 0.5) / 0.4) * 100).toFixed(2)}%`} />
            </div>
        </div>

        <div class="ds-field">
            <div class="ds-group ds-group-row">
                <span>彩度</span>
                <span class="ds-group-val">{Math.round(primaryChroma * 100)}%</span>
            </div>
            <div class="ds-card">
                <input aria-label="主色彩度微调" type="range" min="0.06" max="0.22" step="0.005"
                       bind:value={primaryChroma} class="slider w-full"
                       style={`--range-progress: ${(((primaryChroma - 0.06) / 0.16) * 100).toFixed(2)}%`} />
            </div>
        </div>
        {/if}
        {/if}

        <!-- ══════ 背景 ══════ -->
        {#if activeTab === "bgm"}
        {#if isWallpaperSwitchable}
        <div class="ds-group">{i18n(I18nKey.wallpaperMode)}</div>
        <div class="ds-wp">
            <button class="ds-wp-card" class:on={wallpaperMode === WALLPAPER_BANNER} onclick={() => switchWallpaperMode(WALLPAPER_BANNER)}>
                <div class="ds-wp-pv"><span class="band"></span><span class="ln"></span></div>
                <span class="nm">{i18n(I18nKey.wallpaperBannerMode)}</span>
            </button>
            <button class="ds-wp-card" class:on={wallpaperMode === WALLPAPER_FULLSCREEN} onclick={() => switchWallpaperMode(WALLPAPER_FULLSCREEN)}>
                <div class="ds-wp-pv"><span class="full"></span><span class="card"></span></div>
                <span class="nm">{i18n(I18nKey.wallpaperFullscreenMode)}</span>
            </button>
            <button class="ds-wp-card" class:on={wallpaperMode === WALLPAPER_OVERLAY} onclick={() => switchWallpaperMode(WALLPAPER_OVERLAY)}>
                <div class="ds-wp-pv"><span class="full"></span><span class="card ghost"></span></div>
                <span class="nm">{i18n(I18nKey.wallpaperOverlayMode)}</span>
            </button>
            <button class="ds-wp-card" class:on={wallpaperMode === WALLPAPER_NONE} onclick={() => switchWallpaperMode(WALLPAPER_NONE)}>
                <div class="ds-wp-pv plain"><span class="ln"></span><span class="ln"></span><span class="ln"></span></div>
                <span class="nm">{i18n(I18nKey.wallpaperNoneMode)}</span>
            </button>
        </div>
        {/if}

        {#if hasBannerSettings}
        <div class="ds-group mt-3">{i18n(I18nKey.wallpaperSettings)}</div>
        {#if isBannerTitleSwitchable}
        <button class="ds-row" onclick={toggleBannerTitleEnabled}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                 class="shrink-0 w-[1.05rem] h-[1.05rem]">
                <path d="M6 6.2h12" />
                <path d="M12 6.2v11.6" />
                <path d="M9 17.8h6" />
            </svg>
            <span class="flex-1 text-left">{i18n(I18nKey.wallpaperTitle)}</span>
            <span class="ds-sw" class:on={bannerTitleEnabled}><i></i></span>
        </button>
        {/if}
        {#if isBannerCarouselSwitchable}
        <button class="ds-row" onclick={toggleBannerCarouselEnabled}>
            <Icon icon="material-symbols:view-carousel-outline" class="text-[1.1rem] shrink-0"></Icon>
            <span class="flex-1 text-left">{i18n(I18nKey.wallpaperCarousel)}</span>
            <span class="ds-sw" class:on={bannerCarouselEnabled}><i></i></span>
        </button>
        {/if}
        {/if}

        {#if hasOverlaySettings}
        <div class="ds-group mt-3">{i18n(I18nKey.overlayGroup)}</div>
        <div class:opacity-40={wallpaperMode !== WALLPAPER_OVERLAY} class:pointer-events-none={wallpaperMode !== WALLPAPER_OVERLAY}>
            {#each overlaySliderItems as item (item.key)}
                {#if item.enabled}
                <div class="ds-field">
                    <div class="ds-field-head">
                        <span>{item.label}</span>
                        <span>{item.displayValue}</span>
                    </div>
                    <input
                        aria-label={item.ariaLabel}
                        type="range"
                        min={item.min}
                        max={item.max}
                        step={item.step}
                        value={item.value}
                        oninput={(e) => item.onValueChange(Number((e.currentTarget as HTMLInputElement).value))}
                        class="slider w-full overlay-slider"
                        style={`--range-progress: ${(((item.value - item.min) / (item.max - item.min)) * 100).toFixed(2)}%`}
                    />
                </div>
                {/if}
            {/each}
        </div>
        <div class="ds-hint">选「{i18n(I18nKey.wallpaperOverlayMode)}」后这三项才会生效</div>
        {/if}
        {/if}

        <!-- ══════ 动效 ══════ -->
        {#if activeTab === "motion"}
        <div class="ds-group">{i18n(I18nKey.motionTab)}</div>
        {#if isWavesSwitchable}
        <button class="ds-row" onclick={toggleWavesEnabled}>
            <Icon icon="material-symbols:airwave-rounded" class="text-[1.1rem] shrink-0"></Icon>
            <span class="flex-1 text-left">{i18n(I18nKey.wavesAnimation)}</span>
            <span class="ds-sw" class:on={wavesEnabled}><i></i></span>
        </button>
        {/if}
        {#if isGradientSwitchable}
        <button class="ds-row" onclick={toggleGradientEnabled}>
            <Icon icon="material-symbols:gradient" class="text-[1.1rem] shrink-0"></Icon>
            <span class="flex-1 text-left">{i18n(I18nKey.gradientTransition)}</span>
            <span class="ds-sw" class:on={gradientEnabled}><i></i></span>
        </button>
        {/if}

        {#if isSakuraSwitchable}
        <div class="ds-group mt-3">{i18n(I18nKey.effectsSettings)}</div>
        <button class="ds-row" onclick={toggleSakuraEnabled}>
            <Icon icon="mdi:flower-poppy" class="text-[1.1rem] shrink-0"></Icon>
            <span class="flex-1 text-left">{i18n(I18nKey.sakuraEffect)}</span>
            <span class="ds-sw" class:on={sakuraEnabled}><i></i></span>
        </button>
        <div class="ds-field">
            <div class="ds-field-head">
                <span>{i18n(I18nKey.sakuraDensity)}</span>
                <span>{sakuraDensity === "low" ? i18n(I18nKey.densityLow) : sakuraDensity === "high" ? i18n(I18nKey.densityHigh) : i18n(I18nKey.densityMid)}</span>
            </div>
            <div class="ds-seg">
                <button class:on={sakuraDensity === "low"} onclick={() => updateSakuraDensity("low")}>{i18n(I18nKey.densityLow)}</button>
                <button class:on={sakuraDensity === "mid"} onclick={() => updateSakuraDensity("mid")}>{i18n(I18nKey.densityMid)}</button>
                <button class:on={sakuraDensity === "high"} onclick={() => updateSakuraDensity("high")}>{i18n(I18nKey.densityHigh)}</button>
            </div>
        </div>
        {/if}

        <div class="mt-3"></div>
        <button class="ds-row" onclick={toggleReduceMotion}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                 class="shrink-0 w-[1.05rem] h-[1.05rem]">
                <circle cx="12" cy="12" r="8.4" />
                <path d="m6.2 17.8 11.6-11.6" />
            </svg>
            <span class="flex-1 text-left">{i18n(I18nKey.reduceMotion)}</span>
            <span class="ds-sw" class:on={reduceMotion}><i></i></span>
        </button>
        <div class="ds-hint">关闭位移与粒子动画，只保留淡入淡出。</div>
        {/if}

        <!-- ══════ 布局 ══════ -->
        {#if activeTab === "layout"}
        {#if allowLayoutSwitch}
        <div class="ds-group">{i18n(I18nKey.postListLayout)}</div>
        <div class="ds-seg mb-3">
            <button class:on={currentLayout === "list"} disabled={isSwitching} onclick={switchLayout}>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
                <span>{i18n(I18nKey.postListLayoutList)}</span>
            </button>
            <button class:on={currentLayout === "grid"} disabled={isSwitching} onclick={switchLayout}>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/></svg>
                <span>{i18n(I18nKey.postListLayoutGrid)}</span>
            </button>
        </div>

        <div class="ds-field">
            <div class="ds-field-head">
                <span>{i18n(I18nKey.postDensity)}</span>
                <span>{postDensity === "compact" ? i18n(I18nKey.densityCompact) : i18n(I18nKey.densityComfortable)}</span>
            </div>
            <div class="ds-seg">
                <button class:on={postDensity === "comfortable"} onclick={() => updatePostDensity("comfortable")}>{i18n(I18nKey.densityComfortable)}</button>
                <button class:on={postDensity === "compact"} onclick={() => updatePostDensity("compact")}>{i18n(I18nKey.densityCompact)}</button>
            </div>
        </div>

        <div class="ds-group ds-group-gap">{i18n(I18nKey.previewLabel)}</div>
        <div
            class="ds-layout-pv"
            class:is-list={currentLayout === "list"}
            class:is-compact={postDensity === "compact"}
        >
            <span class="pin"></span>
            <span class="sub"></span><span class="sub"></span>
            <span class="sub"></span><span class="sub"></span>
        </div>
        {/if}
        {/if}
    </div>
</div>
{/if}

<style lang="stylus">
    #display-setting
        input[type="range"]
            -webkit-appearance none
            appearance none
            display block
            width 100%
            height 0.55rem
            margin 0.6rem 0
            border-radius 999px
            background-image unquote("linear-gradient(90deg, var(--primary) 0 var(--range-progress, 50%), var(--btn-regular-bg-active) var(--range-progress, 50%) 100%)")
            background-size 100% 100%
            background-repeat no-repeat
            transition background-image 0.15s ease-in-out
            cursor pointer

            &::-webkit-slider-runnable-track
                height 0.55rem
                border-radius 999px
                background transparent

            &::-webkit-slider-thumb
                -webkit-appearance none
                appearance none
                width 1.1rem
                height 1.1rem
                border-radius 50%
                background #fff
                border 1px solid rgba(20, 30, 50, 0.08)
                box-shadow 0 1px 3px rgba(20, 30, 50, 0.22)
                margin-top -0.275rem

            &::-moz-range-thumb
                width 1.1rem
                height 1.1rem
                border-radius 50%
                background #fff
                border 1px solid rgba(20, 30, 50, 0.08)
                box-shadow 0 1px 3px rgba(20, 30, 50, 0.22)

            &::-moz-range-track
                height 0.55rem
                border-radius 999px
                background transparent

            &::-ms-thumb
                width 1.1rem
                height 1.1rem
                border-radius 50%
                background #fff
                border 1px solid rgba(20, 30, 50, 0.08)

            &:focus-visible
                outline 2px solid var(--primary)
                outline-offset 3px

    /* ══════ 标签页式面板 ══════ */
    .ds-body
        padding 0.85rem 1rem 1.1rem
        height 22.5rem
        overflow-y auto
        scrollbar-width thin
        scrollbar-color unquote("color-mix(in oklab, var(--primary) 38%, transparent)") transparent

        &::-webkit-scrollbar
            width 4px

        &::-webkit-scrollbar-track
            background transparent

        &::-webkit-scrollbar-thumb
            background unquote("color-mix(in oklab, var(--primary) 30%, transparent)")
            border-radius 999px

        &:hover
            &::-webkit-scrollbar-thumb
                background unquote("color-mix(in oklab, var(--primary) 55%, transparent)")

        &::-webkit-scrollbar-thumb:hover
            background var(--primary)

    .ds-group
        font-size 0.7rem
        letter-spacing 0.16em
        color var(--content-meta)
        margin 0.125rem 0 0.5rem

    .ds-group.ds-group-gap
        margin-top 1.3rem

    .ds-tab
        flex 1
        display flex
        flex-direction column
        align-items center
        gap 0.25rem
        padding 0.65rem 0.125rem 0.6rem
        font-size 0.76rem
        color var(--content-meta)
        background none
        border none
        border-bottom 2px solid transparent
        cursor pointer
        transition color 0.18s

        svg
            width 1.2rem
            height 1.2rem

        &:hover
            color var(--deep-text)

    .ds-tab-on
        color var(--primary)
        border-bottom-color var(--primary)

    .ds-seg
        display flex
        gap 0.375rem
        background var(--btn-regular-bg)
        border-radius 0.5rem
        padding 0.25rem

        button
            flex 1
            display flex
            align-items center
            justify-content center
            gap 0.375rem
            padding 0.46rem 0.25rem
            font-size 0.8rem
            color var(--btn-content)
            background transparent
            border none
            border-radius 0.375rem
            cursor pointer
            transition all 0.18s

            &:disabled
                opacity 0.6
                cursor default

            &.on
                background var(--card-bg)
                color var(--primary)
                box-shadow 0 1px 3px rgba(20, 30, 50, 0.12)

    .ds-seg-3 button
        flex-direction column
        gap 0.2rem
        font-size 0.72rem

    .ds-swatches
        display flex
        gap 0.4rem
        margin-top 0.25rem

    .ds-swatch
        width 1.75rem
        height 1.75rem
        border-radius 0.5rem
        border 2px solid transparent
        cursor pointer
        transition transform 0.15s, box-shadow 0.15s

        &:hover
            transform translateY(-1px)

        &.on
            border-color var(--card-bg)
            box-shadow 0 0 0 2px var(--primary)

    .ds-field
        margin-top 0.6rem

    .ds-group-row
        display flex
        justify-content space-between
        align-items baseline

    .ds-group-val
        letter-spacing 0.02em
        font-variant-numeric tabular-nums

    .ds-field.ds-field-gap
        margin-top 1.35rem

    .ds-card
        background var(--btn-regular-bg)
        border-radius 0.6rem
        padding 0.3rem 0.6rem 0.25rem

        input[type="range"]
            margin 0.35rem 0

    .ds-field-head
        display flex
        justify-content space-between
        align-items baseline
        font-size 0.8rem
        color var(--content-meta)
        margin-bottom 0.3rem

    .ds-row
        display flex
        align-items center
        gap 0.65rem
        width 100%
        padding 0.7rem 0.75rem
        margin-bottom 0.4rem
        border-radius 0.6rem
        background var(--btn-card-bg-hover)
        border none
        color var(--deep-text)
        font-size 0.85rem
        cursor pointer
        transition background 0.18s

        &:hover
            background var(--btn-regular-bg)

    .ds-sw
        position relative
        width 2.5rem
        height 1.4rem
        border-radius 999px
        background var(--btn-regular-bg-active)
        flex none
        transition background 0.2s

        i
            position absolute
            top 2px
            left 2px
            width 1.1rem
            height 1.1rem
            border-radius 50%
            background #fff
            transition left 0.2s

        &.on
            background var(--primary)

            i
                left 1.3rem

    .ds-wp
        display grid
        grid-template-columns 1fr 1fr
        gap 0.5rem

    .ds-wp-card
        display flex
        flex-direction column
        gap 0.3rem
        padding 0.4rem
        border 1px solid var(--line-divider)
        border-radius 0.6rem
        background var(--card-bg)
        cursor pointer
        transition border-color 0.18s, box-shadow 0.18s

        &:hover
            border-color unquote("color-mix(in oklab, var(--primary) 45%, transparent)")

        &.on
            border-color var(--primary)
            box-shadow 0 0 0 2px unquote("color-mix(in oklab, var(--primary) 18%, transparent)")

        .nm
            font-size 0.68rem
            color var(--content-meta)
            text-align left

        &.on .nm
            color var(--primary)

    .ds-wp-pv
        position relative
        height 2.8rem
        border-radius 0.4rem
        background var(--btn-regular-bg)
        overflow hidden

        .band
            position absolute
            left 0
            right 0
            top 0
            height 0.9rem
            background var(--btn-regular-bg-active)

        .full
            position absolute
            inset 0
            background var(--btn-regular-bg-active)

        .card
            position absolute
            left 0.4rem
            right 0.4rem
            top 0.5rem
            bottom 0.4rem
            border-radius 0.25rem
            background var(--card-bg)

            &.ghost
                opacity 0.55

        .ln
            position absolute
            left 0.4rem
            right 0.4rem
            bottom 0.4rem
            height 3px
            border-radius 2px
            background var(--btn-regular-bg-active)

    /* 纯色背景：三条文本骨架线，首行短，像一张纯文字页面 */
    .ds-wp-pv.plain
        display flex
        flex-direction column
        justify-content center
        gap 0.3rem
        padding 0 0.55rem

        .ln
            position static
            display block
            width 100%
            height 3px
            border-radius 2px
            background var(--btn-regular-bg-active)

            &:first-child
                width 55%

    .ds-layout-pv
        display grid
        grid-template-columns 1fr 1fr
        align-content start
        gap 0.32rem
        padding 0.4rem
        border-radius 0.55rem
        background var(--btn-regular-bg)

        span
            border-radius 0.3rem
            transition height 0.18s ease, background 0.18s ease

        /* 置顶：通栏长条，用更浓的主色突出 */
        .pin
            grid-column 1 / -1
            height 1.15rem
            background unquote("color-mix(in oklab, var(--primary) 42%, transparent)")

        .sub
            height 0.9rem
            background var(--btn-regular-bg-active)

    /* 列表：条目变通栏长条，整体比网格高一档 */
    .ds-layout-pv.is-list
        grid-template-columns 1fr
        gap 0.36rem
        padding 0.42rem

        .pin
            height 1.25rem

        .sub
            height 1.05rem

        .sub:nth-child(n + 4)
            display none

    /* 紧凑：整体压一档 */
    .ds-layout-pv.is-compact
        gap 0.22rem
        padding 0.3rem

        .pin
            height 0.95rem

        .sub
            height 0.7rem

    .ds-hint
        font-size 0.66rem
        line-height 1.7
        color var(--content-meta)
        margin-top 0.4rem

</style>
