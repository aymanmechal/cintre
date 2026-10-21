---
name: Editorial Wardrobe Archive
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede9'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#5b403a'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#8f7069'
  outline-variant: '#e3beb6'
  surface-tint: '#b52603'
  primary: '#b52603'
  on-primary: '#ffffff'
  primary-container: '#ff5a36'
  on-primary-container: '#5a0c00'
  inverse-primary: '#ffb4a3'
  secondary: '#0030e1'
  on-secondary: '#ffffff'
  secondary-container: '#2d4dff'
  on-secondary-container: '#e1e2ff'
  tertiary: '#745c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cfa606'
  on-tertiary-container: '#4f3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a3'
  on-primary-fixed: '#3d0600'
  on-primary-fixed-variant: '#8c1900'
  secondary-fixed: '#dee0ff'
  secondary-fixed-dim: '#bbc3ff'
  on-secondary-fixed: '#000e5e'
  on-secondary-fixed-variant: '#002bcf'
  tertiary-fixed: '#ffe089'
  tertiary-fixed-dim: '#edc22e'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  display-hero:
    fontFamily: Bricolage Grotesque
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 60px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Work Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Work Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-punchy:
    fontFamily: Bricolage Grotesque
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-meta:
    fontFamily: Work Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system is built for a personal digital wardrobe and lookbook platform. The visual voice is modern, disciplined, and strictly editorial—evoking high-fashion print catalogues, architectural line work, and physical specimen archives. The experience must feel curated rather than algorithmic, treating garments as valued design objects.

The design movement balances strict editorial flat minimalism with high-impact Swiss typographic precision. Color is applied exclusively through solid, opaque planes with razor-sharp definitions. Under no circumstances should gradients, blur effects, glassmorphic layers, decorative drop shadows, glowing atmospheric backdrops, or skeuomorphic textures enter the interface. All illustrations, iconography, and graphics are flat, geometric, and restrained. Imagery relies on stark, flat-lit product shots on neutral square frames.

## Colors

The palette relies on a tactile, warm paper canvas punctuated by bold, unmodulated primary tones and deep carbon structural lines. Color functions as semantic demarcation and visual rhythm, never as ambient decoration.

### Light Mode (Default)
- **Canvas / Canvas Subtle**: `#FAF7F2` (Warm Off-White) and `#F0EDE8` (Inset Frame Tone).
- **Surface / Card Background**: `#FFFFFF` for interactive cards; `#ECE9E2` for product display pedestals.
- **Ink Primary**: `#1A1A1A` for headings, body copy, and structural borders.
- **Ink Secondary / Muted**: `#666666` for metadata, timestamps, and secondary specs.
- **Accent Primary (Tomato Red)**: `#FF5A36` for primary CTAs, destructive actions, and active log markers.
- **Accent Interactive (Cobalt Blue)**: `#2B4CFF` for secondary pathways, text links, active nav pills, and focus rings.
- **Accent Highlight (Butter Yellow)**: `#FFD23F` for category badges, archive tags, and inventory status flags.
- **Structural Rules**: `#1A1A1A` for active boundaries; `#E5E0D8` for hairline delimiters.

### Dark Mode
- **Canvas**: `#141414`.
- **Surface / Card Background**: `#1F1F1F`.
- **Surface Pedestals**: `#2A2A2A`.
- **Ink Primary**: `#F5F5F5`.
- **Ink Secondary**: `#9E9E9E`.
- **Structural Rules**: `#2E2E2E` and `#404040`.
- **Accent adjustments**: `#FF5A36` and `#FFD23F` retain their true hex codes; `#2B4CFF` shifts to `#4B68FF` if higher contrast is needed on dark gray backgrounds.

### Accessibility & Interaction
Every focusable element must display a crisp `2px solid #2B4CFF` offset ring when activated via keyboard navigation. Color contrast across all text-to-background combinations strictly exceeds WCAG AAA (7:1) for body copy and AA (4.5:1) for badges.

## Typography

The typographic hierarchy is grounded in editorial tension: the idiosyncratic, high-impact structure of **Bricolage Grotesque** paired with the utilitarian clarity of **Work Sans**.

### Headings & Titles
Headings utilize tighter negative tracking (`-0.02em` to `-0.04em`) to establish editorial gravitas. Display and top-level titles should be set with immediate line-wrapping and compact vertical cadence.

### Body & Data
Body text prioritizes effortless scanning and rhythmic reading. Long descriptions use `body-md` in regular weight with neutral tracking. Tabular attributes (sizes, fabric composition, wear-count metrics) leverage `body-sm`.

### Micro-Copy & Labels
Section categorizers, badge tags, and sub-nav tabs rely strictly on `label-punchy` rendered in uppercase styling (`text-transform: uppercase`). This maintains structural contrast against flowing item descriptions.

## Layout & Spacing

The spatial model operates on a flexible 12-column architectural grid with visible framing parameters. The interface favors disciplined blocks over unbounded fluidity.

### Grids & Viewports
- **Desktop (>= 1200px)**: 12-column grid, max-width `1440px`, centered, outer margin `margin` (`2.5rem`), column gap `gutter` (`1.5rem`).
- **Tablet (768px – 1199px)**: 8-column grid, outer margin `1.5rem`, column gap `1rem`.
- **Mobile (< 768px)**: 4-column grid, outer margin `margin-mobile` (`1rem`), column gap `gutter-mobile` (`0.75rem`).

### Rhythm & Alignment
Spacing follows strict multi-unit intervals (`0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2.5rem`). Garment galleries use balanced square aspect ratios (1:1) or editorial proportions (3:4) to guarantee uniform vertical alignment across catalog columns. Visual dividers between content blocks must extend to grid edges.

## Elevation & Depth

This system avoids physical lighting simulations, skeuomorphic shadows, and ambient diffused drop-shadows. Depth is communicated strictly through surface layering and line hierarchy:

1. **Base Layer (Ground)**: Canvas `#FAF7F2` (Dark: `#141414`).
2. **Structural Tier 1 (Cards & Frames)**: Flat `#FFFFFF` surface bounded by a crisp `1px solid #1A1A1A` border (Dark: `#1F1F1F` bounded by `1px solid #2E2E2E`).
3. **Specimen Well (Pedestal)**: Inset `#F0EDE8` or `#ECE9E2` fills for garment image backgrounds. No inner shadows; depth is implied purely by contrast against the white card body.
4. **Stacked Modals & Sheets**: Contained with `2px solid #1A1A1A` borders. For absolute distinction over underlying content, use a hard solid under-plane offset (e.g., `4px 4px 0px #1A1A1A`) or a flat `50%` solid black scrim without background blur.

## Shapes

The form language is geometric, clean, and restrained. While sharp right angles emphasize the architectural feel of editorial prints, interactive elements feature a controlled, understated softening.

- **Standard Elements (Buttons, Inputs, Cards, Tags)**: Set to an exact `8px` (`rounded-lg` under level 1 rules) to ease tactile friction while preserving geometric tension.
- **Product Presentation Frames**: Crisp `8px` outer container corners, housing clean edge-to-edge square image cuts.
- **Badges & Micro-Pills**: Standardized at `4px` or `8px` radius. Fully circular or stadium-shaped pills are reserved only for circular utility triggers (such as icon-only close/like toggles).

## Components

### Buttons
- **Primary Action**: Solid `#FF5A36` background, `#FFFFFF` text, `1px solid #1A1A1A` perimeter, `8px` corner radius. Font: `label-punchy` (uppercase). Padding: `0.75rem 1.5rem`. Hover state transitions to `#1A1A1A` with `#FFFFFF` text. Focus: `2px solid #2B4CFF` outline offset by `2px`.
- **Secondary Action**: Solid `#FFFFFF` background, `#1A1A1A` text, `1px solid #1A1A1A`. Hover shifts background to `#ECE9E2`.
- **Destructive**: Solid `#FAF7F2` background, `#FF5A36` text and border. Hover inverts to solid `#FF5A36` with white text.

### Lookbook Product Cards
- **Container**: Solid `#FFFFFF` card, bounded by a `1px solid #1A1A1A` (or `#E5E0D8` for secondary grids) border, `8px` corner radius, internal padding of `0.75rem`.
- **Image Pedestal**: Square (1:1) aspect ratio, filled with flat `#F0EDE8` or `#ECE9E2`. Garment photography sits dead-center without background remnants.
- **Card Footer**: Two-line layout. Line 1: Garment name (`headline-sm`) left, Price/Brand (`label-punchy`) right. Line 2: Wear count / Category badge in `#666666` (`label-meta`).

### Badges & Chips
- **Category Badge**: Solid `#FFD23F` background, `#1A1A1A` text, `1px solid #1A1A1A`, uppercase `label-punchy` typography. Padding: `0.25rem 0.5rem`.
- **Filter Chip (Inactive)**: `#FFFFFF` fill, `#1A1A1A` border, `0.375rem 0.75rem` padding.
- **Filter Chip (Active)**: `#2B4CFF` fill, `#FFFFFF` text, `1px solid #1A1A1A`.

### Input Fields
- **Text Fields**: Flat `#FFFFFF` container, `1px solid #1A1A1A`, `8px` radius, `0.75rem 1rem` padding. Text: `body-md` in `#1A1A1A`. Placeholder: `#666666`. Focused: `2px solid #2B4CFF` without shadow bloom.
- **Checkboxes & Radios**: `20px x 20px` square (`4px` radius for checkbox, full circle for radio), `1.5px solid #1A1A1A`. Checked state fills solid `#2B4CFF` with a white checkmark or center pip.

### Lists & Inventory Logs
- **Item Rows**: Stacked tabular items separated by a hairline `1px solid #E5E0D8`. Hover state fills the entire row with `#F0EDE8`. Text remains `#1A1A1A`.

### Wardrobe Capsule Bar
- A pinned or sticky status bar showing lookbook distribution. Solid `#FAF7F2` canvas, bordered top and bottom with `1px solid #1A1A1A`. Uses solid blocks of `#FF5A36`, `#2B4CFF`, and `#FFD23F` to visually represent category splits (Tops, Bottoms, Outerwear) as a segmented data strip.