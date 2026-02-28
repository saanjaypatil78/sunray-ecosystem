'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  User,
  LogOut,
  Bell,
  Settings,
  ChevronDown,
  Wallet
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAppStore } from '@/store/app-store';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, activeTab, setActiveTab, logout } = useAppStore();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'investment', label: 'Investment', icon: TrendingUp },
    { id: 'vendor', label: 'Vendor', icon: ShoppingBag },
    { id: 'commission', label: 'Commission', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 glass-strong">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 hexagon bg-gradient-to-br from-yellow-400 via-teal-400 to-purple-500 flex items-center justify-center">
              <span className="text-sm font-black text-background">BE</span>
            </div>
            <div>
              <h1 className="font-bold gradient-text">SUNRAY</h1>
              <p className="text-xs text-muted-foreground">ECOSYSTEM</p>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">@{user?.username}</p>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      user?.status === 'GREEN' ? 'status-green' : 'status-red'
                    }`} />
                    <span className="text-sm font-medium">
                      {user?.status === 'GREEN' ? 'Active' : 'Pending Investment'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Rank: {user?.rank || 'BASE'}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Wallet className="w-4 h-4 mr-2" />
                  Payouts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 ${
                    activeTab === item.id ? 'btn-gradient' : ''
                  }`}
                  onClick={() => setActiveTab(item.id as any)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Status Card */}
            <div className="mt-6 glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${
                  user?.status === 'GREEN' ? 'status-green' : 'status-red'
                }`} />
                <span className="font-medium">Account Status</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {user?.status === 'GREEN' 
                  ? 'Your account is active and receiving payouts.'
                  : 'Complete your first investment to activate your account.'
                }
              </p>
              {user?.status === 'RED' && (
                <Button className="w-full mt-3 btn-gradient" size="sm">
                  Invest Now
                </Button>
              )}
            </div>

            {/* Referral Code */}
            <div className="mt-4 glass rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-muted rounded font-mono text-primary">
                  {user?.referralCode || 'REFXXXXX'}
                </code>
                <Button size="sm" variant="outline">
                  Copy
                </Button>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
