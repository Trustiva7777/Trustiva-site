import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, CheckCircle, Upload, House } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useLanguage } from '@/hooks/use-language'
import { getTranslation } from '@/lib/translations'

type InvestorFormData = {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  citizenship: string
  residenceCountry: string
  residenceAddress: string
  city: string
  state: string
  zipCode: string
  email: string
  phone: string
  taxId: string
  investorType: string
  accreditationBasis: string
  netWorth: string
  annualIncome: string
  investmentExperience: string
  sourceOfFunds: string
  pepStatus: string
  employmentStatus: string
  employer: string
  investmentHorizon: string
  riskTolerance: string
  investmentGoals: string
  jurisdictionsOfInterest: string
  governmentId: string
  proofOfAddress: string
  accreditationDocuments: string
  riskAcknowledgment: boolean
  accreditationCertification: boolean
  kycConsent: boolean
  dataPrivacyConsent: boolean
  regulatoryDisclosure: boolean
}

const STEPS = [
  { id: 1, title: 'Personal Information', description: 'Basic identity details' },
  { id: 2, title: 'Residency & Contact', description: 'Address and contact information' },
  { id: 3, title: 'Accreditation Status', description: 'Investor qualification' },
  { id: 4, title: 'Financial Profile', description: 'Income, net worth, and experience' },
  { id: 5, title: 'Investment Preferences', description: 'Goals and risk tolerance' },
  { id: 6, title: 'Document Upload', description: 'Identity and proof documents' },
  { id: 7, title: 'Certifications', description: 'Acknowledgments and consent' },
]

const INITIAL_FORM_DATA: InvestorFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  citizenship: '',
  residenceCountry: '',
  residenceAddress: '',
  city: '',
  state: '',
  zipCode: '',
  email: '',
  phone: '',
  taxId: '',
  investorType: '',
  accreditationBasis: '',
  netWorth: '',
  annualIncome: '',
  investmentExperience: '',
  sourceOfFunds: '',
  pepStatus: '',
  employmentStatus: '',
  employer: '',
  investmentHorizon: '',
  riskTolerance: '',
  investmentGoals: '',
  jurisdictionsOfInterest: '',
  governmentId: '',
  proofOfAddress: '',
  accreditationDocuments: '',
  riskAcknowledgment: false,
  accreditationCertification: false,
  kycConsent: false,
  dataPrivacyConsent: false,
  regulatoryDisclosure: false,
}

type InvestorKYCProps = {
  onGoHome?: () => void
}

export function InvestorKYC({ onGoHome }: InvestorKYCProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useKV<InvestorFormData>('investor-kyc-form', INITIAL_FORM_DATA)
  const { language } = useLanguage()
  const t = getTranslation(language)

  const data = formData || INITIAL_FORM_DATA

  const updateField = (field: keyof InvestorFormData, value: any) => {
    setFormData((current) => ({
      ...(current || INITIAL_FORM_DATA),
      [field]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = () => {
    toast.success('KYC Submitted', {
      description: 'Your investor KYC application has been submitted. Our compliance team will review and contact you within 2-3 business days.',
    })
    setFormData(INITIAL_FORM_DATA)
    setCurrentStep(1)
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Investor KYC Application</h1>
              <p className="text-muted-foreground">Complete your accreditation verification to access tokenized securities</p>
            </div>
            {onGoHome && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={onGoHome}
                className="flex-shrink-0"
              >
                <House size={20} className="mr-2" />
                {t.intake.goHome}
              </Button>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Step {currentStep} of {STEPS.length}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => {
                setCurrentStep(step.id)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-accent/50 ${
                step.id === currentStep
                  ? 'border-accent bg-accent/10'
                  : step.id < currentStep
                  ? 'border-border bg-muted/50'
                  : 'border-border bg-card'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {step.id < currentStep ? (
                  <CheckCircle size={16} className="text-accent" weight="fill" />
                ) : (
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    step.id === currentStep ? 'border-accent' : 'border-muted-foreground'
                  }`} />
                )}
                <span className="text-xs font-medium text-left">{step.title}</span>
              </div>
            </button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
            <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={data.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      value={data.middleName}
                      onChange={(e) => updateField('middleName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={data.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={data.dateOfBirth}
                      onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Must be 18+ to invest</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="citizenship">Citizenship *</Label>
                    <Input
                      id="citizenship"
                      value={data.citizenship}
                      onChange={(e) => updateField('citizenship', e.target.value)}
                      placeholder="Country of citizenship"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax Identification Number *</Label>
                  <Input
                    id="taxId"
                    type="password"
                    value={data.taxId}
                    onChange={(e) => updateField('taxId', e.target.value)}
                    placeholder="SSN (US) or equivalent"
                  />
                  <p className="text-sm text-muted-foreground">Required for IRS Form 1099 reporting and AML compliance</p>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="residenceCountry">Country of Residence *</Label>
                  <Input
                    id="residenceCountry"
                    value={data.residenceCountry}
                    onChange={(e) => updateField('residenceCountry', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="residenceAddress">Residential Address *</Label>
                  <Input
                    id="residenceAddress"
                    value={data.residenceAddress}
                    onChange={(e) => updateField('residenceAddress', e.target.value)}
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={data.city}
                      onChange={(e) => updateField('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      value={data.state}
                      onChange={(e) => updateField('state', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal *</Label>
                    <Input
                      id="zipCode"
                      value={data.zipCode}
                      onChange={(e) => updateField('zipCode', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="investorType">Investor Type *</Label>
                  <Select value={data.investorType} onValueChange={(value) => updateField('investorType', value)}>
                    <SelectTrigger id="investorType">
                      <SelectValue placeholder="Select investor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="entity">Entity/Institution</SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                      <SelectItem value="retirement">Retirement Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accreditationBasis">Accreditation Basis (US Reg D 501) *</Label>
                  <Select value={data.accreditationBasis} onValueChange={(value) => updateField('accreditationBasis', value)}>
                    <SelectTrigger id="accreditationBasis">
                      <SelectValue placeholder="Select basis for accreditation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income ($200k individual / $300k joint)</SelectItem>
                      <SelectItem value="net-worth">Net Worth ($1M+ excluding primary residence)</SelectItem>
                      <SelectItem value="professional">Professional Certifications (Series 7, 65, 82)</SelectItem>
                      <SelectItem value="entity">Entity with $5M+ in assets</SelectItem>
                      <SelectItem value="non-us">Non-US Investor (provide equivalent status)</SelectItem>
                      <SelectItem value="not-accredited">Not Accredited</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Documentation required in step 6</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pepStatus">PEP Status *</Label>
                  <Select value={data.pepStatus} onValueChange={(value) => updateField('pepStatus', value)}>
                    <SelectTrigger id="pepStatus">
                      <SelectValue placeholder="Are you a politically exposed person?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="family">Immediate family of PEP</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Government officials, senior executives of state-owned enterprises</p>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome">Annual Income (USD)</Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={data.annualIncome}
                      onChange={(e) => updateField('annualIncome', e.target.value)}
                      placeholder="200000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="netWorth">Net Worth (USD)</Label>
                    <Input
                      id="netWorth"
                      type="number"
                      value={data.netWorth}
                      onChange={(e) => updateField('netWorth', e.target.value)}
                      placeholder="1000000"
                    />
                    <p className="text-sm text-muted-foreground">Excluding primary residence</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sourceOfFunds">Source of Funds *</Label>
                  <Textarea
                    id="sourceOfFunds"
                    value={data.sourceOfFunds}
                    onChange={(e) => updateField('sourceOfFunds', e.target.value)}
                    placeholder="Employment income, business revenue, inheritance, investments, etc."
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">Required for AML compliance</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employmentStatus">Employment Status *</Label>
                    <Select value={data.employmentStatus} onValueChange={(value) => updateField('employmentStatus', value)}>
                      <SelectTrigger id="employmentStatus">
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employer">Current/Former Employer</Label>
                    <Input
                      id="employer"
                      value={data.employer}
                      onChange={(e) => updateField('employer', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentExperience">Investment Experience *</Label>
                  <Select value={data.investmentExperience} onValueChange={(value) => updateField('investmentExperience', value)}>
                    <SelectTrigger id="investmentExperience">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="limited">Limited (1-3 years)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-7 years)</SelectItem>
                      <SelectItem value="extensive">Extensive (7+ years)</SelectItem>
                      <SelectItem value="professional">Professional Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="investmentGoals">Investment Goals *</Label>
                  <Textarea
                    id="investmentGoals"
                    value={data.investmentGoals}
                    onChange={(e) => updateField('investmentGoals', e.target.value)}
                    placeholder="Capital appreciation, income generation, portfolio diversification, etc."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentHorizon">Investment Time Horizon *</Label>
                  <Select value={data.investmentHorizon} onValueChange={(value) => updateField('investmentHorizon', value)}>
                    <SelectTrigger id="investmentHorizon">
                      <SelectValue placeholder="Select time horizon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short-term (&lt; 1 year)</SelectItem>
                      <SelectItem value="medium">Medium-term (1-5 years)</SelectItem>
                      <SelectItem value="long">Long-term (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskTolerance">Risk Tolerance *</Label>
                  <Select value={data.riskTolerance} onValueChange={(value) => updateField('riskTolerance', value)}>
                    <SelectTrigger id="riskTolerance">
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Tokenized securities may have limited liquidity and high volatility</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurisdictionsOfInterest">Jurisdictions of Interest</Label>
                  <Textarea
                    id="jurisdictionsOfInterest"
                    value={data.jurisdictionsOfInterest}
                    onChange={(e) => updateField('jurisdictionsOfInterest', e.target.value)}
                    placeholder="Countries/regions where you wish to invest"
                    rows={2}
                  />
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="governmentId">Government-Issued ID *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">Passport, driver's license, or national ID card</p>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-2" />
                      Upload Document
                    </Button>
                  </div>
                  <Input
                    id="governmentId"
                    value={data.governmentId}
                    onChange={(e) => updateField('governmentId', e.target.value)}
                    placeholder="Document ID or reference number"
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proofOfAddress">Proof of Address *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">Utility bill, bank statement (within 3 months)</p>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-2" />
                      Upload Document
                    </Button>
                  </div>
                  <Input
                    id="proofOfAddress"
                    value={data.proofOfAddress}
                    onChange={(e) => updateField('proofOfAddress', e.target.value)}
                    placeholder="Document reference"
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accreditationDocuments">Accreditation Documents</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">Tax returns, brokerage statements, CPA letter, professional certifications</p>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-2" />
                      Upload Documents
                    </Button>
                  </div>
                  <Input
                    id="accreditationDocuments"
                    value={data.accreditationDocuments}
                    onChange={(e) => updateField('accreditationDocuments', e.target.value)}
                    placeholder="Document references"
                    className="mt-2"
                  />
                </div>
              </>
            )}

            {currentStep === 7 && (
              <>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="riskAcknowledgment"
                      checked={data.riskAcknowledgment}
                      onCheckedChange={(checked) => updateField('riskAcknowledgment', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="riskAcknowledgment"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Investment Risk Acknowledgment *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I understand that tokenized securities are high-risk investments that may result in total loss of capital, have limited liquidity, and are subject to lockup periods.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="accreditationCertification"
                      checked={data.accreditationCertification}
                      onCheckedChange={(checked) => updateField('accreditationCertification', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="accreditationCertification"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accreditation Certification *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I certify that the information provided regarding my accreditation status is true and accurate to the best of my knowledge.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="kycConsent"
                      checked={data.kycConsent}
                      onCheckedChange={(checked) => updateField('kycConsent', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="kycConsent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        KYC/AML Consent *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I consent to identity verification, background checks, and ongoing monitoring for AML compliance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataPrivacyConsent"
                      checked={data.dataPrivacyConsent}
                      onCheckedChange={(checked) => updateField('dataPrivacyConsent', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="dataPrivacyConsent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Data Privacy Consent *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I consent to processing of personal data under GDPR/CCPA for KYC, onboarding, and regulatory reporting.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="regulatoryDisclosure"
                      checked={data.regulatoryDisclosure}
                      onCheckedChange={(checked) => updateField('regulatoryDisclosure', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="regulatoryDisclosure"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Regulatory Disclosure *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I acknowledge that my information may be shared with regulators, tax authorities, and service providers as required by law.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">What happens next:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Document verification (1-2 business days)</li>
                    <li>Accreditation status confirmation</li>
                    <li>AML/sanctions screening</li>
                    <li>Account activation and platform access</li>
                    <li>Personalized investment opportunities matching your profile</li>
                  </ol>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            size="lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Previous
          </Button>

          {currentStep < STEPS.length ? (
            <Button onClick={handleNext} size="lg">
              Next
              <ArrowRight size={20} className="ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={
                !data.riskAcknowledgment ||
                !data.accreditationCertification ||
                !data.kycConsent ||
                !data.dataPrivacyConsent ||
                !data.regulatoryDisclosure
              }
            >
              <CheckCircle size={20} className="mr-2" weight="fill" />
              {t.intake.submit}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
