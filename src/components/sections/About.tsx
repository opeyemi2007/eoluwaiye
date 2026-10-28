import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Download, ExternalLink, CalendarDays, Maximize2 } from 'lucide-react'
import { track } from '../../lib/analytics'
import { site, certifications } from '../../data/site'
import { Reveal } from '../common/Reveal'
import { Lightbox } from '../projects/Lightbox'
import type { Project } from '../../types/content'
import styles from './Sections.module.css'
export function About(){
  const [open,setOpen]=useState(false)
  const certs=certifications.filter(c=>c.verified&&c.file)
  const items:Project[]=certs.map(c=>({id:c.id,title:`${c.title}, ${c.issuer}`,services:[],attribution:c.issuer,mediaType:'image',mediaUrl:c.file!,thumbnail:c.file!,alt:c.alt,caption:`${c.title} certificate, ${c.year}`,approval:'approved',permission:true}))
  const tiktok=site.channels.find(c=>c.label==='TikTok')?.href
  const hasActions=site.cvUrl||site.bookingUrl||tiktok
  return(
    <section id="about" className={styles.about} aria-labelledby="about-h">
      <div className={`container ${styles.aboutGrid}`}>
        <div className={styles.photo}><img src="/work/esther-portrait.webp" width={1200} height={1522} loading="lazy" alt="Portrait of Esther in a pink tailored outfit, standing in profile against a warm tan backdrop"/></div>
        <Reveal>
          <h2 id="about-h" className={styles.h2}>About Esther</h2>
          {site.bio.map(p=><p key={p.slice(0,24)}>{p}</p>)}
          <dl className={styles.facts}>{site.facts.map(f=><div key={f.label} className={f.wide?styles.wide:undefined}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
          {hasActions&&<div className={styles.actions}>
            {site.cvUrl&&<a className={styles.linkBtn} href={site.cvUrl} download={site.cvFileName} onClick={()=>track('cv_download')}><Download size={18} aria-hidden="true"/> Download my CV</a>}
            {site.bookingUrl&&<a className={styles.linkBtn} href={site.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={()=>track('book_call_click')}><CalendarDays size={18} aria-hidden="true"/> Book a call</a>}
            {tiktok&&<a className={styles.linkBtn} href={tiktok} target="_blank" rel="noopener noreferrer"><ExternalLink size={18} aria-hidden="true"/> Looking for UGC? See Petitefave</a>}
          </div>}
        </Reveal>
      </div>
      <div className={`container ${styles.certArea}`}>
        <h3 className={styles.certH}>Certifications</h3>
        <div className={styles.certGrid}>
          {certs.map(c=>(
            <figure key={c.id} className={styles.certFig}>
              <button type="button" className={styles.certBtn} onClick={()=>setOpen(true)} aria-label={`Enlarge ${c.title} certificate, ${c.issuer}, ${c.year}`}>
                <img src={c.file} alt={c.alt} width={1280} height={720} loading="lazy"/><span className={styles.certHint} aria-hidden="true"><Maximize2 size={16}/> Enlarge</span>
              </button>
              <figcaption><strong>{c.title}, {c.issuer}, {c.year}</strong></figcaption>
            </figure>))}
          <p className={styles.soonNote}>More on the way.</p>
        </div>
      </div>
      <AnimatePresence>{open&&<Lightbox items={items} index={0} onClose={()=>setOpen(false)} onIndex={()=>{}}/>}</AnimatePresence>
    </section>)
}
