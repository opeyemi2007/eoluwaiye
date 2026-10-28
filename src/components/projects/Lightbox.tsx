import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Project } from '../../types/content'
import styles from './Projects.module.css'
interface Props{items:Project[];index:number;onClose:()=>void;onIndex:(i:number)=>void}
export function Lightbox({items,index,onClose,onIndex}:Props){
  const ref=useRef<HTMLDivElement>(null),p=items[index],n=items.length
  useEffect(()=>{
    const prev=document.activeElement as HTMLElement|null
    ref.current?.querySelector<HTMLElement>('button')?.focus();document.body.style.overflow='hidden'
    return()=>{document.body.style.overflow='';prev?.focus?.()}
  },[])
  useEffect(()=>{
    const k=(e:KeyboardEvent)=>{
      if(e.key==='Escape')onClose()
      else if(e.key==='ArrowRight'&&n>1)onIndex((index+1)%n)
      else if(e.key==='ArrowLeft'&&n>1)onIndex((index-1+n)%n)
      else if(e.key==='Tab'&&ref.current){
        const f=ref.current.querySelectorAll<HTMLElement>('button,a[href],video[controls]');if(!f.length)return
        const first=f[0],last=f[f.length-1]
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}
    window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k)
  },[index,n,onClose,onIndex])
  return(
    <motion.div ref={ref} className={styles.lb} role="dialog" aria-modal="true" aria-label={p.title}
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}}>
      <button className={styles.lbClose} onClick={onClose} aria-label="Close viewer"><X aria-hidden="true"/></button>
      <figure className={styles.lbFig}>
        {p.mediaType==='video'
          ?<video src={p.mediaUrl} poster={p.thumbnail} controls muted playsInline preload="metadata" className={styles.lbMedia}/>
          :<img src={p.mediaUrl} alt={p.alt} className={styles.lbMedia}/>}
        <figcaption><strong>{p.attribution}</strong>: {p.caption}{p.result&&<> · {p.result}</>}</figcaption>
      </figure>
      {n>1&&<><button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={()=>onIndex((index-1+n)%n)} aria-label="Previous item"><ChevronLeft aria-hidden="true"/></button>
        <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={()=>onIndex((index+1)%n)} aria-label="Next item"><ChevronRight aria-hidden="true"/></button></>}
    </motion.div>)
}
