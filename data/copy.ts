import type { Locale } from '@/types/content';
const en = {
  homeTitle: 'Engineering, Contracting & Material Supply',
  brand: 'DANCATSHER',
  brandSub: 'CONTRACTING L.L.C.',
  tagline: 'ENGINEERING • CONTRACTING • MATERIAL SUPPLY',
  location: 'ABU DHABI, UAE',
  language: 'العربية',
  menu: 'Open navigation',
  closeMenu: 'Close navigation',
  mainNav: 'Main navigation',
  footerNav: 'Footer navigation',
  skip: 'Skip to content',
  quote: 'Request a quote',
  explore: 'Explore our capabilities',
  learn: 'Explore division',
  allProducts: 'Explore the product range',
  allProjects: 'View our work',
  aboutLink: 'More about DANCATSHER',
  back: 'Back to home',
  hero: {
    eyebrow: 'BUILT ON EXPERTISE. DRIVEN BY PRECISION.',
    lines: ['Engineering.', 'Building.', 'Supplying.'],
    description:
      'One UAE partner for contracting, HVAC and industrial material supply. Bringing the right expertise to every stage of your project.',
    caption: 'ON SITE / EXTERNAL WORKS',
    drawingLabel: 'DCS / ABU DHABI',
    note: 'From the ground up. Down to the detail.',
    imageAlt: 'Architecture and paved external areas at Madinat Zayed Shopping Centre',
  },
  stats: [
    { value: '2018', label: 'Established in Abu Dhabi' },
    { value: '30+', label: 'Years of combined team experience' },
    { value: '03', label: 'Integrated divisions' },
    { value: 'UAE', label: 'Based. Project focused.' },
  ],
  divisions: {
    eyebrow: '01 / OUR DIVISIONS',
    title: 'Three disciplines.\nOne committed partner.',
    description:
      'Connected capabilities for the built environment. From project execution to the systems and materials that support it.',
  },
  products: {
    eyebrow: '02 / INDUSTRIAL MATERIAL SUPPLY',
    title: 'The right materials.\nA stronger foundation.',
    description:
      'A focused range of industrial products and site essentials. Tell us your requirements; we’ll help define the supply.',
    feature: 'MATERIAL SPOTLIGHT',
    featureTitle: 'Pipes & fittings',
    featureDescription:
      'Copper, stainless steel, GI, CS, PVC and PPR pipes and fittings, alongside valves and sanitary accessories.',
    featureCta: 'Enquire about pipes & fittings',
    imageAlt: 'Stainless steel pipes from the DCS product workbook',
    categories: 'PRODUCT CATEGORIES',
    note: 'Supply is subject to your requirements and availability. Specifications are confirmed with each enquiry.',
  },
  about: {
    eyebrow: '03 / THE DCS APPROACH',
    title: 'A joined-up approach.\nFrom plan to site.',
    description:
      'Established in Abu Dhabi in 2018, DANCATSHER brings engineering, building services and material supply together under one roof.',
    body: 'Our team draws on more than 30 years of combined EPC experience. By coordinating civil, mechanical and electrical disciplines from the outset, we help clients plan work with the whole project in view.',
    imageAlt: 'Two site workers carefully installing interlock paving',
    badge: 'COMBINED TEAM\nEXPERIENCE',
    pillars: ['Coordinated disciplines', 'Considered planning', 'Lasting relationships'],
  },
  projects: {
    eyebrow: '04 / FROM THE SITE',
    title: 'Practical expertise.\nVisible in the details.',
    description: 'A closer look at civil works, building services and interior finishes.',
    note: 'Site photographs illustrate the work activities shown.',
  },
  qhse: {
    eyebrow: '05 / QUALITY, HEALTH, SAFETY & ENVIRONMENT',
    title: 'Quality in the work.\nResponsibility in the process.',
    description:
      'Our approach is grounded in systematic working practices, supplier quality oversight and a commitment to health, safety and the environment.',
    link: 'Our QHSE approach',
    items: [
      {
        title: 'Quality oversight',
        body: 'Evaluating and monitoring contractors and suppliers against project quality requirements.',
      },
      {
        title: 'Safety & environment',
        body: 'Keeping health, safety and environmental considerations central to site operations.',
      },
      {
        title: 'Disciplined delivery',
        body: 'Coordinating budgets, construction schedules and disciplines around client requirements.',
      },
    ],
  },
  why: {
    eyebrow: 'WHY DANCATSHER',
    title: 'The people. The planning. The follow-through.',
    items: [
      {
        title: 'Experienced people',
        body: 'An engineering and management team with a background in EPC work in the UAE and beyond.',
      },
      {
        title: 'Connected expertise',
        body: 'Civil, MEP and supply capabilities that support a coordinated approach to your project.',
      },
      {
        title: 'Clear commitments',
        body: 'A focus on timely delivery, professional working relationships and transparent communication.',
      },
    ],
  },
  contact: {
    eyebrow: 'LET’S DISCUSS YOUR REQUIREMENTS',
    title: 'Tell us what\nyou need.',
    description:
      'A project to build. A system to install. Materials to source. Start a conversation with our team.',
    email: 'EMAIL OUR TEAM',
    phone: 'CALL OUR OFFICE',
    visit: 'OUR OFFICE',
    formTitle: 'Your enquiry starts here',
    name: 'Full name',
    business: 'Company',
    emailLabel: 'Email address',
    division: 'Area of interest',
    requirements: 'Your requirements',
    choose: 'Select a division',
    submit: 'Review enquiry',
    notice:
      'This form lets you prepare an enquiry. To send it, use the email link after reviewing your details.',
    ready:
      'Your enquiry is ready to email. It has not been sent. Open your email app and send it to our team.',
    send: 'Open email with enquiry',
    invalid: 'Please complete the required fields and enter a valid email address.',
    required: 'Required fields',
    emailSubject: 'Website enquiry',
    privacy: 'Your details stay in this browser until you choose to send an email.',
  },
  footer: {
    description: 'Engineering expertise. Practical delivery.\nA partner for what comes next.',
    navigation: 'EXPLORE',
    divisions: 'OUR DIVISIONS',
    contact: 'GET IN TOUCH',
    rights: 'DANCATSHER Contracting L.L.C. All rights reserved.',
    poBox: 'P.O. Box',
    closing: 'ENGINEERING. BUILDING. SUPPLYING.',
  },
  notFound: { title: 'Page not found', body: 'The page you requested is not available.' },
};
type CopyShape<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? CopyShape<U>[]
    : { [K in keyof T]: CopyShape<T[K]> };
const ar: CopyShape<typeof en> = {
  homeTitle: 'الهندسة والمقاولات وتوريد المواد',
  brand: 'DANCATSHER',
  brandSub: 'دانكاتشر للمقاولات ذ.م.م.',
  tagline: 'الهندسة • المقاولات • توريد المواد',
  location: 'أبوظبي، الإمارات',
  language: 'English',
  menu: 'فتح قائمة التنقل',
  closeMenu: 'إغلاق قائمة التنقل',
  mainNav: 'التنقل الرئيسي',
  footerNav: 'روابط تذييل الصفحة',
  skip: 'انتقل إلى المحتوى',
  quote: 'اطلب عرض سعر',
  explore: 'اكتشف قدراتنا',
  learn: 'اكتشف القطاع',
  allProducts: 'استعرض فئات المنتجات',
  allProjects: 'استعرض أعمالنا',
  aboutLink: 'المزيد عن دانكاتشر',
  back: 'العودة إلى الرئيسية',
  hero: {
    eyebrow: 'خبرة راسخة. ودقّة في التنفيذ.',
    lines: ['نهندس.', 'نبني.', 'نورّد.'],
    description:
      'شريكك في الإمارات للمقاولات والتكييف وتوريد المواد الصناعية. نضع الخبرة المناسبة في خدمة كل مرحلة من مشروعك.',
    caption: 'من الموقع / الأعمال الخارجية',
    drawingLabel: 'DCS / أبوظبي',
    note: 'من الأساسات إلى أدقّ التفاصيل.',
    imageAlt: 'الواجهة المعمارية والساحات المرصوفة في مركز مدينة زايد للتسوق',
  },
  stats: [
    { value: '2018', label: 'تأسّست في أبوظبي' },
    { value: '30+', label: 'عاماً من الخبرة المشتركة للفريق' },
    { value: '03', label: 'قطاعات متكاملة' },
    { value: 'UAE', label: 'مقرّنا الإمارات. واهتمامنا مشروعك.' },
  ],
  divisions: {
    eyebrow: '٠١ / قطاعاتنا',
    title: 'ثلاثة تخصصات.\nشريك واحد ملتزم.',
    description:
      'قدرات متكاملة لخدمة قطاع البناء، من تنفيذ المشاريع إلى الأنظمة والمواد التي تدعمها.',
  },
  products: {
    eyebrow: '٠٢ / توريد المواد الصناعية',
    title: 'المواد المناسبة.\nلأساس أكثر متانة.',
    description:
      'مجموعة مختارة من المنتجات الصناعية ومستلزمات المواقع. شاركنا متطلباتك لنحدّد احتياجات التوريد معاً.',
    feature: 'من فئات منتجاتنا',
    featureTitle: 'الأنابيب والوصلات',
    featureDescription:
      'أنابيب ووصلات النحاس والفولاذ المقاوم للصدأ والحديد المجلفن والفولاذ الكربوني وPVC وPPR، إلى جانب الصمامات والملحقات الصحية.',
    featureCta: 'استفسر عن الأنابيب والوصلات',
    imageAlt: 'أنابيب من الفولاذ المقاوم للصدأ من كتالوج دانكاتشر',
    categories: 'فئات المنتجات',
    note: 'يخضع التوريد لمتطلباتك وتوافر المواد، وتُحدَّد المواصفات عند دراسة كل استفسار.',
  },
  about: {
    eyebrow: '٠٣ / نهج دانكاتشر',
    title: 'رؤية متكاملة.\nمن المخطّط إلى الموقع.',
    description:
      'تأسّست دانكاتشر في أبوظبي عام 2018، لتجمع الهندسة وخدمات المباني وتوريد المواد تحت سقف واحد.',
    body: 'يستند فريقنا إلى أكثر من 30 عاماً من الخبرة المشتركة في الهندسة والتوريد والإنشاء. ومن خلال التنسيق المبكر بين التخصصات المدنية والميكانيكية والكهربائية، نساعد عملاءنا على التخطيط برؤية شاملة للمشروع.',
    imageAlt: 'عاملان ينفّذان أعمال رصف الإنترلوك بعناية',
    badge: 'خبرة الفريق\nالمشتركة',
    pillars: ['تنسيق بين التخصصات', 'تخطيط مدروس', 'علاقات مستدامة'],
  },
  projects: {
    eyebrow: '٠٤ / من مواقع العمل',
    title: 'خبرة عملية.\nتظهر في التفاصيل.',
    description: 'نظرة أقرب إلى الأعمال المدنية وخدمات المباني والتشطيبات الداخلية.',
    note: 'توضّح صور المواقع طبيعة الأعمال المعروضة.',
  },
  qhse: {
    eyebrow: '٠٥ / الجودة والصحة والسلامة والبيئة',
    title: 'جودة في العمل.\nومسؤولية في التنفيذ.',
    description:
      'يقوم نهجنا على إجراءات عمل منظّمة ومتابعة جودة المورّدين، مع الالتزام بالصحة والسلامة وحماية البيئة.',
    link: 'نهجنا في الجودة والسلامة',
    items: [
      {
        title: 'متابعة الجودة',
        body: 'تقييم المقاولين والمورّدين ومتابعة أدائهم وفق متطلبات الجودة الخاصة بالمشروع.',
      },
      {
        title: 'السلامة والبيئة',
        body: 'وضع اعتبارات الصحة والسلامة والبيئة في صميم العمل الميداني.',
      },
      {
        title: 'تنفيذ منظّم',
        body: 'تنسيق الميزانيات والجداول الزمنية والتخصصات بما يلبي متطلبات العميل.',
      },
    ],
  },
  why: {
    eyebrow: 'لماذا دانكاتشر',
    title: 'كفاءات متمرسة. تخطيط دقيق. متابعة مستمرة.',
    items: [
      {
        title: 'فريق ذو خبرة',
        body: 'مهندسون وإداريون بخبرة في مشاريع الهندسة والتوريد والإنشاء داخل الإمارات وخارجها.',
      },
      {
        title: 'تخصصات متكاملة',
        body: 'قدرات مدنية وكهروميكانيكية وتوريد تدعم التنسيق بين مختلف جوانب مشروعك.',
      },
      {
        title: 'التزامات واضحة',
        body: 'اهتمام بمواعيد التسليم وعلاقات العمل المهنية والتواصل الواضح.',
      },
    ],
  },
  contact: {
    eyebrow: 'لنتحدّث عن متطلباتك',
    title: 'أخبرنا بما\nتحتاج إليه.',
    description:
      'مشروع تنوي تنفيذه. نظام ترغب في تركيبه. مواد تحتاج إلى توريدها. تواصل مع فريقنا لنبدأ الحوار.',
    email: 'راسل فريقنا',
    phone: 'اتصل بمكتبنا',
    visit: 'مكتبنا',
    formTitle: 'استفسارك يبدأ هنا',
    name: 'الاسم الكامل',
    business: 'الشركة',
    emailLabel: 'البريد الإلكتروني',
    division: 'مجال الاهتمام',
    requirements: 'متطلباتك',
    choose: 'اختر القطاع',
    submit: 'مراجعة الاستفسار',
    notice:
      'يتيح لك هذا النموذج إعداد استفسارك. لإرساله، استخدم رابط البريد الإلكتروني بعد مراجعة التفاصيل.',
    ready:
      'استفسارك جاهز للإرسال بالبريد الإلكتروني ولم يُرسل بعد. افتح تطبيق البريد وأرسله إلى فريقنا.',
    send: 'فتح البريد الإلكتروني مع الاستفسار',
    invalid: 'يرجى إكمال الحقول المطلوبة وإدخال بريد إلكتروني صحيح.',
    required: 'حقول مطلوبة',
    emailSubject: 'استفسار عبر الموقع',
    privacy: 'تبقى بياناتك في هذا المتصفح إلى أن تختار إرسالها بالبريد الإلكتروني.',
  },
  footer: {
    description: 'خبرة هندسية. تنفيذ عملي.\nشريك لخطوتك القادمة.',
    navigation: 'اكتشف',
    divisions: 'قطاعاتنا',
    contact: 'تواصل معنا',
    rights: 'دانكاتشر للمقاولات ذ.م.م. جميع الحقوق محفوظة.',
    poBox: 'ص.ب.',
    closing: 'نهندس. نبني. نورّد.',
  },
  notFound: { title: 'الصفحة غير موجودة', body: 'الصفحة التي طلبتها غير متاحة.' },
};
export const copy: Record<Locale, CopyShape<typeof en>> = { en, ar };
export type Copy = CopyShape<typeof en>;
