// ============================================================
// 文章目录侧边栏脚本
// 功能：自动提取文章目录并显示在侧边栏，支持自动滚动
// ============================================================
(function() {
  'use strict';

  // 只在文章页面执行
  if (!document.querySelector('.post-single')) return;

  // 检查是否启用了目录
  const tocElement = document.querySelector('.toc');
  if (!tocElement) return;

  // 隐藏文章开头的目录，避免重复显示
  const originalToc = document.querySelector('.post-content .toc');
  if (originalToc) {
    originalToc.style.display = 'none';
  }

  // 创建侧边栏容器
  const sidebar = document.createElement('aside');
  sidebar.className = 'toc-sidebar';

  // 创建目录卡片
  const tocCard = document.createElement('div');
  tocCard.className = 'toc';

  // 创建目录标题
  const tocTitle = document.createElement('span');
  tocTitle.className = 'toc-title';
  tocTitle.textContent = '📑 目录';

  // 创建目录内容容器
  const tocContent = document.createElement('div');
  tocContent.className = 'toc-content';

  // 克隆原始目录内容
  const originalTocList = tocElement.querySelector('ul');
  if (originalTocList) {
    tocContent.appendChild(originalTocList.cloneNode(true));
  }

  // 组装目录卡片
  tocCard.appendChild(tocTitle);
  tocCard.appendChild(tocContent);
  sidebar.appendChild(tocCard);

  // 添加到页面
  document.body.appendChild(sidebar);

  // 高亮当前目录项
  highlightCurrentToc();

  // 滚动时高亮当前目录项
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        highlightCurrentToc();
        ticking = false;
      });
      ticking = true;
    }
  });

  // 高亮当前可见的标题对应的目录项
  function highlightCurrentToc() {
    const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4');
    const tocLinks = sidebar.querySelectorAll('a');
    let currentHeading = null;

    headings.forEach(function(heading) {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 150) {
        currentHeading = heading;
      }
    });

    if (currentHeading) {
      tocLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentHeading.id) {
          link.classList.add('active');

          // 自动滚动侧边栏，让当前目录项可见
          const sidebarRect = sidebar.getBoundingClientRect();
          const linkRect = link.getBoundingClientRect();

          // 如果目录项在侧边栏可见区域之外
          if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
            link.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    }
  }

  // 平滑滚动到目录项
  sidebar.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('📑 目录侧边栏已启用');
})();
