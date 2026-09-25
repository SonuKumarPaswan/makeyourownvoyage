export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}
