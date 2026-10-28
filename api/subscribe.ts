// Vercel serverless function. Adds a subscriber to MailerLite (v2 API). Requires explicit consent.
const json=(b:unknown,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{'Content-Type':'application/json'}})
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export async function POST(request:Request){
  let b:Record<string,unknown>
  try{b=await request.json()}catch{return json({ok:false,error:'Invalid request'},400)}
  const name=typeof b.name==='string'?b.name.trim().slice(0,100):'',email=typeof b.email==='string'?b.email.trim().slice(0,200):''
  if(!name||!EMAIL.test(email)||b.consent!==true)return json({ok:false,error:'Please check your details.'},400)
  const {MAILERLITE_API_KEY,MAILERLITE_GROUP_ID}=process.env
  if(!MAILERLITE_API_KEY)return json({ok:false,error:'Not configured'},503)
  try{
    const r=await fetch('https://connect.mailerlite.com/api/subscribers',{method:'POST',
      headers:{Authorization:`Bearer ${MAILERLITE_API_KEY}`,'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify({email,fields:{name},...(MAILERLITE_GROUP_ID?{groups:[MAILERLITE_GROUP_ID]}:{})})})
    return r.ok?json({ok:true}):json({ok:false,error:'Signup failed'},502)
  }catch{return json({ok:false,error:'Signup failed'},502)}
}
