import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type UserTag = {
  tagId: number;
  tagName: string;
};
export type User = {
  userId: number;
  username: string;
  password: string;
  investorLevel: string;
  tags: UserTag[];
};

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
    {
      userId: 4,
      username: 'testA',
      password: 'testA123',
      investorLevel: 'UNHW',
      tags: [
        {
          tagId: 1,
          tagName: 'onboard_incomplete',
        },
      ],
    },
    {
      userId: 5,
      username: 'testB',
      password: 'testB123',
      investorLevel: 'UNHW',
      tags: [
        {
          tagId: 1,
          tagName: 'onboard_complete',
        },
      ],
    },
    {
      userId: 6,
      username: 'testC',
      password: 'testC123',
      investorLevel: 'UNHW',
      tags: [
        {
          tagId: 1,
          tagName: 'onboard_complete',
        },
        {
          tagId: 2,
          tagName: 'kcy_complete',
        },
      ],
    },
    {
      userId: 6,
      username: 'testD',
      password: 'testD123',
      investorLevel: 'UNHW',
      tags: [
        {
          tagId: 1,
          tagName: 'onboard_complete',
        },
        {
          tagId: 2,
          tagName: 'kcy_complete',
        },
        {
          tagId: 3,
          tagName: 'id_card_complete',
        },
      ],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
