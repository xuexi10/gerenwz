# Astro 的个人网站

一个纯静态的个人网站，只有 HTML / CSS / JavaScript，没有框架、没有构建步骤、不需要服务器。修改内容后推送到 GitHub，Cloudflare Pages 会自动部署。

## 本地预览

直接用浏览器打开 `index.html` 就能看效果；也可以在本目录启动一个本地静态服务器：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 修改成你自己的信息

打开 [index.html](index.html)，按下面这些位置替换内容即可：

| 内容 | 在哪找 |
| --- | --- |
| 姓名 | 导航栏 `brand-name`、英雄区 `.hero-name` |
| 打字机轮流显示的角色 | [script.js](script.js) 顶部的 `ROLES` 数组 |
| 简介、所在地、邮箱 | “关于我”区块 |
| 作品介绍和链接 | “作品集”区块 |
| 邮箱、GitHub、博客地址 | 页尾的“联系我”以及页脚 |

## 部署到 GitHub + Cloudflare Pages

### 1. 推到 GitHub

如果还没有 git 仓库，先初始化并提交：

```bash
git init
git add .
git commit -m "first commit"
```

然后在 GitHub 新建一个仓库（例如 `my-website`），把代码推上去：

```bash
git remote add origin https://github.com/xuexi10/my-website.git
git branch -M main
git push -u origin main
```

> 如果你是在 Codex 的现成工作区里，可能已经初始化过 git，直接 `git add . && git commit` 后推送即可。

### 2. 接入 Cloudflare Pages

1. 注册 / 登录 [Cloudflare](https://dash.cloudflare.com/)。
2. 左侧菜单选择 **Workers 和 Pages** → **Pages** → **创建** → **连接到 Git**。
3. 授权 GitHub，选择刚才上传的仓库。
4. 构建配置中：
   - **生产分支**：`main`
   - **框架预设**：无（纯静态）
   - **构建命令**：留空
   - **构建输出目录**：`/`（仓库根目录）
5. 点击 **保存并部署**，等一两分钟，Cloudflare 会给你一个 `xxx.pages.dev` 的免费域名。

### 3. 后续更新

以后每次修改本地文件，然后：

```bash
git add .
git commit -m "更新内容"
git push
```

Cloudflare Pages 会自动检测到新提交并重新部署，不需要手动操作。

## 自定义域名（可选）

如果你有自己的域名，可以在 Pages 项目的 **自定义域** 中添加它，并按提示在域名服务商处添加 CNAME / A 记录。Cloudflare 也会自动为你申请免费的 HTTPS 证书。

## 目录结构

```text
.
├── index.html   # 首页（所有内容都在这）
├── style.css    # 样式
├── script.js    # 交互逻辑
├── 404.html     # 自定义 404 页面
└── README.md    # 说明文档（本文件）
```
