const paths = {
  phone: [
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8 9.7a16 16 0 0 0 6.3 6.3l1.27-1.27a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92Z',
  ],
  message: [
    'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z',
  ],
  map: [
    'M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z',
    'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  ],
  instagram: [
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z',
    'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z',
    'M17.5 6.5h.01',
  ],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M18 6 6 18', 'M6 6l12 12'],
  arrow: ['M5 12h14', 'M13 5l7 7-7 7'],
  check: ['M20 6 9 17l-5-5'],
  brain: [
    'M9 3a4 4 0 0 0-4 4 4 4 0 0 0-2 7.46A4 4 0 0 0 7 21h2',
    'M15 3a4 4 0 0 1 4 4 4 4 0 0 1 2 7.46A4 4 0 0 1 17 21h-2',
    'M9 3v18',
    'M15 3v18',
    'M9 8H7',
    'M15 8h2',
    'M9 13H6.5',
    'M15 13h2.5',
  ],
  bone: [
    'M8.5 14.5 14.5 8.5',
    'M5.5 12.5a3 3 0 1 1 3-3l6-6a3 3 0 1 1 3 3l-6 6a3 3 0 1 1-3 3l-1.2 1.2a3 3 0 1 1-3-3Z',
  ],
  child: [
    'M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    'M5 22v-5a7 7 0 0 1 14 0v5',
    'M8 13l4 4 4-4',
  ],
  spark: [
    'M12 2l1.8 5.3L19 9l-5.2 1.7L12 16l-1.8-5.3L5 9l5.2-1.7L12 2Z',
    'M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z',
    'M5 14l.7 1.8L7.5 16l-1.8.7L5 18.5l-.7-1.8L2.5 16l1.8-.7L5 14Z',
  ],
  activity: ['M22 12h-4l-3 8-6-16-3 8H2'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z', 'M9 12l2 2 4-5'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  target: [
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
    'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z',
    'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  ],
}

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {(paths[name] || paths.spark).map((d) => (
        <path
          d={d}
          key={d}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  )
}
