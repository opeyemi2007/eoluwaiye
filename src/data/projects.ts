import type { Project } from '../types/content'
const base=((import.meta.env.VITE_MEDIA_BASE as string|undefined)||'/media').replace(/\/$/,'')
const img=(id:string)=>({mediaUrl:`/work/${id}.webp`,thumbnail:`/work/${id}-t.webp`,mediaType:'image' as const})
const vid=(id:string)=>({mediaUrl:`${base}/${id}.mp4`,thumbnail:`/work/${id}-poster.jpg`,mediaType:'video' as const})
/** Cloudinary-hosted video: use the full HTTPS URL as-is. The poster is a still frame 1.5s in that Cloudinary generates by inserting a transformation before the version segment. */
const cloudPoster=(url:string)=>url.replace('/video/upload/','/video/upload/so_1.5,w_720,c_limit,q_auto/').replace(/\.[a-z0-9]+$/i,'.jpg')
const cloud=(url:string)=>({mediaUrl:url,thumbnail:cloudPoster(url),mediaType:'video' as const})
const CL='https://res.cloudinary.com/nrldqjoh/video/upload'
const ok={approval:'approved' as const,permission:true}
const pc=['graphics','social-media-management'] as Project['services']
/** Supplied by Esther. Attributions stay neutral where the client isn't visible in the work. Add result/featured only when verified. */
export const projects:Project[]=[
  {id:'gfx-zanzibar',title:'Zanzibar destination post',services:pc,attribution:'The Passage Co',...img('gfx-zanzibar'),alt:'Travel post reading View Zanzibar from our lens, with overwater huts on a jetty over turquoise water',caption:'Destination post design',...ok},
  {id:'gfx-dominican',title:'Dominican Republic destination post',services:pc,attribution:'The Passage Co',...img('gfx-dominican'),alt:'Travel post reading View Dominican Republic from our lens, with a heart-shaped palm frame on a beach',caption:'Destination post design',...ok},
  {id:'gfx-thailand',title:'Thailand destination post',services:pc,attribution:'The Passage Co',...img('gfx-thailand'),alt:'Red travel post reading View Thailand from our lens, with a temple lit at dusk',caption:'Destination post design',...ok},
  {id:'gfx-mykonos',title:'Mykonos destination post',services:pc,attribution:'The Passage Co',...img('gfx-mykonos'),alt:'Red travel post reading View Mykonos from our lens, with a blue-domed church and pink flowers',caption:'Destination post design',...ok},
  {id:'gfx-review-post',title:'Client review post',services:pc,attribution:'The Passage Co',...img('gfx-review-post'),alt:'Red post with a large quote mark, a traveller review and a group photo',caption:'Review post design',...ok},
  {id:'gfx-invitation',title:'Event invitation',services:['graphics'],attribution:'Classic Makeup USA',...img('gfx-invitation'),alt:'Cream invitation card with a red wax seal on a dark red background',caption:'Wax-sealed invitation graphic',...ok},
  {id:'gfx-ad-duo',title:'Two-product promo',services:['graphics'],attribution:'Classic Makeup USA',...img('gfx-ad-duo'),alt:'Promo graphic with a folding phone on a blue panel above a sunscreen tube on a cream panel, both with prices',caption:'Two-product promo with pricing',...ok},
  {id:'gfx-ad-sunscreen',title:'Sunscreen promo',services:['graphics'],attribution:'Classic Makeup USA',...img('gfx-ad-sunscreen'),alt:'Promo graphic with a smiling woman holding a sunscreen tube, with price and product details',caption:'Product promo with photo and pricing',...ok},
  {id:'ugc-lip-demo',title:'Lip product demo',services:['ugc'],attribution:'UGC',...vid('ugc-lip-demo'),alt:'Hands holding lip products with on-screen callouts',caption:'Vertical product demo with on-screen callouts',...ok},
  {id:'ugc-lifestyle',title:'Lifestyle UGC',services:['ugc'],attribution:'UGC',...cloud(`${CL}/v1793149323/Img_8339.mp4`),alt:'Woman in a white robe at home, with captions over the video',caption:'Lifestyle video with captions',...ok},
  {id:'edit-fragrance',title:'Fragrance talking-head edit',services:['video-editing'],attribution:'Video edit',...cloud(`${CL}/v1793149443/Img_3394.mp4`),alt:'Woman talking to camera holding a fragrance bottle, with animated word captions',caption:'Talking-head edit with animated word captions',...ok},
  {id:'edit-greece',title:'Greece travel reel',services:['video-editing'],attribution:'Video edit',...cloud(`${CL}/v1793149395/Img_5716.mp4`),alt:'Travel reel with a pool, a title reading Greece behind the people walking, and a wine cellar',caption:'Travel reel with a text-behind-subject effect',...ok},
  {id:'edit-veron',title:'Brand promo',services:['video-editing'],attribution:'Veron Beauty and Lifestyle',...vid('edit-veron'),alt:'Landscape promo with a woman seated beside the Veron title, then salon scenes',caption:'Landscape promo edit',...ok},
  // Added from Cloudinary. Temporary titles from filenames: edit title/alt/caption/attribution below. Approval follows Esther's blanket client permission; set permission:false to hide any item.
  {id:'ugc-img-6699',title:'UGC video 6699',services:['ugc'],attribution:'UGC',...cloud(`${CL}/v1793149343/Img_6699.mp4`),alt:'Preview frame of UGC video 6699',caption:'UGC video',...ok},
  {id:'ugc-img-8600',title:'UGC video 8600',services:['ugc'],attribution:'UGC',...cloud(`${CL}/v1793149312/Img_8600.mp4`),alt:'Preview frame of UGC video 8600',caption:'UGC video',...ok},
  {id:'ugc-img-3137',title:'UGC video 3137',services:['ugc'],attribution:'UGC',...cloud(`${CL}/v1793149307/Img_3137.mp4`),alt:'Preview frame of UGC video 3137',caption:'UGC video',...ok},
  {id:'ugc-img-4038',title:'UGC video 4038',services:['ugc'],attribution:'UGC',...cloud(`${CL}/v1793149305/Img_4038.mp4`),alt:'Preview frame of UGC video 4038',caption:'UGC video',...ok},
  {id:'edit-turf-games',title:'Turf Games',services:['video-editing'],attribution:'Video edit',...cloud(`${CL}/v1793149420/Turf_Games.mp4`),alt:'Preview frame of the Turf Games video',caption:'Video edit',...ok},
  {id:'edit-img-4039',title:'Video edit 4039',services:['video-editing'],attribution:'Video edit',...cloud(`${CL}/v1793149402/Img_4039.mp4`),alt:'Preview frame of video edit 4039',caption:'Video edit',...ok},
  {id:'edit-img-0019',title:'Video edit 0019',services:['video-editing'],attribution:'Video edit',...cloud(`${CL}/v1793149394/Img_0019.mp4`),alt:'Preview frame of video edit 0019',caption:'Video edit',...ok},
]
