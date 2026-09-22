# WANDER · AI Coding 交接说明（HANDOFF）

> 给下一位帮我写代码的 AI（Codex / Cursor）。先读完本文件再动手。
> 我是编程零基础学生，目标：把这个项目从 0 做到可演示的 MVP，作为寒假实习作品。

## 1. 这是什么项目

WANDER — AI Travel Agent：一个记住用户旅行、陪用户完成旅行、并和用户一起把真实旅行做成旅行作品的 AI 产品。

一句话：一个会记住你的旅行、陪你完成旅行，并和你一起把真实旅行经历创作成旅行作品的 AI Travel Agent。

核心循环：**Travel → Memory → Creation → Feedback → Next Travel**

完整 PRD V1.1 在产品根目录配套 Word 文档里，关键原则：
- AI 只提建议，用户做最终决定；未经用户同意绝不自动改行程。
- 永远提供「多个体验方案」，不给唯一最佳答案。
- 记忆是参考，不是限制；当前意图永远优先。
- 旅行作品是 AI 草稿 + 用户反复修改，不是一键生成。

## 2. 当前进度（已完成）

技术栈：Next.js (App Router) + TypeScript + Tailwind CSS。
项目路径：`D:\wander`。远程仓库：**github.com/lyp0614-hi/wander**（Public）。

已完成页面：
- `/` 首页（FR-01）：文学旅行杂志风。导航 WANDER / MY JOURNEYS / TRAVEL MEMORY；眉题 WHERE NEXT?；大标题「下一站，去哪里？」；按钮「＋开始一次旅行 ＋Start a Journey」；下方旅行大图叠字 "Five days of getting lost."；页脚 "Your personal travel world. 你的个人旅行世界。"
- `/create` 创建旅行（FR-02）：一问一答四步——目的地 → 天数 → 预算（7 档：1000 以内/1000–2000/2000–3000/3000–5000/5000–8000/8000 以上/还没想好）→ 旅行感觉（慢一点/多探索/城市故事/自然放空），最后生成一张 TRIP BRIEF 卡片。支持自由输入 + 点选芯片。

设计规范（必须严格保持）：
- 背景 `#faf7f2`，正文 `#2c2416`，弱化文字 `#6b5c4a`。
- 衬线字体：Cormorant Garamond + Noto Serif SC（已在 layout.tsx 配置）。
- 全页有 film-grain 颗粒层（globals.css 里的 .film-grain）。
- 中英双语小字标签，大间距大写英文（tracking 0.2–0.4em）。
- 禁止：SaaS 仪表盘风、卡片堆叠、花哨渐变、紫色/蓝色科技感配色。
- 参考气质：独立旅行杂志封面 / 摄影作品集 / 个人档案。

## 3. 环境与坑（重要，别重复踩）

- Windows；项目路径 `D:\wander`（纯英文，别换中文路径）。
- **网络必须走代理**：直连 github.com / vercel.com 会超时。代理地址 `http://127.0.0.1:7890`。
  - git 推送：`git -c http.proxy=http://127.0.0.1:7890 push origin main`
  - Vercel CLI：先 `$env:HTTPS_PROXY="http://127.0.0.1:7890"; $env:HTTP_PROXY="http://127.0.0.1:7890"`
- 本地预览：`npm run dev`，http://localhost:3000。
- Git 提交：用 Conventional 风格短消息，如 `FR-02: xxx`。每次小功能做完就 commit + push。

## 4. 下一步要做的事（按顺序，一次只做一件）

1. **接通 Brief → 方案页**：`/create` 完成后的 TRIP BRIEF 卡片上，「开始规划」按钮跳到 `/plans`；把四题答案用 `localStorage` 存起来，在 `/plans` 顶部显示。
2. **`/plans` 多方案页（FR-05）**：三张方案卡片——01 慢慢走 Slow / 02 深入逛 Deep / 03 夜色 Night。每张卡片显示：节奏、预算、主要安排、优点、可能的问题。底部按钮「生成我的版本 Generate My Version」。先用假数据，杂志风排版，可点选/组合。
3. **打通全链路**：首页 → 创建 → Brief → 方案，所有按钮都能跳，形成可演示闭环。
4. **Vercel 部署**：Vercel CLI 已装好；登录用邮箱 lyp0614@qq.com 魔法链接（用户已收邮件）。登录后在 D:\wander 下 `vercel --yes --prod` 部署。
5. 之后再排：Supabase 数据库/登录、Trip Space、旅行提醒、照片整理。这些都还没做，不要提前做。

## 5. 对 AI 协作者的要求

- 一次只实现上面清单里的一件事，做完让我看效果，再做下一件。
- 所有新页面必须继承现有设计规范（颜色/字体/双语标签/杂志感），不要引入新配色体系。
- 用户零基础：不要让我装环境、不要让我敲命令排错；需要跑的命令你自己跑，只告诉我结果。
- 改完代码自己确认 `npm run build` 或 tsc 不报错，再让我刷新看。
