import { MiddlewareContext } from '@nestjs/graphql';
import { NextFn } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { FieldPermissionsError } from './dto/projectDto';

export const checkFieldPermissionsGraphql = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  // some logic
  const { info } = ctx;
  const { extensions } = info.parentType.getFields()[info.fieldName];

  /**
   * In a real-world application, the "userRole" variable
   * should represent the caller's (user) role (for example, "ctx.user.role").
   */
  const authorization = ctx.context.req.headers.authorization;
  const claimData = verify(authorization, 'thisIsSecret');
  const { tags } = claimData as any;
  const tagName = tags[0].tagName;
  let value: FieldPermissionsError | null = null;
  if (tagName === 'audience:default') {
    // or just "return null" to ignore
    value = FieldPermissionsError.FIELD_FORBIDDEN;
  } else if (tagName === 'audience:innerCircle') {
    value = await next();
  }
  return value;
};
