import { EntitySchema } from 'typeorm';
import { Project } from './project.entity';

export const ProjectSchema = new EntitySchema<Project>({
  name: 'project',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    price: {
      name: 'price',
      type: 'decimal',
    },
    ppDate: {
      name: 'pp_date',
      type: 'timestamp',
    },
    icoDate: {
      name: 'ico_date',
      type: 'timestamp',
    },
    name: {
      name: 'name',
      type: 'varchar',
    },
    description: {
      name: 'description',
      type: 'varchar',
    },
    visibleType: {
      name: 'visible_type',
      type: 'varchar',
      nullable: true,
    },
  },
});
