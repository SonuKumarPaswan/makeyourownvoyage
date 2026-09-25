export interface State {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  bannerImage?: string;
  destinationCount?: number;
  popularDestinations?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface StateResponse {
  success: boolean;
  count?: number;
  data: State[];
}

export interface SingleStateResponse {
  success: boolean;
  data: State;
}
