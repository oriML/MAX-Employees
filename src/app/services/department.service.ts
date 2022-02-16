import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IDepartment } from '../models/department.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departmentsUrl = 'http://localhost:5000/departments'
  
  public departmentsSubject$: Subject<IDepartment[]> = new Subject();

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(this.departmentsUrl).
    pipe(
      tap(data => this.departmentsSubject$.next(data))
    )
  }
}
