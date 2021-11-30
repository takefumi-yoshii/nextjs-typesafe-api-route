import * as fs from "fs-extra";
// ______________________________________________________
//
export const emitFile = (
  distDir: string,
  fileName: string,
  fileBody: string
) => {
  if (!fs.existsSync(distDir)) {
    fs.mkdirsSync(distDir);
  }
  console.log(distDir, fileName, fileBody);
  fs.writeFileSync(fileName, fileBody);
};
