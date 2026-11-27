/**
 * بيانات مجموعة العطور الفاخرة — دار سَديم
 * -------------------------------------------------------------------------
 * يمكنك تعديل أسماء العطور، الأوصاف، ألوان إضاءة السبوت لايت، ومسارات الصور
 * بسهولة من هذا الملف فقط، وسيتحدث الموقع بالكامل تلقائياً.
 */

export interface PerfumeNotes {
  top: string;
  heart: string;
  base: string;
}

export interface PerfumeItem {
  /** معرّف فريد للعطر */
  id: string;
  /** الرقم التسلسلي المعروض داخل التجويف */
  number: string;
  /** اسم العطر بالخط الكبير */
  name: string;
  /** العائلة العطرية */
  family: string;
  /** لون الإضاءة بالعربية (للوصف التعريفي وإمكانية الوصول) */
  lightLabel: string;
  /** وصف مختصر وأنيق يظهر في صفحة التفاصيل */
  description: string;
  /** النوتات العطرية (المقدمة، القلب، القاعدة) */
  notes: PerfumeNotes;
  /** الحجم والتركيز */
  volume: string;
  concentration: string;
  /** اللون الرئيسي لإضاءة السبوت لايت (Hex) */
  spotlightColor: string;
  /** لون التوهج الثانوي الداعم (RGB string للاستخدام مع الشفافية) */
  spotlightRgb: string;
  /** مسار صورة زجاجة العطر (يمكنك استبداله بأي صورة جديدة بسهولة) */
  image: string;
}

export const COLLECTION_INFO = {
  brandName: 'دار سَديم',
  collectionTitle: 'مجموعة الأطياف',
  collectionSubtitle: 'خمس خلاصات نادرة تحت ضوء الحجر',
  editionLabel: 'الإصدار الخاص · ٢٠٢٦',
} as const;

export const STONE_TEXTURE_IMAGE =
  '/src/assets/images/dark_stone_texture_1795787430816.jpg';

export const PERFUMES: PerfumeItem[] = [
  {
    id: 'amber-mirage',
    number: '01',
    name: 'عنبر المرايا',
    family: 'عنبري خشبي دافئ',
    lightLabel: 'إضاءة عنبر ذهبي',
    description:
      'توليفة دافئة تحتفي بالعنبر المعتّق وراتنج اللبان العُماني، تذوب فوق طبقة مخملية من الفانيليا المدخّنة وخشب الصندل الهندي لتترك أثراً مهيباً يرافق السكون.',
    notes: {
      top: 'البرغموت الذهبي، الزعفران',
      heart: 'اللبان العُماني، راتنج العنبر',
      base: 'خشب الصندل، الفانيليا المدخّنة',
    },
    volume: '100 مل',
    concentration: 'إكستريت دو بارفان',
    spotlightColor: '#D99B38',
    spotlightRgb: '217, 155, 56',
    image: '/src/assets/images/perfume_golden_amber_1795787424622.jpg',
  },
  {
    id: 'twilight-rose',
    number: '02',
    name: 'ورد الشفق',
    family: 'زهري مسكي ناعم',
    lightLabel: 'إضاءة وردي ناعم',
    description:
      'بتلات الورد الدمشقي المقطوفة عند الغسق تتعانق مع المسك الأبيض الشفاف وهمسة من الفلفل الوردي، لتمنحك حضوراً حريرياً ناعماً يجمع الرقة بالثبات.',
    notes: {
      top: 'الفلفل الوردي، الليتشي الندي',
      heart: 'الورد الدمشقي، الفاوانيا البيضاء',
      base: 'المسك الأبيض، أخشاب الكشمير',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان',
    spotlightColor: '#DFA0AE',
    spotlightRgb: '223, 160, 174',
    image: '/src/assets/images/perfume_soft_rose_1795787425336.jpg',
  },
  {
    id: 'emerald-dew',
    number: '03',
    name: 'ندى الزمرد',
    family: 'أخضر نباتي منعش',
    lightLabel: 'إضاءة أخضر فاتح',
    description:
      'انتعاش أوراق التين الأخضر والبرغموت الصقلي المبلل بقطرات الفجر، يستقر على قاعدة هادئة من نجيل الهند وخشب الأرز الأبيض في توازن نقي يبعث الصفاء.',
    notes: {
      top: 'أوراق التين الأخضر، البرغموت الصقلي',
      heart: 'الشاي الأخضر، النيرولي النقي',
      base: 'نجيل الهند، خشب الأرز الأبيض',
    },
    volume: '100 مل',
    concentration: 'أو دو بارفان',
    spotlightColor: '#86C99B',
    spotlightRgb: '134, 201, 155',
    image: '/src/assets/images/perfume_light_green_1795787427351.jpg',
  },
  {
    id: 'midnight-tide',
    number: '04',
    name: 'ليل البحر',
    family: 'مائي معدني عميق',
    lightLabel: 'إضاءة أزرق داكن',
    description:
      'نفحات بحرية عميقة وملوحة معدنية باردة تمتزج بالمريمية الزرقاء والعود الأبيض، مستوحاة من التقاء موج الليل الساكن بصخور البازلت الداكنة.',
    notes: {
      top: 'النسيم البحري، الهيل البارد',
      heart: 'المريمية الزرقاء، إبرة الراعي',
      base: 'العنبر الرمادي، العود الأبيض',
    },
    volume: '100 مل',
    concentration: 'إكستريت دو بارفان',
    spotlightColor: '#3B6EC2',
    spotlightRgb: '59, 110, 194',
    image: '/src/assets/images/perfume_deep_blue_1795787428236.jpg',
  },
  {
    id: 'crimson-soul',
    number: '05',
    name: 'روح العنّاب',
    family: 'جلدي شرقي فاخر',
    lightLabel: 'إضاءة عنابي',
    description:
      'خلاصة الكرز الأسود والزعفران الفاخر تندمج بجرأة مع الجلود المدخّنة والعود الكمبودي المعتّق، لتصنع عطراً ليلياً آسراً بعمق عنابي غني لا يُنسى.',
    notes: {
      top: 'الكرز الأسود، الزعفران الأحمر',
      heart: 'الجلد المدخّن، الورد المخملي',
      base: 'العود الكمبودي، الباتشولي الداكن',
    },
    volume: '100 مل',
    concentration: 'إكستريت دو بارفان',
    spotlightColor: '#B53852',
    spotlightRgb: '181, 56, 82',
    image: '/src/assets/images/perfume_burgundy_1795787429674.jpg',
  },
];
