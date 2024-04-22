import { Action } from 'src/enums';
import { Subjects } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { SetMetadata } from '@nestjs/common';

export const CheckPolicies = (
  ...policies: { action: Action; subject: Subjects }[]
) => SetMetadata('check_policy', policies);
