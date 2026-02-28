'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, ChevronRight, Award, Crown } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

import { BASE_COMMISSION_LEVELS, ROYALTY_RANKS, formatBusinessTarget, type RoyaltyRank } from '@/lib/config/commission-rates';

interface CommissionDisplayProps {
  currentRank?: string;
  totalBusinessVolume?: number;
}

export function CommissionDisplay({ 
  currentRank = 'base',
  totalBusinessVolume = 0 
}: CommissionDisplayProps) {
  const rank = ROYALTY_RANKS.find(r => r.id === currentRank) || ROYALTY_RANKS[0];
  const nextRank = ROYALTY_RANKS.find(r => r.businessTarget > totalBusinessVolume);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black gradient-text mb-2">
          Commission Structure
        </h2>
        <p className="text-muted-foreground">
          6-Level progressive commission with royalty bonuses
        </p>
      </div>

      {/* Current Rank Card */}
      <Card className={`gradient-border ${rank.id !== 'base' ? 'glow-gold' : ''}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5" style={{ color: rank.color }} />
              Current Rank: {rank.name}
            </CardTitle>
            <Badge 
              className={`bg-gradient-to-r ${rank.gradient} text-white`}
            >
              {rank.royaltyAddOn > 0 ? `+${(rank.royaltyAddOn * 100).toFixed(1)}%` : 'Base'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Business Volume</span>
              <span className="text-xl font-bold">{formatBusinessTarget(totalBusinessVolume)}</span>
            </div>
            
            {nextRank && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to {nextRank.name}</span>
                  <span>{formatBusinessTarget(nextRank.businessTarget - totalBusinessVolume)} needed</span>
                </div>
                <Progress 
                  value={(totalBusinessVolume / nextRank.businessTarget) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 6-Level Commission */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            6-Level Commission Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {BASE_COMMISSION_LEVELS.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${rank.color}40, ${rank.color}20)` 
                    }}
                  >
                    <span className="font-bold" style={{ color: rank.color }}>
                      L{level.level}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{level.name}</p>
                    <p className="text-muted-foreground text-sm">Direct referral commission</p>
                  </div>
                </div>
                <div className="text-right">
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: rank.color }}
                  >
                    {(rank.levels[level.level - 1] * 100).toFixed(2)}%
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Base: {(level.baseRate * 100).toFixed(0)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-lg bg-primary/10 text-center">
            <p className="text-sm text-muted-foreground">Total Commission</p>
            <p className="text-3xl font-black text-primary">
              {(rank.levels.reduce((a, b) => a + b, 0) * 100).toFixed(2)}%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Royalty Ranks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ROYALTY_RANKS.map((r, index) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className={`cursor-pointer transition-all ${
                currentRank === r.id 
                  ? 'gradient-border glow-gold' 
                  : 'hover:border-primary/50'
              }`}
            >
              <CardContent className="pt-6">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${r.color}60, ${r.color}20)` 
                    }}
                  >
                    <Award className="w-8 h-8" style={{ color: r.color }} />
                  </div>
                  <h3 className="font-bold text-lg">{r.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {r.businessTarget > 0 ? formatBusinessTarget(r.businessTarget) : 'Entry Level'}
                  </p>
                  <Badge 
                    className={`mt-2 bg-gradient-to-r ${r.gradient} text-white`}
                  >
                    +{(r.royaltyAddOn * 100).toFixed(2)}% Royalty
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Admin Charges Info */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4 gradient-text-gold">Admin Charges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">Admin Charge Rate</p>
            <p className="text-4xl font-bold text-primary">10%</p>
            <p className="text-sm text-muted-foreground">
              Deducted from commission before payout
            </p>
          </div>
          <div className="glass p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Example Calculation</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gross Commission</span>
                <span>₹10,000</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Admin (10%)</span>
                <span>-₹1,000</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-border">
                <span>Net Commission</span>
                <span className="text-green-400">₹9,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
