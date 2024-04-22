import { Global, Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  providers: [CaslAbilityFactory, ],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
