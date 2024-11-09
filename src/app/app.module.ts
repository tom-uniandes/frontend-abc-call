import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsModule } from './clients/clients.module';
import { AnaliticaModule } from './analitica/analitica.module';
import { RegisterModule } from './register/register.module';
import { MenuModule } from './menu/menu.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa este módulo
import { ToastrModule } from 'ngx-toastr';
import { IncidentsModule } from './incidents/incidents.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ClientsModule,
    AnaliticaModule,
    MenuModule,
    FooterModule,
    RegisterModule,
    AuthenticationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    IncidentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
