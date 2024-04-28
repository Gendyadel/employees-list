import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Employee } from '../../models/employee.model';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFilterResults } from '../../store/selectors/filter.selectors';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatCheckboxModule, CommonModule],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['select', 'id', 'condition', 'name', 'serial', 'accessType', 'job', 'phoneNumber'];
  displayedHeaders: { name: string, nameAr: string }[] = [
    { name: 'id', nameAr: 'المُسلسل' },
    { name: 'condition', nameAr: 'الحالة' },
    { name: 'name', nameAr: 'الاسم' },
    { name: 'serial', nameAr: 'مسلسل المستخدم' },
    { name: 'accessType', nameAr: 'صلاحية المستخدم' },
    { name: 'job', nameAr: 'الوظيفة' },
    { name: 'phoneNumber', nameAr: 'رقم الهاتف' },
  ];
  dataSource = new MatTableDataSource<Employee>([]);
  selection = new SelectionModel<Employee>(true, []);
  private subscriptions: Subscription[] = [];

  constructor(private store: Store) { }
  ngOnInit(): void {
    this.store.select(selectFilterResults).subscribe(
      (data) => {
        this.dataSource.data = data
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
