import { schema as FeatureOptions } from './schema.d';
import { Rule, SchematicContext, Tree, chain, schematic, noop } from '@angular-devkit/schematics';

export function feature(options: FeatureOptions): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      schematic('feature-module', { ...options, path: options.path && options.path.includes('state') ? options.path.replace('state', 'ui-modules') : options.path }),
      options.ngrx ? schematic('feature-store', {
        ...options, path: options.path && options.path.includes('ui-modules') ? options.path.replace('ui-modules', 'state') : options.path
      }) : noop() 
    ]);
  };
}
