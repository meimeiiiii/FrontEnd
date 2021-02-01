import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewRecordService } from "../../services/view-record.service";
import { Patient } from "../../models/Patient";
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewIndividualRecordDialogComponent } from './view-individual-record-dialog/view-individual-record-dialog.component';
import { MatTable } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}



@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.scss']
})
export class ViewRecordComponent implements OnInit {

  displayedColumns: string[] = ['patientId', 'firstName', 'middleName', 'lastName', 'email', 'contactNumber', 'date', 'gender', 'address', 'status', 'actions'];
  dataSource: MatTableDataSource<Patient>;

  activatedRecords;
  deactivatedRecords;
  allRecords;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  isChecked = true;
  isLoading = true;
  value = "All";


  private patients: Patient[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private viewRecordService: ViewRecordService, public dialog: MatDialog) {



  }
  ngOnInit(): void {


    this.viewRecordService.showPatientRecords().subscribe(p => {
      this.allRecords = p.map(p => {
        p['fullName'] = `${p.firstName} ${p.middleName} ${p.lastName}`;
        p['firstLast'] = `${p.firstName} ${p.lastName}`;
        p['date'] = new Date(p['birthdate']).toDateString();
        return p;

      })
      this.dataSource = new MatTableDataSource(this.allRecords);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


      this.isLoading = false;
    }
    )

  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate =
      (data: any, filter: string) => {
        return data.firstName.toLowerCase().indexOf(filter) == 0 || data.middleName.toLowerCase().indexOf(filter) == 0 ||
          data.lastName.toLowerCase().indexOf(filter) == 0 || data.gender.toLowerCase().indexOf(filter) == 0 ||
          data.date.toString().toLowerCase().includes(filter) || data.fullName.toLowerCase().indexOf(filter) == 0||
          data.firstLast.toLowerCase().indexOf(filter) == 0;
      };

  }


  openDialog(row) {
    const dialogRef = this.dialog.open(ViewIndividualRecordDialogComponent, { data: row });


    dialogRef.afterClosed().subscribe(result => {
      this.onValChange(this.value);
    })
  }
  onValChange(value) {
    this.isLoading = true;
    this.value = value;
    switch (value) {
      case 'Activated':
        this.viewRecordService.showActivatedPatientRecords().subscribe(p => {
          this.activatedRecords = p.map(p => {
            p['fullName'] = `${p.firstName} ${p.middleName} ${p.lastName}`;
            p['firstLast'] = `${p.firstName} ${p.lastName}`;
            p['date'] = new Date(p['date']).toLocaleDateString('en-US');
            return p;
          })
          this.dataSource = new MatTableDataSource(this.activatedRecords);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        }
        );
        break;
      case 'Deactivated':
        this.viewRecordService.showDeactivatedPatientRecords().subscribe(p => {
          this.deactivatedRecords = p.map(p => {
            p['fullName'] = `${p.firstName} ${p.middleName} ${p.lastName}`;
            p['firstLast'] = `${p.firstName} ${p.lastName}`;
            p['date'] = new Date(p['date']).toLocaleDateString('en-US');
            return p;
          })
          this.dataSource = new MatTableDataSource(this.deactivatedRecords);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        }
        )
        break;
      case 'All':
        this.viewRecordService.showPatientRecords().subscribe(p => {
          this.allRecords = p.map(p => {
            p['fullName'] = `${p.firstName} ${p.middleName} ${p.lastName}`;
            p['firstLast'] = `${p.firstName} ${p.lastName}`;
            p['date'] = new Date(p['date']).toLocaleDateString('en-US');
            return p;
          })
          this.dataSource = new MatTableDataSource(this.allRecords);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        }
        )
        break;
      default:

    }

  }

}