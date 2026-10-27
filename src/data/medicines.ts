import { MedicineRecord } from '../types';

export const SAMPLE_MEDICINES: MedicineRecord[] = [
  {
    id: 'med-metformin',
    name: 'Glucophage (Metformin)',
    genericName: 'Metformin Hydrochloride',
    category: 'Antidiabetic',
    form: 'Extended Release Tablet',
    strength: '500 mg',
    manufacturer: 'Merck Sante s.a.s (Reference Sample)',
    prescriptionRequired: true,
    isDemoData: true,
    generalUses: [
      'Used alongside diet and exercise to lower blood glucose in adults with type 2 diabetes.',
      'Acts by decreasing hepatic glucose production and improving insulin sensitivity.'
    ],
    samplePrescriptionSchedule: 'Commonly prescribed once or twice daily with meals to reduce gastrointestinal upset. Strict adherence to prescribing doctor schedule required.',
    warningsAndPrecautions: [
      'Risk of lactic acidosis: very rare but serious metabolic complication; risk increases with renal impairment, excessive alcohol intake, or dehydration.',
      'Must temporarily suspend before radiographic studies utilizing iodinated contrast media.',
      'Periodic monitoring of renal function and serum vitamin B12 levels is recommended.'
    ],
    commonSideEffects: [
      { effect: 'Mild gastrointestinal discomfort or nausea', frequency: 'Common' },
      { effect: 'Diarrhea and abdominal pain during initial titration', frequency: 'Common' },
      { effect: 'Metallic taste sensation', frequency: 'Uncommon' },
      { effect: 'Lactic acidosis', frequency: 'Rare' }
    ],
    referenceSource: {
      name: 'WHO Model Formulary / National Library of Medicine (NIH)',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=glucophage-metformin',
      lastReviewed: '2026-04-15'
    },
    storageInstructions: 'Store at 20°C to 25°C (68°F to 77°F). Protect from moisture and keep tightly capped.'
  },
  {
    id: 'med-amoxicillin',
    name: 'Amoxil (Amoxicillin)',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Antibiotic',
    form: 'Capsule',
    strength: '500 mg',
    manufacturer: 'GlaxoSmithKline (Reference Sample)',
    prescriptionRequired: true,
    isDemoData: true,
    generalUses: [
      'Treatment of susceptible bacterial infections of the ear, nose, throat, lower respiratory tract, and urinary tract.',
      'Part of multi-drug regimens for Helicobacter pylori eradication.'
    ],
    samplePrescriptionSchedule: 'Prescribed typically every 8 hours or every 12 hours for a finite period (e.g., 7 to 10 days). Finish the entire prescribed course even if symptoms resolve earlier.',
    warningsAndPrecautions: [
      'Contraindicated in patients with history of severe hypersensitivity / anaphylaxis to beta-lactam antibiotics (penicillins and cephalosporins).',
      'Clostridioides difficile-associated diarrhea (CDAD) may occur during or after antimicrobial therapy.',
      'Overuse leads to bacterial resistance; does not treat viral infections like colds or influenza.'
    ],
    commonSideEffects: [
      { effect: 'Mild diarrhea or loose stools', frequency: 'Common' },
      { effect: 'Cutaneous skin rash or hives', frequency: 'Common' },
      { effect: 'Nausea or vomiting', frequency: 'Uncommon' },
      { effect: 'Severe allergic anaphylactic reaction', frequency: 'Rare' }
    ],
    referenceSource: {
      name: 'British National Formulary (BNF) & WHO Essential Medicines',
      url: 'https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines',
      lastReviewed: '2026-03-10'
    },
    storageInstructions: 'Keep in original container in a cool, dry place away from direct heat and light.'
  },
  {
    id: 'med-paracetamol',
    name: 'Panadol (Paracetamol)',
    genericName: 'Acetaminophen / Paracetamol',
    category: 'Pain Relief',
    form: 'Oral Tablet',
    strength: '500 mg',
    manufacturer: 'Haleon Consumer Health (Reference Sample)',
    prescriptionRequired: false,
    isDemoData: true,
    generalUses: [
      'Short-term relief of mild to moderate pain (headache, dental pain, muscular aches, dysmenorrhea).',
      'Reduction of fever (antipyretic) in viral and post-immunization states.'
    ],
    samplePrescriptionSchedule: 'Adult OTC general label: 500 mg to 1000 mg every 4-6 hours as needed. Do not exceed 4000 mg (4 grams) in any 24-hour period.',
    warningsAndPrecautions: [
      'Hepatotoxicity alert: exceeding maximum recommended daily dose or consuming with chronic alcohol may cause acute liver injury.',
      'Ensure other concurrent multi-symptom cold/flu preparations do not contain acetaminophen to avoid accidental overdose.',
      'Seek immediate medical attention in case of suspected accidental ingestion.'
    ],
    commonSideEffects: [
      { effect: 'Generally well tolerated at therapeutic doses', frequency: 'Common' },
      { effect: 'Allergic skin reactions or pruritus', frequency: 'Rare' },
      { effect: 'Thrombocytopenia or leucopenia', frequency: 'Rare' }
    ],
    referenceSource: {
      name: 'OpenFDA Drug Product Reference',
      url: 'https://open.fda.gov/apis/drug/label/',
      lastReviewed: '2026-05-01'
    },
    storageInstructions: 'Store below 25°C (77°F). Keep out of reach and sight of children.'
  },
  {
    id: 'med-atorvastatin',
    name: 'Lipitor (Atorvastatin)',
    genericName: 'Atorvastatin Calcium',
    category: 'Cardiovascular',
    form: 'Oral Tablet',
    strength: '20 mg',
    manufacturer: 'Pfizer Inc. (Reference Sample)',
    prescriptionRequired: true,
    isDemoData: true,
    generalUses: [
      'Primary prevention of cardiovascular disease in adults at elevated risk.',
      'Adjunct to dietary modifications to reduce elevated total cholesterol, LDL-C, and triglycerides, and to elevate HDL-C.'
    ],
    samplePrescriptionSchedule: 'Once daily at any time of day, with or without food, typically taken at the same time each evening.',
    warningsAndPrecautions: [
      'Skeletal muscle effects: risk of myopathy and rhabdomyolysis. Report unexplained muscle pain, tenderness, or weakness immediately.',
      'Liver enzyme abnormalities: baseline and periodic liver function assessments recommended.',
      'Contraindicated in active liver disease and pregnancy.'
    ],
    commonSideEffects: [
      { effect: 'Nasopharyngitis and joint pain (arthralgia)', frequency: 'Common' },
      { effect: 'Mild gastrointestinal discomfort or dyspepsia', frequency: 'Common' },
      { effect: 'Elevation in serum transaminases', frequency: 'Uncommon' },
      { effect: 'Rhabdomyolysis with acute kidney injury', frequency: 'Rare' }
    ],
    referenceSource: {
      name: 'FDA AccessData Drug Safety Communications',
      url: 'https://www.accessdata.fda.gov/scripts/cder/daf/',
      lastReviewed: '2026-02-28'
    },
    storageInstructions: 'Store at 20°C to 25°C (68°F to 77°F). Protect from excessive moisture.'
  },
  {
    id: 'med-cetirizine',
    name: 'Zyrtec (Cetirizine)',
    genericName: 'Cetirizine Dihydrochloride',
    category: 'Antihistamine',
    form: 'Oral Tablet',
    strength: '10 mg',
    manufacturer: 'Johnson & Johnson (Reference Sample)',
    prescriptionRequired: false,
    isDemoData: true,
    generalUses: [
      'Relief of symptoms associated with seasonal allergic rhinitis (hay fever) and perennial allergic rhinitis.',
      'Relief of itching, erythema, and wheals associated with chronic idiopathic urticaria.'
    ],
    samplePrescriptionSchedule: 'Adults: 10 mg once daily. Dose adjustment required in moderate-to-severe renal impairment.',
    warningsAndPrecautions: [
      'May cause somnolence in sensitive individuals; exercise caution when driving or operating heavy machinery.',
      'Avoid concurrent consumption of alcohol or central nervous system depressants.',
      'Consult physician if allergic symptoms persist longer than 7 days.'
    ],
    commonSideEffects: [
      { effect: 'Mild drowsiness or fatigue', frequency: 'Common' },
      { effect: 'Dry mouth or pharyngitis', frequency: 'Common' },
      { effect: 'Dizziness or headache', frequency: 'Uncommon' }
    ],
    referenceSource: {
      name: 'European Medicines Agency (EMA) Product Information',
      url: 'https://www.ema.europa.eu/en/medicines',
      lastReviewed: '2026-01-20'
    },
    storageInstructions: 'Store at room temperature between 15°C and 30°C.'
  },
  {
    id: 'med-omeprazole',
    name: 'Prilosec (Omeprazole)',
    genericName: 'Omeprazole Magnesium',
    category: 'Gastrointestinal',
    form: 'Capsule',
    strength: '20 mg',
    manufacturer: 'AstraZeneca (Reference Sample)',
    prescriptionRequired: false,
    isDemoData: true,
    generalUses: [
      'Treatment of gastroesophageal reflux disease (GERD) and erosive esophagitis.',
      'Short-term management of active duodenal and benign gastric ulcers.'
    ],
    samplePrescriptionSchedule: 'Commonly prescribed 20 mg once daily in the morning, 30 to 60 minutes prior to the first meal. Swallow capsule whole; do not chew or crush.',
    warningsAndPrecautions: [
      'Long-term proton pump inhibitor (PPI) therapy may be associated with increased risk of hypomagnesemia, bone fractures, and Clostridioides difficile infection.',
      'May reduce absorption of vitamin B12 upon prolonged multi-year administration.',
      'Significant interaction with clopidogrel; consult physician regarding antiplatelet regimens.'
    ],
    commonSideEffects: [
      { effect: 'Headache and abdominal cramping', frequency: 'Common' },
      { effect: 'Diarrhea, constipation, flatulence', frequency: 'Common' },
      { effect: 'Transient skin rash', frequency: 'Uncommon' },
      { effect: 'Hypomagnesemia on prolonged use', frequency: 'Rare' }
    ],
    referenceSource: {
      name: 'US Pharmacopeia & National Institutes of Health',
      url: 'https://pubchem.ncbi.nlm.nih.gov/compound/Omeprazole',
      lastReviewed: '2026-03-25'
    },
    storageInstructions: 'Keep in original blister pack to shield from atmospheric moisture.'
  },
  {
    id: 'med-salbutamol',
    name: 'Ventolin (Albuterol / Salbutamol)',
    genericName: 'Salbutamol Sulfate',
    category: 'Respiratory',
    form: 'Metered Dose Inhaler',
    strength: '100 mcg/actuation',
    manufacturer: 'GlaxoSmithKline (Reference Sample)',
    prescriptionRequired: true,
    isDemoData: true,
    generalUses: [
      'Rapid relief of acute bronchospasm in bronchial asthma and chronic obstructive pulmonary disease (COPD).',
      'Prevention of exercise-induced bronchospasm when administered 15 minutes prior to exertion.'
    ],
    samplePrescriptionSchedule: 'Acute relief: 1 to 2 inhalations as needed for acute wheezing. Do not exceed recommended maximum puffs per day without urgent medical review.',
    warningsAndPrecautions: [
      'Increasing frequency of inhaler use indicates poorly controlled asthma and necessitates prompt clinical reassessment.',
      'Cardiovascular stimulation: may produce sinus tachycardia, palpitations, and systolic hypertension in susceptible individuals.',
      'Prime inhaler before first use or if unused for over 5 days.'
    ],
    commonSideEffects: [
      { effect: 'Fine skeletal muscle tremor (especially hands)', frequency: 'Common' },
      { effect: 'Tachycardia and mild palpitations', frequency: 'Common' },
      { effect: 'Transient headache or nervousness', frequency: 'Uncommon' },
      { effect: 'Paradoxical bronchospasm', frequency: 'Rare' }
    ],
    referenceSource: {
      name: 'Global Initiative for Asthma (GINA) & WHO List',
      url: 'https://ginasthma.org/reports/',
      lastReviewed: '2026-04-02'
    },
    storageInstructions: 'Store below 30°C. Protect from frost and direct sunlight. Pressurized canister; do not puncture.'
  },
  {
    id: 'med-amlodipine',
    name: 'Norvasc (Amlodipine)',
    genericName: 'Amlodipine Besylate',
    category: 'Antihypertensive',
    form: 'Oral Tablet',
    strength: '5 mg',
    manufacturer: 'Pfizer Inc. (Reference Sample)',
    prescriptionRequired: true,
    isDemoData: true,
    generalUses: [
      'Management of essential arterial hypertension, alone or in combination with other antihypertensive agents.',
      'Symptomatic treatment of chronic stable angina and vasospastic (Prinzmetal) angina.'
    ],
    samplePrescriptionSchedule: 'Usual initial dose is 5 mg once daily, adjusted every 7-14 days based on blood pressure response. Taken at approximately the same time each day.',
    warningsAndPrecautions: [
      'Peripheral edema: fluid retention in lower extremities (ankles) is a recognized dose-dependent side effect.',
      'Dihydropyridine calcium channel blocker: use with caution in severe aortic stenosis or congestive heart failure.',
      'Do not abruptly discontinue without consulting prescribing physician.'
    ],
    commonSideEffects: [
      { effect: 'Peripheral ankle edema', frequency: 'Common' },
      { effect: 'Flushing and sensation of warmth', frequency: 'Common' },
      { effect: 'Dizziness or lightheadedness when standing', frequency: 'Uncommon' },
      { effect: 'Gingival hyperplasia', frequency: 'Rare' }
    ],
    referenceSource: {
      name: 'American College of Cardiology (ACC) / AHA Guidelines',
      url: 'https://www.ahajournals.org/journal/hyp',
      lastReviewed: '2026-02-14'
    },
    storageInstructions: 'Store between 15°C and 30°C in a dry location.'
  },
  {
    id: 'med-ibuprofen',
    name: 'Advil (Ibuprofen)',
    genericName: 'Ibuprofen',
    category: 'Pain Relief',
    form: 'Oral Tablet',
    strength: '400 mg',
    manufacturer: 'Kenvue (Reference Sample)',
    prescriptionRequired: false,
    isDemoData: true,
    generalUses: [
      'Relief of mild to moderate inflammatory pain, dysmenorrhea, and toothache.',
      'Symptomatic management of osteoarthritis, rheumatoid arthritis, and athletic sprains.'
    ],
    samplePrescriptionSchedule: '200 mg to 400 mg every 4 to 6 hours with food or milk to minimize gastric irritation. Maximum OTC dose is 1200 mg/day unless directed by a clinician.',
    warningsAndPrecautions: [
      'Nonsteroidal anti-inflammatory drug (NSAID): increases risk of serious gastrointestinal bleeding, ulceration, and perforation.',
      'Cardiovascular risk: may heighten risk of thrombotic events, myocardial infarction, and stroke with prolonged high dosage.',
      'Avoid in third trimester of pregnancy due to premature closure of fetal ductus arteriosus.'
    ],
    commonSideEffects: [
      { effect: 'Dyspepsia, heartburn, epigastric discomfort', frequency: 'Common' },
      { effect: 'Dizziness or tinnitus', frequency: 'Uncommon' },
      { effect: 'Gastrointestinal bleeding or ulceration', frequency: 'Rare' }
    ],
    referenceSource: {
      name: 'US FDA Drug Safety Communication for NSAIDs',
      url: 'https://www.fda.gov/drugs/drug-safety-and-availability/',
      lastReviewed: '2026-05-12'
    },
    storageInstructions: 'Store at 20°C to 25°C. Avoid excessive heat above 40°C.'
  },
  {
    id: 'med-losartan',
    name: 'Cozaar (Losartan)',
    genericName: 'Losartan Potassium',
    category: 'Antihypertensive',
    form: 'Oral Tablet',
    strength: '50 mg',
    manufacturer: 'Organon & Co. (Reference Sample)',
    prescriptionRequired: true,
    isDemoData: true,
    generalUses: [
      'Treatment of hypertension to lower blood pressure and reduce risk of fatal and nonfatal cardiovascular events.',
      'Nephroprotection in type 2 diabetic patients with proteinuria and hypertension.'
    ],
    samplePrescriptionSchedule: 'Standard maintenance dose is 50 mg once daily. Can be administered with or without food.',
    warningsAndPrecautions: [
      'Black Box Warning: fetal toxicity. Drugs acting on the renin-angiotensin system can cause injury and death to developing fetus; discontinue as soon as pregnancy detected.',
      'Hyperkalemia risk: monitor serum potassium, particularly in patients with renal impairment.',
      'Hypotension may occur in volume-depleted patients.'
    ],
    commonSideEffects: [
      { effect: 'Dizziness or lightheadedness', frequency: 'Common' },
      { effect: 'Upper respiratory congestion', frequency: 'Common' },
      { effect: 'Hyperkalemia', frequency: 'Uncommon' },
      { effect: 'Angioedema of face, lips, or tongue', frequency: 'Rare' }
    ],
    referenceSource: {
      name: 'NIH DailyMed & WHO Model List',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=losartan-potassium',
      lastReviewed: '2026-03-18'
    },
    storageInstructions: 'Store at 25°C (77°F). Keep container tightly closed.'
  }
];
