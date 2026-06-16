import { useEffect, useRef } from 'react'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

function DoctorCard({ content, member, index }) {
  const primaryCredential = member.highlights[0]
  const credentials = member.highlights.slice(1)
  const metricLabels = content.metricLabels
  const firstMetric = member.accent === 'lead' ? metricLabels.leadFirst : metricLabels.careFirst
  const secondMetric = member.accent === 'lead' ? metricLabels.leadSecond : metricLabels.careSecond

  return (
    <article
      className={`team-card reveal doctor-card-motion ${member.accent}`}
      style={{ '--doctor-delay': `${index * 120}ms` }}
    >
      <div className="team-photo-stage">
        <div className="team-photo dynamic-image-card">
          <img alt={member.name} src={member.image} />
        </div>
        <div className="team-photo-badge">
          <span>{content.photoBadgeTop}</span>
          <strong>{content.photoBadgeBottom}</strong>
        </div>
      </div>

      <div className="team-info">
        <div
          className="team-role-row team-motion-item"
          style={{ '--motion-delay': '260ms', '--motion-x': '-34px', '--motion-y': '-18px' }}
        >
          <span>{member.role}</span>
          <small>{member.accent === 'lead' ? content.leadCare : content.specializedCare}</small>
        </div>
        <h3
          className="team-motion-item"
          style={{ '--motion-delay': '360ms', '--motion-x': '42px', '--motion-y': '-24px' }}
        >
          {member.name}
        </h3>
        <p
          className="team-primary-credential team-motion-item"
          style={{ '--motion-delay': '460ms', '--motion-x': '-28px', '--motion-y': '22px' }}
        >
          {primaryCredential}
        </p>

        <div className="team-profile-grid">
          <div
            className="team-motion-item"
            style={{ '--motion-delay': '560ms', '--motion-x': '-52px', '--motion-y': '34px' }}
          >
            <strong>{firstMetric[0]}</strong>
            <span>{firstMetric[1]}</span>
          </div>
          <div
            className="team-motion-item"
            style={{ '--motion-delay': '660ms', '--motion-x': '58px', '--motion-y': '32px' }}
          >
            <strong>{secondMetric[0]}</strong>
            <span>{secondMetric[1]}</span>
          </div>
        </div>

        <ul className="team-credential-list">
          {credentials.map((highlight, itemIndex) => (
            <li
              className="team-motion-item"
              key={highlight}
              style={{
                '--motion-delay': `${780 + itemIndex * 92}ms`,
                '--motion-x': itemIndex % 2 === 0 ? '-38px' : '34px',
                '--motion-y': itemIndex % 2 === 0 ? '18px' : '-14px',
              }}
            >
              <span className="team-credential-icon">
                <Icon name="activity" size={17} strokeWidth={2.2} />
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function TeamSection({ content }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const cards = Array.from(section.querySelectorAll('.doctor-card-motion'))
    let wasActive = false
    let frameId = 0

    const replayCards = () => {
      cards.forEach((card) => card.classList.remove('is-visible'))
      window.requestAnimationFrame(() => {
        cards.forEach((card) => card.classList.add('is-visible'))
      })
    }

    const checkSection = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const isActive = rect.top < window.innerHeight * 0.78 && rect.bottom > window.innerHeight * 0.22

        if (isActive && !wasActive) {
          replayCards()
        }

        if (!isActive && wasActive) {
          cards.forEach((card) => card.classList.remove('is-visible'))
        }

        wasActive = isActive
      })
    }

    checkSection()
    window.addEventListener('scroll', checkSection, { passive: true })
    window.addEventListener('resize', checkSection)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', checkSection)
      window.removeEventListener('resize', checkSection)
    }
  }, [content.members])

  return (
    <section className="section-pad team-section" id="team" ref={sectionRef}>
      <div className="reveal">
        <SectionHeading eyebrow={content.eyebrow} title={content.title}>
          {content.copy}
        </SectionHeading>
      </div>

      <div className="team-grid">
        {content.members.map((member, index) => (
          <DoctorCard content={content} key={member.name} member={member} index={index} />
        ))}
      </div>
    </section>
  )
}
