import { useState, type FormEvent } from 'react'
import { services } from '../../data/services'
import { site } from '../../data/site'
import { track } from '../../lib/analytics'
import { ENDPOINTS, isEmail, postJson, type SubmitState } from '../../lib/forms'
import type { ServiceSlug } from '../../types/content'
import { Field, StatusMsg } from './Field'
import { SocialLinks } from '../common/SocialLinks'
import { Newsletter } from './Newsletter'
import styles from '../sections/Sections.module.css'
export function ContactSection({preselected}:{preselected?:ServiceSlug}){
  const [st,setSt]=useState<SubmitState>('idle'),[errs,setErrs]=useState<Record<string,string>>({})
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();const f=new FormData(e.currentTarget)
    const v={name:String(f.get('name')).trim(),email:String(f.get('email')).trim(),brand:String(f.get('brand')).trim(),services:f.getAll('services').map(String),message:String(f.get('message')).trim()}
    const e2:Record<string,string>={}
    if(!v.name)e2.name='Please enter your name.'
    if(!isEmail(v.email))e2.email='Please enter a valid email address.'
    if(v.message.length<10)e2.message='Please tell me a little about what you need.'
    setErrs(e2);if(Object.keys(e2).length||f.get('company'))return
    setSt('sending');const r=await postJson(ENDPOINTS.contact,v);setSt(r);if(r==='success')track('contact_submit')
  }
  return(
    <section id="contact" className={styles.contact} aria-labelledby="contact-h">
      <div className="container">
        <header className={styles.contactHead}>
          <h2 id="contact-h" className={styles.h2}>Let's work together.</h2>
          <p>Tell me about your brand.{site.responseTime?` ${site.responseTime}`:''}</p>
          <SocialLinks/>
          {site.bookingUrl&&<a className={styles.submit} href={site.bookingUrl} onClick={()=>window.dispatchEvent(new CustomEvent('analytics',{detail:{event:'book_call_click'}}))}>Book a call</a>}
        </header>
        <div className={styles.pair}>
          <div className={styles.panel}><Newsletter/></div>
          <div className={`${styles.panel} ${styles.formPanel}`}>
            <h3 id="contact-form-h">Send a message</h3>
        <form className={styles.form} onSubmit={submit} noValidate aria-label="Contact form" key={preselected}>
          <Field id="c-name" label="Name" error={errs.name}><input id="c-name" name="name" autoComplete="name" aria-invalid={!!errs.name} aria-describedby={errs.name?'c-name-err':undefined}/></Field>
          <Field id="c-email" label="Email" error={errs.email}><input id="c-email" name="email" type="email" autoComplete="email" aria-invalid={!!errs.email} aria-describedby={errs.email?'c-email-err':undefined}/></Field>
          <Field id="c-brand" label="Brand or website"><input id="c-brand" name="brand"/></Field>
          <fieldset className={styles.fieldset}><legend>What you need</legend>{services.filter(s=>s.status!=='hidden').map(s=>(
            <label key={s.slug} className={styles.consent}><input type="checkbox" name="services" value={s.name} defaultChecked={s.slug===preselected}/> {s.name}</label>))}</fieldset>
          <Field id="c-msg" label="Message" error={errs.message}><textarea id="c-msg" name="message" rows={5} aria-invalid={!!errs.message} aria-describedby={errs.message?'c-msg-err':undefined}/></Field>
          <input name="company" tabIndex={-1} autoComplete="off" className={styles.honey} aria-hidden="true"/>
          <button className={styles.submit} disabled={st==='sending'}>Send message</button><StatusMsg state={st}/>
        </form>
          </div>
        </div>
      </div>
    </section>)
}
