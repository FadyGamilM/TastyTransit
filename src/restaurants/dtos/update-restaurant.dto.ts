import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateRestaurantReqDto } from "./create-restaurant.dto";

// we used Partion of the create-dto not the restaurant entity itself because 
// in the update request, we must receivie and ID, and if we use entity partial, we will have an Optional ID paramater 
@InputType()
export class UpdateRestaurantInputData extends PartialType(CreateRestaurantReqDto) { }

@InputType()
export class UpdateRestaurantDto {
    @Field(type => ID, { nullable: false })
    id: number

    @Field(type => UpdateRestaurantInputData)
    updated_data: UpdateRestaurantInputData
}