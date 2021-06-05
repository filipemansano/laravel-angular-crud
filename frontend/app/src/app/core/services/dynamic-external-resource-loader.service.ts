import { ExternalResource, ExternalResourceType } from '../data/external-resource';
import { Injectable } from '@angular/core';

export interface ExternalResourceLoaderResponse {
  resource: string;
  loaded: boolean;
  type: ExternalResourceType;
  status: any;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicExternalResourceLoaderService {

  private resources: any = {};

  constructor() {
    for (const type of Object.entries(ExternalResourceType)) {
      this.resources[type[1]] = {};
    }
  }

  public loadExternalResources(...resources: ExternalResource[]): Promise<ExternalResourceLoaderResponse[]> {
    const promises: any[] = [];
    resources.forEach((resource) => promises.push(this.loadExternalResource(resource)));
    return Promise.all(promises);
  }

  public loadExternalResource(resource: ExternalResource): Promise<ExternalResourceLoaderResponse> {

    return new Promise((resolve, reject) => {
      if (this.resources[resource.type][resource.name] === undefined || !this.resources[resource.type][resource.name].loaded) {

        let resourceEl: HTMLScriptElement | HTMLLinkElement;

        switch (resource.type) {

          case ExternalResourceType.JAVASCRIPT:
            resourceEl = document.createElement('script');
            resourceEl.src = resource.src;
            resourceEl.type = 'text/javascript';
            break;

          case ExternalResourceType.STYLE:
            resourceEl = document.createElement('link');
            resourceEl.href = resource.src;
            resourceEl.rel = 'stylesheet';
            break;
        }

        resourceEl.onload = () => {
          this.resources[resource.type][resource.name] = {loaded: true};
          resolve({ resource: resource.name, loaded: true, type: resource.type, status: 'Loaded' });
        };

        resourceEl.onerror = (error: any) => resolve({ resource: resource.name, loaded: false, type: resource.type, status: error });
        document.getElementsByTagName('head')[0].appendChild(resourceEl);

      } else {
        resolve({ resource: resource.name, loaded: true, type: resource.type, status: 'Already Loaded' });
      }
    });
  }
}
