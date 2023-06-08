import { Search } from "@/context/Search";

export interface Result {
  title: string;
  abs: string;
  keywords: string[];
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListComponent {
  search: string;
  isLoadingInitialData: boolean;
  cardComponent: React.FC<any>;
  filterValues?: any;
  orderByOptions?: any;
}

export interface Page<T> {
  data: T[];
  total: number;
  hasNext: boolean;
}
