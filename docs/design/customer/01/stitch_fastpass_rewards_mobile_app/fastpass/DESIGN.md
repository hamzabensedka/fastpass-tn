---
name: FastPass
colors:
  surface: '#fff8f6'
  surface-dim: '#f3d3ca'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ed'
  surface-container: '#ffe9e3'
  surface-container-high: '#ffe2da'
  surface-container-highest: '#fcdcd3'
  on-surface: '#281712'
  on-surface-variant: '#5c4037'
  inverse-surface: '#3f2c26'
  inverse-on-surface: '#ffede8'
  outline: '#916f65'
  outline-variant: '#e6beb2'
  surface-tint: '#ae3200'
  primary: '#aa3000'
  on-primary: '#ffffff'
  primary-container: '#d43f00'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59e'
  secondary: '#5d5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e5'
  on-secondary-container: '#636467'
  tertiary: '#00694d'
  on-tertiary: '#ffffff'
  tertiary-container: '#008562'
  on-tertiary-container: '#f5fff8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#852400'
  secondary-fixed: '#e2e2e5'
  secondary-fixed-dim: '#c6c6c9'
  on-secondary-fixed: '#1a1c1e'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#60fcc6'
  tertiary-fixed-dim: '#3adfab'
  on-tertiary-fixed: '#002116'
  on-tertiary-fixed-variant: '#00513b'
  background: '#fff8f6'
  on-background: '#281712'
  surface-variant: '#fcdcd3'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 12px
---

## Brand & Style

This design system is built around the concept of **"Premium Velocity."** It balances the urgent, appetizing energy of a high-end bistro with the seamless utility of a modern fintech tool. The brand personality is optimistic, efficient, and rewarding, targeting urban professionals and food enthusiasts who value their time as much as their culinary experiences.

The visual style is **Modern Corporate with Tactile Accents**. It utilizes high-clarity layouts, generous whitespace, and subtle gradients to move beyond flat design into a more sophisticated, "premium utility" space. The interface should feel fast but never frantic, using soft shadows and layered depth to guide the user toward rewards and redemption.

## Colors

The color palette is engineered to drive action and evoke appetite.

- **Primary (Energetic Orange):** Used for main CTAs, progress indicators, and "speed" features. It is the heat of the brand.
- **Secondary (Deep Charcoal):** Provides a grounded, professional anchor for navigation bars, primary text, and high-level containers.
- **Accents (Mint Green & Soft Gold):** Reserved exclusively for positive feedback. Mint Green denotes "Success" and "Go," while Soft Gold is used for "Premium Tiers" and "Points Balance."
- **Neutrals:** A range of cool grays (from #F9FAFB to #E5E7EB) maintains a clean, open canvas that allows the primary orange to pop.

## Typography

This design system uses a dual-font approach to balance impact with readability.

- **Montserrat** is the voice of the brand, used for headlines and hero statements. Its geometric, bold nature communicates confidence and speed.
- **Plus Jakarta Sans** is the workhorse for body copy and labels. Its slightly wider apertures and modern proportions provide exceptional legibility during quick scrolls in a restaurant environment.
- Use **tight letter-spacing** on large displays to maintain a cohesive, "locked-in" look.
- Use **uppercase labels** for secondary information to create a clear hierarchy against lowercase body text.

## Layout & Spacing

This design system follows a **Fluid Grid** model optimized for mobile-first interactions.

- **Grid:** A 4-column grid for mobile, scaling to 8 columns for tablets. 
- **Rhythm:** An 8pt linear scale governs all vertical rhythm.
- **Margins:** Standard side margins are set to 20px to allow for comfortable one-handed thumb interaction while maintaining a "full" feel.
- **Hierarchy:** High-value content (like current reward status) should use the `xl` (32px) padding to create a "breathing" focal point amidst denser list data.

## Elevation & Depth

Visual hierarchy is achieved through **Ambient Shadows** and **Tonal Layering**.

- **Level 0 (Background):** Solid neutral white or off-white.
- **Level 1 (Cards/Lists):** A subtle 1px border (#E5E7EB) with no shadow. Used for standard informational units.
- **Level 2 (Active/Interactive):** A soft, diffused shadow (Y: 4, Blur: 12, Color: Secondary @ 8% opacity). Used for primary actionable cards and search bars.
- **Level 3 (Modals/Overlays):** A deeper shadow (Y: 8, Blur: 24, Color: Secondary @ 12% opacity).
- **Depth:** Subtle linear gradients (Top-down, 5% variance) may be applied to Primary Orange buttons to give them a "pressed" or "tactile" feel, enhancing the premium utility aesthetic.

## Shapes

The shape language of this design system is **Rounded and Approachable**. 

- **Standard Elements:** Buttons and input fields use a `0.5rem` (8px) radius to maintain a modern, friendly appearance.
- **Large Containers:** Reward cards and hero banners use a `1rem` (16px) radius to feel more like distinct, physical objects.
- **Illustrations:** Any flat iconography or illustrations must mirror these corner radii, avoiding sharp 90-degree angles to maintain the brand's softness.
- **Badges:** Use "Pill-shaped" (fully rounded) corners for status indicators (e.g., "Ready to Redeem") to distinguish them from actionable buttons.

## Components

- **Buttons:** Primary buttons use the Energetic Orange with white text. They should span the full width of their container in mobile views for maximum "tapability." Secondary buttons use a Deep Charcoal outline.
- **Reward Chips:** Small, pill-shaped elements using the Mint Green or Soft Gold backgrounds with dark text. Used to show point values or "Unlocked" statuses.
- **Input Fields:** Minimalist design with a 1px border that shifts to Primary Orange on focus. Labels should persist or float to maintain context during fast entry.
- **Progress Bars:** Thin, sleek tracks with the "Success Mint" fill to show progress toward the next reward tier.
- **Action Cards:** Large, high-contrast units for featured restaurants. They should feature high-quality imagery with a gradient overlay at the bottom for text legibility.
- **Feedback Toasts:** Floating at the top of the screen with a slight blur (Glassmorphism Lite) to notify users of points earned without interrupting the flow.