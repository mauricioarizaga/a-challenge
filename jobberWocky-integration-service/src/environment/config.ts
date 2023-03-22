import { config as configDotEnv } from 'dotenv';
configDotEnv();
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

export const kafkaConnect = {
  server: process.env.KAFKA_SERVER.split(','),
  topic: process.env.KAFKA_TOPIC,
  name: 'KAFKA',
};
export const aws = {
  region: process.env.AWS_REGION,
};

export const sqs = {
  messageGroupId: process.env.MESSAGE_GROUP_ID,
  delay: process.env.DELAY,
  sqsUrl: process.env.SQS_URL,
};

export const redis = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: Number(process.env.REDIS_PORT),
  ttl: Number(process.env.REDIS_TTL),
};
