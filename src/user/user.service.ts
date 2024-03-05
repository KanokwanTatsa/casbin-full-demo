import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'juristic',
      password: 'juristic123',
      investorLevel: 'UHNW',
      tags: [
        {
          tagId: 1,
          tagName: 'audience:innerCircle',
        },
      ],
    },
    {
      userId: 2,
      username: 'normalUser',
      password: 'normalUser123',
      investorLevel: 'retail',
      tags: [],
    },
    {
      userId: 3,
      username: 'richer',
      password: 'richer123',
      investorLevel: 'UNHW',
      tags: [],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
