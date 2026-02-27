export const messages = {
  zh: {
    focus: '专注',
    shortBreak: '短休息',
    longBreak: '长休息',
    start: '开始',
    pause: '暂停',
    resume: '继续',
    skip: '跳过',
    reset: '重置',
    round: '轮次',
    todayStats: '今日统计',
    focusMinutes: '专注分钟',
    sessions: '完成次数',
  },
  en: {
    focus: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    skip: 'Skip',
    reset: 'Reset',
    round: 'Round',
    todayStats: 'Today Stats',
    focusMinutes: 'Focus Minutes',
    sessions: 'Sessions',
  },
} as const

export type Locale = keyof typeof messages
