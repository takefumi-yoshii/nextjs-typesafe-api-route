import ts, { factory } from "typescript";
// ______________________________________________________
//
// OUTPUT:
// interface Pages {
//   "/path/to": Query;
// }
//
export const createShim = (pagePath: string, hasQuery: boolean) => {
  const pathParams: string[] = [];
  pagePath.split("/").map((row) => {
    if (!row.match(/\[.*\]/)) return;
    const key = row.replace(/(\[|\])/g, "");
    pathParams.push(key);
  });
  const node: ts.TypeNode[] = [];
  if (hasQuery) {
    node.push(
      factory.createTypeReferenceNode(
        factory.createIdentifier("Query"),
        undefined
      )
    );
  }
  if (pathParams.length) {
    node.push(
      factory.createMappedTypeNode(
        undefined,
        factory.createTypeParameterDeclaration(
          factory.createIdentifier("k"),
          factory.createUnionTypeNode(
            pathParams.map((pathParam) =>
              factory.createLiteralTypeNode(
                factory.createStringLiteral(pathParam)
              )
            )
          ),
          undefined
        ),
        undefined,
        undefined,
        factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
      )
    );
  }
  if (!node.length) {
    node.push(factory.createTypeLiteralNode([]));
  }
  return factory.createInterfaceDeclaration(
    undefined,
    undefined,
    factory.createIdentifier("Pages"),
    undefined,
    undefined,
    [
      factory.createPropertySignature(
        undefined,
        factory.createStringLiteral(pagePath),
        undefined,
        factory.createIntersectionTypeNode(node)
      ),
    ]
  );
};
