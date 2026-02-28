'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, TrendingUp, Calculator } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { INVESTMENT_TIERS, formatCurrency, calculateInvestmentReturn, INVESTMENT_CONFIG } from '@/lib/config/investment-tiers';

interface InvestmentPlansProps {
  onSelectPlan?: (tierId: string) => void;
}

export function InvestmentPlans({ onSelectPlan }: InvestmentPlansProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black gradient-text mb-2">
          Investment Plans
        </h2>
        <p className="text-muted-foreground">
          Choose your investment tier and start earning {INVESTMENT_CONFIG.profitRate * 100}% monthly returns
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="w-3 h-3" />
            15% Monthly Return
          </Badge>
          <Badge variant="secondary">
            12 Months Agreement
          </Badge>
          <Badge variant="secondary">
            First Payout: 45 Days
          </Badge>
        </div>
      </div>

      {/* Calculator Toggle */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowCalculator(!showCalculator)}
          className="gap-2"
        >
          <Calculator className="w-4 h-4" />
          {showCalculator ? 'Hide Calculator' : 'Calculate Returns'}
        </Button>
      </div>

      {/* Calculator */}
      {showCalculator && <InvestmentCalculator />}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {INVESTMENT_TIERS.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                tier.featured
                  ? 'gradient-border glow-gold scale-105'
                  : selectedTier === tier.id
                  ? 'gradient-border'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => {
                setSelectedTier(tier.id);
                onSelectPlan?.(tier.id);
              }}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </div>
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Level {tier.level}
                    </Badge>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    tier.featured ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <span className="font-bold text-primary">{tier.level}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Investment Amount */}
                <div className="text-center py-4 border-t border-b border-border/50">
                  <p className="text-muted-foreground text-sm">Investment</p>
                  <p className="text-3xl font-black gradient-text-gold">
                    {formatCurrency(tier.investment)}
                  </p>
                </div>

                {/* Returns */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Monthly Profit</span>
                    <span className="font-bold text-green-400">
                      {formatCurrency(tier.monthlyProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Annual Return</span>
                    <span className="font-bold text-primary">
                      {formatCurrency(tier.annualReturn)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Return Rate</span>
                    <span className="font-bold">{(tier.profitRate * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>First payout in 45 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>12 monthly payouts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>6-level referral commission</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  className={`w-full mt-4 ${
                    tier.featured ? 'btn-gradient' : ''
                  }`}
                  variant={tier.featured ? 'default' : 'outline'}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      <div className="glass-strong rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-bold mb-4 gradient-text-gold">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h4 className="font-semibold mb-1">Choose Your Plan</h4>
            <p className="text-muted-foreground text-sm">
              Select an investment tier that suits your financial goals
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h4 className="font-semibold mb-1">Complete KYC</h4>
            <p className="text-muted-foreground text-sm">
              Verify your identity with Aadhaar and PAN for secure transactions
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h4 className="font-semibold mb-1">Start Earning</h4>
            <p className="text-muted-foreground text-sm">
              Receive monthly payouts directly to your bank account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestmentCalculator() {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateInvestmentReturn> | null>(null);

  const handleCalculate = () => {
    const investment = parseFloat(amount);
    if (!isNaN(investment) && investment >= INVESTMENT_CONFIG.minInvestment) {
      setResult(calculateInvestmentReturn(investment));
    }
  };

  return (
    <Card className="gradient-border max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Investment Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="calcAmount">Investment Amount (₹)</Label>
          <Input
            id="calcAmount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="bg-background/50"
          />
        </div>

        <Button onClick={handleCalculate} className="w-full btn-gradient">
          Calculate Returns
        </Button>

        {result && (
          <div className="space-y-3 pt-4 border-t border-border/50">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Profit</span>
              <span className="font-bold text-green-400">
                ₹{result.monthlyProfit.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Profit (12 months)</span>
              <span className="font-bold text-primary">
                ₹{result.totalProfit.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Return</span>
              <span className="font-bold text-xl gradient-text-gold">
                ₹{result.totalReturn.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
