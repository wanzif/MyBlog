// ============================================================
// 文章目录侧边栏脚本（优化版 v2）
// - 大屏：固定侧边栏 + 滚动高亮 + 折叠
// - 中屏：浮动按钮弹出目录面板
// - 小屏：使用文章内嵌目录
// ============================================================
(function () {
    "use strict";

    const postContent = document.querySelector(".post-content");
    if (!postContent) return;

    const headings = postContent.querySelectorAll("h1, h2, h3, h4");
    if (headings.length < 2) return;

    // 获取原始 TOC（PaperMod 生成的）
    const originalToc = document.querySelector(".post-content .toc");
    const tocList = originalToc ? originalToc.querySelector("ul") : null;

    function getScreenType() {
        const w = window.innerWidth;
        if (w > 1200) return "large";
        if (w > 768) return "medium";
        return "small";
    }

    const screenType = getScreenType();

    // ---- 大屏幕：固定侧边栏 ----
    if (screenType === "large") {
        if (originalToc) originalToc.style.display = "none";

        const sidebar = document.createElement("aside");
        sidebar.className = "toc-sidebar";
        sidebar.innerHTML =
            '<div class="toc-card">' +
            '  <div class="toc-title">' +
            '    <span>📑 目录</span>' +
            '    <button class="toc-collapse-btn" title="收起/展开">▼</button>' +
            "  </div>" +
            '  <div class="toc-content">' +
            (tocList ? cleanTocClone(tocList) : buildTocFromHeadings(headings)) +
            "  </div>" +
            "</div>";
        document.body.appendChild(sidebar);

        const collapseBtn = sidebar.querySelector(".toc-collapse-btn");
        const tocContent = sidebar.querySelector(".toc-content");
        let collapsed = false;
        collapseBtn.addEventListener("click", function () {
            collapsed = !collapsed;
            tocContent.classList.toggle("collapsed", collapsed);
            collapseBtn.textContent = collapsed ? "▶" : "▼";
        });

        setupScrollHighlight(sidebar, headings);
        setupSmoothScroll(sidebar);
    }

    // ---- 中等屏幕：浮动按钮 + 弹出面板 ----
    if (screenType === "medium") {
        if (originalToc) originalToc.style.display = "none";

        const floatBtn = document.createElement("button");
        floatBtn.className = "toc-float-btn";
        floatBtn.innerHTML = "📑";
        floatBtn.title = "文章目录";
        document.body.appendChild(floatBtn);

        const popup = document.createElement("div");
        popup.className = "toc-popup";
        popup.style.display = "none";
        popup.innerHTML =
            '<div style="font-weight:700;font-size:0.95em;margin-bottom:12px;color:var(--primary);">📑 目录</div>' +
            '<div class="toc-content">' +
            (tocList ? cleanTocClone(tocList) : buildTocFromHeadings(headings)) +
            "</div>";
        document.body.appendChild(popup);

        let popupOpen = false;
        floatBtn.addEventListener("click", function () {
            popupOpen = !popupOpen;
            popup.style.display = popupOpen ? "block" : "none";
        });

        document.addEventListener("click", function (e) {
            if (popupOpen && !popup.contains(e.target) && !floatBtn.contains(e.target)) {
                popupOpen = false;
                popup.style.display = "none";
            }
        });

        setupScrollHighlight(popup, headings);
        setupSmoothScroll(popup);
    }

    // ---- 小屏幕：保持文章内嵌目录 ----
    if (screenType === "small") {
        if (originalToc) originalToc.style.display = "block";
    }

    // ---- 工具函数 ----

    // 克隆 TOC 并清洗 # 号
    function cleanTocClone(list) {
        const clone = list.cloneNode(true);
        clone.querySelectorAll("a").forEach(function (a) {
            // 去除 PaperMod 给标题加的锚点 # 号
            a.textContent = a.textContent.replace(/\s*#\s*$/, "").trim();
        });
        return clone.outerHTML;
    }

    // 从标题列表构建 TOC
    function buildTocFromHeadings(hs) {
        var html = "<ul>";
        hs.forEach(function (h) {
            var level = parseInt(h.tagName.charAt(1));
            var indent = (level - 1) * 14;
            // 去除 PaperMod 添加的标题锚点 # 号
            var text = h.textContent.replace(/\s*#\s*$/, "").trim();
            html +=
                '<li style="padding-left:' +
                indent +
                'px"><a href="#' +
                h.id +
                '">' +
                text +
                "</a></li>";
        });
        html += "</ul>";
        return html;
    }

    // 滚动时高亮当前目录项
    function setupScrollHighlight(container, hs) {
        var tocLinks = container.querySelectorAll(".toc-content a");

        function highlight() {
            var currentHeading = null;
            hs.forEach(function (heading) {
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

        var ticking = false;
        window.addEventListener("scroll", function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    highlight();
                    ticking = false;
                });
                ticking = true;
            }
        });

        highlight();
    }

    // 平滑滚动
    function setupSmoothScroll(container) {
        container.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                var targetId = this.getAttribute("href").substring(1);
                var target = document.getElementById(targetId);
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
                }
            });
        });
    }

    console.log("📑 目录侧边栏已启用（屏幕：" + screenType + "）");
})();
