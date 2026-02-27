# my_clock.md

## 1. 项目目标
打造一款**可专注、可放松、可个性化**的番茄钟应用。核心不是“只会倒计时”，而是帮助用户形成稳定专注习惯，并通过音乐/白噪音/视觉主题降低进入专注状态的门槛。

---

## 2. 核心功能（基于你当前想法整理）

### 2.1 计时功能
- 支持用户自定义时长（如 25/5、50/10、自定义分钟）。
- 支持完整番茄流程：
  - 专注时段（Focus）
  - 短休息（Short Break）
  - 长休息（Long Break）
- 倒计时结束提醒：
  - 系统通知弹窗
  - 提示音 / 音乐
  - 可选震动（移动端）
- 支持暂停、继续、跳过、重置。
- 支持“自动进入下一阶段”开关（例如专注结束自动进入休息）。

### 2.2 音乐与白噪音
- 音乐来源：
  - 用户导入本地音乐
  - 应用内置基础曲库
- 白噪音：
  - 类型：海浪、雨声、风声、咖啡馆、篝火等
  - 每种白噪音可独立开关与音量控制
  - 支持白噪音与背景音乐混音（双通道）
- 结束提醒可单独配置：
  - 仅提示音
  - 仅弹窗
  - 提示音 + 弹窗

### 2.3 UI 主题与高度自定义
- 默认提供 3~5 套主题：
  1. 极简浅色（白/灰）
  2. 夜间深色（深蓝/黑）
  3. 森系自然（绿）
  4. 日落暖色（橙/紫）
  5. 赛博霓虹（高对比）
- 自定义能力：
  - 背景图（本地上传/内置图库）
  - 主色、辅助色、按钮圆角、卡片透明度
  - 字体大小与计时器样式（数字/环形进度）
- 主题保存为“方案预设”，支持一键切换。

---

## 3. 你还没明确但建议补充的关键功能

### 3.1 数据统计与习惯追踪（强烈建议）
- 每日专注次数、专注总时长、完成率。
- 周/月趋势图（折线图、热力图）。
- 标签维度统计（如“英语/编程/阅读”）。
- 连续打卡天数（streak）激励。

### 3.2 任务管理联动
- 进入专注前选择当前任务。
- 一个任务可绑定多个番茄钟。
- 支持任务优先级、预计番茄数与完成进度。

### 3.3 防打断机制
- 专注时可选“严格模式”：
  - 避免误触退出
  - 全屏沉浸
  - 屏蔽非必要应用通知（平台允许时）
- 记录中断原因（主动中断/被动中断），帮助复盘。

### 3.4 多端与同步
- 本地离线可用。
- 登录后云同步配置与历史记录（可后置到 V2）。
- 设备间状态同步（Web + 桌面 + 移动端）。

### 3.5 无障碍与国际化
- 字体缩放、色弱友好配色、高对比模式。
- 键盘快捷键与屏幕阅读器支持。
- 中英双语（i18n）预留。

---

## 4. 技术路线建议

## 4.1 路线 A（推荐起步）：Web 优先 + 可扩展为桌面
适合先快速验证产品。

- 前端：React + TypeScript + Vite
- 状态管理：Zustand（轻量）
- UI：Tailwind CSS + Headless UI
- 音频：Web Audio API
- 本地存储：IndexedDB（用户音乐、配置、统计）
- 通知：Web Notification API
- 打包桌面端（后续）：Tauri / Electron

优点：开发速度快，功能验证快，跨平台路径清晰。

## 4.2 路线 B：Flutter 一次开发多端
- Flutter + Dart
- 音频播放：just_audio
- 本地存储：Hive / Isar
- 通知：flutter_local_notifications

优点：UI 一致性好，移动端体验强。
缺点：Web 端复杂交互与某些浏览器能力会有额外适配成本。

## 4.3 路线 C：原生移动端优先
- iOS: SwiftUI
- Android: Kotlin + Compose

优点：系统能力调用强、性能好。
缺点：开发成本高，早期迭代速度慢。

---

## 5. 建议的版本规划（避免一上来过重）

### V1（2~4 周，MVP）
- 番茄钟流程（专注/短休息/长休息）
- 提醒通知 + 提示音
- 内置白噪音（3~5 种）
- 3 套默认主题 + 简单背景切换
- 基础统计（今日专注时长/次数）

### V1.5
- 本地音乐导入
- 主题编辑器（颜色/背景/透明度）
- 任务绑定番茄钟

### V2
- 云同步
- 社交/房间共学（可选）
- 成就系统与更完整数据分析

---

## 6. 数据模型草案（用于后续代码实现）

```text
UserSettings
- focusDuration: number
- shortBreakDuration: number
- longBreakDuration: number
- roundsBeforeLongBreak: number
- autoStartNext: boolean
- alarmSoundId: string
- alarmVolume: number
- selectedThemeId: string
- language: 'zh' | 'en'

SessionRecord
- id: string
- taskId?: string
- type: 'focus' | 'short_break' | 'long_break'
- plannedDurationSec: number
- actualDurationSec: number
- startAt: ISODate
- endAt: ISODate
- interrupted: boolean
- interruptReason?: string

ThemePreset
- id: string
- name: string
- backgroundType: 'color' | 'image' | 'video'
- backgroundValue: string
- primaryColor: string
- accentColor: string
- cardOpacity: number
- fontScale: number

AudioProfile
- id: string
- bgmSource: 'builtin' | 'imported'
- bgmTrackId?: string
- bgmVolume: number
- whiteNoiseTracks: Array<{ type: string; volume: number; enabled: boolean }>
```

---

## 7. 交互设计建议（针对你的 UI 困惑）

### 7.1 页面结构
- 顶部：模式切换（专注/短休息/长休息）+ 设置入口
- 中间：大号计时器（数字 + 环形进度）
- 底部：开始/暂停/跳过
- 侧边抽屉：音乐与白噪音控制面板

### 7.2 主题系统设计法（可执行）
先定义“主题 Token”，再做主题编辑器：
- `--bg-primary`
- `--text-primary`
- `--accent`
- `--card-opacity`
- `--radius`

只允许用户修改这些 Token，既能高自由度又不会破坏整体可读性。

### 7.3 默认主题设计思路
- 每个主题固定：背景、主色、按钮样式、提示音风格。
- 每个主题配套一个推荐白噪音（如森系主题默认雨声）。
- 默认主题需保证文字对比度 >= WCAG AA。

---

## 8. 后续代码生成规范（Agent 执行规则）

1. 优先保证计时准确性（后台切换、页面隐藏后恢复要正确）。
2. 所有可配置项必须持久化存储。
3. 音频播放必须提供独立音量控制与异常降级（无法播放时静默提醒 + 文本提示）。
4. 新增功能必须补充最小可用测试：
   - 计时状态机单元测试
   - 设置读写测试
5. UI 改动遵循主题 Token，不允许硬编码颜色（除极少数语义色）。
6. 所有新文案默认提供中英双语 key。
7. 提交代码前运行 lint + test，确保主流程可执行。

---

## 9. 需求确认结果（已定版）

根据你的最新决策，V1 范围确定如下：

1. 平台优先级：先开发 **Web 版**（桌面打包后置）。
2. 版本范围：V1 先做 **纯番茄钟**，暂不做任务管理。
3. 音乐导入：仅支持 **本地文件导入**，不支持在线链接。
4. 视觉方向：默认采用 **氛围沉浸** 风格（弱化工具感，强化场景感）。
5. 账号策略：先 **完全离线**，不引入邮箱登录与云同步。

---

## 10. 面向实现的早期技术路线（Web / 离线优先）

### 10.1 目标边界（V1）
- 完整番茄流程：Focus / Short Break / Long Break。
- 倒计时提醒：系统通知 + 提示音。
- 音频：内置白噪音 + 本地音乐导入（本地播放，不上传）。
- 主题：提供沉浸式默认主题与一键切换。
- 统计：今日专注总时长、完成次数。

### 10.2 技术选型（保持不变）
- React + TypeScript + Vite
- Zustand（状态管理）
- Tailwind CSS + Headless UI
- Web Audio API（混音与音量控制）
- IndexedDB（设置、会话记录、音频元数据）
- Web Notification API（结束提醒）

### 10.3 模块拆分（便于并行开发）
1. `timer-engine`：番茄钟状态机、阶段切换、后台恢复校准。
2. `audio-engine`：白噪音/BGM 双通道、独立音量、播放失败降级。
3. `theme-system`：主题 Token、沉浸式默认主题、主题持久化。
4. `persistence`：IndexedDB 仓储层（settings/sessions/audioProfiles）。
5. `dashboard`：今日统计卡片（专注次数、专注时长）。

### 10.4 开发节奏建议（2~4 周）
- 第 1 周：计时状态机 + 设置持久化 + 单元测试基线。
- 第 2 周：音频引擎 + 通知提醒 + 异常降级处理。
- 第 3 周：沉浸式主题 + 主界面联调 + 基础统计。
- 第 4 周：稳定性修复、可用性优化、lint/test 收敛。

### 10.5 验收标准（进入编码前锁定）
- 页面隐藏/切后台后恢复，计时误差可控。
- 所有设置项可持久化并在刷新后恢复。
- 音频播放异常时不阻塞主流程（可静默 + 文本提醒）。
- 新增功能至少覆盖：计时状态机测试、设置读写测试。
- UI 遵循主题 Token，不硬编码主色。

---

如果你确认这份 `my_clock.md`，下一步我将按该路线直接进入项目结构初始化与核心模块实现。
