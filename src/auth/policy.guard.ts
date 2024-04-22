import { ForbiddenError } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/enums';
import { Subjects } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policy =
      (await this.reflector.get<{ action: Action; subject: Subjects }[]>(
        'check_policy',
        context.getHandler(),
      )) || [];
    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.defineAbilityforUser(user);

    try {
      policy.forEach((policie) => ability.can(policie.action, policie.subject));
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
