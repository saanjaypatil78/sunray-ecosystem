// Vendor ROI Distribution System
// Fixed charge: ₹100,000 INR for vendor registration

export interface VendorROI {
  vendorId: string;
  totalInvestment: number;
  fixedCharge: number;
  returnRate: number;
  monthlyReturn: number;
  revenueShare: {
    vendor: number;
    platform: number;
  };
  totalRevenue: number;
  totalCommission: number;
  netProfit: number;
  roiPercentage: number;
}

export interface VendorEarnings {
  vendorId: string;
  period: string;
  grossSales: number;
  platformFee: number;
  netEarnings: number;
  investmentReturn: number;
  commission: number;
  totalPayout: number;
}

export const VENDOR_ROI_CONFIG = {
  fixedCharge: 100000, // ₹1,00,000 INR
  returnRate: 0.25, // 25% monthly
  revenueShareVendor: 0.85, // 85%
  revenueSharePlatform: 0.15, // 15%
  adminChargePercent: 0.10, // 10%
  minInvestment: 100000,
  maxInvestment: 50000000,
  agreementMonths: 12,
  payoutDays: 30,
  minProductsToActivate: 5,
} as const;

// Calculate vendor ROI
export function calculateVendorROI(
  investmentAmount: number,
  monthlyRevenue: number = 0
): VendorROI {
  const monthlyReturn = investmentAmount * VENDOR_ROI_CONFIG.returnRate;
  const adminCharge = monthlyReturn * VENDOR_ROI_CONFIG.adminChargePercent;
  const netMonthlyReturn = monthlyReturn - adminCharge;
  
  const vendorShare = monthlyRevenue * VENDOR_ROI_CONFIG.revenueShareVendor;
  const platformFee = monthlyRevenue * VENDOR_ROI_CONFIG.revenueSharePlatform;
  
  const totalRevenue = vendorShare + netMonthlyReturn;
  const roiPercentage = ((totalRevenue * 12) / investmentAmount) * 100;

  return {
    vendorId: '',
    totalInvestment: investmentAmount,
    fixedCharge: VENDOR_ROI_CONFIG.fixedCharge,
    returnRate: VENDOR_ROI_CONFIG.returnRate,
    monthlyReturn: netMonthlyReturn,
    revenueShare: {
      vendor: vendorShare,
      platform: platformFee,
    },
    totalRevenue: monthlyRevenue,
    totalCommission: 0,
    netProfit: totalRevenue - platformFee,
    roiPercentage,
  };
}

// Calculate vendor earnings for a period
export function calculateVendorEarnings(
  vendorId: string,
  grossSales: number,
  investmentAmount: number
): VendorEarnings {
  const platformFee = grossSales * VENDOR_ROI_CONFIG.revenueSharePlatform;
  const netEarnings = grossSales * VENDOR_ROI_CONFIG.revenueShareVendor;
  
  const investmentReturn = investmentAmount * VENDOR_ROI_CONFIG.returnRate;
  const adminCharge = investmentReturn * VENDOR_ROI_CONFIG.adminChargePercent;
  const netInvestmentReturn = investmentReturn - adminCharge;
  
  const totalPayout = netEarnings + netInvestmentReturn;

  return {
    vendorId,
    period: new Date().toISOString().slice(0, 7),
    grossSales,
    platformFee,
    netEarnings,
    investmentReturn: netInvestmentReturn,
    commission: 0,
    totalPayout,
  };
}
