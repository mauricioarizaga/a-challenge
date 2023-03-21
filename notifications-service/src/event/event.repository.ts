import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { aws, sqs } from '../environment/config';
import { RedisRepository } from '../redis/redis.repository';
const crypto = require('crypto');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require('aws-sdk');
const { sqsUrl, delay } = sqs;
const config = {
  aws: aws.region,
};
AWS.config.update({ region: config.aws });
const SQS = new AWS.SQS();
const params = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ['All'],
  QueueUrl: sqsUrl,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};
let arrayMessages = [];
@Injectable()
export class EventRepository {
  constructor(private redisRepository: RedisRepository) {}
  async subscribeMessage() {
    try {
      /* SQS.receiveMessage(params, function (err, data) {
        if (err) {
          console.log('Receive Error', err);
        }
        if (data.Messages.length > 0) {
          arrayMessages = data.Messages.map((message) => {
            return JSON.parse(message.Body);
          });

          data.Messages.forEach((message) => {
            const deleteParams = {
              QueueUrl: sqsUrl,
              ReceiptHandle: message.ReceiptHandle,
            };

            /* SQS.deleteMessage(deleteParams, function (err, data) {
              if (err) {
                console.log('Delete Error', err);
              } else {
                console.log('Message Deleted', data);
              }
            }); 
          });
        }
        return arrayMessages;
      }); */
      const id = crypto.randomUUID();
      console.log(arrayMessages);
      console.log(id);
      if (arrayMessages.length > 0) {
        await this.redisRepository.setData(id, arrayMessages);
        return id;
      }
    } catch (error) {
      console.log({ error });
    }
  }
}
