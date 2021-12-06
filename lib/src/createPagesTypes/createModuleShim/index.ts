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
}) => {
  const hasQuery = !!typeAliases.length;
  const node: (ts.ImportDeclaration | ts.ModuleDeclaration)[] = [];
  if (hasQuery) {
    node.push(createImportDeclarations(typeAliases, importPath));
  }
  node.push(
    factory.createModuleDeclaration(
      undefined,
      [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
      factory.createStringLiteral(moduleNameSpaece),
      factory.createModuleBlock([createShim(pagePath, hasQuery)])
    )
  );
  return node;
};
