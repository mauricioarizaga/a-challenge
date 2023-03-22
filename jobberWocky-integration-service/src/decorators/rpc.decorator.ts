import { SetMetadata } from '@nestjs/common';

export const Rpc = () => SetMetadata('isPublic', true);
