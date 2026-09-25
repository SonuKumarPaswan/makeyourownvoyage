import { apiFetch } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import {
  BaseEnquiryPayload,
  EnquiryResponse,
  HotelEnquiryData,
  PackageEnquiryData,
  TransportEnquiryData,
  FlightEnquiryData,
} from "@/types/enquiry";

export const enquiryApi = {
  /**
   * Submit Universal Multi-Category Enquiry
   */
  async submitUniversal(payload: BaseEnquiryPayload): Promise<EnquiryResponse> {
    return apiFetch<EnquiryResponse>(API_ENDPOINTS.ENQUIRIES, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Submit Package / Tour / MICE Enquiry
   */
  async submitPackageEnquiry(payload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    city?: string;
    specialRequests?: string;
    packageDetails: PackageEnquiryData;
  }): Promise<EnquiryResponse> {
    return apiFetch<EnquiryResponse>("/enquiries/package", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Submit Hotel / Resort Enquiry
   */
  async submitHotelEnquiry(payload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    city?: string;
    specialRequests?: string;
    hotelDetails: HotelEnquiryData;
  }): Promise<EnquiryResponse> {
    return apiFetch<EnquiryResponse>("/enquiries/hotel", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Submit Transport (Cab / Bus / Bike / Traveller) Enquiry
   */
  async submitTransportEnquiry(payload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    city?: string;
    specialRequests?: string;
    transportDetails: TransportEnquiryData;
  }): Promise<EnquiryResponse> {
    return apiFetch<EnquiryResponse>("/enquiries/transport", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Submit Flight Enquiry
   */
  async submitFlightEnquiry(payload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    city?: string;
    specialRequests?: string;
    flightDetails: FlightEnquiryData;
  }): Promise<EnquiryResponse> {
    return apiFetch<EnquiryResponse>("/enquiries/flight", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
