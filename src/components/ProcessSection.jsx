import SectionHeading from './SectionHeading'

export default function ProcessSection({ content }) {
  return (
    <section className="section-pad process-section">
      <div className="reveal">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
      </div>

      <div className="process-grid">
        {content.steps.map((step, index) => (
          <article className="process-card reveal" key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
