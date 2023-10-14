import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RestaurantGQL } from "./gql-objects/restaurant.object";
import { log } from "console";
import { CreateRestaurantReqDto } from "./dtos/create-restaurant.dto";
import { RestaurantsService } from "./restaurants.service";
import { Restaurant } from "./entities/restaurant.entity";

@Resolver(resolverFor => RestaurantGQL)
export class RestaurantResolver {
    // inject services 
    constructor(
        private readonly restaurantService: RestaurantsService
    ) { }
    public data: RestaurantGQL[] = [
        {
            id: 0,
            name: "Maccdonals",
            isVegan: false
        },
        {
            id: 1,
            name: "KFC",
            isVegan: false
        }
    ]

    @Query(returns => RestaurantGQL)
    restaurantInfo(@Args("name") restaurantName: string): RestaurantGQL {
        let r: RestaurantGQL = this.data.find(r => r.name === restaurantName)
        if (r) return r
        return null
    }

    @Query(returns => [RestaurantGQL])
    async allRestaurants(): Promise<RestaurantGQL[]> {
        let restaurants: RestaurantGQL[] = []
        const dbRestaurants: Restaurant[] = await this.restaurantService.getAll()
        for (const dbRestaurant of dbRestaurants) {
            restaurants.push(
                {
                    id: dbRestaurant.id,
                    name: dbRestaurant.name,
                    isVegan: dbRestaurant.isVegan,
                }
            )
        }
        return restaurants
    }

    @Query(returns => [RestaurantGQL])
    selectVeganRestaurants(@Args("type") type: string): RestaurantGQL[] {
        const vegans: RestaurantGQL[] = this.data.filter(r => r.isVegan === true)
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
            id: null,
            name: dto.name,
            isVegan: dto.isVegan
        })
        return true
    }
}