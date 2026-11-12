import React from 'react';
import {
  AlertTriangle,
  Camera,
  Scale,
  CloudRain,
  Award,
  PhoneCall,
  Volume2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react';
import { Language, WeatherAlert, WeatherDay } from '../types';
import { marketPriceBreakdowns } from '../data/marketTransparencyData';
import { cropsList } from '../data/cropsData';
import { VoiceService } from '../utils/speech';
import { getT } from '../translations';

interface HomeTabProps {
  language: Language;
  localityName: string;
  weatherAlerts: WeatherAlert[];
  currentWeather: WeatherDay;
  onNavigateTab: (tab: string) => void;
  onOpenVoiceAssistant: () => void;
  isOffline: boolean;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  language,
  localityName,
  weatherAlerts,
  currentWeather,
  onNavigateTab,
  onOpenVoiceAssistant,
  isOffline,
}) => {
  const t = getT(language);

  // Top rain warning alert
  const primaryAlert = weatherAlerts[0];

  const handleReadDailyBriefing = () => {
    const textToRead =
      language === 'te'
        ? `రైతు సోదరులకు నమస్కారం. ${localityName} ప్రాంతంలో ఈరోజు ఉష్ణోగ్రత ${currentWeather.tempMax} డిగ్రీలు. వర్షం పడే అవకాశం ${currentWeather.rainProbability} శాతం. హెచ్చరిక: ${primaryAlert?.title.te}. మార్కెట్ సమాచారం: టమాటా రైతు ధర కేజీకి 14 రూపాయలు, రిటైల్ ధర 45 రూపాయలు. దళారుల కమీషన్ 8 రూపాయలు. ఏపీ రైతు భరోసా, పీఎం కిసాన్ దరఖాస్తుకు ఈ-క్రాప్ నమోదు తప్పనిసరి.`
        : language === 'hi'
        ? `किसान भाइयों को नमस्कार। ${localityName} में आज अधिकतम तापमान ${currentWeather.tempMax} डिग्री है और बारिश की संभावना ${currentWeather.rainProbability} प्रतिशत है। चेतावनी: ${primaryAlert?.title.hi}। टमाटर का किसान भाव ₹14 व बाजार भाव ₹45 है। सरकारी योजनाओं का लाभ लेने के लिए ई-क्रॉप बुकिंग अवश्य कराएं।`
        : `Greetings farmer. In ${localityName}, today's temperature is ${currentWeather.tempMax} Celsius with rain probability of ${currentWeather.rainProbability} percent. Alert: ${primaryAlert?.title.en}. Tomato farm gate price is 14 rupees per kg while public retail price is 45 rupees. Complete e-Crop booking at local RBK for Raithu Bharosa and PM-KISAN.`;

    VoiceService.speak(textToRead, language);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* Welcome & Voice Greeting Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden border border-emerald-700/60">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider bg-amber-400/20 text-amber-300 px-3 py-0.5 rounded-full font-bold border border-amber-300/30">
                📍 {localityName}
              </span>
              {isOffline && (
                <span className="text-xs bg-red-500/20 text-red-200 px-2.5 py-0.5 rounded-full font-semibold border border-red-400/30">
                  {t('common.offlineMode')}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-amber-50 tracking-tight">
              {t('home.greeting')}
            </h1>
            <p className="text-emerald-200 text-sm sm:text-base max-w-2xl">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Action buttons: Listen voice & Voice Assistant */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={handleReadDailyBriefing}
              className="flex items-center gap-2 bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/60 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-50 shadow-md transition-all active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>{language === 'te' ? 'ఈరోజు సమాచారం వినండి' : language === 'hi' ? 'आज का समाचार सुनें' : 'Listen Daily Brief'}</span>
            </button>

            <button
              onClick={onOpenVoiceAssistant}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-emerald-950" />
              <span>{t('common.voiceAssistant')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Critical Rain Warning Banner */}
      {primaryAlert && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-sm">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-md">
                  {t('home.rainAlertTitle')}
                </span>
                <span className="text-xs font-semibold text-stone-600">
                  ⏱️ {primaryAlert.validTill}
                </span>
              </div>
              <h2 className="font-bold text-stone-900 text-base sm:text-lg">
                {primaryAlert.title[language]}
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {primaryAlert.message[language]}
              </p>
              <div className="bg-amber-100/80 rounded-lg px-3 py-1.5 text-xs font-semibold text-amber-950 border border-amber-300/80 inline-block">
                ⚡ {language === 'te' ? 'చేయవలసిన పని' : language === 'hi' ? 'जरूरी कार्रवाई' : 'Action Required'}: {primaryAlert.actionRequired[language]}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={() => VoiceService.speak(primaryAlert.message[language], language)}
              className="flex items-center gap-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-2 rounded-xl text-xs font-bold transition border border-amber-300"
              title="Listen Alert"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t('common.speak')}</span>
            </button>
            <button
              onClick={() => onNavigateTab('weather')}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <span>{t('common.viewDetails')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4 Big Main Services Grid for Farmers */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
          <span>🚜 {t('home.quickActions')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Plant Health Doctor */}
          <div
            onClick={() => onNavigateTab('doctor')}
            className="bg-white hover:bg-emerald-50/50 border-2 border-emerald-200 hover:border-emerald-500 rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">
                {t('nav.doctor')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                {t('home.diagnosePlant')}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-emerald-800 font-bold text-xs">
              <span>{language === 'te' ? 'ఫోటో తీయండి' : language === 'hi' ? 'फोटो लें' : 'Diagnose Now'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Market & Render Margins */}
          <div
            onClick={() => onNavigateTab('market')}
            className="bg-white hover:bg-amber-50/50 border-2 border-amber-200 hover:border-amber-500 rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">
                {t('nav.market')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                {t('home.checkRenderCut')}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-amber-800 font-bold text-xs">
              <span>{language === 'te' ? 'ధరల వ్యత్యాసం' : language === 'hi' ? 'मंडी भाव व कमीशन' : 'Check Renders'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Crop Planner */}
          <div
            onClick={() => onNavigateTab('planner')}
            className="bg-white hover:bg-teal-50/50 border-2 border-teal-200 hover:border-teal-500 rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">
                {t('nav.planner')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                {language === 'te'
                  ? 'ఖరీఫ్, రబీ, ఎండకాలం ఉత్తమ పంటలు & లాభాల లెక్క'
                  : language === 'hi'
                  ? 'खरीफ, रबी, जायद फसल योजना व अनुमानित मुनाफा'
                  : 'Seasonwise Kharif, Rabi, Summer crop profit planner'}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-teal-800 font-bold text-xs">
              <span>{language === 'te' ? 'పంటలు చూడండి' : language === 'hi' ? 'फसलें चुनें' : 'Explore Crops'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Govt Schemes */}
          <div
            onClick={() => onNavigateTab('schemes')}
            className="bg-white hover:bg-indigo-50/50 border-2 border-indigo-200 hover:border-indigo-500 rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold mb-3.5 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">
                {t('nav.schemes')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                {t('home.latestSchemesBanner')}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-indigo-800 font-bold text-xs">
              <span>{language === 'te' ? 'పథకాల జాబితా' : language === 'hi' ? 'योजनाएं देखें' : 'View Schemes'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Market Price Transparency Snapshot (Farmer vs Render vs Public) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <span>{t('home.todayPrices')}</span>
            </h2>
            <p className="text-xs text-stone-500">
              {language === 'te'
                ? 'రైతుకు ఎంత దక్కుతోంది? దళారుల కమీషన్ ఎంత? ప్రజలు ఎంత కొంటున్నారు?'
                : language === 'hi'
                ? 'किसान को कितना मिलता है? बिचौलिए का कमीशन कितना है? और जनता किस भाव पर खरीदती है?'
                : 'What farmer gets vs render cut vs public retail rate'}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('market')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 self-start sm:self-auto bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
          >
            <span>{language === 'te' ? 'పూర్తి మార్కెట్ విశ్లేషణ' : language === 'hi' ? 'पूरी मंडी रिपोर्ट' : 'Full Value Chain Report'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Highlight table comparing farm gate vs render vs retail */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {marketPriceBreakdowns.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="border border-stone-200 rounded-2xl p-4 bg-stone-50/60 hover:bg-stone-50 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-stone-900 text-sm">
                  {item.cropName[language]}
                </span>
                <span className="text-[11px] bg-stone-200 text-stone-800 px-2 py-0.5 rounded-md font-medium">
                  {item.localMandiName}
                </span>
              </div>

              {/* Price comparison numbers */}
              <div className="grid grid-cols-3 gap-2 text-center py-2 bg-white rounded-xl border border-stone-200/80 shadow-2xs">
                <div>
                  <p className="text-[10px] text-stone-500">{language === 'te' ? 'రైతుకు' : language === 'hi' ? 'किसान को' : 'Farmer'}</p>
                  <p className="text-base font-black text-emerald-700">₹{item.farmGatePrice}</p>
                  <p className="text-[10px] text-stone-400">/{item.unit}</p>
                </div>
                <div className="border-x border-stone-200">
                  <p className="text-[10px] text-red-600 font-semibold">{language === 'te' ? 'దళారి కట్' : language === 'hi' ? 'कमीशन' : 'Render Cut'}</p>
                  <p className="text-base font-black text-red-600">-₹{item.renderCut}</p>
                  <p className="text-[10px] text-stone-400">/{item.unit}</p>
                </div>
                <div>
                  <p className="text-[10px] text-stone-500">{language === 'te' ? 'ప్రజలు' : language === 'hi' ? 'खुदरा' : 'Retail'}</p>
                  <p className="text-base font-black text-stone-900">₹{item.retailConsumerPrice}</p>
                  <p className="text-[10px] text-stone-400">/{item.unit}</p>
                </div>
              </div>

              {/* Visual Share Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  <span className="text-emerald-800 font-bold">
                    {language === 'te' ? 'రైతు వాటా' : language === 'hi' ? 'किसान हिस्सा' : 'Farmer Share'}: {item.farmerSharePercent}%
                  </span>
                  <span className="text-red-700 font-bold">
                    {language === 'te' ? 'దళారి వాటా' : language === 'hi' ? 'कमीशन' : 'Render'}: {item.renderMarginPercent}%
                  </span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-600 h-full" style={{ width: `${item.farmerSharePercent}%` }} />
                  <div className="bg-red-400 h-full" style={{ width: `${item.renderMarginPercent}%` }} />
                  <div className="bg-amber-300 h-full" style={{ width: `${100 - item.farmerSharePercent - item.renderMarginPercent}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Helplines & Assistance Bar */}
      <div className="bg-emerald-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5 font-bold" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-amber-200">
              {language === 'te'
                ? 'రైతు అత్యవసర సహాయ కేంద్రాలు (Toll-Free Helplines)'
                : language === 'hi'
                ? 'किसान आपातकालीन टोल-फ्री हेल्पलाइन'
                : 'Farmer Support & Emergency Helplines'}
            </h3>
            <p className="text-xs text-emerald-300">
              {language === 'te'
                ? 'పంట నష్టం, పథకాల సందేహాలు మరియు తెగుళ్ళ నివారణకు ఉచితంగా సంప్రదించండి'
                : language === 'hi'
                ? 'फसल क्षति, योजना सहायता व कीट निवारण हेतु निःशुल्क परामर्श'
                : 'Free advisory for crop loss claims, schemes verification, and pest control'}
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <a
            href="tel:1902"
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1902 (AP CM Rythu)</span>
          </a>
          <a
            href="tel:18001801551"
            className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border border-emerald-600 px-3.5 py-2 rounded-xl text-xs font-bold transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span>1800-180-1551 (Kisan Call)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
