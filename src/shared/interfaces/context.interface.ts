import { ContextTypeName, HTTPMethod } from 'src/shared/enums/context.enum';

export interface IContextMetadata {
  type: ContextTypeName;
  data: IGraphqlData | IRestAPIMetadata;
}

export interface IGraphqlData {
  nameOrPath: string;
  method: HTTPMethod;
}

export interface IRestAPIMetadata {
  nameOrPath: string;
  method: HTTPMethod;
}
