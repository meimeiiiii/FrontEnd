import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { AddressService } from 'src/app/services/add-address.service';
import { Patient } from 'src/app/models/patient.model';
import { StatusService } from '../../../services/status.service';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-view-individual-record-dialog',
  templateUrl: './view-individual-record-dialog.component.html',
  styleUrls: ['./view-individual-record-dialog.component.scss'],
})
export class ViewIndividualRecordDialogComponent implements OnInit {
  recordForm: FormGroup;
  isEdit = false;
  newAddress = new FormArray([]);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private statusService: StatusService,
    private addressService: AddressService,
    private toastr: ToastrService,
    private PatientService: PatientService
  ) {}

  isConfirmationScreen: boolean = false;
  actionSelected: boolean;
  submitted = false;
  addressForm: FormGroup;
  alertSuccess: boolean = false;
  alertEmailDuplicateExist: boolean = false;
  alertContactNumDuplicateExist: boolean = false;
  alertUserNotFound: boolean = false;
  alertError: boolean = false;
  alertEmailContactNumDuplicateExist: boolean = false;
  maxDate = new Date();
  patientId = 0;

  patient: Patient = {
    lastName: this.data.lastName,
    firstName: this.data.firstName,
    middleName: this.data.middleName,
    address: this.data.address,
    email: this.data.email,
    contactNumber: this.data.contactNumber,
    birthdate: this.data.birthdate,
    gender: this.data.gender,
    status: 1,
  };

  ngOnInit(): void {
    console.log(this.data);
    this.recordForm = this.formBuilder.group({
      firstName: [this.data.firstName, [Validators.required]],
      middleName: [this.data.middleName],
      lastName: [this.data.lastName, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      contactNumber: [this.data.contactNumber, [Validators.required]],
      address: [this.data.address, [Validators.required]],
      birthdate: [this.data.birthdate, [Validators.required]],
      gender: [this.data.gender, [Validators.required]],
    });
    this.addressForm = this.formBuilder.group({
      addressArray: this.formBuilder.array([this.formBuilder.control('')]),
    });
    this.recordForm.disable();
  }

  get addressArray() {
    return this.addressForm.get('addressArray') as FormArray;
  }

  createAddress() {
    this.addressArray.push(this.formBuilder.control(''));
  }

  // testAddAddress(){
  //   this.addressArray.push(this.createAddress());

  // }

  submitAddress() {
    for (let address of this.addressArray.controls) {
      console.log(address.value);
      let body = {
        address: address.value,
        patientId: this.data.patientId,
      };
      this.addressService.create(body).subscribe((p) => {
        console.log('Address Entry');
      });
    }
    //console.log(JSON.stringify(this.addressForm));
    // for(let address of this.addressForm.get('addressArray')['controls']){
    //   console.log(address.value);
    // }
  }

  // removeItem(){
  //   this.addressItems.pop();
  //   this.addressArray.removeAt(this.addressArray.length-1);
  // }

  //Code here Swarti
  activateRecord() {
    let body = { status: 1 };
    this.statusService
      .updateStatus(body, this.data.patientId)
      .subscribe((p) => {
        this.toastr.success('Success', 'Patient is now activated');
      });
  }

  //Code here Swarti
  deactivateRecord() {
    let body = { status: 0 };
    this.statusService
      .updateStatus(body, this.data.patientId)
      .subscribe((p) => {
        this.toastr.error('Deactivated!', 'Patient is now deactivated');
      });
  }
  //Code here Kevin

  addAddress() {
    this.isEdit = true;

    this.addressService.create(this.newAddress).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Pang trigger ng new address entry if ever
  addMultipleAddress() {
    this.newAddress.push(new FormControl(''));
    this.isEdit = true;
    this.recordForm.enable();
  }

  editRecord() {
    this.isEdit = true;
    this.recordForm.enable();
  }

  //Code here Albert
  submitEditRecordForm(): void {
    this.alertSuccess = false;
    this.alertContactNumDuplicateExist = false;
    this.alertEmailDuplicateExist = false;
    this.alertUserNotFound = false;
    this.alertError = false;
    this.alertEmailContactNumDuplicateExist = false;
    const data = {
      patientId: this.data.patientId,
      lastName: this.patient.lastName,
      firstName: this.patient.firstName,
      middleName: this.patient.middleName,
      address: this.patient.address,
      email: this.patient.email,
      contactNumber: this.patient.contactNumber,
      birthdate: this.patient.birthdate,
      gender: this.patient.gender,
      status: 1,
    };

    if (
      this.patient.lastName == this.data.lastName &&
      this.patient.firstName == this.data.firstName &&
      this.patient.middleName == this.data.middleName &&
      this.patient.address == this.data.address &&
      this.patient.email == this.data.email &&
      this.patient.contactNumber == this.data.contactNumber &&
      this.patient.gender == this.data.gender &&
      this.patient.birthdate == this.data.birthdate
    ) {
    } else {
      this.PatientService.update(data).subscribe(
        (response) => {
          this.alertSuccess = true;
          this.submitted = true;
          this.isEdit = false;
          this.recordForm.disable();
        },
        (error) => {
          console.log(error);
          if (
            error.status == 302 &&
            error.error.contactNumber == 'DUPLICATE' &&
            error.error.email == 'DUPLICATE'
          ) {
            this.alertEmailContactNumDuplicateExist = true;
          } else if (error.status == 302 && error.error.email == 'DUPLICATE') {
            this.alertEmailDuplicateExist = true;
          } else if (
            error.status == 302 &&
            error.error.contactNumber == 'DUPLICATE'
          ) {
            this.alertContactNumDuplicateExist = true;
          } else if (error.status == 404) {
            this.alertUserNotFound = true;
            this.isEdit = false;
            this.recordForm.disable();
          } else if (error.status == 500) {
            this.alertError = true;
            this.isEdit = false;
            this.recordForm.disable();
          } else {
            this.isEdit = false;
            this.recordForm.disable();
          }
        }
      );
    }
  }

  cloaseAlert() {
    this.alertSuccess = false;
    this.alertEmailDuplicateExist = false;
    this.alertContactNumDuplicateExist = false;
    this.alertError = false;
    this.alertUserNotFound = false;
    this.alertEmailContactNumDuplicateExist = false;
  }

  setLastname(val) {
    this.patient.lastName = val;
  }
  setFirstname(val) {
    this.patient.firstName = val;
  }
  setMiddlename(val) {
    this.patient.middleName = val;
  }
  setAddress(val) {
    this.patient.address = val;
  }
  setEmail(val) {
    this.patient.email = val;
  }
  setBirthdate(val) {
    this.patient.birthdate = val;
  }
  setGender(val) {
    this.patient.gender = val;
  }
  setContactNumber(val) {
    this.patient.contactNumber = val;
  }
  //end of code ni albert
  closeEdit() {
    this.isEdit = false;
    this.recordForm.disable();
  }

  showConfirmationScreen() {
    this.actionSelected = true;
    this.isConfirmationScreen = !this.isConfirmationScreen;
  }

  showConfirmationScreenDeactivate() {
    this.actionSelected = false;
    this.isConfirmationScreen = !this.isConfirmationScreen;
  }
}
