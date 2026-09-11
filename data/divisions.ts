import type { Division } from '@/types/content';
export const divisions: readonly Division[] = [
  {
    id: 'contracting',
    title: { en: 'Contracting & EPC', ar: 'المقاولات والهندسة والتوريد والإنشاء' },
    description: {
      en: 'From civil works to considered interiors. Engineering, procurement and construction with every discipline in view.',
      ar: 'من الأعمال المدنية إلى التشطيبات الداخلية، ننسّق أعمال الهندسة والتوريد والإنشاء برؤية شاملة لجميع التخصصات.',
    },
    capabilities: {
      en: ['Building & civil works', 'Interior fit-out', 'Steel structures'],
      ar: ['المباني والأعمال المدنية', 'التجهيزات والتشطيبات الداخلية', 'الهياكل الفولاذية'],
    },
    image: '/images/projects/interlock-paving.webp',
    alt: { en: 'Site team laying interlock paving', ar: 'فريق العمل ينفّذ أعمال رصف الإنترلوك' },
    source: 'Profile INTR(3), A6:A9',
  },
  {
    id: 'hvac',
    title: { en: 'HVAC & MEP', ar: 'التكييف والأعمال الكهروميكانيكية' },
    description: {
      en: 'The systems that make buildings work. Integrated air conditioning, mechanical, electrical and plumbing services.',
      ar: 'أنظمة تمنح المباني كفاءتها التشغيلية، من التكييف إلى الأعمال الميكانيكية والكهربائية والصحية.',
    },
    capabilities: {
      en: ['Air conditioning & ducting', 'Chilled-water systems', 'Mechanical & electrical'],
      ar: ['التكييف ومجاري الهواء', 'أنظمة المياه المبرّدة', 'الأعمال الميكانيكية والكهربائية'],
    },
    image: '/images/projects/hvac-condensing-units.webp',
    alt: {
      en: 'Outdoor air conditioning units installed on a building',
      ar: 'وحدات تكييف خارجية مركّبة على واجهة مبنى',
    },
    source: 'Profile INTR(3), A10:A13',
  },
  {
    id: 'material-supply',
    title: { en: 'Industrial & Oil & Gas Supply', ar: 'توريد المواد الصناعية ومواد النفط والغاز' },
    description: {
      en: 'A practical supply resource for your operation. Industrial materials, tools and site essentials, organised around your needs.',
      ar: 'مصدر لتلبية متطلبات أعمالك من المواد الصناعية والأدوات ومستلزمات المواقع، وفق احتياجات مشروعك.',
    },
    capabilities: {
      en: ['Pipes, fittings & valves', 'Tools & consumables', 'Electrical & safety products'],
      ar: [
        'الأنابيب والوصلات والصمامات',
        'الأدوات والمواد الاستهلاكية',
        'المنتجات الكهربائية ومعدات السلامة',
      ],
    },
    image: '/images/products/copper-fittings.webp',
    alt: {
      en: 'Copper pipes and fittings from the supplied product catalog',
      ar: 'أنابيب ووصلات نحاسية من كتالوج المنتجات',
    },
    source: 'Product workbook, seven category sheets; Oil & Gas material supply cover',
  },
];
