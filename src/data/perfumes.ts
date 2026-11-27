/**
 * موسوعة العطور العالمية الفاخرة — دار العطور العالمية
 * Haute Parfumerie Internationale
 * -------------------------------------------------------------------------
 * تضم أشهر وأرقى العطور العالمية من كبرى دور العطور والنيش حول العالم:
 * Dior, Chanel, Creed, Tom Ford, Maison Francis Kurkdjian, Kilian,
 * Louis Vuitton, Amouage, Parfums de Marly, Roja Dove, Le Labo,
 * Giorgio Armani, Versace, YSL, Hermes, وغيرها.
 */

export interface PerfumeNotes {
  top: string;
  heart: string;
  base: string;
}

export type FragranceCategory =
  | 'all'
  | 'men'
  | 'women'
  | 'niche'
  | 'oriental'
  | 'fresh'
  | 'warm';

export interface PerfumeItem {
  id: string;
  number: string;
  name: string;
  nameEn: string;
  brand: string;
  brandEn: string;
  category: FragranceCategory;
  categoryLabel: string;
  gender: 'رجالي' | 'نسائي' | 'للجنسين';
  season: string;
  timeOfDay: string;
  family: string;
  lightLabel: string;
  description: string;
  notes: PerfumeNotes;
  volume: string;
  concentration: string;
  spotlightColor: string;
  spotlightRgb: string;
  image: string;
  flaconStyle?: 'dior' | 'chanel' | 'tom-ford' | 'creed' | 'baccarat' | 'kilian' | 'amouage' | 'marly' | 'classic';
}

export const COLLECTION_INFO = {
  brandName: 'موسوعة العطور العالمية',
  brandEn: 'Haute Parfumerie Internationale',
  collectionTitle: 'روائع العطور العالمية',
  collectionSubtitle: 'صور زجاجات العطور العالمية الأصلية تحت إضاءة الحجر السينمائية',
  editionLabel: 'المجموعة العالمية الشاملة · ٢٠٢٦',
} as const;

export const CATEGORIES: { id: FragranceCategory; label: string; count?: number }[] = [
  { id: 'all', label: 'جميع العطور العالمية' },
  { id: 'niche', label: 'عطور النيش الفاخرة' },
  { id: 'men', label: 'أيقونات رجالية' },
  { id: 'women', label: 'أيقونات نسائية' },
  { id: 'oriental', label: 'عطور شرقية وعود ملكي' },
  { id: 'fresh', label: 'عطور صيفية ومنعشة' },
  { id: 'warm', label: 'عطور شتوية ودافئة' },
];

export const STONE_TEXTURE_IMAGE =
  '/src/assets/images/dark_stone_texture_1795787430816.jpg';

export const PERFUMES: PerfumeItem[] = [
  // 1. DIOR SAUVAGE
  {
    id: 'dior-sauvage',
    number: '01',
    name: 'سوفاج إكسير',
    nameEn: 'Dior Sauvage Elixir',
    brand: 'كريستيان ديور',
    brandEn: 'Christian Dior',
    category: 'men',
    categoryLabel: 'أيقونة رجالية عالمية',
    gender: 'رجالي',
    season: 'خريفي - شتوي - معتدل',
    timeOfDay: 'مسائي وسهرات فخمة',
    family: 'أروماتك تابلي غني',
    lightLabel: 'إضاءة أزرق ليلي داكن',
    description:
      'تحفة دار ديور الأكثر تأثيراً في العصر الحديث. تركيز مكثف يخطف الأنفاس بنفحات الهيل والقرفة وجوزة الطيب، تتلوها خلاصة الخزامى الاستثنائية وتستقر على قاعدة غنية من أخشاب الصندل والعنبروسان.',
    notes: {
      top: 'جوزة الطيب، القرفة، الهيل، الجريب فروت',
      heart: 'الخزامى النقية (اللافندر الفرنسي الفاخر)',
      base: 'خشب الصندل، العرقسوس، العنبر، الباتشولي، نجيل الهند',
    },
    volume: '100 مل',
    concentration: 'بارفان مركز (Elixir)',
    spotlightColor: '#254E80',
    spotlightRgb: '37, 78, 128',
    image: '/assets/bottles/dior-sauvage.png',
    flaconStyle: 'dior',
  },

  // 2. BLEU DE CHANEL
  {
    id: 'bleu-de-chanel',
    number: '02',
    name: 'بلو دو شانيل',
    nameEn: 'Bleu de Chanel Parfum',
    brand: 'شانيل',
    brandEn: 'Chanel Paris',
    category: 'men',
    categoryLabel: 'أيقونة رجالية عالمية',
    gender: 'رجالي',
    season: 'مناسب لجميع الفصول والمواسم',
    timeOfDay: 'نهاري ومسائي رسمي',
    family: 'خشبي أروماتك نقي',
    lightLabel: 'إضاءة كحلي ملكي',
    description:
      'قصيدة للحرية والرجولة المعاصرة من دار شانيل الباريسية. انطلاقة حمضية حادة من قشور الليمون والنعناع، تعانق قلباً خشبياً دافئاً من خشب الأرز وخشب الصندل الكاليدوني مع همسة من البخور المعتق.',
    notes: {
      top: 'قشور الليمون، البرغموت، النعناع المنعش، الشيح',
      heart: 'الخزامى، إبرة الراعي، الملاحظات الخضراء النقية، الأناناس',
      base: 'خشب الصندل، خشب الأرز، البخور، خشب العنبر، حبوب التونكا',
    },
    volume: '100 مل',
    concentration: 'بارفان (Parfum)',
    spotlightColor: '#1A3358',
    spotlightRgb: '26, 51, 88',
    image: '/assets/bottles/bleu-de-chanel.png',
    flaconStyle: 'chanel',
  },

  // 3. BACCARAT ROUGE 540
  {
    id: 'baccarat-rouge-540',
    number: '03',
    name: 'باكارات روج 540',
    nameEn: 'Baccarat Rouge 540 Extrait',
    brand: 'ميزون فرانسيس كوركدجيان',
    brandEn: 'Maison Francis Kurkdjian',
    category: 'niche',
    categoryLabel: 'نيش فاخر أسطوري',
    gender: 'للجنسين',
    season: 'خريفي - شتوي - ليلي',
    timeOfDay: 'سهرات خاصة ومناسبات راقية',
    family: 'عنبري خشبي بلوري ساحر',
    lightLabel: 'إضاءة قرمزي ياقوتي',
    description:
      'العطر الأكثر إثارة للجدل والشغف حول العالم. وليد اندماج كريستال باكارات مع عبقرية كوركدجيان. يمتزج فيه الزعفران الناري بياسمين غرانديفلوروم والعنبر الرمادي في هالة حريرية تدوم لأيام.',
    notes: {
      top: 'الزعفران الأحمر، اللوز المر، الياسمين المصري',
      heart: 'خشب الأرز الأطلسي، العنبر الكريستالي',
      base: 'عنبر الحوت، المسك الخشبي، راتنج التنوب الدخاني',
    },
    volume: '70 مل',
    concentration: 'إكستريت دو بارفان (Extrait)',
    spotlightColor: '#C0152F',
    spotlightRgb: '192, 21, 47',
    image: '/assets/bottles/baccarat-rouge-540.png',
    flaconStyle: 'baccarat',
  },

  // 4. CREED AVENTUS
  {
    id: 'creed-aventus',
    number: '04',
    name: 'كريد أفينتوس',
    nameEn: 'Creed Aventus',
    brand: 'دار كريد',
    brandEn: 'The House of Creed',
    category: 'niche',
    categoryLabel: 'نيش ملكي كلاسيكي',
    gender: 'رجالي',
    season: 'جميع الفصول (ربيع وصيف وخريف)',
    timeOfDay: 'نهاري ومسائي فاخر',
    family: 'فاكهي جلدي دخاني أرستقراطي',
    lightLabel: 'إضاءة فضية ملكية',
    description:
      'ملك عطور النيش العالمية بلا منازع، مستوحى من درامية حياة القادة الفاتحين. يبدأ بانفجار مبهج من الأناناس المدخن والبرغموت والتفاح، يستقر على جلد البتولا المدخن والعنبر الرمادي الفاخر.',
    notes: {
      top: 'الأناناس الملكي، البرغموت، الكشمش الأسود، التفاح',
      heart: 'خشب البتولا المدخن، الباتشولي، الورد المغربي، الياسمين',
      base: 'المسك الفاخر، طحلب البلوط، العنبر الرمادي، الفانيليا',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان ملكي',
    spotlightColor: '#A4B0BE',
    spotlightRgb: '164, 176, 190',
    image: '/assets/bottles/creed-aventus.png',
    flaconStyle: 'creed',
  },

  // 5. TOM FORD TOBACCO VANILLE
  {
    id: 'tom-ford-tobacco-vanille',
    number: '05',
    name: 'توباكو فانيل',
    nameEn: 'Tom Ford Tobacco Vanille',
    brand: 'توم فورد',
    brandEn: 'Tom Ford Private Blend',
    category: 'warm',
    categoryLabel: 'دفء شرقي أرستقراطي',
    gender: 'للجنسين',
    season: 'شتوي بارد',
    timeOfDay: 'سهرات شتوية دافئة',
    family: 'شرقي تابلي دافئ',
    lightLabel: 'إضاءة عنبرية نحاسية دافئة',
    description:
      'استحضار لنوادي السادة الإنجليزية الكلاسيكية. رائحة شرقية مترفة تمزج أوراق التبغ العطرية بأرقى أنواع الفانيليا المدغشقرية الغنية وحبوب الكاكاو وفواكه الشتاء المجففة في تناغم مغناطيسي دافئ.',
    notes: {
      top: 'أوراق التبغ العطرية، التوابل الشرقية الحارة',
      heart: 'الفانيليا الغنية، حبوب التونكا، الكاكاو، زهر التبغ',
      base: 'الفواكه المجففة، نسغ الأخشاب العطرية الثمينة',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان برايفت بليند',
    spotlightColor: '#D99B38',
    spotlightRgb: '217, 155, 56',
    image: '/assets/bottles/tom-ford-tobacco-vanille.png',
    flaconStyle: 'tom-ford',
  },

  // 6. TOM FORD OUD WOOD
  {
    id: 'tom-ford-oud-wood',
    number: '06',
    name: 'عود وود',
    nameEn: 'Tom Ford Oud Wood',
    brand: 'توم فورد',
    brandEn: 'Tom Ford Private Blend',
    category: 'oriental',
    categoryLabel: 'عود شرقي راقٍ',
    gender: 'للجنسين',
    season: 'خريفي - شتوي',
    timeOfDay: 'أمسيات رسمية واجتماعات راقية',
    family: 'خشبي شرقي مدخن ناعم',
    lightLabel: 'إضاءة دخانية خشبية',
    description:
      'أحد أكثر العطور الحالمة بالعود في التاريخ الغربي. يروض حدة خشب العود المدخن بحلاوة خشب الورد البرازيلي والهيل التابلي، مغلفاً بخشب الصندل ونبات الفيتيفر ليمنح حضوراً نادراً ووقاراً استثنائياً.',
    notes: {
      top: 'خشب الورد، الهيل، فلفل سيتشوان الحار',
      heart: 'خشب العود النادر، خشب الصندل، نجيل الهند',
      base: 'حبوب التونكا، الفانيليا، العنبر الصمغي الدافئ',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان برايفت بليند',
    spotlightColor: '#6B513E',
    spotlightRgb: '107, 81, 62',
    image: '/assets/bottles/tom-ford-oud-wood.png',
    flaconStyle: 'tom-ford',
  },

  // 7. LOUIS VUITTON OMBRE NOMADE
  {
    id: 'lv-ombre-nomade',
    number: '07',
    name: 'أومبر نوماد',
    nameEn: 'Louis Vuitton Ombre Nomade',
    brand: 'لويس فيتون',
    brandEn: 'Louis Vuitton Paris',
    category: 'oriental',
    categoryLabel: 'فخامة الصحراء والعود',
    gender: 'للجنسين',
    season: 'شتوي - ليلي فاخر',
    timeOfDay: 'مناسبات كبرى وسهرات باردة',
    family: 'شرقي جلدي بخوري عميق',
    lightLabel: 'إضاءة برونزية ذهبية عميقة',
    description:
      'تحفة خبير العطور جاك كافالييه لدار لويس فيتون. دوامة عطرية ملحمية من عود أسام النقي وقطرات البخور والجاوي، تداعبها نوتة توت العليق والورد الجوري لتخلق أثراً أسطورياً يخطف الحواس.',
    notes: {
      top: 'توت العليق، إبرة الراعي، الزعفران الخالص',
      heart: 'الورد الدمشقي، البخور العطري، البنزوين (الجاوي)',
      base: 'عود أسام النادر، الجلود المدخنة، أخشاب البتولا',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان فاخر',
    spotlightColor: '#8C5224',
    spotlightRgb: '140, 82, 36',
    image: '/assets/bottles/lv-ombre-nomade.jpg',
    flaconStyle: 'classic',
  },

  // 8. KILIAN ANGELS' SHARE
  {
    id: 'kilian-angels-share',
    number: '08',
    name: 'آنجلز شير',
    nameEn: "Kilian Angels' Share",
    brand: 'كيليان باريس',
    brandEn: 'By Kilian Paris',
    category: 'warm',
    categoryLabel: 'جورماند مسكر فائق الفخامة',
    gender: 'للجنسين',
    season: 'خريفي - شتوي مائل للبرودة',
    timeOfDay: 'سهرات مسائية حميمية',
    family: 'شرقي خشبي جورماند',
    lightLabel: 'إضاءة كهرمانية ذهبية',
    description:
      'إشادة بثمانية أجيال من تقطير الكونياك الفرنسي في عائلة هينيسي. عطر دافئ مسكر يمتزج فيه خلاصة الكونياك المعتق مع القرفة السيلانية وخشب البلوط والبرالين المقرمش، محفوظ في زجاجة كريستالية ككأس باريسي عتيق.',
    notes: {
      top: 'خلاصة الكونياك الفرنسي المعتق',
      heart: 'القرفة السيلانية، خشب البلوط، حبوب التونكا',
      base: 'حلوى البرالين، الفانيليا الكريمية، خشب الصندل',
    },
    volume: '50 مل',
    concentration: 'أو دو بارفان',
    spotlightColor: '#E29738',
    spotlightRgb: '226, 151, 56',
    image: '/assets/bottles/kilian-angels-share.jpg',
    flaconStyle: 'kilian',
  },

  // 9. YSL BLACK OPIUM
  {
    id: 'ysl-black-opium',
    number: '09',
    name: 'بلاك أوبيوم',
    nameEn: 'YSL Black Opium',
    brand: 'إيف سان لوران',
    brandEn: 'Yves Saint Laurent',
    category: 'women',
    categoryLabel: 'أيقونة نسائية عالمية',
    gender: 'نسائي',
    season: 'خريفي - شتوي',
    timeOfDay: 'مسائي وسهرات ليلية',
    family: 'شرقي فانيلي ساحر بالقهوة',
    lightLabel: 'إضاءة وردي ليلي برّاق',
    description:
      'جرعة أدرينالين أنثوية ساحرة. أول عطر يدمج جرأة القهوة السوداء الغنية بنعومة باقة الزهور البيضاء ولمسة الفانيليا الدافئة في تباين حسي ساحر يبعث على الإدمان والجاذبية المطلقة.',
    notes: {
      top: 'الكمثرى، الفلفل الوردي، زهر البرتقال',
      heart: 'حبوب القهوة السوداء المركزة، الياسمين، اللوز المر',
      base: 'الفانيليا، الباتشولي، أخشاب الأرز، خشب الكشمير',
    },
    volume: '90 مل',
    concentration: 'أو دو بارفان',
    spotlightColor: '#BD4871',
    spotlightRgb: '189, 72, 113',
    image: '/assets/bottles/ysl-black-opium.png',
    flaconStyle: 'classic',
  },

  // 10. PARFUMS DE MARLY LAYTON
  {
    id: 'pdm-layton',
    number: '10',
    name: 'ليتون رويال',
    nameEn: 'Parfums de Marly Layton',
    brand: 'بارفيومز دي مارلي',
    brandEn: 'Parfums de Marly',
    category: 'niche',
    categoryLabel: 'فخامة البلاط الملكي الفرنسي',
    gender: 'رجالي / للجنسين',
    season: 'خريفي - شتوي - ربيعي',
    timeOfDay: 'مناسب لجميع الأوقات الراقية',
    family: 'شرقي زهري تابلي فاخر',
    lightLabel: 'إضاءة أزرق فيروزي داكن',
    description:
      'مستوحى من بهجة واحتفالات البلاط الملكي في فرساي في القرن الثامن عشر. افتتاحية منعشة من التفاح والبرغموت واللافندر، تذوب في قلب زهري تابلي دافئ من الياسمين والفانيليا الفاخرة وخشب الغاياك.',
    notes: {
      top: 'التفاح المقرمش، اللافندر، اليوسفي، البرغموت',
      heart: 'إبرة الراعي، البنفسج، الياسمين الهندي',
      base: 'الفانيليا، الهيل، خشب الغاياك، خشب الصندل، الباتشولي',
    },
    volume: '125 مل',
    concentration: 'أو دو بارفان ملكي',
    spotlightColor: '#2B547E',
    spotlightRgb: '43, 84, 126',
    image: '/assets/bottles/pdm-layton.png',
    flaconStyle: 'marly',
  },

  // 11. PARFUMS DE MARLY DELINA
  {
    id: 'pdm-delina',
    number: '11',
    name: 'ديلينا إكسكلوسيف',
    nameEn: 'Parfums de Marly Delina',
    brand: 'بارفيومز دي مارلي',
    brandEn: 'Parfums de Marly',
    category: 'women',
    categoryLabel: 'أنوثة ملكية ساحرة',
    gender: 'نسائي',
    season: 'ربيعي - صيفي - خريفي',
    timeOfDay: 'نهاري راقٍ وسهرات رومانسية',
    family: 'زهري مسكي فاكهي ناعم',
    lightLabel: 'إضاءة وردي بودري ناعم',
    description:
      'باقة ملكية تحتفي بالأنوثة الطاغية. ورد تركي ندي يمتزج مع الليتشي والراوند ولمسة دافئة من البخور والفانيليا وأخشاب الكشمير، داخل زجاجة وردية بودرية مزينة بشرّابات حريرية تاريخية.',
    notes: {
      top: 'الليتشي الندي، الراوند، البرغموت، جوزة الطيب',
      heart: 'الورد التركي، الفاوانيا، المسك الشفاف، زنبق الوادي',
      base: 'الفانيليا، البخور العطري، خشب الأرز، نجيل الهند، الكشمير',
    },
    volume: '75 مل',
    concentration: 'أو دو بارفان',
    spotlightColor: '#E8A3B8',
    spotlightRgb: '232, 163, 184',
    image: '/assets/bottles/pdm-delina.png',
    flaconStyle: 'marly',
  },

  // 12. CHANEL NO. 5
  {
    id: 'chanel-no-5',
    number: '12',
    name: 'شانيل رقم 5',
    nameEn: 'Chanel No. 5 Parfum',
    brand: 'شانيل',
    brandEn: 'Chanel Paris',
    category: 'women',
    categoryLabel: 'الأسطورة الخالدة في تاريخ العطور',
    gender: 'نسائي',
    season: 'جميع الفصول والمواسم',
    timeOfDay: 'سهرات ومناسبات راقية',
    family: 'ألدهيدي زهري أسطوري',
    lightLabel: 'إضاءة ذهبية عاجية ملكية',
    description:
      'العطر الأكثر شهرة في تاريخ البشرية منذ ابتكار كوكو شانيل له عام 1921. توليفة مجردة لا مثيل لها تلتقي فيها الألدهيدات البراقة بياسمين غراس وورد مايو ودفء خشب الصندل في أناقة لا يطويها الزمن.',
    notes: {
      top: 'الألدهيدات النقية، النيرولي، زهر البرتقال، البرغموت',
      heart: 'ياسمين غراس الأسطوري، ورد مايو، السوسن، زنبق الوادي',
      base: 'خشب الصندل الهندي، نجيل الهند، الفانيليا، العنبر، الباتشولي',
    },
    volume: '100 مل',
    concentration: 'بارفان (Parfum)',
    spotlightColor: '#D4AF37',
    spotlightRgb: '212, 175, 55',
    image: '/assets/bottles/chanel-no-5.png',
    flaconStyle: 'chanel',
  },

  // 13. AMOUAGE INTERLUDE MAN
  {
    id: 'amouage-interlude',
    number: '13',
    name: 'إنترلود مان (الوحش الأزرق)',
    nameEn: 'Amouage Interlude Man',
    brand: 'أمواج عمان',
    brandEn: 'Amouage Royal House',
    category: 'oriental',
    categoryLabel: 'الملكية العمانية وعود اللبان',
    gender: 'رجالي',
    season: 'شتوي بارد جداً',
    timeOfDay: 'سهرات كبرى ومناسبات مهيبة',
    family: 'شرقي بلسمي دخاني مهيب',
    lightLabel: 'إضاءة أزرق ملكي معتق',
    description:
      'الملقب عالمياً بـ "الوحش الأزرق" لقوته وثباته الأسطوري. تحفة شرقية عميقة تلتقي فيها نيران البخور العماني واللبان الحوجري مع جلود معتقة وعنبر دافئ ولمسة أوريغانو تدوم لأيام متواصلة.',
    notes: {
      top: 'الأوريغانو، الفلفل الحلو، البرغموت الصقلي',
      heart: 'اللبان العماني الحوجري، العنبر، الأوبوبوناكس، القستوس',
      base: 'الجلود المدخنة، العود، الباتشولي، خشب الصندل',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان إكستريم',
    spotlightColor: '#1F3A60',
    spotlightRgb: '31, 58, 96',
    image: '/assets/bottles/amouage-interlude.png',
    flaconStyle: 'amouage',
  },

  // 14. ROJA DOVE ELYSIUM
  {
    id: 'roja-elysium',
    number: '14',
    name: 'إليسيوم بور أوم',
    nameEn: 'Roja Elysium Pour Homme',
    brand: 'روجا بارفيومز',
    brandEn: 'Roja Parfums London',
    category: 'niche',
    categoryLabel: 'قمة النيش البريطاني الفاخر',
    gender: 'رجالي / للجنسين',
    season: 'صيفي - ربيعي - صباحي ومسائي',
    timeOfDay: 'صباحي راقٍ وسهرات صيفية',
    family: 'أروماتك حمضي فاخر ونادر',
    lightLabel: 'إضاءة زفيرية سماوية مذهلة',
    description:
      'الجنة العطرية كما تصورها العطار الأسطوري روجا دوف. مزيج حمضي استثنائي يجمع الجريب فروت والليمون مع الكشمش الأسود وخشب الأرز ونجيل الهند، متوجاً برداء من المسك الفاخر والنقاء الذي لا يضاهى.',
    notes: {
      top: 'الجريب فروت، الليمون الحامض، البرغموت، اللافندر، الزعتر',
      heart: 'الكشمش الأسود، التفاح، زنبق الوادي، الياسمين، الورد',
      base: 'نجيل الهند، التوت العطري، خشب الأرز، الفانيليا، المسك، البنزوين',
    },
    volume: '100 مل',
    concentration: 'بارفان كولونيا نقي',
    spotlightColor: '#3480B8',
    spotlightRgb: '52, 128, 184',
    image: '/assets/bottles/roja-elysium.png',
    flaconStyle: 'classic',
  },

  // 15. LE LABO SANTAL 33
  {
    id: 'le-labo-santal-33',
    number: '15',
    name: 'سانتال 33',
    nameEn: 'Le Labo Santal 33',
    brand: 'لو لابو',
    brandEn: 'Le Labo New York',
    category: 'niche',
    categoryLabel: 'أيقونة النيش المستقل',
    gender: 'للجنسين',
    season: 'خريفي - شتوي - ربيعي',
    timeOfDay: 'يومي ومسائي فني مستقل',
    family: 'خشبي جلدي بودري أروماتك',
    lightLabel: 'إضاءة رملية دافئة خشبية',
    description:
      'العطر الذي غيّر مفهوم العطور المستقلة في نيويورك والعواصم العالمية. تجسيد للروح الأمريكية الحرة من خلال خشب الصندل الأسترالي، الهيل التابلي، البنفسج الجلدي وأوراق البردي المدخنة في تركيبة آسرة وفريدة.',
    notes: {
      top: 'الهيل، أزهار البنفسج، السوسن البودري',
      heart: 'خشب الصندل الأسترالي، نبات البردي (Papyrus)',
      base: 'الجلود المدبوغة، خشب الأرز، العنبر الجاف',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان نيش',
    spotlightColor: '#C49E6C',
    spotlightRgb: '196, 158, 108',
    image: '/assets/bottles/le-labo-santal-33.png',
    flaconStyle: 'classic',
  },

  // 16. ACQUA DI GIÒ PARFUM
  {
    id: 'acqua-di-gio',
    number: '16',
    name: 'أكوا دي جيو بارفان',
    nameEn: 'Acqua Di Giò Parfum',
    brand: 'جورجيو أرماني',
    brandEn: 'Giorgio Armani',
    category: 'fresh',
    categoryLabel: 'أسطورة الانتعاش البحري',
    gender: 'رجالي',
    season: 'صيفي - ربيعي - دافئ',
    timeOfDay: 'صباحي ويومي وسهرات شاطئية',
    family: 'مائي بحري بخوري عميق',
    lightLabel: 'إضاءة أزرق مائي عميق',
    description:
      'النسخة الأكثر فخامة ونضجاً من أشهر عطر بحري في التاريخ. تمزج نسائم البحر الأبيض المتوسط المالحة مع برغموت كالابريا ودفء البخور الغامض والباتشولي النقي في تناغم منعش فائق الثبات والأناقة.',
    notes: {
      top: 'الملاحظات البحرية المنعشة، برغموت كالابريا',
      heart: 'إكليل الجبل، المريمية، إبرة الراعي البوربونية',
      base: 'البخور الغامض، الباتشولي الغواتيمالي الفاخر',
    },
    volume: '100 مل',
    concentration: 'بارفان مركز (Parfum)',
    spotlightColor: '#235D7A',
    spotlightRgb: '35, 93, 122',
    image: '/assets/bottles/acqua-di-gio.png',
    flaconStyle: 'classic',
  },

  // 17. VERSACE EROS
  {
    id: 'versace-eros',
    number: '17',
    name: 'فيرساتشي إيروس',
    nameEn: 'Versace Eros Parfum',
    brand: 'فيرساتشي',
    brandEn: 'Versace Milano',
    category: 'men',
    categoryLabel: 'جاذبية وأناقة إيطالية',
    gender: 'رجالي',
    season: 'جميع الفصول - سهرات ليلية',
    timeOfDay: 'سهرات وحفلات ومناسبات',
    family: 'شرقي فوچير منعش دافئ',
    lightLabel: 'إضاءة فيروزية متوسطية ساطعة',
    description:
      'مستوحى من إله الحب والجمال اليوناني لدى أسطورة دار فيرساتشي. عاصفة حسية من النعناع المثلج وقشور الليمون الإيطالي والتفاح الأخضر المقرمش، تذوب في أحضان حبوب التونكا وفانيليا مدغشقر وخشب الأرز.',
    notes: {
      top: 'النعناع البارد، التفاح الأخضر المقرمش، الليمون الصقلي',
      heart: 'حبوب التونكا الفنزويلية، الأمبروكسان، زهرة إبرة الراعي',
      base: 'فانيليا مدغشقر، خشب الأرز الأطلسي، نجيل الهند، طحلب السنديان',
    },
    volume: '100 مل',
    concentration: 'بارفان (Parfum)',
    spotlightColor: '#17918F',
    spotlightRgb: '23, 145, 143',
    image: '/assets/bottles/versace-eros.png',
    flaconStyle: 'classic',
  },

  // 18. YSL LIBRE INTENSE
  {
    id: 'ysl-libre',
    number: '18',
    name: 'ليبر إنتنس',
    nameEn: 'YSL Libre Intense',
    brand: 'إيف سان لوران',
    brandEn: 'Yves Saint Laurent',
    category: 'women',
    categoryLabel: 'أيقونة نسائية عالمية',
    gender: 'نسائي',
    season: 'خريفي - شتوي - معتدل',
    timeOfDay: 'مسائي ورسمي راقٍ',
    family: 'زهري شرقي فانيلي ساحر',
    lightLabel: 'إضاءة كهرمانية ذهبية فاقعة',
    description:
      'صرخة الحرية والأنوثة المستقلة من إيف سان لوران. تمازج جريء بين برودة اللافندر الفرنسي وحرارة زهر البرتقال المغربي وزهرة الأوركيد البرية، مع قاعدة عميقة من الفانيليا والعنبر الرمادي.',
    notes: {
      top: 'اللافندر الفرنسي، اليوسفي، البرغموت',
      heart: 'زهر البرتقال المغربي، الأوركيد، اللافندر، الياسمين السامباك',
      base: 'فانيليا مدغشقر الغنية، حبوب التونكا، العنبر الرمادي، نجيل الهند',
    },
    volume: '90 مل',
    concentration: 'أو دو بارفان إنتنس',
    spotlightColor: '#D89047',
    spotlightRgb: '216, 144, 71',
    image: '/assets/bottles/ysl-libre.png',
    flaconStyle: 'classic',
  },

  // 19. CAROLINA HERRERA GOOD GIRL
  {
    id: 'ch-good-girl',
    number: '19',
    name: 'جود جيرل',
    nameEn: 'Carolina Herrera Good Girl',
    brand: 'كارولينا هيريرا',
    brandEn: 'Carolina Herrera New York',
    category: 'women',
    categoryLabel: 'أنوثة وجاذبية مسائية',
    gender: 'نسائي',
    season: 'خريفي - شتوي',
    timeOfDay: 'سهرات ليلية ومناسبات مميزة',
    family: 'شرقي زهري جورماند مسكر',
    lightLabel: 'إضاءة زرقاء ليلية براقة',
    description:
      'تجسيد للازدواجية الجذابة في شخصية المرأة المعاصرة تحت شعار "من الرائع أن تكوني جريئة". يجمع نقاء مسك الروم والياسمين السامباك مع غموض الكاكاو المحمص وحبوب التونكا المحمصة واللوز.',
    notes: {
      top: 'اللوز المحمص، القهوة، البرغموت، الليمون',
      heart: 'مسك الروم (Tuberose)، الياسمين السامباك، براعم البرتقال',
      base: 'حبوب التونكا، الكاكاو الغني، الفانيليا، حلوى البرالين، خشب الصندل',
    },
    volume: '80 مل',
    concentration: 'أو دو بارفان',
    spotlightColor: '#1A2954',
    spotlightRgb: '26, 41, 84',
    image: '/assets/bottles/ch-good-girl.png',
    flaconStyle: 'classic',
  },

  // 20. XERJOFF ERBA PURA
  {
    id: 'xerjoff-erba-pura',
    number: '20',
    name: 'أربا بورا',
    nameEn: 'Xerjoff Erba Pura',
    brand: 'زرجوف الإيطالية',
    brandEn: 'Xerjoff Torino',
    category: 'niche',
    categoryLabel: 'سحر النيش الإيطالي الاستوائي',
    gender: 'للجنسين',
    season: 'صيفي - ربيعي - جميع الفصول',
    timeOfDay: 'نهاري ومسائي جذاب',
    family: 'فاكهي مسكي استوائي منعش',
    lightLabel: 'إضاءة فيروزية مخملية ساحرة',
    description:
      'سلة فواكه متوسطية نضرة مغطاة بالمخمل الملكي. سيمفونية من برتقال صقلية وليمون كالابريا تنساب بنعومة فوق سرير مخملي من المسك الأبيض الحسي وفانيليا مدغشقر، لتقدم فوحاناً استثنائياً يدوم لأيام.',
    notes: {
      top: 'البرتقال الصقلي، ليمون كالابريا، البرغموت',
      heart: 'سلة الفواكه المتوسطية النادرة',
      base: 'المسك الأبيض النقي، الفانيليا، العنبر الدافئ',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان مخملي',
    spotlightColor: '#1FA694',
    spotlightRgb: '31, 166, 148',
    image: '/assets/bottles/xerjoff-erba-pura.jpg',
    flaconStyle: 'classic',
  },

  // 21. INITIO OUD FOR GREATNESS
  {
    id: 'initio-oud-for-greatness',
    number: '21',
    name: 'عود فور غريتنس',
    nameEn: 'Initio Oud for Greatness',
    brand: 'إنيشيو بارفيومز',
    brandEn: 'Initio Parfums Privés',
    category: 'oriental',
    categoryLabel: 'طاقة العود والنيش الصوفي',
    gender: 'للجنسين',
    season: 'خريفي - شتوي',
    timeOfDay: 'مسائي فخم وسهرات خاصة',
    family: 'خشبي تابلي صوفي مهيب',
    lightLabel: 'إضاءة ذهبية سوداء صوفية',
    description:
      'يستحضر الهندسة المقدسة وقوة العود الطبيعي في أنقى تجلياته. خشب العود الطبيعي الممزوج بالزعفران الخالص وجوزة الطيب واللافندر، ليمنح مرتديه هالة من العظمة والهيبة التي تأسر كل من حوله.',
    notes: {
      top: 'الزعفران، جوزة الطيب، الخزامى (اللافندر)',
      heart: 'خشب العود الطبيعي الفاخر النقي',
      base: 'الباتشولي الإندونيسي، المسك الأبيض الفاخر',
    },
    volume: '90 مل',
    concentration: 'أو دو بارفان نيش',
    spotlightColor: '#966E2D',
    spotlightRgb: '150, 110, 45',
    image: '/assets/bottles/initio-oud-for-greatness.png',
    flaconStyle: 'classic',
  },

  // 22. DIOR FAHRENHEIT
  {
    id: 'dior-fahrenheit',
    number: '22',
    name: 'ديور فهرنهايت',
    nameEn: 'Dior Fahrenheit',
    brand: 'كريستيان ديور',
    brandEn: 'Christian Dior',
    category: 'men',
    categoryLabel: 'أيقونة رجالية كلاسيكية جريئة',
    gender: 'رجالي',
    season: 'خريفي - شتوي - معتدل',
    timeOfDay: 'مسائي وشتوي جريء',
    family: 'جلدي خشبي أروماتك ناري',
    lightLabel: 'إضاءة نارية برتقالية مائلة للحمرة',
    description:
      'العطر الثوري الذي قلب موازين صناعة العطور الرجالية منذ عام 1988. صراع ساحر بين برودة زهر البنفسج وحرارة الجلود المعتقة وجوزة الطيب وخشب الأرز في تدرج لوني أسطوري مستوحى من غروب الشمس البركاني.',
    notes: {
      top: 'زهر جوزة الطيب، اللافندر، خشب الأرز، البابونج، الماندرين',
      heart: 'أوراق البنفسج الجريئة، جوزة الطيب، خشب الصندل، القرنفل',
      base: 'الجلود المعتقة، نجيل الهند، المسك، العنبر، الباتشولي',
    },
    volume: '100 مل',
    concentration: 'أو دو تواليت كلاسيك',
    spotlightColor: '#C44520',
    spotlightRgb: '196, 69, 32',
    image: '/assets/bottles/dior-fahrenheit.png',
    flaconStyle: 'dior',
  },

  // 23. TOM FORD LOST CHERRY
  {
    id: 'tom-ford-lost-cherry',
    number: '23',
    name: 'لوست شيري',
    nameEn: 'Tom Ford Lost Cherry',
    brand: 'توم فورد',
    brandEn: 'Tom Ford Private Blend',
    category: 'niche',
    categoryLabel: 'جاذبية الكرز المسكر الفاخر',
    gender: 'للجنسين',
    season: 'خريفي - شتوي - ليلي',
    timeOfDay: 'سهرات وأمسيات خاصة رومانسية',
    family: 'فاكهي شرقي غني ومسكر',
    lightLabel: 'إضاءة كرزية قانية عميقة',
    description:
      'رحلة حسية مثيرة ومحرمة. اندماج مسكر للكرز الأسود الناضج مع سائل الليكور المسكر واللوز المر، يتبعه قلب من الورد التركي والياسمين السامباك، مستقر فوق خشب الصندل ونجيل الهند وحبوب التونكا المحمصة.',
    notes: {
      top: 'الكرز الأسود، الليكور المسكر، اللوز المر',
      heart: 'الكرز الحامض، البرقوق، الورد التركي، ياسمين سامباك',
      base: 'الفانيليا، حبوب التونكا، قرفة السيلان، خشب الصندل، خشب الأرز',
    },
    volume: '50 مل',
    concentration: 'أو دو بارفان برايفت بليند',
    spotlightColor: '#8C1D38',
    spotlightRgb: '140, 29, 56',
    image: '/assets/bottles/tom-ford-lost-cherry.png',
    flaconStyle: 'tom-ford',
  },

  // 24. TERRE D'HERMÈS
  {
    id: 'terre-d-hermes',
    number: '24',
    name: 'تير دي هيرمس',
    nameEn: "Terre d'Hermès Parfum",
    brand: 'هيرمس باريس',
    brandEn: 'Hermès Paris',
    category: 'fresh',
    categoryLabel: 'اتحاد الأرض والسماء الخالد',
    gender: 'رجالي',
    season: 'ربيعي - خريفي - صيفي',
    timeOfDay: 'نهاري ورسمي يومي راقٍ',
    family: 'خشبي حار معدني ترابي أنيق',
    lightLabel: 'إضاءة طينية برتقالية دافئة',
    description:
      'الرواية العطرية الخالدة للعطار جان كلود إلينا. تحكي قصة تحول المادة وقوة الأرض. لقاء البرتقال المر والجريب فروت مع حدة حجر الصوان المعدني وخشب الأرز ونجيل الهند في تركيبة نقية تعكس نبل الرجل المعاصر.',
    notes: {
      top: 'البرتقال المر، الجريب فروت المنعش',
      heart: 'حجر الصوان المعدني، الفلفل الوردي، نبات اللقلقي',
      base: 'خشب الأرز، نجيل الهند، البنزوين (الجاوي)، طحلب البلوط',
    },
    volume: '75 مل',
    concentration: 'بارفان خالص (Parfum)',
    spotlightColor: '#D06E2E',
    spotlightRgb: '208, 110, 46',
    image: '/assets/bottles/terre-d-hermes.png',
    flaconStyle: 'classic',
  },

  // 25. LANCÔME LA VIE EST BELLE
  {
    id: 'lancome-la-vie-est-belle',
    number: '25',
    name: 'لا في إيه بيل',
    nameEn: 'Lancôme La Vie Est Belle',
    brand: 'لانكوم باريس',
    brandEn: 'Lancôme Paris',
    category: 'women',
    categoryLabel: 'أيقونة البهجة والأنوثة الباريسية',
    gender: 'نسائي',
    season: 'خريفي - شتوي - ربيعي',
    timeOfDay: 'نهاري ومسائي مبهج',
    family: 'زهري جورماند مسكّر فاخر',
    lightLabel: 'إضاءة وردية سكرية مشرقة',
    description:
      'إعلان صريح عن السعادة والبهجة الحرة ("الحياة حلوة"). ابتكره ثلاثة من كبار عطاري فرنسا. يتربع زهر السوسن الباليدي النبيل فوق طبقة غنية من حلاوة البرالين والباتشولي والفانيليا وزهر البرتقال.',
    notes: {
      top: 'الكشمش الأسود، الكمثرى الناضجة',
      heart: 'السوسن الباليدي الفاخر، الياسمين، زهر البرتقال',
      base: 'حلوى البرالين، الفانيليا الغنية، الباتشولي، حبوب التونكا',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان',
    spotlightColor: '#E290A8',
    spotlightRgb: '226, 144, 168',
    image: '/assets/bottles/lancome-la-vie-est-belle.png',
    flaconStyle: 'classic',
  },

  // 26. DOLCE & GABBANA LIGHT BLUE INTENSE
  {
    id: 'dg-light-blue-intense',
    number: '26',
    name: 'لايت بلو إنتنس',
    nameEn: 'D&G Light Blue Eau Intense',
    brand: 'دولتشي آند غابانا',
    brandEn: 'Dolce & Gabbana',
    category: 'fresh',
    categoryLabel: 'شمس كابري والبحر الأبيض المتوسط',
    gender: 'للجنسين / نسائي',
    season: 'صيفي ناصع - ربيعي مشرق',
    timeOfDay: 'صباحي، شاطئي، وأيام الصيف الحارة',
    family: 'حمضي مائي مشرق منعش',
    lightLabel: 'إضاءة أزرق سماوي متوسطي مشرق',
    description:
      'إجازة صيفية على ضفاف جزيرة كابري الإيطالية. انتعاش باهر من الليمون الصقلي وتفاح الجدة سميث الأخضر مع نسيم البحر المتوسط وأخشاب العنبر والمسك في إشراقة متجددة تفيض بالحيوية والانتعاش المطلق.',
    notes: {
      top: 'الليمون الصقلي المشمس، تفاح الجدة سميث الأخضر',
      heart: 'زهرة المخملية (Marigold)، أزهار الياسمين المنعشة',
      base: 'خشب العنبر، المسك الأبيض المشمس',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان إنتنس',
    spotlightColor: '#4CAEC7',
    spotlightRgb: '76, 174, 199',
    image: '/assets/bottles/dg-light-blue-intense.png',
    flaconStyle: 'classic',
  },
];
