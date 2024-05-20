import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CustomerGroupPolicyService } from 'src/policy/group/customer-group-policy.service';

@Module({
  providers: [PolicyService, CustomerGroupPolicyService],
  exports: [PolicyService, CustomerGroupPolicyService],
})
export class PolicyModule {}
