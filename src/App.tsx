import { lazy, Suspense } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
const ServicePage=lazy(()=>import('./pages/ServicePage'))
const PrivacyPage=lazy(()=>import('./pages/PrivacyPage'))
const NotFoundPage=lazy(()=>import('./pages/NotFoundPage'))
function ScrollTop(){const {pathname,hash}=useLocation();useEffect(()=>{if(!hash)window.scrollTo(0,0)},[pathname,hash]);return null}
export default function App(){
  return <BrowserRouter><ScrollTop/><a className="skip-link" href="#main">Skip to content</a>
    <Suspense fallback={null}><Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/privacy" element={<PrivacyPage/>}/>
      <Route path="/:slug" element={<ServicePage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes></Suspense></BrowserRouter>
}
