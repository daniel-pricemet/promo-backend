import { UserByPrimaryDTO } from 'application/DTOs/user-by-primary.dto';
import { Session } from 'domain/entities/session.entity';
import { User } from 'domain/entities/user.entity';

export interface IUsersRepository {
  findByPrimary(dto: UserByPrimaryDTO): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  createSession(columns: Partial<Session>): Promise<void>;
  findSession(token: string): Promise<Session>;
}
