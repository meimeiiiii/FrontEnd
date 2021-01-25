import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { MainComponent } from '../app/main/main.component';
import { AppComponent } from '../app/app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddRecordComponent } from './main/add-record/add-record.component';
import { ViewRecordComponent } from './main/view-record/view-record.component';
import { ActivateRecordComponent } from './main/activate-record/activate-record.component';
import { DeactivateRecordComponent } from './main/deactivate-record/deactivate-record.component';
import { GenerateReportComponent } from './main/generate-report/generate-report.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'main', component: MainComponent,
    children: [

      { path: 'add-record', component: AddRecordComponent },
      { path: 'view-record', component: ViewRecordComponent },
      { path: 'activate-record', component: ActivateRecordComponent },
      { path: 'deactivate-record', component: DeactivateRecordComponent },
      { path: 'generate-report', component: GenerateReportComponent },
      { path: '**', redirectTo: 'add-record', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
