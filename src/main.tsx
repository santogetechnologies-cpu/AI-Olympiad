import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { prewarmCurriculumCache } from './services/curriculumJsonLoader'

// Pre-fetch all curriculum JSON files in background while app loads
prewarmCurriculumCache()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
