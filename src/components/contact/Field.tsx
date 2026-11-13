import type { ReactNode } from 'react'
import styles from '../sections/Sections.module.css'
export function Field({id,label,error,children}:{id:string;label:string;error?:string;children:ReactNode}){
  return <div className={styles.field}><label htmlFor={id}>{label}</label>{children}
    {error&&<p id={`${id}-err`} className={styles.err}>{error}</p>}</div>
}
export function StatusMsg({state,detail,children}:{state:string;detail?:string;children?:ReactNode}){
  const m:Record<string,string>={sending:'Sending…',success:'Thank you. Your message was sent.',error:'Something went wrong. Please try again, or use WhatsApp or email me directly.',pending:"Thanks! The form service has your message, but Esther's inbox needs a one-time confirmation first, so it may not have reached her yet. Please also send it on WhatsApp to be sure.",unconfigured:'This form is not connected yet, so nothing was sent. Please email me directly instead.'}
  return <div><p role="status" aria-live="polite" className={state==='success'?styles.ok:styles.err}>{m[state]??''}</p>{detail&&state!=='success'&&state!=='sending'&&<p className={styles.small}>Details from the form service: {detail}</p>}{children}</div>
}
