import { factory } from "typescript";
// ______________________________________________________
//
// OUTPUT:
// import type { NextApiRequest, NextApiResponse } from "next";
//
export const createImportDeclarations = () =>
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
          factory.createIdentifier("NextApiRequest")
        ),
        factory.createImportSpecifier(
          false,
          undefined,
          factory.createIdentifier("NextApiResponse")
        ),
      ])
    ),
    factory.createStringLiteral("next"),
    undefined
  );
