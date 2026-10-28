import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import { Reveal } from '../common/Reveal'
import styles from './ServiceCards.module.css'
function Art({slug}:{slug:string}){
  const n=(c:number)=>Array.from({length:c},(_,i)=><i key={i}/>)
  if(slug==='social-media-management')return <span className={styles.artGrid}>{n(9)}</span>
  if(slug==='virtual-assistant')return <span className={styles.artRows}>{n(4)}</span>
  if(slug==='video-editing')return <span className={styles.artVideo}><i/><em><u/><u/><u/></em></span>
  if(slug==='ugc')return <span className={styles.artEditorial}><i className={styles.disc}/><img className={styles.frameA} src="/work/ugc-lifestyle-poster.jpg" alt="" loading="lazy"/><img className={styles.frameB} src="/work/ugc-lip-demo-poster.jpg" alt="" loading="lazy"/></span>
  return <span className={styles.artSlides}>{n(3)}</span>
}
export function ServiceCards(){
  const live=services.filter(s=>s.status!=='hidden')
  return(
    <section id="services" className={`container ${styles.wrap}`} aria-labelledby="services-h">
      <h2 id="services-h" className={styles.title}>Services</h2>
      <ul className={styles.grid}>{live.map((s,i)=>(
        <li key={s.slug} className={`${styles.cell} ${i<3?styles.third:styles.half}`}>
          <Reveal delay={i*.06}>
            <Link to={`/${s.slug}`} className={`${styles.card} ${styles[s.slug.replace(/-/g,'')]}`}>
              <span className={styles.visual} aria-hidden="true"><Art slug={s.slug}/><b>{s.number}</b></span>
              <span className={styles.body}>
                <span className={styles.num}>{s.number}</span>
                <h3>{s.name}</h3>
                <span className={styles.line}>{s.oneLine}</span>
                <span className={styles.view}>{s.status==='coming-soon'?'Coming soon':'View'} <ArrowUpRight size={20} aria-hidden="true"/></span>
              </span>
            </Link>
          </Reveal>
        </li>))}</ul>
    </section>)
}
