import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { arrayControllers, arrayProviders } from './arrayDependency';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  controllers: arrayControllers,
  providers: arrayProviders,
})
export class AppModule {}
