import * as z from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters'),
  middleName: z.string()
    .max(50, 'Middle name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Middle name can only contain letters')
    .optional(),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters'),
  contactNo: z.string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string()
    .email('Please enter a valid email address'),
});

// KYC Schema
export const kycSchema = z.object({
  aadhaarNo: z.string()
    .regex(/^\d{12}$/, 'Aadhaar number must be 12 digits'),
  panNo: z.string()
    .regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, 'Please enter a valid PAN number (e.g., ABCDE1234F)'),
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
});

// Bank Details Schema
export const bankDetailsSchema = z.object({
  bankName: z.string().min(1, 'Please select a bank'),
  accountNo: z.string()
    .regex(/^\d{9,18}$/, 'Account number must be 9-18 digits'),
  confirmAccountNo: z.string(),
  ifscCode: z.string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please enter a valid IFSC code (e.g., SBIN0001234)'),
}).refine((data) => data.accountNo === data.confirmAccountNo, {
  message: 'Account numbers do not match',
  path: ['confirmAccountNo'],
});

// Nominee Schema
export const nomineeSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters'),
  contactNo: z.string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  relation: z.enum(['Father', 'Mother', 'Spouse', 'Sibling', 'Child', 'Other']),
  aadhaarNo: z.string()
    .regex(/^\d{12}$/, 'Aadhaar number must be 12 digits'),
  panNo: z.string()
    .regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, 'Please enter a valid PAN number'),
  bankName: z.string().min(1, 'Please select a bank'),
  accountNo: z.string()
    .regex(/^\d{9,18}$/, 'Account number must be 9-18 digits'),
  ifscCode: z.string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please enter a valid IFSC code'),
  isAdult: z.literal(true),
});

// Security Schema
export const securitySchema = z.object({
  referralCode: z.string()
    .min(6, 'Referral code must be at least 6 characters'),
  username: z.string()
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  contactOtp: z.string()
    .regex(/^\d{4,6}$/, 'Please enter a valid OTP'),
  emailOtp: z.string()
    .regex(/^\d{4,6}$/, 'Please enter a valid OTP'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Full Registration Schema
export const registrationSchema = personalInfoSchema
  .and(kycSchema)
  .and(bankDetailsSchema)
  .and(nomineeSchema)
  .and(securitySchema);

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type KycFormData = z.infer<typeof kycSchema>;
export type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;
export type NomineeFormData = z.infer<typeof nomineeSchema>;
export type SecurityFormData = z.infer<typeof securitySchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
