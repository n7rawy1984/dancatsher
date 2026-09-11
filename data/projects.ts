import type { Project } from '@/types/content';
export const projects: readonly Project[] = [
  {
    id: 'external-works',
    title: { en: 'External works', ar: 'الأعمال الخارجية' },
    category: { en: 'CIVIL & BUILDING WORKS', ar: 'الأعمال المدنية والمباني' },
    workType: 'civil',
    image: '/images/projects/shopping-centre-exterior.webp',
    alt: {
      en: 'Paved approach outside Madinat Zayed Shopping Centre',
      ar: 'الممرات المرصوفة أمام مركز مدينة زايد للتسوق',
    },
    source: 'DCS Image 260830-1125.jpg',
  },
  {
    id: 'hvac-installation',
    title: { en: 'HVAC installation', ar: 'تركيب أنظمة التكييف' },
    category: { en: 'BUILDING SERVICES', ar: 'خدمات المباني' },
    workType: 'hvac',
    image: '/images/projects/hvac-condensing-units.webp',
    alt: {
      en: 'Installed outdoor air conditioning condensing units',
      ar: 'وحدات تكثيف خارجية مركّبة لأنظمة التكييف',
    },
    source: 'DCS IMAGE 260830-1126.jpg',
  },
  {
    id: 'interior-fitout',
    title: { en: 'Interior fit-out', ar: 'التجهيزات الداخلية' },
    category: { en: 'FINISHING WORKS', ar: 'أعمال التشطيبات' },
    workType: 'fitout',
    image: '/images/projects/bathroom-fitout.webp',
    alt: {
      en: 'Bathroom fit-out showing wall finishes, mirror and basin',
      ar: 'تجهيزات حمّام تشمل تشطيبات الجدران والمرآة والمغسلة',
    },
    source: 'DCS IMAGE 260830-1131.jpg',
  },
  {
    id: 'interlock-paving',
    title: { en: 'Interlock & paving works', ar: 'أعمال الإنترلوك والرصف' },
    category: { en: 'CIVIL & EXTERNAL WORKS', ar: 'الأعمال المدنية والخارجية' },
    workType: 'civil',
    image: '/images/projects/interlock-paving.webp',
    alt: {
      en: 'Site team installing interlock paving blocks',
      ar: 'فريق موقع يركّب بلاط الإنترلوك',
    },
    source: 'DCS IMAGE 260830-1127.jpg',
  },
  {
    id: 'masonry-works',
    title: { en: 'Masonry works', ar: 'أعمال المباني بالطابوق' },
    category: { en: 'BUILDING WORKS', ar: 'أعمال المباني' },
    workType: 'building',
    image: '/images/projects/blockwork-masonry.webp',
    alt: {
      en: 'Worker laying lightweight masonry blocks on site',
      ar: 'عامل ينفّذ أعمال بناء بالطابوق الخفيف في الموقع',
    },
    source: 'DCS IMAGE 260830-1128.jpg',
  },
  {
    id: 'bathroom-finishes',
    title: { en: 'Bathroom finishing works', ar: 'أعمال تشطيب حمّام' },
    category: { en: 'INTERIOR FIT-OUT', ar: 'التجهيزات الداخلية' },
    workType: 'fitout',
    image: '/images/projects/bathroom-detail.webp',
    alt: {
      en: 'Bathroom wall tiling, sanitary fittings and shower installation',
      ar: 'تبليط جدران حمّام وتركيب الأدوات الصحية والدش',
    },
    source: 'DCS IMAGE 260830-1130.jpg',
  },
];
