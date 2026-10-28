import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSeo } from '../hooks/useSeo'
import { useAdvance } from '../hooks/useAdvance'
import { Intro } from '../components/intro/Intro'
import { Hero } from '../components/hero/Hero'
import { MenuButton } from '../components/navigation/MenuButton'
import { MenuOverlay } from '../components/navigation/MenuOverlay'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ResultsStrip } from '../components/results/ResultsStrip'
import { JumpTo } from '../components/navigation/JumpTo'
import { ServiceCards } from '../components/services/ServiceCards'
import { Testimonials } from '../components/testimonials/Testimonials'
import { HowIWork } from '../components/sections/HowIWork'
import { About } from '../components/sections/About'
import { WhatICanDo } from '../components/sections/WhatICanDo'
import { ContactSection } from '../components/contact/ContactSection'
import { Footer } from '../components/layout/Footer'
import { BrandsStrip } from '../components/common/BrandsStrip'
import { Logo } from '../components/common/Logo'
import { services } from '../data/services'
import type { ServiceSlug } from '../types/content'
type Stage='name'|'hero'|'portfolio'
const seen=()=>{try{return sessionStorage.getItem('intro-seen')==='1'}catch{return false}}
export default function HomePage(){
  useSeo('Esther | Short-form video editor and social media manager',"Explore Esther's video editing, social media management, virtual assistant, UGC and creative services for beauty, fashion, fitness and wellness brands.")
  const [stage,setStage]=useState<Stage>(seen()||location.hash?'portfolio':'name')
  const {hash}=useLocation()
  const [params]=useSearchParams()
  const sv=params.get('service') as ServiceSlug|null
  const pre=services.find(x=>x.slug===sv)?.slug
  useEffect(()=>{if(hash){const t=window.setTimeout(()=>document.getElementById(hash.slice(1))?.scrollIntoView(),150);return()=>window.clearTimeout(t)}},[hash])
  const [menu,setMenu]=useState(false)
  const btn=useRef<HTMLButtonElement>(null)
  const next=useCallback(()=>setStage(s=>s==='name'?'hero':'portfolio'),[])
  useAdvance(stage!=='portfolio'&&!menu,next)
  useEffect(()=>{
    document.body.style.overflow=stage==='portfolio'?'':'hidden'
    if(stage==='portfolio'){try{sessionStorage.setItem('intro-seen','1')}catch{/* storage unavailable */}}
    return()=>{document.body.style.overflow=''}
  },[stage])
  const closeMenu=useCallback(()=>{setMenu(false);requestAnimationFrame(()=>btn.current?.focus())},[])
  const goSection=(id:string)=>{
    const wait=stage==='portfolio'?0:900
    setMenu(false);setStage('portfolio')
    window.setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'}),wait)}
  return(<>
    <MenuButton ref={btn} expanded={menu} onClick={()=>setMenu(true)} onRed={stage==='name'}/>
    <AnimatePresence>{menu&&<MenuOverlay onClose={closeMenu} onSection={goSection}/>}</AnimatePresence>
    <div inert={stage!=='portfolio'}>
      <header className="container" style={{paddingBlock:'1.25rem'}}><Logo/></header>
      <main id="main">{stage==='portfolio'&&<h1 className="visually-hidden">Esther: short-form video editor and social media manager</h1>}<ResultsStrip/><JumpTo/><ServiceCards/><BrandsStrip/><Testimonials/><HowIWork/><About/><WhatICanDo/><ContactSection preselected={pre}/></main>
      <Footer/>
    </div>
    <AnimatePresence>{stage!=='portfolio'&&
      <Hero key="hero" active={stage==='hero'} onContinue={next} onWork={()=>goSection('services')} onContact={()=>goSection('contact')}/>}</AnimatePresence>
    <AnimatePresence>{stage==='name'&&<Intro key="intro" onContinue={next}/>}</AnimatePresence>
  </>)
}
