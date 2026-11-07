import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services'
import { Reveal } from '../common/Reveal'
import styles from './ServiceCards.module.css'
const W=(f:string)=>`/work/${f}`
/** Editorial service art: real work in tilted, offset-shadow frames over an accent disc. */
function Art({slug}:{slug:string}){
  const img=(f:string,cls?:string)=><img key={f} className={cls} src={W(f)} alt="" loading="lazy"/>
  if(slug==='ugc')return <span className={styles.artEditorial}><i className={styles.disc}/><img className={styles.frameA} src="/work/ugc-lifestyle-poster.jpg" alt="" loading="lazy"/><img className={styles.frameB} src="/work/ugc-lip-demo-poster.jpg" alt="" loading="lazy"/></span>
  if(slug==='social-media-management')return <span className={styles.artEditorial}><i className={styles.disc}/><span className={styles.feed}>{['gfx-zanzibar','gfx-dominican','gfx-thailand','gfx-mykonos','gfx-review-post','gfx-invitation'].map(f=>img(`${f}-s.webp`))}</span></span>
  if(slug==='virtual-assistant')return <span className={styles.artEditorial}><i className={styles.disc}/>{img('alx-va-certificate-s.webp',styles.vaCert)}<span className={styles.tracker}><u/><u/><u/></span></span>
  if(slug==='video-editing')return <span className={styles.artEditorial}><i className={styles.disc}/>{img('edit-fragrance-poster-s.jpg',`${styles.fr} ${styles.ve0}`)}{img('edit-greece-poster-s.jpg',`${styles.fr} ${styles.ve1}`)}<span className={styles.tl}><u/><u/><u/><u/></span></span>
  return <span className={styles.artEditorial}><i className={styles.disc}/>{['gfx-shop-the-look','gfx-skinprep-1','gfx-ad-duo'].map((f,i)=>img(`${f}-s.webp`,`${styles.fr} ${styles['gr'+i]}`))}</span>
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
