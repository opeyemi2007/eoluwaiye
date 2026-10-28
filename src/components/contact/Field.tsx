import type { ReactNode } from 'react'
import styles from '../sections/Sections.module.css'
export function Field({id,label,error,children}:{id:string;label:string;error?:string;children:ReactNode}){
  return <div className={styles.field}><label htmlFor={id}>{label}</label>{children}
    {error&&<p id={`${id}-err`} className={styles.err}>{error}</p>}</div>
}
export function StatusMsg({state}:{state:string}){
  const m:Record<string,string>={sending:'Sending…',success:'Thank you. Your message was sent.',error:'Something went wrong. Please try again or email me directly.',unconfigured:'This form is not connected yet, so nothing was sent. Please email me directly instead.'}
  return <p role="status" aria-live="polite" className={state==='success'?styles.ok:styles.err}>{m[state]??''}</p>
}
