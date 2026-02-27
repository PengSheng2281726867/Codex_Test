import { useEffect } from 'react'
import { PomodoroPanel } from './components/PomodoroPanel'
import { usePomodoroStore } from './store/usePomodoroStore'
import { themes } from './config/themes'
import { messages } from './i18n/messages'
import './App.css'

function App() {
  const { loadSettings } = usePomodoroStore()
  const theme = themes[1]
  const t = messages.zh

  useEffect(() => {
    void loadSettings()
  }, [loadSettings])

  useEffect(() => {
    Object.entries(theme.tokens).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [theme])

  return (
    <main className="app">
      <PomodoroPanel />
      <section className="stats">
        <h2>{t.todayStats}</h2>
        <p>{t.focusMinutes}: 0</p>
        <p>{t.sessions}: 0</p>
      </section>
    </main>
  )
}

export default App
