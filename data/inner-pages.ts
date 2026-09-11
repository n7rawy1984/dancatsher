import type { Localized } from '@/types/content';

const localized = <T>(en: T, ar: T): Localized<T> => ({ en, ar });

export const innerPageSeo = {
  about: {
    title: localized('About DANCATSHER', 'عن دان كاتشر'),
    description: localized(
      'Learn about DANCATSHER Contracting L.L.C., its integrated capabilities and the combined EPC experience behind its Abu Dhabi team.',
      'تعرّف على دان كاتشر للمقاولات ذ.م.م. وقدراتها المتكاملة وخبرة فريقها المشتركة في مشاريع الهندسة والتوريد والإنشاء في أبوظبي.',
    ),
  },
  divisions: {
    title: localized(
      'Engineering, HVAC & Material Supply Divisions',
      'قطاعات الهندسة والتكييف وتوريد المواد',
    ),
    description: localized(
      'Explore DANCATSHER capabilities in Contracting and EPC, HVAC and MEP, and industrial material supply.',
      'استكشف قدرات دان كاتشر في المقاولات والهندسة والتوريد والإنشاء، والتكييف والأعمال الكهروميكانيكية، وتوريد المواد الصناعية.',
    ),
  },
  contracting: {
    title: localized('Contracting & EPC Services', 'خدمات المقاولات والهندسة والتوريد والإنشاء'),
    description: localized(
      'Building EPC, civil works, fit-out, steel structures and coordinated MEP services from DANCATSHER in Abu Dhabi.',
      'خدمات المباني والأعمال المدنية والتجهيزات الداخلية والهياكل الفولاذية والأعمال الكهروميكانيكية المتكاملة من دان كاتشر في أبوظبي.',
    ),
  },
  hvac: {
    title: localized('HVAC & MEP Services', 'خدمات التكييف والأعمال الكهروميكانيكية'),
    description: localized(
      'Air-conditioning, ducting, chilled-water and associated MEP capabilities for building requirements in Abu Dhabi.',
      'قدرات في أنظمة التكييف ومجاري الهواء والمياه المبرّدة والأعمال الكهروميكانيكية المرتبطة بمتطلبات المباني في أبوظبي.',
    ),
  },
  'material-supply': {
    title: localized(
      'Industrial & Oil and Gas Material Supply',
      'توريد المواد الصناعية ومواد النفط والغاز',
    ),
    description: localized(
      'Enquiry-led supply support across seven source-backed categories of industrial materials, tools, PPE and electrical products.',
      'دعم توريد قائم على الاستفسار ضمن سبع فئات موثّقة من المواد الصناعية والأدوات ومعدات الوقاية والمنتجات الكهربائية.',
    ),
  },
  qhse: {
    title: localized('Quality, Health, Safety & Environment', 'الجودة والصحة والسلامة والبيئة'),
    description: localized(
      'DANCATSHER approach to quality planning, contractor and supplier oversight, health, safety and environmental responsibility.',
      'نهج دان كاتشر في تخطيط الجودة ومتابعة المقاولين والمورّدين والصحة والسلامة والمسؤولية البيئية.',
    ),
  },
} as const;

export const commonInner = {
  home: localized('Home', 'الرئيسية'),
  divisions: localized('Divisions', 'قطاعاتنا'),
  request: localized('Request a quote', 'اطلب عرض سعر'),
  discuss: localized('Discuss your requirements', 'ناقش متطلباتك معنا'),
  products: localized('Explore product categories', 'استكشف فئات المنتجات'),
  closingEyebrow: localized('Start with your requirements', 'ابدأ بمتطلباتك'),
  closingTitle: localized(
    'Bring the right disciplines into view.',
    'لنضع التخصصات المناسبة ضمن رؤية واحدة.',
  ),
  closingBody: localized(
    'Tell us what you are planning, installing or sourcing. Our team will review the scope and continue the conversation by email.',
    'شاركنا ما تخطط لتنفيذه أو تركيبه أو توريده، وسيراجع فريقنا نطاق العمل لمتابعة الحوار عبر البريد الإلكتروني.',
  ),
};

export const aboutPage = {
  hero: {
    eyebrow: localized('01 / About DANCATSHER', '٠١ / عن دان كاتشر'),
    title: localized('Built around joined-up capability.', 'قدرات متكاملة.\nورؤية واحدة.'),
    lead: localized(
      'DANCATSHER Contracting L.L.C. brings engineering, construction, building services and material supply together from its base in Abu Dhabi.',
      'تجمع دان كاتشر للمقاولات ذ.م.م. بين الهندسة والإنشاء وخدمات المباني وتوريد المواد انطلاقاً من مقرها في أبوظبي.',
    ),
    imageAlt: localized(
      'External paved works in front of a shopping centre in Abu Dhabi',
      'أعمال رصف خارجية أمام مركز تسوق في أبوظبي',
    ),
  },
  story: {
    eyebrow: localized('The company', 'الشركة'),
    title: localized(
      'Established in Abu Dhabi.\nStructured for coordination.',
      'تأسست في أبوظبي.\nوتعمل بمنهج متكامل.',
    ),
    lead: localized(
      'Founded in 2018, DANCATSHER was established to deliver quality-focused work aligned with client requirements.',
      'تأسست دان كاتشر عام 2018 لتنفيذ أعمال تركّز على الجودة وتتوافق مع متطلبات العملاء.',
    ),
    body: localized(
      'The company works across civil, mechanical, electrical and air-conditioning disciplines, supported by material-supply capability. This breadth helps the team consider budgets, construction schedules and the sequence of work as connected parts of delivery.',
      'تعمل الشركة عبر تخصصات الأعمال المدنية والميكانيكية والكهربائية والتكييف، وتدعمها قدرات توريد المواد. ويساعد هذا التكامل الفريق على التعامل مع الميزانيات والجداول الزمنية وتسلسل الأعمال كعناصر مترابطة في التنفيذ.',
    ),
  },
  facts: [
    { value: '2018', label: localized('Established in Abu Dhabi', 'تأسست في أبوظبي') },
    {
      value: '30+',
      label: localized(
        'Years of combined team EPC experience',
        'عاماً من خبرة الفريق المشتركة في EPC',
      ),
    },
    { value: '03', label: localized('Connected operating divisions', 'قطاعات تشغيلية مترابطة') },
  ],
  purpose: {
    eyebrow: localized('Purpose and direction', 'الغاية والتوجّه'),
    title: localized('A practical ambition, grounded in service.', 'طموح عملي يرتكز على الخدمة.'),
    visionTitle: localized('Vision', 'الرؤية'),
    vision: localized(
      'To grow as a leading solutions provider by bringing engineering, procurement and construction together as coordinated services, while using resources thoughtfully.',
      'أن تنمو الشركة كمزوّد رائد للحلول من خلال جمع خدمات الهندسة والتوريد والإنشاء ضمن نهج منسّق، مع الاستخدام المسؤول للموارد.',
    ),
    missionTitle: localized('Mission', 'الرسالة'),
    mission: localized(
      'To help customers and clients create added value through the building services that support everyday life.',
      'مساعدة العملاء على تحقيق قيمة مضافة من خلال خدمات المباني التي تدعم متطلبات الحياة اليومية.',
    ),
  },
  values: {
    eyebrow: localized('How we work', 'كيف نعمل'),
    title: localized(
      'Professional values in day-to-day delivery.',
      'قيم مهنية تحكم التنفيذ اليومي.',
    ),
    items: [
      {
        title: localized('Timely delivery', 'الالتزام بالمواعيد'),
        body: localized(
          'Planning work around agreed requirements, programmes and practical sequences.',
          'تخطيط الأعمال وفق المتطلبات والجداول وتسلسل التنفيذ العملي المتفق عليه.',
        ),
      },
      {
        title: localized('Long-term relationships', 'علاقات طويلة الأمد'),
        body: localized(
          'Building professional relationships through integrity, service and clear communication.',
          'بناء علاقات مهنية تقوم على النزاهة والخدمة والتواصل الواضح.',
        ),
      },
      {
        title: localized('Professional environment', 'بيئة عمل مهنية'),
        body: localized(
          'Supporting responsible collaboration among employees, contractors and suppliers.',
          'دعم التعاون المسؤول بين الموظفين والمقاولين والمورّدين.',
        ),
      },
    ],
  },
  capability: {
    eyebrow: localized('Integrated experience', 'خبرات متكاملة'),
    title: localized('A team perspective across disciplines.', 'خبرة فريق تمتد عبر التخصصات.'),
    lead: localized(
      'DANCATSHER is managed by engineers and managers whose combined EPC experience exceeds 30 years in the UAE and internationally.',
      'يدير دان كاتشر مهندسون ومديرون تتجاوز خبرتهم المشتركة 30 عاماً في مشاريع الهندسة والتوريد والإنشاء داخل الإمارات وخارجها.',
    ),
    body: localized(
      'The 30+ years represents the team’s combined professional experience across EPC work. DANCATSHER itself was established in 2018.',
      'تمثّل الأعوام الثلاثون وأكثر الخبرة المهنية المشتركة للفريق في أعمال الهندسة والتوريد والإنشاء، بينما تأسست دان كاتشر نفسها عام 2018.',
    ),
    imageAlt: localized(
      'Site team installing interlock paving',
      'فريق موقع ينفّذ أعمال رصف الإنترلوك',
    ),
  },
  bridge: {
    eyebrow: localized('Quality and HSE', 'الجودة والصحة والسلامة والبيئة'),
    title: localized(
      'Quality in the process.\nResponsibility on site.',
      'جودة في الإجراءات.\nومسؤولية في الموقع.',
    ),
    body: localized(
      'The company’s working philosophy connects quality planning and contractor or supplier oversight with attention to health, safety and environmental standards.',
      'تربط فلسفة العمل في الشركة بين تخطيط الجودة ومتابعة المقاولين والمورّدين والاهتمام بمعايير الصحة والسلامة والبيئة.',
    ),
    link: localized('Read our QHSE approach', 'اطّلع على نهج الجودة والسلامة'),
  },
};

export const divisionsPage = {
  hero: {
    eyebrow: localized('02 / Operating divisions', '٠٢ / قطاعاتنا التشغيلية'),
    title: localized(
      'Three disciplines.\nOne coordinated view.',
      'ثلاثة تخصصات.\nورؤية منسّقة واحدة.',
    ),
    lead: localized(
      'Choose the capability that matches your immediate requirement, with adjacent disciplines available when the scope calls for them.',
      'اختر القطاع الذي يلبي احتياجك المباشر، مع إمكانية تنسيق التخصصات الأخرى عندما يتطلب نطاق العمل ذلك.',
    ),
    imageAlt: localized('Building exterior and paved approach', 'واجهة مبنى وممرات خارجية مرصوفة'),
  },
  intro: {
    eyebrow: localized('A connected model', 'نموذج عمل مترابط'),
    title: localized('The right division for each requirement.', 'القطاع المناسب لكل متطلب.'),
    body: localized(
      'Contracting and EPC addresses built work. HVAC and MEP focuses on the systems that operate buildings. Material supply supports industrial and site requirements through a structured enquiry process.',
      'يعالج قطاع المقاولات والهندسة والتوريد والإنشاء متطلبات التنفيذ، ويركّز قطاع التكييف والأعمال الكهروميكانيكية على أنظمة تشغيل المباني، فيما يدعم قطاع توريد المواد الاحتياجات الصناعية والميدانية عبر عملية استفسار منظّمة.',
    ),
  },
  needs: [
    localized('Build, alter or fit out a space', 'تنفيذ مبنى أو تعديل مساحة أو تجهيزها'),
    localized('Install or coordinate building systems', 'تركيب أنظمة المباني أو تنسيقها'),
    localized('Source industrial and site materials', 'توريد المواد الصناعية ومستلزمات المواقع'),
  ],
  coordination: {
    eyebrow: localized('Across the interfaces', 'عبر نقاط الربط'),
    title: localized('Coordination where disciplines meet.', 'تنسيق فعّال عند التقاء التخصصات.'),
    body: localized(
      'Civil, mechanical, electrical, air-conditioning and supply requirements often affect one another. Our operating model is designed to keep those interfaces visible during planning and execution.',
      'غالباً ما تتداخل متطلبات الأعمال المدنية والميكانيكية والكهربائية والتكييف والتوريد. وقد صُمم نموذج عملنا لإبقاء نقاط الربط واضحة خلال التخطيط والتنفيذ.',
    ),
  },
};

export const contractingPage = {
  hero: {
    eyebrow: localized(
      'Division 01 / Contracting & EPC',
      'القطاع ٠١ / المقاولات والهندسة والتوريد والإنشاء',
    ),
    title: localized('From scope definition\nto built work.', 'من تحديد النطاق\nإلى التنفيذ.'),
    lead: localized(
      'Building contracting, civil works, fit-out and coordinated technical disciplines organised around the requirements of the project.',
      'مقاولات المباني والأعمال المدنية والتجهيزات الداخلية والتخصصات الفنية المنسّقة وفق متطلبات المشروع.',
    ),
    imageAlt: localized(
      'Workers carrying out interlock paving work',
      'عاملان ينفّذان أعمال رصف الإنترلوك',
    ),
  },
  overview: {
    eyebrow: localized('Capability statement', 'بيان القدرات'),
    title: localized(
      'Engineering, procurement and construction with the interfaces in view.',
      'هندسة وتوريد وإنشاء مع رؤية واضحة لنقاط الربط.',
    ),
    body: localized(
      'DANCATSHER’s documented scope spans building EPC, industrial, commercial and domestic civil works, interior fit-out, steel structures and associated mechanical and electrical services.',
      'يشمل نطاق دان كاتشر الموثّق أعمال الهندسة والتوريد والإنشاء للمباني، والأعمال المدنية الصناعية والتجارية والسكنية، والتجهيزات الداخلية والهياكل الفولاذية، إلى جانب الخدمات الميكانيكية والكهربائية المرتبطة بها.',
    ),
  },
  groups: [
    {
      title: localized('Civil & building works', 'الأعمال المدنية والمباني'),
      body: localized(
        'Building EPC and civil works for industrial, commercial and domestic requirements.',
        'أعمال هندسة وتوريد وإنشاء المباني والأعمال المدنية للمتطلبات الصناعية والتجارية والسكنية.',
      ),
      items: localized(
        ['Building contracting', 'Civil works', 'Site coordination'],
        ['مقاولات المباني', 'الأعمال المدنية', 'تنسيق الموقع'],
      ),
    },
    {
      title: localized('Fit-out & finishes', 'التجهيزات والتشطيبات'),
      body: localized(
        'Interior elements coordinated as supply-and-installation work.',
        'عناصر داخلية منسّقة ضمن أعمال التوريد والتركيب.',
      ),
      items: localized(
        ['Partitions & ceilings', 'Tiling, flooring & glazing', 'Carpentry, aluminium & painting'],
        ['القواطع والأسقف', 'البلاط والأرضيات والزجاج', 'النجارة والألومنيوم والدهانات'],
      ),
    },
    {
      title: localized('Steel structures', 'الهياكل الفولاذية'),
      body: localized(
        'Steel structural works integrated with the wider construction sequence.',
        'أعمال الهياكل الفولاذية ضمن تسلسل التنفيذ العام للمشروع.',
      ),
      items: localized(
        ['Structural scope', 'Interface planning', 'Supply & installation'],
        ['النطاق الإنشائي', 'تخطيط نقاط الربط', 'التوريد والتركيب'],
      ),
    },
    {
      title: localized('Mechanical & electrical', 'الأعمال الميكانيكية والكهربائية'),
      body: localized(
        'Technical services coordinated with civil and architectural requirements.',
        'خدمات فنية منسّقة مع المتطلبات المدنية والمعمارية.',
      ),
      items: localized(
        ['Water treatment, piping & sanitary', 'Power control', 'Telecom, data & CCTV'],
        [
          'معالجة المياه والأنابيب والأعمال الصحية',
          'التحكم بالطاقة',
          'الاتصالات والبيانات وأنظمة CCTV',
        ],
      ),
    },
  ],
  detail: {
    eyebrow: localized('Built scope', 'نطاق التنفيذ'),
    title: localized(
      'Structure, finish and services—considered together.',
      'الهيكل والتشطيبات والخدمات ضمن رؤية متكاملة.',
    ),
    paragraphs: localized(
      [
        'Civil and building work establishes the physical framework. Fit-out then brings partitions, ceilings, aluminium panels, flooring, glazing, custom furniture, woodwork and painting into a coordinated interior scope.',
        'Mechanical work can include water treatment, piping and sanitary systems. Electrical scope includes power control, telecommunications, data and CCTV systems. Each discipline is planned against the wider project sequence.',
      ],
      [
        'تؤسس الأعمال المدنية وأعمال المباني الإطار المادي للمشروع، ثم تجمع أعمال التجهيز الداخلي القواطع والأسقف وألواح الألومنيوم والأرضيات والزجاج والأثاث المصمم حسب الطلب والأعمال الخشبية والدهانات ضمن نطاق منسّق.',
        'قد تشمل الأعمال الميكانيكية معالجة المياه والأنابيب والأنظمة الصحية، بينما يشمل النطاق الكهربائي التحكم بالطاقة والاتصالات والبيانات وأنظمة المراقبة CCTV. ويُخطط لكل تخصص ضمن التسلسل العام للمشروع.',
      ],
    ),
  },
  method: {
    eyebrow: localized('Execution approach', 'منهج التنفيذ'),
    title: localized(
      'A clear path from requirement to handover.',
      'مسار واضح من المتطلبات إلى التسليم.',
    ),
    steps: [
      {
        title: localized('Scope', 'تحديد النطاق'),
        body: localized(
          'Clarify requirements, interfaces and intended outcomes.',
          'توضيح المتطلبات ونقاط الربط والنتائج المستهدفة.',
        ),
      },
      {
        title: localized('Plan', 'التخطيط'),
        body: localized(
          'Coordinate disciplines, budgets, schedules and work sequences.',
          'تنسيق التخصصات والميزانيات والجداول وتسلسل الأعمال.',
        ),
      },
      {
        title: localized('Execute', 'التنفيذ'),
        body: localized(
          'Carry out the agreed work with quality and HSE considerations in view.',
          'تنفيذ الأعمال المتفق عليها مع مراعاة الجودة والصحة والسلامة والبيئة.',
        ),
      },
      {
        title: localized('Handover', 'التسليم'),
        body: localized(
          'Review the completed scope against the agreed requirements.',
          'مراجعة النطاق المنجز وفق المتطلبات المتفق عليها.',
        ),
      },
    ],
  },
  evidence: {
    eyebrow: localized('From the site', 'من الموقع'),
    title: localized(
      'Relevant work, shown in context.',
      'أعمال مرتبطة بخبراتنا، معروضة في سياقها.',
    ),
    note: localized(
      'The supplied photographs illustrate relevant types of site and fit-out work; they are not presented as detailed case studies.',
      'توضّح الصور المقدمة أنواعاً مرتبطة بالأعمال الميدانية والتجهيزات، ولا تُعرض كدراسات حالة تفصيلية.',
    ),
  },
};

export const hvacPage = {
  hero: {
    eyebrow: localized('Division 02 / HVAC & MEP', 'القطاع ٠٢ / التكييف والأعمال الكهروميكانيكية'),
    title: localized('Building systems,\nmade to work together.', 'أنظمة المباني.\nتعمل بتكامل.'),
    lead: localized(
      'Air-conditioning, ducting, chilled-water and associated MEP scope coordinated with the building around it.',
      'أنظمة التكييف ومجاري الهواء والمياه المبرّدة والأعمال الكهروميكانيكية المرتبطة بها، منسّقة مع متطلبات المبنى.',
    ),
    imageAlt: localized(
      'Outdoor air-conditioning units installed on a building',
      'وحدات تكييف خارجية مركّبة على مبنى',
    ),
  },
  overview: {
    eyebrow: localized('Integrated HVAC / MEP', 'تكامل التكييف والأعمال الكهروميكانيكية'),
    title: localized(
      'Comfort systems within the wider technical plan.',
      'أنظمة الراحة ضمن الخطة الفنية الشاملة.',
    ),
    body: localized(
      'The documented HVAC scope covers ducting, chillers, fan-coil units, air-handling units, air-condensing units, split units and chilled-water piping, alongside related mechanical and electrical coordination.',
      'يشمل نطاق التكييف الموثّق مجاري الهواء والمبرّدات ووحدات لفائف المروحة ووحدات مناولة الهواء ووحدات التكثيف والوحدات المنفصلة وأنابيب المياه المبرّدة، إلى جانب التنسيق الميكانيكي والكهربائي المرتبط بها.',
    ),
  },
  systems: [
    {
      title: localized('Air distribution', 'توزيع الهواء'),
      body: localized(
        'Ducting work planned around spatial, architectural and service interfaces.',
        'أعمال مجاري الهواء مخططة وفق المساحات ونقاط الربط المعمارية والخدمية.',
      ),
      items: localized(
        ['Ducting works', 'Air-handling units (AHU)', 'Fan-coil units (FCU)'],
        ['أعمال مجاري الهواء', 'وحدات مناولة الهواء AHU', 'وحدات لفائف المروحة FCU'],
      ),
    },
    {
      title: localized('Chilled-water systems', 'أنظمة المياه المبرّدة'),
      body: localized(
        'Chillers and chilled-water piping considered as a connected system.',
        'المبرّدات وأنابيب المياه المبرّدة ضمن منظومة مترابطة.',
      ),
      items: localized(
        ['Chillers', 'Chilled-water piping', 'Mechanical coordination'],
        ['المبرّدات', 'أنابيب المياه المبرّدة', 'التنسيق الميكانيكي'],
      ),
    },
    {
      title: localized('Direct expansion equipment', 'معدات التمدد المباشر'),
      body: localized(
        'Air-condensing and split-unit scope for applicable building requirements.',
        'وحدات التكثيف والوحدات المنفصلة بحسب متطلبات المبنى المناسبة.',
      ),
      items: localized(
        ['Air-condensing units', 'Split units', 'Supply & installation'],
        ['وحدات التكثيف', 'الوحدات المنفصلة', 'التوريد والتركيب'],
      ),
    },
    {
      title: localized('Associated MEP', 'الأعمال الكهروميكانيكية المرتبطة'),
      body: localized(
        'Mechanical and electrical interfaces kept visible during planning and installation.',
        'إبقاء نقاط الربط الميكانيكية والكهربائية واضحة أثناء التخطيط والتركيب.',
      ),
      items: localized(
        ['Mechanical interfaces', 'Electrical interfaces', 'Building coordination'],
        ['نقاط الربط الميكانيكية', 'نقاط الربط الكهربائية', 'التنسيق مع المبنى'],
      ),
    },
  ],
  method: {
    eyebrow: localized('Working method', 'منهج العمل'),
    title: localized('Coordinate before installation.', 'التنسيق يسبق التركيب.'),
    steps: [
      {
        title: localized('Understand', 'الفهم'),
        body: localized(
          'Review the building requirement and intended system scope.',
          'مراجعة متطلبات المبنى والنطاق المطلوب للنظام.',
        ),
      },
      {
        title: localized('Coordinate', 'التنسيق'),
        body: localized(
          'Align HVAC routes and equipment with civil, electrical and architectural work.',
          'مواءمة مسارات ومعدات التكييف مع الأعمال المدنية والكهربائية والمعمارية.',
        ),
      },
      {
        title: localized('Install', 'التركيب'),
        body: localized(
          'Deliver the agreed supply-and-installation scope in sequence.',
          'تنفيذ نطاق التوريد والتركيب المتفق عليه وفق التسلسل المحدد.',
        ),
      },
      {
        title: localized('Review', 'المراجعة'),
        body: localized(
          'Check the installed scope against the agreed project requirements.',
          'التحقق من الأعمال المركّبة وفق متطلبات المشروع المتفق عليها.',
        ),
      },
    ],
  },
  installation: {
    eyebrow: localized('Installation perspective', 'من واقع التركيب'),
    title: localized('Equipment, routes and interfaces.', 'معدات ومسارات ونقاط ربط.'),
    body: localized(
      'A genuine supplied site photograph shows installed outdoor air-conditioning equipment. It is presented as visual evidence of the work type without adding project, client or performance claims.',
      'تُظهر صورة ميدانية أصلية مقدمة وحدات تكييف خارجية مركّبة، وتُعرض كدليل بصري على نوع العمل من دون إضافة ادعاءات عن المشروع أو العميل أو الأداء.',
    ),
  },
  media: {
    eyebrow: localized('System overview', 'نظرة على النظام'),
    title: localized(
      'How central air-conditioning elements connect.',
      'كيف تترابط عناصر التكييف المركزي.',
    ),
    body: localized(
      'A central system connects cooling equipment, water or refrigerant circuits, air-handling equipment and distribution routes. The exact arrangement depends on the project scope.',
      'يربط النظام المركزي بين معدات التبريد ودوائر المياه أو وسيط التبريد ومعدات مناولة الهواء ومسارات التوزيع، ويعتمد الترتيب الدقيق على نطاق كل مشروع.',
    ),
    items: localized(
      ['Cooling source', 'Air handling', 'Distribution'],
      ['مصدر التبريد', 'مناولة الهواء', 'التوزيع'],
    ),
  },
};

export const supplyPage = {
  hero: {
    eyebrow: localized(
      'Division 03 / Industrial material supply',
      'القطاع ٠٣ / توريد المواد الصناعية',
    ),
    title: localized('Source around\nthe requirement.', 'توريد يبدأ\nمن المتطلبات.'),
    lead: localized(
      'An enquiry-led B2B supply resource for industrial materials, tools, consumables, PPE and electrical products.',
      'مورد للمنشآت يعتمد على الاستفسار لتلبية احتياجات المواد الصناعية والأدوات والمستهلكات ومعدات الوقاية والمنتجات الكهربائية.',
    ),
    imageAlt: localized(
      'Copper pipes and fittings from the supplied catalog',
      'أنابيب ووصلات نحاسية من الكتالوج المقدم',
    ),
  },
  overview: {
    eyebrow: localized('B2B supply support', 'دعم التوريد للمنشآت'),
    title: localized(
      'A structured route from list to enquiry.',
      'مسار منظم من القائمة إلى الاستفسار.',
    ),
    body: localized(
      'The product range is organised into seven categories documented in the supplied trading profile. Requirements, specifications and availability are reviewed with each enquiry.',
      'تُنظّم مجموعة المنتجات ضمن سبع فئات موثّقة في ملف التوريد المقدم، وتُراجع المتطلبات والمواصفات والتوافر مع كل استفسار.',
    ),
  },
  categoryTitle: localized('Seven practical supply categories.', 'سبع فئات توريد عملية.'),
  categoryEyebrow: localized('Product taxonomy', 'تصنيف المنتجات'),
  process: {
    eyebrow: localized('Commercial process', 'العملية التجارية'),
    title: localized(
      'Requirements first. Details confirmed per enquiry.',
      'المتطلبات أولاً. والتفاصيل تُعتمد لكل استفسار.',
    ),
    steps: [
      {
        title: localized('Share the requirement', 'شارك المتطلبات'),
        body: localized(
          'Identify the category, intended use and available project information.',
          'حدّد الفئة والاستخدام المقصود ومعلومات المشروع المتاحة.',
        ),
      },
      {
        title: localized('Review the scope', 'مراجعة النطاق'),
        body: localized(
          'Clarify requested quantities, specifications and delivery considerations.',
          'توضيح الكميات والمواصفات واعتبارات التسليم المطلوبة.',
        ),
      },
      {
        title: localized('Coordinate sourcing', 'تنسيق التوريد'),
        body: localized(
          'Assess the enquiry against suitable sourcing options and availability.',
          'دراسة الاستفسار وفق خيارات التوريد المناسبة والتوافر.',
        ),
      },
      {
        title: localized('Confirm the offer', 'تأكيد العرض'),
        body: localized(
          'Document the agreed commercial and product details for review.',
          'توثيق التفاصيل التجارية وتفاصيل المنتجات المتفق عليها للمراجعة.',
        ),
      },
    ],
  },
  spotlight: {
    eyebrow: localized('Category spotlight', 'إضاءة على فئة'),
    title: localized('Pipes & fittings', 'الأنابيب والوصلات'),
    body: localized(
      'The source catalog lists valves, PVC, PPR, galvanised iron, carbon steel, stainless steel and copper pipes and fittings, plus sanitary accessories.',
      'يسرد الكتالوج الصمامات وأنابيب ووصلات PVC وPPR والحديد المجلفن والفولاذ الكربوني والفولاذ المقاوم للصدأ والنحاس، إلى جانب الملحقات الصحية.',
    ),
    imageAlt: localized(
      'Stainless steel pipes from the supplied product catalog',
      'أنابيب من الفولاذ المقاوم للصدأ من كتالوج المنتجات',
    ),
  },
  clusters: [
    {
      title: localized('Tools & consumables', 'الأدوات والمواد الاستهلاكية'),
      body: localized(
        'Manual tools, power tools, packing and adhesive products, and welding consumables and accessories.',
        'أدوات يدوية وكهربائية، ومواد تغليف ولواصق، ومستهلكات اللحام وملحقاته.',
      ),
    },
    {
      title: localized('Safety & PPE', 'السلامة ومعدات الوقاية'),
      body: localized(
        'Workwear, safety shoes, gloves, face masks, helmets and protective eyewear.',
        'ملابس العمل وأحذية السلامة والقفازات وأقنعة الوجه والخوذ ووسائل حماية العين.',
      ),
    },
    {
      title: localized('Electrical materials', 'المواد الكهربائية'),
      body: localized(
        'Power, low-voltage and data cables, junction boxes, cable glands, breakers, distribution boards and accessories.',
        'كابلات الطاقة والجهد المنخفض والبيانات وعلب التوصيل وجلاندات الكابلات والقواطع ولوحات التوزيع والملحقات.',
      ),
    },
  ],
};

export const qhsePage = {
  hero: {
    eyebrow: localized(
      '05 / Quality, Health, Safety & Environment',
      '٠٥ / الجودة والصحة والسلامة والبيئة',
    ),
    title: localized('Process maturity,\nwithout shortcuts.', 'إجراءات ناضجة.\nومسؤولية مستمرة.'),
    lead: localized(
      'A systematic working philosophy that connects client requirements, quality oversight and attention to health, safety and the environment.',
      'فلسفة عمل منهجية تربط متطلبات العميل ومتابعة الجودة والاهتمام بالصحة والسلامة والبيئة.',
    ),
  },
  philosophy: {
    eyebrow: localized('Quality philosophy', 'فلسفة الجودة'),
    title: localized(
      'Quality is planned through the delivery chain.',
      'الجودة تُخطط عبر سلسلة التنفيذ.',
    ),
    body: localized(
      'DANCATSHER’s source quality policy focuses on identifying contractors and suppliers that can significantly affect delivery, then evaluating, monitoring and managing their quality-control processes against applicable project and company requirements.',
      'تركّز سياسة الجودة الموثّقة لدى دان كاتشر على تحديد المقاولين والمورّدين الذين قد يؤثرون بصورة جوهرية في التنفيذ، ثم تقييم إجراءات ضبط الجودة لديهم ومتابعتها وإدارتها وفق متطلبات المشروع والشركة ذات الصلة.',
    ),
  },
  qualitySteps: [
    {
      title: localized('Identify', 'التحديد'),
      body: localized(
        'Recognise contractors, suppliers and interfaces that can affect quality delivery.',
        'تحديد المقاولين والمورّدين ونقاط الربط التي قد تؤثر في جودة التنفيذ.',
      ),
    },
    {
      title: localized('Evaluate', 'التقييم'),
      body: localized(
        'Review the relevant quality-control processes and delivery requirements.',
        'مراجعة إجراءات ضبط الجودة ذات الصلة ومتطلبات التنفيذ.',
      ),
    },
    {
      title: localized('Monitor', 'المتابعة'),
      body: localized(
        'Maintain oversight as products, services and disciplines move through the work.',
        'مواصلة المتابعة أثناء انتقال المنتجات والخدمات والتخصصات عبر مراحل العمل.',
      ),
    },
  ],
  hse: {
    eyebrow: localized('Health, safety & environment', 'الصحة والسلامة والبيئة'),
    title: localized(
      'Responsibility remains part of the operating process.',
      'المسؤولية جزء من إجراءات العمل.',
    ),
    body: localized(
      'The company profile commits DANCATSHER to systematic operations with attention to health, safety and environmental standards. These considerations belong in planning, site coordination and day-to-day execution.',
      'يلتزم ملف الشركة باتباع إجراءات تشغيل منهجية مع الاهتمام بمعايير الصحة والسلامة والبيئة، لتكون هذه الاعتبارات جزءاً من التخطيط وتنسيق الموقع والتنفيذ اليومي.',
    ),
  },
  disciplines: [
    {
      title: localized('Supplier & contractor oversight', 'متابعة المورّدين والمقاولين'),
      body: localized(
        'Quality-critical external parties are identified and their controls kept under review.',
        'تحديد الأطراف الخارجية المؤثرة في الجودة وإبقاء إجراءاتها قيد المراجعة.',
      ),
    },
    {
      title: localized('Delivery coordination', 'تنسيق التنفيذ'),
      body: localized(
        'Budgets, construction schedules, disciplines and sequences are coordinated around requirements.',
        'تنسيق الميزانيات والجداول الزمنية والتخصصات وتسلسل الأعمال وفق المتطلبات.',
      ),
    },
    {
      title: localized('Continuous attention', 'اهتمام مستمر'),
      body: localized(
        'Systematic processes support review, clear accountability and better-informed working decisions.',
        'تدعم الإجراءات المنهجية المراجعة ووضوح المسؤوليات واتخاذ قرارات عمل مدروسة.',
      ),
    },
  ],
  statement: {
    eyebrow: localized('A disciplined commitment', 'التزام منضبط'),
    title: localized(
      'Meet requirements. Monitor quality. Work responsibly.',
      'تلبية المتطلبات. متابعة الجودة. والعمل بمسؤولية.',
    ),
    body: localized(
      'These principles provide a practical framework for planning work, coordinating responsibilities and maintaining attention to quality, health, safety and the environment.',
      'توفّر هذه المبادئ إطاراً عملياً لتخطيط الأعمال وتنسيق المسؤوليات والحفاظ على الاهتمام بالجودة والصحة والسلامة والبيئة.',
    ),
  },
};
