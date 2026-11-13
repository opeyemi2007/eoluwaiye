import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Dev only: serves /api/* from the files in /api so the forms work with `npm run dev`.
 *  Server variables (RESEND_API_KEY etc.) are read from .env.local. Production uses Vercel's own functions. */
function apiDev(mode:string):Plugin{
  return{
    name:'api-dev',apply:'serve',
    configureServer(server){
      Object.assign(process.env,loadEnv(mode,process.cwd(),''))
      server.middlewares.use(async(req,res,next)=>{
        const m=(req.url||'').match(/^\/api\/([a-z-]+)(?:\?.*)?$/)
        if(!m)return next()
        try{
          const mod=await server.ssrLoadModule(`/api/${m[1]}.ts`)
          const method=(req.method||'GET').toUpperCase()
          const handler=mod[method] as ((r:Request)=>Promise<Response>)|undefined
          if(!handler){res.statusCode=405;res.end();return}
          const chunks:Buffer[]=[];for await(const c of req)chunks.push(c as Buffer)
          const headers:Record<string,string>={};for(const[k,v]of Object.entries(req.headers))if(typeof v==='string'&&k!=='content-length')headers[k]=v
          const r=await handler(new Request(`http://localhost${req.url}`,{method,headers,body:method==='GET'||method==='HEAD'?undefined:Buffer.concat(chunks)}))
          res.statusCode=r.status;r.headers.forEach((v,k)=>res.setHeader(k,v));res.end(Buffer.from(await r.arrayBuffer()))
        }catch(e){res.statusCode=500;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({ok:false,error:String(e)}))}
      })
    }}
}
export default defineConfig(({mode})=>({plugins:[react(),apiDev(mode)]}))
