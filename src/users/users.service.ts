import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
    }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });

        return this.repo.save(user);
    }

    find(email: string) {
        return this.repo.find({ email });
    }

    findOne(id: number) {
        return this.repo.findOne(id);
    }

    async update(id: number, attrs: Partial<UserEntity>) {
        const user = await this.findOne(id);
        if(!user) {
            throw new Error('User not found!');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if(!user) {
            throw new Error('User not found!');
        }
        return this.repo.remove(user);
    }
}
