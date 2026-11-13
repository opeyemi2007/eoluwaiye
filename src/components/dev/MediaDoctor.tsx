import { useEffect, useState } from 'react'
import { projects } from '../../data/projects'
import { clients } from '../../data/clients'
import { certifications } from '../../data/site'
import { isBundled, media } from '../../lib/media'
/** DEV ONLY (never in the production build): names any image/video/logo the site refers to that is missing from src/assets. */
export default function MediaDoctor(){
  const [missing,setMissing]=useState<string[]>([]),[hidden,setHidden]=useState(false)
  useEffect(()=>{
    const urls=new Set<string>()
    projects.forEach(p=>[p.thumbnail,p.mediaUrl].forEach(u=>{if(u&&u.startsWith('/'))urls.add(u)}))
    clients.forEach(c=>urls.add(c.logo));certifications.forEach(c=>{if(c.file)urls.add(c.file)})
    for(const u of ['/brand/eo-dark.png','/brand/eo-light.png','/brand/wordmark-dark.png','/brand/wordmark-light.png','/work/esther-portrait.webp','/work/image-placeholder.svg','/work/video-placeholder.svg'])urls.add(media(u))
    const gone=[...urls].filter(u=>!isBundled(u)).map(u=>'src/assets'+u)
    let live=true
    fetch('/Oluwaiye-Favour-Esther-CV-2026.pdf',{method:'HEAD'}).then(r=>{if(!r.ok||(r.headers.get('content-type')||'').includes('text/html'))gone.push('public/Oluwaiye-Favour-Esther-CV-2026.pdf')}).catch(()=>{}).finally(()=>{if(live)setMissing(gone.sort())})
    return()=>{live=false}
  },[])
  if(!missing.length||hidden)return null
  return(
    <aside role="alert" style={{position:'fixed',left:12,right:12,bottom:12,zIndex:500,maxHeight:'45vh',overflow:'auto',background:'#AA0000',color:'#fff',padding:'14px 16px',borderRadius:10,border:'2px solid #fff',font:'14px/1.45 system-ui,sans-serif'}}>
      <strong>Dev check: {missing.length} media file{missing.length>1?'s are':' is'} missing.</strong> That is why some images show as dark "Image not found" boxes. Copy these from the project zip into the same folders:
      <ul style={{margin:'8px 0 8px 18px',padding:0}}>{missing.slice(0,14).map(m=><li key={m}><code>{m}</code></li>)}</ul>
      {missing.length>14&&<p style={{margin:'0 0 8px'}}>…and {missing.length-14} more. Run <code>node scripts/check-media.mjs</code> for the full list.</p>}
      <button onClick={()=>setHidden(true)} style={{background:'#fff',color:'#AA0000',border:0,borderRadius:99,padding:'6px 14px',fontWeight:700,cursor:'pointer'}}>Hide</button>
    </aside>)
}
