import { useEffect } from 'react'

export default function useRevealOnScroll(dependency) {
  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const alreadyPassed = rect.top < window.innerHeight && rect.bottom > 0

      if (alreadyPassed) {
        item.classList.add('is-visible')
        return
      }

      item.classList.remove('is-visible')
      revealObserver.observe(item)
    })

    return () => revealObserver.disconnect()
  }, [dependency])
}
