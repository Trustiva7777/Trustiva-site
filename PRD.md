# Planning Guide

A professional platform website for TRUSTIVA that communicates institutional trust, regulatory compliance, and technical precision for tokenized real-world assets and multi-chain stablecoins on the XRP Ledger.

**Experience Qualities**:
1. **Authoritative** - Conveys institutional credibility and regulatory expertise through precise language and structured presentation
2. **Transparent** - Makes complex compliance concepts accessible through clear visual hierarchy and straightforward explanations
3. **Sophisticated** - Reflects fintech professionalism with refined typography, elegant spacing, and purposeful animations

**Complexity Level**: Content Showcase (information-focused)
This is primarily an informational marketing site that presents TRUSTIVA's platform capabilities, compliance features, and onboarding paths. While it includes interactive CTAs and navigation, the core purpose is to communicate value propositions to three distinct audiences (issuers, investors, brokers).

## Essential Features

### Navigation Header
- **Functionality**: Fixed navigation with logo, main menu items (Platform, Stablecoins, RWA, Compliance, Onboarding), and primary CTA
- **Purpose**: Provides persistent access to key sections and maintains brand presence
- **Trigger**: Loads on page mount, remains visible during scroll
- **Progression**: User lands on page → sees navigation → clicks section link → smooth scrolls to anchor → or clicks CTA → initiates onboarding
- **Success criteria**: All links navigate correctly, CTA stands out visually, mobile menu works below 768px

### Hero Section
- **Functionality**: Large heading with tagline, descriptive paragraph, and dual CTAs
- **Purpose**: Immediately communicates TRUSTIVA's value proposition and primary actions
- **Trigger**: First viewport element on page load
- **Progression**: User reads headline → understands positioning → chooses primary action (Launch Onboarding) or secondary (Explore Platform)
- **Success criteria**: Hierarchy draws eye from headline → tagline → CTAs, contrast ratios meet WCAG AA

### Feature Grid - Platform Capabilities
- **Functionality**: Four feature cards highlighting XRPL Native, Reg D/S, Rule 144, and MiCA/MiFID compliance
- **Purpose**: Establishes regulatory credibility and technical foundation
- **Trigger**: Visible after hero section
- **Progression**: User scrolls → sees compliance badges → understands regulatory coverage
- **Success criteria**: Cards are scannable, terminology is clear, visual weight is balanced

### Multi-Chain Stablecoins Section
- **Functionality**: List of supported chains and key features with visual separation
- **Purpose**: Demonstrates technical breadth and stablecoin infrastructure
- **Trigger**: Section scroll into view
- **Progression**: User reads supported chains → understands policy features → sees proof-of-reserves capability
- **Success criteria**: Technical terms are presented clearly, bulleted features are readable

### RWA Tokenization Section
- **Functionality**: Explanation of asset types and controls available
- **Purpose**: Communicates versatility for different asset classes
- **Trigger**: Section scroll into view
- **Progression**: User sees asset types → understands jurisdiction controls → evaluates fit for their use case
- **Success criteria**: Asset categories are distinct, compliance controls are highlighted

### Compliance & Identity Section
- **Functionality**: Lists KYC/AML, accreditation, and governance capabilities
- **Purpose**: Addresses institutional requirements for compliance infrastructure
- **Trigger**: Section scroll into view
- **Progression**: User evaluates compliance features → confirms regulatory coverage → gains confidence
- **Success criteria**: Compliance features are comprehensive and clearly articulated

### Onboarding Cards
- **Functionality**: Three card CTAs for Issuer, Investor, and Broker/Dealer onboarding with descriptions
- **Purpose**: Directs each user type to their specific intake flow
- **Trigger**: Section scroll into view
- **Progression**: User identifies their role → reads requirements → clicks "Start" → would initiate onboarding (mocked for now)
- **Success criteria**: Cards are visually distinct, CTAs are prominent, role descriptions are clear

### XRPL Integration Section
- **Functionality**: Brand statement about XRP Ledger foundation
- **Purpose**: Reinforces technical infrastructure choice
- **Trigger**: Near footer
- **Progression**: User sees XRPL badge → understands platform foundation → builds trust in technical stack
- **Success criteria**: XRPL logo/badge is visible, messaging is concise

### Footer
- **Functionality**: Copyright, legal links, and design attribution
- **Purpose**: Provides legal information and site credits
- **Trigger**: Bottom of page
- **Progression**: User scrolls to bottom → sees copyright → accesses legal pages if needed
- **Success criteria**: Year is current, links are functional, text is legible

## Edge Case Handling

- **Missing logo asset**: Use SVG text-based logo with TRUSTIVA branding until asset is provided
- **Long content sections**: Implement sticky navigation to maintain orientation during scroll
- **Mobile viewports**: Stack cards vertically, collapse navigation to hamburger menu, ensure touch targets are 44px minimum
- **Accessibility**: Ensure all colors meet WCAG AA contrast (4.5:1 for body, 3:1 for large text), provide skip links, semantic HTML structure

## Design Direction

The design should feel institutional, trustworthy, and cutting-edge—balancing financial gravitas with modern fintech innovation. A minimal interface better serves the core purpose by allowing complex regulatory concepts to breathe and establishing clarity through generous whitespace and confident typography.

## Color Selection

Analogous color scheme using deep blues and golds to communicate trust (financial industry standard) with premium gold accents for sophistication.

- **Primary Color**: Deep Navy Blue (oklch(0.25 0.05 250)) - Represents institutional trust, stability, and financial authority
- **Secondary Colors**: Charcoal (oklch(0.30 0.01 250)) for secondary elements, Slate Blue (oklch(0.45 0.08 250)) for muted backgrounds
- **Accent Color**: Premium Gold (oklch(0.70 0.15 85)) - Highlights CTAs, important elements, conveys premium positioning
- **Foreground/Background Pairings**:
  - Background White (oklch(0.98 0 0)): Navy text (oklch(0.25 0.05 250)) - Ratio 12.1:1 ✓
  - Card Light Gray (oklch(0.96 0 0)): Charcoal text (oklch(0.30 0.01 250)) - Ratio 9.8:1 ✓
  - Primary Navy (oklch(0.25 0.05 250)): White text (oklch(0.98 0 0)) - Ratio 12.1:1 ✓
  - Secondary Charcoal (oklch(0.30 0.01 250)): White text (oklch(0.98 0 0)) - Ratio 9.8:1 ✓
  - Accent Gold (oklch(0.70 0.15 85)): Navy text (oklch(0.25 0.05 250)) - Ratio 5.2:1 ✓
  - Muted Slate (oklch(0.94 0.02 250)): Charcoal text (oklch(0.30 0.01 250)) - Ratio 8.5:1 ✓

## Font Selection

Typography should convey precision and institutional credibility while remaining highly readable across devices - using a classic sans-serif system for clarity.

- **Typographic Hierarchy**:
  - H1 (Hero Headline): Inter Bold/56px/tight letter spacing (-0.02em)/line-height 1.1
  - H2 (Section Headings): Inter SemiBold/36px/tight letter spacing (-0.01em)/line-height 1.2
  - H3 (Card Titles): Inter SemiBold/24px/normal letter spacing/line-height 1.3
  - Body (Paragraphs): Inter Regular/18px/normal letter spacing/line-height 1.6
  - Small (Captions/Labels): Inter Medium/14px/wide letter spacing (0.01em)/line-height 1.5
  - Navigation: Inter Medium/16px/normal letter spacing/line-height 1.4

## Animations

Subtle, purposeful motion that reinforces precision and professionalism - animations should feel measured and intentional, never frivolous.

- **Purposeful Meaning**: Fade-up animations on scroll communicate progressive disclosure of information, establishing a narrative flow through the page
- **Hierarchy of Movement**: Hero elements (headline, CTAs) receive priority with immediate presence; secondary content (feature cards, sections) animate on scroll into viewport to guide reading flow and maintain engagement

## Component Selection

- **Components**: 
  - Button (shadcn) - Primary CTAs with size="lg", secondary with variant="outline"
  - Card (shadcn) - Feature cards and onboarding cards with subtle borders
  - Separator (shadcn) - Section dividers with subtle styling
  - Navigation menu for mobile (Sheet from shadcn) - Slide-in drawer for mobile nav
  
- **Customizations**: 
  - Custom hero section with gradient background overlay
  - Custom feature grid using CSS Grid with responsive columns
  - Custom navigation with sticky positioning and blur backdrop
  
- **States**: 
  - Buttons: Default with solid background, hover with scale(1.02) and brightness increase, active with scale(0.98), focus with ring
  - Cards: Default with border, hover with subtle lift (translateY(-4px)) and shadow increase
  - Links: Default underline on hover only, color transition 200ms
  
- **Icon Selection**: 
  - CheckCircle for compliance features
  - Shield for security/compliance
  - Globe for multi-chain
  - ArrowRight for CTAs
  - List for feature lists
  
- **Spacing**: 
  - Section padding: py-24 (96px) on desktop, py-16 (64px) on mobile
  - Container max-width: max-w-7xl (1280px)
  - Card gap: gap-8 (32px) on desktop, gap-6 (24px) on mobile
  - Element spacing: space-y-6 (24px) for related content
  
- **Mobile**: 
  - Navigation collapses to hamburger menu at <768px
  - Feature grids stack to single column
  - Hero text size reduces (H1: 36px, body: 16px)
  - Padding reduces to py-12 for sections
  - Touch targets minimum 44x44px for all interactive elements
