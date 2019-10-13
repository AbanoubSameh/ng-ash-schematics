import { Rule, SchematicContext, Tree, apply, url, applyTemplates, move, chain, mergeWith, externalSchematic } from '@angular-devkit/schematics';
import { parseName } from '../utility/parse-name';
import { strings } from '@angular-devkit/core';
import { overwriteFiles } from '../utility/file-management';
import { schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function service(options: schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const parsedPath = parseName(options.path || '', options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;


    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...strings,
        'if-flat': (s: string) => options.flat ? '' : s,
        ...options
      }),
      move(parsedPath.path),
    ]);

    return chain([
      externalSchematic('@schematics/angular', 'service', { ...options }),
      overwriteFiles(parsedPath.path, [`${options.flat ? options.name : options.name + '/' + options.name}.service.ts`]),
      mergeWith(templateSource)
    ]);
  };
}
