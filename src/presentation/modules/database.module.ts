import { Module, Global, CacheModule } from '@nestjs/common';
import { UsersRepository } from 'infrastructure/database/repositories/knex/users.repository';
import { INJECTABLES } from 'shared/injectables';

const AliasedUsersRepository = {
  provide: INJECTABLES.IUsersRepository,
  useClass: UsersRepository,
};

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: [AliasedUsersRepository],
  exports: [AliasedUsersRepository],
})
export class DatabaseModule {}
