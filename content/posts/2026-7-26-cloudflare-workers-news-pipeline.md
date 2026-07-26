---
title: "零成本搭一个资讯聚合站：Cloudflare Workers 实战"
date: "2026-07-26"
description: "用 Cloudflare 免费套餐（Workers + D1 + Workers AI）搭一条自动内容流水线：每天抓取多个数据源，英文自动翻译成中文摘要，存入数据库，网页展示。想追什么资讯，换几个源就行。"
categories: ["教程"]
tags: ["Cloudflare", "Workers", "AI", "自动化", "RSS", "D1", "资讯聚合"]
ShowToc: true
TocOpen: false
---

> 一条自动抓取、AI 翻译、入库、展示的内容流水线。全程 Cloudflare 免费额度，零服务器。
>
> 🖥️ 案例展示：[ai.wanzf.com](https://ai.wanzf.com) —— 这是我搭建的实例，每天 08:00 自动更新。

## 背景

每天刷好几个网站看资讯，来回切换效率很低。中文的还好，英文的还得逐篇翻译，看了几篇就烦了。

能不能让机器自动干这件事——每天定时抓取几个中英文科技源，英文自动翻译成中文，统一展示在一个网页上，打开就能看？

答案是可以，而且零成本。Cloudflare 免费套餐里有四个组件，拼起来就是一条完整的自动内容流水线。

这篇就以"科技资讯聚合"当例子，但流水线本身不绑死任何主题——改几个 RSS 地址就能追别的东西：行业动态、AI 论文、设计趋势、竞品情报，都一样跑。

## 这个项目做了什么

- 每天北京时间 08:00 自动运行
- 从 5 个数据源各抓 2 篇热门文章（HN、V2EX、少数派、阮一峰周刊、36氪）
- 英文源（HN）走 Workers AI 翻译成中文摘要
- 中文源直接存原文
- 全部存进 D1 数据库，网页展示
- 自定义域名访问：ai.wanzf.com

架构很简单：

```
Cron 定时触发（每天 08:00）
         │
         ▼
    Worker 主逻辑
         │
    ┌────┴────┐
    ▼         ▼
英文源     中文源
HN API    V2EX API / RSS
    │         │
    ▼         │
Workers AI    │
翻译成中文     │
    │         │
    └────┬────┘
         ▼
     D1 数据库
         │
         ▼
    网页展示
  (ai.wanzf.com)
```

四个 Cloudflare 免费组件就够：

| 组件         | 免费额度              | 本项目用量        |
| ---------- | ----------------- | ------------ |
| Workers    | 10 万次请求/天         | ~2 次/天       |
| Cron 触发器   | 免费套餐支持            | 1 次/天        |
| D1         | 5GB 存储 / 500 万读/天 | 几 KB / 几十次   |
| Workers AI | ~1 万 token/天      | ~500 token/天 |

## 第一步：准备环境

把下面命令复制到 PowerShell，逐条跑：

```powershell
# 1. 装 Node.js（Windows 11，其他系统去 https://nodejs.org 下载）
winget install OpenJS.NodeJS.LTS

# 2. 关掉 PowerShell 重开，验证
node -v
npm -v

# 3. 装 Cloudflare 命令行工具 wrangler
npm install -g wrangler

# 4. 验证
wrangler --version
```

wrangler 官方文档：<https://developers.cloudflare.com/workers/>

如果你还没 Cloudflare 账号，去 <https://www.cloudflare.com> 注册，免费即可。

## 第二步：登录（避开代理坑）

常规方法是 `wrangler login`，浏览器弹窗授权。但如果你开着本地代理（Clash / VPN 之类），浏览器对 `localhost` 的访问会被代理拦截，OAuth 回调地址 `http://localhost:8976` 打不开，登录实际失败。

改用 API Token 方式：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 右上角头像 → **My Profile → API Tokens → Create Token**
3. 模板选 **Edit Cloudflare Workers**，额外加一项 Account 级 **D1: Edit** 权限
4. 创建后复制 Token（只显示一次），同时复制右侧的 **Account ID**

在 PowerShell 里设环境变量：

```powershell
$env:CLOUDFLARE_API_TOKEN = "你的Token"
$env:CLOUDFLARE_ACCOUNT_ID = "你的AccountID"
```

验证：

```powershell
wrangler whoami
```

显示邮箱就 OK。注意这个环境变量只在当前 PowerShell 窗口有效，后面操作在同一个窗口里做。

## 第三步：建项目和数据库

```powershell
# 创建项目目录
mkdir my-news-pipeline
cd my-news-pipeline
```

### 3.1 配置文件 wrangler.toml

在项目目录新建 `wrangler.toml`，复制以下内容：

```toml
name = "my-news-pipeline"
main = "src/index.js"
compatibility_date = "2025-01-01"

# 你的 Cloudflare Account ID（登录 Cloudflare 后台，右侧就能看到）
account_id = "你的AccountID"

# D1 数据库绑定（database_id 下一步创建后回填）
[[d1_databases]]
binding = "DB"
database_name = "news-db"
database_id = "先占位，创建后再替换"

# Workers AI 绑定（固定写法）
[ai]
binding = "AI"

# 每天 UTC 00:00 = 北京时间 08:00
[[triggers]]
crons = ["0 0 * * *"]
```

### 3.2 创建 D1 数据库

```powershell
wrangler d1 create news-db
```

输出里会有一个 `database_id`，把它填到 wrangler.toml 的 `database_id` 字段。

### 3.3 建表

在项目目录新建 `schema.sql`：

```sql
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL DEFAULT 'unknown',
  ext_id TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  summary_zh TEXT,
  tags TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- url 做唯一键，同一篇文章不会重复插入
CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_url ON articles(url);
```

执行建表：

```powershell
wrangler d1 execute news-db --remote --file=./schema.sql
```

## 第四步：写 Worker 代码

在项目目录创建 `src/` 文件夹，在里面新建 `index.js`。以下是**完整代码**，直接复制粘贴即可。关键位置我都加了注释，标了 🔧 的地方就是你可以 DIY 的部分：

```javascript
// ============================================================
// Cloudflare Worker：自动抓取 → AI 翻译 → 入库 → 网页展示
// ============================================================

export default {
  // Cron 定时触发（每天北京时间 08:00，即 UTC 00:00）
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runPipeline(env, false));
  },

  // 浏览器访问
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // /refresh — 手动触发抓取（不公开，作者自己用）
    if (url.pathname === "/refresh") {
      ctx.waitUntil(runPipeline(env, false));
      return new Response("已触发刷新，稍等几十秒后刷新页面查看结果。", {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    // / — 展示所有已抓取的文章
    return await renderPage(env);
  },
};

// ============================================================
// 流水线主逻辑：遍历所有数据源 → 抓取 → 写库
// ============================================================
async function runPipeline(env) {
  const log = [];

  // 🔧 数据源配置 —— 改这里就能换源
  // 每个源：name(显示名) / fetch(抓取函数) / needsAI(英文源需要 AI 翻译) / limit(每次取几条)
  const sources = [
    { name: "Hacker News", fetch: fetchHN, needsAI: true, limit: 2 },
    { name: "V2EX",       fetch: fetchV2EX, needsAI: false, limit: 2 },
    { name: "少数派",      fetch: () => fetchRSS("https://sspai.com/feed", 2), needsAI: false, limit: 2 },
    { name: "阮一峰周刊",  fetch: () => fetchRSS("https://www.ruanyifeng.com/blog/atom.xml", 2), needsAI: false, limit: 2 },
    { name: "36氪",       fetch: () => fetchRSS("https://36kr.com/feed", 2), needsAI: false, limit: 2 },
  ];
  // 🔧 例子：想追 AI 论文，加一行：
  // { name: "ArXiv AI", fetch: () => fetchRSS("https://rss.arxiv.org/rss/cs.AI", 2), needsAI: true, limit: 2 },
  // 🔧 例子：想追设计动态，加一行：
  // { name: "UI设计", fetch: () => fetchRSS("https://www.uisdc.com/feed", 2), needsAI: false, limit: 2 },

  for (const src of sources) {
    try {
      let items = (await src.fetch()) || [];
      items = items.slice(0, src.limit);
      log.push(`[${src.name}] 抓取 ${items.length} 条`);

      for (const it of items) {
        let r = { cnTitle: it.title, summary: it.summary || "", tags: "" };

        // 只有 needsAI=true 的源才调 Workers AI 翻译
        if (src.needsAI) {
          r = await summarize(env, it.title, it.url);
        }

        // INSERT OR IGNORE：按 url 去重，不会重复插入
        await env.DB.prepare(
          `INSERT OR IGNORE INTO articles (source, ext_id, title, url, summary_zh, tags, created_at)
           VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
        ).bind(src.name, it.id, r.cnTitle || it.title, it.url, r.summary, r.tags).run();
      }
    } catch (e) {
      log.push(`[${src.name} 失败] ${e.message}`);
    }
  }

  log.push("[OK] 流水线跑完");
  return log;
}

// ============================================================
// 抓取：Hacker News（英文，JSON API，不解析 HTML）
// ============================================================
async function fetchHN() {
  const res = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=10"
  );
  const data = await res.json();
  return (data.hits || [])
    .filter(h => h.title && h.url)
    .map(h => ({ id: h.objectID, title: h.title, url: h.url, summary: "" }));
}

// ============================================================
// 抓取：V2EX 热门（中文，JSON API）
// ============================================================
async function fetchV2EX() {
  const res = await fetch("https://www.v2ex.com/api/topics/hot.json", {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; news-bot/1.0)" },
  });
  const data = await res.json();
  const items = Array.isArray(data) ? data : [];
  return items
    .filter(t => t && t.title && t.url)
    .map(t => ({
      id: String(t.id),
      title: t.title,
      url: t.url,
      summary: (t.content || "").replace(/\s+/g, " ").slice(0, 120)
    }));
}

// ============================================================
// 抓取：通用 RSS / Atom 解析（少数派、阮一峰周刊、36氪 都用这个）
// ============================================================
async function fetchRSS(url, limit) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; news-bot/1.0)" },
  });
  const xml = await res.text();
  const items = [];
  const isAtom = xml.includes("<entry");
  const blockRe = isAtom ? /<entry>([\s\S]*?)<\/entry>/g : /<item>([\s\S]*?)<\/item>/g;
  let m;

  while ((m = blockRe.exec(xml)) !== null && items.length < limit) {
    const block = m[1];

    // 提取标题
    const titleRaw = (block.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || "";

    // 提取链接（兼容 CDATA 包裹的场景，比如 36氪 的 RSS）
    let link = "";
    const linkText = block.match(/<link[^>]*>([\s\S]*?)<\/link>/);
    if (linkText) {
      link = linkText[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
    } else {
      const atomLink = block.match(/<link[^>]*href="([^"]*)"/);
      if (atomLink) link = atomLink[1].trim();
    }

    // 提取摘要
    const desc = block.match(/<description[^>]*>([\s\S]*?)<\/description>/) ||
                 block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/);
    let summary = desc ? desc[1] : "";
    summary = summary
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")   // 剥 CDATA
      .replace(/&amp;/g, "&")                              // HTML 实体解码
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/<[^>]*>/g, "")                           // 剥 HTML 标签
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120);

    const title = titleRaw
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
      .replace(/<[^>]*>/g, "")
      .trim();

    if (title && link) items.push({ id: link, title, url: link, summary });
  }
  return items;
}

// ============================================================
// Workers AI：英文标题 → 中文摘要 + 标签
// ============================================================
async function summarize(env, title, url) {
  const prompt = `你是一个中文资讯助手。下面是一篇英文科技资讯的标题和链接。
请用简洁的中文严格按下面三行格式输出（不要多余解释、不要编号）：
标题：<中文改写，不超过30字>
摘要：<2到3句话，说清这篇文章大概讲什么>
标签：<2到4个中文标签，逗号分隔>

标题原文：${title}
链接：${url}`;

  try {
    // 模型名要用当前有效的版本，去 https://developers.cloudflare.com/workers-ai/models/ 查
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fp8", { prompt });
    const text = (result && result.response) || "";
    if (!text) return { cnTitle: "", summary: "（AI 返回为空）", tags: "", error: "empty" };
    return parseSummary(text);
  } catch (e) {
    console.error("AI run failed:", e);
    return {
      cnTitle: "",
      summary: "（AI 摘要暂时失败，请确认 Cloudflare 后台已绑定付款方式）",
      tags: "",
      error: String((e && e.message) || e),
    };
  }
}

function parseSummary(text) {
  let cnTitle = "", summary = "", tags = "";
  const lines = text.split("\n").map(s => s.trim()).filter(Boolean);

  for (const line of lines) {
    if (/^标题[:：]/i.test(line)) {
      cnTitle = line.replace(/^标题[:：]/i, "").trim();
    } else if (/^摘要[:：]/i.test(line)) {
      summary = line.replace(/^摘要[:：]/i, "").trim();
    } else if (/^标签[:：]/i.test(line)) {
      tags = line.replace(/^标签[:：]/i, "").trim();
    } else {
      summary += (summary ? " " : "") + line;
    }
  }
  return { cnTitle, summary: summary || text, tags };
}

// ============================================================
// 渲染网页（从 D1 读出最近 60 条，按来源标注，中文优先展示）
// ============================================================
async function renderPage(env) {
  let rows = [];
  try {
    const { results } = await env.DB.prepare(
      "SELECT source, title, url, summary_zh, tags, created_at FROM articles ORDER BY created_at DESC LIMIT 60"
    ).all();
    rows = results || [];
  } catch (e) {
    rows = [];
  }

  // 🔧 页面标题和描述 —— 改成你自己的
  const pageTitle = "科技资讯 · 每日速览";
  const pageDesc = "每天自动抓取中英文科技资讯，英文自动翻译成中文摘要。";

  const items = rows.map(r => `
    <li>
      <a href="${escapeHtml(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.title)}</a>
      <p>${escapeHtml(r.summary_zh || "")}</p>
      ${r.tags ? `<small class="tag">标签：${escapeHtml(r.tags)}</small>` : ""}
      <small class="src">来源：${escapeHtml(r.source || "")}</small>
      <small class="time">${escapeHtml(String(r.created_at || ""))}</small>
    </li>`
  ).join("");

  // 🔧 改 CSS 颜色、字体、布局都在这里
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${pageTitle}</title>
<style>
  body { font-family: system-ui, "Microsoft YaHei", sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; color: #222; }
  h1 { font-size: 1.4rem; }
  ul { list-style: none; padding: 0; }
  li { border-bottom: 1px solid #eee; padding: 1rem 0; }
  a { color: #b5341a; text-decoration: none; font-weight: 600; }
  a:hover { text-decoration: underline; }
  p { margin: .4rem 0; line-height: 1.6; }
  small { color: #888; margin-right: .8rem; }
  .tag { color: #666; }
  .src { color: #2a7; font-weight: 600; }
  .time { display: inline-block; margin-top: .3rem; }
</style>
</head>
<body>
  <h1>${pageTitle}</h1>
  <p>${pageDesc}每天 08:00（北京时间）自动更新。</p>
  <ul>${items || "<li>暂无数据，每日 08:00 自动更新，稍后再来看看～</li>"}</ul>
</body>
</html>`;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
```

### 目录结构确认

最终你的项目目录应该是这样的：

```
my-news-pipeline/
├── wrangler.toml    # 项目配置
├── schema.sql        # 数据库建表语句
└── src/
    └── index.js      # Worker 全部代码（上面那一大段）
```

## 第五步：部署

```powershell
# 确保在项目目录下
wrangler deploy
```

部署成功会输出一个地址，格式为 `https://my-news-pipeline.<子域>.workers.dev`。

### 绑定自定义域名（可选）

如果你想用自己的域名（比如我用的 ai.wanzf.com）：

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. 点你的项目 → **Settings → Domains & Routes**
3. 添加自定义域名（前提是这个域名的 DNS 已经在 Cloudflare 管理）

现在访问你的域名，首次数据为空。访问 `域名/refresh` 手动触发一次抓取，等几十秒刷新页面就能看到结果。之后每天 08:00 自动跑，不用管。

## 第六步：必须做的事（不然英文摘要出不来）

**Workers AI 需要绑定付款方式。** Cloudflare 从 2024 年 11 月起要求调用 Workers AI 的用户先绑定信用卡——不超免费额度不会扣钱，但不绑卡 AI 调用会直接失败。表现是：数据能进库，但英文摘要全部显示"AI 摘要暂时失败"。

绑定路径：Dashboard → Billing → Payment Methods → Add a card。

中文源不受影响——V2EX、少数派、阮一峰周刊、36氪走的是原文，不需要 AI。所以如果你暂时不想绑卡，把 `sources` 里 `needsAI: true` 的源删掉就行，中文源照样跑。

## 想让它追别的资讯？

改 `src/index.js` 里 `sources` 数组就行。举例：

```javascript
// 追 AI 论文
{ name: "ArXiv AI", fetch: () => fetchRSS("https://rss.arxiv.org/rss/cs.AI", 2), needsAI: true, limit: 2 },

// 追设计动态
{ name: "优设", fetch: () => fetchRSS("https://www.uisdc.com/feed", 2), needsAI: false, limit: 2 },

// 追 NBA 新闻
{ name: "虎扑", fetch: () => fetchRSS("https://voice.hupu.com/nba/rss", 2), needsAI: false, limit: 2 },
```

改完重新 `wrangler deploy`。中文 RSS 源 `needsAI: false`，英文的 `needsAI: true`（前提是你绑了卡）。

## 踩过的坑

| 坑                 | 现象                          | 原因                                              | 解决                                   |
| ----------------- | --------------------------- | ----------------------------------------------- | ------------------------------------ |
| wrangler login 失败 | OAuth 回调 localhost:8976 打不开 | 本地代理拦截浏览器访问 localhost                           | 改用 API Token 登录                      |
| AI 摘要始终为空         | 数据进库了，但摘要全是失败提示             | Workers AI 需要绑信用卡才能调用                           | Cloudflare 后台绑定付款方式                  |
| AI 调用报错           | `AI.run()` 直接抛异常            | 模型名已废弃（老版 llama-3.1-8b-instruct 被标记 Deprecated） | 换成 `-fp8` 版；去 Workers AI 模型列表查当前有效名称 |
| 36氪链接解析失败         | 正则匹配到的链接是 CDATA 原始文本        | 36氪 RSS 把 `<link>` 内容包在 `<![CDATA[...]]>` 里     | 先剥 CDATA 再取链接文本                      |
| 某些 RSS 源抓不到数据     | 请求返回 0 条                    | 该源的 RSS 地址已失效或重定向到非 XML 页面                      | 浏览器打开 RSS 地址确认可用，不行就换源               |
| 同一个源每篇文章都出现两次     | 页面有重复文章                     | 每次刷新都会 INSERT，产生重复数据                            | url 加唯一索引 + INSERT OR IGNORE 去重      |

## 完整文件

项目所有文件（wrangler.toml、schema.sql、src/index.js）也可以在 GitHub 看：[github.com/wanzif/edu-news-pipeline](https://github.com/wanzif/edu-news-pipeline)

