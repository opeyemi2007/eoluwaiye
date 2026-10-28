import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Logo } from '../common/Logo'
import { Button } from '../common/Button'
import { FloatItem } from './FloatItem'
import styles from './Hero.module.css'
interface Props{active:boolean;onContinue:()=>void;onWork:()=>void;onContact:()=>void}
export function Hero({active,onContinue,onWork,onContact}:Props){
  const reduce=useReducedMotion()
  const rise=(d:number)=>reduce?{}:{initial:{y:24,opacity:0},animate:active?{y:0,opacity:1}:{},transition:{type:'spring' as const,stiffness:140,damping:20,delay:.5+d}}
  return(
    <motion.section className={styles.hero} aria-label="Welcome" initial={false}
      exit={{y:'-100%'}} transition={{duration:reduce?0:.8,ease:[.76,0,.24,1]}}>
      <div className={styles.bar}><Logo/></div>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <motion.p className={styles.kicker} {...rise(0)}>Esther · Lagos</motion.p>
          {/* Draft copy: easy to replace, not final brand copy */}
          <motion.h2 className={styles.headline} {...rise(.08)}>Creative work that gives people a reason to <em>stop and look.</em></motion.h2>
          <motion.p className={styles.lede} {...rise(.16)}>I help beauty, fashion, fitness and wellness brands create better content, show up consistently and connect with their audience.</motion.p>
          <motion.div className={styles.ctas} {...rise(.24)}>
            <Button onClick={onWork}>Explore my work</Button>
            <Button variant="secondary" onClick={onContact}>Work with me</Button>
          </motion.div>
          <motion.div {...rise(.32)}><Button variant="ghost" onClick={onContinue}>Continue to Portfolio <ArrowRight size={18} aria-hidden="true"/></Button></motion.div>
        </div>
        <div className={styles.floats} aria-hidden="true">
          <FloatItem active={active} dx={10} dy={-16} dur={7} className={styles.phone} style={{left:'8%',top:'6%'}}>
            <div className={styles.screen}><span className={styles.play}/><span className={styles.cap}>hook in 3s</span></div>
          </FloatItem>
          <FloatItem active={active} dx={-12} dy={12} dur={8} delay={.6} className={styles.timeline} style={{left:'34%',top:'48%'}}>
            <i style={{width:'70%'}}/><i style={{width:'45%',marginLeft:'12%'}}/><i style={{width:'58%',marginLeft:'28%'}}/><b className={styles.playhead}/>
          </FloatItem>
          <FloatItem active={active} dx={8} dy={-10} dur={5.5} className={`${styles.chip} ${styles.capcut}`} style={{left:'46%',top:'8%'}}>CapCut</FloatItem>
          <FloatItem active={active} dx={-9} dy={-12} dur={6.5} delay={1} className={`${styles.chip} ${styles.red} ${styles.canva}`} style={{left:'4%',top:'66%'}}>Canva</FloatItem>
          <FloatItem active={active} dx={6} dy={14} dur={9} delay={.3} className={styles.thumbs} style={{left:'60%',top:'30%'}}>
            <span/><span/><span/>
          </FloatItem>
          <FloatItem active={active} dx={-6} dy={-9} dur={7.5} delay={1.4} className={styles.chip} style={{left:'62%',top:'74%'}}>Reels · 9:16</FloatItem>
        </div>
      </div>
    </motion.section>)
}
