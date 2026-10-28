import styles from './Logo.module.css'
const RATIO={wordmark:680/144,lettermark:364/174}
const SRC={wordmark:{dark:'/brand/wordmark-dark.png',light:'/brand/wordmark-light.png'},lettermark:{dark:'/brand/eo-dark.png',light:'/brand/eo-light.png'}}
/** Wordmark ("eoluwaiye.") is for the intro and footer only. The lettermark ("eo.") is used everywhere else. Light art shows automatically on .on-red backgrounds. */
export function Logo({variant='lettermark',height}:{variant?:'wordmark'|'lettermark';height?:number}){
  const h=height??(variant==='wordmark'?30:36),w=Math.round(h*RATIO[variant])
  return(
    <span className={styles.logo} role="img" aria-label="eoluwaiye" style={{height:h}}>
      <img className={styles.dark} src={SRC[variant].dark} alt="" aria-hidden="true" width={w} height={h}/>
      <img className={styles.light} src={SRC[variant].light} alt="" aria-hidden="true" width={w} height={h}/>
    </span>)
}
