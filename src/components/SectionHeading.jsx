export default function SectionHeading({ align = 'left', eyebrow, title, children }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'centered' : ''}`}>
      <p className="section-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  )
}
