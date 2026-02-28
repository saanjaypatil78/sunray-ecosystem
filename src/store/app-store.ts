import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// User Types
export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  contactNo: string;
  username: string;
  referralCode: string;
  referredBy?: string;
  status: 'RED' | 'GREEN';
  role: 'INVESTOR' | 'VENDOR' | 'ADMIN';
  rank: string;
  createdAt: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export interface Investment {
  id: string;
  userId: string;
  tier: string;
  amount: number;
  monthlyProfit: number;
  startDate: string;
  nextPayoutDate: string;
  payoutsCompleted: number;
  totalPayouts: number;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'WITHDRAWN';
}

export interface VendorInfo {
  id: string;
  userId: string;
  businessName: string;
  businessCategory: string;
  vendorType: string;
  investmentAmount: number;
  monthlyReturn: number;
  totalProducts: number;
  totalSales: number;
  revenueShare: number;
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
}

export interface Commission {
  level: number;
  amount: number;
  members: number;
}

// App State Interface
interface AppState {
  // App State
  showSplash: boolean;
  currentStep: 'splash' | 'auth' | 'dashboard';
  activeTab: 'overview' | 'investment' | 'vendor' | 'commission' | 'profile';
  
  // User State
  user: User | null;
  isAuthenticated: boolean;
  
  // Investment State
  investments: Investment[];
  
  // Vendor State
  vendorInfo: VendorInfo | null;
  
  // Commission State
  commissions: Commission[];
  totalBusinessVolume: number;
  currentRank: string;
  
  // Actions
  setShowSplash: (show: boolean) => void;
  setCurrentStep: (step: 'splash' | 'auth' | 'dashboard') => void;
  setActiveTab: (tab: 'overview' | 'investment' | 'vendor' | 'commission' | 'profile') => void;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  addInvestment: (investment: Investment) => void;
  setVendorInfo: (vendor: VendorInfo | null) => void;
  setCommissions: (commissions: Commission[]) => void;
  setTotalBusinessVolume: (volume: number) => void;
  updateRank: (rank: string) => void;
  completeSplash: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial State
      showSplash: true,
      currentStep: 'splash',
      activeTab: 'overview',
      user: null,
      isAuthenticated: false,
      investments: [],
      vendorInfo: null,
      commissions: [],
      totalBusinessVolume: 0,
      currentRank: 'BASE',

      // Actions
      setShowSplash: (show) => set({ showSplash: show }),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      login: (user) => set({ 
        user, 
        isAuthenticated: true,
        currentStep: 'dashboard',
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        currentStep: 'auth',
        investments: [],
        vendorInfo: null,
        commissions: [],
      }),
      
      addInvestment: (investment) => set((state) => ({
        investments: [...state.investments, investment],
      })),
      
      setVendorInfo: (vendor) => set({ vendorInfo: vendor }),
      
      setCommissions: (commissions) => set({ commissions }),
      
      setTotalBusinessVolume: (volume) => set({ totalBusinessVolume: volume }),
      
      updateRank: (rank) => set({ currentRank: rank }),
      
      completeSplash: () => set({ 
        showSplash: false, 
        currentStep: 'auth' 
      }),
    }),
    {
      name: 'sunray-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        investments: state.investments,
        vendorInfo: state.vendorInfo,
        commissions: state.commissions,
        totalBusinessVolume: state.totalBusinessVolume,
        currentRank: state.currentRank,
      }),
    }
  )
);
