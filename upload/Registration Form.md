# 📱 Secure Registration Module Specification

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Compliance](https://img.shields.io/badge/compliance-KYC%2FAML-blue.svg)]()
[![Security](https://img.shields.io/badge/security-2FA%2FEncryption-red.svg)]()

## 📖 Overview
This document outlines the technical specifications and data requirements for the **User Registration Module** of the application. The registration process is designed to be KYC-compliant, capturing personal identity, financial details, and nominee information with strict validation and security protocols.

## 🔐 Security & Compliance Standards
- **Data Encryption:** All sensitive fields (Aadhaar, PAN, Bank Acc, Password) must be encrypted at rest (AES-256) and in transit (TLS 1.3).
- **Verification:** Dual verification required for Contact (SMS OTP) and Email (Link/OTP).
- **Bot Protection:** Google reCAPTCHA v3 or equivalent required on the final submit action.
- **Privacy:** Compliance with local data protection laws (e.g., DPDP Act, GDPR). Aadhaar data must not be stored in plain text.

---

## 📝 Registration Form Fields & Validation

The registration flow is divided into **5 Logical Sections**.

### 1. Personal Information
| Field | Type | Validation Rules | Required |
| :--- | :--- | :--- | :--- |
| **First Name** | Text | Alphabetic only, Max 50 chars | Yes |
| **Middle Name** | Text | Alphabetic only, Max 50 chars | No |
| **Last Name** | Text | Alphabetic only, Max 50 chars | Yes |
| **Contact No** | Numeric | 10 Digits, Valid Country Code | Yes |
| **Email Id** | Email | RFC 5322 Standard Format | Yes |

### 2. Identity Verification (KYC)
| Field | Type | Validation Rules | Required |
| :--- | :--- | :--- | :--- |
| **Aadhaar No** | Numeric | 12 Digits, Valid Checksum | Yes |
| **PAN No** | Alphanumeric | 5 Alpha + 4 Numeric + 1 Alpha | Yes |
| **Address** | Text | Auto-fetch preferred via Aadhaar API | Yes |
| *Note* | | "Address as per Aadhaar" should ideally be verified via OTP to UIDAI, not manual entry. | |

### 3. Bank Details (Applicant)
| Field | Type | Validation Rules | Required |
| :--- | :--- | :--- | :--- |
| **Bank Name** | Dropdown | Select from IFSC Database | Yes |
| **Acc No** | Numeric | Min 9, Max 18 Digits | Yes |
| **IFSC Code** | Alphanumeric | 11 Characters (e.g., SBIN0001234) | Yes |
| *Validation* | | Penny Drop Verification recommended to verify Name & Acc match. | |

### 4. Nominee Details (Beneficiary)
*Constraint: Nominee must be > 18 Years Old.*
| Field | Type | Validation Rules | Required |
| :--- | :--- | :--- | :--- |
| **Full Name** | Text | Alphabetic, Max 100 chars | Yes |
| **Contact No** | Numeric | 10 Digits | Yes |
| **Relation** | Dropdown | Father, Mother, Spouse, Sibling, etc. | Yes |
| **Aadhaar No** | Numeric | 12 Digits | Yes |
| **PAN No** | Alphanumeric | Standard PAN Format | Yes |
| **Bank Name** | Dropdown | Select from IFSC Database | Yes |
| **Acc No** | Numeric | Min 9, Max 18 Digits | Yes |
| **IFSC Code** | Alphanumeric | 11 Characters | Yes |
| *Logic Check* | | System must verify Age > 18 via Aadhaar API or DOB input. | |

### 5. Account Security & Finalization
| Field | Type | Validation Rules | Required |
| :--- | :--- | :--- | :--- |
| **Referral Code** | Alphanumeric | Must exist in Referral Table | **Mandatory** |
| **Username** | Text | Unique, Min 6 chars, No special chars | Yes |
| **Password** | Password | Min 8 chars, 1 Upper, 1 Lower, 1 Number, 1 Symbol | Yes |
| **Contact OTP** | Numeric | 4-6 Digits, Time-sensitive (5 min) | Yes |
| **Email OTP** | Numeric | 4-6 Digits, Time-sensitive (5 min) | Yes |
| **Captcha** | Token | Server-side validation | Yes |

---

## 🔄 User Flow Diagram

```mermaid
graph TD
    A[Start Registration] --> B[Enter Personal Info]
    B --> C[Verify Contact & Email OTP]
    C --> D[Enter KYC Details (Aadhaar/PAN)]
    D --> E[Enter Bank Details]
    E --> F[Enter Nominee Details]
    F --> G[Create Credentials (User/Pass)]
    G --> H[Enter Mandatory Referral Code]
    H --> I[Solve Captcha]
    I --> J[Submit & Encrypt Data]
    J --> K[Registration Complete]