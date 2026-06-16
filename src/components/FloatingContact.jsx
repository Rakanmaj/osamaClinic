import Icon from './Icon'
import { links } from '../data/siteData'

export default function FloatingContact({ content }) {
  return (
    <div className="floating-contact" aria-label="Quick contact actions">
      <a href={links.call} aria-label={content.call}>
        <Icon name="phone" size={20} />
      </a>
      <a href={links.clinicWhatsApp} rel="noreferrer" target="_blank" aria-label={content.whatsapp}>
        <Icon name="message" size={20} />
      </a>
      <a href={links.location} rel="noreferrer" target="_blank" aria-label={content.location}>
        <Icon name="map" size={20} />
      </a>
    </div>
  )
}
