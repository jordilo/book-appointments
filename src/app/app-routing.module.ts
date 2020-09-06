import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMeettingComponent } from './views/create-meetting/create-meetting.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { UsersAvailabilityComponent } from './views/users-availability/users-availability.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-availability', component: UsersAvailabilityComponent },
  { path: 'create-meeting', component: CreateMeettingComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
