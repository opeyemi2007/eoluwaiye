import { caseStudies } from '../../data/caseStudies'
import { projects } from '../../data/projects'
import { testimonials } from '../../data/testimonials'
import { publicProjects, publicTestimonials } from '../../lib/visibility'
import { Gallery } from './Gallery'
import { Reveal } from '../common/Reveal'
import type { ServiceSlug } from '../../types/content'
import styles from './CaseStudies.module.css'
/** Selected work: one block per client, with real bullets, the stated result, quotes from brand teams, and proof or sample media. */
export function CaseStudies({service}:{service:ServiceSlug}){
  const list=caseStudies.filter(c=>c.service===service)
  if(!list.length)return null
  const all=publicProjects(projects),tms=publicTestimonials(testimonials)
  return(<>{list.map((c,n)=>{
    const media=(c.mediaIds??[]).map(id=>all.find(p=>p.id===id)).filter((p):p is NonNullable<typeof p>=>!!p)
    const tm=(c.testimonialIds??[]).map(id=>tms.find(t=>t.id===id)).filter((t):t is NonNullable<typeof t>=>!!t)
    return(
      <article key={c.id} className={styles.cs} aria-labelledby={`cs-${c.id}`}>
        <Reveal>
          <p className={styles.num}>{String(n+1).padStart(2,'0')}</p>
          <h3 id={`cs-${c.id}`}>{c.client}{c.descriptor&&<span className={styles.desc}>: {c.descriptor}</span>}</h3>
          {c.bullets.length>0&&<ul className={styles.bullets}>{c.bullets.map(b=><li key={b}>{b}</li>)}</ul>}
          {c.result&&<p className={styles.result}>{c.result}</p>}
          {(c.quotes?.length||tm.length)?<div className={styles.quotes}>
            {c.quotes?.map(q=><blockquote key={q.text} className={styles.q}><p>{q.text}</p><cite>{q.attribution}</cite></blockquote>)}
            {tm.map(t=><blockquote key={t.id} className={styles.q}><p>{t.quote}</p><cite>{t.name}, {t.role}, {t.brand}</cite></blockquote>)}
          </div>:null}
          {media.length>0&&<><p className={styles.label}>{c.mediaLabel??'Proof'}</p><Gallery items={media}/></>}
        </Reveal>
      </article>)})}</>)
}
