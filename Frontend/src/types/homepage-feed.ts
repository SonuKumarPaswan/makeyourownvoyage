export interface BannerImage {
    desktop: string;
    mobile: string;
}

export interface FeaturedPackage {
    _id: string;
    title: string;
    destination: string;
    duration: string;
    slug: string;
}

export interface Collection {
    _id: string;
    title: string;
    subtitle: string;
    slug: string;
    collectionType: string;
    seasonTag: string;
    badgeText: string;
    bannerImage: BannerImage;
    featuredPackages: FeaturedPackage[];
    featuredDestinations: string[];
    exploreLink: string;
    displayOrder: number;
    isActive: boolean;
    validFrom: string | null;
    validTill: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface WeekendSection {
    title: string;
    subtitle: string;
    badge: string;
    collections: Collection[];
    directPackages: string[];
}

export interface SeasonalSection {
    season: string;
    title: string;
    collections: Collection[];
}

export interface HomepageFeedData {
    weekendSection: WeekendSection;
    seasonalSection: SeasonalSection;
}

export interface HomepageFeedResponse {
    success: boolean;
    currentSeason: string;
    data: HomepageFeedData;
}