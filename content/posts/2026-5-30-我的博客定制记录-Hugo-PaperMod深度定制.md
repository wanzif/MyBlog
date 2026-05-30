---
title: "我的博客定制记录：Hugo PaperMod 深度定制"
date: 2026-05-30T21:57:37+08:00
tags: ["Hugo", "PaperMod", "博客搭建"]
categories: ["教程"]
ShowToc: true
TocOpen: false
draft: false
---

> 记录 wanzf.com 博客在 Hugo + PaperMod 基础上的深度定制过程：Giscus 评论暗色跟随、三屏目录侧边栏、国内分享按钮、代码块美化、随机 Emoji Favicon 等实用改造。

## 前言

PaperMod 默认配置已经很完善，但用久了总觉得少了点什么。评论系统要接、目录导航要改、分享按钮国内用不了、代码块太朴素……一个个小改动累积下来，博客终于变成了现在的样子。

本文记录的是**亮点改动**，不写 PaperMod 开箱即用的功能。基准是从 Hugo + PaperMod 默认配置出发，最终效果见 wanzf.com。

---

## 1. Giscus 评论系统 + 暗色主题跟随

### 为什么选 Giscus

Giscus 是基于 GitHub Discussions 的评论方案，免费无广告，不需要自建数据库。只要在 GitHub 仓库开启 Discussions，在 [giscus.app](https://giscus.app) 配置好参数即可。

### 配置参数

在 `hugo.toml` 中添加 Giscus 相关配置：

```toml
[params.giscus]
repo = "wanzif/MyBlog"
repoId = "R_kgD*****"
category = "Announcements"
categoryId = "DIC_kwDOSfb****"
mapping = "pathname"
theme = "preferred_color_scheme"
lang = "zh-CN"
```

`theme` 这里配的是初始默认值，实际运行时会被下面的 JS 动态覆盖。

### 覆盖主题默认模板

PaperMod 的评论模板在 `layouts/partials/comments.html`。创建同名文件即可覆盖。我选择用 JS 动态创建 Giscus script，而不是写死 HTML 标签——这样可以在初始化时就传入正确的主题，避免首次加载时评论区和页面主题不一致：

```html
{{- if and (isset site.Params "giscus") (eq hugo.Environment "production") -}}
<script>
    // 读取当前主题（优先级：localStorage > 系统偏好）
    function getTheme() {
        const stored = localStorage.getItem("pref-theme");
        if (stored === "dark") return "dark_dimmed";
        if (stored === "light") return "light";
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark_dimmed" : "light";
    }

    // 动态创建 Giscus script，初始化时就设置正确的主题
    let giscusScript = document.createElement("script");
    giscusScript.src = "https://giscus.app/client.js";
    giscusScript.setAttribute("data-repo", "{{ site.Params.giscus.repo }}");
    giscusScript.setAttribute("data-repo-id", "{{ site.Params.giscus.repoId }}");
    giscusScript.setAttribute("data-category", "{{ site.Params.giscus.category }}");
    giscusScript.setAttribute("data-category-id", "{{ site.Params.giscus.categoryId }}");
    giscusScript.setAttribute("data-mapping", "{{ site.Params.giscus.mapping }}");
    giscusScript.setAttribute("data-theme", getTheme());
    giscusScript.setAttribute("data-lang", "{{ site.Params.giscus.lang }}");
    giscusScript.crossOrigin = "anonymous";
    giscusScript.async = true;
    document.currentScript.parentElement.appendChild(giscusScript);
</script>
{{- end -}}
```

注意两点：**`pref-theme`** 是 PaperMod 存储主题偏好的 localStorage key；**`dark_dimmed`** 是 Giscus 的暗色主题名称（不是 `dark`）。

### 亮色/暗色切换时评论区自动变色

这是核心亮点。PaperMod 的亮/暗切换通过修改 `<html>` 的 `data-theme` 属性实现。我用两个手段监听这个变化：

```javascript
// 1. MutationObserver 监听 data-theme 属性变化（主方案）
const observer = new MutationObserver(function () {
    const currentTheme = getTheme();
    const iframe = document.querySelector("iframe.giscus-frame");
    if (iframe) {
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme: currentTheme } } },
            "https://giscus.app"
        );
    }
});
observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
});

// 2. 定时器兜底（检测到变化才发送，不做无用功）
let lastTheme = getTheme();
setInterval(function () {
    const currentTheme = getTheme();
    if (currentTheme !== lastTheme) {
        lastTheme = currentTheme;
        const iframe = document.querySelector("iframe.giscus-frame");
        if (iframe) {
            iframe.contentWindow.postMessage(
                { giscus: { setConfig: { theme: currentTheme } } },
                "https://giscus.app"
            );
        }
    }
}, 1000);
```

效果：点击切换主题按钮，评论区会无缝跟随变色，体验一致。

---

## 2. 文章目录侧边栏

### 为什么不用默认的行内 TOC

PaperMod 默认把目录嵌在文章开头。长文章来回滚动找章节，体验很差。侧边栏固定显示当前章节，读到哪里看哪里，体验完全不同。

### 三屏适配策略

这是关键亮点。根据屏幕宽度采用三种展示方式：

```javascript
function getScreenType() {
    const w = window.innerWidth;
    if (w > 1200) return "large";    // 大屏：固定右侧边栏，可折叠
    if (w > 768) return "medium";     // 中屏：右下角浮动按钮，点击弹出面板
    return "small";                    // 小屏：文章内嵌（PaperMod 默认方式）
}
```

大屏侧边栏带折叠按钮，中屏右下角浮一个 📑 按钮点击弹出目录面板，小屏直接用 PaperMod 默认的行内目录。

### 滚动高亮当前章节

```javascript
function setupScrollHighlight(container, headings) {
    const tocLinks = container.querySelectorAll(".toc-content a");

    function highlight() {
        let currentHeading = null;
        headings.forEach(function (heading) {
            if (heading.getBoundingClientRect().top <= 120) {
                currentHeading = heading;
            }
        });
        if (currentHeading) {
            tocLinks.forEach(function (link) {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + currentHeading.id) {
                    link.classList.add("active");
                }
            });
        }
    }

    // 用 requestAnimationFrame 节流，避免滚动卡顿
    let ticking = false;
    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                highlight();
                ticking = false;
            });
            ticking = true;
        }
    });
}
```

### 其他细节

- 平滑滚动到目标位置，偏移 80px 避免被顶栏遮挡
- 清除 PaperMod 标题锚点的 `#` 号，只保留文字
- 涉及文件：`toc-sidebar-v2.css` + `toc-sidebar.js`

---

## 3. 国内社交分享按钮

### 为什么替换默认按钮

PaperMod 默认分享到 Twitter、Facebook、Reddit——国内一个都用不了。不如换成微信、微博、QQ、QQ空间、豆瓣。

### 五个平台 + 微信二维码

```javascript
const platforms = [
    {
        name: "微信", icon: "💚", color: "#07C160",
        action: "wechat"  // 微信没有分享 API，走二维码
    },
    {
        name: "微博", icon: "🔴", color: "#E6162D",
        url: "https://service.weibo.com/share/share.php?url="
            + encodeURIComponent(url) + "&title=" + encodeURIComponent(title)
    },
    {
        name: "QQ", icon: "💬", color: "#12B7F5",
        url: "https://connect.qq.com/widget/shareqq/index.html?url="
            + encodeURIComponent(url) + "&title=" + encodeURIComponent(title)
    },
    {
        name: "QQ空间", icon: "🌟", color: "#FECE00",
        url: "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="
            + encodeURIComponent(url) + "&title=" + encodeURIComponent(title)
    },
    {
        name: "豆瓣", icon: "📗", color: "#007722",
        url: "https://www.douban.com/share/service?url="
            + encodeURIComponent(url) + "&name=" + encodeURIComponent(title)
    }
];
```

微信分享没有官方 API，所以弹出一个二维码让用户扫一扫：

```javascript
function showWechatModal(url, title) {
    const modal = document.createElement("div");
    modal.className = "wechat-qrcode-modal";
    // 二维码用第三方 API 生成，无需引入额外 JS 库
    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/"
        + "?size=200x200&data=" + encodeURIComponent(url);
    modal.innerHTML =
        '<div class="wechat-qrcode-content">'
        + '  <h3>💚 微信扫码分享</h3>'
        + '  <img src="' + qrUrl + '" alt="微信二维码">'
        + '  <p>打开微信 → 扫一扫</p>'
        + '  <input type="text" value="' + url + '" readonly onclick="this.select()">'
        + '</div>';
    document.body.appendChild(modal);
}
```

弹窗里还放了一个链接输入框，扫不了码的直接复制链接发给朋友。

---

## 4. 代码块美化

### 默认样式不够用

PaperMod 的代码块有基础语法高亮，但没有语言标签、没有复制按钮、字体一般。写技术博客，这些功能必须有。

### 四项改进

1. **左上角语言标签**：从 Hugo 生成的 `.highlight` 中提取 `language-xxx` class
2. **右上角复制按钮**：Clipboard API + execCommand 兼容回退
3. **字体**：Fira Code / Cascadia Code / JetBrains Mono 备选
4. **配色**：Monokai 风格

```javascript
document.querySelectorAll(".highlight").forEach(function (block) {
    const pre = block.querySelector("pre");
    if (!pre) return;
    const codeEl = block.querySelector("code");

    // 提取语言名
    let lang = "code";
    if (codeEl) {
        for (const cls of codeEl.classList) {
            if (cls.startsWith("language-")) {
                lang = cls.replace("language-", "");
                break;
            }
        }
    }

    // 创建头部容器（语言标签 + 复制按钮）
    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrapper";
    const header = document.createElement("div");
    header.className = "code-block-header";

    const langLabel = document.createElement("span");
    langLabel.className = "code-block-lang";
    langLabel.textContent = lang;

    const copyBtn = document.createElement("button");
    copyBtn.className = "code-copy-btn";
    copyBtn.innerHTML = "📋 复制";
    copyBtn.addEventListener("click", function () {
        const text = (codeEl || pre).textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                copyBtn.innerHTML = "✅ 已复制";
                setTimeout(function () { copyBtn.innerHTML = "📋 复制"; }, 2000);
            });
        } else {
            fallbackCopy(text, copyBtn);
        }
    });

    header.appendChild(langLabel);
    header.appendChild(copyBtn);
    wrapper.appendChild(header);
    wrapper.appendChild(block);
    block.parentNode.insertBefore(wrapper, block);
});
```

### Hugo 配置

```toml
[markup.highlight]
style = "monokai"
guessSyntax = true
noClasses = true
```

`noClasses = true` 使用内联样式，保证代码高亮在任何情况下都能正常显示。

涉及文件：`custom.css` + `code-copy.js`。

---

## 5. 两个小彩蛋

### 5.1 随机 Emoji Favicon

不想用静态图片，用 Canvas 动态绘制 emoji 作为 favicon：

```javascript
const emojis = ['🚀', '💡', '⚡', '🎯', '🔥'];
const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const ctx = canvas.getContext('2d');
ctx.font = '28px serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText(randomEmoji, 16, 18);

// 复用已有的 favicon link，避免重复标签
let link = document.querySelector("link[rel*='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = canvas.toDataURL('image/png');
```

每次刷新页面，随机选一个 emoji 绘制成 favicon。纯 JS，无需图片文件。

### 5.2 按 `/` 快捷聚焦搜索框

在搜索页面按 `/` 键，自动聚焦搜索框：

```javascript
document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !isInputFocused()) {
        e.preventDefault();
        const searchInput = document.querySelector('#searchInput');
        if (searchInput) searchInput.focus();
    }
});

function isInputFocused() {
    const el = document.activeElement;
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
}
```

只在不在输入框时才触发，避免和正常输入冲突。

---

## 6. 自定义文件一览

| 文件 | 作用 |
|------|------|
| `layouts/partials/comments.html` | Giscus 评论 + 主题跟随 |
| `layouts/partials/extend_head.html` | 加载自定义 CSS + favicon 脚本 |
| `layouts/partials/extend_footer.html` | 加载自定义 JS |
| `static/css/custom.css` | 全局样式（加宽、代码块美化） |
| `static/css/toc-sidebar-v2.css` | 目录侧边栏样式 |
| `static/css/share-buttons.css` | 分享按钮样式 |
| `static/js/toc-sidebar.js` | 目录侧边栏逻辑 |
| `static/js/share-buttons.js` | 国内分享按钮逻辑 |
| `static/js/code-copy.js` | 代码块复制 + 语言标签 |
| `static/js/random-favicon.js` | 随机 emoji favicon |
| `static/js/search-enhancement.js` | 搜索快捷键 |

### 加载链路

PaperMod 的模板结构是：`extend_head.html` → 页面内容 → `extend_footer.html`。所有自定义 CSS 和 JS 都通过这两个扩展点注入，不修改主题源码，方便后续主题升级。

---

## 总结

博客定制是个持续的过程。以上这些改动都是小而实用的——没有引入复杂框架，没有破坏主题的简洁性，改动都通过扩展点注入，升级主题时不会冲突。
