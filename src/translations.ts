import { Language } from './types';

export const translations = {
  appTitle: {
    te: 'రైతు సేవ - రైతు మిత్ర',
    en: 'RythuSeva - Raithu Mithra',
    hi: 'रैतु सेवा - किसान मित्र',
  },
  appTagline: {
    te: 'రైతన్నల స్మార్ట్ వ్యవసాయ సలహాదారు',
    en: 'Smart Farmhouse Assistant for Indian Farmers',
    hi: 'भारतीय किसानों का स्मार्ट कृषि सलाहकार',
  },
  nav: {
    home: { te: 'హోమ్', en: 'Home', hi: 'होम' },
    planner: { te: 'పంట ప్రణాళిక', en: 'Crop Planner', hi: 'फसल योजना' },
    doctor: { te: 'మొక్కల డాక్టర్', en: 'Plant Doctor', hi: 'पौधा डॉक्टर' },
    weather: { te: 'వాతావరణం & హెచ్చరికలు', en: 'Weather & Alerts', hi: 'मौसम और अलर्ट' },
    market: { te: 'మార్కెట్ & దళారులు', en: 'Market & Renders', hi: 'मंडी व बिचौलिए' },
    schemes: { te: 'సబ్సిడీలు & పథకాలు', en: 'Govt Schemes', hi: 'सरकारी योजनाएं' },
  },
  common: {
    offlineMode: { te: 'ఆఫ్‌లైన్ మోడ్', en: 'Offline Mode', hi: 'ऑफलाइन मोड' },
    online: { te: 'ఆన్‌లైన్', en: 'Online', hi: 'ऑनलाइन' },
    offline: { te: 'ఆఫ్‌లైన్ (సిగ్నల్ లేదు)', en: 'Offline (No Signal)', hi: 'ऑफलाइन (सिग्नल नहीं)' },
    voiceAssistant: { te: 'వాయిస్ సహాయం', en: 'Voice Assistant', hi: 'वॉइस असिस्टेंट' },
    speak: { te: 'వినండి (చదవండి)', en: 'Listen Audio', hi: 'ऑडियो सुनें' },
    stopVoice: { te: 'ఆపండి', en: 'Stop Audio', hi: 'ऑडियो रोकें' },
    selectDistrict: { te: 'మీ ప్రాంతం / జిల్లా', en: 'Your Locality / District', hi: 'आपका क्षेत्र / जिला' },
    kharif: { te: 'ఖరీఫ్ (వర్షాకాలం)', en: 'Kharif (Monsoon)', hi: 'खरीफ (मानसून)' },
    rabi: { te: 'రబీ (శీతాకాలం)', en: 'Rabi (Winter)', hi: 'रबी (सर्दियां)' },
    summer: { te: 'ఎండకాలం (జైద్)', en: 'Summer (Zaid)', hi: 'जायद (गर्मी)' },
    blackSoil: { te: 'నల్ల రేగడి నేల', en: 'Black Cotton Soil', hi: 'काली मिट्टी' },
    redSoil: { te: 'ఎర్ర నేల (చెల్క)', en: 'Red Loamy Soil', hi: 'लाल दोमट मिट्टी' },
    alluvialSoil: { te: 'ఒండ్రు నేల', en: 'Alluvial Soil', hi: 'जलोढ़ मिट्टी' },
    sandySoil: { te: 'ఇసుక నేల', en: 'Sandy Loam', hi: 'बलुई दोमट' },
    rupees: { te: 'రూ.', en: '₹', hi: 'रु.' },
    perAcre: { te: 'ఎకరాకు', en: 'per acre', hi: 'प्रति एकड़' },
    estimatedProfit: { te: 'అంచనా లాభం', en: 'Estimated Profit', hi: 'अनुमानित लाभ' },
    investment: { te: 'పెట్టుబడి', en: 'Investment', hi: 'लागत' },
    duration: { te: 'కాలపరిమితి', en: 'Duration', hi: 'अवधि' },
    waterNeeds: { te: 'నీటి అవసరం', en: 'Water Need', hi: 'पानी की आवश्यकता' },
    days: { te: 'రోజులు', en: 'days', hi: 'दिन' },
    viewDetails: { te: 'వివరాలు చూడండి', en: 'View Details', hi: 'विवरण देखें' },
    close: { te: 'మూసివేయి', en: 'Close', hi: 'बंद करें' },
    search: { te: 'వెతకండి...', en: 'Search...', hi: 'खोजें...' },
    callHelpline: { te: 'హెల్ప్‌లైన్‌కు కాల్ చేయండి', en: 'Call Helpline', hi: 'हेल्पलाइन पर कॉल करें' },
  },
  home: {
    greeting: {
      te: 'రైతు సోదరులకు నమస్కారం! 🙏',
      en: 'Welcome, Respected Farmer! 🙏',
      hi: 'किसान भाइयों को सादर प्रणाम! 🙏',
    },
    subtitle: {
      te: 'మీ వ్యవసాయ క్షేత్రానికి ఆధునిక సమాచారం మరియు సహాయం',
      en: 'Real-time farm advisory, market intelligence, and disease care',
      hi: 'आपकी खेती के लिए वास्तविक समय सलाह, बाजार भाव और फसल देखभाल',
    },
    rainAlertTitle: {
      te: 'ముఖ్యమైన వర్షపు హెచ్చరిక!',
      en: 'Important Rain Warning Alert!',
      hi: 'महत्वपूर्ण बारिश की चेतावनी!',
    },
    quickActions: {
      te: 'త్వరిత సేవలు',
      en: 'Quick Farm Services',
      hi: 'त्वरित सेवाएं',
    },
    diagnosePlant: {
      te: 'చేనులో ఫోటో తీసి రోగాన్ని కనుగొనండి',
      en: 'Take Photo & Detect Crop Disease',
      hi: 'खेत में फोटो लेकर रोग पहचानें',
    },
    checkRenderCut: {
      te: 'దళారుల కమీషన్ & అసలు రైతు రేటు తెలుసుకోండి',
      en: 'Check Mandi Render Margins & True Rate',
      hi: 'बिचौलियों का मार्जिन और सही किसान रेट जानें',
    },
    latestSchemesBanner: {
      te: 'వైఎస్సార్ రైతు భరోసా & పీఎం కిసాన్ తాజా వాయిదా విడుదల వివరాలు',
      en: 'AP Raithu Bharosa & PM-KISAN Latest Installment Updates',
      hi: 'पीएम किसान और राज्य सहायता की ताजा किस्त व योजनाएं',
    },
    todayPrices: {
      te: 'ఈరోజు స్థానిక మార్కెట్ ధరలు',
      en: "Today's Local Mandi Prices",
      hi: 'आज के स्थानीय मंडी भाव',
    },
  },
  planner: {
    title: { te: 'సీజన్ల వారీగా పంట ప్రణాళిక', en: 'Seasonwise Crop Planner', hi: 'मौसम अनुसार फसल योजना' },
    subtitle: {
      te: 'మీ నేల రకం మరియు సీజన్‌కు అనువైన అత్యధిక లాభసాటి పంటను ఎంచుకోండి',
      en: 'Find high-profit crops tailored to your season, soil type, and locality',
      hi: 'अपने मौसम और मिट्टी के अनुसार सबसे अधिक लाभदायक फसल चुनें',
    },
    filterBySeason: { te: 'సీజన్ ఎంచుకోండి', en: 'Select Season', hi: 'मौसम चुनें' },
    filterBySoil: { te: 'నేల రకం', en: 'Soil Type', hi: 'मिट्टी का प्रकार' },
    allSoils: { te: 'అన్ని నేలలు', en: 'All Soil Types', hi: 'सभी मिट्टियां' },
    sowingWindow: { te: 'విత్తే సమయం', en: 'Sowing Window', hi: 'बुवाई का समय' },
    harvestingWindow: { te: 'కోత సమయం', en: 'Harvesting', hi: 'कटाई का समय' },
    varieties: { te: 'మంచి దిగుబడినిచ్చే రకాలు', en: 'High-Yield Varieties', hi: 'उन्नत किस्में' },
    soilAdvice: { te: 'నేల సలహా & జాగ్రత్తలు', en: 'Soil Preparation Advice', hi: 'मिट्टी तैयारी सलाह' },
    fertilizerTips: { te: 'ఎరువులు & పిచికారీ', en: 'Fertilizer & Spray', hi: 'खाद और छिड़काव' },
    expectedYield: { te: 'ఎకరాకు దిగుబడి', en: 'Expected Yield / Acre', hi: 'प्रति एकड़ पैदावार' },
  },
  doctor: {
    title: { te: 'మొక్కల ఆరోగ్య ట్రాకర్ (ఏఐ డాక్టర్)', en: 'Plant Health Tracker & AI Doctor', hi: 'पौधा स्वास्थ्य व एआई डॉक्टर' },
    subtitle: {
      te: 'మీ పంట ఆకు లేదా పురుగు ఫోటో తీయండి - క్షణాల్లో రోగ నిర్ధారణ, ఆర్గానిక్ మరియు రసాయన మందుల మోతాదు తెలుసుకోండి',
      en: 'Upload or capture crop leaf photo to identify diseases, pests, and exact treatments',
      hi: 'फसल की पत्ती या कीट का फोटो लें - तुरंत रोग पहचान, जैविक व रासायनिक उपचार जानें',
    },
    takePhoto: { te: 'కెమెరాతో ఫోటో తీయండి', en: 'Take Photo with Camera', hi: 'कैमरे से फोटो लें' },
    uploadPhoto: { te: 'గ్యాలరీ నుండి అప్‌లోడ్ చేయండి', en: 'Upload from Gallery', hi: 'गैलरी से अपलोड करें' },
    selectSample: { te: 'లేదా ఉదాహరణ పంటల ఫోటోను ఎంచుకోండి', en: 'Or select a common field sample photo', hi: 'या सामान्य खेत का नमूना फोटो चुनें' },
    analyzing: { te: 'ఏఐ పరిశీలిస్తోంది... దయచేసి వేచి ఉండండి...', en: 'Analyzing crop leaf image with Gemini AI...', hi: 'जेमिनी एआई द्वारा विश्लेषण जारी है...' },
    diseaseFound: { te: 'కనుగొనబడిన తెగులు / పురుగు', en: 'Identified Disease / Pest', hi: 'पहचाना गया रोग / कीट' },
    severity: { te: 'తీవ్రత స్థాయి', en: 'Severity Level', hi: 'तीव्रता का स्तर' },
    organicRemedy: { te: 'సేంద్రీయ / నాటు మందుల చికిత్స', en: 'Organic & Traditional Treatment', hi: 'जैविक व पारंपरिक उपचार' },
    chemicalRemedy: { te: 'యూనివర్సిటీ సిఫార్సు చేసిన రసాయన మందులు', en: 'Recommended Chemical Sprays & Dosage', hi: 'विश्वविद्यालय अनुशंसित दवा व मात्रा' },
    preventiveTips: { te: 'ముందు జాగ్రత్త చర్యలు', en: 'Preventive Measures', hi: 'निवारक उपाय' },
    offlineNotice: {
      te: 'గమనిక: ఇంటర్నెట్ లేనప్పుడు కూడా మా వద్ద ఉన్న అత్యవసర వ్యాధి డైరీ ద్వారా చికిత్స పొందవచ్చు.',
      en: 'Note: Works offline too! Pre-cached emergency plant doctor library available.',
      hi: 'नोट: बिना इंटरनेट भी आपातकालीन फसल रोग पुस्तकालय से उपचार देखें।',
    },
    savedHistory: { te: 'సేవ్ చేసిన చికిత్స చరిత్ర', en: 'Saved Treatment History', hi: 'सहेजा गया उपचार इतिहास' },
  },
  weather: {
    title: { te: '7 రోజుల వాతావరణం & వ్యవసాయ హెచ్చరికలు', en: '7-Day Weather & Agro Alerts', hi: '7 दिवसीय मौसम और कृषि अलर्ट' },
    subtitle: {
      te: 'వర్షపు సూచనలు, గాలి వేగం మరియు పురుగు మందుల పిచికారీ అనుకూలత',
      en: 'Rainfall forecast, humidity, and pesticide spray safety window',
      hi: 'बारिश का पूर्वानुमान, नमी और कीटनाशक छिड़काव का सही समय',
    },
    spraySafe: { te: 'పిచికారీకి అనుకూలం ✅', en: 'Safe to Spray ✅', hi: 'छिड़काव के लिए अनुकूल ✅' },
    sprayCaution: { te: 'జాగ్రత్త అవసరం ⚠️', en: 'Spray with Caution ⚠️', hi: 'सावधानी से छिड़कें ⚠️' },
    sprayUnsafe: { te: 'పిచికారీ చేయవద్దు! వర్షం పడవచ్చు ❌', en: 'Unsafe to Spray! Rain Expected ❌', hi: 'छिड़काव न करें! बारिश का खतरा ❌' },
    rainChance: { te: 'వర్షం పడే అవకాశం', en: 'Rain Probability', hi: 'बारिश की संभावना' },
    humidity: { te: 'గాలిలో తేమ', en: 'Humidity', hi: 'हवा में नमी' },
    windSpeed: { te: 'గాలి వేగం', en: 'Wind Speed', hi: 'हवा की गति' },
    temp: { te: 'ఉష్ణోగ్రత', en: 'Temperature', hi: 'तापमान' },
  },
  market: {
    title: { te: 'మార్కెట్ పారదర్శకత & దళారుల కమీషన్', en: 'Farm-to-Fork Price Transparency & Renders', hi: 'खेत से उपभोक्ता मूल्य पारदर्शिता व बिचौलिए' },
    subtitle: {
      te: 'రైతుకు దక్కేది ఎంత? దళారులు (రెండర్లు) ఎంత నొక్కేస్తున్నారు? వినియోగదారుడు ఎంత కొంటున్నాడు?',
      en: 'How much do farmers receive vs what brokers/renders pocket and what the public pays',
      hi: 'किसान को क्या मिलता है? बिचौलिए कितना मुनाफा कमाते हैं? और जनता किस भाव पर खरीदती है?',
    },
    farmerGets: { te: 'రైతుకు దక్కే రేటు (ఫార్మ్ గేట్)', en: 'Farmer Price (Farm Gate)', hi: 'किसान को मिला भाव' },
    renderCut: { te: 'దళారులు / రెండర్ల కమీషన్', en: 'Render / Middleman Cut', hi: 'बिचौलियों / दलालों का कमीशन' },
    mandiExpenses: { te: 'రవాణా & మార్కెట్ ఫీజు', en: 'Transport & Mandi Fee', hi: 'परिवहन व मंडी शुल्क' },
    rythuBazaarRate: { te: 'రైతు బజార్ డైరెక్ట్ రేటు (లాభదాయకం)', en: 'Rythu Bazaar Direct Price', hi: 'रैतु बाजार सीधा किसान भाव' },
    publicPays: { te: 'ప్రజలు / సూపర్ మార్కెట్ కొనే రేటు', en: 'Public / Retail Price', hi: 'उपभोक्ता / खुदरा भाव' },
    farmerShare: { te: 'వినియోగదారుడి రూపాయిలో రైతు వాటా', en: "Farmer's Share of Consumer Rupee", hi: 'उपभोक्ता के रुपये में किसान का हिस्सा' },
    howToBypass: { te: 'దళారులను ఎలా దాటవేయాలి?', en: 'How to bypass renders & maximize profit?', hi: 'बिचौलियों से कैसे बचें और अधिक लाभ पाएं?' },
    indiaProductionTitle: { te: 'భారతదేశంలో మొత్తం పంట ఉత్పత్తి గణాంకాలు', en: 'All-India Crop Production Statistics', hi: 'अखिल भारतीय फसल उत्पादन आंकड़े' },
    totalIndiaYield: { te: 'భారతదేశ మొత్తం ఉత్పత్తి', en: 'Total India Production', hi: 'भारत का कुल उत्पादन' },
    globalRank: { te: 'ప్రపంచంలో భారత్ స్థానం', en: "India's Global Rank", hi: 'विश्व में भारत का स्थान' },
    topStates: { te: 'అగ్రగామి రాష్ట్రాలు', en: 'Top Producing States', hi: 'शीर्ष उत्पादक राज्य' },
    mspRate: { te: 'కేంద్ర ప్రభుత్వ కనీస మద్దతు ధర (MSP)', en: 'Govt Minimum Support Price (MSP)', hi: 'सरकारी न्यूनतम समर्थन मूल्य (MSP)' },
  },
  schemes: {
    title: { te: 'ప్రభుత్వ సబ్సిడీలు & రైతు సంక్షేమ పథకాలు', en: 'Government Subsidies & Schemes', hi: 'सरकारी सब्सिडी और किसान योजनाएं' },
    subtitle: {
      te: 'ఆంధ్రప్రదేశ్ మరియు కేంద్ర ప్రభుత్వ తాజా రైతు పథకాలు, దరఖాస్తు విధానం మరియు డాక్యుమెంట్లు',
      en: 'Latest Andhra Pradesh & Central Government farmer welfare schemes, eligibility, and helpline',
      hi: 'आंध्र प्रदेश व केंद्र सरकार की नवीनतम योजनाएं, पात्रता, आवश्यक दस्तावेज व हेल्पलाइन',
    },
    allSchemes: { te: 'అన్ని పథకాలు', en: 'All Schemes', hi: 'सभी योजनाएं' },
    apSchemes: { te: 'ఏపీ రాష్ట్ర పథకాలు', en: 'Andhra Pradesh Schemes', hi: 'एपी राज्य योजनाएं' },
    centralSchemes: { te: 'కేంద్ర ప్రభుత్వ పథకాలు', en: 'Central Govt Schemes', hi: 'केंद्र सरकार योजनाएं' },
    benefit: { te: 'లభించే ఆర్థిక సహాయం', en: 'Financial Assistance', hi: 'वित्तीय सहायता' },
    eligibility: { te: 'ఎవరు అర్హులు?', en: 'Eligibility Criteria', hi: 'पात्रता' },
    documentsNeeded: { te: 'కావలసిన పత్రాలు', en: 'Required Documents', hi: 'आवश्यक दस्तावेज' },
    applySteps: { te: 'దరఖాస్తు చేసుకునే విధానం', en: 'How to Apply', hi: 'आवेदन कैसे करें' },
  },
};

export const getT = (lang: Language) => {
  return (keyPath: string): string => {
    const parts = keyPath.split('.');
    let curr: any = translations;
    for (const part of parts) {
      if (curr[part] !== undefined) {
        curr = curr[part];
      } else {
        return keyPath;
      }
    }
    if (curr && typeof curr === 'object' && curr[lang] !== undefined) {
      return curr[lang];
    }
    return typeof curr === 'string' ? curr : keyPath;
  };
};
