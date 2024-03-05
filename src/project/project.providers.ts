import { DataSource } from 'typeorm';
import { ProjectSchema } from './project.schema';
import { Project } from './project.entity';
import { ProjectResponsePolicyInterceptor } from './project-respose-policy.interceptor';

export const projectProviders = [
  {
    provide: 'PROJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository<Project>(ProjectSchema),
    inject: ['DATA_SOURCE'],
  },
];

export const projectInterceptorProviders = [
  {
    provide: 'PROJECT_RESPONSE_POLICY_INTERCEPTOR',
    useClass: ProjectResponsePolicyInterceptor,
  },
];

export const projectGuardProviders = [
  {
    provide: 'PROJECT_GUARD',
    useClass: ProjectResponsePolicyInterceptor,
  },
];
