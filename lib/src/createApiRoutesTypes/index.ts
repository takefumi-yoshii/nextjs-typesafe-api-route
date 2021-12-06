import ts from "typescript";
import type { Config } from "../types";
import { apiRoutesFileInfo } from "./apiRoutesFileInfo";
import { emitModulesShim } from "./emitModulesShim";
import { emitRootShim } from "./emitRootShim";
// ______________________________________________________
//
export function createApiRoutesTypes({
  program,
  fileNames,
  apiDir,
  distDir,
  pagesDir,
  moduleNameSpaece,
}: Config & {
  program: ts.Program;
  fileNames: readonly string[];
  apiDir: string;
}) {
  const apiRoutesFileInfos = fileNames
    .filter((fileName) => fileName.match(apiDir))
    .map(apiRoutesFileInfo(apiDir, `${distDir}/api`, pagesDir, program));

  emitRootShim(`${distDir}/api`, `${moduleNameSpaece}/api`);
  emitModulesShim(apiRoutesFileInfos, `${moduleNameSpaece}/api`);
}
