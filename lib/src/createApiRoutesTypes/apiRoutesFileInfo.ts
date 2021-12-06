import * as ts from "typescript";
import type { ApiRoutesFileInfo } from "../types";
// ______________________________________________________
//
const typeAliases = [
  "GetHandler",
  "PostHandler",
  "PutHandler",
  "PatchHandler",
  "DeleteHandler",
];
function getMethodTypes(sourceFile?: ts.SourceFile) {
  const buf: string[] = [];
  if (sourceFile) {
    sourceFile.forEachChild((node) => {
      if (ts.isTypeAliasDeclaration(node)) {
        const name = node.name.escapedText.toString();
        if (typeAliases.includes(name)) {
          buf.push(name.replace("Handler", ""));
        }
      }
    });
  }
  return buf;
}
// ______________________________________________________
//
export function apiRoutesFileInfo(
  src: string,
  dist: string,
  pagesDir: string,
  program: ts.Program
) {
  return (filePath: string): ApiRoutesFileInfo => {
    const srcPath = filePath;
    const distArr = filePath.replace(src, dist).split("/");
    const distFileName = distArr[distArr.length - 1].replace(".ts", ".d.ts");
    const distDir = distArr.splice(0, distArr.length - 1).join("/");
    const distPath = `${distDir}/${distFileName}`;
    const sourceFile = program.getSourceFile(srcPath);
    const importPath = filePath.replace(".ts", "");
    const apiPath = filePath
      .replace(pagesDir, "")
      .replace("/index", "")
      .slice(0, -3);
    const methodTypes = getMethodTypes(sourceFile);
    return {
      srcPath,
      distPath,
      distFileName,
      distDir,
      filePath,
      methodTypes,
      importPath,
      apiPath,
    };
  };
}
