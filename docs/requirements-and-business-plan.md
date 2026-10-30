# Flagship Dealership App: Requirements, Priorities, Business Model, Architecture

Status: discussion draft for Wes. No app code exists yet. Prices and market claims are indicative assumptions to validate, not researched facts.

The goal: a live, hosted demo (Vercel) that is also the real product template. A new dealer is onboarded by filling in config and content, not by rebuilding.

---

## 1. Users and use cases

We design from the point of view of every person who touches a dealership. Each use case is tagged with the department it serves.

### 1.0 Flagship use case (from Wes's real experience): "What does an oil change cost for my truck?"

A customer visited a major Chevrolet dealer's site to learn the price of an oil change for a Chevy pickup. The site listed no prices and was confusing. Finding the service phone number took a while. When Wes called, the service department would not give a firm price: it "depends on how many quarts it takes," with a range up to $189. The customer wanted to give the truck details and get a number.

What this tells us to build:
- **Service price estimator by vehicle.** Year / make / model / engine, or VIN or plate lookup, then a price for the chosen service. The engine determines oil capacity and oil spec (for example, a V8 pickup versus a 4-cylinder), so a firm quote is usually knowable from the vehicle.
- **Quarts-based pricing built into the menu.** Each service op stores base labor, oil grade, capacity by engine, price per quart, filter, and fees. The estimator computes the total. The dealer sets the rules in the admin.
- **A firm quote or a clear policy.** Show "Your price: $X" when capacity is known. If the dealer wants protection, show "Price $X, not to exceed $Y" with a plain-language explanation, and let the customer approve any change by text before work starts. Never an unexplained range.
- **Transparent menu pricing** for the top 15 to 20 services (oil change, tire rotation, brakes, battery, alignment, inspection), with a disclosure line about what can change the price.
- **Prominent click-to-call, text, and book** on every service page, with the department number and hours visible without hunting. Two taps from the home page to the price.
- **Success measure:** a visitor who lands on the site can get a price for their vehicle's oil change in under 30 seconds and book in under 90.

Non-software lesson for the sales pitch: the dealer's phone staff lost trust by saying "it depends" with no estimate. Our tool gives advisors the same exact-price calculator on the phone, so they can quote confidently and consistently. Pitch line: "Your customers are shopping your service prices before they ever call. Whoever shows a number first wins the appointment." Train dealers on quoting practice (a firm estimate plus a not-to-exceed cap) as part of onboarding.

### 1.1 External users

**Shopper / buyer (new and used sales)**
- Search inventory by make, model, year, price, payment, body, color, mileage, features, location. Results must feel instant.
- Filter and sort, save searches, get alerts when matching cars arrive or drop in price.
- Vehicle detail page: large photo gallery, 360 / video walk-around, window sticker, history report link, price breakdown, features, similar vehicles.
- Compare up to 4 vehicles. Save favorites without an account.
- Payment calculator: finance, lease, cash, with down payment, term, APR, trade-in value.
- Get an e-price or ask a question (chat, text, call, form) with one tap.
- Book a test drive (at the store or delivered to home), choose time, upload license.
- Reserve a vehicle with a refundable deposit (later phase).
- Build a deal online: pick vehicle, trade, payment, protection products, then hand off to the store.
- Read specials, incentives, and manufacturer offers with clear fine print.
- Certified pre-owned: see CPO benefits and qualifying vehicles.

**Finance applicant**
- Secure credit application (soft pull pre-qualification first, full application second).
- Co-applicant support, save and resume, plain-language privacy and consent.
- Document upload (income, ID, insurance).
- Status tracking: what is received, what is missing.

**Seller / trade-in**
- Instant appraisal by plate or VIN plus condition questions, with an honest range.
- Photo upload, then a firm offer valid for N days.
- "Sell us your car" even with no purchase, scheduled inspection, appointment.
- Trade value carries into the shopping flow.

**Service customer**
- Schedule service: pick vehicle (saved garage), services (menu with prices), advisor, time slot, loaner or shuttle, drop-off or waiting.
- Recall lookup by VIN, with one-tap booking for the fix.
- Service specials and coupons, tire finder and tire specials.
- Service history, upcoming maintenance reminders by mileage and date.
- Estimate approval by text with photos and video from the technician.
- Pay for service online.
- Status updates: car received, in progress, ready.

**Parts customer** (retail DIY and wholesale body shops / mechanics)
- Search by VIN, year/make/model, part number, keyword. Fitment check is mandatory.
- Cart, pickup in store, shipping, or ship-to-home. Stock status per location.
- Wholesale login with trade pricing, quick reorder, invoice history.
- Parts specials, order status.

**Accessories customer**
- Browse by vehicle, with install options and "add to my deal" for new purchases.
- Bundles (all-weather mats, tint, hitch, running boards), financing into the deal.
- Install booking through service.

**Rewards / loyalty member**
- Points for purchases, service visits, referrals, and reviews. Redeem on service, parts, accessories.
- Tier status, birthday and anniversary offers, referral link.
- Vehicle ownership dashboard: warranty status, maintenance, loyalty balance, trade-in estimate "what is my car worth now".

**General visitor**
- About the dealership, team, hours by department, directions, multiple locations, community involvement.
- Reviews and reputation (Google, DealerRater, Facebook) displayed honestly.
- Careers page and application (high value, often forgotten).
- Contact by any channel, a rapid response promise.
- Language switch (English / Spanish at minimum).

### 1.2 Dealer staff

| Role | What they need |
|---|---|
| General manager / owner | Dashboard: leads, appointments, response time, inventory aging, web-to-sale conversion, service bookings, revenue attributed to the site. |
| Sales consultants | Lead inbox with shopper activity (what they viewed, saved, calculated), one-tap call/text/email, appointment calendar, mobile-first. |
| BDC / internet team | Unified lead queue across web, chat, text, phone, third-party sources; SLA timers, assignment rules, templates, follow-up cadences, missed-lead alerts. |
| Used car manager | Inventory control: pricing, aging, photos missing, merchandising, price-change history, market price comparison, featured/special flags. |
| New car manager | Incentive and rebate management, allocation, in-transit and incoming inventory, order requests. |
| Finance (F&I) | Credit application intake, lender routing, document collection, product menu, compliance logging. |
| Service director / advisors | Online scheduling with capacity rules, op codes and menu pricing, recall and campaign tools, declined-service follow-up, upsell menus. |
| Parts manager / counter | Catalog and stock sync, web orders queue, pricing matrices (retail vs wholesale), special-order tracking. |
| Accessories manager | Catalog, bundles, install labor linking. |
| Marketing | Specials, banners, landing pages, SEO controls, campaign tracking, email/SMS lists, review requests, ad feeds. |
| Receptionist / greeters | Appointment list, walk-in to check-in flow. |
| Compliance / admin | Privacy requests, consent logs, price and advertising compliance disclosures, audit trail. |

### 1.3 What else a dealership needs that is easy to miss

- **Lead response speed.** The strongest predictor of conversion. Auto-reply, instant text, round-robin, escalation.
- **Phone call tracking and click-to-call**, because many buyers still call.
- **Chat and text** (human first, AI assist second), with after-hours handling.
- **Price transparency and legal disclosures.** State advertising rules, "plus tax, title, fees" language, offer expiry dates. Minnesota has specific rules; needs a lawyer pass.
- **Digital retailing hand-off** to the dealer's DMS/CRM (CDK, Reynolds, Dealertrack, DealerSocket, VinSolutions, eLead, etc.). Integration is the actual hard part of this business.
- **Inventory feeds** in (DMS, vAuto, HomeNet, Dealer Specialties) and out (Google Vehicle Ads, Facebook Marketplace, Cars.com, CarGurus, Autotrader).
- **OEM compliance.** Brand sites must follow manufacturer rules (logos, incentives, co-op advertising). Franchise dealers often have to use approved vendors. This affects whom we sell to first (see section 4).
- **Multi-rooftop and multi-franchise** groups (shared inventory, shared branding, per-store content).
- **Reputation management:** review requests after sales and service, response tooling.
- **Local SEO:** structured data for vehicles and dealership, location pages, Google Business Profile sync.
- **Accessibility** (WCAG 2.2 AA). Dealers do get sued over this; it is also a selling point.
- **Speed.** Core Web Vitals, image optimization, since inventory pages are image heavy.
- **Security and privacy:** credit applications contain SSN and income. GLBA Safeguards Rule applies to dealers. We should NOT store SSNs ourselves; hand off to a certified lender or credit-application vendor via secure iframe/API.
- **Email/SMS compliance** (TCPA, CAN-SPAM, consent capture and logging).
- **Used-vehicle extras:** history report links, inspection checklist, warranty/guarantee, return policy.
- **EV content:** charging, range, incentives, home charger accessories.
- **Delivery / out-of-state buyers:** shipping quotes, remote paperwork.
- **Fleet / commercial** inquiry, **powersports/RV/marine** variants if the dealer sells them.
- **Events, community, giveaways**, **blog / buying guides**, **video** (walk-arounds).
- **Staff directory with photos** (trust builder), **department hours**, **text-to-pay**.

---

## 2. Prioritization and build order

MoSCoW per release. The flagship demo needs to prove three things in the first five seconds and the first two minutes: it looks far better than anything the dealer has, it is fast, and it is a complete system, not a brochure.

### Phase 0: Foundation (build before any feature)
- Multi-tenant, config-driven template (section 5): brand tokens, content, departments toggle on/off.
- Design system: cinematic dark staging, high-contrast text, large targets, keyboard, swipe, phone-first.
- Seeded demo data for a fictional dealership group "Northstar Auto" (not a real brand), with 150 to 300 realistic vehicles, real-looking photos (licensed or generated), service menu, parts catalog sample, specials.
- Legal pages, footer, accessibility baseline, analytics events.

### Phase 1: Demo MVP (the "wow plus proof" release)
Must have:
1. Home: cinematic hero, search-first, featured inventory, specials, trust.
2. Inventory search and filters (instant), vehicle detail pages, gallery with video/360 slot.
3. Payment calculator and "get my price" lead capture.
4. Test-drive scheduler.
5. Trade-in appraisal flow (plate/VIN plus condition cards, one card at a time).
6. Service scheduler with menu, advisor, time slots, recall check (mocked data acceptable), plus the **vehicle-based service price estimator** from section 1.0 (this is a headline demo moment).
7. Specials and incentives page.
8. Parts and accessories storefront (browse, fitment select, cart, request-to-order or pickup).
9. Dealer-side admin: lead inbox, inventory manager, specials editor, appointment calendar, theme/branding editor (this is what sells).
10. Mobile excellence, sub-2-second loads, WCAG AA, SEO structured data.

Should have: saved vehicles without login, compare, saved-search alerts, finance pre-qualification (mock integration), reviews display, multi-location switcher, rewards preview.

### Phase 2: Revenue-ready product
- Real inventory feed ingestion (CSV/FTP/API) with auto-refresh, image handling.
- Real lead delivery to CRM (ADF/XML email standard, plus API for the big CRMs).
- Credit application via certified vendor (iframe/API).
- Customer accounts: garage, history, loyalty, status tracking.
- Text/chat inbox for BDC, AI-assisted replies with human review.
- Service: real scheduling capacity, text-to-approve estimates, reminder campaigns.
- Review request automation, Google Business Profile sync, outbound ad feeds.
- Parts e-commerce with payments (Stripe), shipping.

### Phase 3: Platform
- Multi-rooftop groups, shared inventory, group-level reporting.
- Digital retailing: full deal builder, deposits, e-sign.
- Market pricing intelligence, merchandising automation, AI-written vehicle descriptions.
- Marketplace: dealers buy add-on modules.
- White-label for agencies, reseller console.
- Native/PWA app with push notifications.

### Won't do (initially)
- Our own DMS or CRM (integrate instead).
- Storing SSNs or full credit data.
- Custom per-dealer code forks.

---

## 3. Competitive and failure-mode view

Typical dealer-site failures (to be verified against the specific bad app Wes finds; each one is a design requirement for us):

| Failure | Why it happens | Our answer |
|---|---|---|
| Slow, laggy inventory search | Server-rendered page reloads, third-party iframes, heavy scripts | Indexed search (e.g., Typesense/Algolia/Postgres FTS), edge caching, instant client filtering, image CDN |
| Poor mobile | Desktop template shrunk down | Design for the phone first; thumb-reach filters; sticky call/text/price bar |
| Clunky forms | Ten fields for a price request | Two fields to start (name plus phone or email), progressive profiling, one question per card |
| Ugly or inconsistent visuals | Stock templates, pop-ups, vendor widgets mixed together | One design system, cinematic staging, brand tokens, no widget soup |
| Pop-up and chat overload | Every vendor injects its own | One unified contact layer that we control |
| Bad photos or missing photos | Feed quality | Image QA flags, placeholder rules, background cleanup (later) |
| Hidden pricing / bait | Legal and trust damage | Transparent price breakdown with disclosures |
| Dead links, stale inventory | Feed lag | Frequent sync, sold-state handling, "just sold" redirect to similar |
| Slow lead response | Leads land in an email inbox | Instant auto-reply, routing, SLA alerts |
| Broken service booking | Third-party scheduler iframe | Native scheduler with the dealer's capacity rules |
| No service prices, hidden phone number, "it depends" quotes (Wes's Chevrolet experience) | Dealers avoid publishing prices; site buries service contact info | Vehicle-based price estimator, published menu pricing, not-to-exceed policy, click-to-call on every service page |
| No accessibility | Overlays and widgets | Real WCAG compliance |
| Everyone looks identical | Same vendor templates across dealers | Distinct theming per dealer on a shared engine |

### 3.1 "Before" reference: Chevrolet of Wayzata (mobile, screenshots from Wes, Oct 30 2026)

Four phone screenshots of chevroletofwayzata.com (a major brand in a wealthy suburb). Screenshots are kept out of the repo; this is the written record.

| Where | What the screenshots show | Our "after" |
|---|---|---|
| Home hero | Gradient green/blue headline, yellow and red type, black countdown box reading "1 Days 18 Hours 04 Minutes", over a dim photo. The accessibility widget button sits on top of the headline. The countdown looks like a perpetual urgency device (unverified). | One calm, lit hero with a single message and a single action. Real, dated offers with real expiry and fine print only. Accessibility built into the page, not a floating button on the headline. |
| Overlays | "Get Live Help with a Specialist" bubble covers the inventory card; a cookie icon floats bottom left. Both sit over content on first load. | One contact layer we control, docked to a bottom bar that never covers a card. Cookie notice is a one-time compact sheet. |
| Inventory | Search box, then a chip row that is cut off at the edge ("Au..."), then a "Filter / Sort 1" button. First card shows a gray dealer-logo placeholder instead of the vehicle. | Instant search, wrapping or swipeable chips with a clear scroll cue, active filters shown as removable tags, real photo or a purpose-built "photos coming" state that still shows specs and price. |
| Navigation | Hamburger menu, Service & Parts expanded: "GM Accessories" appears twice, plus "Chevrolet Accessories"; Service and Parts lumped together; no prices anywhere. | Task-based menu ("Get a service price", "Book service", "Order parts", "Accessories"), no duplicate links, prices on the first screen of each service. |
| Oil change page | Two stock photos and generic copy ("Certified Service experts..."), one "Schedule Service" button. No price, no vehicle selector, no phone number or hours on the page (only an unlabeled phone icon in the header). The same promo banner repeats above the content. | Vehicle picker (or VIN/plate), exact price or capped price, "Call the service desk" with number and hours, "Book" in the same view. Promos appear only where relevant. |

Design principles drawn from this:
1. **Answer the visitor's question on the first screen.** Price, availability, or a next step, never marketing copy first.
2. **Nothing covers content.** Widgets, chat, cookie and accessibility controls dock to reserved space.
3. **One voice.** A single type scale and a restrained palette with solid, high-contrast text. No gradient text, no red-on-black, no stacked emphasis colors.
4. **Honest urgency.** Countdowns only for real deadlines; otherwise state the offer and its terms.
5. **Every menu item earns its place.** No duplicates; label by what the customer wants to do.
6. **Real imagery or a designed fallback.** Never a vendor placeholder on a vehicle card.
7. **Contact is one tap away on every service page,** with the number and hours visible in text.
8. **Do not repeat global banners on every page.** Promos are contextual and dismissible.

Competitive landscape to study (names as category examples, to be researched): the big dealer-website vendors (Dealer.com/Cox, DealerOn, Dealer Inspire, Fusion Zone, DealerSocket sites), digital retailing tools (Roadster, Carvana-style flows, Gubagoo), and DIY site builders. Our edge: design quality, speed, an all-in-one department coverage, and personal attention to detail from a single accountable builder.

Action for Wes: collect the bad app's name, screenshots, and a list of its three worst moments. We turn those into a "before / after" slide for sales.

---

## 4. Business model

### 4.1 Who to sell to first

- **Independent used-car dealers** and **small groups**: fast decisions, no OEM approval, owner is the buyer. Best first targets and likely the best margin.
- **Franchise dealers**: bigger budgets but OEM-approved vendor rules and long contracts with their current provider. Target the ones whose current site is clearly weak and pitch as a **service/parts/specials microsite** or a **"digital showroom" add-on** first, then expand.
- **Service-only, parts-only, collision, powersports, RV, marine** niches: less crowded, easy wedge.

### 4.2 Pricing model (indicative; validate with 5 to 10 dealer conversations)

| Package | Setup fee | Monthly | What it includes |
|---|---|---|---|
| Starter (independent lot) | $1,500 to $3,000 | $399 to $699 | Branded site, inventory feed, leads, test drive, trade-in, basic admin, hosting |
| Pro (full-service) | $3,500 to $7,500 | $899 to $1,799 | Starter plus service scheduler, parts/accessories, specials engine, finance pre-qual, review automation, analytics |
| Group / Franchise | $8,000 to $25,000+ | $2,000 to $6,000 per group plus $400 to $800 per extra rooftop | Multi-location, advanced integrations, SLA, dedicated support |

For context: established dealer-website vendors typically charge franchise dealers on the order of $1,500 to $4,000+ per month and bundle marketing. We can undercut on price while beating on quality, or hold price and win on design and results. Confirm with real quotes from dealers.

**Add-ons (recurring or one-off):**
- Text/chat inbox with AI assist: $199 to $499 per month
- Reputation management: $149 to $349 per month
- Ad feeds / Google Vehicle Ads setup: $250 to $750 setup, $100 to $300 per month
- Extra locations: $250 to $600 per month each
- Local SEO and content: $500 to $2,000 per month
- Custom integrations (DMS/CRM): $1,500 to $10,000 one-time
- Custom features / design work: $125 to $200 per hour or fixed scope
- Photo / video / 360 production partnerships: referral margin
- Migration from the old site (redirects, SEO preservation): $500 to $2,500

**Why this stays flexible:** pricing sits on modules and per-location counts, not on bespoke builds. Because every dealer runs the same engine with different config, adding a module is a flag, so any package can be bundled, discounted, or upsold without engineering cost.

### 4.3 Margin view (rough)

- Hosting and infrastructure per dealer: roughly $30 to $150 per month at small scale (Vercel, database, search, image CDN, email/SMS usage passed through).
- Third-party costs: SMS, credit-app vendor, review APIs, mostly pass-through or marked up 20 to 40 percent.
- Support time is the real cost. At 20 to 30 dealers, a single operator can manage with good admin tooling and templates.
- Target: 75 to 85 percent gross margin on subscription revenue, 50 to 70 percent on setup/custom work.
- Example: 20 dealers at an average of $1,000 per month is $20,000 monthly recurring revenue, with roughly $4,000 to $6,000 in costs.

### 4.4 Sales approach and the live demo

1. **Lead with the pain**: "Your site's vehicle search takes X seconds on a phone; here is the same shopper on ours." Use real before/after on their own inventory.
2. **Personalized demo in 24 hours**: because the app is config-driven, load the prospect's logo, colors, and a snapshot of their inventory into a private demo URL (`theirname.demo.yourdomain.com`). This is the closer. They see their own cars in a site that looks like theirs.
3. **Show the admin**: dealers buy control. A five-minute edit of a special, a hero banner, and a price shows it is simple.
4. **Pilot offer**: 30-day paid pilot or low setup fee with a 6 to 12 month term; annual prepay discount.
5. **Proof**: speed scores, lead conversion improvements, case studies from the first two customers (offer a founding-customer discount in exchange for a testimonial).
6. **Channels**: direct outreach to GMs, used car managers, local dealer associations, service director referral, agencies and marketing consultants who white-label us.
7. **Contract**: month-to-month after the initial term, clear data ownership and export, honest SLA.

### 4.5 White-label and agency models
- **Reseller**: agency pays wholesale ($300 to $600 per dealer per month), sells at retail.
- **Revenue share**: 20 to 30 percent to partner referrals.
- Keep the partner console in Phase 3, but price the plan now so we do not paint ourselves into a corner.

---

## 5. Architecture recommendation

**Principle:** one codebase, one deployment per environment, many dealers by configuration. No per-dealer forks.

### 5.1 Stack
- **Next.js (App Router) on Vercel**, TypeScript, server components for speed, edge middleware for tenant resolution by hostname.
- **Postgres (Supabase)** with row-level security keyed by `tenant_id`. Supabase auth for staff and customers, storage for images and documents.
- **Search**: start with Postgres full text plus indexes; move to Typesense or Algolia when inventory per tenant grows.
- **Images**: Vercel image optimization or Cloudinary/imgix.
- **Queues/cron**: inventory feed imports, reminders, alerts.
- **Payments**: Stripe (parts, deposits, our own subscription billing).
- **Messaging**: Twilio for SMS/voice, Resend/Postmark for email.
- **Observability**: Sentry, analytics (PostHog), uptime checks.

### 5.2 Multi-tenancy
- Single multi-tenant app. Tenant resolved by domain. Each dealer gets a custom domain plus a demo subdomain.
- Tenant record holds: branding tokens, locations, departments enabled, modules enabled, copy, legal text, integration credentials (encrypted).
- Strong data isolation via RLS, with tests that prove one tenant cannot see another.
- A dedicated database for a large enterprise customer is possible later if required, without changing the app.

### 5.3 Theming layer
- Design tokens: palette, type scale, radius, motion intensity, hero style, image treatment. All driven from the tenant config and a small set of "scene" presets (e.g., dark showroom, daylight, luxury, rugged truck country).
- Components never hard-code color. Contrast checks run automatically at config save so a dealer cannot pick an unreadable palette.
- Layout variants chosen from a library, not freeform, to keep QA cheap.

### 5.4 Content and admin
- Built-in admin (role-based): inventory overrides, specials, banners, pages, staff, hours, service menu, parts markups, leads, appointments, users.
- Content stored structured, so SEO and layout stay consistent.
- Onboarding wizard: upload logo, pick scene, enter locations and hours, connect inventory feed, toggle departments. Goal: a new dealer live in under a day.
- A "demo cloner" to spin a prospect demo from a template tenant.

### 5.5 Integrations (adapter pattern)
- Inventory in: CSV/FTP/XML/JSON feed adapters normalized into one vehicle schema.
- Leads out: ADF/XML email, then CRM-specific adapters.
- Service: start with our own scheduler; adapters for DMS scheduling APIs later.
- Each adapter is a module, versioned, with logs and replay, so support is cheap.

### 5.6 Pricing flexibility from architecture
- Modules map 1:1 to billable SKUs (feature flags per tenant).
- Usage metering (SMS, locations, vehicles, leads) allows tiered or per-use pricing.
- Billing lives in Stripe, tied to tenant plan, so you can change pricing, run promotions, or give custom deals without code changes.
- Cost per tenant is low and predictable, so margin stays healthy even with discounting.

### 5.7 Quality and cost-of-maintenance
- Single design system, component tests, visual regression, Lighthouse CI budgets, accessibility tests in CI.
- Preview deployments per branch on Vercel; one production deploy updates every dealer at once.
- Feature flags for staged rollouts.

---

## 6. Design direction for the build (applies to UI phases)

Cinematic and trailer-like: dramatic lit backdrops with depth, restrained rich palette, meaningful motion, one-card-at-a-time interactive flows (trade-in, finance, service booking) with a live visual that changes as the person answers. Progress is a tangible object (for example, a car that builds as choices are made), not a bar. Support keyboard, swipe, large touch targets. No monospace fonts, no gray or transparent text, high-contrast solid colors only. Legal pages, footer, and copyright must ship with every deploy.

---

## 7. Open questions for Wes

1. **Target first:** independents, franchise stores, or service/parts-only? This changes phase 1 priorities and the pitch.
2. **Brand story:** shall the demo be a fictional multi-brand group (recommended) or modeled on a real local dealer type (new plus used, one franchise)? Which makes you a better demo?
3. **The bad app:** captured in sections 1.0 and 3.1 (Chevrolet of Wayzata). Do you want screenshots of the desktop version and a timed speed test added to complete the before/after, and are you comfortable showing it by name in sales demos, or should we anonymize it?
3b. **Service pricing data:** do you want the demo to use realistic oil capacities and prices per engine (we can build a sample table), and will dealers be willing to publish prices and a not-to-exceed policy?
4. **Your selling style:** do you want recurring SaaS only, or also hands-on services (photography, SEO, marketing)? Affects pricing and capacity.
5. **Price positioning:** premium (design-led, higher price) or disruptive (cheaper than incumbents)? 
6. **Integrations promised at launch:** which DMS/CRM do the dealers in your area use? Any you must support to win the first deal?
7. **Credit applications:** are you comfortable using a third-party vendor for the credit app, to avoid handling SSNs?
8. **Support capacity:** how many dealers can you support alone, and do you want a partner or contractor for onboarding?
9. **Legal/regulatory:** do you want a lawyer review of the dealer-facing contract and advertising disclosures for Minnesota before the first sale?
10. **Domain and branding:** what is the product name and demo domain? NX45 LLC is the legal entity; what is the product brand?
11. **Languages and regions:** Spanish at launch? Which state(s) for tax/fee calculators?
12. **Real data in the demo:** can we use stock/generated photos, or will you arrange access to a friendly dealer's inventory?
13. **Timeline:** when do you want the demo in front of the first dealer?
