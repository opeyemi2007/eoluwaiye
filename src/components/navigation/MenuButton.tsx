import { forwardRef } from 'react'
import { Menu } from 'lucide-react'
import styles from './Menu.module.css'
export const MenuButton=forwardRef<HTMLButtonElement,{onClick:()=>void;onRed?:boolean;expanded:boolean}>(
  ({onClick,onRed,expanded},ref)=>(
    <button ref={ref} type="button" onClick={onClick} aria-haspopup="dialog" aria-expanded={expanded}
      className={`${styles.btn} ${onRed?styles.btnRed:''}`}><Menu size={20} aria-hidden="true"/> Menu</button>))
MenuButton.displayName='MenuButton'
