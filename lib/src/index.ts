import config from "./config";
import { createApiRoutesTypes } from "./createApiRoutesTypes";
import { createPagesTypes } from "./createPagesTypes";
import { createProgram } from "./createProgram";
import type { Config } from "./types";
// ______________________________________________________
//
function main(config: Config) {
  const apiDir = config.pagesDir + "/api";
  const program = createProgram(config.baseDir);
  const fileNames = program.getRootFileNames();
  const param = {
    ...config,
    apiDir,
    program,
    fileNames,
  };
  createPagesTypes(param);
  createApiRoutesTypes(param);
}

main(config);
