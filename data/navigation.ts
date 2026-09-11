import type { Localized } from '@/types/content';
export const navigation: readonly { path: string; label: Localized; description: Localized }[] = [
  {
    path: '',
    label: { en: 'Home', ar: 'الرئيسية' },
    description: {
      en: 'Engineering, building and industrial material supply in Abu Dhabi.',
      ar: 'الهندسة والمقاولات وتوريد المواد الصناعية في أبوظبي.',
    },
  },
  {
    path: 'about',
    label: { en: 'About', ar: 'عن الشركة' },
    description: {
      en: 'Meet DANCATSHER and the engineering experience behind our work.',
      ar: 'تعرّف على دان كاتشر والخبرات الهندسية التي يقوم عليها عملنا.',
    },
  },
  {
    path: 'divisions',
    label: { en: 'Divisions', ar: 'قطاعاتنا' },
    description: {
      en: 'Discover our contracting, HVAC and material supply capabilities.',
      ar: 'تعرّف على قدراتنا في المقاولات والتكييف وتوريد المواد.',
    },
  },
  {
    path: 'products',
    label: { en: 'Products', ar: 'المنتجات' },
    description: {
      en: 'Explore industrial product categories for your project requirements.',
      ar: 'اكتشف فئات المنتجات الصناعية التي تلبي احتياجات مشروعك.',
    },
  },
  {
    path: 'projects',
    label: { en: 'Projects', ar: 'أعمالنا' },
    description: {
      en: 'An introduction to our site work and building services.',
      ar: 'لمحة عن الأعمال الميدانية وخدمات المباني.',
    },
  },
  {
    path: 'qhse',
    label: { en: 'QHSE', ar: 'الجودة والسلامة' },
    description: {
      en: 'Our approach to quality, health, safety and the environment.',
      ar: 'نهجنا في الجودة والصحة والسلامة والبيئة.',
    },
  },
  {
    path: 'contact',
    label: { en: 'Contact', ar: 'تواصل معنا' },
    description: {
      en: 'Discuss your contracting, building services or material requirements with DCS.',
      ar: 'ناقش معنا احتياجاتك في المقاولات وخدمات المباني وتوريد المواد.',
    },
  },
];
