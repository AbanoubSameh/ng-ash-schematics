import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { Path, parseJson, JsonParseMode } from "@angular-devkit/core";
import { join } from "path";
import { SchematicsException } from "@angular-devkit/schematics";

interface UpdateJsonFn<T> {
  (obj: T): T | void;
}


export function updateJsonFile<T>(host: Tree, path: string, callback: UpdateJsonFn<any>): Tree {
  const source = host.read(path);
  if (source) {
    const sourceText = source.toString('utf-8');
    const json = parseJson(sourceText, JsonParseMode.Loose);
    try {
      callback(json as any as T);
      host.overwrite(path, JSON.stringify(json, null, 2));
    } catch (error) {
      throw new SchematicsException(`cannot update ${path} file`);
    }
  }

  return host;
}

export function deleteFile(host: Tree, path: string) {
  if (host.exists(path)) {
    host.delete(path);
  }
}

export function overwriteFiles(path: Path, files: string[], parentPath: string[] = []) {
  return (host: Tree) => {
    files.forEach(filename => {
      deleteFile(host, join(path, ...parentPath, filename));
    });
    return host;
  };
}