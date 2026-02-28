'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Wallet, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Award,
  Target,
  IndianRupee
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

import { useAppStore } from '@/store/app-store';
import { ROYALTY_RANKS, formatBusinessTarget } from '@/lib/config/commission-rates';
import { formatCurrency } from '@/lib/config/investment-tiers';

export function DashboardOverview() {
  const { user, investments, commissions, totalBusinessVolume, currentRank } = useAppStore();

  const rank = ROYALTY_RANKS.find(r => r.id === currentRank) || ROYALTY_RANKS[0];

  // Mock data for demo
  const stats = {
    totalInvestment: investments.reduce((sum, inv) => sum + inv.amount, 0) || 5300000,
    monthlyProfit: 795000,
    totalCommission: 125000,
    totalReferrals: 24,
    nextPayout: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    payoutsCompleted: 3,
    totalPayouts: 12,
  };

  const recentTransactions = [
    { id: 1, type: 'profit', amount: 795000, date: new Date(), status: 'completed' },
    { id: 2, type: 'commission', amount: 25000, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), status: 'completed' },
    { id: 3, type: 'referral', amount: 15000, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, <span className="gradient-text">{user?.firstName}</span>!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your investment overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            className={`${
              user?.status === 'GREEN' 
                ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                : 'bg-red-500/20 text-red-400 border-red-500/50'
            }`}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${
              user?.status === 'GREEN' ? 'bg-green-400' : 'bg-red-400'
            }`} />
            {user?.status === 'GREEN' ? 'Active' : 'Pending Investment'}
          </Badge>
          <Badge variant="outline" style={{ borderColor: rank.color, color: rank.color }}>
            {rank.name} Rank
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Investment"
          value={formatCurrency(stats.totalInvestment)}
          icon={IndianRupee}
          trend="+0%"
          color="gold"
        />
        <StatsCard
          title="Monthly Profit"
          value={formatCurrency(stats.monthlyProfit)}
          icon={TrendingUp}
          trend="+15%"
          trendUp={true}
          color="teal"
        />
        <StatsCard
          title="Total Commission"
          value={formatCurrency(stats.totalCommission)}
          icon={Users}
          trend="+8%"
          trendUp={true}
          color="purple"
        />
        <StatsCard
          title="Total Referrals"
          value={stats.totalReferrals.toString()}
          icon={Target}
          subtitle="Active downline"
          color="gold"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payout Schedule */}
        <Card className="lg:col-span-2 glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Payout Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Next Payout */}
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Next Payout</p>
                    <p className="text-2xl font-bold gradient-text-gold">
                      {formatCurrency(stats.monthlyProfit)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">
                      {stats.nextPayout.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payout Progress</span>
                    <span>{stats.payoutsCompleted}/{stats.totalPayouts}</span>
                  </div>
                  <Progress value={(stats.payoutsCompleted / stats.totalPayouts) * 100} />
                </div>
              </div>

              {/* Countdown */}
              <div className="grid grid-cols-4 gap-4 text-center">
                <CountdownCard value={15} label="Days" />
                <CountdownCard value={8} label="Hours" />
                <CountdownCard value={42} label="Minutes" />
                <CountdownCard value={17} label="Seconds" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rank Progress */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: rank.color }} />
              Rank Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${rank.color}60, ${rank.color}20)` 
                }}
              >
                <span className="text-2xl font-bold" style={{ color: rank.color }}>
                  {rank.name[0]}
                </span>
              </div>
              <p className="font-bold text-lg">{rank.name}</p>
              <p className="text-muted-foreground text-sm">
                {formatBusinessTarget(totalBusinessVolume || 7500000)} Business Volume
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Next Rank: SILVER</p>
              <Progress value={15} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {formatBusinessTarget(50000000 - (totalBusinessVolume || 7500000))} more needed
              </p>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-sm font-medium mb-2">Royalty Bonus</p>
              <p className="text-2xl font-bold text-primary">
                +{(rank.royaltyAddOn * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-muted-foreground">
                Added to all commission levels
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div 
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'profit' ? 'bg-green-500/20' :
                    tx.type === 'commission' ? 'bg-purple-500/20' :
                    'bg-teal-500/20'
                  }`}>
                    {tx.type === 'profit' && <TrendingUp className="w-5 h-5 text-green-400" />}
                    {tx.type === 'commission' && <Users className="w-5 h-5 text-purple-400" />}
                    {tx.type === 'referral' && <ArrowUpRight className="w-5 h-5 text-teal-400" />}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{tx.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.date.toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-400">
                    +{formatCurrency(tx.amount)}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  subtitle,
  color 
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
  color: 'gold' | 'teal' | 'purple';
}) {
  const colors = {
    gold: 'from-yellow-400/20 to-yellow-600/20 text-yellow-400',
    teal: 'from-teal-400/20 to-teal-600/20 text-teal-400',
    purple: 'from-purple-400/20 to-purple-600/20 text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 card-hover"
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trendUp ? 'text-green-400' : 'text-red-400'
          }`}>
            {trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {trend}
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-muted-foreground text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

function CountdownCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass p-3 rounded-lg">
      <p className="text-2xl font-bold gradient-text-gold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
