import { create } from 'zustand'
import { TimerEngine, defaultTimerSettings, type TimerState, type TimerSettings } from '../core/timerEngine'
import { settingsRepo } from '../persistence/settingsRepo'

type PomodoroState = {
  settings: TimerSettings
  timer: TimerState
  engine: TimerEngine
  loadSettings: () => Promise<void>
  updateSettings: (next: Partial<TimerSettings>) => Promise<void>
  start: () => void
  pause: () => void
  resume: () => void
  skip: () => void
  reset: () => void
  tick: () => void
}

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  settings: defaultTimerSettings,
  engine: new TimerEngine(defaultTimerSettings),
  timer: new TimerEngine(defaultTimerSettings).getState(),

  loadSettings: async () => {
    const settings = await settingsRepo.read()
    const engine = new TimerEngine(settings)
    set({ settings, engine, timer: engine.getState() })
  },

  updateSettings: async (next) => {
    const merged = { ...get().settings, ...next }
    await settingsRepo.write(merged)
    const engine = new TimerEngine(merged)
    set({ settings: merged, engine, timer: engine.getState() })
  },

  start: () => set((s) => ({ timer: s.engine.start() })),
  pause: () => set((s) => ({ timer: s.engine.pause() })),
  resume: () => set((s) => ({ timer: s.engine.resume() })),
  skip: () => set((s) => ({ timer: s.engine.skip() })),
  reset: () => set((s) => ({ timer: s.engine.reset() })),
  tick: () => set((s) => ({ timer: s.engine.tick() })),
}))
