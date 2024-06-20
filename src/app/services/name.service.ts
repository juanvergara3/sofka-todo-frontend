import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  apiService = inject(ApiService);

  nameSignal: WritableSignal<string> = signal<string>('');

  getNameApi() {
    return this.apiService.getRequest(`auth/name`);
  }

  updateName() {
    this.getNameApi().subscribe(
      (res: any) => {
        this.nameSignal.set(res.name)
      }
    )
  }

  setName(name: string) {
    this.nameSignal.set(name);
  }
}
