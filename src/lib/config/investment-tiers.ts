// Investment Plan Configuration - SUNRAY ECOSYSTEM
// 15% Monthly Return | 12 Months Agreement | First Payout 45 Days, Then 30 Days

export interface InvestmentTier {
  id: string;
  name: string;
  level: string;
  investment: number;
  monthlyProfit: number;
  annualReturn: number;
  profitRate: number;
  firstPayoutDays: number;
  subsequentPayoutDays: number;
  totalPayouts: number;
  featured?: boolean;
}

export const INVESTMENT_CONFIG = {
  profitRate: 0.15, // 15% monthly
  agreementMonths: 12,
  firstPayoutDays: 45,
  subsequentPayoutDays: 30,
  totalPayouts: 12,
  minInvestment: 51111,
  maxInvestment: 1100000000,
  adminChargePercent: 0.10,
  kycMandatory: true,
  nomineeMandatory: true,
} as const;

export const INVESTMENT_TIERS: InvestmentTier[] = [
  {
    id: 'tier-a',
    name: 'Starter',
    level: 'A',
    investment: 51111,
    monthlyProfit: 7667,
    annualReturn: 92004,
    profitRate: 0.15,
    firstPayoutDays: 45,
    subsequentPayoutDays: 30,
    totalPayouts: 12,
    featured: false,
  },
  {
    id: 'tier-l1',
    name: 'Bronze',
    level: 'L1',
    investment: 1060000,
    monthlyProfit: 159000,
    annualReturn: 1908000,
    profitRate: 0.15,
    firstPayoutDays: 45,
    subsequentPayoutDays: 30,
    totalPayouts: 12,
    featured: false,
  },
  {
    id: 'tier-l2',
    name: 'Silver',
    level: 'L2',
    investment: 2700000,
    monthlyProfit: 405000,
    annualReturn: 4860000,
    profitRate: 0.15,
    firstPayoutDays: 45,
    subsequentPayoutDays: 30,
    totalPayouts: 12,
    featured: false,
  },
  {
    id: 'tier-l3',
    name: 'Gold',
    level: 'L3',
    investment: 5300000,
    monthlyProfit: 795000,
    annualReturn: 9540000,
    profitRate: 0.15,
    firstPayoutDays: 45,
    subsequentPayoutDays: 30,
    totalPayouts: 12,
    featured: true,
  },
  {
    id: 'tier-l4',
    name: 'Platinum',
    level: 'L4',
    investment: 11000000,
    monthlyProfit: 1650000,
    annualReturn: 19800000,
    profitRate: 0.15,
    firstPayoutDays: 45,
    subsequentPayoutDays: 30,
    totalPayouts: 12,
    featured: false,
  },
  {
    id: 'tier-l5',
    name: 'Diamond',
    level: 'L5',
    investment: 25000000,
    monthlyProfit: 3750000,
    annualReturn: 45000000,
    profitRate: 0.15,
    firstPayoutDays: 45,
    subsequentPayoutDays: 30,
    totalPayouts: 12,
    featured: false,
  },
  {
    id: 'tier-l6',
    name: 'Ambassador',
    level: 'L6',
    investment: 110000000,
    monthlyProfit: 16500000,
    annualReturn: 198000000,
    profitRate: 0.15,
    firstPayoutDays: 45,
    subsequentPayoutDays: 30,
    totalPayouts: 12,
    featured: false,
  },
];

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}

export function calculateInvestmentReturn(amount: number, months: number = 12): {
  totalProfit: number;
  totalReturn: number;
  monthlyProfit: number;
} {
  const monthlyProfit = amount * INVESTMENT_CONFIG.profitRate;
  const totalProfit = monthlyProfit * months;
  const totalReturn = amount + totalProfit;
  
  return {
    monthlyProfit,
    totalProfit,
    totalReturn,
  };
}
