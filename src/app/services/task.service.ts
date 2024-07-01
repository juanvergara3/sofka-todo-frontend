import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { TaskDto } from '../dto/task.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiService = inject(ApiService);

  baseUrl: string = 'task';

  getTasks(paramValue: string): Observable<Task[]> {
    let httpParams = new HttpParams();

    httpParams = httpParams.append('listId', paramValue);

    return this.apiService.getRequest(this.baseUrl, { params: httpParams }) as Observable<Task[]>;
  }

  createTask(task: TaskDto): Observable<Task> {
    return this.apiService.postRequest(`${this.baseUrl}/new`, task) as Observable<Task>;
  }

  updateTask(task: TaskDto, id: string): Observable<Task> {
    return this.apiService.putRequest(`${this.baseUrl}/update`, task, id) as Observable<Task>;
  }

  deleteTask(id: string): Observable<Task> {
    return this.apiService.deleteRequest(`${this.baseUrl}/delete`, id) as Observable<Task>;
  }

  deleteTasksByListId(listId: string): Observable<{ deletedCount?: number }> {
    return this.apiService.deleteRequest(`${this.baseUrl}/deleteByList`, listId) as Observable<{ deletedCount?: number }>;
  }
}
