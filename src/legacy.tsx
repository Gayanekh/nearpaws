// The original site. Everything in this world is replaced by the redesign and then deleted.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tailwind.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import './styles/pages.css'
import './styles/motion.css'
import './styles/slider.css'
import App from './App.tsx'

// The original fonts load only in this world (the redesign self-hosts its own).
const fonts = document.createElement('link')
fonts.rel = 'stylesheet'
fonts.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Geist:wght@500;600;700&display=swap'
document.head.appendChild(fonts)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
