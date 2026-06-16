import Icon from './Icon'
import SectionHeading from './SectionHeading'
import { clinicPhoneDisplay, links } from '../data/siteData'

export default function ClinicShowcase({ content }) {
  return (
    <section className="clinic-showcase section-pad reveal" id="clinic">
      <div className="clinic-shell">
        <div className="clinic-copy">
          <SectionHeading eyebrow={content.eyebrow} title={content.title}>
            {content.copy}
          </SectionHeading>

          <div className="clinic-actions">
            <a className="button secondary" href={links.location} rel="noreferrer" target="_blank">
              <Icon name="map" size={18} />
              {content.openLocation}
            </a>
            <a className="clinic-call-card" href={links.call}>
              <Icon name="phone" size={18} />
              <span>
                <small>{content.phoneLabel}</small>
                <strong>{clinicPhoneDisplay}</strong>
              </span>
            </a>
          </div>
        </div>

        <div className="clinic-visual-panel">
          <div className="clinic-image-wrap dynamic-image-card">
            <img alt={content.imageAlt} src="/rakeez/front.png" />
            <div className="clinic-caption">
              <Icon name="map" size={22} />
              <div>
                <strong>{content.captionTitle}</strong>
                <span>{content.captionText}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="clinic-highlight-grid">
          {content.highlights.map((item) => (
            <article className="clinic-highlight" key={item.value}>
              <span>{item.value}</span>
              <div>
                <strong>{item.label}</strong>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
