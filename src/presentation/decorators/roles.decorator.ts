import { SetMetadata } from '@nestjs/common';

export const Grants = (...roles: string[]) => SetMetadata('roles', roles);
