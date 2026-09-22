# 🌍 Make Your Own Voyage (MYOV) — Backend API Documentation

A modern, high-performance, production-ready Node.js REST API engineered for **Make Your Own Voyage**, an experiential travel, tour package, luxury hotel, flight, transport rental, curated seasonal collection, and custom itinerary planning platform.

---

## 📋 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
- [Access Control & Security Principles](#-access-control--security-principles)
- [Tech Stack](#-tech-stack)
- [Production Hardening & Reliability](#-production-hardening--reliability)
- [Directory Structure](#-directory-structure)
- [Environment Variables & Setup](#-environment-variables--setup)
- [API Endpoints Reference](#-api-endpoints-reference)
  - [1. Health & Status](#1-health--status-apihealth)
  - [2. Universal Category Enquiries & Lead CRM](#2-universal-category-enquiries--lead-crm-apienquiries)
  - [3. Curated Collections & Seasonal Homepage Feed](#3-curated-collections--seasonal-homepage-feed-apicollections)
  - [4. SEO Engine, Dynamic Sitemaps & IndexNow](#4-seo-engine-dynamic-sitemaps--indexnow-seo)
  - [5. Global Multi-Category Search](#5-global-multi-category-search-apisearch)
  - [6. Cloudinary Media & File Uploads](#6-cloudinary-media--file-uploads-apiupload)
  - [7. Authentication & User Management](#7-authentication--user-management-apiauth)
  - [8. Hotels (Public & Admin)](#8-hotels-apihotels--apihotel--apiadminhotels)
  - [9. Transports & Vehicle Rentals](#9-transports--vehicle-rentals-apitransports--apiadmintransports)
  - [10. Tour Packages](#10-tour-packages-apipackages)
  - [11. Destinations & State Explore](#11-destinations--state-explore-apidestinations--apistates)
  - [12. Frequently Asked Questions (FAQ)](#12-frequently-asked-questions-faq-apifaqs--apifaq)
  - [13. Activities Master & Itinerary Templates](#13-activities-master--itinerary-templates)
- [Automated Email Engine](#-automated-email-engine)
- [Database Compound Indexing](#-database-compound-indexing)
- [Running & Deployment](#-running--deployment)

---

## 🚀 Overview & Architecture

The **Make Your Own Voyage** backend is structured around an **inquiry-first, content-rich model** rather than rigid online credit-card checkout. Travelers configure custom itineraries, explore hotels, flight quotes, vacation packages, weekend escapes, and vehicle rentals, then submit specialized enquiry forms.

### 🌟 Key Architectural Pillars:
1. **Zero Login Barriers for Customers**: Visitors and guests can freely browse, search, and submit travel inquiries without mandatory registration or login walls.
2. **Category-Isolated Inquiries**: Dedicated data models and payloads for **Hotels**, **Flights**, **Packages/Weekend Trips**, and **Cabs/Transports**.
3. **Auto-Calculated Pricing Breakdown**: Itemized price calculations (room nights, traveler slabs, rental durations) populated automatically on inquiry creation and itemized in customer/admin confirmation emails.
4. **Dynamic Curated Collections**: Auto-detects the current season (summer, monsoon, autumn, winter) or serves evergreen weekend getaways with dual desktop/mobile banners.
5. **Generative Engine Optimization (GEO) & Instant SEO**: Live dynamic XML sitemaps, Schema.org JSON-LD generation (`TouristTrip`, `LodgingBusiness`), AI crawler whitelists (`GPTBot`, `PerplexityBot`, `ClaudeBot`), and instant IndexNow search engine indexing.
6. **Global Unified Search Engine**: High-speed, regex-escaped, parallel multi-collection search across destinations, packages, hotels, transports, states, and activities with instant auto-suggestions.
7. **In-Memory Cloudinary Pipeline**: Zero disk-clutter buffer streaming upload via Multer memory storage, supporting direct admin form uploads, base64 strings, and a dedicated upload API.
8. **Comprehensive Admin CRM**: Behind `verifyAdmin` security, administrators can inspect leads, filter by category/status, send price quotes, and log timestamped internal notes.

---

## 🔐 Access Control & Security Principles

The backend enforces a clean two-tier access architecture:

| Route Tier | Authentication | Description |
| :--- | :--- | :--- |
| **Customer / Public Routes** | **None (Login-Free)** | Open to all visitors. Inquiry submissions, tracking via email/phone, catalog searches, suggestions, sitemaps, robots.txt, and public detail pages require **no JWT token or session**. |
| **Admin Routes** | **Strict `verifyAdmin`** | Guarded by JWT authentication requiring `role: "admin"`. Accepts tokens via HttpOnly Cookies or `Authorization: Bearer <token>` headers. |

---

## 🛠 Tech Stack

- **Runtime Environment**: Node.js (ES Modules: `"type": "module"`)
- **Web Framework**: Express.js (v5)
- **Database**: MongoDB with Mongoose (v9)
- **Media Hosting**: Cloudinary (v2) with direct memory buffer streaming
- **File Uploads**: Multer (in-memory storage with MIME validation)
- **Search Engine Indexing**: IndexNow API protocol (`https://api.indexnow.org/indexnow`)
- **Security & Headers**: Helmet (Cross-Origin Resource Policy configured)
- **Rate Limiting**: `express-rate-limit` (Tiered: General, Auth/Enquiry, Upload)
- **Performance**: `compression` (Gzip/Brotli) & `morgan` (HTTP logging)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **Validation**: Joi
- **Email Delivery**: Nodemailer (Branded luxury HTML templates with CID attachments)

---

## 🛡️ Production Hardening & Reliability

The backend is hardened for cloud deployments (AWS, Render, Railway, DigitalOcean, Docker):

1. **Reverse Proxy Trust**: `app.set("trust proxy", 1)` enabled for accurate client IP resolution and HTTPS detection behind reverse proxies.
2. **Cross-Origin Cookie Handling**: Cookies dynamically use `sameSite: "none"` and `secure: true` in production, eliminating cross-domain cookie blocks when frontend and backend are hosted on separate domains.
3. **Tiered Rate Limiting**:
   - **General API**: 500 requests / 15 minutes per IP.
   - **Auth & Enquiries**: 30 requests / 15 minutes per IP (blocks brute-force and lead spam bots).
   - **Media Uploads**: 50 uploads / 15 minutes per IP (prevents quota exhaustion).
4. **Centralized Error & 404 Handling**:
   - Transforms Mongoose `CastError` (bad ObjectId) into clean 404 responses.
   - Converts MongoDB code `11000` duplicate key clashes into informative 409 Conflict messages.
   - Normalizes JWT expiration and signature errors to clean 401 Unauthorized responses.
   - Automatically hides raw error stack traces when `NODE_ENV=production`.
5. **Process Lifecycle & Graceful Shutdown**:
   - Catches `unhandledRejection` and `uncaughtException` to log fatal errors safely.
   - Listens for `SIGTERM` and `SIGINT` signals to finish active HTTP requests and close MongoDB connections cleanly.
6. **Memory Safety**: Multer memory storage enforces a strict 10MB per-file and 20-file maximum ceiling, preventing Node.js process Out-Of-Memory (OOM) crashes.

---

## 📂 Directory Structure

```text
backend/
├── server.js                        # App entry point, crash guards & graceful shutdown
├── package.json                     # Dependencies & npm scripts
├── .env                             # Environment configuration (Keep secret!)
├── .gitignore                       # Production ignore rules
├── README.md                        # Complete backend documentation
└── src/
    ├── app.js                       # Express configuration, security, & route mounting
    ├── assets/
    │   └── logo.png                 # Local brand logo used in email templates
    ├── config/
    │   └── db.js                    # Production MongoDB connection pool & listeners
    ├── controllers/
    │   ├── activityMaster.controller.js
    │   ├── collection.controller.js # Homepage seasonal & weekend collections
    │   ├── destination.controller.js
    │   ├── enquiry.controller.js    # Universal enquiry engine & CRM logic
    │   ├── faq.controller.js        # FAQ management & category lookups
    │   ├── hotel.controller.js       # Admin hotel management & Cloudinary sync
    │   ├── hotel.public.controller.js # Public hotel catalog & filters
    │   ├── itineraryTemplate.controller.js
    │   ├── package.controller.js    # Tour package builder & slab pricing
    │   ├── search.controller.js     # Multi-category search & auto-suggestions
    │   ├── seo.controller.js        # Dynamic sitemaps, robots.txt, Schema JSON-LD, IndexNow
    │   ├── state.controller.js      # States & full exploration bundles
    │   ├── transport.admin.controller.js
    │   ├── transport.public.controller.js
    │   ├── upload.controller.js     # Cloudinary single/multiple uploads
    │   └── user.controller.js       # Authentication & profile management
    ├── middleware/
    │   ├── errorHandler.js          # Centralized Mongoose/JWT/Multer error handler
    │   ├── role.js                  # verifyAdmin RBAC middleware
    │   ├── security.js              # Helmet, Rate Limiters, Compression, Morgan
    │   ├── upload.js                # Multer memory storage & MIME filtering
    │   ├── user.js                  # isLoggedIn optional auth helper
    │   └── validate.js              # Joi request validation middleware
    ├── models/
    │   ├── activityMaster.model.js
    │   ├── collection.model.js      # Weekend & seasonal curated collections
    │   ├── destination.model.js
    │   ├── enquiry.model.js         # Polymorphic inquiry schema with compound indexes
    │   ├── faq.model.js             # Categorized FAQ schema
    │   ├── hotel.model.js           # Multi-room hotel schema with compound indexes
    │   ├── itineraryTemplate.model.js
    │   ├── package.model.js         # Tour package schema with pricing slabs
    │   ├── state.model.js
    │   ├── transport.model.js       # Cab/Bus/Bike/Traveller schema with virtuals
    │   └── user.model.js
    ├── routes/
    │   ├── activityMaster.routes.js
    │   ├── collection.routes.js
    │   ├── destination.routes.js
    │   ├── enquiry.routes.js
    │   ├── faq.routes.js
    │   ├── hotels.admin.routes.js
    │   ├── hotels.public.routes.js
    │   ├── itineraryTemplate.routes.js
    │   ├── package.routes.js
    │   ├── search.routes.js
    │   ├── seo.routes.js            # Sitemaps, robots, IndexNow routes
    │   ├── state.routes.js
    │   ├── transport.admin.routes.js
    │   ├── transport.public.routes.js
    │   ├── upload.routes.js
    │   └── user.routes.js
    ├── services/
    │   ├── cloudinary.service.js    # Cloudinary buffer stream, deletion, & parsing
    │   └── indexnow.service.js      # Instant search engine indexing service
    ├── utils/
    │   ├── emailTemplates.js        # Branded responsive HTML templates
    │   ├── generateHotelSlug.js     # Safe slug generator
    │   ├── sendEmail.js             # Nodemailer transporter & email dispatchers
    │   └── token.js                 # JWT generator & cross-origin cookieOptions
    └── validations/
        └── user.validation.js       # Joi schemas for auth validation
```

---

## ⚙️ Environment Variables & Setup

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development                # Switch to 'production' on live server
CLIENT_URL=http://localhost:3000   # Live frontend URL in production (e.g., https://makeyourownvoyage.com)

# Database
MONGODB_URI=mongodb://localhost:27017/MakeYourOwnVoyage
# For production Atlas: mongodb+srv://<user>:<password>@cluster0.mongodb.net/MakeYourOwnVoyage?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email SMTP (Gmail App Password or Transactional Provider)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_app_password

# Cloudinary Media Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SEO & IndexNow Protocol
INDEXNOW_KEY=f20cf068aabc4a5c87d6fd39b71f7bcf
SITE_HOST=makeyourownvoyage.com
```

---

## 📡 API Endpoints Reference

### 1. Health & Status (`/api/health`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System uptime, health status, and active environment |

---

### 2. Universal Category Enquiries & Lead CRM (`/api/enquiries` or `/api/enquiry`)

#### Customer Submission Endpoints (No Login Required)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/enquiries/hotel` | Submit customized hotel room inquiry (auto-calculates estimated total) |
| `POST` | `/api/enquiries/flight` | Submit one-way or round-trip flight booking inquiry |
| `POST` | `/api/enquiries/package` | Submit tour package inquiry (calculates slab / traveler total) |
| `POST` | `/api/enquiries/transport` | Submit vehicle rental inquiry (cab, bus, bike, traveller) |
| `POST` | `/api/enquiries/custom` | Submit generalized bespoke travel inquiry |
| `GET` | `/api/enquiries/track?contact=...` | Track submitted inquiries by customer phone or email |
| `GET` | `/api/enquiries/code/:enquiryCode` | Fetch full inquiry details by unique code (e.g. `ENQ-HTL-12345678`) |
| `GET` | `/api/enquiries/my-enquiries` | Authenticated user inquiry history (optional) |

#### Admin Lead CRM Endpoints (`verifyAdmin` Required)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/enquiries/admin/all` | Filter leads by `enquiryType`, `status`, search name/phone/code + pagination |
| `GET` | `/api/enquiries/admin/:id` | View detailed inquiry with populated item references |
| `PATCH` | `/api/enquiries/admin/:id` | Update lead status (`contacted`, `quoted`, `converted`), quoted price, & notes |
| `DELETE` | `/api/enquiries/admin/:id` | Delete spam or duplicate lead |

---

### 3. Curated Collections & Seasonal Homepage Feed (`/api/collections`)

#### Public Feed
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/collections/homepage-feed` | Fetches homepage collections. Auto-detects current season (or accepts `?season=summer`). Returns `weekendSection` (evergreen weekend breaks + direct packages) and `seasonalSection` (seasonal escapes with desktop/mobile banners). |

#### Admin Management (`verifyAdmin` Required)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/collections/admin/all` | Get all collections sorted by display order |
| `POST` | `/api/collections/admin/create` | Create new collection. Handles dual `desktopImage` and `mobileImage` file uploads via Cloudinary memory streaming. |
| `PUT` | `/api/collections/admin/:id` | Update collection details, banner images, and featured packages/destinations. |
| `DELETE` | `/api/collections/admin/:id` | Delete collection and automatically clean up banner images from Cloudinary. |

---

### 4. SEO Engine, Dynamic Sitemaps & IndexNow (`/` and `/api/seo`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/sitemap.xml` | Public | Real-time dynamic XML sitemap generated from database collections (States, Destinations, Packages, Hotels) and core static routes. Cached for 24 hours. |
| `GET` | `/robots.txt` | Public | Dynamic crawler directives with Whitelist for AI Crawlers (`GPTBot`, `PerplexityBot`, `Google-Extended`, `ClaudeBot`) for Generative Engine Optimization (GEO). |
| `GET` | `/:key.txt` or `/f20cf068aabc4a5c87d6fd39b71f7bcf.txt` | Public | IndexNow protocol verification key for Bing Webmaster Tools and search engines. |
| `GET` | `/api/seo/metadata/:type/:slug` | Public | Frontend SEO & Schema.org JSON-LD generation (`TouristTrip` for packages, `LodgingBusiness` for hotels) with canonical URLs and OpenGraph media. |
| `POST` | `/api/admin/seo/trigger-index` | `verifyAdmin` | One-click admin trigger that queries all live database URLs and pushes them to `api.indexnow.org` for instant search engine re-indexing. |

---

### 5. Global Multi-Category Search (`/api/search`)

High-speed, parallel query execution with ReDoS protection and capped result sets:

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/search?q=manali&type=all&limit=6` | Public | Search across destinations, packages, hotels, transports, states, & activities |
| `GET` | `/api/search/suggestions?q=manali` | Public | Lightweight instant autosuggestion pills for search bars |
| `GET` | `/api/search/trending` | Public | Top 8 featured destinations and packages |

**Supported `type` query parameters**: `all`, `destinations`, `packages`, `hotels`, `transports`, `states`, `activities`.

---

### 6. Cloudinary Media & File Uploads (`/api/upload`)

Direct buffer streaming to Cloudinary (in-memory storage with zero leftover files on server):

| Method | Endpoint | Access | Payload | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/upload/image` | `verifyAdmin` | `multipart/form-data` (`image` or `file`) | Upload a single image to Cloudinary |
| `POST` | `/api/upload/multiple` | `verifyAdmin` | `multipart/form-data` (`images`, max 20) | Upload multiple images in parallel |
| `DELETE` | `/api/upload` | `verifyAdmin` | JSON `{ public_id }` or `{ url }` | Delete an image from Cloudinary |

> **Dual Upload Support**: In addition to `/api/upload`, administrators can attach files (`multipart/form-data`) or pass Base64 data URIs directly inside Collections, Hotel, Package, Transport, Destination, and State create/update endpoints!

---

### 7. Authentication & User Management (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user; sends luxury welcome email |
| `POST` | `/api/auth/login` | Public | Login with email or phone + password; sets JWT cookie |
| `POST` | `/api/auth/logout` | Public | Clears authorization cookie |
| `GET` | `/api/auth/me` | Public | Fetch current authenticated profile (via cookie or Bearer token) |
| `GET` | `/api/auth/` or `/get-all` | `verifyAdmin` | List all registered users (admin only) |
| `GET` | `/api/auth/:id` | Public/Owner | Get user details by ID |
| `PUT` | `/api/auth/:id` | Public/Owner | Update name, phone, or password |

---

### 8. Hotels (`/api/hotels`, `/api/hotel`, & `/api/admin/hotels`)

#### Public Endpoints (`/api/hotels`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/hotels` | List active hotels with city, destination, price, star rating filters & pagination |
| `GET` | `/api/hotels/:id` | Get single hotel by MongoDB ID or slug |
| `GET` | `/api/hotels/destination/:destinationId` | Get all hotels for a specific destination |

#### Admin Endpoints (`/api/hotel` or `/api/admin/hotels` — `verifyAdmin` Required)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/hotel/create` | Create new hotel (supports multipart images & base64) |
| `GET` | `/api/hotel/get-all` | List all hotels with admin status filters and pagination |
| `GET` | `/api/hotel/:id` | Inspect hotel details by ID or slug |
| `PUT` | `/api/hotel/:id` | Update hotel details & upload additional photos |
| `DELETE` | `/api/hotel/:id` | Delete hotel |

---

### 9. Transports & Vehicle Rentals (`/api/transports` & `/api/admin/transports`)

Supports **Cabs** (Sedan, SUV, Luxury), **Buses** (Volvo Sleeper, Seater), **Bikes** (Cruiser, Scooter), and **Travellers** (12/17/26 Seater).

#### Public Endpoints (`/api/transports`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/transports` | Filter vehicles by category, city, service type, fuel, AC, with pagination |
| `GET` | `/api/transports/:id` | Get single vehicle details by ID or slug |
| `GET` | `/api/transports/category/:category` | Get vehicles by category (`Cab`, `Bus`, `Bike`, `Traveller`) |
| `GET` | `/api/transports/city/:city` | Get vehicles available in a specific city |

#### Admin Endpoints (`/api/admin/transports` — `verifyAdmin` Required)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/admin/transports/create` | Add new vehicle (auto-slug generation & Cloudinary upload) |
| `GET` | `/api/admin/transports/get-all` | List all vehicles with operational status filter |
| `GET` | `/api/admin/transports/:id` | Fetch vehicle by ID or slug |
| `PUT` | `/api/admin/transports/:id` | Update vehicle details and pricing |
| `DELETE` | `/api/admin/transports/:id` | Delete vehicle |

---

### 10. Tour Packages (`/api/packages`)

#### Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/packages` | List active packages with destination, packageType, duration filters |
| `GET` | `/api/packages/:slug` | Fetch complete day-by-day customized itinerary by slug |
| `GET` | `/api/packages/id/:id` | Fetch package by MongoDB ID |

#### Admin Endpoints (`verifyAdmin` Required)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/packages/create` | Build package (from template clone or custom day plan) with Cloudinary images |
| `PUT` | `/api/packages/:id` | Update package details, pricing slabs, or media |
| `DELETE` | `/api/packages/:id` | Delete package |

---

### 11. Destinations & State Explore (`/api/destinations` & `/api/states`)

#### Destinations (`/api/destinations`)
- `GET /api/destinations`: List published destinations with state & type filters.
- `GET /api/destinations/:slug`: Destination details, weather, best time to visit, and attractions.
- `GET /api/destinations/:destinationId/packages`: Tour packages tied to destination.
- `GET /api/destinations/:destinationId/hotels`: Hotels situated in destination.
- `GET /api/destinations/:destinationId/activities`: Activities tied to destination.
- `GET /api/destinations/:destinationId/faqs`: Destination FAQs.
- `POST /api/destinations`, `PUT /:id`, `DELETE /:id`: Admin management (`verifyAdmin`).

#### States (`/api/states`)
- `GET /api/states`: List published states.
- `GET /api/states/:slug`: Get state info.
- `GET /api/states/:slug/explore`: **All-in-one explorer bundle** returning state info, all destinations in state, top packages, hotels, and available transports in a single request.
- `POST /api/states`, `PUT /:id`, `DELETE /:id`: Admin management (`verifyAdmin`).

---

### 12. Frequently Asked Questions (FAQ) (`/api/faqs` or `/api/faq`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/faqs` | Public | Get all published global FAQs ordered by sequence |
| `GET` | `/api/faqs/destination/:destinationId` | Public | Get FAQs specific to a destination |
| `GET` | `/api/faqs/:id` | Public | Get single FAQ by ID |
| `POST` | `/api/faqs/create` | `verifyAdmin` | Create new FAQ (global or destination-specific) |
| `PUT` | `/api/faqs/:id` | `verifyAdmin` | Update question, answer, order, or publication status |
| `DELETE` | `/api/faqs/:id` | `verifyAdmin` | Delete FAQ |

---

### 13. Activities Master & Itinerary Templates

- **Activities Master (`/api/activities`)**:
  - `GET /api/activities`: List master activities.
  - `POST /api/activities/create` (`verifyAdmin`): Create activity with Cloudinary photo.
  - `PUT /:id`, `DELETE /:id` (`verifyAdmin`).
- **Itinerary Templates (`/api/itinerary-templates`)**:
  - Reusable day-by-day blueprints cloned by admins to generate tour packages rapidly.
  - `GET /api/itinerary-templates`: List templates.
  - `POST /api/itinerary-templates`: Create template.
  - `PUT /:id`, `DELETE /:id` (`verifyAdmin`).

---

## 📧 Automated Email Engine

The platform features an automated transactional email engine powered by Nodemailer:

1. **Brand Identity**: Emails embed the official company logo via inline MIME attachment (`cid:brand-logo`), ensuring high-trust rendering across Gmail, Apple Mail, and Outlook without external image blocking.
2. **Category Color Schemes**:
   - **Hotels**: Emerald Teal (`#0D9488`)
   - **Flights**: Sky Blue (`#0284C7`)
   - **Packages / Weekend Trips**: Royal Indigo (`#4F46E5`)
   - **Transports / Cabs**: Sunset Amber (`#D97706`)
3. **Itemized Pricing Breakdown**: Automatically computes and displays itemized cost breakdowns (nights × rooms, passenger slabs, rental duration) in confirmation emails sent to both customer and admin.
4. **Resilient Non-Blocking Dispatch**: All email promises are handled with `.catch()` wrappers, ensuring email provider timeouts never block or fail client HTTP requests.

---

## ⚡ Database Compound Indexing

To maintain lightning-fast query execution under heavy production load, compound indexes are active on all primary collections:

```javascript
// Curated Collections
collectionSchema.index({ collectionType: 1, seasonTag: 1, isActive: 1 });

// Hotels
hotelSchema.index({ "location.city": 1, status: 1 });
hotelSchema.index({ destination: 1, status: 1 });
hotelSchema.index({ starCategory: 1, status: 1 });
hotelSchema.index({ isFeatured: 1, status: 1 });

// Tour Packages
PackageSchema.index({ destination: 1, isActive: 1 });
PackageSchema.index({ packageType: 1, isActive: 1 });
PackageSchema.index({ isFeatured: 1, isActive: 1 });

// Transports
transportSchema.index({ category: 1, status: 1 });
transportSchema.index({ availableCities: 1, status: 1 });
transportSchema.index({ vehicleType: 1, status: 1 });

// Enquiries (CRM)
enquirySchema.index({ enquiryCode: 1 }, { unique: true });
enquirySchema.index({ customerEmail: 1, createdAt: -1 });
enquirySchema.index({ customerPhone: 1, createdAt: -1 });
enquirySchema.index({ enquiryType: 1, status: 1, createdAt: -1 });

// Destinations & FAQs
destinationSchema.index({ state: 1, isPublished: 1 });
faqSchema.index({ destination: 1, isPublished: 1, order: 1 });
```

---

## 🚀 Running & Deployment

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server with live reload:
   ```bash
   npm run dev
   ```

3. Production start:
   ```bash
   npm start
   ```

### Production Deployment Checklist

- [ ] Set `NODE_ENV=production` in environment variables.
- [ ] Connect production MongoDB Atlas URI with network access enabled (`0.0.0.0/0`).
- [ ] Set `CLIENT_URL` to your production frontend domain (e.g., `https://makeyourownvoyage.com`).
- [ ] Configure live Cloudinary credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).
- [ ] Configure live SMTP credentials (`EMAIL_USER`, `EMAIL_PASS`).
- [ ] Configure IndexNow verification key (`INDEXNOW_KEY`, `SITE_HOST`).
- [ ] Verify healthcheck endpoint responds: `GET /api/health`.
- [ ] Verify dynamic XML sitemap responds: `GET /sitemap.xml`.
- [ ] Verify crawler robots directives respond: `GET /robots.txt`.
- [ ] In frontend `next.config.ts`, ensure `res.cloudinary.com` is listed under `images.remotePatterns`.
