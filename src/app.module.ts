import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { dumbSecret } from './auth/constant';
import { join } from 'path';
import { PermissionModule } from './permission/permission.module';
import { DatabaseModule } from './database/database.module';
import { PolicyModule } from './policy/policy.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    JwtModule.register({
      global: true,
      secret: dumbSecret.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ProjectModule,
    UserModule,
    AuthModule,
    PermissionModule,
    DatabaseModule,
    PolicyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
