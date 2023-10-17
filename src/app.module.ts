import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi" // we must import joi in this way because it doesn't have a ts compatability 
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // to access the configs from anywhere within the application
            envFilePath: process.env.ENV === 'dev' ? ".env.dev" : ".env.test",
            // if we are in prod, we need to ignore the env files at all 
            ignoreEnvFile: process.env.ENV === "prod" ? true : false,
            // lets validate my env variables so my app doesn't start if the env vars are not loaded and are not correct 
            validationSchema: Joi.object({
                ENV: Joi.string().valid('dev', 'prod').required(),
                DB_HOST: Joi.required(),
                DB_USERNAME: Joi.required(),
                DB_PASSWORD: Joi.required(),
                DB_NAME: Joi.required(),
                DB_PORT: Joi.required(),
            }),
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        RestaurantsModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: +process.env.DB_PORT, // + to convert it into number
            synchronize: true, // for auto migration to the current models state 
            logging: true,
            entities: [Restaurant, User]
        }),
        CommonModule,
        UsersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }