import { TAnySchema, TObject, Type } from '@sinclair/typebox';

export function responseSchema(data: Record<string, TAnySchema>): TObject {
  return Type.Object({
    ...data,
    message: Type.Optional(Type.String()),
    success: Type.Boolean(),
  });
}
