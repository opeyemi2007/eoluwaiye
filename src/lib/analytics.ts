/** Plausible (cookieless) loads only when VITE_ANALYTICS_DOMAIN is set. Only whitelisted, non-personal props are sent. */
const ALLOWED=['service','label']
type Plausible=(e:string,o?:{props:Record<string,string>})=>void
export function track(event:string,props:Record<string,string>={}){window.dispatchEvent(new CustomEvent('analytics',{detail:{event,...props}}))}
export function initAnalytics(){
  const domain=import.meta.env.VITE_ANALYTICS_DOMAIN as string|undefined
  if(!domain)return
  const s=document.createElement('script');s.defer=true;s.dataset.domain=domain;s.src='https://plausible.io/js/script.js';document.head.appendChild(s)
  window.addEventListener('analytics',e=>{
    const d=(e as CustomEvent<Record<string,string>>).detail,props:Record<string,string>={}
    ALLOWED.forEach(k=>{if(typeof d[k]==='string')props[k]=d[k]})
    ;(window as unknown as {plausible?:Plausible}).plausible?.(d.event,{props})})
}
