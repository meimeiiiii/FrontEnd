import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { MainComponent } from '../app/main/main.component';
import { AppComponent } from '../app/app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddRecordComponent } from './main/add-record/add-record.component';
import { ViewRecordComponent } from './main/view-record/view-record.component';
import { GenerateReportDialogComponent } from './main/generate-report-dialog/generate-report-dialog.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'main', component: MainComponent,
    children: [

      { path: 'add-record', component: AddRecordComponent },
      { path: 'view-record', component: ViewRecordComponent },
      { path: 'generate-report', component: GenerateReportDialogComponent },
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
