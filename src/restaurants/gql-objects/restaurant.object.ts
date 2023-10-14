import { Field, ID, ObjectType } from "@nestjs/graphql";

// this is the typeDefs of Restaurant 
@ObjectType() // describe to graphql how the restaurant looks like (for gql point of view)
export class RestaurantGQL {
    @Field(is => ID, { nullable: true })
    id: number;

    @Field(is => String, { nullable: false }) // this is a gql type not ts type 
    name: string;

    @Field(is => Boolean, { nullable: false })
    isVegan: Boolean;
}