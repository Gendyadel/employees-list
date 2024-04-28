import { createAction, props } from "@ngrx/store";
import { Employee } from "../../models/employee.model";
import { FilterConfig } from "../../models/filter-config.model";

export const init = createAction(
    '[Filter] Init'
);

export const updateFilter = createAction(
    '[Filter] Update Filter',
    props<{ filterConfig: FilterConfig }>()
)

export const loadEmployeesSuccess = createAction(
    '[Filter] Load Employees Success',
    props<{ employees: Employee[] }>()
);

