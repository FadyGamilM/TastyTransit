import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsString, Length, min } from "class-validator";

@ArgsType()
export class CreateRestaurantReqDto {
    @Field(type => String)
    @IsString({ message: "restaurant name must be string type" })
    @Length(3, 20, { message: "restaurant name cannot be shorter than 3 character or longer than 20 character" })
    name: string

    @Field(type => Boolean)
    @IsBoolean()
    isVegan: Boolean
}