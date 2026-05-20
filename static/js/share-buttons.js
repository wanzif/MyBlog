// ============================================================
// 国内社交平台分享按钮
// 支持：微信、微博、QQ、QQ空间、豆瓣、知乎
// ============================================================

(function() {
    'use strict';
    
    // 只在文章页面执行
    if (!document.querySelector('.post-single')) return;
    
    // 获取文章信息
    const title = document.title;
    const url = window.location.href;
    const description = document.querySelector('meta[name="description"]')?.content || '';
    
    // 分享平台配置
    const sharePlatforms = [
        {
            name: '微博',
            icon: '📰',
            color: '#E6162D',
            url: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        },
        {
            name: 'QQ',
            icon: '💬',
            color: '#12B7F5',
            url: `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        },
        {
            name: 'QQ空间',
            icon: '🌟',
            color: '#FECE00',
            url: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        },
        {
            name: '豆瓣',
            icon: '📖',
            color: '#007722',
            url: `https://www.douban.com/share/service?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        },
        {
            name: '微信',
            icon: '📱',
            color: '#07C160',
            action: 'wechat'  // 特殊处理
        }
    ];
    
    // 创建分享按钮容器
    const shareContainer = document.createElement('div');
    shareContainer.className = 'custom-share-buttons';
    shareContainer.innerHTML = '<span class="share-title">分享到：</span>';
    
    // 创建按钮
    sharePlatforms.forEach(platform => {
        const button = document.createElement('a');
        button.className = 'share-button';
        button.innerHTML = `<span class="share-icon">${platform.icon}</span><span class="share-name">${platform.name}</span>`;
        button.style.backgroundColor = platform.color;
        
        if (platform.action === 'wechat') {
            // 微信分享：显示二维码
            button.href = 'javascript:void(0)';
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showWechatQRCode(url, title);
            });
        } else {
            // 其他平台：打开分享窗口
            button.href = platform.url;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
        }
        
        shareContainer.appendChild(button);
    });
    
    // 插入到文章底部
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        postContent.appendChild(shareContainer);
    }
    
    // 微信二维码弹窗
    function showWechatQRCode(url, title) {
        // 创建弹窗
        const modal = document.createElement('div');
        modal.className = 'wechat-qrcode-modal';
        modal.innerHTML = `
            <div class="wechat-qrcode-content">
                <div class="wechat-qrcode-header">
                    <h3>微信扫码分享</h3>
                    <button class="wechat-qrcode-close">&times;</button>
                </div>
                <div class="wechat-qrcode-body">
                    <div id="qrcode"></div>
                    <p class="wechat-tip">打开微信，扫描二维码分享文章</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 生成二维码（使用 QRCode.js）
        if (typeof QRCode !== 'undefined') {
            new QRCode(document.getElementById('qrcode'), {
                text: url,
                width: 200,
                height: 200
            });
        } else {
            // 如果没有 QRCode.js，显示提示
            document.getElementById('qrcode').innerHTML = `
                <p>请复制链接分享：</p>
                <input type="text" value="${url}" readonly onclick="this.select()">
            `;
        }
        
        // 关闭弹窗
        modal.querySelector('.wechat-qrcode-close').addEventListener('click', function() {
            modal.remove();
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    console.log('📤 国内分享按钮已启用');
})();