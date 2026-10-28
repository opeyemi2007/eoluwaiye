import { Link } from 'react-router-dom'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'
type Variant='primary'|'secondary'|'ghost'
interface Common{variant?:Variant;children:ReactNode;className?:string}
export function Button({variant='primary',children,className='',...r}:Common&ButtonHTMLAttributes<HTMLButtonElement>){
  return <button className={`${styles.btn} ${styles[variant]} ${className}`} {...r}>{children}</button>}
export function ButtonLink({to,variant='primary',children,className=''}:Common&{to:string}){
  return <Link to={to} className={`${styles.btn} ${styles[variant]} ${className}`}>{children}</Link>}
