import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Employee } from '../models/employee.model';
import { FilterConfig } from '../models/filter-config.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(filterConfig?: FilterConfig): Observable<Employee[]> {
    return this.http.get<Employee[]>('../../assets/data/employees-data.json')
      .pipe(
        map(x => {
          if (filterConfig) {
            return x.filter(
              y => (!filterConfig.job || y.job === filterConfig.job)
                && (!filterConfig.condition || y.condition === filterConfig.condition)
                && (!filterConfig.access || y.accessType === filterConfig.access)
            );
          } else {

            return x;
          }
        })
      );
  }
}
