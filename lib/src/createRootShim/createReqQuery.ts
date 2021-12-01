import * as ts from "typescript";
import { factory } from "typescript";
// ______________________________________________________
//
// OUTPUT:
// type ReqQuery<T> = T extends ApiHandler<unknown, infer I, any> ? I : never;
//
export const createReqQuery = () =>
  factory.createTypeAliasDeclaration(
    undefined,
    undefined,
    factory.createIdentifier("ReqQuery"),
    [
      factory.createTypeParameterDeclaration(
        factory.createIdentifier("T"),
        undefined,
        undefined
      ),
    ],
    factory.createConditionalTypeNode(
      factory.createTypeReferenceNode(factory.createIdentifier("T"), undefined),
      factory.createTypeReferenceNode(factory.createIdentifier("ApiHandler"), [
        factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
        factory.createInferTypeNode(
          factory.createTypeParameterDeclaration(
            factory.createIdentifier("I"),
            undefined,
            undefined
          )
        ),
        factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
      ]),
      factory.createTypeReferenceNode(factory.createIdentifier("I"), undefined),
      factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword)
    )
  );
