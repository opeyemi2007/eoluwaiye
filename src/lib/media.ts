import type { SyntheticEvent } from 'react'
/** Swap a failed thumbnail for a neutral placeholder once, so the gallery never shows a broken image. */
export const imgFallback=(e:SyntheticEvent<HTMLImageElement>)=>{const t=e.currentTarget;if(t.dataset.fb)return;t.dataset.fb='1';t.src='/work/video-placeholder.svg'}
