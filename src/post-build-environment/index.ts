import { Rule, SchematicContext, Tree, chain, mergeWith, apply, url, move, MergeStrategy } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { join, Path } from '@angular-devkit/core';
import { updateJsonFile } from '../utility/file-management';
import { SchematicsException } from "@angular-devkit/schematics";
import * as ts from 'typescript';
import { addSymbolToNgModuleMetadata } from '../utility/ast.utils';
import { InsertChange } from '../utility/change';

export function postBuildEnvironment(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = workspace.projects[options.project];
    const sourcePath = join(project.root as Path, "src");
    const coreModulePath = join(sourcePath as Path, "app", "ui-modules", "core");

    if (!tree.exists(coreModulePath + '/core.module.ts'))
      throw new SchematicsException(`core module is not installed`);

    const text = tree.read(coreModulePath + '/core.module.ts');
    const sourceText = text ? text.toString('utf-8') : null;
    if (sourceText != null) {
      const source = ts.createSourceFile(coreModulePath + '/core.module.ts', sourceText, ts.ScriptTarget.Latest, true);
      const changes = addSymbolToNgModuleMetadata(source, coreModulePath + '/core.module.ts', 'providers', 'EnvironmentServiceProvider', './services/environment.service.provider', 'EnvironmentServiceProvider');
      const recorder = tree.beginUpdate(coreModulePath + '/core.module.ts');
      for (const change of changes) {
        if (change instanceof InsertChange) {
          recorder.insertLeft(change.pos, change.toAdd);
        }
      }
      tree.commitUpdate(recorder);
    }


    const indexFilePath = `${sourcePath}/index.html`
    const content: Buffer | null = tree.read(indexFilePath);
    let strContent: string = '';
    if (content) strContent = content.toString();
    if (!strContent.includes('<script src="env.js"></script>')) {
      const appendIndex = strContent.indexOf('</head>');
      const contentToAppend = ' <!-- Environment variables -->\n <script src="env.js"></script> \n';
      const updatedContent = strContent.slice(0, appendIndex) + contentToAppend + strContent.slice(appendIndex);
      tree.overwrite(indexFilePath, updatedContent);
    }


    updateJsonFile(tree, "angular.json", (angularJson) => {
      let buildOpAssets: string[] = angularJson.projects[options.project].architect.build.options["assets"];
      if (!buildOpAssets.includes("src/env.js"))
        angularJson.projects[options.project].architect.build.options["assets"] = [...buildOpAssets, "src/env.js"];
    });

    const rule = chain([
      mergeWith(apply(url("./src-files"), [move(sourcePath)]), MergeStrategy.Overwrite),
      mergeWith(apply(url("./files"), [move(coreModulePath)]), MergeStrategy.Overwrite),
    ]);

    return rule;
  };
}
