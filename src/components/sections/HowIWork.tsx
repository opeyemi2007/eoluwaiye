import { Phone, BarChart3, ClipboardList, Clapperboard, RefreshCw } from 'lucide-react'
import { Reveal } from '../common/Reveal'
import styles from './Sections.module.css'
const steps=[
 {t:'Intro Call',d:"A free 20-minute chat about your brand, your goals and what's not working.",Icon:Phone},
 {t:'Look at the Numbers',d:'I review your Insights and past content to understand what people actually watch, save and follow for.',Icon:BarChart3},
 {t:'Plan',d:'We agree on a simple plan and content calendar before I start.',Icon:ClipboardList},
 {t:'Create and Post',d:'I edit, design, schedule and manage the work, keeping you updated along the way.',Icon:Clapperboard},
 {t:'Review and Improve',d:"Each month, we look at what worked, what didn't and what to improve next.",Icon:RefreshCw}]
export function HowIWork(){
  return(
    <section id="how-i-work" className={styles.how} aria-labelledby="how-h">
      <div className="container">
        <h2 id="how-h" className={styles.h2}>How I work</h2>
        <ol className={styles.steps}>{steps.map((s,i)=>(
          <li key={s.t}><Reveal delay={i*.07}><span className={styles.stepNo}><s.Icon size={22} aria-hidden="true"/> 0{i+1}</span><h3>{s.t}</h3><p>{s.d}</p></Reveal></li>))}</ol>
        <div className={styles.twoCol}>
          <div><h3>What I need from you</h3><ul className={styles.check}>
            <li>Access to your accounts or a shared folder of raw footage</li><li>Your brand colours, fonts and communication guidelines</li><li>One person who can provide feedback within the agreed timeframe</li></ul></div>
          <div><h3>What you get from me</h3><ul className={styles.check}>
            <li>Clear communication</li><li>Honest feedback</li><li>Work delivered on agreed dates</li><li>Progress updates</li></ul></div>
        </div>
      </div>
    </section>)
}
