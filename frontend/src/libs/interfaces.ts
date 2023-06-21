import { Search } from "@/context/Search";

export interface Keyword {
  text: string;
  dbpedia_resource?: string;
}

export interface Result {
  title: string;
  abs: string;
  keywords: Keyword[];
  url: string;
  highlight_abs: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
}

export interface ListComponent {
  id: string;
  style?: React.CSSProperties;
  search: string;
  isLoadingInitialData: boolean;
  cardComponent: React.FC<any>;
  filterValues?: FilterFields;
  orderByOptions?: any;
  getMorePages: (
    query: string,
    page: number,
    filterValues?: any
  ) => Promise<Page<Result>>;
}

export interface Page<T> {
  data: T[];
  total: number;
  took: number;
  hasNext?: boolean;
}

export interface FilterFields {
  sortBy: "relevance" | "date" | "access";
  orderBy: "asc" | "desc";
  sinceYear: number;
}

//{sortBy: 'relevance', order: 'left', sinceYear: 2023}