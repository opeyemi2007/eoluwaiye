import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { publicTestimonials, showTestimonials } from '../../lib/visibility'
import styles from '../sections/Sections.module.css'
/** Hidden entirely until 2+ real, approved testimonials exist. */
export function Testimonials(){
  const [i,setI]=useState(0)
  if(!showTestimonials(testimonials))return null
  const list=publicTestimonials(testimonials),t=list[i%list.length]
  const go=(d:number)=>setI(x=>(x+d+list.length)%list.length)
  return(
    <section id="testimonials" className={`${styles.testi} on-red`} aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.figure key={t.id} className={styles.quote} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}}
            drag="x" dragConstraints={{left:0,right:0}} onDragEnd={(_,p)=>{if(Math.abs(p.offset.x)>60)go(p.offset.x<0?1:-1)}} aria-live="polite">
            <blockquote>{t.quote}</blockquote>
            <figcaption>{t.name}, {t.role}, {t.link?<a href={t.link}>{t.brand}</a>:t.brand}</figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className={styles.carNav}>
          <button onClick={()=>go(-1)} aria-label="Previous testimonial"><ChevronLeft aria-hidden="true"/></button>
          <span>{(i%list.length)+1} / {list.length}</span>
          <button onClick={()=>go(1)} aria-label="Next testimonial"><ChevronRight aria-hidden="true"/></button>
        </div>
      </div>
    </section>)
}
