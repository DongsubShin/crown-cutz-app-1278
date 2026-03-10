# crown-cutz-app — Product Requirements Document

**Version:** 1.0
**Date:** October 26, 2023
**Status:** Final Draft for Client Review

---

## 0. Project Overview

### Product

**Name:** crown-cutz-app
**Type:** Web-based Management Platform & Client Booking App
**Deadline:** End of current month (Square transition deadline)
**Status:** Draft

### Description

Crown Cutz is a high-end barbershop based in Houston, TX, featuring a team of 8 professional barbers. The `crown-cutz-app` is a bespoke, all-in-one management solution designed to replace Square. It handles the entire lifecycle of a barbershop visit: from online booking and walk-in queue management to automated SMS marketing, loyalty rewards, and complex commission tracking for the staff.

### Goals

1. **Seamless Migration:** Replace Square without interrupting the booking flow for the 8-barber team.
2. **Maximize Throughput:** Use a hybrid booking/walk-in queue system to ensure chairs stay filled.
3. **Automated Retention:** Implement SMS marketing and loyalty programs to increase client lifetime value.
4. **Financial Transparency:** Automate commission calculations to reduce administrative overhead for the shop owner.

### Target Audience

| Audience | Description |
|----------|-------------|
| **Primary** | **Clients:** Residents of Houston looking for premium grooming services. |
| **Secondary** | **Barbers (8):** Professional staff managing their individual schedules and earnings. |
| **Tertiary** | **Shop Owner:** Administrator overseeing shop performance, marketing, and payroll. |

### User Types

| Type | DB Value | Description | Key Actions |
|------|----------|-------------|-------------|
| **Client** | `0` | Standard customer | Book appointments, join walk-in queue, track loyalty points. |
| **Barber** | `1` | Service provider | Manage personal calendar, view commission, check-in clients. |
| **Admin** | `99` | Shop Owner/Manager | Full system access, financial reports, SMS marketing, staff management. |

### User Status

| Status | DB Value | Behavior |
|--------|----------|----------|
| **Active** | `0` | Full access to booking and features. |
| **Suspended** | `1` | Cannot book; show: "Please contact the shop regarding your account status." |
| **Withdrawn** | `2` | Data anonymized after 30 days; account inactive. |

### MVP Scope

**Included:**
- Multi-barber booking engine (8 barber slots).
- Real-time digital walk-in queue.
- SMS notifications (reminders and "you're next" alerts).
- Client CRM with visit history and notes.
- Commission tracking (percentage-based).
- Integrated Stripe payments.

**Excluded (deferred):**
- Mobile App Store (iOS/Android) native versions (Web-app first).
- Inventory management for retail products.
- Multi-location support.

---

## 1. Terminology

### Core Concepts

| Term | Definition |
|------|------------|
| **crown-cutz-app** | The unified platform for booking, management, and payments. |
| **Service** | A specific grooming offering (e.g., Fade, Beard Trim, Hot Towel Shave). |
| **Walk-in Queue** | A digital list of clients physically present or "checking in" without a prior appointment. |
| **Commission** | The percentage of a service price allocated to the barber (e.g., 60/40 split). |
| **Loyalty Tier** | A status level based on visit frequency (e.g., Bronze, Silver, Gold). |

### User Roles

| Role | Description |
|------|-------------|
| **Guest** | Unauthenticated user browsing services and availability. |
| **Client** | Authenticated user with a profile, history, and saved payment methods. |
| **Barber** | Staff member with access to their specific schedule and earnings dashboard. |
| **Admin** | Owner with access to shop-wide analytics and marketing tools. |

### Status Values

| Enum | Values | Description |
|------|--------|-------------|
| **BookingStatus** | `PENDING`, `CONFIRMED`, `COMPLETED`, `NOSHOW`, `CANCELLED` | The lifecycle of a scheduled appointment. |
| **QueueStatus** | `WAITING`, `IN_CHAIR`, `FINISHED` | The status of a walk-in client. |
| **PaymentStatus** | `UNPAID`, `PARTIAL`, `PAID`, `REFUNDED` | The financial state of a transaction. |

### Technical Terms

| Term | Definition |
|------|------------|
| **Webhook** | Automated message sent from Stripe or Twilio to the app when an event occurs. |
| **Slug** | The unique URL identifier for a barber's profile (e.g., `/barber/john-doe`). |

---

## 2. System Modules

### Module 1 — Hybrid Booking & Queue Engine

Manages the complex intersection of scheduled appointments and physical walk-ins for 8 barbers.

#### Main Features

1. **Barber Selection** — Choose a specific barber or "First Available."
2. **Time-Slot Optimization** — Logic to prevent gaps smaller than 30 minutes.
3. **Wait-Time Estimation** — Real-time calculation for walk-ins based on current "in-chair" status.

#### Technical Flow

##### Walk-in Check-in Flow

1. User scans QR code at the shop or visits the "Join Queue" page.
2. App validates if the shop is within operating hours.
3. Backend checks current active sessions and calculates "Estimated Wait" (Average Service Time * People in Queue / Active Barbers).
4. On success:
   - Client added to `Queue` table with `WAITING` status.
   - SMS sent via Twilio: "You're on the list! Current wait: ~25 mins."
5. On failure:
   - Show: "Queue is currently full. Please try again in 30 minutes."

---

### Module 2 — Commission & Financials

Automates the calculation of barber earnings based on completed services and tips.

#### Main Features

1. **Split Logic** — Configurable percentage per barber (e.g., Senior vs. Junior).
2. **Tip Processing** — 100% of tips routed to the barber's balance.
3. **Payout Reporting** — Weekly summary for the Admin to execute transfers.

#### Technical Flow

1. Barber marks appointment as `COMPLETED`.
2. System triggers `calculateCommission` function.
3. Backend fetches `Service.price` and `Barber.commission_rate`.
4. On success:
   - Create `Transaction` record linking `BarberID`, `ClientID`, and `Amount`.
   - Update `Barber.pending_balance`.
5. On failure:
   - Log error to `AuditLog`; Admin notified of "Calculation Mismatch."

---

### Module 3 — SMS Marketing & Loyalty

Automated engagement tool to drive repeat business.

#### Main Features

1. **Automated Reminders** — Sent 24 hours and 1 hour before appointments.
2. **Loyalty Points** — 1 point per $1 spent; redeemable for free services.
3. **Blast Campaigns** — Admin can text all clients about "Flash Sales" or "Holiday Hours."

#### Technical Flow

1. Admin creates "Marketing Campaign" in dashboard.
2. Backend filters `Client` table based on "Last Visit > 30 days."
3. Twilio API called in batches of 50 to avoid carrier spam filters.
4. On success:
   - Campaign status set to `SENT`.
   - Track `ClickThroughRate` via shortened unique URLs.

---

## 3. User Application

### 3.1 Page Architecture

**Stack:** React, React Router, Tailwind CSS, Context API for state.

#### Route Groups

| Group | Access |
|-------|--------|
| Public | Anyone (Landing, Services, Booking) |
| Auth | Unauthenticated (Login, Signup) |
| Protected | Logged-in Clients & Barbers |

#### Page Map

**Public**
| Route | Page |
|-------|------|
| `/` | Home (Shop Info & CTA) |
| `/services` | Service Menu |
| `/book` | Booking Wizard (Select Barber -> Service -> Time) |
| `/queue` | Live Walk-in Waitlist |

**Auth**
| Route | Page |
|-------|------|
| `/login` | Login |
| `/register` | Client Signup |

**Protected (Client)**
| Route | Page |
|-------|------|
| `/profile` | My Appointments & Loyalty Points |
| `/profile/settings` | Notification Preferences |

**Protected (Barber)**
| Route | Page |
|-------|------|
| `/barber/dashboard` | Today's Schedule & Active Queue |
| `/barber/earnings` | Commission & Tip History |

---

### 3.2 Feature List by Page

#### `/` — Home
- Hero section with "Book Now" and "Join Queue" buttons.
- Gallery of recent cuts (Instagram integration).
- Shop hours and Houston location map.

#### `/book` — Booking Wizard
- Step 1: Select Barber (includes photos and bios of the 8 barbers).
- Step 2: Select Service (categorized: Haircuts, Shaves, Combos).
- Step 3: Calendar view with real-time availability.
- Step 4: Credit card "Hold" via Stripe (to prevent no-shows).

#### `/queue` — Live Walk-in Waitlist
- Public view of first names in line (e.g., "John D., Sarah M.").
- "Join Queue" form (Name, Phone, Service).
- Estimated wait time display.

#### `/barber/dashboard` — Barber View
- List of today's appointments in chronological order.
- "Check-in" button for walk-ins.
- "Complete Service" button which triggers the payment/commission flow.
- Toggle "Accepting Walk-ins" (On/Off).

---

## 4. Admin Dashboard

### 4.1 Page Architecture

**Access:** Admin role only.

| Route | Page |
|-------|------|
| `/admin` | Overview (Revenue, Bookings, Active Staff) |
| `/admin/barbers` | Staff Management (8 Barbers) |
| `/admin/clients` | CRM / Client List |
| `/admin/marketing` | SMS Campaign Builder |
| `/admin/finance` | Commission & Payout Reports |
| `/admin/settings` | Shop Config (Hours, Services) |

---

### 4.2 Feature List by Page

#### `/admin` — Overview
- Real-time "Shop Heatmap" (which hours are busiest).
- Total revenue (Daily/Weekly/Monthly).
- Staff performance leaderboard (Retention rate, average tip).

#### `/admin/barbers` — Staff Management
- Add/Edit barber profiles.
- Set individual commission rates (e.g., "Barber A" gets 70%, "Barber B" gets 60%).
- Manage individual schedules and time-off requests.

#### `/admin/clients` — CRM
- Searchable database of all Crown Cutz clients.
- View "No-show" history (flag problematic clients).
- Manual loyalty point adjustment.
- Notes section for specific hair preferences.

#### `/admin/marketing` — SMS Campaign Builder
- Filter clients by "Barber they usually see."
- Template library for SMS (Holiday, Birthday, Re-engagement).
- Budget tracker (Cost per SMS via Twilio).

#### `/admin/finance` — Payout Reports
- Exportable CSV for payroll.
- Breakdown of Service Revenue vs. Tips vs. Product Sales.
- Stripe payout status.

---

## 5. Tech Stack

### Architecture

The system uses a modern, scalable architecture to ensure low latency for real-time booking.

```
crown-cutz-app/
├── backend/    ← NestJS API (Node.js)
├── frontend/   ← React (Vite) Client App
└── database/   ← PostgreSQL with TypeORM
```

### Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Backend | NestJS | 10.x | Modular API architecture |
| Language | TypeScript | 5.x | Type safety across the stack |
| ORM | TypeORM | 0.3.x | Database mapping and migrations |
| Database | PostgreSQL | 15.x | Relational data for financial integrity |
| Frontend | React | 18.x | UI library |
| Routing | React Router | 6.x | Client-side navigation |
| State | Context API | — | Lightweight state management |
| CSS | Tailwind CSS | 3.x | Utility-first styling |
| Build | Vite | 4.x | Fast frontend bundling |

### Third-Party Integrations

| Service | Purpose |
|---------|---------|
| **Stripe** | Payment processing and card-on-file for no-show protection. |
| **Twilio** | SMS gateway for reminders, queue alerts, and marketing. |
| **Cloudinary** | Hosting barber profile photos and gallery images. |
| **Google Maps API** | Location services and distance calculation for clients. |

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| **PostgreSQL** | Essential for financial transactions and commission tracking where ACID compliance is required. |
| **NestJS** | Provides a structured framework that makes it easy to scale from 8 barbers to multiple locations if needed. |
| **SMS over Email** | Barbershop clients respond 4x faster to SMS; critical for walk-in queue management. |

---

## 6. Open Questions

| # | Question | Context / Impact | Owner | Status |
|:-:|----------|-----------------|-------|--------|
| 1 | **Square Data Export?** | Can we get a full CSV of client history and loyalty points from Square before the cutoff? | Client | ⏳ Open |
| 2 | **No-Show Fee?** | What is the exact dollar amount or percentage to charge for a no-show? | Client | ⏳ Open |
| 3 | **Hardware?** | Will there be a physical tablet/kiosk at the front for walk-ins, or only QR codes? | Client | ⏳ Open |
| 4 | **SMS Budget?** | Is there a monthly cap on marketing SMS spend? | Client | ⏳ Open |