import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'
/** Decorative, transform-only float. Idle when inactive or reduced-motion. */
export function FloatItem({active,dx=0,dy=-14,dur=6,delay=0,style,className,children}:{active:boolean;dx?:number;dy?:number;dur?:number;delay?:number;style?:CSSProperties;className?:string;children:ReactNode}){
  const reduce=useReducedMotion()
  const on=active&&!reduce
  return <motion.div className={className} style={{position:'absolute',...style}}
    animate={on?{x:[0,dx,0],y:[0,dy,0],rotate:[0,dx>0?1.5:-1.5,0]}:{x:0,y:0,rotate:0}}
    transition={on?{duration:dur,delay,repeat:Infinity,ease:'easeInOut'}:{duration:.2}}>{children}</motion.div>
}
