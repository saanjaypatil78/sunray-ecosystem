'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  User, 
  FileText, 
  Building2, 
  Users, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Loader2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/store/app-store';

import {
  personalInfoSchema,
  kycSchema,
  bankDetailsSchema,
  nomineeSchema,
  securitySchema,
  type PersonalInfoFormData,
  type KycFormData,
  type BankDetailsFormData,
  type NomineeFormData,
  type SecurityFormData,
} from '@/lib/validations/registration-schema';

const STEPS = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'KYC Details', icon: FileText },
  { id: 3, name: 'Bank Details', icon: Building2 },
  { id: 4, name: 'Nominee', icon: Users },
  { id: 5, name: 'Security', icon: Shield },
];

const INDIAN_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Kotak Mahindra Bank',
  'IndusInd Bank',
  'Yes Bank',
  'Federal Bank',
  'RBL Bank',
  'IDFC First Bank',
  'Bandhan Bank',
  'AU Small Finance Bank',
  'Other',
];

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const login = useAppStore((state) => state.login);

  // Form hooks for each step
  const personalForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { firstName: '', middleName: '', lastName: '', contactNo: '', email: '' },
  });

  const kycForm = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: { aadhaarNo: '', panNo: '', address: '' },
  });

  const bankForm = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: { bankName: '', accountNo: '', confirmAccountNo: '', ifscCode: '' },
  });

  const nomineeForm = useForm<NomineeFormData>({
    resolver: zodResolver(nomineeSchema),
    defaultValues: {
      fullName: '',
      contactNo: '',
      relation: undefined,
      aadhaarNo: '',
      panNo: '',
      bankName: '',
      accountNo: '',
      ifscCode: '',
      isAdult: true,
    },
  });

  const securityForm = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      referralCode: '',
      username: '',
      password: '',
      confirmPassword: '',
      contactOtp: '',
      emailOtp: '',
    },
  });

  const progress = (currentStep / STEPS.length) * 100;

  const nextStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await personalForm.trigger();
        break;
      case 2:
        isValid = await kycForm.trigger();
        break;
      case 3:
        isValid = await bankForm.trigger();
        break;
      case 4:
        isValid = await nomineeForm.trigger();
        break;
      case 5:
        isValid = await securityForm.trigger();
        if (isValid) {
          await handleSubmit();
          return;
        }
        break;
    }

    if (isValid && currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const userData = {
        id: `USR${Date.now()}`,
        firstName: personalForm.getValues('firstName'),
        lastName: personalForm.getValues('lastName'),
        email: personalForm.getValues('email'),
        contactNo: personalForm.getValues('contactNo'),
        username: securityForm.getValues('username'),
        referralCode: `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        status: 'RED' as const,
        role: 'INVESTOR' as const,
        rank: 'BASE',
        createdAt: new Date(),
        kycStatus: 'PENDING' as const,
      };

      login(userData);

      toast({
        title: 'Registration Successful!',
        description: 'Welcome to SUNRAY ECOSYSTEM. Your account has been created.',
      });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={personalForm} />;
      case 2:
        return <KYCStep form={kycForm} />;
      case 3:
        return <BankDetailsStep form={bankForm} banks={INDIAN_BANKS} />;
      case 4:
        return <NomineeStep form={nomineeForm} banks={INDIAN_BANKS} />;
      case 5:
        return <SecurityStep form={securityForm} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  currentStep > step.id
                    ? 'bg-primary text-primary-foreground'
                    : currentStep === step.id
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'bg-muted'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs font-medium hidden md:block">{step.name}</span>
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Content */}
      <div className="glass-strong rounded-2xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            type="button"
            onClick={nextStep}
            disabled={isSubmitting}
            className="btn-gradient gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : currentStep === 5 ? (
              <>
                Complete Registration
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Step Components
function PersonalInfoStep({ form }: { form: ReturnType<typeof useForm<PersonalInfoFormData>> }) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold gradient-text-gold">Personal Information</h2>
        <p className="text-muted-foreground mt-1">Enter your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            placeholder="John"
            className="bg-background/50"
          />
          {errors.firstName && (
            <p className="text-destructive text-xs">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input
            id="middleName"
            {...register('middleName')}
            placeholder="William"
            className="bg-background/50"
          />
          {errors.middleName && (
            <p className="text-destructive text-xs">{errors.middleName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Doe"
            className="bg-background/50"
          />
          {errors.lastName && (
            <p className="text-destructive text-xs">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactNo">Contact Number *</Label>
          <div className="flex">
            <span className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md text-muted-foreground">
              +91
            </span>
            <Input
              id="contactNo"
              {...register('contactNo')}
              placeholder="9876543210"
              maxLength={10}
              className="bg-background/50 rounded-l-none"
            />
          </div>
          {errors.contactNo && (
            <p className="text-destructive text-xs">{errors.contactNo.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            className="bg-background/50"
          />
          {errors.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function KYCStep({ form }: { form: ReturnType<typeof useForm<KycFormData>> }) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold gradient-text-gold">Identity Verification (KYC)</h2>
        <p className="text-muted-foreground mt-1">Verify your identity with government IDs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="aadhaarNo">Aadhaar Number *</Label>
          <Input
            id="aadhaarNo"
            {...register('aadhaarNo')}
            placeholder="1234 5678 9012"
            maxLength={12}
            className="bg-background/50"
          />
          {errors.aadhaarNo && (
            <p className="text-destructive text-xs">{errors.aadhaarNo.message}</p>
          )}
          <p className="text-muted-foreground text-xs">12-digit Aadhaar number</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="panNo">PAN Number *</Label>
          <Input
            id="panNo"
            {...register('panNo')}
            placeholder="ABCDE1234F"
            maxLength={10}
            className="bg-background/50 uppercase"
          />
          {errors.panNo && (
            <p className="text-destructive text-xs">{errors.panNo.message}</p>
          )}
          <p className="text-muted-foreground text-xs">10-character PAN (uppercase)</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address (as per Aadhaar) *</Label>
        <textarea
          id="address"
          {...register('address')}
          placeholder="Enter your complete address as per Aadhaar card"
          rows={3}
          className="w-full px-3 py-2 bg-background/50 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.address && (
          <p className="text-destructive text-xs">{errors.address.message}</p>
        )}
      </div>

      <div className="glass p-4 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <Shield className="w-4 h-4 inline mr-2 text-primary" />
          Your KYC data is encrypted with AES-256 and will be verified via UIDAI. We never store Aadhaar in plain text.
        </p>
      </div>
    </div>
  );
}

function BankDetailsStep({ form, banks }: { form: ReturnType<typeof useForm<BankDetailsFormData>>; banks: string[] }) {
  const { register, setValue, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold gradient-text-gold">Bank Details</h2>
        <p className="text-muted-foreground mt-1">Your bank account for payouts</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bankName">Bank Name *</Label>
        <Select onValueChange={(value) => setValue('bankName', value)}>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Select your bank" />
          </SelectTrigger>
          <SelectContent>
            {banks.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.bankName && (
          <p className="text-destructive text-xs">{errors.bankName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountNo">Account Number *</Label>
          <Input
            id="accountNo"
            {...register('accountNo')}
            placeholder="Enter account number"
            className="bg-background/50"
          />
          {errors.accountNo && (
            <p className="text-destructive text-xs">{errors.accountNo.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmAccountNo">Confirm Account Number *</Label>
          <Input
            id="confirmAccountNo"
            {...register('confirmAccountNo')}
            placeholder="Re-enter account number"
            className="bg-background/50"
          />
          {errors.confirmAccountNo && (
            <p className="text-destructive text-xs">{errors.confirmAccountNo.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ifscCode">IFSC Code *</Label>
        <Input
          id="ifscCode"
          {...register('ifscCode')}
          placeholder="SBIN0001234"
          maxLength={11}
          className="bg-background/50 uppercase"
        />
        {errors.ifscCode && (
          <p className="text-destructive text-xs">{errors.ifscCode.message}</p>
        )}
        <p className="text-muted-foreground text-xs">11-character IFSC code from your bank branch</p>
      </div>
    </div>
  );
}

function NomineeStep({ form, banks }: { form: ReturnType<typeof useForm<NomineeFormData>>; banks: string[] }) {
  const { register, setValue, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold gradient-text-gold">Nominee Details</h2>
        <p className="text-muted-foreground mt-1">Beneficiary for your investments</p>
      </div>

      <div className="glass p-4 rounded-lg mb-4">
        <p className="text-xs text-muted-foreground">
          <Users className="w-4 h-4 inline mr-2 text-primary" />
          Nominee must be 18 years or older. This person will receive your investment in case of unforeseen events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nomineeFullName">Full Name *</Label>
          <Input
            id="nomineeFullName"
            {...register('fullName')}
            placeholder="Jane Doe"
            className="bg-background/50"
          />
          {errors.fullName && (
            <p className="text-destructive text-xs">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nomineeContactNo">Contact Number *</Label>
          <Input
            id="nomineeContactNo"
            {...register('contactNo')}
            placeholder="9876543210"
            maxLength={10}
            className="bg-background/50"
          />
          {errors.contactNo && (
            <p className="text-destructive text-xs">{errors.contactNo.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="relation">Relation *</Label>
          <Select onValueChange={(value) => setValue('relation', value as any)}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select relation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Father">Father</SelectItem>
              <SelectItem value="Mother">Mother</SelectItem>
              <SelectItem value="Spouse">Spouse</SelectItem>
              <SelectItem value="Sibling">Sibling</SelectItem>
              <SelectItem value="Child">Child</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.relation && (
            <p className="text-destructive text-xs">{errors.relation.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nomineeAadhaarNo">Aadhaar Number *</Label>
          <Input
            id="nomineeAadhaarNo"
            {...register('aadhaarNo')}
            placeholder="1234 5678 9012"
            maxLength={12}
            className="bg-background/50"
          />
          {errors.aadhaarNo && (
            <p className="text-destructive text-xs">{errors.aadhaarNo.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nomineePanNo">PAN Number *</Label>
        <Input
          id="nomineePanNo"
          {...register('panNo')}
          placeholder="ABCDE1234F"
          maxLength={10}
          className="bg-background/50 uppercase"
        />
        {errors.panNo && (
          <p className="text-destructive text-xs">{errors.panNo.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nomineeBankName">Bank Name *</Label>
          <Select onValueChange={(value) => setValue('bankName', value)}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bankName && (
            <p className="text-destructive text-xs">{errors.bankName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nomineeAccountNo">Account Number *</Label>
          <Input
            id="nomineeAccountNo"
            {...register('accountNo')}
            placeholder="Account number"
            className="bg-background/50"
          />
          {errors.accountNo && (
            <p className="text-destructive text-xs">{errors.accountNo.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nomineeIfscCode">IFSC Code *</Label>
          <Input
            id="nomineeIfscCode"
            {...register('ifscCode')}
            placeholder="SBIN0001234"
            maxLength={11}
            className="bg-background/50 uppercase"
          />
          {errors.ifscCode && (
            <p className="text-destructive text-xs">{errors.ifscCode.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SecurityStep({ form }: { form: ReturnType<typeof useForm<SecurityFormData>> }) {
  const { register, formState: { errors } } = form;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold gradient-text-gold">Account Security</h2>
        <p className="text-muted-foreground mt-1">Create your login credentials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="referralCode">Referral Code *</Label>
          <Input
            id="referralCode"
            {...register('referralCode')}
            placeholder="Enter referral code"
            className="bg-background/50 uppercase"
          />
          {errors.referralCode && (
            <p className="text-destructive text-xs">{errors.referralCode.message}</p>
          )}
          <p className="text-muted-foreground text-xs">Mandatory - ask your referrer</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username *</Label>
          <Input
            id="username"
            {...register('username')}
            placeholder="johndoe123"
            className="bg-background/50"
          />
          {errors.username && (
            <p className="text-destructive text-xs">{errors.username.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="••••••••"
            className="bg-background/50"
          />
          {errors.password && (
            <p className="text-destructive text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            placeholder="••••••••"
            className="bg-background/50"
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-xs">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="glass p-4 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Password must contain:</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• At least 8 characters</li>
          <li>• One uppercase letter (A-Z)</li>
          <li>• One lowercase letter (a-z)</li>
          <li>• One number (0-9)</li>
          <li>• One special character (!@#$%^&*)</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactOtp">Contact OTP *</Label>
          <div className="flex gap-2">
            <Input
              id="contactOtp"
              {...register('contactOtp')}
              placeholder="123456"
              maxLength={6}
              className="bg-background/50"
            />
            <Button type="button" variant="outline" size="sm">
              Send OTP
            </Button>
          </div>
          {errors.contactOtp && (
            <p className="text-destructive text-xs">{errors.contactOtp.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailOtp">Email OTP *</Label>
          <div className="flex gap-2">
            <Input
              id="emailOtp"
              {...register('emailOtp')}
              placeholder="123456"
              maxLength={6}
              className="bg-background/50"
            />
            <Button type="button" variant="outline" size="sm">
              Send OTP
            </Button>
          </div>
          {errors.emailOtp && (
            <p className="text-destructive text-xs">{errors.emailOtp.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
