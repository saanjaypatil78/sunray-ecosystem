import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User type
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  referralCode: string;
  status: 'inactive' | 'active';
  rank: string;
  businessVolume: number;
  totalEarnings: number;
  createdAt: string;
}

// Investment type
export interface UserInvestment {
  id: string;
  tierId: string;
  tierName: string;
  amount: number;
  monthlyProfit: number;
  startDate: string;
  status: 'pending' | 'active' | 'completed';
  payoutsCompleted: number;
  totalPayouts: number;
  nextPayoutDate: string | null;
}

// Commission type
export interface CommissionRecord {
  id: string;
  fromUserId: string;
  fromUserName: string;
  level: number;
  amount: number;
  date: string;
  type: 'investment' | 'vendor';
}

// App State
interface AppState {
  // Splash
  showSplash: boolean;
  splashComplete: boolean;
  
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  
  // Registration
  registrationStep: number;
  registrationComplete: boolean;
  
  // Investments
  userInvestments: UserInvestment[];
  selectedTier: string | null;
  
  // Commissions
  commissions: CommissionRecord[];
  totalCommission: number;
  
  // View mode
  currentView: 'splash' | 'registration' | 'login' | 'dashboard' | 'investment' | 'vendor' | 'commission';
  
  // Actions
  setShowSplash: (show: boolean) => void;
  setSplashComplete: (complete: boolean) => void;
  setAuthenticated: (auth: boolean, user?: User | null) => void;
  setRegistrationStep: (step: number) => void;
  setRegistrationComplete: (complete: boolean) => void;
  setSelectedTier: (tier: string | null) => void;
  addInvestment: (investment: UserInvestment) => void;
  addCommission: (commission: CommissionRecord) => void;
  setCurrentView: (view: AppState['currentView']) => void;
  logout: () => void;
  reset: () => void;
}

const initialState = {
  showSplash: true,
  splashComplete: false,
  isAuthenticated: false,
  user: null,
  registrationStep: 1,
  registrationComplete: false,
  userInvestments: [],
  selectedTier: null,
  commissions: [],
  totalCommission: 0,
  currentView: 'splash' as const,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setShowSplash: (show) => set({ showSplash: show }),
      setSplashComplete: (complete) => set({ splashComplete: complete }),
      
      setAuthenticated: (auth, user = null) => set({ 
        isAuthenticated: auth, 
        user,
        currentView: auth ? 'dashboard' : 'login'
      }),
      
      setRegistrationStep: (step) => set({ registrationStep: step }),
      setRegistrationComplete: (complete) => set({ registrationComplete: complete }),
      
      setSelectedTier: (tier) => set({ selectedTier: tier }),
      
      addInvestment: (investment) => set((state) => ({
        userInvestments: [...state.userInvestments, investment]
      })),
      
      addCommission: (commission) => set((state) => ({
        commissions: [...state.commissions, commission],
        totalCommission: state.totalCommission + commission.amount
      })),
      
      setCurrentView: (view) => set({ currentView: view }),
      
      logout: () => set({
        isAuthenticated: false,
        user: null,
        currentView: 'login'
      }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'brave-ecom-store',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        userInvestments: state.userInvestments,
        commissions: state.commissions,
        totalCommission: state.totalCommission,
      }),
    }
  )
);
