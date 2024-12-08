import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

// Define interface for Expense
interface Expense {
  id: number;
  expenseType: string;
  amount: number;
  date: string;
  paymentStatus: string;
}

@Component({
  selector: 'app-manage-budget',
  templateUrl: './manage-budget.component.html',
  styleUrls: ['./manage-budget.component.scss'],
})
export class ManageBudgetComponent implements OnInit {
  projectBudget = 500000; // Example project budget
  expenses: Expense[] = []; // Define the type of the expenses array
  newExpense = {
    expenseType: '',
    amount: 0,
    date: '',
    paymentStatus: '',
  };


  projectId!: string;  // Non-null assertion operator to indicate this will be assigned later
  token = localStorage.getItem('token');// Bearer token

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve projectId from the URL
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.projectId);
    // Fetch expenses from the backend
    this.getExpenses();
  }

  // Fetch expenses from backend with Bearer token
  getExpenses() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    this.http
      .get( `https://localhost:7050/api/Finance/all`, { headers })
      .subscribe((data: any) => {
        console.log(data);
        this.expenses = data.finance; // Assuming the response contains an expenses array

        console.log(this.expenses);
        // this.projectBudget = data.projectBudget; // Assuming the response contains the project budget
      });
  } 

  // Calculate total expenses
  get totalExpenses() {
    return 0;
    // return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  // Calculate remaining budget
  get remainingBudget() {
    return this.projectBudget - this.totalExpenses;
  }

  // Add a new expense with Bearer token
  addExpense() {
    // Create the payload matching the backend model
    const expense = {
      projectId: this.projectId, // Ensure this matches the backend field
      expenseType: this.newExpense.expenseType.trim(), // Required
      amount: this.newExpense.amount, // Ensure it's a number
      date: new Date(this.newExpense.date).toISOString(), // ISO format
      paymentStatus: this.newExpense.paymentStatus.trim(), // Optional but valid
    };
  
    console.log('Sending expense payload:', expense); // Debug payload
  
    // Set headers with Bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
    // Make the POST request
    this.http.post('https://localhost:7050/api/Finance/create', expense, { headers }).subscribe(
      (response) => {
        console.log('Expense added successfully:', response);
  
        // Refresh the expenses list
        this.getExpenses();
  
        // Reset the form
        this.newExpense = {
          expenseType: '',
          amount: 0,
          date: '',
          paymentStatus: '',
        };
      },
      (error) => {
        console.error('Error adding expense:', error);
  
        // If backend validation error is returned
        if (error.error) {
          console.error('Backend validation error:', error.error);
        }
      }
    );
  }
  
  
  
  

  // Placeholder for editing expense
  editExpense(expense: Expense) {
    console.log('Editing expense:', expense);
  }

  // Delete an expense by ID
  deleteExpense(expenseId: number) {
    this.expenses = this.expenses.filter((expense) => expense.id !== expenseId);
  }
}
