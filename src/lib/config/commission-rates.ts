// Commission & Royalty Configuration - SUNRAY ECOSYSTEM
// 6-Level Progressive Commission Structure

export interface CommissionLevel {
  level: number;
  name: string;
  baseRate: number;
}

export interface RoyaltyRank {
  id: string;
  name: string;
  businessTarget: number;
  royaltyAddOn: number;
  levels: number[];
  color: string;
  gradient: string;
}

export const COMMISSION_CONFIG = {
  totalCommissionPercent: 0.45, // 45% total
  adminChargePercent: 0.10, // 10% admin charges
  levels: 6,
  accumulationWindowHours: 24,
  batchProcessing: true,
} as const;

export const BASE_COMMISSION_LEVELS: CommissionLevel[] = [
  { level: 1, name: 'Level 1', baseRate: 0.20 }, // 20%
  { level: 2, name: 'Level 2', baseRate: 0.10 }, // 10%
  { level: 3, name: 'Level 3', baseRate: 0.07 }, // 7%
  { level: 4, name: 'Level 4', baseRate: 0.05 }, // 5%
  { level: 5, name: 'Level 5', baseRate: 0.02 }, // 2%
  { level: 6, name: 'Level 6', baseRate: 0.01 }, // 1%
];

export const ROYALTY_RANKS: RoyaltyRank[] = [
  {
    id: 'base',
    name: 'BASE',
    businessTarget: 0,
    royaltyAddOn: 0,
    levels: [0.20, 0.10, 0.07, 0.05, 0.02, 0.01],
    color: '#94A3B8',
    gradient: 'from-slate-400 to-slate-600',
  },
  {
    id: 'bronze',
    name: 'BRONZE',
    businessTarget: 10000000, // 1 Crore
    royaltyAddOn: 0.01,
    levels: [0.21, 0.11, 0.08, 0.06, 0.03, 0.02],
    color: '#CD7F32',
    gradient: 'from-amber-600 to-amber-800',
  },
  {
    id: 'silver',
    name: 'SILVER',
    businessTarget: 50000000, // 5 Crore
    royaltyAddOn: 0.0175,
    levels: [0.2175, 0.1175, 0.0875, 0.0675, 0.0375, 0.0275],
    color: '#C0C0C0',
    gradient: 'from-gray-300 to-gray-500',
  },
  {
    id: 'gold',
    name: 'GOLD',
    businessTarget: 100000000, // 10 Crore
    royaltyAddOn: 0.0225,
    levels: [0.2225, 0.1225, 0.0925, 0.0725, 0.0425, 0.0325],
    color: '#FFD700',
    gradient: 'from-yellow-400 to-yellow-600',
  },
  {
    id: 'platinum',
    name: 'PLATINUM',
    businessTarget: 250000000, // 25 Crore
    royaltyAddOn: 0.0260,
    levels: [0.2260, 0.1260, 0.0960, 0.0760, 0.0460, 0.0360],
    color: '#E5E4E2',
    gradient: 'from-slate-200 to-slate-400',
  },
  {
    id: 'diamond',
    name: 'DIAMOND',
    businessTarget: 500000000, // 50 Crore
    royaltyAddOn: 0.0285,
    levels: [0.2285, 0.1285, 0.0985, 0.0785, 0.0485, 0.0385],
    color: '#B9F2FF',
    gradient: 'from-cyan-300 to-cyan-500',
  },
  {
    id: 'ambassador',
    name: 'AMBASSADOR',
    businessTarget: 1000000000, // 100 Crore
    royaltyAddOn: 0.03,
    levels: [0.23, 0.13, 0.10, 0.08, 0.05, 0.04],
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-purple-600',
  },
];

export function getCommissionRateForRank(rankId: string, level: number): number {
  const rank = ROYALTY_RANKS.find(r => r.id === rankId) || ROYALTY_RANKS[0];
  return rank.levels[level - 1] || 0;
}

export function calculateCommission(
  investmentAmount: number,
  rankId: string,
  level: number
): {
  grossCommission: number;
  adminCharge: number;
  netCommission: number;
  rate: number;
} {
  const rate = getCommissionRateForRank(rankId, level);
  const grossCommission = investmentAmount * rate;
  const adminCharge = grossCommission * COMMISSION_CONFIG.adminChargePercent;
  const netCommission = grossCommission - adminCharge;

  return {
    grossCommission,
    adminCharge,
    netCommission,
    rate,
  };
}

export function getRankForBusinessVolume(volume: number): RoyaltyRank {
  for (let i = ROYALTY_RANKS.length - 1; i >= 0; i--) {
    if (volume >= ROYALTY_RANKS[i].businessTarget) {
      return ROYALTY_RANKS[i];
    }
  }
  return ROYALTY_RANKS[0];
}

export function formatBusinessTarget(target: number): string {
  if (target >= 100000000) {
    return `₹${target / 100000000} Cr`;
  } else if (target >= 100000) {
    return `₹${target / 100000} L`;
  }
  return `₹${target.toLocaleString('en-IN')}`;
}
