import { writeFileSync, mkdirSync } from 'node:fs'
import { loadEnv } from 'vite'
const url=(loadEnv('production',process.cwd(),'VITE_').VITE_SITE_URL||'').replace(/\/$/,'')
// Graphics is "coming soon" so it is left out until real samples exist.
const paths=['/','/social-media-management','/virtual-assistant','/video-editing','/ugc','/graphics','/privacy']
mkdirSync('dist',{recursive:true})
writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\n${url?`Sitemap: ${url}/sitemap.xml\n`:''}`)
if(url)writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p=>`<url><loc>${url}${p}</loc></url>`).join('\n')}\n</urlset>\n`)
else console.warn('VITE_SITE_URL not set: sitemap.xml skipped (needs the final domain).')
