import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesModule } from './movies/movies.module';
import { CustomersModule } from './customers/customers.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const certFromEnv = configService.get('DATABASE_CA_CERT');
        const decodedCert = Buffer.from(certFromEnv, 'base64').toString(
          'ascii',
        );

        return {
          type: 'mongodb',
          url: configService.get('DATABASE_URI'),
          database: configService.get('DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          ssl: true,
          sslCA: [decodedCert],
          useUnifiedTopology: true,
          useNewUrlParser: true,
          loggerLevel:
            process.env.NODE_ENV === 'production' ? 'error' : 'debug',
        };
      },
    }),
    MoviesModule,
    CustomersModule,
    RentalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
