import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AboutSection from './components/AboutSection'
import ClinicShowcase from './components/ClinicShowcase'
import ContactSection from './components/ContactSection'
import FloatingContact from './components/FloatingContact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import HoursSection from './components/HoursSection'
import ProcessSection from './components/ProcessSection'
import RakeezGuide from './components/RakeezGuide'
import ServicesSection from './components/ServicesSection'
import SplashScreen, { SPLASH_DURATION_MS } from './components/SplashScreen'
import StatsStrip from './components/StatsStrip'
import TeamSection from './components/TeamSection'
import { siteContent } from './data/siteData'
import useActiveSection from './hooks/useActiveSection'
import useRevealOnScroll from './hooks/useRevealOnScroll'
import './App.css'

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('rakeez-language') || 'en')
  const [showSplash, setShowSplash] = useState(true)
  const content = siteContent[language]
  const activeSection = useActiveSection(content.navItems)
  const isArabic = language === 'ar'
  const appClassName = useMemo(
    () => `site-shell ${isArabic ? 'rtl-layout' : ''}`,
    [isArabic],
  )
  useRevealOnScroll(language)

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS)

    return () => window.clearTimeout(splashTimer)
  }, [])

  useEffect(() => {
    document.title = content.documentTitle
    document.documentElement.lang = language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    localStorage.setItem('rakeez-language', language)
  }, [content.documentTitle, isArabic, language])

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'ar' : 'en'))
  }

  return (
    <>
      {/* Splash screen is connected here in App.jsx. */}
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

      <motion.div
        animate={{ opacity: showSplash ? 0 : 1 }}
        className={appClassName}
        dir={isArabic ? 'rtl' : 'ltr'}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Header
          activeSection={activeSection}
          content={content}
          language={language}
          onToggleLanguage={toggleLanguage}
        />
        <main>
          <Hero content={content.hero} />
          <StatsStrip content={content} />
          <ClinicShowcase content={content.clinic} />
          <TeamSection content={content.team} />
          <ServicesSection content={content.services} />
          <ProcessSection content={content.process} />
          <AboutSection content={content.about} />
          <HoursSection content={content.hours} language={language} />
          <ContactSection content={content.contact} />
        </main>
        <Footer content={content} />
        <FloatingContact content={content.floating} />
        <RakeezGuide language={language} />
      </motion.div>
    </>
  )
}

export default App
