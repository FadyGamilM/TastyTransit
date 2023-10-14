import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";
import { log } from "console";
import { CreateRestaurantReqDto } from "./dtos/create-restaurant.dto";

@Resolver(resolverFor => Restaurant)
export class RestaurantResolver {
    public data: Restaurant[] = [
        {
            name: "Maccdonals",
            isVegan: false
        },
        {
            name: "KFC",
            isVegan: false
        }
    ]

    @Query(returns => Restaurant)
    restaurantInfo(@Args("name") restaurantName: string): Restaurant {
        let r: Restaurant = this.data.find(r => r.name === restaurantName)
        if (r) return r
        return null
    }

    @Query(returns => [Restaurant])
    allRestaurants(): Restaurant[] {
        return this.data
    }

    @Query(returns => [Restaurant])
    selectVeganRestaurants(@Args("type") type: string): Restaurant[] {
        const vegans: Restaurant[] = this.data.filter(r => r.isVegan === true)
        return vegans
    }

    /* MUTATION */
    // @Mutation(returns => Boolean)
    // createRestaurant(
    //     @Args("name") name: string,
    //     @Args("isVegan") isVegan: Boolean
    // ): Boolean {
    //     const isFound = this.data.find(r => r.name === name)
    //     if (isFound) return false
    //     this.data.push({
    //         name,
    //         isVegan
    //     })
    //     return true
    // }
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() dto: CreateRestaurantReqDto
    ): Boolean {
        const isFound = this.data.find(r => dto.name === r.name)
        if (isFound) return false
        this.data.push({
            name: dto.name,
            isVegan: dto.isVegan
        })
        return true
    }
}