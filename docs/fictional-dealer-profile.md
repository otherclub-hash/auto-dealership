# Fictional Dealer Group: Lakeshore Auto Family

Version 2, shaped by Wes's choices in the thread. Purpose: stand in the dealer's shoes. This is the demo tenant, and also a model of the business we sell to, so every feature can be judged by what it does to this group's numbers.

Everything here is fictional. Figures are planning assumptions for a mid-size suburban group, to be replaced by real dealer data. Brand and model names must be trademark-screened before public use. Market evidence is in `evidence.md`.

## Decisions made so far (Wes)

- Multi-brand dealer group, **4 brands, 5 locations**
- Brand mix: mainstream, truck, luxury, EV
- Group personality: **family-owned, premium Midwest**
- Headline problems: **(A) service is leaking customers** and **(B) leads are slow and wasted**
- Supporting threads: vendor-stack consolidation, reputation
- Group name: **Lakeshore Auto Family**

Still to confirm with Wes: the four brand names below (proposed), the five locations, and the group's story.

---

## 1. The group

**Lakeshore Auto Family** is a third-generation, family-owned group on the lake-country west side of a Minnesota metro area. Tagline idea: "Three generations. One promise: a straight answer." The straight-answer promise is the product story: published service prices, firm quotes, fast replies.

### 1.1 Locations (5)

| # | Location | Brand / purpose | Notes |
|---|---|---|---|
| 1 | Lakeshore Westwind of Birchwood Bay | Mainstream new and used, full service and parts | Flagship, largest fixed ops |
| 2 | Lakeshore Woods-Aaron of Cedar Point | Trucks and SUVs, new and used, service and parts | Trailering, fleet and work-truck customers |
| 3 | Lakeshore Interbachen-Antverp of Pinecrest | Luxury, new and certified, concierge service | Higher expectations, pickup and delivery |
| 4 | Lakeshore Radium Studio of Harbor Mills | EV-only brand, low-pressure studio, appointment service | Charging, EV incentives, different service needs |
| 5 | Lakeshore Pre-Owned and Certified, Route 9 Commons | Multi-brand used, no new cars | Shared used inventory, trade-in intake |

### 1.2 The four fictional brands (proposed)

| Brand | Segment | Models (all fictional) | Why it is in the demo |
|---|---|---|---|
| Westwind | Mainstream | Aurelia sedan, Tamarack compact crossover, Boundary 3-row SUV, Voyageur minivan | Volume, family shoppers, incentives |
| Woods-Aaron Motor Co (WAMCO) | Truck and SUV | Ridgeback pickup (2.7L turbo I4, 3.6L V6, 5.3L V8, 3.3L diesel), Summit SUV | **Oil-change flagship**: engine sets oil quantity |
| Interbachen-Antverp (IA) | Luxury | V4 sedan, V6 SUV, V8 coupe | Premium service, CPO, concierge |
| Radium | Electric only | Radium One crossover, Radium Two sedan | EV incentives, charging accessories, service without oil changes |

Manufacturer realities to mimic: incentives by ZIP and model year, certified pre-owned programs, factory accessory catalogs, scheduled-maintenance guides, recall and campaign feeds, brand image standards.

---

## 2. Group size and shape (assumptions)

| Item | Assumption |
|---|---|
| Employees | About 260 |
| New vehicles sold per month (group) | About 240 |
| Used vehicles sold per month (retail, all locations) | About 190 |
| New inventory on the ground | About 600 units |
| Used inventory | About 320 units, shared across locations |
| Service | 4 service departments, about 200 repair orders (ROs) per day group-wide |
| Average customer-pay RO | About $380 |
| Parts | Retail counters, wholesale to local shops and body shops, accessories |
| Hours | Sales Mon to Sat; service Mon to Fri 7 to 6, Sat 8 to 3; Radium Studio by appointment |

### 2.1 Where the money comes from (illustrative monthly gross profit, group)

| Profit center | Illustrative monthly gross |
|---|---|
| New vehicles | $540,000 |
| Used vehicles | $480,000 |
| F&I | $330,000 |
| Service | $880,000 |
| Parts and accessories | $370,000 |
| **Total** | **About $2.6 million** |

Fixed operations (service plus parts) is roughly 48% of this, consistent with NADA-based figures cited in `evidence.md`.

### 2.2 Current vendor stack (assumptions)

| Vendor type | Monthly cost (group) |
|---|---|
| Websites (five, from two vendors) | $7,500 |
| CRM and desking | $4,000 |
| Live chat and text | $1,800 |
| Merchandising and photo tools | $2,200 |
| Reputation management | $1,200 |
| Service scheduler | $1,800 |
| SEO, ads, and agency | $15,000 |
| **Total** | **About $33,500** |

Pricing hook: replace or consolidate three to five of these at the same spend or less, and prove the result with one dashboard.

---

## 3. Headline problem A: service is leaking customers

Evidence (see `evidence.md`): fixed ops is about half of gross profit; Cox's 2025 study says dealers lost about 12% of service visits since 2018 and capture about 29% of them.

What this group lives with:
- About 200 ROs per day, phone-heavy. Advisors spend a large part of the day answering "how much for X" calls.
- Callers who get a range or "it depends" often do not book (Wes's own experience).
- Declined brakes, tires, and filters are rarely followed up.
- Retention falls after the warranty period; owners drift to independent shops.
- Interbachen-Antverp and Radium owners expect convenience (pickup, text updates); Westwind and Woods-Aaron owners expect fair, clear prices.

What we build for it:
- Vehicle-based **service price estimator** with firm quotes and a not-to-exceed policy.
- Online booking with capacity rules per location, loaner and shuttle options.
- Text-to-approve estimates with photos and video.
- Reminders by mileage and date, declined-work follow-up, loyalty rewards.

### 3.1 Firm-price example: oil change on the Woods-Aaron Ridgeback

Formula: labor + (quarts x price per quart) + filter + shop and disposal fee.

| Engine | Oil spec | Capacity (qt) | Labor | Oil ($9.50/qt) | Filter | Fees | **Firm price** |
|---|---|---|---|---|---|---|---|
| 2.7L turbo I4 | 0W-20 | 6.0 | $39.00 | $57.00 | $14.00 | $3.50 | **$113.50** |
| 3.6L V6 | 0W-20 | 6.5 | $39.00 | $61.75 | $14.00 | $3.50 | **$118.25** |
| 5.3L V8 | 0W-20 | 8.0 | $39.00 | $76.00 | $16.00 | $3.50 | **$134.50** |
| 3.3L diesel | 5W-40 | 7.5 | $49.00 | $93.75 | $29.00 | $3.50 | **$175.25** |

Policy line: "Your price is $134.50. You will never pay more than $138.75 without us texting you first." All numbers fictional.

Radium (EV) service menu has no oil change; it shows tire rotation, cabin filter, brake fluid, battery health check, and software updates, to prove the menu is data-driven.

---

## 4. Headline problem B: leads are slow and wasted

Evidence: a 2024 shop of 4,000+ franchise stores found a median 47-minute response to internet leads; an older study found only 16% replied within 15 minutes and 18% never replied.

Group funnel today (assumptions, per month):

| Step | Count | Rate |
|---|---|---|
| Web, phone, and third-party leads | 1,300 | |
| Contacted within 5 minutes | 260 | 20% |
| Appointments set | 325 | 25% |
| Appointments that show | 179 | 55% |
| Sales from these leads | 72 | 40% of shows |

Target after our platform: 5-minute response to 70%, appointments to 32%, show rate to 65%. That is roughly 72 to about 110 sales per month. At about $2,300 combined gross per unit, on the order of $85,000 extra monthly gross profit. These are assumptions to validate, but they show the pitch.

What we build for it: instant auto-reply and text, round-robin routing across stores, SLA timers and escalation, after-hours handling, appointment confirmations and reminders, one inbox for web, chat, text, and calls, and the manager dashboard that shows all of it.

---

## 5. Supporting threads

- **Vendor consolidation:** see 2.2.
- **Reputation:** review requests after sale and service, shown on every store page, response tooling.
- **Used inventory:** shared across the five locations, trade-in and "sell us your car" intake. In the demo as a feature, not the headline (evidence is weaker).
- **Parts and accessories:** retail e-commerce with fitment, wholesale portal, bundles. Minnesota seasonality: remote start, block heaters, winter tires, battery tests, all-weather mats, roof racks and hitches for lake season.

---

## 6. Real-world conditions the demo must respect

- Inventory changes daily: sold, on hold, in transit, arriving soon.
- Prices show MSRP, dealer discount, incentives with eligibility, and a transparent fee line. State doc-fee and tax rules need verification before real use.
- Incentives vary by ZIP, credit tier, and expire monthly.
- Used cars need history report links and inspection details.
- Credit applications are regulated; the demo uses a mock vendor and stores no SSN.
- Text and email require consent, logged.
- Phone and walk-in traffic persists; click-to-call must feed the same inbox.
- Staff turnover is high; the admin must be simple for a new hire in a day.
- Shoppers browse evenings and weekends; the demo needs an after-hours answer.
- Group-level reporting and store-level reporting both matter.

---

## 7. Day in the life: scenarios to script in the demo

1. **Sunday 9 p.m.:** a shopper searches for a 3-row Westwind Boundary under $55,000. An instant text confirms; Monday 8 a.m. the BDC sees what they viewed.
2. **Service price:** an Woods-Aaron Ridgeback owner picks the V8 and sees $134.50, books Saturday, gets a reminder. The service director sees a filled bay.
3. **Declined brakes:** an owner who declined brakes last month gets a text with a price and a booking link.
4. **Trade-in:** a Tamarack owner enters a plate, answers five condition cards, and books an inspection at the pre-owned lot.
5. **Luxury concierge:** a Interbachen-Antverp owner books pickup and delivery.
6. **EV:** a Radium shopper compares incentives and home-charger accessories.
7. **Parts:** a local shop logs in, finds fitment by VIN, and reorders a brake kit.
8. **Manager view:** Monday dashboard by store and for the group: leads, response time, appointments, shows, service bookings, aged inventory, revenue attributed to the site.
9. **A new dealer in a day:** the same app loads as a different fictional dealer with new colors and inventory, to prove the template.

---

## 8. How this feeds the build

- Demo tenant data: four brands, about 600 new and 320 used vehicles across five locations, service menus with capacity tables, 300 to 500 parts, accessories and bundles, specials, staff, reviews.
- Dashboard metrics use the funnels in sections 3 and 4 as the starting point so the before and after is believable.
- Pricing conversations use sections 2.1 and 2.2.
- Everything is tenant config and seed data, never hard-coded, so a real dealer replaces this with a config change.
