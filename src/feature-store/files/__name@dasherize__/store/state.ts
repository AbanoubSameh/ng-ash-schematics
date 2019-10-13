import { <%= classify(name) %> } from './../models/<%= dasherize(name) %>';


export interface <%= classify(name) %>State {
    list: <%= classify(name) %>[];
}

export const <%= classify(name) %>InitialState: <%= classify(name) %>State = {
    list: [],
};