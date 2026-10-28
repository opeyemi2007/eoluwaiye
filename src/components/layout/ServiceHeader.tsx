import { useCallback, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Logo } from '../common/Logo'
import { MenuButton } from '../navigation/MenuButton'
import { MenuOverlay } from '../navigation/MenuOverlay'
import type { Service } from '../../types/content'
import styles from '../../pages/ServicePage.module.css'
export function ServiceHeader({next}:{next:Service}){
  const [menu,setMenu]=useState(false),btn=useRef<HTMLButtonElement>(null),nav=useNavigate()
  const close=useCallback(()=>{setMenu(false);requestAnimationFrame(()=>btn.current?.focus())},[])
  return(
    <header className={`container ${styles.header}`}>
      <Link to="/" aria-label="eoluwaiye home"><Logo/></Link>
      <nav className={styles.hnav} aria-label="Service navigation">
        <Link to="/#services"><ArrowLeft size={18} aria-hidden="true"/> Back to services</Link>
        <Link to={`/${next.slug}`}>Next: {next.name} <ArrowRight size={18} aria-hidden="true"/></Link>
      </nav>
      <MenuButton ref={btn} expanded={menu} onClick={()=>setMenu(true)}/>
      <AnimatePresence>{menu&&<MenuOverlay onClose={close} onSection={id=>{setMenu(false);nav(`/#${id}`)}}/>}</AnimatePresence>
    </header>)
}
