import { Component, OnInit } from '@angular/core';
import { GenerateReportDialogComponent } from './generate-report-dialog/generate-report-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openDialog() {
    const dialogRef = this.dialog.open(GenerateReportDialogComponent, {
      height: '520px', 
      width: '400px',
    });
   

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
