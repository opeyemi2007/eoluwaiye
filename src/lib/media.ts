import type { SyntheticEvent } from 'react'
/** Images, logos and small clips live in src/assets so they travel with the code. media('/work/x.webp') returns the bundled URL.
 *  If a file is missing it returns the plain path (a 404), which the gallery shows as an "Image not found" box and the dev notice names. */
const files=import.meta.glob('../assets/**/*.{webp,png,jpg,jpeg,svg,mp4}',{eager:true,query:'?url',import:'default'}) as Record<string,string>
const index:Record<string,string>={}
for(const[k,v]of Object.entries(files))index['/'+k.replace('../assets/','')]=v
export const media=(path:string)=>index[path]??path
export const isBundled=(url:string)=>!/^\/(work|clients|brand)\//.test(url)
/** A thumbnail that fails to load becomes a neutral placeholder, and the console names the missing file. */
export const imgFallback=(e:SyntheticEvent<HTMLImageElement>)=>{
  const t=e.currentTarget;if(t.dataset.fb)return;t.dataset.fb='1'
  console.error(`[media] could not load ${t.getAttribute('src')}. The file is missing from src/assets (run: node scripts/check-media.mjs to list what is missing).`)
  t.src=media('/work/image-placeholder.svg')
}
