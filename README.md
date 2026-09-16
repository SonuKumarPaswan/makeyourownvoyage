makeyourownvoyage/
│
├── Frontend/
│   │
│   ├── public/
│   │   ├── images/
│   │   │   ├── destinations/
│   │   │   ├── tour-packages/
│   │   │   ├── hotels/
│   │   │   ├── events/
│   │   │   ├── visa/
│   │   │   └── banners/
│   │   ├── icons/
│   │   ├── logos/
│   │   ├── documents/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/
│   │   │   │   ├── about/
│   │   │   │   ├── contact/
│   │   │   │   ├── destinations/
│   │   │   │   ├── tour-packages/
│   │   │   │   ├── events/
│   │   │   │   ├── flights/
│   │   │   │   ├── hotels/
│   │   │   │   ├── visa/
│   │   │   │   ├── travel-services/
│   │   │   │   ├── travel-guides/
│   │   │   │   ├── offers/
│   │   │   │   ├── faq/
│   │   │   │   └── policies/
│   │   │   │
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── forgot-password/
│   │   │   │   └── reset-password/
│   │   │   │
│   │   │   ├── checkout/
│   │   │   ├── account/
│   │   │   ├── agent/
│   │   │   ├── admin/
│   │   │   ├── api/
│   │   │   │   └── health/
│   │   │   │
│   │   │   ├── layout.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── error.tsx
│   │   │   ├── global-error.tsx
│   │   │   ├── robots.ts
│   │   │   ├── sitemap.ts
│   │   │   ├── manifest.ts
│   │   │   └── opengraph-image.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   ├── common/
│   │   │   ├── home/
│   │   │   ├── destination/
│   │   │   ├── tour-package/
│   │   │   ├── event/
│   │   │   ├── flight/
│   │   │   ├── hotel/
│   │   │   ├── visa/
│   │   │   ├── travel-service/
│   │   │   ├── booking/
│   │   │   ├── payment/
│   │   │   ├── account/
│   │   │   ├── agent/
│   │   │   └── admin/
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── destinations/
│   │   │   ├── tour-packages/
│   │   │   ├── events/
│   │   │   ├── flights/
│   │   │   ├── hotels/
│   │   │   ├── visa/
│   │   │   ├── travel-services/
│   │   │   ├── bookings/
│   │   │   ├── payments/
│   │   │   ├── customers/
│   │   │   ├── agents/
│   │   │   ├── reviews/
│   │   │   ├── offers/
│   │   │   ├── travel-guides/
│   │   │   └── notifications/
│   │   │
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── payment/
│   │   │   ├── storage/
│   │   │   ├── analytics/
│   │   │   ├── utils/
│   │   │   └── seo/
│   │   │
│   │   ├── config/
│   │   ├── types/
│   │   ├── schemas/
│   │   ├── hooks/
│   │   ├── providers/
│   │   └── store/
│   │
│   ├── .env.local.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── eslint.config.mjs
│   └── postcss.config.mjs
│
├── backend/
│   │
│   ├── src/
│   │   ├── app.js
│   │   │
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   ├── cors.js
│   │   │   ├── payment.js
│   │   │   └── constants.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── destination.controller.js
│   │   │   ├── tour-package.controller.js
│   │   │   ├── event.controller.js
│   │   │   ├── flight.controller.js
│   │   │   ├── hotel.controller.js
│   │   │   ├── visa.controller.js
│   │   │   ├── travel-service.controller.js
│   │   │   ├── booking.controller.js
│   │   │   ├── payment.controller.js
│   │   │   ├── customer.controller.js
│   │   │   ├── agent.controller.js
│   │   │   ├── review.controller.js
│   │   │   ├── offer.controller.js
│   │   │   ├── travel-guide.controller.js
│   │   │   └── notification.controller.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.model.js
│   │   │   ├── Destination.model.js
│   │   │   ├── TourPackage.model.js
│   │   │   ├── Event.model.js
│   │   │   ├── Flight.model.js
│   │   │   ├── Hotel.model.js
│   │   │   ├── VisaApplication.model.js
│   │   │   ├── TravelService.model.js
│   │   │   ├── Booking.model.js
│   │   │   ├── Payment.model.js
│   │   │   ├── Customer.model.js
│   │   │   ├── Agent.model.js
│   │   │   ├── Review.model.js
│   │   │   ├── Offer.model.js
│   │   │   ├── TravelGuide.model.js
│   │   │   └── Notification.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── destination.routes.js
│   │   │   ├── tour-package.routes.js
│   │   │   ├── event.routes.js
│   │   │   ├── flight.routes.js
│   │   │   ├── hotel.routes.js
│   │   │   ├── visa.routes.js
│   │   │   ├── travel-service.routes.js
│   │   │   ├── booking.routes.js
│   │   │   ├── payment.routes.js
│   │   │   ├── customer.routes.js
│   │   │   ├── agent.routes.js
│   │   │   ├── review.routes.js
│   │   │   ├── offer.routes.js
│   │   │   ├── travel-guide.routes.js
│   │   │   └── notification.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── booking.service.js
│   │   │   ├── payment.service.js
│   │   │   ├── email.service.js
│   │   │   ├── sms.service.js
│   │   │   ├── storage.service.js
│   │   │   └── notification.service.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── validate.middleware.js
│   │   │   ├── rateLimiter.middleware.js
│   │   │   └── upload.middleware.js
│   │   │
│   │   ├── schemas/
│   │   │   ├── auth.schema.js
│   │   │   ├── booking.schema.js
│   │   │   ├── payment.schema.js
│   │   │   └── tour-package.schema.js
│   │   │
│   │   └── utils/
│   │       ├── apiResponse.js
│   │       ├── apiError.js
│   │       ├── asyncHandler.js
│   │       └── logger.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
└── .gitignore
