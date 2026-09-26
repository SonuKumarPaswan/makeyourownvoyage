import type { StateBlogData } from "./types";

export const himachalPradeshBlog: StateBlogData = {
  slug: "himachal-pradesh-blog",
  state: "Himachal Pradesh",
  title: "Himachal Pradesh Travel Guide: Complete Ex-Delhi Holiday Packages & Destination Insights",
  subtitle: "Explore premier Himalayan mountain retreats with curated itineraries, luxury stays, and private cab transfers departing from Delhi.",
  overview:
    "Himachal Pradesh stands as India's premier mountain paradise. Offering an idyllic escape for families, couples, and adventure enthusiasts, Himachal seamlessly connects colonial heritage in Shimla, snow-peaked adventures in Manali, serene Buddhist culture in Dharamshala, and high-altitude moonscapes in Spiti Valley. All destinations are fully serviced with door-to-door private cabs, Volvo luxury coaches, and customized holiday packages from Delhi NCR.",
  bestTimeOverall: "March to June (Pleasant Summers) & October to February (Winter Snowfall)",
  idealDuration: "6 to 9 Days",
  gradient: "from-blue-900 via-indigo-950 to-slate-900",
  iconName: "terrain",
  destinations: [
    {
      id: 1,
      name: "Shimla",
      tagline: "The Queen of Hills & Historic Victorian Colonial Splendor",
      gradient: "from-blue-950 via-slate-900 to-indigo-950",
      iconName: "location_city",
      duration: "2 - 3 Days",
      idealFor: "Families, Couples, Heritage Enthusiasts, Weekend Escapes",
      distanceFromDelhi: "340 km (approx. 7.5 hours drive via Himalayan Expressway)",
      packageTitle: "Ex-Delhi 3N/4D Shimla & Kufri Signature Holiday Package",
      startingPrice: "₹8,499 / person",
      packageInclusions: [
        "Pick-up and drop-off directly from your doorstep in Delhi NCR by private Sedan / Innova",
        "3 Nights luxury 4-Star mountain resort accommodation with breakfast and dinner",
        "Full-day Kufri snow adventure excursion with Himalayan Nature Park visit",
        "Guided heritage walk covering The Ridge, Christ Church & Viceregal Lodge",
        "All state taxes, expressway toll charges, parking fees, and driver allowances",
      ],
      whyVisit: {
        highlight: "The historic summer capital of British India featuring pedestrian promenades, pine forests, and UNESCO toy train rail heritage.",
        points: [
          "Stroll along the historic Ridge and Mall Road with zero vehicular disturbance and panoramic views of the Shivalik range.",
          "Experience the UNESCO World Heritage Kalka-Shimla Toy Train passing through 100+ mountain tunnels.",
          "Enjoy winter snow activities and horse riding at Kufri, located just 16 km from Shimla city center.",
          "Visit the monumental 108-foot Lord Hanuman statue at Jakhoo Temple amidst ancient deodar forests.",
        ],
      },
      bestTime: {
        summary: "March to June (Pleasant Weather) & December to January (Peak Snowfall)",
        summer: "March to June (15°C to 28°C): Ideal for sightseeing, nature walks, and escaping summer heat in Delhi.",
        winter: "December to February (-2°C to 10°C): Fairy-tale snowfall, outdoor ice skating, and the annual Shimla Winter Carnival.",
        monsoon: "July to August (17°C to 22°C): Lush misty valleys and lush greenery; travel advised with weather monitoring.",
      },
      exDelhiLogistics: {
        byPrivateCab: {
          route: "New Delhi -> Panipat -> Ambala -> Chandigarh -> Kalka -> Solan -> Shimla (NH-44 & NH-5)",
          travelTime: "7.5 to 8 hours (340 km)",
          details: "Smooth 4-lane expressway up to Solan. Includes iconic breakfast stops at Murthal (Amrik Sukhdev) and Haveli Karnal.",
        },
        byLuxuryVolvo: {
          boardingPoints: "ISBT Kashmere Gate & Majnu Ka Tilla (Delhi)",
          travelTime: "8.5 hours (Overnight departures daily from 8:00 PM to 11:30 PM)",
          details: "Premium AC semi-sleeper and sleeper Volvo coaches dropping directly at Shimla New ISBT / Tutikandi.",
        },
        byTrain: {
          trainName: "Vande Bharat Express (Train 22447) / Kalka Shatabdi (Train 12005)",
          route: "New Delhi Railway Station (NDLS) to Kalka Junction (KLK) in 3.5 hours",
          details: "Direct onward connection via the historic Kalka-Shimla Toy Train (5 hrs) or private pre-booked mountain taxi (2.5 hrs).",
        },
        byFlight: {
          airport: "Jubbarhatti Airport Shimla (22 km) or Chandigarh International Airport (120 km)",
          flightDuration: "45 minutes direct flight from IGI Airport Delhi (DEL) to Chandigarh (IXC)",
          details: "Frequent daily non-stop flights from Delhi followed by a picturesque 3.5-hour private cab transfer to Shimla.",
        },
      },
      topAttractions: [
        {
          name: "The Ridge & Christ Church",
          description: "The heart of Shimla featuring the neo-Gothic 1857 Christ Church, open cultural promenades, and sunset viewpoints.",
          highlight: "Iconic photography landmark and cultural heritage center.",
        },
        {
          name: "Jakhoo Hill & Ropeway",
          description: "The highest peak in Shimla at 8,050 feet, dedicated to Lord Hanuman and accessible via scenic aerial ropeway cable cars.",
          highlight: "Panoramic 360-degree views of the snow-clad Himalayan range.",
        },
        {
          name: "Kufri Adventure Park & Mahasu Peak",
          description: "Renowned snow hub located 16 km away, offering ski slopes, horse riding, and the Himalayan Wildlife Nature Park.",
          highlight: "Winter snow sports, tobogganing, and rare Himalayan fauna.",
        },
        {
          name: "Viceregal Lodge (Indian Institute of Advanced Study)",
          description: "Magnificent Scottish baronial castle built in 1888 with manicured botanical lawns and historic Partition conference halls.",
          highlight: "Masterpiece of Victorian architecture and historical exhibitions.",
        },
      ],
      itineraryPlan: [
        {
          day: "Day 01",
          title: "Delhi to Shimla Drive & Evening Mall Road Promenade",
          activities: "Early morning doorstep pick-up in Delhi NCR, scenic drive via Murthal and Chandigarh, hotel check-in at Shimla, and evening heritage walk on Mall Road.",
        },
        {
          day: "Day 02",
          title: "Kufri Snow Excursion & Jakhoo Peak Cable Car",
          activities: "Post-breakfast drive to Kufri for adventure sports, visit the Himalayan Nature Park, ascend Jakhoo Temple via ropeway, and enjoy dinner overlooking Doon valley.",
        },
        {
          day: "Day 03",
          title: "Viceregal Lodge, Chadwick Falls & Return Drive to Delhi",
          activities: "Guided exploration of Viceregal Lodge, nature walk through Chadwick Falls, shopping at Lakkar Bazaar, and comfortable return transfer to Delhi.",
        },
      ],
      localCuisine: {
        mustTry: ["Himachali Dham (traditional festive spread)", "Siddu served with pure Desi Ghee", "Chha Gosht", "Kullu Trout Curry", "Artisanal Apple Cider"],
        famousSpots: "Wake & Bake Cafe (Mall Road), Cafe Simla Times, Himachali Rasoi, and Baljee's for hot Gulab Jamuns.",
      },
      stayGuide: {
        bestAreas: "Mall Road (for pedestrian convenience and dining), Mashobra & Chharabra (for tranquil pine forest luxury retreats).",
        budgetRange: "₹3,000 - ₹6,000 (Boutique Heritage Stays); ₹12,000 - ₹30,000+ (Luxury 5-Star Resorts such as Oberoi Cecil & Wildflower Hall).",
      },
      proTips: [
        "Private vehicles are strictly restricted on Mall Road. Use the Himachal Tourism elevator from Circular Road to easily access the Mall.",
        "Pre-book toy train tickets on IRCTC at least 30 to 60 days in advance as seats fill up rapidly.",
        "Carry light woolens even during summer months as evening mountain breezes turn refreshingly cool.",
      ],
    },
    {
      id: 2,
      name: "Manali",
      tagline: "The Alpine Adventure Capital & Gateway to Rohtang & Atal Tunnel",
      gradient: "from-teal-950 via-slate-900 to-cyan-950",
      iconName: "downhill_skiing",
      duration: "3 - 4 Days",
      idealFor: "Honeymooners, Adventure Enthusiasts, Backpackers, Road Trippers",
      distanceFromDelhi: "530 km (approx. 9 to 10 hours drive via new Kiratpur Expressway)",
      packageTitle: "Ex-Delhi 4N/5D Manali, Solang Valley & Atal Tunnel Adventure Package",
      startingPrice: "₹10,999 / person",
      packageInclusions: [
        "Round-trip private cab transfers from Delhi NCR or luxury Volvo coach tickets",
        "4 Nights deluxe mountain chalet stay overlooking the Beas River with daily meals",
        "Full-day Solang Valley adventure tour with Rohtang Pass permit assistance",
        "Excursion through Atal Tunnel to Sissu Waterfalls in Lahaul Valley",
        "White-water river rafting in Kullu and paragliding arrangements",
      ],
      whyVisit: {
        highlight: "Year-round snow glaciers, tandem paragliding at 8,000 feet, lush pine forests, and high-altitude road trips to Lahaul and Ladakh.",
        points: [
          "Experience snow sports at Rohtang Pass (13,058 ft) and drive through the engineering marvel of Atal Tunnel.",
          "Soar with high-altitude paragliding in Solang Valley and raft the turbulent rapids of the Beas River.",
          "Explore bohemian Old Manali featuring live acoustic music, wooden chalets, and riverside cafes.",
          "Rejuvenate in natural sulfur thermal hot springs at Vashisht and seek blessings at Hadimba Temple.",
        ],
      },
      bestTime: {
        summary: "October to June (Great Year-Round) | December to February (Peak Snow Season)",
        summer: "March to June (10°C to 25°C): Optimal weather for adventure activities, paragliding, rafting, and trekking.",
        winter: "December to February (-5°C to 8°C): Heavy powder snowfall in Solang, Rohtang, and Old Manali. Prime skiing season.",
        monsoon: "July to August (15°C to 22°C): Lush greenery and swollen rivers; ideal for tranquil cottage stays.",
      },
      exDelhiLogistics: {
        byPrivateCab: {
          route: "Delhi -> Chandigarh -> Kiratpur Sahib -> Bilaspur -> Mandi -> Kullu -> Manali (NH-21)",
          travelTime: "9 to 10 hours from Delhi via the newly operational Kiratpur-Nerchowk expressway",
          details: "The new four-lane bypass significantly reduces travel time and eliminates old mountain bottlenecks.",
        },
        byLuxuryVolvo: {
          boardingPoints: "ISBT Kashmere Gate, Majnu Ka Tilla & RK Ashram Marg (Delhi)",
          travelTime: "11 to 12 hours (Overnight luxury Volvo AC semi-sleeper buses leaving between 5:30 PM and 9:00 PM)",
          details: "Arrives early morning at Manali Private Bus Stand in time for breakfast.",
        },
        byTrain: {
          trainName: "Vande Bharat Express to Chandigarh (CDG) or Ambala Cantt (UMB)",
          route: "New Delhi to Chandigarh in 3 hours",
          details: "Pick-up from Chandigarh railway station by private cab for a smooth 6.5-hour drive to Manali.",
        },
        byFlight: {
          airport: "Bhuntar Airport / Kullu-Manali Airport (KUU) - 50 km from Manali",
          flightDuration: "1 hour 15 minutes direct flight from IGI Airport Delhi",
          details: "Alliance Air operates direct daily flights from Delhi to Bhuntar, followed by a 1.5-hour cab drive along the Beas River.",
        },
      },
      topAttractions: [
        {
          name: "Solang Valley & Rohtang Pass",
          description: "Premier high-altitude adventure destination for skiing, snowmobile rides, quad biking, and glacier excursions.",
          highlight: "Snow activities at 13,058 feet and dramatic Himalayan panoramas.",
        },
        {
          name: "Atal Tunnel & Sissu (Lahaul Valley)",
          description: "The 9.02 km tunnel beneath Rohtang Pass connecting Manali directly to the dramatic landscape and waterfalls of Lahaul.",
          highlight: "World's longest highway tunnel above 10,000 feet.",
        },
        {
          name: "Hadimba Temple & Van Vihar Forest",
          description: "Ancient 1553 pagoda-style wooden temple nestled amidst towering Himalayan deodar cedar trees.",
          highlight: "Centuries-old wooden craftsmanship and serene forest walkways.",
        },
        {
          name: "Old Manali & Manu Temple",
          description: "Vibrant bohemian enclave with artistic cafes, rooftop bakeries, live music venues, and apple orchards.",
          highlight: "Eclectic culinary culture and riverside relaxation.",
        },
      ],
      itineraryPlan: [
        {
          day: "Day 01",
          title: "Arrival in Manali & Old Manali Cafe Trail",
          activities: "Check in at your riverside resort, visit Hadimba Temple and Vashisht Hot Springs, and unwind at riverside cafes in Old Manali.",
        },
        {
          day: "Day 02",
          title: "Solang Valley Adventure & Atal Tunnel / Sissu",
          activities: "Full-day excursion to Solang Valley for paragliding, drive through Atal Tunnel to witness Sissu waterfalls in Lahaul Valley.",
        },
        {
          day: "Day 03",
          title: "Rohtang Pass Snow Excursion or Kullu River Rafting",
          activities: "Morning snow excursion to Rohtang Pass, followed by white-water river rafting and shawl shopping in Kullu valley.",
        },
        {
          day: "Day 04",
          title: "Naggar Castle Heritage & Return to Delhi",
          activities: "Tour historic Naggar Castle and Nicholas Roerich Art Gallery before commencing the scenic return drive to Delhi.",
        },
      ],
      localCuisine: {
        mustTry: ["Pan-Fried Himalayan River Trout", "Tibetan Thukpa, Momos & Thenthuk", "Babru (Himachali Kachori)", "Woodfired Mountain Pizzas", "Himachali Apple Pie"],
        famousSpots: "Cafe 1947 (Old Manali on the river), The Lazy Dog, Dylan's Toasted & Roasted Coffee House, and Chopsticks.",
      },
      stayGuide: {
        bestAreas: "Old Manali (for cafes and mountain views), Aleo & Simsa (for tranquil apple orchard luxury chalets), Mall Road (for shopping proximity).",
        budgetRange: "₹2,500 - ₹5,000 (Charming Chalets & Homestays); ₹10,000 - ₹28,000+ (Luxury Alpine Resorts such as The Himalayan, Span Resort & Spa).",
      },
      proTips: [
        "Rohtang Pass permits are regulated by the district administration. Book in advance or let our concierge arrange authorized access.",
        "Rent certified snow gear and gumboots from authorized union counters in Solang rather than unauthorized roadside vendors.",
        "Keep an extra buffer during winter months when traversing Atal Tunnel due to sudden high-altitude snow accumulation.",
      ],
    },
    {
      id: 3,
      name: "Dharamshala & McLeodganj",
      tagline: "Little Lhasa • Spiritual Monasteries & Majestic Dhauladhar Ridges",
      gradient: "from-emerald-950 via-slate-900 to-teal-950",
      iconName: "self_improvement",
      duration: "2 - 3 Days",
      idealFor: "Spiritual Seekers, Trekkers, Culture Enthusiasts, Wellness Retreats",
      distanceFromDelhi: "475 km (approx. 9 hours drive via Una & Kangra)",
      packageTitle: "Ex-Delhi 3N/4D Dharamshala, McLeodganj & Triund Trek Package",
      startingPrice: "₹9,299 / person",
      packageInclusions: [
        "Door-to-door private cab transfer from Delhi NCR or luxury Volvo bus tickets",
        "3 Nights premium stay in McLeodganj / Dharamkot with breakfast and dinner",
        "Guided spiritual tour of Dalai Lama Temple Complex and Norbulingka Institute",
        "Day trek to Triund with certified mountain guide and hilltop refreshments",
        "Sightseeing at HPCA International Stadium, Bhagsu Waterfall, and Kangra Fort",
      ],
      whyVisit: {
        highlight: "The holy residence of His Holiness the Dalai Lama, Tibetan Buddhist monasteries, and sheer snow peaks of the Dhauladhar mountain range.",
        points: [
          "Experience profound meditation and spiritual tranquility at Tsuglagkhang Complex (Dalai Lama Temple).",
          "Trek the famous Triund Trail for sunset views over Kangra valley and stargazing beneath the Dhauladhars.",
          "Visit the HPCA Cricket Stadium—one of the world's most scenic international sports venues.",
          "Shop for Tibetan singing bowls, thangkas, handcrafted carpets, and prayer flags in vibrant McLeodganj bazaars.",
        ],
      },
      bestTime: {
        summary: "September to June (Great Weather) | December to February (Snow at Triund)",
        summer: "March to June (18°C to 30°C): Pleasant mountain breeze; ideal for Triund day treks and monastery visits.",
        winter: "December to February (0°C to 14°C): Crisp winter sunshine with snow on upper Dhauladhar peaks and Triund ridge.",
        monsoon: "July to August (18°C to 24°C): High rainfall; lush emerald landscapes and roaring waterfalls.",
      },
      exDelhiLogistics: {
        byPrivateCab: {
          route: "Delhi -> Panipat -> Ambala -> Chandigarh -> Una -> Kangra -> Dharamshala (NH-503)",
          travelTime: "9 to 10 hours from Delhi",
          details: "Comfortable driving corridor through Punjab and Kangra valley with well-developed highway rest plazas.",
        },
        byLuxuryVolvo: {
          boardingPoints: "ISBT Kashmere Gate & Majnu Ka Tilla (Delhi)",
          travelTime: "10 hours (Daily evening Volvo coaches departing between 7:00 PM and 10:00 PM)",
          details: "Direct luxury coaches dropping passengers at McLeodganj Main Square and Dharamshala Bus Stand.",
        },
        byTrain: {
          trainName: "Vande Bharat Express to Amb Andaura (AAMB) or Pathankot Junction (PTK)",
          route: "New Delhi to Amb Andaura in 5.5 hours",
          details: "Amb Andaura is just 2 hours by cab to Dharamshala; Pathankot is 2.5 hours by pre-arranged cab.",
        },
        byFlight: {
          airport: "Gaggal Airport / Kangra Airport (DHM) - 14 km from Dharamshala",
          flightDuration: "1 hour 15 minutes direct flight from IGI Airport Delhi",
          details: "Direct daily flights by SpiceJet and IndiGo connecting Delhi (DEL) to Dharamshala (DHM).",
        },
      },
      topAttractions: [
        {
          name: "Tsuglagkhang Temple Complex",
          description: "The spiritual center of Tibetan Buddhism housing Namgyal Monastery, the Tibet Museum, and the Dalai Lama's private residence.",
          highlight: "Spinning giant brass prayer wheels and observing Tibetan monks' debate rituals.",
        },
        {
          name: "Triund Hill Trek",
          description: "A 9 km scenic trail starting from Galu Temple traversing rhododendron forests to a breathtaking ridge beneath Dhauladhar peaks.",
          highlight: "One of India's finest beginner-friendly day-treks with panoramic vistas.",
        },
        {
          name: "Bhagsu Waterfall & Shiva Cafe",
          description: "Cascading 30-foot mountain waterfall accompanied by the iconic cliffside Shiva Cafe overlooking the valley.",
          highlight: "Refreshing mountain streams and bohemian artistic ambiance.",
        },
        {
          name: "HPCA International Cricket Stadium",
          description: "Situated at 4,780 feet with the majestic snow-clad Dhauladhar mountains forming a dramatic open-air grandstand.",
          highlight: "Acclaimed as one of the world's most photogenic cricket grounds.",
        },
      ],
      itineraryPlan: [
        {
          day: "Day 01",
          title: "Delhi to Dharamshala & Dalai Lama Temple",
          activities: "Arrival from Delhi, hotel check-in, visit Tsuglagkhang Temple Complex, spin prayer wheels, and explore McLeodganj market.",
        },
        {
          day: "Day 02",
          title: "Triund Day Hike or Bhagsu Waterfall & Church",
          activities: "Option A: Scenic guided hike to Triund Top. Option B: Visit Bhagsu Waterfall, Shiva Cafe, and the historic St. John in the Wilderness Church.",
        },
        {
          day: "Day 03",
          title: "HPCA Stadium, Norbulingka & Return Transfer",
          activities: "Visit HPCA Cricket Stadium, explore Tibetan arts at Norbulingka Institute, visit ancient Kangra Fort, and depart for Delhi.",
        },
      ],
      localCuisine: {
        mustTry: ["Tibetan Momos & Shapta", "Tingmo with spicy vegetable/meat gravy", "Bhagsu Cake (famous caramel dessert)", "Kangri Dham", "Butter Salt Tea"],
        famousSpots: "Tibi Tibet Kitchen, Illiterati Books & Coffee, Jimmy's Italian Kitchen, and Moonpeak Espresso.",
      },
      stayGuide: {
        bestAreas: "McLeodganj (for cultural vibrancy and cafes), Dharamkot (for tranquil yoga and wellness retreats), Lower Dharamshala (for luxury resorts).",
        budgetRange: "₹2,000 - ₹4,500 (Boutique Guest Houses); ₹8,000 - ₹22,000+ (Luxury Wellness Resorts such as Hyatt Regency Dharamshala, Fortune Park).",
      },
      proTips: [
        "Take the Dharamshala Skyway (Aerial Cable Car) connecting Dharamshala bus stand to McLeodganj to bypass mountain road traffic in just 5 minutes.",
        "Check His Holiness the Dalai Lama's official schedule online in advance to attend public teachings during your visit.",
        "Start early (by 8:00 AM) if hiking to Triund to reach the summit before afternoon cloud cover rolls in.",
      ],
    },
    {
      id: 4,
      name: "Spiti Valley & Kasol",
      tagline: "The Rugged High-Altitude Cold Desert & Mystical Parvati Valley",
      gradient: "from-amber-950 via-stone-900 to-slate-900",
      iconName: "explore",
      duration: "5 - 7 Days",
      idealFor: "Adventure Road Trippers, Offbeat Explorers, Astrophotographers",
      distanceFromDelhi: "720 km full circuit via Shimla-Kinnaur-Kaza-Manali",
      packageTitle: "Ex-Delhi 7N/8D Ultimate Spiti Valley & Chandratal 4x4 Expedition",
      startingPrice: "₹18,999 / person",
      packageInclusions: [
        "Expedition-grade 4x4 SUV (Innova / Scorpio) with experienced mountain pilot from Delhi NCR",
        "7 Nights curated homestay and luxury Swiss tent camping beside Chandratal Lake",
        "Visits to Key Monastery, Hikkim (Highest Post Office), Komic & Langza fossil village",
        "Drive through Kunzum Pass, Rohtang Pass, and Atal Tunnel",
        "All oxygen cylinders, inner-line permits, driver allowances, and fuel included",
      ],
      whyVisit: {
        highlight: "Surreal moonscapes, 1,000-year-old cliffside monasteries, crystal blue Chandratal Lake, and riverside cafes in Parvati Valley.",
        points: [
          "Explore Key Monastery—Spiti's largest 1,000-year-old fortress monastery situated at 13,500 feet.",
          "Camp beside the crescent-shaped sacred emerald waters of Chandratal Lake beneath pristine Milky Way skies.",
          "Post a letter from Hikkim—the Highest Post Office in the World at 14,567 feet.",
          "Relax in riverside bohemian cafes and natural geothermal hot springs in Kasol and Manikaran Sahib.",
        ],
      },
      bestTime: {
        summary: "June to October (Spiti Full Circuit Open) | Year-Round (Kasol & Parvati Valley)",
        summer: "June to September (10°C to 20°C day, 0°C night): All high mountain passes (Kunzum & Rohtang) open; optimal road trip window.",
        winter: "January to March (-20°C to -5°C): Extreme winter Spiti expeditions for frozen waterfalls and snow leopard expeditions.",
        monsoon: "July to August: Spiti is a rain-shadow zone with dry clear weather, though approach roads through Kinnaur require cautious driving.",
      },
      exDelhiLogistics: {
        byPrivateCab: {
          route: "Circuit 1: Delhi -> Shimla -> Kinnaur -> Tabo -> Kaza. Circuit 2: Delhi -> Manali -> Atal Tunnel -> Kunzum Pass -> Kaza.",
          travelTime: "Complete loop recommended over 7 to 9 days for proper acclimatization",
          details: "Dedicated 4x4 high-ground-clearance SUVs are strictly provided for water crossings and rugged terrain.",
        },
        byLuxuryVolvo: {
          boardingPoints: "Delhi ISBT to Manali or Shimla",
          travelTime: "Overnight Volvo from Delhi to Manali, followed by private 4x4 pickup to Kaza",
          details: "Recommended combination for road trippers preferring to avoid long plain drives.",
        },
        byTrain: {
          trainName: "Vande Bharat Express to Chandigarh",
          route: "New Delhi to Chandigarh in 3 hours",
          details: "Starting point for 4x4 SUV pickup for the Kinnaur-Spiti expedition circuit.",
        },
        byFlight: {
          airport: "Bhuntar Airport (Kullu) for Kasol / Manali approach; Chandigarh for the Kinnaur loop",
          flightDuration: "Direct flights from Delhi to Bhuntar or Chandigarh",
          details: "Cuts down initial transit time before commencing the high mountain ascent.",
        },
      },
      topAttractions: [
        {
          name: "Key Gompa & Kibber Village",
          description: "Spectacular 11th-century cliff monastery and one of the highest permanently inhabited villages in the world with snow leopard reserves.",
          highlight: "Ancient Buddhist murals, sacred manuscripts, and panoramic Spiti river canyon views.",
        },
        {
          name: "Chandratal Lake (The Moon Lake)",
          description: "High-altitude glacial lake at 14,000 feet changing colors from deep sapphire to turquoise throughout the day.",
          highlight: "Astrophotography, Milky Way galaxy views, and luxury tented camping.",
        },
        {
          name: "Hikkim, Komic & Langza",
          description: "World's highest post office (Hikkim), highest motorable village (Komic at 15,027 ft), and prehistoric marine fossil village (Langza).",
          highlight: "World-record high-altitude landmarks under giant Buddha statues.",
        },
        {
          name: "Kasol & Manikaran Sahib",
          description: "Parvati Valley hub famous for riverside cafes, pine nature trails, and sacred gurudwara with natural boiling sulfur springs.",
          highlight: "Bohemian culinary culture and therapeutic geothermal springs.",
        },
      ],
      itineraryPlan: [
        {
          day: "Day 01 - 02",
          title: "Delhi to Kasol & Parvati Valley Exploration",
          activities: "Drive from Delhi, check in at Kasol, hike along Parvati River to Chalal village, visit Manikaran hot springs, and dine in riverside cafes.",
        },
        {
          day: "Day 03 - 04",
          title: "Atal Tunnel to Kaza & Key Monastery",
          activities: "Traverse Atal Tunnel, cross Kunzum Pass, arrive in Kaza, explore Key Monastery and Kibber village homestays.",
        },
        {
          day: "Day 05 - 06",
          title: "World's Highest Villages & Chandratal Lake Camping",
          activities: "Post letters from Hikkim, visit Komic and Langza, drive to Chandratal Lake, and camp in luxury Swiss tents under the stars.",
        },
        {
          day: "Day 07",
          title: "Manali Crossing & Return Drive to Delhi",
          activities: "Drive across Rohtang Pass / Atal Tunnel to Manali, enjoy lunch, and proceed on the smooth expressway return to Delhi.",
        },
      ],
      localCuisine: {
        mustTry: ["Spitian Seabuckthorn Berry Tea", "Chhang & Tibetan Butter Salt Tea", "Spiti Steamed Momos", "Israeli Falafel & Shakshuka in Kasol"],
        famousSpots: "The Himalayan Cafe (Kaza), Sol Cafe, Moonmill, Evergreen Cafe (Kasol), and Jim Morrison Cafe.",
      },
      stayGuide: {
        bestAreas: "Kaza (central town for services), Kibber & Langza (for authentic village homestays), Chandratal (for luxury alpine campouts).",
        budgetRange: "₹2,000 - ₹4,500 (Authentic Homestays & Swiss Camps); ₹6,000 - ₹15,000+ (Boutique Spitian Hotels like Grand Dewachen).",
      },
      proTips: [
        "Acclimatization is essential: Rest fully on Day 1 in Kaza. Stay well hydrated and carry altitude medication such as Diamox.",
        "Only BSNL and Jio postpaid mobile networks operate in Spiti; carry sufficient cash as ATMs often run out of cash.",
        "Respect the fragile high-altitude ecosystem: avoid single-use plastics and never contaminate sacred glacial lake waters.",
      ],
    },
  ],
};
