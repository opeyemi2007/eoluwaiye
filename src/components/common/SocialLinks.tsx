import { Mail } from 'lucide-react'
import { FaInstagram, FaTiktok, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { site } from '../../data/site'
import styles from './SocialLinks.module.css'
const icons:Record<string,React.ComponentType<{size?:number;'aria-hidden'?:boolean}>>={Email:Mail,Instagram:FaInstagram,TikTok:FaTiktok,WhatsApp:FaWhatsapp,LinkedIn:FaLinkedinIn}
/** Icons link only to URLs Esther has supplied. A handle without a verified URL shows as plain (non-link) text. */
export function SocialLinks(){
  return(
    <ul className={styles.list} aria-label="Contact and social links">{site.channels.map(c=>{
      const Icon=icons[c.label];if(!Icon||(!c.href&&!c.handle))return null
      if(!c.href)return <li key={c.label}><span className={styles.static}>{c.label}: {c.value}</span></li>
      const mail=c.href?.startsWith('mailto:')
      return <li key={c.label}>{c.href
        ?<a className={mail?styles.mail:styles.link} href={c.href} aria-label={mail?`${c.label}: ${c.value}`:`${c.label} ${c.value}, opens in a new tab`} {...(mail?{}:{target:'_blank',rel:'noopener noreferrer'})}><Icon size={22} aria-hidden={true}/>{mail&&<span>{c.value}</span>}</a>
        :null}</li>})}
    </ul>)
}
