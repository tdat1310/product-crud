import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'https://tdat1310.github.io/product-crud/src/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
