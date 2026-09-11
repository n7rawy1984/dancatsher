import type { ProductCategory } from '@/types/content';
export const productCategories: readonly ProductCategory[] = [
  {
    id: 'packing-adhesives',
    title: { en: 'Packing & Adhesive Products', ar: 'مواد التغليف والمواد اللاصقة' },
    description: {
      en: 'Tapes, films and packing essentials',
      ar: 'أشرطة وأغشية ومستلزمات التغليف',
    },
    sourceSheet: 'PACKING(1)',
    image: '/images/products/packing-tapes.webp',
    alt: {
      en: 'Clear packing tapes from the supplied product catalog',
      ar: 'أشرطة تغليف شفافة من كتالوج المنتجات المقدم',
    },
    products: [
      { name: { en: 'Aluminium foil tape', ar: 'شريط رقائق الألومنيوم' }, cell: 'B6' },
      { name: { en: 'BOPP tapes', ar: 'أشرطة BOPP' }, cell: 'B7' },
      { name: { en: 'Duct tape', ar: 'شريط لاصق لمجاري الهواء' }, cell: 'B8' },
      { name: { en: 'Masking tape', ar: 'شريط لاصق ورقي' }, cell: 'B9' },
      { name: { en: 'Plastic stretch film', ar: 'أغشية بلاستيكية قابلة للتمدد' }, cell: 'B10' },
      { name: { en: 'Warning tape', ar: 'شريط تحذيري' }, cell: 'B19' },
    ],
  },
  {
    id: 'pipes-fittings',
    title: { en: 'Pipes & Fittings', ar: 'الأنابيب والوصلات' },
    description: {
      en: 'Pipes, fittings and valves for your project',
      ar: 'أنابيب ووصلات وصمامات لمتطلبات مشروعك',
    },
    sourceSheet: 'Pipe&Fit(2)',
    image: '/images/products/steel-pipes.webp',
    alt: {
      en: 'Stainless steel pipes from the supplied product catalog',
      ar: 'أنابيب من الفولاذ المقاوم للصدأ من كتالوج المنتجات المقدم',
    },
    products: [
      { name: { en: 'Valves', ar: 'الصمامات' }, cell: 'B2' },
      { name: { en: 'PVC pipes & fittings', ar: 'أنابيب ووصلات PVC' }, cell: 'B3' },
      { name: { en: 'PPR pipes & fittings', ar: 'أنابيب ووصلات PPR' }, cell: 'B4' },
      { name: { en: 'GI pipes & fittings', ar: 'أنابيب ووصلات الحديد المجلفن' }, cell: 'B5' },
      {
        name: { en: 'Carbon steel pipes & fittings', ar: 'أنابيب ووصلات الفولاذ الكربوني' },
        cell: 'B6',
      },
      {
        name: { en: 'Stainless steel pipes & fittings', ar: 'أنابيب ووصلات الفولاذ المقاوم للصدأ' },
        cell: 'B7',
      },
      { name: { en: 'Copper pipes & fittings', ar: 'أنابيب ووصلات النحاس' }, cell: 'B9' },
      { name: { en: 'Sanitary accessories', ar: 'الملحقات الصحية' }, cell: 'B8' },
    ],
  },
  {
    id: 'welding',
    title: { en: 'Welding Consumables & Accessories', ar: 'مستهلكات اللحام وملحقاته' },
    description: {
      en: 'Welding rods, nozzles and protective accessories',
      ar: 'قضبان وفوهات اللحام وملحقات الوقاية',
    },
    sourceSheet: 'WELDING ACCESSOR (3)',
    image: '/images/products/welding-nozzles.webp',
    alt: {
      en: 'Ceramic welding nozzles from the supplied product catalog',
      ar: 'فوهات لحام خزفية من كتالوج المنتجات المقدم',
    },
    products: [
      { name: { en: 'Welding gas-lens nozzles', ar: 'فوهات عدسات غاز اللحام' }, cell: 'N3' },
      { name: { en: 'Flashback arrestors', ar: 'مانعات ارتداد اللهب' }, cell: 'N4' },
      { name: { en: 'Welding rods', ar: 'قضبان اللحام' }, cell: 'N8' },
      { name: { en: 'Welding helmets', ar: 'أقنعة اللحام' }, cell: 'N5' },
      { name: { en: 'Welding leather aprons', ar: 'مرايل لحام جلدية' }, cell: 'N6' },
      { name: { en: 'Welding gloves', ar: 'قفازات لحام جلدية' }, cell: 'N12' },
    ],
  },
  {
    id: 'hand-tools',
    title: { en: 'Manual Hand Tools', ar: 'الأدوات اليدوية' },
    description: {
      en: 'Measuring, cutting and everyday site tools',
      ar: 'أدوات القياس والقطع والعمل اليومي في المواقع',
    },
    sourceSheet: 'MAN TOOLS(4)',
    image: '/images/products/hand-tools-spanners.webp',
    alt: {
      en: 'Set of spanners from the supplied product catalog',
      ar: 'مجموعة مفاتيح ربط من كتالوج المنتجات المقدم',
    },
    products: [
      { name: { en: 'Measuring tapes', ar: 'أشرطة القياس' }, cell: 'B2' },
      { name: { en: 'Spanners & wrenches', ar: 'مفاتيح الربط' }, cell: 'B4' },
      { name: { en: 'Hammers', ar: 'المطارق' }, cell: 'B5' },
      { name: { en: 'Spirit levels', ar: 'موازين الاستواء' }, cell: 'B3' },
      { name: { en: 'Cutting & grinding discs', ar: 'أقراص القطع والجلخ' }, cell: 'B6' },
      { name: { en: 'Drill bits', ar: 'لقم الثقب' }, cell: 'B7' },
      { name: { en: 'Hand saws', ar: 'المناشير اليدوية' }, cell: 'B11' },
    ],
  },
  {
    id: 'power-tools',
    title: { en: 'Electrical / Power Tools', ar: 'الأدوات الكهربائية' },
    description: {
      en: 'Drills, grinders and workshop equipment',
      ar: 'مثاقب وآلات جلخ ومعدات الورش',
    },
    sourceSheet: 'ELEC POWER TOOLS(5)',
    image: '/images/products/power-tool-jigsaw.webp',
    alt: {
      en: 'Electric jigsaw from the supplied product catalog',
      ar: 'منشار أركت كهربائي من كتالوج المنتجات المقدم',
    },
    products: [
      { name: { en: 'Corded drills', ar: 'مثاقب سلكية' }, cell: 'B2' },
      { name: { en: 'Cordless drills', ar: 'مثاقب لاسلكية' }, cell: 'B3' },
      { name: { en: 'Grinders', ar: 'آلات الجلخ' }, cell: 'B4' },
      { name: { en: 'Jigsaws', ar: 'مناشير الأركت' }, cell: 'B5' },
      { name: { en: 'Cut-off machines', ar: 'آلات القطع' }, cell: 'B6' },
      { name: { en: 'Polishing machines', ar: 'آلات التلميع' }, cell: 'B7' },
      { name: { en: 'Painting machines', ar: 'آلات الطلاء' }, cell: 'B8' },
    ],
  },
  {
    id: 'ppe',
    title: { en: 'Personal Protective Equipment', ar: 'معدات الوقاية الشخصية' },
    description: {
      en: 'Workwear, helmets, gloves and eye protection',
      ar: 'ملابس عمل وخوذ وقفازات ووسائل حماية العين',
    },
    sourceSheet: 'PPE(6)',
    image: '/images/products/ppe-safety-helmet.webp',
    alt: {
      en: 'White safety helmet from the supplied product catalog',
      ar: 'خوذة سلامة بيضاء من كتالوج المنتجات المقدم',
    },
    products: [
      { name: { en: 'Coveralls', ar: 'بدلات العمل' }, cell: 'B2' },
      { name: { en: 'Safety shoes', ar: 'أحذية السلامة' }, cell: 'B3' },
      { name: { en: 'Protective gloves', ar: 'قفازات الوقاية' }, cell: 'B4' },
      { name: { en: 'Face masks', ar: 'أقنعة الوجه' }, cell: 'B5' },
      { name: { en: 'Safety helmets', ar: 'خوذ السلامة' }, cell: 'B6' },
      { name: { en: 'Protective goggles', ar: 'نظارات الوقاية' }, cell: 'B8' },
    ],
  },
  {
    id: 'electrical',
    title: { en: 'Electrical Products', ar: 'المنتجات الكهربائية' },
    description: {
      en: 'Cables, distribution and electrical accessories',
      ar: 'كابلات ومنتجات توزيع وملحقات كهربائية',
    },
    sourceSheet: 'ELEC. PROD(7)',
    image: '/images/products/electrical-cables.webp',
    alt: {
      en: 'Electrical cable conductors from the supplied product catalog',
      ar: 'موصلات كابلات كهربائية من كتالوج المنتجات المقدم',
    },
    products: [
      {
        name: { en: 'Power, LV & data cables', ar: 'كابلات الطاقة والجهد المنخفض والبيانات' },
        cell: 'B4',
      },
      { name: { en: 'Cable glands', ar: 'جلاندات الكابلات' }, cell: 'B6' },
      { name: { en: 'Junction boxes', ar: 'علب التوصيل' }, cell: 'B5' },
      { name: { en: 'Circuit breakers', ar: 'قواطع الدائرة' }, cell: 'B7' },
      { name: { en: 'Distribution boards', ar: 'لوحات التوزيع' }, cell: 'B8' },
      { name: { en: 'Switches & sockets', ar: 'المفاتيح والمقابس' }, cell: 'B9' },
      { name: { en: 'Conduits', ar: 'المواسير الكهربائية' }, cell: 'B13' },
    ],
  },
];
