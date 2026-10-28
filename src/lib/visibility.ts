import type { Project, ResultItem, Testimonial } from '../types/content'
/** Single gate: unapproved content never reaches a public page. */
export const publicProjects=(p:Project[])=>p.filter(x=>x.approval==='approved'&&x.permission)
export const publicResults=(r:ResultItem[])=>r.filter(x=>x.visible&&x.verified&&x.permission)
export const publicTestimonials=(t:Testimonial[])=>t.filter(x=>x.approval==='approved')
export const showTestimonials=(t:Testimonial[])=>publicTestimonials(t).length>=2
