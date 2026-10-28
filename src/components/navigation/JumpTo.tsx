import { Link } from 'react-router-dom'
import { jumpLinks } from '../../data/navigation'
import { testimonials } from '../../data/testimonials'
import { showTestimonials } from '../../lib/visibility'
import { scrollToId } from '../../lib/forms'
import styles from '../sections/Sections.module.css'
export function JumpTo(){
  const links=jumpLinks.filter(l=>l.to!=='testimonials'||showTestimonials(testimonials))
  const track=(l:string)=>window.dispatchEvent(new CustomEvent('analytics',{detail:{event:'quick_jump',label:l}}))
  return(
    <nav className={`container ${styles.jump}`} aria-label="Jump to">
      <h2 className={styles.jumpTitle}>Jump to</h2>
      <ul className={styles.pills}>{links.map(l=>(
        <li key={l.to}>{l.kind==='route'
          ?<Link className={styles.pill} to={l.to} onClick={()=>track(l.label)}>{l.label}</Link>
          :<button className={styles.pill} onClick={()=>{track(l.label);scrollToId(l.to)}}>{l.label}</button>}</li>))}</ul>
    </nav>)
}
