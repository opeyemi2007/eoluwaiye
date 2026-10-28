import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/inter'
import './styles/variables.css'
import './styles/globals.css'
import App from './App'
import { initAnalytics } from './lib/analytics'
initAnalytics()
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>)
