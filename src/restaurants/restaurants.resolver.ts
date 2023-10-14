import { Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";

@Resolver(resolverFor => Restaurant)
export class RestaurantResolver {

    @Query(returns => Restaurant)
    restaurantInfo(): Restaurant {
        let r: Restaurant = new Restaurant()
        r.name = "Pizza King"
        return r
    }

    @Query(returns => [Restaurant])
    allRestaurants(): Restaurant[] {
        const data: Restaurant[] = [
            {
                name: "Maccdonals"
            },
            {
                name : "KFC"
            }
        ]
        return data
    }
}