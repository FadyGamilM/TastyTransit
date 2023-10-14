import { Field, ObjectType } from "@nestjs/graphql";

// this is the typeDefs of Restaurant 
@ObjectType() // describe to graphql how the restaurant looks like (for gql point of view)
export class Restaurant {
    @Field(is => String, { nullable: true }) // this is a gql type not ts type 
    name: string;
}