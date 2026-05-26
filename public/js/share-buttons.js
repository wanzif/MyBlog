// ============================================================
// 国内社交平台分享按钮（优化版）
// 支持：微信、微博、QQ、QQ空间、豆瓣
// ============================================================
(function () {
    "use strict";

    // 只在文章页面执行
    if (!document.querySelector(".post-single")) return;

    const title = document.title.replace(" – Wanzf's Blog", "").trim();
    const url = window.location.href;
    const summary = document.querySelector('meta[name="description"]')?.content || title;

    // 分享平台
    const platforms = [
        {
            name: "微信",
            icon: "💚",
            color: "#07C160",
            action: "wechat"
        },
        {
            name: "微博",
            icon: "🔴",
            color: "#E6162D",
            url: "https://service.weibo.com/share/share.php?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title)
        },
        {
            name: "QQ",
            icon: "💬",
            color: "#12B7F5",
            url: "https://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title) + "&summary=" + encodeURIComponent(summary)
        },
        {
            name: "QQ空间",
            icon: "🌟",
            color: "#FECE00",
            url: "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title) + "&summary=" + encodeURIComponent(summary)
        },
        {
            name: "豆瓣",
            icon: "📗",
            color: "#007722",
            url: "https://www.douban.com/share/service?url=" + encodeURIComponent(url) + "&name=" + encodeURIComponent(title)
        }
    ];

    // 创建容器
    const container = document.createElement("div");
    container.className = "custom-share-buttons";
    container.innerHTML = '<span class="share-title">📤 分享到</span>';

    platforms.forEach(function (p) {
        const btn = document.createElement("a");
        btn.className = "share-button";
        btn.innerHTML = '<span class="share-icon">' + p.icon + '</span><span class="share-name">' + p.name + '</span>';
        btn.style.backgroundColor = p.color;

        if (p.action === "wechat") {
            btn.href = "javascript:void(0)";
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                showWechatModal(url, title);
            });
        } else {
            btn.href = p.url;
            btn.target = "_blank";
            btn.rel = "noopener noreferrer";
        }

        container.appendChild(btn);
    });

    // 插入到文章底部
    const postContent = document.querySelector(".post-content");
    if (postContent) {
        postContent.appendChild(container);
    }

    // 微信分享：生成二维码弹窗
    function showWechatModal(url, title) {
        // 移除已有弹窗
        const old = document.querySelector(".wechat-qrcode-modal");
        if (old) old.remove();

        const modal = document.createElement("div");
        modal.className = "wechat-qrcode-modal";
        modal.innerHTML =
            '<div class="wechat-qrcode-content">' +
            '  <div class="wechat-qrcode-header">' +
            '    <h3>💚 微信扫码分享</h3>' +
            '    <button class="wechat-qrcode-close">&times;</button>' +
            "  </div>" +
            '  <div class="wechat-qrcode-body">' +
            '    <div id="wechat-qr"></div>' +
            '    <p class="wechat-tip">打开微信 → 扫一扫<br>或复制链接发送给朋友</p>' +
            '    <input type="text" value="' + url.replace(/"/g, "&quot;") + '" readonly onclick="this.select()" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;background:var(--code-bg);color:var(--primary);font-size:0.85em;margin-top:8px">' +
            "  </div>" +
            "</div>";
        document.body.appendChild(modal);

        // 生成二维码（使用 qrcode.js CDN 或 canvas fallback）
        try {
            // 用 Canvas 生成简易二维码（不需要外部库）
            generateQRCode(document.getElementById("wechat-qr"), url);
        } catch (err) {
            document.getElementById("wechat-qr").innerHTML = '<p style="color:var(--secondary)">二维码生成失败，请复制下方链接</p>';
        }

        // 关闭
        modal.querySelector(".wechat-qrcode-close").addEventListener("click", function () {
            modal.remove();
        });
        modal.addEventListener("click", function (e) {
            if (e.target === modal) modal.remove();
        });
    }

    // 简易 Canvas 二维码生成（使用 API 免部署）
    function generateQRCode(container, text) {
        const img = document.createElement("img");
        // 使用第三方 API 生成二维码（轻量，无需额外 JS 库）
        img.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(text);
        img.alt = "微信二维码";
        img.style.borderRadius = "8px";
        img.onerror = function () {
            container.innerHTML = '<p style="color:var(--secondary)">二维码加载失败，请复制下方链接</p>';
        };
        container.appendChild(img);
    }

    console.log("📤 国内分享按钮已启用");
})();
