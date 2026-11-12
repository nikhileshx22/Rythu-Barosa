import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  FileText,
  PhoneCall,
  ExternalLink,
  Volume2,
  DollarSign,
  Search,
  Filter,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { GovtScheme, Language } from '../types';
import { govtSchemesList } from '../data/schemesData';
import { VoiceService } from '../utils/speech';
import { getT } from '../translations';

interface GovtSchemesTabProps {
  language: Language;
  localityName: string;
}

export const GovtSchemesTab: React.FC<GovtSchemesTabProps> = ({ language, localityName }) => {
  const [filterType, setFilterType] = useState<'all' | 'ap_state' | 'central' | 'insurance' | 'credit' | 'machinery'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeModal, setSelectedSchemeModal] = useState<GovtScheme | null>(null);

  const t = getT(language);

  const filteredSchemes = govtSchemesList.filter((scheme) => {
    const matchesType =
      filterType === 'all'
        ? true
        : filterType === 'ap_state'
        ? scheme.type === 'ap_state'
        : filterType === 'central'
        ? scheme.type === 'central'
        : scheme.category === filterType;

    const matchesSearch =
      searchQuery.trim() === '' ||
      scheme.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.subtitle[language].toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const handleSpeakScheme = (scheme: GovtScheme) => {
    const textToSpeak =
      language === 'te'
        ? `${scheme.title.te}. ఆర్థిక సహాయం: ${scheme.financialBenefit.te}. ఎవరు అర్హులు: ${scheme.eligibility.map((e) => e.te).join('. ')}. దరఖాస్తు: ${scheme.howToApply[0]?.te || ''}. హెల్ప్‌లైన్: ${scheme.helpline}.`
        : language === 'hi'
        ? `${scheme.title.hi}। वित्तीय लाभ: ${scheme.financialBenefit.hi}। पात्रता: ${scheme.eligibility.map((e) => e.hi).join('. ')}। हेल्पलाइन: ${scheme.helpline}।`
        : `${scheme.title.en}. Benefit: ${scheme.financialBenefit.en}. Eligibility: ${scheme.eligibility.map((e) => e.en).join('. ')}. Helpline: ${scheme.helpline}.`;

    VoiceService.speak(textToSpeak, language);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* Title & Search Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-700" />
              <span>{t('schemes.title')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              {t('schemes.subtitle')}
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search')}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center flex-wrap gap-2 pt-1">
          {[
            { id: 'all', label: t('schemes.allSchemes') },
            { id: 'ap_state', label: t('schemes.apSchemes') },
            { id: 'central', label: t('schemes.centralSchemes') },
            { id: 'insurance', label: language === 'te' ? 'పంట బీమా' : language === 'hi' ? 'फसल बीमा' : 'Crop Insurance' },
            { id: 'credit', label: language === 'te' ? 'సున్నా వడ్డీ రుణాలు' : language === 'hi' ? '0% ऋण' : '0% Loans' },
            { id: 'machinery', label: language === 'te' ? 'యంత్రాలు & డ్రిప్' : language === 'hi' ? 'यंत्र व ड्रिप' : 'Machinery & Drip' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterType(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                filterType === cat.id
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border-2 border-stone-200 hover:border-emerald-500 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="p-5 sm:p-6 space-y-4">
              {/* Header Badges & Title */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        scheme.type === 'ap_state'
                          ? 'bg-amber-400 text-emerald-950'
                          : 'bg-emerald-800 text-white'
                      }`}
                    >
                      {scheme.badge[language]}
                    </span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-semibold">
                      {scheme.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                    {scheme.title[language]}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {scheme.subtitle[language]}
                  </p>
                </div>

                <button
                  onClick={() => handleSpeakScheme(scheme)}
                  className="w-9 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs transition"
                  title="Listen to scheme details"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Financial Benefit Card */}
              <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-200">
                <p className="text-[11px] font-bold text-emerald-900 uppercase mb-1">
                  💰 {t('schemes.benefit')}:
                </p>
                <p className="text-xs sm:text-sm text-stone-800 font-semibold leading-relaxed">
                  {scheme.financialBenefit[language]}
                </p>
              </div>

              {/* Eligibility Highlights */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-stone-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('schemes.eligibility')}:</span>
                </p>
                <ul className="text-xs text-stone-700 space-y-1">
                  {scheme.eligibility.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{item[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents pills */}
              <div className="pt-1">
                <p className="text-[11px] font-bold text-stone-600 mb-1.5">
                  📄 {t('schemes.documentsNeeded')}:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {scheme.requiredDocuments.map((doc, idx) => (
                    <span
                      key={idx}
                      className="bg-stone-100 border border-stone-200 text-stone-700 text-[11px] px-2 py-0.5 rounded-lg"
                    >
                      {doc[language]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer: Helpline & View full steps button */}
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-2">
              <a
                href={`tel:${scheme.helpline.split(' ')[0]}`}
                className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{scheme.helpline}</span>
              </a>

              <button
                onClick={() => setSelectedSchemeModal(scheme)}
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs"
              >
                {language === 'te' ? 'దరఖాస్తు విధానం' : language === 'hi' ? 'आवेदन की प्रक्रिया' : 'Apply Steps'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Application Steps Modal */}
      {selectedSchemeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] bg-amber-400 text-emerald-950 font-black px-2.5 py-0.5 rounded-full">
                  {selectedSchemeModal.badge[language]}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-stone-900 mt-1">
                  {selectedSchemeModal.title[language]}
                </h2>
              </div>
              <button
                onClick={() => setSelectedSchemeModal(null)}
                className="text-stone-400 hover:text-stone-800 p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Step by Step application guide */}
            <div className="space-y-3">
              <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>{t('schemes.applySteps')}</span>
              </h4>

              <div className="space-y-2 text-xs sm:text-sm text-stone-800">
                {selectedSchemeModal.howToApply.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-2.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step[language]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disbursement Schedule */}
            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-950">
              <p className="font-bold mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>{language === 'te' ? 'చెల్లింపుల కాలపట్టిక' : language === 'hi' ? 'किस्त भुगतान का समय' : 'Disbursement Timeline'}:</span>
              </p>
              <p>{selectedSchemeModal.deadlineOrSchedule[language]}</p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              {selectedSchemeModal.portalUrl ? (
                <a
                  href={selectedSchemeModal.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 text-xs font-bold"
                >
                  <span>{language === 'te' ? 'అధికారిక వెబ్‌సైట్' : language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : <div />}

              <button
                onClick={() => setSelectedSchemeModal(null)}
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
