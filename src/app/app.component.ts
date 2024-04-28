import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { FilterComponent } from './components/filter/filter.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeesTableComponent, FilterComponent, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
      })),
      state('expanded', style({
        height: '*',
        opacity: '1',
      })),
      transition('collapsed => expanded', [
        animate('400ms ease-out')
      ]),
      transition('expanded => collapsed', [
        animate('400ms ease-in')
      ])
    ])
  ]
})
export class AppComponent {
  isFilterExpanded = true;

  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded; // Toggle filter state
  }
}
