declare namespace Express {
  import { UserCompanyAggregate } from 'domain/entities/user.entity';

  export interface Request {
    user: UserCompanyAggregate;
  }
}
