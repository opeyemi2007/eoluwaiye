import { Fragment, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { services } from '../../data/services'
import { publicTestimonials, showTestimonials } from '../../lib/visibility'
import styles from './Testimonials.module.css'
const AUTOPLAY_MS=8000
/** Hidden until at least one real, approved testimonial exists. Words rise in one by one; autoplay pauses on hover/focus and never runs with reduced motion. */
export function Testimonials(){
  const reduce=useReducedMotion()
  const list=publicTestimonials(testimonials),n=list.length
  const [i,setI]=useState(0),[paused,setPaused]=useState(false),[hover,setHover]=useState(false),[focus,setFocus]=useState(false)
  const go=useCallback((d:number)=>setI(x=>(x+d+n)%Math.max(n,1)),[n])
  const playing=!reduce&&!paused&&!hover&&!focus&&n>1
  useEffect(()=>{if(!playing)return;const t=window.setTimeout(()=>go(1),AUTOPLAY_MS);return()=>window.clearTimeout(t)},[playing,i,go])
  if(!showTestimonials(testimonials))return null
  const t=list[i%n],tag=services.find(s=>s.slug===t.service)?.name,words=t.quote.split(/\s+/)
  return(
    <section id="testimonials" className={`${styles.wrap} on-red`} aria-roledescription="carousel" aria-label="Client testimonials"
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocus={e=>{if(e.target.matches(':focus-visible'))setFocus(true)}} onBlur={()=>setFocus(false)}>
      <motion.span className={styles.mark} aria-hidden="true" initial={reduce?false:{scale:.6,rotate:-12,opacity:0}} whileInView={{scale:1,rotate:0,opacity:.18}} viewport={{once:true}} transition={{type:'spring',stiffness:90,damping:14}}><Quote/></motion.span>
      <div className="container">
        <h2 className={styles.kicker}>Kind words</h2>
        <AnimatePresence mode="wait">
          <motion.figure key={t.id} className={styles.slide} aria-roledescription="slide" aria-label={`${(i%n)+1} of ${n}`}
            initial={reduce?false:{opacity:0}} animate={{opacity:1}} exit={reduce?undefined:{opacity:0,x:-40}} transition={{duration:.3}}
            drag={n>1?'x':false} dragConstraints={{left:0,right:0}} dragElastic={.2} onDragEnd={(_,p)=>{if(Math.abs(p.offset.x)>60)go(p.offset.x<0?1:-1)}}>
            <blockquote className={styles.quote}>
              {words.map((w,k)=>(
                <Fragment key={k}><motion.span className={styles.word} initial={reduce?false:{y:'.6em',opacity:0}} animate={{y:0,opacity:1}}
                  transition={{type:'spring',stiffness:220,damping:22,delay:reduce?0:Math.min(k*.03,1.4)}}>{w}</motion.span>{' '}</Fragment>))}
            </blockquote>
            <motion.figcaption className={styles.person} initial={reduce?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:reduce?0:Math.min(words.length*.03,1.4)+.1}}>
              {t.image&&<img className={styles.avatar} src={t.image} alt="" width={56} height={56} loading="lazy"/>}
              <span><strong>{t.name}</strong><br/>{t.role}, {t.link?<a href={t.link} target="_blank" rel="noopener noreferrer">{t.brand}</a>:t.brand}</span>
              {tag&&<span className={styles.tag}>{tag}</span>}
            </motion.figcaption>
          </motion.figure>
        </AnimatePresence>
        {n>1&&<div className={styles.controls}>
          <button type="button" onClick={()=>go(-1)} aria-label="Previous testimonial"><ChevronLeft aria-hidden="true"/></button>
          <button type="button" onClick={()=>go(1)} aria-label="Next testimonial"><ChevronRight aria-hidden="true"/></button>
          <ul className={styles.dots}>{list.map((x,k)=><li key={x.id}><button type="button" onClick={()=>setI(k)} aria-label={`Show testimonial ${k+1} of ${n}`} aria-current={k===i%n}><span/></button></li>)}</ul>
          {!reduce&&<button type="button" onClick={()=>setPaused(p=>!p)} aria-pressed={paused} aria-label={paused?'Play automatic rotation':'Pause automatic rotation'}>{paused?<Play aria-hidden="true" size={18}/>:<Pause aria-hidden="true" size={18}/>}</button>}
        </div>}
      </div>
      {playing&&<motion.span key={`${t.id}-p`} className={styles.progress} aria-hidden="true" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:AUTOPLAY_MS/1000,ease:'linear'}}/>}
    </section>)
}
