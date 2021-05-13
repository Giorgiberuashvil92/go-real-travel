import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
    //   {
    //     path: '',
    //     redirectTo: 'dashboard',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'dashboard',
    //     loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    //   }
        {
          path: 'trips/:itineraryId',
          loadChildren: () => import('../itinerary-dashboard/itinerary-dashboard.module').then(m => m.ItineraryDashboardModule)
        },
        {
          path: 'trips/:itineraryId/bookings',
          loadChildren: () => import('../itinerary-bookings/itinerary-bookings.module').then(m => m.ItineraryBookingsModule)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
