import { useEffect, useState } from 'react'

export default function useCountUp({ duration = 1300, end, isActive, start = 0 }) {
  const [value, setValue] = useState(start)

  useEffect(() => {
    if (!isActive || typeof end !== 'number') return undefined

    let animationFrame = 0
    let startedAt = 0

    const tick = (timestamp) => {
      if (!startedAt) startedAt = timestamp

      const progress = Math.min((timestamp - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + (end - start) * eased))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick)
      }
    }

    animationFrame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(animationFrame)
  }, [duration, end, isActive, start])

  return value
}
