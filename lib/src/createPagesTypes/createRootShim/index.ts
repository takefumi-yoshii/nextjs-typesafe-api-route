import * as ts from "typescript";
import { factory } from "typescript";
import { createInterfacePlaceholders } from "./createInterfacePlaceholders";
// ______________________________________________________
//
export const createRootShim = (moduleNameSpaece: string) => [
  factory.createModuleDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    factory.createStringLiteral(moduleNameSpaece),
    factory.createModuleBlock([...createInterfacePlaceholders()])
  ),
];
