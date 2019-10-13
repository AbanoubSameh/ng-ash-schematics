import { join, Path } from "@angular-devkit/core";
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
  externalSchematic,
  schematic,
  noop
} from "@angular-devkit/schematics";
import { getWorkspace } from "@schematics/angular/utility/config";
import { schema as ProjectTemplateOptions } from "./schema";
import { overwriteFiles, updateJsonFile } from "../utility/file-management";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";


export function ngAdd(options: ProjectTemplateOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = workspace.projects[options.project];
    const sourcePath = join(project.root as Path, "src");
    const appPath = join(sourcePath as Path, "app");
    _context.addTask(new NodePackageInstallTask({ packageName: '@ngx-translate/core @ngx-translate/http-loader' }));
    if (options.baseHrefasShortName && options.shortName) {
      updateJsonFile(tree, "angular.json", (angularJson) => {
        angularJson.projects[options.project].architect.build.configurations["baseHref"] = `/${options.shortName}/`;
      });
    }
    const rule = chain([
      overwriteFiles(appPath, ["app.module.ts", "app-routing.module.ts", "app.component.ts", "app.component.html"]),
      overwriteFiles(sourcePath, ["environment.ts", "environment.prod.ts"], ['environments']),
      mergeWith(apply(url("./files"), [move(appPath)]), MergeStrategy.Default),
      mergeWith(apply(url("./src-files"), [move(sourcePath)]), MergeStrategy.Overwrite),
      mergeWith(apply(url("./other-files"), [move(project.root)]), MergeStrategy.Overwrite),
      externalSchematic('@schematics/angular', 'module', {
        name: 'ui-modules',
        commonModule: false,
        flat: false,
        routing: options.routing,
        path: options.path,
        sourceDir: '/' + appPath,
        module: 'app',
        spec: false,
      }),
      externalSchematic('@schematics/angular', 'module', {
        name: 'core',
        commonModule: false,
        flat: false,
        routing: false,
        path: '/' + appPath + '/' + 'ui-modules',
        sourceDir: '/' + appPath + '/' + 'ui-modules',
        module: 'ui-modules',
        spec: false,
      }),
      externalSchematic('@schematics/angular', 'module', {
        name: 'shared',
        commonModule: true,
        flat: false,
        routing: false,
        path: '/' + appPath + '/' + 'ui-modules',
        sourceDir: '/' + sourcePath + '/' + 'ui-modules',
        spec: false,
      }),
      options.ngrx ? schematic('ngrx-store', { ...options }) : noop(),
      options.mock ? schematic('mock', { ...options }) : noop(),
      options.feature ? schematic('feature', { ...options, path: '/' + appPath + '/' + 'ui-modules', name: undefined }) : noop(),
      options.postBuildEnv ? schematic('post-build-environment', { ...options }) : noop()
    ]);
    return rule(tree, _context);
  };
}