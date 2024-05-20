import { Injectable } from '@nestjs/common';
import { Enforcer, newEnforcer } from 'casbin';

@Injectable()
export class CustomerGroupPolicyService {
  private customerGroupPolicies: Promise<Enforcer>;
  constructor() {
    this.customerGroupPolicies = newEnforcer(
      'src/policy/group/customer-group-model.conf',
      'src/policy/group/customer-group-policy.csv',
    );
    this.customerGroupPolicies.then((policy) => {
      return policy.addFunction(
        'arrayContainMatch',
        (request: string, policy: string) => {
          console.log({ request, policy });
          return this.arrayContainMatch([request, policy]);
        },
      );
    });
  }

  async getCustomerGroupPolicies(): Promise<Enforcer> {
    return this.customerGroupPolicies;
  }

  arrayContainMatch(arg: string[]) {
    const [arg1, arg2] = arg;
    const request = arg1.split(':');
    const listPolicy = arg2.split(':');

    const pass = listPolicy.every((policy) => request.includes(policy));
    return pass;
  }
}
