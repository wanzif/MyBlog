---
title: "从零搭建个人博客：Hugo + Cloudflare Pages 全流程实录"
date: 2026-05-30T21:34:30+08:00
tags: ["Hugo", "Cloudflare", "博客搭建"]
categories: ["教程"]
TocOpen: false
draft: false
---
> 从注册账号到绑定域名、部署上线、配置图床，手把手带你用 Hugo + Cloudflare Pages + R2 搭建一个零成本、国内可访问的个人博客。每一步都附带预期输出和踩坑记录。

> **最后更新：2026-05-30**
>
> **配套阅读**：遇到 Git 相关报错，请参阅《Git 完全指南：Hugo 博客开发者的版本控制手册》

---

## 前言

### 为什么选这套方案

| 方案 | 费用 | 国内访问 | 备案 | 部署体验 |
|------|------|----------|------|----------|
| WordPress | 云服务器 ¥300+/年 | ✅ | 需要 | 手动上传 |
| Hexo + Vercel | 免费 | ❌ | 不需要 | 推送即发布 |
| **Hugo + CF Pages + R2** | **免费** | **✅** | **不需要** | **推送即发布** |

- **Hugo**：Go 语言编写的静态网站生成器，编译速度毫秒级
- **GitHub**：代码托管，免费
- **Cloudflare Pages**：静态网站托管，免费，国内 CDN 加速
- **Cloudflare R2**：对象存储，免费 10GB/月，兼容 S3 API

### 适合谁

有一定命令行基础、想从零搭建个人博客的读者。每一步都附带预期输出和我踩过的坑。

---

## 第1章：账号与域名准备

### 1.1 注册 GitHub

访问 [https://github.com](https://github.com)，点击 **Sign up** 注册。

### 1.2 注册 Cloudflare

访问 [https://dash.cloudflare.com](https://dash.cloudflare.com)，注册并验证邮箱。

### 1.3 购买域名

推荐在腾讯云购买 .com 域名，¥90/年。

**购买地址**：https://dnspod.cloud.tencent.com

搜索想要的域名，按流程下单支付即可。

### 1.4 将域名 NS 托管到 Cloudflare

这一步让 Cloudflare 接管域名的 DNS 解析。

**步骤 1**：在 Cloudflare 添加站点

登录 Cloudflare → 点击 **Add a site** → 输入你的域名 → 选择 Free 计划 → 继续。

Cloudflare 会给你两个 NS 地址，类似：

```
xxx.ns.cloudflare.com
yyy.ns.cloudflare.com
```

⚠️ 每个域名分配的 NS 地址不同，以 Cloudflare 页面显示的为准。

**步骤 2**：去域名注册商修改 NS

登录腾讯云控制台 → 域名管理 → 找到你的域名 → 点击 **DNS 修改** → 将 NS 记录改为 Cloudflare 提供的两个地址。

**步骤 3**：等待 DNS 生效

通常几分钟到几小时。验证方法：

```bash
nslookup -type=ns yourdomain.com   # 替换为你的域名
```

输出中显示 Cloudflare 的 NS 服务器即表示生效。

---

## 第2章：安装 Hugo 和 Git

### 2.1 安装 Git

```powershell
winget install Git.Git              # Windows 一行命令安装
```

验证：

```bash
git --version                       # 确认安装成功
```

### 2.2 安装 Hugo（必须用 Extended 版本）

PaperMod 主题需要 SCSS 支持，普通版会编译报错，**必须安装 Extended 版本**。

```powershell
winget install Hugo.Hugo.Extended --source winget   # 加 --source 避免 msstore 报错
```

验证（输出必须含 `+extended`）：

```bash
hugo version                        # 确认含 +extended
```

⚠️ **踩坑**：如果输出没有 `+extended`，PaperMod 的 SCSS 编译会失败，部署后样式全乱。

### 2.3 常见安装报错

| 报错 | 解决方案 |
|------|----------|
| `winget` 不是内部或外部命令 | 详见《Git 完全指南》第1章 |
| TLS 错误 0x80072f7d | 控制面板 → Internet选项 → 高级 → 勾选 TLS 1.0~1.3 |
| msstore 源证书错误 0x8a15005e | 命令末尾加 `--source winget` |

---

## 第3章：创建博客项目

### 3.1 GitHub 新建仓库

登录 GitHub → 右上角 **+** → **New repository**：

- **Repository name**：填你的仓库名（如 MyBlog）
- **Public** ✅
- ❌ **不要勾选** Add a README file

⚠️ **踩坑**：勾选 README 会导致目录非空，后面 `hugo new site` 会报错。

### 3.2 克隆仓库到本地

```bash
# 将下面的用户名和仓库名替换为你自己的
git clone git@github.com:你的用户名/MyBlog.git

cd MyBlog                          # 进入项目目录
```

> 💡 直接用 SSH 方式克隆，国内访问稳定，不需要代理。如果 SSH 还没配置，先跳到第4章配好再回来。

### 3.3 创建 Hugo 站点

```bash
hugo new site . --force            # --force 因为目录里已有 .git
```

站点目录结构及说明：

```
MyBlog/
├── archetypes/        # 文章模板（新建文章时的默认 front matter）
│   └── default.md
├── assets/            # 需要 Hugo 管道的资源（SCSS、JS 等，编译后输出）
├── content/           # 博客文章（Markdown 文件存放位置）
│   └── posts/         # 文章子目录
├── data/              # 结构化数据（JSON/YAML/TOML，模板中可引用）
├── layouts/           # 页面模板（覆盖主题默认模板）
├── static/            # 静态文件（直接复制到输出目录，不经过处理）
├── themes/            # 主题目录
├── hugo.toml          # 站点配置文件
└── hugo.lock          # 依赖锁定文件
```

### 3.4 添加 PaperMod 主题

```bash
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
                                    # 以子模块方式引入主题，方便后续更新
```

### 3.5 配置主题

复制示例配置作为基础：

```bash
cp themes/PaperMod/exampleSite/hugo.toml ./    # 复制主题示例配置
```

### 3.6 修改 hugo.toml

用编辑器打开 `hugo.toml`，替换为以下内容（将 `yourdomain.com` 和个人信息改为你自己的）：

```toml
baseURL = 'https://yourdomain.com/'   # 改为你的域名
languageCode = 'zh-cn'
title = '你的博客标题'                 # 改为你的博客名
theme = 'PaperMod'

[params]
  description = '博客描述'             # 改为你的描述
  author = '你的名字'                  # 改为你的名字

  [params.homeInfoParams]             # 首页个人信息卡片
    Title = "你好，我是你的名字"        # 改为你的名字
    Content = "一句话介绍自己"          # 改为你的介绍

  # 主题功能开关
  ShowShareButtons = true             # 显示分享按钮
  ShowReadingTime = true              # 显示阅读时长
  ShowBreadCrumbs = true              # 显示面包屑导航
  ShowToc = true                      # 显示文章目录

[[params.socialIcons]]                # 社交链接图标
  name = "github"
  url = "https://github.com/你的用户名"  # 改为你的 GitHub

[outputs]
  home = ["HTML", "RSS", "JSON"]      # 首页输出格式，JSON 用于搜索功能
```

⚠️ **踩坑（大坑）**：TOML 格式极其严格：

- **字符串必须加引号**：`title = "我的博客"` ✓，`title = 我的博客` ✗
- **数组用方括号**：`["HTML", "RSS"]` ✓
- **子对象用独立节**：`[params.homeInfoParams]` ✓，`params.homeInfoParams.Title` ✗

一个标点错误就会导致部署失败。

### 3.7 写第一篇文章

```bash
hugo new posts/我的第一篇文章.md     # 在 content/posts/ 下创建文章
```

打开生成的文件，front matter 必须用 `---` 三横线包裹：

```markdown
---
title: "我的第一篇文章"
date: 2026-05-29T10:00:00+08:00
draft: true                        # true=草稿，不会发布
---

在这里写下你的内容...
```

⚠️ **踩坑**：front matter 必须用 `---` 包裹，用其他符号（如 `===`）Hugo 会忽略该文件。

### 3.8 本地预览

```bash
hugo server -D                      # -D 显示草稿文章，不加则看不到 draft: true 的文章
```

浏览器打开 http://localhost:1313 查看效果。

---

## 第4章：推送到 GitHub

### 4.1 配置 SSH Key

GitHub 不再支持密码认证，必须用 SSH Key 推送代码。

**步骤 1**：生成密钥

```bash
ssh-keygen -t ed25519 -C "你的邮箱@example.com"   # -C 后改为你的 GitHub 邮箱
```

一路回车（默认路径、空密码）即可。

**步骤 2**：查看公钥

```bash
cat ~/.ssh/id_ed25519.pub          # 复制输出的全部内容
```

**步骤 3**：添加到 GitHub

GitHub → 右上角头像 → **Settings** → **SSH and GPG keys** → **New SSH key** → 粘贴公钥 → 保存。

**步骤 4**：验证连接

```bash
ssh -T git@github.com              # 测试 SSH 连接是否成功
```

看到 `Hi 你的用户名! You've successfully authenticated` 即成功。

### 4.2 推送代码

如果第3章已经用 SSH 方式克隆，直接推送即可：

```bash
git add .                          # 暂存所有修改
git commit -m "初始化 Hugo 博客"     # 提交
git push -u origin main            # 推送到远程，-u 设置上游分支
```

⚠️ **踩坑**：如果之前用的是 HTTPS 方式克隆，推送时可能超时。改用 SSH：

```bash
git remote set-url origin git@github.com:你的用户名/MyBlog.git   # 改为 SSH 地址
```

如果一开始就用 SSH 克隆（如3.2节的做法），则不需要此步。

⚠️ `LF will be replaced by CRLF` 警告可以忽略，Windows 换行符差异不影响功能。

---

## 第5章：Cloudflare Pages 部署

### 5.1 进入 Pages

⚠️ **踩坑（大坑）**：Pages 的入口不在 Pages 页面！

登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → 左侧找到 **Workers & Pages** → 点击进入 → **Create** → **Pages** → **Connect to Git**。

很多人在 Dashboard 首页找半天找不到入口，记住是 **Workers & Pages** 里面。

### 5.2 授权 GitHub

首次使用需要授权：

1. 选择 **Only select repositories**
2. 勾选你的博客仓库
3. 点击 **Install & Authorize**

### 5.3 配置构建

选择你的仓库后，填写构建设置：

| 配置项 | 值 |
|--------|-----|
| Production branch | `main` |
| Build command | `hugo` |
| Build output directory | `public` |

建议添加环境变量指定 Hugo 版本：

| Key | Value |
|-----|-------|
| HUGO_VERSION | `0.139.4` |

> 版本号改为你的实际版本，用 `hugo version` 查看。

### 5.4 等待构建

点击 **Save and Deploy**，Cloudflare 自动：克隆仓库 → 安装 Hugo → 编译 → 部署到全球 CDN。

构建成功后，访问临时域名（格式：`项目名.pages.dev`）验证。

### 本章踩坑汇总

| 问题 | 原因 | 解决 |
|------|------|------|
| 找不到 Pages 入口 | 入口在 Workers & Pages 里面 | 见 5.1 节 |
| 部署失败 | TOML/front matter 格式错 | 检查配置语法 |
| 样式丢失 | submodule 没拉取 | 确认 git submodule 正确 |
| `_index.md` 报错 | 配置了 `outputs` 字段 | 删除该字段 |
| Pages 和 Workers 混淆 | 两者界面不同 | 只用 Pages 配置静态博客 |

---

## 第6章：绑定自定义域名

### 6.1 添加自定义域名

在 Pages 项目中：**Custom domains** → **Add custom domain** → 输入你的域名。

Cloudflare 自动验证域名所有权并配置 CNAME 记录 + SSL 证书。

### 6.2 验证

等待 DNS 生效（通常几分钟），访问你的域名，应该能看到博客首页，浏览器显示安全锁。

⚠️ **踩坑（大坑）**：只在 DNS 页面添加 CNAME 记录 **不等于** 域名绑定成功！

必须在 **Pages 项目 → Custom domains** 里添加域名。只改 DNS 不绑定 Pages，访问会报 **522 错误**。

```
✅ 正确：Pages → Custom domains → Add custom domain
❌ 错误：只在 DNS → Records → 添加 CNAME
```

---

## 第7章：R2 图床搭建

### 7.1 创建 R2 存储桶

Cloudflare Dashboard → **R2 Object Storage** → **Create bucket** → 输入 Bucket 名称（全局唯一，建议用域名或用户名）。

### 7.2 绑定自定义域名

R2 存储桶 → **Custom Domains** → **Add custom domain** → 输入子域名（如 `img.yourdomain.com`）。

Cloudflare 自动配置 DNS 记录。

⚠️ **踩坑**：绑定自定义域名后，**不需要**开启"公开发 URL"。图片访问走你绑定的域名 CDN。

### 7.3 生成 API Token

R2 → **Manage R2 API Tokens** → **Create API Token**：

- 选择 **S3 compatible token**（⚠️ 不是 Account API token）
- Permissions：Edit

⚠️ **踩坑（大坑）**：必须选 **S3 compatible token**！选 Account API token 会报 `Unauthorized`。

创建成功后保存以下信息：

```
Access Key ID: xxxxxxxxxxxxxxxxx
Secret Access Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Endpoint: https://你的account-id.r2.cloudflarestorage.com
Bucket: 你的bucket名称
```

---

## 第8章：PicList + Typora 图片自动上传

### 8.1 安装 PicList

下载 [PicList](https://github.com/PicGo/PicList)（PicGo 增强版）并安装。

### 8.2 配置 R2 图床

PicList → 图床配置 → 选择 **AWS S3**，填写：

| 字段 | 值 |
|------|-----|
| Bucket | 你的 R2 Bucket 名称 |
| 指定路径 | `Blog/` |
| Endpoint | 上一步记录的 R2 Endpoint |
| Region | `auto` |
| Access Key ID | 上一步生成的 |
| Secret Access Key | 上一步生成的 |

设为默认图床。

### 8.3 配置 Typora 自动上传

Typora → 偏好设置 → **图像**：

1. **插入图片时**：选择 **上传图片**
2. **上传服务**：选择 **PicList(app)**
3. 点击 **验证图片上传选项** 确认成功

### 8.4 配置 PicList Server

PicList → 设置 → 开启 **Server**，端口默认 `22377`。

开启后，Typora 粘贴图片会自动触发上传到 R2。

### 8.5 多图床同步（可选）

PicList 支持同时上传到多个图床，实现双备份：

设置 → 上传配置 → **上传到多个图床** → 勾选 R2 和其他图床（如腾讯 COS）。

⚠️ **踩坑**：shields.io 等徽章图片（.svg）会被 PicList 误上传，需在排除规则中添加 `**/*.svg`。

---

## 第9章：日常写作流程

### 9.1 完整工作流

```bash
hugo new posts/文章标题.md          # 创建新文章
# 用 Typora 写作，图片自动上传到 R2
hugo server -D                      # 本地预览
# 确认无误后：
git add .                           # 暂存修改
git commit -m "新增：文章标题"       # 提交
git push                            # 推送，Cloudflare Pages 自动构建发布
```

推送后约 2-3 分钟线上更新。

### 9.2 草稿管理

```markdown
---
title: "我的草稿"
draft: true                        # 草稿，hugo 不会将其发布到 public/
---
```

- 本地预览草稿：`hugo server -D`
- 发布时改为 `draft: false` 或直接删除该行

### 9.3 主题更新

```bash
cd themes/PaperMod                  # 进入主题子模块目录
git pull origin master              # 拉取最新版本
cd ../..                            # 返回主目录
git add .                           # 子模块更新后，主仓库也要提交
git commit -m "更新 PaperMod 主题"
git push
```

⚠️ **踩坑**：子模块更新后主仓库必须 add + commit + push，否则 Cloudflare Pages 构建的还是旧版本。

---

## 第10章：常见问题速查

**Q: 部署失败怎么排查？**

看 Cloudflare Pages 构建日志，90% 是配置格式错误（TOML 语法或 front matter 格式）。

**Q: 域名访问报 522？**

Pages 项目 → Custom domains，确认域名已添加。只改 DNS 不够。

**Q: 图片上传失败？**

1. Token 类型是否为 S3 兼容令牌（不是 Account Token）
2. Endpoint 是否正确（含 account-id.r2.cloudflarestorage.com）
3. Bucket 名称是否匹配

**Q: 主题更新后线上没变化？**

子模块更新后主仓库也要 commit + push。

**Q: Git 相关报错？**

详见《Git 完全指南：Hugo 博客开发者的版本控制手册》。

---

## 附录

### A. 费用清单

| 服务 | 费用 | 说明 |
|------|------|------|
| 域名 | ¥90/年 | 腾讯云 .com |
| GitHub | 免费 | 无限仓库 |
| Cloudflare Pages | 免费 | 无流量限制 |
| Cloudflare R2 | 免费 | 10GB/月 |
| PicList | 免费 | 开源软件 |

**全年总费用：¥90（仅域名）**

### B. 相关链接

| 资源 | 链接 |
|------|------|
| 腾讯云域名注册 | https://dnspod.cloud.tencent.com |
| GitHub | https://github.com |
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Hugo 官网 | https://gohugo.io |
| PaperMod 主题 | https://github.com/adityatelange/hugo-PaperMod |
| PicList | https://github.com/PicGo/PicList |
| Git 完全指南 | 配套阅读文档 |
