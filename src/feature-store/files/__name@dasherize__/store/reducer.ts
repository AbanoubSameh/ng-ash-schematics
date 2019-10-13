import { <%= classify(name) %>Actions, <%= classify(name) %>ActionTypes } from './actions';
import { <%= classify(name) %>InitialState, <%= classify(name) %>State } from './state';


export function reducer(state = <%= classify(name) %>InitialState, action: <%= classify(name) %>Actions): <%= classify(name) %>State {
  switch (action.type) {

    case <%= classify(name) %>ActionTypes.Load<%= classify(name) %>s:
      return state;

    default:
      return state;
  }
}
