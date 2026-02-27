import 'fake-indexeddb/auto'
import { describe, expect, it } from 'vitest'
import { settingsRepo } from '../persistence/settingsRepo'

describe('settingsRepo', () => {
  it('persists and reads settings from indexeddb', async () => {
    const settings = {
      focusDurationSec: 10,
      shortBreakDurationSec: 5,
      longBreakDurationSec: 15,
      roundsBeforeLongBreak: 4,
      autoStartNext: true,
    }

    await settingsRepo.write(settings)
    const saved = await settingsRepo.read()

    expect(saved).toEqual(settings)
  })
})
