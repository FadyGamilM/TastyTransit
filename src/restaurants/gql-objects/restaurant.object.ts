import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length, min } from "class-validator";
import { required } from "joi";

// this is the typeDefs of Restaurant 
@ObjectType() // describe to graphql how the restaurant looks like (for gql point of view)
export class RestaurantGQL {
    @Field(is => ID, { nullable: true }) // this decorator is for gql to generate the schema
    id: number;

    @Field(is => String, { nullable: false }) // this is a gql type not ts type 
    // DTO - Validation
    @IsString()
    @Length(3, 20)
    name: string;

    @Field(is => Boolean, { nullable: false, defaultValue: false }) // specify a default value for this field in the gql schema too
    // DTO - Validation
    @IsOptional() // this decorator is for dto so for the incoming dto for the create mutation, we don't have to pass this, and we need to handle this in the db entity too to give it a default value
    isVegan: Boolean;
}