import * as path from "path";
import * as ts from "typescript";
import { createModuleShim } from "./createModuleShim";
import { createProgram } from "./createProgram";
import { createShimRoot } from "./createShimRoot";
import { emitFile } from "./emitFile";
// ______________________________________________________
//
const targetAliases = [
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
        if (targetAliases.includes(name)) {
          buf.push(name.replace("Handler", ""));
        }
      }
    });
  }
  return buf;
}

function mapFileInfo(src: string, dist: string, pagesDir: string) {
  return (filePath: string) => {
    const srcPath = filePath;
    const distPath = filePath.replace(src, dist);
    const distArr = distPath.split("/");
    const distDir = distArr.splice(0, distArr.length - 1).join("/");
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
      distDir,
      filePath,
      methodTypes,
      importPath,
      apiPath,
    };
  };
}
// ______________________________________________________
//
const printer = ts.createPrinter();
// ______________________________________________________
//
const moduleNameSpaece = "@/types/pages/api";
const baseDir = path.resolve(".");
const pagesDir = path.resolve("src/pages");
const srcDir = path.resolve("src/pages/api");
const disrDir = path.resolve("src/types/pages/api");
const program = createProgram(baseDir);
const fileInfos = program
  .getRootFileNames()
  .filter((fileName) => fileName.match(srcDir))
  .map(mapFileInfo(srcDir, disrDir, pagesDir));
// ______________________________________________________
//
emitFile(
  disrDir,
  disrDir + "/index.d.ts",
  printer.printList(
    ts.ListFormat.MultiLine,
    ts.factory.createNodeArray(createShimRoot(moduleNameSpaece)),
    ts.createSourceFile("", "", ts.ScriptTarget.ES2015)
  )
);
// ______________________________________________________
//
fileInfos.map((info) => {
  const shim = createModuleShim({
    methods: info.methodTypes,
    apiPath: info.apiPath,
    importPath: info.importPath,
    moduleNameSpaece,
  });
  const body = printer.printList(
    ts.ListFormat.MultiLine,
    ts.factory.createNodeArray(shim),
    ts.createSourceFile("", "", ts.ScriptTarget.ES2015)
  );
  console.log(body);
  emitFile(info.distDir, info.distPath, body);
});
