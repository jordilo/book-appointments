import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIInterceptor } from './api-interceptor';
import { environment } from 'src/environments/environment';
import { BASE_API_URL } from './api-url';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { CreateMeettingComponent } from './views/create-meetting/create-meetting.component';
import { UsersAvailabilityComponent } from './views/users-availability/users-availability.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { AvailabilityByUserComponent } from './views/availability-by-user/availability-by-user.component';
import { FullNamePipe } from './pipes/full-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateMeettingComponent,
    UsersAvailabilityComponent,
    NotFoundComponent,
    MeetingComponent,
    AvailabilityByUserComponent,
    FullNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MomentModule
  ],
  providers: [
    { provide: BASE_API_URL, useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
