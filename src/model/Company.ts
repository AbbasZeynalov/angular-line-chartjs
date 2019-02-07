export interface Company {
  id: number;
  name: string;
  category: string;
  weekStats: object;
  balance: number;
  monthBalance: number;
}

export interface InitialCompany {
  id: number;
  name: string;
  type: string;
  revenuePerWeek: object;
  revenue: number;
  monthRevenue: number;
}
