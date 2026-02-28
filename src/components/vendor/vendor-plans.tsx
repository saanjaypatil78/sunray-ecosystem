'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Percent, Users, Calendar, Award } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { VENDOR_CONFIG, calculateVendorReturn, formatVendorCurrency } from '@/lib/config/vendor-config';
import { ROYALTY_RANKS } from '@/lib/config/commission-rates';

export function VendorPlans() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black gradient-text mb-2">
          Vendor Plans
        </h2>
        <p className="text-muted-foreground">
          Active investment with higher returns and revenue sharing
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
          <Badge variant="secondary" className="gap-1 bg-purple-500/20 text-purple-300">
            <TrendingUp className="w-3 h-3" />
            25% Monthly Return
          </Badge>
          <Badge variant="secondary" className="gap-1 bg-teal-500/20 text-teal-300">
            <Percent className="w-3 h-3" />
            85% Revenue Share
          </Badge>
          <Badge variant="secondary" className="gap-1 bg-yellow-500/20 text-yellow-300">
            <ShoppingBag className="w-3 h-3" />
            Product Listing
          </Badge>
        </div>
      </div>

      {/* Vendor vs Investor Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investor Card */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Investor Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Return Rate</p>
                <p className="text-2xl font-bold text-primary">15%</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Return Type</p>
                <p className="text-2xl font-bold">Passive</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Payout Schedule</p>
                <p className="text-lg font-semibold">45 + 30 days</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Min Investment</p>
                <p className="text-lg font-semibold">₹51,111</p>
              </div>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-muted-foreground text-sm">Rank Weight</p>
              <p className="text-lg font-semibold">1x for rank calculation</p>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Card */}
        <Card className="gradient-border glow-purple">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-400" />
              Vendor Plan
            </CardTitle>
            <Badge className="w-fit bg-purple-500/20 text-purple-300">Recommended</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Return Rate</p>
                <p className="text-2xl font-bold text-purple-400">25%</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Return Type</p>
                <p className="text-2xl font-bold">Active</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Payout Schedule</p>
                <p className="text-lg font-semibold">30 days monthly</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Min Investment</p>
                <p className="text-lg font-semibold">₹1,00,000</p>
              </div>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-muted-foreground text-sm">Rank Weight</p>
              <p className="text-lg font-semibold text-purple-400">2x for rank calculation</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Sharing */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-teal-400" />
            Revenue Sharing (85/15 Split)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full border-4 border-teal-400 flex items-center justify-center mb-3 glow-teal">
                <span className="text-4xl font-black text-teal-400">85%</span>
              </div>
              <p className="font-semibold">Vendor Share</p>
              <p className="text-muted-foreground text-sm">Direct to your account</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-4 border-muted flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-muted-foreground">15%</span>
              </div>
              <p className="font-semibold">Platform Fee</p>
              <p className="text-muted-foreground text-sm">Operational costs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Requirements */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4 gradient-text-gold">Vendor Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Min 5 Products</p>
              <p className="text-muted-foreground text-sm">To activate vendor status</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="font-semibold">30 Days Payout</p>
              <p className="text-muted-foreground text-sm">Monthly returns</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="font-semibold">2x Rank Weight</p>
              <p className="text-muted-foreground text-sm">Faster rank progression</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="font-semibold">25% Return</p>
              <p className="text-muted-foreground text-sm">Active returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Example Calculation */}
      <Card className="gradient-border">
        <CardHeader>
          <CardTitle>Example: ₹10 Lakh Vendor Investment</CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            const example = calculateVendorReturn(1000000);
            return (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-muted-foreground text-sm">Investment</p>
                  <p className="text-xl font-bold">₹10,00,000</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-500/10">
                  <p className="text-muted-foreground text-sm">Monthly Return</p>
                  <p className="text-xl font-bold text-purple-400">
                    ₹{example.monthlyReturn.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-muted-foreground text-sm">Admin (10%)</p>
                  <p className="text-xl font-bold">₹{example.adminCharge.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-500/10">
                  <p className="text-muted-foreground text-sm">Net Monthly</p>
                  <p className="text-xl font-bold text-green-400">
                    ₹{example.netReturn.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
}
