import { config as configDotEnv } from 'dotenv';
configDotEnv();
export const jobberWocky = {
  url: process.env.JOBBER_WOCKY_URL,
  routes: {
    jobs: process.env.JOBBER_WOCKY_ROUTES_JOBS,
  },
};
