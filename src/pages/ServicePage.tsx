import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { site } from '../data/site'
import { publicProjects } from '../lib/visibility'
import { useSeo } from '../hooks/useSeo'
import { ButtonLink } from '../components/common/Button'
import { publicClients, clients } from '../data/clients'
import { imgFallback } from '../lib/media'
import { CaseStudies } from '../components/projects/CaseStudies'
import { caseStudies } from '../data/caseStudies'
import { Gallery } from '../components/projects/Gallery'
import { ServiceHeader } from '../components/layout/ServiceHeader'
import { Footer } from '../components/layout/Footer'
import NotFoundPage from './NotFoundPage'
import styles from './ServicePage.module.css'
export default function ServicePage(){
  const {slug}=useParams(),reduce=useReducedMotion()
  const list=services.filter(s=>s.status!=='hidden'),idx=list.findIndex(x=>x.slug===slug),s=list[idx]
  useSeo(s?`${s.name} | Esther`:undefined,s?.metaDescription)
  if(!s)return <NotFoundPage/>
  const soon=s.status==='coming-soon',next=list[(idx+1)%list.length],others=list.filter(x=>x.slug!==s.slug)
  const all=soon?[]:publicProjects(projects).filter(p=>p.services.includes(s.slug))
  const samples=all.filter(p=>p.role!=='proof'&&p.role!=='case')
  const hasCases=!soon&&caseStudies.some(c=>c.service===s.slug)
  const who=(s.who??[]).map(n=>({name:n,client:publicClients(clients).find(c=>c.name.toLowerCase()===n.toLowerCase())}))
  const hero=(s.heroMediaId&&publicProjects(projects).find(p=>p.id===s.heroMediaId))||all[0]
  const enquire=`/?service=${s.slug}#contact`
  const track=(event:string)=>window.dispatchEvent(new CustomEvent('analytics',{detail:{event,service:s.slug}}))
  return(
    <motion.div initial={reduce?false:{opacity:0}} animate={{opacity:1}} transition={{duration:.3}}>
      <ServiceHeader next={next}/>
      <main id="main">
        <section className={`container ${styles.hero}`} aria-labelledby="svc-h">
          <div>
            <p className={styles.num}>{s.number}{soon&&' · Coming soon'}</p>
            <h1 id="svc-h" className={styles.title}>{s.name}</h1>
            <p className={styles.promise}>{s.promise}</p>
            {s.heroLines?.map(l=><p key={l} className={styles.heroLine}>{l}</p>)}
            {s.heroStat&&<p className={styles.stat}>{s.heroStat}</p>}
            <div className={styles.ctas}>
              <span onClick={()=>track('service_enquire_click')}><ButtonLink to={enquire}>Tell me what you need</ButtonLink></span>
              {site.bookingUrl&&<a className={styles.call} href={site.bookingUrl} onClick={()=>track('book_call_click')}>Book a call</a>}
              {(hasCases||samples.length>0)&&<a className={styles.call} href={hasCases?'#selected':'#samples'}>See the work</a>}
            </div>
          </div>
          {/* Placeholder visual until approved media is supplied */}
          {hero
            ?<div className={styles.visual}><img src={hero.mediaType==='image'?hero.mediaUrl:hero.thumbnail} alt={hero.alt} width={720} height={900} onError={imgFallback} onLoad={e=>{if(e.currentTarget.naturalWidth>e.currentTarget.naturalHeight)e.currentTarget.dataset.land='1'}}/></div>
            :<div className={styles.visual} aria-hidden="true"><span>{s.number}</span></div>}
        </section>
        <section className={`container ${styles.block}`} aria-labelledby="do-h">
          <h2 id="do-h" className={styles.h2}>What I do</h2>
          <ul className={styles.list}>{s.whatIDo.map(x=><li key={x}>{x}</li>)}</ul>
        </section>
        {soon&&<section className={`container ${styles.block}`}><p className={styles.soon}>Finished work for this service is on its way. If you need it now, tell me what you have in mind.</p></section>}
        {hasCases&&<section id="selected" className={`container ${styles.block}`} aria-labelledby="sel-h"><h2 id="sel-h" className={styles.h2}>Selected work</h2><CaseStudies service={s.slug}/></section>}
        {samples.length>0&&<section id="samples" className={`container ${styles.block}`} aria-labelledby="samp-h"><h2 id="samp-h" className={styles.h2}>{s.samplesTitle??(hasCases?'More work':'Work samples')}</h2><Gallery items={samples}/></section>}
        {!soon&&!hasCases&&samples.length===0&&<section className={`container ${styles.block}`}><p className={styles.soon}>Selected work for this service is being added. Ask me and I'll share relevant examples.</p></section>}
        {who.length>0&&<section className={`container ${styles.block}`} aria-labelledby="who-h"><h2 id="who-h" className={styles.h2}>Who I've done this for</h2>
          <ul className={styles.logos}>{who.map(w=><li key={w.name}>{w.client?<><img src={w.client.logo} alt="" height={72} loading="lazy"/><span>{w.client.name}</span></>:<span className={styles.chip}>{w.name}</span>}</li>)}</ul></section>}
        <section className={`${styles.closing} on-red`} aria-labelledby="close-h"><div className="container">
          <h2 id="close-h" className={styles.closeH}>Ready to get started?</h2>
          <Link className={styles.closeBtn} to={enquire} onClick={()=>track('service_enquire_click')}>Tell me what you need</Link>
          <nav aria-label="Other services"><ul className={styles.others}>{others.map(o=><li key={o.slug}><Link to={`/${o.slug}`}>{o.name}</Link></li>)}</ul></nav>
        </div></section>
      </main>
      <Footer/>
    </motion.div>)
}
