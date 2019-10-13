import {
  Rule, SchematicContext, Tree, chain, mergeWith, apply, url, move, MergeStrategy,
   noop, schematic, 
  template
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { join } from 'path';
import { Path, strings } from '@angular-devkit/core';
import { schema  as NGRXFeatureOptions} from './schema';


export function ngrxFeature(options: NGRXFeatureOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = workspace.projects[options.project];
    const sourcePath = join(project.root as Path, "src");
    const appPath = join(sourcePath as Path, "app");
    const statePath = join(appPath as Path, "state");
    const rule = chain([
      tree.exists(statePath + '/state.module.ts') ? noop() : schematic('ngrx-store', { ...options }),
      mergeWith(apply(url("./files"), [template({
        ...strings, ...options
      }), move(statePath)]), MergeStrategy.Overwrite),
    ]);
    return rule(tree, _context);
  };
}
