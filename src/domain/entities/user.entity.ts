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

  constructor(
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    full_name: string,
    token?: string,
    user_image?: string,
    grants?: Grant[],
  ) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.full_name = full_name;
    this.token = token;
    this.user_image = user_image;
    this.grants = grants;
  }
}

export class UserCompanyAggregate extends User {
  company: Company;

  constructor(user: User, company: Company) {
    super(
      user.id,
      user.email,
      user.first_name,
      user.last_name,
      user.full_name,
      user.token,
      user.user_image,
      user.grants,
    );

    this.company = company;
  }
}
