import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { results } from '../../data/results'
import { publicResults } from '../../lib/visibility'
import styles from '../sections/Sections.module.css'
function CountUp({to,prefix='',suffix=''}:{to:number;prefix?:string;suffix?:string}){
  const ref=useRef<HTMLSpanElement>(null),inView=useInView(ref,{once:true}),reduce=useReducedMotion()
  const [n,setN]=useState(0)
  useEffect(()=>{
    if(reduce){setN(to);return}
    if(!inView)return
    const c=animate(0,to,{duration:1.4,ease:'easeOut',onUpdate:v=>setN(Math.round(v))});return()=>c.stop()
  },[inView,reduce,to])
  return <span ref={ref}>{prefix}{n.toLocaleString('en-GB')}{suffix}</span>
}
/** Renders nothing until at least one result is verified, permitted and visible. */
export function ResultsStrip(){
  const items=publicResults(results);if(!items.length)return null
  return(
    <section className={styles.results} aria-label="Results">
      <ul className={styles.resultList}>{items.map(r=>(
        <li key={r.id} className={styles.result}>
          <p className={styles.big}>{r.countTo!==undefined?<CountUp to={r.countTo} prefix={r.prefix} suffix={r.suffix}/>:r.value}</p>
          <p className={styles.resLabel}>{r.label}</p><p className={styles.resCtx}>{r.context}</p>
          {(r.attribution||r.dateRange)&&<p className={styles.meta}>{[r.attribution,r.dateRange].filter(Boolean).join(' · ')}</p>}
        </li>))}</ul>
    </section>)
}
