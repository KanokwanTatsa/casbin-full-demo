import { Request } from 'express';
import { ContextType, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import {
  IContextMetadata,
  IGraphqlData,
  IRestAPIMetadata,
} from 'src/shared/interfaces/context.interface';
import { ContextTypeName, HTTPMethod } from 'src/shared/enums/context.enum';

export const getContextMetadata = (
  context: ExecutionContext,
): IContextMetadata => {
  if (context.getType<ContextType | 'graphql'>() === 'graphql') {
    const graphqlContext = GqlExecutionContext.create(context).getHandler();
    return {
      type: ContextTypeName.graphql,
      data: <IGraphqlData>{
        nameOrPath: graphqlContext.name,
        method: HTTPMethod.post,
      },
    };
  }
  const restApiRequest: Request = context.switchToHttp().getRequest();
  return {
    type: ContextTypeName.restApi,
    data: <IRestAPIMetadata>{
      nameOrPath: restApiRequest?.path,
      method: restApiRequest?.method as HTTPMethod,
    },
  };
};

export const getContextType = (context: ExecutionContext): ContextTypeName => {
  const contextType = context.getType<ContextType | 'graphql'>();
  if (contextType === 'graphql') {
    return ContextTypeName.graphql;
  } else if (contextType === 'http') {
    return ContextTypeName.restApi;
  } else {
    return ContextTypeName[contextType];
  }
};
