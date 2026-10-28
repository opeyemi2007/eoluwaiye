import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
export function Reveal({children,delay=0,className}:{children:ReactNode;delay?:number;className?:string}){
  const reduce=useReducedMotion()
  return <motion.div className={className} initial={reduce?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
    viewport={{once:true,margin:'-8% 0px'}} transition={{type:'spring',stiffness:110,damping:20,delay}}>{children}</motion.div>
}
