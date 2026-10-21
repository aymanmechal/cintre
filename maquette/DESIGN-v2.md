---
name: Warm Editorial Wardrobe
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444656'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#747688'
  outline-variant: '#c4c5d9'
  surface-tint: '#2044f9'
  primary: '#002fdf'
  on-primary: '#ffffff'
  primary-container: '#2b4cff'
  on-primary-container: '#dfe0ff'
  inverse-primary: '#bbc3ff'
  secondary: '#b52603'
  on-secondary: '#ffffff'
  secondary-container: '#fd5835'
  on-secondary-container: '#570c00'
  tertiary: '#745c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cfa605'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bbc3ff'
  on-primary-fixed: '#000e5e'
  on-primary-fixed-variant: '#002bcf'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a3'
  on-secondary-fixed: '#3d0600'
  on-secondary-fixed-variant: '#8c1900'
  tertiary-fixed: '#ffe089'
  tertiary-fixed-dim: '#edc22e'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Work Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Work Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Work Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Work Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system translates the curated, tactile elegance of European ready-to-wear ateliers (COS, Arket, Sézane) into an intimate digital wardrobe companion. The aesthetic rejects the hyper-gamified, data-heavy clutter of conventional closet catalogers in favor of an unhurried, editorial atmosphere.

### Creative Tenets
- **Curatorial Serenity:** The interface serves as an empty gallery wall. Negative space is not unused screen estate; it is a structural buffer that lets textile textures, silhouettes, and color palettes breathe.
- **Editorial Intentionality:** Typographic choices evoke contemporary independent fashion publications. Sentence-case titling replaces aggressive uppercase labels, conveying an approachable yet discerning tone.
- **Restraint Over Metrication:** No vanity counters, streak badges, or artificial archive analytics. The system organizes garments cleanly and without unsolicited judgment or gamification.

## Colors

The palette grounds itself in natural, unbleached textile tones, punctured by high-character accents borrowed from modernist art and atelier pattern books.

### Color Architecture
- **Base Canvas (`#FAF7F2`):** A warm, linen-inspired off-white serving as the foundational background. Avoid pure white across screen-level wrappers.
- **Card Surfaces (`#FFFFFF`):** Pure white used exclusively on individual garment cards, contextual flyouts, and modal panels to subtly float above the canvas.
- **Text & Graphic Core (`#1A1A1A`):** Deep charcoal ink delivering high legibility without the jarring starkness of `#000000`.
- **Subtle Partition (`#E5E0D8`):** Organic, chalk-tinted border line used at exactly 1px to delineate cards, structural horizontal dividers, and quiet table headers.
- **Cobalt Blue (`#2B4CFF`):** Primary functional signal. Reserved for active interactive states, text hyperlinks, current pagination indices, active filter tags, and high-visibility 2px keyboard focus outlines.
- **Tomato Red (`#FF5A36`):** Secondary emotive/action accent. Used for decisive operations: adding new wardrobe items, confirming acquisitions, and destructive removals.
- **Butter Yellow (`#FFD23F`):** Tertiary contextual pop. Applied selectively to category labels, fabric pills (e.g., "Cachemire", "Lin brut"), and seasonal tags.

## Typography

The type system creates an intentional dialogue between the personality of **Bricolage Grotesque** and the quiet, rational neutrality of **Work Sans**.

### Typographic Rules
- **Sentence Case Mandate:** All titles, section names, tags, and button texts must be rendered in standard sentence case (e.g., "Manteaux d'hiver", not "MANTEAUX D'HIVER"). Uppercase lockouts are strictly prohibited to preserve a refined editorial tone.
- **Display & Headings:** Bricolage Grotesque conveys bespoke character with optical warmth. Keep weights restrained (Medium 500 to SemiBold 600); do not use heavy or ultra-bold variants.
- **Body & Captions:** Work Sans is tuned for fluid, fatigue-free catalog reading. Its proportional openness ensures effortless scanning across garment care labels, fabrics, and outfit annotations.

## Layout & Spacing

Layouts follow an editorial modular grid with wide exterior breathing margins, ensuring the screen feels like an unfolded lookbook rather than a dense software table.

### Structure & Responsive Rules
- **Desktop (1024px+):** 12-column fluid grid locked to a max width of 1440px. Gutters stay at `1.5rem` (`24px`), with outer canvas margins expanding up to `3rem` (`48px`). Gallery items comfortably align across 3 or 4 columns.
- **Tablet (768px - 1023px):** 8-column layout with `1.5rem` gutters and `2rem` margins. Garment items reflow to a 2- or 3-column rhythm.
- **Mobile (< 768px):** 4-column layout with `1rem` (`16px`) gutters and `1.25rem` (`20px`) outer safe margins. Closet item cards adapt to a strict 2-column masonry or full-width stack for curated outfits.
- **Vertical Spacing:** Section transitions must use generous whitespace (`space-xl` or dynamic multiples) to isolate distinct collections or looks without needing heavy line dividers.

## Elevation & Depth

This design system deliberately eschews heavy skeuomorphism and volumetric drop shadows. Elevation is rendered entirely through **tonal planes** and **low-contrast outlines**.

### Depth Layers
1. **Canvas (Base Level):** The warm off-white surface (`#FAF7F2`) serves as the lowest physical plane.
2. **Cards & Modules (Level 1):** Garment cards, filter trays, and sheets are pure white (`#FFFFFF`) framed with a crisp, tactile 1px border of `#E5E0D8`. No drop shadow is applied at rest.
3. **Elevated Drawers & Overlays (Level 2):** Quick-view overlays and detail sheets slide over the canvas with a soft, diffused ambient veil: `box-shadow: 0 12px 32px -8px rgba(26, 26, 26, 0.06)`.
4. **Hover Transition:** On interactive cards, physical lifting is avoided. Instead, the border subtly transitions from `#E5E0D8` to `#1A1A1A` over 180ms ease, providing a quiet, tactile response without floating visual noise.

## Shapes

The geometric personality balances tailored discipline with gentle softening. 

### Geometric Metrics
- **Cards, Panels & Inputs:** Bound by a unified radius of `8px` (`0.5rem`). This moderate rounding softens the silhouette while preserving an architectural, clean perimeter.
- **Pills & Status Badges:** Category indicators and filter chips utilize a full pill radius (`9999px`) to create clear formal contrast against rectangular garment photography and editorial cards.
- **Photographic Media:** Images within cards inherit the internal top `7px` radius or full `8px` container clipping to maintain seamless alignment with border envelopes.

## Components

### Buttons
- **Primary / Add Action:** Background `#FF5A36`, label pure white, borderless, height 44px, padding `0 20px`, radius 8px, font `Work Sans` 14px Medium. Hover state darkens slightly via `#E54824`.
- **Secondary / Ghost:** Transparent background, 1px border `#E5E0D8`, text `#1A1A1A`. On hover, border switches to `#1A1A1A`.
- **Tertiary Link:** Cobalt `#2B4CFF` text without underline at rest; subtle offset underline appears on hover.
- **Destructive:** Pale tinted background `rgba(255, 90, 54, 0.08)`, text `#FF5A36`, hover background `rgba(255, 90, 54, 0.14)`.

### Garment & Outfit Cards
- **Construction:** Background `#FFFFFF`, 1px solid `#E5E0D8`, border-radius 8px, overflow hidden.
- **Image Container:** 3:4 portrait aspect ratio with neutral linen backfill (`#F4EFEA`) to host transparent or cut-out garment photography cleanly.
- **Card Metadata:** Placed below the photograph with `space-md` padding. Category pill positioned top-left of copy; garment name in `headline-sm`; subtle fabric or season note in `body-sm` muted text (`rgba(26, 26, 26, 0.6)`).

### Chips & Badges
- **Category Badge:** Butter yellow `#FFD23F` solid background, text `#1A1A1A`, height 24px, pill-radius (`9999px`), padding `0 10px`, font size 11px Medium.
- **Filter Chip (Inactive):** Background `#FFFFFF`, border 1px `#E5E0D8`, text `#1A1A1A`, padding `6px 14px`, pill-radius.
- **Filter Chip (Active):** Background `#2B4CFF`, border 1px `#2B4CFF`, text `#FFFFFF`, pill-radius.

### Inputs & Select Fields
- **Container:** Background `#FFFFFF`, border 1px `#E5E0D8`, radius 8px, height 44px, padding `0 14px`, text `#1A1A1A`.
- **Focus State:** 2px outline solid `#2B4CFF` with an offset of 1px.
- **Placeholder:** Font `Work Sans` 14px, color `rgba(26, 26, 26, 0.4)`.

### Lists & Key-Value Details
- Horizontal rows separated by a clean 1px hairline of `#E5E0D8`. Label in `Work Sans` 13px muted, attribute value in `Work Sans` 14px Medium `#1A1A1A`. Zero alternating row zebra striping.

### Checkboxes & Radios
- Size 18x18px, border 1.5px `#E5E0D8`, radius 4px (checkboxes) or circular (radios). Active state fills with `#2B4CFF` displaying a crisp white mark.