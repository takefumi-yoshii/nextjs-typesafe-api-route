import * as ts from "typescript";
import { factory } from "typescript";
import { createImportDeclarations } from "./createImportDeclarations";
import { createShim } from "./createShim";
// ______________________________________________________
//
export const createModuleShim = ({
  typeAliases,
  pagePath,
  importPath,
  moduleNameSpaece,
}: {
  typeAliases: string[];
  pagePath: string;
  importPath: string;
  moduleNameSpaece: string;
}) => [
  createImportDeclarations(typeAliases, importPath),
  factory.createModuleDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    factory.createStringLiteral(moduleNameSpaece),
    factory.createModuleBlock([createShim(pagePath, !!typeAliases.length)])
  ),
];
