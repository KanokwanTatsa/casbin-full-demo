import { Injectable } from '@nestjs/common';
import { Enforcer, newEnforcer } from 'casbin';

@Injectable()
export class PolicyService {
  private projectPolicies: Promise<Enforcer>;
  constructor() {
    this.projectPolicies = newEnforcer(
      'src/policy/model.conf',
      'src/policy/policy.csv',
    );
  }

  getProjectPolicies(): Promise<Enforcer> {
    return this.projectPolicies;
  }
}
