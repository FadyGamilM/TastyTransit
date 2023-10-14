import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        RestaurantsModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            username: "tastytransit",
            password: "tastytransit",
            database: "tastytransitdb",
            port: 5432,
            synchronize: true, // for auto migration to the current models state 
            logging: true,
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }