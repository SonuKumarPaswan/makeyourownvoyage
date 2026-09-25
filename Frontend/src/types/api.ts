export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
}
