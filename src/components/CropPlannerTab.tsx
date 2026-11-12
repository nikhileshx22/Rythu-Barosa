import React, { useState } from 'react';
import {
  Calendar,
  Droplets,
  DollarSign,
  TrendingUp,
  Volume2,
  CheckCircle2,
  Clock,
  Sparkles,
  Calculator,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { CropInfo, Language, Season, SoilType } from '../types';
import { cropsList } from '../data/cropsData';
import { VoiceService } from '../utils/speech';
import { getT } from '../translations';

interface CropPlannerTabProps {
  language: Language;
  localityName: string;
}

export const CropPlannerTab: React.FC<CropPlannerTabProps> = ({ language, localityName }) => {
  const [selectedSeason, setSelectedSeason] = useState<Season>('kharif');
  const [selectedSoil, setSelectedSoil] = useState<SoilType | 'all'>('all');
  const [farmAcres, setFarmAcres] = useState<number>(2);
  const [selectedCropModal, setSelectedCropModal] = useState<CropInfo | null>(null);

  const t = getT(language);

  // Filter crops by season & soil
  const filteredCrops = cropsList.filter((crop) => {
    const matchesSeason = crop.season.includes(selectedSeason);
    const matchesSoil = selectedSoil === 'all' || crop.suitableSoils.includes(selectedSoil);
    return matchesSeason && matchesSoil;
  });

  const handleSpeakCrop = (crop: CropInfo) => {
    const speech =
      language === 'te'
        ? `${crop.name.te}. విత్తే సమయం: ${crop.sowingWindow.te}. ఎకరాకు పెట్టుబడి సుమారు ₹${crop.investmentPerAcre.toLocaleString('en-IN')}, అంచనా లాభం ₹${crop.estimatedProfitPerAcre.toLocaleString('en-IN')}. మంచి రకాలు: ${crop.bestVarieties.join(', ')}. నేల సలహా: ${crop.localSoilAdvice.te}.`
        : language === 'hi'
        ? `${crop.name.hi}। बुवाई समय: ${crop.sowingWindow.hi}। प्रति एकड़ लागत ₹${crop.investmentPerAcre.toLocaleString('en-IN')} व अनुमानित लाभ ₹${crop.estimatedProfitPerAcre.toLocaleString('en-IN')}। उन्नत किस्में: ${crop.bestVarieties.join(', ')}।`
        : `${crop.name.en}. Sowing window: ${crop.sowingWindow.en}. Investment per acre is ₹${crop.investmentPerAcre.toLocaleString('en-IN')} with estimated profit of ₹${crop.estimatedProfitPerAcre.toLocaleString('en-IN')}. Best varieties: ${crop.bestVarieties.join(', ')}.`;

    VoiceService.speak(speech, language);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* Title & Season Selection Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-emerald-700" />
              <span>{t('planner.title')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              {t('planner.subtitle')} ({localityName})
            </p>
          </div>

          {/* Land Acreage Profit Multiplier */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl px-3.5 py-2">
            <Calculator className="w-4 h-4 text-emerald-800 shrink-0" />
            <span className="text-xs font-bold text-emerald-950">
              {language === 'te' ? 'మీ భూమి విస్తీర్ణం:' : language === 'hi' ? 'खेत का क्षेत्रफल:' : 'Farm Size:'}
            </span>
            <input
              type="number"
              min={0.5}
              max={100}
              step={0.5}
              value={farmAcres}
              onChange={(e) => setFarmAcres(Math.max(0.5, parseFloat(e.target.value) || 1))}
              className="w-16 bg-white border border-emerald-300 rounded-lg px-2 py-1 text-xs font-bold text-stone-900 text-center outline-none"
            />
            <span className="text-xs font-bold text-emerald-800">
              {language === 'te' ? 'ఎకరాలు' : language === 'hi' ? 'एकड़' : 'Acres'}
            </span>
          </div>
        </div>

        {/* Season Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-stone-100 rounded-2xl">
          <button
            onClick={() => setSelectedSeason('kharif')}
            className={`py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 shadow-xs ${
              selectedSeason === 'kharif'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
            }`}
          >
            <span>🌧️</span>
            <span>{t('common.kharif')}</span>
          </button>

          <button
            onClick={() => setSelectedSeason('rabi')}
            className={`py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 shadow-xs ${
              selectedSeason === 'rabi'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
            }`}
          >
            <span>❄️</span>
            <span>{t('common.rabi')}</span>
          </button>

          <button
            onClick={() => setSelectedSeason('summer')}
            className={`py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 shadow-xs ${
              selectedSeason === 'summer'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
            }`}
          >
            <span>☀️</span>
            <span>{t('common.summer')}</span>
          </button>
        </div>

        {/* Soil Type Filter Pills */}
        <div className="flex items-center flex-wrap gap-2 pt-1">
          <span className="text-xs font-bold text-stone-500 mr-1">
            {t('planner.filterBySoil')}:
          </span>
          {[
            { id: 'all', label: t('planner.allSoils') },
            { id: 'black', label: t('common.blackSoil') },
            { id: 'red', label: t('common.redSoil') },
            { id: 'alluvial', label: t('common.alluvialSoil') },
            { id: 'sandy_loam', label: t('common.sandySoil') },
          ].map((soil) => (
            <button
              key={soil.id}
              onClick={() => setSelectedSoil(soil.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedSoil === soil.id
                  ? 'bg-amber-400 text-emerald-950 border-amber-500 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
            >
              {soil.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Crops Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrops.map((crop) => {
          const totalProfitForFarm = Math.round(crop.estimatedProfitPerAcre * farmAcres);
          const totalInvestmentForFarm = Math.round(crop.investmentPerAcre * farmAcres);

          return (
            <div
              key={crop.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative h-44 overflow-hidden bg-stone-100">
                <img
                  src={crop.image}
                  alt={crop.name[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-emerald-900/90 text-amber-300 backdrop-blur-xs text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-700/60">
                    {crop.durationDays} {t('common.days')}
                  </span>
                  {crop.msp ? (
                    <span className="bg-amber-400 text-emerald-950 text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      MSP: ₹{crop.msp}
                    </span>
                  ) : null}
                </div>

                <button
                  onClick={() => handleSpeakCrop(crop)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-emerald-900 flex items-center justify-center shadow-md transition"
                  title="Listen crop advice"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-black text-lg text-white drop-shadow-sm">
                    {crop.name[language]}
                  </h3>
                  <p className="text-[11px] text-amber-200 italic font-medium">
                    {crop.scientificName}
                  </p>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                {/* Investment vs Profit Calculator for the Farmer's acres */}
                <div className="bg-emerald-50/80 rounded-2xl p-3 border border-emerald-200/80">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-stone-600 font-medium">
                      {farmAcres} {language === 'te' ? 'ఎకరాలకు ఖర్చు' : language === 'hi' ? 'एकड़ में लागत' : 'Acres Cost'}:
                    </span>
                    <span className="font-bold text-stone-900">
                      ₹{totalInvestmentForFarm.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-emerald-900 font-bold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-700" />
                      <span>{language === 'te' ? 'అంచనా నికర లాభం' : language === 'hi' ? 'अनुमानित शुद्ध लाभ' : 'Estimated Profit'}:</span>
                    </span>
                    <span className="font-black text-base text-emerald-700">
                      ₹{totalProfitForFarm.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Sowing window & high yield varieties */}
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex items-start gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-stone-900">{t('planner.sowingWindow')}:</strong>{' '}
                      {crop.sowingWindow[language]}
                    </span>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-stone-900">{t('common.waterNeeds')}:</strong>{' '}
                      <span className="capitalize font-semibold">{crop.waterRequirement}</span> |{' '}
                      <strong className="text-stone-900">{t('planner.expectedYield')}:</strong>{' '}
                      {crop.expectedYieldPerAcre}
                    </span>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-stone-900">{t('planner.varieties')}:</strong>{' '}
                      {crop.bestVarieties.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>

                {/* View Details Modal Trigger */}
                <button
                  onClick={() => setSelectedCropModal(crop)}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>{t('common.viewDetails')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCrops.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200">
          <p className="text-stone-500 text-sm">
            {language === 'te'
              ? 'ఎంచుకున్న నేల మరియు సీజన్‌కు అనువైన పంటలు లేవు. దయచేసి "అన్ని నేలలు" ఎంచుకోండి.'
              : language === 'hi'
              ? 'इस मिट्टी व मौसम के लिए कोई फसल नहीं मिली। कृपया "सभी मिट्टियां" चुनें।'
              : 'No crops match this soil & season combination. Please select "All Soils".'}
          </p>
        </div>
      )}

      {/* Comprehensive Crop Details Modal */}
      {selectedCropModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full">
                  {selectedCropModal.scientificName}
                </span>
                <h2 className="text-xl font-black text-stone-900 mt-1">
                  {selectedCropModal.name[language]}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCropModal(null)}
                className="text-stone-400 hover:text-stone-800 p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-stone-800">
              {/* Soil Advice */}
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <h4 className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                  <span>🌱 {t('planner.soilAdvice')}</span>
                </h4>
                <p className="leading-relaxed">{selectedCropModal.localSoilAdvice[language]}</p>
              </div>

              {/* Irrigation */}
              <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-blue-950 mb-1 flex items-center gap-1.5">
                  <span>💧 {language === 'te' ? 'నీటి యాజమాన్యం & డ్రిప్ పద్ధతి' : language === 'hi' ? 'सिंचाई व ड्रिप तकनीक' : 'Irrigation & Drip Advice'}</span>
                </h4>
                <p className="leading-relaxed text-blue-900">{selectedCropModal.irrigationTips[language]}</p>
              </div>

              {/* Fertilizer & Spray schedule */}
              <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200">
                <h4 className="font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                  <span>🧪 {t('planner.fertilizerTips')}</span>
                </h4>
                <p className="leading-relaxed text-amber-900">{selectedCropModal.fertilizerSchedule[language]}</p>
              </div>

              {/* Varieties */}
              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 mb-1.5 flex items-center gap-1.5">
                  <span>🌾 {t('planner.varieties')}</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCropModal.bestVarieties.map((v, i) => (
                    <span
                      key={i}
                      className="bg-white border border-emerald-300 text-emerald-950 px-2.5 py-1 rounded-lg text-xs font-bold"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              <button
                onClick={() => handleSpeakCrop(selectedCropModal)}
                className="flex items-center gap-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-3.5 py-2 rounded-xl text-xs font-bold transition"
              >
                <Volume2 className="w-4 h-4" />
                <span>{t('common.speak')}</span>
              </button>
              <button
                onClick={() => setSelectedCropModal(null)}
                className="bg-stone-900 hover:bg-black text-white px-5 py-2 rounded-xl text-xs font-bold transition"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
