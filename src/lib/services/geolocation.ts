// IP Geolocation Service for Language/Currency Detection
// Production-grade geo-location with fallback mechanisms

export interface GeoLocation {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  currency: string;
  currencySymbol: string;
  language: string;
  locale: string;
}

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Rate against INR (base)
  decimalPlaces: number;
}

export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
}

// Currency data with INR as base (rate = 1)
export const CURRENCIES: Record<string, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1, decimalPlaces: 0 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012, decimalPlaces: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.011, decimalPlaces: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0095, decimalPlaces: 2 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 0.044, decimalPlaces: 2 },
  SAR: { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', rate: 0.045, decimalPlaces: 2 },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.016, decimalPlaces: 2 },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 0.056, decimalPlaces: 2 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.018, decimalPlaces: 2 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.016, decimalPlaces: 2 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 1.79, decimalPlaces: 0 },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 0.086, decimalPlaces: 2 },
  KRW: { code: 'KRW', symbol: '₩', name: 'South Korean Won', rate: 15.89, decimalPlaces: 0 },
  THB: { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 0.42, decimalPlaces: 2 },
  VND: { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', rate: 303.5, decimalPlaces: 0 },
  PHP: { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rate: 0.67, decimalPlaces: 2 },
  IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 188.5, decimalPlaces: 0 },
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rate: 1.32, decimalPlaces: 2 },
  PKR: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', rate: 3.35, decimalPlaces: 2 },
  LKR: { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', rate: 3.89, decimalPlaces: 2 },
  NPR: { code: 'NPR', symbol: 'रू', name: 'Nepalese Rupee', rate: 1.60, decimalPlaces: 2 },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 0.22, decimalPlaces: 2 },
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 18.5, decimalPlaces: 2 },
  KES: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 1.54, decimalPlaces: 2 },
  EGP: { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', rate: 0.58, decimalPlaces: 2 },
  TRY: { code: 'TRY', symbol: '₺', name: 'Turkish Lira', rate: 0.39, decimalPlaces: 2 },
  BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 0.059, decimalPlaces: 2 },
  MXN: { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', rate: 0.21, decimalPlaces: 2 },
  RUB: { code: 'RUB', symbol: '₽', name: 'Russian Ruble', rate: 1.09, decimalPlaces: 2 },
  PLN: { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', rate: 0.048, decimalPlaces: 2 },
};

// Language data
export const LANGUAGES: Record<string, LanguageInfo> = {
  en: { code: 'en', name: 'English', nativeName: 'English', rtl: false },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', rtl: false },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', rtl: false },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', rtl: false },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', rtl: false },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', rtl: false },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어', rtl: false },
  th: { code: 'th', name: 'Thai', nativeName: 'ไทย', rtl: false },
  vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', rtl: false },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', rtl: false },
  ms: { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', rtl: false },
  bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', rtl: false },
  ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', rtl: false },
  te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', rtl: false },
  mr: { code: 'mr', name: 'Marathi', nativeName: 'मराठी', rtl: false },
  gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', rtl: false },
  kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', rtl: false },
  ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', rtl: false },
  pa: { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', rtl: false },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true },
  fa: { code: 'fa', name: 'Persian', nativeName: 'فارسی', rtl: true },
  tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', rtl: false },
  nl: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', rtl: false },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano', rtl: false },
  pl: { code: 'pl', name: 'Polish', nativeName: 'Polski', rtl: false },
  uk: { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', rtl: false },
};

// Country to Currency mapping
const COUNTRY_CURRENCY: Record<string, string> = {
  IN: 'INR', US: 'USD', GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR',
  NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR', IE: 'EUR', GR: 'EUR',
  AE: 'AED', SA: 'SAR', KW: 'KWD', BH: 'BHD', QA: 'QAR', OM: 'OMR',
  SG: 'SGD', MY: 'MYR', TH: 'THB', VN: 'VND', ID: 'IDR', PH: 'PHP',
  JP: 'JPY', CN: 'CNY', KR: 'KRW', TW: 'TWD', HK: 'HKD',
  AU: 'AUD', NZ: 'NZD', CA: 'CAD', MX: 'MXN', BR: 'BRL', AR: 'ARS',
  ZA: 'ZAR', NG: 'NGN', KE: 'KES', EG: 'EGP', MA: 'MAD',
  RU: 'RUB', TR: 'TRY', PL: 'PLN', SE: 'SEK', NO: 'NOK', DK: 'DKK',
  PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR', MM: 'MMK',
};

// Country to Language mapping
const COUNTRY_LANGUAGE: Record<string, string> = {
  IN: 'hi', US: 'en', GB: 'en', DE: 'de', FR: 'fr', IT: 'it', ES: 'es',
  NL: 'nl', BE: 'nl', AT: 'de', PT: 'pt', IE: 'en', GR: 'el',
  AE: 'ar', SA: 'ar', KW: 'ar', BH: 'ar', QA: 'ar', OM: 'ar',
  SG: 'en', MY: 'ms', TH: 'th', VN: 'vi', ID: 'id', PH: 'en',
  JP: 'ja', CN: 'zh', KR: 'ko', TW: 'zh', HK: 'zh',
  AU: 'en', NZ: 'en', CA: 'en', MX: 'es', BR: 'pt', AR: 'es',
  ZA: 'en', NG: 'en', KE: 'en', EG: 'ar', MA: 'ar',
  RU: 'ru', TR: 'tr', PL: 'pl', SE: 'sv', NO: 'no', DK: 'da',
  PK: 'ur', BD: 'bn', LK: 'si', NP: 'ne', MM: 'my',
};

// Get user location from IP
export async function getGeoLocation(ip?: string): Promise<GeoLocation> {
  // Default to India if no IP
  const defaultLocation: GeoLocation = {
    country: 'India',
    countryCode: 'IN',
    region: 'Maharashtra',
    city: 'Mumbai',
    latitude: 19.076,
    longitude: 72.8777,
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    currencySymbol: '₹',
    language: 'hi',
    locale: 'hi-IN',
  };

  try {
    // Try multiple IP geolocation services for redundancy
    const services = [
      `https://ipapi.co/json/${ip ? `?ip=${ip}` : ''}`,
      `https://ip-api.com/json/${ip || ''}`,
    ];

    for (const url of services) {
      try {
        const response = await fetch(url, { 
          signal: AbortSignal.timeout(3000) 
        });
        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country_code || data.countryCode || 'IN';
          const currency = COUNTRY_CURRENCY[countryCode] || 'INR';
          const language = COUNTRY_LANGUAGE[countryCode] || 'en';
          
          return {
            country: data.country_name || data.country || 'India',
            countryCode,
            region: data.region || data.regionName || '',
            city: data.city || '',
            latitude: data.latitude || data.lat || 0,
            longitude: data.longitude || data.lon || 0,
            timezone: data.timezone || 'Asia/Kolkata',
            currency,
            currencySymbol: CURRENCIES[currency]?.symbol || '₹',
            language,
            locale: `${language}-${countryCode}`,
          };
        }
      } catch {
        continue;
      }
    }
  } catch (error) {
    console.error('Geolocation error:', error);
  }

  return defaultLocation;
}

// Convert price from INR to target currency
export function convertPrice(
  priceINR: number, 
  targetCurrency: string
): { amount: number; formatted: string; currency: CurrencyInfo } {
  const currency = CURRENCIES[targetCurrency] || CURRENCIES.INR;
  const convertedAmount = priceINR * currency.rate;
  
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(convertedAmount);

  return { amount: convertedAmount, formatted, currency };
}

// Format price with currency symbol
export function formatPrice(
  amount: number, 
  currencyCode: string = 'INR'
): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(amount);
}

// Get supported currencies list
export function getSupportedCurrencies(): CurrencyInfo[] {
  return Object.values(CURRENCIES);
}

// Get supported languages list
export function getSupportedLanguages(): LanguageInfo[] {
  return Object.values(LANGUAGES);
}

// Get time remaining for a deal
export function getDealTimeRemaining(endTime: Date | null): { hours: number; minutes: number; seconds: number } | null {
  if (!endTime) return null;
  
  const now = new Date();
  const end = new Date(endTime);
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}
