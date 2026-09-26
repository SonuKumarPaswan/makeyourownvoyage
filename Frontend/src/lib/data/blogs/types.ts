export interface DestinationItem {
  id: number;
  name: string;
  tagline: string;
  gradient: string;
  iconName: string;
  duration: string;
  idealFor: string;
  distanceFromDelhi?: string;
  packageTitle?: string;
  startingPrice?: string;
  packageInclusions?: string[];
  whyVisit: {
    highlight: string;
    points: string[];
  };
  bestTime: {
    summary: string;
    summer: string;
    winter: string;
    monsoon: string;
  };
  exDelhiLogistics?: {
    byPrivateCab: {
      route: string;
      travelTime: string;
      details: string;
    };
    byLuxuryVolvo: {
      boardingPoints: string;
      travelTime: string;
      details: string;
    };
    byTrain: {
      trainName: string;
      route: string;
      details: string;
    };
    byFlight: {
      airport: string;
      flightDuration: string;
      details: string;
    };
  };
  howToReach?: {
    byAir: {
      airport: string;
      distance: string;
      details: string;
    };
    byTrain: {
      station: string;
      distance: string;
      details: string;
    };
    byRoad: {
      route: string;
      travelTime: string;
      details: string;
    };
  };
  topAttractions: {
    name: string;
    description: string;
    highlight: string;
  }[];
  itineraryPlan: {
    day: string;
    title: string;
    activities: string;
  }[];
  localCuisine: {
    mustTry: string[];
    famousSpots: string;
  };
  stayGuide: {
    bestAreas: string;
    budgetRange: string;
  };
  proTips: string[];
}

export interface StateBlogData {
  slug: string;
  state: string;
  title: string;
  subtitle: string;
  overview: string;
  bestTimeOverall: string;
  idealDuration: string;
  gradient: string;
  iconName: string;
  destinations: DestinationItem[];
}
