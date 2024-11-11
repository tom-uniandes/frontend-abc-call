import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarPublicComponent } from './navbar-public/navbar-public.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarPublicComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent, NavbarPublicComponent]
})
export class MenuModule { }
