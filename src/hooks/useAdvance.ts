import { useEffect, useRef } from 'react'
/** Advances the staged intro on wheel-down, swipe-up or ArrowDown/PageDown. Never traps: buttons always work too. */
export function useAdvance(active:boolean,onAdvance:()=>void){
  const cb=useRef(onAdvance);cb.current=onAdvance
  useEffect(()=>{
    if(!active)return
    let lock=false,y=0
    const go=()=>{if(lock)return;lock=true;cb.current();setTimeout(()=>{lock=false},900)}
    const wheel=(e:WheelEvent)=>{if(e.deltaY>24)go()}
    const ts=(e:TouchEvent)=>{y=e.touches[0].clientY}
    const te=(e:TouchEvent)=>{if(y-e.changedTouches[0].clientY>50)go()}
    const key=(e:KeyboardEvent)=>{if(e.key==='ArrowDown'||e.key==='PageDown')go()}
    window.addEventListener('wheel',wheel,{passive:true});window.addEventListener('touchstart',ts,{passive:true})
    window.addEventListener('touchend',te,{passive:true});window.addEventListener('keydown',key)
    return()=>{window.removeEventListener('wheel',wheel);window.removeEventListener('touchstart',ts)
      window.removeEventListener('touchend',te);window.removeEventListener('keydown',key)}
  },[active])
}
