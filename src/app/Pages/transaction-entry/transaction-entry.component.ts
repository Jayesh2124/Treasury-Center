import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostAttributeToken, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { BaseUtilityModule } from '../../Modules/base-utility/base-utility.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule  } from '@angular/material/sort';
import { TransactionService } from '../../service/transaction-service.service';

interface Transaction {
  category: string;
  transactionId: number;
  amount: number;
  type: TransactionType;
  transactionDate: string;
  transactionDescription: string;
}


export enum TransactionType {
  Cr = "Cr",
  Dr = "Dr"
}



@Component({
  selector: 'app-transaction-entry',
  standalone: true,
  imports: [CommonModule, BaseUtilityModule, HeaderComponent ,MatFormFieldModule,MatSortModule, MatInputModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './transaction-entry.component.html',
  styleUrl: './transaction-entry.component.scss'
})
export class TransactionEntryComponent implements OnInit, AfterViewInit {

  componentTitle: string = 'Transaction'
  currentUser: any
  isEditMode: boolean = false;
  isFormEditable: boolean = true
  openTab: number = 1
  transactionType = TransactionType

  displayedColumns: string[] = ['transactionId', 'category', 'amount', 'type','action'];
  dataSource !: MatTableDataSource<Transaction>  
  dataSourceList : any = 0
  dataLength : number = 0

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  transactionalInformationForm !: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder, private snakeBar: MatSnackBar, private transactionalService:TransactionService) { }

  transactionalInformationErrors: any = {
    transactionDate: {
      required: 'Transaction Date is required'
    },
    category: {
      required: 'Category is required'
    },
    type: {
      required: 'Type is required'
    },
    transactionDescription: {
      required: 'Transaction Description is required'
    },
    Amount: {
      required: 'Amount is required'
    }
  }

 ngAfterViewInit(): void {
  
 }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('LoggedIn_User') || '{}')
    if (typeof this.currentUser.name === 'undefined') {
      this.currentUser.name = 'Default user'
      this.currentUser.picture = '../../assets/investment.png'
    }
    if (this.currentUser == '{}') {
      this.router.navigate(['/'])
    }

    this.getTransactionsList();

    this.initializeTransactionalInformationForm();
  }
  makeFormEditable() {
    debugger;
    this.transactionalInformationForm.enable();
    this.isFormEditable != this.isFormEditable
  }

  initializeTransactionalInformationForm() {
    this.transactionalInformationForm = this.formBuilder.group({
      transactionDate: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      transactionDescription: ['', Validators.required],
      Amount: [0, Validators.required]
    })
  }

  getFormsError(formName: string, controlName: string): string[] {
    if (formName === 'transactionalInformation') {
      const controlErrors = this.transactionalInformationForm.get(controlName)?.errors
      if (controlErrors) {
        let keyType = Object.keys(controlErrors);
        return Object.keys(controlErrors).map((key) => this.transactionalInformationErrors[controlName][key])
      } else {
        console.log(`Key "${controlName}" not found in loanIdentificationErrors`)
        return []
      }
    }
    return [];
  }

  submitTransaction() {
    if (this.transactionalInformationForm.valid) {
      this.snakeBar.open('Transaction is submitted successful!!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.isEditMode = !this.isEditMode
      this.getTransactionsList();
    }
    else {
      this.snakeBar.open('Transaction is not submitted Please check inputs!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewTransaction()
  {
    this.isEditMode = !this.isEditMode
    this.transactionalInformationForm.reset();
  }

  editTransactionRecord( transactionRecord : any )
  {
    debugger;
    this.transactionalInformationForm.patchValue({
      transactionDate: transactionRecord.transactionDate || '' ,
      type: transactionRecord.type || TransactionType.Cr ,
      category: transactionRecord.category || '' ,
      transactionDescription: transactionRecord.transactionDescription || '' ,
      Amount: transactionRecord.amount || 0.
    })    
    this.isEditMode = !this.isEditMode;
  }

  getTransactionsList()
  {
    this.transactionalService.getTransactions().subscribe({
      next:(Response)=>{
        this.dataSource = new MatTableDataSource<Transaction>(Response as Transaction[]) 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        let data = Response as []
        this.dataLength = data.length;
      },
      error:(err)=>{
        this.snakeBar.open("Failed to get Transaction List!","Close",{
          duration:3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
    })
  }

}
