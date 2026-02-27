export type TimerPhase = 'focus' | 'short_break' | 'long_break'

export type TimerSettings = {
  focusDurationSec: number
  shortBreakDurationSec: number
  longBreakDurationSec: number
  roundsBeforeLongBreak: number
  autoStartNext: boolean
}

export type TimerState = {
  phase: TimerPhase
  status: 'idle' | 'running' | 'paused'
  remainingSec: number
  round: number
}

export const defaultTimerSettings: TimerSettings = {
  focusDurationSec: 25 * 60,
  shortBreakDurationSec: 5 * 60,
  longBreakDurationSec: 15 * 60,
  roundsBeforeLongBreak: 4,
  autoStartNext: false,
}

const phaseDuration = (phase: TimerPhase, settings: TimerSettings): number => {
  if (phase === 'focus') return settings.focusDurationSec
  if (phase === 'short_break') return settings.shortBreakDurationSec
  return settings.longBreakDurationSec
}

export class TimerEngine {
  private state: TimerState
  private startedAtMs: number | null = null

  private settings: TimerSettings

  constructor(settings: TimerSettings = defaultTimerSettings) {
    this.settings = settings
    this.state = {
      phase: 'focus',
      status: 'idle',
      remainingSec: settings.focusDurationSec,
      round: 1,
    }
  }

  getState(): TimerState {
    return { ...this.state }
  }

  start(nowMs = Date.now()): TimerState {
    if (this.state.status === 'running') return this.getState()
    this.state.status = 'running'
    this.startedAtMs = nowMs
    return this.getState()
  }

  pause(nowMs = Date.now()): TimerState {
    if (this.state.status !== 'running' || this.startedAtMs === null) return this.getState()
    this.state.remainingSec = Math.max(this.state.remainingSec - Math.floor((nowMs - this.startedAtMs) / 1000), 0)
    this.state.status = 'paused'
    this.startedAtMs = null
    return this.getState()
  }

  resume(nowMs = Date.now()): TimerState {
    if (this.state.status !== 'paused') return this.getState()
    this.state.status = 'running'
    this.startedAtMs = nowMs
    return this.getState()
  }

  reset(): TimerState {
    this.state.phase = 'focus'
    this.state.status = 'idle'
    this.state.remainingSec = this.settings.focusDurationSec
    this.state.round = 1
    this.startedAtMs = null
    return this.getState()
  }

  skip(): TimerState {
    this.advancePhase()
    this.state.status = this.settings.autoStartNext ? 'running' : 'idle'
    this.startedAtMs = this.state.status === 'running' ? Date.now() : null
    return this.getState()
  }

  tick(nowMs = Date.now()): TimerState {
    if (this.state.status !== 'running' || this.startedAtMs === null) return this.getState()
    const elapsedMs = nowMs - this.startedAtMs
    let elapsedSec = Math.floor(elapsedMs / 1000)
    if (elapsedSec <= 0) return this.getState()
    const consumedMs = elapsedSec * 1000
    const nextAnchorMs = nowMs - (elapsedMs - consumedMs)

    while (elapsedSec > 0) {
      if (elapsedSec < this.state.remainingSec) {
        this.state.remainingSec -= elapsedSec
        elapsedSec = 0
        continue
      }

      elapsedSec -= this.state.remainingSec
      this.advancePhase()

      if (!this.settings.autoStartNext) {
        this.state.status = 'idle'
        this.startedAtMs = null
        return this.getState()
      }
    }

    this.state.status = 'running'
    this.startedAtMs = nextAnchorMs
    return this.getState()
  }

  private advancePhase(): void {
    if (this.state.phase === 'focus') {
      const shouldLongBreak = this.state.round % this.settings.roundsBeforeLongBreak === 0
      this.state.phase = shouldLongBreak ? 'long_break' : 'short_break'
    } else {
      if (this.state.phase === 'long_break') this.state.round += 1
      if (this.state.phase === 'short_break') this.state.round += 1
      this.state.phase = 'focus'
    }
    this.state.remainingSec = phaseDuration(this.state.phase, this.settings)
  }
}
