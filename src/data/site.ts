const env=import.meta.env
/** Everything here is editable. Empty/undefined means the related UI is hidden, never faked. */
export const site={
  name:'Oluwaiye Favour Esther',
  email:'eoluwaiye@gmail.com',
  whatsappNumber:(env.VITE_WHATSAPP_NUMBER as string|undefined)||'2348168712261', // from her CV; digits only, with country code
  responseTime:undefined as string|undefined, // e.g. 'I reply within 24 hours on weekdays.' once Esther confirms
  bookingUrl:env.VITE_BOOKING_URL as string|undefined,
  cvUrl:(env.VITE_CV_URL as string|undefined)||'/Oluwaiye-Favour-Esther-CV-2026.pdf', // PDF supplied by Esther, in /public
  cvFileName:'Oluwaiye-Favour-Esther-CV-2026.pdf',
  channels:[
    {label:'Email',value:'eoluwaiye@gmail.com',href:'mailto:eoluwaiye@gmail.com'},
    {label:'WhatsApp',value:'Message on WhatsApp',href:(env.VITE_WHATSAPP_URL as string|undefined)||`https://wa.me/${(env.VITE_WHATSAPP_NUMBER as string|undefined)||'2348168712261'}`},
    {label:'Instagram',value:'@petitefave',handle:true,href:(env.VITE_INSTAGRAM_URL as string|undefined)||'https://www.instagram.com/petitefave/'},
    {label:'TikTok',value:'@petitefave__ugc',handle:true,href:(env.VITE_TIKTOK_URL as string|undefined)||'https://www.tiktok.com/@petitefave__ugc'}, // built from the handles Esther gave; override with the env var if the profile URL differs
    {label:'LinkedIn',value:'LinkedIn',href:env.VITE_LINKEDIN_URL as string|undefined}],
  /** About copy supplied by Esther (verbatim). */
  bio:["I'm Esther, a social media manager and virtual assistant. For 4+ years I've helped brands in beauty, fashion, fitness and wellness show up online in a way that actually works.","I studied Mathematics, so I don't guess. I check what people watch, what they skip and what makes them follow, then I build the next post around that. It's why I edit 20 branded beauty videos a month for a US beauty brand, and how I secured gifted collaborations with fragrance and beauty brands for a US client.","Outside of this, I create UGC for beauty, fragrance and lifestyle brands, and on my own page, Petitefave, I share beauty and fragrance content.","I like clear briefs, honest feedback and clients who reply. If that sounds like you, let's talk."],
  facts:[
    {label:'Full name',value:'Oluwaiye Favour Esther'},
    {label:'Works',value:'Remotely, with brands in the US, UK and Canada'},
    {label:'Experience',value:'4+ years'},
    {label:'Education',value:'BSc Mathematics, Lagos State University, 2024'},
    {label:'Tools',value:'CapCut, Canva, Trello, Instagram Insights, Google Workspace',wide:true}],
}
/** Certificate file supplied by Esther (issue date on the certificate: 14 March 2025). */
export const certifications=[
  {id:'alx-va',issuer:'ALX Africa',title:'Virtual Assistant',year:'2025',w:1280,h:720,file:'/work/alx-va-certificate.png',alt:'ALX Africa Virtual Assistant certificate of achievement issued to Favour Oluwaiye, March 2025, with two signatures and a verification QR code',verified:true},
  {id:'ai-fluency',issuer:'Anthropic',title:'AI Fluency: Framework & Foundations',year:'2026',w:1650,h:1275,file:'/work/ai-fluency-certificate.webp',alt:'Anthropic certificate of completion for AI Fluency: Framework and Foundations, awarded to Favour Oluwaiye',verified:true}]
