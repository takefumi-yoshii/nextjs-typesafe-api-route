import { emitFile } from "../emitFile";
import { printList } from "../printList";
import { createRootShim } from "./createRootShim";
// ______________________________________________________
//
export function emitRootShim(disrDir: string, moduleNameSpaece: string) {
  emitFile(
    disrDir,
    disrDir + "/index.d.ts",
    printList(createRootShim(moduleNameSpaece))
  );
}
