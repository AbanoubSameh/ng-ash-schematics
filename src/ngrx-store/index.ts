import { Rule, SchematicContext, Tree, chain, externalSchematic, mergeWith, apply, url, move, MergeStrategy } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { join } from 'path';
import { Path } from '@angular-devkit/core';
import {
  NodePackageInstallTask,
} from '@angular-devkit/schematics/tasks';
import { overwriteFiles } from '../utility/file-management';
import { schema as NGRXStoreOptions } from './schema';

export function ngrxStore(options: NGRXStoreOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = workspace.projects[options.project];
    const sourcePath = join(project.root as Path, "src");
    const appPath = join(sourcePath as Path, "app");
    const statePath = join(appPath as Path, "state");
    _context.addTask(new NodePackageInstallTask({ packageName: '@ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools' }));
    const rule = chain([
      externalSchematic('@schematics/angular', 'module', {
        name: 'state',
        commonModule: false,
        flat: false,
        routing: false,
        path: options.path,
        sourceDir: '/' + appPath,
        module: 'app',
        spec: false,
      }),
      overwriteFiles(statePath as Path, ["state.module.ts"]),
      mergeWith(apply(url("./files"), [move(statePath)]), MergeStrategy.Overwrite),
    ]);

    return rule(tree, _context);
  };
}
