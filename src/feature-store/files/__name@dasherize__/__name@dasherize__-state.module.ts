import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as from<%= classify(name) %> from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { <%= classify(name) %>Effects } from './store/effects';
import { <%= classify(name) %>Service } from './services/<%= dasherize(name) %>';

@NgModule({
  imports: [
    StoreModule.forFeature('<%= camelize(name) %>', from<%= classify(name) %>.reducer),
    EffectsModule.forFeature([<%= classify(name) %>Effects]),
  ],
  declarations: [],
  providers: [
    <%= classify(name) %>Service
  ]
})
export class <%= classify(name) %>StoreModule { }
