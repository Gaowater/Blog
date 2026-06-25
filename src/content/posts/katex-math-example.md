---
title: KaTeX 数学公式示例
published: 1970-01-02
description: 展示 Firefly 主题对 KaTeX 数学公式的支持，包括行内公式、块级公式和复杂数学符号。
tags: [KaTeX, Math, 示例]
category: 文章示例
draft: true
image: api
---
<!-- 文章内搜索栏 -->
<div id="article-search-wrap">
  <button id="article-search-btn" onclick="toggleArticleSearch()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <span>搜索文章</span>
  </button>
  <div id="article-search-panel" style="display:none">
    <div id="article-search-row">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="article-search-input" placeholder="输入关键词搜索..." autocomplete="off" />
      <span id="article-search-info"></span>
      <button id="article-search-prev" onclick="articleNav(-1)" title="上一个" disabled>▲</button>
      <button id="article-search-next" onclick="articleNav(1)" title="下一个" disabled>▼</button>
      <button id="article-search-close" onclick="closeArticleSearch()" title="关闭">✕</button>
    </div>
  </div>
</div>

<style>
  #article-search-wrap { margin-bottom:0; }
  #article-search-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 14px; border:1px solid var(--border);
    border-radius:8px; background:var(--card-bg); color:var(--text-75);
    cursor:pointer; font-size:0.9rem; transition:all .2s;
  }
  #article-search-btn:hover {
    border-color:var(--primary); color:var(--primary);
    background:color-mix(in srgb, var(--primary) 6%, transparent);
  }
  #article-search-panel {
    padding:10px 14px; margin-top:8px; margin-bottom:1.25rem;
    border:1px solid var(--border); border-radius:10px;
    background:var(--card-bg); animation:artFadeIn .2s ease;
  }
  @keyframes artFadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
  #article-search-row {
    display:flex; align-items:center; gap:8px; flex-wrap:wrap;
  }
  #article-search-row svg { flex-shrink:0; color:var(--text-50); }
  #article-search-input {
    flex:1; min-width:120px;
    padding:6px 10px; border:1px solid var(--border);
    border-radius:6px; background:transparent; color:var(--text-90);
    font-size:0.9rem; outline:none; transition:border-color .2s;
  }
  #article-search-input:focus { border-color:var(--primary); }
  #article-search-input::placeholder { opacity:0.4; }
  #article-search-info {
    font-size:0.82rem; color:var(--text-50); white-space:nowrap;
    min-width:70px; text-align:center;
  }
  #article-search-prev, #article-search-next {
    padding:4px 10px; border:1px solid var(--border);
    border-radius:6px; background:transparent; color:var(--text-75);
    cursor:pointer; font-size:0.85rem; transition:all .2s; line-height:1;
  }
  #article-search-prev:disabled, #article-search-next:disabled { opacity:0.3; cursor:default; }
  #article-search-prev:not(:disabled):hover, #article-search-next:not(:disabled):hover {
    border-color:var(--primary); color:var(--primary);
  }
  #article-search-close {
    padding:4px 8px; border:none; border-radius:6px;
    background:transparent; color:var(--text-50);
    cursor:pointer; font-size:1rem; transition:all .2s; line-height:1;
  }
  #article-search-close:hover { color:var(--primary); background:color-mix(in srgb, var(--primary) 8%, transparent); }
  mark.art-highlight {
    background:color-mix(in srgb, var(--primary) 18%, transparent);
    color:inherit; padding:1px 2px; border-radius:3px;
    border-bottom:2px solid color-mix(in srgb, var(--primary) 50%, transparent);
  }
  mark.art-highlight.active {
    background:color-mix(in srgb, var(--primary) 35%, transparent);
    border-bottom-color:var(--primary);
  }
</style>

<script>
(function(){
  var c,i,f,p,n,b,q,m=[],d=-1,dt;
  function g(){
    c=document.querySelector('.custom-md');
    i=document.getElementById('article-search-input');
    f=document.getElementById('article-search-info');
    p=document.getElementById('article-search-prev');
    n=document.getElementById('article-search-next');
    b=document.getElementById('article-search-btn');
    q=document.getElementById('article-search-panel');
    if(!i||!c)return;
    i.oninput=function(){clearTimeout(dt);dt=setTimeout(h,250)};
    i.onkeydown=function(e){if(e.key==='Enter'){e.preventDefault();w(1)}if(e.key==='Escape'){closeArticleSearch()}};
  }
  function h(){
    clearMarks();
    var t=i.value.trim();
    if(!t){f.textContent='';p.disabled=n.disabled=!0;m=[];d=-1;return}
    var r=new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
    m=[];d=-1;
    (function walk(node,re){
      if(node.nodeType===3){
        var tx=node.textContent;
        if(!re.test(tx))return;re.lastIndex=0;
        var fr=document.createDocumentFragment(),li=0,ma;
        while((ma=re.exec(tx))!==null){
          if(ma.index>li)fr.appendChild(document.createTextNode(tx.slice(li,ma.index)));
          var mk=document.createElement('mark');mk.className='art-highlight';
          mk.textContent=ma[0];fr.appendChild(mk);m.push(mk);li=ma.index+ma[0].length;
        }
        if(li<tx.length)fr.appendChild(document.createTextNode(tx.slice(li)));
        node.parentNode.replaceChild(fr,node);
      } else if(node.nodeType===1&&!/^(SCRIPT|STYLE|MARK|TEXTAREA)$/i.test(node.tagName)){
        if(node.classList&&node.classList.contains('art-highlight'))return;
        Array.from(node.childNodes).forEach(function(ch){walk(ch,re)});
      }
    })(c,r);
    if(!m.length){f.textContent='未找到';p.disabled=n.disabled=!0}
    else{f.textContent='1/'+m.length;p.disabled=!0;n.disabled=m.length<=1;d=0;m[0].classList.add('active');m[0].scrollIntoView({behavior:'smooth',block:'center'})}
  }
  function clearMarks(){
    document.querySelectorAll('mark.art-highlight').forEach(function(mk){
      var p=mk.parentNode;p.replaceChild(document.createTextNode(mk.textContent),mk);p.normalize();
    });m=[];d=-1;
  }
  window.toggleArticleSearch=function(){
    if(q.style.display==='none'){q.style.display='';setTimeout(function(){i&&i.focus()},50)}
    else{closeArticleSearch()}
  };
  window.closeArticleSearch=function(){q.style.display='none';i.value='';clearMarks();f.textContent='';p.disabled=n.disabled=!0};
  window.articleNav=function(dir){
    if(m.length===0)return;
    m[d].classList.remove('active');d=(d+dir+m.length)%m.length;
    m[d].classList.add('active');m[d].scrollIntoView({behavior:'smooth',block:'center'});
    f.textContent=(d+1)+'/'+m.length;p.disabled=d===0;n.disabled=d===m.length-1;
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',g);else g();
  document.addEventListener('swup:contentReplaced',function(){setTimeout(g,50)});
})();
</script>


本文展示了 [Firefly](https://github.com/CuteLeaf/Firefly) 主题对 KaTeX 数学公式的渲染支持。

## 行内公式 (Inline)

行内公式使用单个 `$` 符号包裹。

例如：欧拉公式 $e^{i\pi} + 1 = 0$ 是数学中最优美的公式之一。

质能方程 $E = mc^2$ 也是家喻户晓。

## 块级公式 (Block)

块级公式使用两个 `$$` 符号包裹，会居中显示。

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

## 复杂示例

### 矩阵 (Matrices)

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
\alpha & \beta \\
\gamma & \delta
\end{pmatrix} =
\begin{pmatrix}
a\alpha + b\gamma & a\beta + b\delta \\
c\alpha + d\gamma & c\beta + d\delta
\end{pmatrix}
$$

### 极限与求和 (Limits and Sums)

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

### 麦克斯韦方程组 (Maxwell's Equations)

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

### 化学方程式 (Chemical Equations)

$$
\ce{CH4 + 2O2 -> CO2 + 2H2O}
$$

## 更多符号

| 符号 | 代码 | 渲染结果 |
| :--- | :--- | :--- |
| Alpha | `\alpha` | $\alpha$ |
| Beta | `\beta` | $\beta$ |
| Gamma | `\Gamma` | $\Gamma$ |
| Pi | `\pi` | $\pi$ |
| Infinity | `\infty` | $\infty$ |
| Right Arrow | `\rightarrow` | $\rightarrow$ |
| Partial | `\partial` | $\partial$ |

更多 KaTeX 语法请参考 [KaTeX Supported Functions](https://katex.org/docs/supported.html)。
