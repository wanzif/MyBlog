@echo off
:: ========================================
:: 博客一键发布脚本
:: 功能：自动 git add → commit → push
:: 作者：wanzf
:: 日期：2026-05-18
:: ========================================

:: 设置编码为 UTF-8（防止中文乱码）
chcp 65001 >nul

:: 显示标题
echo.
echo =======================================
echo       博客自动发布脚本
echo =======================================
echo.

:: 获取脚本所在目录（兼容路径含空格的情况）
set BLOG_DIR=%~dp0

:: 切换到博客目录
cd /d "%BLOG_DIR%"

:: 检查是否在 Git 仓库中
if not exist ".git" (
    echo [错误] 当前目录不是 Git 仓库！
    echo 请确保脚本放在博客根目录！
    pause
    exit /b 1
)

echo [1/3] 添加文件到 Git...
git add .

echo.
echo [2/3] 提交更新...
:: 获取当前日期和时间
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do (
    set DATE=%%a%%b%%c
)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set TIME=%%a%%b
)
git commit -m "更新博客 %DATE% %TIME%"

:: 检查是否有内容提交
if %errorlevel% neq 0 (
    echo.
    echo [提示] 没有内容需要提交（可能只是打开脚本玩了一下 😄）
    pause
    exit /b 0
)

echo.
echo [3/3] 推送到 GitHub（等待完成）...
git push origin main

:: 检查推送是否成功
if %errorlevel% equ 0 (
    echo.
    echo =======================================
    echo       发布成功！🎉
    echo =======================================
    echo.
    echo 约 1-2 分钟后自动部署到 wanzf.com
    echo.
) else (
    echo.
    echo =======================================
    echo       推送失败！
    echo =======================================
    echo.
    echo 请检查：
    echo   1. 网络连接是否正常
    echo   2. GitHub 账号权限是否有效
    echo   3. .git/config 中的 remote 地址是否正确
    echo.
)

git status
pause