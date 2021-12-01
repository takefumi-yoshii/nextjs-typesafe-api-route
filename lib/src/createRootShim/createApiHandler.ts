import * as ts from "typescript";
import { factory } from "typescript";
// ______________________________________________________
//
// OUTPUT:
// export type ApiHandler<Q = unknown, B = any, R = unknown> = (
//   req: Omit<NextApiRequest, "body" | "query"> & {
//       query: Partial<Q>;
//       body?: B;
//   },
//   res: NextApiResponse<Data<R> | Error>
//   ) => void | Promise<void>;
//
export const createApiHandler = () =>
  factory.createTypeAliasDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier("ApiHandler"),
    [
      factory.createTypeParameterDeclaration(
        factory.createIdentifier("Q"),
        undefined,
        factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
      ),
      factory.createTypeParameterDeclaration(
        factory.createIdentifier("B"),
        undefined,
        factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
      ),
      factory.createTypeParameterDeclaration(
        factory.createIdentifier("R"),
        undefined,
        factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
      ),
    ],
    factory.createFunctionTypeNode(
      undefined,
      [
        factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("req"),
          undefined,
          factory.createIntersectionTypeNode([
            factory.createTypeReferenceNode(factory.createIdentifier("Omit"), [
              factory.createTypeReferenceNode(
                factory.createIdentifier("NextApiRequest"),
                undefined
              ),
              factory.createUnionTypeNode([
                factory.createLiteralTypeNode(
                  factory.createStringLiteral("body")
                ),
                factory.createLiteralTypeNode(
                  factory.createStringLiteral("query")
                ),
              ]),
            ]),
            factory.createTypeLiteralNode([
              factory.createPropertySignature(
                undefined,
                factory.createIdentifier("query"),
                undefined,
                factory.createTypeReferenceNode(
                  factory.createIdentifier("Partial"),
                  [
                    factory.createTypeReferenceNode(
                      factory.createIdentifier("Q"),
                      undefined
                    ),
                  ]
                )
              ),
              factory.createPropertySignature(
                undefined,
                factory.createIdentifier("body"),
                factory.createToken(ts.SyntaxKind.QuestionToken),
                factory.createTypeReferenceNode(
                  factory.createIdentifier("B"),
                  undefined
                )
              ),
            ]),
          ]),
          undefined
        ),
        factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("res"),
          undefined,
          factory.createTypeReferenceNode(
            factory.createIdentifier("NextApiResponse"),
            [
              factory.createUnionTypeNode([
                factory.createTypeReferenceNode(
                  factory.createIdentifier("Data"),
                  [
                    factory.createTypeReferenceNode(
                      factory.createIdentifier("R"),
                      undefined
                    ),
                  ]
                ),
                factory.createTypeReferenceNode(
                  factory.createIdentifier("Error"),
                  undefined
                ),
              ]),
            ]
          ),
          undefined
        ),
      ],
      factory.createUnionTypeNode([
        factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
        factory.createTypeReferenceNode(factory.createIdentifier("Promise"), [
          factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
        ]),
      ])
    )
  );
