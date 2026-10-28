import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { testimonials } from '../data/testimonials'
import { site } from '../data/site'
import { publicProjects, publicTestimonials } from '../lib/visibility'
import { useSeo } from '../hooks/useSeo'
import { ButtonLink } from '../components/common/Button'
import { publicClients, clients } from '../data/clients'
import { imgFallback } from '../lib/media'
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
  const work=soon?[]:publicProjects(projects).filter(p=>p.services.includes(s.slug))
  const cases=work.filter(p=>p.featured).slice(0,2)
  const quotes=publicTestimonials(testimonials).filter(t=>t.service===s.slug)
  const who=publicClients(clients).filter(c=>c.services.includes(s.slug))
  const hero=work[0]
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
            <div className={styles.ctas}>
              <span onClick={()=>track('service_enquire_click')}><ButtonLink to={enquire}>Tell me what you need</ButtonLink></span>
              {site.bookingUrl&&<a className={styles.call} href={site.bookingUrl} onClick={()=>track('book_call_click')}>Book a call</a>}
              {work.length>0&&<a className={styles.call} href="#samples">See the work</a>}
            </div>
          </div>
          {/* Placeholder visual until approved media is supplied */}
          {hero
            ?<div className={styles.visual}><img src={hero.mediaType==='image'?hero.mediaUrl:hero.thumbnail} alt={hero.alt} width={720} height={900} onError={imgFallback}/></div>
            :<div className={styles.visual} aria-hidden="true"><span>{s.number}</span></div>}
        </section>
        <section className={`container ${styles.block}`} aria-labelledby="do-h">
          <h2 id="do-h" className={styles.h2}>What I do</h2>
          <ul className={styles.list}>{s.whatIDo.map(x=><li key={x}>{x}</li>)}</ul>
        </section>
        {soon&&<section className={`container ${styles.block}`}><p className={styles.soon}>Finished work for this service is on its way. If you need it now, tell me what you have in mind.</p></section>}
        {cases.length>0&&<section className={`container ${styles.block}`} aria-labelledby="sel-h"><h2 id="sel-h" className={styles.h2}>Selected work</h2>
          {cases.map(c=>(<article key={c.id} className={styles.case}>
            <img src={c.thumbnail} alt={c.alt} loading="lazy"/>
            <div><p className={styles.num}>{c.attribution}</p><h3>{c.title}</h3>
              {c.challenge&&<p><strong>Goal:</strong> {c.challenge}</p>}{c.whatIDid&&<p><strong>What I did:</strong> {c.whatIDid}</p>}
              {c.result&&<p className={styles.result}>{c.result}</p>}</div></article>))}</section>}
        {work.length>0&&<section id="samples" className={`container ${styles.block}`} aria-labelledby="samp-h"><h2 id="samp-h" className={styles.h2}>Work samples</h2><Gallery items={work}/></section>}
        {!soon&&work.length===0&&<section className={`container ${styles.block}`}><p className={styles.soon}>Selected work for this service is being added. Ask me and I'll share relevant examples.</p></section>}
        {(who.length>0||quotes.length>0)&&<section className={`container ${styles.block}`} aria-labelledby="who-h"><h2 id="who-h" className={styles.h2}>Who I've done this for</h2>
          {who.length>0&&<ul className={styles.logos}>{who.map(c=><li key={c.id}><img src={c.logo} alt="" height={72} loading="lazy"/><span>{c.name}</span></li>)}</ul>}
          {quotes.map(q=><blockquote key={q.id} className={styles.quote}>{q.quote}<footer>{q.name}, {q.brand}</footer></blockquote>)}</section>}
        <section className={`${styles.closing} on-red`} aria-labelledby="close-h"><div className="container">
          <h2 id="close-h" className={styles.closeH}>Ready to get started?</h2>
          <Link className={styles.closeBtn} to={enquire} onClick={()=>track('service_enquire_click')}>Tell me what you need</Link>
          <nav aria-label="Other services"><ul className={styles.others}>{others.map(o=><li key={o.slug}><Link to={`/${o.slug}`}>{o.name}</Link></li>)}</ul></nav>
        </div></section>
      </main>
      <Footer/>
    </motion.div>)
}
