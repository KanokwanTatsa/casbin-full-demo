import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { ProjectDTO } from './dto/projectDto';
import { UseInterceptors } from '@nestjs/common';
import { ProjectResponsePolicyInterceptor } from './project-respose-policy.interceptor';
import { CreateProjectInput } from './input';

@Resolver()
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @UseInterceptors(ProjectResponsePolicyInterceptor)
  @Query(() => [ProjectDTO], { name: 'projects' })
  async projects(): Promise<ProjectDTO[]> {
    const projects = await this.projectService.findAll();
    const projectDTOs: ProjectDTO[] = [];
    for (const project of projects) {
      projectDTOs.push(new ProjectDTO(project));
    }
    return projectDTOs;
  }

  @UseInterceptors(ProjectResponsePolicyInterceptor)
  @Query(() => [ProjectDTO], { name: 'project' })
  async project(): Promise<ProjectDTO> {
    const projects = await this.projectService.findAll();
    return new ProjectDTO(projects?.[0]);
  }

  //   @Query(() => ProjectDTO)
  //   async project(@Args('id') id: string): Promise<ProjectDTO> {
  //     return this.projectService.findOne(id);
  //   }

  @Mutation(() => ProjectDTO)
  async createProject(
    @Args('input') input: CreateProjectInput,
  ): Promise<ProjectDTO> {
    return this.projectService.createProject(input);
  }

  //   @Mutation(() => ProjectDTO)
  //   async updateProject(
  //     @Args('id') id: string,
  //     @Args('input') input: QueryProjectInput,
  //   ): Promise<Project> {
  //     return this.projectService.update(id, input);
  //   }

  //   @Mutation(() => ProjectDTO)
  //   async removeProject(@Args('id') id: string): Promise<ProjectDTO> {
  //     return this.projectService.remove(id);
  //   }
}
