export class PushNotificationDto {
  userId: string;
  title: string;
  image?: string; //url string
  subTitle?: string;
  redirect?: string; //url string
  pinned?: boolean; // si se quiere dar maxima prioridad (para el futuro, por el momento no utilizar)
}
