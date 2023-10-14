import { ArgsType, Field, InputType, OmitType } from "@nestjs/graphql";
import { Restaurant } from "../entities/restaurant.entity";
import { RestaurantGQL } from "../gql-objects/restaurant.object";

@InputType()
export class CreateRestaurantReqDto extends OmitType(
    RestaurantGQL,
    ['id'], // omit the id field we don't need it 
    InputType // the parent (RestaurantGQL) is an ObjectType and we need to create this dto via a mapped-type so we must decorate this dto class as InputType and so the parent must be InputType decorated to give us an InputType, but we don't need to decorate the RestaurantGQL as InputType so we will (almost) cast it here 
) { }