import { GovtScheme } from '../types';

export const govtSchemesList: GovtScheme[] = [
  {
    id: 'raithu_bharosa',
    title: {
      te: 'వైఎస్సార్ రైతు భరోసా - పీఎం కిసాన్',
      en: 'AP Raithu Bharosa - PM KISAN',
      hi: 'एपी रैतु भरोसा - पीएम किसान',
    },
    subtitle: {
      te: 'రైతు కుటుంబాలకు ఏటా రూ.13,500 ఆర్థిక సాయం (కౌలు రైతులతో సహా)',
      en: 'Annual financial aid of ₹13,500 per farmer family including tenant farmers',
      hi: 'प्रति किसान परिवार ₹13,500 वार्षिक वित्तीय सहायता (बटाईदार किसानों सहित)',
    },
    type: 'ap_state',
    category: 'direct_benefit',
    financialBenefit: {
      te: 'సంవత్సరానికి రూ.13,500 (3 విడతల్లో: ఖరీఫ్ విత్తేముందు రూ.7,500, పంట కోత సమయంలో రూ.4,000, సంక్రాంతికి రూ.2,000). ఎస్సీ, ఎస్టీ, బీసీ, మైనారిటీ కౌలు రైతులకు రాష్ట్ర ప్రభుత్వం మొత్తం రూ.13,500 అందిస్తుంది.',
      en: '₹13,500 per year paid in 3 installments (May Kharif sowing ₹7,500, Oct/Nov harvest ₹4,000, Jan Sankranti ₹2,000). 100% borne by AP Govt for SC/ST/BC/Minority tenant farmers.',
      hi: 'प्रति वर्ष ₹13,500 तीन किस्तों में (मई ₹7500, अक्टूबर ₹4000, जनवरी संक्रांति ₹2000)। बटाईदार किसानों के लिए राज्य सरकार पूरा वहन करती है।',
    },
    eligibility: [
      {
        te: 'ఆంధ్రప్రదేశ్‌లోని పట్టాదారు పాస్‌బుక్ కలిగిన అన్ని చిన్న, సన్నకారు రైతు కుటుంబాలు.',
        en: 'All small and marginal landholding farmer families with valid Pattadar Passbook.',
        hi: 'वैध पट्टा पासबुक वाले सभी छोटे और सीमांत किसान परिवार।',
      },
      {
        te: 'సీసీఆర్‌సీ (CCRC) ఒప్పందం కలిగిన ఎస్సీ, ఎస్టీ, బీసీ, మైనారిటీ కౌలు రైతులు (భూమి లేని కౌలుదారులు).',
        en: 'SC, ST, BC, and Minority tenant farmers holding valid CCRC (Crop Cultivator Rights Card).',
        hi: 'वैध सीसीआरसी कार्ड धारक अनुसूचित जाति/जनजाति, पिछड़ा वर्ग बटाईदार।',
      },
      {
        te: 'సంబంధిత సీజన్‌లో గ్రామ సచివాలయంలో ఈ-క్రాప్ (e-Crop / e-Panta) నమోదు పూర్తి చేయాలి.',
        en: 'Mandatory e-Crop (e-Panta) digital verification at local Village Secretariat / RBK.',
        hi: 'स्थानीय ग्राम सचिवालय / आरबीके पर ई-क्रॉप बुकिंग अनिवार्य।',
      },
    ],
    requiredDocuments: [
      { te: 'పట్టాదారు పాస్‌బుక్ / 1-బి రికార్డు నకలు', en: 'Pattadar Passbook / 1-B Adangal Copy', hi: 'पट्टा पासबुक / 1-B नकल' },
      { te: 'రైతు & కుటుంబ సభ్యుల ఆధార్ కార్డులు', en: 'Aadhaar Cards of Farmer & Family', hi: 'आधार कार्ड' },
      { te: 'ఆధార్ లింక్ అయిన బ్యాంక్ సేవింగ్స్ ఖాతా పాస్‌బుక్', en: 'Aadhaar-seeded Active Bank Account Passbook', hi: 'आधार लिंक बैंक पासबुक' },
      { te: 'కౌలు రైతులకు: సీసీఆర్‌సీ (CCRC) కార్డ్', en: 'For Tenant Farmers: CCRC Landowner Agreement Card', hi: 'बटाईदारों के लिए CCRC कार्ड' },
    ],
    howToApply: [
      {
        te: '1. గ్రామ సచివాలయం లేదా రైతు సేవా కేంద్రం (RBK) వద్ద గ్రామ వ్యవసాయ సహాయకుడిని (VAA) సంప్రదించండి.',
        en: '1. Visit your local Village Secretariat / Rythu Seva Kendram (RBK) and meet Village Agriculture Assistant (VAA).',
        hi: '1. स्थानीय ग्राम सचिवालय या रैतु सेवा केंद्र (RBK) पर ग्राम कृषि सहायक से मिलें।',
      },
      {
        te: '2. గ్రామ సచివాలయంలో ప్రదర్శించిన అర్హుల జాబితాలో మీ పేరు సరిచూసుకోండి.',
        en: '2. Check your name in the social audit eligible list displayed at the RBK.',
        hi: '2. आरबीके में प्रदर्शित पात्र किसानों की सूची में अपना नाम जांचें।',
      },
      {
        te: '3. ఈ-కేవైసీ (e-KYC) వేలిముద్ర లేదా ఐరిస్ లేదా ఓటీపీ ద్వారా ధృవీకరించండి.',
        en: '3. Complete biometric e-KYC via fingerprint / iris scan at the RBK portal.',
        hi: '3. बायोमेट्रिक ई-केवाईसी पूरा करें।',
      },
    ],
    deadlineOrSchedule: {
      te: 'ఖరీఫ్ మొదటి విడత ప్రతి సంవత్సరం మే/జూన్ నెలల్లో నేరుగా డీబీటీ ద్వారా జమవుతుంది.',
      en: 'Kharif Installment disbursed annually in May/June directly via Aadhaar DBT.',
      hi: 'खरीफ की पहली किस्त प्रतिवर्ष मई/जून में सीधे बैंक खाते में जमा।',
    },
    portalUrl: 'https://ysrrythubharosa.ap.gov.in',
    helpline: '1902 (AP CM Grievance) / 155251',
    badge: { te: 'ఏపీ ఫ్లాగ్‌షిప్ పథకం', en: 'AP Flagship Scheme', hi: 'एपी प्रमुख योजना' },
    isActive: true,
  },
  {
    id: 'pm_kisan',
    title: {
      te: 'పీఎం కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
      en: 'PM-KISAN Samman Nidhi',
      hi: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
    },
    subtitle: {
      te: 'కేంద్ర ప్రభుత్వం నుండి ప్రతి 4 నెలలకు రూ.2,000 చొప్పున ఏటా రూ.6,000 జమ',
      en: '₹6,000 per year directly from Central Govt in 3 equal installments of ₹2,000',
      hi: 'केंद्र सरकार से ₹2,000 की 3 किस्तों में प्रति वर्ष ₹6,000 सीधे खाते में',
    },
    type: 'central',
    category: 'direct_benefit',
    financialBenefit: {
      te: 'సంవత్సరానికి రూ.6,000 నేరుగా బ్యాంక్ ఖాతాలో (ఏప్రిల్-జూలై, ఆగస్టు-నవంబర్, డిసెంబర్-మార్చిలలో ఒక్కో విడత రూ.2,000).',
      en: '₹6,000 annually paid in 3 four-monthly cycles of ₹2,000 each via DBT.',
      hi: '₹6,000 प्रति वर्ष तीन किस्तों (प्रत्येक ₹2,000) में प्रत्यक्ष लाभ अंतरण (DBT) द्वारा।',
    },
    eligibility: [
      {
        te: 'సాగుభూమి ఉన్న అన్ని రైతు కుటుంబాలు (సంస్థాగత భూములు, ప్రభుత్వ ఉద్యోగులు, రూ.10,000 పైబడి పెన్షన్ ఉన్నవారు మినహా).',
        en: 'All landholding farmer families across India (excluding institutional landholders and income taxpayers).',
        hi: 'खेती योग्य भूमि वाले सभी किसान परिवार (आयकर दाता अपवर्जित)।',
      },
      {
        te: 'పీఎం కిసాన్ పోర్టల్‌లో ల్యాండ్ సీడింగ్ (భూమి వివరాలు) మరియు ఈ-కేవైసీ తప్పనిసరిగా పూర్తి చేసి ఉండాలి.',
        en: 'Land record seeding and Aadhaar biometric e-KYC must be active.',
        hi: 'भूमि रिकॉर्ड सीडिंग और ई-केवाईसी अनिवार्य रूप से पूर्ण।',
      },
    ],
    requiredDocuments: [
      { te: 'ఆధార్ కార్డు', en: 'Aadhaar Card', hi: 'आधार कार्ड' },
      { te: 'భూమి పట్టాదారు పాస్‌బుక్ / ఖస్రా-ఖతౌనీ రికార్డు', en: 'Land Ownership Document / RoR / 1-B', hi: 'भूमि स्वामित्व दस्तावेज (खतौनी)' },
      { te: 'డీబీటీ యాక్టివేట్ అయిన బ్యాంక్ ఖాతా', en: 'Aadhaar NPCI-linked Bank Account', hi: 'एनपीसीआई लिंक बैंक खाता' },
    ],
    howToApply: [
      {
        te: '1. pmkisan.gov.in పోర్టల్‌లో ‘New Farmer Registration’ ద్వారా మీరే ఆన్‌లైన్‌లో నమోదు చేసుకోవచ్చు.',
        en: '1. Self-register online via pmkisan.gov.in under "New Farmer Registration" or via CSC Center.',
        hi: '1. pmkisan.gov.in पोर्टल पर "न्यू फार्मर रजिस्ट्रेशन" या सीएससी से आवेदन करें।',
      },
      {
        te: '2. ఓటీపీ లేదా బయోమెట్రిక్ ద్వారా ఈ-కేవైసీ పూర్తి చేయండి.',
        en: '2. Complete Aadhaar OTP or Biometric e-KYC on the PM-Kisan mobile app.',
        hi: '2. पीएम-किसान ऐप या वेबसाइट पर ई-केवाईसी पूर्ण करें।',
      },
      {
        te: '3. స్థానిక వ్యవసాయ అధికారి లేదా తహశీల్దార్ ఆమోదం పొందిన వెంటనే వాయిదాలు ప్రారంభమవుతాయి.',
        en: '3. State nodal officer verification initiates direct disbursement into your bank account.',
        hi: '3. सत्यापन के बाद अगली किस्त से भुगतान शुरू।',
      },
    ],
    deadlineOrSchedule: {
      te: 'నిరంతరం దరఖాస్తు చేసుకోవచ్చు; 19వ/20వ వాయిదాలు మార్చి, జూలై, నవంబర్ నెలల్లో విడుదలవుతాయి.',
      en: 'Rolling registration open 24x7; installments released every 4 months.',
      hi: 'वर्ष भर निरंतर खुला; हर 4 महीने पर किस्त जारी।',
    },
    portalUrl: 'https://pmkisan.gov.in',
    helpline: '155261 / 1800-115-526 / 011-23381092',
    badge: { te: 'కేంద్ర ప్రభుత్వ పథకం', en: 'Central Govt Scheme', hi: 'केंद्र सरकार योजना' },
    isActive: true,
  },
  {
    id: 'pmfby_ap_insurance',
    title: {
      te: 'వైఎస్సార్ ఉచిత పంటల బీమా & పీఎంఎఫ్ బీవై (PMFBY)',
      en: 'AP Free Crop Insurance & PMFBY',
      hi: 'निःशुल्क फसल बीमा व पीएमएफबीवाई (PMFBY)',
    },
    subtitle: {
      te: 'రైతుపై ఒక్క రూపాయి భారం లేకుండా ప్రభుత్వమే ప్రీమియం చెల్లించి ప్రకృతి వైపరీత్యాలకు నష్టపరిహారం',
      en: 'Zero-cost crop insurance for farmers in AP: Govt pays 100% premium against drought, flood & pest loss',
      hi: 'किसानों के लिए शून्य प्रीमियम फसल बीमा: बाढ़, सूखा और प्राकृतिक आपदा से पूर्ण सुरक्षा',
    },
    type: 'ap_state',
    category: 'insurance',
    financialBenefit: {
      te: 'తుఫానులు, కరువు, అకాల వర్షాలు, చీడపీడల వల్ల పంట నష్టపోతే ఎకరాకు రూ.15,000 నుండి రూ.40,000 వరకు నేరుగా బ్యాంక్ ఖాతాలో జమ (పంట రకాన్ని బట్టి).',
      en: 'Direct compensation ranging from ₹15,000 to ₹40,000 per acre deposited into bank accounts based on crop cutting experiments (CCE) and automated weather station loss triggers.',
      hi: 'फसल खराब होने पर ₹15,000 से ₹40,000 प्रति एकड़ तक सीधा मुआवजा बैंक खाते में।',
    },
    eligibility: [
      {
        te: 'ఆంధ్రప్రదేశ్‌లో నోటిఫై చేసిన పంటలను సాగు చేస్తూ ఈ-క్రాప్ (e-Crop) బుకింగ్ చేసుకున్న రైతులందరూ స్వయంచాలకంగా అర్హులు.',
        en: 'All farmers (landowners & tenant farmers) who complete mandatory e-Crop booking at local RBK are automatically enrolled.',
        hi: 'ई-क्रॉप बुकिंग कराने वाले सभी किसान स्वतः बीमित।',
      },
      {
        te: 'రైతు ఎలాంటి అప్లికేషన్ లేదా ప్రీమియం సొంతంగా చెల్లించనక్కర్లేదు (రాష్ట్ర ప్రభుత్వమే చెల్లిస్తుంది).',
        en: 'Farmer pays ₹0 premium; the State and Central Govts bear 100% premium subsidy.',
        hi: 'किसान को कोई प्रीमियम नहीं देना, सरकार पूरा खर्च वहन करती है।',
      },
    ],
    requiredDocuments: [
      { te: 'ఈ-క్రాప్ నమోదు రసీదు (e-Crop Booking Slip)', en: 'e-Crop Digital Booking Acknowledgement', hi: 'ई-क्रॉप डिजिटल पर्ची' },
      { te: 'ఆధార్ కార్డ్', en: 'Aadhaar Card', hi: 'आधार कार्ड' },
      { te: 'పట్టాదారు పాస్‌బుక్ లేదా సీసీఆర్‌సీ కార్డు', en: 'Pattadar Passbook or CCRC Card', hi: 'पट्टा पासबुक या CCRC कार्ड' },
    ],
    howToApply: [
      {
        te: '1. పంట విత్తిన వెంటనే గ్రామ సచివాలయం / ఆర్బీకే అగ్రికల్చర్ అసిస్టెంట్ ద్వారా ఈ-క్రాప్ నమోదు చేయించండి.',
        en: '1. Ensure e-Crop digital booking with geo-tagging through VAA within 30 days of sowing.',
        hi: '1. बुवाई के 30 दिनों में आरबीके से जियो-टैगिंग सहित ई-क्रॉप बुकिंग कराएं।',
      },
      {
        te: '2. గ్రామ సచివాలయంలో పీడీఎఫ్ లిస్టులో మీ పంట విస్తీర్ణం మరియు సర్వే నంబర్ సరిచూడండి.',
        en: '2. Verify survey number and acreage in the social audit list displayed in the village.',
        hi: '2. गांव में प्रकाशित सूची में अपना खसरा/सर्वे नंबर जांचें।',
      },
      {
        te: '3. పంట నష్టం జరిగితే వాతావరణ ఆధారిత మరియు క్రాప్ కట్టింగ్ పరిశీలన ఆధారంగా నేరుగా పరిహారం అందుతుంది.',
        en: '3. Claim settlement is automated based on remote sensing, weather data, and yield loss.',
        hi: '3. नुकसान होने पर सीधे खाते में भुगतान।',
      },
    ],
    deadlineOrSchedule: {
      te: 'ఖరీఫ్ ఈ-క్రాప్ గడువు: సెప్టెంబర్ 30; రబీ ఈ-క్రాప్ గడువు: జనవరి 31.',
      en: 'Kharif e-Crop cut-off: September 30; Rabi cut-off: January 31.',
      hi: 'खरीफ ई-क्रॉप अंतिम तिथि: 30 सितंबर; रबी: 31 जनवरी।',
    },
    portalUrl: 'https://karshak.ap.gov.in',
    helpline: '1800-180-1551 (Kisan Call Centre) / 1902',
    badge: { te: 'ఉచిత పంటల బీమా', en: '100% Free Insurance', hi: 'निःशुल्क बीमा' },
    isActive: true,
  },
  {
    id: 'ysr_sunna_vaddi',
    title: {
      te: 'వైఎస్సార్ సున్నా వడ్డీ పంట రుణాలు (Zero Interest Loans)',
      en: 'YSR Sunna Vaddi Panta Runalu (Zero-Interest Crop Loan)',
      hi: 'वाईएसआर शून्य ब्याज फसल ऋण योजना',
    },
    subtitle: {
      te: 'రూ.1,00,000 వరకు తీసుకున్న పంట రుణాన్ని ఏడాదిలోగా చెల్లిస్తే పూర్తి వడ్డీ మాఫీ',
      en: '100% interest reimbursement on crop loans up to ₹1,00,000 repaid within 12 months',
      hi: '₹1 लाख तक का फसल ऋण समय पर चुकाने पर पूरा ब्याज सरकार द्वारा वापस',
    },
    type: 'ap_state',
    category: 'credit',
    financialBenefit: {
      te: 'రైతు సకాలంలో బ్యాంకుకు అసలు చెల్లిస్తే, బ్యాంకు వసూలు చేసిన 7% లేదా 4% వడ్డీ మొత్తాన్ని నేరుగా రైతు ఖాతాలోకి రీయింబర్స్ చేస్తారు.',
      en: 'Full 100% interest subvention for prompt repayment. The farmer effectively pays 0% interest on agricultural loans up to ₹1 Lakh.',
      hi: 'समय पर ऋण चुकाने पर पूरा 7% या 4% ब्याज सरकार वापस लौटाती है, शुद्ध 0% ब्याज।',
    },
    eligibility: [
      { te: 'సహకార బ్యాంకులు లేదా వాణిజ్య బ్యాంకులలో పంట రుణం తీసుకున్న రైతులు.', en: 'Farmers availing crop loans from DCCBs, PACs, or Commercial Banks.', hi: 'सहकारी या राष्ट्रीयकृत बैंक से फसल ऋण लेने वाले किसान।' },
      { te: 'రుణం తీసుకున్న తేదీ నుండి 12 నెలల లోపు పూర్తి అసలు చెల్లించాలి.', en: 'Must repay total loan amount within 12 months from the date of disbursement.', hi: '12 महीने के भीतर ऋण की अदायगी अनिवार्य।' },
      { te: 'ఈ-క్రాప్ (e-Crop) బుకింగ్ తప్పనిసరి.', en: 'e-Crop verification required for the cropped season.', hi: 'ई-क्रॉप सत्यापन अनिवार्य।' },
    ],
    requiredDocuments: [
      { te: 'బ్యాంక్ లోన్ ఖాతా రసీదు', en: 'Bank Crop Loan Clearance Slip', hi: 'बैंक ऋण चुकता रसीद' },
      { te: 'పట్టాదారు పాస్‌బుక్ / CCRC కార్డు', en: 'Pattadar Passbook or CCRC Card', hi: 'पट्टा पासबुक' },
      { te: 'ఆధార్ కార్డు', en: 'Aadhaar Card', hi: 'आधार कार्ड' },
    ],
    howToApply: [
      {
        te: 'మీరు బ్యాంకులో రుణం పూర్తిగా చెల్లించిన వెంటనే బ్యాంకర్లు జాబితాను ప్రభుత్వ పోర్టల్‌లో అప్‌లోడ్ చేస్తారు. ఆ తర్వాత వడ్డీ సొమ్ము నేరుగా ఖాతాలో జమవుతుంది.',
        en: 'Automated bank data feed: Bank branch submits prompt repayment list directly to agriculture dept for auto-reimbursement.',
        hi: 'बैंक द्वारा सीधे डाटा भेजा जाता है, किसान के खाते में ब्याज सीधे जमा होता है।',
      },
    ],
    deadlineOrSchedule: {
      te: 'ఏటా జూలై - ఆగస్టు నెలల్లో సున్నా వడ్డీ మొత్తాలు జమచేయబడతాయి.',
      en: 'Disbursed annually every July/August.',
      hi: 'प्रतिवर्ष जुलाई-अगस्त में ब्याज वापसी।',
    },
    helpline: '1902 / 1800-425-4440',
    badge: { te: 'సున్నా వడ్డీ', en: '0% Interest Credit', hi: '0% ब्याज' },
    isActive: true,
  },
  {
    id: 'yantra_seva_machinery',
    title: {
      te: 'వైఎస్సార్ యంత్ర సేవ (Farm Mechanization Subsidy)',
      en: 'YSR Yantra Seva - Farm Mechanization Scheme',
      hi: 'कृषि यंत्रीकरण व कस्टम हायरिंग सेंटर योजना',
    },
    subtitle: {
      te: 'ట్రాక్టర్లు, హార్వెస్టర్లు, రోటవేటర్లపై 40% నుండి 50% వరకు ప్రభుత్వం సబ్సిడీ',
      en: '40% subsidy for individual farmers and 50% subsidy for Custom Hiring Centers (CHC) on tractors and harvesters',
      hi: 'ट्रैक्टर, कंबाइन हार्वेस्टर और आधुनिक कृषि यंत्रों पर 40% से 50% तक सब्सिडी',
    },
    type: 'ap_state',
    category: 'machinery',
    financialBenefit: {
      te: 'ట్రాక్టర్‌కు రూ.1.75 లక్షల వరకు సబ్సిడీ; కస్టమ్ హైరింగ్ సెంటర్ల (CHC) గ్రూపులకు రూ.15 లక్షల విలువైన యంత్ర పరికరాలపై రూ.7.5 లక్షల వరకు సబ్సిడీ.',
      en: 'Subsidy up to ₹1.75 Lakhs on tractors; up to ₹7.5 Lakhs (50%) for Custom Hiring Centers operated by farmer groups at Village RBK level.',
      hi: 'ट्रैक्टर पर ₹1.75 लाख तक छूट; किसान समूहों/सीएचसी के लिए 50% तक (₹7.5 लाख तक) की भारी छूट।',
    },
    eligibility: [
      { te: 'రైతు ఉత్పత్తిదారుల గ్రూపులు (CHCs) లేదా వ్యక్తిగత చిన్న, సన్నకారు రైతులు.', en: 'Registered Farmer Producer Groups / RBK Level CHC Groups or small farmers.', hi: 'आरबीके स्तर के किसान समूह या छोटे किसान।' },
      { te: 'రైతు వద్ద తగిన వ్యవసాయ భూమి మరియు డ్రైవింగ్ అర్హత ఉండాలి.', en: 'Active farming background and operational requirement for equipment.', hi: 'सक्रिय खेती का रिकॉर्ड।' },
    ],
    requiredDocuments: [
      { te: 'ఆధార్ కార్డు & పాన్ కార్డు', en: 'Aadhaar Card & PAN Card', hi: 'आधार व पैन कार्ड' },
      { te: 'పట్టాదారు పాస్‌బుక్ / భూమి రికార్డులు', en: 'Pattadar Passbook / Land Document', hi: 'भूमि दस्तावेज' },
      { te: 'బ్యాంక్ లోన్ లేదా మార్జిన్ మనీ డీడీ', en: 'Bank Loan Sanction / Margin Money DD', hi: 'बैंक ऋण स्वीकृति पत्र' },
    ],
    howToApply: [
      {
        te: '1. గ్రామ ఆర్బీకే వద్ద లేదా agricoop.nic.in లో ఆన్‌లైన్ దరఖాస్తు చేయండి.',
        en: '1. Apply at local RBK or via AP Yantra Seva portal with chosen brand and implement.',
        hi: '1. आरबीके या राज्य कृषि पोर्टल पर अपनी पसंद के ब्रांड के साथ ऑनलाइन आवेदन करें।',
      },
      {
        te: '2. మండల వ్యవసాయ అధికారి (MAO) పరిశీలించి వర్క్ ఆర్డర్ మంజూరు చేస్తారు.',
        en: '2. Mandal Agriculture Officer (MAO) scrutinizes and issues Administrative Sanction.',
        hi: '2. कृषि अधिकारी द्वारा जांच और स्वीकृति।',
      },
      {
        te: '3. అధీకృత డీలర్ నుండి యంత్రాన్ని తీసుకుని సబ్సిడీ తీసివేయబడిన ధరకు పొందవచ్చు.',
        en: '3. Collect machinery from authorized dealer after Aadhaar physical verification.',
        hi: '3. अधिकृत डीलर से सब्सिडी कटौती के बाद यंत्र प्राप्त करें।',
      },
    ],
    deadlineOrSchedule: {
      te: 'ఖరీఫ్ సీజన్ ముందు సంవత్సరానికి రెండు విడతల్లో కేటాయింపులు జరుగుతాయి.',
      en: 'Allocations released biannually before Kharif and Rabi.',
      hi: 'खरीफ व रबी से पहले दो चरणों में आवंटन।',
    },
    portalUrl: 'https://yantraseva.ap.gov.in',
    helpline: '1800-425-4440',
    badge: { te: '40-50% సబ్సిడీ', en: '40-50% Subsidy', hi: '40-50% सब्सिडी' },
    isActive: true,
  },
  {
    id: 'pmksy_micro_irrigation',
    title: {
      te: 'ప్రధానమంత్రి కృషి సించాయి యోజన - బిందు సేద్యం (PMKSY Drip)',
      en: 'PMKSY - AP Micro Irrigation Project (APMIP)',
      hi: 'पीएम कृषि सिंचाई योजना - ड्रिप व स्प्रिंकलर सब्सिडी',
    },
    subtitle: {
      te: 'డ్రిప్ మరియు స్ప్రింక్లర్ సెట్లపై ఎస్సీ/ఎస్టీలకు 90%, చిన్న రైతులకు 70% భారీ సబ్సిడీ',
      en: '90% subsidy for SC/ST farmers, 70% for BC & small farmers on Drip and Sprinklers',
      hi: 'अनुसूचित जाति/जनजाति के लिए 90% तथा छोटे किसानों के लिए 70% ड्रिप सब्सिडी',
    },
    type: 'central',
    category: 'irrigation',
    financialBenefit: {
      te: 'ఎకరాకు రూ.40,000 ఖరీదైన డ్రిప్ యూనిట్‌ను ఎస్సీ/ఎస్టీ రైతులు కేవలం రూ.4,000 చెల్లించి పొందవచ్చు (రాయలసీమ, ప్రకాశం రైతులకు గరిష్ట ప్రాధాన్యం).',
      en: 'High-end drip fertigation kit worth ₹40,000/acre available at just ₹4,000 contribution for SC/ST, and ₹12,000 for other small farmers.',
      hi: '₹40,000 का ड्रिप सेट मात्र ₹4,000 में (एससी/एसटी) तथा ₹12,000 में अन्य किसानों को।',
    },
    eligibility: [
      { te: 'బోరు బావి లేదా బావి లేదా కాల్వ నీటి వనరు కలిగి ఉన్న రైతులు.', en: 'Farmers possessing an assured irrigation source (borewell, open well, or lift channel).', hi: 'निश्चित सिंचाई स्रोत (बोरवेल/कुआं) वाले किसान।' },
      { te: 'గరిష్టంగా 5 ఎకరాల వరకు సబ్సిడీ ప్రయోజనం వర్తిస్తుంది.', en: 'Subsidy applicable up to 5 acres per farmer beneficiary.', hi: 'अधिकतम 5 एकड़ तक सब्सिडी मान्य।' },
    ],
    requiredDocuments: [
      { te: 'పట్టాదారు పాస్‌బుక్ & 1-B అడంగల్', en: 'Pattadar Passbook & 1-B Adangal', hi: 'पट्टा पासबुक व 1-बी' },
      { te: 'బోరు బావి ధృవీకరణ పత్రం / కరెంట్ బిల్లు', en: 'Water Source Certificate / Agri Electricity Bill', hi: 'कृषि बिजली बिल / बोरवेल प्रमाणपत्र' },
      { te: 'ఆధార్ కార్డు & రేషన్ కార్డు', en: 'Aadhaar Card & White Ration Card', hi: 'आधार व राशन कार्ड' },
    ],
    howToApply: [
      {
        te: '1. మీ మండల హార్టికల్చర్ అధికారి (HO) లేదా ఆర్బీకే వద్ద డ్రిప్ కంపెనీని (Jain, Netafim, Premier, etc.) ఎంచుకోండి.',
        en: '1. Register at RBK or via APMIP portal selecting your preferred company (Netafim, Jain Irrigation, etc.).',
        hi: '1. आरबीके या उद्यान विभाग में पसंदीदा कंपनी चुनकर आवेदन करें।',
      },
      {
        te: '2. సర్వేయర్ మీ పొలాన్ని పరిశీలించి డ్రిప్ పైపుల కొలతలు నిర్ణయిస్తారు.',
        en: '2. Field engineer visits farm for GPS survey and prepares layout estimate.',
        hi: '2. इंजीनियर द्वारा खेत का जीपीएस सर्वे व पाइपलाइन लेआउट तैयार।',
      },
      {
        te: '3. మీ వాటా సొమ్ము చెల్లించిన 15 రోజుల్లో మీ పొలంలో డ్రిప్ బిగిస్తారు.',
        en: '3. Pay farmer share online; company completes installation within 15 days.',
        hi: '3. किसान अंशदान जमा होने के 15 दिनों में इंस्टालेशन।',
      },
    ],
    deadlineOrSchedule: {
      te: 'సంవత్సరం పొడవునా తెరిచి ఉంటుంది; వేసవి పంటలకు ముందు త్వరితగతిన మంజూరు.',
      en: 'Open round the year across AP & Telangana.',
      hi: 'वर्ष भर आवेदन खुला।',
    },
    portalUrl: 'https://apmip.ap.gov.in',
    helpline: '1800-425-2425',
    badge: { te: '70-90% సబ్సిడీ', en: '70-90% Subsidy', hi: '70-90% सब्सिडी' },
    isActive: true,
  },
];
