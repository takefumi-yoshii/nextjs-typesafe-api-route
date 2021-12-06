import { factory } from "typescript";
// ______________________________________________________
//
// OUTPUT:
// interface GetResBody {}
// interface GetReqQuery {}
// interface GetReqBody {}
// interface PostResBody {}
// interface PostReqQuery {}
// interface PostReqBody {}
// interface PutResBody {}
// interface PutReqQuery {}
// interface PutReqBody {}
// interface PatchResBody {}
// interface PatchReqQuery {}
// interface PatchReqBody {}
// interface DeleteResBody {}
// interface DeleteReqQuery {}
// interface DeleteReqBody {}
//
const interfacePlaceholders = [
  "GetResBody",
  "GetReqQuery",
  "GetReqBody",
  "PostResBody",
  "PostReqQuery",
  "PostReqBody",
  "PutResBody",
  "PutReqQuery",
  "PutReqBody",
  "PatchResBody",
  "PatchReqQuery",
  "PatchReqBody",
  "DeleteResBody",
  "DeleteReqQuery",
  "DeleteReqBody",
];
export const createInterfacePlaceholders = () =>
  interfacePlaceholders.map((identifier) =>
    factory.createInterfaceDeclaration(
      undefined,
      undefined,
      factory.createIdentifier(identifier),
      undefined,
      undefined,
      []
    )
  );
