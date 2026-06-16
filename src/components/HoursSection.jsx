import { useEffect, useState } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { links } from '../data/siteData'

const MAPS_EMBED =
  'https://maps.google.com/maps?q=Rakeez%20Physiotherapy%20and%20Rehabilitation%20Ibri%20Oman&t=&z=16&ie=UTF8&iwloc=&output=embed'

const DAY_INDEX = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
}

const HOURS = [
  { day: 'Sunday', short: 'SUN', windows: [{ open: 9 * 60, close: 13 * 60 }, { open: 16 * 60, close: 20 * 60 }] },
  { day: 'Monday', short: 'MON', windows: [{ open: 9 * 60, close: 13 * 60 }, { open: 16 * 60, close: 20 * 60 }] },
  { day: 'Tuesday', short: 'TUE', windows: [{ open: 9 * 60, close: 13 * 60 }, { open: 16 * 60, close: 20 * 60 }] },
  { day: 'Wednesday', short: 'WED', windows: [{ open: 9 * 60, close: 13 * 60 }, { open: 16 * 60, close: 20 * 60 }] },
  { day: 'Thursday', short: 'THU', windows: [{ open: 9 * 60, close: 13 * 60 }, { open: 16 * 60, close: 20 * 60 }] },
  { day: 'Friday', short: 'FRI', windows: [] },
  { day: 'Saturday', short: 'SAT', windows: [{ open: 9 * 60, close: 13 * 60 }, { open: 16 * 60, close: 20 * 60 }] },
]

const omanPartsFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Asia/Muscat',
})

const fmt12 = (mins, content) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const ampm = h >= 12 ? (content.pm ?? 'PM') : (content.am ?? 'AM')
  const hh = ((h + 11) % 12) + 1
  return m === 0 ? `${hh}${ampm}` : `${hh}:${String(m).padStart(2, '0')}${ampm}`
}

const fmtDuration = (mins, content) => {
  const m = Math.max(0, Math.round(mins))
  const h = Math.floor(m / 60)
  const r = m % 60
  const hourUnit = content.hourUnit ?? 'h'
  const minuteUnit = content.minuteUnit ?? 'm'
  if (h === 0) return `${r}${minuteUnit}`
  if (r === 0) return `${h}${hourUnit}`
  return `${h}${hourUnit} ${r}${minuteUnit}`
}

function getOmanParts(date) {
  const parts = omanPartsFormatter.formatToParts(date)
  const value = (type) => parts.find((part) => part.type === type)?.value

  return {
    weekday: value('weekday'),
    hour: Number(value('hour') || 0),
    minute: Number(value('minute') || 0),
    second: Number(value('second') || 0),
  }
}

function getNextOpening(todayIdx, minsNow) {
  const today = HOURS[todayIdx]
  const laterToday = today.windows.find((window) => minsNow < window.open)

  if (laterToday) {
    return { nextDay: todayIdx, waitMins: laterToday.open - minsNow }
  }

  let waitMins = 24 * 60 - minsNow
  for (let i = 1; i <= 7; i += 1) {
    const nextDay = (todayIdx + i) % 7
    const nextWindow = HOURS[nextDay].windows[0]
    if (nextWindow) {
      return { nextDay, waitMins: waitMins + nextWindow.open }
    }
    waitMins += 24 * 60
  }

  return { nextDay: todayIdx, waitMins: 0 }
}

export default function HoursSection({ content }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const oman = getOmanParts(now)
  const todayIdx = DAY_INDEX[oman.weekday] ?? 0
  const today = HOURS[todayIdx]
  const minsNow = oman.hour * 60 + oman.minute + oman.second / 60
  const activeWindow = today.windows.find((window) => minsNow >= window.open && minsNow < window.close)
  const isOpen = Boolean(activeWindow)

  let statusLabel
  let statusDetail
  if (isOpen) {
    statusLabel = content.openNow
    statusDetail = `${content.closesIn} ${fmtDuration(activeWindow.close - minsNow, content)}`
  } else {
    const { nextDay, waitMins } = getNextOpening(todayIdx, minsNow)
    statusLabel = today.windows.length && minsNow >= 13 * 60 && minsNow < 16 * 60 ? content.breakTime : content.closed
    const nextDayLabel = content.days?.[nextDay]?.short ?? HOURS[nextDay].short
    const nextPrefix = nextDay === todayIdx ? content.opensIn : `${nextDayLabel} ·`
    statusDetail = `${nextPrefix} ${fmtDuration(waitMins, content)}`
  }

  const sec = oman.second
  const minA = oman.minute + sec / 60
  const hrA = (oman.hour % 12) + minA / 60
  const secDeg = sec * 6
  const minDeg = minA * 6
  const hourDeg = hrA * 30

  const hh = String(((oman.hour + 11) % 12) + 1).padStart(2, '0')
  const mm = String(oman.minute).padStart(2, '0')
  const ss = String(oman.second).padStart(2, '0')
  const ampm = oman.hour >= 12 ? content.pm : content.am

  return (
    <section className="business-hours" id="hours">
      <div className="bh-rays" aria-hidden="true" />
      <div className="bh-glow" aria-hidden="true" />
      <div className="bh-grid-bg" aria-hidden="true" />

      <div className="bh-header">
        <span className="section-eyebrow reveal">{content.eyebrow}</span>
        <h2 className="reveal reveal-delay-1"><em>#</em>{content.title}</h2>
        <p className="business-hours-sub reveal reveal-delay-2">{content.subtitle}</p>
      </div>

      <div className="bh-stage reveal reveal-delay-2">
        <div className="bh-clock-col">
          <div className="bh-clock">
            <svg className="bh-clock-svg" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <radialGradient id="bhFace" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="65%" stopColor="rgba(255,255,255,0.03)" />
                  <stop offset="100%" stopColor="rgba(47,41,95,0.42)" />
                </radialGradient>
                <linearGradient id="bhRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#67c7be" />
                  <stop offset="50%" stopColor="#4a438c" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#67c7be" />
                </linearGradient>
              </defs>

              <circle cx="100" cy="100" r="92" fill="url(#bhFace)" stroke="url(#bhRing)" strokeWidth="1.2" />
              <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(103,199,190,0.2)" strokeWidth="0.6" strokeDasharray="1 5" />

              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 30) * Math.PI / 180
                const x1 = 100 + Math.sin(a) * 82
                const y1 = 100 - Math.cos(a) * 82
                const x2 = 100 + Math.sin(a) * (i % 3 === 0 ? 70 : 76)
                const y2 = 100 - Math.cos(a) * (i % 3 === 0 ? 70 : 76)
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.58)"
                    strokeLinecap="round"
                    strokeWidth={i % 3 === 0 ? 1.6 : 0.9}
                  />
                )
              })}

              {[12, 3, 6, 9].map((n, i) => {
                const a = (i * 90) * Math.PI / 180
                const x = 100 + Math.sin(a) * 60
                const y = 100 - Math.cos(a) * 60 + 5
                return (
                  <text key={n} x={x} y={y} textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fill="rgba(255,255,255,0.68)">
                    {n}
                  </text>
                )
              })}

              <line
                x1="100"
                y1="100"
                x2="100"
                y2="55"
                stroke="var(--bh-ivory)"
                strokeLinecap="round"
                strokeWidth="3.2"
                style={{ transform: `rotate(${hourDeg}deg)`, transformOrigin: '100px 100px', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
              />

              <line
                x1="100"
                y1="100"
                x2="100"
                y2="35"
                stroke="var(--bh-ivory)"
                strokeLinecap="round"
                strokeWidth="2"
                style={{ transform: `rotate(${minDeg}deg)`, transformOrigin: '100px 100px', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
              />

              <g style={{ transform: `rotate(${secDeg}deg)`, transformOrigin: '100px 100px' }}>
                <line x1="100" y1="115" x2="100" y2="28" stroke="var(--bh-accent)" strokeLinecap="round" strokeWidth="1.2" />
                <circle cx="100" cy="28" r="2.4" fill="var(--bh-accent)" />
              </g>

              <circle cx="100" cy="100" r="4.5" fill="var(--bh-ivory)" />
              <circle cx="100" cy="100" r="2" fill="var(--primary-dark)" />
            </svg>

            <div className="bh-clock-digital">
              <span className="bh-clock-time">
                {hh}<span className="bh-clock-colon">:</span>{mm}<span className="bh-clock-colon">:</span>{ss}
              </span>
              <span className="bh-clock-ampm">{ampm}</span>
            </div>

            <div className={`bh-status ${isOpen ? 'is-open' : 'is-closed'}`}>
              <span className="bh-status-dot" aria-hidden="true" />
              <span className="bh-status-label">{statusLabel}</span>
              <span className="bh-status-detail">{statusDetail}</span>
            </div>
          </div>

          <a
            aria-label={content.mapLabel}
            className="bh-map"
            href={links.location}
            rel="noreferrer"
            target="_blank"
          >
            <div className="bh-map-frame">
              <iframe
                allowFullScreen
                className="bh-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={MAPS_EMBED}
                title={content.mapTitle}
              />
              <span className="bh-map-tint" aria-hidden="true" />
              <span className="bh-map-vignette" aria-hidden="true" />
              <span className="bh-map-scan" aria-hidden="true" />
              <span className="bh-map-grid" aria-hidden="true" />

              <span className="bh-map-pin" aria-hidden="true">
                <span className="bh-map-pin-icon"><MapPin size={24} strokeWidth={2.2} /></span>
                <span className="bh-map-pin-ring" />
                <span className="bh-map-pin-ring bh-map-pin-ring-2" />
                <span className="bh-map-pin-ring bh-map-pin-ring-3" />
              </span>

              <span className="bh-map-corner bh-map-corner-tl" aria-hidden="true" />
              <span className="bh-map-corner bh-map-corner-tr" aria-hidden="true" />
              <span className="bh-map-corner bh-map-corner-bl" aria-hidden="true" />
              <span className="bh-map-corner bh-map-corner-br" aria-hidden="true" />

              <span className="bh-map-coords" aria-hidden="true">
                <span>{content.coordA}</span>
                <span>{content.coordB}</span>
              </span>
            </div>

            <div className="bh-map-meta">
              <div className="bh-map-meta-text">
                <span className="bh-map-meta-eyebrow">{content.visitLabel}</span>
                <span className="bh-map-meta-name">{content.locationName}</span>
              </div>
              <span className="bh-map-meta-arrow" aria-hidden="true">
                <ArrowUpRight size={19} />
              </span>
            </div>
          </a>
        </div>

        <ul className="bh-days" aria-label={content.scheduleLabel}>
          {HOURS.map((d, i) => {
            const closed = d.windows.length === 0
            const isToday = i === todayIdx
            const nowPct = isToday ? (minsNow / (24 * 60)) * 100 : null
            const dayContent = content.days?.[i] ?? d
            const dayPrimary = dayContent.short ?? dayContent.day ?? d.short
            const daySecondary = dayContent.day && dayContent.day !== dayPrimary ? dayContent.day : null

            return (
              <li
                className={`bh-day${isToday ? ' is-today' : ''}${closed ? ' is-closed-day' : ''}${isToday && isOpen ? ' is-live' : ''}`}
                key={d.day}
                style={{ '--row-i': i }}
              >
                <div className="bh-day-head">
                  <span className="bh-day-short">{dayPrimary}</span>
                  {daySecondary && <span className="bh-day-name">{daySecondary}</span>}
                  {isToday && <span className="bh-day-today-tag">{content.today}</span>}
                </div>

                <div className="bh-day-track" aria-hidden="true">
                  {[0, 6, 12, 18, 24].map((h) => (
                    <span className="bh-tick" key={h} style={{ left: `${(h / 24) * 100}%` }} />
                  ))}

                  {!closed && d.windows.map((window) => {
                    const openPct = (window.open / (24 * 60)) * 100
                    const closePct = (window.close / (24 * 60)) * 100
                    return (
                      <span
                        className="bh-day-window"
                        key={`${d.day}-${window.open}`}
                        style={{ left: `${openPct}%`, width: `${closePct - openPct}%` }}
                      />
                    )
                  })}

                  {isToday && (
                    <span className="bh-day-now" style={{ left: `${nowPct}%` }}>
                      <span className="bh-day-now-pulse" />
                    </span>
                  )}
                </div>

                <div className="bh-day-time">
                  {closed ? (
                    <span className="bh-day-closed-label">{content.closedLabel}</span>
                  ) : (
                    <>
                      {fmt12(d.windows[0].open, content)} <span className="bh-day-sep">-</span> {fmt12(d.windows[0].close, content)}
                      <span className="bh-day-break">{content.breakLabel}</span>
                      {fmt12(d.windows[1].open, content)} <span className="bh-day-sep">-</span> {fmt12(d.windows[1].close, content)}
                    </>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
