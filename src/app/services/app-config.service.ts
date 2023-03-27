import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { Configuration } from '../models/configuration';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private configuration: Configuration = {} as Configuration;

  public get appConfig(): Configuration {
    return this.configuration;
  }

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public loadAppConfig(): Promise<Object> {
    const subscribe = this.httpClient.get('assets/config.json');

    return firstValueFrom(subscribe)
      .then(result => {
        this.configuration = result as Configuration;

        return Promise.resolve(result);
      });
  }
}
