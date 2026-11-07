import type { CaseStudy } from '../types/content'
/** Client stories shown under "Selected work" on service pages. mediaIds point at items in projects.ts (proof screenshots or videos). */
const VALENTINO='Buttermilk Agency for Valentino Beauty'
export const caseStudies:CaseStudy[]=[
 // ---- Social Media Management
 {id:'passage-smm',service:'social-media-management',client:'The Passage Co',descriptor:'a Canada-based travel planning brand',
  bullets:['Planned the content calendar and content pillars.','Created Reels and carousels, and published them on schedule.','Used Instagram Insights to see what worked and planned around it.'],
  result:'Result: 84.5K views in September 2026, up 855%.',mediaIds:['passage-insights-before','passage-insights-after'],mediaLabel:'Proof: the before and after Insights screenshots'},
 {id:'fitt-smm',service:'social-media-management',client:'Fitt.Ola',descriptor:'a London fitness influencer',
  bullets:['Supported content, brand partnerships and community.','Assisted in securing a collaboration with Adidas for the Adidas Vibes collection.','Led awareness and curated a mini fundraiser for the London Marathon.'],
  result:'Results: an Adidas and Prozis collaboration, and £2,450 raised for Caudwell Youth, 122% of the target.',mediaIds:['fitt-profile-before','fitt-profile-after','fitt-justgiving'],mediaLabel:'Proof: the before and after profile screenshots, and the fundraiser page'},
 // ---- Virtual Assistant
 {id:'abi-va',service:'virtual-assistant',client:'Abiscentnstuff',descriptor:'a fragrance and beauty page in Minnesota, US',
  bullets:['Pitched brands and followed up until collaborations were confirmed.','Tracked each collaboration, from first message to delivery.','Researched fragrance and beauty trends to guide what content to make.'],
  result:'Result: recurring gifted collaborations with 8+ high-end brands, including Valentino Beauty, Swiss Arabian and Bvlgari.',
  quotes:[{text:"Thank you for taking the time to bring your audience through them... Especially with the launch of Baciami Ancora happening here in the US, we so appreciate you bringing awareness to the new fragrance. I'd love to send another fragrance your way.",attribution:'Influencer agency for Bulgari Perfumes'},
          {text:"We've been loving your content and think you'd be a beautiful fit for our upcoming Summer Fragrance Campaign.",attribution:VALENTINO},
          {text:'Lovely work, everything is approved on my end. This is definitely one of my favourites!!',attribution:VALENTINO}]},
 {id:'wow-va',service:'virtual-assistant',client:'The Wow Brand',descriptor:'2021 to 2023',
  bullets:['Managed client profiles and ran sales presentations backed by market research.','Kept leads warm with regular outreach and follow-up.','Scheduled and posted on Facebook and Instagram to grow traffic.'],testimonialIds:['wow-brand']},
 {id:'passage-va',service:'virtual-assistant',client:'The Passage Co',
  bullets:['Built the content calendar and dashboard the brand now posts from.',"Reviewed the brand's onboarding system."],mediaIds:['passage-dashboard']},
 // ---- Video Editing
 {id:'classic-ve',service:'video-editing',client:'Classic Makeup USA',descriptor:'a beauty brand',
  bullets:['Edit short-form beauty videos for social media.','Match each edit to the content calendar and product launches.'],
  result:'Result: 20 branded videos a month.',mediaIds:['edit-img-4039','nysc-day-1','lmuf-18th'],mediaLabel:'Samples'},
 {id:'abi-ve',service:'video-editing',client:'Abiscentnstuff',descriptor:'a fragrance and beauty page',
  bullets:['Edited fragrance review videos, for example the Valentino Beauty gifted collaboration, the Vervazi paid partnership and a Nigerian wedding GRWM.'],
  quotes:[{text:'Lovely work, everything is approved on my end. This is definitely one of my favourites!!',attribution:VALENTINO+', on the Valentino Beauty content'}],mediaIds:['valentino-pr','vervazi','nigerian-wedding-grwm'],mediaLabel:'Samples'},
 {id:'passage-ve',service:'video-editing',client:'The Passage Co',descriptor:'a travel brand',
  bullets:['Edited destination Reels, for example Zanzibar and Thailand.'],result:'One Reel reached 48.9K views.',mediaIds:['mykonos','zanzibar-older','zanzibar-boat','months-for-bars'],mediaLabel:'Samples'},
 {id:'fitt-ve',service:'video-editing',client:'Fitt.Ola',descriptor:'short-form fitness videos for social media',bullets:[],mediaIds:['edit-turf-games','strava','over-over-again'],mediaLabel:'Samples'},
 {id:'freelance-ve',service:'video-editing',client:'Freelance and other projects',descriptor:'videos not tied to a company I worked for',bullets:[],mediaIds:['vicora-interview'],mediaLabel:'Samples'},
 // ---- Graphics
 {id:'classic-gfx',service:'graphics',client:'Classic Makeup USA',descriptor:'a beauty brand',
  bullets:['A "Shop the look" post with numbered products.','Product ads with prices, including the iPhone Duo post.','A three-product reveal video.','A "What is the correct order?" quiz graphic.','"Screenshot for free" product videos.','A five-slide skin prep carousel.'],
  mediaIds:['gfx-shop-the-look','gfx-ad-duo','gfx-ad-sunscreen','gfx-three-products','gfx-correct-order','gfx-free-sunscreen','gfx-free-mist-seal','gfx-skinprep-1','gfx-skinprep-2','gfx-skinprep-3','gfx-skinprep-4','gfx-skinprep-5'],mediaLabel:'Selected pieces'},
 {id:'passage-gfx',service:'graphics',client:'The Passage Co',descriptor:'a travel brand',
  bullets:['Destination spotlight graphics.'],mediaIds:['gfx-zanzibar','gfx-dominican','gfx-thailand','gfx-mykonos'],mediaLabel:'Destination spotlights'}]
