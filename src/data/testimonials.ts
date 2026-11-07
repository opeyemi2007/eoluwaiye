import type { Testimonial } from '../types/content'
/**
 * Only REAL, approved quotes go here (never write or reword a client's words).
 * The section appears automatically once one entry has approval:'approved'. Template:
 * {id:'x',quote:'Their exact words.',name:'Client name',role:'Role',brand:'Brand',link:'https://…',image:'/clients/photo.png',service:'ugc',approval:'approved'}
 * service is one of: social-media-management | virtual-assistant | video-editing | ugc | graphics
 */
export const testimonials:Testimonial[]=[
  {id:'wow-brand',quote:'I had the pleasure of working with Esther on several projects, and I was consistently impressed by her exceptional work ethic and attention to detail... Esther was an invaluable team member, always willing to lend a hand and offer support when needed.',name:'Olayinka Oguntoyinbo',role:'Owner',brand:'The Wow Brand',service:'virtual-assistant',approval:'approved'}]
