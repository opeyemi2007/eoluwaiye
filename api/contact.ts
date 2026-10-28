// Vercel serverless function. Delivers enquiries via Resend. Secrets stay in server env vars.
const json=(b:unknown,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{'Content-Type':'application/json'}})
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const esc=(s:string)=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]!)
export async function POST(request:Request){
  let b:Record<string,unknown>
  try{b=await request.json()}catch{return json({ok:false,error:'Invalid request'},400)}
  const str=(k:string,max:number)=>typeof b[k]==='string'?(b[k] as string).trim().slice(0,max):''
  if(str('company',200))return json({ok:true}) // honeypot filled: silently drop
  const name=str('name',100),from=str('email',200),brand=str('brand',200),message=str('message',4000)
  const services=Array.isArray(b.services)?b.services.filter((s):s is string=>typeof s==='string').slice(0,5).map(s=>s.slice(0,60)):[]
  if(!name||!EMAIL.test(from)||message.length<10)return json({ok:false,error:'Please check your details.'},400)
  const {RESEND_API_KEY,CONTACT_TO_EMAIL,CONTACT_FROM_EMAIL}=process.env
  if(!RESEND_API_KEY||!CONTACT_TO_EMAIL||!CONTACT_FROM_EMAIL)return json({ok:false,error:'Not configured'},503)
  try{
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},
      body:JSON.stringify({from:CONTACT_FROM_EMAIL,to:[CONTACT_TO_EMAIL],reply_to:from,subject:`New enquiry from ${name}`,
        html:`<p><b>Name:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(from)}</p><p><b>Brand:</b> ${esc(brand||'-')}</p><p><b>Needs:</b> ${esc(services.join(', ')||'-')}</p><p>${esc(message).replace(/\n/g,'<br>')}</p>`})})
    return r.ok?json({ok:true}):json({ok:false,error:'Delivery failed'},502)
  }catch{return json({ok:false,error:'Delivery failed'},502)}
}
