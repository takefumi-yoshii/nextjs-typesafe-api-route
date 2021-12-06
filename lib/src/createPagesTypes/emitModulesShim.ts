import { emitFile } from "../emitFile";
import { printList } from "../printList";
import type { PagesFileInfo } from "../types";
import { createModuleShim } from "./createModuleShim";
// ______________________________________________________
//
export function emitModulesShim(
  pagesFileInfos: PagesFileInfo[],
  moduleNameSpaece: string
) {
  pagesFileInfos.map((info) => {
    emitFile(
      info.distDir,
      info.distPath,
      printList(
        createModuleShim({
          typeAliases: info.typeAliases,
          pagePath: info.pagePath,
          importPath: info.importPath,
          moduleNameSpaece,
        })
      )
    );
  });
}
