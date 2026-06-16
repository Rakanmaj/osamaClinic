import { links } from '../data/siteData'
import Icon from './Icon'

export default function Footer({ content }) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="footer-logo" href="#home" aria-label={content.brand}>
            <img alt={content.brand} src="/rakeez/logo.png" />
          </a>
          <p>{content.footer.tagline}</p>
          <div className="footer-socials" aria-label={content.footer.contactTitle}>
            <a href={links.call} aria-label={content.footer.call}>
              <Icon name="phone" size={18} />
            </a>
            <a href={links.clinicWhatsApp} rel="noreferrer" target="_blank" aria-label={content.footer.whatsapp}>
              <Icon name="message" size={18} />
            </a>
            <a href={links.instagram} rel="noreferrer" target="_blank" aria-label={content.footer.instagram}>
              <Icon name="instagram" size={18} />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label={content.footer.quickLinksTitle}>
          <h3>{content.footer.quickLinksTitle}</h3>
          {content.navItems.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="footer-col">
          <h3>{content.footer.contactTitle}</h3>
          <a href={links.call}>
            <Icon name="phone" size={16} />
            {content.footer.call}
          </a>
          <a href={links.clinicWhatsApp} rel="noreferrer" target="_blank">
            <Icon name="message" size={16} />
            {content.footer.whatsapp}
          </a>
          <a href={links.instagram} rel="noreferrer" target="_blank">
            <Icon name="instagram" size={16} />
            {content.footer.instagram}
          </a>
        </div>

        <div className="footer-col footer-visit">
          <h3>{content.footer.visitTitle}</h3>
          <p>{content.footer.locationText}</p>
          <a href={links.location} rel="noreferrer" target="_blank">
            <Icon name="map" size={16} />
            {content.footer.location}
          </a>
          <h3>{content.footer.hoursTitle}</h3>
          <p>{content.footer.hoursText}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{content.brand}</span>
        <span>© {year} {content.footer.rights}</span>
      </div>
    </footer>
  )
}
