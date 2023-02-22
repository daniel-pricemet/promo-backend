import { UserByPrimaryDTO } from 'application/DTOs/user-by-primary.dto';
import { User } from 'domain/entities/user.entity';

export interface IUsersRepository {
  findByPrimary(dto: UserByPrimaryDTO): Promise<User | undefined>;
  findAll(): Promise<User[]>;
}
