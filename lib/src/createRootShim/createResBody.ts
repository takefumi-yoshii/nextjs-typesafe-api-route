import * as ts from "typescript";
import { factory } from "typescript";
// ______________________________________________________
//
// OUTPUT:
// type ResBody<T> = T extends ApiHandler<unknown, any, infer I> ? I : never;
//
export const createResBody = () =>
  factory.createTypeAliasDeclaration(
    undefined,
    undefined,
    factory.createIdentifier("ResBody"),
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
        factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
        factory.createInferTypeNode(
          factory.createTypeParameterDeclaration(
            factory.createIdentifier("I"),
            undefined,
            undefined
          )
        ),
      ]),
      factory.createTypeReferenceNode(factory.createIdentifier("I"), undefined),
      factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword)
    )
  );
