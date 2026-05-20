// ============================================================
// 搜索功能增强脚本
// 功能：快捷键聚焦搜索框、搜索历史记录
// ============================================================

(function() {
    'use strict';
    
    // 快捷键：按 / 聚焦搜索框
    document.addEventListener('keydown', function(e) {
        // 检查是否按下 / 键，且不在输入框中
        if (e.key === '/' && !isInputFocused()) {
            e.preventDefault();
            const searchInput = document.querySelector('#searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
    
    // 检查当前焦点是否在输入框中
    function isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement.tagName === 'INPUT' || 
               activeElement.tagName === 'TEXTAREA';
    }
    
    console.log('🔍 搜索功能已增强：按 / 快速聚焦搜索框');
})();