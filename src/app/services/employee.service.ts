import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { IEmployee } from '../models/employee.interface'
import { Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { IDepartment } from '../models/department.interface';
import { tap } from 'rxjs/operators';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  departments: IDepartment[] = [];
  
  private employeesUrl = 'http://localhost:5000/employees/'

  public employeeSubject$: Subject<IEmployee[]> = new Subject();


  public employeeBeaviorSubject$: BehaviorSubject<IEmployee[]> = new BehaviorSubject([
    {
      id: "",
      fullName: "",
      img: "",
      departmentId: "",
      hireDate: ""
    }
  ]);

  
  employeesList!: Observable<IEmployee[]>;
  
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private departmentsService: DepartmentService, 
    ) { }
    
    
    form: FormGroup = new FormGroup({
      id: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    department: new FormControl(0),
    img: new FormControl(null),
    hireDate: new FormControl('')
  });
  
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      fullName: '',
      department: 0,
      img: null,
      hireDate: '',
      
    });
  }

  getDepartment(departmentName: string){

    this.departmentsService.getDepartments().pipe(
      tap(data => console.log(data))    
      )
    
      console.log(this.departments)
    let department = this.departments.filter((department: IDepartment) => department.name === departmentName)
    return department[0]
  }

  getEmployees(): Observable<IEmployee[]> {
    
    return this.http.get<IEmployee[]>(this.employeesUrl)
    .pipe(tap( (data: IEmployee[]) => this.employeeBeaviorSubject$.next(data)) )
    
  }
  
  getFillteredEmployees(departmentId: Params): Observable<IEmployee[]>{
    return this.employeesList = this.http.get<IEmployee[]>(
      this.employeesUrl, { params: { departmentId: departmentId['id'] } })
    .pipe(tap( (data: IEmployee[]) => this.employeeBeaviorSubject$.next(data))
    )
    
    
  }

  addEmployee(employee: IEmployee | any): Observable<IEmployee> {

    
    return this.http.post<IEmployee>(this.employeesUrl,
      {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        fullName: employee.fullName,
        img: employee.img || null,
        department: employee.department,
        hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd')

      }
    ).pipe(
      tap( employee => {
        let list: IEmployee[] = this.employeeBeaviorSubject$.getValue()
        
        list.push(employee)
        this.employeeBeaviorSubject$.next(list)
      }

      )
    )

  }

  updateList( employee: IEmployee){
    let list: IEmployee[] = this.employeeBeaviorSubject$.getValue()
          const index = list.findIndex(employee => employee.id === employee.id)
          list[index] = employee          
          this.employeeBeaviorSubject$.next(list)
  }

  updateEmployee(employee: IEmployee | any) {
    this.updateList(employee);
    
    return this.http.put<IEmployee>(this.employeesUrl + employee.id,
      {
        id: employee.id,
        fullName: employee.fullName,
        img: employee.img || null,
        department: employee.department,
        hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd')
      })
  }

  deleteEmployee(employeeId: string) {

    return this.http.delete(this.employeesUrl + employeeId).pipe(
      tap(data => {
        let list: IEmployee[] = this.employeeBeaviorSubject$.getValue()
        list = list.filter(employee => employee.id !== employeeId)
        this.employeeBeaviorSubject$.next(list)
      })
    )
  }

  onEditEmployee(employee: IEmployee) {

    this.form.setValue({ ...employee })
  }



}
