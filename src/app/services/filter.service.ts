import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }
  getFilterConfig(): Observable<any[]> {
    return this.http.get<any[]>('../../assets/data/filter-config.json');
  }
}
