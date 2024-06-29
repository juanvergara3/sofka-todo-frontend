import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpClient = inject(HttpClient);

  getRequest(url: string, params?: any) {
    if (params)
      return this.httpClient.get(this.getCompositeUrl(url), params);

    return this.httpClient.get(this.getCompositeUrl(url));
  }

  postRequest(url: string, body: any, params?: any) {
    if (params)
      return this.httpClient.post(this.getCompositeUrl(url), body, params);

    return this.httpClient.post(this.getCompositeUrl(url), body);
  }

  putRequest(url: string, body: any, id: string, params?: any) {
    if (params)
      return this.httpClient.put(`${this.getCompositeUrl(url)}/${id}`, body, params);

    return this.httpClient.put(`${this.getCompositeUrl(url)}/${id}`, body);
  }

  deleteRequest(url: string, id: string, params?: any) {
    if (params)
      return this.httpClient.delete(`${this.getCompositeUrl(url)}/${id}`, params);

    return this.httpClient.delete(`${this.getCompositeUrl(url)}/${id}`);
  }

  private getCompositeUrl(url: string): string {
    return `${environment.apiUrl}/${url}`;
  }
}
