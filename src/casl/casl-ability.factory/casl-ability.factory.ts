import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  createMongoAbility,
} from '@casl/ability';
import { Task } from 'src/task/task.entity';
import { User } from 'src/users/users.entity';
import { Action, Role } from 'src/enums';
import { Injectable } from '@nestjs/common';

export type Subjects = InferSubjects<typeof Task | typeof User> | 'all';

//const ability = createMongoAbility<[Action, Subjects]>();
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbilityforUser(user: User) {
    //const { can, cannot } = ability;
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.includes(Role.ADMIN)) {
      can(Action.Manage, User);
    } else {
      can(Action.Read, Task, { userId: user.id });
      can(Action.Update, Task, { userId: user.id });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
