import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterClientComponent } from './register-client/register-client.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RegisterModule { }
