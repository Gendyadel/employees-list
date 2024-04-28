import { Component, OnDestroy, OnInit } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { Observable, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { FilterService } from '../../services/filter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterConfig } from '../../models/filter-config.model';
import { Store } from '@ngrx/store';
import { init, updateFilter } from '../../store/actions/filter.actions';
import { selectCount } from '../../store/selectors/filter.selectors';
import { AsyncPipe } from '@angular/common';

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
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {
  usersCount: Observable<number>;
  private subscriptions: Subscription[] = [];
  filterForm: FormGroup;
  filterConfig?: any;

  constructor(private formBuilder: FormBuilder, private filterService: FilterService, private route: ActivatedRoute, private router: Router, private store: Store) {
    this.usersCount = this.store.select(selectCount);
    // Initialize form with dropdown inputs
    this.filterForm = this.formBuilder.group({
      job: [''],
      condition: [''],
      access: ['']
    });
  }

  ngOnInit(): void {

    this.subscriptions.push(this.filterService.getFilterConfig().subscribe((data) => {
      this.filterConfig = data;
    }));

    this.initFilterValues();

    this.filterForm.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe((value) => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const { job, condition, access } = this.filterForm.value;

    // Construct query parameters based on form values
    const queryParams: any = {};
    if (job) queryParams.job = job;
    if (condition) queryParams.condition = condition;
    if (access) queryParams.access = access;

    // Navigate to the same route with updated query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
    this.store.dispatch(updateFilter({ filterConfig: this.filterForm.value }));
  }

  initFilterValues() {
    this.subscriptions.push(
      this.route.queryParams.subscribe((params) => {
        if (Object.entries(params).length == 0) {
          this.store.dispatch(init());
        }
        const { job, condition, access } = params;
        if (JSON.stringify(params) != JSON.stringify(this.filterForm.value)) {
          this.filterForm.patchValue({ job, condition, access });
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
