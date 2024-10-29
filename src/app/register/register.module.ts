import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterClientComponent } from './register-client/register-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterAgentComponent } from './register-agent/register-agent.component';
import { MenuModule } from "../menu/menu.module";

@NgModule({
  declarations: [
    RegisterClientComponent,
    RegisterAgentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuModule
]
})
export class RegisterModule { }
