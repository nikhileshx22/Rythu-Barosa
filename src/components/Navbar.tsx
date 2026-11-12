import React from 'react';
import { Sprout, Mic, Volume2, Wifi, WifiOff, MapPin, Globe } from 'lucide-react';
import { Language } from '../types';
import { localities } from '../data/localitiesData';
import { getT } from '../translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  localityId: string;
  setLocalityId: (id: string) => void;
  isOffline: boolean;
  toggleOffline: () => void;
  onOpenVoiceAssistant: () => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  localityId,
  setLocalityId,
  isOffline,
  toggleOffline,
  onOpenVoiceAssistant,
  isSpeaking,
  onStopSpeaking,
}) => {
  const t = getT(language);
  const selectedLocality = localities.find((l) => l.id === localityId) || localities[0];

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: '🏠' },
    { id: 'planner', label: t('nav.planner'), icon: '🌱' },
    { id: 'doctor', label: t('nav.doctor'), icon: '🩺' },
    { id: 'weather', label: t('nav.weather'), icon: '🌦️' },
    { id: 'market', label: t('nav.market'), icon: '⚖️' },
    { id: 'schemes', label: t('nav.schemes'), icon: '📜' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-emerald-900 text-white shadow-lg border-b border-emerald-800">
      {/* Top Banner: Locality, Offline toggle, Language, Voice */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/60 text-xs sm:text-sm">
        {/* Logo and App Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            <Sprout className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-base sm:text-lg text-emerald-50">
              <span>{t('appTitle')}</span>
              <span className="hidden md:inline-block text-[11px] bg-emerald-700/80 text-amber-200 px-2 py-0.5 rounded-full border border-emerald-600">
                AP + Central
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/90 leading-tight hidden sm:block">
              {t('appTagline')}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Locality Selector */}
          <div className="flex items-center bg-emerald-950/70 border border-emerald-700/70 rounded-lg px-2.5 py-1 text-emerald-100">
            <MapPin className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0" />
            <select
              value={localityId}
              onChange={(e) => setLocalityId(e.target.value)}
              className="bg-transparent text-emerald-100 text-xs sm:text-sm font-medium focus:outline-none cursor-pointer"
              title="Select Locality"
            >
              {localities.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-emerald-950 text-white">
                  {loc.name[language]} ({loc.state[language]})
                </option>
              ))}
            </select>
          </div>

          {/* Offline Mode Toggle Button */}
          <button
            onClick={toggleOffline}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
              isOffline
                ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-sm animate-pulse'
                : 'bg-emerald-800/80 text-emerald-200 border-emerald-700 hover:bg-emerald-700'
            }`}
            title="Toggle Offline Field Mode"
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isOffline ? t('common.offline') : t('common.online')}</span>
          </button>

          {/* Voice Assistant Trigger */}
          <button
            onClick={onOpenVoiceAssistant}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 px-3 py-1 rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <Mic className="w-4 h-4 animate-bounce" />
            <span className="hidden xs:inline">{t('common.voiceAssistant')}</span>
          </button>

          {/* Audio Stop Button if currently speaking */}
          {isSpeaking && (
            <button
              onClick={onStopSpeaking}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-lg text-xs font-bold animate-pulse"
              title="Stop audio playback"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{t('common.stopVoice')}</span>
            </button>
          )}

          {/* Language Switcher: Telugu, English, Hindi */}
          <div className="flex items-center bg-emerald-950/80 rounded-lg p-0.5 border border-emerald-700">
            <button
              onClick={() => setLanguage('te')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                language === 'te'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              ENG
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                language === 'hi'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-2 sm:px-6 flex overflow-x-auto no-scrollbar scroll-smooth">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-5 py-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-amber-400 text-amber-300 bg-emerald-800/40 shadow-inner'
                  : 'border-transparent text-emerald-200 hover:text-white hover:bg-emerald-800/20'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
