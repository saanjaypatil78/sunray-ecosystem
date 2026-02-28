'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Award,
  Edit2,
  Copy,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import { useAppStore } from '@/store/app-store';
import { ROYALTY_RANKS } from '@/lib/config/commission-rates';

export function UserProfile() {
  const { user, investments, totalBusinessVolume, currentRank } = useAppStore();
  const rank = ROYALTY_RANKS.find(r => r.id === currentRank) || ROYALTY_RANKS[0];

  const profileSections = [
    {
      title: 'Personal Information',
      icon: User,
      fields: [
        { label: 'Full Name', value: `${user?.firstName} ${user?.middleName || ''} ${user?.lastName}` },
        { label: 'Username', value: `@${user?.username}` },
        { label: 'Email', value: user?.email },
        { label: 'Contact', value: user?.contactNo },
      ]
    },
    {
      title: 'Account Status',
      icon: Shield,
      fields: [
        { label: 'Status', value: user?.status, badge: true },
        { label: 'KYC Status', value: user?.kycStatus, badge: true },
        { label: 'Role', value: user?.role },
        { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : 'N/A' },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Profile Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account information
          </p>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="gradient-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div 
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-background"
                style={{ backgroundColor: rank.color }}
              >
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-2xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <Badge 
                  className={`w-fit mx-auto md:mx-0 ${
                    user?.status === 'GREEN' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {user?.status === 'GREEN' ? (
                    <><CheckCircle className="w-3 h-3 mr-1" /> Active</>
                  ) : (
                    <><AlertCircle className="w-3 h-3 mr-1" /> Pending</>
                  )}
                </Badge>
              </div>
              <p className="text-muted-foreground">@{user?.username}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                <Badge variant="outline" style={{ borderColor: rank.color, color: rank.color }}>
                  {rank.name} Rank
                </Badge>
                <Badge variant="outline">
                  {user?.role || 'INVESTOR'}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="gap-2">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {profileSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <section.icon className="w-5 h-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.fields.map((field, idx) => (
                    <div key={idx}>
                      {idx > 0 && <Separator className="mb-4" />}
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{field.label}</span>
                        {field.badge ? (
                          <Badge 
                            className={
                              field.value === 'GREEN' || field.value === 'VERIFIED'
                                ? 'bg-green-500/20 text-green-400'
                                : field.value === 'RED' || field.value === 'PENDING'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }
                          >
                            {field.value}
                          </Badge>
                        ) : (
                          <span className="font-medium">{field.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Referral Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Referral Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-muted-foreground text-sm">Your Referral Code</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <code className="text-xl font-mono font-bold text-primary">
                  {user?.referralCode || 'REFXXXXX'}
                </code>
                <Button size="icon" variant="ghost">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-muted-foreground text-sm">Total Referrals</p>
              <p className="text-3xl font-bold gradient-text-gold mt-1">24</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-muted-foreground text-sm">Business Volume</p>
              <p className="text-3xl font-bold text-teal-400 mt-1">₹75 L</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-primary/10">
            <h4 className="font-semibold mb-2">Share & Earn</h4>
            <p className="text-sm text-muted-foreground">
              Share your referral code with friends and family. Earn commission on their investments 
              across 6 levels. Build your network and climb the ranks!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your password regularly</p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Login History</p>
                <p className="text-sm text-muted-foreground">View recent login activity</p>
              </div>
              <Button variant="outline">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
