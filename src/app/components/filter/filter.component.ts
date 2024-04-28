import { Component, OnDestroy, OnInit } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    DividerComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {
  usersCount = 0;
  private subscriptions: Subscription[] = [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.employeeService.getAllEmployees().subscribe((data) => {
      this.usersCount = data.length;
    }));
  }
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
