import { useMemo, useState } from 'react'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

function randomMotionStyle(index) {
  const directions = [
    [-120, -80],
    [130, -70],
    [-110, 90],
    [120, 85],
    [0, -120],
    [0, 120],
  ]
  const [x, y] = directions[Math.floor(Math.random() * directions.length)]
  const rotation = Math.round((Math.random() - 0.5) * 18)

  return {
    '--move-x': `${x}px`,
    '--move-y': `${y}px`,
    '--move-rot': `${rotation}deg`,
    '--move-delay': `${index * 55}ms`,
  }
}

export default function ServicesSection({ content }) {
  const [activeServiceId, setActiveServiceId] = useState('neurological')
  const [animationKey, setAnimationKey] = useState(0)
  const services = content.services
  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) || services[0],
    [activeServiceId, services],
  )
  const motionStyles = useMemo(
    () => activeService.items.map((_, index) => randomMotionStyle(index + animationKey)),
    [activeService.items, animationKey],
  )

  const selectService = (serviceId) => {
    if (serviceId === activeServiceId) return
    setActiveServiceId(serviceId)
    setAnimationKey((key) => key + 1)
  }

  return (
    <section className="section-pad services-section" id="services">
      <div className="reveal">
        <SectionHeading align="center" eyebrow={content.eyebrow} title={content.title}>
          {content.copy}
        </SectionHeading>
      </div>

      <div className="service-workspace reveal">
        <div className="service-tabs" role="tablist" aria-label={content.tabLabel}>
          {services.map((service) => (
            <button
              aria-controls={`panel-${service.id}`}
              aria-selected={activeServiceId === service.id}
              className={activeServiceId === service.id ? 'active' : ''}
              id={`tab-${service.id}`}
              key={service.id}
              onClick={() => selectService(service.id)}
              role="tab"
              type="button"
            >
              <span className="service-tab-icon">
                <Icon name={service.icon} size={22} />
              </span>
              <span>
                <small>{service.eyebrow}</small>
                {service.title}
              </span>
            </button>
          ))}
        </div>

        <article
          aria-labelledby={`tab-${activeService.id}`}
          className="service-panel"
          id={`panel-${activeService.id}`}
          role="tabpanel"
        >
          <div>
            <p className="section-kicker">{activeService.eyebrow}</p>
            <h3>{activeService.title}</h3>
            <p>{activeService.description}</p>
          </div>
          <div className="service-checks" key={`${activeService.id}-${animationKey}`}>
            {activeService.items.map((item, index) => (
              <div
                className="service-check motion-check"
                key={`${animationKey}-${item}`}
                style={motionStyles[index]}
              >
                <Icon name="check" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="why-grid">
            {content.whyChoose.map((item) => (
              <div key={item}>
                <Icon name="shield" size={20} />
                {item}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
