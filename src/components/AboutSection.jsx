import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function AboutSection({ content }) {
  return (
    <section className="section-pad about-section" id="about">
      <div className="about-layout">
        <div className="about-intro reveal">
          <SectionHeading eyebrow={content.eyebrow} title={content.title}>
            {content.copy}
          </SectionHeading>
          <div className="about-pillar-grid">
            {content.pillars.map((pillar) => (
              <div className="about-pillar" key={pillar.label}>
                <Icon name={pillar.icon} size={20} />
                <span>{pillar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-copy reveal">
          <div className="about-copy-header">
            <span>{content.standardLabel}</span>
            <strong>{content.standardText}</strong>
          </div>
          {content.text.map((paragraph, index) => (
            <article className="about-point" key={paragraph}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{paragraph}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
