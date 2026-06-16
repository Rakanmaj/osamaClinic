import { motion, useReducedMotion } from 'framer-motion'
import './SplashScreen.css'

// Change the animation duration here.
export const SPLASH_DURATION_MS = 3000

// Change the logo image path here.
const SPLASH_LOGO_SRC = '/rakeez/rakeez-splash-logo.png'

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  delay: (index % 8) * 0.18,
  duration: 2.7 + (index % 5) * 0.36,
  left: `${6 + ((index * 13) % 88)}%`,
  size: 3 + (index % 4),
  top: `${8 + ((index * 19) % 82)}%`,
}))

export default function SplashScreen() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      aria-label="Rakeez opening animation"
      className="splash-screen"
      exit={{
        opacity: 0,
        scale: 1.03,
        transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
      }}
      initial={{ opacity: 1 }}
    >
      <div className="splash-aurora splash-aurora-one" />
      <div className="splash-aurora splash-aurora-two" />
      <div className="splash-ring splash-ring-left" />
      <div className="splash-ring splash-ring-right" />
      <div className="splash-orbit splash-orbit-one" />
      <div className="splash-orbit splash-orbit-two" />

      <div className="splash-particles" aria-hidden="true">
        {particles.map((particle) => (
          <motion.span
            animate={
              reduceMotion
                ? { opacity: 0.42 }
                : {
                    opacity: [0.1, 0.78, 0.18],
                    scale: [0.75, 1.35, 0.9],
                    y: [-6, 12, -4],
                  }
            }
            key={particle.id}
            style={{
              '--delay': `${particle.delay}s`,
              '--duration': `${particle.duration}s`,
              '--left': particle.left,
              '--size': `${particle.size}px`,
              '--top': particle.top,
            }}
            transition={{
              delay: particle.delay,
              duration: particle.duration,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          />
        ))}
      </div>

      <motion.div
        animate={
          reduceMotion
            ? { opacity: 1, scale: 1 }
            : {
                opacity: 1,
                scale: [0.92, 1.04, 1],
                transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
              }
        }
        className="splash-logo-wrap"
        initial={{ opacity: 0, scale: 0.86, y: 18 }}
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  filter: [
                    'drop-shadow(0 0 18px rgba(103, 199, 190, 0.18))',
                    'drop-shadow(0 0 38px rgba(103, 199, 190, 0.38))',
                    'drop-shadow(0 0 18px rgba(103, 199, 190, 0.18))',
                  ],
                  scale: [1, 1.018, 1],
                }
          }
          className="splash-logo-shell"
          transition={{ delay: 0.75, duration: 1.65, ease: 'easeInOut', repeat: Infinity }}
        >
          <img alt="Rakeez" src={SPLASH_LOGO_SRC} />
          <span className="splash-logo-shine" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="splash-caption"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
      >
        <span />
        <strong>Physiotherapy & Rehabilitation</strong>
        <span />
      </motion.div>
    </motion.section>
  )
}
