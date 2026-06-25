---
title: Markdown Mermaid 图表
published: 1970-01-01
pinned: false
description: 一个包含 Mermaid 的 Markdown 博客文章简单示例。
tags: [Markdown, 博客, Mermaid, Firefly]
category: 文章示例
draft: true
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
    background:#ffee00; color:#000;
    padding:0 2px; border-radius:2px; font-weight:bold;
  }
  mark.art-highlight.active {
    background:#ffb300; color:#000;
    box-shadow:0 0 0 2px #ffb300;
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

## Markdown 中 Mermaid 图表完整指南

本文演示如何在 Markdown 文档中使用 Mermaid 创建各种复杂图表，包括流程图、时序图、甘特图、类图和状态图。

## 流程图示例

流程图非常适合表示流程或算法步骤。




```mermaid
graph TD
    A[开始] --> B{条件检查}
    B -->|是| C[处理步骤 1]
    B -->|否| D[处理步骤 2]
    C --> E[子过程]
    D --> E
    subgraph E [子过程详情]
        E1[子步骤 1] --> E2[子步骤 2]
        E2 --> E3[子步骤 3]
    end
    E --> F{另一个决策}
    F -->|选项 1| G[结果 1]
    F -->|选项 2| H[结果 2]
    F -->|选项 3| I[结果 3]
    G --> J[结束]
    H --> J
    I --> J
```

## 时序图示例

时序图显示对象之间随时间的交互。

```mermaid
sequenceDiagram
    participant User as 用户
    participant WebApp as 网页应用
    participant Server as 服务器
    participant Database as 数据库

    User->>WebApp: 提交登录请求
    WebApp->>Server: 发送认证请求
    Server->>Database: 查询用户凭据
    Database-->>Server: 返回用户数据
    Server-->>WebApp: 返回认证结果
    
    alt 认证成功
        WebApp->>User: 显示欢迎页面
        WebApp->>Server: 请求用户数据
        Server->>Database: 获取用户偏好
        Database-->>Server: 返回偏好设置
        Server-->>WebApp: 返回用户数据
        WebApp->>User: 加载个性化界面
    else 认证失败
        WebApp->>User: 显示错误消息
        WebApp->>User: 提示重新输入
    end
```

## 甘特图示例

甘特图非常适合显示项目进度和时间线。

```mermaid
gantt
    title 网站开发项目时间线
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d
    
    section 设计阶段
    需求分析      :a1, 2023-10-01, 7d
    UI设计                 :a2, after a1, 10d
    原型创建        :a3, after a2, 5d
    
    section 开发阶段
    前端开发      :b1, 2023-10-20, 15d
    后端开发       :b2, after a2, 18d
    数据库设计           :b3, after a1, 12d
    
    section 测试阶段
    单元测试              :c1, after b1, 8d
    集成测试       :c2, after b2, 10d
    用户验收测试   :c3, after c2, 7d
    
    section 部署
    生产环境部署     :d1, after c3, 3d
    发布                    :milestone, after d1, 0d
```

## 类图示例

类图显示系统的静态结构，包括类、属性、方法及其关系。

```mermaid
classDiagram
    class User {
        +String username
        +String password
        +String email
        +Boolean active
        +login()
        +logout()
        +updateProfile()
    }
    
    class Article {
        +String title
        +String content
        +Date publishDate
        +Boolean published
        +publish()
        +edit()
        +delete()
    }
    
    class Comment {
        +String content
        +Date commentDate
        +addComment()
        +deleteComment()
    }
    
    class Category {
        +String name
        +String description
        +addArticle()
        +removeArticle()
    }
    
    User "1" -- "*" Article : 写作
    User "1" -- "*" Comment : 发表
    Article "1" -- "*" Comment : 拥有
    Article "1" -- "*" Category : 属于
```

## 状态图示例

状态图显示对象在其生命周期中经历的状态序列。

```mermaid
stateDiagram-v2
    [*] --> 草稿
    
    草稿 --> 审核中 : 提交
    审核中 --> 草稿 : 拒绝
    审核中 --> 已批准 : 批准
    已批准 --> 已发布 : 发布
    已发布 --> 已归档 : 归档
    已发布 --> 草稿 : 撤回
    
    state 已发布 {
        [*] --> 活跃
        活跃 --> 隐藏 : 临时隐藏
        隐藏 --> 活跃 : 恢复
        活跃 --> [*]
        隐藏 --> [*]
    }
    
    已归档 --> [*]
```

## 饼图示例

饼图非常适合显示比例和百分比数据。

```mermaid
pie title 网站流量来源分析
    "搜索引擎" : 45.6
    "直接访问" : 30.1
    "社交媒体" : 15.3
    "推荐链接" : 6.4
    "其他来源" : 2.6
```

## 总结

Mermaid 是在 Markdown 文档中创建各种类型图表的强大工具。本文演示了如何使用流程图、时序图、甘特图、类图、状态图和饼图。这些图表可以帮助您更清晰地表达复杂的概念、流程和数据结构。

要使用 Mermaid，只需在代码块中指定 mermaid 语言，并使用简洁的文本语法描述图表。Mermaid 会自动将这些描述转换为美观的可视化图表。

尝试在您的下一篇技术博客文章或项目文档中使用 Mermaid 图表 - 它们将使您的内容更加专业且更易理解！
