import { Link } from 'react-router-dom'
import { Logo } from '../common/Logo'
import { serviceLinks } from '../../data/navigation'
import { SocialLinks } from '../common/SocialLinks'
import { site } from '../../data/site'
import styles from '../sections/Sections.module.css'
export function Footer(){
  return(
    <footer className={`${styles.footer} on-red`}>
      <div className={`container ${styles.footGrid}`}>
        <div><Logo variant="wordmark" height={44}/><SocialLinks/></div>
        <nav aria-label="Footer services"><h2>Services</h2><ul>{serviceLinks.map(l=><li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul></nav>
        <nav aria-label="Footer"><h2>Site</h2><ul><li><Link to="/#about">About</Link></li><li><Link to="/#contact">Contact</Link></li><li><Link to="/privacy">Privacy Policy</Link></li></ul></nav>
      </div>
      <p className={`container ${styles.copy}`}>© {new Date().getFullYear()} {site.name}</p>
    </footer>)
}
