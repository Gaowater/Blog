---
title: Firefly 一款清新美观的 Astro 博客主题模板
published: 1970-01-02
pinned: false
description: Firefly 是一款基于 Astro 框架和 Fuwari 模板开发的清新美观且现代化个人博客主题模板，专为技术爱好者和内容创作者设计。该主题融合了现代 Web 技术栈，提供了丰富的功能模块和高度可定制的界面，让您能够轻松打造出专业且美观的个人博客网站。
tags: [Markdown, Firefly, 博客, 主题, 模板]
category: 文章示例
draft: true
image: ./images/firefly2.avif
searchBar: true
---

<!-- 文章内搜索栏 -->
<div id="qa-search-wrapper">
  <button id="qa-search-toggle" onclick="toggleQASearch()" aria-label="搜索Q&A">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <span>搜索 Q&amp;A</span>
  </button>
  <div id="qa-search-panel" style="display:none">
    <div id="qa-search-row">
      <svg id="qa-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="qa-search-input" placeholder="输入关键词搜索..." autocomplete="off" />
      <span id="qa-search-info"></span>
      <button id="qa-search-prev" class="qa-nav-btn" onclick="qaNav(-1)" title="上一个" disabled>▲</button>
      <button id="qa-search-next" class="qa-nav-btn" onclick="qaNav(1)" title="下一个" disabled>▼</button>
      <button id="qa-search-close" onclick="closeQASearch()" title="关闭">✕</button>
    </div>
  </div>
</div>

<style>
  #qa-search-wrapper { margin-bottom:0; }
  #qa-search-toggle {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 14px; border:1px solid var(--border);
    border-radius:8px; background:var(--card-bg); color:var(--text-75);
    cursor:pointer; font-size:0.9rem; transition:all .2s;
  }
  #qa-search-toggle:hover {
    border-color:var(--primary); color:var(--primary);
    background:color-mix(in srgb, var(--primary) 6%, transparent);
  }
  #qa-search-panel {
    padding:10px 14px; margin-top:8px; margin-bottom:1.25rem;
    border:1px solid var(--border); border-radius:10px;
    background:var(--card-bg); animation:qaFadeIn .2s ease;
  }
  @keyframes qaFadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
  #qa-search-row {
    display:flex; align-items:center; gap:8px; flex-wrap:wrap;
  }
  #qa-search-icon { flex-shrink:0; color:var(--text-50); }
  #qa-search-input {
    flex:1; min-width:120px;
    padding:6px 10px; border:1px solid var(--border);
    border-radius:6px; background:transparent; color:var(--text-90);
    font-size:0.9rem; outline:none; transition:border-color .2s;
  }
  #qa-search-input:focus { border-color:var(--primary); }
  #qa-search-input::placeholder { opacity:0.4; }
  #qa-search-info {
    font-size:0.82rem; color:var(--text-50); white-space:nowrap;
    min-width:70px; text-align:center;
  }
  .qa-nav-btn {
    padding:4px 10px; border:1px solid var(--border);
    border-radius:6px; background:transparent; color:var(--text-75);
    cursor:pointer; font-size:0.85rem; transition:all .2s; line-height:1;
  }
  .qa-nav-btn:disabled { opacity:0.3; cursor:default; }
  .qa-nav-btn:not(:disabled):hover {
    border-color:var(--primary); color:var(--primary);
  }
  #qa-search-close {
    padding:4px 8px; border:none; border-radius:6px;
    background:transparent; color:var(--text-50);
    cursor:pointer; font-size:1rem; transition:all .2s; line-height:1;
  }
  #qa-search-close:hover { color:var(--primary); background:color-mix(in srgb, var(--primary) 8%, transparent); }
  /* 文章内高亮 */
  mark.qa-highlight {
    background:color-mix(in srgb, var(--primary) 18%, transparent);
    color:inherit; padding:1px 2px; border-radius:3px;
    border-bottom:2px solid color-mix(in srgb, var(--primary) 50%, transparent);
  }
  mark.qa-highlight.active {
    background:color-mix(in srgb, var(--primary) 35%, transparent);
    border-bottom-color:var(--primary);
  }
</style>

<script>
  (function() {
    var qaCards, searchInput, searchInfo, prevBtn, nextBtn, toggleBtn, panel;
    var marks = [];
    var currentIdx = -1;
    var debounceTimer;

    function init() {
      qaCards = document.querySelectorAll('.qa-card');
      searchInput = document.getElementById('qa-search-input');
      searchInfo = document.getElementById('qa-search-info');
      prevBtn = document.getElementById('qa-search-prev');
      nextBtn = document.getElementById('qa-search-next');
      toggleBtn = document.getElementById('qa-search-toggle');
      panel = document.getElementById('qa-search-panel');

      if (!searchInput) return;

      searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(doSearch, 250);
      });

      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); qaNav(1); }
        if (e.key === 'Escape') { closeQASearch(); }
      });
    }

    function doSearch() {
      clearMarks();
      var kw = searchInput.value.trim();
      if (!kw) {
        searchInfo.textContent = '';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        marks = [];
        currentIdx = -1;
        return;
      }

      var regex = new RegExp(escapeRegex(kw), 'gi');
      marks = [];
      currentIdx = -1;

      qaCards.forEach(function(card) {
        walkTextNodes(card, regex);
      });

      if (marks.length === 0) {
        searchInfo.textContent = '未找到';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
      } else {
        searchInfo.textContent = '1/' + marks.length;
        prevBtn.disabled = true;
        nextBtn.disabled = marks.length <= 1;
        currentIdx = 0;
        marks[0].classList.add('active');
        marks[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    function walkTextNodes(node, regex) {
      if (node.nodeType === 3) {
        var text = node.textContent;
        if (!regex.test(text)) return;
        regex.lastIndex = 0;
        var frag = document.createDocumentFragment();
        var lastIdx = 0, m;
        while ((m = regex.exec(text)) !== null) {
          if (m.index > lastIdx) frag.appendChild(document.createTextNode(text.slice(lastIdx, m.index)));
          var mark = document.createElement('mark');
          mark.className = 'qa-highlight';
          mark.textContent = m[0];
          frag.appendChild(mark);
          marks.push(mark);
          lastIdx = m.index + m[0].length;
        }
        if (lastIdx < text.length) frag.appendChild(document.createTextNode(text.slice(lastIdx)));
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && !/^(SCRIPT|STYLE|MARK|TEXTAREA)$/i.test(node.tagName)) {
        // 如果已经是 mark.qa-highlight，不递归
        if (node.classList && node.classList.contains('qa-highlight')) return;
        Array.from(node.childNodes).forEach(function(child) { walkTextNodes(child, regex); });
      }
    }

    function clearMarks() {
      document.querySelectorAll('mark.qa-highlight').forEach(function(m) {
        var p = m.parentNode;
        p.replaceChild(document.createTextNode(m.textContent), m);
        p.normalize();
      });
      marks = [];
      currentIdx = -1;
    }

    function qaNav(dir) {
      if (marks.length === 0) return;
      var old = currentIdx;
      marks[old].classList.remove('active');
      currentIdx = (currentIdx + dir + marks.length) % marks.length;
      marks[currentIdx].classList.add('active');
      marks[currentIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInfo.textContent = (currentIdx + 1) + '/' + marks.length;
      prevBtn.disabled = currentIdx === 0;
      nextBtn.disabled = currentIdx === marks.length - 1;
    }

    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function toggleQASearch() {
      if (panel.style.display === 'none') {
        panel.style.display = '';
        searchInput.focus();
      } else {
        closeQASearch();
      }
    }

    function closeQASearch() {
      panel.style.display = 'none';
      searchInput.value = '';
      clearMarks();
      searchInfo.textContent = '';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    }

    // 挂在 window 上供 onclick 调用
    window.toggleQASearch = toggleQASearch;
    window.closeQASearch = closeQASearch;
    window.qaNav = qaNav;

    // DOM 就绪后初始化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
</script>

<div class="qa-card">
  <div class="qa-header">
    <span class="qa-badge">Q</span>
    <span class="qa-text">1. 为什么饮水机中的直饮水比开水更贵呢？</span>
  </div>
  <div class="qa-body">
  
## 🌟 项目概述

**Firefly** 是一款基于 Astro 框架和 Fuwari 模板开发的清新美观且现代化个人博客主题模板，专为技术爱好者和内容创作者设计。该主题融合了现代 Web 技术栈，提供了丰富的功能模块和高度可定制的界面，让您能够轻松打造出专业且美观的个人博客网站。


**🖥️在线预览： [Firefly - Demo site](https://firefly.cuteleaf.cn/)**

**🏠我的博客： [https://blog.cuteleaf.cn](https://blog.cuteleaf.cn/)**

**📝Firefly使用文档： [https://docs-firefly.cuteleaf.cn](https://docs-firefly.cuteleaf.cn/)**

**⭐Firefly开源地址：[https://github.com/CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly)** 

**⭐Fuwari开源地址：[https://github.com/saicaca/fuwari](https://github.com/saicaca/fuwari)**

::github{repo="CuteLeaf/Firefly"}

::github{repo="saicaca/fuwari"}

![Firefly](./images/1.avif)


## 🚀 技术架构

- **静态站点生成**: 基于 Astro ，提供极快的加载速度和优秀的 SEO 优化
- **TypeScript 支持**: 完整的类型安全，提升开发体验和代码质量
- **响应式设计**: 使用 Tailwind CSS 构建，完美适配桌面端和移动端
- **组件化开发**: 支持 Astro、Svelte 组件，灵活可扩展


## 📖 配置说明

> 📚 **详细配置文档**: 查看 [Firefly使用文档](https://docs-firefly.cuteleaf.cn/) 获取完整的配置指南
