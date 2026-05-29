---
title: "Git 完全指南：Hugo 博客开发者的版本控制手册"
date: 2026-05-29
draft: false
description: "从 Git 安装到进阶操作的全流程指南，覆盖 Windows/Linux、分支、冲突、子模块、多设备协作。"
tags: ["Git", "Hugo", "版本控制", "博客", "GitHub"]
categories: ["开发工具"]
ShowReadingTime: true
ShowToc: true
TocOpen: false
---

> 适用项目：GitHub 博客项目（https://github.com/wanzif/MyBlog.git）
> 适用系统：Windows 11 / Linux（CentOS 7、Ubuntu 等）

---

## 1. Windows 安装 Git

### 方法一：winget 安装（推荐）

#### 第 1 步：确认 winget 可用

打开 **PowerShell** 或 **CMD**，输入：

```powershell
winget --version
```

**正常输出示例：**
```
v1.9.25200
```

#### ⚠️ 报错：'winget' 不是内部或外部命令

```
C:\Users\Wan>winget install Git.Git
'winget' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
```

**原因：** winget 是 Windows 11 自带的包管理器，但某些精简版/Ghost 系统、或 PATH 环境变量被修改后，winget 可能不在 PATH 中。

**解决方法（按优先级尝试）：**

**方案 A：PowerShell 一行命令注册（最快，推荐首选）**

WinGet 是 Windows 自带的"应用安装程序"组件，可能只是没注册。打开 **PowerShell**，输入：

```powershell
Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.DesktopAppInstaller_8wekyb3d8bbwe
```

执行完后重启终端，再试 `winget --version`。

> 这个命令的原理：WinGet 作为 App Installer 的一部分已预装在 Windows 11/10（1809+）中，首次登录时系统会异步注册，但有时没触发成功。这条命令就是手动触发注册。
>
> 参考文档：[Windows 包管理器 (winget) | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/package-manager/winget/)

**方案 B：使用 Microsoft Store 安装 winget**

1. 打开 Microsoft Store
2. 搜索 **"应用安装程序"**（App Installer）
3. 点击"获取"或"更新"
4. 安装完成后重启终端，再试 `winget --version`

**方案 C：手动修复 PATH**

1. 打开文件资源管理器，进入 `C:\Users\Wan\AppData\Local\Microsoft\WindowsApps`
2. 看看有没有 `winget.exe`
3. 如果有：
   - 右键"此电脑" → 属性 → 高级系统设置 → 环境变量
   - 在"用户变量"或"系统变量"中找到 `Path`
   - 点击编辑 → 新建 → 添加 `C:\Users\Wan\AppData\Local\Microsoft\WindowsApps`
   - 确定保存，**重新打开终端**

**方案 D：从 GitHub 下载 winget 安装包**

> 官方文档：[Windows 包管理器 (winget) | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/package-manager/winget/)

Microsoft 官方在 GitHub 上发布了 winget 的安装包，可以直接下载安装：

1. 访问 https://github.com/microsoft/winget-cli/releases
2. 找到最新的**正式版**（不要选 preview 预览版）
3. 下载以下两个文件：
   - `Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle`（主安装包）
   - `Microsoft.DesktopAppInstaller_8wekyb3d8bbwe_License1.xml`（许可证文件，部分版本需要）
4. 以**管理员身份**打开 PowerShell，执行安装：

```powershell
# 进入下载目录
cd C:\Users\Wan\Downloads

# 安装 winget（加许可证）
Add-AppxProvisionedPackage -Online -PackagePath .\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle -LicensePath .\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe_License1.xml

# 如果没有许可证文件，或上面的命令报错，试这个：
Add-AppxPackage -Path .\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle
```

5. 安装完成后重启终端，验证：

```powershell
winget --version
```

**⚠️ 注意事项：**
- 如果报错"部署失败"，可能需要先卸载旧版本：设置 → 应用 → 搜索"应用安装程序" → 卸载 → 再重新安装
- 下载时注意选正式版（如 `v1.9.x`），不要选 preview 版（如 `v1.29.x-preview`）
- `.msixbundle` 文件较大（约 30MB），国内下载可能较慢

**方案 E：直接下载 Git 安装包（最终兜底）**

如果 winget 实在搞不定，直接去官网下载：

1. 访问 https://git-scm.com/download/win
2. 下载 **64-bit Git for Windows Setup**
3. 双击安装，一路 Next 即可
4. 安装完成后重启终端

#### 第 2 步：安装 Git

```powershell
winget install Git.Git
```

**正常输出：**
```
已成功找到安装包 [Git.Git] 版本 [2.x.x]
已成功完成安装
```

安装完成后，**关闭并重新打开终端**，验证：

```powershell
git --version
```

**正常输出：**
```
git version 2.47.1.windows.1
```

#### ⚠️ 报错：0x80072f7d（TLS 协议问题）

```
winget install Git.Git
失败: 0x80072f7d ...
```

**原因：** Windows 的 TLS 协议版本太低，无法连接 Microsoft 服务器。

**解决方法：**

1. 打开 **控制面板** → **网络和 Internet** → **Internet 选项**
2. 切换到 **"高级"** 选项卡
3. 向下滚动，找到 **"安全"** 区域
4. 勾选以下选项：
   - ✅ 使用 TLS 1.0
   - ✅ 使用 TLS 1.1
   - ✅ 使用 TLS 1.2
   - ✅ 使用 TLS 1.3（如果有）
5. 点击"应用" → "确定"
6. 重新执行 `winget install Git.Git`

---

### 方法二：直接下载安装包

1. 访问 https://git-scm.com/download/win
2. 下载 64-bit 安装包
3. 双击运行，安装选项说明：

| 安装选项 | 建议 |
|---------|------|
| 安装路径 | 默认即可 |
| 组件选择 | 默认即可 |
| 默认编辑器 | 选 VS Code（如果你装了的话）或 Vim |
| PATH 环境 | 选 **"Git from the command line and also from 3rd-party software"** |
| SSH 可执行文件 | 使用捆绑的 OpenSSH |
| HTTPS 传输后端 | 使用 OpenSSL |
| 换行符转换 | 选 **"Checkout Windows-style, commit Unix-style"**（默认） |

4. 安装完成，重启终端

---

## 2. Linux 安装 Git

### Ubuntu / Debian

```bash
# 更新包索引
sudo apt update

# 安装 Git
sudo apt install git -y

# 验证
git --version
```

### CentOS 7

```bash
# CentOS 7 默认的 Git 版本很老（1.8.x），建议用源码编译或第三方源

# 方法一：yum 直接装（版本老，能用）
sudo yum install git -y

# 方法二：装新版本（推荐）
# 先安装依赖
sudo yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker -y

# 下载最新源码（去 https://mirrors.edge.kernel.org/pub/software/scm/git/ 看最新版本号）
cd /usr/local/src
sudo wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.47.1.tar.gz
sudo tar -xzf git-2.47.1.tar.gz
cd git-2.47.1
sudo make prefix=/usr/local all
sudo make prefix=/usr/local install

# 验证
git --version
```

### CentOS 8 / Rocky Linux / AlmaLinux

```bash
sudo dnf install git -y
git --version
```

---

## 3. Git 初始配置

**安装完 Git 后必须做的第一步！**

### 设置用户名和邮箱

```bash
# 这会出现在每次提交记录中
git config --global user.name "wanzif"
git config --global user.email "wanzif@users.noreply.github.com"
```

### 查看当前配置

```bash
git config --list
```

### 设置默认分支名为 main

```bash
git config --global init.defaultBranch main
```

### 保存密码（避免每次推送都要输入）

```bash
# 方法一：缓存密码（内存中保存15分钟）
git config --global credential.helper cache

# 方法二：永久保存到磁盘（Windows 推荐用这个）
git config --global credential.helper store

# 方法三：Windows 专用（Git for Windows 自带）
git config --global credential.helper manager
```

---

## 4. 克隆 GitHub 项目到本地

### 第 1 步：找到仓库地址

打开 https://github.com/wanzif/MyBlog ，点击绿色的 **"Code"** 按钮，复制 HTTPS 地址：

```
https://github.com/wanzif/MyBlog.git
```

### 第 2 步：克隆到本地

```bash
# 先进入你想存放项目的目录
cd C:\Users\Wan\Desktop    # Windows
# 或
cd ~/projects              # Linux

# 克隆项目
git clone https://github.com/wanzif/MyBlog.git
```

**正常输出：**
```
Cloning into 'MyBlog'...
remote: Enumerating objects: 120, done.
remote: Counting objects: 100% (120/120), done.
remote: Compressing objects: 100% (80/80), done.
Receiving objects: 100% (120/120), 5.20 MiB | 2.50 MiB/s, done.
Resolving deltas: 100% (45/45), done.
```

### 第 3 步：进入项目目录

```bash
cd MyBlog
```

### 第 4 步：查看项目状态

```bash
# 查看当前状态
git status

# 查看提交历史
git log --oneline

# 查看远程仓库地址
git remote -v
```

### ⚠️ 克隆报错：无法连接 GitHub

```
fatal: unable to access 'https://github.com/': Failed to connect to github.com
```

**原因：** 国内网络直连 GitHub 不稳定。

**解决方法：**

```bash
# 方法一：配置代理（如果你有代理工具，比如 Clash）
git config --global http.proxy socks5://127.0.0.1:7890
git config --global https.proxy socks5://127.0.0.1:7890

# 然后重新克隆
git clone https://github.com/wanzif/MyBlog.git

# 方法二：使用 GitHub 镜像（临时）
git clone https://ghproxy.com/https://github.com/wanzif/MyBlog.git

# 方法三：用 SSH 方式克隆（需要先配置 SSH Key，见下文）
git clone git@github.com:wanzif/MyBlog.git
```

### 配置 SSH Key（推荐，一劳永逸）

```bash
# 1. 生成 SSH Key
ssh-keygen -t ed25519 -C "wanzif@users.noreply.github.com"
# 一路回车（默认路径、空密码）

# 2. 查看公钥
cat ~/.ssh/id_ed25519.pub
# 复制输出的全部内容

# 3. 添加到 GitHub
# 打开 https://github.com/settings/keys
# 点击 "New SSH key"
# Title 随便填（如 "My PC"）
# Key 粘贴刚才复制的内容
# 点击 "Add SSH key"

# 4. 测试连接
ssh -T git@github.com
# 看到 "Hi wanzif! ..." 就成功了

# 5. 修改远程地址为 SSH
cd MyBlog
git remote set-url origin git@github.com:wanzif/MyBlog.git
```

---

## 5. 推送前本地测试（Hugo 预览）

每次修改博客内容后，**先本地预览确认无误，再推送到 GitHub**，避免线上出问题。

### 5.1 Windows 安装 Hugo

#### 方法一：winget 安装（推荐）

```powershell
winget install Hugo.Hugo.Extended --source winget
```

**⚠️ 必须安装 Extended 版本！** PaperMod 等主题需要 SCSS/SASS 支持，普通版会报错。

安装完成后重启终端，验证：

```powershell
hugo version
```

**正常输出：**
```
hugo v0.139.4-windows-amd64+extended windows/amd64 BuildDate=...
```

确认输出中包含 **`+extended`**，如果只有 `windows/amd64` 没有 extended，说明装错了版本。

#### ⚠️ 报错：0x80072f7d（TLS 协议问题）

```
winget install Hugo.Hugo.Extended
失败: 0x80072f7d ...
```

**解决方法：**

1. 控制面板 → 网络和 Internet → Internet 选项 → 高级
2. 找到"安全"区域，勾选：
   - ✅ 使用 TLS 1.0
   - ✅ 使用 TLS 1.1
   - ✅ 使用 TLS 1.2
   - ✅ 使用 TLS 1.3
3. 应用 → 确定 → 重试

#### 方法二：手动下载

1. 访问 https://github.com/gohugoio/hugo/releases
2. 下载 `hugo_extended_0.xxx_windows-amd64.zip`
3. 解压到一个目录（如 `C:\Hugo\bin`）
4. 将该目录添加到系统 PATH：
   - 右键"此电脑" → 属性 → 高级系统设置 → 环境变量
   - 编辑 Path → 新建 → 添加 `C:\Hugo\bin`
5. 重启终端，验证 `hugo version`

### 5.2 Linux 安装 Hugo

#### Ubuntu / Debian

```bash
# 方法一：apt（版本可能较老）
sudo apt install hugo -y

# 方法二：snap（版本较新，推荐）
sudo snap install hugo --channel=extended

# 方法三：手动下载最新版
# 访问 https://github.com/gohugoio/hugo/releases 下载 linux-amd64 版本
wget https://github.com/gohugoio/hugo/releases/download/v0.139.4/hugo_extended_0.139.4_linux-amd64.tar.gz
tar -xzf hugo_extended_0.139.4_linux-amd64.tar.gz
sudo mv hugo /usr/local/bin/
hugo version
```

#### CentOS 7

```bash
# 手动下载安装
cd /usr/local/src
sudo wget https://github.com/gohugoio/hugo/releases/download/v0.139.4/hugo_extended_0.139.4_linux-amd64.tar.gz
sudo tar -xzf hugo_extended_0.139.4_linux-amd64.tar.gz
sudo mv hugo /usr/local/bin/
hugo version
```

### 5.3 本地预览

进入博客项目目录，启动本地服务器：

```bash
cd MyBlog

# 启动本地预览（默认 http://localhost:1313）
hugo server

# 如果 1313 端口被占用，指定其他端口
hugo server -p 8080

# 构建草稿内容（默认草稿文章不会显示）
hugo server -D
```

**正常输出：**
```
                   | EN
-------------------+-----
  Pages            | 12
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  0
  Processed images |  0
  Aliases          |  4
  Sitemaps         |  1
  Cleaned          |  0

Watching for changes in /home/user/MyBlog/{archetypes,content,data,layouts,static,themes}
Watching for config changes in /home/user/MyBlog/hugo.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

然后在浏览器打开 **http://localhost:1313** 即可预览。

### 5.4 完整的本地测试流程

```bash
# 1. 进入项目目录
cd MyBlog

# 2. 新建文章
hugo new posts/新文章标题.md

# 3. 用编辑器写内容（VS Code 等）
# 编辑 content/posts/新文章标题.md

# 4. 启动本地预览
hugo server -D

# 5. 浏览器打开 http://localhost:1313 预览

# 6. 确认无误后，Ctrl+C 停止服务器

# 7. 构建静态文件（可选，Cloudflare Pages 会自动构建）
hugo
# 生成的文件在 public/ 目录下

# 8. 提交推送
git add .
git commit -m "新增：xxx文章"
git push
```

### 5.5 注意事项

| 项目 | 说明 |
|-----|------|
| Hugo Extended | PaperMod 主题**必须**用 Extended 版本，否则 SCSS 编译报错 |
| 草稿文章 | `hugo server` 默认不显示草稿（front matter 中 `draft: true`），加 `-D` 才能看到 |
| 端口冲突 | 默认 1313 端口被占用时用 `-p 端口号` 指定其他端口 |
| 实时刷新 | `hugo server` 支持热更新，修改文件后浏览器自动刷新 |
| 不需要手动 hugo 构建 | Cloudflare Pages 会自动执行 `hugo` 构建，你只需要推送源文件 |

---

## 6. 日常操作：修改、提交、推送

### 6.1 修改文件

用任何编辑器（VS Code、记事本等）修改项目中的文件即可。

例如新建一篇博客文章：
```bash
# Hugo 博客新建文章
hugo new posts/软考网络规划设计师备考笔记.md
# 然后用编辑器编辑 content/posts/软考网络规划设计师备考笔记.md
```

### 6.2 查看变更

```bash
# 查看哪些文件被修改了
git status

# 输出示例：
# Changes not staged for commit:
#   modified:   content/posts/软考网络规划设计师备考笔记.md
# Untracked files:
#   content/posts/new-article.md
```

```bash
# 查看具体修改了什么内容
git diff

# 只看某个文件的修改
git diff content/posts/软考网络规划设计师备考笔记.md
```

### 6.3 暂存（添加到暂存区）

```bash
# 添加单个文件
git add content/posts/软考网络规划设计师备考笔记.md

# 添加多个文件
git add content/posts/软考笔记.md content/posts/Linux笔记.md

# 添加所有修改
git add .

# 添加所有修改（包括删除的文件）
git add -A
```

### 6.4 提交

```bash
# 提交暂存区的内容
git commit -m "新增：软考网络规划设计师备考笔记"

# 提交信息规范建议：
# feat: 新功能
# fix: 修复bug
# docs: 文档修改
# style: 格式修改（不影响代码运行）
# refactor: 重构
# chore: 构建/工具变动
```

### 6.5 推送到 GitHub

```bash
# 推送到远程仓库的 main 分支
git push origin main

# 如果是第一次推送，设置上游分支
git push -u origin main

# 之后只需
git push
```

### 6.6 完整流程一图流

```
修改文件 → git add . → git commit -m "说明" → git push
```

### 6.7 拉取远程更新

当你在另一台电脑上修改了项目，或者别人修改了项目，需要同步：

```bash
# 拉取并合并远程更新
git pull origin main

# 如果设置了上游分支，直接
git pull
```

---

## 7. 分支操作

分支是 Git 最核心的能力。写新文章、改主题、试验功能时，开一个分支，不影响主线，做完了再合并。

### 7.1 查看分支

```bash
# 查看本地分支（* 标记当前分支）
git branch

# 查看所有分支（包括远程）
git branch -a

# 输出示例：
# * main
#   feature/ruankao-notes
#   remotes/origin/main
#   remotes/origin/feature/ruankao-notes
```

### 7.2 创建与切换分支

```bash
# 创建新分支
git branch feature/ruankao-notes

# 切换到新分支
git checkout feature/ruankao-notes

# 或用新语法（Git 2.23+）
git switch feature/ruankao-notes

# 创建并切换（最常用，一步到位）
git checkout -b feature/ruankao-notes
# 或
git switch -c feature/ruankao-notes
```

### 7.3 分支的日常使用流程

```bash
# 1. 从 main 创建新分支
git checkout main
git pull origin main
git checkout -b feature/ruankao-notes

# 2. 在新分支上工作
hugo new posts/网络规划设计师笔记.md
# 编辑文章...
git add .
git commit -m "新增：网络规划设计师笔记"

# 3. 推送新分支到远程
git push -u origin feature/ruankao-notes

# 4. 合并回 main
git checkout main
git pull origin main              # 先拉最新
git merge feature/ruankao-notes

# 5. 推送合并后的 main
git push origin main

# 6. 删除已合并的分支
git branch -d feature/ruankao-notes           # 删除本地
git push origin --delete feature/ruankao-notes # 删除远程
```

### 7.4 合并方式：merge vs rebase

```bash
# merge：保留完整历史，会产生一个合并提交
git merge feature/ruankao-notes

# rebase：把分支提交"接到"主线上，历史更干净
git rebase feature/ruankao-notes
```

| 方式 | 历史 | 冲突处理 | 适用场景 |
|-----|------|---------|---------|
| merge | 保留分支历史，有合并提交 | 一次解决 | 团队协作、公共分支 |
| rebase | 线性历史，无合并提交 | 可能多次解决 | 个人分支、整理提交 |

**⚠️ 黄金规则：** 已经 push 到远程的分支，**不要 rebase**，会改写历史导致其他人冲突。

### 7.5 查看分支差异

```bash
# 查看两个分支的差异
git diff main..feature/ruankao-notes

# 只看文件名
git diff main..feature/ruankao-notes --name-only

# 查看分支上比 main 多了哪些提交
git log main..feature/ruankao-notes --oneline
```

---

## 8. 冲突解决

两个人（或两台电脑）改了同一个文件的同一个地方，Git 不知道该用谁的，就会产生冲突。

### 8.1 冲突什么时候出现

```bash
git pull origin main
# 或
git merge feature/ruankao-notes
```

输出：
```
Auto-merging content/posts/软考网络规划设计师备考笔记.md
CONFLICT (content): Merge conflict in content/posts/软考网络规划设计师备考笔记.md
Automatic merge failed; fix conflicts and then commit the result.
```

### 8.2 冲突长什么样

打开冲突文件，会看到这样的标记：

```markdown
<<<<<<< HEAD
这是我本地的内容
=======
这是远程/另一个分支的内容
>>>>>>> feature/ruankao-notes
```

- `<<<<<<< HEAD` 到 `=======`：你当前分支的内容
- `=======` 到 `>>>>>>> feature/ruankao-notes`：对方的内容

### 8.3 解决冲突的步骤

```bash
# 1. 打开冲突文件，找到 <<<<<<< 标记

# 2. 手动选择保留哪部分，删除冲突标记
#    保留本地？保留对方的？还是两者都要？
#    修改后应该是干净的文本，不再有 <<<<<<< ======= >>>>>>>

# 3. 保存文件

# 4. 标记冲突已解决
git add content/posts/软考网络规划设计师备考笔记.md

# 5. 完成合并
git commit -m "解决冲突：合并软考笔记"

# 6. 推送
git push origin main
```

### 8.4 想放弃合并怎么办

```bash
# 放弃正在进行的 merge
git merge --abort

# 放弃正在进行的 rebase
git rebase --abort

# 回到合并前的干净状态
```

### 8.5 预防冲突的小技巧

| 技巧 | 说明 |
|-----|------|
| 频繁拉取 | 每次开始工作前先 `git pull`，减少冲突概率 |
| 小步提交 | 改一点提交一点，不要攒一大堆再提交 |
| 分区编辑 | 和别人协作时，各自编辑不同文件，避免同一文件冲突 |
| 用分支 | 新功能开分支做，做完再合并，比直接在 main 上改更安全 |

---

## 9. .gitignore 文件

有些文件不需要 Git 跟踪（编译产物、临时文件、系统文件等），用 `.gitignore` 排除它们。

### 9.1 Hugo 博客常用的 .gitignore

在项目根目录创建 `.gitignore` 文件：

```gitignore
# Hugo 编译产物
/public/
/resources/_gen/

# 系统文件
.DS_Store
Thumbs.db

# 编辑器文件
.vscode/
.idea/
*.swp
*.swo
*~

# 环境文件
.env
.env.local
```

### 9.2 .gitignore 规则语法

```gitignore
# 注释以 # 开头

# 忽略某个文件
drafts/未发布的草稿.md

# 忽略某个目录及所有内容
public/
resources/_gen/

# 忽略某类文件（通配符）
*.log
*.tmp

# 用 ! 取消忽略
!important.log    # 忽略所有 .log，但不忽略 important.log

# 只忽略当前目录的文件（不影响子目录）
/drafts.md        # 只忽略根目录的 drafts.md，不忽略子目录里的

# 忽略某个目录下除某个文件外的所有内容
scratch/
!scratch/.gitkeep
```

### 9.3 已经被跟踪的文件怎么办

如果文件已经被 Git 跟踪了，加入 `.gitignore` 不会自动生效，需要手动取消跟踪：

```bash
# 取消跟踪单个文件（文件本身不会删除）
git rm --cached drafts/未发布的草稿.md

# 取消跟踪整个目录
git rm -r --cached public/

# 提交这个变更
git add .gitignore
git commit -m "更新 .gitignore，取消跟踪编译产物"
git push
```

### 9.4 查看哪些文件被忽略了

```bash
# 查看某个文件为什么被忽略
git check-ignore -v public/index.html

# 输出示例：
# .gitignore:2:/public/    public/index.html
# 说明：.gitignore 第 2 行的 /public/ 规则匹配了这个文件
```

---

## 10. Git Stash（暂存工作区）

写到一半，突然需要切换分支处理别的事，但当前修改还没完成不想提交。用 stash 临时存起来。

### 10.1 基本用法

```bash
# 保存当前工作区的修改
git stash

# 带备注保存（推荐，方便区分）
git stash push -m "写到一半的网络笔记"

# 查看所有 stash
git stash list

# 输出示例：
# stash@{0}: On main: 写到一半的网络笔记
# stash@{1}: On main: 临时保存
```

### 10.2 恢复 stash

```bash
# 恢复最近的 stash（不删除）
git stash apply

# 恢复指定的 stash
git stash apply stash@{1}

# 恢复并删除 stash（常用）
git stash pop

# 恢复指定的并删除
git stash pop stash@{1}
```

### 10.3 删除 stash

```bash
# 删除最近的 stash
git stash drop

# 删除指定的 stash
git stash drop stash@{1}

# 删除所有 stash
git stash clear
```

### 10.4 典型场景

```bash
# 场景：正在写文章，突然需要修一个线上 bug

# 1. 保存当前工作
git stash push -m "网络笔记写了一半"

# 2. 切换到 main 修 bug
git checkout main
# 修复 bug...
git add .
git commit -m "修复：首页链接错误"
git push

# 3. 回来继续写
git checkout feature/ruankao-notes
git stash pop
# 继续编辑...
```

---

## 11. 子模块（Submodule）管理

你的博客用了 PaperMod 主题的 submodule，这一节专门讲怎么管理它。

### 11.1 什么是子模块

子模块就是在一个 Git 仓库里引用另一个 Git 仓库。你的 `themes/PaperMod` 就是 PaperMod 主题的子模块——它指向 PaperMod 的 GitHub 仓库，而不是直接复制代码。

### 11.2 克隆包含子模块的项目

```bash
# 方法一：克隆时自动拉取子模块
git clone --recurse-submodules https://github.com/wanzif/MyBlog.git

# 方法二：已经克隆了，但子模块是空的
cd MyBlog
git submodule init
git submodule update

# 方法三：一步到位（init + update）
git submodule update --init --recursive
```

**如果子模块没拉下来，`hugo server` 会报错找不到主题。**

### 11.3 添加子模块

```bash
# 添加 PaperMod 主题（你之前做过的操作，以后换主题同理）
git submodule add https://github.com/adityatelange/hugo-PaperMod themes/PaperMod

# 这会做两件事：
# 1. 把 PaperMod 克隆到 themes/PaperMod 目录
# 2. 在 .gitmodules 文件中记录子模块信息

# 提交子模块配置
git add .gitmodules themes/PaperMod
git commit -m "添加 PaperMod 主题子模块"
git push
```

### 11.4 更新子模块（主题有新版本时）

```bash
# 方法一：进入子模块目录，手动拉取
cd themes/PaperMod
git pull origin master
cd ../..
git add themes/PaperMod
git commit -m "更新：PaperMod 主题到最新版"
git push

# 方法二：一条命令更新所有子模块
git submodule update --remote

# 然后提交
git add .
git commit -m "更新：子模块到最新版本"
git push
```

### 11.5 查看子模块状态

```bash
# 查看子模块当前指向的提交
git submodule status

# 输出示例：
# abc1234 themes/PaperMod (v8.1.0-5-gabc1234)

# 查看子模块详细信息
git submodule
```

### 11.6 子模块常见问题

| 问题 | 原因 | 解决 |
|-----|------|------|
| `hugo server` 报错找不到主题 | 子模块没拉下来 | `git submodule update --init --recursive` |
| 子模块目录是空的 | 克隆时没用 `--recurse-submodules` | `git submodule update --init --recursive` |
| 子模块显示 `-(dirty)` | 子模块内有未提交的修改 | 进入子模块 `git checkout .` 或提交修改 |
| 更新主题后线上没变化 | 只更新了子模块，没提交主仓库 | 主仓库也要 add + commit + push |

### 11.7 删除子模块

```bash
# 1. 反初始化子模块
git submodule deinit -f themes/PaperMod

# 2. 删除子模块目录
rm -rf .git/modules/themes/PaperMod
git rm -f themes/PaperMod

# 3. 提交
git commit -m "移除 PaperMod 主题子模块"
git push
```

---

## 12. Git 别名与效率提升

### 12.1 设置常用别名

```bash
# 查看美化的日志
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# 常用别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

设置后就可以用短命令了：

```bash
git st          # 等同于 git status
git co main     # 等同于 git checkout main
git lg          # 美化的日志
git unstage file.md  # 等同于 git reset HEAD -- file.md
git last        # 查看最近一次提交
```

### 12.2 自动补全

- **Windows（Git Bash）：** 自带 Tab 补全，输入 `git che` 按 Tab 自动补全为 `git checkout`
- **Linux：** 大多数发行版的 Git 包自带补全；没有的话安装 `bash-completion`

### 12.3 常用组合命令

```bash
# 暂存 + 提交（一步完成已跟踪文件的修改）
git commit -am "修改说明"

# 拉取并变基（保持历史干净）
git pull --rebase origin main

# 查看某次提交的详细内容
git show <commit-hash>

# 查看某个文件的修改历史
git log -p -- content/posts/软考网络规划设计师备考笔记.md

# 搜索提交历史中的关键词
git log --grep="软考"

# 查看谁改了某行代码
git blame content/posts/软考网络规划设计师备考笔记.md
```

---

## 13. 撤回操作大全

### 13.1 撤销工作区修改（还没 add）

```bash
# 场景：修改了文件，但后悔了，想恢复到上次提交的状态

# 撤销单个文件
git checkout -- content/posts/软考网络规划设计师备考笔记.md

# 或用新语法（Git 2.23+）
git restore content/posts/软考网络规划设计师备考笔记.md

# 撤销所有修改
git checkout -- .
# 或
git restore .
```

**⚠️ 注意：** 这会**丢弃所有未暂存的修改**，无法恢复！

### 13.2 撤销暂存（add 了，还没 commit）

```bash
# 场景：git add 了，但想撤回

# 撤销单个文件的暂存
git reset HEAD content/posts/软考网络规划设计师备考笔记.md

# 或用新语法
git restore --staged content/posts/软考网络规划设计师备考笔记.md

# 撤销所有暂存
git reset HEAD .
# 或
git restore --staged .
```

**说明：** 文件修改还在，只是从暂存区移回了工作区。

### 13.3 撤销最近一次提交（commit 了，还没 push）

```bash
# 场景：刚提交了，发现有错误，想撤回提交

# 方法一：保留修改，只撤销提交（推荐）
git reset --soft HEAD~1

# 方法二：撤销提交和暂存，保留修改
git reset --mixed HEAD~1

# 方法三：撤销提交，丢弃所有修改（⚠️ 危险！）
git reset --hard HEAD~1
```

| 命令 | 提交 | 暂存区 | 工作区 | 安全性 |
|-----|------|--------|--------|--------|
| `--soft` | 撤销 | 保留 | 保留 | ✅ 安全 |
| `--mixed` | 撤销 | 撤销 | 保留 | ✅ 安全 |
| `--hard` | 撤销 | 撤销 | 撤销 | ❌ 危险 |

**撤销最近 2 次提交：**
```bash
git reset --soft HEAD~2
```

### 13.4 修改最近一次提交信息

```bash
# 场景：提交信息写错了，想修改

# 修改提交信息
git commit --amend -m "新的提交信息"

# 如果还想追加文件修改
git add 忘记的文件.md
git commit --amend --no-edit
```

**⚠️ 注意：** 如果已经 push 了，不要用 `--amend`，会产生冲突！

### 13.5 撤销已推送的提交（已经 push 了）

```bash
# 方法一：revert（推荐，安全）
# 生成一个新的提交来撤销指定提交，不会改写历史

git revert <commit-hash>
# 例如：
git revert abc1234

# 撤销最近一次提交
git revert HEAD

# 撤销最近一次提交，但不自动提交（可以多个 revert 一起提交）
git revert --no-commit HEAD

# 方法二：reset + force push（⚠️ 危险，会改写历史）
git reset --hard HEAD~1
git push origin main --force
```

| 方法 | 改写历史 | 安全性 | 适用场景 |
|-----|---------|--------|---------|
| `revert` | 不改写 | ✅ 安全 | 已推送的公共分支 |
| `reset --hard + force push` | 改写 | ❌ 危险 | 只有自己用的分支 |

**查看 commit hash：**
```bash
git log --oneline
# 输出：
# abc1234 新增：备考笔记
# def5678 修改：首页配置
# ...
```

### 13.6 误删文件恢复

```bash
# 误删了文件，想恢复
git checkout -- 被删的文件.md

# 或
git restore 被删的文件.md

# 如果已经 commit 了删文件的操作
git revert <删除文件的那次commit-hash>
```

### 13.7 查看丢失的提交（终极恢复）

```bash
# 场景：用了 git reset --hard，后悔了，想找回

# 查看所有操作记录
git reflog

# 输出示例：
# abc1234 HEAD@{0}: reset: moving to HEAD~1
# def5678 HEAD@{1}: commit: 新增备考笔记
# ...

# 恢复到某次操作之前
git reset --hard def5678
```

---

## 14. 常见报错与解决方案

### 14.1 'git' 不是内部或外部命令

```
C:\Users\Wan>git --version
'git' 不是内部或外部命令
```

**原因：** Git 安装后没重启终端，或 PATH 没配好。

**解决：**
1. 关闭终端，重新打开
2. 如果还不行，检查 `C:\Program Files\Git\cmd` 是否在 PATH 中
3. 不在的话：右键"此电脑" → 属性 → 高级系统设置 → 环境变量 → 编辑 Path → 新增 `C:\Program Files\Git\cmd`

### 14.2 winget 安装报错 0x8a15005e（msstore 证书错误）

```
搜索源时失败: msstore
执行此命令时发生意外错误： 0x8a15005e : The server certificate did not match any of the expected values.
在工作源中找到以下包。
若要继续操作，请使用--source选项指定其中一个。
名称    ID       源
---------------------------------
Git     Git.Git  winget
```

**原因：** winget 默认同时搜索 `msstore`（微软商店）和 `winget`（GitHub 仓库）两个源，msstore 源证书验证失败，但包在 `winget` 源里已经找到了。

**解决：** 加 `--source winget` 指定只用 winget 源：

```powershell
winget install Git.Git --source winget
```

**一劳永逸：** 如果 msstore 源经常报错，可以禁用它：

```powershell
# 查看当前源列表
winget source list

# 禁用 msstore 源
winget source disable msstore

# 以后需要时再启用
winget source enable msstore
```

### 14.3 'winget' 不是内部或外部命令

```
C:\Users\Wan>winget install Git.Git
'winget' 不是内部或外部命令
```

**解决：** 见第 1 章"⚠️ 报错：'winget' 不是内部或外部命令"的详细排查步骤

### 14.4 winget 安装报错 0x80072f7d

```
失败: 0x80072f7d
```

**解决：** 控制面板 → Internet 选项 → 高级 → 勾选 TLS 1.0/1.1/1.2/1.3 → 确定 → 重试

### 14.5 克隆超时/连接失败

```
fatal: unable to access 'https://github.com/': Failed to connect to github.com port 443
```

**解决：**
```bash
# 配置代理
git config --global http.proxy socks5://127.0.0.1:7890
git config --global https.proxy socks5://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 14.6 推送时要求输入密码

```
Username for 'https://github.com':
Password for 'https://wanzif@github.com':
```

**原因：** GitHub 已不支持密码认证，需要用 Token 或 SSH。

**解决：**
```bash
# 方法一：使用 Personal Access Token
# 1. 打开 https://github.com/settings/tokens
# 2. 点击 "Generate new token (classic)"
# 3. 勾选 repo 权限，生成 Token
# 4. 推送时密码处填 Token

# 方法二：切换到 SSH（推荐）
git remote set-url origin git@github.com:wanzif/MyBlog.git
```

### 14.7 推送被拒绝

```
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/wanzif/MyBlog.git'
```

**原因：** 远程有新提交，你本地没有。

**解决：**
```bash
# 先拉取远程更新，再推送
git pull origin main
git push origin main

# 如果拉取时有冲突，手动解决后：
git add .
git commit -m "解决冲突"
git push origin main
```

### 14.8 LF/CRLF 换行符警告

```
warning: LF will be replaced by CRLF in xxx.md
```

**原因：** Windows 和 Linux 换行符不同，Git 自动转换。

**解决：** 这个警告**可以忽略**，不影响功能。如果想关闭警告：

```bash
# Windows 上
git config --global core.autocrlf true

# Linux 上
git config --global core.autocrlf input
```

### 14.9 中文文件名乱码

```bash
git config --global core.quotepath false
```

---

## 15. Git Tag（标签/版本标记）

Tag 是给某个提交打上永久标记，常用来标记版本发布，比如博客主题更新、网站改版。

### 15.1 创建标签

```bash
# 轻量标签（只是个指针，不附带信息）
git tag v1.0

# 附注标签（推荐，包含创建者、日期、说明）
git tag -a v1.0 -m "博客第一版：基础框架搭建完成"

# 给历史提交打标签
git tag -a v0.1 abc1234 -m "初始提交"
```

### 15.2 查看标签

```bash
# 查看所有标签
git tag

# 查看标签信息
git show v1.0

# 按模式筛选
git tag -l "v1.*"
```

### 15.3 推送标签到远程

```bash
# 推送单个标签
git push origin v1.0

# 推送所有本地标签
git push origin --tags

# 推送代码时同时推送标签
git push origin main --follow-tags
```

### 15.4 删除标签

```bash
# 删除本地标签
git tag -d v1.0

# 删除远程标签
git push origin --delete v1.0
```

### 15.5 基于标签创建分支

```bash
# 从 v1.0 标签创建修复分支
git checkout -b hotfix/v1.0.1 v1.0
```

### 15.6 你的博客标签实践

```bash
# 场景：PaperMod 主题升级后，打一个版本标签

# 1. 更新主题
cd themes/PaperMod
git pull origin master
cd ../..

# 2. 本地测试
hugo server -D

# 3. 确认无误，提交并打标签
git add .
git commit -m "更新：PaperMod 主题到最新版"
git tag -a v1.1 -m "升级 PaperMod 主题"

# 4. 推送代码和标签
git push origin main --follow-tags
```

### 15.7 语义化版本号

| 格式 | 含义 | 举例 | 场景 |
|-----|------|------|------|
| `MAJOR.MINOR.PATCH` | 主版本.次版本.补丁 | `v2.1.3` | 正式版本 |
| MAJOR | 不兼容的重大变更 | v1→v2 | 博客大改版 |
| MINOR | 向下兼容的功能新增 | v1.1→v1.2 | 新增文章分类 |
| PATCH | 向下兼容的问题修复 | v1.2.1→v1.2.2 | 修复链接错误 |

---

## 16. 多设备协作（家里 + 学校同步开发）

你可能在家里台式机和学校电脑上都开发博客，需要保持两边代码同步。

### 16.1 核心原则：每次开始工作前 pull，结束工作时 push

```bash
# 开始工作前（无论在哪台电脑）
cd MyBlog
git pull origin main

# 工作结束后
git add .
git commit -m "新增/修改：xxx"
git push origin main
```

### 16.2 在新设备上初始化

```bash
# 1. 安装 Git 和 Hugo（见第1、5章）

# 2. 配置 Git（见第3章）
git config --global user.name "wanzif"
git config --global user.email "wanzif@users.noreply.github.com"

# 3. 克隆项目（含子模块）
git clone --recurse-submodules https://github.com/wanzif/MyBlog.git

# 4. 进入项目，验证
cd MyBlog
hugo server -D
# 浏览器打开 http://localhost:1313 确认正常
```

### 16.3 两台电脑都改了同一篇文章

```bash
# 家里电脑：改了软考笔记，推送了
git add .
git commit -m "更新：软考笔记第三章"
git push origin main

# 学校电脑：也改了软考笔记，但没先 pull
git add .
git commit -m "更新：软考笔记第四章"
git push origin main  # ❌ 被拒绝！

# 解决：先 pull，解决冲突，再 push
git pull origin main
# 如果有冲突，按第8章解决
git add .
git commit -m "解决冲突：合并软考笔记"
git push origin main
```

### 16.4 避免多设备同步踩坑

| 习惯 | 说明 |
|-----|------|
| 勤 push | 做完就推，不要攒着，减少另一台电脑拉取时的冲突 |
| 勤 pull | 开始工作前必拉，养成肌肉记忆 |
| 用 SSH | 两台电脑各配一个 SSH Key，免输密码，见第4章 |
| 不改主题配置 | 在两台电脑上同时改 `hugo.toml` 容易冲突，约定只在一台改 |
| Typora 图片设置 | 确保两台电脑的 PicList 配置一致，图片路径不会冲突 |

### 16.5 用 SSH 在多设备管理 Key

每台设备生成独立的 SSH Key，都添加到 GitHub：

```bash
# 家里电脑
ssh-keygen -t ed25519 -C "wanzif@users.noreply.github.com" -f ~/.ssh/id_ed25519_home

# 学校电脑
ssh-keygen -t ed25519 -C "wanzif@users.noreply.github.com" -f ~/.ssh/id_ed25519_school

# 两台电脑各自的公钥，都添加到 GitHub → Settings → SSH Keys
cat ~/.ssh/id_ed25519_home.pub
cat ~/.ssh/id_ed25519_school.pub

# 配置 SSH config（可选，多 Key 时区分）
cat ~/.ssh/config
# Host github.com
#   IdentityFile ~/.ssh/id_ed25519_home
#   User git

# 测试
ssh -T git@github.com
```

---

## 17. GitHub Pull Request

Pull Request（PR）是 GitHub 上的协作方式。虽然你的博客主要是自己写，但了解 PR 有这些用处：

- 别人给你的博客提交修改（修错别字、提建议）
- 你 fork 别人的项目（如 PaperMod 主题）并贡献代码
- 自己用分支开发，用 PR 做代码审查

### 17.1 创建 Pull Request

```bash
# 1. 创建分支并推送
git checkout -b feature/add-search
# 开发...
git add .
git commit -m "新增：站内搜索功能"
git push -u origin feature/add-search

# 2. 打开 GitHub 仓库页面
# https://github.com/wanzif/MyBlog
# 会自动提示 "feature/add-search had recent pushes"
# 点击 "Compare & pull request"

# 3. 填写 PR 信息
# 标题：新增站内搜索功能
# 描述：实现了基于 Fuse.js 的站内搜索...
# 点击 "Create pull request"
```

### 17.2 审查和合并 PR

```bash
# 在 GitHub 页面上：
# 1. 查看文件改动（Files changed）
# 2. 逐行评论（可选）
# 3. 确认无误后点击 "Merge pull request"
# 4. 选择合并方式：
#    - Create a merge commit：保留分支历史
#    - Squash and merge：压缩成一个提交
#    - Rebase and merge：变基合并，线性历史

# 合并后删除分支
git branch -d feature/add-search
git push origin --delete feature/add-search
```

### 17.3 给别人的项目提 PR（以 PaperMod 主题为例）

```bash
# 1. Fork 仓库
# 打开 https://github.com/adityatelange/hugo-PaperMod
# 点击右上角 "Fork" → 创建到你自己的账号

# 2. 克隆你 fork 的仓库
git clone --recurse-submodules https://github.com/wanzif/hugo-PaperMod.git
cd hugo-PaperMod

# 3. 创建分支
git checkout -b fix/typo-in-readme

# 4. 修改并提交
# 编辑文件...
git add .
git commit -m "修复：README 中的拼写错误"
git push -u origin fix/typo-in-readme

# 5. 打开你 fork 的 GitHub 页面，点击 "Create pull request"
# 目标仓库选 adityatelange/hugo-PaperMod 的 master 分支

# 6. 等待原作者审核合并
```

### 17.4 同步 Fork 仓库（上游有更新时）

```bash
# 1. 添加上游仓库
git remote add upstream https://github.com/adityatelange/hugo-PaperMod.git

# 2. 拉取上游更新
git fetch upstream

# 3. 合并到本地
git checkout master
git merge upstream/master

# 4. 推送到你自己的 fork
git push origin master
```

---

## 18. Git Clean（清理工作区）

工作区里有一些没被跟踪的垃圾文件（编译产物、临时文件等），想一次性清理掉。

### 18.1 查看会被删除的文件

```bash
# 查看哪些未跟踪文件会被删除（不会真删，只是预览）
git clean -n

# 查看包括目录在内的未跟踪内容
git clean -n -d
```

### 18.2 删除未跟踪的文件

```bash
# 只删除未跟踪的文件（不删目录）
git clean -f

# 删除未跟踪的文件和目录
git clean -f -d

# 同时删除被 .gitignore 忽略的文件（⚠️ 慎用！会删 public/ 等）
git clean -f -d -x
```

### 18.3 你的博客场景

```bash
# 场景：Hugo 编译残留，想清理后重新构建

# 1. 预览会删什么
git clean -n -d

# 2. 安全清理：只删未跟踪文件和空目录
git clean -f -d

# ⚠️ 如果要清理 public/（Hugo 构建产物）
# 先确认 .gitignore 里有 /public/
git clean -f -d -x
# 这会删除所有未跟踪文件 + .gitignore 忽略的文件
# public/ 目录会被清空，但 hugo 一构建就回来了
```

### 18.4 交互式清理（更安全）

```bash
# 逐个确认是否删除
git clean -i -d

# 输出示例：
# Would remove the following item:
#   scratch/temp.md
# *** Commands ***
#   1: clean       2: filter by pattern   3: select by numbers
#   4: ask each    5: quit
# What now>
```

---

## 19. Git Bisect（二分法定位问题）

博客突然出了个 bug，不知道是哪次提交引入的。用 bisect 自动二分查找。

### 19.1 基本流程

```bash
# 1. 启动 bisect
git bisect start

# 2. 标记当前版本有问题
git bisect bad

# 3. 标记某个历史版本没问题
git bisect good v1.0
# 或用 commit hash
git bisect good abc1234

# Git 会自动 checkout 到中间的提交
# 你测试这个版本，然后告诉 Git 结果：

# 如果这个版本有问题
git bisect bad

# 如果这个版本没问题
git bisect good

# Git 会继续二分，重复以上步骤...
# 最终会输出：
# abc1234 is the first bad commit

# 4. 找到问题提交后，结束 bisect
git bisect reset
```

### 19.2 你的博客场景

```bash
# 场景：博客首页突然显示异常，不知道哪次提交导致的

git bisect start
git bisect bad                    # 当前版本有问题
git bisect good v1.0              # v1.0 标签时没问题

# Git 切到中间某次提交
hugo server -D                    # 本地测试
# 浏览器看首页...

# 正常
git bisect good

# Git 继续切到另一段中间
hugo server -D                    # 再测试
# 异常
git bisect bad

# 重复几轮后 Git 定位到具体提交
# 输出：def5678 is the first bad commit

# 查看这次提交改了什么
git show def5678

# 退出 bisect
git bisect reset
```

### 19.3 自动化 bisect

如果可以用脚本判断当前版本是否有问题，可以让 bisect 全自动运行：

```bash
# 举例：检查 hugo 能否成功构建（构建失败 = bad）
git bisect start HEAD v1.0 --
git bisect run sh -c "hugo 2>&1 | grep -q 'Error' && exit 1 || exit 0"

# 或写一个测试脚本
cat > test_build.sh << 'EOF'
#!/bin/bash
cd /path/to/MyBlog
hugo > /dev/null 2>&1
if [ $? -eq 0 ]; then
    exit 0  # 构建成功 = good
else
    exit 1  # 构建失败 = bad
fi
EOF
chmod +x test_build.sh

git bisect start HEAD v1.0
git bisect run ./test_build.sh
```

---

## 20. 速查表

### 日常流程

```bash
# 拉取最新代码
git pull

# 修改文件后...
git add .                    # 暂存所有修改
git commit -m "说明信息"      # 提交
git push                     # 推送
```

### 撤回速查

| 场景 | 命令 |
|-----|------|
| 修改了文件，还没 add | `git restore 文件名` |
| add 了，还没 commit | `git restore --staged 文件名` |
| commit 了，还没 push | `git reset --soft HEAD~1` |
| 已经 push 了 | `git revert 提交hash` |
| 误操作想找回 | `git reflog` |

### 查看信息

| 命令 | 作用 |
|-----|------|
| `git status` | 当前状态 |
| `git log --oneline` | 提交历史 |
| `git diff` | 未暂存的修改 |
| `git diff --staged` | 已暂存的修改 |
| `git remote -v` | 远程仓库地址 |
| `git branch -a` | 所有分支 |
| `git reflog` | 操作历史（恢复用） |
| `git tag` | 查看所有标签 |
| `git submodule status` | 子模块状态 |

### 分支与标签

| 操作 | 命令 |
|-----|------|
| 新建并切换分支 | `git checkout -b 分支名` |
| 合并分支 | `git merge 分支名` |
| 删除本地分支 | `git branch -d 分支名` |
| 创建附注标签 | `git tag -a v1.0 -m "说明"` |
| 推送标签 | `git push origin --tags` |
| 删除标签 | `git tag -d v1.0` |

### Stash 与 Clean

| 操作 | 命令 |
|-----|------|
| 保存工作区 | `git stash push -m "说明"` |
| 恢复并删除 | `git stash pop` |
| 清理未跟踪文件（预览） | `git clean -n -d` |
| 清理未跟踪文件（执行） | `git clean -f -d` |

### 子模块

| 操作 | 命令 |
|-----|------|
| 初始化并拉取 | `git submodule update --init --recursive` |
| 更新到最新 | `git submodule update --remote` |
| 查看状态 | `git submodule status` |

---

> 最后更新：2026-05-27
> 项目地址：https://github.com/wanzif/MyBlog
