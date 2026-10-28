import { useEffect } from 'react'
function meta(attr:'name'|'property',key:string,content:string){
  let t=document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if(!t){t=document.createElement('meta');t.setAttribute(attr,key);document.head.appendChild(t)}
  t.content=content}
/** Per-route title, description, Open Graph; canonical once VITE_SITE_URL is set. */
export function useSeo(title:string|undefined,description:string=''){
  useEffect(()=>{
    if(!title)return
    document.title=title
    meta('name','description',description);meta('property','og:title',title)
    meta('property','og:description',description);meta('property','og:type','website')
    const base=import.meta.env.VITE_SITE_URL as string|undefined
    if(base){meta('property','og:image',base.replace(/\/$/,'')+'/og.png');meta('name','twitter:card','summary_large_image')
      let l=document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if(!l){l=document.createElement('link');l.rel='canonical';document.head.appendChild(l)}
      l.href=base.replace(/\/$/,'')+location.pathname}
  },[title,description])
}
