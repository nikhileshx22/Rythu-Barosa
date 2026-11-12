import React, { useState } from 'react';
import {
  CloudRain,
  Sun,
  CloudLightning,
  CloudSun,
  Droplets,
  Wind,
  AlertTriangle,
  Volume2,
  Calendar,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { Language, WeatherAlert, WeatherDay } from '../types';
import { VoiceService } from '../utils/speech';
import { getT } from '../translations';

interface WeatherTabProps {
  language: Language;
  localityName: string;
  weatherDays: WeatherDay[];
  weatherAlerts: WeatherAlert[];
}

export const WeatherTab: React.FC<WeatherTabProps> = ({
  language,
  localityName,
  weatherDays,
  weatherAlerts,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const t = getT(language);
  const selectedDay = weatherDays[selectedDayIndex] || weatherDays[0];

  const handleSpeakWeather = () => {
    const textToSpeak =
      language === 'te'
        ? `${localityName} వాతావరణ సమాచారం. ఈరోజు ${selectedDay.condition} వాతావరణం. గరిష్ట ఉష్ణోగ్రత ${selectedDay.tempMax} డిగ్రీలు, కనిష్ట ఉష్ణోగ్రత ${selectedDay.tempMin} డిగ్రీలు. వర్షం పడే అవకాశం ${selectedDay.rainProbability} శాతం. పిచికారీ సలహా: ${selectedDay.sprayAdvice.te}. ${weatherAlerts[0]?.message.te || ''}`
        : language === 'hi'
        ? `${localityName} का मौसम पूर्वानुमान। आज ${selectedDay.condition} मौसम रहेगा। अधिकतम तापमान ${selectedDay.tempMax} डिग्री, न्यूनतम तापमान ${selectedDay.tempMin} डिग्री। बारिश की संभावना ${selectedDay.rainProbability} प्रतिशत। छिड़काव सलाह: ${selectedDay.sprayAdvice.hi}।`
        : `Weather advisory for ${localityName}. Today condition is ${selectedDay.condition}. High of ${selectedDay.tempMax}°C, low of ${selectedDay.tempMin}°C. Rain chance is ${selectedDay.rainProbability}%. Spray advice: ${selectedDay.sprayAdvice.en}.`;

    VoiceService.speak(textToSpeak, language);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'Thunderstorm':
        return <CloudLightning className="w-8 h-8 text-purple-600" />;
      case 'Partly Cloudy':
        return <CloudSun className="w-8 h-8 text-amber-500" />;
      default:
        return <Sun className="w-8 h-8 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* Title & Quick Audio Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <CloudRain className="w-6 h-6 text-emerald-700" />
              <span>{t('weather.title')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              {t('weather.subtitle')} • 📍 <strong>{localityName}</strong>
            </p>
          </div>

          <button
            onClick={handleSpeakWeather}
            className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md transition self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span>{t('common.speak')}</span>
          </button>
        </div>

        {/* Predict Alerts Banner Cards */}
        <div className="space-y-3 pt-2">
          {weatherAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl p-4 border-2 flex items-start gap-3.5 ${
                alert.severity === 'danger'
                  ? 'bg-red-50 border-red-300 text-red-950'
                  : alert.severity === 'warning'
                  ? 'bg-amber-50 border-amber-400 text-amber-950'
                  : 'bg-blue-50 border-blue-300 text-blue-950'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-800" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-sm sm:text-base">
                    {alert.title[language]}
                  </h3>
                  <span className="text-[11px] font-bold bg-white/80 px-2 py-0.5 rounded-md border border-stone-200 shrink-0">
                    ⏱️ {alert.validTill}
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  {alert.message[language]}
                </p>
                <div className="mt-2 bg-white/70 rounded-xl p-2.5 text-xs font-semibold border border-amber-300/60">
                  ⚡ <strong>{language === 'te' ? 'రైతు జాగ్రత్త' : language === 'hi' ? 'किसान के लिए जरूरी कदम' : 'Agro-Advisory Action'}:</strong>{' '}
                  {alert.actionRequired[language]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spray Condition Advisory Box */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-emerald-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-950/80 text-amber-300 px-3 py-0.5 rounded-full border border-emerald-600">
              {language === 'te' ? 'మందుల పిచికారీ అనుకూలత' : language === 'hi' ? 'कीटनाशक छिड़काव अनुकूलता' : 'Pesticide & Spray Safety Window'}
            </span>
            <div className="flex items-center gap-2.5 pt-1">
              <span className="text-xl sm:text-2xl font-black">
                {selectedDay.sprayCondition === 'Safe'
                  ? t('weather.spraySafe')
                  : selectedDay.sprayCondition === 'Caution'
                  ? t('weather.sprayCaution')
                  : t('weather.sprayUnsafe')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              {selectedDay.sprayAdvice[language]}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-emerald-950/80 p-3.5 rounded-2xl border border-emerald-700/80 shrink-0 text-center">
            <div>
              <p className="text-[10px] text-emerald-300">{t('weather.rainChance')}</p>
              <p className="text-lg font-black text-amber-300">{selectedDay.rainProbability}%</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-300">{t('weather.windSpeed')}</p>
              <p className="text-lg font-black text-emerald-100">{selectedDay.windSpeedKmh} km/h</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-700" />
          <span>{language === 'te' ? 'రాబోయే 7 రోజుల వాతావరణ వివరాలు' : language === 'hi' ? 'अगले 7 दिनों का विस्तृत मौसम' : 'Upcoming 7-Day Day-by-Day Forecast'}</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weatherDays.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedDayIndex(idx)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-center ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-200'
                    : 'border-stone-200 hover:border-emerald-300 bg-stone-50/50'
                }`}
              >
                <div>
                  <p className="font-bold text-stone-900 text-xs sm:text-sm">
                    {idx === 0
                      ? language === 'te' ? 'ఈరోజు' : language === 'hi' ? 'आज' : 'Today'
                      : idx === 1
                      ? language === 'te' ? 'రేపు' : language === 'hi' ? 'कल' : 'Tomorrow'
                      : day.day}
                  </p>
                  <p className="text-[10px] text-stone-500 font-medium">{day.date}</p>
                </div>

                <div className="my-2 flex justify-center">{getWeatherIcon(day.condition)}</div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                    <span className="text-stone-900">{day.tempMax}°</span>
                    <span className="text-stone-400 font-normal">/ {day.tempMin}°</span>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-[11px] text-blue-700 font-semibold">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span>{day.rainProbability}%</span>
                  </div>

                  {/* Spray Tag */}
                  <div className="pt-1">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full block truncate ${
                        day.sprayCondition === 'Safe'
                          ? 'bg-emerald-100 text-emerald-800'
                          : day.sprayCondition === 'Caution'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {day.sprayCondition}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
