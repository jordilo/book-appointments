import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { MomentModule } from 'ngx-moment';
import { environment } from 'src/environments/environment';
import { APIInterceptor } from './api-interceptor';
import { BASE_API_URL } from './api-url';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingShortComponent } from './components/meeting-short/meeting-short.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { WeekSelectorComponent } from './components/week-selector/week-selector.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { AvailabilityByUserComponent } from './views/availability-by-user/availability-by-user.component';
import { CreateMeettingComponent } from './views/create-meetting/create-meetting.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { UsersAvailabilityComponent } from './views/users-availability/users-availability.component';
import { WeeklyMeetingsComponent } from './views/weekly-meetings/weekly-meetings.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    CreateMeettingComponent,
    UsersAvailabilityComponent,
    NotFoundComponent,
    MeetingComponent,
    AvailabilityByUserComponent,
    FullNamePipe,
    MeetingsComponent,
    WeeklyMeetingsComponent,
    WeekSelectorComponent,
    MeetingShortComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MomentModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
  ],
  providers: [
    { provide: BASE_API_URL, useValue: environment.apiUrl },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
    },
  ],
})
export class AppModule {

  constructor() {
    moment.locale('es_Es');
  }
}
