interface IUserDataContext {
  category: undefined,
  month: undefined,
  ListData : () => void,
  getMonthSum : (select_category: string) => void; //Statistic
  getCategorySum : (select_month: string) => void;
}
