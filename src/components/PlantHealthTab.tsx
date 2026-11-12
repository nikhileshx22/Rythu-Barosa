import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Volume2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Leaf,
  Bug,
  History,
  Trash2,
  Share2,
  FileText,
  Clock,
} from 'lucide-react';
import { Language, PlantDiagnosis } from '../types';
import { offlineSamplePests } from '../data/offlineSamplePests';
import { VoiceService } from '../utils/speech';
import { getSavedDiagnoses, saveDiagnosis, removeDiagnosis } from '../utils/storage';
import { getT } from '../translations';

interface PlantHealthTabProps {
  language: Language;
  localityName: string;
  isOffline: boolean;
}

export const PlantHealthTab: React.FC<PlantHealthTabProps> = ({ language, localityName, isOffline }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<PlantDiagnosis | null>(null);
  const [farmerNotes, setFarmerNotes] = useState('');
  const [cropTypeHint, setCropTypeHint] = useState('Chilli');
  const [treatmentTab, setTreatmentTab] = useState<'organic' | 'chemical'>('organic');
  const [savedHistory, setSavedHistory] = useState<PlantDiagnosis[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const t = getT(language);

  useEffect(() => {
    setSavedHistory(getSavedDiagnoses());
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      runPlantAnalysis(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof offlineSamplePests[0]) => {
    setSelectedImage(sample.imageUrl || null);
    setDiagnosis(sample);
    setErrorMessage(null);
    if (sample.voiceBrief) {
      VoiceService.speak(sample.voiceBrief, language);
    }
  };

  const runPlantAnalysis = async (base64Image: string, mimeType: string = 'image/jpeg') => {
    setAnalyzing(true);
    setErrorMessage(null);
    setDiagnosis(null);
    VoiceService.stop();

    // If offline mode is active, match with offline diagnostic database
    if (isOffline) {
      setTimeout(() => {
        // Find best match or default to first sample
        const matched = offlineSamplePests.find(
          (p) => p.cropName.toLowerCase().includes(cropTypeHint.toLowerCase())
        ) || offlineSamplePests[0];

        const offlineResult: PlantDiagnosis = {
          ...matched,
          id: `offline_${Date.now()}`,
          timestamp: Date.now(),
          imageUrl: base64Image,
          isOfflineSample: true,
        };

        setDiagnosis(offlineResult);
        const updated = saveDiagnosis(offlineResult);
        setSavedHistory(updated);
        setAnalyzing(false);

        if (offlineResult.voiceBrief) {
          VoiceService.speak(offlineResult.voiceBrief, language);
        }
      }, 700);
      return;
    }

    try {
      const response = await fetch('/api/gemini/analyze-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          mimeType,
          cropHint: cropTypeHint,
          language,
          farmerNote: farmerNotes,
        }),
      });

      const data = await response.json();
      if (data.success && data.result) {
        const result: PlantDiagnosis = {
          id: `diag_${Date.now()}`,
          timestamp: Date.now(),
          cropName: data.result.cropName || cropTypeHint,
          conditionName: data.result.conditionName || 'Identified Plant Condition',
          scientificName: data.result.scientificName,
          pathogenType: data.result.pathogenType || 'Agricultural Pest',
          severity: data.result.severity || 'Moderate',
          confidenceScore: data.result.confidenceScore || 90,
          summary: data.result.summary || '',
          symptoms: data.result.symptoms || [],
          causes: data.result.causes,
          organicRemedy: data.result.organicRemedy || [],
          chemicalRemedy: data.result.chemicalRemedy || [],
          preventiveActions: data.result.preventiveActions || [],
          voiceBrief: data.result.voiceBrief,
          imageUrl: base64Image,
        };

        setDiagnosis(result);
        const updated = saveDiagnosis(result);
        setSavedHistory(updated);

        // Automatically read aloud the voice brief for the farmer
        if (result.voiceBrief) {
          VoiceService.speak(result.voiceBrief, language);
        }
      } else {
        throw new Error(data.error || 'Failed to analyze crop leaf');
      }
    } catch (err: any) {
      console.warn('Online analysis failed, falling back to offline library:', err);
      // Seamless offline fallback
      const fallback = offlineSamplePests[0];
      const fallbackResult: PlantDiagnosis = {
        ...fallback,
        id: `offline_fallback_${Date.now()}`,
        timestamp: Date.now(),
        imageUrl: base64Image,
      };
      setDiagnosis(fallbackResult);
      setErrorMessage(
        language === 'te'
          ? 'సర్వర్ కనెక్షన్ లోపించింది. ఆఫ్‌లైన్ అత్యవసర సమాచారాన్ని అందిస్తున్నాము.'
          : language === 'hi'
          ? 'सर्वर कनेक्शन अनुपलब्ध होने से ऑफलाइन डाटा दिखाया जा रहा है।'
          : 'Server connection unavailable; showing cached offline diagnosis.'
      );
      if (fallbackResult.voiceBrief) {
        VoiceService.speak(fallbackResult.voiceBrief, language);
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSpeakDiagnosis = () => {
    if (!diagnosis) return;
    const textToSpeak =
      diagnosis.voiceBrief ||
      `${diagnosis.cropName}. ${diagnosis.conditionName}. ${diagnosis.summary}. ${
        treatmentTab === 'organic'
          ? diagnosis.organicRemedy.join('. ')
          : diagnosis.chemicalRemedy.join('. ')
      }`;
    VoiceService.speak(textToSpeak, language);
  };

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = removeDiagnosis(id);
    setSavedHistory(updated);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-emerald-700" />
              <span>{t('doctor.title')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
              {t('doctor.subtitle')}
            </p>
          </div>

          {/* Crop Selector hint */}
          <div className="flex items-center gap-2 bg-stone-100 rounded-xl px-3 py-1.5 self-start md:self-auto border border-stone-200">
            <span className="text-xs font-bold text-stone-600">
              {language === 'te' ? 'పంట:' : language === 'hi' ? 'फसल:' : 'Crop'}:
            </span>
            <select
              value={cropTypeHint}
              onChange={(e) => setCropTypeHint(e.target.value)}
              className="bg-transparent text-xs font-bold text-stone-900 outline-none cursor-pointer"
            >
              <option value="Chilli">Chilli (మిరప / मिर्च)</option>
              <option value="Paddy">Paddy / Rice (వరి / धान)</option>
              <option value="Cotton">Cotton (పత్తి / कपास)</option>
              <option value="Tomato">Tomato (టమాటా / टमाटर)</option>
              <option value="Groundnut">Groundnut (వేరుశనగ / मूंगफली)</option>
              <option value="Mango">Mango (మామిడి / आम)</option>
              <option value="Maize">Maize (మొక్కజొన్న / मक्का)</option>
            </select>
          </div>
        </div>

        {/* Offline notice badge */}
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{t('doctor.offlineNotice')}</span>
          </span>
          {isOffline && (
            <span className="bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded text-[11px] shrink-0">
              {t('common.offlineMode')}
            </span>
          )}
        </div>
      </div>

      {/* Main Upload / Camera / Sample Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Upload / Camera & Sample library */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>{language === 'te' ? 'పంట ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి' : language === 'hi' ? 'फोटो लें या अपलोड करें' : 'Capture or Upload Crop Leaf'}</span>
            </h2>

            {/* Hidden File Inputs */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Big Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="bg-emerald-800 hover:bg-emerald-900 text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-xs sm:text-sm shadow-md transition active:scale-95 border border-emerald-700"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-amber-300" />
                </div>
                <span>{t('doctor.takePhoto')}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-stone-800 hover:bg-stone-900 text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-xs sm:text-sm shadow-md transition active:scale-95 border border-stone-700"
              >
                <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-amber-300" />
                </div>
                <span>{t('doctor.uploadPhoto')}</span>
              </button>
            </div>

            {/* Optional Farmer's Symptom Notes */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                {language === 'te' ? 'లక్షణాలు / సందేహాలు (ఐచ్ఛికం):' : language === 'hi' ? 'लक्षण / टिप्पणी (वैकल्पिक):' : 'Farmer Observation Notes (Optional):'}
              </label>
              <input
                type="text"
                value={farmerNotes}
                onChange={(e) => setFarmerNotes(e.target.value)}
                placeholder={
                  language === 'te'
                    ? 'ఉదా: ఆకులు ముడుచుకుపోయాయి, నల్ల మచ్చలు ఉన్నాయి...'
                    : language === 'hi'
                    ? 'उदा: पत्तियां मुड़ रही हैं, भूरे धब्बे हैं...'
                    : 'e.g. Leaves curling upward with dark spots...'
                }
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            {/* Quick Sample Photos for immediate offline & online test */}
            <div className="pt-2 border-t border-stone-200">
              <p className="text-xs font-bold text-stone-700 mb-2">
                🌾 {t('doctor.selectSample')}:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {offlineSamplePests.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className="p-2 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-400 rounded-xl text-left text-xs transition flex items-center gap-2 group"
                  >
                    <img
                      src={sample.imageUrl}
                      alt={sample.cropName}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-stone-900 truncate group-hover:text-emerald-900">
                        {sample.sampleTitle[language]}
                      </p>
                      <p className="text-[10px] text-stone-500 truncate">{sample.cropName}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Saved History List */}
          {savedHistory.length > 0 && (
            <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <History className="w-4 h-4 text-emerald-700" />
                  <span>{t('doctor.savedHistory')}</span>
                </h3>
                <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-bold">
                  {savedHistory.length}
                </span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {savedHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setDiagnosis(item);
                      setSelectedImage(item.imageUrl || null);
                    }}
                    className="p-2.5 bg-stone-50 hover:bg-emerald-50 rounded-xl border border-stone-200 hover:border-emerald-300 transition cursor-pointer flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex items-center gap-2">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt="Crop"
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-stone-900 text-xs truncate">
                          {item.conditionName}
                        </p>
                        <p className="text-[10px] text-stone-500">
                          {new Date(item.timestamp).toLocaleDateString()} • {item.cropName}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteHistory(item.id, e)}
                      className="text-stone-400 hover:text-red-600 p-1 rounded"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Active Diagnosis Results with Severity & Treatments */}
        <div className="lg:col-span-7">
          {analyzing ? (
            <div className="bg-white rounded-3xl p-10 border border-stone-200 shadow-sm text-center space-y-4 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-600 border-t-transparent animate-spin flex items-center justify-center" />
              <div className="space-y-1">
                <h3 className="font-bold text-stone-900 text-base">
                  {t('doctor.analyzing')}
                </h3>
                <p className="text-xs text-stone-500 max-w-sm">
                  {language === 'te'
                    ? 'ఆకులలోని తెగులు, రసం పీల్చే పురుగులు, శిలీంధ్రాలు మరియు పోషక లోపాలను పరిశీలిస్తున్నాము...'
                    : language === 'hi'
                    ? 'पत्ती के रोग, कीट और पोषण की कमियों का विश्लेषण किया जा रहा है...'
                    : 'Analyzing fungal spores, insect damage, and nutrient deficiency markers...'}
                </p>
              </div>
            </div>
          ) : diagnosis ? (
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-300 shadow-md space-y-5 animate-in fade-in">
              {/* Top Banner with Image thumbnail, Disease Title and Audio button */}
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-stone-200 pb-4">
                <div className="flex items-start gap-3.5">
                  {diagnosis.imageUrl && (
                    <img
                      src={diagnosis.imageUrl}
                      alt="Crop disease"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-xs shrink-0"
                    />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] bg-emerald-800 text-amber-300 font-bold px-2.5 py-0.5 rounded-full">
                        {diagnosis.cropName}
                      </span>
                      <span className="text-[11px] bg-red-100 text-red-800 font-bold px-2.5 py-0.5 rounded-full border border-red-200">
                        {diagnosis.severity}
                      </span>
                      <span className="text-[11px] bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded-md">
                        {diagnosis.confidenceScore}% AI Confidence
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-black text-stone-900">
                      {diagnosis.conditionName}
                    </h2>
                    {diagnosis.scientificName && (
                      <p className="text-xs text-stone-500 italic">
                        {diagnosis.scientificName} ({diagnosis.pathogenType})
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSpeakDiagnosis}
                  className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm shrink-0"
                >
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>{t('common.speak')}</span>
                </button>
              </div>

              {/* Summary & Symptoms */}
              <div className="space-y-2.5">
                <p className="text-xs sm:text-sm text-stone-800 font-medium bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 leading-relaxed">
                  📢 {diagnosis.summary}
                </p>

                {diagnosis.symptoms.length > 0 && (
                  <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200">
                    <p className="text-xs font-bold text-stone-900 mb-1.5">
                      🔍 {language === 'te' ? 'గుర్తించబడిన లక్షణాలు' : language === 'hi' ? 'पहचाने गए लक्षण' : 'Observed Symptoms'}:
                    </p>
                    <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside">
                      {diagnosis.symptoms.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Treatment Mode Switcher: Organic vs Chemical */}
              <div>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-100 rounded-2xl mb-3">
                  <button
                    onClick={() => setTreatmentTab('organic')}
                    className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 ${
                      treatmentTab === 'organic'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <span>🌿</span>
                    <span>{t('doctor.organicRemedy')}</span>
                  </button>

                  <button
                    onClick={() => setTreatmentTab('chemical')}
                    className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 ${
                      treatmentTab === 'chemical'
                        ? 'bg-amber-500 text-emerald-950 shadow-sm'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <span>🧪</span>
                    <span>{t('doctor.chemicalRemedy')}</span>
                  </button>
                </div>

                {/* Treatment details */}
                {treatmentTab === 'organic' ? (
                  <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 space-y-2">
                    <h4 className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5">
                      <span>🌿 {language === 'te' ? 'సేంద్రీయ / నాటు పద్ధతులు (ఖర్చు తక్కువ, రక్షణ ఎక్కువ)' : language === 'hi' ? 'जैविक व पारंपरिक उपचार (कम लागत)' : 'Organic & Biological Treatment'}</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                      {diagnosis.organicRemedy.map((remedy, i) => (
                        <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{remedy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 space-y-2">
                    <h4 className="font-bold text-amber-950 text-xs sm:text-sm flex items-center gap-1.5">
                      <span>🧪 {language === 'te' ? 'యూనివర్సిటీ సిఫార్సు చేసిన రసాయన మందులు & ఖచ్చితమైన మోతాదు' : language === 'hi' ? 'अनुशंसित रासायनिक दवा व सटीक मात्रा' : 'ICAR / University Recommended Chemical Spray & Dosage'}</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                      {diagnosis.chemicalRemedy.map((chem, i) => (
                        <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-200">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{chem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Preventive Actions */}
              {diagnosis.preventiveActions.length > 0 && (
                <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200">
                  <p className="text-xs font-bold text-stone-900 mb-1.5">
                    🛡️ {t('doctor.preventiveTips')}:
                  </p>
                  <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside">
                    {diagnosis.preventiveActions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            /* Empty placeholder state */
            <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-stone-300 text-center space-y-3 flex flex-col items-center justify-center min-h-[380px]">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-stone-800 text-base">
                {language === 'te'
                  ? 'ఇంకా ఫోటో తీయలేదు'
                  : language === 'hi'
                  ? 'अभी तक कोई फोटो नहीं ली गई'
                  : 'No crop photo analyzed yet'}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm">
                {language === 'te'
                  ? 'ఎడమ వైపున కెమెరా లేదా గ్యాలరీ బటన్ నొక్కండి, లేదా ఉదాహరణ నమూనాను ఎంచుకోండి.'
                  : language === 'hi'
                  ? 'बाईं ओर कैमरे से फोटो लें या खेत का नमूना चुनें।'
                  : 'Tap Camera or Upload from Gallery on the left, or click a common field sample.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
