export interface KnowledgeEntry {
  keywords: string[];
  questionEn: string;
  questionHi: string;
  responseEn: string;
  responseHi: string;
  category: 'leaflets' | 'generics' | 'missed_dose' | 'storage' | 'terminology' | 'general';
  referenceLink?: {
    label: string;
    url: string;
  };
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ['generic', 'brand', 'difference', 'cheaper', 'substitute', 'जेनेरिक', 'ब्रांडेड', 'अंतर'],
    questionEn: 'What is the difference between generic and brand-name medicines?',
    questionHi: 'जेनेरिक और ब्रांडेड दवाओं में क्या अंतर होता है?',
    responseEn: `**Generic vs. Brand-Name Medicines Explained:**

1. **Active Ingredient:** A generic medicine contains the exact same active pharmaceutical ingredient (API), strength, dosage form, and intended therapeutic action as the original brand-name drug.
2. **Quality & Bioequivalence:** Regulatory bodies (such as FDA, EMA, and CDSCO) require generic medicines to demonstrate "bioequivalence," meaning they work in the human body at the same speed and potency as the brand counterpart.
3. **Price Difference:** Brand-name manufacturers spend years and substantial funds on research, clinical trials, and promotional marketing. When patent protections expire, other licensed manufacturers can produce the drug without these upfront development expenses, making generics 30% to 80% less expensive.
4. **Inactive Ingredients:** Colorings, flavorings, and binding agents (inactive excipients) may vary slightly, but they do not alter clinical efficacy.

*Always consult your physician or pharmacist before switching chronic medications to ensure complete therapeutic compatibility.*`,
    responseHi: `**जेनेरिक और ब्रांडेड दवाओं में मुख्य अंतर:**

1. **सक्रिय घटक (Active Ingredient):** जेनेरिक दवा में ठीक वही सक्रिय औषधीय तत्व, क्षमता (स्ट्रेंथ), और खुराक का रूप होता है जो ब्रांडेड दवा में होता है।
2. **प्रभाव और गुणवत्ता:** स्वास्थ्य नियामक (जैसे CDSCO / FDA) यह सुनिश्चित करते हैं कि जेनेरिक दवा शरीर में ब्रांडेड दवा की तरह ही प्रभावी और सुरक्षित काम करे (बायोइक्विवेलेंस)।
3. **कीमत में अंतर:** ब्रांडेड कंपनियों का पैसा नए शोध और विज्ञापनों में खर्च होता है। पेटेंट समाप्त होने के बाद, जेनेरिक दवाएं बिना इन अतिरिक्त खर्चों के बनती हैं, जिससे वे 30% से 80% तक सस्ती होती हैं।
4. **सक्रियता:** दोनों का चिकित्सीय असर एक जैसा होता है।

*किसी भी दवा को बदलने से पहले हमेशा अपने डॉक्टर या फार्मासिस्ट से परामर्श अवश्य लें।*`,
    category: 'generics',
    referenceLink: {
      label: 'US FDA: Generic Drug Facts & Bioequivalence',
      url: 'https://www.fda.gov/drugs/frequently-asked-questions-popular-topics/generic-drugs-questions-answers'
    }
  },
  {
    keywords: ['leaflet', 'label', 'read', 'box', 'packaging', 'expiry', 'exp', 'पर्ची', 'एक्सपायरी', 'लेबल', 'लीफलेट'],
    questionEn: 'How do I safely read a medicine leaflet and packaging label?',
    questionHi: 'दवा के पत्ते या बॉक्स पर लिखी जानकारी (लीफलेट) को सही तरीके से कैसे पढ़ें?',
    responseEn: `**Guide to Reading Medicine Packaging & Leaflets:**

- **Generic Name (Salt Name):** Usually printed right below or in smaller font beneath the trade brand name (e.g., *Metformin Hydrochloride* under *Glucophage*).
- **Dosage Strength:** Specifies the amount per unit (e.g., 500 mg, 10 mg/5 mL).
- **Batch No. & Manufacturing Date (Mfg):** Identifies the production run for safety traceabilities.
- **Expiration Date (Exp):** Do not consume medicines past the final day of the indicated month. Chemical stability and sterility degrade after expiry.
- **Storage Instructions:** Symbols like "Store below 25°C" or "Protect from light" are vital. Storing pills in a steamy bathroom cabinet can reduce effectiveness.
- **Warning Symbols:** In India and many countries, a "Red Vertical Line" (Schedule H / H1) indicates the drug must strictly be sold only with a valid prescription.

*If you are unsure of any warning on the package insert, ask your licensed dispensing pharmacist.*`,
    responseHi: `**दवा के पैकेट और लीफलेट को पढ़ने का सही तरीका:**

- **सॉल्ट / जेनेरिक नाम:** ब्रांड नाम के ठीक नीचे लिखा होता है (जैसे 'पैरासिटामोल')। हमेशा सक्रिय सॉल्ट पर ध्यान दें।
- **खुराक और स्ट्रेंथ:** प्रति गोली या चम्मच दवा की मात्रा (जैसे 500 mg या 10 mg)।
- **एक्सपायरी डेट (Exp Date):** एक्सपायरी तारीख के बाद दवा का असर खत्म हो सकता है और वह नुकसानदायक हो सकती है। इसे कभी न लें।
- **स्टोरेज (रख-रखाव):** पैकेज पर लिखा होता है कि दवा को '25°C से कम तापमान पर रखें' या 'धूप से बचाएं'। फ्रिज में केवल वही दवाएं रखें जिन पर स्पष्ट निर्देश हो।
- **लाल लकीर (Red Line):** दवा के स्ट्रिप पर लाल लकीर का मतलब है कि यह 'शेड्यूल H' दवा है और इसे बिना डॉक्टर के पर्चे के नहीं लेना चाहिए।

*किसी भी संकोच की स्थिति में अपने फार्मासिस्ट से पूछें।*`,
    category: 'leaflets',
    referenceLink: {
      label: 'WHO Guidelines on Medicine Packaging and Labeling',
      url: 'https://www.who.int/teams/health-product-policy-and-standards'
    }
  },
  {
    keywords: ['missed', 'forgot', 'dose', 'skip', 'double', 'भूल', 'डोज', 'छूट', 'दवा छूट गई'],
    questionEn: 'What should I do if I forget or miss a dose of medication?',
    questionHi: 'यदि मेरी दवा की कोई खुराक (डोज) छूट जाए तो मुझे क्या करना चाहिए?',
    responseEn: `**General Protocol for a Missed Medication Dose:**

1. **Never Take a Double Dose:** Do not take two pills at once to compensate for a missed dose. Doubling up can cause acute toxicity or severe adverse side effects.
2. **Check the Time Window:** 
   - If you remember shortly after the scheduled time, take the prescribed dose.
   - If it is already close to the time for your next scheduled dose, skip the missed dose completely and continue your normal schedule.
3. **Specific Medication Rules:** 
   - For antibiotics: Taking doses at evenly spaced intervals is vital to maintain blood antibiotic levels.
   - For blood pressure & diabetes drugs: Abruptly taking extra doses can cause severe hypotension or hypoglycemia.
4. **Consult When in Doubt:** Call your clinic or pharmacist if you miss multiple doses or miss time-sensitive medications (like insulin, blood thinners, or oral contraceptives).`,
    responseHi: `**दवा की खुराक छूटने पर क्या करें:**

1. **कभी भी डबल डोज न लें:** छूटी हुई खुराक की भरपाई के लिए एक साथ दो गोलियां कभी न खाएं। यह खतरनाक हो सकता है।
2. **समय का ध्यान रखें:**
   - यदि निर्धारित समय के कुछ ही देर बाद याद आए, तो खुराक ले लें।
   - यदि अगली खुराक का समय नजदीक आ गया है, तो छूटी हुई खुराक को छोड़ दें और अपनी नियमित समय सारिणी जारी रखें।
3. **एंटीबायोटिक और बीपी की दवाएं:** इन दवाओं में समय का विशेष महत्व होता है। गलती से अतिरिक्त मात्रा न लें।
4. **संदेह होने पर:** तुरंत अपने डॉक्टर या फार्मासिस्ट से फोन पर सलाह लें।`,
    category: 'missed_dose',
    referenceLink: {
      label: 'NHS UK: What should I do if I miss a dose of my medicine?',
      url: 'https://www.nhs.uk/medicines/'
    }
  },
  {
    keywords: ['store', 'storage', 'bathroom', 'fridge', 'temperature', 'रखना', 'फ्रिज', 'तापमान', 'सुरक्षित'],
    questionEn: 'How should medicines be properly stored at home?',
    questionHi: 'घरों में दवाओं को सुरक्षित रूप से कैसे स्टोर करना चाहिए?',
    responseEn: `**Safe Medication Storage Principles:**

- **Avoid Bathroom Medicine Cabinets:** Moisture, humidity, and heat from showers accelerate the chemical breakdown of tablets and capsules.
- **Room Temperature Range:** Standard room temperature means 15°C to 25°C (59°F to 77°F). Choose a high, cool, dry cabinet away from direct sunlight and radiators.
- **Refrigeration Rules:** Only refrigerate medications explicitly labeled "Store at 2°C to 8°C" or "Refrigerate, do not freeze" (such as unopened insulins or reconstituted liquid antibiotics).
- **Child & Pet Safety:** Keep all medications out of reach and sight, preferably in a locked drawer or high cabinet.
- **Original Containers:** Keep pills in their original blister packs or bottles with original desiccants (silica gel packets) to prevent moisture damage.`,
    responseHi: `**दवाओं के सही रख-रखाव के नियम:**

- **बाथरूम में दवाएं न रखें:** नहाने की भाप और नमी से गोलियां खराब हो सकती हैं।
- **सामान्य तापमान:** ज्यादातर दवाओं को 15°C से 25°C के सूखे और ठंडे स्थान पर रखना चाहिए, जहां सीधी धूप न आती हो।
- **फ्रिज में रखने के नियम:** केवल उन्हीं दवाओं को फ्रिज में रखें जिन पर स्पष्ट लिखा हो (जैसे इंसुलिन)। उन्हें फ्रीजर में जमने न दें।
- **बच्चों और पालतू जानवरों की पहुंच से दूर:** दवाओं को हमेशा ऊंचाई पर या सुरक्षित अलमारी में रखें।
- **मूल डिब्बे या पत्ते में रखें:** दवाओं को उनके मूल पैकेजिंग में ही रखें ताकि नाम और एक्सपायरी डेट हमेशा स्पष्ट रहे।`,
    category: 'storage',
    referenceLink: {
      label: 'CDC: Safe Medicine Storage Guidelines',
      url: 'https://www.cdc.gov/patientsafety/features/safe-medicine-storage.html'
    }
  },
  {
    keywords: ['medical', 'terms', 'terminology', 'rx', 'bid', 'tid', 'qd', 'prn', 'शब्दावली', 'संकेत', 'प्रिस्क्रिप्शन'],
    questionEn: 'What do common medical prescription abbreviations like Rx, BID, TID, PRN mean?',
    questionHi: 'डॉक्टर की पर्ची पर लिखे Rx, BID, TID, PRN जैसे संकेतों का क्या अर्थ होता है?',
    responseEn: `**Prescription Abbreviations Decoded:**

- **Rx:** Prescription / Treatment plan (derived from the Latin *recipe*, meaning "take thou").
- **OD / QD:** Once daily (*omne in die*).
- **BD / BID:** Twice a day (*bis in die*), typically spaced roughly 12 hours apart.
- **TDS / TID:** Three times a day (*ter in die*), typically spaced roughly 8 hours apart.
- **QID:** Four times a day (*quater in die*).
- **PRN:** As needed (*pro re nata*) — only when specific symptoms like pain or fever occur.
- **AC:** Before meals (*ante cibum*).
- **PC:** After meals (*post cibum*).
- **HS:** At bedtime (*hora somni*).
- **PO:** By mouth / orally (*per os*).

*Note: Modern medical best practice encourages doctors to write out instructions in plain language to prevent medication errors.*`,
    responseHi: `**प्रिस्क्रिप्शन के मुख्य संकेताक्षर और उनके अर्थ:**

- **Rx:** डॉक्टर का उपचार निर्देश (नुस्खा)।
- **OD:** दिन में एक बार।
- **BD / BID:** दिन में दो बार (लगभग 12-12 घंटे के अंतर पर)।
- **TDS / TID:** दिन में तीन बार (लगभग 8-8 घंटे के अंतर पर)।
- **PRN:** आवश्यकता पड़ने पर (जैसे बहुत तेज दर्द या बुखार होने पर ही)।
- **AC:** भोजन से पहले (खाली पेट)।
- **PC:** भोजन के बाद।
- **HS:** रात को सोते समय।

*नोट: किसी भी संशय की स्थिति में दवा शुरू करने से पहले डॉक्टर से स्पष्ट कराएं।*`,
    category: 'terminology',
    referenceLink: {
      label: 'ISMP: Institute for Safe Medication Practices',
      url: 'https://www.ismp.org/recommendations/error-prone-abbreviations-list'
    }
  }
];

export const INITIAL_CONVERSATION_EN = [
  {
    id: 'msg-1',
    sender: 'assistant' as const,
    content: `Hello! I am your **CuraGuide Healthcare Assistant**.

I can help explain common pharmaceutical terms, show you how to read medicine packaging labels, clarify the difference between generic and brand-name drugs, and provide safe storage guidance.

> **Safety Notice:** I am an automated informational assistant for educational and demonstration purposes. I am **not** a licensed doctor and cannot diagnose illnesses, prescribe medication, or adjust your treatments. In medical emergencies, contact emergency services immediately.`,
    timestamp: 'Just now',
    language: 'en' as const,
    suggestedFollowUps: [
      'What is the difference between generic and brand medicines?',
      'How do I safely read a medicine leaflet and expiry date?',
      'What should I do if I missed a dose of medicine?',
      'What do prescription abbreviations like Rx, BID, TID mean?'
    ]
  }
];

export const INITIAL_CONVERSATION_HI = [
  {
    id: 'msg-1-hi',
    sender: 'assistant' as const,
    content: `नमस्ते! मैं आपका **क्यूरागाइड (CuraGuide) स्वास्थ्य सहायक** हूँ।

मैं दवाओं के पत्तों पर लिखे निर्देशों को समझने, जेनेरिक व ब्रांडेड दवाओं के अंतर, छूटी हुई खुराक के सामान्य नियमों और दवाओं के सुरक्षित रख-रखाव से जुड़ी जानकारी देने में आपकी मदद कर सकता हूँ।

> **सुरक्षा सूचना:** यह सहायक केवल शैक्षिक और सूचनात्मक उद्देश्य के लिए है। मैं कोई डॉक्टर नहीं हूँ और चिकित्सीय परामर्श, रोग की जांच या दवा लिखने का कार्य नहीं करता। आपातकाल में तुरंत आपातकालीन चिकित्सा सहायता लें।`,
    timestamp: 'अभी',
    language: 'hi' as const,
    suggestedFollowUps: [
      'जेनेरिक और ब्रांडेड दवाओं में क्या अंतर होता है?',
      'दवा के पैकेट और लीफलेट को सही तरीके से कैसे पढ़ें?',
      'यदि मेरी दवा की खुराक छूट जाए तो क्या करना चाहिए?',
      'डॉक्टर की पर्ची पर लिखे Rx, BID, TID का क्या अर्थ है?'
    ]
  }
];
