// ============================================================
// 文章目录侧边栏脚本（优化版）
// - 大屏：固定侧边栏 + 滚动高亮 + 折叠
// - 中屏：浮动按钮弹出目录面板
// - 小屏：使用文章内嵌目录
// ============================================================
(function () {
    "use strict";

    // 只在文章页面执行
    const postContent = document.querySelector(".post-content");
    if (!postContent) return;

    // 获取文章标题
    const headings = postContent.querySelectorAll("h1, h2, h3, h4");
    if (headings.length < 2) return; // 标题太少不需要目录

    // 获取原始 TOC（PaperMod 生成的）
    const originalToc = document.querySelector(".post-content .toc");
    const tocList = originalToc ? originalToc.querySelector("ul") : null;

    // 判断屏幕类型
    function getScreenType() {
        const w = window.innerWidth;
        if (w > 1200) return "large";
        if (w > 768) return "medium";
        return "small";
    }

    const screenType = getScreenType();

    // ---- 大屏幕：固定侧边栏 ----
    if (screenType === "large") {
        // 隐藏文章内嵌目录
        if (originalToc) originalToc.style.display = "none";

        // 创建侧边栏
        const sidebar = document.createElement("aside");
        sidebar.className = "toc-sidebar";
        sidebar.innerHTML = `
            <div class="toc-card">
                <div class="toc-title">
                    <span>📑 目录</span>
                    <button class="toc-collapse-btn" title="收起/展开">▼</button>
                </div>
                <div class="toc-content">${tocList ? tocList.outerHTML : buildTocFromHeadings()}</div>
            </div>
        `;
        document.body.appendChild(sidebar);

        // 折叠/展开
        const collapseBtn = sidebar.querySelector(".toc-collapse-btn");
        const tocContent = sidebar.querySelector(".toc-content");
        let collapsed = false;
        collapseBtn.addEventListener("click", function () {
            collapsed = !collapsed;
            tocContent.classList.toggle("collapsed", collapsed);
            collapseBtn.textContent = collapsed ? "▶" : "▼";
        });

        // 滚动高亮
        setupScrollHighlight(sidebar);

        // 平滑滚动
        setupSmoothScroll(sidebar);
    }

    // ---- 中等屏幕：浮动按钮 + 弹出面板 ----
    if (screenType === "medium") {
        // 隐藏文章内嵌目录
        if (originalToc) originalToc.style.display = "none";

        // 创建浮动按钮
        const floatBtn = document.createElement("button");
        floatBtn.className = "toc-float-btn";
        floatBtn.innerHTML = "📑";
        floatBtn.title = "文章目录";
        document.body.appendChild(floatBtn);

        // 创建弹出面板
        const popup = document.createElement("div");
        popup.className = "toc-popup";
        popup.style.display = "none";
        popup.innerHTML = `
            <div class="toc-title" style="font-weight:700;font-size:0.95em;margin-bottom:12px;color:var(--primary);">📑 目录</div>
            <div class="toc-content">${tocList ? tocList.outerHTML : buildTocFromHeadings()}</div>
        `;
        document.body.appendChild(popup);

        let popupOpen = false;
        floatBtn.addEventListener("click", function () {
            popupOpen = !popupOpen;
            popup.style.display = popupOpen ? "block" : "none";
        });

        // 点击面板外关闭
        document.addEventListener("click", function (e) {
            if (popupOpen && !popup.contains(e.target) && !floatBtn.contains(e.target)) {
                popupOpen = false;
                popup.style.display = "none";
            }
        });

        // 滚动高亮
        setupScrollHighlight(popup);

        // 平滑滚动
        setupSmoothScroll(popup);
    }

    // ---- 小屏幕：保持文章内嵌目录，默认展开 ----
    if (screenType === "small") {
        if (originalToc) {
            originalToc.style.display = "block";
        }
    }

    // ---- 工具函数 ----

    // 从标题列表构建 TOC（如果没有 PaperMod 生成的 TOC）
    function buildTocFromHeadings() {
        let html = "<ul>";
        headings.forEach(function (h) {
            const level = parseInt(h.tagName.charAt(1));
            const indent = (level - 1) * 14;
            html += `<li style="padding-left:${indent}px"><a href="#${h.id}">${h.textContent}</a></li>`;
        });
        html += "</ul>";
        return html;
    }

    // 滚动时高亮当前目录项
    function setupScrollHighlight(container) {
        const tocLinks = container.querySelectorAll(".toc-content a");

        function highlight() {
            let currentHeading = null;
            headings.forEach(function (heading) {
                const rect = heading.getBoundingClientRect();
                if (rect.top <= 120) {
                    currentHeading = heading;
                }
            });

            if (currentHeading) {
                tocLinks.forEach(function (link) {
                    link.classList.remove("active");
                    const href = link.getAttribute("href");
                    if (href === "#" + currentHeading.id) {
                        link.classList.add("active");
                    }
                });
            }
        }

        // 节流
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

        // 初始高亮
        highlight();
    }

    // 平滑滚动
    function setupSmoothScroll(container) {
        container.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            });
        });
    }

    console.log("📑 目录侧边栏已启用（屏幕：" + screenType + "）");
})();
