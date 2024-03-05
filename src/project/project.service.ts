import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectInput, UpdateProjectInput } from './input';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
  ) {}
  getProjects(): string {
    return 'This action returns all projects';
  }
  getProject(id: string): string {
    return `This action returns a #${id} project`;
  }
  createProject(input: CreateProjectInput): string {
    console.log(input);
    return 'This action adds a new project';
  }
  updateProject(id: string, input: UpdateProjectInput): string {
    console.log(input);
    return `This action updates a #${id} project`;
  }
  removeProject(id: string): string {
    return `This action removes a #${id} project`;
  }
  async findAll(): Promise<Project[]> {
    const projects = await this.projectRepository.find();
    return projects;
  }
}
