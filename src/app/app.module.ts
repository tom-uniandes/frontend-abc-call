import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsModule } from './clients/clients.module';
import { AnaliticaModule } from './analitica/analitica.module';
import { MenuModule } from './menu/menu.module';
import { LoginComponent } from './authentication/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IncidentsModule } from './incidents/incidents.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ClientsModule,
    AnaliticaModule,
    MenuModule,
    IncidentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
