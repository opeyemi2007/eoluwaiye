import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import type { Project } from '../../types/content'
import { imgFallback } from '../../lib/media'
import { Lightbox } from './Lightbox'
import styles from './Projects.module.css'
/** Flexible sample gallery. Filter chips appear only above nine items. */
export function Gallery({items}:{items:Project[]}){
  const [type,setType]=useState<string>('all'),[open,setOpen]=useState<number|null>(null)
  /** Video thumbnail fallback chain: generated poster -> the video's own first frame -> neutral placeholder. */
  const [fail,setFail]=useState<Record<string,'poster'|'video'>>({})
  const types=[...new Set(items.map(i=>i.mediaType))]
  const shown=type==='all'?items:items.filter(i=>i.mediaType===type)
  return(<>
    {items.length>9&&<div className={styles.chips} role="group" aria-label="Filter work samples">
      {['all',...types].map(t=><button key={t} className={styles.chip} aria-pressed={type===t} onClick={()=>setType(t)}>{t==='all'?'All':t}</button>)}</div>}
    <ul className={styles.grid}>{shown.map((p,i)=>(
      <li key={p.id}><button className={styles.thumb} onClick={()=>setOpen(i)} aria-label={`Open ${p.title}`}>
        {p.mediaType==='video'&&fail[p.id]==='poster'
          ?<video src={`${p.mediaUrl}#t=1.5`} preload="metadata" muted playsInline tabIndex={-1} aria-label={p.alt} onError={()=>setFail(f=>({...f,[p.id]:'video'}))}/>
          :<img src={fail[p.id]==='video'?'/work/video-placeholder.svg':p.thumbnail} alt={p.alt} loading="lazy" onError={e=>{if(p.mediaType==='video'&&!fail[p.id])setFail(f=>({...f,[p.id]:'poster'}));else imgFallback(e)}} onLoad={e=>{if(e.currentTarget.naturalWidth>e.currentTarget.naturalHeight)e.currentTarget.dataset.land="1"}}/>}{p.mediaType==='video'&&<span className={styles.play} aria-hidden="true"><Play size={22} fill="currentColor"/></span>}</button>
        <p className={styles.cap}><strong>{p.attribution}</strong> {p.caption}{p.result&&<> · {p.result}</>}</p></li>))}</ul>
    <AnimatePresence>{open!==null&&<Lightbox items={shown} index={open} onClose={()=>setOpen(null)} onIndex={setOpen}/>}</AnimatePresence>
  </>)
}
