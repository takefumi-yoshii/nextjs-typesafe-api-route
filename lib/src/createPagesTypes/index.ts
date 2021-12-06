import ts from "typescript";
import type { Config } from "../types";
import { emitModulesShim } from "./emitModulesShim";
import { emitRootShim } from "./emitRootShim";
import { pagesFileInfo } from "./pagesFileInfo";
// ______________________________________________________
//
export function createPagesTypes({
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
  const pagesFileInfos = fileNames
    .filter(
      (fileName) =>
        !fileName.match(apiDir) &&
        fileName.match(pagesDir) &&
        ![
          `${pagesDir}/_app.tsx`,
          `${pagesDir}/_document.tsx`,
          `${pagesDir}/_error.tsx`,
          `${pagesDir}/_404.tsx`,
          `${pagesDir}/_500.tsx`,
        ].includes(fileName)
    )
    .map(pagesFileInfo(pagesDir, distDir, program));
  emitRootShim(distDir, moduleNameSpaece);
  emitModulesShim(pagesFileInfos, moduleNameSpaece);
}
