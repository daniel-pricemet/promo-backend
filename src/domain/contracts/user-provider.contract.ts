import { UserCompanyAggregate } from 'domain/entities/user.entity';

export interface IUserProvider {
  user: UserCompanyAggregate;
}
