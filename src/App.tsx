import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeTab } from './components/HomeTab';
import { CropPlannerTab } from './components/CropPlannerTab';
import { PlantHealthTab } from './components/PlantHealthTab';
import { WeatherTab } from './components/WeatherTab';
import { MarketTransparencyTab } from './components/MarketTransparencyTab';
import { GovtSchemesTab } from './components/GovtSchemesTab';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { Language } from './types';
import { localities } from './data/localitiesData';
import { generateWeatherForecast } from './data/weatherData';
import { VoiceService } from './utils/speech';
import {
  getStoredLanguage,
  setStoredLanguage,
  getStoredLocality,
  setStoredLocality,
  getStoredOfflineMode,
  setStoredOfflineMode,
} from './utils/storage';
import { getT } from './translations';
import { Sprout, WifiOff } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguageState] = useState<Language>(getStoredLanguage());
  const [localityId, setLocalityIdState] = useState<string>(getStoredLocality());
  const [isManualOffline, setIsManualOffline] = useState<boolean>(getStoredOfflineMode());
  const [isNetworkOffline, setIsNetworkOffline] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsNetworkOffline(false);
    const handleOffline = () => setIsNetworkOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Audio status check interval
    const interval = setInterval(() => {
      setIsSpeaking(VoiceService.isSpeaking());
    }, 400);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const isOffline = isManualOffline || isNetworkOffline;

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
  };

  const handleSetLocality = (id: string) => {
    setLocalityIdState(id);
    setStoredLocality(id);
  };

  const handleToggleOffline = () => {
    const nextVal = !isManualOffline;
    setIsManualOffline(nextVal);
    setStoredOfflineMode(nextVal);
  };

  const handleStopSpeaking = () => {
    VoiceService.stop();
    setIsSpeaking(false);
  };

  const selectedLocality = localities.find((l) => l.id === localityId) || localities[0];
  const localityName = selectedLocality.name[language];

  // Dynamic Weather data for current locality
  const { current: currentWeather, forecast: weatherDays, alerts: weatherAlerts } = generateWeatherForecast(localityId);

  const t = getT(language);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-stone-900 pb-20 md:pb-10">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          handleStopSpeaking();
          setCurrentTab(tab);
        }}
        language={language}
        setLanguage={handleSetLanguage}
        localityId={localityId}
        setLocalityId={handleSetLocality}
        isOffline={isOffline}
        toggleOffline={handleToggleOffline}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
        isSpeaking={isSpeaking}
        onStopSpeaking={handleStopSpeaking}
      />

      {/* Offline Mode Alert Strip if Offline */}
      {isOffline && (
        <div className="bg-amber-500 text-stone-950 px-4 py-1.5 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs">
          <WifiOff className="w-3.5 h-3.5" />
          <span>
            {language === 'te'
              ? 'ఆఫ్‌లైన్ మోడ్ యాక్టివ్‌గా ఉంది. లోకల్ కాష్ మరియు అత్యవసర డైరీ అందుబాటులో ఉన్నాయి.'
              : language === 'hi'
              ? 'ऑफलाइन मोड सक्रिय है। स्थानीय कैश और आपातकालीन डाटा उपलब्ध है।'
              : 'Offline Mode active. Local cache and emergency guides available without cellular signal.'}
          </span>
          <button
            onClick={handleToggleOffline}
            className="underline ml-2 text-stone-900 font-black hover:text-black"
          >
            {language === 'te' ? 'ఆన్‌లైన్‌కు మారండి' : language === 'hi' ? 'ऑनलाइन करें' : 'Switch Online'}
          </button>
        </div>
      )}

      {/* Main Content View Container */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeTab
            language={language}
            localityName={localityName}
            weatherAlerts={weatherAlerts}
            currentWeather={currentWeather}
            onNavigateTab={(tab) => {
              handleStopSpeaking();
              setCurrentTab(tab);
            }}
            onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
            isOffline={isOffline}
          />
        )}

        {currentTab === 'planner' && (
          <CropPlannerTab language={language} localityName={localityName} />
        )}

        {currentTab === 'doctor' && (
          <PlantHealthTab language={language} localityName={localityName} isOffline={isOffline} />
        )}

        {currentTab === 'weather' && (
          <WeatherTab
            language={language}
            localityName={localityName}
            weatherDays={weatherDays}
            weatherAlerts={weatherAlerts}
          />
        )}

        {currentTab === 'market' && (
          <MarketTransparencyTab language={language} localityName={localityName} />
        )}

        {currentTab === 'schemes' && (
          <GovtSchemesTab language={language} localityName={localityName} />
        )}
      </main>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        language={language}
        localityName={localityName}
        isOffline={isOffline}
      />

      {/* Mobile Bottom Navigation Bar for easy thumb navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 md:hidden flex items-center justify-around py-2 px-1 shadow-lg">
        {[
          { id: 'home', label: t('nav.home'), icon: '🏠' },
          { id: 'planner', label: t('nav.planner'), icon: '🌱' },
          { id: 'doctor', label: t('nav.doctor'), icon: '🩺' },
          { id: 'weather', label: t('nav.weather'), icon: '🌦️' },
          { id: 'market', label: t('nav.market'), icon: '⚖️' },
          { id: 'schemes', label: t('nav.schemes'), icon: '📜' },
        ].map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                handleStopSpeaking();
                setCurrentTab(item.id);
              }}
              className={`flex flex-col items-center justify-center p-1 rounded-xl text-[10px] font-bold transition-all ${
                isActive
                  ? 'text-emerald-800 scale-105'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="truncate max-w-[55px]">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-6 mt-12 border-t border-stone-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-200 font-bold">
            <Sprout className="w-5 h-5 text-amber-400" />
            <span>{t('appTitle')}</span>
            <span className="text-stone-500 font-normal">| {t('appTagline')}</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>🌾 AP RBK & ICAR Aligned</span>
            <span>📞 Helpline: 1902 / 1800-180-1551</span>
            <span>⚡ Offline-First Mode</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
