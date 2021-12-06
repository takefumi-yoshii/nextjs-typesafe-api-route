import * as ts from "typescript";
import type { PagesFileInfo } from "../types";
// ______________________________________________________
//
const typeAliases = ["Query"];
function getMethodTypes(sourceFile?: ts.SourceFile) {
  const buf: string[] = [];
  if (sourceFile) {
    sourceFile.forEachChild((node) => {
      if (ts.isTypeAliasDeclaration(node)) {
        const name = node.name.escapedText.toString();
        if (typeAliases.includes(name)) {
          buf.push(name);
        }
      }
    });
  }
  return buf;
}
// ______________________________________________________
//
export function pagesFileInfo(src: string, dist: string, program: ts.Program) {
  return (filePath: string): PagesFileInfo => {
    const srcPath = filePath;
    const distArr = filePath.replace(src, dist).split("/");
    const distFileName = distArr[distArr.length - 1].replace(".tsx", ".d.tsx");
    const distDir = distArr.splice(0, distArr.length - 1).join("/");
    const distPath = `${distDir}/${distFileName}`;
    const sourceFile = program.getSourceFile(srcPath);
    const importPath = filePath.replace(".tsx", "");
    const pagePath = filePath
      .replace(src, "")
      .replace("/index", "")
      .slice(0, -4);
    const typeAliases = getMethodTypes(sourceFile);
    return {
      srcPath,
      distPath,
      distFileName,
      distDir,
      filePath,
      typeAliases,
      importPath,
      pagePath: pagePath === "" ? "/" : pagePath,
    };
  };
}
