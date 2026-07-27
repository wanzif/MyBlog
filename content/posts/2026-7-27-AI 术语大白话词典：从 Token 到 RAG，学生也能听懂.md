---
title: "AI 术语大白话词典：从 Token 到 RAG，学生也能听懂"
date: 2026-07-27T15:58:23+08:00
tags: ["AI", "ChatGPT", "工具"]
categories: ["AI"]
ShowToc: true
TocOpen: false
draft: false
---


我教的班上，大一新生第一次用 AI 工具时，屏幕上弹出的词十个有八个不认识。LLM（Large Language Model）、Prompt、RAG（Retrieval-Augmented Generation）、Fine-tuning——不是说这些词有多难，而是没人用他们听得懂的方式解释过。

前几天整理了一份教学用的术语对照表，顺手改成了一篇能直接发给学生看的文章。不要求先修课程，不需要会写代码。

整个解释框架就一个比喻：**把 AI 当成你新招的员工。**

---

## 第一阶段：认识你的新员工

**LLM / Large Language Model（大语言模型）** — AI 的脑子。

你用的豆包、Kimi、ChatGPT，不管叫什么名字，底层的"大脑"都叫 LLM。它读过巨量的文字，所以什么都能聊两句。类比：一个读过全世界所有书的学霸。

**AIGC / AI Generated Content（生成式 AI）** — AI 这个工种的岗位名称。

能自动写文章、画图、剪视频的工具，都属于 AIGC。类比：AI 的岗位说明书，专门搞创作的那类工种。

**AGI / Artificial General Intelligence（通用人工智能）** — 终极形态，目前还在科幻阶段。

现在的 AI 只能干特定的事（写字、画画、写代码），AGI 指的是未来某天 AI 变得跟人类一样全能，什么活都能接。类比：钢铁侠的贾维斯。

---

## 第二阶段：怎么给 AI 派活

**Prompt（提示词）** — 你下的工作指令。

你对 AI 说的每句话都是 Prompt。"写个文案"和"写一篇 800 字的头条风格文案，带悬念开头，目标读者是大学生"，结果天差地别。类比：点外卖时的备注栏——写得越清楚，做出来的越对味。

**System Prompt（系统提示词）** — 给 AI 设的人设。

在聊天开始之前，先告诉它"你是一个有十年经验的高职计算机老师"。接下来的对话，它都会用老师的方式回答。类比：给员工发工牌——你是什么岗位，就按什么规矩办事。

**Context（上下文）** — AI 的工作记忆。

决定了 AI 能一次性记住多长的对话、读完多长的文件。窗口越大，它能同时处理的复杂信息就越多。类比：办公桌大小——桌子越大，一次摊开的资料越多。

**Token** — AI 的计费单位。

AI 不认汉字，它把你打的字切成一小块一小块的 Token 来计算。一个汉字大约对应半个 Token。很多工具按 Token 数收费。类比：出租车打表——跑一公里跳一次价，说一个字花一个 Token。

**Temperature（温度系数）** — 控制 AI 是严谨还是发散。

一个从 0 到 1 的数值。设成 0.1，AI 说话很保守，适合写代码、做翻译；设成 0.8，AI 脑洞大开，适合写小说、想创意。类比：水龙头——左拧出冷水（严谨），右拧出热水（天马行空）。

---

## 第三阶段：AI 的毛病怎么治

**Hallucination（幻觉）** — AI 最大的毛病。

碰到自己不懂的问题，AI 不会说"我不知道"，而是非常自信地编一个看起来合理的假答案给你。这是学生在用 AI 时最容易踩的坑——看着像模像样的内容，实际上全是编的。

类比：考试不会做但把卷子写满的学渣——写得很认真，但没有一句是真的。

**Knowledge Cutoff（知识截止日期）** — AI 的知识保质期。

AI 的知识停在它训练结束那天。如果它的数据截止到 2023 年，你问它 2024 年的事，它就会触发幻觉开始瞎编。类比：一本 2020 年出版的百科全书，查不到 2024 年的新闻。

**RAG / Retrieval-Augmented Generation（检索增强生成）** — 给 AI 发一份内部资料让它查。

防止幻觉的主要手段。你把真实的文件（课件、论文、规章制度）传到知识库里，AI 每次被提问时先去这些文件里搜一圈，根据搜到的真实内容来回答。类比：开卷考试——不靠死记硬背，允许翻书找答案。

**Fine-tuning（微调）** — 拿你行业的专业数据给 AI 做定向培训。

RAG 是让 AI"临时翻资料"，Fine-tuning 是让它"学会"你的领域知识。需要大量行业数据，成本也高。类比：新员工入职培训——通用能力有了，但要学你们公司的业务流程。

**LoRA / Low-Rank Adaptation** — 一种低成本的微调方案。

不用动大模型本身，像给 AI 装一个外挂插件，花很少的钱就能让它学会新风格或新知识。类比：手机装 App——不用换手机，装个应用就有新功能。

---

## 第四阶段：让 AI 自己干活

**Skills（技能）** — AI 的工具箱。

里面是现成的功能模块：联网搜索、读写 Excel、生成图片。类比：瑞士军刀——每个刀片是一个 Skill，用哪个翻哪个。

**Agent（智能体）** — 能自己规划、自己执行的 AI。

普通的 AI 你推一下动一下。Agent 你给它一个大目标——比如"帮我查一下明天北京到上海的机票，挑最便宜的三班列个表"——它能自己拆步骤、自己调用工具、自己完成。类比：从算盘升级成会计——算盘你得拨，会计你说需求他自己搞定。

**API / Application Programming Interface** — 给 AI 接外部世界的接口。

通过 API，你可以把 AI 接进微信、钉钉、或者你自己写的软件里，不用每次打开聊天窗口。类比：USB 接口——插上就传数据，拔了就断开。

**MCP / Model Context Protocol（模型上下文协议）** — 一种更标准化的连接方式。

比传统 API 更省事，不用写复杂的代码，AI 就能直接调用你本地的工具和文件。类比：蓝牙配对——比焊接电线省事多了。

**Multi-Agent（多智能体）** — 好几个 AI 组队干活。

一个 AI 搞不定的复杂项目，拆成多个 Agent 分工：一个写代码、一个写文档、一个做测试，全自动流水线。类比：项目组——产品经理、开发、测试各干各的，配合出结果。

---

## 速查表

| # | 术语 | 全称 | 一句话 |
|---|------|------|--------|
| 1 | LLM | Large Language Model | AI 的核心大脑 |
| 2 | AIGC | AI Generated Content | 搞创作的 AI 工种 |
| 3 | Prompt | — | 你下的工作指令 |
| 4 | System Prompt | — | 给 AI 设的人设 |
| 5 | Context | — | AI 一口气能记住多长 |
| 6 | Token | — | AI 的计费单位 |
| 7 | Temperature | — | 控制严谨/发散的开关 |
| 8 | Hallucination | — | AI 一本正经地瞎编 |
| 9 | Knowledge Cutoff | — | AI 知识的保质期 |
| 10 | RAG | Retrieval-Augmented Generation | 给 AI 发资料让它查 |
| 11 | Fine-tuning | — | 拿行业数据给 AI 做培训 |
| 12 | LoRA | Low-Rank Adaptation | 低成本的外挂式微调 |
| 13 | Skills | — | AI 的现成工具箱 |
| 14 | Agent | — | 能自己规划执行的 AI |
| 15 | API | Application Programming Interface | AI 连外部的数据线 |
| 16 | MCP | Model Context Protocol | 更标准化的连接协议 |
| 17 | Multi-Agent | — | 多个 AI 组队干活 |
| 18 | AGI | Artificial General Intelligence | 科幻阶段的全能 AI |

---

## 一句话串一遍

把 AI 当一个新员工：LLM（Large Language Model）是它的脑子，Prompt 是你下的命令。它如果瞎编（幻觉），就用 RAG（Retrieval-Augmented Generation）给它发资料让它查。想让它全自动干活，升级成 Agent，再用 API（Application Programming Interface）/ MCP（Model Context Protocol）给它接上各种工具。
