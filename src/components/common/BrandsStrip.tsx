import { publicClients } from '../../data/clients'
import styles from './BrandsStrip.module.css'
export function BrandsStrip(){
  const list=publicClients();if(!list.length)return null
  return(
    <section className={`container ${styles.wrap}`} aria-labelledby="brands-h">
      <h2 id="brands-h" className={styles.h}>Brands I've worked with</h2>
      <ul className={styles.list}>{list.map(c=><li key={c.id}><img src={c.logo} alt={c.name?`${c.name} logo`:"Client logo"} height={40} loading="lazy"/></li>)}</ul>
    </section>)
}
