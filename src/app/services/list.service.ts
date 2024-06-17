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
}
