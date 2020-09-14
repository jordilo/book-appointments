import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailabilityByUserComponent } from './views/availability-by-user/availability-by-user.component';
import { CreateMeettingComponent } from './views/create-meetting/create-meetting.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { UsersAvailabilityComponent } from './views/users-availability/users-availability.component';
import { WeeklyMeetingsComponent } from './views/weekly-meetings/weekly-meetings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    children: [
      {
        component: AvailabilityByUserComponent, path: ':id',
      },
    ],
    component: UsersAvailabilityComponent,
    path: 'user-availability',
  },
  { path: 'weekly-meetings/:year/:week', component: WeeklyMeetingsComponent },
  { path: 'create-meeting', component: CreateMeettingComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
