import { HttpException, Logger } from '@nestjs/common';
import { aws, sqs } from '../environment/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require('aws-sdk');
const { sqsUrl, delay } = sqs;
const config = {
  aws: aws.region,
};
AWS.config.update({ region: config.aws });
const SQS = new AWS.SQS();
export class EventRepository {
  constructor() {}

  async publishMessage(payload) {
    const sqsMessage = {
      MessageAttributes: {},
      MessageBody: JSON.stringify(payload),
      QueueUrl: sqsUrl,
      DelaySeconds: parseInt(delay),
    };

    SQS.sendMessage(sqsMessage, (err, data) => {
      if (err) {
        const logger = new Logger();
        logger.error({
          message: `Message not send to queue: ${payload}`,
          err,
        });
      } else {
        const logger = new Logger();
        logger.log({
          message: `Message send to queue: ${payload} ${data.MessageId}`,
          data,
        });
      }
    });
  }
}
