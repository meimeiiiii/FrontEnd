import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ExportRecordService } from 'src/app/services/export-record.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-generate-report-dialog',
  templateUrl: './generate-report-dialog.component.html',
  styleUrls: ['./generate-report-dialog.component.scss']
})
export class GenerateReportDialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public dialog: MatDialog, public dialogRef: MatDialogRef<GenerateReportDialogComponent>,
          private exportRecordService: ExportRecordService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setValidators();
  }

filter = this.fb.group({
  filterValue:  new FormControl(''),
  status:  new FormControl(''), 
    statusValue: new FormControl(''),
  gender:  new FormControl(''),  
  genderCheckbox:  new FormControl(''),
  birthdate:  new FormControl(''),
    startDate:  new FormControl(''),
    endDate:  new FormControl(''),
});
submitted: boolean = false;
maxDate = new Date();

// FORM FUNCTION
onSubmit(event) {
  event.preventDefault();
  this.submitted = true;

  if (this.filter.valid && this.checkFiltersValid()) {
    this.confirm();
    this.dialogRef.close();
  }else{
    console.log('INVALID!!!');
  }
}

checkFiltersValid(): boolean{
  return  !(this.submitted && this.isShownFilter && this.filter.get('status').value == false 
  && this.filter.get('gender').value == false && this.filter.get('birthdate').value == false);
}

confirm(){
  var filterOn = this.filter.get('filterValue').value;
  var statusOn = this.filter.get('status').value;
    var status = this.filter.get('statusValue').value;
  var genderOn = this.filter.get('gender').value;
    var gender = this.filter.get('genderCheckbox').value;
    var male = false;
    var female = false;
    var others = false;
    for (let i = 0; i < gender.length; i++) {
      if (gender[i] === "male"){
        male = true;
      } else if (gender[i] === "female"){
        female = true;
      } else if(gender[i] === "others"){
        others = true;
      }
    }
  var birthdateOn = this.filter.get('birthdate').value;
    var startDate = this.filter.get('startDate').value;
    var endDate = this.filter.get('endDate').value;

  this.submitted = true;

  const data = {
    filterValue: filterOn,
    status: statusOn,
      statusValue: status,
    gender: genderOn,
      male: male,
      female: female,
      others: others,
    birthdate: birthdateOn,  
      startDate: startDate,
      endDate: endDate
  };

  console.log(data);

  this.exportRecordService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.downLoadFile(response, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8');
        this.submitted = true;
      },
      error => {
        console.log(error);
      });

}

getCurrentDateTime() : string {
  let today = new Date();
  var y = today.getFullYear();
  var m = today.getMonth() + 1;
  var d = today.getDate();
  var h = today.getHours();
  var mi = today.getMinutes();
  var s = today.getSeconds();
  var dtString = y + "-" + m + "-" + d + "_" + h + "-" + mi + "-" + s;
  return dtString;
}

downLoadFile(data: any, type: string) {
  var fileName = "PatientRecords_" + this.getCurrentDateTime() + ".xlsx";

  let blob = new Blob([data], { type: type});
  var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
    var link = document.createElement("a");
    link.setAttribute("download", fileName)
    link.href = objectUrl;
    link.click();
}

// FORM DEPENDENCIES
isShownFilter: boolean = false;
isShownStatus: boolean = false;
isShownGender: boolean = false;
isShownBirthdate: boolean = false;

toggleShowFilter() {
  this.submitted = false;
  this.isShownFilter = ! this.isShownFilter;
  if(this.isShownFilter == false){ 
    const filterClear = {
      filterValue: false,
      status: false,
        statusValue: '',
      gender: false,
      genderCheckbox: '',
      birthdate: false,  
        startDate: '',
        endDate: ''
    };
    this.filter.setValue(filterClear);
    this.isShownStatus = false;
    this.isShownGender = false;
    this.isShownBirthdate = false;
  }
}

toggleShowStatus() {
  this.submitted = false;
  this.isShownStatus = ! this.isShownStatus;
}

toggleShowGender() {
  this.submitted = false;
  this.isShownGender = ! this.isShownGender;
}

toggleShowBirthdate() {
  this.submitted = false;
  this.isShownBirthdate = ! this.isShownBirthdate;
}

setValidators(){
  this.filter.get('filterValue').valueChanges
  .subscribe(check => {
    if(check == false){
      this.filter.get('filterValue').clearValidators();
      this.filter.get('statusValue').clearValidators();
      this.filter.get('genderCheckbox').clearValidators();
      this.filter.get('startDate').clearValidators();
      this.filter.get('endDate').clearValidators();

      this.filter.get('filterValue').updateValueAndValidity();
      this.filter.get('statusValue').updateValueAndValidity();
      this.filter.get('genderCheckbox').updateValueAndValidity();
      this.filter.get('startDate').updateValueAndValidity();
      this.filter.get('endDate').updateValueAndValidity();
    }  
  });

  this.filter.get('status').valueChanges
    .subscribe(check => {
      if(check == true){
        this.filter.get('statusValue').setValidators([Validators.required]);
      } else{
        this.filter.get('statusValue').clearValidators();
      }
      this.filter.get('statusValue').updateValueAndValidity();
    });

  this.filter.get('gender').valueChanges
    .subscribe(check => {
      if(check == true){
        this.filter.get('genderCheckbox').setValidators([Validators.required]);
      } else{
        this.filter.get('genderCheckbox').clearValidators();
      }
      this.filter.get('genderCheckbox').updateValueAndValidity();
    });  

  this.filter.get('birthdate').valueChanges
    .subscribe(check => {
      if(check == true){
        this.filter.get('startDate').setValidators([Validators.required]);
        this.filter.get('endDate').setValidators([Validators.required]);
      }else{
        this.filter.get('startDate').clearValidators();
        this.filter.get('endDate').clearValidators();
      }
      this.filter.get('startDate').updateValueAndValidity();
      this.filter.get('endDate').updateValueAndValidity();
    }); 
}

}
