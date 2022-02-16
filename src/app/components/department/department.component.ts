import {Component, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import { IDepartment} from '../../models/department.interface'
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department',
  styleUrls: ['department.component.scss'],
  templateUrl: 'department.component.html',
})
export class DepartmentComponent {
  displayedColumns: string[] = ['name', 'id'];
  dataSource: IDepartment[] = [];

  @ViewChild(MatTable) table?: MatTable<IDepartment>;

  constructor(
    private router: Router,
    public departmentService: DepartmentService
    ) {}

  navigateToEmployees(id: number){
    this.router.navigate([`/departments/${id}`])
  }

  ngOnInit(){
    this.departmentService.getDepartments().subscribe(
      departments => this.dataSource = departments,
      err => console.log(err.error)
    )
  }
  
}
