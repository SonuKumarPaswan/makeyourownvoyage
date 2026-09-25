export interface Booking {
  _id: string;
  bookingNumber: string;
  user: string;
  bookingType: "package" | "cab" | "hotel" | "flight";
  itemDetails: Record<string, any>;
  totalAmount: number;
  paidAmount: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "unpaid" | "partial" | "paid" | "refunded";
  travelDate: string;
  createdAt: string;
}
