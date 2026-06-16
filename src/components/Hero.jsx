import { useState } from 'react'
import Icon from './Icon'
import { links } from '../data/siteData'

export default function Hero({ content }) {
  const [motion, setMotion] = useState({ x: '0px', y: '0px' })

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14
    setMotion({ x: `${x.toFixed(2)}px`, y: `${y.toFixed(2)}px` })
  }

  return (
    <section
      className="hero"
      id="home"
      onPointerLeave={() => setMotion({ x: '0px', y: '0px' })}
      onPointerMove={handlePointerMove}
      style={{ '--hero-x': motion.x, '--hero-y': motion.y }}
    >
      <img
        alt={content.imageAlt}
        className="hero-image"
        src="/rakeez/hero.png"
      />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="section-kicker light">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="hero-copy">{content.copy}</p>
        <div className="hero-actions">
          <a className="button primary" href={links.call}>
            <Icon name="phone" size={19} />
            {content.actions.call}
          </a>
          <a className="button secondary" href={links.clinicWhatsApp} rel="noreferrer" target="_blank">
            <Icon name="message" size={19} />
            {content.actions.whatsapp}
          </a>
          <a className="button ghost" href={links.location} rel="noreferrer" target="_blank">
            <Icon name="map" size={19} />
            {content.actions.location}
          </a>
        </div>
      </div>
    </section>
  )
}
