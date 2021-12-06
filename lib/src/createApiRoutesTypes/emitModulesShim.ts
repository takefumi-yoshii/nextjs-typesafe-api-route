import { emitFile } from "../emitFile";
import { printList } from "../printList";
import type { ApiRoutesFileInfo } from "../types";
import { createModuleShim } from "./createModuleShim";
// ______________________________________________________
//
export function emitModulesShim(
  apiRoutesFileInfos: ApiRoutesFileInfo[],
  moduleNameSpaece: string
) {
  apiRoutesFileInfos.map((info) => {
    emitFile(
      info.distDir,
      info.distPath,
      printList(
        createModuleShim({
          methods: info.methodTypes,
          apiPath: info.apiPath,
          importPath: info.importPath,
          moduleNameSpaece,
        })
      )
    );
  });
}
