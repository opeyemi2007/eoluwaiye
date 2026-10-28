import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { track } from '../../lib/analytics'
import { ENDPOINTS, isEmail, postJson, type SubmitState } from '../../lib/forms'
import { Field, StatusMsg } from './Field'
import styles from '../sections/Sections.module.css'
export function Newsletter(){
  const [st,setSt]=useState<SubmitState>('idle'),[errs,setErrs]=useState<Record<string,string>>({})
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();const f=new FormData(e.currentTarget)
    const name=String(f.get('name')).trim(),email=String(f.get('email')).trim(),e2:Record<string,string>={}
    if(!name)e2.name='Please enter your name.'
    if(!isEmail(email))e2.email='Please enter a valid email address.'
    if(!f.get('consent'))e2.consent='Please tick the box to join the list.'
    setErrs(e2);if(Object.keys(e2).length||f.get('company'))return
    setSt('sending');const r=await postJson(ENDPOINTS.newsletter,{name,email,consent:true,source:'portfolio-site'});setSt(r);if(r==='success')track('newsletter_signup')
  }
  return(
    <form className={`${styles.form} ${styles.news}`} onSubmit={submit} noValidate aria-labelledby="news-h">
      <h3 id="news-h">Stay in the loop.</h3><p>Get occasional notes on content, social media, and creative work worth sharing. No noise, just useful things.</p>
      <Field id="n-name" label="Name" error={errs.name}><input id="n-name" name="name" autoComplete="name" aria-invalid={!!errs.name} aria-describedby={errs.name?'n-name-err':undefined}/></Field>
      <Field id="n-email" label="Email address" error={errs.email}><input id="n-email" name="email" type="email" autoComplete="email" aria-invalid={!!errs.email} aria-describedby={errs.email?'n-email-err':undefined}/></Field>
      <input name="company" tabIndex={-1} autoComplete="off" className={styles.honey} aria-hidden="true"/>
      <div className={styles.field}><label className={styles.consent}><input type="checkbox" name="consent"/> I agree to receive emails from Esther. I can unsubscribe any time.</label>
        {errs.consent&&<p className={styles.err}>{errs.consent}</p>}<p className={styles.small}><Link to="/privacy">Privacy Policy</Link></p></div>
      <button className={styles.submit} disabled={st==='sending'}>Join the List</button><StatusMsg state={st}/>
    </form>)
}
