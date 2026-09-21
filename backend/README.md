# 🌍 Make Your Own Voyage (MYOV) — Backend API Documentation

A modern, robust Node.js REST API engineered for **Make Your Own Voyage**, a luxury travel, tour package, hotel, flight, and transport booking & enquiry platform.

---

## 📋 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
- [Access Control & Security Principles](#-access-control--security-principles)
- [Tech Stack](#-tech-stack)
- [Directory Structure](#-directory-structure)
- [Environment Variables & Setup](#-environment-variables--setup)
- [API Endpoints Reference](#-api-endpoints-reference)
  - [1. Universal Category Enquiries](#1-universal-category-enquiries-apienquiries)
  - [2. Authentication & Users](#2-authentication--users-apiauth)
  - [3. Hotels](#3-hotels-apihotels--apihotel)
  - [4. Transports & Cabs](#4-transports--cabs-apitransports--apiadmintransports)
  - [5. Tour Packages](#5-tour-packages-apipackages)
  - [6. Destinations](#6-destinations-apidestinations)
  - [7. Activities](#7-activities-apiactivities)
  - [8. Itinerary Templates](#8-itinerary-templates-apiitinerary-templates)
  - [9. States](#9-states-apistates)
- [Automated Email Engine](#-automated-email-engine)
- [Data Models Overview](#-data-models-overview)
- [Running & Testing](#-running--testing)

---

## 🚀 Overview & Architecture

The **Make Your Own Voyage** backend is structured around an **inquiry-driven model** rather than direct online credit-card checkout. Travelers configure custom itineraries, hotels, flights, packages, weekend trips, and cabs/transports, then submit specialized enquiry forms.

### 🌟 Key Pillars:
1. **Zero Login Barriers for Customers**: Visitors and guests can freely browse, configure, and submit inquiries without needing to create an account or log in.
2. **Category-Isolated Inquiries**: Distinct, tailored payloads for **Hotels**, **Flights**, **Packages/Weekend Trips**, and **Cabs/Transports**.
3. **Automated Luxury Branded Emails**: Customers receive immediate, high-touch HTML confirmation emails with category-specific color branding and an embedded company logo (`cid:brand-logo`).
4. **Comprehensive Admin CRM**: Behind `verifyAdmin` security, administrators can inspect leads, filter by category/status, send price quotes, and log notes.

---

## 🔐 Access Control & Security Principles

The backend divides endpoints into two distinct tiers:

| Route Type | Authentication | Description |
| :--- | :--- | :--- |
| **Customer / Public Routes** | **None (No login required)** | Open to all visitors. Inquiry submissions, inquiry tracking via email/phone, public catalog search, and profile lookups require **no JWT token or session**. |
| **Admin Routes** | **Strict `verifyAdmin`** | Restricted to users with `role: "admin"`. Requires a valid JWT token via Cookie or `Authorization: Bearer <token>` header. |

---

## 🛠 Tech Stack

- **Runtime**: Node.js (ES Modules: `"type": "module"`)
- **Web Framework**: Express.js (v5)
- **Database**: MongoDB via Mongoose (v9)
- **Authentication / Hashing**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **Validation**: Joi
- **Email Delivery**: Nodemailer (HTML templates with embedded CID attachments)
- **Security & Utilities**: CORS, Cookie-Parser, Dotenv

---

## 📂 Directory Structure

```text
backend/
├── server.js                        # App entry point & MongoDB connection listener
├── package.json                     # Dependencies & npm scripts
├── .env                             # Environment configuration
├── README.md                        # Complete backend documentation
└── src/
    ├── app.js                       # Express app configuration & route mounting
    ├── assets/
    │   └── logo.png                 # Local brand logo used in email templates
    ├── config/
    │   └── db.js                    # Mongoose MongoDB connection pool
    ├── controllers/
    │   ├── activityMaster.controller.js
    │   ├── destination.controller.js
    │   ├── enquiry.controller.js    # Universal enquiry submission & CRM handlers
    │   ├── hotel.controller.js       # Admin hotel management
    │   ├── hotel.public.controller.js # Public hotel search & detail
    │   ├── itineraryTemplate.controller.js
    │   ├── package.controller.js
    │   ├── state.controller.js
    │   ├── transport.admin.controller.js
    │   ├── transport.public.controller.js
    │   └── user.controller.js
    ├── middleware/
    │   ├── role.js                  # verifyAdmin middleware
    │   ├── user.js                  # isLoggedIn optional auth helper
    │   └── validate.js              # Joi request validation middleware
    ├── models/
    │   ├── activityMaster.model.js
    │   ├── destination.model.js
    │   ├── destination.js           # Re-export shim
    │   ├── enquiry.model.js         # Unified enquiry schema (Hotels, Flights, etc.)
    │   ├── faq.model.js
    │   ├── hotel.model.js
    │   ├── itineraryTemplate.model.js
    │   ├── package.model.js
    │   ├── state.model.js
    │   ├── state.js                 # Re-export shim
    │   ├── transport.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── activityMaster.routes.js
    │   ├── destination.routes.js
    │   ├── enquiry.routes.js        # Public submission + Admin CRM routes
    │   ├── hotels.admin.routes.js   # Admin hotel CRUD (verifyAdmin)
    │   ├── hotels.public.routes.js  # Public hotel discovery
    │   ├── itineraryTemplate.routes.js
    │   ├── package.routes.js
    │   ├── state.routes.js
    │   ├── transport.admin.routes.js# Admin transport CRUD (verifyAdmin)
    │   ├── transport.public.routes.js# Public transport search
    │   └── user.routes.js           # Auth & user management
    ├── utils/
    │   ├── emailTemplates.js        # Branded HTML email templates
    │   ├── generateHotelSlug.js     # Slug generator utility
    │   ├── sendEmail.js             # Nodemailer transporter & dispatch methods
    │   └── token.js                 # JWT generator & cookie configuration
    └── validations/
        └── user.validation.js       # Joi schemas for auth
```

---

## ⚙️ Environment Variables & Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/MakeYourOwnVoyage
JWT_SECRET=your_super_secret_jwt_key_2026
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
NODE_ENV=development

# SMTP Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_google_app_password
```

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run in development mode (with auto-reload)
npm run dev

# 3. Run in production mode
npm start
```

---

## 📡 API Endpoints Reference

Base URL: `http://localhost:5000`

---

### 1. Universal Category Enquiries (`/api/enquiries`)

The core lead-generation engine. All customer submissions are **login-free**.

#### 🏨 Hotel Enquiry
- **Method**: `POST`
- **Path**: `/api/enquiries/hotel`
- **Auth**: Public (No login required)
- **Request Body**:
```json
{
  "customerName": "Rahul Sharma",
  "email": "rahul.sharma@example.com",
  "phoneNumber": "+91 9876543210",
  "hotelDetails": {
    "hotelId": "65b4c123...",
    "hotelName": "Taj Lake Palace",
    "roomType": "Deluxe Lake View",
    "checkInDate": "2026-10-15",
    "checkOutDate": "2026-10-18",
    "numberOfRooms": 1,
    "adults": 2,
    "children": 1,
    "mealPlan": "Breakfast Included"
  },
  "budget": "₹35,000 - ₹50,000",
  "specialRequests": "High floor room preferred."
}
```
- **Response** `201 Created`:
```json
{
  "success": true,
  "message": "Hotel enquiry submitted successfully. A confirmation email has been sent.",
  "referenceCode": "ENQ-HTL-1726912345-AB12",
  "enquiry": { ... }
}
```

---

#### ✈️ Flight Enquiry
- **Method**: `POST`
- **Path**: `/api/enquiries/flight`
- **Auth**: Public (No login required)
- **Request Body**:
```json
{
  "customerName": "Ananya Roy",
  "email": "ananya.roy@example.com",
  "phoneNumber": "+91 9123456789",
  "flightDetails": {
    "tripType": "round-trip",
    "fromCity": "New Delhi (DEL)",
    "toCity": "Goa (GOI)",
    "departureDate": "2026-11-10",
    "returnDate": "2026-11-15",
    "travelClass": "Economy",
    "passengers": {
      "adults": 2,
      "children": 1,
      "infants": 0
    },
    "preferredAirline": "IndiGo"
  }
}
```
- **Response** `201 Created`: Generates reference code prefix `ENQ-FLT-...`.

---

#### 🎒 Tour Package & Weekend Trip Enquiry
- **Method**: `POST`
- **Path**: `/api/enquiries/package`
- **Auth**: Public (No login required)
- **Request Body**:
```json
{
  "customerName": "Suresh Raina",
  "email": "suresh@example.com",
  "phoneNumber": "+91 9988776655",
  "packageDetails": {
    "packageId": "65b4f890...",
    "packageTitle": "Mystical Ladakh 7D/6N Expedition",
    "destination": "Leh Ladakh",
    "isWeekendTrip": false,
    "departureDate": "2026-07-10",
    "duration": "7 Days / 6 Nights",
    "travelersCount": 4,
    "roomSharing": "Double Sharing",
    "corporateOrGroup": false
  },
  "budget": "₹1,50,000",
  "specialRequests": "Include oxygen cylinder during Nubra valley pass."
}
```
- **Response** `201 Created`: Generates reference code prefix `ENQ-PKG-...`.

---

#### 🚗 Transport & Cab Enquiry
- **Method**: `POST`
- **Path**: `/api/enquiries/transport`
- **Auth**: Public (No login required)
- **Request Body**:
```json
{
  "customerName": "Vikas Gupta",
  "email": "vikas@example.com",
  "phoneNumber": "+91 9811223344",
  "transportDetails": {
    "transportId": "65b4e777...",
    "vehicleCategory": "Cab",
    "vehicleModel": "Toyota Innova Crysta",
    "pickupLocation": "Delhi Airport Terminal 3",
    "dropLocation": "Agra Fort",
    "serviceType": "Outstation One-Way",
    "pickupDateTime": "2026-09-25T06:00:00Z",
    "passengers": 4,
    "luggageCount": 3
  }
}
```
- **Response** `201 Created`: Generates reference code prefix `ENQ-TRP-...`.

---

#### 🔍 Customer Lead Tracking
- **Method**: `GET`
- **Path**: `/api/enquiries/my-enquiries?email=customer@example.com` OR `?phone=+919876543210`
- **Auth**: Public (No login required)
- **Query Params**:
  - `email`: Lookup inquiries matching this email.
  - `phone`: Lookup inquiries matching this phone number.
- **Response** `200 OK`: Returns list of customer's inquiries with current statuses (`pending`, `contacted`, `quoted`, `converted`, `cancelled`).

---

#### 🛡️ Admin CRM Endpoints (Secured with `verifyAdmin`)
Requires Admin JWT token.

- **Get All Enquiries**:
  - `GET /api/enquiries/admin/all?enquiryType=hotel&status=pending&search=Taj&page=1&limit=10`
  - Filters: `enquiryType` (`hotel`, `flight`, `package`, `transport`), `status`, `search` (name, email, phone, reference code), pagination (`page`, `limit`).
- **Get Enquiry by ID**:
  - `GET /api/enquiries/admin/:id`
- **Update Lead Status & Quoted Price**:
  - `PATCH /api/enquiries/admin/:id`
  - **Body**:
    ```json
    {
      "status": "quoted",
      "quotedPrice": 48500,
      "adminNote": "Spoke to customer. Offered 10% seasonal discount for Taj Lake Palace."
    }
    ```
- **Delete Enquiry**:
  - `DELETE /api/enquiries/admin/:id`

---

### 2. Authentication & Users (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user. Triggers welcome email and issues JWT cookie. |
| `POST` | `/api/auth/login` | Public | Authenticate with email/phone & password. Issues JWT cookie. |
| `POST` | `/api/auth/logout` | Public | Clears authentication token cookie. |
| `GET` | `/api/auth/me` | Public / Optional | Returns user details via token cookie or query `?id=...`. |
| `GET` | `/api/auth/:id` | Public | Lookup user profile by MongoDB ObjectId. |
| `PUT` | `/api/auth/:id` | Public | Update user profile (name, phone, email, password). |
| `GET` | `/api/auth/` | **Admin Only** | List all platform users with search, role filter & pagination. |
| `GET` | `/api/auth/get-all`| **Admin Only** | Alias for admin user listing. |

---

### 3. Hotels (`/api/hotels` & `/api/hotel`)

#### Public Search & Detail (`/api/hotels`)
- `GET /api/hotels/search?destination=Goa&city=Calangute&starRating=5&minPrice=3000&maxPrice=15000`
- `GET /api/hotels/:slug` — Fetch complete hotel information by URL slug.

#### Admin Management (`/api/hotel` — Secured with `verifyAdmin`)
- `POST /api/hotel/` or `/create` — Create a new hotel (auto-calculates room tax and final price).
- `GET /api/hotel/` or `/get-all` — List all hotels for administration.
- `GET /api/hotel/:id` — Admin view of hotel by ID.
- `PUT /api/hotel/:id` — Update hotel details or room inventory.
- `DELETE /api/hotel/:id` — Soft-delete or remove hotel.

---

### 4. Transports & Cabs (`/api/transports` & `/api/admin/transports`)

#### Public Search (`/api/transports`)
- `GET /api/transports/search?category=Cab&city=Delhi` — Supports comma-separated city matches.
- `GET /api/transports/:slug` — Transport detail page by slug.

#### Admin Management (`/api/admin/transports` — Secured with `verifyAdmin`)
- `POST /api/admin/transports/` or `/create` — Add vehicle / transport service.
- `GET /api/admin/transports/` or `/get-all` — List all vehicles.
- `GET /api/admin/transports/:id` — Inspect specific vehicle.
- `PUT /api/admin/transports/:id` — Update vehicle pricing, specifications, or images.
- `DELETE /api/admin/transports/:id` — Remove vehicle.

---

### 5. Tour Packages (`/api/packages`)

- **Public**:
  - `GET /api/packages` & `GET /api/packages/get-all-packages` — List all packages.
  - `GET /api/packages/id/:id` — Lookup by package ID.
  - `GET /api/packages/:slug` — Lookup by friendly SEO slug.
- **Admin Only (`verifyAdmin`)**:
  - `POST /api/packages/` or `/create` — Create holiday or weekend package.
  - `PUT /api/packages/:id` — Update package pricing, inclusions, and itineraries.
  - `DELETE /api/packages/:id` — Delete package.

---

### 6. Destinations (`/api/destinations`)

- **Public**:
  - `GET /api/destinations` — List active destinations.
  - `GET /api/destinations/:slug` — Get destination overview by slug.
  - `GET /api/destinations/:destinationId/packages` — Packages mapped to destination.
  - `GET /api/destinations/:destinationId/hotels` — Hotels in destination.
  - `GET /api/destinations/:destinationId/activities` — Activities available.
  - `GET /api/destinations/:destinationId/faqs` — Published FAQs for destination.
  - `GET /api/destinations/:destinationId/guides` — Travel guides.
- **Admin Only (`verifyAdmin`)**:
  - `POST /api/destinations/` — Create destination.
  - `PUT /api/destinations/:id` — Update destination info, images, or SEO meta.
  - `DELETE /api/destinations/:id` — Remove destination.

---

### 7. Activities (`/api/activities`)

- **Public**:
  - `GET /api/activities` & `/get-all-activities` — Discover experiences & adventures.
  - `GET /api/activities/:id` — Activity detail by ID.
- **Admin Only (`verifyAdmin`)**:
  - `POST /api/activities/` or `/create` — Add new activity master record.
  - `PUT /api/activities/:id` — Update activity.
  - `DELETE /api/activities/:id` — Remove activity.

---

### 8. Itinerary Templates (`/api/itinerary-templates`)

- **Public**:
  - `GET /api/itinerary-templates` & `/get-all-templates` — View reusable itinerary blueprints.
  - `GET /api/itinerary-templates/:id` — Template detail by ID.
- **Admin Only (`verifyAdmin`)**:
  - `POST /api/itinerary-templates/` or `/create` — Create reusable day-by-day plan.
  - `PUT /api/itinerary-templates/:id` — Modify itinerary structure.
  - `DELETE /api/itinerary-templates/:id` — Delete template.

---

### 9. States (`/api/states`)

- **Public**:
  - `GET /api/states` — List all Indian states / travel regions.
  - `GET /api/states/:slug` — View state by slug.
- **Admin Only (`verifyAdmin`)**:
  - `POST /api/states/` — Create state.
  - `PUT /api/states/:id` — Update state details.
  - `DELETE /api/states/:id` — Delete state.

---

## 🎨 Automated Email Engine

When an inquiry is submitted or a user registers, Nodemailer formats and dispatches an HTML email.

### Features:
1. **Embedded Brand Logo (`cid:brand-logo`)**: The local brand logo located at `src/assets/logo.png` is attached as an inline MIME Content-ID. Images display instantly in Gmail, Apple Mail, and Outlook without third-party image hosting or CDN dependencies.
2. **Category-Specific Color Grading**:
   - 🏨 **Hotel Inquiries**: Luxury Warm Amber & Gold badge (`#d97706`)
   - ✈️ **Flight Inquiries**: Sky Cyan & Cobalt Blue badge (`#0284c7`)
   - 🎒 **Package Inquiries**: Forest Emerald & Jade badge (`#059669`)
   - 🏖️ **Weekend Trip Inquiries**: Vibrant Royal Purple badge (`#7c3aed`)
   - 🚗 **Transport Inquiries**: High-Visibility Coral & Tangerine badge (`#ea580c`)
3. **Reference Code Box**: Prominently displays the unique tracking code (`ENQ-HTL-...`, `ENQ-FLT-...`, etc.).
4. **Itemized Summary Table**: Clearly presents travel dates, guest split, room type, or vehicle category.

---

## 📊 Data Models Overview

### Enquiry Schema Highlights (`src/models/enquiry.model.js`)
- `referenceCode`: Unique index, auto-generated format `ENQ-{TYPE}-{TIMESTAMP}-{RANDOM}`.
- `enquiryType`: Enum `['hotel', 'flight', 'package', 'transport']`.
- `status`: Enum `['pending', 'contacted', 'quoted', 'converted', 'cancelled']`.
- `quotedPrice`: Number (set by admin upon review).
- `adminNotes`: Array of `{ note, addedBy, createdAt }`.
- Polymorphic sub-documents: `hotelDetails`, `flightDetails`, `packageDetails`, `transportDetails`.

---

## 🧪 Running & Testing

### Test an Inquiry Submission using cURL:

```bash
curl -X POST http://localhost:5000/api/enquiries/hotel \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Vikram Seth",
    "email": "vikram@example.com",
    "phoneNumber": "+91 9876543210",
    "hotelDetails": {
      "hotelName": "Grand Hyatt Mumbai",
      "roomType": "Club King",
      "checkInDate": "2026-12-01",
      "checkOutDate": "2026-12-05",
      "numberOfRooms": 1,
      "adults": 2,
      "children": 0
    }
  }'
```

### Accessing Admin Routes:

1. Log in via `POST /api/auth/login` with an admin account.
2. Extract the returned JWT token.
3. Pass the token in subsequent admin requests:
   - As a Cookie named `token`, or
   - In the header: `Authorization: Bearer <YOUR_JWT_TOKEN>`.

---

© 2026 **Make Your Own Voyage**. All rights reserved.
