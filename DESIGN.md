---
name: Seven Sins
description: A white, illustrated personality-test interface matching the supplied result reference.
colors:
  primary: "#35823a"
  primary-hover: "#286d2e"
  share-green: "#4b9e50"
  link-blue: "#2373ad"
  ground: "#ffffff"
  ink: "#484848"
  muted: "#666666"
  line: "#dddddd"
  chart-outline: "#111111"
  pride: "#4d974b"
  greed: "#edc93c"
  lust: "#dc4b43"
  envy: "#82b64c"
  gluttony: "#dca051"
  wrath: "#d55432"
  sloth: "#956abc"
typography:
  display:
    fontFamily: "Roboto Variable, Arial, sans-serif"
    fontSize: "clamp(42px, 6vw, 76px)"
    fontWeight: 750
    lineHeight: 1.08
    letterSpacing: "0"
  headline:
    fontFamily: "Roboto Variable, Arial, sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  question:
    fontFamily: "Roboto Variable, Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Roboto Variable, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Roboto Variable, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
rounded:
  control: "5px"
  progress: "2px"
  score-bar: "3px"
  share: "26px"
  profile-tile: "36px"
spacing:
  tight: "10px"
  control-gap: "12px"
  regular: "18px"
  relaxed: "25px"
  gutter: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ground}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 18px"
  button-text:
    textColor: "{colors.link-blue}"
    padding: "11px 0"
  answer:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 15px"
  share-button:
    backgroundColor: "{colors.share-green}"
    textColor: "{colors.ground}"
    rounded: "{rounded.share}"
    width: "110px"
    height: "110px"
---

# Design System: Seven Sins

## Overview

**Creative North Star: "The Illustrated Personality Wheel"**

The supplied reference establishes the visual identity: a white ground, bold dark-gray headings, black chart outlines, and seven colorful illustrations. The interface uses familiar controls and ample space so the test and its result diagram remain the focus. This records the implemented reference treatment, rather than a new visual direction.

The illustration set is extracted from the user-provided reference. Keep those assets recognizable and proportionate. Roboto carries the interface and export headings; the chart itself uses Arial for its SVG labels and percentages.

**Key Characteristics:**
- White surfaces and dark-gray, bold sans-serif hierarchy.
- Green actions, blue links, and independently colored result sectors.
- Familiar bordered answer rows and restrained rounding.
- Illustrations and strong black geometry give results their character.

## Colors

### Primary

Action green distinguishes the main continue and download controls. Its darker hover variant preserves clear interaction feedback. The lighter share green belongs to the reference's icon-only share control and wordmark; use the primary token for white text buttons.

### Secondary

Link blue identifies navigation, text actions, and profile-tile captions. The seven named trait colors belong to chart fills and score bars, paired with the pale ends of the gradients defined in the chart source. They are data encodings rather than competing action colors.

### Neutral

Ground is white. Ink is the principal heading and body color, muted is secondary explanatory text, and line separates information. Chart outline provides the much stronger visual boundary around the seven sectors.

**The Action and Data Rule.** Green controls and blue links retain their interaction roles; the seven trait colors communicate results.

## Typography

**Display and Body Font:** Self-hosted Roboto Variable with Arial and sans-serif fallbacks. The chart uses Arial within its SVG coordinate system.

The hierarchy is bold and direct, without decorative tracking. The display title uses the frontmatter's responsive scale and a heavy weight; on phones it becomes a fixed size (39px), with a slightly looser line-height (1.1). Section headings use the headline role. Question headings use the question role and reduce on phones (26px).

The result label is larger on desktop (56px) and reduces on phones (32px). The strongest-result sentence scales with the viewport (`clamp(26px, 4vw, 49px)`) and becomes fixed on phones (27px). Explanatory prose generally follows the body role, while questionnaire hints and privacy labels are smaller. Article prose uses a more generous line-height (1.85) and a maximum readable measure (75ch).

**The Reference Hierarchy Rule.** Keep the large dark-gray test title, the Results label, and the strongest-result sentence distinct from the chart's black labels.

## Layout

The centered page container has a maximum width (1180px) including desktop horizontal gutters (40px). The questionnaire stays narrower (740px), while the result diagram can use the full content width (1100px). Supporting sections use two columns where useful and become a single column on phones.

At the intermediate breakpoint (850px), horizontal gutters reduce (26px); at the phone breakpoint (600px), they reduce again (18px). The phone header hides the first navigation link, answer rows hide the numeric shortcut circles, and result controls reduce in size. The diagram scales as a single SVG, preserving all seven sectors and surrounding illustration positions. Profile tiles remain a horizontally scrollable, snapping strip.

Spacing is open around major sections and compact within controls. Supporting sections generally use vertical spacing (40–60px); answer rows use a small gap (10px). Desktop result spacing deliberately gives the chart and strongest-result sentence room to read as one composition.

## Elevation & Depth

Most surfaces are flat: whitespace, thin rules, and borders establish structure. Small shadows belong to the reference share control and illustrated profile tiles. The share shadow is soft (`0 7px 15px #00000026`) and reduces on phones (`0 4px 9px #00000020`); the tile shadow is lighter (`0 3px 6px #00000018`). Result sectors and profile tiles use gradients as observed in the reference treatment.

**The Flat Controls Rule.** Questionnaire rows and ordinary action buttons use borders or fill changes, without borrowing the result share control's shadow.

## Shapes

Ordinary buttons and answer rows have gently rounded corners using the control radius. Numeric answer markers and step numbers are circular. Progress segments and score bars have smaller corners; their clipping contains the colored fill. The share button is a rounded square, reducing to smaller rounded squares at each breakpoint. Profile illustrations sit inside substantially rounded, bordered square tiles.

The signature chart has seven triangular sectors with strong black outlines (5 SVG units), rounded joins, external labels, internal percentages, and surrounding illustrations. Fill radius changes linearly with each independently scored percentage. Do not imply that sector area or the sum of all sectors represents a probability distribution.

## Components

### Buttons

Primary buttons are green with white bold text, generous horizontal padding, and a minimum desktop height (48px). Hover darkens the fill. Secondary buttons use white ground, an ink label, and a fine gray border; hover adds a pale-gray surface. Text buttons are blue and underline on hover. Disabled buttons use reduced opacity (0.4).

Focusable controls use the shared green outline (3px) and offset (4px). Answer rows receive their focus outline around the complete label. Reduced-motion preferences disable transitions and animations.

### Answer Rows

A fine gray border, full-width label, hidden native radio input, and a checked-state tick make each row an accessible choice target. Hover adds a pale green surface and border; selection uses a stronger green border and pale green fill. Numeric circles are a desktop aid. Mobile rows retain comfortable target height (49px) while removing those circles.

### Navigation

The small wordmark combines a green seven-sided mark with bold and regular text. Navigation is blue, compact, and text-led; hover underlines its links. A visible-on-focus skip link provides direct access to main content.

### Result Diagram and Share

Scale the entire chart rather than independently moving labels or icons. The icon-only share control sits at the upper right of the chart region and has an accessible name. Preserve the reference image order and supplied transparent PNG assets. The browser PNG export includes the same scores and illustrations, together with the test title, result label, strongest-result sentence, and actual hostname.

### Profile Tiles and Explanations

Rounded image tiles have a pale-gray gradient, gray border, and soft shadow. Their bold blue captions indicate actions that open the matching explanation. The tile strip scrolls horizontally, with adjacent arrow controls. Seven score rows and expandable explanations remain available below it.

### Supporting Content

Thin dividers structure theme rows, FAQ disclosures, result details, and tables. Native disclosure controls provide expandable content. Tables scroll horizontally on phones instead of shrinking all content into illegibility.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied illustrations, their proportions, and their order around the result diagram.
- **Do** use the primary green for white text controls and reserve blue for links and text actions.
- **Do** keep readable question controls on phones and scale the chart as a unit.
- **Do** retain keyboard focus visibility and reduced-motion behavior.

### Don't:
- **Don't** restore the superseded lavender visual direction.
- **Don't** replace the reference illustrations with unrelated glyphs or generic icon sets.
- **Don't** introduce shadows on the ordinary questionnaire controls.
- **Don't** make seven independent percentages appear to sum to a single total.
