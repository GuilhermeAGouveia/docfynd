export interface Result {
  title: string;
  content: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListComponent {
  initialPage: Page<Result>;
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
