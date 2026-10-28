import type { ServiceSlug } from '../types/content'
export interface Client{id:string;name:string;logo:string;services:ServiceSlug[];permission:boolean}
/** Logos supplied by Esther. Set permission:false to hide a client everywhere. */
export const clients:Client[]=[
  {id:'passage-co',name:'The Passage Co',logo:'/clients/passage-co.webp',services:['social-media-management','graphics'],permission:true},
  {id:'classic-makeup-usa',name:'Classic Makeup USA',logo:'/clients/classic-makeup-usa.png',services:['video-editing','graphics'],permission:true},
  {id:'veron',name:'Veron Beauty and Lifestyle',logo:'/clients/veron.png',services:['video-editing'],permission:true},
  {id:'vicora-home-decor',name:'Vicora Home | Decor',logo:'/clients/vicora-home-decor.png',services:[],permission:true},
  {id:'vicora-luxe-interior',name:'Vicora Luxe Interior',logo:'/clients/vicora-luxe-interior.png',services:[],permission:true},
  {id:'classic-skincare',name:'Classic Skincare',logo:'/clients/classic-skincare.png',services:[],permission:true},
  {id:'mamarazzi',name:'Mamarazzi',logo:'/clients/mamarazzi.png',services:[],permission:true},
  // Green "+F" logo: shown at Esther's request. Name still to confirm; add it to `name` and it appears as the label/alt text.
  {id:'green-f-logo',name:'',logo:'/clients/unnamed-green.png',services:[],permission:true}]
export const publicClients=(c:Client[]=clients)=>c.filter(x=>x.permission)
