// Vendor Plan Configuration - SUNRAY ECOSYSTEM
// 25% Active Return | Revenue Sharing 85/15 | Monthly Payouts

export interface VendorTier {
  id: string;
  name: string;
  minInvestment: number;
  maxInvestment: number;
  returnRate: number;
  revenueShareVendor: number;
  revenueSharePlatform: number;
  payoutDays: number;
  minProducts: number;
  businessWeight: number;
}

export const VENDOR_CONFIG = {
  returnRate: 0.25, // 25% monthly
  revenueShareVendor: 0.85, // 85% to vendor
  revenueSharePlatform: 0.15, // 15% to platform
  payoutDays: 30, // Monthly
  minInvestment: 100000, // 1 Lakh
  maxInvestment: 500000000, // 50 Crore
  minProductsToActivate: 5,
  adminChargePercent: 0.10,
  businessWeight: 2.0, // 2x weight for rank calculation
  agreementMonths: 12,
} as const;

export const VENDOR_TIERS: VendorTier[] = [
  {
    id: 'vendor-starter',
    name: 'Starter Vendor',
    minInvestment: 100000,
    maxInvestment: 1000000,
    returnRate: 0.25,
    revenueShareVendor: 0.85,
    revenueSharePlatform: 0.15,
    payoutDays: 30,
    minProducts: 5,
    businessWeight: 2.0,
  },
  {
    id: 'vendor-growth',
    name: 'Growth Vendor',
    minInvestment: 1000000,
    maxInvestment: 10000000,
    returnRate: 0.25,
    revenueShareVendor: 0.85,
    revenueSharePlatform: 0.15,
    payoutDays: 30,
    minProducts: 10,
    businessWeight: 2.0,
  },
  {
    id: 'vendor-premium',
    name: 'Premium Vendor',
    minInvestment: 10000000,
    maxInvestment: 500000000,
    returnRate: 0.25,
    revenueShareVendor: 0.85,
    revenueSharePlatform: 0.15,
    payoutDays: 30,
    minProducts: 15,
    businessWeight: 2.0,
  },
];

export const VENDOR_TYPES = [
  'PRODUCT',
  'SERVICE',
  'FRANCHISE',
  'DISTRIBUTOR',
] as const;

export const BUSINESS_CATEGORIES = [
  'Electronics',
  'Fashion & Apparel',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Health & Wellness',
  'Sports & Fitness',
  'Books & Stationery',
  'Toys & Games',
  'Automotive',
  'Food & Beverages',
  'Jewelry & Accessories',
  'Furniture',
  'Software & Digital',
  'Services',
  'Other',
] as const;

export function calculateVendorReturn(investmentAmount: number): {
  monthlyReturn: number;
  adminCharge: number;
  netReturn: number;
  annualReturn: number;
} {
  const monthlyReturn = investmentAmount * VENDOR_CONFIG.returnRate;
  const adminCharge = monthlyReturn * VENDOR_CONFIG.adminChargePercent;
  const netReturn = monthlyReturn - adminCharge;
  const annualReturn = netReturn * 12;

  return {
    monthlyReturn,
    adminCharge,
    netReturn,
    annualReturn,
  };
}

export function calculateRevenueShare(orderTotal: number): {
  vendorShare: number;
  platformFee: number;
} {
  const vendorShare = orderTotal * VENDOR_CONFIG.revenueShareVendor;
  const platformFee = orderTotal * VENDOR_CONFIG.revenueSharePlatform;

  return {
    vendorShare,
    platformFee,
  };
}

export function formatVendorCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}
