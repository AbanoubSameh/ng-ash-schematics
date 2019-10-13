import { Rule, SchematicContext, Tree, chain, mergeWith, apply, url, move, MergeStrategy } from '@angular-devkit/schematics';
import { updateJsonFile } from '../utility/file-management';
import { getWorkspace } from '@schematics/angular/utility/config';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { join, Path } from "@angular-devkit/core";


export function mock(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = workspace.projects[options.project];
    const sourcePath = join(project.root as Path, "src");
    _context.addTask(new NodePackageInstallTask({ packageName: 'json-server concurrently' }));
    updateJsonFile(tree, "angular.json", (angularJson) => {
      angularJson.projects[options.project].architect.build.configurations["mock"] = {
        "fileReplacements": [
          {
            "replace": "src/environments/environment.ts",
            "with": "src/environments/environment.mock.ts"
          }
        ]
      }
      angularJson.projects[options.project].architect.serve.configurations["mock"] = {
        "browserTarget": `${options.project}:build:mock`
      }
    });
    updateJsonFile(tree, "package.json", (packageJson) => {
      packageJson.scripts["mock:server"] = "json-server --watch src/mocks/data.json"
      packageJson.scripts["serve:mock"] = "concurrently \"npm run mock:server\" \"ng serve -c mock\" "
    });


    return chain([mergeWith(apply(url("./files"), [move(sourcePath)]), MergeStrategy.Overwrite)]);
  };
}
