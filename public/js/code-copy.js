// ============================================================
// 代码块复制按钮 + 美化
// - 为每个代码块添加右上角复制按钮
// - 语言标签显示在代码块左上角
// ============================================================
(function () {
    "use strict";

    // 找到所有代码块
    const codeBlocks = document.querySelectorAll(".highlight");
    if (!codeBlocks.length) return;

    codeBlocks.forEach(function (block) {
        const pre = block.querySelector("pre");
        if (!pre) return;

        // --- 语言标签 ---
        // 从 class 中提取语言名（如 language-bash, language-yaml, language-json）
        const codeEl = block.querySelector("code");
        let lang = "";
        if (codeEl) {
            for (const cls of codeEl.classList) {
                if (cls.startsWith("language-")) {
                    lang = cls.replace("language-", "");
                    break;
                }
            }
        }

        // 创建包装器
        const wrapper = document.createElement("div");
        wrapper.className = "code-block-wrapper";

        // 创建头部（语言标签 + 复制按钮）
        const header = document.createElement("div");
        header.className = "code-block-header";

        const langLabel = document.createElement("span");
        langLabel.className = "code-block-lang";
        langLabel.textContent = lang || "code";

        const copyBtn = document.createElement("button");
        copyBtn.className = "code-copy-btn";
        copyBtn.innerHTML = "📋 复制";
        copyBtn.setAttribute("aria-label", "复制代码");

        copyBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            const code = pre.querySelector("code") || pre;
            const text = code.textContent || code.innerText || "";

            // 使用 Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function () {
                    copyBtn.innerHTML = "✅ 已复制";
                    setTimeout(function () {
                        copyBtn.innerHTML = "📋 复制";
                    }, 2000);
                }).catch(function () {
                    fallbackCopy(text, copyBtn);
                });
            } else {
                fallbackCopy(text, copyBtn);
            }
        });

        header.appendChild(langLabel);
        header.appendChild(copyBtn);

        // 将 block 包裹在 wrapper 中
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(header);
        wrapper.appendChild(block);
    });

    // 兼容方案
    function fallbackCopy(text, btn) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            btn.innerHTML = "✅ 已复制";
        } catch (e) {
            btn.innerHTML = "❌ 复制失败";
        }
        setTimeout(function () {
            btn.innerHTML = "📋 复制";
        }, 2000);
        document.body.removeChild(textarea);
    }

    console.log("📋 代码复制按钮已启用");
})();
