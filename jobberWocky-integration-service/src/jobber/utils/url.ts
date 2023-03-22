import { jobberWocky } from '../../environment/config';

export const getUrl = (name, salary_max, salary_min, country) => {
  let url = jobberWocky?.url.concat(jobberWocky?.routes?.jobs, '?');
  if (name) {
    url = url.concat(`name=${name}&`);
  }
  if (salary_max) {
    url = url.concat(`salary_max=${salary_max}&`);
  }
  if (salary_min) {
    url = url.concat(`salary_min=${salary_min}&`);
  }
  if (country) {
    url = url.concat(`country=${country}`);
  }
  return url;
};
