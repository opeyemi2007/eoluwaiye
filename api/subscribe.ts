// Vercel serverless function. Needs explicit consent. Adds the subscriber to MailerLite when MAILERLITE_API_KEY is set;
// otherwise, if Resend is configured, emails the sign-up to Esther's inbox so no sign-up is lost.
const json=(b:unknown,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{'Content-Type':'application/json'}})
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const esc=(s:string)=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]!)
export async function POST(request:Request){
  let b:Record<string,unknown>
  try{b=await request.json()}catch{return json({ok:false,error:'Invalid request'},400)}
  const name=typeof b.name==='string'?b.name.trim().slice(0,100):'',email=typeof b.email==='string'?b.email.trim().slice(0,200):''
  if(!name||!EMAIL.test(email)||b.consent!==true)return json({ok:false,error:'Please check your details.'},400)
  const {MAILERLITE_API_KEY,MAILERLITE_GROUP_ID,RESEND_API_KEY,CONTACT_TO_EMAIL,CONTACT_FROM_EMAIL}=process.env
  try{
    if(MAILERLITE_API_KEY){
      const r=await fetch('https://connect.mailerlite.com/api/subscribers',{method:'POST',
        headers:{Authorization:`Bearer ${MAILERLITE_API_KEY}`,'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify({email,fields:{name},...(MAILERLITE_GROUP_ID?{groups:[MAILERLITE_GROUP_ID]}:{})})})
      return r.ok?json({ok:true}):json({ok:false,error:'Signup failed'},502)
    }
    if(RESEND_API_KEY&&CONTACT_TO_EMAIL&&CONTACT_FROM_EMAIL){
      const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},
        body:JSON.stringify({from:CONTACT_FROM_EMAIL,to:[CONTACT_TO_EMAIL],reply_to:email,subject:`New email list sign-up: ${name}`,
          html:`<p><b>Name:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(email)}</p><p>Agreed to receive emails (ticked on the website) at ${new Date().toISOString()}. Source: portfolio-site.</p>`})})
      return r.ok?json({ok:true}):json({ok:false,error:'Signup failed'},502)
    }
    return json({ok:false,error:'Not configured'},503)
  }catch{return json({ok:false,error:'Signup failed'},502)}
}
