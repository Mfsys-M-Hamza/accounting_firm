# UK Accountax website: changes from the improvement brief

November 2026. Screenshots of the previous site are in `before/` and the new site in `after/` (desktop and mobile, first screen and full home page, plus a service page).

## Completed

**Design system**
- New palette from the brief: deep navy `#12304A`, teal `#176B87`, light blue-grey `#F3F7F9` section backgrounds and a muted gold accent used sparingly.
- One modern typeface (Plus Jakarta Sans), consistent spacing, card corners, buttons and one flat icon style. The mixed gradients, 3D illustrations and decorative backgrounds have been removed.
- Filled teal button for "Get a Free Quote", outlined button for "Book a Consultation", used the same way on every page.
- Subtle fade effects only, switched off for visitors who prefer reduced motion.

**Homepage** (in the order set by the brief)
- Contact strip, navigation, a new hero with the suggested headline and copy, the two main actions and the trust line.
- Trust strip, 8 service cards, 8 "Who We Help" tiles, "Why UK Accountax", a four-step "How it works", About, latest articles, FAQs and a closing enquiry section.
- New "How we protect your information" section (also on the About page).

**Navigation and footer**
- Main menu: Services (dropdown), Who We Help, About, Insights, FAQs, Contact, plus a highlighted "Get a Quote" button. The header stays at the top while scrolling and is compact on phones.
- Footer with service links, audience links, company links, contact details, opening hours, social links, privacy policy, terms and copyright.

**Enquiries**
- Short enquiry form (name, email, phone, business type, service required, message) at the end of most pages, with a clear thank-you message after sending. Enquiries are sent to the firm's WhatsApp, as before.

**Who We Help**
- A dedicated page for each of 12 audiences (for example /industries/construction), each with common challenges, how we help, relevant services, FAQs and an enquiry form.

**Images**
- All photographs are licensed (Unsplash License, free for commercial use); sources are listed in `src/assets/images/CREDITS.md`.
- Three stock photos that showed US tax forms were replaced, and one unused photo was removed.
- Photos were re-downloaded from Unsplash at full quality and saved as sharp 2000px WebP files, served at high quality (85). On a normal server, Next.js also serves AVIF/WebP at the right size for each device.
- Three consistent crop ratios only: 4:3 for section photos, 16:9 for article images, 4:5 for portraits.
- Alt text reviewed against every photo and corrected where it was inaccurate, including one that described stock models as the firm's team.

**Team**
- New "Our Team" page (/team) with a mixed layout: large alternating profiles for the directors (photo, bio, qualifications, areas of expertise and a "Book a consultation" button), a card grid for the wider team, and a "How our team works with you" section. Professional memberships appear automatically once listed.
- A team preview on the home and about pages links to the full page; "Our Team" is also in the footer and sitemap.
- The profiles are currently clearly labelled samples with initials instead of photos. Stock photos of strangers are deliberately not used, as presenting them as the firm's team would mislead visitors.

**Content**
- Article cards show category, author, published or updated date and reading time. Articles can show a "Reviewed by" name once supplied.
- The figures on the About page now display immediately instead of counting up from zero.

**Technical**
- Analytics and conversion tracking (quote, consultation, phone, email and WhatsApp clicks, and enquiries sent) are built in but switched off. They turn on when a Google Analytics ID is added, and only load after the visitor accepts cookies; the privacy policy updates automatically.
- Tested on every page at desktop and mobile sizes in Chrome, Edge and Firefox: accessibility (WCAG 2.2 AA scan), keyboard navigation, menus, forms, links, page titles and descriptions, structured data and layout on small screens. All checks pass.
- All phone, email, WhatsApp and social links checked and working.
- Page speed tested with Google Lighthouse on a simulated mid-range phone over slow 4G, and improved: sections below the first screen are only laid out when scrolled to, the enquiry form loads when scrolled near, the animation library was replaced with lightweight CSS, and the main article image loads first. Mobile performance scores are now 88–95 (home page: 84 before), with accessibility, best practices and SEO at 100 on every page tested and no layout shift.

## Waiting on UK Accountax

These items are ready to switch on or need confirming before launch:

1. **Team profiles and real photos**: names, roles, qualifications, short bios, LinkedIn links and portrait photos (4:5, at least 800×1000px). The team page is built and currently shows labelled sample profiles, which must be replaced or switched off before launch. Genuine photos of the team and office would also replace the stock photos of people on the home, about and service pages, as the brief recommends.
2. **Testimonials**: genuine reviews with permission and a link to the review source (section is built and hidden).
3. **Credentials**: professional memberships and registration numbers, if any.
4. **Claims to confirm**: the hero line "Qualified accounting support • UK-wide service • Clear, agreed fees" and "Established 2021" (the old website said "6+ years").
5. **Contact details**: office address and opening hours (the hours shown are a placeholder).
6. **Logo**: keep the current indigo logo or recolour it to the new navy.
7. **Pricing**: "from" prices or packages, if the firm wants them shown.
8. **Analytics**: a Google Analytics 4 measurement ID, if tracking is wanted.
9. **Review**: the tax rules quoted on the audience pages (thresholds and deadlines) should be checked by an accountant before launch.

## Not included

- No Safari test: it can't run on Windows. Testing on an iPhone or Mac before launch is recommended.
- New articles on UK topics (VAT, Making Tax Digital for Income Tax, payroll, Companies House, Self Assessment) were left out of this round.
