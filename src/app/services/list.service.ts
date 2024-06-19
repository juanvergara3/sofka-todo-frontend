import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../interfaces/list.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiService = inject(ApiService);

  baseUrl: string = 'list';

  getLists(): Observable<List[]> {
    return this.apiService.getRequest(this.baseUrl) as Observable<List[]>;
  }

  createList(list: List): Observable<List> {
    if (list.color.startsWith('#'))
      list.color = list.color.substring(1);

    return this.apiService.postRequest(`${this.baseUrl}/new`, list) as Observable<List>;
  }

  updateList(list: List, id: string): Observable<List> {
    if (list.color.startsWith('#'))
      list.color = list.color.substring(1);

    return this.apiService.putRequest(`${this.baseUrl}/update`, list, id) as Observable<List>;
  }

  deleteList(id: string): Observable<List> {
    return this.apiService.deleteRequest(`${this.baseUrl}/delete`, id) as Observable<List>;
  }
}
