// Run: node scripts/check-media.mjs   Lists every image/video/logo file the site refers to but /public does not contain.
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
const root=process.cwd(),pub=p=>join(root,/^\/(work|clients|brand)\//.test(p)?'src/assets':'public',p.replace(/^\//,''))
const read=f=>readFileSync(join(root,f),'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/gm,'') // ignore comments
const src=['src/data/projects.ts','src/data/site.ts','src/data/clients.ts','src/data/testimonials.ts','src/components/sections/About.tsx','src/components/hero/Hero.tsx','src/components/projects/Gallery.tsx','src/components/common/Logo.tsx','src/lib/media.ts'].map(read).join('\n')
const need=new Set()
for(const m of src.matchAll(/\bimg\('([^']+)'\)/g)){need.add(`/work/${m[1]}.webp`);need.add(`/work/${m[1]}-t.webp`)}
for(const m of src.matchAll(/\bclip\('([^']+)'\)/g)){need.add(`/work/video/${m[1]}.mp4`);need.add(`/work/${m[1]}-poster.jpg`)}
for(const m of src.matchAll(/'(\/(?:work|clients|brand)\/[^'$`]+\.(?:webp|png|jpg|jpeg|svg|mp4))'/g))need.add(m[1])
// small card art used by the service cards
const cards=read('src/components/services/ServiceCards.tsx')
for(const m of cards.matchAll(/'((?:gfx|edit|alx|ai|ugc|va)[a-z0-9-]*(?:-s)?\.(?:webp|jpg))'/g))need.add(`/work/${m[1]}`)
for(const m of cards.matchAll(/'(gfx-[a-z0-9-]+)'/g))need.add(`/work/${m[1]}-s.webp`)
for(const f of ['public/Oluwaiye-Favour-Esther-CV-2026.pdf'])if(!existsSync(join(root,f)))need.add('/'+f.replace('public/',''))
const missing=[...need].filter(p=>!existsSync(pub(p))).sort()
console.log(`${need.size} files referenced, ${missing.length} missing.`)
if(missing.length){console.log('\nMissing (copy these from the project zip into the same folders):');missing.forEach(m=>console.log('  '+(/^\/(work|clients|brand)\//.test(m)?'src/assets':'public')+m));process.exit(1)}
