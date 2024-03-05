import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { PolicyService } from '../policy/policy.service';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private policyService: PolicyService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const parentType = info.parentType.name;

      // const queryPolicy = this.attachQueryPolicy(gqlContext);
      // gqlContext.setType;

      // console.log('info', info);
      console.log('parentType', parentType);
      return true;
    }
    return true;
  }

  attachQueryPolicy(ctx: GqlExecutionContext) {
    switch (ctx.getInfo().fieldName) {
      case 'projects':
        return { queryPolicy: this.policyService.getProjectPolicies() };
      case 'project':
        return { queryPolicy: 'cache-first' };
      case 'createProject':
        return { queryPolicy: 'no-cache' };
      case 'updateProject':
        return { queryPolicy: 'no-cache' };
      case 'removeProject':
        return { queryPolicy: 'no-cache' };
      default:
        return { queryPolicy: '' };
    }
  }
}
