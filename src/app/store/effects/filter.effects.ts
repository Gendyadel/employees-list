import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as SearchActions from "../actions/filter.actions";
import { map, switchMap } from "rxjs";
import { EmployeeService } from "../../services/employee.service";

@Injectable()
export class FilterEffects {
    constructor(private actions$: Actions, private employeeService: EmployeeService) { }
    loadEmployees$ = createEffect(() => this.actions$.pipe(
        ofType(SearchActions.updateFilter),
        switchMap((action) => {
            return this.employeeService.getAllEmployees(action.filterConfig).pipe(
                map((employees) => SearchActions.loadEmployeesSuccess({ employees: employees })),
            )
        })
    ));
    loadInitially$ = createEffect(() => this.actions$.pipe(
        ofType(SearchActions.init),
        switchMap((action) => {
            return this.employeeService.getAllEmployees().pipe(
                map((employees) => SearchActions.loadEmployeesSuccess({ employees: employees })),
            )
        })
    ));
}