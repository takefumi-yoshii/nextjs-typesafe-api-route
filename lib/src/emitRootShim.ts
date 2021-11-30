import { createRootShim } from "./createRootShim";
import { emitFile } from "./emitFile";
import { printList } from "./printList";
// ______________________________________________________
//
export function emitRootShim(disrDir: string, moduleNameSpaece: string) {
  emitFile(
    disrDir,
    disrDir + "/index.d.ts",
    printList(createRootShim(moduleNameSpaece))
  );
}
