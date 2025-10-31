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

type FormData = {
  issuerLegalName: string
  primaryContactName: string
  primaryContactEmail: string
  primaryContactPhone: string
  businessAddress: string
  city: string
  state: string
  zipCode: string
  country: string
  entityType: string
  taxId: string
  jurisdictionOfFormation: string
  assetDescription: string
  assetType: string
  assetLocation: string
  estimatedValue: string
  ownershipDocumentation: string
  valuationMethod: string
  valuationDate: string
  existingEncumbrances: string
  tokenizationPurpose: string[]
  desiredOutcomes: string[]
  targetInvestorProfile: string
  timeline: string
  targetJurisdictions: string
  applicableRegulations: string
  lockupPeriod: string
  rule144Plan: string
  offeringStructure: string
  targetRaise: string
  minRaise: string
  maxRaise: string
  beneficialOwners: string
  sourceOfFunds: string
  pepStatus: string
  blockchainPreference: string
  tokenStandard: string
  smartContractRequirements: string
  custodySolution: string
  riskUnderstanding: boolean
  regDCompliance: boolean
  rule144Compliance: boolean
  marketingRestrictions: boolean
  dataPrivacyConsent: boolean
}

const STEPS = [
  { id: 1, title: 'Issuer Identification', description: 'Basic contact and entity information' },
  { id: 2, title: 'Asset Details', description: 'Description, ownership, and valuation' },
  { id: 3, title: 'Tokenization Objectives', description: 'Purpose and desired outcomes' },
  { id: 4, title: 'Cross-Border Compliance', description: 'Jurisdictions and regulations' },
  { id: 5, title: 'Lockups & Resale', description: 'Lockup periods and Rule 144 compliance' },
  { id: 6, title: 'Offering Details', description: 'Structure and target raise' },
  { id: 7, title: 'KYC & AML', description: 'Beneficial ownership and compliance' },
  { id: 8, title: 'Technical Preferences', description: 'Blockchain and platform choices' },
  { id: 9, title: 'Acknowledgments', description: 'Risk understanding and consents' },
]

const INITIAL_FORM_DATA: FormData = {
  issuerLegalName: '',
  primaryContactName: '',
  primaryContactEmail: '',
  primaryContactPhone: '',
  businessAddress: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  entityType: '',
  taxId: '',
  jurisdictionOfFormation: '',
  assetDescription: '',
  assetType: '',
  assetLocation: '',
  estimatedValue: '',
  ownershipDocumentation: '',
  valuationMethod: '',
  valuationDate: '',
  existingEncumbrances: '',
  tokenizationPurpose: [],
  desiredOutcomes: [],
  targetInvestorProfile: '',
  timeline: '',
  targetJurisdictions: '',
  applicableRegulations: '',
  lockupPeriod: '',
  rule144Plan: '',
  offeringStructure: '',
  targetRaise: '',
  minRaise: '',
  maxRaise: '',
  beneficialOwners: '',
  sourceOfFunds: '',
  pepStatus: '',
  blockchainPreference: '',
  tokenStandard: '',
  smartContractRequirements: '',
  custodySolution: '',
  riskUnderstanding: false,
  regDCompliance: false,
  rule144Compliance: false,
  marketingRestrictions: false,
  dataPrivacyConsent: false,
}

type IssuerIntakeProps = {
  onGoHome?: () => void
}

export function IssuerIntake({ onGoHome }: IssuerIntakeProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useKV<FormData>('issuer-intake-form', INITIAL_FORM_DATA)

  const data = formData || INITIAL_FORM_DATA

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((current) => ({
      ...(current || INITIAL_FORM_DATA),
      [field]: value,
    }))
  }

  const toggleArrayField = (field: keyof FormData, value: string) => {
    setFormData((current) => {
      const base = current || INITIAL_FORM_DATA
      const currentArray = (base[field] as string[]) || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return {
        ...base,
        [field]: newArray,
      }
    })
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
    toast.success('Application submitted successfully!', {
      description: 'Our team will review your submission and contact you within 2-3 business days.',
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
              <h1 className="text-4xl font-bold mb-2">Issuer / Offering Intake</h1>
              <p className="text-muted-foreground">Complete this questionnaire to begin the onboarding process with TRUSTIVA</p>
            </div>
            {onGoHome && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={onGoHome}
                className="flex-shrink-0"
              >
                <House size={20} className="mr-2" />
                Home
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
                <div className="space-y-2">
                  <Label htmlFor="issuerLegalName">Issuer Legal Name *</Label>
                  <Input
                    id="issuerLegalName"
                    value={data.issuerLegalName}
                    onChange={(e) => updateField('issuerLegalName', e.target.value)}
                    placeholder="Example Minerals SPV LLC"
                  />
                  <p className="text-sm text-muted-foreground">Full legal name of the entity or individual</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryContactName">Primary Contact Name *</Label>
                    <Input
                      id="primaryContactName"
                      value={data.primaryContactName}
                      onChange={(e) => updateField('primaryContactName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryContactEmail">Email *</Label>
                    <Input
                      id="primaryContactEmail"
                      type="email"
                      value={data.primaryContactEmail}
                      onChange={(e) => updateField('primaryContactEmail', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryContactPhone">Phone *</Label>
                    <Input
                      id="primaryContactPhone"
                      type="tel"
                      value={data.primaryContactPhone}
                      onChange={(e) => updateField('primaryContactPhone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address *</Label>
                  <Input
                    id="businessAddress"
                    value={data.businessAddress}
                    onChange={(e) => updateField('businessAddress', e.target.value)}
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

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={data.country}
                    onChange={(e) => updateField('country', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entityType">Entity Type *</Label>
                  <Select value={data.entityType} onValueChange={(value) => updateField('entityType', value)}>
                    <SelectTrigger id="entityType">
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Determines disclosures, tax treatment, and investor eligibility</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax Identification Number *</Label>
                  <Input
                    id="taxId"
                    type="password"
                    value={data.taxId}
                    onChange={(e) => updateField('taxId', e.target.value)}
                    placeholder="EIN for entities / SSN for individuals"
                  />
                  <p className="text-sm text-muted-foreground">Stored with encryption and least-privilege access</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurisdictionOfFormation">Jurisdiction of Formation *</Label>
                  <Input
                    id="jurisdictionOfFormation"
                    value={data.jurisdictionOfFormation}
                    onChange={(e) => updateField('jurisdictionOfFormation', e.target.value)}
                    placeholder="Country + state/province"
                  />
                  <p className="text-sm text-muted-foreground">For individuals: country of citizenship</p>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="assetType">Asset Type *</Label>
                  <Select value={data.assetType} onValueChange={(value) => updateField('assetType', value)}>
                    <SelectTrigger id="assetType">
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="commodity">Commodity</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="financial-instrument">Financial Instrument</SelectItem>
                      <SelectItem value="ip">Intellectual Property</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assetDescription">Asset Description *</Label>
                  <Textarea
                    id="assetDescription"
                    value={data.assetDescription}
                    onChange={(e) => updateField('assetDescription', e.target.value)}
                    placeholder="Include model numbers, parcel/folio IDs, grades, or SKUs"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assetLocation">Asset Location *</Label>
                    <Input
                      id="assetLocation"
                      value={data.assetLocation}
                      onChange={(e) => updateField('assetLocation', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedValue">Estimated Value (USD) *</Label>
                    <Input
                      id="estimatedValue"
                      type="number"
                      value={data.estimatedValue}
                      onChange={(e) => updateField('estimatedValue', e.target.value)}
                      placeholder="1000000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownershipDocumentation">Ownership & Documentation *</Label>
                  <Textarea
                    id="ownershipDocumentation"
                    value={data.ownershipDocumentation}
                    onChange={(e) => updateField('ownershipDocumentation', e.target.value)}
                    placeholder="Describe ownership structure and available proof (titles, deeds, contracts)"
                    rows={3}
                  />
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload size={16} className="mr-2" />
                    Upload Documents
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valuationMethod">Valuation Method *</Label>
                    <Input
                      id="valuationMethod"
                      value={data.valuationMethod}
                      onChange={(e) => updateField('valuationMethod', e.target.value)}
                      placeholder="Third-party appraisal, market comps, DCF"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valuationDate">Valuation Date *</Label>
                    <Input
                      id="valuationDate"
                      type="date"
                      value={data.valuationDate}
                      onChange={(e) => updateField('valuationDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existingEncumbrances">Existing Encumbrances *</Label>
                  <Textarea
                    id="existingEncumbrances"
                    value={data.existingEncumbrances}
                    onChange={(e) => updateField('existingEncumbrances', e.target.value)}
                    placeholder="List liens, mortgages, security interests, litigation holds (or 'None')"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">Investors require seniority/priority clarity</p>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="space-y-3">
                  <Label>Purpose of Tokenization * (select all that apply)</Label>
                  <div className="space-y-2">
                    {['Raise capital', 'Increase liquidity', 'Broaden access', 'Transparency', 'Reduce costs', 'Other'].map((purpose) => (
                      <div key={purpose} className="flex items-center space-x-2">
                        <Checkbox
                          id={`purpose-${purpose}`}
                          checked={data.tokenizationPurpose.includes(purpose)}
                          onCheckedChange={() => toggleArrayField('tokenizationPurpose', purpose)}
                        />
                        <label
                          htmlFor={`purpose-${purpose}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {purpose}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Desired Outcomes * (select all that apply)</Label>
                  <div className="space-y-2">
                    {['Tradable post-lockup', 'Attract specific investor segments', 'Establish proof of concept', 'Immediate capital'].map((outcome) => (
                      <div key={outcome} className="flex items-center space-x-2">
                        <Checkbox
                          id={`outcome-${outcome}`}
                          checked={data.desiredOutcomes.includes(outcome)}
                          onCheckedChange={() => toggleArrayField('desiredOutcomes', outcome)}
                        />
                        <label
                          htmlFor={`outcome-${outcome}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {outcome}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetInvestorProfile">Target Investor Profile *</Label>
                  <Textarea
                    id="targetInvestorProfile"
                    value={data.targetInvestorProfile}
                    onChange={(e) => updateField('targetInvestorProfile', e.target.value)}
                    placeholder="Accredited HNW, family offices, institutions; geographies"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline *</Label>
                  <Select value={data.timeline} onValueChange={(value) => updateField('timeline', value)}>
                    <SelectTrigger id="timeline">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-months">Within 3 months</SelectItem>
                      <SelectItem value="3-6-months">3–6 months</SelectItem>
                      <SelectItem value="6-12-months">6–12 months</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="targetJurisdictions">Target Jurisdictions *</Label>
                  <Textarea
                    id="targetJurisdictions"
                    value={data.targetJurisdictions}
                    onChange={(e) => updateField('targetJurisdictions', e.target.value)}
                    placeholder="List countries/regions where you will market/sell"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicableRegulations">Applicable Regulations *</Label>
                  <Textarea
                    id="applicableRegulations"
                    value={data.applicableRegulations}
                    onChange={(e) => updateField('applicableRegulations', e.target.value)}
                    placeholder="e.g., US Reg D/Reg S; EU MiFID/MiCA; SG MAS - include your compliance plan"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">Provide summaries per jurisdiction with compliance approach</p>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="lockupPeriod">Lockup Period Structure *</Label>
                  <Input
                    id="lockupPeriod"
                    value={data.lockupPeriod}
                    onChange={(e) => updateField('lockupPeriod', e.target.value)}
                    placeholder="e.g., 6 months, 1 year"
                  />
                  <p className="text-sm text-muted-foreground">US Rule 144 typically requires six-month or one-year holding periods</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule144Plan">Rule 144 Plan (US) *</Label>
                  <Textarea
                    id="rule144Plan"
                    value={data.rule144Plan}
                    onChange={(e) => updateField('rule144Plan', e.target.value)}
                    placeholder="Describe how you'll track holding periods, ensure public information, enforce volume limits, and track Form 144"
                    rows={4}
                  />
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="offeringStructure">Offering Structure *</Label>
                  <Select value={data.offeringStructure} onValueChange={(value) => updateField('offeringStructure', value)}>
                    <SelectTrigger id="offeringStructure">
                      <SelectValue placeholder="Select structure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="debt">Debt</SelectItem>
                      <SelectItem value="revenue-share">Revenue Share</SelectItem>
                      <SelectItem value="fractional-ownership">Fractional Ownership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetRaise">Target Raise (USD) *</Label>
                    <Input
                      id="targetRaise"
                      type="number"
                      value={data.targetRaise}
                      onChange={(e) => updateField('targetRaise', e.target.value)}
                      placeholder="5000000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minRaise">Minimum Raise</Label>
                    <Input
                      id="minRaise"
                      type="number"
                      value={data.minRaise}
                      onChange={(e) => updateField('minRaise', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxRaise">Maximum Raise</Label>
                    <Input
                      id="maxRaise"
                      type="number"
                      value={data.maxRaise}
                      onChange={(e) => updateField('maxRaise', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 7 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="beneficialOwners">Beneficial Ownership (≥25%) *</Label>
                  <Textarea
                    id="beneficialOwners"
                    value={data.beneficialOwners}
                    onChange={(e) => updateField('beneficialOwners', e.target.value)}
                    placeholder="Names, addresses, citizenship, ownership % for each beneficial owner"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">Required for AML, sanctions, and Travel Rule mapping</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sourceOfFunds">Source of Funds *</Label>
                  <Textarea
                    id="sourceOfFunds"
                    value={data.sourceOfFunds}
                    onChange={(e) => updateField('sourceOfFunds', e.target.value)}
                    placeholder="Business revenue, loans, personal funds; include cross-border sources"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pepStatus">PEP Status *</Label>
                  <Select value={data.pepStatus} onValueChange={(value) => updateField('pepStatus', value)}>
                    <SelectTrigger id="pepStatus">
                      <SelectValue placeholder="Are any principals or immediate family politically exposed persons?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes (provide details below)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Politically exposed persons among principals or immediate family</p>
                </div>
              </>
            )}

            {currentStep === 8 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="blockchainPreference">Blockchain Preference *</Label>
                  <Select value={data.blockchainPreference} onValueChange={(value) => updateField('blockchainPreference', value)}>
                    <SelectTrigger id="blockchainPreference">
                      <SelectValue placeholder="Select blockchain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xrpl">XRPL (XRP Ledger)</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="cosmos">Cosmos</SelectItem>
                      <SelectItem value="stellar">Stellar</SelectItem>
                      <SelectItem value="cardano">Cardano</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Consider fees, ecosystem, custody, and cross-border fit</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenStandard">Token Standard</Label>
                  <Input
                    id="tokenStandard"
                    value={data.tokenStandard}
                    onChange={(e) => updateField('tokenStandard', e.target.value)}
                    placeholder="e.g., ERC-1400, ERC-3525, ERC-2981, ERC-6551"
                  />
                  <p className="text-sm text-muted-foreground">Note lockup/transfer-restriction needs</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smartContractRequirements">Smart Contract Requirements</Label>
                  <Textarea
                    id="smartContractRequirements"
                    value={data.smartContractRequirements}
                    onChange={(e) => updateField('smartContractRequirements', e.target.value)}
                    placeholder="Dividends/distributions, governance hooks, transfer restrictions, allowlists, attestations"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custodySolution">Custody Solution *</Label>
                  <Select value={data.custodySolution} onValueChange={(value) => updateField('custodySolution', value)}>
                    <SelectTrigger id="custodySolution">
                      <SelectValue placeholder="Select custody approach" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualified-custodian">Qualified Custodian</SelectItem>
                      <SelectItem value="self-custody">Self-Custody</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Important for regulatory alignment and investor comfort</p>
                </div>
              </>
            )}

            {currentStep === 9 && (
              <>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="riskUnderstanding"
                      checked={data.riskUnderstanding}
                      onCheckedChange={(checked) => updateField('riskUnderstanding', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="riskUnderstanding"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Risk Understanding *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I understand the risks including regulatory change, market/tech risk, cross-border complexity, and lockup limits
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="regDCompliance"
                      checked={data.regDCompliance}
                      onCheckedChange={(checked) => updateField('regDCompliance', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="regDCompliance"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Reg D & FINRA 10-22 Compliance (US) *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I agree to 506(c) accredited-investor restrictions and duty to provide accurate diligence materials
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="rule144Compliance"
                      checked={data.rule144Compliance}
                      onCheckedChange={(checked) => updateField('rule144Compliance', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="rule144Compliance"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Rule 144 / Lockup Compliance (US) *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I acknowledge awareness and agreement to enforce resale limits
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketingRestrictions"
                      checked={data.marketingRestrictions}
                      onCheckedChange={(checked) => updateField('marketingRestrictions', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="marketingRestrictions"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Marketing Restrictions *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I will comply with all jurisdictional promotion rules
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
                        I consent under GDPR/CCPA for KYC/AML/onboarding data processing
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">What happens next:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Automated pre-flight (KYC, sanctions, Rule 144, jurisdiction checks)</li>
                    <li>Analyst review + document requests (if any)</li>
                    <li>Draft terms & disclosures; custody and governance plan</li>
                    <li>Board/multi-sig approval; lockup parameters set</li>
                    <li>Issuance scheduling and go-live</li>
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
                !data.riskUnderstanding ||
                !data.regDCompliance ||
                !data.rule144Compliance ||
                !data.marketingRestrictions ||
                !data.dataPrivacyConsent
              }
            >
              <CheckCircle size={20} className="mr-2" weight="fill" />
              Submit Application
            </Button>
          )}
        </div>

        <div className="mt-8 p-6 bg-card border border-border rounded-lg">
          <h3 className="font-semibold mb-3">Contact & Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-2">Secure Portal Email:</p>
              <a href="mailto:admin@trustiva.io" className="text-accent hover:underline">admin@trustiva.io</a>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Key Contacts:</p>
              <div className="space-y-1">
                <a href="mailto:kevan@trustiva.io" className="text-accent hover:underline block">kevan@trustiva.io</a>
                <a href="mailto:donald@trustiva.io" className="text-accent hover:underline block">donald@trustiva.io</a>
                <a href="mailto:buck@trustiva.io" className="text-accent hover:underline block">buck@trustiva.io</a>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Corporate Address:</p>
              <p className="text-sm">1712 Pioneer Ave., Ste. 500<br />Cheyenne, WY 82001</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-2">Operations:</p>
              <p className="text-sm">5655 Peachtree Pkwy<br />Norcross, GA 30099</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
