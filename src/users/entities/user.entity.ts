import { Column, Entity } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";

@Entity()
export class User extends CoreEntity {
    @Column()
    username: string

    @Column()
    email: string

    @Column() 
    password: string

    @Column()
    role: Role
}

type Role = "client" | "owner" | "delivery"
