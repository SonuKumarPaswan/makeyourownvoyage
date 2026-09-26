import type { StateBlogData } from "./types";

export const jammuKashmirBlog: StateBlogData = {
  slug: "jammu-kashmir-blog",
  state: "Jammu & Kashmir",
  title: "Jammu & Kashmir Travel Guide: Paradise on Earth, Shikaras & Alpine Snow Valleys",
  subtitle: "Explore Dal Lake cedar houseboats, world-class ski slopes in Gulmarg, and the breathtaking meadows of Pahalgam & Sonmarg.",
  overview:
    "Jammu & Kashmir is universally celebrated as Paradise on Earth. Adorned with cedar houseboats, floating flower markets, towering Chinar trees, and glaciers that kiss the sky, this guide delivers everything you need for an unforgettable Kashmir voyage departing from Delhi NCR.",
  bestTimeOverall: "April to October (Spring Blossoms & Green Meadows) & Dec to Feb (Snow & Skiing)",
  idealDuration: "6 to 8 Days",
  gradient: "from-teal-950 via-cyan-950 to-slate-900",
  iconName: "kayaking",
  destinations: [
    {
      id: 1,
      name: "Srinagar",
      tagline: "The Jewel of Kashmir • Houseboats & Mughal Gardens",
      gradient: "from-teal-950 via-slate-900 to-cyan-950",
      iconName: "sailing",
      duration: "2 - 3 Days",
      idealFor: "Couples, Families, Culture Enthusiasts, Photographers",
      distanceFromDelhi: "1.5 hours direct flight from IGI Airport Delhi (DEL to SXR)",
      packageTitle: "Ex-Delhi 3N/4D Srinagar Houseboat & Mughal Gardens Tour",
      startingPrice: "₹11,499 / person",
      packageInclusions: [
        "Airport pick-up & drop from Srinagar Airport by private dedicated cab",
        "2 Nights luxury Dal Lake cedar houseboat stay + 1 Night luxury boutique hotel",
        "2-Hour Shikara sunset ride to Char Chinar & floating vegetable market",
        "Mughal Gardens (Shalimar & Nishat) and Shankaracharya Temple tour",
        "Daily authentic Kashmiri breakfast and dinner with Kahwa tea",
      ],
      whyVisit: {
        highlight: "Stay on handcrafted cedar wood houseboats on Dal Lake and wake up to serene floating Shikara markets.",
        points: [
          "Gliding over Dal Lake and Nigeen Lake on colorful cushioned Shikaras with views of Hari Parbat fort.",
          "Strolling through UNESCO-nominated Mughal Gardens: Shalimar Bagh, Nishat Bagh, and Chashme Shahi.",
          "Panoramic 360-degree views of the entire Srinagar valley from Shankaracharya Hill Temple.",
          "Walking through the 1.5 million blooming tulips at Asia's largest Tulip Garden every April.",
        ],
      },
      bestTime: {
        summary: "April to October (Gardens & Lakes) | Dec to Feb (Winter Snow)",
        summer: "April to June (15°C to 28°C): Blossoming flowers, green gardens, and ideal weather for sightseeing.",
        winter: "December to February (-3°C to 10°C): Snowfall transforms the Dal lake shores into a white fairy tale.",
        monsoon: "July to August: Light showers; vibrant lotus flowers bloom across Dal Lake.",
      },
      exDelhiLogistics: {
        byPrivateCab: {
          route: "Delhi -> Jammu -> Udhampur -> Banihal -> Qazigund -> Srinagar (NH-44)",
          travelTime: "12 to 14 hours via the newly opened Banihal-Qazigund four-lane all-weather tunnel",
          details: "Chauffeur-driven executive Innovas and tempo travellers available from Jammu and Katra.",
        },
        byLuxuryVolvo: {
          boardingPoints: "Majnu Ka Tilla & ISBT Kashmere Gate (Delhi)",
          travelTime: "Overnight luxury sleeper coach to Jammu (10 hrs), followed by private cab to Srinagar",
          details: "Comfortable sleeper services operating daily.",
        },
        byTrain: {
          trainName: "Vande Bharat Express (Train 22439) / Shri Mata Vaishno Devi Katra Express",
          route: "New Delhi (NDLS) to Katra / Jammu Tawi in 8 hours",
          details: "Direct train from New Delhi followed by scenic highway cab transfer.",
        },
        byFlight: {
          airport: "Sheikh ul-Alam International Airport Srinagar (SXR)",
          flightDuration: "1 hour 25 minutes non-stop direct flight from IGI Delhi (DEL)",
          details: "Multiple daily non-stop flights by IndiGo, Air India, and SpiceJet from Delhi.",
        },
      },
      topAttractions: [
        {
          name: "Dal Lake & Houseboat Stay",
          description: "Hand-carved cedar wood houseboats equipped with Victorian chandeliers, cozy fireplaces, and traditional Kashmiri hospitality.",
          highlight: "Sunrise Shikara rides to the 100-year-old floating vegetable market.",
        },
        {
          name: "Mughal Gardens (Shalimar & Nishat)",
          description: "Built by Emperor Jahangir for Empress Nur Jahan, featuring 12 terraced lawns, cascading water fountains, and century-old Chinar trees.",
          highlight: "Classic Persian garden design overlooking Dal Lake.",
        },
        {
          name: "Shankaracharya Temple",
          description: "Ancient 9th-century Shiva temple perched 1,000 feet above the valley floor offering breathtaking panoramic views.",
          highlight: "Sacred spiritual energy and unmatched aerial vistas.",
        },
        {
          name: "Old City & Jamia Masjid",
          description: "Historic heritage quarters with 378 deodar wooden pillars at Jamia Masjid and authentic spice & saffron bazaars.",
          highlight: "Authentic Kashmiri culture and heritage architecture.",
        },
      ],
      itineraryPlan: [
        {
          day: "Day 01",
          title: "Flight from Delhi to Srinagar & Sunset Shikara Ride",
          activities: "Arrive at Srinagar Airport, transfer to your luxury Dal Lake Houseboat, enjoy a 2-hour Shikara sunset ride to Char Chinar, and savor authentic Kashmiri Kahwa.",
        },
        {
          day: "Day 02",
          title: "Mughal Gardens & Shankaracharya Temple",
          activities: "Visit Nishat Bagh, Shalimar Bagh, Chashme Shahi, Shankaracharya Temple, and shop for authentic Pashmina shawls in Lal Chowk.",
        },
        {
          day: "Day 03",
          title: "Floating Market & Old City Heritage Walk",
          activities: "5:30 AM sunrise floating market boat ride, visit Jamia Masjid, buy pure Kashmiri saffron and dry fruits, and dine on authentic Wazwan.",
        },
      ],
      localCuisine: {
        mustTry: ["Kashmiri Wazwan (Rogan Josh, Rista, Gushtaba)", "Nadru Yakhni (Lotus Stem)", "Dum Aloo Kashmiri", "Kashmiri Kahwa with Almonds & Saffron"],
        famousSpots: "Ahdoos (The Bund), Mughal Darbar, Stream Restaurant, and 14th Avenue Cafe.",
      },
      stayGuide: {
        bestAreas: "Boulevard Road / Nigeen Lake (for Houseboats), Rajbagh (for boutique hotels and heritage stays).",
        budgetRange: "₹3,500 - ₹7,000 (Deluxe Houseboats); ₹10,000 - ₹35,000+ (Luxury properties like The Lalit Grand Palace, Vivanta Dal View).",
      },
      proTips: [
        "Pre-book government-registered houseboats with heater facilities if visiting between November and March.",
        "Buy Pashmina and Saffron only from government-recognized J&K Arts Emporium stores with GI authentication tags.",
      ],
    },
    {
      id: 2,
      name: "Gulmarg",
      tagline: "The Meadow of Flowers & Asia's Premier Skiing Paradise",
      gradient: "from-blue-950 via-slate-900 to-indigo-950",
      iconName: "snowboarding",
      duration: "2 Days",
      idealFor: "Couples, Skiers, Snow Lovers, Adventure Seekers",
      distanceFromDelhi: "Flight to Srinagar + 56 km scenic mountain drive",
      packageTitle: "Ex-Delhi 3N/4D Gulmarg Snow & Gondola Ski Package",
      startingPrice: "₹14,999 / person",
      packageInclusions: [
        "Airport transfers and private cab for Gulmarg excursion",
        "Gulmarg Gondola Phase 1 & Phase 2 cable car tickets included",
        "2 Nights luxury heated alpine chalet stay with fireplace",
        "Ski lessons with certified instructor and rental equipment",
        "All mountain road snow chain assistance and driver allowances",
      ],
      whyVisit: {
        highlight: "Ride the world's second-highest operating cable car (Gondola) up to 14,000 ft at Apharwat Peak.",
        points: [
          "Experience powdery snow skiing and snowboarding with certified ski instructors on Apharwat slopes.",
          "The thrilling Gulmarg Gondola Phase 1 (Kongdoori) & Phase 2 (Apharwat Peak) high above cloud lines.",
          "Visit the 120-year-old Victorian stone St. Mary's Church set against snow-laden pine backdrops.",
          "Stay in alpine luxury chalets with glass heated igloo dining.",
        ],
      },
      bestTime: {
        summary: "Dec to March (Peak Powder Snow) | May to Sept (Green Meadows)",
        summer: "May to September (12°C to 24°C): Velvet green alpine meadows carpeted with wild colorful daisies and lupines.",
        winter: "December to March (-8°C to 5°C): Heavy powder snow; world-class skiing, snowmobiling, and sledging.",
        monsoon: "July to August: Lush green valleys with misty cloudscapes.",
      },
      exDelhiLogistics: {
        byPrivateCab: {
          route: "Srinagar Airport -> Magam -> Tangmarg -> Gulmarg",
          travelTime: "1.5 to 2 hours drive from Srinagar Airport",
          details: "From Tangmarg, winter snow chains are fitted on vehicle tyres to prevent skidding on icy switchbacks.",
        },
        byLuxuryVolvo: {
          boardingPoints: "Srinagar Tourist Reception Centre",
          travelTime: "2 hours by private cab / tourist coach from Srinagar",
          details: "Daily scheduled shuttles available.",
        },
        byTrain: {
          trainName: "Vande Bharat Express to Jammu / Katra",
          route: "New Delhi to Jammu in 8 hours",
          details: "Direct cab connection to Srinagar and Gulmarg.",
        },
        byFlight: {
          airport: "Sheikh ul-Alam International Airport Srinagar (SXR)",
          flightDuration: "1 hour 25 mins direct flight from Delhi",
          details: "Pre-booked private cabs directly pick up from Srinagar airport to Gulmarg.",
        },
      },
      topAttractions: [
        {
          name: "Gulmarg Gondola (Phase 1 & 2)",
          description: "Legendary cable car taking you from 8,690 ft to 13,780 ft at Apharwat Peak directly beside glacier peaks.",
          highlight: "Unrivaled Himalayan views looking toward Nanga Parbat.",
        },
        {
          name: "Apharwat Peak & Frozen Alpather Lake",
          description: "High altitude alpine peak offering pristine snow trails and a trek to the frozen Alpather Lake at 13,000 ft.",
          highlight: "Year-round snow touching point and ski bowls.",
        },
        {
          name: "St. Mary's Church & Maharani Temple",
          description: "1902 British-era Victorian stone church surrounded by pine trees, and the historic Maharani Temple on a hillock.",
          highlight: "Postcard-perfect heritage architecture.",
        },
        {
          name: "Gulmarg Golf Course & Igloo Cafe",
          description: "World's highest 18-hole green golf course in summer, converted into giant snow parks and ice igloos in winter.",
          highlight: "Unique seasonal attractions.",
        },
      ],
      itineraryPlan: [
        {
          day: "Day 01",
          title: "Scenic Drive & Gondola Phase 1 & 2",
          activities: "Drive from Srinagar to Gulmarg via Tangmarg, take the Gondola to Apharwat Peak for snow play & skiing, and enjoy hot Kahwa.",
        },
        {
          day: "Day 02",
          title: "Snowmobiling, St. Mary's Church & Return",
          activities: "Morning snowmobile ride or sledging across Gulmarg bowl, visit St. Mary's Church, Maharani Temple, and drive to Pahalgam.",
        },
      ],
      localCuisine: {
        mustTry: ["Kashmiri Harissa (winter meat stew)", "Mutton Rogan Josh", "Sheermal Bread with Kahwa", "Kashmiri Pulao"],
        famousSpots: "Highlands Park Restaurant, Nedou's Dining Room, 1860 Restaurant, and Pine View.",
      },
      stayGuide: {
        bestAreas: "Gulmarg Main Bowl (for ski-in/ski-out access and Gondola walking distance), Tangmarg (for boutique stays).",
        budgetRange: "₹3,500 - ₹6,000 (Standard alpine hotels); ₹12,000 - ₹40,000+ (Luxury chalets like The Khyber Himalayan Resort & Spa).",
      },
      proTips: [
        "Gondola Phase 2 tickets MUST be booked online on the official J&K Cable Car website 2-4 weeks prior as tickets sell out rapidly.",
        "Carry UV-protected polarized sunglasses to prevent snow blindness on bright sunny days at Apharwat Peak.",
      ],
    },
    {
      id: 3,
      name: "Pahalgam",
      tagline: "The Valley of Shepherds & Bollywood's Romantic Heart",
      gradient: "from-emerald-950 via-slate-900 to-teal-950",
      iconName: "hiking",
      duration: "2 - 3 Days",
      idealFor: "Nature Lovers, Families, River Rafting, Trekkers",
      distanceFromDelhi: "Flight to Srinagar + 90 km drive via Saffron Highway",
      packageTitle: "Ex-Delhi 3N/4D Pahalgam & Betaab Valley Riverside Tour",
      startingPrice: "₹12,499 / person",
      packageInclusions: [
        "Round-trip transfers from Srinagar Airport by private cab",
        "2 Nights riverside luxury resort stay with Lidder river view",
        "Full-day excursion to Betaab Valley, Aru Valley, and Chandanwari",
        "Pony ride to Baisaran (Mini Switzerland) meadow",
        "All driver allowances, parking fees, and local union permits",
      ],
      whyVisit: {
        highlight: "Lush pine forests, gushing Lidder River, scenic pony trails to Baisaran (Mini Switzerland), and Betaab Valley.",
        points: [
          "Explore Betaab Valley, named after the famous Bollywood film, surrounded by snow-clad mountains and crystal clear streams.",
          "Ride horse ponies up to Baisaran Valley—a rolling green alpine meadow surrounded by dense fir woods.",
          "Raft the thrilling rapids of the turquoise Lidder River.",
          "Starting point of the sacred annual Shri Amarnath Yatra pilgrimage at Chandanwari.",
        ],
      },
      bestTime: {
        summary: "April to October (Pleasant Summer & Autumn) | Dec to Feb (Snow)",
        summer: "April to June (12°C to 25°C): Roaring river, green hills, perfect for trekking and river rafting.",
        winter: "December to February (-5°C to 8°C): Quaint snow-covered cottages along the frozen banks of the Lidder river.",
        monsoon: "July to August: Fresh mountain greenery; pilgrimage season for Amarnath Yatra.",
      },
      exDelhiLogistics: {
        byPrivateCab: {
          route: "Srinagar -> Pampore (Saffron Fields) -> Awantipora -> Anantnag -> Pahalgam",
          travelTime: "2.5 hours from Srinagar Airport",
          details: "Scenic route passing through saffron fields, cricket bat factories, and apple orchards.",
        },
        byLuxuryVolvo: {
          boardingPoints: "Srinagar Tourist Reception Centre",
          travelTime: "3 hours by private cab / tourist coach",
          details: "Smooth wide national highway with river views.",
        },
        byTrain: {
          trainName: "Vande Bharat Express to Jammu / Katra",
          route: "New Delhi to Jammu in 8 hours",
          details: "Connecting highway cab via Anantnag.",
        },
        byFlight: {
          airport: "Sheikh ul-Alam International Airport Srinagar (SXR)",
          flightDuration: "1 hour 25 mins direct flight from Delhi",
          details: "Direct airport pick-up to Pahalgam.",
        },
      },
      topAttractions: [
        {
          name: "Betaab Valley",
          description: "A paradise garden valley framed by snow-capped peaks, babbling crystal streams, and willow trees.",
          highlight: "Postcard landscape and romantic river strolls.",
        },
        {
          name: "Baisaran (Mini Switzerland)",
          description: "A hilltop alpine meadow surrounded by giant pine forests, accessible via a 45-minute pony ride or trek from Pahalgam.",
          highlight: "Zorbing and panoramic views of Pahalgam town.",
        },
        {
          name: "Aru Valley",
          description: "A pristine village 12 km from Pahalgam, starting base for Kolahoi Glacier and high-altitude alpine lake treks.",
          highlight: "Untouched pastoral beauty and tranquil trails.",
        },
        {
          name: "Chandanwari & Lidder River",
          description: "Sacred base of Amarnath Yatra with snow bridges and exhilarating Grade 2 & 3 white-water rafting.",
          highlight: "River rafting and snow activities.",
        },
      ],
      itineraryPlan: [
        {
          day: "Day 01",
          title: "Drive via Saffron Fields & Betaab Valley",
          activities: "Drive from Srinagar via saffron fields, check into riverside resort in Pahalgam, and spend afternoon at Betaab Valley.",
        },
        {
          day: "Day 02",
          title: "Baisaran Pony Ride & Aru Valley",
          activities: "Morning pony ride to Baisaran meadow, afternoon taxi trip to Aru Valley, and riverside trout fish dinner.",
        },
        {
          day: "Day 03",
          title: "Lidder River Rafting & Departure",
          activities: "Experience white-water river rafting on the Lidder River, shop for Kashmiri cricket bats in Sangam, and head to Srinagar.",
        },
      ],
      localCuisine: {
        mustTry: ["Freshly Caught Lidder River Trout", "Gushtaba & Rista", "Modur Pulao (sweet saffron rice)", "Pink Salt Noon Chai"],
        famousSpots: "Dana Pani (Pure Veg), Trout Beat, Cafe Log Inn, and Volga Restaurant.",
      },
      stayGuide: {
        bestAreas: "Lidder Riverfront (for sound of rushing water and views), Pahalgam Market (for budget convenience).",
        budgetRange: "₹2,500 - ₹5,000 (Riverside cottages); ₹9,000 - ₹25,000+ (Luxury resorts like Welcomhotel Pine N Peak, Pahalgam Hotel).",
      },
      proTips: [
        "Local union taxi is required for sightseeing in Betaab Valley, Aru, and Chandanwari.",
        "Hire horses/ponies only from the authorized Pahalgam pony stand with the official government rate card.",
      ],
    },
    {
      id: 4,
      name: "Sonmarg",
      tagline: "The Meadow of Gold & Gateway to High Glaciers",
      gradient: "from-amber-950 via-slate-900 to-yellow-950",
      iconName: "terrain",
      duration: "1 - 2 Days",
      idealFor: "Glacier Trekkers, Photographers, Adventure Road Trippers",
      distanceFromDelhi: "Flight to Srinagar + 80 km drive along Sindh River",
      packageTitle: "Ex-Delhi 2N/3D Sonmarg Glacier & Thajiwas Adventure",
      startingPrice: "₹10,999 / person",
      packageInclusions: [
        "Private cab transfers from Srinagar Airport to Sonmarg and back",
        "2 Nights riverside luxury resort stay with mountain views",
        "Pony trek excursion to Thajiwas Glacier with snow sledging",
        "Excursion up to Zero Point / Zoji La Pass gateway",
        "All driver allowances, parking fees, and road taxes",
      ],
      whyVisit: {
        highlight: "Touch real mountain snow all year round at Thajiwas Glacier and drive through the dramatic Zoji La Pass gateway to Ladakh.",
        points: [
          "Trek or take a pony ride to the frozen Thajiwas Glacier surrounded by alpine pine forests.",
          "Experience snow sledge slides and quad biking at Zero Point near Zoji La Pass (11,500 ft).",
          "Starting point of the famous Kashmir Great Lakes Trek (Vishensar, Gadsar, Gangabal).",
          "Marvel at the turquoise Sindh River roaring parallel to the Himalayan highway.",
        ],
      },
      bestTime: {
        summary: "May to October (Summer & Autumn) | Dec to Feb (Snow via Z-Morh Tunnel)",
        summer: "May to September (10°C to 22°C): Ideal weather for glacier hikes, camping, and trout fishing.",
        winter: "December to February (-10°C to 2°C): Heavy snowfall turning the valley into an untouched winter wonderland.",
        monsoon: "July to August: Moderate showers; lush greenery with wildflowers.",
      },
      exDelhiLogistics: {
        byPrivateCab: {
          route: "Srinagar -> Ganderbal -> Kangan -> Gund -> Sonmarg (NH-1)",
          travelTime: "2 to 2.5 hours from Srinagar Airport",
          details: "The new 6.5 km Z-Morh Tunnel ensures all-weather connectivity even during winter.",
        },
        byLuxuryVolvo: {
          boardingPoints: "Srinagar TRC Bus Stand",
          travelTime: "2.5 hours by tourist coach",
          details: "Scenic route along the Sindh River valley.",
        },
        byTrain: {
          trainName: "Vande Bharat to Jammu Tawi",
          route: "New Delhi to Jammu in 8 hours",
          details: "Connecting cab via Srinagar.",
        },
        byFlight: {
          airport: "Sheikh ul-Alam International Airport Srinagar (SXR)",
          flightDuration: "1 hour 25 mins direct flight from Delhi",
          details: "Direct cab from Srinagar airport to Sonmarg.",
        },
      },
      topAttractions: [
        {
          name: "Thajiwas Glacier",
          description: "Majestic glacier located 3 km from Sonmarg, featuring frozen streams, snow sledges, and pine trails.",
          highlight: "Year-round snow availability even in peak June.",
        },
        {
          name: "Zero Point & Zoji La Pass",
          description: "High altitude mountain pass on the Srinagar-Leh highway with dramatic sheer cliffs and snow quad biking.",
          highlight: "Gateway to Ladakh and thrilling mountain drive.",
        },
        {
          name: "Sindh River Basin & Trout Farm",
          description: "Gushing glacial river renowned for white-water river rafting and angling for brown and rainbow trout.",
          highlight: "River rafting and picnic spots.",
        },
        {
          name: "Baltal Valley",
          description: "Scenic valley along the foot of Zoji La, famous as the shorter helicopter and trekking base for Amarnath Yatra.",
          highlight: "Dramatic rocky mountain cliffs.",
        },
      ],
      itineraryPlan: [
        {
          day: "Day 01",
          title: "Sindh River Drive & Thajiwas Glacier",
          activities: "Scenic morning drive from Srinagar along Sindh River, pony ride to Thajiwas Glacier for snow sledging, and riverside evening stay.",
        },
        {
          day: "Day 02",
          title: "Zero Point Adventure & Return",
          activities: "Drive up towards Zero Point on Zoji La Pass, experience snow quad biking, enjoy Kashmiri Tujji kebabs, and return to Srinagar.",
        },
      ],
      localCuisine: {
        mustTry: ["Tujji (Kashmiri street barbecue skewers)", "Kashmiri Kahwa", "Lavaasa Bread with Butter", "Mutton Yakhni"],
        famousSpots: "Glacier View Restaurant, Hotel Rah Villas Dining, Highway Dhabas in Kangan.",
      },
      stayGuide: {
        bestAreas: "Sonmarg Main Meadow (for direct glacier views), Gund (for peaceful river luxury resorts).",
        budgetRange: "₹2,500 - ₹5,000 (Alpine hotels); ₹8,000 - ₹20,000+ (Luxury resorts like Villa Himalaya, Radisson Sonmarg).",
      },
      proTips: [
        "Even in peak summer (June/July), temperatures drop drastically near glaciers; carry warm jackets and gloves.",
        "Wear waterproof shoes or rent rubber boots at the glacier base for walking comfortably in slushy snow.",
      ],
    },
  ],
};
