import type { SyntheticEvent } from 'react'
/** A thumbnail that fails to load becomes a neutral placeholder, and the console names the missing file so it is easy to fix. */
export const imgFallback=(e:SyntheticEvent<HTMLImageElement>)=>{
  const t=e.currentTarget;if(t.dataset.fb)return;t.dataset.fb='1'
  console.error(`[media] could not load ${t.getAttribute('src')}. Copy the matching file into /public (run: node scripts/check-media.mjs to list what is missing).`)
  t.src='/work/image-placeholder.svg'
}
