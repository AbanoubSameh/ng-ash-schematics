import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { <%= classify(name) %>ActionTypes, <%= classify(name) %>Actions } from './actions';


@Injectable()
export class <%= classify(name) %>Effects {


  @Effect()
  load<%= classify(name) %>s$ = this.actions$.pipe(
    ofType(<%= classify(name) %>ActionTypes.Load<%= classify(name) %>s),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<<%= classify(name) %>Actions>) {}

}
