import { Logger } from 'winston';
import { createTransporter } from '../../environment/config';

export const sendEmailGoogle = async (emailOptions: {}) => {
  try {
    let emailTransporter = await createTransporter();
    return await emailTransporter.sendMail(emailOptions);
  } catch (error) {
    const logger = new Logger();
    logger.error({ error });
  }
};
