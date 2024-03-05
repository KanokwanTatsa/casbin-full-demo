import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql';
import { PolicyService } from '../policy/policy.service';
import { verify } from 'jsonwebtoken';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ProjectResponsePolicyInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private userTags: string[] = [];
  constructor(private policyService: PolicyService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    if (context.getType<GqlContextType>() === 'graphql') {
      return next.handle().pipe(
        mergeMap(async (data) => {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              data[key] = await this.enforceResponsePolicy(context, data[key]);
            }
          }
          return data;
        }),
      );
    }
  }

  async enforceResponsePolicy(ctx: ExecutionContext, data: any) {
    const gqlContext = GqlExecutionContext.create(ctx);
    const authorization = gqlContext.getContext().req.headers.authorization;
    const claimData = verify(authorization, 'thisIsSecret');
    const { tags } = claimData as any;
    const tagName = tags.length > 0 ? tags[0].tagName : 'audience:default';
    switch (gqlContext.getInfo().fieldName) {
      case 'projects':
        const policy = await this.policyService.getProjectPolicies();
        const keys = Object.keys(data);
        const updatedData = Object.assign({}, data);
        for (const key of keys) {
          console.log(tagName, data.name, `view:${key}`);
          const result = await policy.enforce(
            tagName,
            data.name,
            `view:${key}`,
          );
          console.log('result', result);
          if (!result) {
            updatedData[key] = 'FIELD_FORBIDDEN';
          }
        }
        return updatedData;
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
