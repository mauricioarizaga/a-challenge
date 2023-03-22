import { config as configDotEnv } from 'dotenv';
const nodemailer = require('nodemailer');
import { google } from 'googleapis';
import { Logger } from 'winston';
const OAuth2 = google.auth.OAuth2;
configDotEnv();
export const mailerSetup = {
  host: process.env.GOOGLE_HOST,
  secure: process.env.GOOGLE_SECURE === 'true' ? true : false,
  port: Number(process.env.GOOGLE_PORT),
  type: process.env.GOOGLE_TYPE as any,
  service: process.env.GOOGLE_SERVICE,
  auth: {
    type: process.env.GOOGLE_TYPE,
    user: process.env.GOOGLE_EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    urlPlayGround: process.env.GOOGLE_OATH2_URL,
    tls: {
      rejectUnathorized: false,
    },
  },
};
const oauth2Client = async () => {
  const oauth2Client = new OAuth2(mailerSetup?.auth?.clientId, mailerSetup?.auth?.clientSecret, mailerSetup?.auth?.urlPlayGround);
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return oauth2Client;
};
export const createTransporter = async () => {
  const oAuth2Client = await oauth2Client();
  try {
    const accessToken = await new Promise((resolve, reject) => {
      oAuth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token :(');
        }
        resolve(token);
      });
    });
    const transportOptions: {} = {
      host: mailerSetup?.host,
      port: mailerSetup?.port,
      secure: mailerSetup.secure,
      auth: {
        type: mailerSetup?.type,
        user: mailerSetup?.auth?.user,
        accessToken,
        clientId: mailerSetup?.auth?.clientId,
        clientSecret: mailerSetup?.auth?.clientSecret,
        refreshToken: mailerSetup?.auth?.refreshToken,
        tls: {
          rejectUnauthorized: false,
        },
      },
    };
    const transporter = nodemailer.createTransport(transportOptions);

    return transporter;
  } catch (error) {
    const logger = new Logger();
    logger.error({ error });
  }
};

export const dbConfig = {
  type: 'postgres' as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRO,
  logging: process.env.DB_LOG,
};

export const cronTimes = {
  startJob: process.env.CRON_SENT_MAIL_TIMER,
};
