import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class MaterialModule { }
