import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import { clinicPhoneDisplay, doctorPhone, links } from '../data/siteData'

const botName = 'دليل ركيز | Rakeez Guide'
const arabicRegex = /[\u0600-\u06FF]/
const latinRegex = /[A-Za-z]/
const omanTimeZone = 'Asia/Muscat'
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const arabicDayNames = {
  Sunday: 'الأحد',
  Monday: 'الاثنين',
  Tuesday: 'الثلاثاء',
  Wednesday: 'الأربعاء',
  Thursday: 'الخميس',
  Friday: 'الجمعة',
  Saturday: 'السبت',
}
const workingSessions = {
  Sunday: [
    [9 * 60, 13 * 60],
    [16 * 60, 20 * 60],
  ],
  Monday: [
    [9 * 60, 13 * 60],
    [16 * 60, 20 * 60],
  ],
  Tuesday: [
    [9 * 60, 13 * 60],
    [16 * 60, 20 * 60],
  ],
  Wednesday: [
    [9 * 60, 13 * 60],
    [16 * 60, 20 * 60],
  ],
  Thursday: [
    [9 * 60, 13 * 60],
    [16 * 60, 20 * 60],
  ],
  Friday: [],
  Saturday: [
    [9 * 60, 13 * 60],
    [16 * 60, 20 * 60],
  ],
}

const quickPrompts = {
  en: [
    { icon: 'spark', intent: 'about', label: 'About Rakeez' },
    { icon: 'clock', intent: 'hours', label: 'Working hours' },
    { icon: 'map', intent: 'location', label: 'Clinic location' },
    { icon: 'brain', intent: 'services', label: 'Services' },
    { icon: 'activity', intent: 'doctors', label: 'Doctors' },
    { icon: 'message', intent: 'booking', label: 'Book appointment' },
  ],
  ar: [
    { icon: 'spark', intent: 'about', label: 'عن ركيز' },
    { icon: 'clock', intent: 'hours', label: 'أوقات العمل' },
    { icon: 'map', intent: 'location', label: 'موقع العيادة' },
    { icon: 'brain', intent: 'services', label: 'الخدمات' },
    { icon: 'activity', intent: 'doctors', label: 'الأطباء' },
    { icon: 'message', intent: 'booking', label: 'حجز موعد' },
  ],
}

const ui = {
  en: {
    title: botName,
    status: 'Answers from Rakeez clinic information',
    placeholder: 'Ask about hours, services, doctors...',
    openLabel: 'Open Rakeez Guide chat',
    closeLabel: 'Close chat',
    sendLabel: 'Send message',
    welcome:
      'Hello, I am Rakeez Guide. Ask me in English or Arabic about hours, location, services, doctors, or booking.',
    chips: ['Arabic + English', 'Omani Arabic friendly', 'Clinic info only'],
    clinicWhatsApp: 'WhatsApp',
    call: 'Call',
    location: 'Location',
  },
  ar: {
    title: botName,
    status: 'إجابات من معلومات عيادة ركيز',
    placeholder: 'اسأل عن الأوقات، الخدمات، الأطباء...',
    openLabel: 'افتح محادثة دليل ركيز',
    closeLabel: 'إغلاق المحادثة',
    sendLabel: 'إرسال الرسالة',
    welcome:
      'هلا، أنا دليل ركيز. اسألني بالعربي، العماني، أو الإنجليزي عن الأوقات، الموقع، الخدمات، الأطباء، أو الحجز.',
    chips: ['عربي + English', 'يفهم اللهجة العمانية', 'معلومات العيادة فقط'],
    clinicWhatsApp: 'واتساب',
    call: 'اتصال',
    location: 'الموقع',
  },
}

const intentKeywords = {
  identity: [
    'who are you',
    'what are you',
    'bot',
    'chatbot',
    'assistant',
    'guide',
    'your name',
    'من انت',
    'من انتي',
    'وش انت',
    'ايش انت',
    'ما اسمك',
    'اسمك',
    'بوت',
    'مساعد',
    'دليل',
  ],
  about: [
    'who is rakeez',
    'what is rakeez',
    'about rakeez',
    'about clinic',
    'clinic info',
    'mission',
    'standard',
    'why rakeez',
    'من هو ركيز',
    'من هي ركيز',
    'ما هو ركيز',
    'ما هي ركيز',
    'وش ركيز',
    'ايش ركيز',
    'عن ركيز',
    'عن العياده',
    'عن العيادة',
    'معلومات ركيز',
    'رساله',
    'رسالة',
    'معيار',
    'ليش ركيز',
  ],
  greeting: [
    'hello',
    'hi',
    'hey',
    'good morning',
    'good evening',
    'مرحبا',
    'السلام',
    'هلا',
    'حياك',
    'صباح',
    'مساء',
  ],
  hours: [
    'hour',
    'hours',
    'are you open',
    'open now',
    'open today',
    'are you closed',
    'time',
    'timing',
    'open',
    'close',
    'closed',
    'friday',
    'schedule',
    'working',
    'business',
    'اوقات',
    'وقت',
    'ساعات',
    'دوام',
    'دوامكم',
    'متى',
    'مفتوح',
    'مفتوحين',
    'فاتحين',
    'مفتوح الحين',
    'مفتوحين الحين',
    'مفتوح تو',
    'هل انتم مفتوحين',
    'هل انتو مفتوحين',
    'اليوم مفتوح',
    'الحين مفتوح',
    'تفتح',
    'تسكر',
    'تقفل',
    'الجمعه',
    'الجمعة',
  ],
  location: [
    'location',
    'address',
    'map',
    'where',
    'directions',
    'oman',
    'ibri',
    'lulu',
    'place',
    'موقع',
    'عنوان',
    'خريطه',
    'خريطة',
    'وين',
    'اين',
    'مكان',
    'مكانكم',
    'عبري',
    'العراقي',
    'لولو',
  ],
  booking: [
    'book',
    'booking',
    'appointment',
    'whatsapp',
    'call',
    'contact',
    'phone',
    'number',
    'visit',
    'حجز',
    'احجز',
    'موعد',
    'واتساب',
    'اتصل',
    'تواصل',
    'رقم',
    'رقمكم',
    'هاتف',
    'ابا احجز',
    'ابي احجز',
    'بغيت احجز',
  ],
  services: [
    'service',
    'services',
    'treatment',
    'rehab',
    'rehabilitation',
    'physio',
    'therapy',
    'stroke',
    'back',
    'neck',
    'knee',
    'shoulder',
    'child',
    'children',
    'cupping',
    'ultrasound',
    'manual',
    'exercise',
    'خدمات',
    'علاج',
    'تاهيل',
    'تأهيل',
    'طبيعي',
    'جلطه',
    'جلطة',
    'ظهر',
    'رقبه',
    'رقبة',
    'ركبه',
    'ركبة',
    'كتف',
    'اطفال',
    'أطفال',
    'حجامه',
    'حجامة',
    'كهربائي',
    'تمارين',
  ],
  process: [
    'journey',
    'process',
    'assessment',
    'program',
    'plan',
    'how treatment works',
    'first visit',
    'care journey',
    'خطه',
    'خطة',
    'تقييم',
    'برنامج',
    'جلسه',
    'جلسة',
    'اول زياره',
    'أول زيارة',
    'كيف العلاج',
    'مسار',
    'رحله العلاج',
    'رحلة العلاج',
  ],
  doctors: [
    'doctor',
    'doctors',
    'team',
    'osama',
    'alaa',
    'physiotherapist',
    'staff',
    'دكتور',
    'دكتوره',
    'دكتورة',
    'اطباء',
    'أطباء',
    'الاطباء',
    'الأطباء',
    'فريق',
    'اسامه',
    'أسامة',
    'الاء',
    'آلاء',
    'اخصائي',
    'أخصائي',
    'اخصائيه',
    'أخصائية',
  ],
  price: [
    'price',
    'prices',
    'cost',
    'insurance',
    'pay',
    'payment',
    'كم',
    'سعر',
    'اسعار',
    'أسعار',
    'تكلفه',
    'تكلفة',
    'تامين',
    'تأمين',
    'الدفع',
  ],
  emergency: [
    'emergency',
    'urgent',
    'severe',
    'numb',
    'weakness',
    'chest',
    'طوارئ',
    'عاجل',
    'شديد',
    'تنميل',
    'ضعف',
    'صدر',
  ],
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\u0600-\u06FFA-Za-z0-9:+\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function detectLanguage(text, fallback) {
  if (arabicRegex.test(text)) return 'ar'
  if (latinRegex.test(text)) return 'en'
  return fallback
}

function getTone(text) {
  const normalized = normalizeText(text)
  return ['هلا', 'حيا', 'زين', 'وين', 'ابا', 'ابي', 'بغيت', 'تو', 'شي'].some((word) =>
    normalized.includes(word),
  )
    ? 'omani'
    : 'standard'
}

function getOmanNow(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: omanTimeZone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]))
  const hour = Number(parts.hour === '24' ? '0' : parts.hour)
  const minute = Number(parts.minute)

  return {
    weekday: parts.weekday,
    minutes: hour * 60 + minute,
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
  }
}

function formatClinicTime(totalMinutes, language) {
  const hour24 = Math.floor(totalMinutes / 60)
  const minute = totalMinutes % 60
  const hour12 = hour24 % 12 || 12
  const minuteText = minute ? `:${String(minute).padStart(2, '0')}` : ''

  if (language === 'ar') {
    return `${hour12}${minuteText} ${hour24 < 12 ? 'صباحا' : 'مساء'}`
  }

  return `${hour12}${minuteText} ${hour24 < 12 ? 'AM' : 'PM'}`
}

function getDayName(day, language) {
  return language === 'ar' ? arabicDayNames[day] : day
}

function getClinicStatus(date = new Date()) {
  const now = getOmanNow(date)
  const sessions = workingSessions[now.weekday] || []
  const activeSession = sessions.find(([start, end]) => now.minutes >= start && now.minutes < end)

  if (activeSession) {
    return {
      closesAt: activeSession[1],
      currentTime: now.time,
      nextDay: now.weekday,
      open: true,
      phase: 'open',
      weekday: now.weekday,
    }
  }

  const upcomingToday = sessions.find(([start]) => now.minutes < start)
  if (upcomingToday) {
    return {
      currentTime: now.time,
      nextDay: now.weekday,
      open: false,
      opensAt: upcomingToday[0],
      phase: sessions.length > 1 && now.minutes >= sessions[0][1] ? 'break' : 'closed',
      today: true,
      weekday: now.weekday,
    }
  }

  const todayIndex = dayNames.indexOf(now.weekday)
  const nextWorkingDay = Array.from({ length: 7 }, (_, index) => dayNames[(todayIndex + index + 1) % 7]).find(
    (day) => workingSessions[day]?.length,
  )

  return {
    currentTime: now.time,
    nextDay: nextWorkingDay,
    open: false,
    opensAt: workingSessions[nextWorkingDay][0][0],
    phase: now.weekday === 'Friday' ? 'friday' : 'closed',
    today: false,
    weekday: now.weekday,
  }
}

function getOpenStatusLine(language) {
  const status = getClinicStatus()

  if (language === 'ar') {
    if (status.open) {
      return `نعم، ركيز مفتوحة الآن حسب توقيت عمان (${status.currentTime}). تغلق عند ${formatClinicTime(
        status.closesAt,
        'ar',
      )}.`
    }

    if (status.phase === 'break') {
      return `لا، ركيز في وقت الاستراحة الآن حسب توقيت عمان (${status.currentTime}). تفتح مرة ثانية اليوم عند ${formatClinicTime(
        status.opensAt,
        'ar',
      )}.`
    }

    return `لا، ركيز مغلقة الآن حسب توقيت عمان (${status.currentTime}). تفتح ${
      status.today ? 'اليوم' : `يوم ${getDayName(status.nextDay, 'ar')}`
    } عند ${formatClinicTime(status.opensAt, 'ar')}.`
  }

  if (status.open) {
    return `Yes, Rakeez is open now in Oman (${status.currentTime}). It closes at ${formatClinicTime(
      status.closesAt,
      'en',
    )}.`
  }

  if (status.phase === 'break') {
    return `No, Rakeez is on its daily break now in Oman (${status.currentTime}). It reopens today at ${formatClinicTime(
      status.opensAt,
      'en',
    )}.`
  }

  return `No, Rakeez is closed now in Oman (${status.currentTime}). It opens ${
    status.today ? 'today' : getDayName(status.nextDay, 'en')
  } at ${formatClinicTime(status.opensAt, 'en')}.`
}

function detectIntent(text, forcedIntent) {
  if (forcedIntent) return forcedIntent

  const normalized = normalizeText(text)
  const scores = Object.entries(intentKeywords).map(([intent, keywords]) => {
    const score = keywords.reduce((total, keyword) => {
      const cleanKeyword = normalizeText(keyword)
      if (!cleanKeyword) return total
      if (normalized === cleanKeyword) return total + 6
      if (normalized.includes(cleanKeyword)) return total + 2
      return total
    }, 0)
    return { intent, score }
  })

  const best = scores.sort((a, b) => b.score - a.score)[0]
  return best?.score > 0 ? best.intent : 'fallback'
}

function answerInEnglish(intent) {
  const answers = {
    emergency:
      `If this is urgent, please seek emergency medical care immediately.\n\nFor clinic questions only, call Rakeez at ${clinicPhoneDisplay}.`,
    identity:
      'I am Rakeez Guide, the bilingual clinic assistant for the Rakeez website. I answer from the clinic information on this website, in English or Arabic, including common Omani Arabic phrasing.',
    about:
      'Rakeez is a physiotherapy and rehabilitation clinic in Ibri, Oman.\n\nWhat defines Rakeez:\n• Qualified Jordanian and Egyptian physiotherapists\n• University-trained clinical team\n• Evidence-based physiotherapy and rehabilitation\n• Personalized treatment programs for each patient\n• Focus on movement, pain reduction, function, and quality of life',
    greeting:
      'Hello. I am Rakeez Guide. I can help with clinic hours, location, services, doctors, booking, and contact details.',
    hours:
      `${getOpenStatusLine('en')}\n\nRakeez working hours:\n• Saturday to Thursday\n• 9 AM - 1 PM\n• Break during the day\n• 4 PM - 8 PM\n• Closed on Friday`,
    location:
      'Rakeez location:\n• Ibri, Al Iraqi\n• Near Lulu Hypermarket\n• Sultanate of Oman\n\nUse the location button below to open Google Maps.',
    booking:
      `Booking and contact:\n• Clinic phone: ${clinicPhoneDisplay}\n• Clinic WhatsApp is available from the button below\n• Dr. Osama listed number: ${doctorPhone}`,
    doctors:
      'Rakeez clinical team:\n• Dr. Osama Jamal: Head Physiotherapist, 4+ years of experience, certified in Mulligan Concept, pediatric assessment, and sacroiliac joint treatment.\n• Dr. Alaa Abdullah: Physiotherapist, 13+ years of experience, professional doctorate in musculoskeletal physiotherapy, acupuncture and dry cupping training, women’s health physiotherapy experience.',
    services:
      'Rakeez services include:\n• Neurological rehabilitation: stroke, spinal cord injury, brain injury, Parkinson disease, multiple sclerosis, balance and coordination disorders.\n• Orthopedic rehabilitation: back pain, neck pain, disc problems, shoulder injuries, knee injuries.\n• Pediatric rehabilitation: developmental delays, walking difficulties, balance disorders.\n• Methods: manual therapy, electrotherapy, ultrasound therapy, cupping therapy, exercise therapy.',
    process:
      'The Rakeez care journey is structured like this:\n• Clinical assessment to understand pain, movement limits, strength gaps, and daily goals\n• A custom program with hands-on care, therapeutic exercise, and guided progression\n• Measured recovery with progress reviewed session by session\n• Return with confidence using education and home guidance',
    price:
      `Prices and insurance details are not listed on the website.\n\nFor accurate details, please call ${clinicPhoneDisplay} or message the clinic on WhatsApp.`,
    fallback:
      'I can answer from the Rakeez website information: working hours, location, booking, services, doctors, and contact details.\n\nFor diagnosis, medical decisions, or prices, please contact the clinic directly.',
  }

  return answers[intent] || answers.fallback
}

function answerInArabic(intent, tone) {
  const prefix = tone === 'omani' ? 'هلا والله، ' : ''
  const answers = {
    emergency:
      `${prefix}إذا الحالة عاجلة أو فيها ألم شديد، تنميل مفاجئ، ضعف مفاجئ، أو أعراض صدر، الأفضل التوجه للطوارئ مباشرة.\n\nلاستفسارات العيادة فقط تقدر تتواصل مع ركيز على ${clinicPhoneDisplay}.`,
    identity:
      `${prefix}أنا دليل ركيز، مساعد العيادة في الموقع. أجاوبك من معلومات عيادة ركيز بالعربي أو الإنجليزي، وأفهم عبارات عمانية مثل: وين العيادة، بغيت أحجز، ودوامكم متى.`,
    about:
      `${prefix}ركيز هي عيادة علاج طبيعي وتأهيل في عبري، سلطنة عمان.\n\nما يميز ركيز:\n• أخصائيو علاج طبيعي مؤهلون من الأردن ومصر\n• فريق يحمل درجات جامعية في العلاج الطبيعي والتأهيل\n• رعاية مبنية على الأدلة والخبرة السريرية\n• برنامج علاج وتأهيل شخصي لكل مريض\n• تركيز على الحركة، تقليل الألم، تحسين الوظيفة، وجودة الحياة`,
    greeting:
      `${prefix}أنا دليل ركيز. أقدر أساعدك في أوقات العمل، الموقع، الخدمات، الأطباء، الحجز، وطرق التواصل.`,
    hours:
      `${prefix}${getOpenStatusLine('ar')}\n\nأوقات عمل ركيز:\n• من السبت إلى الخميس\n• 9 صباحا - 1 مساء\n• توجد استراحة خلال اليوم\n• 4 مساء - 8 مساء\n• يوم الجمعة مغلق`,
    location:
      `${prefix}موقع عيادة ركيز:\n• عبري، منطقة العراقي\n• بالقرب من لولو هايبر ماركت\n• سلطنة عمان\n\nتقدر تفتح خرائط Google من زر الموقع بالأسفل.`,
    booking:
      `${prefix}للحجز والتواصل:\n• رقم العيادة: ${clinicPhoneDisplay}\n• واتساب العيادة متوفر من الزر بالأسفل\n• رقم د. أسامة الموجود بالموقع: ${doctorPhone}`,
    doctors:
      `${prefix}فريق ركيز السريري:\n• د. أسامة جمال: رئيس أخصائيي العلاج الطبيعي، خبرة أكثر من 4 سنوات، معتمد في مفهوم موليغان، تقييم وتأهيل الأطفال، وتقييم وعلاج مفصل الحوض العجزي.\n• د. آلاء عبدالله: أخصائية علاج طبيعي، خبرة أكثر من 13 سنة، دكتوراه مهنية في العلاج الطبيعي العضلي الهيكلي، تدريب في الوخز بالإبر والحجامة الجافة، وخبرة في صحة المرأة.`,
    services:
      `${prefix}خدمات ركيز تشمل:\n• التأهيل العصبي: الجلطات، إصابات الحبل الشوكي، إصابات الدماغ، باركنسون، التصلب المتعدد، واضطرابات التوازن.\n• تأهيل العظام والمفاصل: آلام الظهر، الرقبة، الديسك، إصابات الكتف والركبة.\n• تأهيل الأطفال: تأخر النمو، صعوبات المشي، واضطرابات التوازن.\n• طرق العلاج: العلاج اليدوي، الكهربائي، الموجات فوق الصوتية، الحجامة، والتمارين العلاجية.`,
    process:
      `${prefix}مسار العلاج في ركيز يكون بشكل واضح:\n• تقييم سريري لمعرفة مصدر الألم وحدود الحركة ونقاط الضعف والأهداف اليومية\n• برنامج مخصص يجمع بين العلاج اليدوي والتمارين العلاجية والتدرج المناسب\n• متابعة التقدم جلسة بعد جلسة\n• إرشادات منزلية وتعليمات تساعدك ترجع بثقة وتحافظ على النتيجة`,
    price:
      `${prefix}الأسعار وتفاصيل التأمين غير مذكورة في الموقع.\n\nللتفاصيل الدقيقة تواصل مع العيادة على ${clinicPhoneDisplay} أو واتساب العيادة.`,
    fallback:
      `${prefix}أقدر أجاوبك حسب معلومات موقع ركيز عن: أوقات العمل، الموقع، الحجز، الخدمات، الأطباء، وطرق التواصل.\n\nللتشخيص الطبي أو الأسعار الدقيقة، الأفضل التواصل مع العيادة مباشرة.`,
  }

  return answers[intent] || answers.fallback
}

function getResponse(text, fallbackLanguage, forcedIntent) {
  const responseLanguage = forcedIntent ? fallbackLanguage : detectLanguage(text, fallbackLanguage)
  const intent = detectIntent(text, forcedIntent)
  const tone = responseLanguage === 'ar' ? getTone(text) : 'standard'
  const answer = responseLanguage === 'ar' ? answerInArabic(intent, tone) : answerInEnglish(intent)

  return { answer, intent, language: responseLanguage }
}

export default function RakeezGuide({ language }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const messagesRef = useRef(null)
  const messageIdRef = useRef(0)
  const currentUi = ui[language]
  const currentPrompts = useMemo(() => quickPrompts[language], [language])

  useEffect(() => {
    if (!messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages, isOpen])

  const sendMessage = (text = input, forcedIntent = null) => {
    const cleanText = text.trim()
    if (!cleanText) return

    const response = getResponse(cleanText, language, forcedIntent)
    messageIdRef.current += 1
    const stamp = messageIdRef.current

    setMessages((current) => [
      ...current,
      { id: `user-${stamp}`, sender: 'user', text: cleanText },
      {
        id: `bot-${stamp}`,
        intent: response.intent,
        language: response.language,
        sender: 'bot',
        text: response.answer,
      },
    ])
    setInput('')
    setIsOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  return (
    <aside className={`rakeez-guide ${isOpen ? 'open' : ''}`} aria-label={botName}>
      {isOpen && (
        <section className="guide-panel" aria-live="polite">
          <header className="guide-header">
            <div className="guide-avatar">
              <img alt="" src="/rakeez/rakeez-guide-avatar.png" />
            </div>
            <div>
              <strong>{currentUi.title}</strong>
              <span>{currentUi.status}</span>
            </div>
            <button
              aria-label={currentUi.closeLabel}
              className="guide-close"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <Icon name="close" size={18} />
            </button>
          </header>

          <div className="guide-capabilities">
            {currentUi.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div className="guide-messages" ref={messagesRef}>
            <div className="guide-message bot">
              {currentUi.welcome}
            </div>
            {messages.map((message) => (
              <div
                className={`guide-message ${message.sender}`}
                dir={message.language === 'ar' ? 'rtl' : 'ltr'}
                key={message.id}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="guide-prompts">
            {currentPrompts.map((prompt) => (
              <button key={prompt.intent} onClick={() => sendMessage(prompt.label, prompt.intent)} type="button">
                <Icon name={prompt.icon} size={15} />
                {prompt.label}
              </button>
            ))}
          </div>

          <form className="guide-input-row" onSubmit={handleSubmit}>
            <input
              aria-label={currentUi.placeholder}
              onChange={(event) => setInput(event.target.value)}
              placeholder={currentUi.placeholder}
              type="text"
              value={input}
            />
            <button aria-label={currentUi.sendLabel} type="submit">
              <Icon name="arrow" size={18} />
            </button>
          </form>

          <div className="guide-actions">
            <a href={links.clinicWhatsApp} rel="noreferrer" target="_blank">
              <Icon name="message" size={16} />
              {currentUi.clinicWhatsApp}
            </a>
            <a href={links.call}>
              <Icon name="phone" size={16} />
              {currentUi.call}
            </a>
            <a href={links.location} rel="noreferrer" target="_blank">
              <Icon name="map" size={16} />
              {currentUi.location}
            </a>
          </div>
        </section>
      )}

      <button
        aria-label={currentUi.openLabel}
        className="guide-toggle"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="guide-toggle-glow" aria-hidden="true" />
        <span className="guide-toggle-avatar" aria-hidden="true">
          <img alt="" src="/rakeez/rakeez-guide-avatar.png" />
        </span>
        <strong>{language === 'ar' ? 'دليل ركيز' : 'Guide'}</strong>
      </button>
    </aside>
  )
}
