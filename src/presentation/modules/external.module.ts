import { Module, Global } from '@nestjs/common';
import { AxiosDataFetcherProvider } from 'infrastructure/external/axios-data-fetcher.external';
import { INJECTABLES } from 'shared/injectables';

const AliasedDataFetcherProvider = {
  provide: INJECTABLES.IDataFetcherProvider,
  useClass: AxiosDataFetcherProvider,
};


@Global()
@Module({
  providers: [AliasedDataFetcherProvider],
  exports: [AliasedDataFetcherProvider],
})
export class ExternalModule {}
