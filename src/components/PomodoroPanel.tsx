import { useEffect, useMemo } from 'react'
import { usePomodoroStore } from '../store/usePomodoroStore'
import { messages } from '../i18n/messages'

const formatTime = (seconds: number): string => {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0')
  const sec = String(seconds % 60).padStart(2, '0')
  return `${min}:${sec}`
}

const phaseLabel = {
  focus: 'focus',
  short_break: 'shortBreak',
  long_break: 'longBreak',
} as const

export function PomodoroPanel() {
  const t = messages.zh
  const { timer, start, pause, resume, skip, reset, tick } = usePomodoroStore()

  useEffect(() => {
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [tick])

  const primaryAction = useMemo(() => {
    if (timer.status === 'running') return <button onClick={pause}>{t.pause}</button>
    if (timer.status === 'paused') return <button onClick={resume}>{t.resume}</button>
    return <button onClick={start}>{t.start}</button>
  }, [pause, resume, start, t.pause, t.resume, t.start, timer.status])

  return (
    <section className="panel">
      <h1>{t[phaseLabel[timer.phase]]}</h1>
      <p className="time">{formatTime(timer.remainingSec)}</p>
      <p>{t.round} #{timer.round}</p>
      <div className="actions">
        {primaryAction}
        <button onClick={skip}>{t.skip}</button>
        <button onClick={reset}>{t.reset}</button>
      </div>
    </section>
  )
}
