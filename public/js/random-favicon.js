// ============================================================
// 随机 emoji favicon 脚本（纯 Canvas 生成）
// 不需要图片文件，直接用 Canvas 绘制 emoji
// ============================================================

(function() {
    'use strict';
    
    // emoji 列表（5 个）
    const emojis = ['🚀', '💡', '⚡', '🎯', '🔥'];
    
    // 随机选择一个 emoji
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    // 创建 Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // 绘制 emoji
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(randomEmoji, 16, 18);
    
    // 转换为 favicon
    const faviconUrl = canvas.toDataURL('image/png');
    
    // 设置 favicon
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = faviconUrl;
    
    // 设置 apple-touch-icon
    let appleTouchIcon = document.querySelector("link[rel='apple-touch-icon']");
    if (appleTouchIcon) {
        appleTouchIcon.href = faviconUrl;
    }
    
    console.log('🎲 随机 emoji:', randomEmoji);
})();