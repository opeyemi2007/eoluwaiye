import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { serviceLinks, sectionLinks } from '../../data/navigation'
import { Logo } from '../common/Logo'
import styles from './Menu.module.css'
export function MenuOverlay({onClose,onSection}:{onClose:()=>void;onSection:(id:string)=>void}){
  const closeRef=useRef<HTMLButtonElement>(null),boxRef=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    closeRef.current?.focus()
    const k=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){onClose();return}
      if(e.key!=='Tab'||!boxRef.current)return
      const f=boxRef.current.querySelectorAll<HTMLElement>('a[href],button');if(!f.length)return
      const a=f[0],z=f[f.length-1]
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}
      else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
    window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k)
  },[onClose])
  return(
    <motion.div ref={boxRef} className={`${styles.overlay} on-red`} role="dialog" aria-modal="true" aria-label="Site menu"
      initial={{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0% 0)'}} exit={{clipPath:'inset(0 0 100% 0)'}}
      transition={{duration:.5,ease:[.76,0,.24,1]}}>
      <div className={styles.head}><Logo/><button ref={closeRef} className={styles.close} onClick={onClose}><X aria-hidden="true"/> <span>Close</span></button></div>
      <nav className={styles.cols} aria-label="Main">
        <div><h2 className={styles.label}>Services</h2><ul>{serviceLinks.map(l=><li key={l.to}><Link to={l.to} onClick={onClose}>{l.label}</Link></li>)}</ul></div>
        <div><h2 className={styles.label}>On this page</h2><ul>{sectionLinks.map(l=><li key={l.to}><button onClick={()=>onSection(l.to)}>{l.label}</button></li>)}</ul></div>
      </nav>
    </motion.div>)
}
