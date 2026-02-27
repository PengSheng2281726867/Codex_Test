import { openDB } from 'idb'
import { defaultTimerSettings, type TimerSettings } from '../core/timerEngine'

const DB_NAME = 'pomodoro-v1'
const STORE = 'settings'
const KEY = 'user-settings'

type DbSchema = {
  [STORE]: {
    key: string
    value: TimerSettings
  }
}

const dbPromise = openDB<DbSchema>(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE)) {
      db.createObjectStore(STORE)
    }
  },
})

export const settingsRepo = {
  async read(): Promise<TimerSettings> {
    const db = await dbPromise
    return (await db.get(STORE, KEY)) ?? defaultTimerSettings
  },
  async write(settings: TimerSettings): Promise<void> {
    const db = await dbPromise
    await db.put(STORE, settings, KEY)
  },
}
