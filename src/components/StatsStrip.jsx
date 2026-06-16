import Icon from './Icon'
import useCountUp from '../hooks/useCountUp'
import useInView from '../hooks/useInView'

function StatValue({ stat, visible }) {
  const count = useCountUp({
    end: stat.end,
    isActive: visible && typeof stat.end === 'number',
    start: stat.start ?? 0,
  })

  if (typeof stat.end === 'number') {
    return (
      <>
        {count}
        {stat.suffix}
      </>
    )
  }

  return stat.value
}

export default function StatsStrip({ content }) {
  const [ref, visible] = useInView()

  return (
    <section aria-label="Clinic highlights" className="stats-section" ref={ref}>
      <div className="stats-grid">
        {content.stats.map((item) => (
          <article className="stat-card reveal" key={item.label}>
            <div className="stat-icon">
              <Icon name={item.icon} size={22} />
            </div>
            <strong>
              <StatValue stat={item} visible={visible} />
            </strong>
            <span>{item.label}</span>
            <small>{item.note}</small>
          </article>
        ))}
      </div>
    </section>
  )
}
