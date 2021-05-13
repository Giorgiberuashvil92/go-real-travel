import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './redirect.component';

const routes: Routes = [
  {
    path: '', component: RedirectComponent
  }
]

@NgModule({
  declarations: [
    RedirectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RedirectModule { }
