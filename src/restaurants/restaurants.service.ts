import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(Restaurant) private readonly restaurantRepo: Repository<Restaurant>
    ) { }

    public async getAll(): Promise<Restaurant[]> {
        return await this.restaurantRepo.find()
    }
}
