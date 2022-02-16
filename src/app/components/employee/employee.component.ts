import {Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { IEmployee } from '../../models/employee.interface'
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { CreateUserComponent } from 'src/app/components/create-user/create-user.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = [ 'img', 'name', 'department', 'actions'];
  public _employees: IEmployee[] = [] 
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);


  @ViewChild(MatTable) table!: MatTable<IEmployee>;
  // @Output() onDeleteEmployee: EventEmitter<IEmployee> = new EventEmitter();

  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private dialog: MatDialog

    ) { }

  createUser() {
    this.employeeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CreateUserComponent, dialogConfig)
  } 

  removeData() {
    this._employees.pop();

  }// to call a service

  onDelete(employeeId: string) {
    if(confirm('delete user? This change cannot be undone '))
    {
      this.employeeService.deleteEmployee(employeeId).subscribe()

    }
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    if(params){ 
      this.employeeService.getFillteredEmployees(params).subscribe()
    }else {

      this.employeeService.getEmployees()
    }
  }

  onEdit(row: IEmployee){
    this.employeeService.onEditEmployee(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CreateUserComponent, dialogConfig)
  }


}
