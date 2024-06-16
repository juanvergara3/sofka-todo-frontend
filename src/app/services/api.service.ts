import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpClient = inject(HttpClient);

  getRequest(url: string, params: any) {
    if (params)
      return this.httpClient.get(`${this.getCompositeUrl(url)}/${params}`, {
        headers: {
          'Authorization': `Bearer ${environment.jwtDevOnlyToken}`,
        }
      });

    return this.httpClient.get(this.getCompositeUrl(url), {
      headers: {
        'Authorization': `Bearer ${environment.jwtDevOnlyToken}`,
      }
    });
  }

  postRequest(url: string, body: any) {
    let response = this.httpClient.post(this.getCompositeUrl(url), body, {
      headers: {
        'Authorization': `Bearer ${environment.jwtDevOnlyToken}`,
      }
    });

    return response;
  }

  patchRequest(url: string, body: any, id: string) {
    let response = this.httpClient.patch(`${this.getCompositeUrl(url)}/${id}`, body, {
      headers: {
        'Authorization': `Bearer ${environment.jwtDevOnlyToken}`,
      }
    });

    return response;
  }

  deleteRequest(url: string, id: string) {
    let response = this.httpClient.delete(`${this.getCompositeUrl(url)}/${id}`, {
      headers: {
        'Authorization': `Bearer ${environment.jwtDevOnlyToken}`,
      }
    });

    return response;
  }

  private getCompositeUrl(url: string): string {
    return `${environment.apiUrl}/${url}`;
  }
}
