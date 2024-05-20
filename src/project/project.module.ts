import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import {
  projectProviders,
  // projectInterceptorProviders,
  // projectGuardProviders,
} from './project.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PolicyModule } from 'src/policy/policy.module';

@Module({
  imports: [DatabaseModule, PolicyModule],
  providers: [
    ProjectResolver,
    ProjectService,
    ...projectProviders,
    // ...projectInterceptorProviders,
    // ...projectGuardProviders,
  ],
})
export class ProjectModule {}
