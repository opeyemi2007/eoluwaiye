export type SubmitState='idle'|'sending'|'success'|'error'|'unconfigured'
export const ENDPOINTS={contact:import.meta.env.VITE_CONTACT_ENDPOINT as string|undefined,newsletter:import.meta.env.VITE_NEWSLETTER_ENDPOINT as string|undefined}
export const isEmail=(v:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
/** Reports success only when the endpoint confirms. No endpoint = honest 'unconfigured'. */
export async function postJson(endpoint:string|undefined,body:unknown):Promise<SubmitState>{
  if(!endpoint)return 'unconfigured'
  try{const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});return r.ok?'success':'error'}catch{return 'error'}
}
export const scrollToId=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
