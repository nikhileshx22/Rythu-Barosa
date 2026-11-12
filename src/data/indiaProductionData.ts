import { IndiaCropProduction } from '../types';

export const indiaCropProductions: IndiaCropProduction[] = [
  {
    cropId: 'chilli',
    cropName: { te: 'ఎండిన మిరప (Dry Chilli)', en: 'Dry Red Chilli', hi: 'लाल सूखी मिर्च' },
    totalProductionLakhTonnes: 20.5,
    cultivatedAreaLakhHectares: 8.8,
    averageYieldKgPerHectare: 2329,
    globalRank: 1, // India is #1 largest producer & exporter of chilli in the world!
    indiaGlobalSharePercent: 43.5,
    topStates: [
      { stateName: { te: 'ఆంధ్రప్రదేశ్ (#1 స్థానం)', en: 'Andhra Pradesh (#1 Rank)', hi: 'आंध्र प्रदेश (#1)' }, sharePercent: 42.8, productionLakhTonnes: 8.77, isLocalState: true },
      { stateName: { te: 'తెలంగాణ (#2 స్థానం)', en: 'Telangana (#2 Rank)', hi: 'तेलंगाना (#2)' }, sharePercent: 23.4, productionLakhTonnes: 4.8, isLocalState: true },
      { stateName: { te: 'మధ్యప్రదేశ్', en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' }, sharePercent: 12.1, productionLakhTonnes: 2.48 },
      { stateName: { te: 'కర్ణాటక (బ్యాడగి)', en: 'Karnataka (Byadgi)', hi: 'कर्नाटक' }, sharePercent: 10.5, productionLakhTonnes: 2.15 },
      { stateName: { te: 'ఇతర రాష్ట్రాలు', en: 'Other States', hi: 'अन्य राज्य' }, sharePercent: 11.2, productionLakhTonnes: 2.3 },
    ],
    msp2025: 0, // Commercial crop traded via APMC open auction
    mspGrowthPercent: 7.2,
    annualExportValueCrores: 10450,
  },
  {
    cropId: 'paddy',
    cropName: { te: 'వరి / బియ్యం (Rice / Paddy)', en: 'Rice / Paddy', hi: 'धान / चावल' },
    totalProductionLakhTonnes: 1367.0, // ~136.7 Million Tonnes
    cultivatedAreaLakhHectares: 475.0,
    averageYieldKgPerHectare: 2878,
    globalRank: 2, // India is #2 in production and #1 exporter worldwide!
    indiaGlobalSharePercent: 24.2,
    topStates: [
      { stateName: { te: 'పశ్చిమ బెంగాల్', en: 'West Bengal', hi: 'पश्चिम बंगाल' }, sharePercent: 13.5, productionLakhTonnes: 184.5 },
      { stateName: { te: 'ఉత్తరప్రదేశ్', en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' }, sharePercent: 12.1, productionLakhTonnes: 165.4 },
      { stateName: { te: 'పంజాబ్', en: 'Punjab', hi: 'पंजाब' }, sharePercent: 10.3, productionLakhTonnes: 140.8 },
      { stateName: { te: 'తెలంగాణ (#4 స్థానం)', en: 'Telangana (#4 Rank)', hi: 'तेलंगाना (#4)' }, sharePercent: 9.8, productionLakhTonnes: 133.9, isLocalState: true },
      { stateName: { te: 'ఆంధ్రప్రదేశ్ (#5 స్థానం)', en: 'Andhra Pradesh (#5 Rank)', hi: 'आंध्र प्रदेश (#5)' }, sharePercent: 8.9, productionLakhTonnes: 121.6, isLocalState: true },
    ],
    msp2025: 2320, // Grade A MSP per quintal
    mspGrowthPercent: 5.4,
    annualExportValueCrores: 85200,
  },
  {
    cropId: 'cotton',
    cropName: { te: 'పత్తి (Cotton / Kapas)', en: 'Cotton Lint & Kapas', hi: 'कपास (कपास गांठें)' },
    totalProductionLakhTonnes: 325.2, // ~32.5 Million Bales (170kg each)
    cultivatedAreaLakhHectares: 124.0,
    averageYieldKgPerHectare: 446,
    globalRank: 2, // #2 globally after China
    indiaGlobalSharePercent: 23.0,
    topStates: [
      { stateName: { te: 'గుజరాత్ (#1)', en: 'Gujarat (#1)', hi: 'गुजरात (#1)' }, sharePercent: 29.5, productionLakhTonnes: 95.9 },
      { stateName: { te: 'మహారాష్ట్ర (#2)', en: 'Maharashtra (#2)', hi: 'महाराष्ट्र (#2)' }, sharePercent: 24.0, productionLakhTonnes: 78.0 },
      { stateName: { te: 'తెలంగాణ (#3)', en: 'Telangana (#3)', hi: 'तेलंगाना (#3)' }, sharePercent: 17.2, productionLakhTonnes: 55.9, isLocalState: true },
      { stateName: { te: 'ఆంధ్రప్రదేశ్ (#5)', en: 'Andhra Pradesh (#5)', hi: 'आंध्र प्रदेश (#5)' }, sharePercent: 7.8, productionLakhTonnes: 25.3, isLocalState: true },
      { stateName: { te: 'రాజస్థాన్ / హర్యానా', en: 'Rajasthan / Haryana', hi: 'राजस्थान / हरियाणा' }, sharePercent: 12.5, productionLakhTonnes: 40.6 },
    ],
    msp2025: 7521, // Medium staple MSP ₹7122, Long staple ₹7521
    mspGrowthPercent: 7.1,
    annualExportValueCrores: 18400,
  },
  {
    cropId: 'tomato',
    cropName: { te: 'టమాటా (Tomato)', en: 'Fresh Tomato', hi: 'ताजा टमाटर' },
    totalProductionLakhTonnes: 206.9, // ~20.7 Million Tonnes
    cultivatedAreaLakhHectares: 8.5,
    averageYieldKgPerHectare: 24340,
    globalRank: 2, // #2 worldwide after China
    indiaGlobalSharePercent: 11.2,
    topStates: [
      { stateName: { te: 'మధ్యప్రదేశ్ (#1)', en: 'Madhya Pradesh (#1)', hi: 'मध्य प्रदेश (#1)' }, sharePercent: 15.2, productionLakhTonnes: 31.4 },
      { stateName: { te: 'ఆంధ్రప్రదేశ్ (మదనపల్లె #2)', en: 'Andhra Pradesh (Madanapalle #2)', hi: 'आंध्र प्रदेश (#2)' }, sharePercent: 14.8, productionLakhTonnes: 30.6, isLocalState: true },
      { stateName: { te: 'కర్ణాటక (కోలార్)', en: 'Karnataka (Kolar)', hi: 'कर्नाटक' }, sharePercent: 11.0, productionLakhTonnes: 22.7 },
      { stateName: { te: 'ఒడిశా', en: 'Odisha', hi: 'ओडिशा' }, sharePercent: 7.5, productionLakhTonnes: 15.5 },
      { stateName: { te: 'గుజరాత్', en: 'Gujarat', hi: 'गुजरात' }, sharePercent: 7.0, productionLakhTonnes: 14.4 },
    ],
    msp2025: 0,
    mspGrowthPercent: 0,
    annualExportValueCrores: 620,
  },
  {
    cropId: 'mango',
    cropName: { te: 'మామిడి (Mango / Aam)', en: 'Mango (King of Fruits)', hi: 'आम' },
    totalProductionLakhTonnes: 218.0,
    cultivatedAreaLakhHectares: 23.4,
    averageYieldKgPerHectare: 9316,
    globalRank: 1, // India is #1 producer producing nearly 50% of the world's mangoes!
    indiaGlobalSharePercent: 44.8,
    topStates: [
      { stateName: { te: 'ఉత్తరప్రదేశ్ (#1)', en: 'Uttar Pradesh (#1)', hi: 'उत्तर प्रदेश (#1)' }, sharePercent: 23.5, productionLakhTonnes: 51.2 },
      { stateName: { te: 'ఆంధ్రప్రదేశ్ (బంగినపల్లి #2)', en: 'Andhra Pradesh (#2)', hi: 'आंध्र प्रदेश (#2)' }, sharePercent: 21.0, productionLakhTonnes: 45.7, isLocalState: true },
      { stateName: { te: 'కర్ణాటక (అల్ఫోన్సో/తోతాపురి)', en: 'Karnataka', hi: 'कर्नाटक' }, sharePercent: 9.8, productionLakhTonnes: 21.3 },
      { stateName: { te: 'తెలంగాణ', en: 'Telangana', hi: 'तेलंगाना' }, sharePercent: 8.5, productionLakhTonnes: 18.5, isLocalState: true },
      { stateName: { te: 'బీహార్ / గుజరాత్', en: 'Bihar / Gujarat', hi: 'बिहार / गुजरात' }, sharePercent: 14.2, productionLakhTonnes: 30.9 },
    ],
    msp2025: 0,
    mspGrowthPercent: 0,
    annualExportValueCrores: 480,
  },
  {
    cropId: 'groundnut',
    cropName: { te: 'వేరుశనగ (Groundnut / Peanut)', en: 'Groundnut (Peanut)', hi: 'मूंगफली' },
    totalProductionLakhTonnes: 102.5,
    cultivatedAreaLakhHectares: 50.1,
    averageYieldKgPerHectare: 2045,
    globalRank: 2, // #2 globally
    indiaGlobalSharePercent: 19.5,
    topStates: [
      { stateName: { te: 'గుజరాత్ (సౌరాష్ట్ర #1)', en: 'Gujarat (#1)', hi: 'गुजरात (#1)' }, sharePercent: 41.2, productionLakhTonnes: 42.2 },
      { stateName: { te: 'రాజస్థాన్ (#2)', en: 'Rajasthan (#2)', hi: 'राजस्थान (#2)' }, sharePercent: 22.8, productionLakhTonnes: 23.3 },
      { stateName: { te: 'తమిళనాడు', en: 'Tamil Nadu', hi: 'तमिलनाडु' }, sharePercent: 10.1, productionLakhTonnes: 10.3 },
      { stateName: { te: 'ఆంధ్రప్రదేశ్ (రాయలసీమ #4)', en: 'Andhra Pradesh (Rayalaseema #4)', hi: 'आंध्र प्रदेश (#4)' }, sharePercent: 8.7, productionLakhTonnes: 8.9, isLocalState: true },
      { stateName: { te: 'తెలంగాణ / కర్ణాటక', en: 'Telangana / Karnataka', hi: 'तेलंगाना / कर्नाटक' }, sharePercent: 9.2, productionLakhTonnes: 9.4, isLocalState: true },
    ],
    msp2025: 6783,
    mspGrowthPercent: 6.3,
    annualExportValueCrores: 5320,
  },
  {
    cropId: 'bengal_gram',
    cropName: { te: 'శనగలు (Bengal Gram / Chana)', en: 'Bengal Gram (Chickpea)', hi: 'चना' },
    totalProductionLakhTonnes: 122.0,
    cultivatedAreaLakhHectares: 105.0,
    averageYieldKgPerHectare: 1161,
    globalRank: 1, // India produces 70% of world's chickpeas!
    indiaGlobalSharePercent: 68.0,
    topStates: [
      { stateName: { te: 'మధ్యప్రదేశ్ (#1)', en: 'Madhya Pradesh (#1)', hi: 'मध्य प्रदेश (#1)' }, sharePercent: 32.5, productionLakhTonnes: 39.6 },
      { stateName: { te: 'మహారాష్ట్ర (#2)', en: 'Maharashtra (#2)', hi: 'महाराष्ट्र (#2)' }, sharePercent: 24.2, productionLakhTonnes: 29.5 },
      { stateName: { te: 'రాజస్థాన్ (#3)', en: 'Rajasthan (#3)', hi: 'राजस्थान (#3)' }, sharePercent: 17.8, productionLakhTonnes: 21.7 },
      { stateName: { te: 'ఆంధ్రప్రదేశ్ (కర్నూలు/ప్రకాశం #5)', en: 'Andhra Pradesh (#5)', hi: 'आंध्र प्रदेश (#5)' }, sharePercent: 6.8, productionLakhTonnes: 8.3, isLocalState: true },
      { stateName: { te: 'కర్ణాటక', en: 'Karnataka', hi: 'कर्नाटक' }, sharePercent: 7.2, productionLakhTonnes: 8.7 },
    ],
    msp2025: 5650,
    mspGrowthPercent: 4.8,
    annualExportValueCrores: 1980,
  },
];
