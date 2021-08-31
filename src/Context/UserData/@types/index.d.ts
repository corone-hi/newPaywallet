interface IUserDataContext {
  info: undefined,
  category: undefined,
  month: undefined,
  percentage: undefined,
  ListData: (select_category: string) => void;
  getMonthSum : (select_category: string) => void;
  getCategorySum : (select_month: string) => void;
  getPercentage : (select_month: string) => void;
}
