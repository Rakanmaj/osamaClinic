import { useState } from 'react'
import Icon from './Icon'
import { links } from '../data/siteData'

export default function Header({ activeSection, content, language, onToggleLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a aria-label="Rakeez home" className="brand" href="#home" onClick={closeMenu}>
        <img alt={content.brand} src="/rakeez/logo.png" />
      </a>

      <nav aria-label="Primary navigation" className="desktop-nav">
        {content.navItems.map((item) => (
          <a
            className={activeSection === item.href.slice(1) ? 'active' : ''}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          className="language-link"
          onClick={onToggleLanguage}
          type="button"
        >
          {content.header.toggleLabel}
        </button>
        <a className="header-cta" href={links.clinicWhatsApp} rel="noreferrer" target="_blank">
          <Icon name="message" size={18} />
          {content.header.book}
        </a>
        <button
          aria-expanded={menuOpen}
          aria-label={content.header.menuLabel}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
        </button>
      </div>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {content.navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a href={links.call} onClick={closeMenu}>
          {content.header.call}
        </a>
        <button className="mobile-language-toggle" onClick={() => { onToggleLanguage(); closeMenu() }} type="button">
          {content.header.toggleLabel}
        </button>
      </div>
    </header>
  )
}
