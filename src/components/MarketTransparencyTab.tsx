import React, { useState } from 'react';
import {
  Scale,
  TrendingUp,
  BarChart3,
  Globe2,
  AlertTriangle,
  Volume2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Store,
  Truck,
  Percent,
  Layers,
} from 'lucide-react';
import { Language, PriceBreakdownItem, IndiaCropProduction } from '../types';
import { marketPriceBreakdowns } from '../data/marketTransparencyData';
import { indiaCropProductions } from '../data/indiaProductionData';
import { VoiceService } from '../utils/speech';
import { getT } from '../translations';

interface MarketTransparencyTabProps {
  language: Language;
  localityName: string;
}

export const MarketTransparencyTab: React.FC<MarketTransparencyTabProps> = ({
  language,
  localityName,
}) => {
  const [subView, setSubView] = useState<'renders' | 'india_production'>('renders');
  const [selectedCropId, setSelectedCropId] = useState<string>('tomato');
  const [selectedProductionCropId, setSelectedProductionCropId] = useState<string>('chilli');

  const t = getT(language);

  const selectedItem: PriceBreakdownItem =
    marketPriceBreakdowns.find((m) => m.id === selectedCropId) || marketPriceBreakdowns[0];

  const selectedProduction: IndiaCropProduction =
    indiaCropProductions.find((c) => c.cropId === selectedProductionCropId) || indiaCropProductions[0];

  const handleSpeakPriceTransparency = () => {
    const textToSpeak =
      language === 'te'
        ? `${selectedItem.cropName.te} ధరల వివరాలు. రైతుకు లభించే ఫార్మ్ గేట్ ధర కేజీకి ₹${selectedItem.farmGatePrice}. దళారులు మరియు రెండర్ల కమీషన్ ₹${selectedItem.renderCut}. రైతు బజార్ డైరెక్ట్ ధర ₹${selectedItem.rythuBazaarPrice}. ప్రజలు కొనే సూపర్ మార్కెట్ ధర ₹${selectedItem.retailConsumerPrice}. వినియోగదారుడి రూపాయిలో రైతుకు దక్కేది కేవలం ${selectedItem.farmerSharePercent} శాతం మాత్రమే. చిట్కా: ${selectedItem.howToAvoidRendersTip.te}.`
        : language === 'hi'
        ? `${selectedItem.cropName.hi} का मूल्य विश्लेषण। किसान को मिलता है ₹${selectedItem.farmGatePrice} प्रति किलो। बिचौलिए व दलाल काटते हैं ₹${selectedItem.renderCut}। रैतु बाजार सीधा भाव ₹${selectedItem.rythuBazaarPrice} और जनता खरीदती है ₹${selectedItem.retailConsumerPrice} में। उपभोक्ता के रुपये में किसान का हिस्सा केवल ${selectedItem.farmerSharePercent}% है।`
        : `Price value chain for ${selectedItem.cropName.en}. Farmer gets ₹${selectedItem.farmGatePrice}/${selectedItem.unit}. Middleman render cut is ₹${selectedItem.renderCut}. Rythu Bazaar direct rate is ₹${selectedItem.rythuBazaarPrice}, while public pays ₹${selectedItem.retailConsumerPrice}. Farmer share is only ${selectedItem.farmerSharePercent}%. Advice: ${selectedItem.howToAvoidRendersTip.en}.`;

    VoiceService.speak(textToSpeak, language);
  };

  const handleSpeakIndiaProduction = () => {
    const textToSpeak =
      language === 'te'
        ? `భారతదేశంలో ${selectedProduction.cropName.te} మొత్తం వార్షిక ఉత్పత్తి ${selectedProduction.totalProductionLakhTonnes} లక్షల టన్నులు. ప్రపంచంలో భారతదేశం స్థానం నంబర్ ${selectedProduction.globalRank}. అగ్రగామి రాష్ట్రం ${selectedProduction.topStates[0]?.stateName.te} ${selectedProduction.topStates[0]?.sharePercent} శాతంతో మొదటి స్థానంలో ఉంది.`
        : language === 'hi'
        ? `भारत में ${selectedProduction.cropName.hi} का कुल वार्षिक उत्पादन ${selectedProduction.totalProductionLakhTonnes} लाख टन है। विश्व में भारत का स्थान #${selectedProduction.globalRank} है। शीर्ष राज्य ${selectedProduction.topStates[0]?.stateName.hi} (${selectedProduction.topStates[0]?.sharePercent}%) है।`
        : `Total India production of ${selectedProduction.cropName.en} is ${selectedProduction.totalProductionLakhTonnes} Lakh Tonnes. India ranks #${selectedProduction.globalRank} globally with ${selectedProduction.indiaGlobalSharePercent}% global share. Leading state: ${selectedProduction.topStates[0]?.stateName.en} (${selectedProduction.topStates[0]?.sharePercent}%).`;

    VoiceService.speak(textToSpeak, language);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* View Switcher: Renders Value Chain vs India Production Stats */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
            <Scale className="w-6 h-6 text-emerald-700" />
            <span>
              {subView === 'renders'
                ? t('market.title')
                : t('market.indiaProductionTitle')}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            {subView === 'renders'
              ? t('market.subtitle')
              : language === 'te'
              ? 'దేశవ్యాప్తంగా ఉత్పత్తి, ఆంధ్రప్రదేశ్ & తెలంగాణ వాటా మరియు ప్రపంచ స్థానం'
              : language === 'hi'
              ? 'देशभर में उत्पादन, राज्यों की हिस्सेदारी और विश्व रैंकिंग'
              : 'National crop statistics, state contributions, and global ranks'}
          </p>
        </div>

        {/* Big Switcher Toggle */}
        <div className="flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200 self-stretch sm:self-auto">
          <button
            onClick={() => setSubView('renders')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              subView === 'renders'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{language === 'te' ? 'దళారులు & ధరలు' : language === 'hi' ? 'दलाल व मंडी भाव' : 'Renders & Prices'}</span>
          </button>

          <button
            onClick={() => setSubView('india_production')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              subView === 'india_production'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>{language === 'te' ? 'భారతదేశ మొత్తం ఉత్పత్తి' : language === 'hi' ? 'अखिल भारत उत्पादन' : 'India Production'}</span>
          </button>
        </div>
      </div>

      {subView === 'renders' ? (
        /* =================== 1. VALUE CHAIN & RENDERS BREAKDOWN =================== */
        <div className="space-y-6">
          {/* Vegetable & Fruit Picker Bar */}
          <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
            {marketPriceBreakdowns.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCropId(item.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                  selectedCropId === item.id
                    ? 'bg-amber-400 text-emerald-950 border-amber-500 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {item.cropName[language]}
              </button>
            ))}
          </div>

          {/* Main Visual Value Chain Analysis */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  {selectedItem.localMandiName}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  {selectedItem.cropName[language]} ({language === 'te' ? 'విలువ గొలుసు' : language === 'hi' ? 'मूल्य विश्लेषण' : 'Value Chain Breakdown'})
                </h2>
              </div>

              <button
                onClick={handleSpeakPriceTransparency}
                className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4 text-amber-300" />
                <span>{t('common.speak')}</span>
              </button>
            </div>

            {/* 5-Step Value Chain Pipeline from Farm to Consumer */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Step 1: Farm Gate (What farmer gets) */}
              <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-400 text-center relative overflow-hidden shadow-xs">
                <div className="text-[11px] font-bold uppercase text-emerald-800 mb-1">
                  1. {t('market.farmerGets')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-900">
                  ₹{selectedItem.farmGatePrice}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold">
                  per {selectedItem.unit}
                </div>
                <div className="mt-2 text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  {selectedItem.farmerSharePercent}% {language === 'te' ? 'రైతు వాటా' : language === 'hi' ? 'किसान हिस्सा' : 'Share'}
                </div>
              </div>

              {/* Step 2: Render Cut (What broker/middleman takes) */}
              <div className="bg-red-50 rounded-2xl p-4 border-2 border-red-300 text-center shadow-xs">
                <div className="text-[11px] font-bold uppercase text-red-800 mb-1">
                  2. {t('market.renderCut')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-red-700">
                  ₹{selectedItem.renderCut}
                </div>
                <div className="text-[11px] text-red-600 font-semibold">
                  {language === 'te' ? 'కమీషన్ & తరుగు' : language === 'hi' ? 'कमीशन व कट' : 'Brokerage / cut'}
                </div>
                <div className="mt-2 text-[10px] bg-red-200 text-red-900 px-2 py-0.5 rounded font-bold">
                  {selectedItem.renderMarginPercent}% {language === 'te' ? 'దళారి వాటా' : language === 'hi' ? 'बिचौलिया' : 'Cut'}
                </div>
              </div>

              {/* Step 3: Transport & Mandi Cess */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-center">
                <div className="text-[11px] font-bold uppercase text-stone-600 mb-1">
                  3. {t('market.mandiExpenses')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-700">
                  ₹{selectedItem.mandiFeeAndTransport}
                </div>
                <div className="text-[11px] text-stone-500 font-semibold">
                  {language === 'te' ? 'డీజిల్ & మార్కెట్ సెస్' : language === 'hi' ? 'भाड़ा व टैक्स' : 'Freight & Cess'}
                </div>
                <div className="mt-2 text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-bold">
                  Wholesale: ₹{selectedItem.wholesaleMandiPrice}
                </div>
              </div>

              {/* Step 4: Rythu Bazaar Direct Price (The Best Alternative!) */}
              <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-400 text-center shadow-xs relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-emerald-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                  ⭐ {language === 'te' ? 'సిఫార్సు చేయబడింది' : language === 'hi' ? 'सर्वोत्तम विकल्प' : 'Best Route'}
                </span>
                <div className="text-[11px] font-bold uppercase text-amber-900 mb-1 mt-1">
                  4. {t('market.rythuBazaarRate')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-900">
                  ₹{selectedItem.rythuBazaarPrice}
                </div>
                <div className="text-[11px] text-amber-800 font-semibold">
                  {language === 'te' ? 'దళారులు లేరు' : language === 'hi' ? 'शून्य दलाली' : '0% Render Cut'}
                </div>
                <div className="mt-2 text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-black">
                  +₹{selectedItem.rythuBazaarPrice - selectedItem.farmGatePrice} {language === 'te' ? 'అధిక లాభం' : language === 'hi' ? 'ज्यादा मुनाफा' : 'Extra / kg'}
                </div>
              </div>

              {/* Step 5: Retail Price Paid by Public */}
              <div className="bg-stone-900 text-white rounded-2xl p-4 border-2 border-stone-800 text-center shadow-md">
                <div className="text-[11px] font-bold uppercase text-stone-300 mb-1">
                  5. {t('market.publicPays')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  ₹{selectedItem.retailConsumerPrice}
                </div>
                <div className="text-[11px] text-stone-300 font-semibold">
                  {language === 'te' ? 'నగర వినియోగదారుడు' : language === 'hi' ? 'उपभोक्ता भाव' : 'Consumer Pays'}
                </div>
                <div className="mt-2 text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded font-bold">
                  100% {language === 'te' ? 'మొత్తం విలువ' : language === 'hi' ? 'कुल मूल्य' : 'Consumer Rupee'}
                </div>
              </div>
            </div>

            {/* Visual Consumer Rupee Stacked Bar */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 font-bold">
                <span className="text-stone-800">
                  {language === 'te'
                    ? 'వినియోగదారుడు చెల్లించే ప్రతి ₹100 లో ఎవరికి ఎంత దక్కుతోంది?'
                    : language === 'hi'
                    ? 'उपभोक्ता द्वारा चुकाए गए प्रत्येक ₹100 में किसको क्या मिलता है?'
                    : 'Where does each ₹100 paid by the consumer go?'}
                </span>
                <span className="text-emerald-900 font-black">
                  {language === 'te' ? 'రైతు వాటా:' : language === 'hi' ? 'किसान का हिस्सा:' : "Farmer's share:"} {selectedItem.farmerSharePercent}%
                </span>
              </div>

              <div className="h-6 w-full bg-stone-200 rounded-xl overflow-hidden flex shadow-inner">
                <div
                  className="bg-emerald-600 h-full flex items-center justify-center text-[10px] text-white font-black"
                  style={{ width: `${selectedItem.farmerSharePercent}%` }}
                  title="Farmer Share"
                >
                  {selectedItem.farmerSharePercent}%
                </div>
                <div
                  className="bg-red-500 h-full flex items-center justify-center text-[10px] text-white font-black"
                  style={{ width: `${selectedItem.renderMarginPercent}%` }}
                  title="Render Cut"
                >
                  {selectedItem.renderMarginPercent}%
                </div>
                <div
                  className="bg-stone-400 h-full flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ width: `${12}%` }}
                  title="Transport & Mandi Fee"
                >
                  12%
                </div>
                <div
                  className="bg-amber-400 h-full flex items-center justify-center text-[10px] text-stone-900 font-black"
                  style={{ width: `${100 - selectedItem.farmerSharePercent - selectedItem.renderMarginPercent - 12}%` }}
                  title="Retailer Margin"
                >
                  {100 - selectedItem.farmerSharePercent - selectedItem.renderMarginPercent - 12}%
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-600 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>{t('market.farmerGets')} ({selectedItem.farmerSharePercent}%)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>{t('market.renderCut')} ({selectedItem.renderMarginPercent}%)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
                  <span>{t('market.mandiExpenses')} (12%)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>{language === 'te' ? 'రిటైలర్ మార్జిన్' : language === 'hi' ? 'दुकानदार मार्जिन' : 'Retail Markup'}</span>
                </span>
              </div>
            </div>

            {/* How to bypass renders and get 80%+ share */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-5 border border-emerald-700 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                  💡
                </div>
                <h3 className="font-bold text-base text-amber-200">
                  {t('market.howToBypass')}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {selectedItem.howToAvoidRendersTip[language]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="bg-emerald-950/70 p-2.5 rounded-xl border border-emerald-700/70">
                  <p className="font-bold text-amber-300 mb-0.5">1. Rythu Bazaar Direct</p>
                  <p className="text-emerald-200 text-[11px]">
                    {language === 'te'
                      ? 'రైతు బజార్ ఐడీ కార్డుతో మధ్యవర్తి లేకుండా పూర్తి డబ్బు మీకే'
                      : language === 'hi'
                      ? 'रैतु बाजार में किसान कार्ड से 100% नकद लाभ'
                      : 'Eliminate middlemen completely at Rythu Bazaars'}
                  </p>
                </div>

                <div className="bg-emerald-950/70 p-2.5 rounded-xl border border-emerald-700/70">
                  <p className="font-bold text-amber-300 mb-0.5">2. e-NAM Digital Bidding</p>
                  <p className="text-emerald-200 text-[11px]">
                    {language === 'te'
                      ? 'ఆన్‌లైన్ ద్వారా దేశవ్యాప్త వ్యాపారులకు పోటీ ధరలలో విక్రయం'
                      : language === 'hi'
                      ? 'ई-नाम पर देशभर के खरीदारों से प्रतिस्पर्धी बोली'
                      : 'Transparent online bidding on e-NAM platform'}
                  </p>
                </div>

                <div className="bg-emerald-950/70 p-2.5 rounded-xl border border-emerald-700/70">
                  <p className="font-bold text-amber-300 mb-0.5">3. FPO Collective Bargain</p>
                  <p className="text-emerald-200 text-[11px]">
                    {language === 'te'
                      ? 'రైతుల సంఘంగా ఏర్పడి నగర సూపర్‌మార్కెట్లతో ప్రత్యక్ష ఒప్పందం'
                      : language === 'hi'
                      ? 'एफपीओ समूह बनाकर सीधे थोक अनुबंध'
                      : 'Direct bulk contracts with processors and city retail'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =================== 2. ALL-INDIA CROP PRODUCTION STATISTICS =================== */
        <div className="space-y-6">
          {/* Crop Selector Bar */}
          <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
            {indiaCropProductions.map((crop) => (
              <button
                key={crop.cropId}
                onClick={() => setSelectedProductionCropId(crop.cropId)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                  selectedProductionCropId === crop.cropId
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {crop.cropName[language]}
              </button>
            ))}
          </div>

          {/* National Overview Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                  {t('market.indiaProductionTitle')}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  {selectedProduction.cropName[language]} - {language === 'te' ? 'భారతదేశ గణాంకాలు' : language === 'hi' ? 'भारत के आंकड़े' : 'All-India Production Metrics'}
                </h2>
              </div>

              <button
                onClick={handleSpeakIndiaProduction}
                className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4 text-amber-300" />
                <span>{t('common.speak')}</span>
              </button>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-center">
                <p className="text-[11px] text-emerald-800 font-bold uppercase">
                  {t('market.totalIndiaYield')}
                </p>
                <p className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
                  {selectedProduction.totalProductionLakhTonnes}
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  {language === 'te' ? 'లక్షల టన్నులు' : language === 'hi' ? 'लाख टन' : 'Lakh Tonnes'}
                </p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-center">
                <p className="text-[11px] text-amber-800 font-bold uppercase">
                  {t('market.globalRank')}
                </p>
                <p className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
                  #{selectedProduction.globalRank}
                </p>
                <p className="text-[11px] text-amber-700 font-semibold">
                  {selectedProduction.indiaGlobalSharePercent}% {language === 'te' ? 'ప్రపంచ వాటా' : language === 'hi' ? 'विश्व का हिस्सा' : 'Global Share'}
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 text-center">
                <p className="text-[11px] text-blue-800 font-bold uppercase">
                  {language === 'te' ? 'సాగు విస్తీర్ణం' : language === 'hi' ? 'बुवाई का रकबा' : 'Cultivated Area'}
                </p>
                <p className="text-xl sm:text-2xl font-black text-blue-950 mt-1">
                  {selectedProduction.cultivatedAreaLakhHectares}
                </p>
                <p className="text-[11px] text-blue-700 font-semibold">
                  {language === 'te' ? 'లక్షల హెక్టార్లు' : language === 'hi' ? 'लाख हेक्टेयर' : 'Lakh Hectares'}
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-center">
                <p className="text-[11px] text-stone-600 font-bold uppercase">
                  {language === 'te' ? 'వార్షిక ఎగుమతులు' : language === 'hi' ? 'वार्षिक निर्यात' : 'Annual Exports'}
                </p>
                <p className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  ₹{selectedProduction.annualExportValueCrores.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-stone-500 font-semibold">
                  {language === 'te' ? 'కోట్లు' : language === 'hi' ? 'करोड़ रुपये' : 'Crores'}
                </p>
              </div>
            </div>

            {/* Top Producing States with Visual Progress Bars */}
            <div className="space-y-4">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-700" />
                <span>
                  {selectedProduction.cropName[language]} - {t('market.topStates')} ({language === 'te' ? 'రాష్ట్రాల వాటా' : language === 'hi' ? 'राज्यों का हिस्सा' : 'State Production Share'})
                </span>
              </h3>

              <div className="space-y-3">
                {selectedProduction.topStates.map((state, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition ${
                      state.isLocalState
                        ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-200'
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5">
                      <span className="flex items-center gap-2 text-stone-900">
                        <span>{state.stateName[language]}</span>
                        {state.isLocalState && (
                          <span className="text-[10px] bg-amber-400 text-emerald-950 px-2 py-0.5 rounded font-black">
                            📍 {language === 'te' ? 'మన ప్రాంతం' : language === 'hi' ? 'स्थानीय' : 'Local'}
                          </span>
                        )}
                      </span>
                      <span className="text-stone-900">
                        {state.sharePercent}% ({state.productionLakhTonnes} {language === 'te' ? 'లక్షల టన్నులు' : language === 'hi' ? 'लाख टन' : 'Lakh T'})
                      </span>
                    </div>

                    <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          state.isLocalState ? 'bg-amber-500' : 'bg-emerald-700'
                        }`}
                        style={{ width: `${Math.min(100, state.sharePercent * 2)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MSP comparison banner if applicable */}
            {selectedProduction.msp2025 > 0 && (
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>{t('market.mspRate')} (2024-2026)</span>
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {language === 'te'
                      ? 'కేంద్ర ప్రభుత్వం ప్రకటించిన గ్యారంటీ కనీస మద్దతు ధర'
                      : language === 'hi'
                      ? 'केंद्र सरकार द्वारा घोषित न्यूनतम समर्थन मूल्य'
                      : 'Govt guaranteed baseline floor price per quintal'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black text-emerald-950">
                    ₹{selectedProduction.msp2025}
                  </span>
                  <span className="text-xs text-emerald-700 block">/ Quintal</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
