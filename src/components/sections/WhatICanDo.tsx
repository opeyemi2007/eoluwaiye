import { Link } from 'react-router-dom'
import { Reveal } from '../common/Reveal'
import { scrollToId } from '../../lib/forms'
import styles from './Sections.module.css'
const blocks=[
 {to:'/social-media-management',t:'Social Media Management',l:['Content strategy based on Instagram Insights','Monthly content calendar','Ideas, scripts and captions','Posting and scheduling','Comment and DM management','Trend and competitor research','Monthly reports with clear next steps']},
 {to:'/virtual-assistant',t:'Virtual Assistant',l:['Inbox and calendar management','Brand outreach and collaboration pitching','Research and lists','Trackers and spreadsheets','Trello and project boards','Scheduling, reminders and administration']},
 {to:'/video-editing',t:'Video Editing',l:['Reels, TikTok and Shorts edited in CapCut','Hook-first openings','Captions and on-screen text','Sound, music and colour','Cutting long videos into short clips','Covers and thumbnails']},
 {to:'/ugc',t:'UGC',l:['Product demonstrations and honest reviews','Get-ready-with-me videos','Fragrance and beauty content','Scripts and hooks','Vertical, phone-shot and captioned content']},
 {to:'/graphics',t:'Graphics',l:['Carousels and post templates','Covers and thumbnails','Media kits','On-brand visuals in Canva']}]
export function WhatICanDo(){
  return(
    <section id="what-i-do" className={`${styles.what} on-red`} aria-labelledby="what-h">
      <div className="container">
        <h2 id="what-h" className={styles.h2}>What I can do for you</h2>
        <div className={styles.whatGrid}>{blocks.map((b,i)=>(
          <Reveal key={b.t} delay={i*.05} className={styles.whatCard}>
            <h3><Link to={b.to}>{b.t}</Link></h3>
            <ul className={styles.check}>{b.l.map(x=><li key={x}>{x}</li>)}</ul></Reveal>))}</div>
        <button className={styles.bigCta} onClick={()=>scrollToId('contact')}>Tell me what you need.</button>
      </div>
    </section>)
}
