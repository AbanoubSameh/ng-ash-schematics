import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class <%= classify(name) %>Service {
    constructor(private httpClient: HttpClient) { }
    
}