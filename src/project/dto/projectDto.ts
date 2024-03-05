import {
  Extensions,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Project } from '../project.entity';
import { checkFieldPermissionsGraphql } from '../project.middleware';

export enum FieldPermissionsError {
  FIELD_FORBIDDEN = 'FIELD_FORBIDDEN',
}

registerEnumType(FieldPermissionsError, {
  name: 'FieldPermissions',
});

@ObjectType('Project')
export class ProjectDTO {
  constructor(project: Project) {
    this.setter(project);
  }

  @Field(() => String)
  @Extensions({ action: 'view:name', scope: 'project' })
  id: string;
  @Field(() => String)
  @Extensions({ action: 'view:name', scope: 'project' })
  name: string;
  @Field(() => String)
  @Extensions({ action: 'view:price', scope: 'project' })
  price: string;
  @Field(() => String)
  @Extensions({ action: 'view:ppDate', scope: 'project' })
  ppDate: string;
  @Field(() => String)
  @Extensions({ action: 'view:icoDate', scope: 'project' })
  icoDate: string;
  @Field(() => String)
  @Extensions({ action: 'view:description', scope: 'project' })
  description: string;
  @Field(() => Date)
  @Extensions({ action: 'view:createAt', scope: 'project' })
  created_at: Date;
  @Field(() => Date)
  @Extensions({ action: 'view:updateAt', scope: 'project' })
  updated_at: Date;

  setter(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.price = project.price.toString();
    this.description = project.description;
    this.ppDate = project.ppDate.toDateString();
    this.icoDate = project.icoDate.toDateString();
  }
}
