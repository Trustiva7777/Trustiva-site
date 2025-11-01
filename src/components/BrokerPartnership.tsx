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

type BrokerFormData = {
  firmLegalName: string
  tradingName: string
  firmType: string
  jurisdictionOfIncorporation: string
  businessAddress: string
  city: string
  state: string
  zipCode: string
  country: string
  website: string
  primaryContactName: string
  primaryContactTitle: string
  primaryContactEmail: string
  primaryContactPhone: string
  regulatoryLicenses: string
  secCrd: string
  finraMembership: string
  otherLicenses: string
  yearsInBusiness: string
  aum: string
  numberOfClients: string
  primaryServices: string[]
  targetClientSegment: string
  partnershipObjectives: string
  expectedVolume: string
  technicalCapabilities: string
  custodyArrangements: string
  complianceInfrastructure: string
  regulatoryFilings: string
  complianceOfficer: string
  complianceOfficerEmail: string
  insuranceCoverage: string
  conflictsOfInterest: string
  regulatoryActions: string
  licenseDocuments: string
  financialStatements: string
  complianceManual: string
  insuranceDocuments: string
  regulatoryCompliance: boolean
  dataProtection: boolean
  conflictDisclosure: boolean
  serviceLevelAgreement: boolean
  confidentiality: boolean
}

const STEPS = [
  { id: 1, title: 'Firm Information', description: 'Legal entity and business details' },
  { id: 2, title: 'Regulatory Status', description: 'Licenses and registrations' },
  { id: 3, title: 'Business Profile', description: 'AUM, clients, and services' },
  { id: 4, title: 'Partnership Goals', description: 'Objectives and expected volume' },
  { id: 5, title: 'Technical & Compliance', description: 'Infrastructure and capabilities' },
  { id: 6, title: 'Risk & Disclosure', description: 'Conflicts and regulatory actions' },
  { id: 7, title: 'Documentation', description: 'Required documents upload' },
  { id: 8, title: 'Certifications', description: 'Acknowledgments and agreements' },
]

const INITIAL_FORM_DATA: BrokerFormData = {
  firmLegalName: '',
  tradingName: '',
  firmType: '',
  jurisdictionOfIncorporation: '',
  businessAddress: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  website: '',
  primaryContactName: '',
  primaryContactTitle: '',
  primaryContactEmail: '',
  primaryContactPhone: '',
  regulatoryLicenses: '',
  secCrd: '',
  finraMembership: '',
  otherLicenses: '',
  yearsInBusiness: '',
  aum: '',
  numberOfClients: '',
  primaryServices: [],
  targetClientSegment: '',
  partnershipObjectives: '',
  expectedVolume: '',
  technicalCapabilities: '',
  custodyArrangements: '',
  complianceInfrastructure: '',
  regulatoryFilings: '',
  complianceOfficer: '',
  complianceOfficerEmail: '',
  insuranceCoverage: '',
  conflictsOfInterest: '',
  regulatoryActions: '',
  licenseDocuments: '',
  financialStatements: '',
  complianceManual: '',
  insuranceDocuments: '',
  regulatoryCompliance: false,
  dataProtection: false,
  conflictDisclosure: false,
  serviceLevelAgreement: false,
  confidentiality: false,
}

type BrokerPartnershipProps = {
  onGoHome?: () => void
}

export function BrokerPartnership({ onGoHome }: BrokerPartnershipProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useKV<BrokerFormData>('broker-partnership-form', INITIAL_FORM_DATA)
  const { language } = useLanguage()
  const t = getTranslation(language)

  const data = formData || INITIAL_FORM_DATA

  const updateField = (field: keyof BrokerFormData, value: any) => {
    setFormData((current) => ({
      ...(current || INITIAL_FORM_DATA),
      [field]: value,
    }))
  }

  const toggleArrayField = (field: keyof BrokerFormData, value: string) => {
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
    toast.success('Partnership Application Submitted', {
      description: 'Thank you for your interest in partnering with TRUSTIVA. Our business development team will review your application and contact you within 2-3 business days.',
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
              <h1 className="text-4xl font-bold mb-2">Broker/Dealer Partnership Application</h1>
              <p className="text-muted-foreground">Join our network of institutional partners providing tokenization services</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firmLegalName">Firm Legal Name *</Label>
                    <Input
                      id="firmLegalName"
                      value={data.firmLegalName}
                      onChange={(e) => updateField('firmLegalName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tradingName">Trading Name (DBA)</Label>
                    <Input
                      id="tradingName"
                      value={data.tradingName}
                      onChange={(e) => updateField('tradingName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firmType">Firm Type *</Label>
                  <Select value={data.firmType} onValueChange={(value) => updateField('firmType', value)}>
                    <SelectTrigger id="firmType">
                      <SelectValue placeholder="Select firm type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="broker-dealer">Broker-Dealer</SelectItem>
                      <SelectItem value="ria">Registered Investment Advisor (RIA)</SelectItem>
                      <SelectItem value="family-office">Family Office</SelectItem>
                      <SelectItem value="wealth-manager">Wealth Manager</SelectItem>
                      <SelectItem value="bank">Bank/Trust Company</SelectItem>
                      <SelectItem value="other">Other Financial Institution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurisdictionOfIncorporation">Jurisdiction of Incorporation *</Label>
                  <Input
                    id="jurisdictionOfIncorporation"
                    value={data.jurisdictionOfIncorporation}
                    onChange={(e) => updateField('jurisdictionOfIncorporation', e.target.value)}
                    placeholder="State and country"
                  />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={data.country}
                      onChange={(e) => updateField('country', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website *</Label>
                    <Input
                      id="website"
                      type="url"
                      value={data.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      placeholder="https://yourfirm.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryContactName">Primary Contact Name *</Label>
                    <Input
                      id="primaryContactName"
                      value={data.primaryContactName}
                      onChange={(e) => updateField('primaryContactName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryContactTitle">Title *</Label>
                    <Input
                      id="primaryContactTitle"
                      value={data.primaryContactTitle}
                      onChange={(e) => updateField('primaryContactTitle', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="regulatoryLicenses">Primary Regulatory Licenses *</Label>
                  <Textarea
                    id="regulatoryLicenses"
                    value={data.regulatoryLicenses}
                    onChange={(e) => updateField('regulatoryLicenses', e.target.value)}
                    placeholder="List all relevant licenses (SEC, FINRA, state securities, international)"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="secCrd">SEC CRD Number</Label>
                    <Input
                      id="secCrd"
                      value={data.secCrd}
                      onChange={(e) => updateField('secCrd', e.target.value)}
                      placeholder="Central Registration Depository number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="finraMembership">FINRA Membership Status</Label>
                    <Select value={data.finraMembership} onValueChange={(value) => updateField('finraMembership', value)}>
                      <SelectTrigger id="finraMembership">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">FINRA Member</SelectItem>
                        <SelectItem value="not-member">Not a Member</SelectItem>
                        <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherLicenses">Other Jurisdictional Licenses</Label>
                  <Textarea
                    id="otherLicenses"
                    value={data.otherLicenses}
                    onChange={(e) => updateField('otherLicenses', e.target.value)}
                    placeholder="FCA (UK), MAS (Singapore), BaFin (Germany), etc."
                    rows={3}
                  />
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                    <Input
                      id="yearsInBusiness"
                      type="number"
                      value={data.yearsInBusiness}
                      onChange={(e) => updateField('yearsInBusiness', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aum">Assets Under Management (USD)</Label>
                    <Input
                      id="aum"
                      type="number"
                      value={data.aum}
                      onChange={(e) => updateField('aum', e.target.value)}
                      placeholder="100000000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfClients">Number of Active Clients</Label>
                  <Input
                    id="numberOfClients"
                    type="number"
                    value={data.numberOfClients}
                    onChange={(e) => updateField('numberOfClients', e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Primary Services * (select all that apply)</Label>
                  <div className="space-y-2">
                    {[
                      'Wealth Management',
                      'Investment Advisory',
                      'Brokerage Services',
                      'Asset Management',
                      'Financial Planning',
                      'Institutional Services',
                      'Alternative Investments'
                    ].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={data.primaryServices.includes(service)}
                          onCheckedChange={() => toggleArrayField('primaryServices', service)}
                        />
                        <label
                          htmlFor={`service-${service}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetClientSegment">Target Client Segment *</Label>
                  <Textarea
                    id="targetClientSegment"
                    value={data.targetClientSegment}
                    onChange={(e) => updateField('targetClientSegment', e.target.value)}
                    placeholder="High-net-worth individuals, family offices, institutional investors, etc."
                    rows={3}
                  />
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="partnershipObjectives">Partnership Objectives *</Label>
                  <Textarea
                    id="partnershipObjectives"
                    value={data.partnershipObjectives}
                    onChange={(e) => updateField('partnershipObjectives', e.target.value)}
                    placeholder="Why are you interested in partnering with TRUSTIVA? What specific use cases or client needs do you want to address?"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedVolume">Expected Transaction Volume (Annual USD) *</Label>
                  <Select value={data.expectedVolume} onValueChange={(value) => updateField('expectedVolume', value)}>
                    <SelectTrigger id="expectedVolume">
                      <SelectValue placeholder="Select expected volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1m">&lt; $1M</SelectItem>
                      <SelectItem value="1m-10m">$1M - $10M</SelectItem>
                      <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                      <SelectItem value="50m-100m">$50M - $100M</SelectItem>
                      <SelectItem value="over-100m">&gt; $100M</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="technicalCapabilities">Technical Capabilities *</Label>
                  <Textarea
                    id="technicalCapabilities"
                    value={data.technicalCapabilities}
                    onChange={(e) => updateField('technicalCapabilities', e.target.value)}
                    placeholder="API integration capabilities, custody solutions, blockchain experience, existing tech stack"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custodyArrangements">Custody Arrangements *</Label>
                  <Textarea
                    id="custodyArrangements"
                    value={data.custodyArrangements}
                    onChange={(e) => updateField('custodyArrangements', e.target.value)}
                    placeholder="Current custody providers, qualified custodian relationships, digital asset custody experience"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complianceInfrastructure">Compliance Infrastructure *</Label>
                  <Textarea
                    id="complianceInfrastructure"
                    value={data.complianceInfrastructure}
                    onChange={(e) => updateField('complianceInfrastructure', e.target.value)}
                    placeholder="KYC/AML systems, compliance monitoring, regulatory reporting capabilities"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="complianceOfficer">Chief Compliance Officer *</Label>
                    <Input
                      id="complianceOfficer"
                      value={data.complianceOfficer}
                      onChange={(e) => updateField('complianceOfficer', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complianceOfficerEmail">CCO Email *</Label>
                    <Input
                      id="complianceOfficerEmail"
                      type="email"
                      value={data.complianceOfficerEmail}
                      onChange={(e) => updateField('complianceOfficerEmail', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regulatoryFilings">Recent Regulatory Filings</Label>
                  <Textarea
                    id="regulatoryFilings"
                    value={data.regulatoryFilings}
                    onChange={(e) => updateField('regulatoryFilings', e.target.value)}
                    placeholder="Form ADV, Form BD, annual audits, etc."
                    rows={2}
                  />
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="insuranceCoverage">Insurance Coverage *</Label>
                  <Textarea
                    id="insuranceCoverage"
                    value={data.insuranceCoverage}
                    onChange={(e) => updateField('insuranceCoverage', e.target.value)}
                    placeholder="E&O insurance, cyber insurance, fidelity bond coverage amounts and carriers"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conflictsOfInterest">Conflicts of Interest *</Label>
                  <Textarea
                    id="conflictsOfInterest"
                    value={data.conflictsOfInterest}
                    onChange={(e) => updateField('conflictsOfInterest', e.target.value)}
                    placeholder="Disclose any potential conflicts, related party relationships, or material business arrangements"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regulatoryActions">Regulatory Actions & Disclosures *</Label>
                  <Textarea
                    id="regulatoryActions"
                    value={data.regulatoryActions}
                    onChange={(e) => updateField('regulatoryActions', e.target.value)}
                    placeholder="Any regulatory actions, investigations, litigation, or disciplinary proceedings in the past 10 years (or 'None')"
                    rows={4}
                  />
                </div>
              </>
            )}

            {currentStep === 7 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="licenseDocuments">Regulatory Licenses & Registrations *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">Upload copies of all regulatory licenses</p>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-2" />
                      Upload Documents
                    </Button>
                  </div>
                  <Input
                    id="licenseDocuments"
                    value={data.licenseDocuments}
                    onChange={(e) => updateField('licenseDocuments', e.target.value)}
                    placeholder="Document references"
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financialStatements">Financial Statements *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">Most recent audited financial statements (last 2 years)</p>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-2" />
                      Upload Documents
                    </Button>
                  </div>
                  <Input
                    id="financialStatements"
                    value={data.financialStatements}
                    onChange={(e) => updateField('financialStatements', e.target.value)}
                    placeholder="Document references"
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complianceManual">Compliance Manual/Procedures</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">Written supervisory procedures, compliance manual</p>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-2" />
                      Upload Documents
                    </Button>
                  </div>
                  <Input
                    id="complianceManual"
                    value={data.complianceManual}
                    onChange={(e) => updateField('complianceManual', e.target.value)}
                    placeholder="Document references"
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceDocuments">Insurance Certificates</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">Certificates of insurance for E&O, cyber, fidelity coverage</p>
                    <Button variant="outline" size="sm">
                      <Upload size={16} className="mr-2" />
                      Upload Documents
                    </Button>
                  </div>
                  <Input
                    id="insuranceDocuments"
                    value={data.insuranceDocuments}
                    onChange={(e) => updateField('insuranceDocuments', e.target.value)}
                    placeholder="Document references"
                    className="mt-2"
                  />
                </div>
              </>
            )}

            {currentStep === 8 && (
              <>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="regulatoryCompliance"
                      checked={data.regulatoryCompliance}
                      onCheckedChange={(checked) => updateField('regulatoryCompliance', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="regulatoryCompliance"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Regulatory Compliance Certification *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I certify that our firm is in good standing with all applicable regulators and that all information provided is accurate and complete.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataProtection"
                      checked={data.dataProtection}
                      onCheckedChange={(checked) => updateField('dataProtection', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="dataProtection"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Data Protection & Privacy *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        We agree to comply with all applicable data protection regulations (GDPR, CCPA) in handling client information.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="conflictDisclosure"
                      checked={data.conflictDisclosure}
                      onCheckedChange={(checked) => updateField('conflictDisclosure', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="conflictDisclosure"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Conflicts of Interest Disclosure *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        We have disclosed all material conflicts of interest and agree to disclose any future conflicts that may arise.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="serviceLevelAgreement"
                      checked={data.serviceLevelAgreement}
                      onCheckedChange={(checked) => updateField('serviceLevelAgreement', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="serviceLevelAgreement"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Service Level Agreement *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        We agree to negotiate and adhere to mutually agreed service level standards and performance metrics.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="confidentiality"
                      checked={data.confidentiality}
                      onCheckedChange={(checked) => updateField('confidentiality', checked)}
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="confidentiality"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Confidentiality Agreement *
                      </label>
                      <p className="text-sm text-muted-foreground">
                        We agree to maintain confidentiality of all proprietary information, client data, and business arrangements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">What happens next:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Initial due diligence review (3-5 business days)</li>
                    <li>Regulatory license verification</li>
                    <li>Reference checks and background screening</li>
                    <li>Partnership terms discussion and negotiation</li>
                    <li>Legal documentation and onboarding</li>
                    <li>Technical integration and testing</li>
                    <li>Go-live and ongoing support</li>
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
                !data.regulatoryCompliance ||
                !data.dataProtection ||
                !data.conflictDisclosure ||
                !data.serviceLevelAgreement ||
                !data.confidentiality
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
