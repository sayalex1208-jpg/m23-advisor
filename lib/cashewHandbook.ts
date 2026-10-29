/**
 * OFFICIAL CAMBODIAN CASHEW HANDBOOK (សៀវភៅណែនាំបច្ចេកទេសស្វាយចន្ទី)
 * Comprehensive technical guide grounded in the Cambodian Cashew Handbook (M23 focus).
 * Transcribed and structured directly from the official 3-volume Cambodian guide.
 */

import type { Language } from "@/types/agronomy";

export interface HandbookSection {
  code: string;
  titleKm: string;
  titleEn: string;
  contentKm: string;
  contentEn: string;
  keyPointsKm?: string[];
  keyPointsEn?: string[];
  warningKm?: string;
  warningEn?: string;
}

export interface HandbookChapter {
  id: string;
  code: string; // e.g. "ក", "ខ", "គ", "ឃ", "ង", "ច", "ឆ", "ជ", "ឈ"
  titleKm: string;
  titleEn: string;
  icon: string;
  badgeKm: string;
  badgeEn: string;
  summaryKm: string;
  summaryEn: string;
  sections: HandbookSection[];
}

export const CASHEW_HANDBOOK: HandbookChapter[] = [
  {
    id: "chapter-ka-fundamentals",
    code: "ក",
    titleKm: "កត្តាសំខាន់ៗ និងចាំបាច់មួយចំនួនត្រូវយល់ដឹង",
    titleEn: "Essential Agronomic Fundamentals & IPM",
    icon: "🌱",
    badgeKm: "មូលដ្ឋានគ្រឹះ",
    badgeEn: "Fundamentals",
    summaryKm: "លក្ខណៈជីវសាស្ត្រនៃដំណាំចន្ទី វិធានការណ៍ចម្រុះគ្រប់គ្រងសត្វល្អិតចង្រៃ (IPM) ៧ ជំហាន និងលក្ខណៈពិសេសពូជចន្ទីកម្ពុជា។",
    summaryEn: "Cashew biological traits, 7-step Integrated Pest Management (IPM), and Cambodian variety profiles.",
    sections: [
      {
        code: "ក១",
        titleKm: "សេចក្តីផ្តើម និងសារៈសំខាន់នៃដំណាំស្វាយចន្ទី",
        titleEn: "Introduction & Economic Importance",
        contentKm: "ស្វាយចន្ទីជាដំណាំកសិ-ឧស្សាហកម្មយុទ្ធសាស្ត្ររបស់កម្ពុជា។ ការគ្រប់គ្រងចំការឱ្យទទួលបានទិន្នផលខ្ពស់តម្រូវឱ្យកសិករយល់ដឹងច្បាស់អំពីបច្ចេកទេស និងកាត់បន្ថយការចំណាយមិនចាំបាច់។",
        contentEn: "Cashew is a strategic agro-industrial crop in Cambodia. Achieving high sustainable yields requires strict adherence to agronomic guidelines and cost-effective management.",
      },
      {
        code: "ក២",
        titleKm: "លក្ខណៈជីវសាស្ត្រនៃដំណាំចន្ទី",
        titleEn: "Biological Characteristics of Cashew",
        contentKm: "ដើមចន្ទីត្រូវការដីជ្រៅ ស្រាល ឬដីល្បាយខ្សាច់ដែលមានការបង្ហូរទឹកល្អ (pH 5.5–6.5)។ ចន្ទីមិនចូលចិត្តដីជាំទឹក ឬដីឥដ្ឋស្អិតខ្លាំងឡើយ។ វាត្រូវការរដូវប្រាំងយ៉ាងតិច ៣-៤ ខែ ដើម្បីជំរុញការចេញផ្កា និងទុំផ្លែ។",
        contentEn: "Cashew requires deep, well-draining sandy loam soils (pH 5.5–6.5). It is sensitive to waterlogging and poorly draining clay. A dry season of at least 3-4 months is critical for flower induction and nut maturation.",
        keyPointsKm: [
          "អាកាសធាតុសមស្រប៖ សីតុណ្ហភាព ២៥°C ដល់ ៣៤°C",
          "តម្រូវការពន្លឺថ្ងៃ៖ ត្រូវការកម្ដៅថ្ងៃពេញលេញ មិនអាចដុះក្រោមម្លប់បានទេ",
          "ប្រព័ន្ធឫស៖ ឫសកែវចុះជ្រៅ ជួយទប់ទល់នឹងភាពរាំងស្ងួតបានល្អ"
        ],
        keyPointsEn: [
          "Optimal temperature: 25°C to 34°C",
          "Full sun exposure required; intolerant of shade",
          "Deep taproot system providing high drought tolerance"
        ]
      },
      {
        code: "ក៣",
        titleKm: "វិធានការណ៍ចម្រុះគ្រប់គ្រងកត្តាចង្រៃ (IPM ៧ ជំហាន)",
        titleEn: "7-Step Integrated Pest Management (IPM)",
        contentKm: "ការគ្រប់គ្រងកត្តាចង្រៃតាមបែប IPM ជួយកាត់បន្ថយការចំណាយលើថ្នាំគីមី និងការពារបរិស្ថានតាម ៧ ជំហានសំខាន់ៗ៖",
        contentEn: "Integrated Pest Management (IPM) reduces chemical costs and protects agro-ecosystem health across 7 key steps:",
        keyPointsKm: [
          "១. ពិនិត្យនិងយល់ដឹងអំពីលក្ខណៈជីវសាស្ត្រនៃដំណាំ និងកត្តាចង្រៃដែលអាចកើតមាន",
          "២. កំណត់ជាមុននូវពេលវេលាដែលកត្តាចង្រៃអាចកើតមាន ដើម្បីត្រៀមឧបករណ៍ និងថ្នាំការពារជាមុន",
          "៣. អនុវត្តវិធានការណ៍បង្ការ និងការពារតាមបែបបុរាណ និងវិទ្យាសាស្ត្រ (កាត់តែងមែក សម្អាតចម្ការ)",
          "៤. វិភាគរកមូលហេតុបង្ក (កត្តាអាកាសធាតុ ឬការធ្វេសប្រហែសក្នុងការថែទាំ)",
          "៥. ទប់ស្កាត់ និងកម្ចាត់ដោយប្រើវិធានការណ៍សរីរាង្គ ជីវសាស្ត្រ និងគីមីសាស្ត្រចំគោលដៅ",
          "៦. គ្រប់គ្រងថ្លៃដើមផលិតកម្ម និងប្រើប្រាស់ផលិតផលមានគុណភាពខ្ពស់ តម្លៃសមរម្យ",
          "៧. កត់ត្រាទិន្នន័យដើម្បីតាមដាន វិភាគ និងកែលម្អប្រសិទ្ធភាពក្នុងរដូវកាលក្រោយ"
        ],
        keyPointsEn: [
          "1. Understand plant biology and seasonal pest vulnerabilities",
          "2. Pre-determine pest timelines to prepare machinery and supplies ahead of season",
          "3. Implement preventive cultural controls (canopy pruning, orchard sanitation)",
          "4. Diagnose root causes (weather stress vs maintenance gaps)",
          "5. Apply integrated organic, biological, and targeted chemical treatments",
          "6. Optimize input costs with certified high-efficiency products",
          "7. Log all records to evaluate and continuously improve each season"
        ],
        warningKm: "ជៀសវាងការបាញ់ថ្នាំគីមីផ្ដេសផ្ដាសដោយគ្មានការពិនិត្យ ព្រោះនឹងសម្លាប់សត្វល្អិតផ្តល់ប្រយោជន៍ និងធ្វើឱ្យសត្វល្អិតចង្រៃស៊ាំនឹងថ្នាំ។",
        warningEn: "Never apply chemical pesticides indiscriminately without scouting; it kills beneficial predators and builds pest resistance."
      },
      {
        code: "ក៤",
        titleKm: "ពូជចន្ទីកម្ពុជា និងលក្ខណៈពិសេសពូជ M23",
        titleEn: "Cambodian Varieties & M23 Characteristics",
        contentKm: "ពូជ M23 គឺជាពូជកូនកាត់ស្រាលដែលផ្ដល់ទិន្នផលខ្ពស់បំផុត និងពេញនិយមបំផុតនៅកម្ពុជា។ វាមានគ្រាប់ធំ សំបកស្តើង សាច់ណែន និងចេញផ្កាឆាប់។",
        contentEn: "M23 is an elite early-maturing variety dominating Cambodian commercial farming due to high yields, large nut size, thin shell, and high kernel recovery.",
        keyPointsKm: [
          "ទិន្នផល៖ ១.៥ ដល់ ៣.៥ តោន/ហិកតា នៅពេលពេញវ័យ",
          "ទំហំគ្រាប់៖ ១៤០ ដល់ ១៦០ គ្រាប់/គីឡូក្រាម",
          "អត្រាសាច់ (KOR / Outturn)៖ ៤៨ ដល់ ៥២ lbs/bag",
          "ការចេញផ្កា៖ ចេញផ្កាបាន ២ ទៅ ៣ លើកក្នុងមួយរដូវ ចន្លោះខែវិច្ឆិកា ដល់ខែមករា"
        ],
        keyPointsEn: [
          "Yield: 1.5 to 3.5 tons/ha at full maturity",
          "Nut count: 140 to 160 nuts/kg",
          "Kernel Outturn Ratio (KOR): 48 to 52 lbs/bag",
          "Flowering: Flushes 2 to 3 flowering rounds from November to January"
        ]
      }
    ]
  },
  {
    id: "chapter-kha-nutrients-hormones",
    code: "ខ",
    titleKm: "មុខងារនៃសារធាតុចិញ្ចឹម អ័រម៉ូន និងអាហារថាមពល",
    titleEn: "Plant Nutrition, Hormones & Foliar Energy",
    icon: "🧪",
    badgeKm: "ជីវជាតិ & អ័រម៉ូន",
    badgeEn: "Nutrition",
    summaryKm: "តួនាទីរបស់ N-P-K សារធាតុបន្ទាប់បន្សំ មីក្រូសារធាតុ អ័រម៉ូនលូតលាស់ (Auxin, Cytokinin, Gibberellin) និងជីបំប៉នស្លឹក។",
    summaryEn: "Roles of N-P-K, secondary nutrients, micronutrients (Boron, Zinc), growth hormones, and foliar biostimulants.",
    sections: [
      {
        code: "ខ១",
        titleKm: "មុខងារនៃសារធាតុចិញ្ចឹមចម្បង និងមីក្រូសារធាតុ",
        titleEn: "Primary Macro & Micronutrients Role",
        contentKm: "ដំណាំចន្ទីត្រូវការសារធាតុចិញ្ចឹមតាមដំណាក់កាលនីមួយៗនៃការលូតលាស់៖",
        contentEn: "Cashew requires specific nutrient balances at each distinct growth phase:",
        keyPointsKm: [
          "អាសូត (N)៖ ជំនួយដល់ការលូតលាស់ស្លឹក មែក និងត្រួយថ្មី (សំខាន់ក្នុងរដូវភ្លៀង)",
          "ផូស្វ័រ (P)៖ ជំនួយការលូតលាស់ឫស និងជំរុញការកកើតត្រួយផ្កា",
          "ប៉ូតាស្យូម (K)៖ ជំនួយការចរន្តទឹក ភាពធន់នឹងរាំងស្ងួត ទំហំគ្រាប់ និងទម្ងន់គ្រាប់",
          "កាល់ស្យូម និងបូរ៉ូន (Ca + B)៖ ចាំបាច់បំផុតពេលចេញផ្កា និងក្តឹប ការពារការជ្រុះផ្កា និងក្តឹបខ្មៅ",
          "ស័ង្កសី (Zn)៖ ជួយឱ្យត្រួយលូតលាស់ស្មើល្អ ស្លឹកមិនរួញ"
        ],
        keyPointsEn: [
          "Nitrogen (N): Drives vegetative leaf and canopy growth (crucial in early rainy season)",
          "Phosphorus (P): Stimulates root elongation and floral bud differentiation",
          "Potassium (K): Regulates stomata, drought tolerance, nut fill and density",
          "Calcium & Boron (Ca + B): Critical during flowering and fruit set to stop nutlet black drop",
          "Zinc (Zn): Prevents shoot rosetting and leaf curling"
        ]
      },
      {
        code: "ខ២",
        titleKm: "មុខងាររបស់អ័រម៉ូនរុក្ខជាតិ (Phytohormones)",
        titleEn: "Plant Growth Hormones",
        contentKm: "អ័រម៉ូនរុក្ខជាតិដើរតួនាទីជាអ្នកបញ្ជាការបញ្ចេញត្រួយ ផ្កា និងផ្លែ៖",
        contentEn: "Phytohormones regulate flushing, floral initiation, and fruit retention:",
        keyPointsKm: [
          "អុកស៊ីន (Auxin)៖ ជំរុញការលូតលាស់ឫស និងការលូតកម្ពស់",
          "ស៊ីតូគីនីន (Cytokinin)៖ ជំរុញការបែកមែកខ្នែង និងការបង្កើតភ្នែកផ្កា",
          "ហ្ស៊ីបបេរ៉េលីន (Gibberellin)៖ ពន្លឿនការលូតលាស់កោសិកា តែបើលើសអាចរារាំងការចេញផ្កា"
        ],
        keyPointsEn: [
          "Auxin: Drives apical dominance and deep root extension",
          "Cytokinin: Triggers lateral bud bursting and floral branch formation",
          "Gibberellin: Controls cell elongation; excessive levels suppress floral initiation"
        ]
      },
      {
        code: "ខ៣",
        titleKm: "ការប្រើប្រាស់អាហារថាមពល និងសារធាតុបំប៉ន",
        titleEn: "Foliar Energy & Biostimulants",
        contentKm: "ការបាញ់ថ្នាំបំប៉នថាមពល (Seaweed extract, Amino acids, Sugar alcohol) ជួយឱ្យដើមចន្ទីឆាប់ឆ្លងផុតពីស្ថានភាពស្រ្តេស (កម្ដៅខ្លាំង គ្រោះរាំងស្ងួត ឬភ្លៀងកក់ខែ) និងជួយឱ្យផ្កាចន្ទីកាន់ផ្លែបានល្អ។",
        contentEn: "Foliar applications of amino acids, seaweed extract, and polyols help trees overcome environmental shock (heat spikes, unseasonal rain, drought) and enhance fruit set.",
      }
    ]
  },
  {
    id: "chapter-ko-grafting",
    code: "គ",
    titleKm: "បច្ចេកទេសផ្សាំដោយតត្រួយកូនចន្ទី",
    titleEn: "Cashew Shoot Grafting Techniques",
    icon: "✂️",
    badgeKm: "បច្ចេកទេសផ្សាំ",
    badgeEn: "Grafting",
    summaryKm: "ការជ្រើសរើសពូជមេ M23 ការរៀបចំគល់ផ្សាំ ការកាត់តត្រួយ ការរុំប្លាស្ទិក និងការថែទាំកូនផ្សាំឱ្យរស់ ១០០%។",
    summaryEn: "Scion selection from elite M23 mother trees, rootstock prep, wedge grafting, plastic wrapping, and nursery shade management.",
    sections: [
      {
        code: "គ១",
        titleKm: "មូលហេតុសំខាន់ៗដែលត្រូវដាំកូនចន្ទីផ្សាំ",
        titleEn: "Why Plant Grafted Seedlings Over Direct Seeds",
        contentKm: "ការដាំចន្ទីពីគ្រាប់ផ្ទាល់ងាយនឹងបំប្លែងពូជ (ទិន្នផលទាប គ្រាប់តូច ផ្លែយឺត)។ កូនចន្ទីផ្សាំផ្តល់គុណសម្បត្តិលើសលប់៖",
        contentEn: "Cashew is cross-pollinated; growing from seed causes genetic segregation, low yield, and late bearing. Grafted seedlings guarantee superiority:",
        keyPointsKm: [
          "រក្សាគុណសម្បត្តិពូជមេ M23 បាន ១០០%",
          "ឆាប់បានផល៖ ចាប់ផ្តើមផ្ដល់ផ្លែនៅអាយុត្រឹម ១៨ ដល់ ២៤ ខែ",
          "កម្ពស់ដើមទាប ងាយស្រួលប្រមូលផល និងបាញ់ថ្នាំការពារសត្វល្អិត",
          "ទិន្នផល និងទំហំគ្រាប់មានឯកសណ្ឋានខ្ពស់"
        ],
        keyPointsEn: [
          "100% genetic preservation of elite M23 mother traits",
          "Early bearing: First crop at 18 to 24 months after field transplant",
          "Compact canopy height for easy pesticide spraying and harvesting",
          "Uniform nut size, shell hardness, and kernel recovery"
        ]
      },
      {
        code: "គ២",
        titleKm: "បច្ចេកទេសផ្សាំតត្រួយ (Wedge Grafting)",
        titleEn: "Step-by-Step Wedge Grafting Procedure",
        contentKm: "ជ្រើសរើសគល់ផ្សាំអាយុ ៦០-៩០ ថ្ងៃ ដែលមានអង្កត់ផ្ចិតប៉ុនខ្មៅដៃ។ កាត់ត្រួយពូជ M23 ពីមែកដែលទើបតែទុំស្លឹក មានភ្នែកត្រួយប៉ោងល្អ។",
        contentEn: "Select healthy 60-90 day rootstocks pencil-thick. Harvest scions from mature sunlit M23 shoots with plump terminal buds.",
        keyPointsKm: [
          "កាត់គល់ផ្សាំកម្ពស់ ១៥-២០ ស.ម ពីមាត់ថង់ រួចវះកណ្តាលជម្រៅ ២.៥-៣ ស.ម",
          "ចិតត្រួយពូជជារាងក្រូចឆ្មារ (V-shape) ប្រវែងស្មើនឹងមុខវះគល់ផ្សាំ",
          "ស៊កត្រួយចូលគល់ផ្សាំឱ្យស្រទាប់សំបកប៉ះគ្នាយ៉ាងហោចម្ខាង",
          "រុំខ្សែប្លាស្ទិកពីក្រោមឡើងលើឱ្យតឹងណែន ការពារកុំឱ្យទឹកជ្រាបចូល",
          "គ្របថង់ប្លាស្ទិកតូចការពារការបាត់បង់សំណើម រយៈពេល ២០-២៥ ថ្ងៃ"
        ],
        keyPointsEn: [
          "Behead rootstock 15-20cm above soil, split center 2.5-3cm deep",
          "Carve scion base into clean, even wedge matching rootstock cleft",
          "Insert scion aligning cambium layers on at least one side",
          "Wrap upward firmly with parafilm/grafting tape to seal moisture",
          "Cover scion with mini plastic cap for 20-25 days until bud burst"
        ]
      }
    ]
  },
  {
    id: "chapter-kho-planting-pruning-fertilizer",
    code: "ឃ",
    titleKm: "បច្ចេកទេសដាំដុះ ថែទាំ កាត់តែងមែក និងដាក់ជី",
    titleEn: "Planting, Canopy Pruning & Soil Fertilization",
    icon: "🚜",
    badgeKm: "ដាំ & ដាក់ជី",
    badgeEn: "Care & Soil",
    summaryKm: "ការរៀបចំរណ្តៅដាំដុះ គម្លាតជួរ ដំណាំចន្លោះរង រូបមន្តជីតាមអាយុដើម (ឆ្នាំទី១ ដល់ ៨ឆ្នាំឡើង) និងការកាត់តែងមែក។",
    summaryEn: "Spacing layouts, planting hole preparation, intercropping, age-based NPK programs (Year 1 to Year 8+), and canopy thinning.",
    sections: [
      {
        code: "ឃ១",
        titleKm: "ការដាំដុះដំបូង និងការរៀបចំរណ្តៅ",
        titleEn: "Initial Planting & Spacing Standards",
        contentKm: "ដាំនៅដើមរដូវវស្សា (ខែឧសភា ដល់ មិថុនា) នៅពេលដីមានសំណើមគ្រប់គ្រាន់។ គម្លាតដាំសមស្របសម្រាប់ M23 គឺ ៧ម x ៧ម (២០៤ ដើម/ហិកតា) ឬ ៨ម x ៨ម (១៥៦ ដើម/ហិកតា)។",
        contentEn: "Plant at rainy season onset (May-June) when soil moisture is consistent. Recommended spacing for M23 is 7m x 7m (204 trees/ha) or 8m x 8m (156 trees/ha).",
        keyPointsKm: [
          "ទំហំរណ្តៅ៖ ៥០ស.ម x ៥០ស.ម x ជម្រៅ ៥០ស.ម",
          "ទ្រាប់បាតរណ្តៅ៖ ជីកំប៉ុស្ត ឬលាមកសត្វស្ងួត ៥-១០ គក + ផូស្វាតធម្មជាតិ ១៥០-២០០ ក្រាម + ដីលើ",
          "ហាមដាច់ខាត៖ កុំកប់កូនចន្ទីជ្រៅហួសកម្រិតករសំបកដើមកូនផ្សាំដើម"
        ],
        keyPointsEn: [
          "Hole dimensions: 50cm x 50cm x 50cm depth",
          "Basal mix: 5-10kg mature compost + 150-200g rock phosphate + topsoil",
          "Never bury the graft union collar below ground level"
        ]
      },
      {
        code: "ឃ២",
        titleKm: "ដំណាំចន្លោះរង (Intercropping)",
        titleEn: "Intercropping Guidelines",
        contentKm: "ក្នុងរយៈពេល ១-៣ ឆ្នាំដំបូង ដើមចន្ទីនៅតូច អាចដាំដំណាំចន្លោះរងដូចជាសណ្តែកបាយ សណ្តែកដី ដំឡូងជ្វា ឬពោត ដើម្បីទាញចំណូលបន្ថែម និងទប់ស្កាត់ស្មៅ។ មិនត្រូវដាំដំឡូងមី ឬដំណាំដែលបាំងពន្លឺក្បែរគល់ចន្ទីឡើយ។",
        contentEn: "During Years 1-3 while tree canopies are small, intercrop with mungbeans, peanuts, sweet potato, or maize for cash flow and weed suppression. Avoid cassava or tall shading crops near trees.",
      },
      {
        code: "ឃ៣",
        titleKm: "រូបមន្ត និងតារាងដាក់ជីតាមអាយុដើម",
        titleEn: "Fertilizer Schedule by Tree Age",
        contentKm: "ការដាក់ជីត្រូវបែងចែកជា ២ លើកក្នុងមួយឆ្នាំ (លើកទី១ ដើមរដូវវស្សា ខែ៥-៦ និងលើកទី២ ចុងរដូវវស្សា ខែ៧-៨)៖",
        contentEn: "Soil fertilizer must be split into 2 primary applications per year (1st in early wet season May-June, 2nd in late wet season July-August):",
        keyPointsKm: [
          "ឆ្នាំទី១ (ក្រោយដាំ)៖ លើកទី១ NPK 20-20-15 ឬ 15-15-15 ចំនួន ១០០-១៥០ ក្រាម/ដើម។ លើកទី២ ដាក់ ១៥០-២០០ ក្រាម/ដើម។",
          "ឆ្នាំទី២ ដល់ ទី៣៖ លើកទី១ NPK 20-10-10 ឬ 16-16-8 (៣០០-៥០០ ក្រាម)។ លើកទី២ NPK 15-15-15 + ជីប៉ូតាស្យូម (៥០០-៨០០ ក្រាម)។",
          "ឆ្នាំទី៤ ដល់ ទី៦ (ពេញផល)៖ លើកទី១ រូបមន្ត N=3, P=1, K=1 (១ ដល់ ១.៥ គក/ដើម)។ លើកទី២ (ខែ ៧-៨) រូបមន្ត N=1, P=3, K=3 ឬ N=1, P=2, K=2 (១.៥ ដល់ ២ គក/ដើម)។",
          "ឆ្នាំទី៧ ដល់ ៨ឆ្នាំឡើង៖ អាចដាក់ជីរួមតែមួយលើកក្នុងខែ ៧-៨ ដោយប្រើ NPK 20-20-15 (២ ដល់ ៣ គក/ដើម) តាមតម្រូវការជាក់ស្តែង។"
        ],
        keyPointsEn: [
          "Year 1: Round 1 NPK 20-20-15 or 15-15-15 (100-150g/tree); Round 2 (150-200g/tree).",
          "Years 2-3: Round 1 NPK 20-10-10 or 16-16-8 (300-500g); Round 2 NPK 15-15-15 + Potash (500-800g).",
          "Years 4-6 (Full Bearing): Round 1 ratio N=3, P=1, K=1 (1-1.5kg/tree); Round 2 (July-Aug) ratio N=1, P=3, K=3 or N=1, P=2, K=2 (1.5-2kg/tree).",
          "Years 7-8+: Single combined application in July-Aug using NPK 20-20-15 (2-3kg/tree) based on soil test."
        ],
        warningKm: "ហាមដាច់ខាតការដាក់ជីដែលមានជាតិអាសូត (N) ខ្ពស់នៅជុំលើកទី២ (ខែ៧-៨) ព្រោះនឹងធ្វើឱ្យដើមចេញតែស្លឹក មិនព្រមចេញផ្កាក្នុងខែវិច្ឆិកា-ធ្នូឡើយ!",
        warningEn: "STRICT PROHIBITION: Never apply high Nitrogen fertilizers in the 2nd round (July-August); it promotes excessive vegetative foliage and completely inhibits November-December flowering!"
      },
      {
        code: "ឃ៤",
        titleKm: "ការកាត់តែងមែក និងការរក្សាគម្លាតពន្លឺ",
        titleEn: "Pruning & Canopy Sunlight Penetration",
        contentKm: "ត្រូវកាត់តែងមែកភ្លាមៗក្រោយប្រមូលផលរួច (ខែឧសភា ដល់ មិថុនា)៖",
        contentEn: "Perform structural canopy pruning immediately post-harvest (May to June):",
        keyPointsKm: [
          "កាត់មែកស្ងួត មែកមានជំងឺ មែកជាន់គ្នា និងមែកក្នុងប្រហោងកណ្តាលដើម",
          "រក្សាគម្លាតចុងមែករវាងដើមនីមួយៗយ៉ាងតិច ៣ ម៉ែត្រ មិនឱ្យបាំងពន្លឺគ្នា",
          "លាបកំបោរ ឬថ្នាំទង់ដែង (Copper Hydroxide) លើមុខកាត់ធំៗដើម្បីការពារផ្សិត"
        ],
        keyPointsEn: [
          "Remove diseased, dead, overlapping, and interior water-sucker branches",
          "Maintain at least 3 meters clearance between neighboring tree canopies",
          "Seal large pruning cuts with lime paste or copper fungicide to prevent fungal rot"
        ]
      }
    ]
  },
  {
    id: "chapter-ngo-climate-flowering-m23",
    code: "ង",
    titleKm: "គន្លឹះកាត់បន្ថយបម្រែបម្រួលអាកាសធាតុ & ជំរុញផ្កា M23",
    titleEn: "Climate Resilience & M-23 Synchronized Flowering",
    icon: "🌸",
    badgeKm: "បច្ចេកទេសផ្កា M23",
    badgeEn: "M23 Flowering",
    summaryKm: "យុទ្ធសាស្ត្រជំរុញឱ្យ M23 ចេញផ្កាឆាប់និងស្រុះគ្នាចន្លោះខែវិច្ឆិកា ដល់ ២០ ធ្នូ ដើម្បីគេចផុតពីភ្លៀងកក់ខែ និងកាត់បន្ថយចំណាយ។",
    summaryEn: "Proven protocol to trigger synchronized M-23 flowering between November and December 20, escaping unseasonal rainfall and saving costs.",
    sections: [
      {
        code: "ង១",
        titleKm: "ហេតុអ្វីត្រូវជំរុញឱ្យ M23 ចេញផ្កាដើមវិច្ឆិកា ដល់ ២០ ធ្នូ?",
        titleEn: "Why Target November to December 20 Flowering?",
        contentKm: "ផ្កាចន្ទីដែលរីកក្នុងខែមករា-កុម្ភៈ ប្រឈមខ្លាំងនឹងភ្លៀងកក់ខែ អ័ព្ទក្រាស់ សត្វមូសតែ និងកម្តៅហួតហែង។ ការជំរុញផ្កាដើមដៃជួយឱ្យផ្លែក្តឹបរីកធំមុនពេលភ្លៀងកក់ខែមកដល់ ទទួលបានទិន្នផលខ្ពស់ និងលក់បានតម្លៃថ្លៃបំផុតលើទីផ្សារ។",
        contentEn: "Flowers opening in Jan-Feb face severe hazards: unseasonal rain, heavy fog, thrips, tea mosquito bugs, and scorching heat. Early flowering sets fruit before seasonal storms, maximizing yield and earning top early-market prices.",
      },
      {
        code: "ង២",
        titleKm: "លក្ខណៈនៃការចេញត្រួយធម្មជាតិនៃពូជ M-23",
        titleEn: "Natural Flush Behavior of M23",
        contentKm: "M23 មានវដ្តចេញត្រួយ ២ ទៅ ៣ ជុំក្នុងមួយឆ្នាំ។ ត្រួយទី១ ចេញនៅចុងរដូវភ្លៀង (ខែកញ្ញា-តុលា) ហើយត្រួយទី២ នឹងក្លាយជាត្រួយផ្កា (ខែវិច្ឆិកា-ធ្នូ) បើកសិករថែទាំត្រឹមត្រូវតាមបច្ចេកទេស។",
        contentEn: "M23 flushes 2-3 vegetative/reproductive cycles yearly. Flush 1 bursts in late rains (Sept-Oct), which transitions into floral Flush 2 (Nov-Dec) when properly preconditioned.",
      },
      {
        code: "ង៣",
        titleKm: "ជំហានទាំង ៥ ដេញដើមចន្ទីឱ្យចេញផ្កាឆាប់ និងស្រុះគ្នា",
        titleEn: "5-Step Synchronized Flowering Protocol",
        contentKm: "អនុវត្តតាម ៥ ជំហានជាប្រព័ន្ធចាប់ពីខែឧសភា រហូតដល់ខែធ្នូ៖",
        contentEn: "Implement the systematic 5-step protocol from May through December:",
        keyPointsKm: [
          "ជំហាន ១ (ខែ ៥-៦)៖ កាត់តែងមែកស្រឡះ + ដាក់ជីគល់ជុំទី១ NPK (N=3, P=1, K=1)",
          "ជំហាន ២ (ខែ ៧-៨)៖ ដាក់ជីគល់ជុំទី២ រូបមន្តពន្លូតឫស និងស្តុកថាមពល (N=1, P=3, K=3) — ហាមដាក់ N ខ្ពស់!",
          "ជំហាន ៣ (ខែ ៩-១០)៖ ដេញត្រួយទី១ ដោយបាញ់ជីបំប៉នស្លឹកអាសូតខ្ពស់ (NPK 30-10-10 ឬ 20-20-15) + ថ្នាំការពារមូសតែ និងដង្កូវស៊ីត្រួយ",
          "ជំហាន ៤ (ចុងខែ ១០ ដល់ វិច្ឆិកា)៖ បាញ់ថ្នាំបន្ទុំស្លឹក និងទប់ត្រួយ (MKP 0-52-34 ឬ 0-60-20 + Boron) ដើម្បីបង្វែរថាមពលទៅបង្កើតភ្នែកផ្កា",
          "ជំហាន ៥ (ពាក់កណ្តាលវិច្ឆិកា ដល់ ធ្នូ)៖ បាញ់ជំរុញផ្កា និងថែបំប៉នកញ្ចុំផ្កា (10-52-10 ឬ Seaweed extract + Boron + Zinc) ការពារកុំឱ្យផ្កាជ្រុះ"
        ],
        keyPointsEn: [
          "Step 1 (May-Jun): Canopy pruning + Round 1 basal fertilizer (N=3, P=1, K=1)",
          "Step 2 (Jul-Aug): Round 2 basal fertilizer for energy storage (N=1, P=3, K=3) — strictly NO high N",
          "Step 3 (Sep-Oct): Flush 1 stimulus via foliar spray (NPK 30-10-10) + preventative tea mosquito insecticide",
          "Step 4 (Late Oct-Nov): Foliar leaf maturation & flush arrest (MKP 0-52-34 + Boron) to initiate floral bud differentiation",
          "Step 5 (Mid Nov-Dec): Floral bloom stimulation & micronutrient foliar (10-52-10 + Seaweed + B + Zn)"
        ],
        warningKm: "ពេលផ្កាកំពុងរីក ហាមបាញ់ថ្នាំគីមីប្រភេទប្រេង (EC) ឬបាញ់កម្លាំងទឹកខ្លាំងចំកញ្ចុំផ្កា ព្រោះនឹងធ្វើឱ្យរលាកលម្អងផ្កា និងស្វិតក្តឹប!",
        warningEn: "DURING BLOOM: Never spray EC (emulsifiable concentrate) oil-based pesticides or use high-pressure nozzles directly into flower panicles; it burns stigma pollen and causes fruitlet abortion!"
      },
      {
        code: "ង៤",
        titleKm: "មូលហេតុធ្វើឱ្យក្តឹបចន្ទីខ្មៅជ្រុះ និងវិធានការដោះស្រាយ",
        titleEn: "Nutlet Blackening & Dropping: Causes & Cures",
        contentKm: "ក្តឹបចន្ទីខ្មៅរួញហើយជ្រុះបណ្តាលមកពី ៣ កត្តាសំខាន់ៗ៖ កង្វះជាតិបូរ៉ូន-កាល់ស្យូម, សត្វល្អិតមូសតែ និងទ្រីបជញ្ជក់ទងក្តឹប, ឬការឆ្លងជំងឺអង់ត្រាក់ណូសដោយសារសំណើមសន្សើម។",
        contentEn: "Blackened, falling nutlets result from 3 core causes: Boron-Calcium deficiency, sap-sucking by thrips and tea mosquito bugs, or Anthracnose fungal attack promoted by morning dew.",
        keyPointsKm: [
          "ដំណោះស្រាយ ១៖ បាញ់បំប៉ន Calcium-Boron + Amino acid នៅពេលក្តឹបទំហំប៉ុនកូនដៃ",
          "ដំណោះស្រាយ ២៖ បាញ់ថ្នាំការពារជំងឺអង់ត្រាក់ណូស (Azoxystrobin ឬ Difenoconazole) ក្រោយមានភ្លៀងកក់ខែ ឬអ័ព្ទ",
          "ដំណោះស្រាយ ៣៖ បាញ់ថ្នាំកម្ចាត់មូសតែ និងទ្រីបនៅពេលល្ងាចត្រជាក់ (Thiamethoxam ឬ Abamectin)"
        ],
        keyPointsEn: [
          "Cure 1: Spray Calcium-Boron + Amino acids when nutlets reach matchstick to pinky size",
          "Cure 2: Apply systemic fungicides (Azoxystrobin or Difenoconazole) immediately following unseasonal rain or heavy morning dew",
          "Cure 3: Spray insecticides for tea mosquito bug and thrips in cool late afternoons (Thiamethoxam or Abamectin)"
        ]
      }
    ]
  },
  {
    id: "chapter-cha-pests-diseases",
    code: "ច",
    titleKm: "កត្តាចង្រៃ និងវិធានការណ៍ការពារនិងកម្ចាត់",
    titleEn: "Pest & Disease Diagnosis and Control",
    icon: "🐛",
    badgeKm: "ជំងឺ & សត្វល្អិត",
    badgeEn: "Pests & Disease",
    summaryKm: "ការការពារពីភ្លៀងកក់ខែ អ័ព្ទ សន្សើម មូសតែ (Helopeltis) ដង្កូវស៊ីផ្កា ទ្រីប ចៃស សត្វគោម៉ូ និងដង្កូវដួងចោះដើម។",
    summaryEn: "Management of unseasonal rain, heavy dew, tea mosquito bug, flower-eating caterpillars, thrips, mealybugs, and stem borers.",
    sections: [
      {
        code: "ច១",
        titleKm: "វិធានការទប់ទល់នឹងភ្លៀងកក់ខែ អ័ព្ទ និងសន្សើមខ្លាំង",
        titleEn: "Unseasonal Rain, Fog & Heavy Dew Defense",
        contentKm: "ទឹកភ្លៀងកក់ខែ និងសន្សើមព្រឹកមានជាតិអាស៊ីត និងសំណើមខ្ពស់ ដែលជាប្រភពចម្បងបង្កឱ្យផ្កាស្អុយខ្មៅ និងរលាកក្តឹប។",
        contentEn: "Unseasonal showers and morning dew carry atmospheric acidity and excessive humidity, creating ideal conditions for blossom blight and nutlet rot.",
        keyPointsKm: [
          "ក្រោយភ្លៀងរាំងភ្លាម ឬពេលព្រឹកក្រោយចុះអ័ព្ទក្រាស់ ត្រូវបាញ់ទឹកស្អាតលាងលម្អងផ្កា (បើអាច)",
          "បាញ់ថ្នាំការពារផ្សិតភ្លាមៗ (Metalaxyl + Mancozeb ឬ Copper Hydroxide) ក្នុងរង្វង់ ២៤ ម៉ោង",
          "លាយថ្នាំជម្រាបស្អិត (Spreader/Sticker) ដើម្បីការពារកុំឱ្យទឹកភ្លៀងលាងថ្នាំចេញ"
        ],
        keyPointsEn: [
          "Wash blossom panicles with clean water if feasible after acid fog",
          "Apply preventative fungicide (Metalaxyl + Mancozeb or Copper) within 24 hours",
          "Incorporate agricultural silicone/sticker adjuvant to prevent wash-off"
        ]
      },
      {
        code: "ច២",
        titleKm: "មូសតែ (Tea Mosquito Bug - Helopeltis)",
        titleEn: "Tea Mosquito Bug (Helopeltis antonii)",
        contentKm: "មូសតែជាសត្រូវលេខ ១ របស់ដំណាំចន្ទី។ វាជញ្ជក់យកជ័រពីត្រួយខ្ចី កញ្ចុំផ្កា និងក្តឹប បន្សល់ទុកនូវស្នាមជាំខ្មៅដូចគេដុត ធ្វើឱ្យត្រួយក្រៀម និងផ្កាជ្រុះអស់។",
        contentEn: "The #1 insect pest of cashew. Adults and nymphs pierce tender flushes, flower panicles, and young nuts, injecting toxic saliva causing scorched black lesions, dieback, and total flower abortion.",
        keyPointsKm: [
          "ពេលសកម្មភាពខ្លាំង៖ ពេលព្រឹកព្រលឹម (ម៉ោង ៦-៨) និងពេលរសៀលត្រជាក់ (ម៉ោង ៤-៦)",
          "វិធានការបង្ការ៖ កាត់តែងមែកឱ្យចម្ការស្រឡះ មានខ្យល់ចេញចូល ពន្លឺចាំងដល់គល់",
          "ថ្នាំកម្ចាត់ដែលមានប្រសិទ្ធភាព៖ Lambda-cyhalothrin, Thiamethoxam, ឬ Clothianidin"
        ],
        keyPointsEn: [
          "Peak activity: Early morning (6-8 AM) and cool late afternoon (4-6 PM)",
          "Cultural prevention: Prune interior canopy to maximize sunlight and airflow",
          "Effective active ingredients: Lambda-cyhalothrin, Thiamethoxam, or Clothianidin"
        ]
      },
      {
        code: "ច៣",
        titleKm: "ទ្រីប ឬក្រាភ្លើង (Thrips)",
        titleEn: "Cashew Thrips",
        contentKm: "សត្វទ្រីបមានទំហំតូចល្អិត រស់នៅក្រោមកញ្ចុំផ្កា និងស្លឹកខ្ចី។ វាកោសជញ្ជក់ទងផ្កា និងសំបកផ្លែក្តឹប ធ្វើឱ្យសំបកផ្លែឡើងស្រអាប់ គ្រើមដូចស្បែកគីង្គក់ និងផ្លែមិនធំធាត់។",
        contentEn: "Minute insects colonizing flower panicles and undersides of young leaves. Rasping feeding causes silvery-brown scarring, russeting ('toad skin' texture), and deformed stunted nuts.",
        keyPointsKm: [
          "វិធីពិនិត្យ៖ យកក្រដាសស ឬបាតដៃរងក្រោមកញ្ចុំផ្កា រួចរលាស់តិចៗដើម្បីរាប់ចំនួនទ្រីប",
          "ថ្នាំកម្ចាត់៖ Abamectin, Spinetoram, Imidacloprid, ឬ Emamectin benzoate"
        ],
        keyPointsEn: [
          "Scouting: Tap flower panicles gently over white paper to count dislodged thrips",
          "Effective actives: Abamectin, Spinetoram, Imidacloprid, or Emamectin benzoate"
        ]
      },
      {
        code: "ច៤",
        titleKm: "ដង្កូវដួងចោះដើម និងចោះឫស (Stem & Root Borers)",
        titleEn: "Cashew Stem & Root Borer (Plocaederus ferrugineus)",
        contentKm: "មេដង្កូវពងដាក់តាមគល់ដើម ឬប្រេះសំបក។ កូនដង្កូវចោះស៊ីសាច់ខាងក្នុង និងសំបកខាងក្នុង ធ្វើឱ្យដើមលេចជ័រក្រហមលាយកម្ទេចឈើ ហើយអាចធ្វើឱ្យដើមងាប់ទាំងមូល។",
        contentEn: "Beetles deposit eggs in bark crevices near tree bases. Larvae tunnel into vascular cambium, producing reddish-brown resinous exudate with sawdust frass, leading to progressive tree death.",
        keyPointsKm: [
          "វិធីពិនិត្យ៖ ពិនិត្យគល់ដើមរកមើលជ័រកក និងកម្ទេចឈើធ្លាក់ក្បែរគល់",
          "វិធីសង្គ្រោះ៖ យកកាំបិតឆ្កៀលយកកូនដង្កូវចេញ រួចលាបថ្នាំសម្លាប់សត្វល្អិតខាប់ (Chlorpyrifos-methyl / Fipronil) លាយកំបោរសលើរបួស",
          "ការបង្ការ៖ លាបកំបោរលាយស្ពាន់ធ័រ ឬ Copper oxychloride កម្ពស់ ១ ម៉ែត្រពីដីរៀងរាល់ដើមរដូវ"
        ],
        keyPointsEn: [
          "Symptoms: Look for oozing gum mixed with wood sawdust frass at tree base",
          "Rescue action: Chisel out borer larvae, swab wound with concentrated insecticide (Fipronil) and seal with lime paste",
          "Prevention: Whitewash lower trunk up to 1 meter with lime + copper fungicide annually"
        ]
      }
    ]
  },
  {
    id: "chapter-chha-agrochemicals-selection",
    code: "ឆ",
    titleKm: "បទពិសោធន៍ក្នុងការជ្រើសរើសថ្នាំពុល និងថ្នាំផ្សិត",
    titleEn: "Smart Agrochemical & Fungicide Selection",
    icon: "🔬",
    badgeKm: "ជ្រើសរើសថ្នាំ",
    badgeEn: "Chemicals",
    summaryKm: "ការពិនិត្យធាតុសកម្មជាជាងឈ្មោះពាណិជ្ជកម្ម ពណ៌កម្រិតពុលនៅលើសំបកកញ្ចប់ និងការពិនិត្យលេខបញ្ជីការក្រសួងកសិកម្ម។",
    summaryEn: "Focusing on active ingredients vs brand names, packaging toxicity color bands, and checking official MAFF registration numbers.",
    sections: [
      {
        code: "ឆ១",
        titleKm: "ពិនិត្យធាតុសកម្ម (Active Ingredient) ជាជាងឈ្មោះពាណិជ្ជកម្ម",
        titleEn: "Inspect Active Ingredients, Not Brand Names",
        contentKm: "ថ្នាំពុលរាប់សិបឈ្មោះពាណិជ្ជកម្មនៅលើទីផ្សារអាចមានធាតុសកម្មតែមួយដូចគ្នា។ កសិករដែលទិញតាមតែឈ្មោះពាណិជ្ជកម្មងាយនឹងច្រឡំទិញថ្នាំដដែលៗ ធ្វើឱ្យសត្វល្អិតស៊ាំនឹងថ្នាំ និងខាតបង់ថវិកា។",
        contentEn: "Dozens of different trade brands often contain the identical active molecule. Buying by commercial brand leads to accidental repetitive spraying, rapid pest resistance, and wasted money.",
        keyPointsKm: [
          "មើលអក្សរតូចៗនៅខាងក្រោមឈ្មោះធំ (ឧ. Abamectin 1.8% EC, Imidacloprid 20% SL)",
          "ផ្លាស់ប្តូរក្រុមធាតុសកម្ម (Modes of Action) រៀងរាល់ ២-៣ លើកនៃការបាញ់",
          "ពិនិត្យភាគរយនៃកំហាប់ធាតុសកម្ម (កំហាប់ខ្ពស់ប្រើកម្រិតតិច កំហាប់ទាបប្រើកម្រិតច្រើន)"
        ],
        keyPointsEn: [
          "Always read the small print beneath the brand (e.g. Abamectin 1.8% EC, Imidacloprid 20% SL)",
          "Rotate chemical MoA groups every 2-3 consecutive applications",
          "Compare active concentration percentage to calculate true value per liter"
        ]
      },
      {
        code: "ឆ២",
        titleKm: "ពណ៌វិណនៅលើបបូកកញ្ចប់ថ្នាំបញ្ជាក់ពីកម្រិតពុល",
        titleEn: "Toxicity Color Band Classification",
        contentKm: "បន្ទះពណ៌នៅផ្នែកខាងក្រោមនៃស្លាកសញ្ញាថ្នាំបញ្ជាក់ពីកម្រិតគ្រោះថ្នាក់ចំពោះមនុស្ស និងសត្វ៖",
        contentEn: "The colored band at the label bottom indicates human and mammalian toxicity danger levels:",
        keyPointsKm: [
          "បន្ទះពណ៌ក្រហម (Red Band)៖ ពុលខ្លាំងបំផុត (Extremely Hazardous) — គួរជៀសវាងបើគ្មានឧបករណ៍ការពារពេញលេញ",
          "បន្ទះពណ៌លឿង (Yellow Band)៖ ពុលកម្រិតខ្ពស់ (Highly Hazardous) — ត្រូវមានការប្រុងប្រយ័ត្នខ្ពស់",
          "បន្ទះពណ៌ខៀវ (Blue Band)៖ ពុលកម្រិតមធ្យម (Moderately Hazardous) — កម្រិតទូទៅប្រើក្នុងកសិកម្ម",
          "បន្ទះពណ៌បៃតង (Green Band)៖ ពុលតិចតួច/សុវត្ថិភាពខ្ពស់ (Slightly Hazardous) — សមស្រប និងសុវត្ថិភាពបំផុត"
        ],
        keyPointsEn: [
          "Red Band: Extremely Toxic / Class I — avoid unless equipped with full hazmat PPE",
          "Yellow Band: Highly Toxic / Class II — requires strict protective caution",
          "Blue Band: Moderately Toxic / Class III — standard commercial agricultural use",
          "Green Band: Low Toxicity / Class IV — safest for handlers and beneficial orchard ecology"
        ]
      },
      {
        code: "ឆ៣",
        titleKm: "ការពិនិត្យកាលបរិច្ឆេទ និងលេខបញ្ជីការក្រសួងកសិកម្ម",
        titleEn: "Expiration & MAFF Registration Verification",
        contentKm: "ថ្នាំពុលគីមីមានអាយុកាលប្រើប្រាស់ជាមធ្យម ២ ឆ្នាំគិតចាប់ពីថ្ងៃផលិត។ ថ្នាំហួសកាលបរិច្ឆេទនឹងបាត់បង់ប្រសិទ្ធភាព ឬប្រែជាសារធាតុដែលធ្វើឱ្យរលាកស្លឹកនិងផ្កាចន្ទី។ ត្រូវទិញតែថ្នាំដែលមានលេខបញ្ជីការផ្លូវការពីក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ (MAFF)។",
        contentEn: "Agricultural chemicals typically have a 2-year shelf life from production. Expired chemicals lose potency or degrade into phytotoxic compounds that burn cashew flowers. Only purchase products bearing official MAFF registration numbers.",
      }
    ]
  },
  {
    id: "chapter-cho-spraying-techniques-safety",
    code: "ជ",
    titleKm: "បទពិសោធន៍ក្នុងការបាញ់ថ្នាំ និងសុវត្ថិភាព",
    titleEn: "Spraying Mechanics, Compatibility & Safety",
    icon: "🦺",
    badgeKm: "បច្ចេកទេសបាញ់",
    badgeEn: "Spraying",
    summaryKm: "ទម្រង់ថ្នាំ (WP, EC, SC, WG) ថ្នាំណាអាចបាញ់លើផ្ការីក វិធានការលាយថ្នាំផ្សិតជាមួយថ្នាំពុល និងការការពារខ្លួន។",
    summaryEn: "Formulations (WP, EC, SC, WG), flower-safe options during bloom, tank mixing rules, and operator safety gear.",
    sections: [
      {
        code: "ជ១",
        titleKm: "ទម្រង់ថ្នាំ និងសុវត្ថិភាពចំពោះផ្ការីក (WP, EC, SC, WG)",
        titleEn: "Formulations & Flower Safety During Bloom",
        contentKm: "ការជ្រើសរើសទម្រង់ថ្នាំត្រឹមត្រូវជួយការពារកុំឱ្យរលាកលម្អងផ្កា និងខូចក្តឹប៖",
        contentEn: "Choosing the correct formulation protects sensitive floral organs and stigma pollination:",
        keyPointsKm: [
          "ទម្រង់ម្សៅ (WP / SP) និងគ្រាប់រលាយ (WG / WDG)៖ មានសុវត្ថិភាពខ្ពស់ចំពោះផ្ការីក មិនបណ្តាលឱ្យរលាកកម្ដៅ",
          "ទម្រង់ទឹកទឹកដោះ (SC / FS)៖ រលាយស្មើល្អ សុវត្ថិភាពសមរម្យចំពោះផ្កា",
          "ទម្រង់ទឹកប្រេង (EC)៖ គ្រោះថ្នាក់បំផុតចំពោះផ្ការីក ព្រោះសារធាតុរំលាយប្រេងអាចដុតរលាកលម្អងផ្កា និងទងក្តឹប! ហាមបាញ់ពេលផ្ការីកពេញលេញ"
        ],
        keyPointsEn: [
          "Wettable Powders (WP/SP) & Water Dispersible Granules (WG/WDG): Highly safe on open flowers; zero oil scorch",
          "Suspension Concentrates (SC/FS): Even dispersion; flower-safe at recommended rates",
          "Emulsifiable Concentrates (EC): High phytotoxicity hazard on bloom! Petroleum solvents burn pollen and abort stigma. Never spray EC formulations during peak bloom."
        ],
        warningKm: "ក្នុងអំឡុងពេលផ្ការីក ៨០-១០០% ត្រូវជ្រើសរើសតែទម្រង់ WP, WG ឬ SC ប៉ុណ្ណោះ។ ជៀសវាងទម្រង់ EC ដាច់ខាត!",
        warningEn: "During 80-100% bloom, exclusively choose WP, WG, or SC formulations. Avoid EC formulations completely!"
      },
      {
        code: "ជ២",
        titleKm: "តើអាចលាយថ្នាំផ្សិតជាមួយថ្នាំសម្លាប់សត្វល្អិតបានទេ?",
        titleEn: "Tank Mixing Rules: Fungicides + Insecticides",
        contentKm: "អាចលាយចូលគ្នាបាន ដើម្បីកាត់បន្ថយកម្លាំងពលកម្ម ប៉ុន្តែត្រូវអនុវត្តតាមលំដាប់លំដោយ និងគោលការណ៍តឹងរ៉ឹង៖",
        contentEn: "Tank mixing reduces field labor, but strict dissolution order and chemical compatibility rules must be respected:",
        keyPointsKm: [
          "លំដាប់លាយក្នុងធុងទឹក (WALES Rule)៖ ទឹកពាក់កណ្តាលធុង -> ថ្នាំម្សៅ (WP/WG) កូរឱ្យរលាយអស់សិន -> ថ្នាំទឹកខាប់ (SC) -> ថ្នាំទឹក (SL/EC) -> ជីបំប៉នស្លឹក -> សារធាតុជម្រាបស្អិត -> ចាក់ទឹកបង្គ្រប់",
          "ហាមលាយថ្នាំទង់ដែង (Copper) ជាមួយថ្នាំដែលមានជាតិអាស៊ីតខ្លាំង ឬសារធាតុ Phosphite",
          "ប្រសិនបើលាយបញ្ចូលគ្នាហើយកើតមានកំណក កកដុំ ឬឡើងកម្ដៅក្នុងធុង ហាមយកទៅបាញ់ដាច់ខាត!"
        ],
        keyPointsEn: [
          "Mixing order (WALES rule): Half fill tank with water -> Dissolve powders (WP/WG) completely -> Add suspensions (SC) -> Add solutions/EC -> Add foliar nutrients -> Add adjuvant/sticker -> Top up water",
          "Never mix Copper fungicides with strong acidic solutions or phosphite compounds",
          "Discard immediately if tank mix precipitates, curdles, forms sludge, or generates heat"
        ]
      },
      {
        code: "ជ៣",
        titleKm: "ពេលវេលាបាញ់ថ្នាំ និងសុវត្ថិភាពអ្នកបាញ់",
        titleEn: "Spraying Timing & Handler Protection",
        contentKm: "ពេលវេលាសមស្របបំផុតគឺពេលព្រឹកព្រលឹម (ម៉ោង ៦:០០ ដល់ ៩:០០ ព្រឹក) ឬពេលរសៀលត្រជាក់ (ម៉ោង ៣:៣០ ដល់ ៦:០០ ល្ងាច)។ ហាមបាញ់ពេលថ្ងៃត្រង់ក្តៅខ្លាំង ឬពេលមានខ្យល់បោកបក់ខ្លាំង។ អ្នកបាញ់ត្រូវពាក់ម៉ាស់ វ៉ែនតា ស្រោមដៃ និងខោអាវដៃវែងជានិច្ច។",
        contentEn: "Best spraying window is early morning (6:00-9:00 AM) or cool late afternoon (3:30-6:00 PM). Avoid midday heat or gusty winds. Operators must wear respirators, goggles, rubber gloves, and long sleeves.",
      }
    ]
  },
  {
    id: "chapter-chho-harvest-drying-storage",
    code: "ឈ",
    titleKm: "ការប្រមូលផល និងស្តុកទុកគ្រាប់ស្វាយចន្ទី",
    titleEn: "Harvesting, Sun-Drying & Warehouse Storage",
    icon: "🧺",
    badgeKm: "ប្រមូលផល & ស្តុក",
    badgeEn: "Harvest",
    summaryKm: "ពេលវេលាប្រមូលផលត្រឹមត្រូវ ការបំបែកសាច់ផ្លែ វិធីហាលគ្រាប់ឱ្យស្ងួតតាមស្តង់ដារសំណើម ៨-១០% និងការច្រកការ៉ុងប៉ាវទុកលក់។",
    summaryEn: "Optimal harvesting timing, apple detaching, solar drying to standard 8-10% moisture, and breathable burlap bag warehouse storage.",
    sections: [
      {
        code: "ឈ១",
        titleKm: "ពេលវេលា និងវិធីប្រមូលផលគ្រាប់ចន្ទី",
        titleEn: "Harvest Timing & Apple Separation",
        contentKm: "ត្រូវរើសគ្រាប់ចន្ទីដែលទុំពេញលេញ ហើយជ្រុះធ្លាក់មកលើដីដោយធម្មជាតិ។ ហាមបេះផ្លែខ្ចីពីលើដើមឡើយ ព្រោះសាច់គ្រាប់ខាងក្នុងមិនទាន់ពេញទំហឹង ធ្វើឱ្យធ្លាក់អត្រាសាច់ (KOR) និងលក់បានតម្លៃថោក។",
        contentEn: "Collect nuts only when fully ripe and naturally fallen to the ground. Never pluck immature nuts from trees; kernels lack density, crashing your Outturn (KOR) and selling price.",
        keyPointsKm: [
          "រើសគ្រាប់ជារៀងរាល់ ១-២ ថ្ងៃម្តង កុំទុកឱ្យចោលក្រោមដើមយូរក្នុងរដូវសន្សើម",
          "បំបែកសាច់ផ្លែ (Apple) ចេញពីគ្រាប់ភ្លាមៗដោយបង្វិលថ្នមៗ មិនត្រូវឱ្យសាច់ផ្លែនៅជាប់គ្រាប់ឡើយ",
          "លាងសម្អាតកម្ទេចដី ឬជ័រដែលជាប់គ្រាប់ឱ្យស្អាតមុនពេលហាល"
        ],
        keyPointsEn: [
          "Gather fallen nuts every 1-2 days; never leave on moist ground",
          "Twist off cashew apples immediately; remove all adhering pulp from nut base",
          "Clean off clinging soil or fruit residue before sun-drying"
        ]
      },
      {
        code: "ឈ២",
        titleKm: "របៀបហាលគ្រាប់ស្ងួត និងស្តង់ដារសំណើម (Moisture Standard)",
        titleEn: "Sun-Drying Guidelines & Moisture Standards",
        contentKm: "ការហាលគ្រាប់ចន្ទីឱ្យស្ងួតត្រឹមត្រូវគឺជាកត្តាកំណត់តម្លៃលក់ខ្ពស់បំផុត៖",
        contentEn: "Proper solar drying dictates the highest raw cashew nut (RCN) market value:",
        keyPointsKm: [
          "ហាលនៅលើតង់ប្លាស្ទិកស្អាត ឬទីលានស៊ីម៉ងត៍ស្អាត កម្រាស់គ្រាប់មិនឱ្យលើសពី ៥-៨ ស.ម",
          "ត្រូវកៅកាយត្រឡប់គ្រាប់រៀងរាល់ ២ ម៉ោងម្តង ដើម្បីឱ្យគ្រាប់ស្ងួតស្មើល្អ",
          "ហាលកម្តៅថ្ងៃខ្លាំងរយៈពេល ២ ទៅ ៣ ថ្ងៃពេញ រហូតដល់កម្រិតសំណើមធ្លាក់ចុះមកនៅត្រឹម ៨% ដល់ ១០%",
          "វិធីពិនិត្យងាយៗ៖ យកគ្រាប់ ២-៣ មកក្រឡុកក្នុងដៃ បើស្តាប់ឮសូរគ្រាប់សាច់រង្គោះគោះនឹងសំបក 'ក្រោកៗ' បញ្ជាក់ថាគ្រាប់ស្ងួតល្អហើយ"
        ],
        keyPointsEn: [
          "Spread on clean tarpaulins or concrete drying floors at 5-8cm depth",
          "Rake and turn nuts every 2 hours for uniform drying",
          "Sun-dry for 2 to 3 full sunny days until moisture drops to 8%-10%",
          "Field test: Shake a handful of nuts near your ear; an audible dry rattle confirms optimal moisture readiness"
        ],
        warningKm: "ហាមច្រកការ៉ុងទុកទាំងគ្រាប់នៅសើម ព្រោះនឹងបណ្តាលឱ្យកើតផ្សិតខ្មៅ ឡើងកម្តៅរលួយសាច់គ្រាប់ និងធ្លាក់គុណភាពទាំងស្រុង!",
        warningEn: "Never bag and store moist nuts; internal heating breeds black Aspergillus mold, ruining kernel grade entirely!"
      },
      {
        code: "ឈ៣",
        titleKm: "ការស្តុកទុកក្នុងឃ្លាំងត្រឹមត្រូវ",
        titleEn: "Warehouse Storage Practices",
        contentKm: "ច្រកគ្រាប់ចន្ទីស្ងួតចូលក្នុងបាវក្រចៅ (Jute bags) ឬបាវប៉ាវដែលខ្យល់ចេញចូលបានល្អ។ ទុកដាក់លើកម្រាលឈើ (Pallets) ឱ្យផុតពីដីយ៉ាងតិច ១៥-២០ ស.ម និងឆ្ងាយពីជញ្ជាំង ៥០ ស.ម នៅក្នុងឃ្លាំងស្ងួត និងមានខ្យល់ចេញចូលល្អ។",
        contentEn: "Pack dried nuts into breathable jute or woven polypropylene bags. Stack atop wooden pallets at least 15-20cm off the floor and 50cm away from walls in a well-ventilated dry warehouse.",
      }
    ]
  }
];

/**
 * Search the cashew handbook across Khmer and English texts
 */
export function searchHandbook(query: string, lang: Language = "km"): HandbookSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: HandbookSection[] = [];

  for (const chapter of CASHEW_HANDBOOK) {
    for (const section of chapter.sections) {
      const matchKm =
        section.titleKm.toLowerCase().includes(q) ||
        section.contentKm.toLowerCase().includes(q) ||
        (section.keyPointsKm && section.keyPointsKm.some((k) => k.toLowerCase().includes(q))) ||
        (section.warningKm && section.warningKm.toLowerCase().includes(q));

      const matchEn =
        section.titleEn.toLowerCase().includes(q) ||
        section.contentEn.toLowerCase().includes(q) ||
        (section.keyPointsEn && section.keyPointsEn.some((k) => k.toLowerCase().includes(q))) ||
        (section.warningEn && section.warningEn.toLowerCase().includes(q));

      if (matchKm || matchEn) {
        results.push(section);
      }
    }
  }

  return results;
}

/**
 * Retrieve handbook chapter by ID
 */
export function getHandbookChapterById(id: string): HandbookChapter | undefined {
  return CASHEW_HANDBOOK.find((c) => c.id === id);
}

/**
 * Return concise agronomy knowledge string to inject into AI system prompt
 */
export function getHandbookAIKnowledgeContext(): string {
  return CASHEW_HANDBOOK.map((ch) => {
    const secSummary = ch.sections
      .map((s) => `[${s.code}] ${s.titleKm} (${s.titleEn}): ${s.contentKm}`)
      .join("\n");
    return `### ${ch.code}. ${ch.titleKm} (${ch.titleEn})\n${secSummary}`;
  }).join("\n\n");
}
