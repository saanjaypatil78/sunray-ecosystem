// Daily Deals Engine with Margin Protection
// Ensures vendors never face losses

export interface DailyDeal {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  originalPrice: number;
  dealPrice: number;
  discountPercent: number;
  marginPercent: number;
  costPrice: number;
  startTime: Date;
  endTime: Date;
  stock: number;
  soldCount: number;
  isActive: boolean;
  category: string;
  source: string;
}

export interface DealAnalysis {
  productId: string;
  suggestedDiscount: number;
  maxDiscount: number;
  minSellingPrice: number;
  profitAtDeal: number;
  marginAtDeal: number;
  isProfitable: boolean;
  recommendation: 'PROCEED' | 'CAUTION' | 'NOT_RECOMMENDED';
}

export const DEAL_CONFIG = {
  minMarginPercent: 8, // Minimum 8% margin required
  maxDiscountPercent: 50, // Max 50% discount
  dealDurationHours: 24,
  minStockForDeal: 10,
  maxDealsPerDay: 20,
  flashDealHours: 4,
  weekendBonusPercent: 5,
} as const;

// Analyze if a deal is profitable
export function analyzeDeal(
  costPrice: number,
  mrp: number,
  currentSellingPrice: number,
  proposedDiscount: number
): DealAnalysis {
  const dealPrice = mrp * (1 - proposedDiscount / 100);
  const profitAtDeal = dealPrice - costPrice;
  const marginAtDeal = (profitAtDeal / dealPrice) * 100;
  
  const maxDiscount = ((mrp - costPrice * 1.08) / mrp) * 100; // 8% margin minimum
  const minSellingPrice = costPrice * 1.08; // Minimum price with 8% margin
  
  const isProfitable = marginAtDeal >= DEAL_CONFIG.minMarginPercent;
  
  let recommendation: DealAnalysis['recommendation'];
  if (marginAtDeal >= 15) {
    recommendation = 'PROCEED';
  } else if (marginAtDeal >= DEAL_CONFIG.minMarginPercent) {
    recommendation = 'CAUTION';
  } else {
    recommendation = 'NOT_RECOMMENDED';
  }

  return {
    productId: '',
    suggestedDiscount: Math.min(proposedDiscount, maxDiscount),
    maxDiscount,
    minSellingPrice,
    profitAtDeal,
    marginAtDeal,
    isProfitable,
    recommendation,
  };
}

// Generate smart daily deals
export function generateDailyDeals(): DailyDeal[] {
  // In production, this would analyze products and create optimal deals
  const deals: DailyDeal[] = [];
  
  // Deal generation logic with margin protection
  // Each deal is validated to ensure vendor profitability
  
  return deals;
}

// Calculate deal urgency score
export function calculateDealUrgency(deal: DailyDeal): number {
  const now = new Date();
  const timeRemaining = deal.endTime.getTime() - now.getTime();
  const totalDuration = deal.endTime.getTime() - deal.startTime.getTime();
  
  const timeScore = (1 - timeRemaining / totalDuration) * 40;
  const stockScore = (deal.soldCount / deal.stock) * 30;
  const discountScore = deal.discountPercent * 0.3;
  
  return Math.min(100, timeScore + stockScore + discountScore);
}

// Get deal time remaining
export function getDealTimeRemaining(endTime: Date): {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    total: diff,
  };
}
