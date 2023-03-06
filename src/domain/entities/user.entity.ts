import { Company } from './company.entity';
import { Grant } from './grant.entity';

export class User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  token?: string;
  user_image?: string;
  grants?: Grant[];

  constructor(obj: Partial<User>) {
    Object.assign(this, obj);
  }
}

export class UserCompanyAggregate extends User {
  company: Company;

  constructor(user: User, company: Company) {
    super(user);
    this.company = company;
  }
}
