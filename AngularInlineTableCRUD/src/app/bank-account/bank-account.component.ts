import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { BankService } from '../shared/bank.service';
import { BankAccountService } from '../shared/bank-account.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  bankAccountForms : FormArray = this.fb.array([]);
  bankList = [];

  constructor(private fb: FormBuilder, 
    private bankService : BankService,
    private service : BankAccountService) { }

  ngOnInit() { 
    this.bankService.getBankList()
    .subscribe(res => this.bankList = res as []);
    this.addBankAccountForm();
  }

  addBankAccountForm(){
    this.bankAccountForms.push(this.fb.group({
      bankAccountID : [0],
      accountNumber : ['', Validators.required],
      accountHolder : ['', Validators.required],
      bankID : [0, Validators.min(1)],
      IFSC : ['', Validators.required]
    }));
  }
  recordSubmit(fg : FormGroup){
    this.service.postBankAccount(fg.value).subscribe(
      (res : any) => {
        fg.patchValue({bankAccountID : res.bankAccoundID})
      }
    )
  }

}
