import { site } from '../data/site'
export type SubmitState='idle'|'sending'|'success'|'pending'|'error'|'unconfigured'
const env=import.meta.env
/** 1) The site's own server functions (Resend / MailerLite). Used when their keys are set. */
const OWN={contact:(env.VITE_CONTACT_ENDPOINT as string|undefined)||'/api/contact',newsletter:(env.VITE_NEWSLETTER_ENDPOINT as string|undefined)||'/api/subscribe'}
/** 2) No-account fallback: FormSubmit.co forwards the message to Esther's Gmail. Turn off with VITE_EMAIL_FALLBACK=off. */
const FALLBACK_ON=(env.VITE_EMAIL_FALLBACK as string|undefined)!=='off'
const FORMSUBMIT=`https://formsubmit.co/ajax/${site.email}`
export const isEmail=(v:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

type Payload=Record<string,unknown>
async function postOwn(endpoint:string,body:Payload):Promise<'success'|'unconfigured'|'error'>{
  try{
    const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)})
    if(r.status===503||r.status===404)return 'unconfigured'
    if(!r.ok)return 'error'
    const j=await r.json().catch(()=>null) as {ok?:unknown}|null
    return j&&j.ok===true?'success':'error'
  }catch{return 'error'}
}
/** success = the service confirmed. pending = the service says Esther's inbox still needs its one-time confirmation. */
async function postFormSubmit(kind:'contact'|'newsletter',b:Payload):Promise<'success'|'pending'|'error'>{
  const name=String(b.name??''),fields=kind==='contact'
    ?{name,email:b.email,brand:b.brand||'-',services:Array.isArray(b.services)&&b.services.length?(b.services as string[]).join(', '):'-',message:b.message,_subject:`New enquiry from ${name} (portfolio site)`}
    :{name,email:b.email,consent:'Agreed to receive emails (ticked on the website)',source:'portfolio-site',_subject:`New email list sign-up: ${name}`}
  try{
    const r=await fetch(FORMSUBMIT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({...fields,_template:'table',_captcha:'false'})})
    const j=await r.json().catch(()=>null) as {success?:unknown}|null
    if(!r.ok||!j)return 'error'
    if(/activat|confirm/i.test(JSON.stringify(j)))return 'pending'
    return j.success===true||j.success==='true'?'success':'error'
  }catch{return 'error'}
}
/** Never reports success unless a service confirmed it. */
export async function deliver(kind:'contact'|'newsletter',body:Payload):Promise<SubmitState>{
  const own=await postOwn(OWN[kind],body)
  if(own==='success')return 'success'
  if(!FALLBACK_ON)return own==='unconfigured'?'unconfigured':'error'
  const fs=await postFormSubmit(kind,body)
  if(fs==='error')console.warn(`[forms] could not deliver: own function said "${own}", FormSubmit failed`)
  return fs
}
/** WhatsApp click-to-chat with the message typed in. The visitor still presses send, so this is never reported as "sent". */
export const whatsappLink=(text:string)=>`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`
export const scrollToId=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
