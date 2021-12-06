export type FileInfo = {
  srcPath: string;
  distPath: string;
  distFileName: string;
  distDir: string;
  filePath: string;
  importPath: string;
};

export type PagesFileInfo = FileInfo & {
  typeAliases: string[];
  pagePath: string;
};

export type ApiRoutesFileInfo = FileInfo & {
  methodTypes: string[];
  apiPath: string;
};

export type Config = {
  baseDir: string;
  distDir: string;
  pagesDir: string;
  moduleNameSpaece: string;
};
