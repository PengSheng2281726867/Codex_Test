import { describe, expect, it } from 'vitest'
import { TimerEngine } from '../core/timerEngine'

describe('TimerEngine', () => {
  it('transitions from focus to short break when time runs out', () => {
    const engine = new TimerEngine({
      focusDurationSec: 2,
      shortBreakDurationSec: 1,
      longBreakDurationSec: 3,
      roundsBeforeLongBreak: 4,
      autoStartNext: false,
    })

    engine.start(0)
    const state = engine.tick(2000)

    expect(state.phase).toBe('short_break')
    expect(state.status).toBe('idle')
    expect(state.remainingSec).toBe(1)
  })

  it('returns to focus and increments round after break', () => {
    const engine = new TimerEngine({
      focusDurationSec: 1,
      shortBreakDurationSec: 1,
      longBreakDurationSec: 2,
      roundsBeforeLongBreak: 4,
      autoStartNext: true,
    })

    engine.start(0)
    engine.tick(1000)
    const state = engine.tick(2000)

    expect(state.phase).toBe('focus')
    expect(state.round).toBe(2)
  })

  it('consumes elapsed overflow across multiple phases when auto-start is enabled', () => {
    const engine = new TimerEngine({
      focusDurationSec: 2,
      shortBreakDurationSec: 1,
      longBreakDurationSec: 3,
      roundsBeforeLongBreak: 2,
      autoStartNext: true,
    })

    engine.start(0)
    const state = engine.tick(7000)

    expect(state.phase).toBe('long_break')
    expect(state.status).toBe('running')
    expect(state.round).toBe(2)
    expect(state.remainingSec).toBe(1)
  })
})
