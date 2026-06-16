export const clinicPhone = '+96876774747'
export const clinicPhoneDisplay = '76774747'
export const doctorPhone = '+96877700115'

export const links = {
  call: `tel:${clinicPhone}`,
  clinicWhatsApp:
    'https://api.whatsapp.com/send?phone=96876774747&text=Hello%20I%20would%20like%20to%20book%20an%20appointment',
  doctorWhatsApp:
    'https://api.whatsapp.com/send?phone=96877700115&text=Hello%20Dr.%20Osama,%20I%20have%20a%20question%20about%20physical%20therapy.',
  location: 'https://maps.app.goo.gl/ZidrrC131uggYeedA',
  instagram:
    'https://www.instagram.com/rakeez_physiotherapy?igsh=NWFmOXJtdDExOHlm&utm_source=qr',
}

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Team', href: '#team' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Hours', href: '#hours' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  {
    icon: 'clock',
    end: 13,
    start: 1,
    suffix: '+',
    label: 'Years of senior clinical experience',
    note: 'Led by experienced physiotherapists',
  },
  {
    icon: 'target',
    end: 4,
    suffix: '',
    label: 'Focused rehabilitation programs',
    note: 'Neuro, orthopedic, pediatric, methods',
  },
  {
    icon: 'activity',
    end: 1,
    suffix: ':1',
    label: 'Personalized treatment sessions',
    note: 'Care plans tailored to the patient',
  },
  {
    icon: 'map',
    value: 'Ibri',
    label: 'Al Iraqi, near Lulu Hypermarket',
    note: 'Easy clinic access and directions',
  },
]

export const team = [
  {
    name: 'Dr. Osama Jamal',
    role: 'Head Physiotherapist',
    image: '/rakeez/osama.jpeg',
    accent: 'lead',
    highlights: [
      '4+ years of experience in physiotherapy and rehabilitation',
      "Bachelor's degree in Physiotherapy from Jordan University of Science and Technology",
      'Certified in Mulligan Concept (MWM)',
      'Certified in pediatric assessment and rehabilitation',
      'Certified in sacroiliac joint assessment and treatment',
    ],
  },
  {
    name: 'Dr. Alaa Abdullah',
    role: 'Physiotherapist',
    image: '/rakeez/alaa.jpeg',
    accent: 'care',
    highlights: [
      '13+ years of experience in physiotherapy and rehabilitation',
      'Professional doctorate in musculoskeletal physiotherapy',
      'Training in acupuncture and dry cupping',
      "Experience in women's health physiotherapy",
    ],
  },
]

export const services = [
  {
    id: 'neurological',
    title: 'Neurological Rehabilitation',
    eyebrow: 'Neuro recovery',
    icon: 'brain',
    short: 'Stroke, spinal cord injury, brain injury and neurological rehabilitation.',
    description:
      'Helping patients recover mobility, function and independence after neurological injuries and disorders.',
    items: [
      'Stroke Rehabilitation',
      'Spinal Cord Injury Rehabilitation',
      'Brain Injury Rehabilitation',
      'Parkinson Disease Rehabilitation',
      'Multiple Sclerosis Rehabilitation',
      'Balance and Coordination Disorders',
    ],
  },
  {
    id: 'orthopedic',
    title: 'Orthopedic Rehabilitation',
    eyebrow: 'Pain and joints',
    icon: 'bone',
    short: 'Back pain, neck pain, disc conditions and joint injuries.',
    description:
      'Restoring strength, joint control and confidence after pain, injury or musculoskeletal limitation.',
    items: ['Back Pain', 'Neck Pain', 'Disc Problems', 'Shoulder Injuries', 'Knee Injuries'],
  },
  {
    id: 'pediatric',
    title: 'Pediatric Rehabilitation',
    eyebrow: 'Children movement',
    icon: 'child',
    short: 'Developmental delays, gait disorders and balance training.',
    description:
      'Supporting children in achieving healthy movement, balance and developmental milestones.',
    items: ['Developmental Delays', 'Walking Difficulties', 'Balance Disorders'],
  },
  {
    id: 'methods',
    title: 'Treatment Methods',
    eyebrow: 'Clinical toolkit',
    icon: 'spark',
    short: 'Manual therapy, electrotherapy, cupping and exercise therapy.',
    description:
      'Evidence-based techniques tailored to each patient needs and recovery goals.',
    items: [
      'Manual Therapy',
      'Electrotherapy',
      'Ultrasound Therapy',
      'Cupping Therapy',
      'Exercise Therapy',
    ],
  },
]

export const whyChoose = [
  'Personalized treatment plans',
  'Modern rehabilitation equipment',
  'Continuous progress monitoring',
  'Experienced physiotherapy team',
]

export const process = [
  {
    title: 'Clinical Assessment',
    text: 'A focused evaluation identifies pain sources, mobility limits, strength gaps and daily goals.',
  },
  {
    title: 'Custom Program',
    text: 'Your plan combines hands-on care, therapeutic exercise and guided progression.',
  },
  {
    title: 'Measured Recovery',
    text: 'Progress is reviewed session by session so treatment keeps matching your condition.',
  },
  {
    title: 'Return With Confidence',
    text: 'Education and home guidance help you protect the result beyond the clinic visit.',
  },
]

export const aboutText = [
  'Rakeez Physiotherapy and Rehabilitation Clinic is managed by a Jordanian administration team and staffed by qualified Jordanian and Egyptian physiotherapists.',
  'The team holds accredited university degrees in Physiotherapy and Rehabilitation from recognized institutions.',
  'Rakeez combines academic knowledge with clinical experience to deliver high-quality, evidence-based care.',
  'Every patient receives a personalized treatment and rehabilitation program tailored to their condition and goals.',
  'The mission is to help patients restore movement, reduce pain and improve quality of life.',
  'The clinic is committed to providing some of the highest standards of physiotherapy and rehabilitation services in the Ibri region.',
]

const arabicNavItems = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'الفريق', href: '#team' },
  { label: 'الخدمات', href: '#services' },
  { label: 'من نحن', href: '#about' },
  { label: 'الأوقات', href: '#hours' },
  { label: 'تواصل', href: '#contact' },
]

const arabicStats = [
  {
    icon: 'clock',
    end: 13,
    start: 1,
    suffix: '+',
    label: 'سنة من الخبرة السريرية المتقدمة',
    note: 'بإشراف أخصائيي علاج طبيعي ذوي خبرة',
  },
  {
    icon: 'target',
    end: 4,
    suffix: '',
    label: 'برامج تأهيل مركزة',
    note: 'عصبي، عظام، أطفال، وطرق علاجية',
  },
  {
    icon: 'activity',
    end: 1,
    suffix: ':1',
    label: 'جلسات علاجية شخصية',
    note: 'خطط علاج مصممة حسب حالة المريض',
  },
  {
    icon: 'map',
    value: 'عبري',
    label: 'العراقي، بالقرب من لولو هايبر ماركت',
    note: 'وصول سهل وتعليمات واضحة للموقع',
  },
]

const arabicTeam = [
  {
    name: 'د. أسامة جمال',
    role: 'رئيس أخصائيي العلاج الطبيعي',
    image: '/rakeez/osama.jpeg',
    accent: 'lead',
    highlights: [
      'أكثر من 4 سنوات خبرة في العلاج الطبيعي والتأهيل',
      'بكالوريوس علاج طبيعي من جامعة العلوم والتكنولوجيا الأردنية',
      'معتمد في مفهوم موليغان (MWM)',
      'معتمد في تقييم وتأهيل الأطفال',
      'معتمد في تقييم وعلاج مفصل الحوض العجزي',
    ],
  },
  {
    name: 'د. آلاء عبدالله',
    role: 'أخصائية علاج طبيعي',
    image: '/rakeez/alaa.jpeg',
    accent: 'care',
    highlights: [
      'أكثر من 13 سنة خبرة في العلاج الطبيعي والتأهيل',
      'دكتوراه مهنية في العلاج الطبيعي العضلي الهيكلي',
      'تدريب في الوخز بالإبر والحجامة الجافة',
      'خبرة في العلاج الطبيعي لصحة المرأة',
    ],
  },
]

const arabicServices = [
  {
    id: 'neurological',
    title: 'التأهيل العصبي',
    eyebrow: 'تعاف عصبي',
    icon: 'brain',
    short: 'تأهيل الجلطات وإصابات الحبل الشوكي والدماغ والحالات العصبية.',
    description:
      'مساعدة المرضى على استعادة الحركة والوظيفة والاستقلالية بعد الإصابات والاضطرابات العصبية.',
    items: [
      'تأهيل الجلطات',
      'تأهيل إصابات الحبل الشوكي',
      'تأهيل إصابات الدماغ',
      'تأهيل مرض باركنسون',
      'تأهيل التصلب المتعدد',
      'اضطرابات التوازن والتناسق',
    ],
  },
  {
    id: 'orthopedic',
    title: 'تأهيل العظام والمفاصل',
    eyebrow: 'الألم والمفاصل',
    icon: 'bone',
    short: 'آلام الظهر والرقبة ومشاكل الديسك وإصابات المفاصل.',
    description:
      'استعادة القوة والتحكم بالمفاصل والثقة بعد الألم أو الإصابة أو محدودية الحركة.',
    items: ['آلام الظهر', 'آلام الرقبة', 'مشاكل الديسك', 'إصابات الكتف', 'إصابات الركبة'],
  },
  {
    id: 'pediatric',
    title: 'تأهيل الأطفال',
    eyebrow: 'حركة الأطفال',
    icon: 'child',
    short: 'تأخر النمو وصعوبات المشي وتدريب التوازن.',
    description:
      'دعم الأطفال لتحقيق حركة صحية وتوازن ومراحل نمو مناسبة.',
    items: ['تأخر النمو', 'صعوبات المشي', 'اضطرابات التوازن'],
  },
  {
    id: 'methods',
    title: 'طرق العلاج',
    eyebrow: 'أدوات علاجية',
    icon: 'spark',
    short: 'العلاج اليدوي، العلاج الكهربائي، الحجامة، والتمارين العلاجية.',
    description:
      'تقنيات مبنية على الأدلة ومصممة حسب احتياج كل مريض وأهداف التعافي.',
    items: [
      'العلاج اليدوي',
      'العلاج الكهربائي',
      'العلاج بالموجات فوق الصوتية',
      'الحجامة',
      'التمارين العلاجية',
    ],
  },
]

const arabicProcess = [
  {
    title: 'تقييم سريري',
    text: 'تقييم مركز يحدد مصادر الألم وحدود الحركة ونقاط الضعف والأهداف اليومية.',
  },
  {
    title: 'برنامج مخصص',
    text: 'تجمع خطتك بين العلاج اليدوي والتمارين العلاجية والتدرج الموجه.',
  },
  {
    title: 'تعاف قابل للقياس',
    text: 'تتم مراجعة التقدم جلسة بعد جلسة حتى يبقى العلاج مناسبا لحالتك.',
  },
  {
    title: 'عودة بثقة',
    text: 'التثقيف والإرشادات المنزلية تساعدك على حماية النتائج بعد زيارة العيادة.',
  },
]

const arabicAboutText = [
  'تدار عيادة ركيز للعلاج الطبيعي والتأهيل من قبل فريق إداري أردني وتضم أخصائيي علاج طبيعي مؤهلين من الأردن ومصر.',
  'يحمل الفريق درجات جامعية معتمدة في العلاج الطبيعي والتأهيل من مؤسسات معترف بها.',
  'تجمع ركيز بين المعرفة الأكاديمية والخبرة السريرية لتقديم رعاية عالية الجودة ومبنية على الأدلة.',
  'يحصل كل مريض على برنامج علاج وتأهيل شخصي مصمم حسب حالته وأهدافه.',
  'رسالتنا هي مساعدة المرضى على استعادة الحركة وتقليل الألم وتحسين جودة الحياة.',
  'تلتزم العيادة بتقديم معايير متقدمة في خدمات العلاج الطبيعي والتأهيل في منطقة عبري.',
]

export const siteContent = {
  en: {
    documentTitle: 'Rakeez Physiotherapy & Rehabilitation | Ibri, Oman',
    brand: 'Rakeez Physiotherapy & Rehabilitation',
    navItems,
    header: {
      book: 'Book',
      call: `Call ${clinicPhoneDisplay}`,
      toggleLabel: 'AR',
      menuLabel: 'Toggle navigation menu',
    },
    hero: {
      imageAlt: 'Physiotherapy treatment at Rakeez clinic',
      eyebrow: 'Physiotherapy and Rehabilitation Clinic in Ibri, Oman',
      title: 'Rakeez Physiotherapy & Rehabilitation',
      copy:
        'Advanced rehabilitation, modern equipment and personalized care for patients who want to move better, recover stronger and return to daily life with confidence.',
      actions: {
        call: 'Call Now',
        whatsapp: 'Clinic WhatsApp',
        location: 'Location',
      },
    },
    stats,
    clinic: {
      eyebrow: 'Visit Our Clinic',
      title: 'A modern rehabilitation space built around movement.',
      copy:
        'Rakeez is designed to feel clear, calm and practical from the moment patients arrive, with direct access to booking and location details.',
      openLocation: 'Open Location',
      phoneLabel: 'Clinic phone',
      imageAlt: 'Rakeez Physiotherapy and Rehabilitation clinic frontage',
      captionTitle: 'Ibri - Al Iraqi',
      captionText: 'Near Lulu Hypermarket',
      highlights: [
        { value: '01', label: 'Easy arrival', text: 'Visible street frontage near Lulu Hypermarket in Ibri.' },
        { value: '02', label: 'Modern setup', text: 'A polished rehabilitation space prepared for movement-based care.' },
        { value: '03', label: 'Fast booking', text: 'Call or message the clinic before your visit.' },
      ],
    },
    team: {
      eyebrow: 'Our Team',
      title: 'Experienced physiotherapists dedicated to better movement.',
      copy:
        'Rakeez brings qualified Jordanian and Egyptian physiotherapists together around careful assessment, evidence-based treatment and practical recovery goals.',
      photoBadgeTop: 'Rakeez',
      photoBadgeBottom: 'Clinical Team',
      leadCare: 'Lead Care',
      specializedCare: 'Specialized Care',
      metricLabels: {
        leadFirst: ['MWM', 'Mulligan Concept'],
        leadSecond: ['Peds', 'Pediatric rehab'],
        careFirst: ['13+', 'Years experience'],
        careSecond: ['MSK', 'Musculoskeletal care'],
      },
      members: team,
    },
    services: {
      eyebrow: 'Services',
      title: 'Four focused programs, one personalized recovery plan.',
      copy:
        'Select a specialty to see what Rakeez provides, then contact the clinic for an assessment and treatment plan.',
      tabLabel: 'Rakeez services',
      services,
      whyChoose,
    },
    process: {
      eyebrow: 'Care Journey',
      title: 'A clear treatment pathway from assessment to return.',
      steps: process,
    },
    about: {
      eyebrow: 'About Rakeez',
      title: 'Clinical care with academic knowledge and practical experience.',
      copy:
        'Rakeez is built for patients who need thoughtful rehabilitation, not a generic checklist. The clinic focuses on movement, pain reduction and measurable function.',
      pillars: [
        { icon: 'shield', label: 'Evidence-based care' },
        { icon: 'target', label: 'Personalized goals' },
        { icon: 'activity', label: 'Measured progress' },
      ],
      standardLabel: 'Rakeez Standard',
      standardText: 'University-trained physiotherapists, tailored rehabilitation programs.',
      text: aboutText,
    },
    hours: {
      eyebrow: 'Open Hours',
      title: 'Business Hours',
      subtitle: 'Oman local time',
      openNow: 'Open Now',
      closed: 'Closed',
      breakTime: 'Break Time',
      closesIn: 'Closes in',
      opensIn: 'Opens in',
      breakLabel: 'Break',
      today: 'TODAY',
      closedLabel: 'Closed',
      scheduleLabel: 'Weekly schedule',
      mapLabel: 'Open Rakeez clinic location on Google Maps',
      mapTitle: 'Rakeez clinic location in Ibri, Oman',
      visitLabel: 'Visit Our Clinic',
      locationName: 'Ibri, Oman',
      coordA: 'Ibri',
      coordB: 'Oman',
      am: 'AM',
      pm: 'PM',
      hourUnit: 'h',
      minuteUnit: 'm',
      days: [
        { day: 'Sunday', short: 'SUN' },
        { day: 'Monday', short: 'MON' },
        { day: 'Tuesday', short: 'TUE' },
        { day: 'Wednesday', short: 'WED' },
        { day: 'Thursday', short: 'THU' },
        { day: 'Friday', short: 'FRI' },
        { day: 'Saturday', short: 'SAT' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Start your recovery today.',
      copy: 'Book an appointment or send a question to the clinic team.',
      cards: [
        { href: links.call, icon: 'phone', label: 'Call Clinic', value: clinicPhoneDisplay, text: 'Speak with reception' },
        { href: links.clinicWhatsApp, icon: 'message', label: 'WhatsApp', value: clinicPhoneDisplay, text: 'Fast appointment requests', external: true },
        { href: links.doctorWhatsApp, icon: 'activity', label: 'Doctor Osama', value: doctorPhone, text: 'Clinical questions', external: true },
        { href: links.instagram, icon: 'instagram', label: 'Instagram', value: 'Rakeez Physiotherapy', text: 'Clinic updates and care posts', external: true },
      ],
    },
    footer: {
      call: `Call ${clinicPhoneDisplay}`,
      tagline: 'Modern physiotherapy and rehabilitation care in Ibri, Oman.',
      quickLinksTitle: 'Quick Links',
      contactTitle: 'Contact',
      visitTitle: 'Visit',
      hoursTitle: 'Working Hours',
      hoursText: 'Saturday to Thursday, 9 AM - 1 PM and 4 PM - 8 PM. Closed Friday.',
      locationText: 'Ibri - Al Iraqi, near Lulu Hypermarket',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      location: 'Open Location',
      rights: 'All rights reserved.',
    },
    floating: {
      call: 'Call Rakeez clinic',
      whatsapp: 'WhatsApp Rakeez clinic',
      location: 'Open Rakeez location',
    },
  },
  ar: {
    documentTitle: 'ركيز للعلاج الطبيعي والتأهيل | عبري، عمان',
    brand: 'ركيز للعلاج الطبيعي والتأهيل',
    navItems: arabicNavItems,
    header: {
      book: 'احجز',
      call: `اتصل ${clinicPhoneDisplay}`,
      toggleLabel: 'EN',
      menuLabel: 'فتح وإغلاق القائمة',
    },
    hero: {
      imageAlt: 'جلسة علاج طبيعي في عيادة ركيز',
      eyebrow: 'عيادة العلاج الطبيعي والتأهيل في عبري، سلطنة عمان',
      title: 'ركيز للعلاج الطبيعي والتأهيل',
      copy:
        'تأهيل متقدم، أجهزة حديثة، ورعاية شخصية للمرضى الذين يريدون حركة أفضل وتعافيا أقوى وعودة واثقة للحياة اليومية.',
      actions: {
        call: 'اتصل الآن',
        whatsapp: 'واتساب العيادة',
        location: 'الموقع',
      },
    },
    stats: arabicStats,
    clinic: {
      eyebrow: 'زر عيادتنا',
      title: 'مساحة تأهيل حديثة مصممة حول الحركة.',
      copy:
        'صممت ركيز لتكون تجربة واضحة وهادئة وعملية منذ لحظة وصول المريض، مع سهولة الوصول إلى الحجز وتفاصيل الموقع.',
      openLocation: 'افتح الموقع',
      phoneLabel: 'هاتف العيادة',
      imageAlt: 'واجهة عيادة ركيز للعلاج الطبيعي والتأهيل',
      captionTitle: 'عبري - العراقي',
      captionText: 'بالقرب من لولو هايبر ماركت',
      highlights: [
        { value: '01', label: 'وصول سهل', text: 'واجهة واضحة على الشارع بالقرب من لولو هايبر ماركت في عبري.' },
        { value: '02', label: 'تجهيز حديث', text: 'مساحة تأهيل منظمة ومجهزة للعلاج القائم على الحركة.' },
        { value: '03', label: 'حجز سريع', text: 'اتصل أو راسل العيادة قبل زيارتك.' },
      ],
    },
    team: {
      eyebrow: 'فريقنا',
      title: 'أخصائيو علاج طبيعي بخبرة مخصصة لتحسين الحركة.',
      copy:
        'تجمع ركيز أخصائيي علاج طبيعي مؤهلين من الأردن ومصر حول تقييم دقيق، علاج مبني على الأدلة، وأهداف تعاف عملية.',
      photoBadgeTop: 'ركيز',
      photoBadgeBottom: 'الفريق السريري',
      leadCare: 'الرعاية الرئيسية',
      specializedCare: 'رعاية متخصصة',
      metricLabels: {
        leadFirst: ['MWM', 'مفهوم موليغان'],
        leadSecond: ['أطفال', 'تأهيل الأطفال'],
        careFirst: ['13+', 'سنوات خبرة'],
        careSecond: ['MSK', 'علاج عضلي هيكلي'],
      },
      members: arabicTeam,
    },
    services: {
      eyebrow: 'الخدمات',
      title: 'أربعة برامج مركزة وخطة تعاف شخصية واحدة.',
      copy:
        'اختر التخصص لمعرفة ما تقدمه ركيز، ثم تواصل مع العيادة للحصول على تقييم وخطة علاج مناسبة.',
      tabLabel: 'خدمات ركيز',
      services: arabicServices,
      whyChoose: ['خطط علاج شخصية', 'أجهزة تأهيل حديثة', 'متابعة مستمرة للتقدم', 'فريق علاج طبيعي متمرس'],
    },
    process: {
      eyebrow: 'رحلة العلاج',
      title: 'مسار علاج واضح من التقييم إلى العودة.',
      steps: arabicProcess,
    },
    about: {
      eyebrow: 'عن ركيز',
      title: 'رعاية سريرية تجمع المعرفة الأكاديمية والخبرة العملية.',
      copy:
        'بنيت ركيز للمرضى الذين يحتاجون إلى تأهيل مدروس وليس قائمة علاج عامة. تركز العيادة على الحركة وتقليل الألم وتحسين الوظيفة بشكل قابل للقياس.',
      pillars: [
        { icon: 'shield', label: 'رعاية مبنية على الأدلة' },
        { icon: 'target', label: 'أهداف شخصية' },
        { icon: 'activity', label: 'تقدم قابل للقياس' },
      ],
      standardLabel: 'معيار ركيز',
      standardText: 'أخصائيو علاج طبيعي مؤهلون جامعيا وبرامج تأهيل مصممة لكل حالة.',
      text: arabicAboutText,
    },
    hours: {
      eyebrow: 'أوقات العمل',
      title: 'ساعات العمل',
      subtitle: 'بتوقيت سلطنة عمان',
      openNow: 'مفتوح الآن',
      closed: 'مغلق',
      breakTime: 'استراحة',
      closesIn: 'يغلق بعد',
      opensIn: 'يفتح بعد',
      breakLabel: 'استراحة',
      today: 'اليوم',
      closedLabel: 'مغلق',
      scheduleLabel: 'جدول أوقات العمل الأسبوعي',
      mapLabel: 'افتح موقع عيادة ركيز على خرائط Google',
      mapTitle: 'موقع عيادة ركيز في عبري، عمان',
      visitLabel: 'زر عيادتنا',
      locationName: 'عبري، عمان',
      coordA: 'عبري',
      coordB: 'عمان',
      am: 'ص',
      pm: 'م',
      hourUnit: 'س',
      minuteUnit: 'د',
      days: [
        { day: 'الأحد', short: 'الأحد' },
        { day: 'الاثنين', short: 'الاثنين' },
        { day: 'الثلاثاء', short: 'الثلاثاء' },
        { day: 'الأربعاء', short: 'الأربعاء' },
        { day: 'الخميس', short: 'الخميس' },
        { day: 'الجمعة', short: 'الجمعة' },
        { day: 'السبت', short: 'السبت' },
      ],
    },
    contact: {
      eyebrow: 'تواصل',
      title: 'ابدأ رحلة التعافي اليوم.',
      copy: 'احجز موعدا أو أرسل سؤالك إلى فريق العيادة.',
      cards: [
        { href: links.call, icon: 'phone', label: 'اتصل بالعيادة', value: clinicPhoneDisplay, text: 'تواصل مع الاستقبال' },
        { href: links.clinicWhatsApp, icon: 'message', label: 'واتساب', value: clinicPhoneDisplay, text: 'طلبات حجز سريعة', external: true },
        { href: links.doctorWhatsApp, icon: 'activity', label: 'د. أسامة', value: doctorPhone, text: 'أسئلة سريرية', external: true },
        { href: links.instagram, icon: 'instagram', label: 'إنستغرام', value: 'Rakeez Physiotherapy', text: 'تحديثات العيادة ونصائح الرعاية', external: true },
      ],
    },
    footer: {
      call: `اتصل ${clinicPhoneDisplay}`,
      tagline: 'رعاية حديثة في العلاج الطبيعي والتأهيل في عبري، سلطنة عمان.',
      quickLinksTitle: 'روابط سريعة',
      contactTitle: 'تواصل',
      visitTitle: 'الموقع',
      hoursTitle: 'أوقات العمل',
      hoursText: 'من السبت إلى الخميس، 9 صباحا - 1 مساء و 4 مساء - 8 مساء. الجمعة مغلق.',
      locationText: 'عبري - العراقي، بالقرب من لولو هايبر ماركت',
      whatsapp: 'واتساب',
      instagram: 'إنستغرام',
      location: 'افتح الموقع',
      rights: 'جميع الحقوق محفوظة.',
    },
    floating: {
      call: 'اتصل بعيادة ركيز',
      whatsapp: 'واتساب عيادة ركيز',
      location: 'افتح موقع ركيز',
    },
  },
}
