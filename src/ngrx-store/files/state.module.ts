import { NgModule } from '@angular/core';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { State } from './state';
import { EffectsModule } from '@ngrx/effects';

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot({}, { metaReducers }),
        EffectsModule.forRoot([]),
        !environment.production ? StoreDevtoolsModule.instrument() : []]
})
export class StateModule { }
