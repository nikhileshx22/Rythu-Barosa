export type Language = 'te' | 'en' | 'hi';

export type Season = 'kharif' | 'rabi' | 'summer';

export type SoilType = 'black' | 'red' | 'alluvial' | 'sandy_loam';

export interface Locality {
  id: string;
  name: { te: string; en: string; hi: string };
  state: { te: string; en: string; hi: string };
  regionType: 'coastal' | 'rayalaseema' | 'telangana' | 'central_india' | 'north_india';
  defaultSoil: SoilType;
  majorCrops: string[];
}

export interface CropInfo {
  id: string;
  name: { te: string; en: string; hi: string };
  scientificName: string;
  category: 'cereal' | 'commercial' | 'pulse' | 'vegetable' | 'fruit' | 'oilseed';
  season: Season[];
  durationDays: string;
  waterRequirement: 'low' | 'medium' | 'high';
  suitableSoils: SoilType[];
  investmentPerAcre: number; // in INR
  expectedYieldPerAcre: string; // e.g., "25 - 30 Quintals"
  marketPriceAvg: number; // per quintal or kg
  unit: 'Quintal' | 'Kg' | 'Tonne';
  estimatedRevenuePerAcre: number;
  estimatedProfitPerAcre: number;
  msp?: number; // Minimum Support Price per quintal if applicable
  sowingWindow: { te: string; en: string; hi: string };
  harvestingWindow: { te: string; en: string; hi: string };
  bestVarieties: string[];
  localSoilAdvice: { te: string; en: string; hi: string };
  irrigationTips: { te: string; en: string; hi: string };
  fertilizerSchedule: { te: string; en: string; hi: string };
  image: string;
}

export interface PlantDiagnosis {
  id: string;
  timestamp: number;
  cropName: string;
  conditionName: string;
  scientificName?: string;
  pathogenType: string;
  severity: string;
  confidenceScore: number;
  summary: string;
  symptoms: string[];
  causes?: string;
  organicRemedy: string[];
  chemicalRemedy: string[];
  preventiveActions: string[];
  voiceBrief?: string;
  imageUrl?: string;
  isOfflineSample?: boolean;
}

export interface WeatherDay {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Thunderstorm' | 'Humid';
  rainProbability: number; // %
  rainfallMm: number;
  humidity: number; // %
  windSpeedKmh: number;
  uvIndex: number;
  sprayCondition: 'Safe' | 'Caution' | 'Unsafe';
  sprayAdvice: { te: string; en: string; hi: string };
  icon: string;
}

export interface WeatherAlert {
  id: string;
  type: 'rain_warning' | 'cyclone_alert' | 'pest_risk' | 'heatwave';
  severity: 'warning' | 'danger' | 'info';
  title: { te: string; en: string; hi: string };
  message: { te: string; en: string; hi: string };
  actionRequired: { te: string; en: string; hi: string };
  validTill: string;
}

export interface GovtScheme {
  id: string;
  title: { te: string; en: string; hi: string };
  subtitle: { te: string; en: string; hi: string };
  type: 'ap_state' | 'central';
  category: 'direct_benefit' | 'insurance' | 'credit' | 'machinery' | 'irrigation';
  financialBenefit: { te: string; en: string; hi: string };
  eligibility: { te: string; en: string; hi: string }[];
  requiredDocuments: { te: string; en: string; hi: string }[];
  howToApply: { te: string; en: string; hi: string }[];
  deadlineOrSchedule: { te: string; en: string; hi: string };
  portalUrl?: string;
  helpline: string;
  badge: { te: string; en: string; hi: string };
  isActive: boolean;
}

export interface PriceBreakdownItem {
  id: string;
  cropName: { te: string; en: string; hi: string };
  unit: string; // e.g. "Kg" or "Quintal"
  farmGatePrice: number; // What farmer gets
  renderCut: number; // What broker / render / commission agent takes
  mandiFeeAndTransport: number; // Transport, loading, APMC cess
  wholesaleMandiPrice: number;
  rythuBazaarPrice: number; // Direct farmer-to-consumer price in AP/TS
  retailConsumerPrice: number; // What consumer pays in supermarket / city
  farmerSharePercent: number; // e.g. 35%
  renderMarginPercent: number; // e.g. 28%
  priceTrend7Days: number; // percentage change + or -
  localMandiName: string; // e.g. "Guntur Mirchi Yard" or "Madanapalle Market"
  howToAvoidRendersTip: { te: string; en: string; hi: string };
}

export interface IndiaCropProduction {
  cropId: string;
  cropName: { te: string; en: string; hi: string };
  totalProductionLakhTonnes: number;
  cultivatedAreaLakhHectares: number;
  averageYieldKgPerHectare: number;
  globalRank: number; // e.g. 1 or 2
  indiaGlobalSharePercent: number;
  topStates: {
    stateName: { te: string; en: string; hi: string };
    sharePercent: number;
    productionLakhTonnes: number;
    isLocalState?: boolean;
  }[];
  msp2025: number; // ₹ per quintal
  mspGrowthPercent: number;
  annualExportValueCrores: number;
}
