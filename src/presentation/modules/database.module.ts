import { Module, Global, CacheModule } from '@nestjs/common';
import { ClientsRepository } from 'infrastructure/database/repositories/clients.repository';
import { ApprovalLevelsRepository } from 'infrastructure/database/repositories/knex/approval-levels.repository';
import { CaptainsRepository } from 'infrastructure/database/repositories/knex/captains.repository';
import { ChannelsRepository } from 'infrastructure/database/repositories/knex/channels-repository';
import { ClustersRepository } from 'infrastructure/database/repositories/knex/clusters.repository';
import { DefaultsRepository } from 'infrastructure/database/repositories/knex/defaults.repository';
import { DiscountRangeRepository } from 'infrastructure/database/repositories/knex/discount-range.repository';
import { DiscountRequestsRepository } from 'infrastructure/database/repositories/knex/discount-requests.repository';
import { DiscountSceneryRepository } from 'infrastructure/database/repositories/knex/discount-sceneries.repository';
import { FactoriesRepository } from 'infrastructure/database/repositories/knex/factories.repository';
import { FatorIcmsRepository } from 'infrastructure/database/repositories/knex/fator-icms-repository';
import { IndustryMarginRepository } from 'infrastructure/database/repositories/knex/industry-margins.repository';
import { MarketMarginRepository } from 'infrastructure/database/repositories/knex/market-margins.repository';
import { MarketPriceRepository } from 'infrastructure/database/repositories/knex/market-prices.repository';
import { MaterialsRepository } from 'infrastructure/database/repositories/knex/materials.repository';
import { PoliticsRepository } from 'infrastructure/database/repositories/knex/politics-repository';
import { RegionsRepository } from 'infrastructure/database/repositories/knex/regions.repository';
import { RelativityChannelsRepository } from 'infrastructure/database/repositories/knex/relativity-channels.repository';
import { RequestsRepository } from 'infrastructure/database/repositories/knex/requests.repository';
import { RolesRepository } from 'infrastructure/database/repositories/knex/roles.repository';
import { RoundingsRepository } from 'infrastructure/database/repositories/knex/roundings.repository';
import { SceneriesRepository } from 'infrastructure/database/repositories/knex/sceneries.repository';
import { SensitivityRepository } from 'infrastructure/database/repositories/knex/sensitivity.repository';
import { UsersRepository } from 'infrastructure/database/repositories/knex/users.repository';
import { INJECTABLES } from 'shared/injectables';

const AliasedUsersRepository = {
  provide: INJECTABLES.IUsersRepository,
  useClass: UsersRepository,
};

const AliasedRolesRepository = {
  provide: INJECTABLES.IRolesRepository,
  useClass: RolesRepository,
};

const AliasedRegionsRepository = {
  provide: INJECTABLES.IRegionsRepository,
  useClass: RegionsRepository,
};

const AliasedClustersRepository = {
  provide: INJECTABLES.IClustersRepository,
  useClass: ClustersRepository,
};

const AliasedCaptainRepository = {
  provide: INJECTABLES.ICaptainsRepository,
  useClass: CaptainsRepository,
};

const AliasedMaterialsRepository = {
  provide: INJECTABLES.IMaterialsRepository,
  useClass: MaterialsRepository,
};

const AliasedRelativityChannelsRepository = {
  provide: INJECTABLES.IRelativityChannelsRepository,
  useClass: RelativityChannelsRepository,
};

const AliasedChannelsRepository = {
  provide: INJECTABLES.IChannelsRepository,
  useClass: ChannelsRepository,
};

const AliasedRoundingsRepository = {
  provide: INJECTABLES.IRoundingsRepository,
  useClass: RoundingsRepository,
};

const AliasedSensitivityRepository = {
  provide: INJECTABLES.ISensitivityRepository,
  useClass: SensitivityRepository,
};

const AliasedMarketMarginsRepository = {
  provide: INJECTABLES.IMarketMarginRepository,
  useClass: MarketMarginRepository,
};

const AliasedIndustryMarginsRepository = {
  provide: INJECTABLES.IIndustryMarginRepository,
  useClass: IndustryMarginRepository,
};

const AliasedPoliticsRepository = {
  provide: INJECTABLES.IPoliticsRepository,
  useClass: PoliticsRepository,
};

const AliasedMarketPricesRepository = {
  provide: INJECTABLES.IMarketPricesRepository,
  useClass: MarketPriceRepository,
};

const AliasedClientsRepository = {
  provide: INJECTABLES.IClientsRepository,
  useClass: ClientsRepository,
};

const AliasedFactoriesRepository = {
  provide: INJECTABLES.IFactoriesRepository,
  useClass: FactoriesRepository,
};

const AliasedDiscountRangesRepository = {
  provide: INJECTABLES.IDiscountRangesRepository,
  useClass: DiscountRangeRepository,
};

const AliasedSceneryRepository = {
  provide: INJECTABLES.ISceneryRepository,
  useClass: SceneriesRepository,
};

const AliasedRequestsRepository = {
  provide: INJECTABLES.IRequestsRepository,
  useClass: RequestsRepository,
};

const AliasedFatorIcmsRepository = {
  provide: INJECTABLES.IFatorIcmsRepository,
  useClass: FatorIcmsRepository,
};

const AlisedSceneryDiscountRepository = {
  provide: INJECTABLES.IDiscountSceneryRepository,
  useClass: DiscountSceneryRepository,
};

const AliasedDefaultRepository = {
  provide: INJECTABLES.IConfigRepository,
  useClass: DefaultsRepository,
};

const AliasedDiscountRequestsRepository = {
  provide: INJECTABLES.IDiscountRequestRepository,
  useClass: DiscountRequestsRepository,
};

const AliasedApprovalLevelsRepository = {
  provide: INJECTABLES.IApprovalLevelsRepository,
  useClass: ApprovalLevelsRepository,
};

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: [
    AliasedRegionsRepository,
    AliasedRolesRepository,
    AliasedUsersRepository,
    AliasedClustersRepository,
    AliasedCaptainRepository,
    AliasedMaterialsRepository,
    AliasedRelativityChannelsRepository,
    AliasedChannelsRepository,
    AliasedRoundingsRepository,
    AliasedSensitivityRepository,
    AliasedMarketMarginsRepository,
    AliasedMarketPricesRepository,
    AliasedPoliticsRepository,
    AliasedIndustryMarginsRepository,
    AliasedClientsRepository,
    AliasedFactoriesRepository,
    AliasedDiscountRangesRepository,
    AliasedSceneryRepository,
    AliasedRequestsRepository,
    AliasedDefaultRepository,
    AliasedFatorIcmsRepository,
    AlisedSceneryDiscountRepository,
    AliasedApprovalLevelsRepository,
    AliasedDiscountRequestsRepository,
  ],
  exports: [
    AliasedRegionsRepository,
    AliasedSceneryRepository,
    AliasedRolesRepository,
    AliasedUsersRepository,
    AliasedClustersRepository,
    AliasedCaptainRepository,
    AliasedMaterialsRepository,
    AliasedRelativityChannelsRepository,
    AliasedChannelsRepository,
    AliasedRequestsRepository,
    AliasedRoundingsRepository,
    AliasedSensitivityRepository,
    AliasedMarketMarginsRepository,
    AliasedPoliticsRepository,
    AliasedMarketPricesRepository,
    AliasedIndustryMarginsRepository,
    AliasedClientsRepository,
    AliasedFactoriesRepository,
    AliasedDiscountRangesRepository,
    AliasedDefaultRepository,
    AliasedFatorIcmsRepository,
    AlisedSceneryDiscountRepository,
    AliasedApprovalLevelsRepository,
    AliasedDiscountRequestsRepository,
  ],
})
export class DatabaseModule {}
