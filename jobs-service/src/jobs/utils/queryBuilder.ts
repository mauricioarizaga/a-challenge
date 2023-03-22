import { ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

export const queryDataBuilder = (name, salary_max, salary_min, country) => {
  let queryData = { where: {} };
  if (name) {
    queryData = { where: { name: ILike(`%${name}%`) } };
  }
  if (salary_max) {
    queryData = { where: { salary: LessThanOrEqual(`${salary_max}`) } };
  }
  if (salary_min) {
    queryData = { where: { salary: MoreThanOrEqual(`${salary_min}`) } };
  }
  if (country) {
    queryData = { where: { country: ILike(`%${country}%`) } };
  }
  return queryData;
};
