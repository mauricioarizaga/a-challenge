export class LogDto {
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
  code: string;
  title: string;
  description: string;
  userId?: string;
}
