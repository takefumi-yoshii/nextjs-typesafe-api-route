import { factory } from "typescript";
// ______________________________________________________
//
// OUTPUT:
// interface Pages {
//   "/path/to": Query;
// }
//
export const createShim = (apiPath: string, hasQuery: boolean) =>
  factory.createInterfaceDeclaration(
    undefined,
    undefined,
    factory.createIdentifier("Pages"),
    undefined,
    undefined,
    [
      factory.createPropertySignature(
        undefined,
        factory.createStringLiteral(apiPath),
        undefined,
        hasQuery
          ? factory.createTypeReferenceNode(
              factory.createIdentifier("Query"),
              undefined
            )
          : factory.createTypeLiteralNode([])
      ),
    ]
  );
