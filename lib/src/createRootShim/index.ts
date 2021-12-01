import * as ts from "typescript";
import { factory } from "typescript";
import { createApiHandler } from "./createApiHandler";
import { createImportDeclarations } from "./createImportDeclarations";
import { createInterfacePlaceholders } from "./createInterfacePlaceholders";
import { createReqBody } from "./createReqBody";
import { createReqQuery } from "./createReqQuery";
import { createResBody } from "./createResBody";
// ______________________________________________________
//
export const createRootShim = (moduleNameSpaece: string) => [
  createImportDeclarations(),
  factory.createModuleDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    factory.createStringLiteral(moduleNameSpaece),
    factory.createModuleBlock([
      createApiHandler(),
      createReqQuery(),
      createReqBody(),
      createResBody(),
      ...createInterfacePlaceholders(),
    ])
  ),
];
