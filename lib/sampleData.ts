
import type { ChatResponse } from '@/types/chat';
import type { DiagnosisResponse } from '@/types/diagnosis';

export type { ChatResponse, DiagnosisResponse };

interface QAPair {
  question_en: string;
  keywords: string[];
  reply_km: string;
  gloss_en: string;
}

const V = "\n\n⚠️ ចំណាំ: ចំនួនដូស — ផ្ទៀងផ្ទាត់ជាមួយអ្នកជំនាញ មុនអនុវត្ត។";
const VE = "\n⚠️ Verify doses with your agronomist before applying.";

const QA_PAIRS: QAPair[] = [

  // ── 1. SITE SELECTION ───────────────────────────────────────────────────
  {
    question_en: "What kind of land is unsuitable for planting M23 cashew?",
    keywords: ["unsuitable","land","site","flood","hardpan","fog","salinity","termite","ដីមិនសម","ដី","ទីតាំង"],
    reply_km: "ដីមិនសមស្របមាន១០សញ្ញា៖ (១)ដីចាស់ខ្សោយជីជាតិ បានធ្វើកសិកម្មយូរ (២)មានស្រទាប់រឹងក្រោមផ្ទៃដី រារាំងឫស (៣)ដីងាយជន់លិច (៤)គ្មានដើមឈើការពារខ្យល់ (៥)មានអ័ព្ទលើសពី៥ថ្ងៃ ឬត្រជាក់លើសពី២០ថ្ងៃ ជាពិសេសពេលចេញផ្កា (៦)សំណើមខ្យល់ក្រោម៤៥%ពេលចេញផ្កា (៧)ខ្យល់ខ្លាំងពេលចេញផ្កា (៨)អំបិលក្នុងដីខ្ពស់បូករួមនឹងគ្រោះរាំង (៩)មានបញ្ហាកណ្តូបក្រោមដី (១០)ទឹកមានជាតិ pH ឬសារធាតុរ៉ែមិនប្រក្រតី។",
    gloss_en: "10 warning signs: (1) old, depleted soil; (2) a hardpan layer blocking roots; (3) flood-prone land; (4) no windbreak trees; (5) fog over 5 days or cold over 20 days, especially at flowering; (6) humidity under 45% during flowering; (7) strong wind during flowering; (8) high soil salinity combined with drought; (9) underground termite/pest problems; (10) abnormal water pH or minerals.",
  },
  {
    question_en: "What causes cashew flowers to fail or drop?",
    keywords: ["flower fail","flower drop","poor flowering","ផ្កាធ្លាក់","ចេញផ្កា","មូលហេតុ","ផ្កា","ហេតុ"],
    reply_km: "៨មូលហេតុ៖ (១)ដើមចន្ទីនៅក្មេងពេក (ចន្ទីអឹម២៣ចេញផ្កាល្អចាប់ពីអាយុប្រហែល៥ឆ្នាំ) (២)អាកាសធាតុមិនស្មើ ត្រូវការរដូវប្រាំង៤ខែ (៣)ការរៀបចំចំណីអាហារមុនចេញផ្កាមិនគ្រប់គ្រាន់ (៤)ខ្យល់ខ្លាំងគ្មានការការពារ (៥)ដាំក្រាស់ពេក ស្រមោលច្រើន (៦)ភ្លៀងខុសរដូវពេលចេញផ្កា (៧)សត្វល្អិត/ជំងឺពេលចេញផ្កា (៨)ខ្វះជីជាតិ N,P,K និងសារធាតុរ៉ែតូច (ដូចជា ប័រ អាចម៍ស័ង្កសី)។",
    gloss_en: "8 causes: (1) tree too young (M23 flowers well from ~age 5); (2) unbalanced weather — needs a 4-month dry season; (3) inadequate nutrition before flowering; (4) strong wind with no windbreak; (5) overcrowded planting/too much shade; (6) unseasonal rain during flowering; (7) pests/disease at flowering; (8) N-P-K or micronutrient (boron, zinc) deficiency.",
  },
  {
    question_en: "What soil and climate conditions does M23 cashew need?",
    keywords: ["pH","soil condition","climate","drainage","EC","temperature","ideal soil","ដីល្អ","អាកាស","ដី","សំណើម"],
    reply_km: "ត្រូវការ pH ដីពី៥.៥ដល់៧ ដីជម្រាបទឹកបានល្អ សំបូរសារធាតុសរីរាង្គ ស៊ូទ្រាំអំបិលក្នុងដីកម្រិត EC ១០-៤០ ស៊ូទ្រាំត្រជាក់ដល់២-៤អង្សា និងអ័ព្ទដល់៣៤ថ្ងៃ។ ត្រូវការរដូវប្រាំងយ៉ាងតិច៤ខែដើម្បីចេញផ្កាបានល្អ។ មិនស៊ូទ្រាំទឹកជន់ជាប់ទេ។" + V,
    gloss_en: "Needs soil pH 5.5–7, good drainage, rich organic matter; tolerates soil salinity EC 10–40, cold down to 2–4°C, and fog up to 34 days. Needs a minimum 4-month dry season for good flowering. Does NOT tolerate standing/waterlogged water." + VE,
  },
  {
    question_en: "How long does an M23 cashew tree live and when does it start bearing fruit?",
    keywords: ["lifespan","how long","years","start bearing","peak production","age","អាយុ","ឲ្យផល","ប៉ុន្មានឆ្នាំ"],
    reply_km: "ដើមចន្ទីអាចរស់បាន៤០-៥០ឆ្នាំ ចាប់ផ្តើមឲ្យផលនៅអាយុ៣-៥ឆ្នាំ ហើយឲ្យផលកំពូលនៅអាយុ១៥-២០ឆ្នាំ។ ដើមអាចខ្ពស់ដល់១០ម៉ែត្រអាស្រ័យលើពូជ។",
    gloss_en: "Trees can live 40–50 years, start bearing at age 3–5, and reach peak production at age 15–20. Trees can grow up to 10m tall depending on variety.",
  },
  {
    question_en: "Why is day 15 to 20 after flowering the most critical window?",
    keywords: ["day 15","day 20","critical","wind damage","40 percent","ថ្ងៃ១៥","ថ្ងៃ២០","ខ្យល់"],
    reply_km: "ថ្ងៃទី១៥ដល់២០គឺជាចំណុចប្រថុយប្រថានបំផុត ព្រោះផ្កាបានបើកពេញនិងងាយរងគ្រោះបំផុត។ ខ្យល់ខ្លាំងក្នុងចន្លោះនេះអាចបំផ្លាញផលទិន្នផលរហូតដល់៤០%នៃ៣ដងចេញផ្កាទាំងអស់។",
    gloss_en: "Day 15–20 is the highest-risk window because flowers are fully open and most vulnerable. Strong wind during this window can damage up to 40% of total flower yield across all 3 flowering flushes.",
  },

  // ── 2. PLANTING ─────────────────────────────────────────────────────────
  {
    question_en: "What month should M23 cashew be planted?",
    keywords: ["plant month","when plant","rainy season","month 5","month 8","ខែដាំ","ដាំ","ភ្លៀង","ពេលណា","ដាំដុះ","ខែ"],
    reply_km: "គួរដាំចាប់ពីខែ៥ដល់ខែ៨ (រដូវភ្លៀង) ព្រោះត្រូវការសំណើមក្នុងដីជ្រៅជាង០.៥ម៉ែត្រ។ បើសំណើមមានតែក្រៅ០.២-០.៣ម៉ែត្រ កូនចន្ទីអាចងាប់ក្នុងរយៈពេល២-៣សប្តាហ៍ដំបូង។",
    gloss_en: "Plant from month 5 to month 8 (rainy season) because roots need moisture below 0.5m depth. If moisture only reaches 0.2–0.3m, the seedling can die within the first 2–3 weeks.",
  },
  {
    question_en: "What spacing should I use for M23 cashew?",
    keywords: ["spacing","distance","7m","8m","trees per hectare","density","ចន្លោះ","គម្លាត","ហិកតា","ចម្ងាយ","ដំណាំ","ដើម"],
    reply_km: "លើដីរាបស្មើ៖ ៧ម x ៧ម (ប្រមាណ១៨០-១៩០ដើម/ហិកតា)។ លើដីមិនស្មើ៖ ៨ម x ៨ម ជាមួយផ្លូវក្រុងគូ — ជាប្រព័ន្ធដាំដុះក្រាស់មុន រួចកាត់បន្ថយបន្តិចម្តងៗ រហូតដល់ចុងក្រោយនៅសល់ប្រហែល៦៤-៧០ដើម/ហិកតា។" + V,
    gloss_en: "On flat land: 7m x 7m (~180–190 trees/ha). On uneven land: 8m x 8m with a double-row path system — this is a progressive-thinning system, dense at first, thinned as canopies close, down to ~64–70 trees/ha eventually." + VE,
  },
  {
    question_en: "Which direction should planting rows face?",
    keywords: ["direction","row","east west","north south","sunlight","ទិស","ជួរ","ខាងកើត"],
    reply_km: "គួរតម្រៀបជួរតាមទិសខាងកើត-លិច មិនមែនខាងជើង-ត្បូងទេ ព្រោះជួយឲ្យពន្លឺថ្ងៃចែកជាមូយស្មើគ្នាដល់ចម្រៀកនិងឫស ជៀសវាងស្រមោលម្ខាងធ្វើឲ្យទិន្នផលមិនស្មើគ្នា។",
    gloss_en: "Rows should face east-west, not north-south — this gives more even sunlight to canopy and roots and avoids one-sided shading that causes uneven yield.",
  },
  {
    question_en: "What size should the planting hole be and how should it be prepared?",
    keywords: ["hole","pit","0.4m","planting hole","NPK","urea","15 days","រណ្ដៅ","ប្រហោង"],
    reply_km: "រណ្តៅទំហំ០.៤ម x ០.៤ម x ០.៤ម។ ត្រូវលាយដីលើជាមួយ NPK ១៥-១៥-១៥ បូក អ៊ុយសែ(N=៤៦%)បន្តិច ហើយជីកទុកមុនដាំប្រហែល១៥ថ្ងៃ ដើម្បីឲ្យដីនិងជីចាប់សម។" + V,
    gloss_en: "Hole size 0.4m x 0.4m x 0.4m. Mix topsoil with NPK 15-15-15 plus a small amount of Urea (N=46%), and dig the hole ~15 days before actual planting so the soil and fertilizer settle." + VE,
  },
  {
    question_en: "After planting how should the seedling be watered and cared for?",
    keywords: ["after planting","water seedling","care","mulch","0.5L","ក្រោយដាំ","ស្រោចទឹក"],
    reply_km: "ដកកូនចន្ទីចេញពីថង់ដោយប្រុងប្រយ័ត្នកុំបំបែកគល់ឫស ដាំកម្រិតដីស្មើគល់ដើម បំពេញដីវិញ ចាក់ជាប់ ស្រោចទឹកភ្លាមប្រហែល០.៥លីត្រ/ដើម ហើយក្រាលចំបើងគ្របគល់ដើម្បីរក្សាសំណើម។",
    gloss_en: "Remove the seedling from the bag carefully (protect the root ball), set the root collar level with the soil surface, backfill, firm the soil, water immediately (~0.5L/tree), and mulch the base to retain moisture.",
  },

  // ── 3. GRAFTING ─────────────────────────────────────────────────────────
  {
    question_en: "Why is grafting preferred over growing from seed?",
    keywords: ["graft","grafting","seed","why","propagation","disease resistant","តបណត់","គ្រាប់","ហេតុអ្វី"],
    reply_km: "ដើមចន្ទីដុះពីគ្រាប់មានលក្ខណៈមិនដូចគ្នា ទិន្នផលនិងគុណភាពខុសៗគ្នា ចំណែកឯដើមតបណត់ជើងរក្សាលក្ខណៈពូជពីដើមមេបានច្បាស់ជាង ចេញផ្កាលឿនជាង (១-២ឆ្នាំក្រោយតបណត់) ហើយប្រើគល់ជើងធន់នឹងជំងឺ។",
    gloss_en: "Seed-grown trees are genetically variable — yield and quality differ tree to tree. Grafted trees reliably preserve the mother tree's traits, flower sooner (within 1–2 years of grafting), and use disease-resistant rootstock.",
  },
  {
    question_en: "When should rootstock and scion preparation for grafting begin?",
    keywords: ["when graft","month graft","rootstock","scion","month 10","month 12","ខែ","គល់ជើង","គ្រៀម"],
    reply_km: "គួរចាប់ផ្តើមរៀបចំចន្លោះខែ១០ដល់ខែ១២ ព្រោះដើមចន្ទីចាប់ផ្តើមចេញផ្កាចាប់ពីខែ៧-៨ ហើយអត្រាជោគជ័យតបណត់ខ្ពស់បំផុតក្នុងចន្លោះនេះ។",
    gloss_en: "Start preparing between month 10 and month 12 — trees begin flowering by month 7–8, and graft take-rate is highest in this window.",
  },
  {
    question_en: "How should I choose a mother tree for taking scions?",
    keywords: ["mother tree","choose","select","high yield","disease free","ដើមមេ","ជ្រើស"],
    reply_km: "ជ្រើសរើសដើមមេដែលឲ្យផលច្រើន គ្មានជំងឺ អាយុយ៉ាងតិច៤-៦ឆ្នាំ (មានឈើគ្រៀមចាស់គ្រប់គ្រាន់)។ អាចចាប់ផ្តើមយកគ្រៀមតាំងពីអាយុ២-៣ឆ្នាំបានផងដែរ បើដើមមានសុខភាពល្អនិងចិញ្ចឹមគ្រប់គ្រាន់។",
    gloss_en: "Choose a known high-yielding, disease-free mother tree at least 4–6 years old (mature enough wood for good scion). Trees as young as 2–3 years can be used if healthy and well-fertilized.",
  },
  {
    question_en: "What are the steps for the wedge-graft technique?",
    keywords: ["graft steps","how to graft","wedge graft","day 10","day 15","ជំហាន","វិធី","ស្នាមពុះ"],
    reply_km: "(១)កាត់គល់ជើងត្រង់រវាងកន្សៃស្លឹកទី១-២ រួចពុះចុះក្រោមប្រហែល១-១.៥ស.ម (២)កាត់គ្រៀមជាទម្រង់ខ្សែឆ្នូតដូចគ្នា (៣)ដាក់គ្រៀមចូលក្នុងស្នាមពុះ រុំតឹងកុំឲ្យខ្យល់ឬទឹកចូល (៤)តបណត់ជាក្រុមៗ ១០ដើម (៥)ល្អបំផុតគួរតបណត់ពេលព្រឹក (៦)ត្រួតពិនិត្យលទ្ធផលនៅថ្ងៃទី១០-១៥ បើគ្រៀមនៅបៃតងស្រស់ គឺជោគជ័យ (៧)ដកគ្របចេញនៅពេលស្នាមតបណត់ភ្ជាប់គ្នាល្អ។" + V,
    gloss_en: "(1) Cut rootstock stem between 1st–2nd leaf node, split down ~1–1.5cm; (2) cut scion into matching wedge; (3) insert scion, wrap tightly; (4) work in batches of ~10; (5) best done in morning; (6) check at day 10–15 — green/fresh scion = success; (7) remove wrap once union has calloused." + VE,
  },
  {
    question_en: "After grafting how should the seedling be cared for in the nursery?",
    keywords: ["nursery","after graft","shade","2.5 months","3 months","field ready","ម្លប់","ថែទាំ"],
    reply_km: "ដាក់ក្នុងម្លប់ប្រហែល២០-៣០ថ្ងៃដំបូង (ស្នាមតបណត់នៅទន់ខ្សោយ) បន្ទាប់មកកាត់បន្ថយម្លប់បន្តិចម្តងចាប់ពីខែទី២។ ស្រោចទឹកទៀងទាត់ (មិនជោគ) ដាក់ជីស្លឹកបន្តិចនៅពេលកូនចន្ទីមានស្លឹកថ្មីច្រើន។ ត្រៀមចុះដីបានប្រហែល២.៥-៣ខែក្រោយតបណត់។",
    gloss_en: "Keep in shade for the first ~20–30 days (graft union still tender), then gradually reduce shade from month 2. Water regularly (not waterlogged), apply light foliar fertilizer once new leaves appear. Ready for field transplant at ~2.5–3 months post-graft.",
  },
  {
    question_en: "What rootstock varieties can M23 scion be grafted onto?",
    keywords: ["rootstock variety","M10","H09","compatible","success rate","70 percent","ពូជ","គល់ជើង","អឹម១០"],
    reply_km: "គ្រៀមអឹម២៣អាចតបណត់លើគល់ជើងអឹម២៣ អឹម១០ ឬ ហាស់០៩ (ចម្ងាយពូជជិតគ្នា ជោគជ័យប្រហែល៧០-៨០%)។ ល្អបំផុតគឺតបណត់លើគល់ជើងអឹម២៣ខ្លួនឯង។",
    gloss_en: "M23 scion can be grafted onto M-23, M-10, or H-09 rootstock (related varieties, ~70–80% success). Best result comes from grafting onto M23 rootstock itself.",
  },

  // ── 4. FERTILIZER ───────────────────────────────────────────────────────
  {
    question_en: "What NPK ratio does an M23 tree age 1 to 4 years need?",
    keywords: ["young tree","fertilizer","NPK","1-4 years","ratio","ដើមក្មេង","ជី NPK","N3P1K1","ជី","ដើម","ក្មេង","NPK"],
    reply_km: "ដើមក្មេង (១-៤ឆ្នាំ) ត្រូវការជីអត្រា N=៣:P=១:K=១ ជាចម្បង (ជួយលូតលាស់ស្លឹកនិងសាខា) ជាមួយការដាក់បន្ថែម N=១:P=១:K=១ ។",
    gloss_en: "Young trees (age 1–4) mainly need NPK ratio N=3:P=1:K=1 (supports leaf/branch growth), with a secondary application of N=1:P=1:K=1.",
  },
  {
    question_en: "What NPK ratio does a mature fruit-bearing M23 tree age 5 plus need?",
    keywords: ["mature tree","5 years","bearing","NPK ratio","phosphorus","potassium","ដើមចាស់","ឲ្យផល","N1P3K3","ជី","NPK","ចាស់","ផ្លែ"],
    reply_km: "ដើមចាស់ (៥ឆ្នាំឡើងទៅ) ត្រូវការជីអត្រា N=១:P=៣:K=៣ (ឬ N=១:P=៣:K=២) ជាចម្បង ព្រោះមានផ្កាផ្លែច្រើនជាងស្លឹក ត្រូវការផូស្វ័រនិងប៉ូតាស្យូមច្រើនជាង។ ជួនកាលនៅត្រូវការការដាក់បន្ថែម N=៣:P=១:K=១ មុនចេញផ្កា។",
    gloss_en: "Mature trees (age 5+) mainly need NPK ratio N=1:P=3:K=3 (or N=1:P=3:K=2) — since they're supporting flowers/fruit more than leaves, they need more phosphorus and potassium. A secondary N=3:P=1:K=1 application is sometimes still used just before flowering.",
  },
  {
    question_en: "How many times a year should a fruit-bearing tree be fertilized?",
    keywords: ["how many times","fertilize per year","3 times","month 5","month 9","ប៉ុន្មានដង","ជី","ដង","ឆ្នាំ","ខែ","ដាក់ជី"],
    reply_km: "ដាក់ជី៣ដងក្នុងមួយឆ្នាំ៖ លើកទី១ខែ៥-៦ (ដើមរដូវភ្លៀង) លើកទី២ខែ៧-៨ (មុនចេញផ្កា) លើកទី៣ខែ៩ (មុនផ្កាចេញ)។ កុំដាក់ជីច្រើនអាសូត (N) ក្រោយផ្កាចេញរួច (ក្រោយខែ១២) ព្រោះនឹងធ្វើឲ្យលូតលាស់ស្លឹកជំនួសការឲ្យផល។",
    gloss_en: "Fertilize 3 times a year: App 1 month 5–6 (early rainy season), App 2 month 7–8 (pre-flowering), App 3 month 9 (right before flowering). Don't apply heavy nitrogen after flowering (after month 12) — it pushes leaf growth instead of fruit set.",
  },
  {
    question_en: "Where around the tree should fertilizer be placed?",
    keywords: ["where fertilizer","drip line","canopy edge","trunk","15cm","ណា","ដាក់ជី","ម្លប់","ជី","ដាក់","ទីតាំង"],
    reply_km: "ដាក់ជីជុំវិញព័ទ្ធសំបកឫស (ក្រោមចុងម្លប់) កុំដាក់ជិតគល់ដើមពេក ព្រោះអាចដុតឫសនិងសំបកឈើ។ អាចជីករណ្តៅរង្វង់ក្រោមម្លប់ ជ្រៅប្រហែល១៥ស.ម ដាក់ជីរួចគ្របដីវិញ ហើយស្រោចទឹកក្នុងរយៈពេល២-៣ម៉ោងឲ្យជីរលាយ។",
    gloss_en: "Apply fertilizer around the drip-line (canopy edge), not close to the trunk — close application can burn roots and bark. A shallow trench (~15cm deep) around the drip line, filled after fertilizing and watered within 2–3 hours, works well.",
  },
  {
    question_en: "How is Thiourea used to support flowering?",
    keywords: ["thiourea","flowering support","dose","0.5g","concentration","ថៃអុរ្យា","ចេញផ្កា","ក្រាម","ជី","ផ្កា","ថ្នាំ"],
    reply_km: "កំហាប់០.៥ក្រាម/លីត្រ បាញ់មុនផ្កាចេញញ៉ុម ជួយឲ្យស្លឹកបៃតងចាស់និងចេញផ្កាស្មើគ្នាជាង។ ១.៥-២ក្រាម/លីត្រនឹងជំរុញការលូតលាស់ស្លឹកជំនួសផ្កា។ ៥ក្រាម/លីត្រធ្វើឲ្យស្លឹកឆេះខូច — ជៀសវាងកំហាប់នេះ។" + V,
    gloss_en: "0.5 g/L sprayed before bud-break matures leaves and promotes more uniform flowering (recommended dose). 1.5–2 g/L pushes leaf growth instead of flowering. 5 g/L causes leaf burn — avoid this concentration." + VE,
  },
  {
    question_en: "What is Potassium Nitrate KNO3 used for?",
    keywords: ["KNO3","potassium nitrate","uniform flowering","ប៉ូតាស្យូម","KNO","ជីផ្កា","ជី","ផ្កា"],
    reply_km: "KNO3 ១៣-០-៤៦ ជួយពង្រឹងស្លឹកនិងជំរុញការចេញផ្កាឲ្យស្មើគ្នា ជាធម្មតាលាយជាមួយថៃអុរ្យា។ កំហាប់តាមស្លាកផលិតផល។",
    gloss_en: "KNO3 13-0-46 helps strengthen leaves and promotes more uniform flowering timing, usually mixed with Thiourea. Follow the product label for exact dosage.",
  },
  {
    question_en: "If flush 1 has set but the tree looks depleted what foliar feed should I spray?",
    keywords: ["flush 1","foliar","depleted","NPK 6-30-30","atonik","resource","ខ្សោយ","ជីស្លឹក","ជី","ស្លឹក","ខ្សោយ"],
    reply_km: "បាញ់ NPK ខ្ពស់ P&K មួយក្នុងចំណោមនេះ កំហាប់៨ក្រាម/លីត្រ៖ NPK ៦-៣០-៣០ ឬ ៨-២៤-២៤ ឬ ៨-៥២-៣៤ ឬ ១០-៦០-១០ បូកជាមួយ Atonik ប្រហែល៣មីលីលីត្រ/លីត្រ។" + V,
    gloss_en: "Spray one of these high-P/K NPK formulas at 8 g/L: NPK 6-30-30, 8-24-24, 8-52-34, or 10-60-10, plus Atonik at ~3 ml/L." + VE,
  },
  {
    question_en: "Why might a flowering support spray not work?",
    keywords: ["spray not working","flowering fail","reason","rain","late","thiourea quality","មិនដំណើរការ","មូលហេតុ","ហេតុ","ជី","ដំណើរ"],
    reply_km: "៤មូលហេតុ៖ (១)បាញ់មិនគ្រប់តំបន់ (២)ចាប់ផ្តើមបាញ់យឺតពេក (៣)ថ្នាំថៃអុរ្យាគុណភាពមិនល្អ (៤)មានភ្លៀងក្នុងឬក្រោយពេលបាញ់ភ្លាមៗ។",
    gloss_en: "4 possible reasons: (1) incomplete spray coverage; (2) started spraying too late; (3) poor-quality Thiourea product; (4) rain during or right after application.",
  },

  // ── 5. FLOWERING PROTECTION ─────────────────────────────────────────────
  {
    question_en: "What should I do if leaves are not hardened before flush 1?",
    keywords: ["leaves not hardened","immature leaf","before flowering","thiourea 1.5","KNO3 4","ស្លឹក","មិនទាន់ចាស់"],
    reply_km: "បាញ់ថៃអុរ្យា ១.៥ក្រាម/លីត្រ ១លីត្រ/ដើម មុនខែ១០ ជួយស្លឹកចាស់លឿន។ បើក្រោយ១០ថ្ងៃស្លឹកនៅមិនចាស់ បាញ់ម្តងទៀតជាមួយថៃអុរ្យា០.៥ក្រាម/លីត្រ+KNO3 ៤ក្រាម/លីត្រ ១លីត្រ/ដើម ប្រហែល១០ថ្ងៃមុនផ្កាចេញ។" + V,
    gloss_en: "Spray Thiourea 1.5 g/L, 1L/tree, before month 10 to help leaves mature faster. If leaves still aren't hardened after 10 days, re-spray with Thiourea 0.5 g/L + KNO3 4 g/L, 1L/tree, ~10 days before flush-1 flowering." + VE,
  },
  {
    question_en: "How do I protect flowers from wind and drying?",
    keywords: ["protect flower","wind","windbreak","drying","young tree","under 5","ការពារ","ផ្កា","ខ្យល់"],
    reply_km: "ត្រូវធានាមានដើមឈើការពារខ្យល់ ជាពិសេសសម្រាប់ដើមក្មេងអាយុក្រោម៥ឆ្នាំដែលមិនទាន់ចាក់ឫសជ្រៅ។ បើសង្ស័យអាកាសធាតុអាក្រក់មកដល់ គួរបាញ់ថ្នាំការពារជាមុនប្រហែល១០ថ្ងៃមុនផ្កាចេញ ដោយប្រើថៃអុរ្យា០.៥ក្រាម/លីត្រ ឬ KNO3 ៤ក្រាម/លីត្រ។",
    gloss_en: "Make sure there's a windbreak, especially for trees under 5 years old that haven't established deep roots. If bad weather is forecast, spray protectively ~10 days before flowering with Thiourea 0.5 g/L or KNO3 4 g/L.",
  },
  {
    question_en: "What precautions when spraying during the flowering period?",
    keywords: ["precaution","spray flowering","EC avoid","SC SL","pollinator","ប្រុងប្រយ័ត្ន","ចេញផ្កា","EC","SC","ថ្នាំ","ប្រយ័ត្ន","ចេញ"],
    reply_km: "មុនចេញផ្កា ជៀសវាងថ្នាំបែប EC (Cypermethrin, Chlorpyrifos) ព្រោះខ្លាំងពេក — ប្រើ SC ឬ SL វិញ។ អាចបាញ់ថ្នាំកូវក្រាំងជាមុនម្តងមុនផ្កាចេញ។ កំឡុងផ្កាកំពុងចេញ (ជាពិសេស១០-១៤ថ្ងៃដំបូង) ជៀសវាងបាញ់ត្រង់ផ្កា។ បើត្រូវបាញ់ ជ្រើសរើសពេលល្ងាចត្រជាក់ កុំបាញ់ពេលសត្វល្អិតជួយបំបែកភាគច្រើន។",
    gloss_en: "Before flowering: avoid EC-formulation products (Cypermethrin, Chlorpyrifos) — use SC or SL instead. One preventive fungicide spray before bud-break is fine. During flower emergence (especially first 10–14 days), avoid spraying directly on flowers. If forced to spray, choose cooler evening hours when pollinators are less active.",
  },
  {
    question_en: "What fungicide can protect flowers from fungal disease?",
    keywords: ["fungicide flower","copper hydroxide","mancozeb","1g","1.5g","ថ្នាំកូវក្រាំង","ផ្កា","ផ្សិត","ជំងឺ","ថ្នាំ"],
    reply_km: "Copper Hydroxide ឬ Mancozeb កំហាប់១-១.៥ក្រាម/លីត្រ បាញ់ពេលកំពុងចេញផ្កា។" + V,
    gloss_en: "Copper Hydroxide or Mancozeb at 1–1.5 g/L, sprayed during flowering." + VE,
  },
  {
    question_en: "How do fog and dew relate to fungal disease risk?",
    keywords: ["fog","dew","fungal","humidity 85","2 mornings","anthracnose","អ័ព្ទ","សន្សើម","ផ្សិត","ជំងឺ","ភ្លៀង"],
    reply_km: "អ័ព្ទ/សន្សើមខ្លាំងជាប់ៗគ្នាច្រើនថ្ងៃ ជាពិសេសនៅសំណើម៨៥%ឡើងទៅ បង្កើនហានិភ័យជំងឺផ្សិត។ បើឃើញអ័ព្ទក្រាស់ជាប់ៗគ្នា២ព្រឹកឡើងទៅ ត្រូវចាត់ចែងបាញ់ថ្នាំកូវក្រាំងបង្ការ។",
    gloss_en: "Heavy fog/dew on consecutive days — especially when humidity reaches 85%+ at the leaf drip-point — raises fungal disease risk. If you see heavy fog on 2+ consecutive mornings, that's the trigger to apply a preventive fungicide spray.",
  },
  {
    question_en: "Which fungicides work against fog and dew fungal disease?",
    keywords: ["fog fungicide","dew disease","copper","hexaconazole","azoxystrobin","metalaxyl","carbendazim","ថ្នាំ","ជំងឺ","អ័ព្ទ"],
    reply_km: "Copper Hydroxide, Hexaconazole, Azoxystrobin, Metalaxyl, Carbendazim, Propineb, Mancozeb, ឬ Zineb។" + V,
    gloss_en: "Copper Hydroxide, Hexaconazole, Azoxystrobin, Metalaxyl, Carbendazim, Propineb, Mancozeb, or Zineb." + VE,
  },
  {
    question_en: "What is the difference between male and hermaphrodite cashew flowers?",
    keywords: ["male flower","hermaphrodite","bisexual","difference","yield","ផ្កាឈ្មោល","ផ្កាល្អ"],
    reply_km: "ផ្កាឈ្មោលមានតែសំណុំភេទឈ្មោល មិនអាចផ្តល់ផលបានទេ។ ផ្កាល្អយាល (hermaphrodite) មានទាំងសំណុំភេទឈ្មោលនិងស្រី អាចផ្តល់ផលបាន។ បើដើមមានផ្កាឈ្មោលច្រើនពេក ទិន្នផលអាចទាបទោះបីជាចេញផ្កាច្រើន។",
    gloss_en: "Male flowers have only male parts and cannot set fruit. Hermaphrodite flowers have both male and female parts and can set fruit. If a tree has too many male flowers, yield can stay low even with heavy flowering.",
  },
  {
    question_en: "What is the risk of combining too many products in one spray?",
    keywords: ["combine","mixing","too many products","hormone","fertilizer mix","លាយ","អរម៉ូន","ប្រថុយ"],
    reply_km: "ការលាយជីនិងអរម៉ូនច្រើនប្រភេទក្នុងពេលតែមួយអាចប្រថុយប្រថាន — កុំបញ្ចូលគ្នាច្រើនពេក។",
    gloss_en: "Combining many fertilizers/hormones at once is risky — avoid over-combining products in a single application.",
  },

  // ── 6. PRUNING ──────────────────────────────────────────────────────────
  {
    question_en: "When should cashew trees be pruned and how often?",
    keywords: ["prune","when prune","how often","after harvest","month 11","month 12","sanitize","កាត់មែក","ស្ទាប","កាត់","ខែ","ពេល","ប្រមូល"],
    reply_km: "កាត់មែក២ដងក្នុងមួយឆ្នាំ ដងសំខាន់បំផុតគឺក្រោយប្រមូលផលរួច (ខែ១១-១២) ដើម្បីលុបចោលមែកងាប់ ជំងឺ ឬដុះកាត់គ្នា ឲ្យដើមមានពេលដុះមែកថ្មីមុនចេញផ្កាជុំក្រោយ។ ប្រើឧបករណ៍ស្អាតមុត ជូតសម្អាតរវាងដើមៗ។",
    gloss_en: "Prune 2x/year, most importantly right after harvest (month 11–12) to remove dead, diseased, or crossing branches, giving the tree time to grow new branches before the next flowering cycle. Use clean, sharp tools and sanitize between trees to avoid spreading disease.",
  },
  {
    question_en: "After pruning how do I protect against stem borer beetles?",
    keywords: ["pruning protect","stem borer after cut","wound seal","cypermethrin after prune","ស្នាមកាត់","ជូងឈើ","កាត់","ការពារ","ស្នាម"],
    reply_km: "បិទបាំងស្នាមកាត់ថ្មីៗដោយប្រេងជ័រ ឬបាញ់ Cypermethrin ២៥% ជុំវិញកន្លែងកាត់ក្នុងរយៈពេល១០-១៥ថ្ងៃក្រោយកាត់ ព្រោះស្នាមកាត់ស្រស់ទាក់ទាញសត្វជូងឈើ។" + V,
    gloss_en: "Seal fresh cuts with tar/wound sealant, or spray Cypermethrin 25% around the cut area within 10–15 days after pruning — fresh wounds attract stem borer beetles." + VE,
  },
  {
    question_en: "How do I know if my orchard is overcrowded and needs thinning?",
    keywords: ["overcrowded","thinning","canopy overlap","2 years","year 6","year 8","yield decline","ក្រាស់","សម្ដៃ","កាត់","ដើម"],
    reply_km: "បើម្លប់ដើមចាប់ត្រួតគ្នារយៈពេលច្រើនជាង២ឆ្នាំ ហើយធ្វើឲ្យទិន្នផលថយចុះ (ជាធម្មតាកើតឡើងនៅអាយុ៦-៨ឆ្នាំពេលដាំក្រាស់) គួរពិចារណាកាត់ចេញដើមមួយចំនួន (សម្តៃ) មិនត្រឹមតែកាត់មែកទេ — កុំរងចាំយូរពេក។",
    gloss_en: "If canopies have been overlapping for more than 2 years and yield is declining (typically around year 6–8 with dense planting), consider removing some entire trees (thinning) rather than just pruning — don't wait too long.",
  },
  {
    question_en: "What is the goal of pruning cashew trees?",
    keywords: ["goal pruning","light","canopy interior","shading","ground branch","ពន្លឺ","ម្លប់","ការកាត់","កាត់","ហេតុ","គោល"],
    reply_km: "ជួយឲ្យពន្លឺថ្ងៃចូលដល់ខាងក្នុងម្លប់ (ផ្កាតាមខាងក្នុងស្រមោលច្រើនតែងឲ្យផលទាប ហើយស្រមោល/សំណើមកើនហានិភ័យជំងឺ)។ គួរកាត់មែកដែលអង្គុលដល់ដី និងកាត់ឲ្យមែកលូតលាស់ចេញក្រៅ។",
    gloss_en: "Pruning lets light reach the canopy interior (shaded interior branches set fruit poorly and higher humidity raises disease risk). Remove branches touching the ground and prune to encourage outward branch growth for better light exposure.",
  },
  {
    question_en: "Should shoots growing from the rootstock be removed?",
    keywords: ["rootstock shoots","suckers","remove","drain nutrients","continuously","ចេញពីគល់ជើង","ដុះ","កាត់","ចោល"],
    reply_km: "បាទ/ចាស ត្រូវកាត់ចោលជានិច្ច មិនមែនតែម្តងក្នុងមួយឆ្នាំទេ ព្រោះមែកទាំងនោះមកពីគល់ជើង មិនមែនពូជចង់បាន ហើយវាទាញយកជីជាតិដោយឥតបានផល។",
    gloss_en: "Yes, remove them continuously (not just once a year) — these shoots come from the rootstock, not the desired variety, and they drain nutrients without producing useful yield.",
  },

  // ── 7. PESTS & DISEASE ───────────────────────────────────────────────────
  {
    question_en: "When does Tea Mosquito Bug occur and what damage does it cause?",
    keywords: ["tea mosquito bug","mosquito","month 6","month 7","30 percent","40 percent","after rain","មូសតែ","ជំងឺ","សត្វ","ខែ","ខូចខាត","ស","ល្អិត"],
    reply_km: "កើតឡើងញឹកញាប់ខែ៦-៧ដល់ខែ១-២ ជាពិសេសពេលសំណើមខ្ពស់ សកម្មបំផុតក្រោយភ្លៀង។ បង្កគ្រោះថ្នាក់ដោយបៀបទឹករស ធ្វើឲ្យមានស្នាមខ្មៅលើសាខាថ្មីនិងផ្កា ចុងសាខាទំហួយ ផ្កាថយចុះ។ បើធ្ងន់ធ្ងរអាចខាតបង់ទិន្នផលរហូតដល់៣០-៤០%។",
    gloss_en: "Occurs frequently month 6–7 through month 1–2, especially in high humidity, most active after rain. Sucks sap from young shoots and flower panicles, causing black lesions, wilting shoot tips, and reduced flowering. Severe infestation can cause 30–40%+ crop loss.",
  },
  {
    question_en: "What treatment works for Tea Mosquito Bug?",
    keywords: ["tea mosquito treatment","cypermethrin","chlorpyrifos","abamectin","imidacloprid","ព្យាបាល","មូសតែ","ថ្នាំ","ព្យាបាល","សត្វ","ល្អិត"],
    reply_km: "មុនចេញផ្កា (គ្មានផ្កាបុប្ផាទេ)៖ អាចប្រើ Cypermethrin ២៥% ឬ Chlorpyrifos (បែប EC)។ ពេលកំពុងចេញផ្កា (មានផ្កាបុប្ផារួច)៖ ប្តូរទៅប្រើ Abamectin, Emamectin, Imidacloprid, Thiamethoxam, Chlorfenapyr ឬ Fipronil (បែប SC ស្រាលជាង)។" + V,
    gloss_en: "Before flowering (no buds): EC-formulation Cypermethrin 25% or Chlorpyrifos. During flowering (buds/flowers present): switch to SC-formulation Abamectin, Emamectin, Imidacloprid, Thiamethoxam, Chlorfenapyr, or Fipronil." + VE,
  },
  {
    question_en: "What treatment works for aphids scale insects and fruit boring moths?",
    keywords: ["aphids","scale","fruit moth","month 3","month 4","abamectin","ដង្កូវ","សីផ្លា","ចោះ","ថ្នាំ","ខែ","ផ្លែ","ព្យាបាល"],
    reply_km: "កើតឡើងញឹកញាប់ខែ៣-៤ ជាពិសេសនៅសាខាថ្មី។ ប្រើ Abamectin, Emamectin, Imidacloprid, Fipronil, Thiamethoxam ឬ Chlorfenapyr។ បើធ្ងន់ធ្ងរ បាញ់៣ដងចន្លោះពី៥ថ្ងៃ។" + V,
    gloss_en: "Occurs frequently month 3–4, especially on young shoots. Use Abamectin, Emamectin, Imidacloprid, Fipronil, Thiamethoxam, or Chlorfenapyr. If severe, spray 3 rounds ~5 days apart." + VE,
  },
  {
    question_en: "How do I manage Thrips?",
    keywords: ["thrips","silver","scarred","underside","imidacloprid","ស្រមើល","Thrips","ព្យាបាល","ជំងឺ","ថ្នាំ","ស្នាម","សត្វ"],
    reply_km: "កើតឡើងខែ១១ដល់ខែ៥ បង្កគ្រោះថ្នាក់ដល់ស្លឹកថ្មី ផ្កា និងផ្ទៃផ្លែ (ធ្វើឲ្យផ្លែមានស្នាមរបួស)។ ព្យាបាលដោយ Imidacloprid ៧០%, Fipronil ឬ Thiamethoxam។ ត្រូវបាញ់ឲ្យគ្រប់ទាំងក្រោមស្លឹកនិងលើស្លឹក មិនមែនតែផ្នែកខាងលើទេ។" + V,
    gloss_en: "Occurs month 11 through month 5, damaging young leaves, flowers, and fruit surface (scarring). Treat with Imidacloprid 70%, Fipronil, or Thiamethoxam. Spray must cover both leaf undersides and tops." + VE,
  },
  {
    question_en: "How do I manage Mealybugs?",
    keywords: ["mealybug","ant","honeydew","month 1","imidacloprid","fipronil","ចែស","ស្រមោច","ព្យាបាល","ជំងឺ","ថ្នាំ","សត្វ"],
    reply_km: "កើតឡើងចាប់ពីខែ១ តែងរកឃើញនៅជិតកន្លែងមានស្រមោច ព្រោះស្រមោចចិញ្ចឹមចែសយកសំណើមផ្អែម។ បើឃើញស្រមោចច្រើននៅលើដើម ត្រូវប្រយ័ត្នចែសផងដែរ។ ដំបូងគួរកម្ចាត់ស្រមោចមុន បន្ទាប់មកប្រើ Imidacloprid ឬ Fipronil។" + V,
    gloss_en: "Occurs from month 1 onward, often found near ant activity — ants farm mealybugs for honeydew. If you see lots of ants on a tree, check for mealybugs too. Control ants first, then use Imidacloprid or Fipronil." + VE,
  },
  {
    question_en: "How do I manage Beetle and Weevil pests?",
    keywords: ["beetle","weevil","month 6","month 3","lufenuron","buprofezin","ការស","ខ្យង","ព្យាបាល","ជំងឺ","ថ្នាំ","សត្វ"],
    reply_km: "កើតឡើងខែ៦ដល់ខែ៣ បំផ្លាញសាខាថ្មីនិងគល់ដើម។ មុនចេញផ្កា ប្រើ Cypermethrin ឬ Chlorpyrifos (EC)។ ពេលចេញផ្កា ប្តូរទៅ Abamectin, Emamectin, Imidacloprid, Lufenuron ឬ Buprofezin (SC)។ បាញ់ជាពិសេសនៅពេលកាត់មែក ព្រោះស្នាមកាត់ថ្មីទាក់ទាញសត្វទាំងនេះ។" + V,
    gloss_en: "Occurs month 6 through month 3, damaging young shoots and trunk. Before flowering: Cypermethrin or Chlorpyrifos (EC). During flowering: Abamectin, Imidacloprid, Lufenuron, or Buprofezin (SC). Spray especially around pruning time — fresh cuts attract these pests." + VE,
  },
  {
    question_en: "How can I tell if a tree has a stem borer infestation?",
    keywords: ["detect stem borer","tell","bark crack","wound","inside","invisible","ជូងឈើ","សម្គាល់","ស្នាម","ជំងឺ","ជូង","សម្គាល់"],
    reply_km: "សត្វជូងឈើសាំងចូលក្នុងឈើតាមស្នាមរបួស/ស្នាមប្រេះស្បែកឈើ ហើយស៊ីនៅខាងក្នុងអស់ពេលរាប់ខែ ដូច្នេះខូចខាតច្រើនតែមើលមិនឃើញរហូតដល់ធ្ងន់ធ្ងរ។ ថ្នាំបាញ់ខាងក្រៅមិនអាចប៉ះពាល់ដល់ដង្កូវខាងក្នុងបានទេ។" + V,
    gloss_en: "Stem borer larvae enter through wounds/bark cracks and feed inside the wood for months — damage is often invisible until severe. Surface sprays cannot reach larvae already inside the wood." + VE,
  },
  {
    question_en: "How do I prevent stem borer since sprays cannot reach inside?",
    keywords: ["stem borer","prevent","trunk wound","seal cut","weak tree","ជូងឈើ","ការពារ","ស្នាម","ជូង","ថ្នាំ"],
    reply_km: "ការការពារសំខាន់ជាងការព្យាបាល៖ ជៀសវាងធ្វើឲ្យគល់ដើមមានរបួស បិទបាំងស្នាមកាត់មែកភ្លាមៗ រក្សាដើមឲ្យមានសុខភាពល្អដោយដាក់ជីគ្រប់គ្រាន់ (ដើមខ្សោយងាយរងគ្រោះជាង) និងបាញ់ Cypermethrin ឬ Chlorpyrifos ការពារនៅលើសំបកគល់ និងជុំវិញស្នាមកាត់មែក។" + V,
    gloss_en: "Prevention matters more than treatment: avoid trunk wounds, seal pruning cuts promptly, keep the tree vigorous with adequate fertilizing (weak trees are more susceptible), and apply preventive Cypermethrin or Chlorpyrifos on the trunk surface and around pruning wounds." + VE,
  },
  {
    question_en: "Is there a non-chemical way to control pests?",
    keywords: ["non chemical","light trap","night","moth","organic","អន្ទាក់","ភ្លើង","គ្មានថ្នាំ"],
    reply_km: "អាចប្រើអន្ទាក់ភ្លើងពេលយប់ ដើម្បីចាប់សត្វល្អិតរាត្រីមួយចំនួន (ដូចជាមេអំបៅ) ដែលមានប្រសិទ្ធភាពជាមួយអន្ទាក់ភ្លើងឬអន្ទាក់ទឹក។",
    gloss_en: "Light traps set up at night can catch certain nocturnal pests (like moths), whether using a light-and-sheet trap or a light-over-water trap.",
  },
  {
    question_en: "How do termites affect cashew trees?",
    keywords: ["termite","underground","root","risk","weed control","កណ្ដូប","ឫស","ជំងឺ","ដី","សត្វ"],
    reply_km: "សត្វកណ្តូបគឺជាហានិភ័យដែលគេស្គាល់ចំពោះឫសដើមចន្ទី ត្រូវប្រុងប្រយ័ត្នដោយថែទាំតំបន់ជុំវិញឫសនិងកម្ចាត់ស្មៅឲ្យស្អាត។" + V,
    gloss_en: "Termites are a known risk to cashew roots — manage this through careful root-zone care and keeping weeds cleared." + VE,
  },

  // ── 8. PESTICIDE SAFETY ─────────────────────────────────────────────────
  {
    question_en: "How can I spot a counterfeit pesticide?",
    keywords: ["fake","counterfeit","identify","licensed","label","warning","ក្លែង","សម្គាល់","ថ្នាំ","ហាង"],
    reply_km: "៣សញ្ញា៖ (១)គ្មានស្លាកព្រមានគ្រោះថ្នាក់ច្បាស់លាស់ (២)គ្មានព័ត៌មានសារធាតុ/ក្រុមហ៊ុនផលិត/អ្នកនាំចូលច្បាស់លាស់ (៣)ទិញពីអ្នកលក់មិនមានអាជ្ញាប័ណ្ណ។ ផលិតផលពិតគួរទិញពីហាងលក់សម្ភារកសិកម្មដែលមានអាជ្ញាប័ណ្ណប៉ុណ្ណោះ។",
    gloss_en: "3 warning signs: (1) missing clear hazard warning labels; (2) missing clear ingredient/manufacturer/importer info; (3) bought from an unlicensed seller. Genuine products should only be bought from licensed agricultural input shops.",
  },
  {
    question_en: "How do I read the toxicity color band on a pesticide label?",
    keywords: ["color band","toxicity","red","yellow","blue","green","category","ពណ៌","ប្រភេទ","ស្លាក","ថ្នាំ","ពណ៌"],
    reply_km: "ក្រហម = ប្រភេទ១ (គ្រោះថ្នាក់បំផុត) លឿង = ប្រភេទ២ ខៀវ = ប្រភេទ៣ បៃតង = ប្រភេទ៤ (គ្រោះថ្នាក់តិចបំផុត)។",
    gloss_en: "Red = Category I (most toxic), Yellow = Category II, Blue = Category III, Green = Category IV (least toxic).",
  },
  {
    question_en: "How does EC formulation differ from SC SL and why does it matter?",
    keywords: ["EC","SC","SL","formulation","oil based","water based","burn flower","EC vs SC","ទម្រង់ថ្នាំ","ថ្នាំ","ប្រភេទ"],
    reply_km: "EC (Emulsifiable Concentrate) មានប្រេង/សារធាតុរំលាយ ខ្លាំងជាង អាចឆេះផ្កា/ជាលិកាកូនឈើ។ SC (Suspension Concentrate) និង SL (Soluble Liquid) មានមូលដ្ឋានទឹក ស្រាលជាង ត្រូវការជាចម្បងសម្រាប់បាញ់ក្នុងដំណាក់កាលចេញផ្កា។",
    gloss_en: "EC (Emulsifiable Concentrate) is oil/solvent-based, harsher, and can burn flowers/tender tissue. SC (Suspension Concentrate) and SL (Soluble Liquid) are water-based and gentler — preferred choice for spraying during flowering.",
  },
  {
    question_en: "Can I mix two different pesticides together?",
    keywords: ["mix pesticide","combine","two products","compatible","reaction","លាយថ្នាំ","ពីរប្រភេទ","ថ្នាំ","លាយ"],
    reply_km: "ជាទូទៅមិនណែនាំទេ លុះត្រាតែដឹងច្បាស់ថាចូលគ្នាបាន ព្រោះប្រតិកម្មគីមីអាចកាត់បន្ថយប្រសិទ្ធភាពរបស់ថ្នាំទាំងពីរ។ បើចាំបាច់ ត្រូវសាកល្បងលាយបរិមាណតូចមុន។",
    gloss_en: "Generally not recommended unless the combination is proven compatible — chemical interactions can reduce the effectiveness of both products. If necessary, test a small batch first.",
  },
  {
    question_en: "What is the best time of day to spray pesticide?",
    keywords: ["best time spray","morning","evening","avoid midday","before 7am","after 4pm","ព្រឹក","ល្ងាច","ពេលបាញ់","ថ្នាំ","ពេល","បាញ់"],
    reply_km: "ពេលចេញផ្កា/ផ្លែ គួរបាញ់ព្រឹកព្រលឹម (មុន៧ព្រឹក) ឬល្ងាច (ក្រោយ៤-៥ល្ងាច) ជៀសវាងពេលថ្ងៃត្រង់។ បើសំណើមខ្ពស់ អាចបាញ់ល្ងាចយប់ (៨-៩យប់)។ បាញ់ពេលថ្ងៃត្រង់កាត់បន្ថយប្រសិទ្ធភាពខ្លាំង ហើយអាចឆេះស្លឹក/ផ្កា។",
    gloss_en: "During flowering/fruiting, spray early morning (before 7am) or late afternoon (after 4–5pm), avoiding hot midday. If humidity is high, evening (8–9pm) is another option. Midday spraying reduces effectiveness and can burn leaves/flowers.",
  },
  {
    question_en: "Why should I rotate active ingredients between sprays?",
    keywords: ["rotate","resistance","active ingredient","lufenuron","buprofezin","ប្ដូរ","ធន់","សារធាតុ","ថ្នាំ","ប្ដូរ"],
    reply_km: "ការប្រើសារធាតុសកម្មតែមួយម្តងហើយម្តងទៀត អាចធ្វើឲ្យសត្វល្អិតបង្កើតភាពធន់ (resistance)។ គួរប្តូរប្រភេទ ដូចជា Lufenuron និង Buprofezin ជាជម្រើសផ្សេងបន្ថែម។",
    gloss_en: "Repeatedly using the same active ingredient allows pests to develop resistance. Rotate between product classes — for example, Lufenuron and Buprofezin as alternatives.",
  },
  {
    question_en: "How should pesticides be stored?",
    keywords: ["store pesticide","storage","sunlight","heat","cool","dry","ទុកថ្នាំ","ផ្ទុក","ត្រជាក់","ថ្នាំ","ទុក"],
    reply_km: "ទុកឲ្យឆ្ងាយពីពន្លឺថ្ងៃដោយផ្ទាល់និងកម្តៅ ក្នុងកន្លែងត្រជាក់ស្ងួត ព្រោះកម្តៅ/សំណើមធ្វើឲ្យសារធាតុសកម្មខូចប្រសិទ្ធភាព។ ជៀសវាងការប្រឡាយរវាងសារធាតុគីមីខុសគ្នាពេលលាយ។",
    gloss_en: "Keep away from direct sunlight and heat, in a cool, dry place — heat/moisture degrades the active ingredient over time. Avoid cross-contamination between different chemicals when mixing.",
  },
  {
    question_en: "How long can mixed pesticide solution be kept before use?",
    keywords: ["mixed spray","24 hours","how long","keep","expire","ថ្នាំ","ម៉ោង","ទុក"],
    reply_km: "កុំទុកលើសពី២៤ម៉ោង ព្រោះថ្នាំចាប់ផ្តើមខូចប្រសិទ្ធភាព។",
    gloss_en: "Don't let mixed spray solution sit more than 24 hours — it starts losing effectiveness.",
  },

  // ── 9. HARVEST & STORAGE ────────────────────────────────────────────────
  {
    question_en: "When does M23 cashew harvest season begin?",
    keywords: ["harvest month","when harvest","season","month 1","month 5","flush","ប្រមូល","ខែ","រដូវ","ផល","ប្រមូលផល","ទុំ"],
    reply_km: "ដោយសារអឹម២៣ចេញផ្កា២-៣ដង (បន្តគ្នា) រយៈពេលប្រមូលផលអាចលាតសន្ធឹងពីខែ១ដល់ខែ៥ ព្រោះផ្លែពីវ៉ែនផ្កាខុសៗគ្នាទុំមិនស្មើគ្នា។",
    gloss_en: "Because M23 flowers in 2–3 flushes, harvest can span from month 1 through month 5, since fruit from different flowering flushes ripens at different times.",
  },
  {
    question_en: "How should fallen cashew nuts be collected?",
    keywords: ["collect fallen","how collect","2 days","3 days","4 days","rainy day","ប្រមូល","ធ្លាក់","ដី","គ្រាប់","ប្រមូលផល","ហាល"],
    reply_km: "(១)សម្អាតដីមុនប្រមូលផល (២)បំបែកគ្រាប់ចេញពីសំណល់ស្លឹក/មែក (៣)ប្រមូលក្នុងរយៈពេល២-៣ថ្ងៃក្រោយធ្លាក់ កុំទុកលើសពី៤-៥ថ្ងៃ (៤)ជៀសវាងប្រមូលថ្ងៃភ្លៀង (៥)ជជែកតំបន់ណាមានស្រមោច ត្រូវប្រុងប្រយ័ត្នពិនិត្យគុណភាព (៦)ហាលថ្ងៃ២-៣ថ្ងៃមុនស្តុក (៧)ថ្លឹង/កត់ត្រាតាមតំបន់។",
    gloss_en: "(1) Clear the ground before harvest; (2) separate nuts from leaf/branch debris; (3) collect within 2–3 days of falling, don't leave more than 4–5 days; (4) avoid collecting on rainy days; (5) in areas with ant activity, check nut quality carefully; (6) sun-dry 2–3 days before storage; (7) weigh and record by area.",
  },
  {
    question_en: "What moisture level is safe for storing cashew nuts?",
    keywords: ["moisture","storage","11 percent","below 11","safe store","សំណើម","ស្ដុក","គ្រាប់","ស្ងួត","ហាល"],
    reply_km: "សំណើមក្នុងគ្រាប់គួរតែក្រោម១១% មុននឹងយកទៅស្តុក។" + V,
    gloss_en: "Nut moisture content should be below 11% before storage." + VE,
  },
  {
    question_en: "What is the risk of leaving fallen nuts on the ground too long?",
    keywords: ["leave too long","quality","4 days","5 days","rain spoil","ទុក","ដី","ភ្លៀង","ស្អុយ","គ្រាប់","ប្រមូល"],
    reply_km: "គ្រាប់ដែលនៅលើដីលើសពី៤-៥ថ្ងៃចាប់ផ្តើមបាត់បង់គុណភាព ជាពិសេសបើមានភ្លៀងធ្លាក់ ធ្វើឲ្យស្អុយលឿនជាង។",
    gloss_en: "Nuts left on the ground more than 4–5 days start losing quality, especially if it rains — they spoil faster.",
  },
];

// ── MATCHING ENGINE ──────────────────────────────────────────────────────────

function tokenizeEn(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2);
}

function matchScore(query: string, pair: QAPair): number {
  const q = query.toLowerCase();
  let score = 0;

  for (const kw of pair.keywords) {
    const kwLow = kw.toLowerCase();
    if (q.includes(kwLow)) {
      score += 5;
    } else if (kwLow.includes(" ")) {
      // partial: each space-separated word of a multi-word keyword
      for (const part of kwLow.split(" ")) {
        if (part.length > 1 && q.includes(part)) score += 2;
      }
    }
  }

  // English word overlap against question_en
  const queryWords = new Set(tokenizeEn(query));
  for (const w of tokenizeEn(pair.question_en)) {
    if (queryWords.has(w)) score += 2;
  }

  return score;
}

const DEFAULT_RESPONSE: ChatResponse = {
  reply_km: "សូមអភ័យទោស — សូមសួរអំពីការដាំ ជី ផ្កា ប្រមូលផល ជំងឺ ថ្នាំ ឬ ការស្ដុក។",
  gloss_en: "I don't have a sample answer for that yet. Try asking about: site selection, planting, grafting, fertilizer, flowering, pruning, pests and diseases, pesticide safety, or harvest and storage.",
};

export function getChatResponse(userInput: string): ChatResponse {
  if (!userInput.trim()) return DEFAULT_RESPONSE;
  let bestScore = 0;
  let best: QAPair | null = null;
  for (const pair of QA_PAIRS) {
    const s = matchScore(userInput, pair);
    if (s > bestScore) { bestScore = s; best = pair; }
  }
  if (best && bestScore >= 2) return { reply_km: best.reply_km, gloss_en: best.gloss_en };

  // Smart fallback categorization if no direct match is found
  const q = userInput.toLowerCase();
  if (q.includes("ជី") || q.includes("npk") || q.includes("fertilizer") || q.includes("urea")) {
    return {
      reply_km: "សម្រាប់ការដាក់ជីស្វាយចន្ទី M23៖ ដើមក្មេង (១-៤ឆ្នាំ) ត្រូវការជីអត្រា N=៣:P=១:K=១ ជាចម្បង។ ដើមចាស់ឲ្យផល (៥ឆ្នាំឡើង) ត្រូវការ N=១:P=៣:K=៣ ព្រោះត្រូវការផូស្វ័រនិងប៉ូតាស្យូមខ្ពស់សម្រាប់ផ្កាផ្លែ។ ដាក់ជី៣ដងក្នុងមួយឆ្នាំ (ខែ៥-៦, ខែ៧-៨, និងខែ៩) នៅក្រោមចុងម្លប់ (drip-line)។" + V,
      gloss_en: "Fertilizer guide for M23: Young trees (1-4y) need N=3:P=1:K=1. Mature bearing trees (5y+) need N=1:P=3:K=3 for flowers and fruit. Apply 3 times per year around the drip-line." + VE,
    };
  }
  if (q.includes("ជំងឺ") || q.includes("សត្វល្អិត") || q.includes("pest") || q.includes("disease") || q.includes("moth") || q.includes("bug") || q.includes("មូសតែ")) {
    return {
      reply_km: "ចំពោះបញ្ហាជំងឺ និងសត្វល្អិតលើស្វាយចន្ទី M23 (ដូចជាមូសតែ ផ្សិត Anthracnose និងដង្កូវចោះ)៖ ត្រូវត្រួតពិនិត្យជាប្រចាំ។ មុនចេញផ្កាអាចប្រើថ្នាំប្រភេទ EC (Cypermethrin, Chlorpyrifos) ប៉ុន្តែពេលចេញផ្កាត្រូវប្តូរទៅប្រើថ្នាំប្រភេទ SC ឬ SL (Abamectin, Imidacloprid, Mancozeb) ដើម្បីជៀសវាងការឆេះផ្កា។ កាត់សម្អាតមែកដែលមានជំងឺចេញភ្លាម។" + V,
      gloss_en: "Pest & disease management for M23: Monitor regularly. Before flowering use EC formulations; during flowering switch to gentle SC/SL formulations (Abamectin, Imidacloprid, Mancozeb) to protect flowers. Prune and destroy infected parts." + VE,
    };
  }
  if (q.includes("ដាំ") || q.includes("ដី") || q.includes("plant") || q.includes("soil") || q.includes("spacing") || q.includes("គម្លាត")) {
    for (const pair of QA_PAIRS) {
      if (pair.question_en.toLowerCase().includes("spacing") || pair.question_en.toLowerCase().includes("month should")) {
        return { reply_km: pair.reply_km, gloss_en: pair.gloss_en };
      }
    }
  }
  if (q.includes("ផ្កា") || q.includes("flower") || q.includes("thiourea") || q.includes("kno3")) {
    for (const pair of QA_PAIRS) {
      if (pair.question_en.toLowerCase().includes("thiourea") || pair.question_en.toLowerCase().includes("flower")) {
        return { reply_km: pair.reply_km, gloss_en: pair.gloss_en };
      }
    }
  }

  return {
    reply_km: "ជាជំនួយការ AI ស្វាយចន្ទី M23៖ ខ្ញុំអាចជួយអ្នកអំពីការជ្រើសរើសដី ការដាំដុះ ការតបណត់ ការដាក់ជី ការការពារផ្កា ការគ្រប់គ្រងជំងឺ/សត្វល្អិត (មូសតែ ដង្កូវ) និងការប្រមូលផល។ សូមសួរអគ្គិសនី ឬសំណួរជាក់លាក់បន្ថែមទៀត!",
    gloss_en: "As your M23 Cashew Expert AI: I can help with site selection, planting, grafting, fertilizers, flowering protection, pest/disease control (tea mosquito bug, borers), and harvest. Feel free to ask more specific questions!",
  };
}

// ── PHOTO DIAGNOSIS ───────────────────────────────────────────────────────────

export const ANTHRACNOSE_DIAGNOSIS: DiagnosisResponse = {
  crop_variety: "M23 Cashew (ពូជស្វាយចន្ទី M23)",
  disease_name_khmer: "ជំងឺអុចខ្មៅ (Anthracnose)",
  disease_name_english: "Anthracnose Leaf Blight",
  severity: "មធ្យម",
  confidence_score: 95,
  symptoms: [
    "ស្លឹកមានដំបៅពណ៌ត្នោតងងឹត ជាមួយរង្វង់ស្លេកលឿង ស្លឹកចាប់ផ្ដើមមាំងខួច",
    "កើតមានជាទូទៅក្នុងរដូវសំណើមខ្ពស់ ឬក្រោយភ្លៀងធ្លាក់"
  ],
  immediate_actions: [
    {
      step: 1,
      title: "កាត់ស្លឹក និងមែកដែលមានជំងឺ",
      instruction: "កាត់ស្លឹក និងមែកដែលមានជំងឺចោលភ្លាម — ដុត ឬបំបាំងចោលឱ្យឆ្ងាយពីចម្ការ។"
    },
    {
      step: 2,
      title: "បាញ់ថ្នាំការពារ",
      instruction: "បាញ់ Copper Hydroxide ១-១.៥ ក្រាម/លីត្រ រៀងរាល់ ៧-១០ ថ្ងៃ។"
    }
  ],
  prevention_tips: [
    "កាត់មែកក្រាស់ឱ្យខ្យល់ចេញចូលបានល្អ និងជៀសវាងស្រោចទឹកលើស្លឹកដោយផ្ទាល់។"
  ]
};
