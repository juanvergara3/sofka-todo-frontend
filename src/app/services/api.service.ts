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
      return this.httpClient.get(`${this.getCompositeUrl(url)}/${params}`);

    return this.httpClient.get(this.getCompositeUrl(url));
  }

  postRequest(url: string, body: any) {
    return this.httpClient.post(this.getCompositeUrl(url), body);;
  }

  patchRequest(url: string, body: any, id: string) {
    return this.httpClient.patch(`${this.getCompositeUrl(url)}/${id}`, body);
  }

  deleteRequest(url: string, id: string) {
    return this.httpClient.delete(`${this.getCompositeUrl(url)}/${id}`);
  }

  private getCompositeUrl(url: string): string {
    return `${environment.apiUrl}/${url}`;
  }
}
