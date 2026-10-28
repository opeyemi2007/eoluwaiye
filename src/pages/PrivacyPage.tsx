import { useSeo } from '../hooks/useSeo'
import { site } from '../data/site'
import styles from './Privacy.module.css'
export default function PrivacyPage(){
  useSeo('Privacy Policy | Esther','How this website collects and uses information from the contact form and email list.')
  return(
    <main id="main" className={`container ${styles.wrap}`}>
      <h1>Privacy Policy</h1>
      <p className={styles.notice} role="note"><strong>Draft for final review.</strong> Items marked “To confirm” must be checked against the services actually used before launch. This is not legal advice.</p>
      <h2>Who is responsible</h2><p>This website belongs to {site.name}. Contact: <a href={`mailto:${site.email}`}>{site.email}</a>. <em>To confirm: legal entity and business address, if any.</em></p>
      <h2>What I collect</h2>
      <ul><li><strong>Contact form:</strong> your name, email, brand or website, the services you pick and your message. Used only to reply to your enquiry.</li>
      <li><strong>Email list:</strong> your name and email, and a record that you agreed to receive emails. Used to send content tips and news. You can unsubscribe at any time using the link in every email.</li>
      <li><strong>Site statistics:</strong> if enabled, privacy-friendly page-view counts and button clicks (no names, emails or message text are sent). <em>To confirm: provider and whether it sets cookies.</em></li></ul>
      <h2>Who processes it</h2>
      <ul><li>Contact enquiries are delivered by an email delivery service (currently configured as Resend). <em>To confirm.</em></li>
      <li>Email list sign-ups are stored with an email marketing provider (currently configured as MailerLite). <em>To confirm, including double opt-in.</em></li>
      <li>The site is hosted by a hosting provider. <em>To confirm.</em></li></ul>
      <h2>How long I keep it</h2><p><em>To confirm:</em> retention period for enquiries. Email list entries are kept until you unsubscribe or ask me to delete them.</p>
      <h2>Your rights</h2><p>You can ask to see, correct or delete your information, or withdraw your consent to emails, by writing to <a href={`mailto:${site.email}`}>{site.email}</a>. Which legal rights apply depends on where you live. <em>To confirm with a legal review.</em></p>
    </main>)
}
