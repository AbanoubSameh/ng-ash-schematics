import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public apiUrl = environment.apiUrl;

  // Add more environment variables that should be overwritten on release

  constructor() { }
}
