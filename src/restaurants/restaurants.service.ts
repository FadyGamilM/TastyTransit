import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestaurantReqDto } from './dtos/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(Restaurant) private readonly restaurantRepo: Repository<Restaurant>
    ) { }

    public async getAll(): Promise<Restaurant[]> {
        return await this.restaurantRepo.find()
    }

    public async Create(data: CreateRestaurantReqDto): Promise<Restaurant> {
        // first create a business (ts) entity
        let r = this.restaurantRepo.create({
            name: data.name,
            isVegan: data.isVegan
        })

        // then save it into the database 
        return await this.restaurantRepo.save(r)
    }
}
