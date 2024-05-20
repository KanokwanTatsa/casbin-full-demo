import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CustomerGroupPolicyService } from 'src/policy/group/customer-group-policy.service';
import { getContextMetadata, getContextType } from 'src/shared/utils/context';
import {
  IContextMetadata,
  IRestAPIMetadata,
} from 'src/shared/interfaces/context.interface';
import { ContextTypeName, HTTPMethod } from 'src/shared/enums/context.enum';
import { AuthService } from 'src/auth/auth.service';
import { getRequest } from '../utils/request';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly policyService: CustomerGroupPolicyService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const contextMetadata: IContextMetadata = getContextMetadata(context);
    const contextType = getContextType(context);

    try {
      if (
        contextMetadata.type === ContextTypeName.restApi &&
        (contextMetadata.data as IRestAPIMetadata)?.nameOrPath === '/health' &&
        (contextMetadata.data as IRestAPIMetadata)?.method === HTTPMethod.get
      ) {
        return true;
      }

      const request = getRequest(context);
      const jwtToken = request?.headers[`authorization`]?.split(' ');
      if (!jwtToken?.[1]) {
        return true;
      }

      const user = await this.authService.decodeJWTUser(jwtToken?.[1]);
      const groupUser: string = (user?.tags ?? []).reduce((prev, cur) => {
        return `${prev ? `${prev}:` : `${prev}`}${cur.tagName}`;
      }, '');
      const policy = await this.policyService.getCustomerGroupPolicies();
      // const subject = `group:${groupUser}`;
      const subject = `${groupUser}`;
      const object = `${contextType.toLowerCase()}:${contextMetadata.data.nameOrPath}`;
      const action = contextMetadata.data.method;
      const effect = await policy.enforce(subject, object, action);
      console.log({ subject, object, action, effect });
      return effect;
    } catch (e) {
      console.error(`[PermissionFeatureGuard#canActivate] ${e?.toString()}.`);
      return false;
    }
  }
}
