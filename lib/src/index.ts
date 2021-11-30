import * as path from "path";
import { createProgram } from "./createProgram";
import { emitModulesShim } from "./emitModulesShim";
import { emitRootShim } from "./emitRootShim";
import { mapFileInfo } from "./mapFileInfo";
// ______________________________________________________
//
function main() {
  const moduleNameSpaece = "@/types/pages/api";
  const baseDir = path.resolve(".");
  const pagesDir = path.resolve("src/pages");
  const srcDir = path.resolve("src/pages/api");
  const disrDir = path.resolve("src/types/pages/api");
  const program = createProgram(baseDir);
  const fileInfos = program
    .getRootFileNames()
    .filter((fileName) => fileName.match(srcDir))
    .map(mapFileInfo(srcDir, disrDir, pagesDir, program));
  // ______________________________________________________
  //
  emitRootShim(disrDir, moduleNameSpaece);
  emitModulesShim(fileInfos, moduleNameSpaece);
}
main();
