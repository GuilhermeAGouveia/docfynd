import { Search } from "@/context/Search";

export interface Keyword {
  text: string;
  dbpedia_resource: string;
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
