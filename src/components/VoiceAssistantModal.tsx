import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Send, PhoneCall, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { VoiceService } from '../utils/speech';
import { getT } from '../translations';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  localityName: string;
  isOffline: boolean;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
  localityName,
  isOffline,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeakingAnswer, setIsSpeakingAnswer] = useState(false);
  const [answerResult, setAnswerResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = getT(language);

  // Suggested prompt pills based on selected language
  const suggestedQuestions = {
    te: [
      'రైతు భరోసా డబ్బులు ఎప్పుడు వస్తాయి?',
      'మిరపలో తామర పురుగు నివారణకు ఏ మందు కొట్టాలి?',
      'ఈరోజు వర్షం పడుతుందా? మందులు చల్లవచ్చా?',
      'రైతు బజార్‌లో టమాటా రేటు ఎంత?',
    ],
    en: [
      'How to apply for AP Raithu Bharosa?',
      'Best remedy for chilli leaf curl and thrips?',
      'Is it safe to spray pesticides today with rain forecast?',
      'What is the farm gate vs retail price gap for tomatoes?',
    ],
    hi: [
      'पीएम किसान की अगली किस्त कब आएगी?',
      'मिर्च में मरोड़िया रोग के लिए कौन सी दवा स्प्रे करें?',
      'क्या आज कीटनाशक छिड़कना सुरक्षित है?',
      'बिचौलियों से बचकर सीधे फसल कैसे बेचें?',
    ],
  };

  const handleStartListening = () => {
    setErrorMessage(null);
    const recognizer = VoiceService.createSpeechRecognizer(
      language,
      (transcript) => {
        setInputText(transcript);
        setIsListening(false);
        handleSendQuery(transcript);
      },
      (err) => {
        setErrorMessage(err === 'not-allowed' ? 'Microphone permission denied' : err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (recognizer) {
      setIsListening(true);
      recognizer.start();
    }
  };

  const handleSendQuery = async (queryToSend?: string) => {
    const q = (queryToSend || inputText).trim();
    if (!q) return;

    VoiceService.stop();
    setIsSpeakingAnswer(false);
    setIsThinking(true);
    setErrorMessage(null);

    // If offline, provide intelligent local fallback answers
    if (isOffline) {
      setTimeout(() => {
        let offlineAnswer = '';
        let spoken = '';
        if (q.includes('రైతు భరోసా') || q.includes('Bharosa') || q.includes('किस्त') || q.includes('किसान')) {
          offlineAnswer = language === 'te'
            ? 'రైతు భరోసా కింద ఏడాదికి ₹13,500 3 విడతల్లో జమ చేస్తారు. ఈ-క్రాప్ నమోదు, ఆధార్ లింక్ తప్పనిసరి. వివరాలకు RBK లేదా 1902 కి కాల్ చేయండి.'
            : language === 'hi'
            ? 'रैतु भरोसा व पीएम किसान के तहत किस्तों की जांच के लिए ई-क्रॉप व आधार सीडिंग अनिवार्य है। अधिक जानकारी हेतु 1902 या 155251 पर संपर्क करें।'
            : 'AP Raithu Bharosa disburses ₹13,500/yr in 3 installments. Ensure e-Crop booking and Aadhaar bank seeding.';
          spoken = offlineAnswer;
        } else if (q.includes('మిరప') || q.includes('chilli') || q.includes('మిర్చి') || q.includes('मिर्च')) {
          offlineAnswer = language === 'te'
            ? 'మిరపలో ఆకు ముడత నివారణకు ఎకరాకు 30 నీలం జిగురు అట్టలు పెట్టండి. తీవ్రత ఉంటే మూవెంటో ఎనర్జీ (1 మి.లీ/లీ) లేదా డెలిగేట్ (0.9 మి.లీ/లీ) సాయంత్రం పిచికారీ చేయండి.'
            : language === 'hi'
            ? 'मिर्च में थ्रिप्स व मरोड़िया के लिए नीले चिपचिपे ट्रैप लगाएं और मोवेंटो एनर्जी (1 मिली/लीटर) का छिड़काव करें।'
            : 'For chilli leaf curl and thrips, install 30 blue sticky traps/acre. Spray Movento Energy or Delegate in late afternoon.';
          spoken = offlineAnswer;
        } else {
          offlineAnswer = language === 'te'
            ? 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. సాధారణ పంట చికిత్సలు, వాతావరణ సమాచారం మరియు మార్కెట్ విశ్లేషణను యాప్‌లోని ట్యాబ్‌ల ద్వారా చూడవచ్చు.'
            : language === 'hi'
            ? 'आप ऑफलाइन हैं। स्थानीय फसल जानकारी व आपातकालीन रोग पुस्तकालय का उपयोग करें।'
            : 'You are currently in offline mode. Access pre-cached crop guides and emergency plant doctor tabs directly.';
          spoken = offlineAnswer;
        }

        const fallbackResult = {
          answer: offlineAnswer,
          keyAdvicePoints: ['ఆఫ్‌లైన్ మార్గదర్శకం (Offline Guide)', 'ఆర్బీకే వద్ద నమోదు (Register at RBK)', 'హెల్ప్‌లైన్: 1902'],
          spokenSummary: spoken,
          helplines: ['1902 (AP CM Grievance)', '1800-180-1551 (Kisan Call Centre)'],
        };

        setAnswerResult(fallbackResult);
        setIsThinking(false);
        VoiceService.speak(spoken, language, () => setIsSpeakingAnswer(false));
        setIsSpeakingAnswer(true);
      }, 600);
      return;
    }

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          language,
          location: localityName,
        }),
      });

      const data = await response.json();
      if (data.success && data.result) {
        setAnswerResult(data.result);
        const toSpeak = data.result.spokenSummary || data.result.answer;
        if (toSpeak) {
          VoiceService.speak(toSpeak, language, () => setIsSpeakingAnswer(false));
          setIsSpeakingAnswer(true);
        }
      } else {
        throw new Error(data.error || 'Failed to fetch advisory');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Unable to connect to AI advisor. Switched to offline response.');
    } finally {
      setIsThinking(false);
    }
  };

  const handleSpeakText = (text: string) => {
    if (isSpeakingAnswer) {
      VoiceService.stop();
      setIsSpeakingAnswer(false);
    } else {
      VoiceService.speak(text, language, () => setIsSpeakingAnswer(false));
      setIsSpeakingAnswer(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col border border-emerald-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>{t('common.voiceAssistant')}</span>
                <span className="text-xs bg-emerald-700/80 text-amber-200 px-2 py-0.5 rounded-full font-medium">
                  {localityName}
                </span>
              </h3>
              <p className="text-xs text-emerald-200">
                {language === 'te'
                  ? 'మాట్లాడండి లేదా టైప్ చేయండి - తెలుగులో వాయిస్ సమాధానం వినండి'
                  : language === 'hi'
                  ? 'बोलें या लिखें - हिंदी में तुरंत आवाज में उत्तर पाएं'
                  : 'Speak or type your question - listen in your language'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              VoiceService.stop();
              onClose();
            }}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Suggested Quick Questions */}
          <div>
            <p className="text-xs font-semibold text-stone-500 mb-2">
              {language === 'te' ? 'రైతన్నలు అడిగే ముఖ్యమైన ప్రశ్నలు:' : language === 'hi' ? 'मुख्य प्रश्न:' : 'Common Farmer Questions:'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(suggestedQuestions[language] || suggestedQuestions.en).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(q);
                    handleSendQuery(q);
                  }}
                  className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg px-2.5 py-1.5 font-medium transition text-left active:scale-98"
                >
                  💡 {q}
                </button>
              ))}
            </div>
          </div>

          {/* Error notice if any */}
          {errorMessage && (
            <div className="flex items-start gap-2 bg-red-50 text-red-800 border border-red-200 rounded-xl p-3 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Thinking animation */}
          {isThinking && (
            <div className="flex items-center justify-center gap-3 p-6 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900">
              <div className="w-3 h-3 bg-emerald-600 rounded-full animate-ping" />
              <span className="text-sm font-semibold">
                {language === 'te'
                  ? 'డాక్టర్ రైతు మిత్ర సమాధానం సిద్ధం చేస్తున్నారు...'
                  : language === 'hi'
                  ? 'कृषि सलाहकार उत्तर तैयार कर रहे हैं...'
                  : 'Dr. Raithu Mithra is preparing your agricultural guidance...'}
              </span>
            </div>
          )}

          {/* Answer Card */}
          {answerResult && (
            <div className="bg-emerald-50/70 border-2 border-emerald-300/80 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2.5">
                <span className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                  <span>🌾 {language === 'te' ? 'రైతు మిత్ర సలహా' : language === 'hi' ? 'सलाहकार का उत्तर' : "Expert Farmer's Advice"}</span>
                </span>
                <button
                  onClick={() => handleSpeakText(answerResult.spokenSummary || answerResult.answer)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition shadow-xs ${
                    isSpeakingAnswer
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeakingAnswer ? t('common.stopVoice') : t('common.speak')}</span>
                </button>
              </div>

              <div className="text-stone-800 text-sm whitespace-pre-line leading-relaxed">
                {answerResult.answer}
              </div>

              {/* Key Bullet Points */}
              {answerResult.keyAdvicePoints?.length > 0 && (
                <div className="bg-white/80 rounded-xl p-3 border border-emerald-200">
                  <p className="text-xs font-bold text-emerald-950 mb-1.5">
                    📌 {language === 'te' ? 'ముఖ్యమైన సూచనలు' : language === 'hi' ? 'मुख्य बिंदु' : 'Key Action Points'}:
                  </p>
                  <ul className="text-xs space-y-1 text-stone-700 list-disc list-inside">
                    {answerResult.keyAdvicePoints.map((pt: string, i: number) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Helplines */}
              <div className="flex items-center flex-wrap gap-2 pt-1 text-xs">
                <span className="text-stone-600 font-medium">
                  {language === 'te' ? 'సహాయ కేంద్రం:' : language === 'hi' ? 'हेल्पलाइन:' : 'Helplines:'}
                </span>
                <a
                  href="tel:1902"
                  className="inline-flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold border border-amber-300"
                >
                  <PhoneCall className="w-3 h-3 text-amber-700" />
                  <span>1902 (AP CM Grievance)</span>
                </a>
                <a
                  href="tel:18001801551"
                  className="inline-flex items-center gap-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold border border-emerald-300"
                >
                  <PhoneCall className="w-3 h-3 text-emerald-700" />
                  <span>1800-180-1551 (Kisan Call)</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar with Mic button & text submit */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center gap-2">
          {/* Big Voice Record Button */}
          <button
            onClick={handleStartListening}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                : 'bg-emerald-800 hover:bg-emerald-900 text-white'
            }`}
            title="Press and speak your question"
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendQuery();
            }}
            placeholder={
              language === 'te'
                ? 'వ్యవసాయ సందేహాలు ఇక్కడ టైప్ చేయండి లేదా మైక్ నొక్కండి...'
                : language === 'hi'
                ? 'कृषि प्रश्न यहां लिखें या माइक दबाएं...'
                : 'Type farming query or tap mic to speak...'
            }
            className="flex-1 bg-white border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 rounded-xl px-3.5 py-3 text-sm text-stone-900 outline-none shadow-inner"
          />

          <button
            onClick={() => handleSendQuery()}
            disabled={!inputText.trim() || isThinking}
            className="w-12 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-emerald-950 flex items-center justify-center font-bold shadow-md shrink-0 transition active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
