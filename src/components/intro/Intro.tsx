import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Logo } from '../common/Logo'
import styles from './Intro.module.css'
const LETTERS='ESTHER'.split('')
const CREAM='#F6F0E4'
export function Intro({onContinue}:{onContinue:()=>void}){
  const reduce=useReducedMotion()
  const bounce=useAnimationControls()
  const busy=useRef(false)
  const nudge=()=>{
    if(reduce||busy.current)return
    busy.current=true
    bounce.start({y:[0,-22,0],transition:{type:'spring',stiffness:420,damping:12,mass:.7}}).then(()=>{busy.current=false})
  }
  return(
    <motion.section className={`${styles.intro} on-red`} aria-label="Introduction"
      exit={{y:'-100%'}} transition={{duration:reduce?0:.8,ease:[.76,0,.24,1]}}>
      <div className={styles.top}><Logo variant="wordmark"/></div>
      <h1 className={styles.h1}>
        <motion.button type="button" className={styles.name} aria-label="Esther" animate={bounce}
          onMouseEnter={nudge} onClick={nudge}>
          {LETTERS.map((l,i)=>(
            <motion.span key={i} aria-hidden="true" className={styles.letter}
              initial={reduce?false:{y:'-130%',opacity:0,color:'rgba(246,240,228,0)'}}
              animate={{y:0,opacity:1,color:CREAM}}
              transition={{
                y:{type:'spring',stiffness:340,damping:13,mass:.9,delay:i*.06},
                opacity:{duration:.15,delay:i*.06},
                color:{duration:.4,delay:.45+i*.06}}}>{l}</motion.span>))}
        </motion.button>
      </h1>
      <div className={styles.bottom}>
        <button type="button" className={styles.cue} onClick={onContinue}>
          <span>Scroll or continue</span>
          <motion.span aria-hidden="true" animate={reduce?undefined:{y:[0,6,0]}} transition={{duration:1.6,repeat:3,ease:'easeInOut'}}><ChevronDown/></motion.span>
        </button>
      </div>
    </motion.section>)
}
import { useRef } from 'react'
