import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function ContactSection({ content }) {
  return (
    <section className="section-pad contact-section" id="contact">
      <div className="contact-layout">
        <div className="reveal">
          <SectionHeading eyebrow={content.eyebrow} title={content.title}>
            {content.copy}
          </SectionHeading>
        </div>

        <div className="contact-actions reveal">
          {content.cards.map((card) => (
            <a
              className="contact-card"
              href={card.href}
              key={card.label}
              rel={card.external ? 'noreferrer' : undefined}
              target={card.external ? '_blank' : undefined}
            >
              <span className="contact-icon">
                <Icon name={card.icon} size={25} />
              </span>
              <span className="contact-card-label">{card.label}</span>
              <strong>{card.value}</strong>
              <small>{card.text}</small>
              <span className="contact-card-arrow">
                <Icon name="arrow" size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
