import { Rule, SchematicContext, Tree, externalSchematic, mergeWith, apply, url, move, MergeStrategy, template, chain } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export function moduleFeature(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const createUIModule = externalSchematic('@schematics/angular', 'module', {
      ...options
    })
    const copyFiles = mergeWith(apply(url("./files"), [template({
      ...strings, ...options
    }), move(options.path)]), MergeStrategy.Overwrite)

    return chain([createUIModule, copyFiles]);
  };
}
