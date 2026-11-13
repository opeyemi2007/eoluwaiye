import { site } from '../data/site'
export type SubmitState='idle'|'sending'|'success'|'pending'|'error'|'unconfigured'
export interface Result{state:SubmitState;detail?:string}
const env=import.meta.env
type Payload=Record<string,unknown>
/** Delivery order: 1) the site's own /api function (Resend/MailerLite, when its keys are set)
 *  2) Web3Forms (when VITE_WEB3FORMS_KEY is set: free key emailed to her address, no activation click)
 *  3) FormSubmit.co (no key, but eoluwaiye@gmail.com must click one activation email). Turn off with VITE_EMAIL_FALLBACK=off.
 *  Success is only ever reported when a service confirms it. */
const OWN={contact:(env.VITE_CONTACT_ENDPOINT as string|undefined)||'/api/contact',newsletter:(env.VITE_NEWSLETTER_ENDPOINT as string|undefined)||'/api/subscribe'}
const W3KEY=env.VITE_WEB3FORMS_KEY as string|undefined
const FALLBACK_ON=(env.VITE_EMAIL_FALLBACK as string|undefined)!=='off'
const FORMSUBMIT=`https://formsubmit.co/ajax/${site.email}`
export const isEmail=(v:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
const JSONH={'Content-Type':'application/json',Accept:'application/json'}
const fields=(kind:'contact'|'newsletter',b:Payload)=>{
  const name=String(b.name??'')
  return kind==='contact'
    ?{subject:`New enquiry from ${name} (portfolio site)`,data:{name,email:b.email,brand:b.brand||'-',services:Array.isArray(b.services)&&b.services.length?(b.services as string[]).join(', '):'-',message:b.message}}
    :{subject:`New email list sign-up: ${name}`,data:{name,email:b.email,consent:'Agreed to receive emails (ticked on the website)',source:'portfolio-site'}}
}
async function postOwn(endpoint:string,body:Payload):Promise<Result>{
  try{
    const r=await fetch(endpoint,{method:'POST',headers:JSONH,body:JSON.stringify(body)})
    if(r.status===503||r.status===404)return{state:'unconfigured'}
    if(!r.ok)return{state:'error',detail:`own server answered ${r.status}`}
    const j=await r.json().catch(()=>null) as {ok?:unknown}|null
    return j&&j.ok===true?{state:'success'}:{state:'error'}
  }catch{return{state:'error'}}
}
async function postWeb3(kind:'contact'|'newsletter',b:Payload):Promise<Result>{
  const{subject,data}=fields(kind,b)
  try{
    const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:JSONH,body:JSON.stringify({access_key:W3KEY,subject,from_name:data.name,...data,botcheck:''})})
    const j=await r.json().catch(()=>null) as {success?:unknown;message?:string}|null
    if(j&&j.success===true)return{state:'success'}
    return{state:'error',detail:j?.message||`Web3Forms answered ${r.status}`}
  }catch(e){return{state:'error',detail:'could not reach Web3Forms (offline, or blocked by a browser extension)'+(e instanceof Error?`: ${e.message}`:'')}}
}
async function postFormSubmit(kind:'contact'|'newsletter',b:Payload):Promise<Result>{
  const{subject,data}=fields(kind,b)
  try{
    const r=await fetch(FORMSUBMIT,{method:'POST',headers:JSONH,body:JSON.stringify({...data,_subject:subject,_template:'table',_captcha:'false'})})
    const j=await r.json().catch(()=>null) as {success?:unknown;message?:string}|null
    if(!j)return{state:'error',detail:`FormSubmit answered ${r.status} with no readable reply`}
    if(/activat|confirm/i.test(JSON.stringify(j)))return{state:'pending',detail:j.message}
    if(j.success===true||j.success==='true')return{state:'success'}
    return{state:'error',detail:j.message||`FormSubmit answered ${r.status}`}
  }catch(e){return{state:'error',detail:'could not reach FormSubmit (offline, or blocked by a browser extension)'+(e instanceof Error?`: ${e.message}`:'')}}
}
export async function deliver(kind:'contact'|'newsletter',body:Payload):Promise<Result>{
  const own=await postOwn(OWN[kind],body)
  if(own.state==='success')return own
  let last:Result=own
  if(W3KEY){last=await postWeb3(kind,body);if(last.state==='success')return last}
  if(FALLBACK_ON){const fs=await postFormSubmit(kind,body);if(fs.state==='success'||fs.state==='pending')return fs;last=fs}
  if(!W3KEY&&!FALLBACK_ON)return{state:'unconfigured'}
  console.warn('[forms] could not deliver.',{ownFunction:own.state,last})
  return last.state==='unconfigured'?{state:'error',detail:last.detail}:last
}
/** WhatsApp / email links with the message typed in. The visitor still presses send, so these are never reported as "sent". */
export const whatsappLink=(text:string)=>`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`
export const mailtoLink=(subject:string,body:string)=>`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
export const scrollToId=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
