import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private currentDate: Date;
  private formatedDate: string;

  constructor() {
    this.currentDate = new Date();
    this.setMidnightUpdate();
    this.formatedDate = this.currentDate.toISOString().substring(0, 10)
  }

  private setMidnightUpdate() {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    setTimeout(() => {
      this.currentDate = new Date();
      this.setMidnightUpdate();
    }, msUntilMidnight);
  }

  public isPastDue(date: string): boolean {
    return date < this.formatedDate;
  }
}
