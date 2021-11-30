import * as ts from "typescript";
import { factory } from "typescript";

export const createModuleShim = ({
  methods,
  apiPath,
  importPath,
  moduleNameSpaece,
}: {
  methods: string[];
  apiPath: string;
  importPath: string;
  moduleNameSpaece: string;
}) => [
  factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      true,
      undefined,
      factory.createNamedImports(
        methods.map((method) =>
          factory.createImportSpecifier(
            false,
            undefined,
            factory.createIdentifier(method + "Handler")
          )
        )
      )
    ),
    factory.createStringLiteral(importPath),
    undefined
  ),
  factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      true,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(
          false,
          undefined,
          factory.createIdentifier("ReqBody")
        ),
        factory.createImportSpecifier(
          false,
          undefined,
          factory.createIdentifier("ReqQuery")
        ),
        factory.createImportSpecifier(
          false,
          undefined,
          factory.createIdentifier("ResBody")
        ),
      ])
    ),
    factory.createStringLiteral("@/types/api"),
    undefined
  ),
  factory.createModuleDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    factory.createStringLiteral(moduleNameSpaece),
    factory.createModuleBlock([
      ...methods.map((method) =>
        factory.createInterfaceDeclaration(
          undefined,
          undefined,
          factory.createIdentifier(method + "ResBody"),
          undefined,
          undefined,
          [
            factory.createPropertySignature(
              undefined,
              factory.createStringLiteral(apiPath),
              undefined,
              factory.createTypeReferenceNode(
                factory.createIdentifier("ResBody"),
                [
                  factory.createTypeReferenceNode(
                    factory.createIdentifier(method + "Handler"),
                    undefined
                  ),
                ]
              )
            ),
          ]
        )
      ),
      ...methods.map((method) =>
        factory.createInterfaceDeclaration(
          undefined,
          undefined,
          factory.createIdentifier(method + "ReqQuery"),
          undefined,
          undefined,
          [
            factory.createPropertySignature(
              undefined,
              factory.createStringLiteral(apiPath),
              undefined,
              factory.createTypeReferenceNode(
                factory.createIdentifier("ReqQuery"),
                [
                  factory.createTypeReferenceNode(
                    factory.createIdentifier(method + "Handler"),
                    undefined
                  ),
                ]
              )
            ),
          ]
        )
      ),
      ...methods.map((method) =>
        factory.createInterfaceDeclaration(
          undefined,
          undefined,
          factory.createIdentifier(method + "ReqBody"),
          undefined,
          undefined,
          [
            factory.createPropertySignature(
              undefined,
              factory.createStringLiteral(apiPath),
              undefined,
              factory.createTypeReferenceNode(
                factory.createIdentifier("ReqBody"),
                [
                  factory.createTypeReferenceNode(
                    factory.createIdentifier(method + "Handler"),
                    undefined
                  ),
                ]
              )
            ),
          ]
        )
      ),
    ])
  ),
];
