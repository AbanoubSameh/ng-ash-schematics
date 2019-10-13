import { EnvironmentService } from './environment.service';
import { environment } from 'src/environments/environment';

export const EnvironmentServiceFactory = () => {
  // Create env
  const env = new EnvironmentService();

  // Read environment variables from browser window
  const browserWindow: any = window || {};
  const browserWindowEnv: any = browserWindow.__env || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  if (environment.production) {
    for (const key in browserWindowEnv) {
      if (browserWindowEnv.hasOwnProperty(key)) {
        env[key] = (window as any).__env[key];
      }
    }
  } else {
    env.apiUrl = environment.apiUrl;
  }

  return env;
};

export const EnvironmentServiceProvider = {
  provide: EnvironmentService,
  useFactory: EnvironmentServiceFactory,
  deps: []
};
