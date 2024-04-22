import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from './casl/casl.module';
import { Task } from './task/task.entity';
import { User } from './users/users.entity';

@Module({
  /* Cette propriété spécifie les modules qui doivent être importés dans le module en cours de définition.
   * Les modules importés rendent leurs fonctionnalités disponibles dans le module actuel.
   * Vous pouvez importer des modules Nest.js internes, des modules personnalisés que vous avez créés ou des modules
   * provenant de bibliothèques externes. */
  imports: [
    TaskModule,
    AuthModule,
    UsersModule,
    CaslModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todoapp',
      entities: [User, Task],
      synchronize: true,
      retryAttempts: 2,
    }),
  ],

  /* Cette propriété répertorie les contrôleurs qui font partie du module. Les contrôleurs sont responsables
   * de la gestion des requêtes HTTP pour une partie spécifique de votre application */
  controllers: [AppController],

  /* Les fournisseurs sont des classes qui peuvent injecter des dépendances dans d'autres classes.
   *  Cette propriété spécifie les fournisseurs qui sont disponibles dans le module actuel.
   *  Ils peuvent être des services, des gestionnaires de bases de données, des classes utilitaires, etc */
  providers: [AppService],
})
export class AppModule {}
