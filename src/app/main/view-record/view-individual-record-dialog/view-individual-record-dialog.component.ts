import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { FormGroup, FormBuilder, Validators , FormArray, FormControl } from '@angular/forms';
import { AddressService } from 'src/app/services/add-address.service';
import { NewAddress } from 'src/app/models/address.model';
import { Patient } from 'src/app/models/patient.model';
import {StatusService} from 'src/app/services/status.service';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-view-individual-record-dialog',
  templateUrl: './view-individual-record-dialog.component.html',
  styleUrls: ['./view-individual-record-dialog.component.scss']
})
export class ViewIndividualRecordDialogComponent implements OnInit {
  recordForm: FormGroup;
  isEdit=false;
  valid = true;
  newAddress = new FormArray([]);
  // dataSource: MatTableDataSource<Address>;
  constructor(@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder,  private addressService:AddressService, private statusService:StatusService ,private dialog: MatDialog,private toastr: ToastrService) { } 
  // private statusService: StatusService,
  addressSelected: boolean;
  isConfirmationScreen: boolean = false
  submitted = false;
  actionSelected : boolean;
  addressForm:FormGroup;
  private patient: Patient[] = [];
  addressList: NewAddress[] = [];

  addressList$:Observable<any>;
  
  
 
  ngOnInit(): void {
    this.addressList$ = this.addressService.getAllAddressByID(this.data.patientId);
    console.log(this.data);
    this.recordForm=this.formBuilder.group({
      firstName:[this.data.firstName, [Validators.required]],
      middleName:[this.data.middleName, [Validators.required]],
      lastName:[this.data.lastName, [Validators.required]],
      email:[this.data.email, [Validators.required]],
      contactNumber:[this.data.contactNumber, [Validators.required]],
      address:[this.data.address, [Validators.required]],

      birthdate:[this.data.birthdate, [Validators.required]],
      gender:[this.data.gender, [Validators.required]],
    })
    this.addressForm=this.formBuilder.group({
      addressArray:this.formBuilder.array([
       this.formBuilder.control("")
      ])
    })
    this.recordForm.disable();

  }

 

  // submitAddress(){
  //   for(let address of this.addressArray.controls){
  //     console.log(address.value);
  //     let body = {
  //       address : address.value,
  //       patientId: this.data.patientId
  //     }
  //      this.addressService.create(body).subscribe(p=>{

  //       console.log("Address Entry");


  //      })
  //   }
    
  // }

  // removeItem(){
  //   this.addressItems.pop();
  //   this.addressArray.removeAt(this.addressArray.length-1);
  // }

 
  //Code here Swarti
  activateRecord(){
    let body = {'status': 1};
    this.statusService.updateStatus(body, this.data.patientId).subscribe(p=>{
      this.toastr.success('Success', 'Patient is now activated');
    });
  }
  
  //Code here Swarti
  deactivateRecord(){
    let body = {'status': 0};
    this.statusService.updateStatus(body, this.data.patientId).subscribe(p=>{
      this.toastr.error('Deactivated!', 'Patient is now deactivated')
    });

    this.addressForm=this.formBuilder.group({
      addressArray:this.formBuilder.array([this.formBuilder.control("")],[Validators.required])
    })
    this.recordForm.disable();

    this.viewAddress();


    //this.getAAddressesByAsync();
    
  }

  get addressArray (){
    return this.addressForm.get('addressArray') as FormArray;
  }

  createAddress(){
    this.addressArray.push(this.formBuilder.control(""));
  }


  submitAddress(){
    for(let address of this.addressArray.controls){
      
      let body = {
        address : address.value,
        patientId: this.data.patientId
      }
      console.log(address.value);
       this.addressService.create(body).subscribe(
       p=>{
        console.log("Address Entry");
        this.dialog.open(ViewIndividualRecordDialogComponent);
       },
      
       error =>{
         this.valid = false;
         this.submitted = false;
         console.log(error);
       }
       )
      //  this.dataSource = new MatTableDataSource(this);
    }

  
  }

 
  addAddress()
  {
    this.isEdit=true;
    
    this.addressService.create(this.newAddress).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        this.valid = false;
        console.log(error);
      });
    
  }
  //Code here Kevin
  
  // addAddress()
  // {
  //   this.isEdit=true;
    
  //   this.addressService.create(this.newAddress).subscribe(
  //     response => {
  //       console.log(response);
  //       this.submitted = true;
  //     },
  //     error => {
  //       console.log(error);
  //     });
    
  // }
//Pang trigger ng new address entry if ever
  addMultipleAddress()
  {

    this.newAddress.push(new FormControl(''));
    this.isEdit=true;
    this.recordForm.enable()

  }


  viewAddress()
  {
    this.addressService.getAllAddressByID(this.data.patientId).subscribe(data=> {
      console.log(data);
      this.addressList = data;
      
    })  
  }

  updateList()
{
  this.viewAddress();
}
  
  editRecord(){
    
    this.isEdit=true;
    this.recordForm.enable();
  }


  //Code here Albert
  submitEditRecordForm(){
    
  }
  closeEdit(){
    this.isEdit=false;
    this.recordForm.disable();

  }

  showConfirmationScreen() {
    this.actionSelected = true
    this.isConfirmationScreen = !this.isConfirmationScreen
  }

  showConfirmationScreenDeactivate() {
    this.actionSelected = false;
    this.isConfirmationScreen = !this.isConfirmationScreen
  }
  
}
