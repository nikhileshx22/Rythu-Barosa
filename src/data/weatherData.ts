import { WeatherAlert, WeatherDay } from '../types';

export const generateWeatherForecast = (localityId: string): { current: WeatherDay; forecast: WeatherDay[]; alerts: WeatherAlert[] } => {
  const daysOfWeek = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const today = new Date();

  // Tailor base metrics based on locality geography
  const isRayalaseema = localityId === 'anantapur' || localityId === 'kurnool';
  const isCoastal = localityId === 'guntur' || localityId === 'krishna' || localityId === 'prakasam' || localityId === 'east_godavari';
  
  const baseTemp = isRayalaseema ? 34 : isCoastal ? 32 : 31;
  const baseHumidity = isCoastal ? 78 : 55;

  const forecast: WeatherDay[] = daysOfWeek.map((dayLabel, index) => {
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + index);

    // Weather pattern simulation with a rain warning day on Day 2/3
    let condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Thunderstorm' | 'Humid' = 'Sunny';
    let rainProb = 15;
    let rainMm = 0;
    let sprayCondition: 'Safe' | 'Caution' | 'Unsafe' = 'Safe';
    let sprayAdvice = {
      te: 'పిచికారీకి అనుకూలమైన వాతావరణం. ఉదయం 7 నుండి 10 గంటల మధ్య లేదా సాయంత్రం వేళల్లో పిచికారీ చేయవచ్చు.',
      en: 'Favorable condition for spraying. Optimum timing: 7:00 AM to 10:00 AM or late afternoon.',
      hi: 'छिड़काव के लिए अनुकूल मौसम। सुबह 7 से 10 या शाम को छिड़काव करें।',
    };

    if (index === 1 || index === 2) {
      // Impending rain warning
      condition = index === 1 ? 'Partly Cloudy' : 'Rainy';
      rainProb = index === 1 ? 65 : 85;
      rainMm = index === 1 ? 12 : 38;
      sprayCondition = 'Unsafe';
      sprayAdvice = {
        te: 'హెచ్చరిక: రాబోయే 24 గంటల్లో భారీ వర్షం పడే అవకాశం ఉంది. ఎరువులు లేదా రసాయన మందులు పిచికారీ చేయవద్దు, కొట్టుకుపోతాయి.',
        en: 'Warning: Moderate to heavy rain expected. Postpone fertilizer broadcasting and pesticide sprays to prevent chemical wash-off.',
        hi: 'चेतावनी: भारी बारिश की संभावना। कीटनाशक या खाद का छिड़काव न करें, दवा बह जाएगी।',
      };
    } else if (index === 3) {
      condition = 'Partly Cloudy';
      rainProb = 40;
      rainMm = 4;
      sprayCondition = 'Caution';
      sprayAdvice = {
        te: 'మట్టిలో తేమ అధికంగా ఉంటుంది; కాసేపు ఆరిన తర్వాత మాత్రమే తేలికపాటి పిచికారీ చేపట్టండి.',
        en: 'Soil remains saturated. Wait until canopy dries completely before resuming sprays.',
        hi: 'मिट्टी में अत्यधिक नमी है, पत्तियां सूखने के बाद ही हल्का छिड़काव करें।',
      };
    }

    const maxT = baseTemp - (index === 2 ? 4 : Math.round(Math.sin(index) * 2));
    const minT = maxT - 9;
    const humidity = baseHumidity + (condition === 'Rainy' ? 18 : 0);

    const iconName = condition === 'Rainy' ? 'cloud-rain' : (condition as string) === 'Thunderstorm' ? 'cloud-lightning' : condition === 'Partly Cloudy' ? 'cloud-sun' : 'sun';

    return {
      day: dayLabel,
      date: forecastDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      tempMax: maxT,
      tempMin: minT,
      condition,
      rainProbability: rainProb,
      rainfallMm: rainMm,
      humidity,
      windSpeedKmh: index === 2 ? 26 : 14,
      uvIndex: condition === 'Sunny' ? 8 : 4,
      sprayCondition,
      sprayAdvice,
      icon: iconName,
    };
  });

  const alerts: WeatherAlert[] = [
    {
      id: 'alert_rain_48hr',
      type: 'rain_warning',
      severity: 'warning',
      title: {
        te: 'ముఖ్యమైన హెచ్చరిక: రాబోయే 48 గంటల్లో భారీ వర్షపు సూచన 🌧️',
        en: 'Heavy Rainfall Warning within next 48 Hours 🌧️',
        hi: 'भारी बारिश की चेतावनी: अगले 48 घंटों में तेज वर्षा 🌧️',
      },
      message: {
        te: 'బంగాళాఖాతంలో అల్పపీడనం ప్రభావంతో మీ మండలంలో 25-45 మి.మీ వరకు అకాల వర్షం కురిసే అవకాశం ఉంది. కల్లాలలో ఆరబోసిన మిరప, ధాన్యం రాశులను తడిసిపోకుండా టార్పాలిన్లతో కప్పి భద్రపరచండి.',
        en: 'Depression in Bay of Bengal likely to bring 25-45mm unseasonal rains across your district. Cover open threshing floors, drying chillies, and harvested paddy heaps with tarpaulins immediately.',
        hi: 'बंगाल की खाड़ी में बने निम्न दबाव के कारण 25-45 मिमी वर्षा की संभावना है। खलिहान में सूख रही मिर्च व धान को तुरंत तिरपाल से ढकें।',
      },
      actionRequired: {
        te: 'చేలలో నిలిచే నీటిని బయటకు పంపేందుకు మురుగు కాలువలను సరిచేయండి. నత్రజని ఎరువులు వేయవద్దు.',
        en: 'Open drainage channels immediately to prevent waterlogging. Postpone all nitrogen top-dressing.',
        hi: 'खेतों से जल निकासी की नालियां खोलें। यूरिया का छिड़काव टालें।',
      },
      validTill: '48 Hours',
    },
    {
      id: 'alert_humidity_pest',
      type: 'pest_risk',
      severity: 'info',
      title: {
        te: 'అధిక తేమ వల్ల శిలీంధ్ర తెగుళ్ళ ముప్పు (Fungal Alert) 🍄',
        en: 'High Humidity Fungal Blast / Blight Risk Alert 🍄',
        hi: 'अधिक नमी के कारण फफूंद व ब्लास्ट रोग का खतरा 🍄',
      },
      message: {
        te: 'గాలిలో తేమ 80% దాటడం వలన వరిలో అగ్గి తెగులు (Blast), మిరపలో కొమ్మ ఎండు తెగులు (Die-back) వేగంగా వ్యాపించే ప్రమాదం ఉంది.',
        en: 'Atmospheric humidity above 80% with cloudy skies drastically elevates risk of Paddy Blast and Chilli Anthracnose Die-back.',
        hi: '80% से अधिक आर्द्रता से धान में झुलसा और मिर्च में डाई-बैक का खतरा बढ़ गया है।',
      },
      actionRequired: {
        te: 'వర్షం తగ్గిన వెంటనే సాఫ్ (Saaf @ 2 గ్రా/లీ) లేదా ట్రైసైక్లాజోల్ పిచికారీకి సిద్ధంగా ఉండండి.',
        en: 'Keep systemic fungicide (Tricyclazole or Carbendazim+Mancozeb) ready for immediate post-rain protective spray.',
        hi: 'बारिश रुकते ही अनुशंसित फफूंदनाशी छिड़कने की तैयारी रखें।',
      },
      validTill: 'Next 5 Days',
    },
  ];

  return {
    current: forecast[0],
    forecast,
    alerts,
  };
};
