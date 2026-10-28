import { useSeo } from '../hooks/useSeo'
import { ButtonLink } from '../components/common/Button'
export default function NotFoundPage(){useSeo('Page not found | Esther','This page could not be found.');return <main id="main" className="container"><h1>Page not found</h1><p>That page doesn't exist.</p><ButtonLink to="/">Back home</ButtonLink></main>}
