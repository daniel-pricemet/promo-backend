import { Module, Global } from '@nestjs/common';
import { AxiosDataFetcherProvider } from 'infrastructure/injectables/axios-data-fetcher.injectable';
import { INJECTABLES } from 'shared/injectables';
import { UserProvider } from 'infrastructure/injectables/user-provider.injectables';

const AliasedDataFetcherProvider = {
  provide: INJECTABLES.IDataFetcherProvider,
  useClass: AxiosDataFetcherProvider,
};

const AliasedUserProvider = {
  provide: INJECTABLES.IUserProvider,
  useClass: UserProvider,
};

@Global()
@Module({
  providers: [AliasedDataFetcherProvider, AliasedUserProvider],
  exports: [AliasedDataFetcherProvider, AliasedUserProvider],
})
export class ExternalModule {}
