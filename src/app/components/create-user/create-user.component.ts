import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IDepartment } from 'src/app/models/department.interface';
import { IEmployee } from 'src/app/models/employee.interface';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  departments: IDepartment[] = [];
  employees: IEmployee[] = [];

  constructor(
    public service: EmployeeService,
    public departmentService: DepartmentService,
    private dialogRef: MatDialogRef<CreateUserComponent>
    ) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe()
    this.departmentService.getDepartments().subscribe( 
      departmentsList => this.departments = departmentsList)
  }

  onSubmit() {
    this.service.form.value.img = this.fileInput.nativeElement.files[0]// submit the image

    if (this.service.form.valid) {
      if (!this.service.form.get('id')!.value){
      this.service.addEmployee(this.service.form.value).subscribe();
        }
        else
        this.service.updateEmployee(this.service.form.value).subscribe(); 
        // this.notificationService.success(':: Submitted successfully');
        this.onClose();
    }
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    //initializing the form 
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }



}

  // onFileSelected() {

  //   this.service.form.value.img = this.fileInput.nativeElement.files[0]
  //   console.log( this.fileInput.nativeElement.files[0]);
     
  //   // const inputNode: any = document.querySelector('#file');
  
  //   // if (typeof (FileReader) !== 'undefined') {
  //   //   const reader = new FileReader();
  
  //   //   reader.onload = (e: any) => {
  //   //     this.srcResult = e.target.result;
  //   //   };
  
  //   //   reader.readAsArrayBuffer(inputNode.files[0]);
  //   // }
  // }
