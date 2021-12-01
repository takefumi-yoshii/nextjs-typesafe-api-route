import * as ts from "typescript";
import { factory } from "typescript";
import { createImportDeclarations } from "./createImportDeclarations";
import { createShim } from "./createShim";
// ______________________________________________________
//
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
  createImportDeclarations(methods, importPath),
  factory.createModuleDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    factory.createStringLiteral(moduleNameSpaece),
    factory.createModuleBlock([
      ...methods.map((method) => createShim(method, apiPath, "ResBody")),
      ...methods.map((method) => createShim(method, apiPath, "ReqQuery")),
      ...methods.map((method) => createShim(method, apiPath, "ReqBody")),
    ])
  ),
];
