import { createModuleShim } from "./createModuleShim";
import { emitFile } from "./emitFile";
import { printList } from "./printList";
// ______________________________________________________
//
type FileInfo = {
  srcPath: string;
  distPath: string;
  distFileName: string;
  distDir: string;
  filePath: string;
  methodTypes: string[];
  importPath: string;
  apiPath: string;
};
// ______________________________________________________
//
export function emitModulesShim(
  fileInfos: FileInfo[],
  moduleNameSpaece: string
) {
  fileInfos.map((info) => {
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
