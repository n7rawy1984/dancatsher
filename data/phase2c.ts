import type { Localized } from '@/types/content';
import { company } from '@/data/company';

const localized = <T>(en: T, ar: T): Localized<T> => ({ en, ar });

export const phase2cSeo = {
  products: {
    title: localized('Industrial Products & Material Categories', 'المنتجات الصناعية وفئات المواد'),
    description: localized(
      'Explore seven source-backed categories of industrial materials, tools, PPE, pipes, fittings, welding and electrical products from DANCATSHER.',
      'استكشف سبع فئات موثّقة من المواد الصناعية والأدوات ومعدات الوقاية والأنابيب والوصلات ومنتجات اللحام والكهرباء لدى دانكاتشر.',
    ),
  },
  projects: {
    title: localized('Site Work & Project Experience', 'أعمال المواقع والخبرة العملية'),
    description: localized(
      'View genuine supplied photography representing DANCATSHER civil, paving, HVAC, masonry and interior fit-out work types.',
      'شاهد صوراً أصلية مقدمة تمثل أنواع أعمال دانكاتشر في الأعمال المدنية والرصف والتكييف والمباني والتجهيزات الداخلية.',
    ),
  },
  contact: {
    title: localized('Contact DANCATSHER', 'تواصل مع دانكاتشر'),
    description: localized(
      'Contact DANCATSHER Contracting L.L.C. in Abu Dhabi to discuss contracting, HVAC, MEP or industrial material requirements.',
      'تواصل مع دانكاتشر للمقاولات ذ.م.م. في أبوظبي لمناقشة متطلبات المقاولات أو التكييف أو الأعمال الكهروميكانيكية أو المواد الصناعية.',
    ),
  },
} as const;

export const productsPage = {
  hero: {
    eyebrow: localized('03 / Industrial product catalog', '٠٣ / كتالوج المنتجات الصناعية'),
    title: localized('Products organised\naround your enquiry.', 'منتجات منظّمة\nحول استفسارك.'),
    lead: localized(
      'Seven practical supply categories for industrial, workshop and site requirements. Quantities and specifications are confirmed with each enquiry.',
      'سبع فئات توريد عملية للمتطلبات الصناعية واحتياجات الورش والمواقع، مع تأكيد الكميات والمواصفات لكل استفسار.',
    ),
    imageAlt: localized(
      'Stainless steel pipes from the supplied product catalog',
      'أنابيب من الفولاذ المقاوم للصدأ من كتالوج المنتجات المقدم',
    ),
  },
  intro: {
    eyebrow: localized('B2B supply, category by category', 'توريد للمنشآت حسب الفئة'),
    title: localized('A catalog for defining requirements.', 'كتالوج يساعد على تحديد المتطلبات.'),
    body: localized(
      'This catalog reflects the supplied DANCATSHER trading profile. It provides a clear starting point for commercial discussion rather than live inventory, online pricing or fixed technical specifications.',
      'يعكس هذا الكتالوج ملف التوريد المقدم من دانكاتشر، ويوفّر نقطة بداية واضحة للنقاش التجاري دون أن يمثّل مخزوناً مباشراً أو تسعيراً إلكترونياً أو مواصفات فنية ثابتة.',
    ),
  },
  indexEyebrow: localized('Category index', 'فهرس الفئات'),
  indexTitle: localized(
    'Move directly to the material group you need.',
    'انتقل مباشرة إلى مجموعة المواد التي تحتاجها.',
  ),
  examples: localized('Documented examples', 'أمثلة موثّقة'),
  enquire: localized('Enquire about this category', 'استفسر عن هذه الفئة'),
  categoryNote: localized(
    'Product examples are taken from the supplied workbook. Final quantities, specifications and availability are reviewed for each enquiry.',
    'أُخذت أمثلة المنتجات من ملف العمل المقدم، وتُراجع الكميات والمواصفات والتوافر النهائي لكل استفسار.',
  ),
  commercial: {
    eyebrow: localized('Commercial note', 'ملاحظة تجارية'),
    title: localized(
      'Specification and availability follow the requirement.',
      'المواصفات والتوافر يتبعان متطلباتك.',
    ),
    body: localized(
      'Share the category, intended use, requested quantity and any available specification. The team can then review sourcing options and prepare the next commercial step.',
      'شارك الفئة والاستخدام المقصود والكمية المطلوبة وأي مواصفات متاحة، ليتمكن الفريق من مراجعة خيارات التوريد وإعداد الخطوة التجارية التالية.',
    ),
  },
};

export const projectsPage = {
  hero: {
    eyebrow: localized('04 / Site work', '٠٤ / أعمال المواقع'),
    title: localized(
      'Practical work.\nShown as it happened.',
      'أعمال واقعية.\nكما نُفّذت في الموقع.',
    ),
    lead: localized(
      'A visual record of civil, external, HVAC, masonry and interior activities represented in the supplied project photography.',
      'سجل بصري لأعمال مدنية وخارجية وتكييف ومبانٍ وتجهيزات داخلية كما تظهر في صور المواقع المقدمة.',
    ),
    imageAlt: localized(
      'Paved approach and exterior works in front of a shopping centre',
      'ممر مرصوف وأعمال خارجية أمام مركز تسوق',
    ),
  },
  intro: {
    eyebrow: localized('Representative site activities', 'أنشطة ميدانية تمثيلية'),
    title: localized(
      'Representative site activities, clearly presented.',
      'أنشطة ميدانية تمثيلية، معروضة بوضوح.',
    ),
    body: localized(
      'Exact client, contract, date and value information was not supplied. The portfolio therefore uses conservative work-type labels and lets genuine site photography carry the evidence.',
      'لم تُقدّم معلومات دقيقة عن العميل أو العقد أو التاريخ أو القيمة، لذلك تستخدم هذه المحفظة مسميات متحفظة لأنواع الأعمال وتترك للصور الأصلية توثيق طبيعة التنفيذ.',
    ),
  },
  filterLabel: localized('Filter work types', 'تصفية أنواع الأعمال'),
  filters: [
    { id: 'all', label: localized('All work', 'كل الأعمال') },
    { id: 'civil', label: localized('Civil / External', 'مدني / خارجي') },
    { id: 'hvac', label: localized('HVAC', 'التكييف') },
    { id: 'fitout', label: localized('Fit-out', 'التجهيزات') },
    { id: 'building', label: localized('Building works', 'أعمال المباني') },
  ],
  imageNote: localized(
    'Supplied site photograph. Presented by work type where detailed project information is unavailable.',
    'صورة موقع مقدمة، مصنّفة حسب نوع العمل عند عدم توفر معلومات تفصيلية عن المشروع.',
  ),
  closing: {
    eyebrow: localized('Planning similar work?', 'هل تخطط لأعمال مماثلة؟'),
    title: localized(
      'Start with the scope, site and intended outcome.',
      'ابدأ بالنطاق والموقع والنتيجة المطلوبة.',
    ),
    body: localized(
      'Share the available project information and the team will review which disciplines belong in the conversation.',
      'شارك معلومات المشروع المتاحة، وسيراجع الفريق التخصصات المناسبة لبدء الحوار.',
    ),
  },
};

export const contactPage = {
  hero: {
    eyebrow: localized('06 / Contact', '٠٦ / تواصل معنا'),
    title: localized('Start with what\nyou need.', 'ابدأ بما\nتحتاج إليه.'),
    lead: localized(
      'Discuss a project to build, a system to install or industrial materials to source with the DANCATSHER team in Abu Dhabi.',
      'ناقش مع فريق دانكاتشر في أبوظبي مشروعاً تريد تنفيذه أو نظاماً تريد تركيبه أو مواد صناعية تحتاج إلى توريدها.',
    ),
  },
  detailsEyebrow: localized('Direct contact', 'تواصل مباشر'),
  detailsTitle: localized(
    'One office. Three connected areas of capability.',
    'مكتب واحد. وثلاثة مجالات مترابطة من القدرات.',
  ),
  email: localized('Company email', 'البريد الإلكتروني للشركة'),
  phone: localized('Abu Dhabi office', 'مكتب أبوظبي'),
  address: localized('Office address', 'عنوان المكتب'),
  mapEyebrow: localized('Location', 'الموقع'),
  mapTitle: company.officeMapTitle,
  mapBody: company.officeDirections,
  openMap: localized('Open address in maps', 'افتح العنوان في الخرائط'),
  availability: localized(
    'Send an enquiry draft at any time. The message remains in your email application until you choose to send it.',
    'يمكنك إعداد مسودة استفسار في أي وقت، وستبقى الرسالة في تطبيق بريدك الإلكتروني إلى أن تختار إرسالها.',
  ),
  form: {
    title: localized('Prepare your enquiry', 'جهّز استفسارك'),
    intro: localized(
      'Complete the details below. The form prepares an email draft and does not submit data to a website backend.',
      'أكمل التفاصيل أدناه. يُعدّ النموذج مسودة بريد إلكتروني ولا يرسل البيانات إلى خادم الموقع.',
    ),
    name: localized('Full name', 'الاسم الكامل'),
    company: localized('Company', 'الشركة'),
    email: localized('Email address', 'البريد الإلكتروني'),
    phone: localized('Phone number (optional)', 'رقم الهاتف (اختياري)'),
    division: localized('Division / area of interest', 'القطاع / مجال الاهتمام'),
    subject: localized('Enquiry type (optional)', 'نوع الاستفسار (اختياري)'),
    message: localized('Requirements / message', 'المتطلبات / الرسالة'),
    chooseDivision: localized('Select a division', 'اختر القطاع'),
    chooseSubject: localized('Select an enquiry type', 'اختر نوع الاستفسار'),
    subjects: localized(
      ['Project enquiry', 'Material request', 'General enquiry'],
      ['استفسار عن مشروع', 'طلب مواد', 'استفسار عام'],
    ),
    review: localized('Review enquiry', 'مراجعة الاستفسار'),
    required: localized('Required field', 'حقل مطلوب'),
    invalidEmail: localized('Enter a valid email address.', 'أدخل عنوان بريد إلكتروني صحيحاً.'),
    invalidPhone: localized(
      'Use a valid phone number or leave this field blank.',
      'أدخل رقم هاتف صحيحاً أو اترك الحقل فارغاً.',
    ),
    fixErrors: localized(
      'Review the highlighted fields before continuing.',
      'راجع الحقول المحددة قبل المتابعة.',
    ),
    ready: localized(
      'Your enquiry draft is ready. It has not been sent.',
      'مسودة استفسارك جاهزة، ولم تُرسل بعد.',
    ),
    openEmail: localized('Open email draft', 'فتح مسودة البريد'),
    privacy: localized(
      'Your details stay in this browser until you open the email draft.',
      'تبقى بياناتك في هذا المتصفح إلى أن تفتح مسودة البريد الإلكتروني.',
    ),
    emailSubject: localized('Website enquiry', 'استفسار عبر الموقع'),
  },
};
