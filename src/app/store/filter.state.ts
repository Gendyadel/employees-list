import { Employee } from "../models/employee.model";
import { FilterConfig } from "../models/filter-config.model";

export interface FilterState {
    filterConfig?: FilterConfig;
    results: Employee[];
}
export const initialState: FilterState = {
    results: [],
}
