import type { NavItem } from '../types/content'
import { services } from './services'
export const sectionLinks:NavItem[]=[
{label:'Testimonials',to:'testimonials',kind:'section'},{label:'How I Work',to:'how-i-work',kind:'section'},{label:'About',to:'about',kind:'section'},{label:'What I Can Do for You',to:'what-i-do',kind:'section'},{label:'Contact',to:'contact',kind:'section'}]
export const serviceLinks:NavItem[]=services.map(s=>({label:s.name,to:`/${s.slug}`,kind:'route'}))
export const jumpLinks:NavItem[]=[...serviceLinks,...sectionLinks]
