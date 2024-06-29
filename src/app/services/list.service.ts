import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { List } from '../interfaces/list.interface';
import { ListDto } from '../dto/list.dto';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiService = inject(ApiService);

  baseUrl: string = 'list';

  getLists(): Observable<List[]> {
    return this.apiService.getRequest(this.baseUrl) as Observable<List[]>;
  }

  createList(list: ListDto): Observable<List> {
    return this.apiService.postRequest(`${this.baseUrl}/new`, list) as Observable<List>;
  }

  updateList(list: ListDto, id: string): Observable<List> {
    return this.apiService.putRequest(`${this.baseUrl}/update`, list, id) as Observable<List>;
  }

  deleteList(id: string): Observable<List> {
    return this.apiService.deleteRequest(`${this.baseUrl}/delete`, id) as Observable<List>; //  THIS HAS TO ALSO DELETE ALL TASKS, AND ASK FOR CONFIRMATION
  }
}
