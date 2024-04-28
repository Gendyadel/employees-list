import { createReducer, on } from "@ngrx/store";
import * as FilterActions from '../actions/filter.actions';
import { initialState } from "../filter.state";

export const filterReducer = createReducer(
    initialState,
    on(FilterActions.updateFilter, (state, { filterConfig }) => ({
        ...state,
        filterConfig,
    })),

    on(FilterActions.loadEmployeesSuccess, (state, { employees: employees }) => ({
        ...state,
        results: employees
    })),

    on(FilterActions.init, (state) => ({
        ...state,
    }))

);